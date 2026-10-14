import { describe, it, expect } from "vitest";
import {
  resolveDamageWithSaveOutcome,
  resolveDefenseDamage,
  aggregateSubRollDamages,
} from "../multiTargetDamage";
import type { DDBSubRollEntry } from "../../../../types/ddbRollLog";

describe("multiTargetDamage domain logic", () => {
  describe("resolveDefenseDamage", () => {
    it("returns unmodified damage when no defenses or damage type are provided", () => {
      expect(resolveDefenseDamage(10)).toEqual({ effectiveDamage: 10, modifier: "normal" });
      expect(resolveDefenseDamage(14, "Fire")).toEqual({ effectiveDamage: 14, modifier: "normal" });
    });

    describe("resolveDamageWithSaveOutcome", () => {
      it("combines half damage on a successful save with resistance before rounding", () => {
        const result = resolveDamageWithSaveOutcome(
          71,
          "Fire",
          { resistances: ["Fire"] },
          0.5,
        );
        expect(result.effectiveDamage).toBe(17);
        expect(result.modifier).toBe("resistant");
      });

      it("combines save reduction with vulnerability before rounding", () => {
        expect(
          resolveDamageWithSaveOutcome(
            1,
            "Fire",
            { vulnerabilities: ["Fire"] },
            0.5,
          ).effectiveDamage,
        ).toBe(1);
      });

      it("honors immunity and cancels resistance with vulnerability", () => {
        expect(
          resolveDamageWithSaveOutcome(
            71,
            "Fire",
            { immunities: ["Fire"] },
            0.5,
          ).effectiveDamage,
        ).toBe(0);
        expect(
          resolveDamageWithSaveOutcome(
            71,
            "Fire",
            { resistances: ["Fire"], vulnerabilities: ["Fire"] },
            0.5,
          ).effectiveDamage,
        ).toBe(35);
      });
    });

    it("halves damage when creature is resistant to damage type", () => {
      const defenses = { resistances: ["Fire", "Cold"] };
      const res = resolveDefenseDamage(15, "Fire", defenses);
      expect(res.effectiveDamage).toBe(7); // 15 / 2 = 7.5 -> 7
      expect(res.modifier).toBe("resistant");
      expect(res.note).toContain("halved to 7");
    });

    it("sets damage to 0 when creature is immune to damage type", () => {
      const defenses = { immunities: ["Poison"] };
      const res = resolveDefenseDamage(22, "Poison", defenses);
      expect(res.effectiveDamage).toBe(0);
      expect(res.modifier).toBe("immune");
      expect(res.note).toContain("Immune to Poison");
    });

    it("doubles damage when creature is vulnerable to damage type", () => {
      const defenses = { vulnerabilities: ["Radiant"] };
      const res = resolveDefenseDamage(11, "Radiant", defenses);
      expect(res.effectiveDamage).toBe(22);
      expect(res.modifier).toBe("vulnerable");
    });

    it("treats all-damage defenses and cancels resistance with vulnerability", () => {
      expect(resolveDefenseDamage(18, "Cold", { resistances: ["all"] }).effectiveDamage).toBe(9);
      expect(resolveDefenseDamage(18, "Cold", { immunities: ["all"] }).effectiveDamage).toBe(0);
      expect(resolveDefenseDamage(
        18,
        "Cold",
        { resistances: ["all"], vulnerabilities: ["Cold"] },
      )).toMatchObject({ effectiveDamage: 18, modifier: "normal" });
    });

    it("handles case-insensitivity in damage types and defense names", () => {
      const defenses = { resistances: ["necrotic"] };
      const res = resolveDefenseDamage(10, "Necrotic", defenses);
      expect(res.effectiveDamage).toBe(5);
      expect(res.modifier).toBe("resistant");
    });
  });

  describe("aggregateSubRollDamages", () => {
    it("returns empty map for undefined or empty subRolls", () => {
      expect(aggregateSubRollDamages(undefined).size).toBe(0);
      expect(aggregateSubRollDamages([]).size).toBe(0);
    });

    it("correctly aggregates damage to distinct targets for multi-beam attack", () => {
      const subRolls: DDBSubRollEntry[] = [
        {
          unitLabel: "BEAM 1",
          targetId: "token-goblin-a",
          targetName: "Goblin Archer A",
          toHit: { total: 18, diceBreakdown: "11 + 7", isHit: true },
          damage: { total: 8, damageType: "Force", diceBreakdown: "8" },
          extraDamage: [{ name: "Hex", total: 3, damageType: "Necrotic", diceBreakdown: "3" }],
        },
        {
          unitLabel: "BEAM 2",
          targetId: "token-goblin-b",
          targetName: "Goblin Archer B",
          toHit: { total: 16, diceBreakdown: "9 + 7", isHit: true },
          damage: { total: 9, damageType: "Force", diceBreakdown: "9" },
        },
      ];

      const map = aggregateSubRollDamages(subRolls);
      expect(map.size).toBe(2);

      const targetA = map.get("token-goblin-a");
      expect(targetA).toBeDefined();
      expect(targetA?.totalDamage).toBe(11); // 8 base + 3 hex
      expect(targetA?.targetName).toBe("Goblin Archer A");

      const targetB = map.get("token-goblin-b");
      expect(targetB).toBeDefined();
      expect(targetB?.totalDamage).toBe(9);
      expect(targetB?.targetName).toBe("Goblin Archer B");
    });

    it("excludes targets where attack roll missed", () => {
      const subRolls: DDBSubRollEntry[] = [
        {
          unitLabel: "BEAM 1",
          targetId: "token-goblin-a",
          targetName: "Goblin Archer A",
          toHit: { total: 18, diceBreakdown: "11 + 7", isHit: true },
          damage: { total: 10, damageType: "Force", diceBreakdown: "10" },
        },
        {
          unitLabel: "BEAM 2",
          targetId: "token-goblin-b",
          targetName: "Goblin Archer B",
          toHit: { total: 8, diceBreakdown: "1 + 7", isHit: false },
          damage: undefined,
        },
      ];

      const map = aggregateSubRollDamages(subRolls);
      expect(map.size).toBe(1);
      expect(map.get("token-goblin-a")?.totalDamage).toBe(10);
      expect(map.get("token-goblin-b")).toBeUndefined();
    });

    it("accumulates multiple beams hitting the SAME target", () => {
      const subRolls: DDBSubRollEntry[] = [
        {
          unitLabel: "BEAM 1",
          targetId: "token-boss",
          targetName: "Hobgoblin Warlord",
          toHit: { total: 19, diceBreakdown: "12 + 7", isHit: true },
          damage: { total: 11, damageType: "Force", diceBreakdown: "11" },
        },
        {
          unitLabel: "BEAM 2",
          targetId: "token-boss",
          targetName: "Hobgoblin Warlord",
          toHit: { total: 20, diceBreakdown: "13 + 7", isHit: true },
          damage: { total: 7, damageType: "Force", diceBreakdown: "7" },
        },
      ];

      const map = aggregateSubRollDamages(subRolls);
      expect(map.size).toBe(1);
      expect(map.get("token-boss")?.totalDamage).toBe(18); // 11 + 7
    });
  });
});
