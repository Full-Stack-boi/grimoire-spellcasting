import OBR from "@owlbear-rodeo/sdk";

import { APP_KEY } from "../../../config";
import { calculateResponsivePopoverDimensions } from "../../../utils/popoverSizing";

export const actionDockPopoverId = `${APP_KEY}/action-dock-popover`;
export const DOCK_SAVED_HEIGHT_KEY = "embers:action-dock-height";
export const DOCK_OPEN_STATE_KEY = "embers:action-dock-open";
export const DOCK_VIEWPORT_SIZE_KEY = "embers:viewport-dimensions";
export const DOCK_MOBILE_MODE_KEY = "embers:action-dock-mobile-mode";
export const RESOURCE_TRAY_FLOAT_HEIGHT = 40;
export const MOBILE_DOCK_BREAKPOINT = 600;

export function isMobileViewport(viewWidth: number): boolean {
    return viewWidth > 0 && viewWidth <= MOBILE_DOCK_BREAKPOINT;
}

function getInitialViewportDimensions(): { width: number; height: number } {
    if (typeof window === "undefined") return { width: 1440, height: 900 };
    const screenW = window.screen?.width || 0;
    const screenH = window.screen?.availHeight || window.screen?.height || 0;
    // Inside an iframe, window.innerWidth/innerHeight are small popover dimensions.
    // Screen dimensions are constant across iframes and reflect the real device.
    const width = screenW > 300 ? screenW : Math.max(window.innerWidth || 0, 1440);
    const height = screenH > 400 ? screenH : Math.max(window.innerHeight || 0, 900);
    return { width, height };
}

const initialViewport = getInitialViewportDimensions();
let cachedDockViewWidth = initialViewport.width;
let cachedDockViewHeight = initialViewport.height;
export const MOBILE_SAVED_HEIGHT_KEY = "embers:dock-mobile-height";
export const DOCK_MOBILE_FAB_POS_KEY = "embers:mobile-fab-position";
export const MOBILE_TOP_SAFE_MARGIN = 96;
export type MobileDockMode = "expanded" | "fab";

export interface MobileFabPosition {
    left: number;
    top: number;
}

let currentMobileDockMode: MobileDockMode = "fab";

export function getMobileDockMode(): MobileDockMode {
    try {
        if (typeof localStorage !== "undefined") {
            const saved = localStorage.getItem(DOCK_MOBILE_MODE_KEY);
            if (saved === "fab" || saved === "expanded") {
                currentMobileDockMode = saved;
                return saved;
            }
        }
    } catch {}
    return currentMobileDockMode;
}

export function setMobileDockMode(mode: MobileDockMode): void {
    currentMobileDockMode = mode;
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(DOCK_MOBILE_MODE_KEY, mode);
        }
    } catch {}
}

export function getSavedMobileFabPosition(): MobileFabPosition | null {
    try {
        if (typeof localStorage !== "undefined") {
            const raw = localStorage.getItem(DOCK_MOBILE_FAB_POS_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (typeof parsed?.left === "number" && typeof parsed?.top === "number") {
                    return parsed;
                }
            }
        }
    } catch {}
    return null;
}

export function saveMobileFabPosition(pos: MobileFabPosition): void {
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(DOCK_MOBILE_FAB_POS_KEY, JSON.stringify(pos));
        }
    } catch {}
}

export function getSavedMobileDockHeight(): number {
    try {
        if (typeof localStorage !== "undefined") {
            const raw = localStorage.getItem(MOBILE_SAVED_HEIGHT_KEY);
            if (raw) {
                const parsed = parseInt(raw, 10);
                if (!isNaN(parsed) && parsed >= 220 && parsed <= 900) {
                    return parsed;
                }
            }
        }
    } catch {}
    const { height: viewHeight } = getCachedViewportSize();
    return Math.min(540, Math.max(280, Math.round(viewHeight * 0.65)));
}

export function saveMobileDockHeight(height: number): void {
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(MOBILE_SAVED_HEIGHT_KEY, String(height));
        }
    } catch {}
}

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
                if (parsed.width > 200 && parsed.height > 300) {
                    cachedDockViewWidth = parsed.width;
                    cachedDockViewHeight = parsed.height;
                    return parsed;
                }
            }
        }
    } catch {}
    const { width: sw, height: sh } = getInitialViewportDimensions();
    const width = cachedDockViewWidth > 200 ? cachedDockViewWidth : sw;
    const height = cachedDockViewHeight > 300 ? cachedDockViewHeight : sh;
    return { width, height };
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

export function saveDockHeight(height: number): void {
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(DOCK_SAVED_HEIGHT_KEY, String(height));
        }
    } catch {}
}

let lastToggleTime = 0;
let isToggling = false;
let isDockLocallyOpen = false;

export function computeDockLayout(
    viewWidth: number,
    viewHeight: number,
    mobileMode: MobileDockMode = currentMobileDockMode,
    customHeight?: number,
) {
    const isMobile = isMobileViewport(viewWidth);

    const dockSearch = new URLSearchParams(typeof window !== "undefined" ? window.location.search || "" : "");
    dockSearch.delete("view");
    dockSearch.delete("mode");
    dockSearch.delete("dockHeight");
    dockSearch.delete("obrref");
    const searchStr = dockSearch.toString() ? `?${dockSearch.toString()}` : "";
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const url = `${origin}/action-dock${searchStr}`;

    if (isMobile) {
        if (mobileMode === "fab") {
            const fabSize = 64;
            const fabMargin = 16;
            const savedPos = getSavedMobileFabPosition();
            let popoverLeft = fabMargin;
            let popoverTop = Math.max(MOBILE_TOP_SAFE_MARGIN, viewHeight - fabSize - fabMargin);

            if (savedPos) {
                const minLeft = 8;
                const maxLeft = Math.max(minLeft, viewWidth - fabSize - 8);
                const minTop = MOBILE_TOP_SAFE_MARGIN;
                const maxTop = Math.max(minTop, viewHeight - fabSize - 8);
                popoverLeft = Math.min(Math.max(minLeft, Math.round(savedPos.left)), maxLeft);
                popoverTop = Math.min(Math.max(minTop, Math.round(savedPos.top)), maxTop);
            }

            return {
                url,
                popoverWidth: fabSize,
                popoverHeight: fabSize,
                popoverLeft,
                popoverTop,
                isMobile: true,
            };
        }

        const popoverWidth = Math.max(300, viewWidth - 12);
        const maxHeight = Math.max(220, viewHeight - MOBILE_TOP_SAFE_MARGIN - 8);
        const preferredHeight = customHeight ?? getSavedMobileDockHeight();
        const popoverHeight = Math.min(Math.max(220, preferredHeight), maxHeight);
        const popoverLeft = Math.max(0, Math.round((viewWidth - popoverWidth) / 2));
        const popoverTop = Math.max(MOBILE_TOP_SAFE_MARGIN, Math.round(viewHeight - popoverHeight - 8));

        return {
            url,
            popoverWidth,
            popoverHeight,
            popoverLeft,
            popoverTop,
            isMobile: true,
        };
    }

    const savedH = getSavedDockHeight();
    const isTablet = viewWidth <= 980 && !isMobile;
    const defaultDockHeight = isTablet
        ? Math.min(360, Math.max(260, Math.round(viewHeight * 0.32)))
        : Math.min(280, Math.max(220, Math.round(viewHeight * 0.28)));
    const preferredDockHeight = customHeight ?? savedH ?? defaultDockHeight;
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

    return {
        url,
        popoverWidth,
        popoverHeight,
        popoverLeft,
        popoverTop,
        isMobile: false,
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
    let { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    try {
        const [w, h] = await Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()]);
        if (w && h && w > 100 && h > 100) {
            viewWidth = w;
            viewHeight = h;
            updateCachedViewportSize(w, h);
        }
    } catch {}

    const isMobile = isMobileViewport(viewWidth);
    if (isMobile) {
        currentMobileDockMode = "fab";
        isDockLocallyOpen = true;
        notifyDockVisibility(true);
        const layout = computeDockLayout(viewWidth, viewHeight, "fab");
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
            console.warn("[Embers] ActionDock mobile FAB pre-warm failed:", err);
        }
        return;
    }

    if (isDockLocallyOpen || isActionDockOpenSync()) return;

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
    currentMobileDockMode = "expanded";
    notifyDockVisibility(true);

    let { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    try {
        const [w, h] = await Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()]);
        if (w && h && w > 100 && h > 100) {
            viewWidth = w;
            viewHeight = h;
            updateCachedViewportSize(w, h);
        }
    } catch {}

    const layout = computeDockLayout(viewWidth, viewHeight, "expanded");

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
 * Snaps ActionDock on mobile between expanded sheet mode and compact floating FAB mode.
 */
export async function snapActionDockMobile(mode: MobileDockMode): Promise<void> {
    currentMobileDockMode = mode;
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(DOCK_MOBILE_MODE_KEY, mode);
        }
    } catch {}
    try {
        dockStateChannel?.postMessage({ type: "MOBILE_MODE_CHANGE", mode });
    } catch {}

    let { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    try {
        const [w, h] = await Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()]);
        if (w && h && w > 200 && h > 200) {
            viewWidth = w;
            viewHeight = h;
            updateCachedViewportSize(w, h);
        }
    } catch {}

    const layout = computeDockLayout(viewWidth, viewHeight, mode);

    try {
        if (OBR?.popover && typeof OBR.popover.setHeight === "function" && typeof OBR.popover.setWidth === "function") {
            await Promise.all([
                OBR.popover.setHeight(actionDockPopoverId, layout.popoverHeight),
                OBR.popover.setWidth(actionDockPopoverId, layout.popoverWidth),
            ]);
        }
    } catch {}

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
        console.error("Failed to snap ActionDock mobile layout:", err);
    }
}

export async function resizeActionDockMobile(height: number): Promise<void> {
    let { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    try {
        const [w, h] = await Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()]);
        if (w && h && w > 200 && h > 200) {
            viewWidth = w;
            viewHeight = h;
            updateCachedViewportSize(w, h);
        }
    } catch {}

    const layout = computeDockLayout(viewWidth, viewHeight, "expanded", height);
    saveMobileDockHeight(layout.popoverHeight);

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
        console.error("Failed to resize mobile ActionDock:", err);
    }
}

export async function resizeActionDock(height: number): Promise<void> {
    let { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    try {
        const [w, h] = await Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()]);
        if (w && h && w > 200 && h > 200) {
            viewWidth = w;
            viewHeight = h;
            updateCachedViewportSize(w, h);
        }
    } catch {}

    const isMobile = isMobileViewport(viewWidth);
    if (isMobile) {
        return resizeActionDockMobile(height);
    }

    saveDockHeight(height);
    const layout = computeDockLayout(viewWidth, viewHeight, "expanded", height);

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
        console.error("Failed to resize desktop ActionDock:", err);
    }
}

/**
 * Moves the mobile floating action button (FAB) freely across the screen,
 * clamping within safe margins so it doesn't clip offscreen or cover the top navigation.
 */
export async function moveMobileFab(left: number, top: number): Promise<void> {
    let { width: viewWidth, height: viewHeight } = getCachedViewportSize();
    try {
        const [w, h] = await Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()]);
        if (w && h && w > 200 && h > 200) {
            viewWidth = w;
            viewHeight = h;
            updateCachedViewportSize(w, h);
        }
    } catch {}

    const fabSize = 64;
    const minLeft = 8;
    const maxLeft = Math.max(minLeft, viewWidth - fabSize - 8);
    const minTop = MOBILE_TOP_SAFE_MARGIN;
    const maxTop = Math.max(minTop, viewHeight - fabSize - 8);

    const clampLeft = Math.round(Math.min(Math.max(minLeft, left), maxLeft));
    const clampTop = Math.round(Math.min(Math.max(minTop, top), maxTop));

    saveMobileFabPosition({ left: clampLeft, top: clampTop });

    const dockSearch = new URLSearchParams(typeof window !== "undefined" ? window.location.search || "" : "");
    dockSearch.delete("view");
    dockSearch.delete("mode");
    dockSearch.delete("dockHeight");
    dockSearch.delete("obrref");
    const searchStr = dockSearch.toString() ? `?${dockSearch.toString()}` : "";
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const url = `${origin}/action-dock${searchStr}`;

    try {
        await OBR.popover.open({
            id: actionDockPopoverId,
            url,
            width: fabSize,
            height: fabSize,
            anchorReference: "POSITION",
            anchorPosition: {
                left: clampLeft,
                top: clampTop,
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
        console.error("Failed to move mobile FAB:", err);
    }
}

/**
 * Closes the ActionDock popover by parking it offscreen at 0x0 size, keeping the iframe alive.
 */
export async function closeActionDock(): Promise<void> {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
    const { width: viewWidth } = getCachedViewportSize();
    if (isMobileViewport(viewWidth)) {
        await snapActionDockMobile("fab");
        return;
    }

    isDockLocallyOpen = false;
    notifyDockVisibility(false);

    const { height: viewHeight } = getCachedViewportSize();
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
    const isMobile = isMobileViewport(viewWidth);
    const isOpen = isActionDockOpenSync();
    if (!isOpen && !isMobile) return;

    updateCachedViewportSize(viewWidth, viewHeight);
    const layout = computeDockLayout(viewWidth, viewHeight, currentMobileDockMode);

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

    try {
        dockStateChannel?.postMessage({
            type: "MOBILE_MODE_CHANGE",
            mode: isMobile ? currentMobileDockMode : "expanded",
        });
    } catch {}
}

export async function toggleActionDock(): Promise<void> {
    const now = Date.now();
    if (now - lastToggleTime < 100 || isToggling) {
        return;
    }
    lastToggleTime = now;

    const { width: viewWidth } = getCachedViewportSize();
    if (isMobileViewport(viewWidth)) {
        if (currentMobileDockMode === "expanded") {
            await snapActionDockMobile("fab");
        } else {
            await snapActionDockMobile("expanded");
        }
        return;
    }

    if (isActionDockOpenSync()) {
        await closeActionDock();
    } else {
        await openActionDock();
    }
}
