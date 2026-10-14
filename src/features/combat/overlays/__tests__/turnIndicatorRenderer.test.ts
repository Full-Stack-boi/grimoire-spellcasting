import { describe, it, expect, vi } from "vitest";

vi.mock("@owlbear-rodeo/sdk", () => {
  class MockShapeBuilder {
    private _item: any = {};
    id(id: string) { this._item.id = id; return this; }
    shapeType(t: string) { this._item.shapeType = t; return this; }
    position(p: any) { this._item.position = p; return this; }
    width(w: number) { this._item.width = w; return this; }
    height(h: number) { this._item.height = h; return this; }
    strokeColor(c: string) { this._item.strokeColor = c; return this; }
    strokeWidth(w: number) { this._item.strokeWidth = w; return this; }
    strokeOpacity(o: number) { this._item.strokeOpacity = o; return this; }
    strokeDash(d: any) { this._item.strokeDash = d; return this; }
    fillColor(c: string) { this._item.fillColor = c; return this; }
    fillOpacity(o: number) { this._item.fillOpacity = o; return this; }
    layer(l: string) { this._item.layer = l; return this; }
    disableHit(d: boolean) { this._item.disableHit = d; return this; }
    locked(l: boolean) { this._item.locked = l; return this; }
    build() { return this._item; }
  }
  return {
    default: {
      isReady: true,
    },
    buildShape: () => new MockShapeBuilder(),
  };
});

import {
  calculateTurnIndicatorGeometry,
  TURN_INDICATOR_RING_ID,
  TURN_INDICATOR_GLOW_ID,
} from "../turnIndicatorRenderer";

describe("turnIndicatorRenderer geometry calculations", () => {
  it("calculates center and radius based on item position and default dpi", () => {
    const item = {
      position: { x: 300, y: 450 },
    };
    const geometry = calculateTurnIndicatorGeometry(item, 150);
    // Position (300, 450) + half-size (75, 75) = (375, 525)
    expect(geometry.center).toEqual({ x: 375, y: 525 });
    // Default DPI = 150 -> baseSize 150 -> (150 / 2) * 1.15 = 86.25
    expect(geometry.radius).toBeCloseTo(86.25);
  });

  it("scales radius and offsets center appropriately for larger tokens", () => {
    const largeItem = {
      position: { x: 500, y: 600 },
      image: { width: 300, height: 300 },
      scale: { x: 2, y: 2 },
      grid: { dpi: 150 },
    };
    const geometry = calculateTurnIndicatorGeometry(largeItem, 150);
    // Position (500, 600) + half-size (300, 300) = (800, 900)
    expect(geometry.center).toEqual({ x: 800, y: 900 });
    // Base size = 300 * 2 = 600 -> radius = 300 * 1.15 = 345
    expect(geometry.radius).toBe(345);
  });

  it("exposes consistent IDs for outer ring and inner glow", () => {
    expect(TURN_INDICATOR_RING_ID).toContain("active-turn-ring");
    expect(TURN_INDICATOR_GLOW_ID).toContain("active-turn-glow");
  });

  it("buildTurnRingItems positions shapes precisely at geometry.center with red theme colors and 0 fill opacity", async () => {
    const { buildTurnRingItems } = await import("../turnIndicatorRenderer");
    const geometry = {
      center: { x: 375, y: 525 },
      radius: 86.25,
    };
    const [outer, inner] = (await buildTurnRingItems(geometry)) as any[];
    expect(outer).toBeDefined();
    expect(inner).toBeDefined();
    // Both outer ring and inner glow must be centered at geometry.center
    expect(outer.position).toEqual({ x: 375, y: 525 });
    expect(inner.position).toEqual({ x: 375, y: 525 });

    // Extension theme red colors
    expect(outer.strokeColor).toBe("#ef4444");
    expect(inner.strokeColor).toBe("#8b1d24");

    // Strictly 0 fill opacity so circle never washes over or tints token art
    expect(outer.fillOpacity).toBe(0.0);
    expect(inner.fillOpacity).toBe(0.0);

    // MOUNT renders under CHARACTER tokens so the ring cannot cover neighboring tokens.
    expect(outer.layer).toBe("MOUNT");
    expect(inner.layer).toBe("MOUNT");
  });
});
