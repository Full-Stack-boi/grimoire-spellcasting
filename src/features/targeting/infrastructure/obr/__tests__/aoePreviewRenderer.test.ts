import { describe, it, expect, beforeEach, vi } from "vitest";
import {
    renderAoePreview,
    clearAoePreview,
    resetAoePreviewState,
    AOE_OUTLINE_ID,
    AOE_OUTLINE_LABEL_ID,
} from "../aoePreviewRenderer";
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
                items: {
                    getItems: vi.fn(async () => []),
                },
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
        buildCurve: () => ({
            id(val: string) { (this as any)._id = val; return this; },
            points(val: any) { (this as any)._pts = val; return this; },
            closed() { return this; },
            tension() { return this; },
            strokeColor() { return this; },
            strokeWidth() { return this; },
            strokeOpacity() { return this; },
            fillColor() { return this; },
            fillOpacity() { return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() { return { id: (this as any)._id, type: "CURVE", points: (this as any)._pts }; },
        }),
        buildLabel: () => ({
            id(val: string) { (this as any)._id = val; return this; },
            position(val: any) { (this as any)._pos = val; return this; },
            plainText(val: string) { (this as any)._text = val; return this; },
            fontSize() { return this; },
            fontWeight() { return this; },
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

describe("aoePreviewRenderer - Optimized Diffing & Lifecycle", () => {
    const grid: GridInfo = {
        dpi: 150,
        scaleMultiplier: 5,
        cellCenterOffset: { x: 75, y: 75 },
    };

    beforeEach(() => {
        resetAoePreviewState();
        mockLocalItems = [];
        mockGetItems.mockClear();
        mockAddItems.mockClear();
        mockUpdateItems.mockClear();
        mockDeleteItems.mockClear();
    });

    it("scans existing items once on first render and populates preview", async () => {
        const result = await renderAoePreview({
            template: {
                shape: "Sphere",
                origin: { x: 150, y: 150 },
                cursor: { x: 300, y: 300 },
                sizeFeet: 20,
            },
            grid,
        });

        expect(result.affectedCellCount).toBeGreaterThan(0);
        expect(mockGetItems).toHaveBeenCalledTimes(1);
        expect(mockAddItems).toHaveBeenCalledTimes(1);
        expect(mockLocalItems.some(i => i.id === AOE_OUTLINE_ID)).toBe(true);
        expect(mockLocalItems.some(i => i.id === AOE_OUTLINE_LABEL_ID)).toBe(true);
    });

    it("does not query getItems on subsequent moves and performs clean diffing", async () => {
        // Frame 1
        await renderAoePreview({
            template: {
                shape: "Sphere",
                origin: { x: 150, y: 150 },
                cursor: { x: 300, y: 300 },
                sizeFeet: 20,
            },
            grid,
        });
        expect(mockGetItems).toHaveBeenCalledTimes(1);

        // Frame 2: shift position
        mockGetItems.mockClear();
        mockAddItems.mockClear();
        mockUpdateItems.mockClear();
        mockDeleteItems.mockClear();

        await renderAoePreview({
            template: {
                shape: "Sphere",
                origin: { x: 150, y: 150 },
                cursor: { x: 450, y: 450 },
                sizeFeet: 20,
            },
            grid,
        });

        // getItems is NOT called again on subsequent moves!
        expect(mockGetItems).toHaveBeenCalledTimes(0);
        // Direct update/add/delete diffing
        expect(mockUpdateItems.mock.calls.length + mockAddItems.mock.calls.length).toBeGreaterThan(0);
    });

    it("clears all known items directly without getItems when clearing", async () => {
        await renderAoePreview({
            template: {
                shape: "Sphere",
                origin: { x: 150, y: 150 },
                cursor: { x: 300, y: 300 },
                sizeFeet: 20,
            },
            grid,
        });
        expect(mockLocalItems.length).toBeGreaterThan(0);

        mockGetItems.mockClear();
        mockDeleteItems.mockClear();

        await clearAoePreview();
        // Since items were known in memory, deleteItems was called directly without querying getItems!
        expect(mockGetItems).toHaveBeenCalledTimes(0);
        expect(mockDeleteItems).toHaveBeenCalledTimes(1);
        expect(mockLocalItems.length).toBe(0);
    });
});
