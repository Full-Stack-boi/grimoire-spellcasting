import { describe, it, expect } from "vitest";
import { resolveArmorClassFromSources } from "../armorClass";
import { extractTokenVitals, VITALS_METADATA_KEY } from "../../tokenVitalsService";
import { resolveAttackHit } from "../attackResolution";
import { getMetadataKey } from "../../../../platform/obr/metadataHelper";
import { cacheDDBCharacter, DDB_CHARACTER_METADATA_KEY } from "../../../../services/ddbService";
import type { DDBParsedCharacter } from "../../../../types/ddb";

describe("resolveArmorClassFromSources", () => {
  it("prefers linked DDB character AC over stale vitals AC (e.g. pre-v8 unarmored 13 vs 16)", () => {
    expect(resolveArmorClassFromSources(13, undefined, 13, 16)).toBe(16);
  });

  it("prefers an explicit non-default vitals AC when no DDB AC is provided", () => {
    expect(resolveArmorClassFromSources(18, 16, 14)).toBe(18);
  });

  it("falls back to bound statblock AC when vitals AC is missing", () => {
    expect(resolveArmorClassFromSources(undefined, 16, 14)).toBe(16);
  });

  it("treats a stored AC of 10 as a stale default when a real AC source exists", () => {
    expect(resolveArmorClassFromSources(10, 16)).toBe(16);
    expect(resolveArmorClassFromSources(10, undefined, 16)).toBe(16);
  });

  it("keeps AC 10 when no other source exists", () => {
    expect(resolveArmorClassFromSources(10, undefined, undefined)).toBe(10);
    expect(resolveArmorClassFromSources(undefined, undefined, undefined)).toBe(10);
  });

  it("ignores invalid values", () => {
    expect(resolveArmorClassFromSources(0, "16", NaN)).toBe(10);
  });
});

describe("extractTokenVitals AC fallback", () => {
  it("uses bound monster AC when stored vitals omit AC", () => {
    const metadata = {
      [VITALS_METADATA_KEY]: { hpCurrent: 27, hpMax: 27 },
      [getMetadataKey("bound-monster")]: { name: "Rogue", armorClass: 16 },
    };
    expect(extractTokenVitals(metadata)?.armorClass).toBe(16);
  });

  it("regression: 13 (DIS) vs a real AC 16 target is a MISS, not a HIT vs default AC 10", () => {
    const metadata = {
      [VITALS_METADATA_KEY]: { hpCurrent: 27, hpMax: 27, armorClass: 10 },
      [getMetadataKey("bound-monster")]: { name: "Rogue", armorClass: 16 },
    };
    const ac = extractTokenVitals(metadata)?.armorClass ?? 0;
    const res = resolveAttackHit({ d20: 10, total: 13, bonus: 3, mode: "disadvantage" }, ac);
    expect(ac).toBe(16);
    expect(res.isHit).toBe(false);
  });

  it("regression: Kazmalia linked DDB token with stale vitals AC 13 resolves to DDB AC 16", () => {
    cacheDDBCharacter({
      id: 170484944,
      name: "Kazmalia",
      armorClass: 16,
      hp: { current: 27, max: 27, temp: 0 },
      classes: [],
      spells: [],
      spellSlots: [],
    } as unknown as DDBParsedCharacter);

    const metadata = {
      [VITALS_METADATA_KEY]: { hpCurrent: 12, hpMax: 27, armorClass: 13 },
      [DDB_CHARACTER_METADATA_KEY]: 170484944,
    };

    const ac = extractTokenVitals(metadata)?.armorClass ?? 0;
    expect(ac).toBe(16);

    const missRoll = resolveAttackHit({ d20: 12, total: 15, bonus: 3, mode: "disadvantage" }, ac);
    expect(missRoll.isHit).toBe(false);

    const hitRoll = resolveAttackHit({ d20: 11, total: 16, bonus: 5, mode: "disadvantage" }, ac);
    expect(hitRoll.isHit).toBe(true);
  });
});

