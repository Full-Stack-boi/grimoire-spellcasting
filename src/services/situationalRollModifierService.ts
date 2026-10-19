import { rollFormula } from "../utils/dice";

export type SituationalAdvantageMode = "normal" | "advantage" | "disadvantage";
export type SituationalRollScope = "attack" | "checks";

export interface SituationalRollState {
  mode: SituationalAdvantageMode;
  bonus: number; // e.g. +2, -1, 0
  diceBonus: string; // e.g. "", "1d4", "1d6", etc.
}

export interface ConsumedSituationalRollOverride {
  hasOverride: boolean;
  mode: SituationalAdvantageMode;
  bonus: number;
  diceBonus: string;
  rolledDiceBonus: number;
  totalBonus: number;
  breakdown: string;
}

export const DEFAULT_SITUATIONAL_ROLL_STATE: SituationalRollState = {
  mode: "normal",
  bonus: 0,
  diceBonus: "",
};

export const SITUATIONAL_ROLL_STORAGE_KEY_ATTACK = "embers:situational-roll-state:attack";
export const SITUATIONAL_ROLL_STORAGE_KEY_LEGACY = "embers:situational-roll-state";
export const SITUATIONAL_ROLL_STORAGE_KEY_CHECKS = "embers:situational-roll-state:checks";

export const SITUATIONAL_ROLL_STORAGE_KEY = SITUATIONAL_ROLL_STORAGE_KEY_LEGACY;
export const SITUATIONAL_ROLL_CHANNEL_NAME = "embers:situational-roll-sync";

const scopedStates: Record<SituationalRollScope, SituationalRollState> = {
  attack: { ...DEFAULT_SITUATIONAL_ROLL_STATE },
  checks: { ...DEFAULT_SITUATIONAL_ROLL_STATE },
};

const scopedListeners: Record<SituationalRollScope, Set<(state: SituationalRollState) => void>> = {
  attack: new Set(),
  checks: new Set(),
};

let syncChannel: BroadcastChannel | null = null;

function notifyLocalListeners(scope: SituationalRollScope): void {
  const snapshot = { ...scopedStates[scope] };
  scopedListeners[scope].forEach((listener) => {
    try {
      listener(snapshot);
    } catch (err) {
      console.error(`Error in situational roll state listener (${scope}):`, err);
    }
  });

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(`embers:situational-roll-override-change:${scope}`, {
        detail: snapshot,
      })
    );
    if (scope === "attack") {
      window.dispatchEvent(
        new CustomEvent("embers:situational-roll-override-change", {
          detail: snapshot,
        })
      );
    }
  }
}

function broadcastAndNotify(scope: SituationalRollScope): void {
  try {
    if (typeof localStorage !== "undefined") {
      if (scope === "attack") {
        localStorage.setItem(SITUATIONAL_ROLL_STORAGE_KEY_ATTACK, JSON.stringify(scopedStates.attack));
        localStorage.setItem(SITUATIONAL_ROLL_STORAGE_KEY_LEGACY, JSON.stringify(scopedStates.attack));
      } else {
        localStorage.setItem(SITUATIONAL_ROLL_STORAGE_KEY_CHECKS, JSON.stringify(scopedStates.checks));
      }
    }
  } catch {}

  try {
    syncChannel?.postMessage({ type: "SYNC_STATE", scope, state: scopedStates[scope] });
  } catch {}

  notifyLocalListeners(scope);
}

function hydrateScopeFromStorage(scope: SituationalRollScope): void {
  if (typeof localStorage === "undefined") return;
  try {
    const key = scope === "checks" ? SITUATIONAL_ROLL_STORAGE_KEY_CHECKS : SITUATIONAL_ROLL_STORAGE_KEY_ATTACK;
    let saved = localStorage.getItem(key);
    if (!saved && scope === "attack") {
      saved = localStorage.getItem(SITUATIONAL_ROLL_STORAGE_KEY_LEGACY);
    }
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        scopedStates[scope] = { ...DEFAULT_SITUATIONAL_ROLL_STATE, ...parsed };
      }
    }
  } catch {}
}

if (typeof window !== "undefined") {
  // Hydrate initial states from localStorage if available
  hydrateScopeFromStorage("attack");
  hydrateScopeFromStorage("checks");

  // Initialize BroadcastChannel
  if (typeof BroadcastChannel !== "undefined") {
    try {
      syncChannel = new BroadcastChannel(SITUATIONAL_ROLL_CHANNEL_NAME);
      syncChannel.onmessage = (event) => {
        if (event.data?.type === "SYNC_STATE" && event.data.state) {
          const scope: SituationalRollScope = event.data.scope === "checks" ? "checks" : "attack";
          scopedStates[scope] = { ...DEFAULT_SITUATIONAL_ROLL_STATE, ...event.data.state };
          notifyLocalListeners(scope);
        }
      };
    } catch {}
  }

  // Storage event listener fallback
  window.addEventListener("storage", (e) => {
    if (e.key === SITUATIONAL_ROLL_STORAGE_KEY_CHECKS && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed && typeof parsed === "object") {
          scopedStates.checks = { ...DEFAULT_SITUATIONAL_ROLL_STATE, ...parsed };
          notifyLocalListeners("checks");
        }
      } catch {}
    } else if (
      (e.key === SITUATIONAL_ROLL_STORAGE_KEY_ATTACK || e.key === SITUATIONAL_ROLL_STORAGE_KEY_LEGACY) &&
      e.newValue
    ) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed && typeof parsed === "object") {
          scopedStates.attack = { ...DEFAULT_SITUATIONAL_ROLL_STATE, ...parsed };
          notifyLocalListeners("attack");
        }
      } catch {}
    }
  });
}

// Track pending critical hits keyed by action/weapon/spell ID or "__last__"
const pendingCriticalHits = new Map<string, boolean>();

function syncFromStorage(scope: SituationalRollScope): void {
  hydrateScopeFromStorage(scope);
}

/**
 * Gets current situational roll modifier state for the given scope (default: "attack").
 */
export function getSituationalRollState(scope: SituationalRollScope = "attack"): SituationalRollState {
  syncFromStorage(scope);
  return { ...scopedStates[scope] };
}

/**
 * Updates situational roll modifier state for the given scope (default: "attack").
 */
export function setSituationalRollState(
  partial: Partial<SituationalRollState>,
  scope: SituationalRollScope = "attack"
): void {
  scopedStates[scope] = {
    ...scopedStates[scope],
    ...partial,
  };
  broadcastAndNotify(scope);
}

/**
 * Resets situational roll state back to default (Normal, +0) for the given scope (default: "attack").
 */
export function resetSituationalRollState(scope: SituationalRollScope = "attack"): void {
  scopedStates[scope] = { ...DEFAULT_SITUATIONAL_ROLL_STATE };
  broadcastAndNotify(scope);
}

/**
 * Subscribes to changes in situational roll modifier state for the given scope (default: "attack").
 */
export function subscribeSituationalRollState(
  listener: (state: SituationalRollState) => void,
  scope: SituationalRollScope = "attack"
): () => void {
  scopedListeners[scope].add(listener);
  listener({ ...scopedStates[scope] });
  return () => {
    scopedListeners[scope].delete(listener);
  };
}

/**
 * Consumes the active situational roll override for an incoming roll for the given scope (default: "attack"),
 * automatically resetting the state back to default (Normal, +0) immediately after.
 */
export function consumeSituationalRollOverride(
  scope: SituationalRollScope = "attack"
): ConsumedSituationalRollOverride {
  syncFromStorage(scope);
  const { mode, bonus, diceBonus } = scopedStates[scope];
  let rolledDiceBonus = 0;
  const breakdownParts: string[] = [];

  if (diceBonus && diceBonus.trim()) {
    try {
      const res = rollFormula(diceBonus.trim());
      rolledDiceBonus = res.total;
      breakdownParts.push(`[${diceBonus}: ${res.breakdown}]`);
    } catch {}
  }

  if (bonus !== 0) {
    breakdownParts.push(bonus > 0 ? `+${bonus}` : `${bonus}`);
  }

  const totalBonus = bonus + rolledDiceBonus;
  const breakdown = breakdownParts.join(" + ");
  const hasOverride = mode !== "normal" || totalBonus !== 0 || Boolean(diceBonus);

  // Auto-reset state back to normal after roll for this specific scope
  resetSituationalRollState(scope);

  return {
    hasOverride,
    mode,
    bonus,
    diceBonus,
    rolledDiceBonus,
    totalBonus,
    breakdown,
  };
}

/**
 * Registers a critical hit (e.g. from a Natural 20 to-hit roll).
 */
export function registerPendingCriticalHit(actionId?: string): void {
  if (actionId) {
    pendingCriticalHits.set(actionId, true);
  }
  pendingCriticalHits.set("__last__", true);
}

/**
 * Consumes and clears a pending critical hit for an action or weapon/spell damage roll.
 */
export function consumePendingCriticalHit(actionId?: string): boolean {
  if (actionId) {
    if (pendingCriticalHits.get(actionId)) {
      pendingCriticalHits.delete(actionId);
      pendingCriticalHits.delete("__last__");
      return true;
    }
    return false;
  }
  if (pendingCriticalHits.get("__last__")) {
    pendingCriticalHits.delete("__last__");
    return true;
  }
  return false;
}

/**
 * Checks whether a critical hit is pending without clearing it.
 */
export function peekPendingCriticalHit(actionId?: string): boolean {
  if (actionId) {
    return Boolean(pendingCriticalHits.get(actionId));
  }
  return Boolean(pendingCriticalHits.get("__last__"));
}

/**
 * Clears all pending critical hits.
 */
export function clearPendingCriticalHits(): void {
  pendingCriticalHits.clear();
}
