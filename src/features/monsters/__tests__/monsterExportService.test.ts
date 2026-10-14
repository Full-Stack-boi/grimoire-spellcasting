import { describe, it, expect, vi } from "vitest";

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {
    isReady: true,
  },
  isImage: () => false,
}));

import {
  exportMonsterToJson,
  formatActionForDdb,
  formatMonsterForDdb,
} from "../monsterExportService";
import { importMonsterFromJson } from "../monsterService";
import type { MonsterStatblock } from "../domain/types";

const store: Record<string, string> = {};
(globalThis as any).localStorage = {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
};

const mockMonster: MonsterStatblock = {
  id: "test_wyrmling",
  name: "Red Dragon Wyrmling",
  source: "Custom Homebrew",
  edition: "2024",
  isLegacy: false,
  size: "Medium",
  type: "Dragon",
  alignment: "Chaotic Evil",
  armorClass: 17,
  armorDesc: "Natural Armor",
  hitPoints: {
    average: 75,
    formula: "10d8+30",
  },
  speed: "30 ft., climb 30 ft., fly 60 ft.",
  stats: {
    str: 19,
    dex: 10,
    con: 17,
    int: 12,
    wis: 11,
    cha: 15,
  },
  challengeRating: "4",
  proficiencyBonus: 2,
  senses: "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
  languages: "Draconic",
  damageImmunities: ["Fire"],
  traits: [
    {
      name: "Amphibious",
      description: "Can breathe air and water.",
    },
  ],
  actions: [
    {
      id: "bite",
      name: "Bite",
      type: "melee_attack",
      attackBonus: 6,
      reachFeet: 5,
      damage: "1d10+4",
      damageType: "Piercing",
      description: "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 9 (1d10+4) piercing.",
    },
    {
      id: "fire_breath",
      name: "Fire Breath",
      type: "ability",
      saveDc: 13,
      saveStat: "dex",
      damage: "7d6",
      damageType: "Fire",
      description: "Exhales fire in a 15-foot cone. Each creature must make a DC 13 Dexterity save, taking 24 (7d6) fire damage on a failed save, or half on a success.",
    },
  ],
};

describe("monsterExportService", () => {
  it("exportMonsterToJson produces valid JSON that importMonsterFromJson can round-trip", () => {
    const jsonStr = exportMonsterToJson(mockMonster);
    expect(typeof jsonStr).toBe("string");
    const parsed = JSON.parse(jsonStr);
    expect(parsed.name).toBe("Red Dragon Wyrmling");
    expect(parsed.armorClass).toBe(17);

    // Verify round-trip import
    const imported = importMonsterFromJson(jsonStr);
    expect(imported).not.toBeNull();
    expect(imported?.name).toBe("Red Dragon Wyrmling");
    expect(imported?.hitPoints.average).toBe(75);
    expect(imported?.actions.length).toBe(2);
  });

  it("formatActionForDdb formats weapon attacks with DDB tooltips", () => {
    const ddbAction = formatActionForDdb(mockMonster.actions[0]);
    expect(ddbAction).toContain("[action]Melee Weapon Attack[/action]");
    expect(ddbAction).toContain('[rollable]+6;{diceNotation:"1d20+6",rollType:"to hit"}[/rollable]');
    expect(ddbAction).toContain('[rollable]1d10+4;{diceNotation:"1d10+4",rollType:"damage",rollAction:"Bite"}[/rollable]');
    expect(ddbAction).toContain("piercing damage");
  });

  it("formatActionForDdb formats DC save abilities with DDB savingthrow tooltips", () => {
    const ddbSave = formatActionForDdb(mockMonster.actions[1]);
    expect(ddbSave).toContain("[savingthrow]Dexterity[/savingthrow]");
    expect(ddbSave).toContain('[rollable]7d6;{diceNotation:"7d6",rollType:"damage",rollAction:"Fire Breath"}[/rollable]');
  });

  it("formatMonsterForDdb creates complete export package with markdown statblock", () => {
    const pkg = formatMonsterForDdb(mockMonster);
    expect(pkg.basicFields.name).toBe("Red Dragon Wyrmling");
    expect(pkg.basicFields.armorClass).toBe(17);
    expect(pkg.basicFields.str).toBe(19);
    expect(pkg.basicFields.strMod).toBe("+4");
    expect(pkg.basicFields.dexMod).toBe("+0");

    expect(pkg.actionsTextDdb).toContain("Bite");
    expect(pkg.actionsTextDdb).toContain("Fire Breath");
    expect(pkg.traitsText).toContain("Amphibious");

    expect(pkg.fullMarkdownStatblock).toContain("## Red Dragon Wyrmling");
    expect(pkg.fullMarkdownStatblock).toContain("**Armor Class** 17");
    expect(pkg.fullMarkdownStatblock).toContain("| 19 (+4) | 10 (+0) | 17 (+3) | 12 (+1) | 11 (+0) | 15 (+2) |");
  });
});
