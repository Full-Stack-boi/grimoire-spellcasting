import type { Metadata } from "@owlbear-rodeo/sdk";
import { APP_KEY, LEGACY_APP_KEY } from "../../config";
import { getScopedMetadata } from "../../platform/obr/metadataHelper";
import type {
  ConcentrationState,
  PendingConcentrationSave,
  TemporaryCombatEffect,
  TokenVitals,
} from "./domain/types";
import {
  createPendingConcentrationSave,
  expireEffectsAtTurnStart,
  resolveNextConcentrationSave,
} from "./domain/temporaryCombatEffects";
import {
  resolveDamageWithSaveOutcome,
  resolveDefenseDamage,
} from "./domain/multiTargetDamage";
import { getActiveEncounter, saveEncounter } from "./initiativeService";
import type { DDBParsedCharacter } from "../../types/ddb";
import {
  resolveCasterCharacter,
  getLinkedDDBCharacterId,
  fetchDDBCharacter,
  cacheDDBCharacter,
} from "../../services/ddbService";

export const VITALS_METADATA_KEY = `${APP_KEY}/vitals`;
export const LEGACY_VITALS_METADATA_KEY = `${LEGACY_APP_KEY}/vitals`;
const EFFECT_METADATA_KEY = `${APP_KEY}/effect-id`;
const SPELL_METADATA_KEY = `${APP_KEY}/spell-id`;

function isConcentrationState(value: unknown): value is ConcentrationState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<ConcentrationState>;
  return typeof state.spellId === "string" && typeof state.spellName === "string";
}

function isPendingConcentrationSave(value: unknown): value is PendingConcentrationSave {
  if (!value || typeof value !== "object") return false;
  const pending = value as Partial<PendingConcentrationSave>;
  return typeof pending.id === "string" &&
    typeof pending.spellId === "string" &&
    typeof pending.spellName === "string" &&
    typeof pending.damageTaken === "number" &&
    typeof pending.dc === "number" &&
    typeof pending.createdAt === "number";
}

function isTemporaryCombatEffect(value: unknown): value is TemporaryCombatEffect {
  if (!value || typeof value !== "object") return false;
  const effect = value as Partial<TemporaryCombatEffect>;
  return typeof effect.id === "string" &&
    effect.kind === "speed_reduction" &&
    typeof effect.name === "string" &&
    typeof effect.valueFeet === "number" &&
    typeof effect.sourceTokenId === "string" &&
    typeof effect.sourceName === "string" &&
    typeof effect.expiresOnTurnStartTokenId === "string";
}

async function getOBR() {
  const sdk = await import("@owlbear-rodeo/sdk");
  return sdk.default;
}

function normalizeSpellKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function isConcentrationVisualForCaster(
  metadata: Metadata,
  tokenId: string,
  spellId: string,
  playerId: string,
): boolean {
  if (metadata[EFFECT_METADATA_KEY] == null) return false;
  const spellData = metadata[SPELL_METADATA_KEY] as {
    id?: unknown;
    name?: unknown;
    caster?: unknown;
    casterTokenId?: unknown;
  } | undefined;
  if (!spellData) return false;
  const itemSpellKey = typeof spellData.id === "string"
    ? normalizeSpellKey(spellData.id)
    : typeof spellData.name === "string"
      ? normalizeSpellKey(spellData.name)
      : "";
  if (itemSpellKey !== normalizeSpellKey(spellId)) return false;
  return typeof spellData.casterTokenId === "string"
    ? spellData.casterTokenId === tokenId
    : spellData.caster === playerId;
}

async function deleteConcentrationVisuals(tokenId: string, spellId: string): Promise<void> {
  const OBR = await getOBR();
  const playerId = await OBR.player.getId();
  const items = await OBR.scene.items.getItems();
  const itemIds = items
    .filter((item) => isConcentrationVisualForCaster(item.metadata, tokenId, spellId, playerId))
    .map((item) => item.id);
  if (itemIds.length > 0) {
    await OBR.scene.items.deleteItems(itemIds);
  }
}

/**
 * Pure function: Extracts TokenVitals from metadata with legacy fallback.
 */
export function extractTokenVitals(metadata: Metadata | undefined): TokenVitals | null {
  const data = getScopedMetadata<TokenVitals>(metadata, "vitals");
  if (!data || typeof data !== "object") return null;
  if (typeof data.hpCurrent !== "number" || typeof data.hpMax !== "number") {
    return null;
  }
  return {
    hpCurrent: Math.max(0, data.hpCurrent),
    hpMax: Math.max(1, data.hpMax),
    hpTemp: typeof data.hpTemp === "number" && data.hpTemp > 0 ? data.hpTemp : 0,
    armorClass: typeof data.armorClass === "number" ? data.armorClass : 10,
    conditions: Array.isArray(data.conditions) ? [...data.conditions] : [],
    resistances: Array.isArray(data.resistances) ? [...data.resistances] : [],
    immunities: Array.isArray(data.immunities) ? [...data.immunities] : [],
    vulnerabilities: Array.isArray(data.vulnerabilities) ? [...data.vulnerabilities] : [],
    speedFeet: typeof data.speedFeet === "number" ? data.speedFeet : undefined,
    exhaustionLevel: typeof data.exhaustionLevel === "number" ? data.exhaustionLevel : 0,
    effects: Array.isArray(data.effects) ? data.effects.filter(isTemporaryCombatEffect) : [],
    concentration: isConcentrationState(data.concentration) ? data.concentration : null,
    pendingConcentrationSaves: Array.isArray(data.pendingConcentrationSaves)
      ? data.pendingConcentrationSaves.filter(isPendingConcentrationSave)
      : [],
    hideNumbers: Boolean(data.hideNumbers),
    updatedAt: data.updatedAt ?? Date.now(),
  };
}

/**
 * Pure function: Resolves HP bar color and threshold label based on remaining health.
 * Strictly dark fantasy palette: Forest Green (>50%), Amber (25-50%), Crimson (<25%), Dark Crimson (0 HP).
 */
export function getHpGradientColor(
  current: number,
  max: number
): { fill: string; stroke: string; label: "healthy" | "wounded" | "critical" | "dead" } {
  if (max <= 0 || current <= 0) {
    return { fill: "#7f1d1d", stroke: "#991b1b", label: "dead" };
  }
  const ratio = current / max;
  if (ratio > 0.5) {
    return { fill: "#16a34a", stroke: "#22c55e", label: "healthy" };
  }
  if (ratio >= 0.25) {
    return { fill: "#d97706", stroke: "#f59e0b", label: "wounded" };
  }
  return { fill: "#dc2626", stroke: "#ef4444", label: "critical" };
}

/**
 * Pure function: Calculates damage resolution, absorbing via Temporary HP first.
 */
export function calculateDamageResolution(
  currentVitals: TokenVitals,
  damageAmount: number
): { nextVitals: TokenVitals; absorbedByTemp: number; hpLost: number } {
  const damage = Math.max(0, Math.floor(damageAmount));
  const tempHp = currentVitals.hpTemp ?? 0;
  const absorbedByTemp = Math.min(tempHp, damage);
  const remainingDamage = damage - absorbedByTemp;
  const hpLost = Math.min(currentVitals.hpCurrent, remainingDamage);
  const nextHpCurrent = Math.max(0, currentVitals.hpCurrent - remainingDamage);
  const nextHpTemp = tempHp - absorbedByTemp;

  const conditions = [...(currentVitals.conditions || [])];
  if (nextHpCurrent === 0 && !conditions.includes("unconscious")) {
    conditions.push("unconscious");
  }

  return {
    nextVitals: {
      ...currentVitals,
      hpCurrent: nextHpCurrent,
      hpTemp: nextHpTemp,
      conditions,
      updatedAt: Date.now(),
    },
    absorbedByTemp,
    hpLost,
  };
}

/**
 * Pure function: Calculates heal resolution, capped at hpMax.
 * Automatically clears unconscious and dead status if revived from 0 HP.
 */
export function calculateHealResolution(
  currentVitals: TokenVitals,
  healAmount: number
): { nextVitals: TokenVitals; hpRestored: number } {
  const heal = Math.max(0, Math.floor(healAmount));
  const nextHp = Math.min(currentVitals.hpMax, currentVitals.hpCurrent + heal);
  const hpRestored = nextHp - currentVitals.hpCurrent;

  let conditions = [...(currentVitals.conditions || [])];
  if (currentVitals.hpCurrent === 0 && nextHp > 0) {
    conditions = conditions.filter((c) => c !== "unconscious" && c !== "dead");
  }

  return {
    nextVitals: {
      ...currentVitals,
      hpCurrent: nextHp,
      conditions,
      updatedAt: Date.now(),
    },
    hpRestored,
  };
}

/**
 * Pure function: Calculates temporary HP resolution.
 * D&D 5e rule: Temp HP does not stack; takes the higher value.
 */
export function calculateTempHpResolution(
  currentVitals: TokenVitals,
  tempHpAmount: number
): TokenVitals {
  const newTemp = Math.max(0, Math.floor(tempHpAmount));
  const effectiveTemp = Math.max(currentVitals.hpTemp ?? 0, newTemp);
  return {
    ...currentVitals,
    hpTemp: effectiveTemp,
    updatedAt: Date.now(),
  };
}

/**
 * Pure function: Toggles condition in conditions array (case-insensitive).
 */
export function toggleConditionPure(
  currentConditions: string[] | undefined,
  condition: string
): string[] {
  const norm = condition.trim().toLowerCase();
  if (!norm) return currentConditions ? [...currentConditions] : [];
  const list = (currentConditions || []).map((c) => c.toLowerCase());
  if (list.includes(norm)) {
    return list.filter((c) => c !== norm);
  }
  return [...list, norm];
}

/**
 * Get token vitals for a given token ID.
 * Falls back to active encounter combatant or linked DDB character if not explicitly set.
 */
export async function getTokenVitals(tokenId: string): Promise<TokenVitals | null> {
  const OBR = await getOBR();
  if (!OBR.isReady) return null;

  try {
    const items = await OBR.scene.items.getItems([tokenId]);
    const item = items[0];
    if (!item) return null;

    // 1. Direct item metadata
    const explicitVitals = extractTokenVitals(item.metadata);

    // If explicitVitals already has non-empty defenses, return it immediately
    const hasDefenses =
      explicitVitals &&
      ((explicitVitals.resistances && explicitVitals.resistances.length > 0) ||
        (explicitVitals.immunities && explicitVitals.immunities.length > 0) ||
        (explicitVitals.vulnerabilities && explicitVitals.vulnerabilities.length > 0));

    if (explicitVitals && hasDefenses) {
      return explicitVitals;
    }

    // 2. Query linked D&D Beyond Character if defenses or vitals are missing
    let ddbChar = resolveCasterCharacter(item);
    if (!ddbChar) {
      const linkedId = getLinkedDDBCharacterId(item);
      if (linkedId) {
        try {
          ddbChar = await fetchDDBCharacter(linkedId);
          if (ddbChar) cacheDDBCharacter(ddbChar);
        } catch {}
      }
    }

    if (ddbChar) {
      const charDefenses = ddbChar.defenses || {
        resistances: [],
        immunities: [],
        vulnerabilities: [],
      };

      if (explicitVitals) {
        // Enrich existing vitals with defenses from DDB character
        const enriched: TokenVitals = {
          ...explicitVitals,
          resistances:
            explicitVitals.resistances && explicitVitals.resistances.length > 0
              ? explicitVitals.resistances
              : [...(charDefenses.resistances || [])],
          immunities:
            explicitVitals.immunities && explicitVitals.immunities.length > 0
              ? explicitVitals.immunities
              : [...(charDefenses.immunities || [])],
          vulnerabilities:
            explicitVitals.vulnerabilities && explicitVitals.vulnerabilities.length > 0
              ? explicitVitals.vulnerabilities
              : [...(charDefenses.vulnerabilities || [])],
          updatedAt: Date.now(),
        };

        // Persist to scene item metadata asynchronously
        await OBR.scene.items.updateItems([tokenId], (itemsToUpdate) => {
          for (const it of itemsToUpdate) {
            if (it.id === tokenId) {
              it.metadata[VITALS_METADATA_KEY] = enriched;
            }
          }
        }).catch(() => {});

        return enriched;
      } else {
        // Derive full vitals from ddbChar
        const derived: TokenVitals = {
          hpCurrent: ddbChar.hp?.current ?? 10,
          hpMax: ddbChar.hp?.max ?? 10,
          hpTemp: ddbChar.hp?.temp ?? 0,
          armorClass: ddbChar.armorClass ?? 10,
          conditions: [],
          resistances: [...(charDefenses.resistances || [])],
          immunities: [...(charDefenses.immunities || [])],
          vulnerabilities: [...(charDefenses.vulnerabilities || [])],
          speedFeet: ddbChar.speed,
          hideNumbers: false,
          updatedAt: Date.now(),
        };

        await OBR.scene.items.updateItems([tokenId], (itemsToUpdate) => {
          for (const it of itemsToUpdate) {
            if (it.id === tokenId) {
              it.metadata[VITALS_METADATA_KEY] = derived;
            }
          }
        }).catch(() => {});

        return derived;
      }
    }

    if (explicitVitals) {
      return explicitVitals;
    }

    // 3. Active combat encounter fallback
    const encounter = await getActiveEncounter();
    const combatant = encounter?.combatants.find((c) => c.id === tokenId);
    if (combatant && typeof combatant.hpMax === "number") {
      const derived: TokenVitals = {
        hpCurrent: combatant.hpCurrent ?? combatant.hpMax,
        hpMax: combatant.hpMax,
        hpTemp: combatant.hpTemp ?? 0,
        armorClass: combatant.ac ?? 10,
        conditions: combatant.conditions ?? [],
        resistances: combatant.resistances ?? [],
        immunities: combatant.immunities ?? [],
        vulnerabilities: combatant.vulnerabilities ?? [],
        exhaustionLevel: 0,
        hideNumbers: false,
        updatedAt: Date.now(),
      };
      return derived;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Update token vitals on OBR scene item metadata.
 * Bi-directionally syncs with active CombatEncounter if token is an enrolled combatant.
 */
export async function setTokenVitals(
  tokenId: string,
  patch: Partial<TokenVitals>
): Promise<TokenVitals | null> {
  const OBR = await getOBR();
  if (!OBR.isReady) return null;

  try {
    let current = await getTokenVitals(tokenId);
    if (!current) {
      current = {
        hpCurrent: patch.hpCurrent ?? 10,
        hpMax: patch.hpMax ?? 10,
        hpTemp: patch.hpTemp ?? 0,
        armorClass: patch.armorClass ?? 10,
        conditions: patch.conditions ?? [],
        resistances: patch.resistances ?? [],
        immunities: patch.immunities ?? [],
        vulnerabilities: patch.vulnerabilities ?? [],
        speedFeet: patch.speedFeet,
        exhaustionLevel: patch.exhaustionLevel ?? 0,
        effects: patch.effects ?? [],
        concentration: patch.concentration ?? null,
        pendingConcentrationSaves: patch.pendingConcentrationSaves ?? [],
        hideNumbers: patch.hideNumbers ?? false,
        updatedAt: Date.now(),
      };
    }

    const updated: TokenVitals = {
      hpCurrent: typeof patch.hpCurrent === "number" ? Math.max(0, patch.hpCurrent) : current.hpCurrent,
      hpMax: typeof patch.hpMax === "number" ? Math.max(1, patch.hpMax) : current.hpMax,
      hpTemp: typeof patch.hpTemp === "number" ? Math.max(0, patch.hpTemp) : current.hpTemp,
      armorClass: typeof patch.armorClass === "number" ? patch.armorClass : current.armorClass,
      conditions: patch.conditions !== undefined ? [...patch.conditions] : [...(current.conditions || [])],
      resistances: patch.resistances !== undefined ? [...patch.resistances] : [...(current.resistances || [])],
      immunities: patch.immunities !== undefined ? [...patch.immunities] : [...(current.immunities || [])],
      vulnerabilities: patch.vulnerabilities !== undefined ? [...patch.vulnerabilities] : [...(current.vulnerabilities || [])],
      speedFeet: typeof patch.speedFeet === "number" ? Math.max(0, patch.speedFeet) : current.speedFeet,
      exhaustionLevel: typeof patch.exhaustionLevel === "number"
        ? Math.max(0, Math.min(6, Math.floor(patch.exhaustionLevel)))
        : current.exhaustionLevel ?? 0,
      effects: patch.effects !== undefined ? [...patch.effects] : [...(current.effects || [])],
      concentration: patch.concentration !== undefined ? patch.concentration : current.concentration ?? null,
      pendingConcentrationSaves: patch.pendingConcentrationSaves !== undefined
        ? [...patch.pendingConcentrationSaves]
        : [...(current.pendingConcentrationSaves || [])],
      hideNumbers: patch.hideNumbers !== undefined ? patch.hideNumbers : current.hideNumbers,
      updatedAt: Date.now(),
    };

    // 1. Write to item metadata on scene
    await OBR.scene.items.updateItems([tokenId], (items) => {
      for (const item of items) {
        if (item.id === tokenId) {
          item.metadata[VITALS_METADATA_KEY] = updated;
        }
      }
    });

    // 2. Bi-directional sync with active encounter
    try {
      const encounter = await getActiveEncounter();
      if (encounter && encounter.combatants.some((c) => c.id === tokenId)) {
        const nextCombatants = encounter.combatants.map((c) => {
          if (c.id !== tokenId) return c;
          return {
            ...c,
            hpCurrent: updated.hpCurrent,
            hpMax: updated.hpMax,
            hpTemp: updated.hpTemp,
            ac: updated.armorClass,
            conditions: updated.conditions,
            resistances: updated.resistances,
            immunities: updated.immunities,
            vulnerabilities: updated.vulnerabilities,
            isDefeated: updated.hpCurrent <= 0,
          };
        });
        await saveEncounter({
          ...encounter,
          combatants: nextCombatants,
          updatedAt: Date.now(),
        });
      }
    } catch {}

    return updated;
  } catch {
    return null;
  }
}

/**
 * Apply damage to token vitals (absorbs via temp HP first).
 * Automatically resolves damage resistances, immunities, and vulnerabilities if damageType is provided.
 */
export async function applyDamage(
  tokenId: string,
  amount: number,
  damageType?: string,
  saveDamageMultiplier?: number,
): Promise<{
  vitals: TokenVitals;
  absorbedByTemp: number;
  hpLost: number;
  effectiveDamage: number;
  defenseNote?: string;
  concentrationSave?: PendingConcentrationSave | null;
} | null> {
  const current = await getTokenVitals(tokenId);
  if (!current) return null;

  const isPetrified = (current.conditions ?? []).some(
    (condition) => condition.trim().toLowerCase() === "petrified",
  );
  const defenses = {
    resistances: isPetrified
      ? [...(current.resistances ?? []), "all"]
      : current.resistances,
    immunities: current.immunities,
    vulnerabilities: current.vulnerabilities,
  };
  const defenseRes = saveDamageMultiplier === undefined
    ? resolveDefenseDamage(amount, damageType, defenses)
    : resolveDamageWithSaveOutcome(
        amount,
        damageType,
        defenses,
        saveDamageMultiplier,
      );

  const effectiveAmount = defenseRes.effectiveDamage;
  const resolution = calculateDamageResolution(current, effectiveAmount);
  const pendingSave = effectiveAmount > 0 && current.concentration
    ? createPendingConcentrationSave(current.concentration, effectiveAmount)
    : null;
  const updated = await setTokenVitals(tokenId, {
    ...resolution.nextVitals,
    pendingConcentrationSaves: pendingSave
      ? [...(current.pendingConcentrationSaves ?? []), pendingSave]
      : current.pendingConcentrationSaves ?? [],
  });
  if (!updated) return null;

  const OBR = await getOBR();
  if (OBR.isReady) {
    const tempNote = resolution.absorbedByTemp > 0 ? ` (${resolution.absorbedByTemp} absorbed by Temp HP)` : "";
    const defNote = defenseRes.note ? ` • ${defenseRes.note}` : "";
    const concentrationNotice = pendingSave
      ? ` • Concentration save: CON DC ${pendingSave.dc}`
      : "";
    OBR.notification.show(
      `Took ${effectiveAmount} damage${tempNote}${defNote} • HP: ${updated.hpCurrent}/${updated.hpMax}${concentrationNotice}`,
      effectiveAmount > 0 ? "WARNING" : "INFO"
    );
  }

  return {
    vitals: updated,
    absorbedByTemp: resolution.absorbedByTemp,
    hpLost: resolution.hpLost,
    effectiveDamage: effectiveAmount,
    defenseNote: defenseRes.note,
    concentrationSave: pendingSave,
  };
}

export async function replaceTokenConcentration(
  tokenId: string,
  concentration: TokenVitals["concentration"],
): Promise<TokenVitals | null> {
  const current = await getTokenVitals(tokenId);
  if (!current) return null;
  const previousSpellId = current.concentration?.spellId;
  const concentrationChanged = previousSpellId !== concentration?.spellId;
  const effects = previousSpellId && concentrationChanged
    ? (current.effects ?? []).filter((effect) => effect.concentrationSpellId !== previousSpellId)
    : current.effects ?? [];
  const updated = await setTokenVitals(tokenId, {
    concentration,
    effects,
    pendingConcentrationSaves: concentrationChanged
      ? []
      : current.pendingConcentrationSaves ?? [],
  });
  if (previousSpellId && concentrationChanged) {
    await deleteConcentrationVisuals(tokenId, previousSpellId);
  }
  return updated;
}

export async function resolveTokenConcentrationSave(
  tokenId: string,
  total: number,
): Promise<{
  resolved: PendingConcentrationSave | null;
  succeeded: boolean | null;
  vitals: TokenVitals | null;
}> {
  const current = await getTokenVitals(tokenId);
  if (!current) return { resolved: null, succeeded: null, vitals: null };
  const result = resolveNextConcentrationSave(current.pendingConcentrationSaves, total);
  if (!result.resolved) return { ...result, vitals: current };

  const concentration = result.succeeded ? current.concentration ?? null : null;
  const effects = result.succeeded
    ? current.effects ?? []
    : (current.effects ?? []).filter(
        (effect) => effect.concentrationSpellId !== result.resolved?.spellId,
      );
  const vitals = await setTokenVitals(tokenId, {
    concentration,
    effects,
    pendingConcentrationSaves: result.remaining,
  });
  if (!result.succeeded && current.concentration?.spellId) {
    await deleteConcentrationVisuals(tokenId, current.concentration.spellId);
  }
  return { resolved: result.resolved, succeeded: result.succeeded, vitals };
}

export async function applyRayOfFrostSpeedReduction(
  targetTokenId: string,
  casterTokenId: string,
  casterName: string,
): Promise<TokenVitals | null> {
  const current = await getTokenVitals(targetTokenId);
  if (!current) return null;
  const effect: TemporaryCombatEffect = {
    id: `ray-of-frost-${targetTokenId}-${casterTokenId}-${Date.now()}`,
    kind: "speed_reduction",
    name: "Ray of Frost",
    valueFeet: 10,
    sourceTokenId: casterTokenId,
    sourceName: casterName,
    expiresOnTurnStartTokenId: casterTokenId,
  };
  const effects = (current.effects ?? []).filter(
    (active) => !(active.kind === "speed_reduction" && active.name === effect.name),
  );
  return setTokenVitals(targetTokenId, { effects: [...effects, effect] });
}

export async function expireTemporaryEffectsAtTurnStart(tokenId: string): Promise<void> {
  const current = await getTokenVitals(tokenId);
  if (!current?.effects?.length) return;
  const effects = expireEffectsAtTurnStart(current.effects, tokenId);
  if (effects.length !== current.effects.length) {
    await setTokenVitals(tokenId, { effects });
  }
}

/**
 * Apply healing to token vitals (caps at hpMax).
 */
export async function applyHeal(
  tokenId: string,
  amount: number
): Promise<{ vitals: TokenVitals; hpRestored: number } | null> {
  const current = await getTokenVitals(tokenId);
  if (!current) return null;

  const resolution = calculateHealResolution(current, amount);
  const updated = await setTokenVitals(tokenId, resolution.nextVitals);
  if (!updated) return null;

  const OBR = await getOBR();
  if (OBR.isReady) {
    OBR.notification.show(
      `Healed +${resolution.hpRestored} HP • HP: ${updated.hpCurrent}/${updated.hpMax}`,
      "SUCCESS"
    );
  }

  return {
    vitals: updated,
    hpRestored: resolution.hpRestored,
  };
}

/**
 * Set temporary hit points on token vitals (takes highest per 5e rules).
 */
export async function setTempHp(
  tokenId: string,
  amount: number
): Promise<TokenVitals | null> {
  const current = await getTokenVitals(tokenId);
  if (!current) return null;

  const nextVitals = calculateTempHpResolution(current, amount);
  return setTokenVitals(tokenId, nextVitals);
}

/**
 * Toggle a 5e condition on a token.
 */
export async function toggleCondition(
  tokenId: string,
  condition: string
): Promise<TokenVitals | null> {
  const current = await getTokenVitals(tokenId);
  if (!current) return null;

  const nextConditions = toggleConditionPure(current.conditions, condition);
  return setTokenVitals(tokenId, { conditions: nextConditions });
}

/**
 * Set all active conditions on a token.
 */
export async function setConditions(
  tokenId: string,
  conditions: string[]
): Promise<TokenVitals | null> {
  return setTokenVitals(tokenId, { conditions });
}

/**
 * Toggle GM-only number visibility for a token.
 */
export async function setHideNumbers(
  tokenId: string,
  hide: boolean
): Promise<TokenVitals | null> {
  return setTokenVitals(tokenId, { hideNumbers: hide });
}

/**
 * Synchronize token vitals from a parsed DDB Character.
 * By default, preserves existing damaged HP and temp HP if the token already has vitals on the scene.
 * Pass options.resetHp = true to force resetting HP to the character sheet's full HP (e.g. on Long Rest).
 */
export async function syncTokenVitalsFromDDB(
  tokenId: string,
  ddbChar: DDBParsedCharacter,
  options?: { resetHp?: boolean }
): Promise<TokenVitals | null> {
  if (!ddbChar?.hp) return null;
  const current = await getTokenVitals(tokenId);

  const hpCurrent = current && !options?.resetHp
    ? Math.min(current.hpCurrent, ddbChar.hp.max)
    : ddbChar.hp.current;
  const hpTemp = current && !options?.resetHp
    ? current.hpTemp
    : (ddbChar.hp.temp ?? 0);

  return setTokenVitals(tokenId, {
    hpCurrent,
    hpMax: ddbChar.hp.max,
    hpTemp,
    armorClass: ddbChar.armorClass ?? 10,
    resistances: ddbChar.defenses?.resistances || [],
    immunities: ddbChar.defenses?.immunities || [],
    vulnerabilities: ddbChar.defenses?.vulnerabilities || [],
    speedFeet: ddbChar.speed,
  });
}
