import type { PathCommand } from "@owlbear-rodeo/sdk";

export const PathCommandType = {
    MOVE: 0,
    LINE: 1,
    QUAD: 2,
    CONIC: 3,
    CUBIC: 4,
    CLOSE: 5
} as const;

const contourCache = new Map<string, PathCommand[]>();

const ALPHA_THRESHOLD = 28;

type Point2D = [number, number];

/**
 * Calculates perpendicular distance from point to line segment.
 */
function perpendicularDistance(pt: Point2D, lineStart: Point2D, lineEnd: Point2D): number {
    const dx = lineEnd[0] - lineStart[0];
    const dy = lineEnd[1] - lineStart[1];
    const mag = Math.hypot(dx, dy);
    if (mag === 0) return Math.hypot(pt[0] - lineStart[0], pt[1] - lineStart[1]);
    return Math.abs(dy * pt[0] - dx * pt[1] + lineEnd[0] * lineStart[1] - lineEnd[1] * lineStart[0]) / mag;
}

/**
 * Douglas-Peucker polyline simplification.
 */
function simplifyDP(pts: Point2D[], epsilon: number): Point2D[] {
    if (pts.length <= 2) return pts;
    let dmax = 0;
    let index = 0;
    const end = pts.length - 1;
    for (let i = 1; i < end; i++) {
        const d = perpendicularDistance(pts[i], pts[0], pts[end]);
        if (d > dmax) {
            index = i;
            dmax = d;
        }
    }
    if (dmax > epsilon) {
        const rec1 = simplifyDP(pts.slice(0, index + 1), epsilon);
        const rec2 = simplifyDP(pts.slice(index), epsilon);
        return rec1.slice(0, rec1.length - 1).concat(rec2);
    } else {
        return [pts[0], pts[end]];
    }
}

/**
 * Chaikin's corner smoothing algorithm for closed or continuous loops.
 */
function chaikinSmooth(pts: Point2D[]): Point2D[] {
    if (pts.length < 3) return pts;
    const res: Point2D[] = [];
    const n = pts.length;
    for (let i = 0; i < n; i++) {
        const p0 = pts[i];
        const p1 = pts[(i + 1) % n];
        res.push([0.75 * p0[0] + 0.25 * p1[0], 0.75 * p0[1] + 0.25 * p1[1]]);
        res.push([0.25 * p0[0] + 0.75 * p1[0], 0.25 * p0[1] + 0.75 * p1[1]]);
    }
    return res;
}

interface GridSegment {
    e1: string;
    p1: Point2D;
    e2: string;
    p2: Point2D;
}

/**
 * Extracts a high-resolution, sub-pixel smoothed vector path contour outlining
 * the non-transparent alpha silhouette of a token image (character tokens, monsters, wings, horns).
 */
export async function extractImageContourCommands(
    imageUrl: string,
    width: number,
    height: number,
    offset: { x: number; y: number }
): Promise<PathCommand[]> {
    const cacheKey = `${imageUrl}_${width}_${height}_${offset.x}_${offset.y}`;
    const cached = contourCache.get(cacheKey);
    if (cached) return cached;

    if (typeof window === "undefined" || !window.document?.createElement) {
        const fallback = createFallbackBoxCommands(width, height, offset);
        contourCache.set(cacheKey, fallback);
        return fallback;
    }

    try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        await new Promise<void>((resolve, reject) => {
            if (img.complete && img.naturalWidth !== 0) return resolve();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Image load failed"));
            setTimeout(() => resolve(), 1500);
        });

        if (!img.naturalWidth || !img.naturalHeight) {
            return createFallbackBoxCommands(width, height, offset);
        }

        // High-definition grid for smooth, crisp curves
        const targetMax = 350;
        const scale = Math.min(1, targetMax / Math.max(img.naturalWidth, img.naturalHeight));
        const gw = Math.max(10, Math.round(img.naturalWidth * scale));
        const gh = Math.max(10, Math.round(img.naturalHeight * scale));

        // Pad grid by 2 cells so edge-touching token rims (circular pogs/coins)
        // are guaranteed to close gracefully instead of being abruptly clipped
        const pad = 2;
        const pw = gw + pad * 2;
        const ph = gh + pad * 2;

        const canvas = document.createElement("canvas");
        canvas.width = pw;
        canvas.height = ph;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return createFallbackBoxCommands(width, height, offset);

        ctx.drawImage(img, pad, pad, gw, gh);
        const imgData = ctx.getImageData(0, 0, pw, ph);
        const data = imgData.data;

        function getAlpha(x: number, y: number): number {
            if (x < 0 || y < 0 || x >= pw || y >= ph) return 0;
            return data[(y * pw + x) * 4 + 3];
        }

        function interp(v1: number, v2: number): number {
            if (Math.abs(v2 - v1) < 0.001) return 0.5;
            const t = (ALPHA_THRESHOLD - v1) / (v2 - v1);
            return Math.max(0, Math.min(1, t));
        }

        // Cache edge vertices using canonical integer edge keys to ensure zero
        // floating-point precision gaps across shared cell boundaries.
        const edgeVerts = new Map<string, Point2D>();
        function getEdgeVertex(key: string, compute: () => Point2D): Point2D {
            let pt = edgeVerts.get(key);
            if (!pt) {
                pt = compute();
                edgeVerts.set(key, pt);
            }
            return pt;
        }

        const segments: GridSegment[] = [];
        for (let y = 0; y < ph; y++) {
            for (let x = 0; x < pw; x++) {
                const vTL = getAlpha(x, y);
                const vTR = getAlpha(x + 1, y);
                const vBR = getAlpha(x + 1, y + 1);
                const vBL = getAlpha(x, y + 1);

                const tl = vTL >= ALPHA_THRESHOLD ? 8 : 0;
                const tr = vTR >= ALPHA_THRESHOLD ? 4 : 0;
                const br = vBR >= ALPHA_THRESHOLD ? 2 : 0;
                const bl = vBL >= ALPHA_THRESHOLD ? 1 : 0;
                const cellCase = tl | tr | br | bl;
                if (cellCase === 0 || cellCase === 15) continue;

                const kTop = `H_${x}_${y}`;
                const kRight = `V_${x + 1}_${y}`;
                const kBottom = `H_${x}_${y + 1}`;
                const kLeft = `V_${x}_${y}`;

                const pTop = () => [x + interp(vTL, vTR), y] as Point2D;
                const pRight = () => [x + 1, y + interp(vTR, vBR)] as Point2D;
                const pBottom = () => [x + interp(vBL, vBR), y + 1] as Point2D;
                const pLeft = () => [x, y + interp(vTL, vBL)] as Point2D;

                const addSeg = (k1: string, c1: () => Point2D, k2: string, c2: () => Point2D) => {
                    segments.push({
                        e1: k1, p1: getEdgeVertex(k1, c1),
                        e2: k2, p2: getEdgeVertex(k2, c2)
                    });
                };

                switch (cellCase) {
                    case 1: addSeg(kLeft, pLeft, kBottom, pBottom); break;
                    case 2: addSeg(kBottom, pBottom, kRight, pRight); break;
                    case 3: addSeg(kLeft, pLeft, kRight, pRight); break;
                    case 4: addSeg(kRight, pRight, kTop, pTop); break;
                    case 5:
                        addSeg(kLeft, pLeft, kTop, pTop);
                        addSeg(kBottom, pBottom, kRight, pRight);
                        break;
                    case 6: addSeg(kBottom, pBottom, kTop, pTop); break;
                    case 7: addSeg(kLeft, pLeft, kTop, pTop); break;
                    case 8: addSeg(kTop, pTop, kLeft, pLeft); break;
                    case 9: addSeg(kTop, pTop, kBottom, pBottom); break;
                    case 10:
                        addSeg(kTop, pTop, kRight, pRight);
                        addSeg(kLeft, pLeft, kBottom, pBottom);
                        break;
                    case 11: addSeg(kTop, pTop, kRight, pRight); break;
                    case 12: addSeg(kRight, pRight, kLeft, pLeft); break;
                    case 13: addSeg(kRight, pRight, kBottom, pBottom); break;
                    case 14: addSeg(kBottom, pBottom, kLeft, pLeft); break;
                }
            }
        }

        if (segments.length === 0) {
            return createFallbackBoxCommands(width, height, offset);
        }

        // Fast O(N) segment chaining via canonical Edge IDs
        interface EdgeLink { nextEdge: string; nextPt: Point2D; segIdx: number; }
        const adj = new Map<string, EdgeLink[]>();
        for (let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            let l1 = adj.get(seg.e1);
            if (!l1) { l1 = []; adj.set(seg.e1, l1); }
            l1.push({ nextEdge: seg.e2, nextPt: seg.p2, segIdx: i });

            let l2 = adj.get(seg.e2);
            if (!l2) { l2 = []; adj.set(seg.e2, l2); }
            l2.push({ nextEdge: seg.e1, nextPt: seg.p1, segIdx: i });
        }

        const visitedSegs = new Uint8Array(segments.length);
        const rawLoops: Point2D[][] = [];

        for (let i = 0; i < segments.length; i++) {
            if (visitedSegs[i]) continue;
            visitedSegs[i] = 1;
            const poly: Point2D[] = [segments[i].p1, segments[i].p2];
            let currEdge = segments[i].e2;

            let extended = true;
            while (extended) {
                extended = false;
                const neighbors = adj.get(currEdge) || [];
                for (const n of neighbors) {
                    if (!visitedSegs[n.segIdx]) {
                        visitedSegs[n.segIdx] = 1;
                        poly.push(n.nextPt);
                        currEdge = n.nextEdge;
                        extended = true;
                        break;
                    }
                }
            }
            // Keep meaningful creature loops (skip tiny sub-pixel noise)
            if (poly.length >= 20) {
                rawLoops.push(poly);
            }
        }

        // Coordinate transformation function mapping padded grid back to scene coordinates
        function toSceneCoords(gx: number, gy: number): Point2D {
            const u = (gx - pad) / gw;
            const v = (gy - pad) / gh;
            const rx = u * width - offset.x;
            const ry = v * height - offset.y;
            return [Math.round(rx * 10) / 10, Math.round(ry * 10) / 10];
        }

        // Process loops with Douglas-Peucker simplification and Chaikin smoothing
        const commands: PathCommand[] = [];

        for (const loop of rawLoops) {
            const simplified = simplifyDP(loop, 0.35);
            const smoothed = chaikinSmooth(simplified);
            if (smoothed.length < 3) continue;

            const [startX, startY] = toSceneCoords(smoothed[0][0], smoothed[0][1]);
            commands.push([PathCommandType.MOVE, startX, startY]);

            for (let k = 1; k < smoothed.length; k++) {
                const [px, py] = toSceneCoords(smoothed[k][0], smoothed[k][1]);
                commands.push([PathCommandType.LINE, px, py]);
            }
            commands.push([PathCommandType.CLOSE]);
        }

        if (commands.length === 0) {
            return createFallbackBoxCommands(width, height, offset);
        }

        contourCache.set(cacheKey, commands);
        return commands;
    } catch {
        const fallback = createFallbackBoxCommands(width, height, offset);
        contourCache.set(cacheKey, fallback);
        return fallback;
    }
}

function createFallbackBoxCommands(width: number, height: number, offset: { x: number; y: number }): PathCommand[] {
    const left = -offset.x;
    const top = -offset.y;
    const right = width - offset.x;
    const bottom = height - offset.y;

    return [
        [PathCommandType.MOVE, left, top],
        [PathCommandType.LINE, right, top],
        [PathCommandType.LINE, right, bottom],
        [PathCommandType.LINE, left, bottom],
        [PathCommandType.CLOSE],
    ];
}

export function clearContourCache(): void {
    contourCache.clear();
}
