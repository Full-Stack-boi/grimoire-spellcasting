import OBR, { Item, Vector2, buildLabel, buildLine, buildPath, buildShape } from "@owlbear-rodeo/sdk";
import { GridInfo, feetToPixels, isWithinTokenRange, snapToCellCenter } from "../../domain/targetingGeometry";
import { VisionCheckResult } from "../../domain/vision";
import { APP_KEY } from "../../../../config";
import { extractImageContourCommands } from "./silhouetteContour";

export const AIMING_RANGE_CIRCLE_ID = `${APP_KEY}/aiming-range-circle`;
export const AIMING_TETHER_LINE_ID = `${APP_KEY}/aiming-tether-line`;
export const AIMING_DISTANCE_LABEL_ID = `${APP_KEY}/aiming-distance-label`;
export const AIMING_TARGET_CELL_ID = `${APP_KEY}/aiming-target-cell`;
export const AIMING_TARGET_GLOW_ID = `${APP_KEY}/aiming-target-glow`;


export interface AimingOverlayRenderOptions {
    casterPos: Vector2;
    cursorPos: Vector2;
    maxRangeFeet: number;
    grid: GridInfo;
    casterItem?: Item;
    targetItem?: Item;
    rangeMultiplier?: number;
    colorBlindMode?: boolean;
    visionCheck?: VisionCheckResult;
    isWeapon?: boolean;
    canAimWithoutSight?: boolean;
    hasAdvantage?: boolean;
    hasDisadvantage?: boolean;
    advantageReason?: string;
    disadvantageReason?: string;
}

export interface AimingOverlayRenderResult {
    withinRange: boolean;
    currentDistanceFeet: number;
    maxRangeFeet: number;
    canSee: boolean;
    aimState: "valid" | "advantage" | "disadvantage" | "invalid_range" | "invalid_vision";
    reason?: string;
}

let isAimingOverlayMounted = false;
let renderToken = 0;

export function resetAimingOverlayState(): void {
    isAimingOverlayMounted = false;
    renderToken = 0;
}

/**
 * Renders or updates the BG3-style range circle, tether line, and distance pill HUD.
 * All items are rendered on OBR.scene.local (private to this player's screen).
 */
export async function renderAimingOverlay(state: AimingOverlayRenderOptions): Promise<AimingOverlayRenderResult> {
    const currentToken = ++renderToken;
    const {
        casterPos,
        cursorPos,
        maxRangeFeet,
        grid,
        rangeMultiplier = 1,
        colorBlindMode = false,
        visionCheck,
        isWeapon = false,
        canAimWithoutSight = false,
        hasAdvantage = false,
        hasDisadvantage = false,
        advantageReason,
        disadvantageReason
    } = state;

    const rangeCheck = isWithinTokenRange(
        state.casterItem || casterPos,
        state.targetItem || cursorPos,
        maxRangeFeet,
        grid,
        rangeMultiplier
    );
    const canSee = visionCheck ? visionCheck.canSee : true;
    const canAimUnseen = isWeapon || canAimWithoutSight;

    type AimState = "valid" | "advantage" | "disadvantage" | "invalid_range" | "invalid_vision";
    let aimState: AimState = "valid";

    const effectiveBoth = hasAdvantage && hasDisadvantage;
    const effectiveAdvantage = hasAdvantage && !hasDisadvantage;
    const effectiveDisadvantage = hasDisadvantage && !hasAdvantage;

    if (!rangeCheck.withinRange) {
        aimState = "invalid_range";
    } else if (!canSee && !canAimUnseen && !hasDisadvantage && !effectiveBoth) {
        aimState = "invalid_vision";
    } else if (effectiveBoth) {
        aimState = "valid";
    } else if (effectiveDisadvantage || (!canSee && (canAimUnseen || hasDisadvantage))) {
        aimState = "disadvantage";
    } else if (effectiveAdvantage) {
        aimState = "advantage";
    } else {
        aimState = "valid";
    }

    const isValidAction = aimState === "valid" || aimState === "advantage" || aimState === "disadvantage";
    const rangePixels = feetToPixels(rangeCheck.effectiveMaxRangeFeet, grid.dpi, grid.scaleMultiplier);

    // Color definitions (Tactical VTT theme, no emojis)
    const cyanColor = colorBlindMode ? "#38bdf8" : "#38bdf8";
    const emeraldColor = colorBlindMode ? "#10b981" : "#10b981";
    const amberColor = colorBlindMode ? "#eab308" : "#f59e0b";
    const redColor = colorBlindMode ? "#ea580c" : "#ef4444";

    let strokeColor = cyanColor;
    let textColor = "#ffffff";
    let bgColor = "#0f172a";
    let textLabel = `${rangeCheck.currentDistanceFeet} ft / ${rangeCheck.effectiveMaxRangeFeet} ft`;

    if (aimState === "advantage") {
        strokeColor = emeraldColor;
        textColor = "#a7f3d0";
        bgColor = "#064e3b";
        let reason = advantageReason || "Advantage";
        if (!reason.toLowerCase().includes("advantage")) {
            reason = `Advantage - ${reason}`;
        }
        textLabel = `${rangeCheck.currentDistanceFeet} ft / ${rangeCheck.effectiveMaxRangeFeet} ft (${reason})`;
    } else if (aimState === "disadvantage") {
        strokeColor = amberColor;
        textColor = "#fde68a";
        bgColor = "#1c1917";
        let reason = disadvantageReason || (!canSee ? "Disadvantage - Unseen in Darkness" : "Disadvantage");
        if (!reason.toLowerCase().includes("disadvantage")) {
            reason = `Disadvantage - ${reason}`;
        }
        textLabel = `${rangeCheck.currentDistanceFeet} ft / ${rangeCheck.effectiveMaxRangeFeet} ft (${reason})`;
    } else if (aimState === "valid" && effectiveBoth) {
        strokeColor = cyanColor;
        textColor = "#ffffff";
        bgColor = "#0f172a";
        textLabel = `${rangeCheck.currentDistanceFeet} ft / ${rangeCheck.effectiveMaxRangeFeet} ft (Normal - Adv & Disadv Cancelled)`;
    } else if (aimState === "invalid_range") {
        strokeColor = redColor;
        textColor = "#fca5a5";
        bgColor = "#450a0a";
        textLabel = `${rangeCheck.currentDistanceFeet} ft / ${rangeCheck.effectiveMaxRangeFeet} ft (Out of range)`;
    } else if (aimState === "invalid_vision") {
        strokeColor = redColor;
        textColor = "#fca5a5";
        bgColor = "#450a0a";
        textLabel = `${rangeCheck.currentDistanceFeet} ft / ${rangeCheck.effectiveMaxRangeFeet} ft (${visionCheck?.reason || "Requires sight - Blocked by Darkness"})`;
    }

    const strokeDash = isValidAction ? [] : [14, 10];
    const strokeWidth = isValidAction ? 4 : 3;
    const strokeOpacity = isValidAction ? 0.9 : 0.75;

    // 1. Range Circle (centered on caster)
    const rangeCircle = buildShape()
        .id(AIMING_RANGE_CIRCLE_ID)
        .shapeType("CIRCLE")
        .position(casterPos)
        .width(rangePixels * 2)
        .height(rangePixels * 2)
        .strokeColor(strokeColor)
        .strokeWidth(2)
        .strokeOpacity(0.4)
        .fillColor(strokeColor)
        .fillOpacity(0.04)
        .disableHit(true)
        .locked(true)
        .layer("ATTACHMENT")
        .build();

    // 2. Tether Line (from caster to cursor)
    const safeCasterPos: Vector2 = { x: casterPos?.x ?? 0, y: casterPos?.y ?? 0 };
    const safeCursorPos: Vector2 = { x: cursorPos?.x ?? 0, y: cursorPos?.y ?? 0 };
    const tetherLine = buildLine()
        .id(AIMING_TETHER_LINE_ID)
        .startPosition(safeCasterPos)
        .endPosition(safeCursorPos)
        .strokeColor(strokeColor)
        .strokeWidth(strokeWidth)
        .strokeOpacity(strokeOpacity)
        .strokeDash(strokeDash)
        .disableHit(true)
        .locked(true)
        .layer("ATTACHMENT")
        .build();

    // 3. Distance Pill Label (near cursor)
    const labelPos: Vector2 = {
        x: cursorPos.x + 20,
        y: cursorPos.y - 30
    };

    const distanceLabel = buildLabel()
        .id(AIMING_DISTANCE_LABEL_ID)
        .position(labelPos)
        .plainText(textLabel)
        .fontSize(14)
        .padding(8)
        .cornerRadius(6)
        .fillColor(textColor)
        .backgroundColor(bgColor)
        .backgroundOpacity(0.9)
        .disableHit(true)
        .locked(true)
        .layer("ATTACHMENT")
        .build();

    // 4. Target Cell Highlight (subtle square grid cell indicator on ground when NOT targeting a creature)
    const isTargetingCreature = Boolean(state.targetItem);
    let targetCellShape: Item | null = null;

    if (!isTargetingCreature) {
        const targetCellCenter = snapToCellCenter(cursorPos, grid);
        targetCellShape = buildShape()
            .id(AIMING_TARGET_CELL_ID)
            .shapeType("RECTANGLE")
            .position({ x: targetCellCenter.x - grid.dpi / 2, y: targetCellCenter.y - grid.dpi / 2 })
            .width(grid.dpi)
            .height(grid.dpi)
            .strokeColor(strokeColor)
            .strokeWidth(2)
            .strokeOpacity(0.7)
            .fillColor(strokeColor)
            .fillOpacity(0.12)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
    } else {
        OBR.scene.local.deleteItems([AIMING_TARGET_CELL_ID]).catch(() => {});
    }

    // 5. Target Creature Contour Silhouette Glow (local vector path contour tracing token image)
    let targetGlowItem: Item | null = null;
    if (state.targetItem) {
        const item = state.targetItem as any;
        if (item.image?.url && item.image.width && item.image.height) {
            const itemGrid = item.grid || { dpi: grid.dpi, offset: { x: item.image.width / 2, y: item.image.height / 2 } };
            const itemGridDpi = itemGrid.dpi || grid.dpi || 150;
            const sceneDpi = grid.dpi || 150;
            const sceneScale = sceneDpi / itemGridDpi;

            const targetWidth = item.image.width * sceneScale;
            const targetHeight = item.image.height * sceneScale;
            const targetOffset = {
                x: itemGrid.offset.x * sceneScale,
                y: itemGrid.offset.y * sceneScale
            };

            const commands = await extractImageContourCommands(
                item.image.url,
                targetWidth,
                targetHeight,
                targetOffset
            );
            if (currentToken !== renderToken) return {
                withinRange: rangeCheck.withinRange,
                currentDistanceFeet: rangeCheck.currentDistanceFeet,
                maxRangeFeet: rangeCheck.effectiveMaxRangeFeet,
                canSee,
                aimState,
                reason: visionCheck?.reason
            };

            targetGlowItem = buildPath()
                .id(AIMING_TARGET_GLOW_ID)
                .position(item.position)
                .scale(item.scale || { x: 1, y: 1 })
                .rotation(item.rotation || 0)
                .commands(commands)
                .strokeColor(strokeColor)
                .strokeWidth(4)
                .strokeOpacity(0.9)
                .fillColor(strokeColor)
                .fillOpacity(0.12)
                .disableHit(true)
                .locked(true)
                .layer("ATTACHMENT")
                .build();
        } else {
            // Fallback for non-image tokens (vector shapes)
            targetGlowItem = buildShape()
                .id(AIMING_TARGET_GLOW_ID)
                .shapeType("CIRCLE")
                .position(item.position)
                .width(grid.dpi)
                .height(grid.dpi)
                .strokeColor(strokeColor)
                .strokeWidth(4)
                .strokeOpacity(0.85)
                .fillColor(strokeColor)
                .fillOpacity(0.15)
                .disableHit(true)
                .locked(true)
                .layer("ATTACHMENT")
                .build();
        }
    } else {
        // Not targeting a creature - ensure any existing glow item is cleaned up
        OBR.scene.local.deleteItems([AIMING_TARGET_GLOW_ID]).catch(() => {});
    }

    const result: AimingOverlayRenderResult = {
        withinRange: rangeCheck.withinRange,
        currentDistanceFeet: rangeCheck.currentDistanceFeet,
        maxRangeFeet: rangeCheck.effectiveMaxRangeFeet,
        canSee,
        aimState,
        reason: visionCheck?.reason
    };

    const candidates: Item[] = [rangeCircle, tetherLine, distanceLabel];
    if (targetCellShape) {
        candidates.push(targetCellShape);
    }
    if (targetGlowItem) {
        candidates.push(targetGlowItem);
    }

    if (!isAimingOverlayMounted) {
        const localItems = await OBR.scene.local.getItems();
        if (currentToken !== renderToken) return result;

        const existingIds = new Set(localItems.map(item => item.id));
        const itemsToUpdate: Item[] = [];
        const itemsToAdd: Item[] = [];

        for (const item of candidates) {
            if (existingIds.has(item.id)) {
                itemsToUpdate.push(item);
            } else {
                itemsToAdd.push(item);
            }
        }

        if (itemsToAdd.length > 0) {
            await OBR.scene.local.addItems(itemsToAdd);
            if (currentToken !== renderToken) return result;
        }
        if (itemsToUpdate.length > 0) {
            await OBR.scene.local.updateItems(
                itemsToUpdate.map(i => i.id),
                items => {
                    for (let i = 0; i < items.length; i++) {
                        const newItem = itemsToUpdate.find(u => u.id === items[i].id);
                        if (newItem) {
                            Object.assign(items[i], newItem);
                        }
                    }
                }
            );
            if (currentToken !== renderToken) return result;
        }
        isAimingOverlayMounted = true;
    } else {
        let missingItemsCount = 0;
        await OBR.scene.local.updateItems(
            candidates.map(i => i.id),
            items => {
                if (items.length < candidates.length) {
                    isAimingOverlayMounted = false;
                    missingItemsCount = candidates.length - items.length;
                }
                for (let i = 0; i < items.length; i++) {
                    const newItem = candidates.find(u => u.id === items[i].id);
                    if (newItem) {
                        Object.assign(items[i], newItem);
                    }
                }
            }
        );
        if (missingItemsCount > 0) {
            const localItems = await OBR.scene.local.getItems();
            if (currentToken !== renderToken) return result;
            const existingIds = new Set(localItems.map(item => item.id));
            const itemsToAdd = candidates.filter(c => !existingIds.has(c.id));
            if (itemsToAdd.length > 0) {
                await OBR.scene.local.addItems(itemsToAdd);
                if (currentToken !== renderToken) return result;
            }
            isAimingOverlayMounted = true;
        }
    }

    return result;
}

/**
 * Clears the aiming tether, range circle, and distance label from the local scene.
 */
export async function clearAimingOverlay(): Promise<void> {
    renderToken++;
    isAimingOverlayMounted = false;
    const ids = [
        AIMING_RANGE_CIRCLE_ID,
        AIMING_TETHER_LINE_ID,
        AIMING_DISTANCE_LABEL_ID,
        AIMING_TARGET_CELL_ID,
        AIMING_TARGET_GLOW_ID,
    ];
    try {
        await OBR.scene.local.deleteItems(ids);
    } catch {
        // Safe to ignore if already deleted
    }
}

