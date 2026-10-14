import type {
  ConcentrationState,
  PendingConcentrationSave,
  TemporaryCombatEffect,
} from "./types";

export function getConcentrationSaveDc(damageTaken: number): number {
  return Math.max(10, Math.floor(Math.max(0, damageTaken) / 2));
}

export function createPendingConcentrationSave(
  concentration: ConcentrationState,
  damageTaken: number,
  now = Date.now(),
): PendingConcentrationSave | null {
  const roundedDamage = Math.max(0, Math.floor(damageTaken));
  if (roundedDamage <= 0) return null;
  return {
    id: `concentration-${now}-${Math.random().toString(36).slice(2, 8)}`,
    spellId: concentration.spellId,
    spellName: concentration.spellName,
    damageTaken: roundedDamage,
    dc: getConcentrationSaveDc(roundedDamage),
    createdAt: now,
  };
}

export function resolveNextConcentrationSave(
  pendingSaves: readonly PendingConcentrationSave[] | undefined,
  total: number,
): {
  resolved: PendingConcentrationSave | null;
  succeeded: boolean | null;
  remaining: PendingConcentrationSave[];
} {
  const pending = [...(pendingSaves ?? [])];
  const resolved = pending.shift() ?? null;
  if (!resolved) return { resolved: null, succeeded: null, remaining: [] };
  const succeeded = total >= resolved.dc;
  return {
    resolved,
    succeeded,
    remaining: succeeded ? pending : [],
  };
}

export function expireEffectsAtTurnStart(
  effects: readonly TemporaryCombatEffect[] | undefined,
  tokenId: string,
): TemporaryCombatEffect[] {
  return (effects ?? []).filter((effect) => effect.expiresOnTurnStartTokenId !== tokenId);
}

export function calculateDisplayedSpeed(
  baseSpeed: number | undefined,
  conditions: readonly string[] | undefined,
  exhaustionLevel: number,
  effects: readonly TemporaryCombatEffect[] | undefined,
): { speed: number | null; reduction: number; isZero: boolean } {
  if (typeof baseSpeed !== "number" || !Number.isFinite(baseSpeed) || baseSpeed < 0) {
    return { speed: null, reduction: 0, isZero: false };
  }

  const normalizedConditions = new Set((conditions ?? []).map((condition) => condition.trim().toLowerCase()));
  const reduction = Math.max(0, Math.floor(exhaustionLevel)) * 5 +
    (effects ?? []).reduce(
      (total, effect) => total + (effect.kind === "speed_reduction" ? effect.valueFeet : 0),
      0,
    );
  const isZero = [
    "grappled",
    "restrained",
    "paralyzed",
    "petrified",
    "stunned",
    "unconscious",
  ].some((condition) => normalizedConditions.has(condition));
  return {
    speed: isZero ? 0 : Math.max(0, baseSpeed - reduction),
    reduction,
    isZero,
  };
}
