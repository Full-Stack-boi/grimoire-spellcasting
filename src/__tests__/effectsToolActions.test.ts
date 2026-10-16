// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).window = {
    location: {
        origin: "http://localhost:5173",
        search: "",
    },
};

import { describe, it, expect, vi } from "vitest";

vi.mock("@owlbear-rodeo/sdk", () => ({
    default: {
        isReady: true,
        onReady: vi.fn(),
        tool: {
            createAction: vi.fn(),
            createMode: vi.fn(),
        },
        scene: {
            grid: {
                getDpi: vi.fn().mockResolvedValue(400),
                getScale: vi.fn().mockResolvedValue(5),
            },
        },
    },
}));

import {
    SHORTCUT_ACTIVE_TOOLS,
    focusCameraToolActionID,
    actionDockToolActionID,
    gameLogToolActionID,
    selectSpellToolActionID,
    spellInfoToolActionID,
    clearTargetSelectionToolActionID,
    toolID,
} from "../effectsTool";

describe("effectsTool actions and shortcut bindings", () => {
    it("includes Move, Pointer, and Measure tools in SHORTCUT_ACTIVE_TOOLS", () => {
        expect(SHORTCUT_ACTIVE_TOOLS).toContain(toolID);
        expect(SHORTCUT_ACTIVE_TOOLS).toContain("rodeo.owlbear.tool/move");
        expect(SHORTCUT_ACTIVE_TOOLS).toContain("rodeo.owlbear.tool/pointer");
        expect(SHORTCUT_ACTIVE_TOOLS).toContain("rodeo.owlbear.tool/measure");
    });

    it("does not include drawing or fog tools to prevent overriding built-in brush/line/circle shortcuts", () => {
        expect(SHORTCUT_ACTIVE_TOOLS).not.toContain("rodeo.owlbear.tool/drawing");
        expect(SHORTCUT_ACTIVE_TOOLS).not.toContain("rodeo.owlbear.tool/fog");
    });

    it("defines valid IDs for all tool actions", () => {
        expect(focusCameraToolActionID).toContain("focus-camera-tool-action");
        expect(actionDockToolActionID).toContain("action-dock-tool-action");
        expect(gameLogToolActionID).toContain("game-log-tool-action");
        expect(selectSpellToolActionID).toContain("select-spell-tool-action");
        expect(spellInfoToolActionID).toContain("spell-info-tool-action");
        expect(clearTargetSelectionToolActionID).toContain("clear-target-selection-tool-action");
    });
});
