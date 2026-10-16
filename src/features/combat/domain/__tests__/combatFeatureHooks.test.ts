import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  hasCharacterFeature,
  extractBaseDiceFormula,
  darkOnesBlessingFeature,
  parasiticLeechFeature,
  dispatchCombatFeatureTrigger,
} from "../combatFeatureHooks";
import type { DDBParsedCharacter, DDBWeaponAttack } from "../../../../types/ddb";
import * as tokenVitalsService from "../../tokenVitalsService";

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {
    isReady: true,
    notification: {
      show: vi.fn(),
    },
  },
}));

vi.mock("../../tokenVitalsService", () => ({
  getTokenVitals: vi.fn(),
  setTokenVitals: vi.fn(),
}));

describe("combatFeatureHooks domain", () => {
  const baseMockChar: DDBParsedCharacter = {
    id: 999999,
    name: "Test Caster",
    avatarUrl: "",
    level: 6,
    classes: [{ name: "Warlock", level: 6, subclass: "The Fiend" }],
    stats: { str: 10, dex: 14, con: 14, int: 10, wis: 10, cha: 18 },
    modifiers: { str: 0, dex: 2, con: 2, int: 0, wis: 0, cha: 4 },
    proficiencyBonus: 3,
    spellCastingAbility: "CHA",
    spellSaveDC: 15,
    spellSaveDCDisplay: "15",
    spellAttackBonus: 7,
    spellAttackBonusDisplay: "+7",
    spellSlots: {},
    spells: [],
    senses: {},
    lastSynced: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("extractBaseDiceFormula", () => {
    it("extracts clean dice formula removing flat modifiers", () => {
      expect(extractBaseDiceFormula("1d12+4")).toBe("1d12");
      expect(extractBaseDiceFormula("2d6 + 3")).toBe("2d6");
      expect(extractBaseDiceFormula("1d8")).toBe("1d8");
      expect(extractBaseDiceFormula("1d10-1")).toBe("1d10");
    });
  });

  describe("hasCharacterFeature", () => {
    it("detects features from actions, feats, options, and subclass", () => {
      const charWithSubclass: DDBParsedCharacter = {
        ...baseMockChar,
        classes: [{ name: "Warlock", level: 6, subclass: "The Fiend" }],
      };
      expect(hasCharacterFeature(charWithSubclass, /fiend/i)).toBe(true);

      const charWithOptions: DDBParsedCharacter = {
        ...baseMockChar,
        options: [
          { id: 1, name: "Heliana's Guide to Monster Hunting: Parasitic Leech", source: "class" },
        ],
      };
      expect(hasCharacterFeature(charWithOptions, /parasitic leech/i)).toBe(true);

      const charWithAction: DDBParsedCharacter = {
        ...baseMockChar,
        actions: [
          { id: "a1", name: "Dark One's Blessing", source: "class", activationType: "none", description: "Temp HP" },
        ],
      };
      expect(hasCharacterFeature(charWithAction, /dark one's blessing/i)).toBe(true);
    });

    it("returns false when character lacks the feature", () => {
      const basicChar: DDBParsedCharacter = {
        ...baseMockChar,
        classes: [{ name: "Fighter", level: 6 }],
      };
      expect(hasCharacterFeature(basicChar, /parasitic leech/i)).toBe(false);
      expect(hasCharacterFeature(basicChar, /fiend/i)).toBe(false);
    });
  });

  describe("Dark One's Blessing (Fiend Warlock)", () => {
    it("grants Temp HP = warlockLevel + CHA modifier on target defeated", async () => {
      const char: DDBParsedCharacter = {
        ...baseMockChar,
        level: 6,
        classes: [{ name: "Warlock", level: 6, subclass: "The Fiend" }],
        modifiers: { ...baseMockChar.modifiers, cha: 4 },
      };

      expect(darkOnesBlessingFeature.isGrantedToCharacter(char)).toBe(true);
      const res = await darkOnesBlessingFeature.execute({
        character: char,
        casterTokenId: "token-caster-1",
        targetTokenId: "token-enemy-1",
      }, "on_target_defeated");

      expect(res).toBeDefined();
      expect(res?.tempHpGranted).toBe(10); // Level 6 + CHA 4 = 10
      expect(res?.message).toContain("10 Temporary HP");
    });

    it("ensures minimum 1 Temp HP even with negative CHA modifier", async () => {
      const char: DDBParsedCharacter = {
        ...baseMockChar,
        level: 1,
        classes: [{ name: "Warlock", level: 1, subclass: "The Fiend" }],
        modifiers: { ...baseMockChar.modifiers, cha: -3 },
      };

      const res = await darkOnesBlessingFeature.execute({
        character: char,
      }, "on_target_defeated");

      expect(res?.tempHpGranted).toBe(1); // Math.max(1, 1 - 3) = 1
    });

    it("correctly calculates Kazmalia multiclass (Level 4 Warlock Fiend / Level 2 Sorcerer, CHA +3)", async () => {
      const kazmalia: DDBParsedCharacter = {
        ...baseMockChar,
        id: 170484944,
        name: "Kazmalia",
        level: 6,
        classes: [
          { name: "Warlock", level: 4, subclass: "The Fiend" },
          { name: "Sorcerer", level: 2, subclass: "Divine Soul" },
        ],
        modifiers: { ...baseMockChar.modifiers, cha: 3 },
      };

      expect(darkOnesBlessingFeature.isGrantedToCharacter(kazmalia)).toBe(true);

      const res = await darkOnesBlessingFeature.execute({
        character: kazmalia,
        casterTokenId: "token-kazmalia",
        targetTokenId: "token-goblin",
      }, "on_target_defeated");

      expect(res).toBeDefined();
      // Kazmalia: 4 Warlock levels + 3 CHA modifier = 7 Temp HP
      expect(res?.tempHpGranted).toBe(7);
      expect(res?.message).toContain("7 Temporary HP");
    });
  });

  describe("Parasitic Leech (The Parasite)", () => {
    const parasiticWeapon: DDBWeaponAttack = {
      id: "atk-pw",
      name: "Parasitic Weapon (Piercing)",
      type: "melee",
      rangeText: "15 ft. Reach",
      rangeFeet: 15,
      toHit: 8,
      damage: "1d12",
      damageType: "Piercing",
      properties: ["Melee Attack", "Action Attack"],
    };

    const regularWeapon: DDBWeaponAttack = {
      id: "atk-sw",
      name: "Shortsword",
      type: "melee",
      rangeText: "5 ft. Reach",
      rangeFeet: 5,
      toHit: 5,
      damage: "1d6+2",
      damageType: "Piercing",
      properties: ["Finesse", "Light"],
    };

    const charWithLeech: DDBParsedCharacter = {
      ...baseMockChar,
      options: [
        { id: 5712421, name: "Heliana's Guide to Monster Hunting: Parasitic Leech", source: "class" },
      ],
    };

    it("identifies feature grant and matches parasitic weapons while ignoring regular weapons", () => {
      expect(parasiticLeechFeature.isGrantedToCharacter(charWithLeech)).toBe(true);
      expect(parasiticLeechFeature.weaponMatches!(parasiticWeapon, charWithLeech)).toBe(true);
      expect(parasiticLeechFeature.weaponMatches!(regularWeapon, charWithLeech)).toBe(false);
    });

    it("grants Temp HP on critical hit equal to rolled dice", async () => {
      const res = await parasiticLeechFeature.execute({
        character: charWithLeech,
        weapon: parasiticWeapon,
        damageDiceRoll: 11,
        isCritical: true,
      }, "on_critical_hit");

      expect(res).toBeDefined();
      expect(res?.tempHpGranted).toBe(11);
      expect(res?.message).toContain("11 Temporary HP");
      expect(res?.message).toContain("Critical Hit");
    });

    it("grants Temp HP on target defeated equal to rolled damage", async () => {
      const res = await parasiticLeechFeature.execute({
        character: charWithLeech,
        weapon: parasiticWeapon,
        damageDiceRoll: 9,
      }, "on_target_defeated");

      expect(res).toBeDefined();
      expect(res?.tempHpGranted).toBe(9);
      expect(res?.message).toContain("9 Temporary HP");
      expect(res?.message).toContain("defeating enemy");
    });
  });

  describe("dispatchCombatFeatureTrigger", () => {
    it("dispatches to all matching registered features and updates token vitals (non-stacking)", async () => {
      const charWithBoth: DDBParsedCharacter = {
        ...baseMockChar,
        classes: [{ name: "Warlock", level: 6, subclass: "The Fiend" }],
        options: [
          { id: 5712421, name: "Parasitic Leech", source: "class" },
        ],
      };

      const parasiticWeapon: DDBWeaponAttack = {
        id: "atk-pw",
        name: "Parasitic Weapon",
        type: "melee",
        rangeText: "15 ft. Reach",
        rangeFeet: 15,
        toHit: 8,
        damage: "1d12",
        damageType: "Piercing",
        properties: ["Melee Attack"],
      };

      // Mock caster currently having 4 Temp HP
      vi.mocked(tokenVitalsService.getTokenVitals).mockResolvedValue({
        hpCurrent: 30,
        hpMax: 40,
        hpTemp: 4,
      } as any);

      const results = await dispatchCombatFeatureTrigger("on_target_defeated", {
        character: charWithBoth,
        casterTokenId: "token-caster-1",
        targetTokenId: "token-enemy-1",
        weapon: parasiticWeapon,
        damageDiceRoll: 8,
      });

      expect(results.length).toBe(2);
      expect(results.map(r => r.featureId)).toContain("parasitic_leech");
      expect(results.map(r => r.featureId)).toContain("dark_ones_blessing");

      // Verify setTokenVitals was called to upgrade Temp HP
      expect(tokenVitalsService.setTokenVitals).toHaveBeenCalled();
    });

    it("calls onGrantTempHp callback when provided", async () => {
      const kazmalia: DDBParsedCharacter = {
        ...baseMockChar,
        id: 170484944,
        name: "Kazmalia",
        classes: [
          { name: "Warlock", level: 4, subclass: "The Fiend" },
          { name: "Sorcerer", level: 2, subclass: "Divine Soul" },
        ],
        modifiers: { ...baseMockChar.modifiers, cha: 3 },
      };

      vi.mocked(tokenVitalsService.getTokenVitals).mockResolvedValue({
        hpCurrent: 44,
        hpMax: 44,
        hpTemp: 0,
      } as any);

      const tempHpCallback = vi.fn();

      await dispatchCombatFeatureTrigger("on_target_defeated", {
        character: kazmalia,
        casterTokenId: "token-kazmalia",
        targetTokenId: "token-enemy",
        onGrantTempHp: tempHpCallback,
      });

      expect(tempHpCallback).toHaveBeenCalledWith(7);
    });

    it("does not downgrade existing Temp HP if new amount is lower", async () => {
      const charWithFiend: DDBParsedCharacter = {
        ...baseMockChar,
        classes: [{ name: "Warlock", level: 3, subclass: "The Fiend" }],
        modifiers: { ...baseMockChar.modifiers, cha: 2 }, // yields 5 Temp HP
      };

      // Mock caster currently having 15 Temp HP (higher than 5)
      vi.mocked(tokenVitalsService.getTokenVitals).mockResolvedValue({
        hpCurrent: 20,
        hpMax: 25,
        hpTemp: 15,
      } as any);

      await dispatchCombatFeatureTrigger("on_target_defeated", {
        character: charWithFiend,
        casterTokenId: "token-caster-1",
        targetTokenId: "token-enemy-1",
      });

      // setTokenVitals should NOT be called because 15 > 5
      expect(tokenVitalsService.setTokenVitals).not.toHaveBeenCalled();
    });
  });
});
