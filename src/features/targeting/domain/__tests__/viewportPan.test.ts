import { describe, it, expect } from "vitest";
import { computeAnchoredViewport, screenDistance } from "../viewportPan";
import { ViewportPanController } from "../../infrastructure/obr/viewportPanController";

const flush = () => new Promise((r) => setTimeout(r, 0));

/** Simulates OBR's viewport: screen = world * scale + position. */
function createFakeObr(initial = { x: 100, y: 50 }, scale = 1) {
  const state = { position: { ...initial }, scale, setCalls: 0 };
  return {
    state,
    toWorld: (screen: { x: number; y: number }) => ({
      x: (screen.x - state.position.x) / state.scale,
      y: (screen.y - state.position.y) / state.scale,
    }),
    access: {
      getPosition: async () => ({ ...state.position }),
      getScale: async () => state.scale,
      setPosition: async (p: { x: number; y: number }) => {
        state.setCalls += 1;
        state.position = { ...p };
      },
    },
  };
}

describe("viewportPan math", () => {
  it("moves the viewport in the same direction as the finger", () => {
    const next = computeAnchoredViewport({ x: 0, y: 0 }, { x: 10, y: -5 }, { x: 0, y: 0 }, 1);
    expect(next).toEqual({ x: 10, y: -5 });
  });

  it.each([0.5, 1, 2])("scales world deltas into screen pixels at scale %s", (k) => {
    const next = computeAnchoredViewport({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 5 }, k);
    expect(next.x).toBeCloseTo(5 + 10 * k);
    expect(screenDistance({ x: 0, y: 0 }, { x: 3, y: 4 }, k)).toBeCloseTo(5 * k);
  });
});

describe("ViewportPanController", () => {
  it.each([0.5, 1, 2.5])("keeps the grabbed point under the finger over a long drag (scale %s, no runaway)", async (k) => {
    const obr = createFakeObr({ x: 100, y: 50 }, k);
    const ctrl = new ViewportPanController(obr.access);
    const finger = { x: 300, y: 300 };
    const anchor = obr.toWorld(finger);
    ctrl.begin(anchor, false);
    await flush();

    for (let i = 0; i < 50; i++) {
      finger.x += 7;
      finger.y -= 3;
      ctrl.move(obr.toWorld(finger));
      await flush();
    }
    const result = ctrl.end(obr.toWorld(finger));
    await flush();

    expect(result).toBe("pan");
    const underFinger = obr.toWorld(finger);
    expect(screenDistance(underFinger, anchor, k)).toBeLessThan(0.01);
  });

  it("drops stale events that arrive while setPosition is in flight", async () => {
    const obr = createFakeObr();
    const ctrl = new ViewportPanController(obr.access);
    const finger = { x: 0, y: 0 };
    const anchor = obr.toWorld(finger);
    ctrl.begin(anchor, false);
    await flush();

    // Burst of events computed with the same (old) viewport before OBR replies.
    finger.x = 40;
    ctrl.move(obr.toWorld(finger));
    finger.x = 60;
    ctrl.move(obr.toWorld(finger));
    finger.x = 80;
    ctrl.move(obr.toWorld(finger));
    expect(obr.state.setCalls).toBe(1);
    await flush();

    ctrl.move(obr.toWorld(finger));
    await flush();
    ctrl.end(obr.toWorld(finger));
    await flush();
    expect(screenDistance(obr.toWorld(finger), anchor, 1)).toBeLessThan(0.01);
  });

  it("ignores moves before the initial viewport is known", () => {
    const obr = createFakeObr();
    const ctrl = new ViewportPanController(obr.access);
    ctrl.begin({ x: 0, y: 0 }, false);
    ctrl.move({ x: 100, y: 0 });
    expect(obr.state.setCalls).toBe(0);
  });

  it("reports a tap when movement stays within the slop", async () => {
    const obr = createFakeObr();
    const ctrl = new ViewportPanController(obr.access);
    ctrl.begin({ x: 0, y: 0 }, true);
    await flush();
    ctrl.move({ x: 3, y: 2 });
    expect(ctrl.end({ x: 4, y: 3 })).toBe("tap");
    expect(obr.state.setCalls).toBe(0);
  });

  it("never pans when the drag starts on a token", async () => {
    const obr = createFakeObr();
    const ctrl = new ViewportPanController(obr.access);
    ctrl.begin({ x: 0, y: 0 }, true);
    await flush();
    ctrl.move({ x: 80, y: 0 });
    await flush();
    expect(ctrl.end({ x: 120, y: 0 })).toBe("none");
    expect(obr.state.setCalls).toBe(0);
  });

  it("returns none after cancel", async () => {
    const obr = createFakeObr();
    const ctrl = new ViewportPanController(obr.access);
    ctrl.begin({ x: 0, y: 0 }, false);
    ctrl.cancel();
    expect(ctrl.end({ x: 0, y: 0 })).toBe("none");
  });
});
