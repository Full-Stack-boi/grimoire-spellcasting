import { describe, expect, it } from "vitest";
import { calculateResponsivePopoverDimensions } from "./popoverSizing";

describe("responsive popover sizing", () => {
  it("keeps the preferred dimensions when the viewport has room", () => {
    expect(calculateResponsivePopoverDimensions(1440, 900, 760, 440)).toEqual({
      width: 760,
      height: 440,
    });
  });

  it("fits the popover inside narrow and short viewports", () => {
    expect(calculateResponsivePopoverDimensions(320, 280, 760, 440)).toEqual({
      width: 304,
      height: 264,
    });
  });

  it("preserves a small positive popover when the viewport is extremely small", () => {
    expect(calculateResponsivePopoverDimensions(12, 10, 760, 440)).toEqual({
      width: 1,
      height: 1,
    });
  });

  it("rejects invalid dimensions instead of silently producing invalid geometry", () => {
    expect(() =>
      calculateResponsivePopoverDimensions(0, 400, 760, 440),
    ).toThrow(RangeError);
  });
});
