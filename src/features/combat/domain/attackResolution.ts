/**
 * attackResolution.ts
 *
 * Pure domain logic for D&D 5e attack rolls, AC comparisons,
 * reaction calculations (e.g. Shield spell +5 AC), and damage modifications.
 */

export interface AttackResolutionInput {
  d20: number;
  total: number;
  bonus?: number;
  mode?: "normal" | "advantage" | "disadvantage" | string;
}

export interface AttackResolutionResult {
  isHit: boolean;
  isCrit: boolean;
  isMiss: boolean;
  margin: number;
  hitLabel: string;
  badgeClass: "badge-crit" | "badge-hit" | "badge-miss";
  effectiveAc: number;
}

export interface ShieldReactionResult {
  shieldBlocks: boolean;
  newAc: number;
  shieldBonus: number;
  reason: string;
}

export type DamageModifierType = "full" | "half" | "zero";

export type DamageApplicationMode = "gm_approval" | "auto" | "manual";

/**
 * Evaluates an attack roll against target Armor Class (AC).
 *
 * Rules:
 * - Natural 20 is always an automatic Critical Hit.
 * - Natural 1 is always an automatic Critical Miss.
 * - Otherwise: total >= targetAc is a Hit, total < targetAc is a Miss.
 */
export function resolveAttackHit(
  roll: AttackResolutionInput,
  targetAc: number,
  options?: { hideAcNumber?: boolean }
): AttackResolutionResult {
  const isCrit = roll.d20 === 20;
  const isMiss = roll.d20 === 1;
  const margin = roll.total - targetAc;
  const isHit = isCrit || (!isMiss && roll.total >= targetAc);

  let hitLabel: string;
  let badgeClass: "badge-crit" | "badge-hit" | "badge-miss";

  if (isCrit) {
    hitLabel = options?.hideAcNumber
      ? "CRITICAL HIT!"
      : `CRITICAL HIT! (${roll.total} vs AC ${targetAc})`;
    badgeClass = "badge-crit";
  } else if (isMiss) {
    hitLabel = options?.hideAcNumber
      ? "CRITICAL MISS!"
      : `CRITICAL MISS! (${roll.total} vs AC ${targetAc})`;
    badgeClass = "badge-miss";
  } else if (isHit) {
    hitLabel = options?.hideAcNumber
      ? "HIT"
      : `HIT (${roll.total} vs AC ${targetAc})`;
    badgeClass = "badge-hit";
  } else {
    hitLabel = options?.hideAcNumber
      ? "MISS"
      : `MISS (${roll.total} vs AC ${targetAc})`;
    badgeClass = "badge-miss";
  }

  return {
    isHit,
    isCrit,
    isMiss,
    margin,
    hitLabel,
    badgeClass,
    effectiveAc: targetAc,
  };
}

/**
 * Formats a hitLabel for display based on viewer role and GM privacy settings.
 *
 * Rules:
 * - If viewer is GM, or if hideAcFromPlayers is false, retain full comparison:
 *   e.g. "HIT (24 vs AC 15)" -> "HIT (24 vs AC 15)"
 * - If viewer is Player and hideAcFromPlayers is true (default):
 *   Strips the "(... vs AC ...)" calculation to prevent spoiling monster AC:
 *   e.g. "HIT (24 vs AC 15)" -> "HIT"
 *        "MISS (11 vs AC 15)" -> "MISS"
 *        "CRITICAL HIT! (25 vs AC 15)" -> "CRITICAL HIT!"
 *        "CRITICAL MISS! (1 vs AC 15)" -> "CRITICAL MISS!"
 */
export function formatHitLabelForViewer(
  hitLabel: string | undefined | null,
  isGm: boolean,
  hideAcFromPlayers = true
): string | undefined {
  if (!hitLabel) return undefined;
  if (isGm || !hideAcFromPlayers) {
    return hitLabel;
  }
  // Strip any parenthetical comparison mentioning "vs AC" or "vs. AC"
  const sanitized = hitLabel.replace(/\s*\([^)]*vs\.?\s+AC[^)]*\)/gi, "").trim();
  return sanitized || hitLabel;
}

/**
 * Evaluates the Shield spell reaction (+5 AC) against an incoming attack roll.
 *
 * Rules:
 * - Shield adds +5 to AC.
 * - Critical Hit (Natural 20) penetrates any AC, so Shield cannot prevent a Nat 20.
 * - If rollTotal < (baseAc + 5), the attack is turned into a Miss.
 * - Otherwise, the attack still hits despite Shield.
 */
export function evaluateShieldReaction(
  rollTotal: number,
  naturalD20: number,
  baseAc: number,
  shieldBonus = 5
): ShieldReactionResult {
  const newAc = baseAc + shieldBonus;

  if (naturalD20 === 20) {
    return {
      shieldBlocks: false,
      newAc,
      shieldBonus,
      reason: `Critical Hit penetrates Shield (+${shieldBonus} AC = ${newAc})`,
    };
  }

  if (rollTotal < newAc) {
    return {
      shieldBlocks: true,
      newAc,
      shieldBonus,
      reason: `Blocked by Shield (${rollTotal} vs AC ${newAc})`,
    };
  }

  return {
    shieldBlocks: false,
    newAc,
    shieldBonus,
    reason: `Attack penetrates Shield (${rollTotal} vs AC ${newAc})`,
  };
}

/**
 * Calculates modified damage according to D&D 5e rounding rules (round down).
 */
export function calculateEffectiveDamage(
  totalDamage: number,
  modifier: DamageModifierType
): number {
  if (modifier === "zero") return 0;
  if (modifier === "half") return Math.max(0, Math.floor(totalDamage / 2));
  return Math.max(0, Math.floor(totalDamage));
}
