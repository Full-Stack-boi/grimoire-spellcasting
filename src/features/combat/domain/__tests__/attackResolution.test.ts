import { describe, it, expect } from "vitest";
import {
  resolveAttackHit,
  evaluateShieldReaction,
  calculateEffectiveDamage,
  formatHitLabelForViewer,
  evaluateTargetShieldStatus,
} from "../attackResolution";

describe("attackResolution", () => {
  describe("resolveAttackHit", () => {
    it("handles Natural 20 as automatic critical hit regardless of high AC", () => {
      const result = resolveAttackHit({ d20: 20, total: 25 }, 30);
      expect(result.isHit).toBe(true);
      expect(result.isCrit).toBe(true);
      expect(result.isMiss).toBe(false);
      expect(result.badgeClass).toBe("badge-crit");
      expect(result.hitLabel).toContain("CRITICAL HIT!");
      expect(result.hitLabel).toContain("25 vs AC 30");
    });

    it("handles Natural 1 as automatic critical miss regardless of low AC", () => {
      const result = resolveAttackHit({ d20: 1, total: 10 }, 5);
      expect(result.isHit).toBe(false);
      expect(result.isCrit).toBe(false);
      expect(result.isMiss).toBe(true);
      expect(result.badgeClass).toBe("badge-miss");
      expect(result.hitLabel).toContain("CRITICAL MISS!");
    });

    it("hits when total equals target AC", () => {
      const result = resolveAttackHit({ d20: 10, total: 15 }, 15);
      expect(result.isHit).toBe(true);
      expect(result.margin).toBe(0);
      expect(result.badgeClass).toBe("badge-hit");
      expect(result.hitLabel).toBe("HIT (15 vs AC 15)");
    });

    it("hits when total exceeds target AC", () => {
      const result = resolveAttackHit({ d20: 14, total: 18 }, 14);
      expect(result.isHit).toBe(true);
      expect(result.margin).toBe(4);
      expect(result.badgeClass).toBe("badge-hit");
      expect(result.hitLabel).toBe("HIT (18 vs AC 14)");
    });

    it("misses when total is less than target AC", () => {
      const result = resolveAttackHit({ d20: 7, total: 11 }, 14);
      expect(result.isHit).toBe(false);
      expect(result.margin).toBe(-3);
      expect(result.badgeClass).toBe("badge-miss");
      expect(result.hitLabel).toBe("MISS (11 vs AC 14)");
    });

    it("hides exact AC numbers when hideAcNumber option is enabled", () => {
      const hit = resolveAttackHit({ d20: 15, total: 20 }, 15, { hideAcNumber: true });
      expect(hit.hitLabel).toBe("HIT");

      const miss = resolveAttackHit({ d20: 5, total: 10 }, 15, { hideAcNumber: true });
      expect(miss.hitLabel).toBe("MISS");

      const crit = resolveAttackHit({ d20: 20, total: 25 }, 15, { hideAcNumber: true });
      expect(crit.hitLabel).toBe("CRITICAL HIT!");
    });
  });

  describe("evaluateShieldReaction", () => {
    it("turns a hit into a miss when attack is less than AC + 5", () => {
      // Base AC 14, Shield AC 19. Roll total 17.
      const result = evaluateShieldReaction(17, 12, 14);
      expect(result.shieldBlocks).toBe(true);
      expect(result.newAc).toBe(19);
      expect(result.reason).toContain("Blocked by Shield (17 vs AC 19)");
    });

    it("penetrates Shield when attack is equal or higher than AC + 5", () => {
      // Base AC 14, Shield AC 19. Roll total 20.
      const result = evaluateShieldReaction(20, 15, 14);
      expect(result.shieldBlocks).toBe(false);
      expect(result.newAc).toBe(19);
      expect(result.reason).toContain("Attack penetrates Shield (20 vs AC 19)");
    });

    it("cannot block a Natural 20 critical hit even if total is lower than Shield AC", () => {
      // Base AC 25, Shield AC 30. Nat 20 roll total 27.
      const result = evaluateShieldReaction(27, 20, 25);
      expect(result.shieldBlocks).toBe(false);
      expect(result.reason).toContain("Critical Hit penetrates Shield");
    });
  });

  describe("calculateEffectiveDamage", () => {
    it("returns full damage rounded down to whole integer", () => {
      expect(calculateEffectiveDamage(17, "full")).toBe(17);
      expect(calculateEffectiveDamage(14.8, "full")).toBe(14);
    });

    it("returns half damage rounded down according to 5e rules", () => {
      expect(calculateEffectiveDamage(15, "half")).toBe(7);
      expect(calculateEffectiveDamage(14, "half")).toBe(7);
      expect(calculateEffectiveDamage(1, "half")).toBe(0);
    });

    it("returns zero when modifier is zero", () => {
      expect(calculateEffectiveDamage(25, "zero")).toBe(0);
    });
  });

  describe("formatHitLabelForViewer", () => {
    it("returns full comparison when viewer is GM", () => {
      expect(formatHitLabelForViewer("HIT (24 vs AC 15)", true)).toBe("HIT (24 vs AC 15)");
      expect(formatHitLabelForViewer("MISS (11 vs AC 15)", true)).toBe("MISS (11 vs AC 15)");
      expect(formatHitLabelForViewer("CRITICAL HIT! (25 vs AC 15)", true)).toBe("CRITICAL HIT! (25 vs AC 15)");
      expect(formatHitLabelForViewer("CRITICAL MISS! (1 vs AC 15)", true)).toBe("CRITICAL MISS! (1 vs AC 15)");
    });

    it("masks target AC numbers when viewer is Player and hideAcFromPlayers is true", () => {
      expect(formatHitLabelForViewer("HIT (24 vs AC 15)", false, true)).toBe("HIT");
      expect(formatHitLabelForViewer("MISS (11 vs AC 15)", false, true)).toBe("MISS");
      expect(formatHitLabelForViewer("CRITICAL HIT! (25 vs AC 15)", false, true)).toBe("CRITICAL HIT!");
      expect(formatHitLabelForViewer("CRITICAL MISS! (1 vs AC 15)", false, true)).toBe("CRITICAL MISS!");
    });

    it("masks target AC numbers by default for players without explicit hideAcFromPlayers param", () => {
      expect(formatHitLabelForViewer("HIT (24 vs AC 15)", false)).toBe("HIT");
      expect(formatHitLabelForViewer("MISS (11 vs AC 15)", false)).toBe("MISS");
    });

    it("reveals AC comparison to players if GM explicitly disables hideAcFromPlayers", () => {
      expect(formatHitLabelForViewer("HIT (24 vs AC 15)", false, false)).toBe("HIT (24 vs AC 15)");
      expect(formatHitLabelForViewer("MISS (11 vs AC 15)", false, false)).toBe("MISS (11 vs AC 15)");
    });

    it("handles plain labels without AC comparison gracefully", () => {
      expect(formatHitLabelForViewer("HIT", false)).toBe("HIT");
      expect(formatHitLabelForViewer("MISS", false)).toBe("MISS");
      expect(formatHitLabelForViewer("CRITICAL HIT!", false)).toBe("CRITICAL HIT!");
      expect(formatHitLabelForViewer(undefined, false)).toBeUndefined();
      expect(formatHitLabelForViewer(null, false)).toBeUndefined();
    });
  });

  describe("evaluateTargetShieldStatus", () => {
    it("returns hasShield false for Horned Devil / non-spellcaster monsters", () => {
      const hornedDevil: any = {
        name: "Horned Devil Large Fiend 01",
        armorClass: 18,
        reactions: [],
        traits: [{ name: "Devil's Sight", description: "Magical darkness doesn't impede darkvision." }],
        actions: [{ name: "Fork", description: "Melee Weapon Attack" }],
      };
      const res = evaluateTargetShieldStatus({ monster: hornedDevil });
      expect(res.hasShield).toBe(false);
      expect(res.canCastFree).toBe(false);
    });

    it("returns hasShield false for monsters with physical shields, Shield Bash, or Shield of Faith", () => {
      const gladiator: any = {
        name: "Gladiator",
        armorClass: 16,
        armorDesc: "Studded Leather, Shield",
        actions: [{ name: "Shield Bash", description: "Melee Weapon Attack" }],
        traits: [],
      };
      expect(evaluateTargetShieldStatus({ monster: gladiator }).hasShield).toBe(false);

      const kuotoa: any = {
        name: "Kuo-Toa",
        armorClass: 13,
        actions: [{ name: "Shield of Faith (2/Day)", description: "Casts Shield of Faith" }],
      };
      expect(evaluateTargetShieldStatus({ monster: kuotoa }).hasShield).toBe(false);
    });

    it("returns hasShield true for monsters with Shield reaction or Spellcasting trait", () => {
      const mageLegacy: any = {
        name: "Mage",
        reactions: [{ name: "Shield", description: "An invisible barrier of magical force protects..." }],
      };
      expect(evaluateTargetShieldStatus({ monster: mageLegacy }).hasShield).toBe(true);

      const archmage2024: any = {
        name: "Archmage",
        reactions: [{ name: "Counterspell or Shield", description: "The archmage casts Counterspell or Shield in response to the spell's trigger." }],
      };
      expect(evaluateTargetShieldStatus({ monster: archmage2024 }).hasShield).toBe(true);

      const mageSpellcasting: any = {
        name: "Mage",
        traits: [{ name: "Spellcasting", description: "1st level (4 slots): detect magic, mage armor, magic missile, shield" }],
      };
      expect(evaluateTargetShieldStatus({ monster: mageSpellcasting }).hasShield).toBe(true);
    });

    it("returns hasShield false for PC without Shield spell (e.g. Kazmalia)", () => {
      const kazmalia: any = {
        name: "Kazmalia",
        spells: [
          { name: "Burning Hands", level: 1 },
          { name: "False Life", level: 1, usesSpellSlot: false },
          { name: "Command", level: 1 },
        ],
        spellSlots: {},
        pactMagic: { max: 2, used: 0 },
      };
      const res = evaluateTargetShieldStatus({ character: kazmalia });
      expect(res.hasShield).toBe(false);
    });

    it("returns hasShield true with slotsExhausted false when PC has Shield and available slots", () => {
      const wizard: any = {
        name: "Gale",
        spells: [{ name: "Shield", level: 1, isPrepared: true }],
        spellSlots: { 1: { max: 4, used: 2 } },
      };
      const res = evaluateTargetShieldStatus({ character: wizard });
      expect(res.hasShield).toBe(true);
      expect(res.slotsExhausted).toBe(false);
      expect(res.slotCount).toBe(2);
    });

    it("returns hasShield true with slotsExhausted true when PC has Shield but 0 slots", () => {
      const exhaustedWizard: any = {
        name: "Gale",
        spells: [{ name: "Shield", level: 1, isPrepared: true, usesSpellSlot: true }],
        spellSlots: {
          1: { max: 4, used: 4 },
          2: { max: 3, used: 3 },
        },
      };
      const res = evaluateTargetShieldStatus({ character: exhaustedWizard });
      expect(res.hasShield).toBe(true);
      expect(res.slotsExhausted).toBe(true);
      expect(res.slotCount).toBe(0);
      expect(res.reason).toContain("0 spell slots recorded on sheet");
    });

    it("does NOT grant free Shield when character has free cast of False Life", () => {
      const charWithFalseLife: any = {
        name: "Kazmalia",
        spells: [
          { name: "False Life", level: 1, usesSpellSlot: false },
          { name: "Shield", level: 1, isPrepared: true, usesSpellSlot: true },
        ],
        spellSlots: { 1: { max: 4, used: 4 } },
      };
      const res = evaluateTargetShieldStatus({ character: charWithFalseLife });
      expect(res.hasShield).toBe(true);
      expect(res.canCastFree).toBe(false);
      expect(res.slotsExhausted).toBe(true);
    });

    it("returns hasShield false for unlinked tokens", () => {
      const res = evaluateTargetShieldStatus({});
      expect(res.hasShield).toBe(false);
    });
  });
});
