import { describe, it, expect } from "vitest";
import type { Item } from "@owlbear-rodeo/sdk";
import type { DDBParsedCharacter } from "../../../../types/ddb";
import type { SpellFormula } from "../../../../types/spellFormula";
import type { CombatEncounter, Combatant } from "../types";
import {
  TOKEN_DISPOSITION_METADATA_KEY,
  LEGACY_TOKEN_DISPOSITION_METADATA_KEY,
} from "../types";
import {
  isRangedAttackAction,
  resolveRollMode,
  hasCloseCombatDisadvantageBypass,
  getTokenDisposition,
  isTokenHostileToCaster,
  checkCloseCombatThreat,
} from "../attackRangeRules";
import fs from "fs";
import path from "path";

describe("attackRangeRules - Pure D&D 5e Close Combat & Cancellation Rules", () => {
  describe("getTokenDisposition - Metadata reading", () => {
    it("reads modern disposition key", () => {
      const item = {
        id: "tok-1",
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "hostile",
        },
      } as unknown as Item;
      expect(getTokenDisposition(item)).toBe("hostile");
    });

    it("reads legacy disposition key as fallback", () => {
      const item = {
        id: "tok-2",
        metadata: {
          [LEGACY_TOKEN_DISPOSITION_METADATA_KEY]: "friendly",
        },
      } as unknown as Item;
      expect(getTokenDisposition(item)).toBe("friendly");
    });

    it("returns null when no disposition is set", () => {
      const item = {
        id: "tok-3",
        metadata: {},
      } as unknown as Item;
      expect(getTokenDisposition(item)).toBeNull();
    });
  });
  describe("isRangedAttackAction - 100% Data-Driven (Zero Hardcoding)", () => {
    it("identifies ranged spell attacks via spellFormula.interaction.type", () => {
      const spellAttackFormula = {
        name: "Custom Ranged Zap",
        interaction: { type: "spell_attack" },
      } as SpellFormula;

      expect(
        isRangedAttackAction({
          spellFormula: spellAttackFormula,
        })
      ).toBe(true);
    });

    it("rejects melee spell attacks via spellFormula.interaction.type", () => {
      const meleeSpellFormula = {
        name: "Custom Shock Touch",
        interaction: { type: "melee_spell_attack" },
      } as SpellFormula;

      expect(
        isRangedAttackAction({
          spellFormula: meleeSpellFormula,
        })
      ).toBe(false);
    });

    it("rejects saving throw spells via spellFormula.interaction.type", () => {
      const saveSpellFormula = {
        name: "Custom Sacred Blast",
        interaction: { type: "save" },
      } as SpellFormula;

      expect(
        isRangedAttackAction({
          spellFormula: saveSpellFormula,
        })
      ).toBe(false);
    });

    it("identifies ranged spell attacks via saveOrAttack text", () => {
      expect(
        isRangedAttackAction({
          saveOrAttack: "Ranged Spell Attack",
        })
      ).toBe(true);

      expect(
        isRangedAttackAction({
          saveOrAttack: "Melee Spell Attack",
        })
      ).toBe(false);

      expect(
        isRangedAttackAction({
          saveOrAttack: "DEX Save",
        })
      ).toBe(false);
    });

    it("identifies ranged weapon attacks vs melee weapon attacks", () => {
      // Ranged weapon
      expect(
        isRangedAttackAction({
          weapon: { type: "ranged" },
        })
      ).toBe(true);

      // Thrown melee weapon (e.g. Dagger, Handaxe, Javelin thrown)
      expect(
        isRangedAttackAction({
          weapon: { type: "melee", isThrown: true, thrownRange: 20 },
          isThrown: true,
        })
      ).toBe(true);

      // Melee weapon not thrown
      expect(
        isRangedAttackAction({
          weapon: { type: "melee", isThrown: false },
          isThrown: false,
        })
      ).toBe(false);

      // Selected action helper keys
      expect(
        isRangedAttackAction({
          selectedSpell: "ranged_weapon_attack",
        })
      ).toBe(true);

      expect(
        isRangedAttackAction({
          selectedSpell: "melee_weapon_attack",
        })
      ).toBe(false);
    });

    it("verifies the source code contains NO hardcoded spell name lists", () => {
      const sourceCode = fs.readFileSync(
        path.resolve(__dirname, "../attackRangeRules.ts"),
        "utf-8"
      );
      // Ensure no hardcoded spell lists like ["eldritch_blast", "fire_bolt", ...]
      expect(sourceCode).not.toMatch(/\[.*["']eldritch[-_ ]?blast["'].*\]/i);
      expect(sourceCode).not.toMatch(/\[.*["']fire[-_ ]?bolt["'].*\]/i);
      expect(sourceCode).not.toMatch(/\[.*["']chill[-_ ]?touch["'].*\]/i);
      expect(sourceCode).not.toMatch(/\[.*["']ray[-_ ]?of[-_ ]?frost["'].*\]/i);
    });
  });

  describe("resolveRollMode - Strict 5e Advantage / Disadvantage Cancellation", () => {
    it("returns 'advantage' when only advantage is active", () => {
      expect(resolveRollMode(true, false)).toBe("advantage");
    });

    it("returns 'disadvantage' when only disadvantage is active", () => {
      expect(resolveRollMode(false, true)).toBe("disadvantage");
    });

    it("returns 'normal' when both advantage and disadvantage are active (Strict 5e cancellation)", () => {
      expect(resolveRollMode(true, true)).toBe("normal");
    });

    it("returns 'normal' when neither advantage nor disadvantage are active", () => {
      expect(resolveRollMode(false, false)).toBe("normal");
    });
  });

  describe("hasCloseCombatDisadvantageBypass - Feats & Class Features", () => {
    it("detects Crossbow Expert in character actions", () => {
      const char = {
        id: 1,
        name: "Varis",
        avatarUrl: "",
        level: 4,
        classes: [],
        stats: { str: 10, dex: 16, con: 12, int: 10, wis: 14, cha: 8 },
        modifiers: { str: 0, dex: 3, con: 1, int: 0, wis: 2, cha: -1 },
        proficiencyBonus: 2,
        spellCastingAbility: "NONE",
        spellSaveDC: 10,
        spellSaveDCDisplay: "10",
        spellAttackBonus: 2,
        spellAttackBonusDisplay: "+2",
        spellSlots: {},
        spells: [],
        senses: {} as any,
        actions: [{ id: "feat-cbe", name: "Crossbow Expert", source: "feat" }],
      } as unknown as DDBParsedCharacter;

      expect(hasCloseCombatDisadvantageBypass(char)).toBe(true);
    });

    it("detects Gunner in character feats", () => {
      const char = {
        id: 2,
        name: "Percy",
        feats: [{ name: "Gunner" }],
      } as unknown as DDBParsedCharacter;

      expect(hasCloseCombatDisadvantageBypass(char)).toBe(true);
    });

    it("detects Pistolero in character features", () => {
      const char = {
        id: 3,
        name: "Gunslinger",
        features: ["Pistolero"],
      } as unknown as DDBParsedCharacter;

      expect(hasCloseCombatDisadvantageBypass(char)).toBe(true);
    });

    it("returns false when character has no close combat bypass feats", () => {
      const char = {
        id: 4,
        name: "Gale",
        actions: [{ id: "act-1", name: "Arcane Recovery", source: "class" }],
      } as unknown as DDBParsedCharacter;

      expect(hasCloseCombatDisadvantageBypass(char)).toBe(false);
    });

    it("does not throw when classFeatures is an object instead of an array", () => {
      const char = {
        id: 5,
        name: "Warlock",
        actions: [],
        classFeatures: { warlock: [{ name: "Eldritch Invocations" }] },
      } as unknown as DDBParsedCharacter;

      expect(() => hasCloseCombatDisadvantageBypass(char)).not.toThrow();
      expect(hasCloseCombatDisadvantageBypass(char)).toBe(false);
    });

    it("detects a bypass feat nested inside grouped feature objects", () => {
      const char = {
        id: 6,
        name: "Ranger",
        actions: [],
        classFeatures: { feats: [{ name: "Crossbow Expert" }] },
      } as unknown as DDBParsedCharacter;

      expect(hasCloseCombatDisadvantageBypass(char)).toBe(true);
    });
  });

  describe("isTokenHostileToCaster - 5-Tier Disposition & Mind Control Resolution", () => {
    const mockCasterToken: Item = {
      id: "caster-1",
      name: "Warlock",
      type: "IMAGE",
      position: { x: 0, y: 0 },
      metadata: {},
    } as Item;

    it("respects explicit DM tag 'hostile'", () => {
      const token = {
        id: "target-1",
        name: "Corrupted Paladin",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 0, y: 0 },
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "hostile",
        },
      } as unknown as Item;

      expect(isTokenHostileToCaster(token, mockCasterToken, null, null)).toBe(true);
    });

    it("respects explicit DM tag 'friendly' even if token is an enemy monster", () => {
      const token = {
        id: "monster-1",
        name: "Tamed Goblin",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 0, y: 0 },
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "friendly",
        },
      } as unknown as Item;

      const encounter = {
        combatants: [
          { id: "c-1", tokenId: "monster-1", isPlayer: false, conditions: [] } as unknown as Combatant,
        ],
      } as unknown as CombatEncounter;

      expect(isTokenHostileToCaster(token, mockCasterToken, encounter, null)).toBe(false);
    });

    it("treats an ally as hostile when under mind-control conditions (Crown of Madness, Dominated)", () => {
      const token = {
        id: "ally-1",
        name: "Fighter Ally",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 0, y: 0 },
        metadata: {},
      } as unknown as Item;

      const encounter = {
        combatants: [
          { id: "c-ally", tokenId: "ally-1", isPlayer: true, conditions: ["Crown of Madness"] } as unknown as Combatant,
          { id: "c-caster", tokenId: "caster-1", isPlayer: true, conditions: [] } as unknown as Combatant,
        ],
      } as unknown as CombatEncounter;

      expect(isTokenHostileToCaster(token, mockCasterToken, encounter, null)).toBe(true);
    });

    it("treats fellow party members as friendly (not hostile) by default", () => {
      const token = {
        id: "ally-2",
        name: "Cleric Ally",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 0, y: 0 },
        metadata: {},
      } as unknown as Item;

      const encounter = {
        combatants: [
          { id: "c-ally2", tokenId: "ally-2", isPlayer: true, conditions: [] } as unknown as Combatant,
          { id: "c-caster", tokenId: "caster-1", isPlayer: true, conditions: [] } as unknown as Combatant,
        ],
      } as unknown as CombatEncounter;

      expect(isTokenHostileToCaster(token, mockCasterToken, encounter, null)).toBe(false);
    });

    it("treats non-player encounter combatant as hostile by default", () => {
      const token = {
        id: "orc-1",
        name: "Orc Berserker",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 0, y: 0 },
        metadata: {},
      } as unknown as Item;

      const encounter = {
        combatants: [
          { id: "c-orc", tokenId: "orc-1", isPlayer: false, conditions: [] } as unknown as Combatant,
          { id: "c-caster", tokenId: "caster-1", isPlayer: true, conditions: [] } as unknown as Combatant,
        ],
      } as unknown as CombatEncounter;

      expect(isTokenHostileToCaster(token, mockCasterToken, encounter, null)).toBe(true);
    });
  });

  describe("checkCloseCombatThreat - 5 ft Proximity & Condition Rules", () => {
    const grid = {
      dpi: 150,
      scaleMultiplier: 5, // 150 px = 5 ft
      cellCenterOffset: { x: 75, y: 75 },
    };

    const casterToken = {
      id: "caster-1",
      name: "Warlock",
      type: "IMAGE",
      layer: "CHARACTER",
      position: { x: 0, y: 0 },
      metadata: {},
    } as unknown as Item;

    it("imposes disadvantage when an active hostile foe is within 5 ft", () => {
      const enemyToken = {
        id: "enemy-1",
        name: "Ghoul",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 140, y: 0 }, // ~4.6 ft away
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "hostile",
        },
      } as unknown as Item;

      const threat = checkCloseCombatThreat(
        { x: 0, y: 0 },
        [casterToken, enemyToken],
        grid,
        casterToken
      );

      expect(threat.isThreatened).toBe(true);
      expect(threat.threateningTokens.length).toBe(1);
      expect(threat.reason).toContain("Close Combat");
    });

    it("does NOT impose disadvantage when hostile foe is beyond 5 ft", () => {
      const enemyToken = {
        id: "enemy-1",
        name: "Ghoul",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 300, y: 0 }, // 10 ft away
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "hostile",
        },
      } as unknown as Item;

      const threat = checkCloseCombatThreat(
        { x: 0, y: 0 },
        [casterToken, enemyToken],
        grid,
        casterToken
      );

      expect(threat.isThreatened).toBe(false);
      expect(threat.threateningTokens.length).toBe(0);
    });

    it("does NOT impose disadvantage when an ALLY is within 5 ft (Ally Safety)", () => {
      const allyToken = {
        id: "ally-1",
        name: "Friendly Paladin",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 100, y: 0 }, // ~3.3 ft away
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "friendly",
        },
      } as unknown as Item;

      const threat = checkCloseCombatThreat(
        { x: 0, y: 0 },
        [casterToken, allyToken],
        grid,
        casterToken
      );

      expect(threat.isThreatened).toBe(false);
      expect(threat.threateningTokens.length).toBe(0);
    });

    it("does NOT impose disadvantage when adjacent hostile is Incapacitated or Dead", () => {
      const deadEnemy = {
        id: "dead-goblin",
        name: "Goblin",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 100, y: 0 },
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "hostile",
        },
      } as unknown as Item;

      const encounter = {
        combatants: [
          {
            id: "c-goblin",
            tokenId: "dead-goblin",
            isPlayer: false,
            conditions: ["Dead"],
          } as unknown as Combatant,
        ],
      } as unknown as CombatEncounter;

      const threat = checkCloseCombatThreat(
        { x: 0, y: 0 },
        [casterToken, deadEnemy],
        grid,
        casterToken,
        encounter
      );

      expect(threat.isThreatened).toBe(false);
    });

    it("does NOT impose disadvantage when adjacent hostile is Blinded (Cannot see caster)", () => {
      const blindedEnemy = {
        id: "blind-ogre",
        name: "Ogre",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 100, y: 0 },
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "hostile",
        },
      } as unknown as Item;

      const encounter = {
        combatants: [
          {
            id: "c-ogre",
            tokenId: "blind-ogre",
            isPlayer: false,
            conditions: ["Blinded"],
          } as unknown as Combatant,
        ],
      } as unknown as CombatEncounter;

      const threat = checkCloseCombatThreat(
        { x: 0, y: 0 },
        [casterToken, blindedEnemy],
        grid,
        casterToken,
        encounter
      );

      expect(threat.isThreatened).toBe(false);
    });

    it("does NOT impose disadvantage if caster possesses Crossbow Expert or Gunner", () => {
      const enemyToken = {
        id: "enemy-1",
        name: "Zombie",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 100, y: 0 }, // within 5 ft
        metadata: {
          [TOKEN_DISPOSITION_METADATA_KEY]: "hostile",
        },
      } as unknown as Item;

      const cbeChar = {
        id: 99,
        name: "Hunter",
        actions: [{ id: "act-cbe", name: "Crossbow Expert", source: "feat" }],
      } as unknown as DDBParsedCharacter;

      const threat = checkCloseCombatThreat(
        { x: 0, y: 0 },
        [casterToken, enemyToken],
        grid,
        casterToken,
        null,
        cbeChar
      );

      expect(threat.isThreatened).toBe(false);
    });
  });
});
