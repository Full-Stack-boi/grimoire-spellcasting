import { describe, it, expect } from "vitest";
import {
  extractTokenVitals,
  getHpGradientColor,
  calculateDamageResolution,
  calculateHealResolution,
  calculateTempHpResolution,
  toggleConditionPure,
  isConcentrationVisualForCaster,
  VITALS_METADATA_KEY,
  LEGACY_VITALS_METADATA_KEY,
} from "../tokenVitalsService";
import { APP_KEY } from "../../../config";

describe("tokenVitalsService pure logic", () => {
  describe("extractTokenVitals", () => {
    it("returns null when metadata is undefined or invalid", () => {
      expect(extractTokenVitals(undefined)).toBeNull();
      expect(extractTokenVitals({})).toBeNull();
      expect(extractTokenVitals({ [VITALS_METADATA_KEY]: { invalid: true } as any })).toBeNull();
    });

    it("extracts valid vitals from primary metadata key", () => {
      const metadata = {
        [VITALS_METADATA_KEY]: {
          hpCurrent: 18,
          hpMax: 24,
          hpTemp: 5,
          armorClass: 15,
          conditions: ["poisoned"],
          hideNumbers: false,
        },
      };
      const result = extractTokenVitals(metadata);
      expect(result).not.toBeNull();
      expect(result?.hpCurrent).toBe(18);
      expect(result?.hpMax).toBe(24);
      expect(result?.hpTemp).toBe(5);
      expect(result?.armorClass).toBe(15);
      expect(result?.conditions).toEqual(["poisoned"]);
      expect(result?.resolvedRollKeys).toEqual([]);
    });

    it("extracts resolvedRollKeys when present in metadata", () => {
      const metadata = {
        [VITALS_METADATA_KEY]: {
          hpCurrent: 10,
          hpMax: 10,
          resolvedRollKeys: ["roll_1", "roll_2"],
        },
      };
      const result = extractTokenVitals(metadata);
      expect(result?.resolvedRollKeys).toEqual(["roll_1", "roll_2"]);
    });

    it("extracts valid vitals from legacy metadata key fallback", () => {
      const metadata = {
        [LEGACY_VITALS_METADATA_KEY]: {
          hpCurrent: 30,
          hpMax: 30,
        },
      };
      const result = extractTokenVitals(metadata);
      expect(result).not.toBeNull();
      expect(result?.hpCurrent).toBe(30);
      expect(result?.hpMax).toBe(30);
      expect(result?.armorClass).toBe(10); // default
      expect(result?.hpTemp).toBe(0);
    });

    it("extracts resistances, immunities, and vulnerabilities from metadata", () => {
      const metadata = {
        [VITALS_METADATA_KEY]: {
          hpCurrent: 20,
          hpMax: 20,
          resistances: ["Fire"],
          immunities: ["Poison"],
          vulnerabilities: ["Cold"],
        },
      };
      const result = extractTokenVitals(metadata);
      expect(result?.resistances).toEqual(["Fire"]);
      expect(result?.immunities).toEqual(["Poison"]);
      expect(result?.vulnerabilities).toEqual(["Cold"]);
    });
  });

  describe("getHpGradientColor", () => {
    it("returns dead color for 0 or negative HP", () => {
      expect(getHpGradientColor(0, 30)).toEqual({ fill: "#7f1d1d", stroke: "#991b1b", label: "dead" });
      expect(getHpGradientColor(-5, 30)).toEqual({ fill: "#7f1d1d", stroke: "#991b1b", label: "dead" });
    });

    it("returns healthy green for > 50% HP", () => {
      expect(getHpGradientColor(25, 30)).toEqual({ fill: "#16a34a", stroke: "#22c55e", label: "healthy" });
      expect(getHpGradientColor(16, 30)).toEqual({ fill: "#16a34a", stroke: "#22c55e", label: "healthy" });
    });

    it("returns wounded amber for 25% - 50% HP", () => {
      expect(getHpGradientColor(15, 30)).toEqual({ fill: "#d97706", stroke: "#f59e0b", label: "wounded" });
      expect(getHpGradientColor(8, 30)).toEqual({ fill: "#d97706", stroke: "#f59e0b", label: "wounded" });
    });

    it("returns critical red for < 25% HP", () => {
      expect(getHpGradientColor(5, 30)).toEqual({ fill: "#dc2626", stroke: "#ef4444", label: "critical" });
      expect(getHpGradientColor(1, 30)).toEqual({ fill: "#dc2626", stroke: "#ef4444", label: "critical" });
    });
  });

  describe("calculateDamageResolution", () => {
    it("absorbs damage fully with temporary hit points when temp HP is sufficient", () => {
      const vitals = { hpCurrent: 20, hpMax: 30, hpTemp: 10 };
      const { nextVitals, absorbedByTemp, hpLost } = calculateDamageResolution(vitals, 6);
      expect(absorbedByTemp).toBe(6);
      expect(hpLost).toBe(0);
      expect(nextVitals.hpCurrent).toBe(20);
      expect(nextVitals.hpTemp).toBe(4);
    });

    it("absorbs partial damage with temp HP and deducts the remainder from current HP", () => {
      const vitals = { hpCurrent: 20, hpMax: 30, hpTemp: 5 };
      const { nextVitals, absorbedByTemp, hpLost } = calculateDamageResolution(vitals, 12);
      expect(absorbedByTemp).toBe(5);
      expect(hpLost).toBe(7);
      expect(nextVitals.hpCurrent).toBe(13);
      expect(nextVitals.hpTemp).toBe(0);
    });

    it("clamps HP at 0 and adds unconscious condition when reduced to 0", () => {
      const vitals = { hpCurrent: 10, hpMax: 30, hpTemp: 0, conditions: [] };
      const { nextVitals, hpLost } = calculateDamageResolution(vitals, 25);
      expect(hpLost).toBe(10);
      expect(nextVitals.hpCurrent).toBe(0);
      expect(nextVitals.conditions).toContain("unconscious");
    });
  });

  describe("calculateHealResolution", () => {
    it("heals up to hpMax", () => {
      const vitals = { hpCurrent: 15, hpMax: 30 };
      const { nextVitals, hpRestored } = calculateHealResolution(vitals, 10);
      expect(hpRestored).toBe(10);
      expect(nextVitals.hpCurrent).toBe(25);
    });

    it("caps healing at hpMax and reports accurate hpRestored", () => {
      const vitals = { hpCurrent: 28, hpMax: 30 };
      const { nextVitals, hpRestored } = calculateHealResolution(vitals, 10);
      expect(hpRestored).toBe(2);
      expect(nextVitals.hpCurrent).toBe(30);
    });

    it("removes unconscious and dead conditions when healed from 0 HP", () => {
      const vitals = { hpCurrent: 0, hpMax: 30, conditions: ["unconscious", "poisoned", "dead"] };
      const { nextVitals, hpRestored } = calculateHealResolution(vitals, 5);
      expect(hpRestored).toBe(5);
      expect(nextVitals.hpCurrent).toBe(5);
      expect(nextVitals.conditions).not.toContain("unconscious");
      expect(nextVitals.conditions).not.toContain("dead");
      expect(nextVitals.conditions).toContain("poisoned");
    });
  });

  describe("calculateTempHpResolution", () => {
    it("takes the higher value per 5e rules and does not stack", () => {
      const vitals = { hpCurrent: 20, hpMax: 30, hpTemp: 8 };
      expect(calculateTempHpResolution(vitals, 5).hpTemp).toBe(8);
      expect(calculateTempHpResolution(vitals, 12).hpTemp).toBe(12);
    });
  });

  describe("toggleConditionPure", () => {
    it("adds condition if absent and removes if present (case-insensitive)", () => {
      const initial = ["prone"];
      const withStun = toggleConditionPure(initial, "Stunned");
      expect(withStun).toEqual(["prone", "stunned"]);

      const withoutProne = toggleConditionPure(withStun, "PRONE");
      expect(withoutProne).toEqual(["stunned"]);
    });

    describe("isConcentrationVisualForCaster", () => {
      const effectKey = `${APP_KEY}/effect-id`;
      const spellKey = `${APP_KEY}/spell-id`;

      it("matches only the old spell effect owned by the concentrating caster", () => {
        const metadata = {
          [effectKey]: "darkness.black.opaque",
          [spellKey]: {
            id: "darkness",
            name: "darkness",
            caster: "player-1",
            casterTokenId: "token-1",
          },
        };
        expect(isConcentrationVisualForCaster(metadata, "token-1", "Darkness", "player-1")).toBe(true);
        expect(isConcentrationVisualForCaster(metadata, "token-2", "Darkness", "player-1")).toBe(false);
        expect(isConcentrationVisualForCaster(metadata, "token-1", "Hex", "player-1")).toBe(false);
      });

      it("does not remove spell scene items or legacy effects from other casters", () => {
        expect(isConcentrationVisualForCaster(
          { [spellKey]: { name: "darkness", caster: "player-1" } },
          "token-1",
          "darkness",
          "player-1",
        )).toBe(false);
        expect(isConcentrationVisualForCaster(
          {
            [effectKey]: "darkness.black.opaque",
            [spellKey]: { name: "darkness", caster: "player-2" },
          },
          "token-1",
          "darkness",
          "player-1",
        )).toBe(false);
      });
    });
  });
});
