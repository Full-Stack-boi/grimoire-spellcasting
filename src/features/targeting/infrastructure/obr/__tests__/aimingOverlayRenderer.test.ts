import { describe, it, expect, beforeEach, vi } from "vitest";
import {
    renderAimingOverlay,
    clearAimingOverlay,
    resetAimingOverlayState,
    AIMING_RANGE_CIRCLE_ID,
    AIMING_TETHER_LINE_ID,
    AIMING_DISTANCE_LABEL_ID,
    AIMING_TARGET_CELL_ID,
    AIMING_TARGET_GLOW_ID,
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
            strokeOpacity(val: number) { (this as any)._strokeOpacity = val; return this; },
            fillColor() { return this; },
            fillOpacity(val: number) { (this as any)._fillOpacity = val; return this; },
            visible(val: boolean) { (this as any)._visible = val; return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() {
                return {
                    id: (this as any)._id,
                    type: "SHAPE",
                    position: (this as any)._pos,
                    strokeOpacity: (this as any)._strokeOpacity,
                    fillOpacity: (this as any)._fillOpacity,
                    visible: (this as any)._visible !== undefined ? (this as any)._visible : true,
                };
            },
        }),
        buildLine: () => ({
            id(val: string) { (this as any)._id = val; return this; },
            startPosition(val: any) { (this as any)._start = val; return this; },
            endPosition(val: any) { (this as any)._end = val; return this; },
            strokeColor() { return this; },
            strokeWidth() { return this; },
            strokeOpacity() { return this; },
            strokeDash() { return this; },
            visible(val: boolean) { (this as any)._visible = val; return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() { return { id: (this as any)._id, type: "LINE", startPosition: (this as any)._start, endPosition: (this as any)._end, visible: (this as any)._visible !== undefined ? (this as any)._visible : true }; },
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
            visible(val: boolean) { (this as any)._visible = val; return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() { return { id: (this as any)._id, type: "LABEL", position: (this as any)._pos, plainText: (this as any)._text, visible: (this as any)._visible !== undefined ? (this as any)._visible : true }; },
        }),
        buildPath: () => ({
            id(val: string) { (this as any)._id = val; return this; },
            position(val: any) { (this as any)._pos = val; return this; },
            scale(val: any) { (this as any)._scale = val; return this; },
            rotation(val: number) { (this as any)._rot = val; return this; },
            commands(val: any[]) { (this as any)._commands = val; return this; },
            strokeColor(val: string) { (this as any)._strokeColor = val; return this; },
            strokeWidth(val: number) { (this as any)._strokeWidth = val; return this; },
            strokeOpacity(val: number) { (this as any)._strokeOpacity = val; return this; },
            fillColor(val: string) { (this as any)._fillColor = val; return this; },
            fillOpacity(val: number) { (this as any)._fillOpacity = val; return this; },
            visible(val: boolean) { (this as any)._visible = val; return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() {
                return {
                    id: (this as any)._id,
                    type: "PATH",
                    position: (this as any)._pos,
                    scale: (this as any)._scale,
                    rotation: (this as any)._rot,
                    commands: (this as any)._commands,
                    strokeColor: (this as any)._strokeColor,
                    strokeWidth: (this as any)._strokeWidth,
                    strokeOpacity: (this as any)._strokeOpacity,
                    fillColor: (this as any)._fillColor,
                    fillOpacity: (this as any)._fillOpacity,
                    visible: (this as any)._visible !== undefined ? (this as any)._visible : true,
                };
            },
        }),
        buildImage: (img: any, imgGrid: any) => ({
            id(val: string) { (this as any)._id = val; return this; },
            position(val: any) { (this as any)._pos = val; return this; },
            scale(val: any) { (this as any)._scale = val; return this; },
            rotation(val: number) { (this as any)._rot = val; return this; },
            visible(val: boolean) { (this as any)._visible = val; return this; },
            disableHit() { return this; },
            locked() { return this; },
            layer() { return this; },
            build() {
                return {
                    id: (this as any)._id,
                    type: "IMAGE",
                    position: (this as any)._pos,
                    scale: (this as any)._scale,
                    rotation: (this as any)._rot,
                    image: img,
                    grid: imgGrid,
                    visible: (this as any)._visible !== undefined ? (this as any)._visible : true,
                };
            },
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
        expect(mockLocalItems.length).toBe(5);

        // Clear
        await clearAimingOverlay();
        expect(mockDeleteItems).toHaveBeenCalledWith([
            AIMING_RANGE_CIRCLE_ID,
            AIMING_TETHER_LINE_ID,
            AIMING_DISTANCE_LABEL_ID,
            AIMING_TARGET_CELL_ID,
            AIMING_TARGET_GLOW_ID,
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

    it("displays (Normal - Adv & Disadv Cancelled) when both Advantage and Disadvantage are active", async () => {
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            hasAdvantage: true,
            hasDisadvantage: true,
        });

        const labelItem = mockLocalItems.find(i => i.id === AIMING_DISTANCE_LABEL_ID);
        expect(labelItem).toBeDefined();
        expect(labelItem.plainText).toContain("(Normal - Adv & Disadv Cancelled)");
        expect(labelItem.plainText).not.toContain("🎯");
    });

    it("displays (Advantage) when only Advantage is active", async () => {
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            hasAdvantage: true,
            hasDisadvantage: false,
        });

        const labelItem = mockLocalItems.find(i => i.id === AIMING_DISTANCE_LABEL_ID);
        expect(labelItem).toBeDefined();
        expect(labelItem.plainText).toContain("(Advantage)");
        expect(labelItem.plainText).not.toContain("🎯");
    });

    it("displays (Disadvantage) when only Disadvantage is active", async () => {
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            hasAdvantage: false,
            hasDisadvantage: true,
            disadvantageReason: "Close Combat (Foe within 5 ft)",
        });

        const labelItem = mockLocalItems.find(i => i.id === AIMING_DISTANCE_LABEL_ID);
        expect(labelItem).toBeDefined();
        expect(labelItem.plainText).toContain("Disadvantage");
        expect(labelItem.plainText).toContain("Close Combat (Foe within 5 ft)");
        expect(labelItem.plainText).not.toContain("🎯");
    });

    it("toggles target cell shape visibility, hiding cell shape when targeting creature", async () => {
        const dummyMonster = { id: "monster-1", position: { x: 300, y: 300 } } as any;

        // 1. With targetItem: targetCellShape is hidden (visible: false)
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            targetItem: dummyMonster,
        });

        const cellItemWithTarget = mockLocalItems.find(i => i.id === AIMING_TARGET_CELL_ID);
        expect(cellItemWithTarget).toBeDefined();
        expect(cellItemWithTarget.visible).toBe(false);

        // 2. Clear and re-render without targetItem (ground target): targetCellShape should be visible
        await clearAimingOverlay();
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            targetItem: undefined,
        });

        const cellItemGround = mockLocalItems.find(i => i.id === AIMING_TARGET_CELL_ID);
        expect(cellItemGround).toBeDefined();
        expect(cellItemGround.visible).toBe(true);
        expect(cellItemGround.strokeOpacity).toBe(0.7);
        expect(cellItemGround.fillOpacity).toBe(0.12);
    });

    it("mounts AIMING_TARGET_GLOW_ID when aiming at an image-based creature token and hides on ground without deleting", async () => {
        const dummyFiend = {
            id: "fiend-1",
            position: { x: 300, y: 300 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            image: {
                url: "https://images.owlbear.rodeo/default-tokens/d20.png",
                width: 200,
                height: 200,
                mime: "image/png",
            },
            grid: {
                dpi: 150,
                offset: { x: 100, y: 100 },
            },
        } as any;

        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            targetItem: dummyFiend,
        });

        const glowItem = mockLocalItems.find(i => i.id === AIMING_TARGET_GLOW_ID);
        expect(glowItem).toBeDefined();
        expect(glowItem.visible).toBe(true);
        expect(glowItem.type).toBe("PATH");
        expect(glowItem.commands).toBeDefined();
        expect(glowItem.commands.length).toBeGreaterThan(0);
        expect(glowItem.strokeWidth).toBe(4);
        expect(glowItem.strokeOpacity).toBe(0.9);
        expect(glowItem.fillOpacity).toBe(0.12);

        // Move to ground: glow item stays mounted but visible is toggled to false without calling deleteItems!
        mockDeleteItems.mockClear();
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 450, y: 450 },
            maxRangeFeet: 60,
            grid,
            targetItem: undefined,
        });

        expect(mockDeleteItems).not.toHaveBeenCalled();
        const updatedGlow = mockLocalItems.find(i => i.id === AIMING_TARGET_GLOW_ID);
        expect(updatedGlow).toBeDefined();
        expect(updatedGlow.visible).toBe(false);
        expect(updatedGlow.type).toBe("PATH");
    });

    it("guarantees AIMING_TARGET_GLOW_ID is ALWAYS of type PATH (never SHAPE)", async () => {
        // Ground target
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            targetItem: undefined,
        });

        const groundGlow = mockLocalItems.find(i => i.id === AIMING_TARGET_GLOW_ID);
        expect(groundGlow).toBeDefined();
        expect(groundGlow.type).toBe("PATH");

        // Non-image creature token (fallback vector shape)
        const nonImageCreature = { id: "non-image-1", position: { x: 300, y: 300 } } as any;
        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            targetItem: nonImageCreature,
        });

        const nonImageGlow = mockLocalItems.find(i => i.id === AIMING_TARGET_GLOW_ID);
        expect(nonImageGlow).toBeDefined();
        expect(nonImageGlow.type).toBe("PATH");
    });

    it("safely recovers and deletes stale items with type mismatch from previous sessions", async () => {
        // Simulate a stale SHAPE item lingering in local items from an older session
        mockLocalItems.push({
            id: AIMING_TARGET_GLOW_ID,
            type: "SHAPE",
            shapeType: "CIRCLE",
        });

        await renderAimingOverlay({
            casterPos: { x: 150, y: 150 },
            cursorPos: { x: 300, y: 300 },
            maxRangeFeet: 60,
            grid,
            targetItem: undefined,
        });

        // Stale SHAPE item should have been deleted and replaced with a PATH item
        expect(mockDeleteItems).toHaveBeenCalledWith([AIMING_TARGET_GLOW_ID]);
        const currentGlow = mockLocalItems.find(i => i.id === AIMING_TARGET_GLOW_ID);
        expect(currentGlow).toBeDefined();
        expect(currentGlow.type).toBe("PATH");
    });

    it("verifies zero emojis in aimingOverlayRenderer.ts", async () => {
        const fs = await import("fs");
        const path = await import("path");
        const sourceCode = fs.readFileSync(
            path.resolve(__dirname, "../aimingOverlayRenderer.ts"),
            "utf-8"
        );
        expect(sourceCode).not.toContain("🎯");
        expect(sourceCode).not.toContain("🪄");
        expect(sourceCode).not.toContain("⚔️");
    });
});
