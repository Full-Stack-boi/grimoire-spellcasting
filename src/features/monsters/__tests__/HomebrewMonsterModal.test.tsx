import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

(globalThis as any).window = {
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  },
  location: { search: "" },
  addEventListener: () => {},
  removeEventListener: () => {},
};

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {
    isReady: false,
    scene: {
      items: {
        getItems: vi.fn(async () => []),
        updateItems: vi.fn(async () => {}),
      },
    },
  },
  isImage: vi.fn(() => false),
}));

import {
  HomebrewMonsterModal,
  calculateProficiencyBonus,
  formatSkills,
  parseSkills,
} from "../ui/HomebrewMonsterModal";
import type { MonsterStatblock } from "../domain/types";

const sampleMonster: MonsterStatblock = {
  id: "test-goblin-boss",
  name: "Goblin Boss",
  source: "D&D Beyond Import",
  edition: "2024",
  size: "Small",
  type: "Humanoid",
  subtype: "Goblinoid",
  alignment: "Neutral Evil",
  armorClass: 17,
  armorDesc: "Chain Shirt, Shield",
  hitPoints: { average: 21, formula: "6d6" },
  speed: "30 ft.",
  stats: { str: 10, dex: 14, con: 10, int: 10, wis: 8, cha: 10 },
  challengeRating: "1",
  proficiencyBonus: 2,
  savingThrows: {
    dex: 4,
    con: 2,
  },
  skills: {
    stealth: 6,
    perception: 1,
  },
  senses: "Darkvision 60 ft.",
  languages: "Common, Goblin",
  actions: [
    {
      id: "act_scimitar",
      name: "Scimitar",
      type: "melee_attack",
      attackBonus: 4,
      damage: "1d6+2",
      damageType: "Slashing",
      description: "Hit: 5 (1d6+2) slashing.",
      damageComponents: [{ formula: "1d6+2", damageType: "Slashing" }],
      reachFeet: 5,
    },
  ],
};

describe("HomebrewMonsterModal", () => {
  describe("Component Rendering", () => {
    it("renders in Create mode by default with standard title and button", () => {
      const html = renderToStaticMarkup(
        <HomebrewMonsterModal onClose={vi.fn()} onSave={vi.fn()} />
      );

      expect(html).toContain("Create Homebrew Monster");
      expect(html).toContain("Homebrew Builder");
      expect(html).toContain("✓ Create Monster");
      expect(html).toContain("Saving Throw Proficiencies");
      expect(html).toContain("Skills");
      expect(html).toContain("Prof. Bonus");
    });

    it("renders in Edit mode when initialMonster is passed", () => {
      const html = renderToStaticMarkup(
        <HomebrewMonsterModal
          initialMonster={sampleMonster}
          onClose={vi.fn()}
          onSave={vi.fn()}
        />
      );

      expect(html).toContain("Edit Monster: Goblin Boss");
      expect(html).toContain("Statblock Editor");
      expect(html).toContain("✓ Save Changes");
      expect(html).toContain('value="Goblin Boss"');
      expect(html).toContain("stealth +6, perception +1");
    });

    it("renders proficient saving throws with proficient styling and badges for initialMonster", () => {
      const html = renderToStaticMarkup(
        <HomebrewMonsterModal
          initialMonster={sampleMonster}
          onClose={vi.fn()}
          onSave={vi.fn()}
        />
      );

      // DEX Save and CON Save should be proficient
      expect(html).toContain("DEX Save");
      expect(html).toContain("CON Save");
      expect(html).toContain("gm-hb-save-prof-badge");
      expect(html).toContain('value="4"'); // DEX save bonus
      expect(html).toContain('value="2"'); // CON save bonus
    });
  });

  describe("Helper Functions", () => {
    it("calculateProficiencyBonus calculates 5e proficiency scaling from CR", () => {
      expect(calculateProficiencyBonus("0")).toBe(2);
      expect(calculateProficiencyBonus("1/4")).toBe(2);
      expect(calculateProficiencyBonus("4")).toBe(2);
      expect(calculateProficiencyBonus("5")).toBe(3);
      expect(calculateProficiencyBonus("8")).toBe(3);
      expect(calculateProficiencyBonus("9")).toBe(4);
      expect(calculateProficiencyBonus("13")).toBe(5);
      expect(calculateProficiencyBonus("17")).toBe(6);
      expect(calculateProficiencyBonus("21")).toBe(7);
      expect(calculateProficiencyBonus("25")).toBe(8);
      expect(calculateProficiencyBonus("30")).toBe(9);
    });

    it("formatSkills formats skills record into readable comma string", () => {
      expect(formatSkills({ stealth: 6, perception: 2 })).toBe("stealth +6, perception +2");
      expect(formatSkills({ athletics: -1 })).toBe("athletics -1");
      expect(formatSkills(undefined)).toBe("");
    });

    it("parseSkills parses comma-separated string into record", () => {
      const parsed = parseSkills("Stealth +6, Perception +4, Athletics 2, Arcana -1");
      expect(parsed).toEqual({
        stealth: 6,
        perception: 4,
        athletics: 2,
        arcana: -1,
      });

      expect(parseSkills("")).toBeUndefined();
      expect(parseSkills("   ")).toBeUndefined();
    });
  });
});
