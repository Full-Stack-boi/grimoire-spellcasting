import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect, vi } from "vitest";

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {
    isReady: false,
    player: {
      getSelection: vi.fn(async () => []),
    },
    scene: {
      items: {
        getItems: vi.fn(async () => []),
      },
    },
    notification: {
      show: vi.fn(),
    },
  },
  isImage: vi.fn(() => false),
}));

// The Owlbear SDK reads the location query string during module initialization.
Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: { location: { search: "" } },
});

import { MonsterStatblockView } from "../ui/MonsterStatblockView";
import type { MonsterStatblock } from "../domain/types";
import { BOUND_MONSTER_METADATA_KEY } from "../monsterService";
import { VITALS_METADATA_KEY } from "../../combat/tokenVitalsService";

const mockMonster: MonsterStatblock = {
  id: "test_dragon",
  name: "Ancient Brass Dragon",
  source: "Monster Manual",
  edition: "2024",
  isLegacy: false,
  size: "Gargantuan",
  type: "Dragon",
  subtype: "Metallic",
  alignment: "Chaotic Good",
  armorClass: 20,
  armorDesc: "Natural Armor",
  hitPoints: {
    average: 332,
    formula: "19d20 + 133",
  },
  speed: "40 ft., Fly 80 ft.",
  stats: {
    str: 28,
    dex: 10,
    con: 25,
    int: 16,
    wis: 15,
    cha: 19,
  },
  damageImmunities: ["Fire"],
  damageResistances: ["Lightning"],
  senses: "Darkvision 120 ft., Blindsight 60 ft.",
  languages: "Common, Draconic",
  challengeRating: "20",
  proficiencyBonus: 6,
  traits: [
    {
      name: "Amphibious",
      description: "The dragon can breathe air and water.",
    },
    {
      name: "Legendary Resistance",
      description: "If the dragon fails a saving throw, it can choose to succeed instead.",
    },
  ],
  actions: [
    {
      id: "act_bite",
      name: "Bite",
      type: "melee_attack",
      attackBonus: 14,
      reachFeet: 15,
      damage: "2d10+8",
      damageType: "Piercing",
      description: "Melee Weapon Attack: +14 to hit, reach 15 ft. Hit: 19 (2d10 + 8) piercing damage.",
    },
    {
      id: "act_breath",
      name: "Fire Breath",
      type: "ability",
      saveDc: 21,
      saveStat: "dex",
      damage: "16d6",
      damageType: "Fire",
      description: "The dragon exhales fire in a 90-foot line.",
    },
  ],
  bonusActions: [
    {
      name: "Tail Swipe",
      description: "The dragon sweeps its tail as a bonus action.",
    },
  ],
  reactions: [
    {
      name: "Wing Parry",
      description: "The dragon adds 6 to its AC against one attack.",
    },
  ],
  legendaryActions: [
    {
      name: "Detect",
      description: "The dragon makes a Wisdom (Perception) check.",
    },
  ],
};

describe("MonsterStatblockView", () => {
  it("renders basic monster stats and vitals accurately", () => {
    const html = renderToStaticMarkup(<MonsterStatblockView monster={mockMonster} />);

    expect(html).toContain("Ancient Brass Dragon");
    expect(html).toContain("Gargantuan Dragon (Metallic), Chaotic Good");
    expect(html).toContain("20");
    expect(html).toContain("332 (19d20 + 133)");
    expect(html).toContain("40 ft., Fly 80 ft.");
    expect(html).toContain("+6");
  });

  it("renders ability scores and computed modifiers", () => {
    const html = renderToStaticMarkup(<MonsterStatblockView monster={mockMonster} />);

    // STR 28 should have +9 modifier
    expect(html).toContain("STR");
    expect(html).toContain("28");
    expect(html).toContain("+9");

    // DEX 10 should have +0 modifier
    expect(html).toContain("DEX");
    expect(html).toContain("10");
    expect(html).toContain("+0");
  });

  it("renders traits and actions with full descriptions", () => {
    const html = renderToStaticMarkup(<MonsterStatblockView monster={mockMonster} />);

    expect(html).toContain("Amphibious.");
    expect(html).toContain("The dragon can breathe air and water.");

    expect(html).toContain("Bite");
    expect(html).toContain("reach 15 ft");
    expect(html).toContain("Fire Breath");
    expect(html).toContain("exhales fire");
  });

  it("renders Aim button for weapon attacks when onAimAction is provided", () => {
    const handleAim = vi.fn();
    const html = renderToStaticMarkup(
      <MonsterStatblockView monster={mockMonster} onAimAction={handleAim} />
    );

    expect(html).toContain("Aim");
    expect(html).toContain("Roll Bite");
  });

  it("shows usable multiattack, typed damage, and resolvable spell controls", () => {
    const monsterWithActions: MonsterStatblock = {
      ...mockMonster,
      actions: [
        {
          ...mockMonster.actions[0],
          damageComponents: [
            { formula: "1d8+3", damageType: "Bludgeoning" },
            { formula: "2d10", damageType: "Lightning" },
          ],
        },
        {
          id: "multiattack",
          name: "Multiattack",
          type: "multiattack",
          multiattackSequence: [{ actionId: mockMonster.actions[0].id, count: 2 }],
          description: "The dragon makes two Bite attacks.",
        },
        {
          id: "spellcasting",
          name: "Spellcasting",
          type: "spell",
          spellcastingAbility: "wis",
          spellSaveDc: 18,
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
            { id: "unknown", name: "Unknown Spell" },
          ],
          description: "The dragon casts one of these spells.",
        },
      ],
    };
    const html = renderToStaticMarkup(
      <MonsterStatblockView
        monster={monsterWithActions}
        token={{ id: "dragon-token", name: "Dragon" } as any}
        onCastSpell={vi.fn()}
      />,
    );

    expect(html).toContain("Roll Multiattack");
    expect(html).toContain("1d8+3 Bludgeoning + 2d10 Lightning");
    expect(html).toContain("Gust of Wind");
    expect(html).toContain("Lightning Bolt");
    expect(html).toContain("Used 0/1");
    expect(html).toContain("Description only");
    expect(html).toContain(">Cast</button>");
  });

  it("keeps ambiguous Multiattack text manual instead of showing a broken roll button", () => {
    const monsterWithUnparsedMultiattack: MonsterStatblock = {
      ...mockMonster,
      actions: [{
        id: "multiattack-ambiguous",
        name: "Multiattack",
        type: "multiattack",
        description: "The dragon makes a complex combination of attacks.",
      }],
    };
    const html = renderToStaticMarkup(
      <MonsterStatblockView monster={monsterWithUnparsedMultiattack} />,
    );

    expect(html).toContain("Manual adjudication");
    expect(html).not.toContain("Roll Multiattack");
  });

  it("filters actions when filter='ATTACK' is provided", () => {
    const html = renderToStaticMarkup(
      <MonsterStatblockView monster={mockMonster} filter="ATTACK" />
    );

    // Bite is an attack
    expect(html).toContain("Bite");
    // Fire Breath is an ability, so it should be filtered out
    expect(html).not.toContain("Fire Breath");
  });

  it("filters bonus actions when filter='BONUS' is provided", () => {
    const html = renderToStaticMarkup(
      <MonsterStatblockView monster={mockMonster} filter="BONUS" />
    );

    expect(html).toContain("Tail Swipe.");
    expect(html).not.toContain("Bite");
  });

  it("renders 'Bind to [Token]' when token is not bound", () => {
    const unboundToken: any = { id: "tok-1", name: "Empty Token", metadata: {} };
    const html = renderToStaticMarkup(
      <MonsterStatblockView monster={mockMonster} token={unboundToken} showBindControls={true} />
    );

    expect(html).toContain("Bind to [Empty Token]");
    expect(html).not.toContain("✓ Bound to");
  });

  it("renders '✓ Bound to [Token]', 'Re-roll HP', and 'Unbind' when token is already bound to this monster", () => {
    const boundToken: any = {
      id: "tok-dragon",
      name: "Dragon Token",
      metadata: {
        [BOUND_MONSTER_METADATA_KEY]: mockMonster,
      },
    };
    const html = renderToStaticMarkup(
      <MonsterStatblockView monster={mockMonster} token={boundToken} showBindControls={true} />
    );

    expect(html).toContain("✓");
    expect(html).toContain("Bound to [Dragon Token]");
    expect(html).toContain("Re-roll HP");
    expect(html).toContain("Unbind");
    expect(html).not.toContain("Bind to [Dragon Token]");
  });

  it("renders 'Switch: [Old Monster] ➔ [New Monster]' when token is bound to a different monster", () => {
    const otherMonster = { id: "goblin", name: "Goblin", armorClass: 15 };
    const tokenWithOther: any = {
      id: "tok-switched",
      name: "Swapped Token",
      metadata: {
        [BOUND_MONSTER_METADATA_KEY]: otherMonster,
      },
    };
    const html = renderToStaticMarkup(
      <MonsterStatblockView monster={mockMonster} token={tokenWithOther} showBindControls={true} />
    );

    expect(html).toContain("Switch: [Goblin] ➔ [Ancient Brass Dragon]");
  });

  describe("Defenses & Resistances Display", () => {
    it("renders Damage Immunities and Damage Resistances from monster statblock", () => {
      const html = renderToStaticMarkup(
        <MonsterStatblockView monster={mockMonster} showBindControls={false} />
      );

      expect(html).toContain("Damage Immunities:");
      expect(html).toContain("Fire");
      expect(html).toContain("Damage Resistances:");
      expect(html).toContain("Lightning");
    });

    it("renders 'Defenses: None' when monster has no resistances, immunities, or vulnerabilities", () => {
      const deflessMonster: MonsterStatblock = {
        ...mockMonster,
        damageImmunities: [],
        damageResistances: [],
        damageVulnerabilities: [],
        conditionImmunities: [],
      };
      const html = renderToStaticMarkup(
        <MonsterStatblockView monster={deflessMonster} showBindControls={false} />
      );

      expect(html).toContain("Defenses:");
      expect(html).toContain("None");
      expect(html).not.toContain("Damage Immunities:");
      expect(html).not.toContain("Damage Resistances:");
    });

    it("displays live resistances and immunities when token has modified vitals", () => {
      const tokenWithVitals: any = {
        id: "tok-vitals-test",
        name: "Buffed Dragon",
        metadata: {
          [VITALS_METADATA_KEY]: {
            hpCurrent: 332,
            hpMax: 332,
            armorClass: 20,
            resistances: ["Cold", "Radiant"],
            immunities: ["Fire", "Force"],
          },
        },
      };
      const html = renderToStaticMarkup(
        <MonsterStatblockView monster={mockMonster} token={tokenWithVitals} showBindControls={false} />
      );

      expect(html).toContain("Damage Resistances:");
      expect(html).toContain("Cold");
      expect(html).toContain("Radiant");
      expect(html).toContain("Damage Immunities:");
      expect(html).toContain("Force");
    });
  });

  describe("Saving Throws section", () => {
    it("renders saving throws section with all 6 abilities", () => {
      const html = renderToStaticMarkup(
        <MonsterStatblockView monster={mockMonster} showBindControls={false} />
      );

      expect(html).toContain("Saving Throws");
      expect(html).toContain("gm-saving-throws-grid");
      expect(html).toContain("Click to roll Save");
    });

    it("displays proficient saves with highlight and proficiency marker", () => {
      const monsterWithSaves: MonsterStatblock = {
        ...mockMonster,
        stats: { str: 28, dex: 10, con: 25, int: 16, wis: 15, cha: 19 },
        savingThrows: {
          dex: 6,
          con: 13,
          wis: 8,
          cha: 10,
        },
      };
      const html = renderToStaticMarkup(
        <MonsterStatblockView monster={monsterWithSaves} showBindControls={false} />
      );

      // Proficient saves have override bonuses
      expect(html).toContain('title="Click to roll DEX saving throw (Proficient)"');
      expect(html).toContain('title="Click to roll CON saving throw (Proficient)"');
      expect(html).toContain('title="Click to roll WIS saving throw (Proficient)"');
      expect(html).toContain('title="Click to roll CHA saving throw (Proficient)"');
      expect(html).toContain("gm-save-proficient");
      expect(html).toContain("◆");

      // Non-proficient saves fall back to ability modifiers
      // STR 28 => +9, INT 16 => +3
      expect(html).toContain('title="Click to roll STR saving throw"');
      expect(html).toContain('title="Click to roll INT saving throw"');
      expect(html).toContain("+9");
      expect(html).toContain("+3");
    });

    it("falls back to standard ability modifiers when monster has no savingThrows defined", () => {
      const goblinMonster: MonsterStatblock = {
        ...mockMonster,
        name: "Goblin",
        stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 },
        savingThrows: undefined,
      };
      const html = renderToStaticMarkup(
        <MonsterStatblockView monster={goblinMonster} showBindControls={false} />
      );

      expect(html).not.toContain("gm-save-proficient");
      expect(html).not.toContain("◆");
      // STR 8 => -1, DEX 14 => +2, CON 10 => +0
      expect(html).toContain("-1");
      expect(html).toContain("+2");
      expect(html).toContain("+0");
    });

    it("renders edit button in header when onEdit prop is provided", () => {
      const handleEdit = vi.fn();
      const html = renderToStaticMarkup(
        <MonsterStatblockView monster={mockMonster} onEdit={handleEdit} />
      );

      expect(html).toContain("gm-btn-edit");
      expect(html).toContain("Edit");
      expect(html).not.toContain("✏");
      expect(html).toContain(`title="Edit ${mockMonster.name} statblock"`);
    });

    it("does not render edit button when onEdit prop is omitted", () => {
      const html = renderToStaticMarkup(
        <MonsterStatblockView monster={mockMonster} />
      );

      expect(html).not.toContain("gm-btn-edit");
      expect(html).not.toContain("✏");
    });
  });
});
