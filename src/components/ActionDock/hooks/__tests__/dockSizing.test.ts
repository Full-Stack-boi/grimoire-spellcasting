import { describe, expect, it } from "vitest";
import {
    calculateMaxDockPanelHeight,
    calculateDockPanelHeight,
    MIN_DOCK_PANEL_HEIGHT,
} from "../../domain/dockSizing";

describe("Action Bar dock sizing", () => {
    it("uses the host viewport to allow expanding beyond the current popover height", () => {
        const currentPopoverHeight = 320;
        const hostViewportHeight = 900;
        const maxHeight = calculateMaxDockPanelHeight(hostViewportHeight, 40);

        expect(currentPopoverHeight).toBeLessThan(maxHeight);
        expect(maxHeight).toBe(844);
        expect(calculateDockPanelHeight(280, 100, 40, maxHeight)).toBe(340);
    });

    it("keeps a narrow dock resizable without exceeding its viewport allowance", () => {
        expect(calculateMaxDockPanelHeight(320, 40)).toBe(264);
    });

    it("increases panel height when the resize handle is dragged upward", () => {
        expect(calculateDockPanelHeight(280, 100, 40, 844)).toBe(340);
    });

    it("decreases panel height when the resize handle is dragged downward", () => {
        expect(calculateDockPanelHeight(280, 100, 160, 844)).toBe(220);
    });

    it("clamps the result to the minimum and viewport-derived maximum", () => {
        expect(calculateDockPanelHeight(280, 100, 500, 844)).toBe(
            MIN_DOCK_PANEL_HEIGHT,
        );
        expect(calculateDockPanelHeight(800, 100, -100, 844)).toBe(844);
    });

    it("rejects invalid viewport dimensions", () => {
        expect(() => calculateMaxDockPanelHeight(Number.NaN, 40)).toThrow(
            RangeError,
        );
        expect(() => calculateDockPanelHeight(280, 100, 40, Number.NaN)).toThrow(
            RangeError,
        );
    });
});
