import { describe, it, expect, vi } from "vitest";
import {
  calculateTurnTrackerWidth,
  DEFAULT_TURN_TRACKER_HEIGHT,
  TURN_TRACKER_TOOLTIP_HEIGHT,
  setTurnTrackerTooltipVisible,
  turnTrackerPopoverId,
  syncTopTurnTrackerPopover,
  closeTopTurnTrackerPopover,
} from "../turnTrackerPopoverService";
import type { CombatEncounter } from "../domain/types";

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {
    isReady: true,
    onReady: vi.fn((cb) => cb && cb()),
    viewport: {
      getWidth: vi.fn(async () => 1440),
      getHeight: vi.fn(async () => 900),
    },
    popover: {
      open: vi.fn(),
      close: vi.fn(),
      setWidth: vi.fn(),
      setHeight: vi.fn(),
      getWidth: vi.fn(async () => undefined),
      getHeight: vi.fn(async () => undefined),
    },
  },
}));

describe("turnTrackerPopoverService", () => {
  it("calculates proportional width based on combatants", () => {
    // 0 or 1 combatant -> minimum 360
    expect(calculateTurnTrackerWidth(1)).toBe(360);
    // 4 combatants -> 184 + 4 * 54 = 400
    expect(calculateTurnTrackerWidth(4)).toBe(400);
    // 10 combatants -> 184 + 10 * 54 = 724
    expect(calculateTurnTrackerWidth(10)).toBe(724);
    // Does not exceed maximum 1000
    expect(calculateTurnTrackerWidth(30)).toBe(1000);
  });

  it("exposes expected popover ID", () => {
    expect(turnTrackerPopoverId).toContain("bg3-top-turn-tracker");
  });

  it("closes popover when encounter is null or inactive", async () => {
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    await syncTopTurnTrackerPopover(null);
    expect(sdk.popover.close).toHaveBeenCalledWith(turnTrackerPopoverId);
  });

  it("closes popover directly via closeTopTurnTrackerPopover", async () => {
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    await closeTopTurnTrackerPopover();
    expect(sdk.popover.close).toHaveBeenCalled();
  });

  it("opens popover with index.html?view=turn-tracker URL and top offset below Owlbear toolbar", async () => {
    const { openTopTurnTrackerPopover, DEFAULT_TURN_TRACKER_TOP } = await import("../turnTrackerPopoverService");
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    await openTopTurnTrackerPopover(3);
    expect(sdk.popover.open).toHaveBeenCalledWith(
      expect.objectContaining({
        id: turnTrackerPopoverId,
        height: DEFAULT_TURN_TRACKER_HEIGHT,
        url: expect.stringContaining("view=turn-tracker"),
        anchorReference: "POSITION",
        anchorPosition: expect.objectContaining({
          top: DEFAULT_TURN_TRACKER_TOP,
        }),
        hidePaper: true,
      })
    );
  });

  it("fits the tracker popover within a narrow viewport", async () => {
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    vi.clearAllMocks();
    vi.mocked(sdk.viewport.getWidth).mockResolvedValue(320);
    vi.mocked(sdk.viewport.getHeight).mockResolvedValue(568);

    const { openTopTurnTrackerPopover } = await import("../turnTrackerPopoverService");
    await openTopTurnTrackerPopover(4, 48);

    expect(sdk.popover.open).toHaveBeenCalledWith(
      expect.objectContaining({
        width: 304,
        height: DEFAULT_TURN_TRACKER_HEIGHT,
        anchorPosition: {
          left: 8,
          top: 48,
        },
      }),
    );
  });

  it("expands for a tooltip and returns to compact height after hover", async () => {
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    vi.clearAllMocks();
    vi.mocked(sdk.viewport.getHeight).mockResolvedValue(900);

    await setTurnTrackerTooltipVisible(true);
    expect(sdk.popover.setHeight).toHaveBeenLastCalledWith(
      turnTrackerPopoverId,
      TURN_TRACKER_TOOLTIP_HEIGHT,
    );

    await setTurnTrackerTooltipVisible(false);
    expect(sdk.popover.setHeight).toHaveBeenLastCalledWith(
      turnTrackerPopoverId,
      DEFAULT_TURN_TRACKER_HEIGHT,
    );
  });

  it("caps tooltip height to the available viewport", async () => {
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    vi.clearAllMocks();
    vi.mocked(sdk.viewport.getHeight).mockResolvedValue(100);

    await setTurnTrackerTooltipVisible(true);

    expect(sdk.popover.setHeight).toHaveBeenCalledWith(turnTrackerPopoverId, 84);
  });

  it("does not reopen an expanded tracker when encounter synchronization runs", async () => {
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    vi.clearAllMocks();
    vi.mocked(sdk.viewport.getWidth).mockResolvedValue(1440);
    vi.mocked(sdk.viewport.getHeight).mockResolvedValue(900);
    vi.mocked(sdk.popover.getWidth).mockResolvedValue(undefined);

    const encounter: CombatEncounter = {
      id: "enc-tooltip",
      isActive: true,
      round: 1,
      turnIndex: 0,
      combatants: [
        {
          id: "token-tooltip",
          name: "Test Character",
          initiative: 12,
          initiativeBonus: 1,
        },
      ],
      updatedAt: Date.now(),
    };

    await syncTopTurnTrackerPopover(encounter);

    expect(sdk.popover.open).toHaveBeenCalledWith(
      expect.objectContaining({
        id: turnTrackerPopoverId,
        height: DEFAULT_TURN_TRACKER_HEIGHT,
      }),
    );
  });

  it("preserves an expanded tooltip height during encounter synchronization", async () => {
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    vi.clearAllMocks();
    vi.mocked(sdk.viewport.getWidth).mockResolvedValue(1440);
    vi.mocked(sdk.viewport.getHeight).mockResolvedValue(900);
    vi.mocked(sdk.popover.getWidth).mockResolvedValue(360);
    vi.mocked(sdk.popover.getHeight).mockResolvedValue(TURN_TRACKER_TOOLTIP_HEIGHT);

    const encounter: CombatEncounter = {
      id: "enc-expanded",
      isActive: true,
      round: 1,
      turnIndex: 0,
      combatants: [{
        id: "token-expanded",
        name: "Test Character",
        initiative: 12,
        initiativeBonus: 1,
      }],
      updatedAt: Date.now(),
    };

    await syncTopTurnTrackerPopover(encounter);

    expect(sdk.popover.open).not.toHaveBeenCalled();
    expect(sdk.popover.setHeight).not.toHaveBeenCalled();
  });

  it("does not reopen a correctly sized tracker on a narrow viewport", async () => {
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    vi.clearAllMocks();
    vi.mocked(sdk.viewport.getWidth).mockResolvedValue(320);
    vi.mocked(sdk.viewport.getHeight).mockResolvedValue(568);
    vi.mocked(sdk.popover.getWidth).mockResolvedValue(304);
    vi.mocked(sdk.popover.getHeight).mockResolvedValue(
      DEFAULT_TURN_TRACKER_HEIGHT,
    );

    const encounter: CombatEncounter = {
      id: "enc-narrow",
      isActive: true,
      round: 1,
      turnIndex: 0,
      combatants: [
        {
          id: "token-narrow",
          name: "Test Character",
          initiative: 12,
          initiativeBonus: 1,
        },
      ],
      updatedAt: Date.now(),
    };

    await syncTopTurnTrackerPopover(encounter);

    expect(sdk.popover.open).not.toHaveBeenCalled();
  });

  it("syncTopTurnTrackerViewport re-opens tracker with updated dimensions only when already open", async () => {
    const { syncTopTurnTrackerViewport } = await import("../turnTrackerPopoverService");
    const sdk = (await import("@owlbear-rodeo/sdk")).default;
    vi.clearAllMocks();

    // When closed (width undefined), should not reopen
    vi.mocked(sdk.popover.getWidth).mockResolvedValue(undefined);
    await syncTopTurnTrackerViewport(1920, 1080);
    expect(sdk.popover.open).not.toHaveBeenCalled();

    // When open (width > 0), should call open with updated dimensions
    vi.mocked(sdk.popover.getWidth).mockResolvedValue(400);
    vi.mocked(sdk.viewport.getWidth).mockResolvedValue(1920);
    vi.mocked(sdk.viewport.getHeight).mockResolvedValue(1080);
    await syncTopTurnTrackerViewport(1920, 1080);
    expect(sdk.popover.open).toHaveBeenCalledWith(
      expect.objectContaining({
        id: turnTrackerPopoverId,
        url: expect.stringContaining("view=turn-tracker"),
      })
    );
  });
});
