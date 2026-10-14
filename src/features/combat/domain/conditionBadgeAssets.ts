export const CONDITION_BADGE_COLORS = {
  blinded: "#4338ca",
  charmed: "#be185d",
  deafened: "#0e7490",
  exhaustion: "#c2410c",
  frightened: "#7e22ce",
  grappled: "#b45309",
  incapacitated: "#b91c1c",
  invisible: "#475569",
  paralyzed: "#0369a1",
  petrified: "#57534e",
  poisoned: "#15803d",
  prone: "#78350f",
  restrained: "#a21caf",
  stunned: "#a16207",
  unconscious: "#1e3a8a",
  dead: "#881337",
  custom: "#0f766e",
} as const;

const DEFAULT_BADGE_COLOR = "#0f172a";

export function buildCombatBadgeSvg(sourceSvg: string, assetKey: string): string {
  const viewBox = sourceSvg.match(/<svg\b[^>]*\bviewBox=["']([^"']+)["']/i)?.[1] ?? "0 0 100 100";
  const content = sourceSvg
    .replace(/^[\s\S]*?<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "");
  const colorByAssetKey: Readonly<Record<string, string>> = CONDITION_BADGE_COLORS;
  const color = colorByAssetKey[assetKey] ?? DEFAULT_BADGE_COLOR;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="${viewBox}"><rect x="2" y="2" width="96" height="96" rx="22" fill="${color}" stroke="#e2e8f0" stroke-width="4"/><g fill="#f8fafc" stroke="#f8fafc">${content}</g></svg>`;
}
