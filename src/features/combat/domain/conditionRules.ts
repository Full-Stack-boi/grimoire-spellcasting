export type D20RollKind = "attack" | "ability_check" | "saving_throw";
export type D20RollMode = "normal" | "advantage" | "disadvantage";

export interface ConditionRuleInput {
  conditions?: readonly string[];
  targetConditions?: readonly string[];
  exhaustionLevel?: number;
  rollKind: D20RollKind;
  ability?: string;
  attackType?: "melee" | "ranged";
  targetWithinFiveFeet?: boolean;
  canSeeTarget?: boolean;
  canSeeFrightSource?: boolean;
  targetIsCharmer?: boolean;
  socialCheckAgainstCharmedTarget?: boolean;
  requiresSight?: boolean;
  requiresHearing?: boolean;
  actionType?: "action" | "bonus_action" | "reaction";
}

export interface ConditionRuleResult {
  mode: D20RollMode;
  automaticFailure: boolean;
  blocked: boolean;
  d20Penalty: number;
  speedReductionFeet: number;
  speedIsZero: boolean;
  automaticCritical: boolean;
  reasons: string[];
  requiresAdjudication: string[];
}

const normalize = (conditions: readonly string[] | undefined): Set<string> =>
  new Set((conditions ?? []).map((condition) => condition.trim().toLowerCase()));

const incapacitatingConditions = [
  "dead",
  "incapacitated",
  "paralyzed",
  "petrified",
  "stunned",
  "unconscious",
];

export function resolveConditionRules(input: ConditionRuleInput): ConditionRuleResult {
  const conditions = normalize(input.conditions);
  const targetConditions = normalize(input.targetConditions);
  const reasons: string[] = [];
  const requiresAdjudication: string[] = [];
  let advantage = false;
  let disadvantage = false;
  let automaticFailure = false;
  let blocked = false;
  let automaticCritical = false;

  if (conditions.has("dead")) {
    blocked = true;
    reasons.push("A Dead creature cannot act or make rolls");
  }

  const exhaustionLevel = Math.max(0, Math.min(6, Math.floor(input.exhaustionLevel ?? 0)));
  const d20Penalty = exhaustionLevel * 2;
  const speedReductionFeet = exhaustionLevel * 5;
  if (exhaustionLevel > 0) {
    reasons.push(`Exhaustion ${exhaustionLevel}: -${d20Penalty} to D20 tests and -${speedReductionFeet} ft. Speed`);
  }

  if (input.actionType && incapacitatingConditions.some((condition) => conditions.has(condition))) {
    blocked = true;
    reasons.push(`${[...conditions].find((condition) => incapacitatingConditions.includes(condition))} prevents this action`);
  }

  if (input.rollKind === "attack") {
    if (conditions.has("blinded") || conditions.has("poisoned") || conditions.has("prone") || conditions.has("restrained")) {
      disadvantage = true;
      reasons.push("Your condition imposes Disadvantage on this attack");
    }
    if (conditions.has("invisible")) {
      advantage = true;
      reasons.push("Invisible grants Advantage on your attack roll");
    }
    if (conditions.has("frightened")) {
      if (input.canSeeFrightSource === true) {
        disadvantage = true;
        reasons.push("Frightened: the source is in sight");
      } else if (input.canSeeFrightSource === undefined) {
        requiresAdjudication.push("Frightened: confirm whether the fear source is in sight");
      }
    }
    if (conditions.has("charmed") && input.targetIsCharmer === undefined) {
      requiresAdjudication.push("Charmed: confirm whether the target is the charmer");
    } else if (conditions.has("charmed") && input.targetIsCharmer) {
      blocked = true;
      reasons.push("Charmed: you cannot attack the charmer");
    }

    if (targetConditions.has("blinded") || targetConditions.has("restrained") ||
        targetConditions.has("paralyzed") || targetConditions.has("petrified") ||
        targetConditions.has("stunned") || targetConditions.has("unconscious")) {
      advantage = true;
      reasons.push("The target's condition grants Advantage on this attack");
    }
    if (targetConditions.has("invisible")) {
      if (input.canSeeTarget === false) {
        disadvantage = true;
        reasons.push("The target is Invisible and cannot be seen");
      } else if (input.canSeeTarget === undefined) {
        requiresAdjudication.push("Invisible target: confirm whether you can see it");
      }
    }
    if (targetConditions.has("prone")) {
      if (input.targetWithinFiveFeet === undefined || input.attackType === undefined) {
        requiresAdjudication.push("Prone target: confirm attack type and whether you are within 5 feet");
      } else if (input.attackType === "melee" && input.targetWithinFiveFeet) {
        advantage = true;
        reasons.push("Melee attack within 5 feet against a Prone target");
      } else {
        disadvantage = true;
        reasons.push("Attack against a Prone target from beyond 5 feet or with a ranged attack");
      }
    }
    if (targetConditions.has("paralyzed") || targetConditions.has("unconscious")) {
      if (input.targetWithinFiveFeet === true) {
        automaticCritical = true;
        reasons.push("Hit within 5 feet of a Paralyzed or Unconscious target is a Critical Hit");
      } else if (input.targetWithinFiveFeet === undefined) {
        requiresAdjudication.push("Confirm whether the target is within 5 feet for a critical hit");
      }
    }
  }

  if (input.rollKind === "saving_throw") {
    const ability = input.ability?.trim().toLowerCase();
    if ((conditions.has("paralyzed") || conditions.has("petrified") ||
        conditions.has("stunned") || conditions.has("unconscious")) &&
        (ability === "str" || ability === "strength" || ability === "dex" || ability === "dexterity")) {
      automaticFailure = true;
      reasons.push(`${input.ability} saving throws automatically fail while ${[...conditions].find((condition) =>
        ["paralyzed", "petrified", "stunned", "unconscious"].includes(condition))}`);
    }
    if (conditions.has("restrained") && (ability === "dex" || ability === "dexterity")) {
      disadvantage = true;
      reasons.push("Restrained imposes Disadvantage on Dexterity saving throws");
    }
  }

  if (input.rollKind === "ability_check") {
    if (conditions.has("poisoned")) {
      disadvantage = true;
      reasons.push("Poisoned imposes Disadvantage on ability checks");
    }
    if (conditions.has("frightened")) {
      if (input.canSeeFrightSource === true) {
        disadvantage = true;
        reasons.push("Frightened imposes Disadvantage while the source is in sight");
      } else if (input.canSeeFrightSource === undefined) {
        requiresAdjudication.push("Frightened ability check: confirm whether the fear source is in sight");
      }
    }
    if (targetConditions.has("charmed") && input.socialCheckAgainstCharmedTarget === undefined) {
      requiresAdjudication.push("Charmed target: confirm whether this is a social check to interact with it");
    } else if (targetConditions.has("charmed") && input.socialCheckAgainstCharmedTarget) {
      advantage = true;
      reasons.push("The charmer has Advantage on social checks to interact with the Charmed target");
    }
    if (conditions.has("blinded")) {
      if (input.requiresSight === true) {
        automaticFailure = true;
        reasons.push("Blinded automatically fails an ability check that requires sight");
      } else if (input.requiresSight === undefined) {
        requiresAdjudication.push("Blinded: confirm whether this ability check requires sight");
      }
    }
    if (conditions.has("deafened")) {
      if (input.requiresHearing === true) {
        automaticFailure = true;
        reasons.push("Deafened automatically fails an ability check that requires hearing");
      } else if (input.requiresHearing === undefined) {
        requiresAdjudication.push("Deafened: confirm whether this ability check requires hearing");
      }
    }
  }

  const mode: D20RollMode = advantage === disadvantage
    ? "normal"
    : advantage
      ? "advantage"
      : "disadvantage";

  return {
    mode,
    automaticFailure,
    blocked,
    d20Penalty,
    speedReductionFeet,
    speedIsZero: [
      "grappled",
      "restrained",
      "paralyzed",
      "petrified",
      "stunned",
      "unconscious",
    ].some((condition) => conditions.has(condition)),
    automaticCritical,
    reasons,
    requiresAdjudication,
  };
}

export function combineD20RollModes(
  first: D20RollMode,
  second: D20RollMode,
): D20RollMode {
  if (first === "normal") return second;
  if (second === "normal") return first;
  return "normal";
}
