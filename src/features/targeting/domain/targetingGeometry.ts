import { Vector2, Item } from "@owlbear-rodeo/sdk";
import { getScopedMetadata } from "../../../platform/obr/metadataHelper";

export const COMBAT_SPACE_METADATA_KEY = "embers/combatSpace";

export interface TokenCombatSpace {
    sizeInSquares: number;
    sizeCategory?: string; // "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan"
    sizeFeet?: number;
}

export interface GridInfo {
    dpi: number;
    scaleMultiplier: number; // e.g. 5 for 5ft per grid cell
    cellCenterOffset?: Vector2; // The phase offset of cell centers in scene coordinates
}

export type AoEShape = "Sphere" | "Cone" | "Cube" | "Line";

export interface AoETemplate {
    shape: AoEShape;
    origin: Vector2;
    cursor: Vector2;
    sizeFeet: number; // radius, length, or edge length in feet
    widthFeet?: number; // for lines (default 5ft)
    coneAngleDeg?: number; // for cones (default 53.13 degrees)
}

export interface GridCell {
    x: number; // cell column index
    y: number; // cell row index
    center: Vector2;
    bounds: { minX: number; minY: number; maxX: number; maxY: number };
}

/**
 * Calculates Euclidean distance between two 2D points in pixels.
 */
export function distancePixels(a: Vector2, b: Vector2): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Converts distance in pixels to feet using scene grid DPI and scale multiplier.
 */
export function pixelsToFeet(pixels: number, dpi: number, scaleMultiplier: number): number {
    if (dpi <= 0) return 0;
    return (pixels / dpi) * scaleMultiplier;
}

/**
 * Converts distance in feet to pixels using scene grid DPI and scale multiplier.
 */
export function feetToPixels(feet: number, dpi: number, scaleMultiplier: number): number {
    if (scaleMultiplier <= 0) return 0;
    return (feet / scaleMultiplier) * dpi;
}

/**
 * Calculates distance in feet between two points.
 */
export function distanceFeet(a: Vector2, b: Vector2, grid: GridInfo): number {
    return pixelsToFeet(distancePixels(a, b), grid.dpi, grid.scaleMultiplier);
}

/**
 * Returns the normalized vector.
 */
export function normalize(v: Vector2): Vector2 {
    const len = Math.sqrt(v.x * v.x + v.y * v.y);
    if (len === 0) return { x: 0, y: 0 };
    return { x: v.x / len, y: v.y / len };
}

/**
 * Calculates angle from vector a to b in radians.
 */
export function angleRadians(from: Vector2, to: Vector2): number {
    return Math.atan2(to.y - from.y, to.x - from.x);
}

/**
 * Calculates angle from vector a to b in degrees (-180 to 180).
 */
export function angleDegrees(from: Vector2, to: Vector2): number {
    return (angleRadians(from, to) * 180) / Math.PI;
}

/**
 * Checks if a distance is within maximum spell range.
 */
export function isWithinRange(
    casterPos: Vector2,
    targetPos: Vector2,
    maxRangeFeet: number,
    grid: GridInfo,
    rangeMultiplier = 1
): { withinRange: boolean; currentDistanceFeet: number; effectiveMaxRangeFeet: number } {
    const distFeet = distanceFeet(casterPos, targetPos, grid);
    const effectiveMax = maxRangeFeet * rangeMultiplier;

    // D&D 5e Grid Chebyshev distance (1 square diagonal = 5 ft reach)
    const dxFeet = Math.abs(targetPos.x - casterPos.x) / (grid.dpi || 1) * (grid.scaleMultiplier || 5);
    const dyFeet = Math.abs(targetPos.y - casterPos.y) / (grid.dpi || 1) * (grid.scaleMultiplier || 5);
    const chebyshevDist = Math.max(dxFeet, dyFeet);

    // For melee/reach (maxRangeFeet <= 5), an adjacent diagonal square (dx=5, dy=5) is strictly within 5ft reach in 5e rules
    const isMeleeReach = maxRangeFeet <= 5 && (chebyshevDist <= 5.5 || distFeet <= 5 * Math.SQRT2 + 0.5);
    const isGeneralRange = distFeet <= effectiveMax + 0.5 || chebyshevDist <= effectiveMax + 0.5;

    const withinRange = isMeleeReach || isGeneralRange;
    const currentDistanceFeet = (maxRangeFeet <= 5 && isMeleeReach)
        ? 5
        : Math.round(distFeet * 10) / 10;

    return {
        withinRange,
        currentDistanceFeet,
        effectiveMaxRangeFeet: effectiveMax
    };
}

/**
 * Generates grid cells within a bounding box centered around a point,
 * aligned to cell center offsets so cell bounds match the grid lines perfectly.
 */
export function getSurroundingGridCells(
    center: Vector2,
    radiusPixels: number,
    dpi: number,
    cellCenterOffset?: Vector2
): GridCell[] {
    if (dpi <= 0) return [];

    const offX = cellCenterOffset ? (((cellCenterOffset.x % dpi) + dpi) % dpi) : dpi / 2;
    const offY = cellCenterOffset ? (((cellCenterOffset.y % dpi) + dpi) % dpi) : dpi / 2;

    const minCellX = Math.floor((center.x - radiusPixels - offX) / dpi);
    const maxCellX = Math.ceil((center.x + radiusPixels - offX) / dpi);
    const minCellY = Math.floor((center.y - radiusPixels - offY) / dpi);
    const maxCellY = Math.ceil((center.y + radiusPixels - offY) / dpi);

    const cells: GridCell[] = [];
    for (let cx = minCellX; cx <= maxCellX; cx++) {
        for (let cy = minCellY; cy <= maxCellY; cy++) {
            const cellCenterX = cx * dpi + offX;
            const cellCenterY = cy * dpi + offY;
            const minX = cellCenterX - dpi / 2;
            const minY = cellCenterY - dpi / 2;
            const maxX = cellCenterX + dpi / 2;
            const maxY = cellCenterY + dpi / 2;
            cells.push({
                x: cx,
                y: cy,
                center: { x: cellCenterX, y: cellCenterY },
                bounds: { minX, minY, maxX, maxY }
            });
        }
    }
    return cells;
}

/**
 * Tests if a point lies inside a Sphere/Circle AoE.
 */
export function isPointInSphere(point: Vector2, center: Vector2, radiusPixels: number): boolean {
    return distancePixels(point, center) <= radiusPixels + 0.001;
}

/**
 * Tests if a point lies inside a Cone AoE with apex at origin pointing toward cursor.
 */
export function isPointInCone(
    point: Vector2,
    origin: Vector2,
    cursor: Vector2,
    lengthPixels: number,
    coneAngleDeg = 53.13
): boolean {
    const dist = distancePixels(origin, point);
    if (dist > lengthPixels + 0.001) return false;
    if (dist < 1) return false; // Exclude origin apex itself

    const targetDir = normalize({ x: cursor.x - origin.x, y: cursor.y - origin.y });
    const pointDir = normalize({ x: point.x - origin.x, y: point.y - origin.y });

    const dot = targetDir.x * pointDir.x + targetDir.y * pointDir.y;
    const halfAngleRad = ((coneAngleDeg / 2) * Math.PI) / 180;
    const minDot = Math.cos(halfAngleRad);

    return dot >= minDot - 0.001;
}

/**
 * Snaps any point to the true center of its grid cell.
 */
export function snapToCellCenter(pos: Vector2, grid: GridInfo): Vector2 {
    const dpi = grid.dpi;
    if (dpi <= 0) return pos;
    const offX = grid.cellCenterOffset ? (((grid.cellCenterOffset.x % dpi) + dpi) % dpi) : dpi / 2;
    const offY = grid.cellCenterOffset ? (((grid.cellCenterOffset.y % dpi) + dpi) % dpi) : dpi / 2;
    return {
        x: Math.round((pos.x - offX) / dpi) * dpi + offX,
        y: Math.round((pos.y - offY) / dpi) * dpi + offY
    };
}

/**
 * Tests if a point lies inside a 2D triangle defined by vertices a, b, c.
 */
export function isPointInTriangle(p: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean {
    const v0x = c.x - a.x;
    const v0y = c.y - a.y;
    const v1x = b.x - a.x;
    const v1y = b.y - a.y;
    const v2x = p.x - a.x;
    const v2y = p.y - a.y;

    const dot00 = v0x * v0x + v0y * v0y;
    const dot01 = v0x * v1x + v0y * v1y;
    const dot02 = v0x * v2x + v0y * v2y;
    const dot11 = v1x * v1x + v1y * v1y;
    const dot12 = v1x * v2x + v1y * v2y;

    const denom = dot00 * dot11 - dot01 * dot01;
    if (denom === 0) return false;
    const u = (dot11 * dot02 - dot01 * dot12) / denom;
    const v = (dot00 * dot12 - dot01 * dot02) / denom;

    return u >= 0 && v >= 0 && u + v <= 1;
}

/**
 * Tests if an entire grid cell is affected by a cone according to D&D 5e standard cone rules.
 * Uses the exact geometric triangle [origin, pLeft, pRight] matching the visual red cone wireframe.
 */
export function isCellInCone(
    cell: GridCell,
    origin: Vector2,
    cursor: Vector2,
    lengthPixels: number,
    dpi: number,
    coneAngleDeg = 53.13,
    casterCenter?: Vector2
): boolean {
    // Strictly exclude the caster's own cell
    if (casterCenter && distancePixels(casterCenter, cell.center) < dpi * 0.5) {
        return false;
    }

    const dir = normalize({ x: cursor.x - origin.x, y: cursor.y - origin.y });
    if (dir.x === 0 && dir.y === 0) return false;

    const angle = Math.atan2(dir.y, dir.x);
    const halfAngleRad = ((coneAngleDeg / 2) * Math.PI) / 180;

    const pLeft: Vector2 = {
        x: origin.x + Math.cos(angle - halfAngleRad) * lengthPixels,
        y: origin.y + Math.sin(angle - halfAngleRad) * lengthPixels
    };
    const pRight: Vector2 = {
        x: origin.x + Math.cos(angle + halfAngleRad) * lengthPixels,
        y: origin.y + Math.sin(angle + halfAngleRad) * lengthPixels
    };

    // 1. Center of cell is inside cone triangle
    if (isPointInTriangle(cell.center, origin, pLeft, pRight)) {
        return true;
    }

    // 2. Inner sample points (25% from center towards edges) for cells with substantial coverage
    const off = dpi * 0.25;
    const samplePoints: Vector2[] = [
        { x: cell.center.x + off, y: cell.center.y },
        { x: cell.center.x - off, y: cell.center.y },
        { x: cell.center.x, y: cell.center.y + off },
        { x: cell.center.x, y: cell.center.y - off }
    ];

    for (const pt of samplePoints) {
        if (isPointInTriangle(pt, origin, pLeft, pRight)) {
            return true;
        }
    }

    return false;
}

/**
 * Tests if a point lies inside a Line AoE with given width.
 */
export function isPointInLine(
    point: Vector2,
    origin: Vector2,
    cursor: Vector2,
    lengthPixels: number,
    widthPixels: number
): boolean {
    const dir = normalize({ x: cursor.x - origin.x, y: cursor.y - origin.y });
    const toPoint = { x: point.x - origin.x, y: point.y - origin.y };

    // Projection along line direction
    const projAlong = toPoint.x * dir.x + toPoint.y * dir.y;
    if (projAlong < 0 || projAlong > lengthPixels) return false;

    // Perpendicular distance from line
    const perpDist = Math.abs(toPoint.x * -dir.y + toPoint.y * dir.x);
    return perpDist <= widthPixels / 2;
}

/**
 * Tests if a grid cell is affected by a Line AoE with given width,
 * checking center and inner sample points to ensure continuous coverage on diagonal angles.
 */
export function isCellInLine(
    cell: GridCell,
    origin: Vector2,
    cursor: Vector2,
    lengthPixels: number,
    widthPixels: number,
    dpi: number,
    casterCenter?: Vector2
): boolean {
    if (casterCenter && distancePixels(casterCenter, cell.center) < dpi * 0.5) {
        return false;
    }
    if (isPointInLine(cell.center, origin, cursor, lengthPixels, widthPixels)) {
        return true;
    }
    const off = dpi * 0.25;
    const samplePoints: Vector2[] = [
        { x: cell.center.x + off, y: cell.center.y },
        { x: cell.center.x - off, y: cell.center.y },
        { x: cell.center.x, y: cell.center.y + off },
        { x: cell.center.x, y: cell.center.y - off }
    ];
    for (const pt of samplePoints) {
        if (isPointInLine(pt, origin, cursor, lengthPixels, widthPixels)) {
            return true;
        }
    }
    return false;
}


/**
 * Tests if a point lies inside a Cube/Square AoE centered at cursor.
 */
export function isPointInCube(point: Vector2, center: Vector2, sizePixels: number): boolean {
    const half = sizePixels / 2;
    return (
        point.x >= center.x - half &&
        point.x <= center.x + half &&
        point.y >= center.y - half &&
        point.y <= center.y + half
    );
}

/**
 * Snaps AoE center to grid intersection or grid cell center according to standard D&D 5e grid rules.
 * For spheres with even diameter (like Fireball 20ft radius = 40ft diameter = 8 cells),
 * D&D rules state the origin is a grid intersection (corner of 4 squares where the + crosses are).
 * For odd diameter areas (like a 15ft cube = 3 cells), origin is cell center.
 */
export function snapAoECenter(pos: Vector2, shape: AoEShape, _sizeFeet: number, grid: GridInfo): Vector2 {
    const dpi = grid.dpi;
    if (dpi <= 0) return pos;

    const offX = grid.cellCenterOffset ? (((grid.cellCenterOffset.x % dpi) + dpi) % dpi) : dpi / 2;
    const offY = grid.cellCenterOffset ? (((grid.cellCenterOffset.y % dpi) + dpi) % dpi) : dpi / 2;

    // Corner (grid intersection) is offset by half a cell from cell center
    const cornerOffX = (((offX - dpi / 2) % dpi) + dpi) % dpi;
    const cornerOffY = (((offY - dpi / 2) % dpi) + dpi) % dpi;

    if (shape === "Sphere" || shape === "Cube") {
        const cellCenterPos = {
            x: Math.round((pos.x - offX) / dpi) * dpi + offX,
            y: Math.round((pos.y - offY) / dpi) * dpi + offY
        };
        const cornerPos = {
            x: Math.round((pos.x - cornerOffX) / dpi) * dpi + cornerOffX,
            y: Math.round((pos.y - cornerOffY) / dpi) * dpi + cornerOffY
        };

        const distToCell = Math.hypot(pos.x - cellCenterPos.x, pos.y - cellCenterPos.y);
        const distToCorner = Math.hypot(pos.x - cornerPos.x, pos.y - cornerPos.y);

        // Snap to whichever anchor (token/cell center vs intersection) the player is pointing closer to
        return distToCell <= distToCorner ? cellCenterPos : cornerPos;
    }

    return pos;
}

/**
 * Computes all grid cells covered by an AoE template based on D&D 5e standard rules.
 */
export function getAffectedGridCells(template: AoETemplate, grid: GridInfo): GridCell[] {
    const sizePixels = feetToPixels(template.sizeFeet, grid.dpi, grid.scaleMultiplier);
    const effectiveCursor = snapAoECenter(template.cursor, template.shape, template.sizeFeet, grid);
    const casterCenter = snapToCellCenter(template.origin, grid);

    // For Cone and Line, spell begins at the perimeter edge of caster's space pointing toward cursor
    let effectOrigin = casterCenter;
    if (template.shape === "Cone" || template.shape === "Line") {
        const dir = normalize({ x: template.cursor.x - casterCenter.x, y: template.cursor.y - casterCenter.y });
        effectOrigin = {
            x: casterCenter.x + dir.x * (grid.dpi * 0.5),
            y: casterCenter.y + dir.y * (grid.dpi * 0.5)
        };
    }

    const searchCenter = template.shape === "Cone" || template.shape === "Line" ? casterCenter : effectiveCursor;
    const searchRadius = sizePixels * 1.5 + grid.dpi;

    const candidateCells = getSurroundingGridCells(searchCenter, searchRadius, grid.dpi, grid.cellCenterOffset);
    const affectedCells: GridCell[] = [];

    const widthPixels = feetToPixels(template.widthFeet ?? 5, grid.dpi, grid.scaleMultiplier);

    for (const cell of candidateCells) {
        let isHit = false;
        switch (template.shape) {
            case "Sphere":
                isHit = isPointInSphere(cell.center, effectiveCursor, sizePixels);
                break;
            case "Cone":
                isHit = isCellInCone(
                    cell,
                    effectOrigin,
                    template.cursor,
                    sizePixels,
                    grid.dpi,
                    template.coneAngleDeg ?? 53.13,
                    casterCenter
                );
                break;
            case "Line":
                isHit = isCellInLine(cell, effectOrigin, template.cursor, sizePixels, widthPixels, grid.dpi, casterCenter);
                break;
            case "Cube":
                isHit = isPointInCube(cell.center, effectiveCursor, sizePixels);
                break;
        }

        if (isHit) {
            affectedCells.push(cell);
        }
    }

    return affectedCells;
}

/**
 * Tests whether a token's position is contained within any of the affected grid cells.
 */
export function isTokenInAffectedCells(tokenPos: Vector2, cells: GridCell[]): boolean {
    for (const cell of cells) {
        if (
            tokenPos.x >= cell.bounds.minX &&
            tokenPos.x <= cell.bounds.maxX &&
            tokenPos.y >= cell.bounds.minY &&
            tokenPos.y <= cell.bounds.maxY
        ) {
            return true;
        }
    }
    return false;
}

export interface Point3D {
    x: number;
    y: number;
    z: number; // elevation in feet
}

/**
 * Calculates Euclidean distance in feet between two 3D points.
 * x and y are in scene pixels, z is in feet.
 */
export function distance3DFeet(a: Point3D, b: Point3D, grid: GridInfo): number {
    const dxPx = b.x - a.x;
    const dyPx = b.y - a.y;
    const dxFt = (dxPx / grid.dpi) * grid.scaleMultiplier;
    const dyFt = (dyPx / grid.dpi) * grid.scaleMultiplier;
    const dzFt = b.z - a.z;
    return Math.sqrt(dxFt * dxFt + dyFt * dyFt + dzFt * dzFt);
}

/**
 * Calculates the shortest distance in feet from a 3D point C to a 3D line segment AB.
 * a.x, a.y, b.x, b.y, c.x, c.y are in pixels; a.z, b.z, c.z are in feet.
 */
export function distancePoint3DToSegment3DFeet(
    c: Point3D,
    a: Point3D,
    b: Point3D,
    grid: GridInfo
): number {
    const ax = (a.x / grid.dpi) * grid.scaleMultiplier;
    const ay = (a.y / grid.dpi) * grid.scaleMultiplier;
    const az = a.z;

    const bx = (b.x / grid.dpi) * grid.scaleMultiplier;
    const by = (b.y / grid.dpi) * grid.scaleMultiplier;
    const bz = b.z;

    const cx = (c.x / grid.dpi) * grid.scaleMultiplier;
    const cy = (c.y / grid.dpi) * grid.scaleMultiplier;
    const cz = c.z;

    const vx = bx - ax;
    const vy = by - ay;
    const vz = bz - az;
    const lenSq = vx * vx + vy * vy + vz * vz;

    if (lenSq === 0) {
        const dx = cx - ax;
        const dy = cy - ay;
        const dz = cz - az;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    const t = Math.max(0, Math.min(1, ((cx - ax) * vx + (cy - ay) * vy + (cz - az) * vz) / lenSq));
    const projX = ax + t * vx;
    const projY = ay + t * vy;
    const projZ = az + t * vz;

    const dx = cx - projX;
    const dy = cy - projY;
    const dz = cz - projZ;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Checks whether a 3D line of sight segment between caster and target intersects a 3D sphere.
 */
export function doesSegmentIntersectSphere3D(
    caster: Point3D,
    target: Point3D,
    sphereCenter: Point3D,
    radiusFeet: number,
    grid: GridInfo
): boolean {
    const distFeet = distancePoint3DToSegment3DFeet(sphereCenter, caster, target, grid);
    return distFeet <= radiusFeet;
}

export interface TokenBounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export interface TokenFootprint {
    id: string;
    center: Vector2;
    sizeInSquares: number;
    widthPixels: number;
    heightPixels: number;
    bounds: TokenBounds;
    combatBounds: TokenBounds;
    occupiedCells: GridCell[];
}

/**
 * Resolves the 5e combat size (in grid squares) for a token.
 * Checks explicit combat space metadata first, then falls back to image scale / grid dimensions.
 * Note: Does NOT force size from bound monster statblock text to avoid overriding on-map token scale
 * or creating phantom grid offset cells when a Medium-sized token is bound to a Large statblock.
 */
export function getTokenSizeInSquares(item: Item, grid?: GridInfo): number {
    // 1. Explicit combat space metadata (e.g. set via context menu)
    const combatSpace = getScopedMetadata<TokenCombatSpace>(item.metadata, "combat-space")
        ?? (item.metadata?.["embers/combatSpace"] as TokenCombatSpace | undefined)
        ?? (item.metadata?.["embers/combat-space"] as TokenCombatSpace | undefined);
    if (combatSpace && typeof combatSpace.sizeInSquares === "number" && combatSpace.sizeInSquares > 0) {
        return Math.max(1, Math.round(combatSpace.sizeInSquares));
    }

    // 2. Fall back to image scale / grid dimensions from the scene map
    const dpi = grid?.dpi && grid.dpi > 0 ? grid.dpi : 150;
    const img = (item as any).image;
    const itemGrid = (item as any).grid;
    const scale = (item as any).scale ?? { x: 1, y: 1 };

    if (img?.width && itemGrid?.dpi) {
        const gridFactorW = img.width / itemGrid.dpi;
        const gridFactorH = (img.height || img.width) / itemGrid.dpi;
        const widthPixels = gridFactorW * dpi * Math.abs(scale.x || 1);
        const heightPixels = gridFactorH * dpi * Math.abs(scale.y || 1);
        const rawSquares = Math.max(widthPixels, heightPixels) / dpi;
        return Math.max(1, Math.floor(rawSquares + 0.25));
    } else {
        const rawScale = Math.max(Math.abs(scale.x || 1), Math.abs(scale.y || 1));
        return Math.max(1, Math.round(rawScale));
    }
}

/**
 * Calculates a token's physical footprint and bounding box in scene coordinates,
 * taking into account its 5e combat base (occupied grid cells) and full artwork bounds (wingspan).
 */
export function getTokenFootprint(item: Item, grid: GridInfo): TokenFootprint {
    const dpi = grid.dpi > 0 ? grid.dpi : 150;
    const pos = item.position ?? { x: 0, y: 0 };
    const sizeInSquares = getTokenSizeInSquares(item, grid);

    const offX = grid.cellCenterOffset ? (((grid.cellCenterOffset.x % dpi) + dpi) % dpi) : dpi / 2;
    const offY = grid.cellCenterOffset ? (((grid.cellCenterOffset.y % dpi) + dpi) % dpi) : dpi / 2;

    const cornerOffX = (((offX - dpi / 2) % dpi) + dpi) % dpi;
    const cornerOffY = (((offY - dpi / 2) % dpi) + dpi) % dpi;

    const occupiedCells: GridCell[] = [];
    let combatCenter: Vector2;
    let combatBounds: TokenBounds;

    const isEven = sizeInSquares % 2 === 0;
    if (!isEven) {
        // Odd sizes (1x1, 3x3, 5x5): Center of combat space aligns to cell center
        const centerCol = Math.round((pos.x - offX) / dpi);
        const centerRow = Math.round((pos.y - offY) / dpi);
        combatCenter = {
            x: centerCol * dpi + offX,
            y: centerRow * dpi + offY
        };
        const k = (sizeInSquares - 1) / 2;
        for (let dy = -k; dy <= k; dy++) {
            for (let dx = -k; dx <= k; dx++) {
                const cellCol = centerCol + dx;
                const cellRow = centerRow + dy;
                const cCenter = {
                    x: cellCol * dpi + offX,
                    y: cellRow * dpi + offY
                };
                occupiedCells.push({
                    x: cellCol,
                    y: cellRow,
                    center: cCenter,
                    bounds: {
                        minX: cCenter.x - dpi / 2,
                        maxX: cCenter.x + dpi / 2,
                        minY: cCenter.y - dpi / 2,
                        maxY: cCenter.y + dpi / 2
                    }
                });
            }
        }
        const halfCombatPx = (sizeInSquares * dpi) / 2;
        combatBounds = {
            minX: combatCenter.x - halfCombatPx,
            maxX: combatCenter.x + halfCombatPx,
            minY: combatCenter.y - halfCombatPx,
            maxY: combatCenter.y + halfCombatPx
        };
    } else {
        // Even sizes (2x2, 4x4): Center of combat space aligns to grid intersection corner
        const cornerInterX = Math.round((pos.x - cornerOffX) / dpi);
        const cornerInterY = Math.round((pos.y - cornerOffY) / dpi);
        combatCenter = {
            x: cornerInterX * dpi + cornerOffX,
            y: cornerInterY * dpi + cornerOffY
        };
        const k = sizeInSquares / 2;
        for (let dy = -k; dy < k; dy++) {
            for (let dx = -k; dx < k; dx++) {
                const cCenter = {
                    x: combatCenter.x + dx * dpi + dpi / 2,
                    y: combatCenter.y + dy * dpi + dpi / 2
                };
                const cellCol = Math.round((cCenter.x - offX) / dpi);
                const cellRow = Math.round((cCenter.y - offY) / dpi);
                occupiedCells.push({
                    x: cellCol,
                    y: cellRow,
                    center: cCenter,
                    bounds: {
                        minX: cCenter.x - dpi / 2,
                        maxX: cCenter.x + dpi / 2,
                        minY: cCenter.y - dpi / 2,
                        maxY: cCenter.y + dpi / 2
                    }
                });
            }
        }
        const halfCombatPx = (sizeInSquares * dpi) / 2;
        combatBounds = {
            minX: combatCenter.x - halfCombatPx,
            maxX: combatCenter.x + halfCombatPx,
            minY: combatCenter.y - halfCombatPx,
            maxY: combatCenter.y + halfCombatPx
        };
    }

    // Visual dimensions (including wing overdraw)
    const img = (item as any).image;
    const itemGrid = (item as any).grid;
    const scale = (item as any).scale ?? { x: 1, y: 1 };

    let visualWidth = sizeInSquares * dpi;
    let visualHeight = sizeInSquares * dpi;

    if (img?.width && itemGrid?.dpi) {
        const gridFactorW = img.width / itemGrid.dpi;
        const gridFactorH = (img.height || img.width) / itemGrid.dpi;
        visualWidth = gridFactorW * dpi * Math.abs(scale.x || 1);
        visualHeight = gridFactorH * dpi * Math.abs(scale.y || 1);
    }

    const rotDeg = (item as any).rotation || 0;
    if (rotDeg !== 0) {
        const rad = (rotDeg * Math.PI) / 180;
        const cos = Math.abs(Math.cos(rad));
        const sin = Math.abs(Math.sin(rad));
        const rotW = visualWidth * cos + visualHeight * sin;
        const rotH = visualWidth * sin + visualHeight * cos;
        visualWidth = rotW;
        visualHeight = rotH;
    }

    let bounds: TokenBounds;
    if (visualWidth > (sizeInSquares * dpi) + 1 || visualHeight > (sizeInSquares * dpi) + 1) {
        const halfW = visualWidth / 2;
        const halfH = visualHeight / 2;
        const anchorCenter = combatCenter;
        bounds = {
            minX: Math.min(combatBounds.minX, anchorCenter.x - halfW),
            maxX: Math.max(combatBounds.maxX, anchorCenter.x + halfW),
            minY: Math.min(combatBounds.minY, anchorCenter.y - halfH),
            maxY: Math.max(combatBounds.maxY, anchorCenter.y + halfH),
        };
    } else {
        bounds = { ...combatBounds };
    }

    return {
        id: item.id,
        center: combatCenter,
        sizeInSquares,
        widthPixels: visualWidth,
        heightPixels: visualHeight,
        bounds,
        combatBounds,
        occupiedCells,
    };
}

/**
 * Tests whether a point in scene coordinates falls within a token's footprint / bounding box,
 * with optional padding (default 10% of cell DPI) to ensure comfortable hit testing on irregular tokens.
 */
export function isPointInTokenFootprint(
    point: Vector2,
    item: Item,
    grid: GridInfo,
    paddingRatio = 0.1
): boolean {
    const footprint = getTokenFootprint(item, grid);
    const padding = (grid.dpi || 150) * paddingRatio;

    return (
        point.x >= footprint.bounds.minX - padding &&
        point.x <= footprint.bounds.maxX + padding &&
        point.y >= footprint.bounds.minY - padding &&
        point.y <= footprint.bounds.maxY + padding
    );
}

/**
 * Resolves the target combat token at a pointer location.
 * If directTarget from OBR event is valid, returns it immediately.
 * Otherwise, inspects scene tokens and returns the one whose footprint encompasses pointerPos.
 * If multiple tokens overlap, returns the closest to the pointer.
 */
export function resolveCombatTargetTokenAtPoint(
    pointerPos: Vector2,
    sceneItems: Item[],
    grid: GridInfo,
    directTarget?: Item | null,
    isValidPredicate?: (item: Item) => boolean
): Item | undefined {
    const isTargetValid = (item: Item | null | undefined): boolean => {
        if (!item || item.visible === false) return false;
        if (isValidPredicate) return isValidPredicate(item);
        const isCombatLayer = item.layer === "CHARACTER" || item.layer === "MOUNT" || item.layer === "PROP" || item.layer === "DRAWING";
        const isStandalone = item.layer === "ATTACHMENT" && (item as any).attachedTo === undefined && item.type === "IMAGE";
        return isCombatLayer || isStandalone;
    };

    if (directTarget && isTargetValid(directTarget)) {
        return directTarget;
    }

    const candidates = sceneItems.filter((item) => {
        if (!isTargetValid(item)) return false;
        if (!item.position) return false;
        return isPointInTokenFootprint(pointerPos, item, grid);
    });

    if (candidates.length === 0) return undefined;
    if (candidates.length === 1) return candidates[0];

    // Prefer CHARACTER layer first, then MOUNT, then PROP, then closest center distance to pointer
    return candidates.sort((a, b) => {
        const rank = (layer?: string) => (layer === "CHARACTER" ? 1 : layer === "MOUNT" ? 2 : layer === "PROP" ? 3 : 4);
        const rankDiff = rank(a.layer) - rank(b.layer);
        if (rankDiff !== 0) return rankDiff;
        const distA = distancePixels(pointerPos, a.position);
        const distB = distancePixels(pointerPos, b.position);
        return distA - distB;
    })[0];
}

/**
 * Finds the anchor point on a target token closest to a reference point (e.g. caster or pointer).
 * For multi-cell tokens (Large, Huge, Gargantuan), returns the center of the occupied cell
 * that is closest to fromPoint, preventing awkward tether stretching to the far center.
 */
export function getTokenClosestPointToPoint(
    targetItem: Item,
    fromPoint: Vector2,
    grid: GridInfo
): Vector2 {
    const footprint = getTokenFootprint(targetItem, grid);
    const tokenPos = targetItem.position ?? footprint.center;
    if (footprint.occupiedCells.length <= 1) {
        return footprint.center;
    }

    let closestCell = footprint.occupiedCells[0];
    let minDistance = distancePixels(fromPoint, closestCell.center);

    for (let i = 1; i < footprint.occupiedCells.length; i++) {
        const cell = footprint.occupiedCells[i];
        const dist = distancePixels(fromPoint, cell.center);
        if (dist < minDistance) {
            minDistance = dist;
            closestCell = cell;
        }
    }

    // Safety check: ensure anchor point does not drift outside the token's visual footprint
    if (
        closestCell.center.x < footprint.bounds.minX ||
        closestCell.center.x > footprint.bounds.maxX ||
        closestCell.center.y < footprint.bounds.minY ||
        closestCell.center.y > footprint.bounds.maxY
    ) {
        return tokenPos;
    }

    return closestCell.center;
}

/**
 * Calculates edge-to-edge distance in feet between two tokens, or between a token and a point.
 * Follows D&D 5e distance rules: measured between the closest occupied spaces of the creatures.
 * In D&D 5e:
 * - Two creature tokens in adjacent spaces have a combat distance of 5 ft (within 5 ft reach / threat).
 * - Each additional space between them adds 5 ft (e.g. 1 space gap = 10 ft away).
 * - If measuring between two tokens, computes the minimum Chebyshev distance across all occupied combat cells.
 * - If measuring to a point (e.g. cursor or AoE origin), measures to the closest cell or exact point.
 * - Crucially: Any attacker adjacent to or touching ANY part of a monster's visual bounds
 *   (wings, horns, weapon, tail) is within 5 ft melee reach and can target and damage the monster.
 */
export function calculateTokenEdgeDistanceFeet(
    entityA: Item | Vector2,
    entityB: Item | Vector2,
    grid: GridInfo
): number {
    const dpi = grid.dpi > 0 ? grid.dpi : 150;
    const scaleMultiplier = grid.scaleMultiplier > 0 ? grid.scaleMultiplier : 5;

    const isTokenA = "layer" in entityA || "type" in entityA || ("image" in entityA && "scale" in entityA);
    const isTokenB = "layer" in entityB || "type" in entityB || ("image" in entityB && "scale" in entityB);

    if (isTokenA && isTokenB) {
        if ((entityA as Item).id && (entityA as Item).id === (entityB as Item).id) {
            return 0;
        }

        const fpA = getTokenFootprint(entityA as Item, grid);
        const fpB = getTokenFootprint(entityB as Item, grid);

        let minChebyshev = Infinity;
        for (const cellA of fpA.occupiedCells) {
            for (const cellB of fpB.occupiedCells) {
                const dx = Math.abs(cellA.x - cellB.x);
                const dy = Math.abs(cellA.y - cellB.y);
                const dist = Math.max(dx, dy);
                if (dist < minChebyshev) {
                    minChebyshev = dist;
                }
            }
        }

        let distFeet = minChebyshev === Infinity ? scaleMultiplier : Math.max(1, minChebyshev) * scaleMultiplier;

        // Visual reach check: if a token has extended visual artwork (e.g. wings, long weapon, DM-scaled bounds),
        // every part of the token's image can be targeted and hit with 5 ft melee when adjacent or touching.
        const hasExtendedVisualB = (fpB.bounds.maxX - fpB.bounds.minX) > (fpB.combatBounds.maxX - fpB.combatBounds.minX) + 1 ||
                                   (fpB.bounds.maxY - fpB.bounds.minY) > (fpB.combatBounds.maxY - fpB.combatBounds.minY) + 1;
        const hasExtendedVisualA = (fpA.bounds.maxX - fpA.bounds.minX) > (fpA.combatBounds.maxX - fpA.combatBounds.minX) + 1 ||
                                   (fpA.bounds.maxY - fpA.bounds.minY) > (fpA.combatBounds.maxY - fpA.combatBounds.minY) + 1;

        if (hasExtendedVisualB) {
            for (const cellA of fpA.occupiedCells) {
                const clampX = Math.max(fpB.bounds.minX, Math.min(fpB.bounds.maxX, cellA.center.x));
                const clampY = Math.max(fpB.bounds.minY, Math.min(fpB.bounds.maxY, cellA.center.y));
                const distPx = Math.hypot(cellA.center.x - clampX, cellA.center.y - clampY);
                if (distPx <= dpi * 1.05) {
                    distFeet = Math.min(distFeet, scaleMultiplier);
                } else {
                    const gapSquares = Math.ceil((distPx - dpi * 0.5) / dpi);
                    distFeet = Math.min(distFeet, Math.max(1, gapSquares + 1) * scaleMultiplier);
                }
            }
        }

        if (hasExtendedVisualA) {
            for (const cellB of fpB.occupiedCells) {
                const clampX = Math.max(fpA.bounds.minX, Math.min(fpA.bounds.maxX, cellB.center.x));
                const clampY = Math.max(fpA.bounds.minY, Math.min(fpA.bounds.maxY, cellB.center.y));
                const distPx = Math.hypot(cellB.center.x - clampX, cellB.center.y - clampY);
                if (distPx <= dpi * 1.05) {
                    distFeet = Math.min(distFeet, scaleMultiplier);
                } else {
                    const gapSquares = Math.ceil((distPx - dpi * 0.5) / dpi);
                    distFeet = Math.min(distFeet, Math.max(1, gapSquares + 1) * scaleMultiplier);
                }
            }
        }

        // Elevation difference check if tokens have elevation metadata
        const eleA = typeof (entityA as any).metadata?.["embers/elevation"] === "number"
            ? (entityA as any).metadata["embers/elevation"]
            : 0;
        const eleB = typeof (entityB as any).metadata?.["embers/elevation"] === "number"
            ? (entityB as any).metadata["embers/elevation"]
            : 0;
        const dz = Math.abs(eleA - eleB);
        if (dz > 0) {
            distFeet = Math.max(distFeet, dz);
        }

        return distFeet;
    }

    if (isTokenA && !isTokenB) {
        const fpA = getTokenFootprint(entityA as Item, grid);
        const pt = entityB as Vector2;
        const offX = grid.cellCenterOffset ? (((grid.cellCenterOffset.x % dpi) + dpi) % dpi) : dpi / 2;
        const offY = grid.cellCenterOffset ? (((grid.cellCenterOffset.y % dpi) + dpi) % dpi) : dpi / 2;
        const ptCellX = Math.round((pt.x - offX) / dpi);
        const ptCellY = Math.round((pt.y - offY) / dpi);

        let minChebyshev = Infinity;
        for (const cellA of fpA.occupiedCells) {
            const dist = Math.max(Math.abs(cellA.x - ptCellX), Math.abs(cellA.y - ptCellY));
            if (dist < minChebyshev) {
                minChebyshev = dist;
            }
        }

        let distFeet = minChebyshev === Infinity ? 0 : minChebyshev * scaleMultiplier;

        const hasExtendedVisualA = (fpA.bounds.maxX - fpA.bounds.minX) > (fpA.combatBounds.maxX - fpA.combatBounds.minX) + 1 ||
                                   (fpA.bounds.maxY - fpA.bounds.minY) > (fpA.combatBounds.maxY - fpA.combatBounds.minY) + 1;
        if (hasExtendedVisualA) {
            const clampX = Math.max(fpA.bounds.minX, Math.min(fpA.bounds.maxX, pt.x));
            const clampY = Math.max(fpA.bounds.minY, Math.min(fpA.bounds.maxY, pt.y));
            const distPx = Math.hypot(pt.x - clampX, pt.y - clampY);
            if (distPx === 0) {
                return 0;
            }
            if (distPx <= dpi * 1.05) {
                distFeet = Math.min(distFeet, scaleMultiplier);
            } else {
                const gapSquares = Math.ceil((distPx - dpi * 0.5) / dpi);
                distFeet = Math.min(distFeet, Math.max(1, gapSquares + 1) * scaleMultiplier);
            }
        }

        return distFeet;
    }

    if (!isTokenA && isTokenB) {
        return calculateTokenEdgeDistanceFeet(entityB, entityA, grid);
    }

    // Both are points
    const ptA = entityA as Vector2;
    const ptB = entityB as Vector2;
    const distPx = Math.hypot(ptA.x - ptB.x, ptA.y - ptB.y);
    return (distPx / dpi) * scaleMultiplier;
}

/**
 * Checks if target is within maximum spell or attack range, measuring edge-to-edge.
 * For 5ft melee reach, adjacent squares (edge distance <= 5.5 ft) are always in range.
 */
export function isWithinTokenRange(
    caster: Item | Vector2,
    target: Item | Vector2,
    maxRangeFeet: number,
    grid: GridInfo,
    rangeMultiplier = 1
): { withinRange: boolean; currentDistanceFeet: number; effectiveMaxRangeFeet: number } {
    const edgeDistFeet = calculateTokenEdgeDistanceFeet(caster, target, grid);
    const effectiveMax = maxRangeFeet * rangeMultiplier;

    // Melee reach (5 ft): adjacent or touching (edge distance <= 5.5 ft)
    const isMeleeReach = maxRangeFeet <= 5 && edgeDistFeet <= 5.5;
    const isGeneralRange = edgeDistFeet <= effectiveMax + 0.5;

    const withinRange = isMeleeReach || isGeneralRange;
    const currentDistanceFeet = (maxRangeFeet <= 5 && isMeleeReach)
        ? 5
        : Math.round(edgeDistFeet * 10) / 10;

    return {
        withinRange,
        currentDistanceFeet,
        effectiveMaxRangeFeet: effectiveMax,
    };
}


