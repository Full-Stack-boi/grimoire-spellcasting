import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTokenVitals, syncTokenVitalsFromDDB, VITALS_METADATA_KEY } from "../tokenVitalsService";
import { cacheDDBCharacter, DDB_CHARACTER_METADATA_KEY } from "../../../services/ddbService";
import type { DDBParsedCharacter } from "../../../types/ddb";

// Mock OBR scene items
let mockSceneItems: any[] = [];

vi.mock("@owlbear-rodeo/sdk", () => {
  return {
    default: {
      isReady: true,
      scene: {
        items: {
          getItems: vi.fn(async (ids?: string[]) => {
            if (ids && ids.length > 0) {
              return mockSceneItems.filter((it) => ids.includes(it.id));
            }
            return mockSceneItems;
          }),
          updateItems: vi.fn(async (ids: string[], updateFn: (items: any[]) => void) => {
            const targets = mockSceneItems.filter((it) => ids.includes(it.id));
            updateFn(targets);
          }),
        },
      },
    },
  };
});

describe("syncTokenVitalsFromDDB", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSceneItems = [];
  });

  const mockDdbChar: DDBParsedCharacter = {
    id: 101,
    name: "Rogue",
    armorClass: 16,
    hp: {
      current: 25,
      max: 25,
      temp: 0,
    },
    defenses: {
      resistances: ["Necrotic"],
      immunities: [],
      vulnerabilities: [],
    },
    modifiers: { str: 0, dex: 3, con: 2, int: 0, wis: 1, cha: 0 },
    proficiencyBonus: 2,
    level: 3,
  } as any;

  it("preserves existing damaged HP and temp HP when syncing token vitals from DDB", async () => {
    // Token already in combat: took 17 damage, has 8 HP remaining and 4 temp HP
    mockSceneItems = [
      {
        id: "tok-rogue",
        metadata: {
          [VITALS_METADATA_KEY]: {
            hpCurrent: 8,
            hpMax: 25,
            hpTemp: 4,
            armorClass: 15,
            resistances: [],
            immunities: [],
            vulnerabilities: [],
          },
        },
      },
    ];

    const result = await syncTokenVitalsFromDDB("tok-rogue", mockDdbChar);

    expect(result).not.toBeNull();
    // Current HP must NOT reset to 25!
    expect(result?.hpCurrent).toBe(8);
    expect(result?.hpTemp).toBe(4);
    expect(result?.hpMax).toBe(25);
    // Defenses and AC should be updated from DDB
    expect(result?.resistances).toEqual(["Necrotic"]);
    expect(result?.armorClass).toBe(16);

    // Verify it wrote to scene item metadata
    const token = mockSceneItems.find((it) => it.id === "tok-rogue");
    expect(token.metadata[VITALS_METADATA_KEY].hpCurrent).toBe(8);
    expect(token.metadata[VITALS_METADATA_KEY].hpTemp).toBe(4);
    expect(token.metadata[VITALS_METADATA_KEY].resistances).toEqual(["Necrotic"]);
  });

  it("resets HP to full when resetHp option is explicitly passed (e.g. Long Rest)", async () => {
    mockSceneItems = [
      {
        id: "tok-rogue",
        metadata: {
          [VITALS_METADATA_KEY]: {
            hpCurrent: 8,
            hpMax: 25,
            hpTemp: 4,
            armorClass: 15,
          },
        },
      },
    ];

    const result = await syncTokenVitalsFromDDB("tok-rogue", mockDdbChar, { resetHp: true });

    expect(result).not.toBeNull();
    expect(result?.hpCurrent).toBe(25);
    expect(result?.hpMax).toBe(25);
    expect(result?.hpTemp).toBe(0);
  });

  it("initializes fresh token with full HP when token had no prior vitals", async () => {
    mockSceneItems = [
      {
        id: "tok-fresh",
        metadata: {},
      },
    ];

    const result = await syncTokenVitalsFromDDB("tok-fresh", mockDdbChar);

    expect(result).not.toBeNull();
    expect(result?.hpCurrent).toBe(25);
    expect(result?.hpMax).toBe(25);
    expect(result?.armorClass).toBe(16);
    expect(result?.resistances).toEqual(["Necrotic"]);
  });

  it("clamps current HP to max HP if previous current HP exceeded new max HP", async () => {
    mockSceneItems = [
      {
        id: "tok-rogue",
        metadata: {
          [VITALS_METADATA_KEY]: {
            hpCurrent: 30, // Higher than mockDdbChar.hp.max (25)
            hpMax: 30,
            hpTemp: 0,
          },
        },
      },
    ];

    const result = await syncTokenVitalsFromDDB("tok-rogue", mockDdbChar);

    expect(result).not.toBeNull();
    expect(result?.hpCurrent).toBe(25); // Clamped at 25
    expect(result?.hpMax).toBe(25);
  });

  it("getTokenVitals repairs stale pre-v8 AC 13 to authoritative DDB AC 16 and persists to metadata", async () => {
    cacheDDBCharacter(mockDdbChar);
    mockSceneItems = [
      {
        id: "tok-kazmalia",
        name: "Rogue",
        metadata: {
          [DDB_CHARACTER_METADATA_KEY]: 101,
          [VITALS_METADATA_KEY]: {
            hpCurrent: 12,
            hpMax: 25,
            hpTemp: 0,
            armorClass: 13,
            resistances: ["Necrotic"],
            immunities: [],
            vulnerabilities: [],
          },
        },
      },
    ];

    const vitals = await getTokenVitals("tok-kazmalia");
    expect(vitals?.armorClass).toBe(16);
    expect(vitals?.hpCurrent).toBe(12);
    expect(mockSceneItems[0].metadata[VITALS_METADATA_KEY].armorClass).toBe(16);
  });
});

