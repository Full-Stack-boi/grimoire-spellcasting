import blinded from "../../../assets/third-party/tw-dnd-icons/condition/blinded.svg?raw";
import charmed from "../../../assets/third-party/tw-dnd-icons/condition/charmed.svg?raw";
import deafened from "../../../assets/third-party/tw-dnd-icons/condition/deafened.svg?raw";
import exhaustion from "../../../assets/third-party/tw-dnd-icons/condition/exhaustion.svg?raw";
import frightened from "../../../assets/third-party/tw-dnd-icons/condition/frightened.svg?raw";
import grappled from "../../../assets/third-party/tw-dnd-icons/condition/grappled.svg?raw";
import incapacitated from "../../../assets/third-party/tw-dnd-icons/condition/incapacitated.svg?raw";
import invisible from "../../../assets/third-party/tw-dnd-icons/condition/invisible.svg?raw";
import paralyzed from "../../../assets/third-party/tw-dnd-icons/condition/paralyzed.svg?raw";
import petrified from "../../../assets/third-party/tw-dnd-icons/condition/petrified.svg?raw";
import poisoned from "../../../assets/third-party/tw-dnd-icons/condition/poisoned.svg?raw";
import prone from "../../../assets/third-party/tw-dnd-icons/condition/prone.svg?raw";
import restrained from "../../../assets/third-party/tw-dnd-icons/condition/restrained.svg?raw";
import stunned from "../../../assets/third-party/tw-dnd-icons/condition/stunned.svg?raw";
import unconscious from "../../../assets/third-party/tw-dnd-icons/condition/unconscious.svg?raw";
import cold from "../../../assets/third-party/tw-dnd-icons/damage/cold.svg?raw";
import walking from "../../../assets/third-party/tw-dnd-icons/movement/walking.svg?raw";
import concentration from "../../../assets/third-party/tw-dnd-icons/spell/concentration.svg?raw";

export interface CombatBadge {
  label: string;
  dataUri: string;
  assetKey: string;
}

export function getCombatBadgeAssetUrl(badge: CombatBadge, origin = window.location.origin): string {
  return new URL(`/combat-badges/${badge.assetKey}.svg?v=3`, origin).href;
}

const sourceIcons: Record<string, string> = {
  blinded,
  charmed,
  deafened,
  exhaustion,
  frightened,
  grappled,
  incapacitated,
  invisible,
  paralyzed,
  petrified,
  poisoned,
  prone,
  restrained,
  stunned,
  unconscious,
};

function makeBadge(label: string, sourceSvg: string, assetKey: string): CombatBadge {
  const content = sourceSvg
    .replace(/^[\s\S]*?<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100"><rect x="2" y="2" width="96" height="96" rx="22" fill="#0f172a" stroke="#94a3b8" stroke-width="4"/><g fill="#f8fafc" stroke="#f8fafc">${content}</g></svg>`;
  return {
    label,
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    assetKey,
  };
}

export const CONDITION_ICONS: Record<string, CombatBadge> = Object.fromEntries(
  Object.entries(sourceIcons).map(([condition, sourceSvg]) => [
    condition,
    makeBadge(condition.charAt(0).toUpperCase() + condition.slice(1), sourceSvg, condition),
  ]),
);

const deadBadge: CombatBadge = {
  label: "Dead",
  dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="1" width="18" height="18" rx="4" fill="#18181b" stroke="#ef4444"/><path d="M6 8a4 4 0 0 1 8 0v3H6zM4 16l12-12M16 16 4 4" fill="#ef4444" stroke="#fca5a5" stroke-width="1.4"/></svg>',
  )}`,
  assetKey: "dead",
};

const customBadge = makeBadge(
  "Custom condition",
  '<circle cx="50" cy="50" r="20" />',
  "custom",
);

export function getConditionBadgeUri(condition: string): CombatBadge {
  const norm = condition.trim().toLowerCase();
  if (norm === "dead") return deadBadge;
  return CONDITION_ICONS[norm] ?? { ...customBadge, label: condition.trim() || "Condition" };
}

export function getCombatEffectBadgeUri(kind: "concentration" | "speed_reduction"): CombatBadge {
  if (kind === "concentration") return makeBadge("Concentrating", concentration, "concentration");
  return makeBadge("Speed reduced by Ray of Frost", cold, "speed-reduction");
}

export function getWalkingBadgeUri(): CombatBadge {
  return makeBadge("Walking Speed", walking, "walking");
}
