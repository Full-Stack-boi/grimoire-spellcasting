/**
 * Centralized Design & Responsive Tokens
 * Single source of truth for both TypeScript layout computations and SCSS stylesheets.
 */

export const BREAKPOINTS = {
  xs: 420,  // Mobile portrait / narrow popover
  sm: 540,  // Mobile landscape / compact modal
  md: 768,  // Tablet / default ActionDock popover
  lg: 960,  // Targeted responsive canvas (e.g. 957x910) / small laptop
  xl: 1200, // Standard desktop
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

export const MODAL_DIMENSIONS = {
  defaultMaxWidth: 880,
  compactMaxWidth: 600,
  maxHeightVh: 95,
  minPaddingPx: 12,
} as const;

export const Z_INDEX = {
  base: 1,
  dockPillar: 5,
  dockDrawer: 10,
  popover: 100,
  dropdown: 1000,
  tooltip: 2000,
  modalOverlay: 999999,
} as const;
