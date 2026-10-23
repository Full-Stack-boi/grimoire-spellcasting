import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect, vi } from "vitest";

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {
    isReady: false,
    player: {
      getSelection: vi.fn(async () => []),
      getRole: vi.fn(async () => "PLAYER"),
      onChange: vi.fn(() => () => {}),
    },
    scene: {
      items: {
        getItems: vi.fn(async () => []),
      },
      onMetadataChange: vi.fn(() => () => {}),
    },
    notification: {
      show: vi.fn(),
    },
  },
  isImage: vi.fn(() => false),
}));

// Mock window location
Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: { location: { search: "", origin: "http://localhost:5173" } },
});

import { MobileActionDock } from "../MobileActionDock";
import type { MonsterStatblock } from "../../../../features/monsters/domain/types";
import type { DDBWeaponAttack } from "../../../../types/ddb";

const mockMonster: MonsterStatblock = {
  id: "test_ooze",
  name: "Gray Ooze",
  source: "Monster Manual",
  edition: "2024",
  isLegacy: false,
  size: "Medium",
  type: "Ooze",
  alignment: "Unaligned",
  armorClass: 8,
  hitPoints: {
    average: 22,
    formula: "3d8 + 9",
  },
  speed: "10 ft., Climb 10 ft.",
  stats: {
    str: 12,
    dex: 6,
    con: 16,
    int: 1,
    wis: 6,
    cha: 2,
  },
  senses: "blindsight 60 ft.",
  languages: "--",
  challengeRating: "1/2",
  proficiencyBonus: 2,
  actions: [
    {
      id: "pseudopod",
      name: "Pseudopod",
      type: "melee_attack",
      description: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage plus 7 (2d6) acid damage.",
      attackBonus: 3,
      damage: "1d6+1",
      damageType: "bludgeoning",
    },
  ],
};

const mockWeapons: DDBWeaponAttack[] = [
  {
    id: "longsword",
    name: "Longsword",
    type: "melee",
    toHit: 6,
    damage: "1d8+4",
    damageType: "slashing",
    rangeText: "5 ft",
    rangeFeet: 5,
    properties: ["Versatile (1d10)"],
    isProficient: true,
  },
];

describe("MobileActionDock Component", () => {
  it("renders Floating Action Button (FAB) when in fab mode", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Kazmalia"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={mockMonster}
        isGM={false}
        currentHp={22}
        maxHp={22}
        tempHp={0}
        onDamage={vi.fn()}
        onHeal={vi.fn()}
        onInitiativeRoll={vi.fn()}
        weapons={[]}
        onWeaponAttack={vi.fn()}
        onWeaponDamage={vi.fn()}
        spells={[]}
        spellGroups={[]}
        getRemainingSlots={vi.fn(() => 0)}
        onCastSpell={vi.fn()}
        onToggleSlotPip={vi.fn()}
        features={[]}
        onActivateFeature={vi.fn()}
        inventory={[]}
        conditions={[]}
        onToggleCondition={vi.fn()}
        heroicInspiration={false}
        onToggleInspiration={vi.fn()}
        onClose={vi.fn()}
        onToggleSnap={vi.fn()}
        mobileMode="fab"
      />
    );

    expect(html).toContain("mobile-fab-container");
    expect(html).toContain("mobile-fab-button");
    expect(html).toContain("22"); // Displays HP badge
  });

  it("renders Expanded Mobile Action Sheet with Monster Statblock when monster bound", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Kazmalia"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={mockMonster}
        isGM={false}
        currentHp={22}
        maxHp={22}
        tempHp={0}
        onDamage={vi.fn()}
        onHeal={vi.fn()}
        onInitiativeRoll={vi.fn()}
        weapons={[]}
        onWeaponAttack={vi.fn()}
        onWeaponDamage={vi.fn()}
        spells={[]}
        spellGroups={[]}
        getRemainingSlots={vi.fn(() => 0)}
        onCastSpell={vi.fn()}
        onToggleSlotPip={vi.fn()}
        features={[]}
        onActivateFeature={vi.fn()}
        inventory={[]}
        conditions={[]}
        onToggleCondition={vi.fn()}
        heroicInspiration={false}
        onToggleInspiration={vi.fn()}
        onClose={vi.fn()}
        onToggleSnap={vi.fn()}
        mobileMode="expanded"
      />
    );

    expect(html).toContain("mobile-sheet-container");
    expect(html).toContain("Gray Ooze");
    expect(html).toContain("22/22");
    expect(html).toContain("situational-roll-bar");
    expect(html).toContain("Pseudopod"); // Monster attack action
  });

  it("renders player character actions with touch attack buttons", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Hero"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={false}
        currentHp={35}
        maxHp={40}
        tempHp={5}
        onDamage={vi.fn()}
        onHeal={vi.fn()}
        onInitiativeRoll={vi.fn()}
        weapons={mockWeapons}
        onWeaponAttack={vi.fn()}
        onWeaponDamage={vi.fn()}
        spells={[]}
        spellGroups={[]}
        getRemainingSlots={vi.fn(() => 0)}
        onCastSpell={vi.fn()}
        onToggleSlotPip={vi.fn()}
        features={[]}
        onActivateFeature={vi.fn()}
        inventory={[]}
        conditions={[]}
        onToggleCondition={vi.fn()}
        heroicInspiration={false}
        onToggleInspiration={vi.fn()}
        onClose={vi.fn()}
        onToggleSnap={vi.fn()}
        mobileMode="expanded"
      />
    );

    expect(html).toContain("mobile-sheet-container");
    expect(html).toContain("Hero");
    expect(html).toContain("35/40");
    expect(html).toContain("+5"); // Temp HP
    expect(html).toContain("Longsword");
    expect(html).toContain("Attack (+6)");
    expect(html).toContain("Damage (1d8+4)");
  });
  it("renders top drag handle for continuous dynamic height resizing", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Hero"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={true}
        currentHp={30}
        maxHp={30}
        tempHp={0}
        onDamage={vi.fn()}
        onHeal={vi.fn()}
        onInitiativeRoll={vi.fn()}
        weapons={[]}
        onWeaponAttack={vi.fn()}
        onWeaponDamage={vi.fn()}
        spells={[]}
        spellGroups={[]}
        getRemainingSlots={vi.fn(() => 0)}
        onCastSpell={vi.fn()}
        onToggleSlotPip={vi.fn()}
        features={[]}
        onActivateFeature={vi.fn()}
        inventory={[]}
        conditions={[]}
        onToggleCondition={vi.fn()}
        heroicInspiration={false}
        onToggleInspiration={vi.fn()}
        onClose={vi.fn()}
        onToggleSnap={vi.fn()}
        mobileMode="expanded"
      />
    );

    expect(html).toContain("mobile-sheet-drag-handle");
    expect(html).toContain("mobile-drag-pill");
    expect(html).toContain("BESTIARY");
    expect(html).toContain("situational-roll-bar");
  });

  it("renders Quick Hit Points modal with presets, stepper and Damage/Heal actions", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Hero"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={true}
        currentHp={43}
        maxHp={55}
        tempHp={5}
        onDamage={vi.fn()}
        onHeal={vi.fn()}
        onInitiativeRoll={vi.fn()}
        weapons={[]}
        spells={[]}
        spellGroups={[]}
        onCastSpell={vi.fn()}
        onToggleSlotPip={vi.fn()}
        features={[]}
        onActivateFeature={vi.fn()}
        inventory={[]}
        conditions={[]}
        onToggleCondition={vi.fn()}
        heroicInspiration={false}
        onToggleInspiration={vi.fn()}
        onClose={vi.fn()}
        onToggleSnap={vi.fn()}
        mobileMode="expanded"
        initialShowHpModal={true}
      />
    );

    expect(html).toContain("mobile-hp-modal-overlay");
    expect(html).toContain("Adjust Hit Points");
    expect(html).toContain("Current:");
    expect(html).toContain("43");
    expect(html).toContain("55");
    expect(html).toContain("(+5 Temp)");
    expect(html).toContain("mobile-hp-preset-chip");
    expect(html).toContain("mobile-hp-stepper-btn");
    expect(html).toContain("Take 5 Damage");
    expect(html).toContain("Heal 5 HP");
  });
});