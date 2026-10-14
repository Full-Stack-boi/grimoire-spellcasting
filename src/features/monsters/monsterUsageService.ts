import OBR from "@owlbear-rodeo/sdk";
import { APP_KEY } from "../../config";

export const MONSTER_USAGE_METADATA_KEY = `${APP_KEY}/monster-ability-uses`;

export type MonsterUsageCounts = Record<string, number>;

type StoredMonsterUsage = Record<string, number>;

function isUsageMap(value: unknown): value is StoredMonsterUsage {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function makeCounterKey(scopeId: string, abilityId: string): string {
  return `${scopeId}:${abilityId}`;
}

async function readAllUsageCounts(): Promise<StoredMonsterUsage> {
  const metadata = await OBR.scene.getMetadata();
  const stored = metadata[MONSTER_USAGE_METADATA_KEY];
  if (!isUsageMap(stored)) return {};

  return Object.fromEntries(
    Object.entries(stored).filter(
      ([, count]) =>
        typeof count === "number" && Number.isInteger(count) && count >= 0,
    ),
  );
}

async function writeCount(scopeId: string, abilityId: string, used: number): Promise<void> {
  const counts = await readAllUsageCounts();
  counts[makeCounterKey(scopeId, abilityId)] = used;
  await OBR.scene.setMetadata({ [MONSTER_USAGE_METADATA_KEY]: counts });
}

export async function loadMonsterUsageCounts(scopeId: string): Promise<MonsterUsageCounts> {
  const counts = await readAllUsageCounts();
  const prefix = `${scopeId}:`;
  return Object.fromEntries(
    Object.entries(counts)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, used]) => [key.slice(prefix.length), used]),
  );
}

export async function recordMonsterAbilityUse(
  scopeId: string,
  abilityId: string,
  maxUses: number,
): Promise<{ used: number; quotaReached: boolean }> {
  const counts = await readAllUsageCounts();
  const key = makeCounterKey(scopeId, abilityId);
  const used = (counts[key] || 0) + 1;
  counts[key] = used;
  await OBR.scene.setMetadata({ [MONSTER_USAGE_METADATA_KEY]: counts });
  return { used, quotaReached: used >= maxUses };
}

export async function adjustMonsterAbilityUse(
  scopeId: string,
  abilityId: string,
  adjustment: -1 | 1,
): Promise<number> {
  const counts = await readAllUsageCounts();
  const key = makeCounterKey(scopeId, abilityId);
  const used = Math.max(0, (counts[key] || 0) + adjustment);
  counts[key] = used;
  await OBR.scene.setMetadata({ [MONSTER_USAGE_METADATA_KEY]: counts });
  return used;
}

export async function resetMonsterAbilityUse(scopeId: string, abilityId: string): Promise<void> {
  await writeCount(scopeId, abilityId, 0);
}
