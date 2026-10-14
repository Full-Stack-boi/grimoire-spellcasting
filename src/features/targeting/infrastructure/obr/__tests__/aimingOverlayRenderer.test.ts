import { describe, it, expect, beforeEach, vi } from "vitest";
import {
    renderAimingOverlay,
    clearAimingOverlay,
    resetAimingOverlayState,
    AIMING_RANGE_CIRCLE_ID,
    AIMING_TETHER_LINE_ID,
    AIMING_DISTANCE_LABEL_ID,
    AIMING_TARGET_CELL_ID,
} from "../aimingOverlayRenderer";
import { GridInfo } from "../../../domain/targetingGeometry";

// Mock OBR scene local
let mockLocalItems: any[] = [];
const mockGetItems = vi.fn(async () => mockLocalItems);
const mockAddItems = vi.fn(async (items: any[]) => {
    mockLocalItems.push(...items);
});
const mockUpdateItems = vi.fn(async (ids: string[], updateFn: (items: any[]) => void) => {
    const targets = mockLocalItems.filter(i => ids.includes(i.id));
    updateFn(targets);
});
const mockDeleteItems = vi.fn(async (ids: string[]) => {
    mockLocalItems = mockLocalItems.filter(i => !ids.includes(i.id));
});

vi.mock("@owlbear-rodeo/sdk", () => {
    return {
        default: {
            scene: {
                local: {
                    getItems: () => mockGetItems(),
                    addItems: (items: any[]) => mockAddItems(items),
                    updateItems: (ids: string[], fn: any) => mockUpdateItems(ids, fn),
                    deleteItems: (ids: string[]) => mockDeleteItems(ids),
                },
            },
        },
        buildShape: () => ({
            id(val: string) { (this as any)._id = val; return this; },
            shapeType(val: string) { (this as any)._shapeType = val; return this; },
            position(val: any) { (this as any)._pos = val; return this; },
            width(val: number) { (this as any)._w = val; return this; },
            height(val: number) { (this as any)._h = val; return this; },
            strokeColor() { return this; },
            strokeWidth() { return this; },
            strokeOpacity() { return this; },
            fillColor() { return this; },
            fillOpacity() { return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() { return { id: (this as any)._id, type: "SHAPE", position: (this as any)._pos }; },
        }),
        buildLine: () => ({
            id(val: string) { (this as any)._id = val; return this; },
            startPosition(val: any) { (this as any)._start = val; return this; },
            endPosition(val: any) { (this as any)._end = val; return this; },
            strokeColor() { return this; },
            strokeWidth() { return this; },
            strokeOpacity() { return this; },
            strokeDash() { return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() { return { id: (this as any)._id, type: "LINE", startPosition: (this as any)._start, endPosition: (this as any)._end }; },
        }),
        buildLabel: () => ({
            id(val: string) { (this as any)._id = val; return this; },
            position(val: any) { (this as any)._pos = val; return this; },
            plainText(val: string) { (this as any)._text = val; return this; },
            fontSize() { return this; },
            padding() { return this; },
            cornerRadius() { return this; },
            fillColor() { return this; },
            backgroundColor() { return this; },
            backgroundOpacity() { return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() { return { id: (this as any)._id, type: "LABEL", position: (this as any)._pos, plainText: (this as any)._text }; },
        }),
    };
});

describe("aimingOverlayRenderer - Flicker-free Mount & Update Lifecycle", () => {
    const grid: GridInfo = {
        dpi: 150,
        scaleMultiplier: 5,
        cellCenterOffset: { x: 75, y: 75 },
    };

    beforeEach(() => {
        resetAimingOverlayState();
        mockLocalItems = [];
        mockGetItems.mockClear();
        mockAddItems.mockClear();
        mockUpdateItems.mockClear();
        mockDeleteItems.mockClear();
    });

    it("mounts items via addItems on the first render call", async () => {
        const result = await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
        });

        expect(result.withinRange).toBe(true);
        expect(mockGetItems).toHaveBeenCalledTimes(1);
        expect(mockAddItems).toHaveBeenCalledTimes(1);
        expect(mockLocalItems.map(i => i.id)).toEqual(
            expect.arrayContaining([
                AIMING_RANGE_CIRCLE_ID,
                AIMING_TETHER_LINE_ID,
                AIMING_DISTANCE_LABEL_ID,
                AIMING_TARGET_CELL_ID,
            ])
        );
    });

    it("updates mounted items directly without calling getItems on subsequent moves", async () => {
        // First frame: mount
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
        });
        expect(mockGetItems).toHaveBeenCalledTimes(1);
        expect(mockAddItems).toHaveBeenCalledTimes(1);

        // Second frame: move
        mockGetItems.mockClear();
        mockAddItems.mockClear();
        mockUpdateItems.mockClear();

        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 450, y: 450 },
            maxRangeFeet: 60,
            grid,
        });

        // ZERO getItems calls, directly updates in-memory items!
        expect(mockGetItems).toHaveBeenCalledTimes(0);
        expect(mockAddItems).toHaveBeenCalledTimes(0);
        expect(mockUpdateItems).toHaveBeenCalledTimes(1);
    });

    it("resets mount state and deletes items cleanly on clearAimingOverlay", async () => {
        // Mount
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
        });
        expect(mockLocalItems.length).toBe(4);

        // Clear
        await clearAimingOverlay();
        expect(mockDeleteItems).toHaveBeenCalledWith([
            AIMING_RANGE_CIRCLE_ID,
            AIMING_TETHER_LINE_ID,
            AIMING_DISTANCE_LABEL_ID,
            AIMING_TARGET_CELL_ID,
        ]);
        expect(mockLocalItems.length).toBe(0);

        // Subsequent render should remount cleanly without error
        mockGetItems.mockClear();
        mockAddItems.mockClear();

        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
        });
        expect(mockGetItems).toHaveBeenCalledTimes(1);
        expect(mockAddItems).toHaveBeenCalledTimes(1);
    });
});
