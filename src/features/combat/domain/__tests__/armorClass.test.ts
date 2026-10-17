import { describe, it, expect } from "vitest";
import { resolveArmorClassFromSources } from "../armorClass";
import { extractTokenVitals, VITALS_METADATA_KEY } from "../../tokenVitalsService";
import { resolveAttackHit } from "../attackResolution";
import { getMetadataKey } from "../../../../platform/obr/metadataHelper";

describe("resolveArmorClassFromSources", () => {
  it("prefers an explicit non-default vitals AC", () => {
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
});
