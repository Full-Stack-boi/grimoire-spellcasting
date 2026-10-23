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
    saveDockHeight,
    resizeActionDock,
    isMobileViewport,
    computeDockLayout,
    snapActionDockMobile,
    resizeActionDockMobile,
    getSavedMobileDockHeight,
    saveMobileDockHeight,
    updateCachedViewportSize,
    MOBILE_TOP_SAFE_MARGIN,
    getSavedMobileFabPosition,
    saveMobileFabPosition,
    moveMobileFab,
    getMobileDockMode,
    setMobileDockMode,
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

    describe("Mobile layout & FAB behaviors", () => {
        it("identifies mobile viewports accurately", () => {
            expect(isMobileViewport(393)).toBe(true);
            expect(isMobileViewport(600)).toBe(true);
            expect(isMobileViewport(601)).toBe(false);
            expect(isMobileViewport(1440)).toBe(false);
        });

        it("computes expanded mobile layout respecting custom and clamped height", () => {
            const layoutDefault = computeDockLayout(393, 852, "expanded");
            expect(layoutDefault.isMobile).toBe(true);
            expect(layoutDefault.popoverWidth).toBe(381); // 393 - 12
            expect(layoutDefault.popoverLeft).toBe(6);
            expect(layoutDefault.popoverHeight).toBeGreaterThanOrEqual(220);

            const layoutCustom = computeDockLayout(393, 852, "expanded", 420);
            expect(layoutCustom.popoverHeight).toBe(420);
            expect(layoutCustom.popoverTop).toBe(852 - 420 - 8);

            // Clamped to minimum 220px
            const layoutClamped = computeDockLayout(393, 852, "expanded", 100);
            expect(layoutClamped.popoverHeight).toBe(220);
        });

        it("computes compact FAB layout at the bottom corner", () => {
            const layout = computeDockLayout(393, 852, "fab");
            expect(layout.isMobile).toBe(true);
            expect(layout.popoverWidth).toBe(64);
            expect(layout.popoverHeight).toBe(64);
            expect(layout.popoverLeft).toBe(16);
            expect(layout.popoverTop).toBe(852 - 64 - 16);
        });

        it("snapActionDockMobile opens popover with target mobile mode", async () => {
            vi.clearAllMocks();
            (OBR.viewport.getWidth as any).mockResolvedValue(393);
            (OBR.viewport.getHeight as any).mockResolvedValue(852);
            (globalThis as any).window.innerWidth = 393;
            (globalThis as any).window.innerHeight = 852;
            updateCachedViewportSize(393, 852);

            await snapActionDockMobile("fab");
            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    width: 64,
                    height: 64,
                })
            );

            await snapActionDockMobile("expanded");
            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    width: 381,
                    height: expect.any(Number),
                })
            );
        });

        it("prewarms directly into FAB mode on mobile viewports", async () => {
            vi.clearAllMocks();
            updateCachedViewportSize(393, 852);
            await prewarmActionDock();
            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    width: 64,
                    height: 64,
                })
            );
        });

        it("closeActionDock on mobile minimizes to FAB instead of parking offscreen", async () => {
            vi.clearAllMocks();
            updateCachedViewportSize(393, 852);
            await closeActionDock();
            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    width: 64,
                    height: 64,
                })
            );
        });
        it("saves and resizes mobile dock height continuously", async () => {
            saveMobileDockHeight(450);
            expect(getSavedMobileDockHeight()).toBe(450);

            vi.clearAllMocks();
            updateCachedViewportSize(393, 852);
            await resizeActionDockMobile(340);
            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    width: 381,
                    height: 340,
                })
            );
            expect(getSavedMobileDockHeight()).toBe(340);
        });

        it("allows resizing back up after shrinking without continuous degradation", async () => {
            vi.clearAllMocks();
            updateCachedViewportSize(393, 852);

            // Step 1: User shrinks from 450 to 300
            await resizeActionDockMobile(300);
            expect(getSavedMobileDockHeight()).toBe(300);

            // Step 2: User expands back up from 300 to 520
            await resizeActionDockMobile(520);
            expect(getSavedMobileDockHeight()).toBe(520);
            expect(OBR.popover.open).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    width: 381,
                    height: 520,
                    anchorPosition: { left: 6, top: 852 - 520 - 8 },
                })
            );

            // Step 3: Repeated cycle (shrink to 260, expand to 600)
            await resizeActionDockMobile(260);
            expect(getSavedMobileDockHeight()).toBe(260);
            await resizeActionDockMobile(600);
            expect(getSavedMobileDockHeight()).toBe(600);
        });

        it("enforces safe ceiling (popoverTop >= MOBILE_TOP_SAFE_MARGIN) to prevent clipping under OBR top bar", () => {
            // Request an oversized height (e.g., 850px on an 852px screen)
            const layout = computeDockLayout(393, 852, "expanded", 850);
            expect(layout.popoverTop).toBeGreaterThanOrEqual(MOBILE_TOP_SAFE_MARGIN);
            // maxHeight must clear MOBILE_TOP_SAFE_MARGIN + 8
            expect(layout.popoverHeight).toBeLessThanOrEqual(852 - MOBILE_TOP_SAFE_MARGIN - 8);
        });

        it("supports draggable FAB positioning, saving, and clamping within safe screen bounds", async () => {
            vi.clearAllMocks();
            updateCachedViewportSize(393, 852);

            // Save custom position (e.g., dragged to right corner)
            saveMobileFabPosition({ left: 320, top: 400 });
            expect(getSavedMobileFabPosition()).toEqual({ left: 320, top: 400 });

            const layout = computeDockLayout(393, 852, "fab");
            expect(layout.popoverLeft).toBe(320);
            expect(layout.popoverTop).toBe(400);

            // Test moveMobileFab clamps to safe boundaries
            // Dragged too high (< MOBILE_TOP_SAFE_MARGIN)
            await moveMobileFab(100, 20);
            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    anchorPosition: {
                        left: 100,
                        top: MOBILE_TOP_SAFE_MARGIN,
                    },
                })
            );

            // Dragged too far right (> viewWidth - 64 - 8)
            await moveMobileFab(500, 300);
            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    anchorPosition: {
                        left: 393 - 64 - 8,
                        top: 300,
                    },
                })
            );
        });

        it("reads and syncs mobile dock mode from localStorage", () => {
            setMobileDockMode("expanded");
            expect(getMobileDockMode()).toBe("expanded");
            store["embers:action-dock-mobile-mode"] = "fab";
            expect(getMobileDockMode()).toBe("fab");
        });
    });

    describe("Desktop & Tablet Action Bar resize and bottom-anchoring", () => {
        it("saves dock height to localStorage", () => {
            saveDockHeight(340);
            expect(getSavedDockHeight()).toBe(340);
        });

        it("resizeActionDock updates desktop popover position keeping bottom pinned", async () => {
            vi.clearAllMocks();
            vi.mocked(OBR.viewport.getWidth).mockResolvedValue(1920);
            vi.mocked(OBR.viewport.getHeight).mockResolvedValue(1080);
            (globalThis as any).window.innerWidth = 1920;
            (globalThis as any).window.innerHeight = 1080;
            updateCachedViewportSize(1920, 1080);

            // Resize to 220px (minimum panel height + 40px resource tray = 260px)
            await resizeActionDock(220);

            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    width: expect.any(Number),
                    height: 260,
                    anchorReference: "POSITION",
                    anchorPosition: expect.objectContaining({
                        left: expect.any(Number),
                        top: 1080 - 260 - 16, // 804px: exactly 16px bottom margin!
                    }),
                    anchorOrigin: {
                        horizontal: "LEFT",
                        vertical: "TOP",
                    },
                    transformOrigin: {
                        horizontal: "LEFT",
                        vertical: "TOP",
                    },
                })
            );

            // Resize to 500px (+ 40px resource tray = 540px)
            vi.clearAllMocks();
            await resizeActionDock(500);

            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    height: 540,
                    anchorPosition: expect.objectContaining({
                        top: 1080 - 540 - 16, // 524px: top moves UP, bottom stays at 1080 - 16!
                    }),
                })
            );
        });

        it("resizeActionDock delegates to resizeActionDockMobile on mobile viewports", async () => {
            vi.clearAllMocks();
            vi.mocked(OBR.viewport.getWidth).mockResolvedValue(393);
            vi.mocked(OBR.viewport.getHeight).mockResolvedValue(852);
            (globalThis as any).window.innerWidth = 393;
            (globalThis as any).window.innerHeight = 852;
            updateCachedViewportSize(393, 852);

            await resizeActionDock(300);

            expect(OBR.popover.open).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: actionDockPopoverId,
                    height: 300,
                    anchorPosition: expect.objectContaining({
                        top: 852 - 300 - 8,
                    }),
                })
            );
        });
    });
});
