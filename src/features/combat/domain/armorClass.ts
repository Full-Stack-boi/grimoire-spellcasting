/**
 * Pure Armor Class resolution shared by combat math (tokenVitalsService) and the
 * Turn Tracker UIs, so the AC the DM sees is always the AC attacks are resolved against.
 *
 * Priority: linked DDB character sheet AC (authoritative for PCs) → stored vitals AC
 * → bound monster statblock AC → combatant AC → 10.
 * A stored AC of exactly 10 is treated as a stale default (legacy fallback writes)
 * whenever a bound statblock or combatant provides a real AC.
 */
export function resolveArmorClassFromSources(
  vitalsAc: unknown,
  boundAc: unknown,
  combatantAc?: unknown,
  ddbAc?: unknown,
): number {
  const valid = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v > 0;
  if (valid(ddbAc)) return ddbAc;
  const fallback = valid(boundAc) ? boundAc : valid(combatantAc) ? combatantAc : undefined;
  if (valid(vitalsAc) && !(vitalsAc === 10 && fallback !== undefined)) return vitalsAc;
  return fallback ?? 10;
}
