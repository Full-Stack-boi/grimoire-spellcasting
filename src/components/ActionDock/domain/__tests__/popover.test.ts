import { describe, it, expect, beforeEach, vi } from "vitest";
import {
    actionDockPopoverId,
    openActionDock,
    closeActionDock,
    isActionDockOpen,
    isActionDockOpenSync,
    prewarmActionDock,
    destroyActionDock,
    syncActionDockViewport,
    getSavedDockHeight,
} from "../popover";
import OBR from "@owlbear-rodeo/sdk";

vi.mock("@owlbear-rodeo/sdk", () => {
    return {
        default: {
            isReady: true,
            onReady: vi.fn((cb) => cb && cb()),
            viewport: {
                getWidth: vi.fn().mockResolvedValue(1920),
                getHeight: vi.fn().mockResolvedValue(1080),
            },
            popover: {
                open: vi.fn().mockResolvedValue(undefined),
                close: vi.fn().mockResolvedValue(undefined),
                getHeight: vi.fn().mockResolvedValue(undefined),
            },
        },
    };
});

describe("ActionDock popover domain", () => {
    let store: Record<string, string> = {};

    beforeEach(() => {
        store = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).localStorage = {
            getItem: (k: string) => store[k] ?? null,
            setItem: (k: string, v: string) => { store[k] = v; },
            removeItem: (k: string) => { delete store[k]; },
            clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).window = {
            location: {
                origin: "http://localhost:5173",
                search: "",
            },
            innerWidth: 1920,
            innerHeight: 1080,
        };
        vi.clearAllMocks();
    });

    it("opens ActionDock popover with clean stable URL without dockHeight", async () => {
        await openActionDock();
        expect(OBR.popover.open).toHaveBeenCalledWith(
            expect.objectContaining({
                id: actionDockPopoverId,
                url: "http://localhost:5173/action-dock",
                anchorReference: "POSITION",
                hidePaper: true,
                disableClickAway: true,
            })
        );
        expect(await isActionDockOpen()).toBe(true);
    });

    it("syncActionDockViewport adjusts position and dimensions when open", async () => {
        vi.clearAllMocks();
        // Currently open
        await syncActionDockViewport(1280, 720);
        expect(OBR.popover.open).toHaveBeenCalledWith(
            expect.objectContaining({
                id: actionDockPopoverId,
                url: "http://localhost:5173/action-dock",
                anchorReference: "POSITION",
            })
        );
    });

    it("syncActionDockViewport does nothing when closed", async () => {
        await closeActionDock();
        vi.clearAllMocks();
        vi.mocked(OBR.popover.getHeight).mockResolvedValue(undefined);

        await syncActionDockViewport(1280, 720);
        expect(OBR.popover.open).not.toHaveBeenCalled();
    });

    it("respects saved dock height from localStorage", () => {
        store["embers:action-dock-height"] = "350";
        expect(getSavedDockHeight()).toBe(350);
    });

    it("prewarms ActionDock parked offscreen without opening it to user", async () => {
        await prewarmActionDock();
        expect(OBR.popover.open).toHaveBeenCalledWith(
            expect.objectContaining({
                id: actionDockPopoverId,
                width: 0,
                height: 0,
                anchorPosition: { left: -9999, top: -9999 },
                marginThreshold: 0,
            })
        );
        expect(isActionDockOpenSync()).toBe(false);
    });

    it("destroys ActionDock popover completely and resets state", async () => {
        await openActionDock();
        expect(isActionDockOpenSync()).toBe(true);
        await destroyActionDock();
        expect(OBR.popover.close).toHaveBeenCalledWith(actionDockPopoverId);
        expect(isActionDockOpenSync()).toBe(false);
    });
});
