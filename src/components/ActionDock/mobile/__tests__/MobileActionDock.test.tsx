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

  it("renders Compact Aiming Bar on mobile when isAiming is active", () => {
    const handleCancelAiming = vi.fn();
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Hero"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={false}
        currentHp={30}
        maxHp={30}
        tempHp={0}
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
        isAiming={true}
        aimingName="Longsword (5 ft)"
        onCancelAiming={handleCancelAiming}
        onSelectWeapon={vi.fn()}
      />
    );

    expect(html).toContain("mobile-aiming-bar-container");
    expect(html).toContain("AIMING");
    expect(html).toContain("Longsword (5 ft)");
    expect(html).toContain("mobile-aiming-bar-btn expand");
    expect(html).toContain("mobile-aiming-bar-btn cancel");
  });

  it("renders Aim button on weapon cards and search toolbar when expanded", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Hero"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={false}
        currentHp={30}
        maxHp={30}
        tempHp={0}
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
        isAiming={false}
        onSelectWeapon={vi.fn()}
      />
    );

    expect(html).toContain("mobile-action-btn aim"); // Aim button rendered on weapon card
    expect(html).toContain("mobile-deck-toolbar");
    expect(html).toContain("mobile-dock-search-box");
    expect(html).toContain("mobile-view-mode-toggle");
  });

  it("renders mobile HP card with temporary HP badge", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Hero"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={false}
        currentHp={25}
        maxHp={30}
        tempHp={8}
        onDamage={vi.fn()}
        onHeal={vi.fn()}
        onSetTempHp={vi.fn()}
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
        isAiming={false}
      />
    );

    expect(html).toContain("+8");
    expect(html).toContain("mobile-hp-temp-fill");
  });

  it("renders FREE filter chip for special/innate spells instead of -1", () => {
    const mockSpecialSpell = {
      id: "false_life_innate",
      name: "False Life",
      level: 1,
      school: "Necromancy",
      castingTime: "1 Action",
      rangeText: "Self",
      damage: null,
      usesSpellSlot: false,
      hasFreeCast: true,
      freeCast: { used: 0, max: 1, resetType: "Long Rest" },
    };

    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Hero"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={false}
        currentHp={30}
        maxHp={30}
        tempHp={0}
        onDamage={vi.fn()}
        onHeal={vi.fn()}
        onInitiativeRoll={vi.fn()}
        weapons={mockWeapons}
        onWeaponAttack={vi.fn()}
        onWeaponDamage={vi.fn()}
        spells={[mockSpecialSpell as any]}
        spellGroups={[
          {
            label: "SPECIAL & INNATE SPELLS",
            level: -1,
            isSpecial: true,
            spells: [mockSpecialSpell as any],
          },
        ]}
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
        initialTab="SPELLS"
        isAiming={false}
      />
    );

    // Filter chip should say FREE and have special class, NEVER -1 or emojis
    expect(html).toContain("FREE");
    expect(html).toContain("mobile-level-filter-chip  special");
    expect(html).not.toContain("-1 (");
    expect(html).not.toContain("✨");
  });

  it("renders concentration badge and break button when concentrating", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={null}
        caster={null}
        casterName="Hero"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={false}
        currentHp={30}
        maxHp={30}
        tempHp={0}
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
        isAiming={false}
        concentrationSpell={{ id: "hex", name: "Hex" }}
        onBreakConcentration={vi.fn()}
      />
    );

    expect(html).toContain("CONC: Hex");
    expect(html).toContain("mobile-conc-break-btn");
  });
  it("does NOT render Flurry of Blows or Bonus Unarmed Strike for non-Monk characters", () => {
    const html = renderToStaticMarkup(
      <MobileActionDock
        character={{
          id: 170484944,
          name: "Warlock Sorcerer",
          avatarUrl: "",
          level: 6,
          classes: [{ name: "Warlock", level: 3 }, { name: "Sorcerer", level: 3 }],
          stats: { str: 8, dex: 14, con: 16, int: 10, wis: 12, cha: 18 },
          modifiers: { str: -1, dex: 2, con: 3, int: 0, wis: 1, cha: 4 },
          armorClass: 16,
          initiative: 2,
          speed: 30,
          hp: { current: 45, max: 45, temp: 0 },
          proficiencyBonus: 3,
          spellSaveDC: 15,
          spellSaveDCDisplay: "15",
          spellAttackBonus: 7,
          spellAttackBonusDisplay: "+7",
          spellCastingAbility: "CHA",
          spellSlots: {},
          spells: [],
          weapons: mockWeapons,
          features: [],
          inventory: [],
          senses: {} as any,
        } as unknown as import("../../../../types/ddb").DDBParsedCharacter}
        caster={null}
        casterName="Warlock Sorcerer"
        avatarUrl="http://localhost:5173/embers.svg"
        boundMonster={null}
        isGM={false}
        currentHp={45}
        maxHp={45}
        tempHp={0}
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
        isAiming={false}
        onFlurryOfBlows={vi.fn()}
        onBonusUnarmedStrike={vi.fn()}
      />
    );

    expect(html).not.toContain("Flurry of Blows");
    expect(html).not.toContain("Bonus Unarmed Strike");
  });
});
