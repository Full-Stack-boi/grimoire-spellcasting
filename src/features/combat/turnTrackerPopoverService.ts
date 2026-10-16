import { APP_KEY } from "../../config";
import type { CombatEncounter } from "./domain/types";
import { calculateResponsivePopoverDimensions } from "../../utils/popoverSizing";

export const turnTrackerPopoverId = `${APP_KEY}/bg3-top-turn-tracker`;

async function getOBR() {
  const sdk = await import("@owlbear-rodeo/sdk");
  return sdk.default;
}

let cachedViewWidth =
  typeof window !== "undefined" ? window.innerWidth || 1440 : 1440;
let cachedViewHeight =
  typeof window !== "undefined" ? window.innerHeight || 900 : 900;

if (typeof window !== "undefined") {
  getOBR()
    .then((OBR) => {
      if (OBR.isReady) {
        Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()])
          .then(([w, h]) => {
            if (w && w > 0) cachedViewWidth = w;
            if (h && h > 0) cachedViewHeight = h;
          })
          .catch(() => {});
      }
    })
    .catch(() => {});
}

/**
 * Calculates responsive width of the top BG3 turn strip.
 * Provides generous breathing room with symmetrical 76px wings on both sides.
 */
export function calculateTurnTrackerWidth(combatantCount: number): number {
  const contentWidth = 184 + Math.max(1, combatantCount) * 54;
  return Math.min(1000, Math.max(360, contentWidth));
}

let isTurnTrackerOpen = false;

export function isTopTurnTrackerOpen(): boolean {
  return isTurnTrackerOpen;
}

export const DEFAULT_TURN_TRACKER_TOP = 48;
export const DEFAULT_TURN_TRACKER_HEIGHT = 84;
export const TURN_TRACKER_TOOLTIP_HEIGHT = 152;
export const TURN_TRACKER_TOP_KEY = "embers:turn-tracker-top";
let trackerHeightRequestId = 0;

/**
 * Keeps the tracker compact at rest and expands it only while a portrait tooltip is visible.
 */
export async function setTurnTrackerTooltipVisible(visible: boolean): Promise<void> {
  const requestId = ++trackerHeightRequestId;
  const OBR = await getOBR();
  if (!OBR.isReady) {
    await new Promise<void>((resolve) => OBR.onReady(resolve));
  }

  try {
    const viewportHeight = await OBR.viewport.getHeight();
    if (requestId !== trackerHeightRequestId) return;

    const height = calculateResponsivePopoverDimensions(
      cachedViewWidth,
      viewportHeight,
      calculateTurnTrackerWidth(4),
      visible ? TURN_TRACKER_TOOLTIP_HEIGHT : DEFAULT_TURN_TRACKER_HEIGHT,
    ).height;
    await OBR.popover.setHeight(turnTrackerPopoverId, height);
  } catch (error) {
    console.error("Failed to resize BG3 Turn Tracker for portrait tooltip:", error);
  }
}

export function getSavedTurnTrackerTop(): number {
  try {
    if (typeof localStorage !== "undefined") {
      const val = localStorage.getItem(TURN_TRACKER_TOP_KEY);
      if (val) {
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed) && parsed >= 30 && parsed <= 400) {
          return parsed;
        }
      }
    }
  } catch {}
  return DEFAULT_TURN_TRACKER_TOP;
}

export function setSavedTurnTrackerTop(top: number): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(TURN_TRACKER_TOP_KEY, String(top));
    }
  } catch {}
}

/**
 * Opens or re-anchors the floating top-center BG3 turn ribbon popover.
 */
export async function openTopTurnTrackerPopover(
  combatantCount = 4,
  customTop?: number,
): Promise<void> {
  const OBR = await getOBR();
  if (!OBR.isReady) {
    await new Promise<void>((resolve) => OBR.onReady(resolve));
  }

  if (typeof customTop === "number") {
    setSavedTurnTrackerTop(customTop);
  }

  try {
    const [w, h] = await Promise.all([
      OBR.viewport.getWidth(),
      OBR.viewport.getHeight(),
    ]);
    if (w && w > 0) cachedViewWidth = w;
    if (h && h > 0) cachedViewHeight = h;
  } catch {}

  const viewWidth = cachedViewWidth > 0 ? cachedViewWidth : 1440;
  const dimensions = calculateResponsivePopoverDimensions(
    viewWidth,
    cachedViewHeight,
    calculateTurnTrackerWidth(combatantCount),
    DEFAULT_TURN_TRACKER_HEIGHT,
  );
  const popoverWidth = dimensions.width;
  const popoverHeight = dimensions.height;
  const left = Math.max(8, Math.round((viewWidth - popoverWidth) / 2));
  const preferredTop =
    typeof customTop === "number" ? customTop : getSavedTurnTrackerTop();
  const top = Math.max(
    8,
    Math.min(preferredTop, cachedViewHeight - popoverHeight - 8),
  );

  const search =
    typeof window !== "undefined" ? window.location.search || "" : "";
  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const searchParams = new URLSearchParams(search);
  searchParams.delete("dockHeight");
  searchParams.delete("mode");
  searchParams.set("view", "turn-tracker");
  // Load via index.html so it never 404s on static hosting, Vercel SPA and localhost
  const popoverUrl = `${origin}/index.html?${searchParams.toString()}`;

  try {
    await OBR.popover.open({
      id: turnTrackerPopoverId,
      url: popoverUrl,
      width: popoverWidth,
      height: popoverHeight,
      anchorReference: "POSITION",
      anchorPosition: {
        left,
        top,
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
    isTurnTrackerOpen = true;
  } catch (err) {
    console.error("Failed to open BG3 Turn Tracker Popover:", err);
  }
}

/**
 * Closes the floating top-center BG3 turn ribbon popover.
 */
export async function closeTopTurnTrackerPopover(): Promise<void> {
  const OBR = await getOBR();
  if (!OBR.isReady) return;
  try {
    await OBR.popover.close(turnTrackerPopoverId);
    isTurnTrackerOpen = false;
  } catch {}
}

/**
 * Toggles the top turn tracker ribbon popover open/closed.
 */
export async function toggleTopTurnTrackerPopover(
  combatantCount = 4,
): Promise<boolean> {
  const OBR = await getOBR();
  if (!OBR.isReady) {
    await new Promise<void>((resolve) => OBR.onReady(resolve));
  }

  let isOpen = isTurnTrackerOpen;
  try {
    const w = await OBR.popover.getWidth(turnTrackerPopoverId);
    if (typeof w === "number" && w > 0) {
      isOpen = true;
    } else if (w === undefined) {
      isOpen = false;
    }
  } catch {}

  if (isOpen) {
    await closeTopTurnTrackerPopover();
    return false;
  } else {
    await openTopTurnTrackerPopover(combatantCount);
    return true;
  }
}

/**
 * Synchronizes the visibility and dimensions of the top turn tracker based on encounter state.
 */
export async function syncTopTurnTrackerPopover(
  encounter: CombatEncounter | null,
): Promise<void> {
  if (!encounter || !encounter.isActive || encounter.combatants.length === 0) {
    await closeTopTurnTrackerPopover();
    return;
  }

  const OBR = await getOBR();
  if (!OBR.isReady) {
    await new Promise<void>((resolve) => OBR.onReady(resolve));
  }

  try {
    const [width, height] = await Promise.all([
      OBR.viewport.getWidth(),
      OBR.viewport.getHeight(),
    ]);
    if (width && width > 0) cachedViewWidth = width;
    if (height && height > 0) cachedViewHeight = height;
  } catch {}

  const neededDimensions = calculateResponsivePopoverDimensions(
    cachedViewWidth,
    cachedViewHeight,
    calculateTurnTrackerWidth(encounter.combatants.length),
    DEFAULT_TURN_TRACKER_HEIGHT,
  );
  const neededWidth = neededDimensions.width;
  const maxHeight = calculateResponsivePopoverDimensions(
    cachedViewWidth,
    cachedViewHeight,
    calculateTurnTrackerWidth(encounter.combatants.length),
    TURN_TRACKER_TOOLTIP_HEIGHT,
  ).height;

  let isOpen = isTurnTrackerOpen;
  try {
    const w = await OBR.popover.getWidth(turnTrackerPopoverId);
    if (typeof w === "number" && w > 0) {
      isOpen = true;
    } else if (w === undefined) {
      isOpen = false;
    }
  } catch {}

  if (!isOpen) {
    await openTopTurnTrackerPopover(encounter.combatants.length);
  } else {
    try {
      const currentWidth = await OBR.popover.getWidth(turnTrackerPopoverId);
      const currentHeight = await OBR.popover.getHeight(turnTrackerPopoverId);
      if (currentWidth !== neededWidth) {
        await openTopTurnTrackerPopover(encounter.combatants.length);
      } else if (currentHeight !== undefined && currentHeight > maxHeight) {
        await OBR.popover.setHeight(turnTrackerPopoverId, maxHeight);
      }
    } catch {
      await openTopTurnTrackerPopover(encounter.combatants.length);
    }
  }
}

/**
 * Re-anchors and resizes the top turn tracker on screen viewport resize (if open).
 */
export async function syncTopTurnTrackerViewport(
  viewWidth: number,
  viewHeight: number,
): Promise<void> {
  const OBR = await getOBR();
  if (!OBR.isReady) return;
  let isOpen = isTurnTrackerOpen;
  try {
    const w = await OBR.popover.getWidth(turnTrackerPopoverId);
    if (typeof w === "number" && w > 0) {
      isOpen = true;
    } else if (w === undefined) {
      isOpen = false;
    }
  } catch {
    isOpen = false;
  }
  if (!isOpen) return;

  cachedViewWidth = viewWidth;
  cachedViewHeight = viewHeight;
  await openTopTurnTrackerPopover();
}
