import {
  computeAnchoredViewport,
  screenDistance,
  TAP_SLOP_PX,
  type Vec2,
} from "../../domain/viewportPan";

export interface ViewportAccess {
  getPosition: () => Promise<Vec2>;
  getScale: () => Promise<number>;
  setPosition: (position: Vec2) => Promise<void>;
}

/** Outcome of a finished drag gesture. */
export type PanGestureResult = "tap" | "pan" | "none";

/**
 * Drag-to-pan state machine for an OBR tool mode.
 *
 * - Ignores moves until the starting viewport/scale are known (no first-move jump).
 * - Drops move events that arrive while a setPosition is in flight: OBR's
 *   postMessage channel is FIFO, so those events were computed with the old
 *   viewport and would cause overshoot.
 * - Drags shorter than TAP_SLOP_PX are reported as "tap" so a slightly wobbly
 *   touch on a token still counts as a click.
 * - Drags that start on a token never pan.
 */
export class ViewportPanController {
  private active = false;
  private startedOnToken = false;
  private ready = false;
  private inFlight = false;
  private isPanning = false;
  private anchorWorld: Vec2 = { x: 0, y: 0 };
  private viewport: Vec2 = { x: 0, y: 0 };
  private scale = 1;
  private maxTravelPx = 0;
  private generation = 0;

  constructor(private readonly access: ViewportAccess, private readonly slopPx = TAP_SLOP_PX) {}

  get panning(): boolean {
    return this.isPanning;
  }

  begin(pointerWorld: Vec2, startedOnToken: boolean): void {
    this.generation += 1;
    const gen = this.generation;
    this.active = true;
    this.startedOnToken = startedOnToken;
    this.ready = false;
    this.inFlight = false;
    this.isPanning = false;
    this.anchorWorld = { x: pointerWorld.x, y: pointerWorld.y };
    this.maxTravelPx = 0;
    this.scale = 1;
    if (startedOnToken) return;
    Promise.all([this.access.getPosition(), this.access.getScale()])
      .then(([position, scale]) => {
        if (gen !== this.generation || !this.active) return;
        this.viewport = { x: position.x, y: position.y };
        this.scale = scale > 0 ? scale : 1;
        this.ready = true;
      })
      .catch(() => {});
  }

  move(pointerWorld: Vec2): void {
    if (!this.active) return;
    if (!this.isPanning) {
      // No viewport change applied yet, so world distance * scale == screen distance.
      const travel = screenDistance(pointerWorld, this.anchorWorld, this.scale);
      if (travel > this.maxTravelPx) this.maxTravelPx = travel;
    }
    if (this.startedOnToken || !this.ready || this.inFlight) return;
    if (!this.isPanning) {
      if (this.maxTravelPx < this.slopPx) return;
      this.isPanning = true;
    }
    this.apply(pointerWorld);
  }

  /** Finishes the gesture. Returns "tap" when the pointer barely moved. */
  end(pointerWorld?: Vec2): PanGestureResult {
    if (!this.active) return "none";
    if (pointerWorld && !this.isPanning) {
      const travel = screenDistance(pointerWorld, this.anchorWorld, this.scale);
      if (travel > this.maxTravelPx) this.maxTravelPx = travel;
    }
    let result: PanGestureResult;
    if (!this.isPanning && this.maxTravelPx < this.slopPx) {
      result = "tap";
    } else if (this.startedOnToken) {
      result = "none";
    } else {
      // Final correction only when the end event is fresh (no request in flight).
      if (pointerWorld && this.ready && !this.inFlight) {
        this.isPanning = true;
        this.apply(pointerWorld);
      }
      result = this.isPanning ? "pan" : "none";
    }
    this.active = false;
    return result;
  }

  cancel(): void {
    this.active = false;
    this.isPanning = false;
    this.generation += 1;
  }

  private apply(pointerWorld: Vec2): void {
    const next = computeAnchoredViewport(this.anchorWorld, pointerWorld, this.viewport, this.scale);
    if (Math.abs(next.x - this.viewport.x) < 0.25 && Math.abs(next.y - this.viewport.y) < 0.25) return;
    this.inFlight = true;
    this.access
      .setPosition(next)
      .then(() => {
        this.viewport = next;
      })
      .catch(() => {})
      .finally(() => {
        this.inFlight = false;
      });
  }
}
