import { describe, it, expect } from "vitest";
import {
  resolveAttackHit,
  evaluateShieldReaction,
  calculateEffectiveDamage,
  formatHitLabelForViewer,
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
});
