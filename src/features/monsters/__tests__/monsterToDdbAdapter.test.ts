import { describe, it, expect } from "vitest";

(globalThis as any).window = {
  localStorage: {},
  location: { search: "" },
};

import {
  hashMonsterId,
  parseWalkSpeed,
  parseMonsterSenses,
  monsterActionToWeaponAttack,
  monsterToDdbCharacter,
} from "../monsterToDdbAdapter";
import type { MonsterStatblock } from "../domain/types";
import type { TokenVitals } from "../../combat/domain/types";

const mockMonster: MonsterStatblock = {
  id: "test_flame_goblin",
  name: "Flame Goblin",
  source: "Custom Homebrew",
  edition: "2024",
  isLegacy: false,
  size: "Small",
  type: "Humanoid",
  subtype: "Goblinoid",
  alignment: "Neutral Evil",
  armorClass: 14,
  armorDesc: "Leather Armor",
  hitPoints: {
    average: 24,
    formula: "4d6+10",
  },
  speed: "30 ft., fly 20 ft.",
  stats: {
    str: 8,
    dex: 16,
    con: 14,
    int: 10,
    wis: 12,
    cha: 8,
  },
  challengeRating: "1/2",
  proficiencyBonus: 2,
  senses: "Darkvision 60 ft., Blindsight 10 ft., Passive Perception 13",
  languages: "Common, Goblin",
  damageResistances: ["Fire"],
  damageImmunities: ["Poison"],
  conditionImmunities: ["Poisoned"],
  traits: [
    {
      name: "Nimble Escape",
      description: "Can Disengage or Hide as a bonus action.",
    },
  ],
  actions: [
    {
      id: "bite_1",
      name: "Bite",
      type: "melee_attack",
      attackBonus: 5,
      reachFeet: 5,
      damage: "1d6+3",
      damageType: "Piercing",
      description: "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 6 (1d6+3) piercing.",
    },
    {
      id: "fire_spit_1",
      name: "Fire Spit",
      type: "ranged_attack",
      attackBonus: 5,
      rangeFeet: 60,
      rangeLongFeet: 120,
      damage: "2d6",
      damageType: "Fire",
      description: "Ranged Weapon Attack: +5 to hit, range 60/120 ft. Hit: 7 (2d6) fire.",
    },
    {
      id: "fire_burst_1",
      name: "Fire Burst",
      type: "ability",
      saveDc: 13,
      saveStat: "dex",
      damage: "3d6",
      damageType: "Fire",
      description: "DC 13 DEX save, 3d6 fire.",
    },
  ],
  bonusActions: [
    {
      name: "Fiery Dash",
      description: "Can dash leaving a trail of fire.",
    },
  ],
  reactions: [
    {
      name: "Flame Shield",
      description: "+2 AC against one melee attack.",
    },
  ],
};

describe("monsterToDdbAdapter", () => {
  it("hashMonsterId generates a stable negative integer ID", () => {
    const id1 = hashMonsterId("test_flame_goblin");
    const id2 = hashMonsterId("test_flame_goblin");
    expect(id1).toBe(id2);
    expect(id1).toBeLessThan(0);
    expect(Number.isInteger(id1)).toBe(true);
  });

  it("parseWalkSpeed extracts walk speed in feet", () => {
    expect(parseWalkSpeed("30 ft., fly 60 ft.")).toBe(30);
    expect(parseWalkSpeed("40 ft.")).toBe(40);
    expect(parseWalkSpeed("")).toBe(30);
  });

  it("parseMonsterSenses parses darkvision and blindsight ranges", () => {
    const senses = parseMonsterSenses("Darkvision 60 ft., Blindsight 30 ft., Truesight 120 ft.");
    expect(senses.darkvision).toBe(60);
    expect(senses.blindFighting).toBe(30);
    expect(senses.truesight).toBe(120);
    expect(senses.tremorsense).toBeUndefined();
  });

  it("monsterActionToWeaponAttack converts melee and ranged attacks to DDBWeaponAttack", () => {
    const melee = monsterActionToWeaponAttack(mockMonster.actions[0], 0, mockMonster);
    expect(melee).not.toBeNull();
    expect(melee?.id).toBe("monster_weapon_bite_1");
    expect(melee?.name).toBe("Bite");
    expect(melee?.type).toBe("melee");
    expect(melee?.reachFeet).toBe(5);
    expect(melee?.toHit).toBe(5);
    expect(melee?.damage).toBe("1d6+3");
    expect(melee?.damageType).toBe("Piercing");

    const ranged = monsterActionToWeaponAttack(mockMonster.actions[1], 1, mockMonster);
    expect(ranged).not.toBeNull();
    expect(ranged?.id).toBe("monster_weapon_fire_spit_1");
    expect(ranged?.name).toBe("Fire Spit");
    expect(ranged?.type).toBe("ranged");
    expect(ranged?.rangeFeet).toBe(60);
    expect(ranged?.longRangeFeet).toBe(120);
    expect(ranged?.toHit).toBe(5);
    expect(ranged?.damage).toBe("2d6");

    const nonAttack = monsterActionToWeaponAttack(mockMonster.actions[2], 2, mockMonster);
    expect(nonAttack).toBeNull();
  });

  it("monsterToDdbCharacter generates a complete DDBParsedCharacter", () => {
    const mockVitals: TokenVitals = {
      hpCurrent: 19,
      hpMax: 24,
      hpTemp: 5,
      armorClass: 14,
      resistances: ["Fire"],
      immunities: ["Poison"],
      vulnerabilities: [],
    };

    const mockItem: any = {
      id: "token_123",
      type: "IMAGE",
      image: { url: "https://example.com/goblin.png" },
    };

    const char = monsterToDdbCharacter(mockMonster, mockItem, mockVitals);

    expect(char.name).toBe("Flame Goblin");
    expect(char.avatarUrl).toBe("https://example.com/goblin.png");
    expect(char.id).toBeLessThan(0);
    expect(char.armorClass).toBe(14);
    expect(char.hp?.current).toBe(19);
    expect(char.hp?.max).toBe(24);
    expect(char.hp?.temp).toBe(5);
    expect(char.speed).toBe(30);
    expect(char.defenses?.resistances).toContain("Fire");
    expect(char.defenses?.immunities).toContain("Poison");
    expect(char.senses.darkvision).toBe(60);

    // Weapons
    expect(char.weapons?.length).toBe(2);
    expect(char.weapons?.map((weapon) => weapon.id)).toEqual([
      "monster_weapon_bite_1",
      "monster_weapon_fire_spit_1",
    ]);
    expect(char.weapons?.[0].name).toBe("Bite");
    expect(char.weapons?.[1].name).toBe("Fire Spit");

    // Actions & Traits
    expect(char.actions?.some((a) => a.name === "Nimble Escape")).toBe(true);
    expect(char.actions?.some((a) => a.name === "Fire Burst")).toBe(true);
    expect(char.actions?.some((a) => a.name === "Fiery Dash")).toBe(true);
    expect(char.actions?.some((a) => a.name === "Flame Shield")).toBe(true);

    // Stats & Modifiers
    expect(char.stats.dex).toBe(16);
    expect(char.modifiers.dex).toBe(3);
    expect(char.stats.str).toBe(8);
    expect(char.modifiers.str).toBe(-1);
  });

  it("adapts only resolvable monster spells without spending player spell slots", () => {
    const monsterWithSpellcasting: MonsterStatblock = {
      ...mockMonster,
      actions: [
        ...mockMonster.actions,
        {
          id: "spellcasting",
          name: "Spellcasting",
          type: "spell",
          spellcastingAbility: "wis",
          spellSaveDc: 13,
          spellOptions: [
            { id: "gust_of_wind", name: "Gust of Wind" },
            {
              id: "lightning_bolt",
              name: "Lightning Bolt",
              usage: {
                maxUses: 1,
                resetEvery: 1,
                resetUnit: "day",
                label: "1/Day",
              },
            },
            { id: "unlisted", name: "Unlisted Spell" },
          ],
          description: "The monster casts spells.",
        },
      ],
    };

    const character = monsterToDdbCharacter(monsterWithSpellcasting);

    expect(character.spellCastingAbility).toBe("WIS");
    expect(character.spellSaveDC).toBe(13);
    expect(character.spells.map((spell) => spell.id)).toEqual([
      "gust_of_wind",
      "lightning_bolt",
    ]);
    expect(character.spells.every((spell) => spell.isPrepared && spell.usesSpellSlot === false)).toBe(true);
  });

  it("guarantees unique character IDs for multiple tokens sharing the same monster statblock (swarm collision prevention)", () => {
    const tokenA: any = { id: "token_goblin_1", name: "Flame Goblin 1" };
    const tokenB: any = { id: "token_goblin_2", name: "Flame Goblin 2" };

    const charA = monsterToDdbCharacter(mockMonster, tokenA);
    const charB = monsterToDdbCharacter(mockMonster, tokenB);

    expect(charA.id).toBeLessThan(0);
    expect(charB.id).toBeLessThan(0);
    expect(charA.id).not.toBe(charB.id); // Zero collision!
    expect(charA.name).toBe("Flame Goblin 1");
    expect(charB.name).toBe("Flame Goblin 2");
  });
});
