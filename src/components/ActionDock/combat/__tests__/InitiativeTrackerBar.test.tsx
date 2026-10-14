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
      getMetadata: vi.fn(async () => ({})),
      onMetadataChange: vi.fn(() => () => {}),
    },
  },
}));

import { InitiativeTrackerBar } from "../InitiativeTrackerBar";

// Mock initiativeService and playerCharacterService to run statically
vi.mock("../../../features/combat/initiativeService", () => ({
  subscribeToEncounter: vi.fn((callback) => {
    callback({
      id: "enc-1",
      isActive: true,
      round: 2,
      turnIndex: 0,
      combatants: [
        {
          id: "tok-1",
          name: "Astarion",
          initiative: 19,
          initiativeBonus: 4,
          hpCurrent: 27,
          hpMax: 27,
          ac: 15,
        },
        {
          id: "tok-2",
          name: "Goblin Archer",
          initiative: 12,
          initiativeBonus: 2,
          hpCurrent: 0,
          hpMax: 7,
          ac: 13,
          isDefeated: true,
        },
      ],
      updatedAt: Date.now(),
    });
    return () => {};
  }),
  nextCombatTurn: vi.fn(),
  prevCombatTurn: vi.fn(),
  startEncounter: vi.fn(),
  endEncounter: vi.fn(),
  addCombatants: vi.fn(),
  removeCombatant: vi.fn(),
  rollEncounterInitiative: vi.fn(),
  rollSingleCombatantInitiative: vi.fn(),
  setCombatantInitiative: vi.fn(),
  buildCombatantFromItem: vi.fn(),
}));

vi.mock("../../../features/combat/turnTrackerPopoverService", () => ({
  toggleTopTurnTrackerPopover: vi.fn(),
  isTopTurnTrackerOpen: vi.fn(() => false),
}));

vi.mock("../../../features/player/playerCharacterService", () => ({
  isCharacterToken: vi.fn(() => true),
  focusCameraOnToken: vi.fn(),
  getMyPrimaryCharacterToken: vi.fn(async () => null),
}));

vi.mock("../../../services/ddbService", () => ({
  getLinkedDDBCharacterId: vi.fn(() => null),
  getCachedDDBCharacter: vi.fn(() => null),
}));

const mockEncounter = {
  id: "enc-1",
  isActive: true,
  round: 2,
  turnIndex: 0,
  combatants: [
    {
      id: "tok-1",
      name: "Astarion",
      initiative: 19,
      initiativeBonus: 4,
      hpCurrent: 27,
      hpMax: 27,
      ac: 15,
    },
    {
      id: "tok-2",
      name: "Goblin Archer",
      initiative: 12,
      initiativeBonus: 2,
      hpCurrent: 0,
      hpMax: 7,
      ac: 13,
      isDefeated: true,
    },
  ],
  updatedAt: Date.now(),
};

describe("InitiativeTrackerBar Component", () => {
  it("renders active encounter with round and turn indicators without emojis", () => {
    const html = renderToStaticMarkup(<InitiativeTrackerBar initialEncounter={mockEncounter} />);

    // Round badge
    expect(html).toContain("Round 2");
    expect(html).toContain("Turn 1/2");
    expect(html).toContain("Astarion");

    // Combatant card details
    expect(html).toContain("Init 19");
    expect(html).toContain("27/27");
    expect(html).toContain("Goblin Archer");
    expect(html).toContain("Defeated");

    // Strict zero-emoji check
    expect(html).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u);
    expect(html).not.toContain("🎯");
    expect(html).not.toContain("🛡️");
    expect(html).not.toContain("💀");
    expect(html).not.toContain("⚔️");
  });

  it("renders collapsed mode when specified for GM", () => {
    const html = renderToStaticMarkup(<InitiativeTrackerBar defaultCollapsed={true} isGM={true} />);
    expect(html).toContain("ddb-bg3-initiative-tracker collapsed");
    // In collapsed mode, the reel list is not rendered
    expect(html).not.toContain('role="list"');
  });
});
