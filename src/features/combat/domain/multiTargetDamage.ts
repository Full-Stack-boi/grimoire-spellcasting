import type { DDBSubRollEntry } from "../../../types/ddbRollLog";

export interface TargetDamageAllocation {
  targetId: string;
  targetName: string;
  totalDamage: number;
  damageType?: string;
  breakdownSummary?: string;
}

export interface DefenseResolutionResult {
  effectiveDamage: number;
  modifier: "normal" | "resistant" | "immune" | "vulnerable";
  note?: string;
}

/**
 * Pure function: Resolves effective damage against a creature's defenses
 * according to 5e rules:
 * - Immunity: 0 damage
 * - Resistance: Math.floor(damage / 2)
 * - Vulnerability: damage * 2
 * - Normal: damage unmodified
 */
export function resolveDefenseDamage(
  damage: number,
  damageType?: string,
  defenses?: { resistances?: string[]; immunities?: string[]; vulnerabilities?: string[] }
): DefenseResolutionResult {
  const roundedDmg = Math.max(0, Math.floor(damage));
  if (roundedDmg <= 0 || !damageType || !defenses) {
    return { effectiveDamage: roundedDmg, modifier: "normal" };
  }

  const normType = damageType.trim().toLowerCase();
  const immunities = (defenses.immunities || []).map((d) => d.toLowerCase());
  const resistances = (defenses.resistances || []).map((d) => d.toLowerCase());
  const vulnerabilities = (defenses.vulnerabilities || []).map((d) => d.toLowerCase());

  if (immunities.includes(normType) || immunities.includes("all")) {
    return {
      effectiveDamage: 0,
      modifier: "immune",
      note: `Immune to ${damageType} (0 Damage)`,
    };
  }

  const resistant = resistances.includes(normType) || resistances.includes("all");
  const vulnerable = vulnerabilities.includes(normType) || vulnerabilities.includes("all");
  if (resistant && vulnerable) {
    return {
      effectiveDamage: roundedDmg,
      modifier: "normal",
      note: `Resistance and vulnerability to ${damageType} cancel`,
    };
  }
  if (resistant) {
    const half = Math.max(0, Math.floor(roundedDmg / 2));
    return {
      effectiveDamage: half,
      modifier: "resistant",
      note: `Resistant to ${damageType} (${roundedDmg} halved to ${half})`,
    };
  }

  if (vulnerable) {
    const doubled = roundedDmg * 2;
    return {
      effectiveDamage: doubled,
      modifier: "vulnerable",
      note: `Vulnerable to ${damageType} (${roundedDmg} doubled to ${doubled})`,
    };
  }

  return { effectiveDamage: roundedDmg, modifier: "normal" };
}

export function resolveDamageWithSaveOutcome(
  damage: number,
  damageType: string | undefined,
  defenses: { resistances?: string[]; immunities?: string[]; vulnerabilities?: string[] } | undefined,
  saveDamageMultiplier: number,
): DefenseResolutionResult {
  const amount = Number.isFinite(damage) ? Math.max(0, damage) : 0;
  const saveMultiplier = [0, 0.5, 1].includes(saveDamageMultiplier)
    ? saveDamageMultiplier
    : 1;
  if (amount === 0) return { effectiveDamage: 0, modifier: "normal" };

  const normalizedType = damageType?.trim().toLowerCase();
  const immunities = (defenses?.immunities || []).map((entry) => entry.toLowerCase());
  const resistances = (defenses?.resistances || []).map((entry) => entry.toLowerCase());
  const vulnerabilities = (defenses?.vulnerabilities || []).map((entry) => entry.toLowerCase());
  if (normalizedType && (immunities.includes(normalizedType) || immunities.includes("all"))) {
    return {
      effectiveDamage: 0,
      modifier: "immune",
      note: `Immune to ${damageType} (0 Damage)`,
    };
  }

  const resistant = Boolean(normalizedType && (resistances.includes(normalizedType) || resistances.includes("all")));
  const vulnerable = Boolean(normalizedType && (vulnerabilities.includes(normalizedType) || vulnerabilities.includes("all")));
  const damageTypeMultiplier =
    resistant === vulnerable ? 1 : resistant ? 0.5 : 2;
  const effectiveDamage = Math.floor(amount * saveMultiplier * damageTypeMultiplier);
  const modifier: DefenseResolutionResult["modifier"] =
    resistant && vulnerable
      ? "normal"
      : resistant
        ? "resistant"
        : vulnerable
          ? "vulnerable"
          : "normal";
  const saveNote =
    saveMultiplier === 0
      ? "No damage on successful save"
      : saveMultiplier === 0.5
        ? `Save damage ×${saveMultiplier}`
        : undefined;
  const defenseNote =
    resistant && vulnerable
      ? `Resistance and vulnerability to ${damageType} cancel`
      : resistant
        ? `Resistant to ${damageType}`
        : vulnerable
          ? `Vulnerable to ${damageType}`
          : undefined;
  const noteParts = [saveNote, defenseNote].filter(Boolean);
  return {
    effectiveDamage,
    modifier,
    note: noteParts.length > 0
      ? `${noteParts.join("; ")} (${amount} → ${effectiveDamage})`
      : undefined,
  };
}

/**
 * Pure function: Groups subRoll entries by target ID and aggregates
 * all damage dealt to each individual target token.
 */
export function aggregateSubRollDamages(
  subRolls: DDBSubRollEntry[] | undefined
): Map<string, TargetDamageAllocation> {
  const map = new Map<string, TargetDamageAllocation>();
  if (!subRolls || subRolls.length === 0) return map;

  for (const sub of subRolls) {
    if (!sub.targetId || !sub.damage) continue;
    // Only accumulate if attack hit or damage exists without an attack roll (e.g. Magic Missile)
    if (sub.toHit && sub.toHit.isHit === false) continue;

    const baseDamage = sub.damage.total || 0;
    const riders = sub.extraDamage?.reduce((acc, r) => acc + (r.total || 0), 0) ?? 0;
    const totalDmg = baseDamage + riders;
    if (totalDmg <= 0) continue;

    const existing = map.get(sub.targetId);
    if (existing) {
      existing.totalDamage += totalDmg;
    } else {
      map.set(sub.targetId, {
        targetId: sub.targetId,
        targetName: sub.targetName || "Target",
        totalDamage: totalDmg,
        damageType: sub.damage.damageType,
      });
    }
  }

  return map;
}
