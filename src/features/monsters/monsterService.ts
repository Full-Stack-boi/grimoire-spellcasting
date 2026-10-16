async function getOBR() {
  const sdk = await import("@owlbear-rodeo/sdk");
  return sdk.default;
}
import { APP_KEY, LEGACY_APP_KEY } from "../../config";
import { getScopedMetadata, getMetadataKey } from "../../platform/obr/metadataHelper";
import { applyDamage, setTokenVitals, getTokenVitals } from "../combat/tokenVitalsService";
import {
  rollSingleCombatantInitiative,
  updateCombatant,
  getActiveEncounter,
  addCombatantsToEncounter,
  saveEncounter,
  buildCombatantFromItem,
} from "../combat/initiativeService";
import { broadcastDDBRoll } from "../../services/rollLogService";
import { rollAttack, rollDamageDDB, rollFormula } from "../../utils/dice";
import type {
  DDBDamageComponent,
  DDBRollCardData,
  DDBTargetSaveResolution,
} from "../../types/ddbRollLog";
import type { MonsterStatblock, MonsterAction, MonsterFilterQuery } from "./domain/types";
import { hasResolvableSaveDamage, parseMonsterSaveMechanics } from "./domain/monsterSaveMechanics";
import { SRD_MONSTERS } from "./data/srdMonsters";
import { GLOBAL_STORAGE_KEYS, getGlobalSettingsValue } from "../../components/Settings/settings";

export const BOUND_MONSTER_METADATA_KEY = getMetadataKey("bound-monster");
export const CUSTOM_MONSTERS_STORAGE_KEY = `${APP_KEY}/custom-monsters`;

/**
 * Retrieve custom user-imported monsters from localStorage.
 */
export function getCustomMonsters(): MonsterStatblock[] {
  try {
    const raw = localStorage.getItem(CUSTOM_MONSTERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MonsterStatblock[];
  } catch {
    return [];
  }
}

const SRD_MONSTER_IDS = new Set(SRD_MONSTERS.map((s) => s.id));

/**
 * Returns true if the monster is a built-in default SRD monster.
 */
export function isDefaultMonster(monsterOrId: MonsterStatblock | string): boolean {
  const id = typeof monsterOrId === "string" ? monsterOrId : monsterOrId.id;
  return SRD_MONSTER_IDS.has(id);
}

/**
 * Returns true if the monster was created or imported by the user.
 */
export function isCustomMonster(monsterOrId: MonsterStatblock | string): boolean {
  return !isDefaultMonster(monsterOrId);
}

/**
 * Save a custom monster to localStorage.
 */
export function saveCustomMonster(monster: MonsterStatblock): void {
  if (isDefaultMonster(monster)) {
    console.warn(`Cannot overwrite default monster "${monster.name}" (${monster.id})`);
    return;
  }
  try {
    const list = getCustomMonsters().filter((m) => m.id !== monster.id);
    list.unshift(monster);
    localStorage.setItem(CUSTOM_MONSTERS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save custom monster:", err);
  }
}

/**
 * Delete a custom monster from localStorage.
 */
export function deleteCustomMonster(id: string): void {
  try {
    const list = getCustomMonsters().filter((m) => m.id !== id);
    localStorage.setItem(CUSTOM_MONSTERS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Failed to delete custom monster:", err);
    throw err;
  }
}

/**
 * Retrieve all available monsters (Built-in SRD 2024 & 2014 Legacy + Custom user imports).
 */
export function getAllMonsters(): MonsterStatblock[] {
  const custom = getCustomMonsters();
  const customIds = new Set(custom.map((c) => c.id));
  const filteredSrd = SRD_MONSTERS.filter((s) => !customIds.has(s.id));
  return [...custom, ...filteredSrd];
}

/**
 * Filter monsters by search keyword, challenge rating, monster type, and edition.
 */
export function filterMonsters(
  monsters: MonsterStatblock[],
  query: MonsterFilterQuery
): MonsterStatblock[] {
  return monsters.filter((m) => {
    // 1. Search (name, subtype, actions)
    if (query.search && query.search.trim()) {
      const term = query.search.toLowerCase().trim();
      const nameMatch = m.name.toLowerCase().includes(term);
      const subtypeMatch = m.subtype?.toLowerCase().includes(term);
      const typeMatch = m.type.toLowerCase().includes(term);
      if (!nameMatch && !subtypeMatch && !typeMatch) {
        return false;
      }
    }

    // 2. Challenge Rating
    if (query.cr && query.cr !== "ALL") {
      if (m.challengeRating !== query.cr) {
        return false;
      }
    }

    // 3. Type
    if (query.type && query.type !== "ALL") {
      if (m.type.toLowerCase() !== query.type.toLowerCase()) {
        return false;
      }
    }

    // 4. Edition (2024 vs 2014 Legacy)
    if (query.edition && query.edition !== "ALL") {
      if (query.edition === "2024") {
        if (m.edition !== "2024" || m.isLegacy) return false;
      } else if (query.edition === "2014") {
        if (m.edition !== "2014" && !m.isLegacy) return false;
      }
    }

    return true;
  });
}

/**
 * Read bound monster from OBR item metadata.
 */
export function getBoundMonsterFromToken(item: {
  metadata?: Record<string, unknown>;
}): MonsterStatblock | null {
  const data = getScopedMetadata<MonsterStatblock | string>(item.metadata, "bound-monster");
  if (!data) return null;

  if (typeof data === "object" && data !== null && "name" in data && "armorClass" in data) {
    return data as MonsterStatblock;
  }

  if (typeof data === "string") {
    const found = getAllMonsters().find((m) => m.id === data);
    return found || null;
  }

  return null;
}

export interface TokenColorMarker {
  color: string;
  label: string;
  emoji: string;
  hex: string;
}

const COLOR_DEFS: Record<string, { label: string; emoji: string; hex: string }> = {
  red: { label: "Red", emoji: "🔴", hex: "#ef4444" },
  blue: { label: "Blue", emoji: "🔵", hex: "#3b82f6" },
  green: { label: "Green", emoji: "🟢", hex: "#22c55e" },
  yellow: { label: "Yellow", emoji: "🟡", hex: "#eab308" },
  purple: { label: "Purple", emoji: "🟣", hex: "#a855f7" },
  orange: { label: "Orange", emoji: "🟠", hex: "#f97316" },
  white: { label: "White", emoji: "⚪", hex: "#f8fafc" },
  black: { label: "Black", emoji: "⚫", hex: "#1e293b" },
  pink: { label: "Pink", emoji: "🌸", hex: "#ec4899" },
  cyan: { label: "Cyan", emoji: "🩵", hex: "#06b6d4" },
  brown: { label: "Brown", emoji: "🟤", hex: "#854d0e" },
};

const EMOJI_TO_COLOR: Record<string, string> = {
  "🔴": "red",
  "🔵": "blue",
  "🟢": "green",
  "🟡": "yellow",
  "🟣": "purple",
  "🟠": "orange",
  "⚪": "white",
  "⚫": "black",
  "🌸": "pink",
  "🩷": "pink",
  "🩵": "cyan",
  "🟤": "brown",
};

const COLOR_WORD_MAP: Record<string, string> = {
  red: "red",
  แดง: "red",
  blue: "blue",
  น้ำเงิน: "blue",
  ฟ้า: "blue",
  green: "green",
  เขียว: "green",
  yellow: "yellow",
  เหลือง: "yellow",
  purple: "purple",
  violet: "purple",
  ม่วง: "purple",
  orange: "orange",
  ส้ม: "orange",
  white: "white",
  ขาว: "white",
  black: "black",
  ดำ: "black",
  pink: "pink",
  ชมพู: "pink",
  cyan: "cyan",
  brown: "brown",
  น้ำตาล: "brown",
};

/**
 * Extract an optional color marker (emoji, hex, label) from a token name.
 * Supports:
 * - Direct emoji in name (e.g. "Goblin 🔴", "🔵 Shaman")
 * - Bracketed tags (e.g. "Goblin (Red)", "Goblin [Blue]", "Goblin (เขียว)")
 * - Word tags (e.g. "Red Goblin", "Goblin Green")
 * If baseMonsterName is provided (e.g. "Red Dragon"), color words that are
 * an intrinsic part of the base monster name are ignored unless an explicit
 * bracketed marker or emoji is present.
 */
export function extractTokenColorMarker(
  name: string,
  baseMonsterName?: string
): TokenColorMarker | null {
  if (!name || typeof name !== "string") return null;

  // 1. Direct emoji in token name
  for (const [emoji, colorKey] of Object.entries(EMOJI_TO_COLOR)) {
    if (name.includes(emoji)) {
      const def = COLOR_DEFS[colorKey];
      return { color: colorKey, ...def };
    }
  }

  // 2. Bracketed or parenthesized color tags: (Red), [Blue], {Green}, (แดง)
  const bracketMatch = name.match(/[\(\[\{]([^\)\]\}]+)[\)\]\}]/);
  if (bracketMatch) {
    const inside = bracketMatch[1].trim().toLowerCase();
    for (const [word, colorKey] of Object.entries(COLOR_WORD_MAP)) {
      if (inside === word || inside.includes(word)) {
        const def = COLOR_DEFS[colorKey];
        return { color: colorKey, ...def };
      }
    }
  }

  // 3. Delimited word matching
  const words = Object.keys(COLOR_WORD_MAP).join("|");
  const regex = new RegExp(`(?:^|[\\s(\\[{_.-])(${words})(?:$|[\\s)\\]}_.-])`, "i");
  const match = name.match(regex);
  if (match) {
    const matchedWord = match[1].toLowerCase();
    const colorKey = COLOR_WORD_MAP[matchedWord];
    if (colorKey) {
      if (baseMonsterName) {
        const baseLower = baseMonsterName.toLowerCase();
        // If the base monster name itself contains this color word (e.g. "Red Dragon"),
        // ignore it unless the token has an explicit color modifier.
        if (baseLower.includes(matchedWord)) {
          return null;
        }
      }
      const def = COLOR_DEFS[colorKey];
      return { color: colorKey, ...def };
    }
  }

  return null;
}

/**
 * Resolves the next token name when binding a monster statblock:
 * 1. Preserves existing custom names (e.g. "Goblin Boss", "Snaga", "Goblin 1", "Goblin (Red)").
 * 2. If the token has a default/blank/generic name ("Token", "Character", "") or the bare monster name:
 *    - If no other tokens of that monster exist on the scene, uses the base monster name (e.g. "Goblin").
 *    - If other tokens of that monster exist, assigns the next sequential index (e.g. "Goblin 2", "Goblin 3").
 */
export function resolveNextTokenName(
  currentTokenName: string | undefined,
  monsterName: string,
  sceneItems: Array<{ id: string; name?: string }>,
  currentTokenId: string
): string {
  const trimmedCurrent = currentTokenName?.trim() || "";
  const genericNames = new Set(["token", "character", "default", "monster", ""]);

  // If the token has a custom name that is neither generic nor bare monsterName (case-insensitive),
  // preserve it completely!
  if (
    trimmedCurrent &&
    !genericNames.has(trimmedCurrent.toLowerCase()) &&
    trimmedCurrent.toLowerCase() !== monsterName.trim().toLowerCase()
  ) {
    return trimmedCurrent;
  }

  // Filter other scene items (excluding currentTokenId)
  const escapedBase = monsterName.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Matches "Goblin", "Goblin 1", "Goblin 2", "Goblin #2", "Goblin - 2"
  const pattern = new RegExp(`^${escapedBase}(?:\\s*(?:#|-)?\\s*(\\d+))?$`, "i");

  const matchingIndices: number[] = [];

  for (const item of sceneItems) {
    if (item.id === currentTokenId) continue;
    const itemName = item.name?.trim();
    if (!itemName) continue;

    const match = itemName.match(pattern);
    if (match) {
      if (match[1]) {
        matchingIndices.push(parseInt(match[1], 10));
      } else {
        // A token with the exact base name (e.g. "Goblin") takes index 1
        matchingIndices.push(1);
      }
    }
  }

  if (matchingIndices.length === 0) {
    return monsterName.trim();
  }

  const maxIndex = Math.max(...matchingIndices, 1);
  const nextIndex = maxIndex + 1;
  return `${monsterName.trim()} ${nextIndex}`;
}

/**
 * Bind a monster statblock to an OBR token on the active scene.
 * - Sets token name (with smart auto-indexing for swarms/mobs and color tags preserved)
 * - Sets token vitals (HP, AC, Resistances, Immunities, Vulnerabilities)
 * - Persists bound-monster metadata for instant retrieval
 * - Syncs with active Combat Encounter if combatant exists
 */
export async function bindMonsterToToken(
  tokenId: string,
  monster: MonsterStatblock,
  options?: { rollHp?: boolean }
): Promise<boolean> {
  const OBR = await getOBR();
  if (!OBR.isReady) return false;

  try {
    // 1. Calculate HP (rolled or average)
    let hp = monster.hitPoints.average;
    if (options?.rollHp && monster.hitPoints.formula) {
      const rolled = rollFormula(monster.hitPoints.formula).total;
      if (rolled > 0 && !isNaN(rolled)) {
        hp = rolled;
      }
    }

    // 2. Fetch current scene items to resolve smart auto-indexed name
    let finalTokenName = monster.name;
    try {
      const sceneItems = await OBR.scene.items.getItems();
      const currentToken = sceneItems.find((it) => it.id === tokenId);
      finalTokenName = resolveNextTokenName(
        currentToken?.name,
        monster.name,
        sceneItems,
        tokenId
      );
    } catch (e) {
      console.warn("Failed to query scene items for token naming, falling back to monster name:", e);
    }

    // 3. Update OBR Scene Item Name and Bound Monster metadata
    await OBR.scene.items.updateItems([tokenId], (items) => {
      for (const item of items) {
        if (item.id === tokenId) {
          item.name = finalTokenName;
          item.metadata[BOUND_MONSTER_METADATA_KEY] = monster;
        }
      }
    });

    // 4. Set Token Vitals
    await setTokenVitals(tokenId, {
      hpMax: hp,
      hpCurrent: hp,
      hpTemp: 0,
      armorClass: monster.armorClass,
      resistances: [...(monster.damageResistances || [])],
      immunities: [...(monster.damageImmunities || [])],
      vulnerabilities: [...(monster.damageVulnerabilities || [])],
    });

    // 5. Update combatant in active encounter if present
    try {
      const encounter = await getActiveEncounter();
      if (encounter) {
        const combatant = encounter.combatants.find((c) => c.id === tokenId);
        if (combatant) {
          await updateCombatant(tokenId, {
            name: finalTokenName,
            hpMax: hp,
            hpCurrent: hp,
            ac: monster.armorClass,
            resistances: [...(monster.damageResistances || [])],
            immunities: [...(monster.damageImmunities || [])],
            vulnerabilities: [...(monster.damageVulnerabilities || [])],
          });
        }
      }
    } catch {
      // Encounter tracking might not be active or scene metadata unavailable
    }

    try {
      await OBR.notification.show(`Bound "${finalTokenName}" to token.`, "SUCCESS");
    } catch {
      // Ignore notification failures
    }

    return true;
  } catch (err) {
    console.error("Failed to bind monster to token:", err);
    return false;
  }
}

/**
 * Unbind a monster statblock from an OBR token on the active scene.
 * - Removes bound monster metadata (both primary and legacy keys)
 * - Shows notification
 */
export async function unbindMonsterFromToken(tokenId: string): Promise<boolean> {
  const OBR = await getOBR();
  if (!OBR.isReady) return false;

  try {
    let unboundName = "Token";
    await OBR.scene.items.updateItems([tokenId], (items) => {
      for (const item of items) {
        if (item.id === tokenId) {
          unboundName = item.name || "Token";
          delete item.metadata[BOUND_MONSTER_METADATA_KEY];
          delete item.metadata[`${LEGACY_APP_KEY}/bound-monster`];
        }
      }
    });

    try {
      await OBR.notification.show(`Unbound monster from "${unboundName}".`, "DEFAULT");
    } catch {
      // Ignore notification failures
    }

    return true;
  } catch (err) {
    console.error("Failed to unbind monster from token:", err);
    return false;
  }
}

/**
 * Update any active scene tokens bound to this monster when the statblock is edited.
 * - Updates token's BOUND_MONSTER_METADATA_KEY with the latest statblock data
 * - Updates token's vitals (AC, resistances, immunities, vulnerabilities)
 * - Updates combatant in active encounter if present
 */
export async function updateBoundMonsterOnTokens(
  updatedMonster: MonsterStatblock
): Promise<void> {
  const OBR = await getOBR();
  if (!OBR.isReady) return;

  try {
    const sceneItems = await OBR.scene.items.getItems();
    const matchingItemIds: string[] = [];

    for (const item of sceneItems) {
      const bound = getBoundMonsterFromToken(item);
      if (bound && bound.id === updatedMonster.id) {
        matchingItemIds.push(item.id);
      }
    }

    if (matchingItemIds.length === 0) return;

    // 1. Update bound-monster metadata on all matching tokens
    await OBR.scene.items.updateItems(matchingItemIds, (items) => {
      for (const item of items) {
        item.metadata[BOUND_MONSTER_METADATA_KEY] = updatedMonster;
      }
    });

    // 2. Update vitals for each token
    for (const id of matchingItemIds) {
      try {
        const vitals = await getTokenVitals(id);
        if (vitals) {
          await setTokenVitals(id, {
            ...vitals,
            armorClass: updatedMonster.armorClass,
            resistances: [...(updatedMonster.damageResistances || [])],
            immunities: [...(updatedMonster.damageImmunities || [])],
            vulnerabilities: [...(updatedMonster.damageVulnerabilities || [])],
          });
        }
      } catch (err) {
        console.warn(`Failed to update vitals for token ${id}:`, err);
      }
    }

    // 3. Update combatants in active encounter if present
    try {
      const encounter = await getActiveEncounter();
      if (encounter) {
        for (const id of matchingItemIds) {
          const combatant = encounter.combatants.find((c) => c.id === id);
          if (combatant) {
            await updateCombatant(id, {
              ac: updatedMonster.armorClass,
              resistances: [...(updatedMonster.damageResistances || [])],
              immunities: [...(updatedMonster.damageImmunities || [])],
              vulnerabilities: [...(updatedMonster.damageVulnerabilities || [])],
            });
          }
        }
      }
    } catch {
      // Encounter tracking not active
    }
  } catch (err) {
    console.error("Failed to update bound monster on scene tokens:", err);
  }
}

/**
 * Execute a monster action roll (Attack + Damage or Ability Save).
 * Hit resolution follows the monster hit-resolution setting.
 */
function rollActionDamage(
  action: MonsterAction,
  isCrit: boolean,
): { total: number; breakdown: string; components: DDBDamageComponent[] } {
  const sourceComponents = action.damageComponents?.length
    ? action.damageComponents
    : action.damage
      ? [{ formula: action.damage, damageType: action.damageType || "" }]
      : [];
  const components = sourceComponents.map((component) => {
    const result = rollDamageDDB(
      component.formula,
      component.damageType,
      action.name,
      isCrit,
    );
    return {
      total: result.total,
      damageType: component.damageType,
      diceBreakdown: result.breakdown,
      formula: component.formula,
    };
  });
  return {
    total: components.reduce((sum, component) => sum + component.total, 0),
    breakdown: components
      .map((component) => `${component.total} ${component.damageType} (${component.diceBreakdown})`)
      .join(" + "),
    components,
  };
}

export async function rollMonsterSaveAction(
  action: MonsterAction,
  casterName: string,
  targets: Array<{ id: string; name: string }>,
): Promise<DDBRollCardData> {
  const mechanics = parseMonsterSaveMechanics(action);
  const damageRes = rollActionDamage(action, false);
  const canResolveTargets = hasResolvableSaveDamage(action, mechanics);
  const targetSaveResolutions: DDBTargetSaveResolution[] =
    canResolveTargets && mechanics.saveStat && mechanics.saveDc !== undefined
      ? targets.map((target) => ({
          targetId: target.id,
          targetName: target.name,
          saveAbility: mechanics.saveStat!.toUpperCase(),
          saveDc: mechanics.saveDc!,
          successDamageMultiplier: mechanics.successDamageMultiplier!,
          failureDamageMultiplier: mechanics.failureDamageMultiplier!,
          damageResolutionStatus: "pending",
        }))
      : [];
  const targetNames = targets.map((target) => target.name).filter(Boolean);
  const targetSummary =
    targetNames.length === 1
      ? targetNames[0]
      : targetNames.length > 1
        ? `${targetNames.length} targets`
        : undefined;
  const requiresManualDamageAdjudication =
    mechanics.hasSavingThrow &&
    (!canResolveTargets || targets.length === 0);
  const cardId = `roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const damageCard: DDBRollCardData = {
    id: `${cardId}-damage`,
    casterName,
    targetName: canResolveTargets ? targetSummary : undefined,
    actionName: action.name.toUpperCase(),
    actionType: "DAMAGE",
    dieType: Number(action.damage?.match(/d(\d+)/i)?.[1] ?? 10),
    diceBreakdown: damageRes.breakdown || action.name,
    formula: damageRes.components.map((component) => `${component.formula} ${component.damageType}`.trim()).join(" + ") || "-",
    total: damageRes.total > 0 ? damageRes.total : "-",
    subtitle: requiresManualDamageAdjudication
      ? `Damage rolled: ${damageRes.total} (${damageRes.breakdown}). ${mechanics.hasConflictingData ? "Save data conflicts" : "Save/target data is incomplete"}; DM adjudication required.`
      : `Damage: ${damageRes.total} (${damageRes.breakdown})${mechanics.saveDc && mechanics.saveStat ? ` • DC ${mechanics.saveDc} ${mechanics.saveStat.toUpperCase()} save` : ""}`,
    pendingDamage: damageRes.total > 0 && !requiresManualDamageAdjudication ? damageRes.total : undefined,
    damageType: action.damageType || damageRes.components[0]?.damageType,
    damageComponents: damageRes.components.length > 0 ? damageRes.components : undefined,
    damageResolutionStatus:
      damageRes.total > 0 && !requiresManualDamageAdjudication ? "pending" : undefined,
    targetSaveResolutions:
      targetSaveResolutions.length > 0 ? targetSaveResolutions : undefined,
    requiresManualDamageAdjudication,
    timestamp: Date.now(),
  };
  const cards: DDBRollCardData[] = [];
  if (mechanics.hasSavingThrow && mechanics.saveDc !== undefined && mechanics.saveStat) {
    cards.push({
      id: `${cardId}-save`,
      casterName,
      targetName: targetSummary,
      actionName: action.name.toUpperCase(),
      actionType: "SAVE",
      dieType: 20,
      diceBreakdown: `DC ${mechanics.saveDc}`,
      formula: `${mechanics.saveStat.toUpperCase()} Save`,
      total: `DC ${mechanics.saveDc}`,
      subtitle: mechanics.hasConflictingData
        ? "Save details conflict; DM adjudication required."
        : `Each affected target makes a ${mechanics.saveStat.toUpperCase()} saving throw`,
      timestamp: Date.now(),
    });
  }
  cards.push(damageCard);
  await broadcastDDBRoll(cards);
  return damageCard;
}

export async function rollMonsterAction(
  monster: MonsterStatblock,
  action: MonsterAction,
  targetToken?: { id: string; name: string } | null,
  rollMode: "normal" | "advantage" | "disadvantage" = "normal",
  casterNameOverride?: string
): Promise<DDBRollCardData> {
  const isAttack =
    action.type === "melee_attack" ||
    action.type === "ranged_attack" ||
    typeof action.attackBonus === "number";

  const cardId = `roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const legacyBadge = monster.isLegacy ? " [Legacy]" : "";
  const casterName = casterNameOverride || `${monster.name}${legacyBadge}`;
  const saveMechanics = parseMonsterSaveMechanics(action);

  if (
    !isAttack &&
    saveMechanics.hasSavingThrow &&
    (action.damage || action.damageComponents?.length)
  ) {
    return rollMonsterSaveAction(
      action,
      casterName,
      targetToken ? [{ id: targetToken.id, name: targetToken.name }] : [],
    );
  }

  // If this is an attack roll
  if (isAttack) {
    const attackBonus = action.attackBonus ?? 0;
    const attackRes = rollAttack(attackBonus, action.name, rollMode);

    const hitResolutionMode = await getGlobalSettingsValue(
      GLOBAL_STORAGE_KEYS.MONSTER_HIT_RESOLUTION_MODE,
    ).catch(() => "gm_approval");
    const requiresHitApproval = hitResolutionMode !== "auto_ac";
    const damageApplicationMode = await getGlobalSettingsValue(
      GLOBAL_STORAGE_KEYS.DAMAGE_APPLICATION_MODE,
    ).catch(() => "gm_approval");

    let targetAc: number | undefined;
    if (targetToken?.id) {
      const targetVitals = await getTokenVitals(targetToken.id);
      if (typeof targetVitals?.armorClass === "number") {
        targetAc = targetVitals.armorClass;
      }
    }

    const automaticHit =
      attackRes.isCrit ||
      (!attackRes.isMiss &&
        typeof targetAc === "number" &&
        attackRes.total >= targetAc);
    const shouldOfferDamage = requiresHitApproval
      ? !attackRes.isMiss
      : automaticHit;

    let damageTotal = 0;
    let damageBreakdown = "";
    let damageComponents: DDBDamageComponent[] = [];
    if ((action.damage || action.damageComponents?.length) && shouldOfferDamage) {
      const damageRes = rollActionDamage(action, attackRes.isCrit);
      damageTotal = damageRes.total;
      damageBreakdown = damageRes.breakdown;
      damageComponents = damageRes.components;
    }
    let appliedDamageAmount: number | undefined;
    let resolutionNote: string | undefined;
    let damageResolutionStatus: "pending" | "applied" | undefined =
      damageTotal > 0 ? "pending" : undefined;
    if (
      damageTotal > 0 &&
      !requiresHitApproval &&
      damageApplicationMode === "auto" &&
      targetToken?.id
    ) {
      appliedDamageAmount = 0;
      const notes: string[] = [];
      for (const component of damageComponents) {
        const damageResult = await applyDamage(
          targetToken.id,
          component.total,
          component.damageType,
        );
        appliedDamageAmount += damageResult?.effectiveDamage ?? component.total;
        if (damageResult?.defenseNote) notes.push(damageResult.defenseNote);
      }
      resolutionNote = notes.join("; ") || undefined;
      damageResolutionStatus = "applied";
    }

    const isHit = attackRes.isMiss
      ? false
      : requiresHitApproval
        ? undefined
        : automaticHit;
    const hitLabel = attackRes.isMiss
      ? "CRITICAL MISS"
      : requiresHitApproval
        ? "AWAITING DM HIT APPROVAL"
        : attackRes.isCrit
          ? "CRITICAL HIT!"
          : typeof targetAc === "number"
            ? automaticHit
              ? `HIT (vs AC ${targetAc})`
              : `MISS (vs AC ${targetAc})`
            : undefined;

    const card: DDBRollCardData = {
      id: cardId,
      casterName,
      targetName: targetToken?.name,
      targetId: targetToken?.id,
      actionName: action.name.toUpperCase(),
      actionType: "ATTACK",
      dieType: 20,
      diceBreakdown: attackRes.formatted,
      formula: `1d20${attackBonus >= 0 ? `+${attackBonus}` : attackBonus}`,
      total: attackRes.total,
      subtitle: damageTotal > 0
        ? `${requiresHitApproval ? "Pending DM hit approval • " : ""}Damage: ${damageTotal} (${damageBreakdown})`
        : action.description,
      isCrit: attackRes.isCrit,
      isMiss: attackRes.isMiss,
      rollD20: attackRes.d20,
      attackTotal: attackRes.total,
      targetAc,
      isHit,
      hitLabel,
      pendingDamage: damageTotal > 0 ? damageTotal : undefined,
      requiresHitApproval: requiresHitApproval && damageTotal > 0,
      hitApprovalStatus: requiresHitApproval && damageTotal > 0 ? "pending" : undefined,
      damageType: action.damageType,
      damageComponents: damageComponents.length > 1 ? damageComponents : undefined,
      damageResolutionStatus,
      appliedDamageAmount,
      resolutionNote,
      timestamp: Date.now(),
      rollMode,
      isAdvantage: rollMode === "advantage",
      isDisadvantage: rollMode === "disadvantage",
    };

    await broadcastDDBRoll([card]);
    return card;
  }

  // If this is a damage-only / DC save ability
  let damageTotal = 0;
  let damageBreakdown = "";
  let damageComponents: DDBDamageComponent[] = [];
  if (action.damage || action.damageComponents?.length) {
    const damageRes = rollActionDamage(action, false);
    damageTotal = damageRes.total;
    damageBreakdown = damageRes.breakdown;
    damageComponents = damageRes.components;
  }

  const saveText = action.saveDc && action.saveStat
    ? `DC ${action.saveDc} ${action.saveStat.toUpperCase()} Save`
    : "";

  const card: DDBRollCardData = {
    id: cardId,
    casterName,
    targetName: targetToken?.name,
    targetId: targetToken?.id,
    actionName: action.name.toUpperCase(),
    actionType: damageTotal > 0 ? "DAMAGE" : "CHECK",
    dieType: 20,
    diceBreakdown: damageBreakdown || action.name,
    formula: damageComponents.map((component) => component.formula).join(" + ") || "-",
    total: damageTotal > 0 ? damageTotal : "-",
    subtitle: damageTotal > 0
      ? `${saveText ? `${saveText} • ` : ""}Damage: ${damageTotal} (${damageBreakdown})`
      : action.description,
    pendingDamage: damageTotal > 0 ? damageTotal : undefined,
    damageType: action.damageType,
    damageComponents: damageComponents.length > 1 ? damageComponents : undefined,
    damageResolutionStatus: damageTotal > 0 ? "pending" : undefined,
    timestamp: Date.now(),
  };

  await broadcastDDBRoll([card]);
  return card;
}

/**
 * Roll initiative for a monster bound to a token and enroll it in the turn tracker.
 */
export async function rollMonsterInitiative(
  monster: MonsterStatblock,
  tokenId: string,
  mode: "normal" | "advantage" | "disadvantage" = "normal"
): Promise<number> {
  const dexMod = Math.floor((monster.stats.dex - 10) / 2);

  // If token is not yet enrolled, enroll it first; or update if stale
  let encounter = await getActiveEncounter();
  if (encounter) {
    const existing = encounter.combatants.find((c) => c.id === tokenId);
    if (!existing) {
      const OBRInstance = (await import("@owlbear-rodeo/sdk")).default;
      if (OBRInstance.isReady) {
        const items = await OBRInstance.scene.items.getItems([tokenId]);
        if (items[0]) {
          const combatant = buildCombatantFromItem(items[0] as any);
          combatant.name = items[0].name || monster.name;
          combatant.initiativeBonus = dexMod;
          combatant.ac = monster.armorClass;
          combatant.hpMax = monster.hitPoints.average;
          combatant.hpCurrent = monster.hitPoints.average;
          encounter = addCombatantsToEncounter(encounter, [combatant]);
          await saveEncounter(encounter);
        }
      }
    } else if (existing.hpMax === undefined || existing.ac === 10) {
      await updateCombatant(tokenId, {
        ac: monster.armorClass,
        hpMax: monster.hitPoints.average,
        hpCurrent: existing.hpCurrent ?? monster.hitPoints.average,
        initiativeBonus: dexMod,
      });
    }
  }

  const res = await rollSingleCombatantInitiative(tokenId, mode);
  const total = res?.total ?? (10 + dexMod);

  // Also broadcast initiative roll card
  const card: DDBRollCardData = {
    id: `init-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    casterName: `${monster.name}${monster.isLegacy ? " [Legacy]" : ""}`,
    actionName: "INITIATIVE",
    actionType: "CHECK",
    dieType: 20,
    diceBreakdown: res ? `[${res.selectedD20}] ${dexMod >= 0 ? `+ ${dexMod}` : `- ${Math.abs(dexMod)}`}` : `${total}`,
    formula: `1d20${dexMod >= 0 ? `+${dexMod}` : dexMod}`,
    total,
    subtitle: `Initiative Roll (${mode})`,
    timestamp: Date.now(),
  };

  await broadcastDDBRoll([card]);
  return total;
}

/**
 * Import monster JSON string (supports custom schema and standard 5e format).
 */
export function importMonsterFromJson(jsonStr: string): MonsterStatblock | null {
  try {
    const raw = JSON.parse(jsonStr);
    if (!raw || typeof raw !== "object" || !raw.name) {
      return null;
    }

    const id = raw.id || `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const edition = raw.edition === "2024" ? "2024" : "2014";
    const isLegacy = raw.isLegacy !== undefined ? Boolean(raw.isLegacy) : edition === "2014";

    const statblock: MonsterStatblock = {
      id,
      name: String(raw.name),
      source: raw.source || "Custom / D&D Beyond Import",
      edition,
      isLegacy,
      size: raw.size || "Medium",
      type: raw.type || "Humanoid",
      subtype: raw.subtype,
      alignment: raw.alignment || "Unaligned",
      armorClass: typeof raw.armorClass === "number" ? raw.armorClass : (raw.ac ?? 10),
      armorDesc: raw.armorDesc,
      hitPoints: {
        average: raw.hitPoints?.average ?? raw.hp ?? 10,
        formula: raw.hitPoints?.formula ?? raw.hpFormula ?? "2d8",
      },
      speed: raw.speed || "30 ft.",
      stats: {
        str: raw.stats?.str ?? raw.strength ?? 10,
        dex: raw.stats?.dex ?? raw.dexterity ?? 10,
        con: raw.stats?.con ?? raw.constitution ?? 10,
        int: raw.stats?.int ?? raw.intelligence ?? 10,
        wis: raw.stats?.wis ?? raw.wisdom ?? 10,
        cha: raw.stats?.cha ?? raw.charisma ?? 10,
      },
      savingThrows: raw.savingThrows,
      skills: raw.skills,
      damageResistances: Array.isArray(raw.damageResistances) ? raw.damageResistances : [],
      damageImmunities: Array.isArray(raw.damageImmunities) ? raw.damageImmunities : [],
      damageVulnerabilities: Array.isArray(raw.damageVulnerabilities) ? raw.damageVulnerabilities : [],
      conditionImmunities: Array.isArray(raw.conditionImmunities) ? raw.conditionImmunities : [],
      senses: raw.senses || "Passive Perception 10",
      languages: raw.languages || "Common",
      challengeRating: String(raw.challengeRating ?? raw.cr ?? "1"),
      proficiencyBonus: typeof raw.proficiencyBonus === "number" ? raw.proficiencyBonus : 2,
      traits: Array.isArray(raw.traits) ? raw.traits : [],
      actions: Array.isArray(raw.actions) ? raw.actions.map((act: any, idx: number) => {
        const action: MonsterAction = {
          id: act.id || `act_${idx}`,
          name: act.name || "Action",
          type: act.type || "melee_attack",
          attackBonus: act.attackBonus,
          reachFeet: act.reachFeet,
          rangeFeet: act.rangeFeet,
          rangeLongFeet: act.rangeLongFeet,
          damage: act.damage,
          damageType: act.damageType,
          damageComponents: Array.isArray(act.damageComponents) ? act.damageComponents : undefined,
          saveDc: act.saveDc,
          saveStat: act.saveStat,
          areaOfEffect: act.areaOfEffect,
          saveSuccessDamageMultiplier: act.saveSuccessDamageMultiplier,
          saveFailureDamageMultiplier: act.saveFailureDamageMultiplier,
          description: act.description || act.desc || "",
        };
        const mechanics = parseMonsterSaveMechanics(action);
        return {
          ...action,
          saveDc: mechanics.saveDc,
          saveStat: mechanics.saveStat,
          areaOfEffect: mechanics.areaOfEffect,
          saveSuccessDamageMultiplier: mechanics.successDamageMultiplier,
          saveFailureDamageMultiplier: mechanics.failureDamageMultiplier,
        };
      }) : [],
      bonusActions: Array.isArray(raw.bonusActions) ? raw.bonusActions : [],
      reactions: Array.isArray(raw.reactions) ? raw.reactions : [],
      legendaryActions: Array.isArray(raw.legendaryActions) ? raw.legendaryActions : [],
    };

    saveCustomMonster(statblock);
    return statblock;
  } catch (err) {
    console.error("Failed to parse monster JSON:", err);
    return null;
  }
}
