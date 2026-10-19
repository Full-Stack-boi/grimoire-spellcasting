import { describe, expect, it } from "vitest";
import {
    AoETemplate,
    GridInfo,
    distanceFeet,
    distancePixels,
    feetToPixels,
    getAffectedGridCells,
    isPointInCone,
    isPointInCube,
    isPointInLine,
    isPointInSphere,
    isWithinRange,
    pixelsToFeet,
    snapToCellCenter,
    distancePoint3DToSegment3DFeet,
    doesSegmentIntersectSphere3D,
    Point3D,
    getTokenFootprint,
    getTokenSizeInSquares,
    isPointInTokenFootprint,
    resolveCombatTargetTokenAtPoint,
    getTokenClosestPointToPoint,
    calculateTokenEdgeDistanceFeet,
    isWithinTokenRange
} from "./targetingGeometry";

describe("Geometry & Grid Utilities", () => {
    const grid: GridInfo = {
        dpi: 100, // 100 pixels per grid cell
        scaleMultiplier: 5 // each grid cell = 5 feet (standard D&D)
    };

    it("converts between pixels and feet correctly", () => {
        expect(pixelsToFeet(100, grid.dpi, grid.scaleMultiplier)).toBe(5);
        expect(pixelsToFeet(2400, grid.dpi, grid.scaleMultiplier)).toBe(120);

        expect(feetToPixels(5, grid.dpi, grid.scaleMultiplier)).toBe(100);
        expect(feetToPixels(120, grid.dpi, grid.scaleMultiplier)).toBe(2400);
    });

    it("calculates distance between points in feet", () => {
        const a = { x: 0, y: 0 };
        const b = { x: 300, y: 400 }; // 500 pixels = 5 cells = 25 feet
        expect(distancePixels(a, b)).toBe(500);
        expect(distanceFeet(a, b, grid)).toBe(25);
    });

    it("correctly enforces range clamping (e.g. Eldritch Blast 120 ft)", () => {
        const caster = { x: 0, y: 0 };
        const validTarget = { x: 2000, y: 0 }; // 2000 px = 20 cells = 100 ft <= 120 ft
        const outOfRangeTarget = { x: 2800, y: 0 }; // 2800 px = 28 cells = 140 ft > 120 ft

        const check1 = isWithinRange(caster, validTarget, 120, grid);
        expect(check1.withinRange).toBe(true);
        expect(check1.currentDistanceFeet).toBe(100);

        const check2 = isWithinRange(caster, outOfRangeTarget, 120, grid);
        expect(check2.withinRange).toBe(false);
        expect(check2.currentDistanceFeet).toBe(140);

        // Spell Sniper feat (2x range)
        const check3 = isWithinRange(caster, outOfRangeTarget, 120, grid, 2);
        expect(check3.withinRange).toBe(true);
        expect(check3.effectiveMaxRangeFeet).toBe(240);
    });

    it("allows 5ft melee reach targeting on adjacent orthogonal and diagonal cells", () => {
        const caster = { x: 500, y: 500 };
        const orthogonalTarget = { x: 600, y: 500 }; // 1 cell East (5 ft)
        const diagonalTarget = { x: 600, y: 600 }; // 1 cell SE (diagonal, 7.07 ft Euclidean, 5 ft Chebyshev)
        const twoCellsAway = { x: 700, y: 500 }; // 2 cells East (10 ft)

        const orthoCheck = isWithinRange(caster, orthogonalTarget, 5, grid);
        expect(orthoCheck.withinRange).toBe(true);
        expect(orthoCheck.currentDistanceFeet).toBe(5);

        const diagCheck = isWithinRange(caster, diagonalTarget, 5, grid);
        expect(diagCheck.withinRange).toBe(true);
        expect(diagCheck.currentDistanceFeet).toBe(5);

        const farCheck = isWithinRange(caster, twoCellsAway, 5, grid);
        expect(farCheck.withinRange).toBe(false);
    });

    it("correctly detects points in a Sphere / Circle AoE", () => {
        const center = { x: 500, y: 500 };
        const radiusPixels = 200; // 10 ft radius

        expect(isPointInSphere({ x: 500, y: 600 }, center, radiusPixels)).toBe(true);
        expect(isPointInSphere({ x: 500, y: 700 }, center, radiusPixels)).toBe(true);
        expect(isPointInSphere({ x: 500, y: 750 }, center, radiusPixels)).toBe(false);
    });

    it("correctly detects points in a Cone AoE", () => {
        const origin = { x: 0, y: 0 };
        const cursor = { x: 100, y: 0 }; // pointing straight East along +X
        const coneLength = 300; // 15 ft cone

        // In front along axis
        expect(isPointInCone({ x: 200, y: 0 }, origin, cursor, coneLength)).toBe(true);
        // Slightly off axis within 53 degree cone
        expect(isPointInCone({ x: 200, y: 50 }, origin, cursor, coneLength)).toBe(true);
        // Behind the caster
        expect(isPointInCone({ x: -100, y: 0 }, origin, cursor, coneLength)).toBe(false);
        // Beyond cone length
        expect(isPointInCone({ x: 400, y: 0 }, origin, cursor, coneLength)).toBe(false);
    });

    it("correctly detects points in a Line AoE", () => {
        const origin = { x: 0, y: 0 };
        const cursor = { x: 1000, y: 0 }; // line along X axis
        const lineLength = 600; // 30 ft
        const lineWidth = 100; // 5 ft

        expect(isPointInLine({ x: 300, y: 20 }, origin, cursor, lineLength, lineWidth)).toBe(true);
        expect(isPointInLine({ x: 300, y: 60 }, origin, cursor, lineLength, lineWidth)).toBe(false);
        expect(isPointInLine({ x: 700, y: 0 }, origin, cursor, lineLength, lineWidth)).toBe(false);
    });

    it("correctly detects points in a Cube AoE", () => {
        const center = { x: 500, y: 500 };
        const cubeSize = 300; // 15 ft cube

        expect(isPointInCube({ x: 550, y: 550 }, center, cubeSize)).toBe(true);
        expect(isPointInCube({ x: 700, y: 500 }, center, cubeSize)).toBe(false);
    });

    it("computes affected grid cells for a Fireball (Sphere 20ft radius) matching exact 5e template", () => {
        const template: AoETemplate = {
            shape: "Sphere",
            origin: { x: 0, y: 0 },
            cursor: { x: 500, y: 500 }, // Grid intersection at (500, 500)
            sizeFeet: 20 // 20 ft radius = 4 cells radius = 8 cells diameter
        };

        const cells = getAffectedGridCells(template, grid);
        // The standard D&D 5e 20ft sphere template on a 5ft grid covers exactly 52 squares:
        // rows: 4, 6, 8, 8, 8, 8, 6, 4 (4+6+8+8+8+8+6+4 = 52)
        expect(cells.length).toBe(52);

        // Group by row (y) and check widths
        const rowCounts = new Map<number, number>();
        for (const cell of cells) {
            rowCounts.set(cell.y, (rowCounts.get(cell.y) ?? 0) + 1);
        }
        const sortedRowCounts = Array.from(rowCounts.entries())
            .sort((a, b) => a[0] - b[0])
            .map(e => e[1]);
        expect(sortedRowCounts).toEqual([4, 6, 8, 8, 8, 8, 6, 4]);
    });

    it("snaps arbitrary positions to the true cell center", () => {
        // With cellCenterOffset = (50, 50) and dpi = 100
        const testGrid: GridInfo = {
            dpi: 100,
            scaleMultiplier: 5,
            cellCenterOffset: { x: 50, y: 50 }
        };
        // Points inside the cell [0, 100] x [0, 100] should all snap to (50, 50)
        expect(snapToCellCenter({ x: 10, y: 10 }, testGrid)).toEqual({ x: 50, y: 50 });
        expect(snapToCellCenter({ x: 50, y: 50 }, testGrid)).toEqual({ x: 50, y: 50 });
        expect(snapToCellCenter({ x: 90, y: 90 }, testGrid)).toEqual({ x: 50, y: 50 });
    });

    it("computes affected grid cells for Burning Hands (Cone 15ft) with no gap and without hitting caster", () => {
        const testGrid: GridInfo = {
            dpi: 100,
            scaleMultiplier: 5,
            cellCenterOffset: { x: 50, y: 50 }
        };
        const casterPos = { x: 50, y: 350 }; // Row y=3, Col x=0

        // 1. Aim straight North (y < 350)
        const templateNorth: AoETemplate = {
            shape: "Cone",
            origin: casterPos,
            cursor: { x: 50, y: 50 },
            sizeFeet: 15
        };
        const cellsNorth = getAffectedGridCells(templateNorth, testGrid);
        
        // Must NOT contain the caster's own cell (x=0, y=3)
        expect(cellsNorth.some(c => c.x === 0 && c.y === 3)).toBe(false);
        // MUST contain the directly adjacent cell in front (x=0, y=2)
        expect(cellsNorth.some(c => c.x === 0 && c.y === 2)).toBe(true);
        // Exactly 3 cells long along axis (y=2, y=1, y=0)
        expect(cellsNorth.some(c => c.x === 0 && c.y === 1)).toBe(true);
        expect(cellsNorth.some(c => c.x === 0 && c.y === 0)).toBe(true);
        // Symmetrical along X axis (at furthest row y=0, width includes x=-1, x=0, x=1)
        expect(cellsNorth.some(c => c.x === -1 && c.y === 0)).toBe(true);
        expect(cellsNorth.some(c => c.x === 1 && c.y === 0)).toBe(true);

        // 2. Aim straight East (x > 50)
        const templateEast: AoETemplate = {
            shape: "Cone",
            origin: casterPos,
            cursor: { x: 450, y: 350 },
            sizeFeet: 15
        };
        const cellsEast = getAffectedGridCells(templateEast, testGrid);
        // Must NOT contain caster cell (x=0, y=3)
        expect(cellsEast.some(c => c.x === 0 && c.y === 3)).toBe(false);
        // MUST contain the directly adjacent cell in front (x=1, y=3)
        expect(cellsEast.some(c => c.x === 1 && c.y === 3)).toBe(true);
    });

    it("computes affected grid cells for Thunderwave (Cube 15ft) covering exactly 3x3 (9) cells", () => {
        const testGrid: GridInfo = {
            dpi: 100,
            scaleMultiplier: 5,
            cellCenterOffset: { x: 50, y: 50 }
        };
        const template: AoETemplate = {
            shape: "Cube",
            origin: { x: 50, y: 50 },
            cursor: { x: 250, y: 250 }, // Cell center of (x=2, y=2)
            sizeFeet: 15
        };
        const cells = getAffectedGridCells(template, testGrid);
        expect(cells.length).toBe(9); // 3x3 = 9 cells
        // Bounded by x in [1, 3] and y in [1, 3]
        for (const cell of cells) {
            expect(cell.x).toBeGreaterThanOrEqual(1);
            expect(cell.x).toBeLessThanOrEqual(3);
            expect(cell.y).toBeGreaterThanOrEqual(1);
            expect(cell.y).toBeLessThanOrEqual(3);
        }
    });

    it("computes affected grid cells for Entangle (Cube 20ft) covering exactly 4x4 (16) cells", () => {
        const testGrid: GridInfo = {
            dpi: 100,
            scaleMultiplier: 5,
            cellCenterOffset: { x: 50, y: 50 }
        };
        const template: AoETemplate = {
            shape: "Cube",
            origin: { x: 50, y: 50 },
            cursor: { x: 300, y: 300 }, // Snaps to corner (300, 300)
            sizeFeet: 20
        };
        const cells = getAffectedGridCells(template, testGrid);
        expect(cells.length).toBe(16); // 4x4 = 16 cells
    });

    it("computes affected grid cells for Lightning Bolt (Line 100ft x 5ft) covering 20 cells along axis", () => {
        const testGrid: GridInfo = {
            dpi: 100,
            scaleMultiplier: 5,
            cellCenterOffset: { x: 50, y: 50 }
        };
        const casterPos = { x: 50, y: 50 }; // Cell (0, 0)
        const template: AoETemplate = {
            shape: "Line",
            origin: casterPos,
            cursor: { x: 2500, y: 50 }, // Aiming straight East along row y=0
            sizeFeet: 100,
            widthFeet: 5
        };
        const cells = getAffectedGridCells(template, testGrid);
        // Excludes caster cell (0, 0)
        expect(cells.some(c => c.x === 0 && c.y === 0)).toBe(false);
        // Covers 20 cells from x=1 to x=20
        expect(cells.length).toBe(20);
        for (let x = 1; x <= 20; x++) {
            expect(cells.some(c => c.x === x && c.y === 0)).toBe(true);
        }
    });

    describe("3D Segment Distance and Sphere Intersection", () => {
        const testGrid: GridInfo = {
            dpi: 100, // 100px = 5ft => 20px per foot
            scaleMultiplier: 5
        };

        it("calculates 3D distance from point to segment correctly on ground", () => {
            // Segment from (-200, 0, 0) to (200, 0, 0) (x=-10ft to +10ft)
            // Point C at (0, 0, 0) is on the segment => distance 0
            const a: Point3D = { x: -200, y: 0, z: 0 };
            const b: Point3D = { x: 200, y: 0, z: 0 };
            const c: Point3D = { x: 0, y: 0, z: 0 };

            expect(distancePoint3DToSegment3DFeet(c, a, b, testGrid)).toBeCloseTo(0, 5);
        });

        it("detects sphere intersection when segment passes through sphere in 3D", () => {
            // Sphere at center (0, 0, 0) with radius 15ft
            const sphere: Point3D = { x: 0, y: 0, z: 0 };
            // Segment passing through center at height z = 5ft
            const caster: Point3D = { x: -600, y: 0, z: 5 }; // -30ft
            const target: Point3D = { x: 600, y: 0, z: 5 }; // +30ft

            expect(doesSegmentIntersectSphere3D(caster, target, sphere, 15, testGrid)).toBe(true);
        });

        it("detects segment passing OVER sphere when caster flies high enough", () => {
            // Sphere at center (0, 0, 0) with radius 15ft
            const sphere: Point3D = { x: 0, y: 0, z: 0 };
            // Caster flying at 35ft height at x=-600 (-30ft), target on ground at x=600 (+30ft, z=0)
            // Midpoint at x=0 has height z = 17.5ft > 15ft radius!
            const caster: Point3D = { x: -600, y: 0, z: 35 };
            const target: Point3D = { x: 600, y: 0, z: 0 };

            expect(doesSegmentIntersectSphere3D(caster, target, sphere, 15, testGrid)).toBe(false);
        });

        it("detects flying caster directly above darkness sphere targeting outside", () => {
            // Sphere at center (0, 0, 0) with radius 15ft
            const sphere: Point3D = { x: 0, y: 0, z: 0 };
            // Caster hovering directly above sphere center at 30ft height (x=0, y=0, z=30)
            // Target is outside at x=1000 (50ft away), z=0
            const caster: Point3D = { x: 0, y: 0, z: 30 };
            const target: Point3D = { x: 1000, y: 0, z: 0 };

            // Segment goes from (0, 0, 30) to (50, 0, 0) ft. Shortest dist to (0,0,0) is > 15ft
            expect(doesSegmentIntersectSphere3D(caster, target, sphere, 15, testGrid)).toBe(false);
        });
    });

    describe("Token Footprint & 5e Edge-to-Edge Range Mechanics", () => {
        const combatGrid: GridInfo = {
            dpi: 100, // 100px per cell
            scaleMultiplier: 5, // 5 ft per cell
            cellCenterOffset: { x: 50, y: 50 }
        };

        const mediumToken = {
            id: "token-medium",
            layer: "CHARACTER",
            position: { x: 50, y: 50 },
            image: { width: 100, height: 100 },
            grid: { dpi: 100 },
            scale: { x: 1, y: 1 }
        } as any;

        const largeToken = {
            id: "token-large-devil",
            layer: "CHARACTER",
            position: { x: 200, y: 100 }, // 2x2 cells (bounds [100, 300] x [0, 200])
            image: { width: 200, height: 200 },
            grid: { dpi: 100 },
            scale: { x: 1, y: 1 }
        } as any;

        it("calculates accurate token footprint bounds and occupied cells", () => {
            const fpMed = getTokenFootprint(mediumToken, combatGrid);
            expect(fpMed.sizeInSquares).toBe(1);
            expect(fpMed.bounds.minX).toBe(0);
            expect(fpMed.bounds.maxX).toBe(100);
            expect(fpMed.bounds.minY).toBe(0);
            expect(fpMed.bounds.maxY).toBe(100);

            const fpLarge = getTokenFootprint(largeToken, combatGrid);
            expect(fpLarge.sizeInSquares).toBe(2);
            expect(fpLarge.bounds.minX).toBe(100);
            expect(fpLarge.bounds.maxX).toBe(300);
            expect(fpLarge.bounds.minY).toBe(0);
            expect(fpLarge.bounds.maxY).toBe(200);
            expect(fpLarge.occupiedCells.length).toBeGreaterThanOrEqual(4);
        });

        it("resolves irregular cutout token when clicking transparent area / wing / horn", () => {
            // Pointer clicks near the outstretched wing edge of the large horned devil (x=290, y=30)
            const wingClick = { x: 290, y: 30 };
            const inside = isPointInTokenFootprint(wingClick, largeToken, combatGrid);
            expect(inside).toBe(true);

            // Even if OBR event.target is undefined (transparent pixel), resolveCombatTargetTokenAtPoint finds the token!
            const resolved = resolveCombatTargetTokenAtPoint(wingClick, [mediumToken, largeToken], combatGrid, undefined);
            expect(resolved?.id).toBe("token-large-devil");
        });

        it("anchors tether to the closest cell of a large token instead of far center", () => {
            // Medium token at (50, 50). Large token spans x=[100, 300], y=[0, 200]
            // Center is at (200, 100), but closest occupied cell to (50, 50) is at (150, 50)
            const closestAnchor = getTokenClosestPointToPoint(largeToken, mediumToken.position, combatGrid);
            expect(closestAnchor.x).toBe(150);
            expect(closestAnchor.y).toBe(50);
        });

        it("evaluates adjacent tokens as 5 ft distance in 5e rules", () => {
            // mediumToken is at (50, 50), adjacent to largeToken starting at x=100
            const dist = calculateTokenEdgeDistanceFeet(mediumToken, largeToken, combatGrid);
            expect(dist).toBe(5);

            // A 5ft melee attack reaches the large creature
            const rangeCheck = isWithinTokenRange(mediumToken, largeToken, 5, combatGrid);
            expect(rangeCheck.withinRange).toBe(true);
            expect(rangeCheck.currentDistanceFeet).toBe(5);
        });

        it("evaluates separated tokens correctly (1 square gap = 10 ft away)", () => {
            const farToken = {
                id: "token-far",
                layer: "CHARACTER",
                position: { x: 250, y: 50 }, // bounds [200, 300], gap between medium [0,100] and far is 100px = 1 square
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 }
            } as any;

            const dist = calculateTokenEdgeDistanceFeet(mediumToken, farToken, combatGrid);
            expect(dist).toBe(10);

            // 5ft melee reach fails
            const meleeCheck = isWithinTokenRange(mediumToken, farToken, 5, combatGrid);
            expect(meleeCheck.withinRange).toBe(false);
            expect(meleeCheck.currentDistanceFeet).toBe(10);

            // 10ft reach or ranged attack succeeds
            const reachCheck = isWithinTokenRange(mediumToken, farToken, 10, combatGrid);
            expect(reachCheck.withinRange).toBe(true);
        });

        it("correctly handles Huge (3x3, 15ft) winged monster: adjacent player is always in 5ft melee reach", () => {
            // Huge Horned Devil centered at cell (col 2, row 1) = (250, 150)
            // 3x3 combat base covers columns 1, 2, 3 (x in [100, 400]) and rows 0, 1, 2 (y in [0, 300])
            // Image has wide wingspan: width 500px (spans x in [0, 500], 5 cells wide!)
            const hugeWingedDevil = {
                id: "token-huge-devil",
                layer: "CHARACTER",
                position: { x: 250, y: 150 },
                image: { width: 500, height: 300 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 },
                metadata: {
                    "embers/combatSpace": {
                        sizeInSquares: 3,
                        sizeCategory: "Huge",
                        sizeFeet: 15
                    }
                }
            } as any;

            const footprint = getTokenFootprint(hugeWingedDevil, combatGrid);
            expect(footprint.sizeInSquares).toBe(3);
            expect(footprint.occupiedCells.length).toBe(9); // exactly 3x3 = 9 cells
            expect(footprint.combatBounds.minX).toBe(100);
            expect(footprint.combatBounds.maxX).toBe(400);
            expect(footprint.combatBounds.minY).toBe(0);
            expect(footprint.combatBounds.maxY).toBe(300);

            // Visual bounds include the full 500px wingspan
            expect(footprint.bounds.minX).toBe(0);
            expect(footprint.bounds.maxX).toBe(500);

            // 1. Player is in column 0, row 1 (x=50, y=150) - directly adjacent to the Huge monster's left side (col 1, row 1)
            const adjacentPlayer = {
                id: "player-leaf",
                layer: "CHARACTER",
                position: { x: 50, y: 150 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 }
            } as any;

            // Tether anchors to the adjacent cell (col 1, row 1 at x=150, y=150), NOT far center (250, 150)!
            const anchor = getTokenClosestPointToPoint(hugeWingedDevil, adjacentPlayer.position, combatGrid);
            expect(anchor.x).toBe(150);
            expect(anchor.y).toBe(150);

            // Distance is 5 ft (within 5 ft melee reach)
            const dist = calculateTokenEdgeDistanceFeet(adjacentPlayer, hugeWingedDevil, combatGrid);
            expect(dist).toBe(5);

            const meleeCheck = isWithinTokenRange(adjacentPlayer, hugeWingedDevil, 5, combatGrid);
            expect(meleeCheck.withinRange).toBe(true);
            expect(meleeCheck.currentDistanceFeet).toBe(5);

            // 2. Player is diagonally adjacent at top-left corner (col 0, row -1 at x=50, y=-50)
            const diagonalPlayer = {
                id: "player-diagonal",
                layer: "CHARACTER",
                position: { x: 50, y: -50 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 }
            } as any;
            const diagDist = calculateTokenEdgeDistanceFeet(diagonalPlayer, hugeWingedDevil, combatGrid);
            expect(diagDist).toBe(5);
            expect(isWithinTokenRange(diagonalPlayer, hugeWingedDevil, 5, combatGrid).withinRange).toBe(true);

            // 3. Player at col -1 (x=-50, y=150) is directly adjacent to the outstretched wing at col 0 -> 5 ft melee reach!
            const wingAdjacentPlayer = {
                id: "player-wing-adjacent",
                layer: "CHARACTER",
                position: { x: -50, y: 150 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 }
            } as any;
            const wingDist = calculateTokenEdgeDistanceFeet(wingAdjacentPlayer, hugeWingedDevil, combatGrid);
            expect(wingDist).toBe(5);
            expect(isWithinTokenRange(wingAdjacentPlayer, hugeWingedDevil, 5, combatGrid).withinRange).toBe(true);

            // 4. Player at col -2 (x=-150, y=150) is separated by 1 full square gap from the wing -> 10 ft away!
            const separatedPlayer = {
                id: "player-separated",
                layer: "CHARACTER",
                position: { x: -150, y: 150 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 }
            } as any;
            const sepDist = calculateTokenEdgeDistanceFeet(separatedPlayer, hugeWingedDevil, combatGrid);
            expect(sepDist).toBe(10);
            expect(isWithinTokenRange(separatedPlayer, hugeWingedDevil, 5, combatGrid).withinRange).toBe(false);

            // 5. Clicking the outstretched wing at x=480 (outside the 3x3 combat base) resolves the monster
            const wingClick = { x: 480, y: 150 };
            const resolved = resolveCombatTargetTokenAtPoint(wingClick, [adjacentPlayer, hugeWingedDevil], combatGrid);
            expect(resolved?.id).toBe("token-huge-devil");
        });

        it("resolves PROP and MOUNT layers as valid combat targets with CHARACTER precedence", () => {
            const propMonster = {
                id: "token-prop-monster",
                layer: "PROP",
                position: { x: 150, y: 150 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 },
                visible: true,
            } as any;

            const charMonster = {
                id: "token-char-monster",
                layer: "CHARACTER",
                position: { x: 150, y: 150 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 },
                visible: true,
            } as any;

            // Single prop token resolves cleanly
            const resolvedProp = resolveCombatTargetTokenAtPoint({ x: 150, y: 150 }, [propMonster], combatGrid);
            expect(resolvedProp?.id).toBe("token-prop-monster");

            // When overlapping, CHARACTER layer takes precedence
            const resolvedBoth = resolveCombatTargetTokenAtPoint({ x: 150, y: 150 }, [propMonster, charMonster], combatGrid);
            expect(resolvedBoth?.id).toBe("token-char-monster");
        });

        it("allows player standing under wings of a wide token to strike in 5ft melee reach", () => {
            // An unbound winged devil placed on board (1x1 combat base at x=250, y=150, but wingspan [50, 450])
            const unboundDevil = {
                id: "token-unbound-devil",
                layer: "PROP",
                position: { x: 250, y: 150 },
                image: { width: 400, height: 200 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 },
                visible: true,
            } as any;

            // Player Leaf standing at x=150, y=150 (under the devil's left wing)
            const leafPlayer = {
                id: "leaf",
                layer: "CHARACTER",
                position: { x: 150, y: 150 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 },
                visible: true,
            } as any;

            // 1. Edge distance is within 5 ft reach because Leaf is inside the visual wingspan
            const dist = calculateTokenEdgeDistanceFeet(leafPlayer, unboundDevil, combatGrid);
            expect(dist).toBe(5);

            const meleeCheck = isWithinTokenRange(leafPlayer, unboundDevil, 5, combatGrid);
            expect(meleeCheck.withinRange).toBe(true);
            expect(meleeCheck.currentDistanceFeet).toBe(5);

            // 2. Anchor point snaps to the closest space near the player rather than far center
            const anchor = getTokenClosestPointToPoint(unboundDevil, leafPlayer.position, combatGrid);
            expect(anchor.x).toBe(150);
            expect(anchor.y).toBe(150);
        });

        it("allows player adjacent to the wingtip of a DM-scaled Huge monster to strike in 5ft melee reach", () => {
            // A Huge monster (3x3 base at x=550, y=550) scaled by DM to have an expansive wingspan
            // Image width 600, height 300, scale 2.0 -> visualWidth = 1200px (12 squares!), x range [ -50, 1150 ]
            const dmScaledDevil = {
                id: "token-huge-devil",
                layer: "CHARACTER",
                position: { x: 550, y: 550 },
                image: { width: 600, height: 300 },
                grid: { dpi: 100 },
                scale: { x: 2, y: 2 },
                metadata: {
                    "embers/combat-space": {
                        sizeInSquares: 3,
                        sizeCategory: "Huge",
                        sizeFeet: 15,
                    },
                },
                visible: true,
            } as any;

            // Player Leaf standing at cell x=1250, y=550 (immediately adjacent to the right wingtip at x=1150)
            const leafPlayer = {
                id: "leaf-adjacent",
                layer: "CHARACTER",
                position: { x: 1250, y: 550 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 },
                visible: true,
            } as any;

            // 1. Edge distance is 5 ft because Leaf is immediately adjacent to the right wing
            const dist = calculateTokenEdgeDistanceFeet(leafPlayer, dmScaledDevil, combatGrid);
            expect(dist).toBe(5);

            // 2. Melee weapon range (5 ft) is in range
            const meleeCheck = isWithinTokenRange(leafPlayer, dmScaledDevil, 5, combatGrid);
            expect(meleeCheck.withinRange).toBe(true);
            expect(meleeCheck.currentDistanceFeet).toBe(5);

            // 3. Clicking directly on the wingtip (x=1140, y=550) resolves the monster as combat target
            const target = resolveCombatTargetTokenAtPoint({ x: 1140, y: 550 }, [dmScaledDevil], combatGrid);
            expect(target?.id).toBe("token-huge-devil");

            // 4. Anchor point snaps to the closest occupied combat cell to Leaf (x=650, y=550) rather than far center (x=550)
            const anchor = getTokenClosestPointToPoint(dmScaledDevil, leafPlayer.position, combatGrid);
            expect(anchor.x).toBe(650);
            expect(anchor.y).toBe(550);
        });

        it("does not force Large 2x2 size on a 1x1 token when bound-monster metadata has size: Large", () => {
            const tokenBoundToLargeMonster = {
                id: "token-dire-wolf",
                layer: "CHARACTER",
                position: { x: 104, y: 159.5 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 },
                metadata: {
                    "embers/bound-monster": {
                        name: "Dire Wolf",
                        size: "Large"
                    }
                }
            } as any;

            const sizeInSquares = getTokenSizeInSquares(tokenBoundToLargeMonster, combatGrid);
            expect(sizeInSquares).toBe(1);

            const footprint = getTokenFootprint(tokenBoundToLargeMonster, combatGrid);
            expect(footprint.sizeInSquares).toBe(1);
            expect(footprint.occupiedCells.length).toBe(1);
            // Center stays aligned with the cell center of the token, preventing 1-square drift
            expect(footprint.center.x).toBe(150);
            expect(footprint.center.y).toBe(150);
        });

        it("safely falls back to token position if calculated anchor drifts outside token visual bounds", () => {
            const token = {
                id: "token-test",
                layer: "CHARACTER",
                position: { x: 100, y: 100 },
                image: { width: 100, height: 100 },
                grid: { dpi: 100 },
                scale: { x: 1, y: 1 },
            } as any;

            const anchor = getTokenClosestPointToPoint(token, { x: 9999, y: 9999 }, combatGrid);
            expect(anchor).toBeDefined();
            expect(anchor.x).toBeGreaterThanOrEqual(token.position.x - 100);
            expect(anchor.x).toBeLessThanOrEqual(token.position.x + 100);
        });
    });
});


