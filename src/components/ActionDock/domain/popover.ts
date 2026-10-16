import OBR from "@owlbear-rodeo/sdk";

import { APP_KEY } from "../../../config";
import { calculateResponsivePopoverDimensions } from "../../../utils/popoverSizing";

export const actionDockPopoverId = `${APP_KEY}/action-dock-popover`;
export const DOCK_SAVED_HEIGHT_KEY = "embers:action-dock-height";
export const DOCK_OPEN_STATE_KEY = "embers:action-dock-open";
export const DOCK_VIEWPORT_SIZE_KEY = "embers:viewport-dimensions";
export const RESOURCE_TRAY_FLOAT_HEIGHT = 40;

let cachedDockViewWidth = typeof window !== "undefined" ? window.innerWidth || 1440 : 1440;
let cachedDockViewHeight = typeof window !== "undefined" ? window.innerHeight || 900 : 900;

export function updateCachedViewportSize(width: number, height: number): void {
    if (width > 200) cachedDockViewWidth = width;
    if (height > 200) cachedDockViewHeight = height;
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(DOCK_VIEWPORT_SIZE_KEY, JSON.stringify({ width, height }));
        }
    } catch {}
}

export function getCachedViewportSize(): { width: number; height: number } {
    try {
        if (typeof localStorage !== "undefined") {
            const raw = localStorage.getItem(DOCK_VIEWPORT_SIZE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed.width > 200 && parsed.height > 200) {
                    cachedDockViewWidth = parsed.width;
                    cachedDockViewHeight = parsed.height;
                    return parsed;
                }
            }
        }
    } catch {}
    return { width: cachedDockViewWidth, height: cachedDockViewHeight };
}

if (typeof window !== "undefined") {
    // Prime cached dimensions from localStorage immediately
    getCachedViewportSize();

    OBR.onReady(() => {
        Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()]).then(([w, h]) => {
            if (w && h && w > 200 && h > 200) {
                updateCachedViewportSize(w, h);
            }
        }).catch(() => {});
    });
}

const BROADCAST_CHANNEL_NAME = "embers-action-dock-state";
let dockStateChannel: BroadcastChannel | null = null;
if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
    try {
        dockStateChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    } catch {}
}

function notifyDockVisibility(isOpen: boolean) {
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(DOCK_OPEN_STATE_KEY, isOpen ? "1" : "0");
        }
    } catch {}
    try {
        dockStateChannel?.postMessage({ type: "VISIBILITY_CHANGE", isOpen });
    } catch {}
}

export function getSavedDockHeight(): number | null {
    try {
        const val = localStorage.getItem(DOCK_SAVED_HEIGHT_KEY);
        if (val) {
            const parsed = parseInt(val, 10);
            if (!isNaN(parsed) && parsed >= 200 && parsed <= 900) {
                return parsed;
            }
        }
    } catch {}
    return null;
}

let lastToggleTime = 0;
let isToggling = false;
let isDockLocallyOpen = false;

function computeDockLayout(viewWidth: number, viewHeight: number) {
    const savedH = getSavedDockHeight();
    const defaultDockHeight = Math.min(280, Math.max(220, Math.round(viewHeight * 0.28)));
    const preferredDockHeight = savedH ?? defaultDockHeight;
    const preferredDockWidth = Math.min(1480, Math.max(760, viewWidth - 140));
    const preferredPopoverWidth = preferredDockWidth + 60;
    const dimensions = calculateResponsivePopoverDimensions(
        viewWidth,
        viewHeight,
        preferredPopoverWidth,
        preferredDockHeight + RESOURCE_TRAY_FLOAT_HEIGHT,
    );
    const widthConstrained = dimensions.width < preferredPopoverWidth;
    const extraLeftGutter = widthConstrained ? 0 : 60;
    const dockWidth = dimensions.width - extraLeftGutter;
    const popoverHeight = dimensions.height;

    const dockLeft = widthConstrained
        ? Math.max(8, Math.round((viewWidth - dockWidth) / 2))
        : Math.max(70, Math.round((viewWidth - dockWidth) / 2));
    const popoverLeft = widthConstrained
        ? dockLeft
        : Math.max(0, dockLeft - extraLeftGutter);
    const popoverWidth = dimensions.width;
    const heightConstrained =
        dimensions.height < preferredDockHeight + RESOURCE_TRAY_FLOAT_HEIGHT;
    const popoverTop = heightConstrained
        ? Math.max(8, Math.round(viewHeight - popoverHeight - 8))
        : Math.max(10, Math.round(viewHeight - popoverHeight - 16));

    const dockSearch = new URLSearchParams(typeof window !== "undefined" ? window.location.search || "" : "");
    dockSearch.delete("view");
    dockSearch.delete("mode");
    dockSearch.delete("dockHeight");
    const searchStr = dockSearch.toString() ? `?${dockSearch.toString()}` : "";
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const url = `${origin}/action-dock${searchStr}`;

    return {
        url,
        popoverWidth,
        popoverHeight,
        popoverLeft,
        popoverTop,
    };
}

export function isActionDockOpenSync(): boolean {
    if (isDockLocallyOpen) return true;
    try {
        if (typeof localStorage !== "undefined") {
            return localStorage.getItem(DOCK_OPEN_STATE_KEY) === "1";
        }
    } catch {}
    return false;
}

export async function isActionDockOpen(): Promise<boolean> {
    return isActionDockOpenSync();
}

/**
 * Pre-warms the ActionDock popover parked offscreen at 0x0 pixels so it mounts
 * and synchronizes character data in the background before the user presses B.
 */
export async function prewarmActionDock(): Promise<void> {
    if (isDockLocallyOpen || isActionDockOpenSync()) return;
    const { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    const layout = computeDockLayout(viewWidth, viewHeight);

    try {
        await OBR.popover.open({
            id: actionDockPopoverId,
            url: layout.url,
            width: 0,
            height: 0,
            anchorReference: "POSITION",
            anchorPosition: {
                left: -9999,
                top: -9999,
            },
            marginThreshold: 0,
            hidePaper: true,
            disableClickAway: true,
        });
    } catch (err) {
        console.warn("[Embers] ActionDock pre-warm failed:", err);
    }
}

/**
 * Opens or restores the ActionDock popover instantly (Zero-Await) into view.
 */
export async function openActionDock(): Promise<void> {
    if (isToggling) return;
    isToggling = true;
    isDockLocallyOpen = true;
    notifyDockVisibility(true);

    const { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    const layout = computeDockLayout(viewWidth, viewHeight);

    try {
        await OBR.popover.open({
            id: actionDockPopoverId,
            url: layout.url,
            width: layout.popoverWidth,
            height: layout.popoverHeight,
            anchorReference: "POSITION",
            anchorPosition: {
                left: layout.popoverLeft,
                top: layout.popoverTop,
            },
            anchorOrigin: {
                horizontal: "LEFT",
                vertical: "TOP",
            },
            transformOrigin: {
                horizontal: "LEFT",
                vertical: "TOP",
            },
            hidePaper: true,
            disableClickAway: true,
        });
    } catch (err) {
        console.error("Failed to open ActionDock popover:", err);
    } finally {
        isToggling = false;
    }

    // Background verification: check for any recent viewport changes
    OBR.viewport.getWidth().then(async (freshW) => {
        const freshH = await OBR.viewport.getHeight();
        if (freshW && freshH && (Math.abs(freshW - viewWidth) > 10 || Math.abs(freshH - viewHeight) > 10)) {
            updateCachedViewportSize(freshW, freshH);
            if (isActionDockOpenSync()) {
                void syncActionDockViewport(freshW, freshH);
            }
        }
    }).catch(() => {});
}

/**
 * Closes the ActionDock popover by parking it offscreen at 0x0 size, keeping the iframe alive.
 */
export async function closeActionDock(): Promise<void> {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
    isDockLocallyOpen = false;
    notifyDockVisibility(false);

    const { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    const layout = computeDockLayout(viewWidth, viewHeight);

    try {
        await OBR.popover.open({
            id: actionDockPopoverId,
            url: layout.url,
            width: 0,
            height: 0,
            anchorReference: "POSITION",
            anchorPosition: {
                left: -9999,
                top: -9999,
            },
            marginThreshold: 0,
            hidePaper: true,
            disableClickAway: true,
        });
    } catch {
        try {
            await OBR.popover.close(actionDockPopoverId);
        } catch {}
    }
}

/**
 * Fully closes and unmounts the ActionDock popover (used on scene teardown).
 */
export async function destroyActionDock(): Promise<void> {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
    isDockLocallyOpen = false;
    notifyDockVisibility(false);
    try {
        await OBR.popover.close(actionDockPopoverId);
    } catch {}
}

export async function syncActionDockViewport(viewWidth: number, viewHeight: number) {
    if (isToggling) return;
    const isOpen = isActionDockOpenSync();
    if (!isOpen) return;

    updateCachedViewportSize(viewWidth, viewHeight);
    const layout = computeDockLayout(viewWidth, viewHeight);

    try {
        await OBR.popover.open({
            id: actionDockPopoverId,
            url: layout.url,
            width: layout.popoverWidth,
            height: layout.popoverHeight,
            anchorReference: "POSITION",
            anchorPosition: {
                left: layout.popoverLeft,
                top: layout.popoverTop,
            },
            anchorOrigin: {
                horizontal: "LEFT",
                vertical: "TOP",
            },
            transformOrigin: {
                horizontal: "LEFT",
                vertical: "TOP",
            },
            hidePaper: true,
            disableClickAway: true,
        });
    } catch (err) {
        console.error("Failed to sync ActionDock viewport:", err);
    }
}

export async function toggleActionDock(): Promise<void> {
    const now = Date.now();
    if (now - lastToggleTime < 100 || isToggling) {
        return;
    }
    lastToggleTime = now;

    if (isActionDockOpenSync()) {
        await closeActionDock();
    } else {
        await openActionDock();
    }
}
