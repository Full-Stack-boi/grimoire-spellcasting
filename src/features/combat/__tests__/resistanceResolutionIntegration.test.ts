import { describe, it, expect } from "vitest";
import { resolveDefenseDamage, aggregateSubRollDamages } from "../domain/multiTargetDamage";
import { calculateDamageResolution, calculateHealResolution } from "../tokenVitalsService";
import type { DDBSubRollEntry } from "../../../types/ddbRollLog";
import type { TokenVitals } from "../domain/types";

describe("D&D 5e Resistance & Defense Resolution Integration", () => {
  describe("Rogue Necrotic Resistance (User Case Verification)", () => {
    it("halves 11 necrotic damage to 5 for a Rogue character with Necrotic resistance", () => {
      // Mock DDB Character modeled after user's Rogue (Character 170484944)
      const rogueDefenses = {
        resistances: ["Necrotic"],
        immunities: [],
        vulnerabilities: [],
      };

      const result = resolveDefenseDamage(11, "Necrotic", rogueDefenses);
      expect(result.effectiveDamage).toBe(5);
      expect(result.modifier).toBe("resistant");
      expect(result.note).toBe("Resistant to Necrotic (11 halved to 5)");

      // Then calculate vitals damage resolution with 5 effective damage
      const currentVitals: TokenVitals = {
        hpCurrent: 35,
        hpMax: 35,
        hpTemp: 0,
        armorClass: 16,
        resistances: ["Necrotic"],
      };

      const resolution = calculateDamageResolution(currentVitals, result.effectiveDamage);
      expect(resolution.absorbedByTemp).toBe(0);
      expect(resolution.hpLost).toBe(5);
      expect(resolution.nextVitals.hpCurrent).toBe(30);
    });

    it("absorbs partial necrotic damage with temp HP before reducing current HP", () => {
      const rogueDefenses = {
        resistances: ["Necrotic"],
      };

      // 15 Necrotic damage halved to 7
      const defRes = resolveDefenseDamage(15, "Necrotic", rogueDefenses);
      expect(defRes.effectiveDamage).toBe(7);

      const currentVitals: TokenVitals = {
        hpCurrent: 25,
        hpMax: 25,
        hpTemp: 4,
        resistances: ["Necrotic"],
      };

      const resolution = calculateDamageResolution(currentVitals, defRes.effectiveDamage);
      expect(resolution.absorbedByTemp).toBe(4);
      expect(resolution.hpLost).toBe(3); // 7 - 4 = 3
      expect(resolution.nextVitals.hpCurrent).toBe(22);
      expect(resolution.nextVitals.hpTemp).toBe(0);
    });
  });

  describe("Immunities and Vulnerabilities", () => {
    it("completely negates damage for immune damage types", () => {
      const targetDefenses = {
        immunities: ["Poison", "Acid"],
        resistances: ["Fire"],
      };

      const result = resolveDefenseDamage(24, "Poison", targetDefenses);
      expect(result.effectiveDamage).toBe(0);
      expect(result.modifier).toBe("immune");
      expect(result.note).toBe("Immune to Poison (0 Damage)");

      const vitals: TokenVitals = {
        hpCurrent: 20,
        hpMax: 20,
        hpTemp: 0,
      };

      const res = calculateDamageResolution(vitals, result.effectiveDamage);
      expect(res.hpLost).toBe(0);
      expect(res.nextVitals.hpCurrent).toBe(20);
    });

    it("doubles damage for vulnerable damage types", () => {
      const targetDefenses = {
        vulnerabilities: ["Radiant"],
      };

      const result = resolveDefenseDamage(9, "Radiant", targetDefenses);
      expect(result.effectiveDamage).toBe(18);
      expect(result.modifier).toBe("vulnerable");
      expect(result.note).toBe("Vulnerable to Radiant (9 doubled to 18)");

      const vitals: TokenVitals = {
        hpCurrent: 30,
        hpMax: 30,
      };

      const res = calculateDamageResolution(vitals, result.effectiveDamage);
      expect(res.hpLost).toBe(18);
      expect(res.nextVitals.hpCurrent).toBe(12);
    });
  });

  describe("Multi-Beam / Multi-Target Independent Resistance Resolution", () => {
    it("properly resolves different defenses for distinct targets in Eldritch Blast multi-beam", () => {
      // Eldritch Blast Beam 1 hits Rogue (Resistant to Necrotic Hex), Beam 2 hits Skeleton (Vulnerable to Force)
      const subRolls: DDBSubRollEntry[] = [
        {
          unitLabel: "BEAM 1",
          targetId: "token-rogue",
          targetName: "Rogue",
          toHit: { total: 19, diceBreakdown: "14 + 5", isHit: true },
          damage: { total: 8, damageType: "Force", diceBreakdown: "8" },
          extraDamage: [{ name: "Hex", total: 6, damageType: "Necrotic", diceBreakdown: "6" }],
        },
        {
          unitLabel: "BEAM 2",
          targetId: "token-skeleton",
          targetName: "Skeleton",
          toHit: { total: 17, diceBreakdown: "12 + 5", isHit: true },
          damage: { total: 7, damageType: "Force", diceBreakdown: "7" },
          extraDamage: [{ name: "Hex", total: 5, damageType: "Necrotic", diceBreakdown: "5" }],
        },
      ];

      const aggregated = aggregateSubRollDamages(subRolls);
      expect(aggregated.size).toBe(2);

      // Verify Rogue allocation
      const rogueAlloc = aggregated.get("token-rogue");
      expect(rogueAlloc).toBeDefined();
      expect(rogueAlloc?.totalDamage).toBe(14); // 8 Force + 6 Necrotic

      // Verify Skeleton allocation
      const skeletonAlloc = aggregated.get("token-skeleton");
      expect(skeletonAlloc).toBeDefined();
      expect(skeletonAlloc?.totalDamage).toBe(12); // 7 Force + 5 Necrotic

      // Now verify defense calculation for Rogue (Resistant to Necrotic)
      const rogueHexDefense = resolveDefenseDamage(6, "Necrotic", { resistances: ["Necrotic"] });
      expect(rogueHexDefense.effectiveDamage).toBe(3); // 6 halved to 3
      const rogueForceDefense = resolveDefenseDamage(8, "Force", { resistances: ["Necrotic"] });
      expect(rogueForceDefense.effectiveDamage).toBe(8); // Force unmodified
      const totalRogueEffective = rogueForceDefense.effectiveDamage + rogueHexDefense.effectiveDamage;
      expect(totalRogueEffective).toBe(11); // 8 + 3 = 11

      // Verify defense calculation for Skeleton (No resistance)
      const skeletonDefense = resolveDefenseDamage(12, "Force", { resistances: [] });
      expect(skeletonDefense.effectiveDamage).toBe(12);
    });
  });

  describe("Saving Throw Spells and Quarter-Damage (Save + Resistance)", () => {
    it("correctly quarters damage when a character with resistance also passes their save", () => {
      // Base damage: 28 Fire
      const baseDamage = 28;
      // Creature passes Dex save -> half damage = 14
      const halfDamage = Math.floor(baseDamage / 2);
      expect(halfDamage).toBe(14);

      // Creature has Fire resistance -> halves the remaining 14 to 7
      const defenseRes = resolveDefenseDamage(halfDamage, "Fire", { resistances: ["Fire"] });
      expect(defenseRes.effectiveDamage).toBe(7);
      expect(defenseRes.modifier).toBe("resistant");

      // Verify against vitals
      const vitals: TokenVitals = {
        hpCurrent: 40,
        hpMax: 40,
        resistances: ["Fire"],
      };

      const res = calculateDamageResolution(vitals, defenseRes.effectiveDamage);
      expect(res.hpLost).toBe(7);
      expect(res.nextVitals.hpCurrent).toBe(33);
    });
  });

  describe("Healing Resolution", () => {
    it("caps healing at max HP and automatically revives unconscious tokens", () => {
      const unconsciousVitals: TokenVitals = {
        hpCurrent: 0,
        hpMax: 30,
        conditions: ["unconscious", "prone"],
      };

      const healRes = calculateHealResolution(unconsciousVitals, 12);
      expect(healRes.hpRestored).toBe(12);
      expect(healRes.nextVitals.hpCurrent).toBe(12);
      expect(healRes.nextVitals.conditions).not.toContain("unconscious");
      expect(healRes.nextVitals.conditions).toContain("prone");

      // Attempting to overheal beyond hpMax
      const overhealRes = calculateHealResolution(healRes.nextVitals, 50);
      expect(overhealRes.hpRestored).toBe(18); // 30 - 12 = 18
      expect(overhealRes.nextVitals.hpCurrent).toBe(30);
    });
  });
});
