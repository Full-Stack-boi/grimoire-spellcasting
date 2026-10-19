import type { ManualActionFormula } from "../types/manualFormula";
import type { DDBParsedCharacter, DDBFeatureAction } from "../types/ddb";
import { findMatchingActionFormula } from "../assets/manual-formulas/classes";

export type FeatureFlyoutKind =
  | "font_of_magic"
  | "harness_divine_power"
  | "arcane_recovery"
  | "focus_points"
  | "lay_on_hands"
  | "metamagic"
  | "maneuvers"
  | "cunning_strike"
  | "second_wind"
  | "tactical_mind"
  | "divine_spark"
  | "options_grid";

export interface ResolvedFeatureResource {
  resourceName: string;
  maxPoints: number;
  availablePoints: number;
  resetType: string;
}

export function resolveFeatureResource(params: {
  formula?: ManualActionFormula;
  character?: DDBParsedCharacter | null;
  feature?: DDBFeatureAction | null;
  featureUses?: Record<string, number>;
}): ResolvedFeatureResource {
  const { formula, character, feature, featureUses = {} } = params;

  const resourceName = formula?.resource?.name || feature?.name || "Resource";
  let maxPoints = feature?.limitedUse?.max || 0;
  const resetType = formula?.resource?.resetType || feature?.limitedUse?.resetType || "Long Rest";

  if (maxPoints === 0 && formula?.resource?.scaling && character) {
    const { scaling } = formula.resource;
    const classId = scaling.classId?.toLowerCase();
    const classLevel = classId
      ? character.classes
          .filter((c) => c.name.toLowerCase().includes(classId))
          .reduce((sum, c) => sum + c.level, 0)
      : character.classes.reduce((sum, c) => sum + c.level, 0);

    if (scaling.type === "class_level") {
      maxPoints = classLevel * (scaling.multiplier ?? 1);
    } else if (scaling.type === "half_class_level") {
      maxPoints = Math.max(1, Math.ceil(classLevel / 2));
    } else if (scaling.type === "level_table" && scaling.table) {
      const match = [...scaling.table]
        .sort((a, b) => b.minLevel - a.minLevel)
        .find((entry) => classLevel >= entry.minLevel);
      maxPoints = match ? match.value : (scaling.table[0]?.value ?? 0);
    } else if (scaling.type === "flat") {
      maxPoints = scaling.multiplier ?? 1;
    }
  }

  const used = feature ? (featureUses[feature.id] ?? (feature.limitedUse?.used || 0)) : 0;
  const availablePoints = Math.max(0, maxPoints - used);

  return {
    resourceName,
    maxPoints,
    availablePoints,
    resetType,
  };
}

export function getFeatureFlyoutKind(
  feat: { name: string; id?: string },
  character?: DDBParsedCharacter | null
): FeatureFlyoutKind | null {
  if (!feat?.name) return null;
  const lower = feat.name.toLowerCase().trim();
  const formula = findMatchingActionFormula(feat.name, character);

  if (formula?.flyoutType === "convert_slots" || lower.includes("font of magic")) return "font_of_magic";
  if (lower.includes("arcane recovery")) return "arcane_recovery";
  if (lower.includes("harness divine power")) return "harness_divine_power";
  if (
    lower.includes("focus point") ||
    lower.includes("ki point") ||
    lower === "ki" ||
    lower.includes("step of the wind") ||
    lower.includes("flurry of blows") ||
    lower.includes("patient defense") ||
    lower.includes("stunning strike")
  ) {
    return "focus_points";
  }
  if (lower.includes("lay on hands")) return "lay_on_hands";
  if (lower.includes("metamagic")) return "metamagic";
  if (lower.includes("maneuver") || lower.includes("superiority dice") || lower.includes("combat superiority")) {
    if (character?.classes && character.classes.length > 0) {
      const isBattleMaster = character.classes.some(
        (c) => c.subclass?.toLowerCase().includes("battle") || c.name.toLowerCase().includes("battle master")
      );
      const isFighter = character.classes.some((c) => c.name.toLowerCase().includes("fighter"));
      const isGunslinger = character.classes.some(
        (c) => c.name.toLowerCase().includes("gunslinger") || c.subclass?.toLowerCase().includes("gunslinger")
      );
      if (isGunslinger && !isBattleMaster) {
        return null;
      }
      if (!isBattleMaster && !isFighter) {
        return null;
      }
    }
    return "maneuvers";
  }
  if (lower.includes("cunning strike")) return "cunning_strike";
  if (lower.includes("tactical mind")) return "tactical_mind";
  if (lower.includes("divine spark") || (lower.includes("channel divinity") && lower.includes("spark"))) {
    return "divine_spark";
  }
  if (formula?.options && formula.options.length > 0) return "options_grid";
  return null;
}

/**
 * Resolves selectable action options for a feature flyout.
 * Filters the exhaustive catalog options to only the options selected by the character
 * on D&D Beyond (e.g. Eldritch Invocations, Metamagic, Battle Master Maneuvers).
 * If no character choices are found (or for GM / unassigned sheets), falls back to the catalog options.
 */
export function resolveFeatureActionOptions(params: {
  feature: { name: string; id?: string };
  formula?: ManualActionFormula | null;
  character?: DDBParsedCharacter | null;
}): ManualActionFormula["options"] {
  const { feature, formula, character } = params;
  if (!formula?.options || formula.options.length === 0) return undefined;

  const featureNameLower = feature.name.toLowerCase();
  const isEldritchInvocations = featureNameLower.includes("invocation");
  const isMetamagic = featureNameLower.includes("metamagic");
  const isManeuvers = featureNameLower.includes("maneuver") || featureNameLower.includes("superiority");

  if (character && (isEldritchInvocations || isMetamagic || isManeuvers)) {
    const charOptions = character.options || [];
    const charActions = character.actions || [];

    const filtered = formula.options.filter(opt => {
      const optNameLower = opt.name.toLowerCase().trim();

      // 1. Check in character.options
      const matchesOption = charOptions.some(o => {
        const on = o.name.toLowerCase().trim();
        return on === optNameLower || on.includes(optNameLower) || optNameLower.includes(on);
      });
      if (matchesOption) return true;

      // 2. Check in character.actions
      const matchesAction = charActions.some(a => {
        const an = a.name.toLowerCase().trim();
        return an === optNameLower || an.startsWith(`${optNameLower}:`) || an.startsWith(`${optNameLower} -`) || an.includes(optNameLower);
      });
      if (matchesAction) return true;

      return false;
    });

    if (filtered.length > 0) {
      return filtered;
    }
  }

  return formula.options;
}
