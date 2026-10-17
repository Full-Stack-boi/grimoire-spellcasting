import OBR, { Item, Shape, Vector2, buildCurve, buildLabel, buildShape } from "@owlbear-rodeo/sdk";
import {
    AoETemplate,
    GridInfo,
    feetToPixels,
    getAffectedGridCells,
    isTokenInAffectedCells,
    normalize,
    snapAoECenter,
    snapToCellCenter
} from "../../domain/targetingGeometry";
import { APP_KEY } from "../../../../config";

export const AOE_GRID_PREFIX = `${APP_KEY}/aoe-grid-cell-`;
export const AOE_OUTLINE_ID = `${APP_KEY}/aoe-outline`;
export const AOE_OUTLINE_LABEL_ID = `${APP_KEY}/aoe-outline-label`;
export const AOE_TOKEN_HIGHLIGHT_PREFIX = `${APP_KEY}/aoe-token-hl-`;

export interface AoePreviewRenderOptions {
    template: AoETemplate;
    grid: GridInfo;
    casterId?: string;
    themeColor?: string; // default orange (#f97316)
    strokeColor?: string;
    sceneItems?: Item[];
    hiddenTokenIds?: Set<string>;
}

export interface AoePreviewRenderResult {
    affectedCellCount: number;
    affectedTokenIds: string[];
}

/**
 * Builds the geometric wireframe overlay items (red outline polygon/circle and distance text label),
 * matching standard VTT spell templates (e.g. 5e 53.13° cone with apex at caster edge).
 */
function buildAoEGeometricOverlay(template: AoETemplate, grid: GridInfo): Item[] {
    const items: Item[] = [];
    const sizePixels = feetToPixels(template.sizeFeet, grid.dpi, grid.scaleMultiplier);

    if (template.shape === "Cone") {
        const casterCenter = snapToCellCenter(template.origin, grid);
        const dir = normalize({ x: template.cursor.x - casterCenter.x, y: template.cursor.y - casterCenter.y });
        if (dir.x === 0 && dir.y === 0) return items;

        const coneOrigin: Vector2 = {
            x: casterCenter.x + dir.x * (grid.dpi * 0.5),
            y: casterCenter.y + dir.y * (grid.dpi * 0.5)
        };

        const angle = Math.atan2(dir.y, dir.x);
        const halfAngleRad = ((template.coneAngleDeg ?? 53.13) / 2) * (Math.PI / 180);

        const pLeft: Vector2 = {
            x: coneOrigin.x + Math.cos(angle - halfAngleRad) * sizePixels,
            y: coneOrigin.y + Math.sin(angle - halfAngleRad) * sizePixels
        };
        const pRight: Vector2 = {
            x: coneOrigin.x + Math.cos(angle + halfAngleRad) * sizePixels,
            y: coneOrigin.y + Math.sin(angle + halfAngleRad) * sizePixels
        };

        // Red triangle cone outline (apex -> left -> right -> apex)
        const triangle = buildCurve()
            .id(AOE_OUTLINE_ID)
            .points([coneOrigin, pLeft, pRight])
            .closed(true)
            .tension(0)
            .strokeColor("#ef4444")
            .strokeWidth(3)
            .strokeOpacity(0.9)
            .fillColor("#ef4444")
            .fillOpacity(0.08)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        items.push(triangle);

        // Distance text label centered inside the cone
        const labelPos: Vector2 = {
            x: coneOrigin.x + Math.cos(angle) * (sizePixels * 0.45),
            y: coneOrigin.y + Math.sin(angle) * (sizePixels * 0.45)
        };

        const label = buildLabel()
            .id(AOE_OUTLINE_LABEL_ID)
            .position(labelPos)
            .plainText(`${template.sizeFeet}ft`)
            .fontSize(16)
            .fontWeight(700)
            .padding(6)
            .cornerRadius(6)
            .fillColor("#ffffff")
            .backgroundColor("#0f172a")
            .backgroundOpacity(0.85)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        items.push(label);
    } else if (template.shape === "Sphere") {
        const effectiveCursor = snapAoECenter(template.cursor, template.shape, template.sizeFeet, grid);
        const circle = buildShape()
            .id(AOE_OUTLINE_ID)
            .shapeType("CIRCLE")
            .position(effectiveCursor)
            .width(sizePixels * 2)
            .height(sizePixels * 2)
            .strokeColor("#ef4444")
            .strokeWidth(3)
            .strokeOpacity(0.9)
            .fillColor("#ef4444")
            .fillOpacity(0.08)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        items.push(circle);

        const label = buildLabel()
            .id(AOE_OUTLINE_LABEL_ID)
            .position({ x: effectiveCursor.x, y: effectiveCursor.y - sizePixels - 20 })
            .plainText(`${template.sizeFeet}ft radius`)
            .fontSize(16)
            .fontWeight(700)
            .padding(6)
            .cornerRadius(6)
            .fillColor("#ffffff")
            .backgroundColor("#0f172a")
            .backgroundOpacity(0.85)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        items.push(label);
    } else if (template.shape === "Cube") {
        const effectiveCursor = snapAoECenter(template.cursor, template.shape, template.sizeFeet, grid);
        const square = buildShape()
            .id(AOE_OUTLINE_ID)
            .shapeType("RECTANGLE")
            .position({
                x: effectiveCursor.x - sizePixels / 2,
                y: effectiveCursor.y - sizePixels / 2
            })
            .width(sizePixels)
            .height(sizePixels)
            .strokeColor("#ef4444")
            .strokeWidth(3)
            .strokeOpacity(0.9)
            .fillColor("#ef4444")
            .fillOpacity(0.08)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        items.push(square);

        const label = buildLabel()
            .id(AOE_OUTLINE_LABEL_ID)
            .position({ x: effectiveCursor.x, y: effectiveCursor.y - sizePixels / 2 - 20 })
            .plainText(`${template.sizeFeet}ft cube`)
            .fontSize(16)
            .fontWeight(700)
            .padding(6)
            .cornerRadius(6)
            .fillColor("#ffffff")
            .backgroundColor("#0f172a")
            .backgroundOpacity(0.85)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        items.push(label);
    } else if (template.shape === "Line") {
        const casterCenter = snapToCellCenter(template.origin, grid);
        const dir = normalize({ x: template.cursor.x - casterCenter.x, y: template.cursor.y - casterCenter.y });
        if (dir.x === 0 && dir.y === 0) return items;

        const perp = { x: -dir.y, y: dir.x };
        const widthPixels = feetToPixels(template.widthFeet ?? 5, grid.dpi, grid.scaleMultiplier);
        const lineOrigin: Vector2 = {
            x: casterCenter.x + dir.x * (grid.dpi * 0.5),
            y: casterCenter.y + dir.y * (grid.dpi * 0.5)
        };
        const lineEnd: Vector2 = {
            x: lineOrigin.x + dir.x * sizePixels,
            y: lineOrigin.y + dir.y * sizePixels
        };

        const halfW = widthPixels / 2;
        const p1: Vector2 = { x: lineOrigin.x - perp.x * halfW, y: lineOrigin.y - perp.y * halfW };
        const p2: Vector2 = { x: lineEnd.x - perp.x * halfW, y: lineEnd.y - perp.y * halfW };
        const p3: Vector2 = { x: lineEnd.x + perp.x * halfW, y: lineEnd.y + perp.y * halfW };
        const p4: Vector2 = { x: lineOrigin.x + perp.x * halfW, y: lineOrigin.y + perp.y * halfW };

        const lineRect = buildCurve()
            .id(AOE_OUTLINE_ID)
            .points([p1, p2, p3, p4])
            .closed(true)
            .tension(0)
            .strokeColor("#ef4444")
            .strokeWidth(3)
            .strokeOpacity(0.9)
            .fillColor("#ef4444")
            .fillOpacity(0.08)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        items.push(lineRect);

        const label = buildLabel()
            .id(AOE_OUTLINE_LABEL_ID)
            .position({ x: lineOrigin.x + dir.x * (sizePixels * 0.5), y: lineOrigin.y + dir.y * (sizePixels * 0.5) - 20 })
            .plainText(`${template.sizeFeet}ft line`)
            .fontSize(16)
            .fontWeight(700)
            .padding(6)
            .cornerRadius(6)
            .fillColor("#ffffff")
            .backgroundColor("#0f172a")
            .backgroundOpacity(0.85)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        items.push(label);
    }

    return items;
}

let activeAoeToken = 0;
const knownAoeItems = new Map<string, string>(); // id -> item.type
let lastAoeStateKey = "";
let lastAoeResult: AoePreviewRenderResult = { affectedCellCount: 0, affectedTokenIds: [] };

export function resetAoePreviewState(): void {
    activeAoeToken = 0;
    knownAoeItems.clear();
    lastAoeStateKey = "";
    lastAoeResult = { affectedCellCount: 0, affectedTokenIds: [] };
}

/**
 * Renders or updates the AoE grid cell highlights, token warning highlights,
 * and the geometric wireframe overlay (red cone/sphere outline + distance label).
 * Rendered on OBR.scene.local (private to this player's screen).
 */
export async function renderAoePreview(state: AoePreviewRenderOptions): Promise<AoePreviewRenderResult> {
    const currentToken = ++activeAoeToken;
    const { template, grid, casterId, themeColor = "#f97316", strokeColor = "#ea580c" } = state;

    // Use passed cached scene items if available to avoid an RPC on every pointer tick
    const sceneItems = state.sceneItems || (await OBR.scene.items.getItems());
    const characterTokens = sceneItems.filter(item => item.layer === "CHARACTER" && item.visible);

    const affectedCells = getAffectedGridCells(template, grid);
    const affectedTokenIds: string[] = [];

    for (const token of characterTokens) {
        if (casterId && token.id === casterId) {
            continue; // Caster does not burn themselves
        }
        if (isTokenInAffectedCells(token.position, affectedCells)) {
            affectedTokenIds.push(token.id);
        }
    }

    // Spatial deadband: if template shape, quantized cursor/origin, affected cells, and tokens haven't changed, return cached result
    const visibleTokenIds = state.hiddenTokenIds
        ? affectedTokenIds.filter(id => !state.hiddenTokenIds!.has(id))
        : affectedTokenIds;
    const cellHash = affectedCells.map(c => `${c.x}_${c.y}`).join(",");
    const tokenHash = visibleTokenIds.join(",");
    const cursorHash = `${Math.round(template.cursor.x)}_${Math.round(template.cursor.y)}`;
    const aoeStateKey = `${template.shape}_${template.sizeFeet}_${cursorHash}_${cellHash}_${tokenHash}`;

    if (aoeStateKey === lastAoeStateKey && knownAoeItems.size > 0) {
        return lastAoeResult;
    }

    // 1. Build grid cell highlight shapes
    const cellItems: Shape[] = [];
    for (const cell of affectedCells) {
        const cellId = `${AOE_GRID_PREFIX}${cell.x}_${cell.y}`;
        const shape = buildShape()
            .id(cellId)
            .shapeType("RECTANGLE")
            .position({ x: cell.bounds.minX, y: cell.bounds.minY })
            .width(grid.dpi)
            .height(grid.dpi)
            .fillColor(themeColor)
            .fillOpacity(0.25)
            .strokeColor(strokeColor)
            .strokeWidth(2)
            .strokeOpacity(0.65)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        cellItems.push(shape);
    }

    // 2. Build token warning highlight rings (Anti-radar: suppress for tokens hidden in darkness)
    const tokenHighlights: Shape[] = [];
    for (const tokenId of affectedTokenIds) {
        if (state.hiddenTokenIds && state.hiddenTokenIds.has(tokenId)) {
            continue; // Suppress red ring over hidden tokens in darkness!
        }
        const token = characterTokens.find(t => t.id === tokenId);
        if (!token) continue;
        const hlShape = buildShape()
            .id(`${AOE_TOKEN_HIGHLIGHT_PREFIX}${tokenId}`)
            .shapeType("CIRCLE")
            .position(token.position)
            .width(grid.dpi * 1.3)
            .height(grid.dpi * 1.3)
            .fillColor("#ef4444")
            .fillOpacity(0.2)
            .strokeColor("#dc2626")
            .strokeWidth(3)
            .strokeOpacity(0.9)
            .disableHit(true)
            .locked(true)
            .layer("ATTACHMENT")
            .build();
        tokenHighlights.push(hlShape);
    }

    // 3. Build geometric outline and label overlay
    const overlayItems = buildAoEGeometricOverlay(template, grid);

    // Combine all new items
    const newItems = [...cellItems, ...tokenHighlights, ...overlayItems];
    const newIds = new Set(newItems.map(i => i.id));

    // If knownAoeItems is empty, discover any existing items once
    if (knownAoeItems.size === 0) {
        const localItems = await OBR.scene.local.getItems();
        if (currentToken !== activeAoeToken) return { affectedCellCount: affectedCells.length, affectedTokenIds };
        for (const item of localItems) {
            if (
                item.id.startsWith(AOE_GRID_PREFIX) ||
                item.id.startsWith(AOE_TOKEN_HIGHLIGHT_PREFIX) ||
                item.id === AOE_OUTLINE_ID ||
                item.id === AOE_OUTLINE_LABEL_ID
            ) {
                knownAoeItems.set(item.id, item.type);
            }
        }
    }

    const idsToDelete: string[] = [];
    for (const [existingId] of knownAoeItems) {
        if (!newIds.has(existingId)) {
            idsToDelete.push(existingId);
        }
    }

    const itemsToAdd: Item[] = [];
    const itemsToUpdate: Item[] = [];

    for (const item of newItems) {
        const existingType = knownAoeItems.get(item.id);
        // If it already exists and shares the exact same item type, update in place
        if (existingType && existingType === item.type) {
            itemsToUpdate.push(item);
        } else {
            // If item changed type (e.g. from Curve to Shape when switching spell), delete old and add new
            if (existingType) {
                idsToDelete.push(item.id);
            }
            itemsToAdd.push(item);
        }
    }

    // Delete removed or type-changed items
    if (idsToDelete.length > 0) {
        await OBR.scene.local.deleteItems(idsToDelete);
        for (const id of idsToDelete) {
            knownAoeItems.delete(id);
        }
        if (currentToken !== activeAoeToken) return { affectedCellCount: affectedCells.length, affectedTokenIds };
    }

    // Add new items
    if (itemsToAdd.length > 0) {
        await OBR.scene.local.addItems(itemsToAdd);
        for (const item of itemsToAdd) {
            knownAoeItems.set(item.id, item.type);
        }
        if (currentToken !== activeAoeToken) return { affectedCellCount: affectedCells.length, affectedTokenIds };
    }

    // Update existing items with O(1) map lookup
    if (itemsToUpdate.length > 0) {
        const updateMap = new Map(itemsToUpdate.map(u => [u.id, u]));
        await OBR.scene.local.updateItems(
            itemsToUpdate.map(i => i.id),
            items => {
                for (let i = 0; i < items.length; i++) {
                    const newItem = updateMap.get(items[i].id);
                    if (newItem) {
                        Object.assign(items[i], newItem);
                    }
                }
            }
        );
    }

    lastAoeStateKey = aoeStateKey;
    lastAoeResult = {
        affectedCellCount: affectedCells.length,
        affectedTokenIds
    };

    return lastAoeResult;
}

/**
 * Clears all AoE grid highlights, geometric outlines, and token warning rings from the local scene.
 */
export async function clearAoePreview(): Promise<void> {
    activeAoeToken++;
    if (knownAoeItems.size > 0) {
        const ids = Array.from(knownAoeItems.keys());
        knownAoeItems.clear();
        try {
            await OBR.scene.local.deleteItems(ids);
        } catch {
            // Safe to ignore
        }
    } else {
        const localItems = await OBR.scene.local.getItems();
        const aoeIds = localItems
            .filter(
                item =>
                    item.id.startsWith(AOE_GRID_PREFIX) ||
                    item.id.startsWith(AOE_TOKEN_HIGHLIGHT_PREFIX) ||
                    item.id === AOE_OUTLINE_ID ||
                    item.id === AOE_OUTLINE_LABEL_ID
            )
            .map(item => item.id);

        if (aoeIds.length > 0) {
            try {
                await OBR.scene.local.deleteItems(aoeIds);
            } catch {
                // Safe to ignore
            }
        }
    }
}
