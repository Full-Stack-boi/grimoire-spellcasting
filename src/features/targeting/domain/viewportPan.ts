/**
 * Pure viewport-pan math for Owlbear Rodeo.
 *
 * OBR relationship: screen = world * scale + viewportPosition
 * Tool events report `pointerPosition` in WORLD coordinates, computed with the
 * viewport that was active when the event was produced.
 *
 * Anchor-point panning keeps the world point grabbed at drag start under the
 * finger. After applying V' = V + (W - A) * k, the world point under the same
 * finger becomes (S - V') / k = A, so the next delta is zero (no feedback runaway).
 */
export interface Vec2 {
  x: number;
  y: number;
}

/** Finger jitter tolerance (screen px) used to distinguish a tap from a drag. */
export const TAP_SLOP_PX = 10;

export function computeAnchoredViewport(
  anchorWorld: Vec2,
  pointerWorld: Vec2,
  viewport: Vec2,
  scale: number,
): Vec2 {
  return {
    x: viewport.x + (pointerWorld.x - anchorWorld.x) * scale,
    y: viewport.y + (pointerWorld.y - anchorWorld.y) * scale,
  };
}

/** Screen-pixel distance between two world points at the given viewport scale. */
export function screenDistance(a: Vec2, b: Vec2, scale: number): number {
  return Math.hypot(a.x - b.x, a.y - b.y) * scale;
}
