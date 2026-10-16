import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { customMonster, builtinMonster, deleteCustomMonster, getCustomMonsters } =
  vi.hoisted(() => ({
    customMonster: {
      id: "imported-custom-1",
      name: "Imported Goblin",
      edition: "2024",
      size: "Small",
      type: "Humanoid",
      alignment: "Neutral Evil",
      armorClass: 15,
      hitPoints: { average: 7, formula: "2d6" },
      speed: "30 ft.",
      stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 },
      challengeRating: "1/4",
      proficiencyBonus: 2,
      senses: "Darkvision 60 ft.",
      languages: "Common, Goblin",
      actions: [],
    },
    builtinMonster: {
      id: "goblin_legacy",
      name: "Goblin",
      edition: "2014",
      isLegacy: true,
      size: "Small",
      type: "Humanoid",
      alignment: "Neutral Evil",
      armorClass: 15,
      hitPoints: { average: 7, formula: "2d6" },
      speed: "30 ft.",
      stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 },
      challengeRating: "1/4",
      proficiencyBonus: 2,
      senses: "Darkvision 60 ft.",
      languages: "Common, Goblin",
      actions: [],
    },
    deleteCustomMonster: vi.fn(),
    getCustomMonsters: vi.fn(),
  }));

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: { isReady: false },
  isImage: vi.fn(() => false),
}));

vi.mock("../monsterService", () => ({
  getAllMonsters: vi.fn(() => [customMonster, builtinMonster]),
  filterMonsters: vi.fn((monsters) => monsters),
  importMonsterFromJson: vi.fn(() => null),
  getBoundMonsterFromToken: vi.fn(() => null),
  saveCustomMonster: vi.fn(),
  getCustomMonsters,
  deleteCustomMonster,
}));

vi.mock("../ddbMonsterFetcher", () => ({
  fetchDdbMonsterByUrl: vi.fn(),
  parseDdbMonsterHtml: vi.fn(),
}));

vi.mock("../ui/MonsterStatblockView", () => ({
  MonsterStatblockView: () => <div />,
}));

vi.mock("../ui/MonsterExportModal", () => ({
  MonsterExportModal: () => null,
}));

vi.mock("../ui/HomebrewMonsterModal", () => ({
  HomebrewMonsterModal: () => null,
}));

import { GmMonsterDrawer } from "../ui/GmMonsterDrawer";

describe("GmMonsterDrawer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCustomMonsters).mockReturnValue([customMonster as never]);
  });

  it("offers Bestiary removal only for user-added monsters", () => {
    const html = renderToStaticMarkup(<GmMonsterDrawer />);

    expect(html).toContain('aria-label="Remove Imported Goblin from Bestiary"');
    expect(html).not.toContain('aria-label="Remove Goblin from Bestiary"');
    expect(html).not.toContain('role="alertdialog"');
  });

  it("renders edit button only for user-added monsters in the bestiary", () => {
    const html = renderToStaticMarkup(<GmMonsterDrawer />);
    expect(html).toContain('aria-label="Edit Imported Goblin"');
    expect(html).not.toContain('aria-label="Edit Goblin"');
  });
});
