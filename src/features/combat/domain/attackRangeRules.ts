import type { Item, Vector2 } from "@owlbear-rodeo/sdk";
import type { DDBParsedCharacter } from "../../../types/ddb";
import type { SpellFormula } from "../../../types/spellFormula";
import type { Combatant, CombatEncounter, TokenDisposition, TokenVitals } from "./types";
import { TOKEN_DISPOSITION_METADATA_KEY, LEGACY_TOKEN_DISPOSITION_METADATA_KEY } from "./types";
import type { D20RollMode } from "./conditionRules";
import { isValidCombatTargetToken } from "../../targeting/application/lineOfSightService";
import { calculateTokenEdgeDistanceFeet } from "../../targeting/domain/targetingGeometry";
import { getLinkedDDBCharacterId } from "../../../services/ddbService";
import { getScopedMetadata } from "../../../platform/obr/metadataHelper";

export interface RangedAttackDetectionInput {
  selectedSpell?: string | null;
  spellFormula?: SpellFormula | null;
  saveOrAttack?: string | null;
  attackType?: "melee" | "ranged" | null;
  weapon?: {
    type?: string;
    isThrown?: boolean;
    thrownRange?: number;
    thrownLongRange?: number;
  } | null;
  isThrown?: boolean;
}

export interface CloseCombatThreatResult {
  isThreatened: boolean;
  threateningTokens: Item[];
  reason?: string;
}

const INCAPACITATING_CONDITIONS = new Set([
  "dead",
  "unconscious",
  "incapacitated",
  "paralyzed",
  "petrified",
  "stunned",
]);

/**
 * Pure data-driven detector: Determines whether an action is a ranged attack
 * (weapon attack or spell attack) without using hardcoded spell name lists.
 */
export function isRangedAttackAction(input: RangedAttackDetectionInput): boolean {
  if (input.weapon) {
    if (input.weapon.type === "ranged") return true;
    if (input.isThrown || input.weapon.isThrown || (input.weapon.thrownRange && input.weapon.thrownRange > 0)) {
      return true;
    }
  }

  if (input.selectedSpell === "ranged_weapon_attack") {
    return true;
  }
  if (input.selectedSpell === "melee_weapon_attack") {
    return Boolean(input.isThrown || input.weapon?.isThrown);
  }

  if (input.spellFormula?.interaction) {
    const interType = input.spellFormula.interaction.type;
    if (interType === "spell_attack") return true;
    if (interType === "melee_spell_attack" || interType === "save") return false;
  }

  if (input.saveOrAttack) {
    const lower = input.saveOrAttack.toLowerCase();
    if (lower.includes("ranged")) return true;
    if (lower.includes("melee") || lower.includes("save")) return false;
  }

  if (input.attackType === "ranged") {
    return true;
  }

  return false;
}

/**
 * Pure function: Implements strict D&D 5e Advantage / Disadvantage cancellation.
 * If circumstances cause a roll to have both Advantage and Disadvantage,
 * they cancel each other out completely, resulting in a Normal roll.
 */
export function resolveRollMode(hasAdvantage: boolean, hasDisadvantage: boolean): D20RollMode {
  if (hasAdvantage && hasDisadvantage) return "normal";
  if (hasAdvantage) return "advantage";
  if (hasDisadvantage) return "disadvantage";
  return "normal";
}

/** Collects feature names from arrays, strings, or grouped objects (DDB shapes vary). */
function collectFeatureNames(source: unknown, depth = 0): string[] {
  if (source == null || depth > 3) return [];
  if (typeof source === "string") return [source];
  if (Array.isArray(source)) {
    return source.flatMap((entry) => collectFeatureNames(entry, depth + 1));
  }
  if (typeof source === "object") {
    const record = source as Record<string, unknown>;
    const own = typeof record.name === "string" ? [record.name] : [];
    // DDB may store features grouped as an object (e.g. { class: [...], race: [...] })
    return [
      ...own,
      ...Object.values(record).flatMap((value) =>
        typeof value === "object" ? collectFeatureNames(value, depth + 1) : [],
      ),
    ];
  }
  return [];
}

/**
 * Checks if the character possesses feats/features that waive Close Combat Disadvantage
 * on ranged attacks (e.g. Crossbow Expert, Gunner, Sharpshooter, Close-Quarters Shooter, Pistolero).
 */
export function hasCloseCombatDisadvantageBypass(character?: DDBParsedCharacter | null): boolean {
  if (!character) return false;

  try {
    const loose = character as unknown as Record<string, unknown>;
    const catalog = [
      ...collectFeatureNames(character.actions?.map((a) => a.name)),
      ...collectFeatureNames(loose.options),
      ...collectFeatureNames(loose.features),
      ...collectFeatureNames(loose.feats),
      ...collectFeatureNames(loose.classFeatures),
    ];

    return catalog.some((raw) => {
      const name = raw.toLowerCase();
      return (
        name.includes("sharpshooter") ||
        name.includes("crossbow expert") ||
        name.includes("gunner") ||
        name.includes("close-quarters shooter") ||
        name.includes("close quarters shooter") ||
        name.includes("pistolero")
      );
    });
  } catch {
    return false;
  }
}

/**
 * Checks if the character possesses feats/features that waive Long Range Disadvantage
 * on ranged attacks (e.g. Sharpshooter, Spell Sniper).
 */
export function hasLongRangeDisadvantageBypass(character?: DDBParsedCharacter | null): boolean {
  if (!character) return false;

  try {
    const loose = character as unknown as Record<string, unknown>;
    const catalog = [
      ...collectFeatureNames(character.actions?.map((a) => a.name)),
      ...collectFeatureNames(loose.options),
      ...collectFeatureNames(loose.features),
      ...collectFeatureNames(loose.feats),
      ...collectFeatureNames(loose.classFeatures),
    ];

    return catalog.some((raw) => {
      const name = raw.toLowerCase();
      return name.includes("sharpshooter") || name.includes("spell sniper");
    });
  } catch {
    return false;
  }
}

/**
 * Reads explicit disposition from token metadata or vitals.
 */
export function getTokenDisposition(item: { metadata?: Record<string, unknown> } | null | undefined): TokenDisposition | null {
  if (!item?.metadata) return null;
  const raw =
    item.metadata[TOKEN_DISPOSITION_METADATA_KEY] ??
    item.metadata[LEGACY_TOKEN_DISPOSITION_METADATA_KEY] ??
    item.metadata["disposition"] ??
    item.metadata["faction"];

  if (raw === "friendly" || raw === "hostile" || raw === "neutral") {
    return raw;
  }

  const vitals = getScopedMetadata<TokenVitals>(item.metadata, "vitals");
  if (vitals?.disposition === "friendly" || vitals?.disposition === "hostile" || vitals?.disposition === "neutral") {
    return vitals.disposition;
  }

  return null;
}

/**
 * Pure function: Determines whether a candidate creature token is hostile to the caster.
 * Symmetric for both players and monsters, supporting DM overrides, mind control, and charm.
 */
export function isTokenHostileToCaster(
  candidate: Item,
  caster: Item,
  encounter?: CombatEncounter | null,
  candidateVitals?: TokenVitals | null
): boolean {
  if (!candidate || !caster || candidate.id === caster.id) {
    return false;
  }

  const candidateDisp = getTokenDisposition(candidate) ?? candidateVitals?.disposition;
  const casterDisp = getTokenDisposition(caster);

  // 1. Explicit candidate disposition overrides
  if (candidateDisp === "neutral") {
    return false;
  }

  const candComb = encounter?.combatants.find((c) => c.id === candidate.id || (c as any).tokenId === candidate.id);
  const casterComb = encounter?.combatants.find((c) => c.id === caster.id || (c as any).tokenId === caster.id);

  const isCasterMonster = Boolean(getScopedMetadata(caster.metadata, "bound-monster"));
  const isCasterPlayer = casterDisp === "friendly"
    ? true
    : casterDisp === "hostile"
    ? false
    : casterComb
    ? Boolean(casterComb.isPlayer)
    : !isCasterMonster;

  if (candidateDisp === "friendly") {
    return !isCasterPlayer;
  }

  if (candidateDisp === "hostile") {
    return isCasterPlayer;
  }

  // 2. Condition checks on candidate (e.g. Crown of Madness, Dominated, Charmed)
  const rawConditions = [
    ...(candidateVitals?.conditions ?? []),
    ...(candComb?.conditions ?? []),
  ];
  const conditions = rawConditions.map((c) => c.trim().toLowerCase());

  if (conditions.includes("charmed")) {
    return false;
  }

  const isCandidateMonster = Boolean(getScopedMetadata(candidate.metadata, "bound-monster"));
  const isCandidatePlayer = candidateDisp === "friendly"
    ? true
    : candidateDisp === "hostile"
    ? false
    : candComb
    ? Boolean(candComb.isPlayer)
    : Boolean(getLinkedDDBCharacterId(candidate));

  if (conditions.includes("crown of madness") || conditions.includes("dominated")) {
    if (isCasterPlayer && isCandidatePlayer) {
      return true;
    }
    if (!isCasterPlayer && !isCandidatePlayer) {
      return true;
    }
  }

  // 3. Active Encounter state
  if (candComb && casterComb) {
    if (candComb.disposition && candComb.disposition !== "neutral") {
      return candComb.disposition === "hostile" ? isCasterPlayer : !isCasterPlayer;
    }
    return Boolean(candComb.isPlayer) !== Boolean(casterComb.isPlayer);
  } else if (candComb) {
    if (candComb.disposition && candComb.disposition !== "neutral") {
      return candComb.disposition === "hostile" ? isCasterPlayer : !isCasterPlayer;
    }
    return Boolean(candComb.isPlayer) !== isCasterPlayer;
  }

  // 4. Data-binding fallback
  if (isCasterPlayer) {
    return isCandidateMonster || !isCandidatePlayer;
  }

  if (isCasterMonster) {
    return isCandidatePlayer;
  }

  return isCandidateMonster !== isCasterMonster;
}

/**
 * Checks whether a token is incapacitated or dead (HP <= 0, defeated, or incapacitating conditions).
 */
export function isTokenIncapacitatedOrDefeated(
  vitals?: TokenVitals | null,
  combatant?: Combatant | null
): boolean {
  if (combatant?.isDefeated) return true;
  if (vitals?.hpCurrent != null && vitals.hpCurrent <= 0) return true;

  const conditions = [
    ...(vitals?.conditions ?? []),
    ...(combatant?.conditions ?? []),
  ].map((c) => c.trim().toLowerCase());

  return conditions.some((c) => INCAPACITATING_CONDITIONS.has(c));
}

/**
 * Checks whether a hostile threat can see the caster (D&D 5e: "a hostile creature who can see you").
 */
export function canTokenSeeCaster(
  threatToken: Item,
  _casterToken: Item,
  threatVitals?: TokenVitals | null,
  casterVitals?: TokenVitals | null,
  threatCombatant?: Combatant | null
): boolean {
  const threatConditions = [
    ...(threatVitals?.conditions ?? []),
    ...(threatCombatant?.conditions ?? []),
  ].map((c) => c.trim().toLowerCase());
  if (threatConditions.includes("blinded")) {
    return false;
  }

  const casterConditions = (casterVitals?.conditions ?? []).map((c) => c.trim().toLowerCase());
  if (casterConditions.includes("invisible")) {
    const bound = getScopedMetadata<any>(threatToken.metadata, "bound-monster");
    const senses = (bound?.senses ?? "").toLowerCase();
    const hasSight = senses.includes("blindsight") || senses.includes("truesight") || senses.includes("tremorsense");
    if (!hasSight) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if any adjacent hostile creature imposes Close Combat Disadvantage on the caster.
 * Distance threshold: <= 5.5 ft (covers adjacent orthogonal and diagonal cells on standard grid).
 */
export function checkCloseCombatThreat(
  _casterPos: Vector2,
  sceneItems: Item[],
  grid: { dpi: number; scaleMultiplier: number },
  casterToken: Item,
  encounter?: CombatEncounter | null,
  character?: DDBParsedCharacter | null,
  vitalsMap?: Map<string, TokenVitals>
): CloseCombatThreatResult {
  if (hasCloseCombatDisadvantageBypass(character)) {
    return { isThreatened: false, threateningTokens: [] };
  }

  const threateningTokens: Item[] = [];
  const casterVitals = vitalsMap?.get(casterToken.id) ?? getScopedMetadata<TokenVitals>(casterToken.metadata, "vitals");

  for (const item of sceneItems) {
    if (!isValidCombatTargetToken(item)) continue;
    if (item.id === casterToken.id) continue;

    const distFeet = calculateTokenEdgeDistanceFeet(item, casterToken, grid);
    if (distFeet > 5.5) continue;

    const itemVitals = vitalsMap?.get(item.id) ?? getScopedMetadata<TokenVitals>(item.metadata, "vitals");
    const itemCombatant = encounter?.combatants.find((c) => c.id === item.id || (c as any).tokenId === item.id);

    if (isTokenIncapacitatedOrDefeated(itemVitals, itemCombatant)) {
      continue;
    }

    if (!isTokenHostileToCaster(item, casterToken, encounter, itemVitals)) {
      continue;
    }

    if (!canTokenSeeCaster(item, casterToken, itemVitals, casterVitals, itemCombatant)) {
      continue;
    }

    threateningTokens.push(item);
  }

  if (threateningTokens.length > 0) {
    return {
      isThreatened: true,
      threateningTokens,
      reason: "Close Combat (Foe within 5 ft)",
    };
  }

  return { isThreatened: false, threateningTokens: [] };
}
