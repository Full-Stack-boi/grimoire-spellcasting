export const MIN_DOCK_PANEL_HEIGHT = 220;
export const MAX_DOCK_PANEL_HEIGHT = 900;
export const DOCK_VIEWPORT_GUTTER = 16;

export function calculateMaxDockPanelHeight(
    viewportHeight: number,
    resourceTrayHeight: number,
): number {
    if (
        !Number.isFinite(viewportHeight) ||
        viewportHeight <= 0 ||
        !Number.isFinite(resourceTrayHeight) ||
        resourceTrayHeight < 0
    ) {
        throw new RangeError(
            "Dock viewport height must be positive and resource tray height must be non-negative.",
        );
    }

    return Math.max(
        MIN_DOCK_PANEL_HEIGHT,
        Math.min(
            MAX_DOCK_PANEL_HEIGHT,
            Math.floor(viewportHeight) - resourceTrayHeight - DOCK_VIEWPORT_GUTTER,
        ),
    );
}

export function calculateDockPanelHeight(
    startHeight: number,
    startY: number,
    currentY: number,
    maxHeight: number,
): number {
    if (![startHeight, startY, currentY, maxHeight].every(Number.isFinite)) {
        throw new RangeError("Dock resize values must be finite numbers.");
    }

    const boundedMaxHeight = Math.max(MIN_DOCK_PANEL_HEIGHT, maxHeight);
    const draggedHeight = startHeight + startY - currentY;
    return Math.max(
        MIN_DOCK_PANEL_HEIGHT,
        Math.min(boundedMaxHeight, Math.round(draggedHeight)),
    );
}
