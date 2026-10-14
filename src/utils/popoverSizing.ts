const VIEWPORT_GUTTER = 16;

export interface ResponsivePopoverDimensions {
  width: number;
  height: number;
}

export function calculateResponsivePopoverDimensions(
  viewportWidth: number,
  viewportHeight: number,
  preferredWidth: number,
  preferredHeight: number,
): ResponsivePopoverDimensions {
  const dimensions = [
    viewportWidth,
    viewportHeight,
    preferredWidth,
    preferredHeight,
  ];

  if (
    dimensions.some((dimension) => !Number.isFinite(dimension) || dimension <= 0)
  ) {
    throw new RangeError("Popover dimensions must be finite positive numbers.");
  }

  return {
    width: Math.min(
      Math.floor(preferredWidth),
      Math.max(1, Math.floor(viewportWidth) - VIEWPORT_GUTTER),
    ),
    height: Math.min(
      Math.floor(preferredHeight),
      Math.max(1, Math.floor(viewportHeight) - VIEWPORT_GUTTER),
    ),
  };
}
