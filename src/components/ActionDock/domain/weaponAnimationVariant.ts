import type { DDBWeaponAttack } from "../../../types/ddb";

const MELEE_VARIANTS: Array<[string, string]> = [
  ["greatsword", "great_sword"],
  ["great axe", "great_axe"],
  ["greataxe", "great_axe"],
  ["greatclub", "great_club"],
  ["great club", "great_club"],
  ["quarterstaff", "quarterstaff"],
  ["shortsword", "shortsword"],
  ["warhammer", "warhammer"],
  ["handaxe", "hand_axe"],
  ["hand axe", "hand_axe"],
  ["halberd", "halberd"],
  ["glaive", "glaive"],
  ["rapier", "rapier"],
  ["scimitar", "scimitar"],
  ["dagger", "dagger"],
  ["falchion", "falchion"],
  ["maul", "maul"],
  ["mace", "mace"],
  ["spear", "spear"],
  ["club", "club"],
  ["hammer", "hammer"],
  ["sword", "sword"],
];

export function getWeaponAnimationVariant(
  weapon: Pick<DDBWeaponAttack, "name" | "type" | "subtype">,
  mode: "melee" | "thrown" = "melee",
): string {
  const name = `${weapon.name} ${weapon.subtype ?? ""}`.toLowerCase();
  if (mode === "thrown" || weapon.type === "ranged") {
    if (name.includes("dagger")) return "dagger.throw";
    if (name.includes("crossbow") || name.includes("bolt")) return "bolt";
    return "arrow.white";
  }

  if (name.includes("unarmed") || name.includes("fist")) return "generic_slash";
  return MELEE_VARIANTS.find(([label]) => name.includes(label))?.[1] ?? "sword";
}
