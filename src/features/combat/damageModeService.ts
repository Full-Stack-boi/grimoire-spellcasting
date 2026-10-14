import { GLOBAL_STORAGE_KEYS, getGlobalSettingsValue } from "../../components/Settings/settings";

export type DamageApplicationMode = "gm_approval" | "auto" | "manual";
export type DamageResolutionStatus = "pending" | "applied";

export function getHealResolutionStatus(
  mode: DamageApplicationMode,
  healWasApplied: boolean,
): DamageResolutionStatus {
  return mode === "auto" && healWasApplied ? "applied" : "pending";
}

let inMemoryDamageMode: DamageApplicationMode = "gm_approval";

export function setInMemoryDamageApplicationMode(mode: DamageApplicationMode) {
  inMemoryDamageMode = mode;
}

export async function getDamageApplicationMode(): Promise<DamageApplicationMode> {
  try {
    const val = await getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.DAMAGE_APPLICATION_MODE);
    if (val === "auto" || val === "manual" || val === "gm_approval") {
      return val;
    }
    return inMemoryDamageMode;
  } catch {
    return inMemoryDamageMode;
  }
}
