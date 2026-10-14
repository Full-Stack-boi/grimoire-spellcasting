export interface SaveDamageMultipliers {
  success?: number;
  failure?: number;
}

export function normalizeSaveAbility(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const match = /\b(strength|dexterity|constitution|intelligence|wisdom|charisma|str|dex|con|int|wis|cha)\b/i.exec(value);
  const ability = match?.[1]?.toLowerCase();
  const abilities: Record<string, string> = {
    strength: "STR",
    str: "STR",
    dexterity: "DEX",
    dex: "DEX",
    constitution: "CON",
    con: "CON",
    intelligence: "INT",
    int: "INT",
    wisdom: "WIS",
    wis: "WIS",
    charisma: "CHA",
    cha: "CHA",
  };
  return ability ? abilities[ability] : undefined;
}

function parseOutcomeMultiplier(
  description: string,
  outcome: "success" | "failure",
): number | undefined {
  const isSuccess = outcome === "success";
  const marker = isSuccess ? "success(?:ful)?|successful" : "failure|failed";
  const outcomeClause = new RegExp(
    `\\b(?:${marker})\\s*:\\s*([^.;]+)`,
    "i",
  ).exec(description)?.[1];
  if (outcomeClause) {
    if (/\b(?:no damage|takes no damage)\b/i.test(outcomeClause)) return 0;
    if (/\bhalf(?:\s+as\s+much)?\s+damage\b/i.test(outcomeClause)) return 0.5;
    if (/\bdamage\b/i.test(outcomeClause)) return 1;
  }
  const failedSaveClause = /\b(?:failed save|failed saving throw|failure)\s*:\s*([^.;]+)/i.exec(
    description,
  )?.[1];
  if (!isSuccess && failedSaveClause) {
    if (/\bhalf(?:\s+as\s+much)?\s+damage\b/i.test(failedSaveClause)) return 0.5;
    if (/\bdamage\b/i.test(failedSaveClause)) return 1;
  }

  const noDamageOnSuccess =
    /\b(?:takes|deals|suffers)\s+no damage\b[^.;]*\b(?:on|after)\s+(?:a\s+)?successful/i.test(description) ||
    /\bno damage on (?:a )?success(?:ful save)?\b/i.test(description);
  if (isSuccess && noDamageOnSuccess) return 0;

  const halfOnSuccess =
    /\bhalf(?:\s+as\s+much)?\s+damage\b[^.;]*\b(?:on|with)\s+(?:a\s+)?successful/i.test(description) ||
    /\bhalf(?:\s+as\s+much)?\s+damage on (?:a )?success(?:ful save|ful one)?\b/i.test(description) ||
    /\bsuccessful\s+(?:saving throw|save)[^.;]*\bhalf(?:\s+as\s+much)?\s+damage\b/i.test(description);
  if (isSuccess && halfOnSuccess) return 0.5;

  const halfOnFailure =
    /\bhalf(?:\s+as\s+much)?\s+damage\b[^.;]*\b(?:on|with)\s+(?:a\s+)?failed/i.test(description) ||
    /\bhalf(?:\s+as\s+much)?\s+damage on (?:a )?failure\b/i.test(description) ||
    /\bfailed\s+(?:saving throw|save)[^.;]*\bhalf(?:\s+as\s+much)?\s+damage\b/i.test(description);
  if (!isSuccess && halfOnFailure) return 0.5;

  const damageOnFailure =
    /\bdamage\b[^.;]*\b(?:on|with)\s+(?:a\s+)?failed\s+(?:saving throw|save)\b/i.test(description) ||
    /\bfailed\s+(?:saving throw|save)\b[^.;]*\bdamage\b/i.test(description);
  if (!isSuccess && damageOnFailure) return 1;

  const fullOnSuccess =
    /\bfull damage\b[^.;]*\b(?:on|with)\s+(?:a\s+)?successful/i.test(description);
  if (isSuccess && fullOnSuccess) return 1;
  return undefined;
}

export function parseSaveDamageMultipliers(description: string): SaveDamageMultipliers {
  const legacyFullFailureHalfSuccess =
    /\bdamage\b[^.;]*?\bon\s+(?:a\s+)?failed\s+(?:saving throw|save)\b[^.;]*?\bor\s+half(?:\s+as\s+much)?\s+damage\b[^.;]*?\bon\s+(?:a\s+)?successful/i.test(
      description,
    );
  if (legacyFullFailureHalfSuccess) {
    return { success: 0.5, failure: 1 };
  }
  return {
    success: parseOutcomeMultiplier(description, "success"),
    failure: parseOutcomeMultiplier(description, "failure"),
  };
}
