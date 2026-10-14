import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect, vi } from "vitest";

vi.mock("react-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-dom")>();
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  };
});

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {
    isReady: false,
    onReady: vi.fn((cb) => cb && cb()),
    player: {
      getRole: vi.fn(async () => "GM"),
    },
    scene: {
      getMetadata: vi.fn(async () => ({})),
    },
  },
}));

vi.mock("../../features/combat/initiativeService", () => ({
  subscribeToEncounter: vi.fn(() => () => {}),
  nextCombatTurn: vi.fn(),
  prevCombatTurn: vi.fn(),
  extractEncounterFromMetadata: vi.fn(() => null),
}));

vi.mock("../../features/player/playerCharacterService", () => ({
  focusCameraOnToken: vi.fn(),
}));

import { BG3TopTurnTracker, clampTooltipLeft } from "../BG3TopTurnTracker";
import { darknessVisibilityReducer } from "../darknessVisibilityState";
import type { CombatEncounter } from "../../features/combat/domain/types";
import { getMetadataKey } from "../../platform/obr/metadataHelper";

describe("BG3TopTurnTracker Component (Top Center Floating Ribbon)", () => {
  const mockEncounter: CombatEncounter = {
    id: "enc-test",
    isActive: true,
    round: 1,
    turnIndex: 0,
    combatants: [
      {
        id: "tok-shadowheart",
        name: "Shadowheart",
        initiative: 18,
        initiativeBonus: 2,
        ac: 18,
        hpCurrent: 32,
        hpMax: 32,
        isPlayer: true,
      },
      {
        id: "tok-spectator",
        name: "Spectator",
        initiative: 14,
        initiativeBonus: 2,
        ac: 14,
        hpCurrent: 82,
        hpMax: 82,
        isPlayer: false, // Enemy
      },
      {
        id: "tok-astarion",
        name: "Astarion",
        initiative: 12,
        initiativeBonus: 4,
        ac: 15,
        hpCurrent: 0,
        hpMax: 28,
        isPlayer: true,
        isDefeated: true,
      },
    ],
    updatedAt: Date.now(),
  };
  const initialSceneItems = [
    {
      id: "tok-spectator",
      metadata: {
        [getMetadataKey("bound-monster")]: {
          name: "Spectator",
          armorClass: 14,
          hitPoints: { average: 82 },
        },
      },
    },
  ];

  it("clamps portal tooltip centers inside the viewport gutters", () => {
    expect(clampTooltipLeft(5, 100, 400)).toBe(58);
    expect(clampTooltipLeft(395, 100, 400)).toBe(342);
    expect(clampTooltipLeft(200, 100, 400)).toBe(200);
  });

  it("preserves the last completed Darkness visibility during repeated refreshes", () => {
    const completedState = {
      hiddenTokenIds: new Set(["tok-spectator"]),
      ready: true,
    };

    const duringRefresh = darknessVisibilityReducer(completedState, { type: "refresh-started" });
    const duringRepeatedRefresh = darknessVisibilityReducer(duringRefresh, { type: "refresh-started" });

    expect(duringRefresh).toBe(completedState);
    expect(duringRepeatedRefresh).toBe(completedState);
    expect(duringRepeatedRefresh.hiddenTokenIds.has("tok-spectator")).toBe(true);
  });

  it("applies visibility changes after the latest refresh completes", () => {
    const completedState = {
      hiddenTokenIds: new Set(["tok-spectator"]),
      ready: true,
    };

    const updatedState = darknessVisibilityReducer(completedState, {
      type: "refresh-completed",
      hiddenTokenIds: new Set(),
    });

    expect(updatedState.ready).toBe(true);
    expect(updatedState.hiddenTokenIds.size).toBe(0);
  });

  it("renders BG3 top turn ribbon with wings, round gem, ally blue borders, enemy red borders, and active arrow", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={true}
        initialSceneItems={initialSceneItems}
      />
    );

    // Root ribbon & round gem
    expect(html).toContain("bg3-turn-ribbon-bar");
    expect(html).toContain("R1");

    // Ally vs Enemy classes
    expect(html).toContain("bg3-portrait-card active ally");
    expect(html).toContain("bg3-portrait-card  enemy");

    // Active marker arrow
    expect(html).toContain("bg3-active-marker-arrow");

    // Tooltip data
    expect(html).toContain("Shadowheart");
    expect(html).toContain("Spectator");
    expect(html).toContain("Astarion");
    expect(html).toContain("HP 82/82 | AC 14");
    expect(html).toContain("HP 32/32 | AC 18");
    expect(html).toContain("Defeated | AC 15");
    expect(html).toContain("bg3-portrait-hp-bar");

    // GM controls present when isGM = true
    expect(html).toContain("Previous Turn (GM)");
    expect(html).toContain("Next Turn (GM)");

    // Strict zero-emoji check
    expect(html).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u);
    expect(html).not.toContain("🎯");
    expect(html).not.toContain("🛡️");
    expect(html).not.toContain("💀");
    expect(html).not.toContain("⚔️");
  });

  it("shows player-token vitals but hides monster vitals by default for players", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={false}
        initialDarknessVisibilityReady={true}
        initialSceneItems={initialSceneItems}
      />
    );
    expect(html).not.toContain("Previous Turn (GM)");
    expect(html).not.toContain("Next Turn (GM)");
    expect(html).toContain("HP 32/32 | AC 18");
    expect(html).toContain("Defeated | AC 15");
    expect(html).not.toContain("HP 82/82");
    expect(html).not.toContain("AC 14");
    expect(html.match(/bg3-portrait-hp-bar/g) ?? []).toHaveLength(2);
  });

  it("keeps all monster stats visible to the GM regardless of player visibility settings", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={true}
        initialShowHpToPlayers={false}
        initialShowHpBarToPlayers={false}
        initialShowAcToPlayers={false}
        initialDarknessHiddenTokenIds={["tok-shadowheart", "tok-spectator", "tok-astarion"]}
        initialDarknessVisibilityReady={true}
        initialSceneItems={initialSceneItems}
      />
    );

    expect(html).toContain("HP 82/82 | AC 14");
    expect(html).toContain("HP 32/32 | AC 18");
    expect(html.match(/bg3-portrait-hp-bar/g)).toHaveLength(3);
    expect(html).toContain("Defeated | AC 15");
  });

  it("can independently show monster HP numbers to players without the bar or AC", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={false}
        initialShowHpToPlayers={true}
        initialShowHpBarToPlayers={false}
        initialShowAcToPlayers={false}
        initialDarknessVisibilityReady={true}
        initialSceneItems={initialSceneItems}
      />
    );

    expect(html).toContain("HP 82/82");
    expect(html).not.toContain("AC 14");
    expect(html.match(/bg3-portrait-hp-bar/g) ?? []).toHaveLength(2);
    expect(html).toContain("HP 32/32 | AC 18");
    expect(html).not.toContain("Defeated | AC 14");
  });

  it("hides HP bars for both player and monster tokens in Darkness when the sub-option is enabled", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={false}
        initialShowHpBarToPlayers={true}
        initialDarknessHiddenTokenIds={["tok-shadowheart", "tok-spectator"]}
        initialDarknessVisibilityReady={true}
        initialSceneItems={initialSceneItems}
      />
    );

    expect(html.match(/bg3-portrait-hp-bar/g)).toHaveLength(1);
    expect(html).toContain("HP 32/32 | AC 18");
    expect(html).not.toContain("HP 82/82");
  });

  it("shows player and monster HP bars in Darkness when the sub-option is disabled", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={false}
        initialShowHpBarToPlayers={true}
        initialDarknessHiddenTokenIds={["tok-shadowheart", "tok-spectator"]}
        initialHideTrackerHpBarInDarkness={false}
        initialDarknessVisibilityReady={true}
        initialSceneItems={initialSceneItems}
      />
    );

    expect(html.match(/bg3-portrait-hp-bar/g)).toHaveLength(3);
  });

  it("leaves all tracker HP bars visible when the master Darkness setting is disabled", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={false}
        initialShowHpBarToPlayers={true}
        initialDarknessHiddenTokenIds={["tok-shadowheart", "tok-spectator"]}
        initialHideVitalsInDarkness={false}
        initialDarknessVisibilityReady={true}
        initialSceneItems={initialSceneItems}
      />
    );

    expect(html.match(/bg3-portrait-hp-bar/g)).toHaveLength(3);
  });

  it("fails closed for tracker HP bars while player Darkness visibility is being checked", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={false}
        initialShowHpBarToPlayers={true}
        initialSceneItems={initialSceneItems}
      />
    );

    expect(html.match(/bg3-portrait-hp-bar/g) ?? []).toHaveLength(0);
    expect(html).not.toContain("HP 82/82");
    expect(html).toContain("HP 32/32 | AC 18");
  });

  it("continues showing player-character HP and AC to the GM", () => {
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker
        initialEncounter={mockEncounter}
        initialIsGM={true}
        initialSceneItems={initialSceneItems}
      />
    );

    expect(html).toContain("HP 32/32 | AC 18");
    expect(html).toContain("Defeated | AC 15");
    expect(html).toContain("bg3-portrait-hp-bar");
  });

  it("renders nothing when combat encounter is inactive", () => {
    const inactiveEncounter: CombatEncounter = {
      ...mockEncounter,
      isActive: false,
    };
    const html = renderToStaticMarkup(
      <BG3TopTurnTracker initialEncounter={inactiveEncounter} initialIsGM={true} />
    );
    expect(html).toBe("");
  });
});
