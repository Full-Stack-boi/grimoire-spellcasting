import type { Metadata } from "@owlbear-rodeo/sdk";
import { APP_KEY, LEGACY_APP_KEY } from "../../config";
import { getScopedMetadata } from "../../platform/obr/metadataHelper";
import type { Combatant, CombatEncounter } from "./domain/types";
export { DEFAULT_ENCOUNTER } from "./domain/types";

export const ENCOUNTER_METADATA_KEY = `${APP_KEY}/encounter`;
export const LEGACY_ENCOUNTER_METADATA_KEY = `${LEGACY_APP_KEY}/encounter`;

async function getOBR() {
  const sdk = await import("@owlbear-rodeo/sdk");
  return sdk.default;
}

/**
 * Pure function: Sort combatants by initiative (descending), tie-breaker bonus, then name.
 */
export function sortCombatants(combatants: Combatant[]): Combatant[] {
  return [...combatants].sort((a, b) => {
    if (b.initiative !== a.initiative) {
      return b.initiative - a.initiative;
    }
    if (b.initiativeBonus !== a.initiativeBonus) {
      return b.initiativeBonus - a.initiativeBonus;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Pure function: Advance to next turn in encounter, incrementing round when wrapping around.
 */
export function advanceTurn(encounter: CombatEncounter): CombatEncounter {
  if (!encounter.combatants || encounter.combatants.length === 0) {
    return encounter;
  }
  const nextIndex = encounter.turnIndex + 1;
  const isRoundWrap = nextIndex >= encounter.combatants.length;
  return {
    ...encounter,
    round: isRoundWrap ? encounter.round + 1 : encounter.round,
    turnIndex: isRoundWrap ? 0 : nextIndex,
    updatedAt: Date.now(),
  };
}

/**
 * Pure function: Go back to previous turn in encounter, decrementing round if applicable.
 */
export function previousTurn(encounter: CombatEncounter): CombatEncounter {
  if (!encounter.combatants || encounter.combatants.length === 0) {
    return encounter;
  }
  if (encounter.turnIndex > 0) {
    return {
      ...encounter,
      turnIndex: encounter.turnIndex - 1,
      updatedAt: Date.now(),
    };
  }
  if (encounter.round > 1) {
    return {
      ...encounter,
      round: encounter.round - 1,
      turnIndex: encounter.combatants.length - 1,
      updatedAt: Date.now(),
    };
  }
  return encounter;
}

/**
 * Read encounter state from metadata using scoped fallback.
 */
export function extractEncounterFromMetadata(metadata: Metadata): CombatEncounter | null {
  const data = getScopedMetadata<CombatEncounter>(metadata, "encounter");
  if (!data || !data.id) return null;
  return data;
}

/**
 * Get the current active encounter from OBR Scene metadata.
 */
export async function getActiveEncounter(): Promise<CombatEncounter | null> {
  const OBR = await getOBR();
  if (!OBR.isReady) return null;
  const metadata = await OBR.scene.getMetadata();
  return extractEncounterFromMetadata(metadata);
}

/**
 * Start or update encounter in OBR Scene metadata.
 */
export async function saveEncounter(encounter: CombatEncounter): Promise<void> {
  const OBR = await getOBR();
  if (!OBR.isReady) return;
  await OBR.scene.setMetadata({
    [ENCOUNTER_METADATA_KEY]: {
      ...encounter,
      updatedAt: Date.now(),
    },
  });
}

/**
 * End and clear the current combat encounter.
 */
export async function endEncounter(): Promise<void> {
  const OBR = await getOBR();
  if (!OBR.isReady) return;
  await OBR.scene.setMetadata({
    [ENCOUNTER_METADATA_KEY]: undefined,
    [LEGACY_ENCOUNTER_METADATA_KEY]: undefined,
  });
}

/**
 * Mutates the active combat encounter atomically by re-fetching latest metadata immediately before saving.
 */
export async function mutateEncounter(
  mutator: (current: CombatEncounter) => CombatEncounter | null | Promise<CombatEncounter | null>
): Promise<CombatEncounter | null> {
  const current = await getActiveEncounter();
  if (!current) return null;
  const next = await mutator(current);
  if (!next) return current;
  await saveEncounter(next);
  return next;
}

/**
 * Advance turn and save to scene metadata.
 */
export async function nextCombatTurn(): Promise<CombatEncounter | null> {
  let transitionedCombatantId: string | null = null;
  const next = await mutateEncounter((current) => {
    const updated = advanceTurn(current);
    const nextCombatant = updated.combatants[updated.turnIndex];
    if (nextCombatant) {
      transitionedCombatantId = nextCombatant.id;
    }
    return updated;
  });
  if (next && transitionedCombatantId) {
    const { expireTemporaryEffectsAtTurnStart } = await import("./tokenVitalsService");
    await expireTemporaryEffectsAtTurnStart(transitionedCombatantId);
  }
  return next;
}

/**
 * Revert to previous turn and save to scene metadata.
 */
export async function prevCombatTurn(): Promise<CombatEncounter | null> {
  return mutateEncounter((current) => previousTurn(current));
}

/**
 * Update initiative roll for a single combatant and re-sort list.
 */
export async function setCombatantInitiative(
  tokenId: string,
  newInitiative: number
): Promise<CombatEncounter | null> {
  return mutateEncounter((current) => {
    const currentActiveId = current.combatants[current.turnIndex]?.id;
    const updatedCombatants = current.combatants.map((c) =>
      c.id === tokenId ? { ...c, initiative: newInitiative } : c
    );
    const sorted = sortCombatants(updatedCombatants);
    const newTurnIndex = sorted.findIndex((c) => c.id === currentActiveId);
    return {
      ...current,
      combatants: sorted,
      turnIndex: newTurnIndex >= 0 ? newTurnIndex : 0,
      updatedAt: Date.now(),
    };
  });
}

/**
 * Pure function: Initialize a new combat encounter from a list of combatants.
 */
export function createEncounter(combatants: Combatant[] = []): CombatEncounter {
  const sorted = sortCombatants(combatants);
  return {
    id: `enc-${Date.now()}`,
    isActive: true,
    round: 1,
    turnIndex: 0,
    combatants: sorted,
    updatedAt: Date.now(),
  };
}

/**
 * Pure function: Add or update combatants in an encounter.
 */
export function addCombatantsToEncounter(
  encounter: CombatEncounter,
  newCombatants: Combatant[]
): CombatEncounter {
  const currentActiveId = encounter.combatants[encounter.turnIndex]?.id;
  const combatantMap = new Map<string, Combatant>();

  for (const c of encounter.combatants) {
    combatantMap.set(c.id, c);
  }
  for (const c of newCombatants) {
    combatantMap.set(c.id, c);
  }

  const sorted = sortCombatants(Array.from(combatantMap.values()));
  const newTurnIndex = sorted.findIndex((c) => c.id === currentActiveId);

  return {
    ...encounter,
    combatants: sorted,
    turnIndex: newTurnIndex >= 0 ? newTurnIndex : 0,
    updatedAt: Date.now(),
  };
}

/**
 * Pure function: Remove a combatant by token ID.
 */
export function removeCombatantFromEncounter(
  encounter: CombatEncounter,
  tokenId: string
): CombatEncounter {
  const currentActiveId = encounter.combatants[encounter.turnIndex]?.id;
  const filtered = encounter.combatants.filter((c) => c.id !== tokenId);

  let newTurnIndex = filtered.findIndex((c) => c.id === currentActiveId);
  if (newTurnIndex < 0) {
    newTurnIndex = Math.min(encounter.turnIndex, Math.max(0, filtered.length - 1));
  }

  return {
    ...encounter,
    combatants: filtered,
    turnIndex: filtered.length === 0 ? 0 : newTurnIndex,
    updatedAt: Date.now(),
  };
}

/**
 * Pure function: Update a combatant's vitals or fields in the encounter.
 */
export function updateCombatantInEncounter(
  encounter: CombatEncounter,
  tokenId: string,
  patch: Partial<Combatant>
): CombatEncounter {
  const updated = encounter.combatants.map((c) =>
    c.id === tokenId ? { ...c, ...patch } : c
  );
  return {
    ...encounter,
    combatants: updated,
    updatedAt: Date.now(),
  };
}

export type RollAdvantageMode = "normal" | "advantage" | "disadvantage";

export interface InitiativeRollResult {
  combatantId: string;
  combatantName: string;
  mode: RollAdvantageMode;
  d20_1: number;
  d20_2?: number;
  selectedD20: number;
  bonus: number;
  total: number;
}

/**
 * Simulates rolling a d20 with normal, advantage, or disadvantage.
 */
export function rollInitiativeDice(
  mode: RollAdvantageMode = "normal",
  presetRolls?: { d20_1?: number; d20_2?: number }
): { selectedD20: number; d20_1: number; d20_2?: number; mode: RollAdvantageMode } {
  const d1 = presetRolls?.d20_1 ?? Math.floor(Math.random() * 20) + 1;
  if (mode === "normal") {
    return { selectedD20: d1, d20_1: d1, mode };
  }
  const d2 = presetRolls?.d20_2 ?? Math.floor(Math.random() * 20) + 1;
  const selectedD20 = mode === "advantage" ? Math.max(d1, d2) : Math.min(d1, d2);
  return { selectedD20, d20_1: d1, d20_2: d2, mode };
}

/**
 * Pure function: Rolls initiative for a single combatant and re-sorts the encounter.
 */
export function rollCombatantInitiativePure(
  encounter: CombatEncounter,
  tokenId: string,
  mode: RollAdvantageMode = "normal",
  forcedRoll?: { d20_1?: number; d20_2?: number },
  bonusModifier = 0,
): { encounter: CombatEncounter; rollResult: InitiativeRollResult | null } {
  const combatant = encounter.combatants.find((c) => c.id === tokenId);
  if (!combatant) {
    return { encounter, rollResult: null };
  }

  const dice = rollInitiativeDice(mode, forcedRoll);
  const bonus = (combatant.initiativeBonus || 0) + bonusModifier;
  const total = dice.selectedD20 + bonus;

  const currentActiveId = encounter.combatants[encounter.turnIndex]?.id;
  const updatedCombatants = encounter.combatants.map((c) =>
    c.id === tokenId ? { ...c, initiative: total } : c
  );
  const sorted = sortCombatants(updatedCombatants);
  const newTurnIndex = sorted.findIndex((c) => c.id === currentActiveId);

  const updated: CombatEncounter = {
    ...encounter,
    combatants: sorted,
    turnIndex: newTurnIndex >= 0 ? newTurnIndex : 0,
    updatedAt: Date.now(),
  };

  const rollResult: InitiativeRollResult = {
    combatantId: combatant.id,
    combatantName: combatant.name,
    mode,
    d20_1: dice.d20_1,
    d20_2: dice.d20_2,
    selectedD20: dice.selectedD20,
    bonus,
    total,
  };

  return { encounter: updated, rollResult };
}

/**
 * Pure function: Roll initiative for combatants with support for Advantage/Disadvantage.
 */
export function rollEncounterInitiativePure(
  encounter: CombatEncounter,
  modeOrRolls?: RollAdvantageMode | Record<string, number>,
  maybeRolls?: Record<string, number>
): CombatEncounter {
  let mode: RollAdvantageMode = "normal";
  let rolls: Record<string, number> | undefined = maybeRolls;

  if (typeof modeOrRolls === "object" && modeOrRolls !== null) {
    rolls = modeOrRolls;
    mode = "normal";
  } else if (typeof modeOrRolls === "string") {
    mode = modeOrRolls;
  }

  const currentActiveId = encounter.combatants[encounter.turnIndex]?.id;

  const updatedCombatants = encounter.combatants.map((c) => {
    let selectedD20: number;
    if (rolls?.[c.id] !== undefined) {
      selectedD20 = rolls[c.id];
    } else {
      const dice = rollInitiativeDice(mode);
      selectedD20 = dice.selectedD20;
    }
    const finalScore = selectedD20 + (c.initiativeBonus || 0);
    return {
      ...c,
      initiative: finalScore,
    };
  });

  const sorted = sortCombatants(updatedCombatants);
  const newTurnIndex = sorted.findIndex((c) => c.id === currentActiveId);

  return {
    ...encounter,
    combatants: sorted,
    turnIndex: newTurnIndex >= 0 ? newTurnIndex : 0,
    updatedAt: Date.now(),
  };
}

/**
 * Helper to construct a Combatant from an OBR token and optional DDB parsed character data.
 */
export function buildCombatantFromItem(
  item: { id: string; name?: string; image?: { url?: string }; metadata?: Metadata },
  cachedDdb?: {
    name?: string;
    avatarUrl?: string;
    initiative?: number;
    armorClass?: number;
    hp?: { current: number; max: number; temp?: number };
  } | null
): Combatant {
  if (cachedDdb) {
    return {
      id: item.id,
      name: cachedDdb.name || item.name || "Character",
      initiative: (cachedDdb.initiative || 0) + 10, // Default passive initiative
      initiativeBonus: cachedDdb.initiative || 0,
      hpCurrent: cachedDdb.hp?.current,
      hpMax: cachedDdb.hp?.max,
      hpTemp: cachedDdb.hp?.temp,
      ac: cachedDdb.armorClass ?? 10,
      avatarUrl: cachedDdb.avatarUrl || item.image?.url,
      isPlayer: true,
    };
  }

  // 1. Check if token is bound to a monster statblock
  const boundMonster = getScopedMetadata<any>(item.metadata, "bound-monster");
  // 2. Check if token has explicit vitals
  const vitals = getScopedMetadata<any>(item.metadata, "vitals");

  if (boundMonster && typeof boundMonster === "object") {
    const dex = typeof boundMonster.stats?.dex === "number" ? boundMonster.stats.dex : 10;
    const dexMod = Math.floor((dex - 10) / 2);
    const avgHp = typeof boundMonster.hitPoints?.average === "number" ? boundMonster.hitPoints.average : 10;
    const hpMax = typeof vitals?.hpMax === "number" ? vitals.hpMax : avgHp;
    const hpCurrent = typeof vitals?.hpCurrent === "number" ? vitals.hpCurrent : avgHp;
    const ac = typeof vitals?.armorClass === "number" ? vitals.armorClass : (boundMonster.armorClass ?? 10);

    return {
      id: item.id,
      name: item.name || boundMonster.name || "Creature",
      initiative: 10 + dexMod,
      initiativeBonus: dexMod,
      hpCurrent,
      hpMax,
      hpTemp: typeof vitals?.hpTemp === "number" ? vitals.hpTemp : 0,
      ac,
      avatarUrl: item.image?.url,
      isPlayer: false,
      resistances: vitals?.resistances ?? boundMonster.damageResistances ?? [],
      immunities: vitals?.immunities ?? boundMonster.damageImmunities ?? [],
      vulnerabilities: vitals?.vulnerabilities ?? boundMonster.damageVulnerabilities ?? [],
      conditions: vitals?.conditions ?? [],
    };
  }

  if (vitals && typeof vitals === "object" && typeof vitals.hpMax === "number") {
    return {
      id: item.id,
      name: item.name || "Creature",
      initiative: 10,
      initiativeBonus: 0,
      hpCurrent: typeof vitals.hpCurrent === "number" ? vitals.hpCurrent : vitals.hpMax,
      hpMax: vitals.hpMax,
      hpTemp: typeof vitals.hpTemp === "number" ? vitals.hpTemp : 0,
      ac: typeof vitals.armorClass === "number" ? vitals.armorClass : 10,
      avatarUrl: item.image?.url,
      isPlayer: false,
      resistances: Array.isArray(vitals.resistances) ? vitals.resistances : [],
      immunities: Array.isArray(vitals.immunities) ? vitals.immunities : [],
      vulnerabilities: Array.isArray(vitals.vulnerabilities) ? vitals.vulnerabilities : [],
      conditions: Array.isArray(vitals.conditions) ? vitals.conditions : [],
    };
  }

  return {
    id: item.id,
    name: item.name || "Creature",
    initiative: 10,
    initiativeBonus: 0,
    ac: 10,
    avatarUrl: item.image?.url,
    isPlayer: false,
  };
}

/**
 * Start a new combat encounter with given combatants and save to scene metadata.
 */
export async function startEncounter(combatants: Combatant[]): Promise<CombatEncounter> {
  const newEncounter = createEncounter(combatants);
  await saveEncounter(newEncounter);
  return newEncounter;
}

/**
 * Add or update combatants in active encounter and save.
 */
export async function addCombatants(newCombatants: Combatant[]): Promise<CombatEncounter | null> {
  const current = await getActiveEncounter();
  const base = current && current.isActive ? current : createEncounter([]);
  const updated = addCombatantsToEncounter(base, newCombatants);
  await saveEncounter(updated);
  return updated;
}

/**
 * Remove combatant from active encounter and save.
 */
export async function removeCombatant(tokenId: string): Promise<CombatEncounter | null> {
  const current = await getActiveEncounter();
  if (!current) return null;
  const updated = removeCombatantFromEncounter(current, tokenId);
  await saveEncounter(updated);
  return updated;
}

/**
 * Update combatant fields in active encounter and save.
 */
export async function updateCombatant(
  tokenId: string,
  patch: Partial<Combatant>
): Promise<CombatEncounter | null> {
  return mutateEncounter((current) => updateCombatantInEncounter(current, tokenId, patch));
}

/**
 * Rolls initiative for a single combatant (Player or DM), notifies room, and saves to scene metadata.
 */
export async function rollSingleCombatantInitiative(
  tokenId: string,
  mode: RollAdvantageMode = "normal",
  forcedRoll?: { d20_1?: number; d20_2?: number },
  bonusModifier = 0,
): Promise<InitiativeRollResult | null> {
  let current = await getActiveEncounter();
  if (!current) return null;

  const combatant = current.combatants.find((c) => c.id === tokenId);
  if (!combatant) {
    const OBR = await getOBR();
    if (OBR.isReady) {
      try {
        const items = await OBR.scene.items.getItems([tokenId]);
        if (items && items.length > 0) {
          const newCombatant = buildCombatantFromItem(items[0] as any);
          current = addCombatantsToEncounter(current, [newCombatant]);
        }
      } catch {}
    }
  }

  const { encounter: updated, rollResult } = rollCombatantInitiativePure(
    current,
    tokenId,
    mode,
    forcedRoll,
    bonusModifier,
  );
  if (!rollResult) return null;

  await saveEncounter(updated);

  const OBR = await getOBR();
  if (OBR.isReady) {
    const rollDetail =
      mode === "normal"
        ? `[${rollResult.d20_1}]`
        : mode === "advantage"
        ? `[${rollResult.d20_1}, ${rollResult.d20_2}] (Adv)`
        : `[${rollResult.d20_1}, ${rollResult.d20_2}] (Disadv)`;

    const sign = rollResult.bonus >= 0 ? `+${rollResult.bonus}` : `${rollResult.bonus}`;
    OBR.notification.show(
      `${rollResult.combatantName} Initiative: ${rollResult.selectedD20} (${rollDetail}) ${sign} = ${rollResult.total}`,
      "INFO"
    );
  }

  return rollResult;
}

/**
 * Roll initiative for all combatants in active encounter and save.
 */
export async function rollEncounterInitiative(
  modeOrRolls?: RollAdvantageMode | Record<string, number>,
  maybeRolls?: Record<string, number>
): Promise<CombatEncounter | null> {
  const current = await getActiveEncounter();
  if (!current) return null;
  const updated = rollEncounterInitiativePure(current, modeOrRolls, maybeRolls);
  await saveEncounter(updated);

  const OBR = await getOBR();
  if (OBR.isReady) {
    const mode = typeof modeOrRolls === "string" ? modeOrRolls : "normal";
    const modeLabel = mode === "normal" ? "" : ` (${mode.toUpperCase()})`;
    OBR.notification.show(`Rolled initiative for all combatants${modeLabel}.`, "INFO");
  }

  return updated;
}

/**
 * Subscribes to real-time OBR Scene metadata changes for combat encounter.
 */
export function subscribeToEncounter(
  callback: (encounter: CombatEncounter | null) => void
): () => void {
  let unsubscribed = false;
  let obrUnsubscribe: (() => void) | null = null;

  getOBR()
    .then((OBR) => {
      if (unsubscribed) return;

      const init = () => {
        if (unsubscribed) return;
        OBR.scene
          .getMetadata()
          .then((metadata) => {
            if (!unsubscribed) {
              callback(extractEncounterFromMetadata(metadata));
            }
          })
          .catch(() => {});

        obrUnsubscribe = OBR.scene.onMetadataChange((metadata) => {
          if (!unsubscribed) {
            callback(extractEncounterFromMetadata(metadata));
          }
        });
      };

      if (OBR.isReady) {
        init();
      } else {
        OBR.onReady(init);
      }
    })
    .catch(() => {});

  return () => {
    unsubscribed = true;
    if (obrUnsubscribe) {
      obrUnsubscribe();
    }
  };
}
