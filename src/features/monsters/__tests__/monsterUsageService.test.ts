import { beforeEach, describe, expect, it, vi } from "vitest";

const { sceneMetadata, setMetadata } = vi.hoisted(() => {
  const metadata: { current: Record<string, unknown> } = { current: {} };
  return {
    sceneMetadata: metadata,
    setMetadata: vi.fn(async (patch: Record<string, unknown>) => {
      sceneMetadata.current = { ...sceneMetadata.current, ...patch };
    }),
  };
});

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {
    scene: {
      getMetadata: vi.fn(async () => sceneMetadata.current),
      setMetadata,
    },
  },
}));

import {
  adjustMonsterAbilityUse,
  loadMonsterUsageCounts,
  MONSTER_USAGE_METADATA_KEY,
  recordMonsterAbilityUse,
  resetMonsterAbilityUse,
} from "../monsterUsageService";

describe("monsterUsageService", () => {
  beforeEach(() => {
    sceneMetadata.current = {};
    setMetadata.mockClear();
  });

  it("persists counters independently by monster instance and ability", async () => {
    await recordMonsterAbilityUse("token-a", "spellcasting:lightning-bolt", 1);
    await recordMonsterAbilityUse("token-a", "spellcasting:lightning-bolt", 1);
    await recordMonsterAbilityUse("token-b", "spellcasting:lightning-bolt", 1);

    expect(await loadMonsterUsageCounts("token-a")).toEqual({
      "spellcasting:lightning-bolt": 2,
    });
    expect(await loadMonsterUsageCounts("token-b")).toEqual({
      "spellcasting:lightning-bolt": 1,
    });
    expect(setMetadata).toHaveBeenCalledWith(
      expect.objectContaining({ [MONSTER_USAGE_METADATA_KEY]: expect.any(Object) }),
    );
  });

  it("warns by reporting quota state but still records uses past the limit", async () => {
    expect(await recordMonsterAbilityUse("token-a", "breath", 2)).toEqual({
      used: 1,
      quotaReached: false,
    });
    expect(await recordMonsterAbilityUse("token-a", "breath", 2)).toEqual({
      used: 2,
      quotaReached: true,
    });
    expect(await recordMonsterAbilityUse("token-a", "breath", 2)).toEqual({
      used: 3,
      quotaReached: true,
    });
  });

  it("allows DM-style adjustments and resets only the selected ability", async () => {
    await recordMonsterAbilityUse("token-a", "breath", 1);
    await recordMonsterAbilityUse("token-a", "lightning-bolt", 1);

    expect(await adjustMonsterAbilityUse("token-a", "breath", 1)).toBe(2);
    expect(await adjustMonsterAbilityUse("token-a", "breath", -1)).toBe(1);
    await resetMonsterAbilityUse("token-a", "breath");

    expect(await loadMonsterUsageCounts("token-a")).toEqual({
      breath: 0,
      "lightning-bolt": 1,
    });
    expect(await adjustMonsterAbilityUse("token-a", "breath", -1)).toBe(0);
  });
});
