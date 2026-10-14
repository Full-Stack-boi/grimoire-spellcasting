import type {
  MonsterAction,
  MonsterAreaOfEffect,
  MonsterDamageComponent,
} from "./types";
import { parseSaveDamageMultipliers } from "../../combat/domain/savingThrowDamage";

export type MonsterSaveStat = "str" | "dex" | "con" | "int" | "wis" | "cha";

export interface MonsterSaveMechanics {
  hasSavingThrow: boolean;
  hasConflictingData: boolean;
  saveDc?: number;
  saveStat?: MonsterSaveStat;
  areaOfEffect?: MonsterAreaOfEffect;
  successDamageMultiplier?: number;
  failureDamageMultiplier?: number;
}

const SAVE_STATS: Record<string, MonsterSaveStat> = {
  strength: "str",
  str: "str",
  dexterity: "dex",
  dex: "dex",
  constitution: "con",
  con: "con",
  intelligence: "int",
  int: "int",
  wisdom: "wis",
  wis: "wis",
  charisma: "cha",
  cha: "cha",
};

export function parseMonsterSaveMechanics(
  action: Pick<
    MonsterAction,
    | "description"
    | "saveDc"
    | "saveStat"
    | "areaOfEffect"
    | "saveSuccessDamageMultiplier"
    | "saveFailureDamageMultiplier"
  >,
): MonsterSaveMechanics {
  const description = action.description || "";
  const saveMatch = description.match(
    /\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s+(?:Saving\s+Throw|save)\s*[:;,]?\s*(?:DC\s*(\d+)|(?:against|of)\s+DC\s*(\d+))?|\bDC\s*(\d+)\s+(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s+(?:Saving\s+Throw|save)/i,
  );
  const saveStat =
    action.saveStat ||
    (saveMatch
      ? SAVE_STATS[(saveMatch[1] || saveMatch[5]).toLowerCase()]
      : undefined);
  const saveDc =
    action.saveDc ??
    (saveMatch?.[2] || saveMatch?.[3] || saveMatch?.[4]
      ? Number(saveMatch[2] || saveMatch[3] || saveMatch[4])
      : undefined);
  const describedSaveDc =
    saveMatch?.[2] || saveMatch?.[3] || saveMatch?.[4]
      ? Number(saveMatch[2] || saveMatch[3] || saveMatch[4])
      : undefined;
  const areaMatch = description.match(
    /\b(\d+)\s*[- ]\s*(?:foot|feet|ft\.?)\s+(Sphere|Cone|Cube|Line)\b/i,
  );
  const areaOfEffect =
    action.areaOfEffect ||
    (areaMatch
      ? {
          shape: (areaMatch[2].charAt(0).toUpperCase() +
            areaMatch[2].slice(1).toLowerCase()) as MonsterAreaOfEffect["shape"],
          sizeFeet: Number(areaMatch[1]),
        }
      : undefined);
  const describedArea = areaMatch
    ? {
        shape: (areaMatch[2].charAt(0).toUpperCase() +
          areaMatch[2].slice(1).toLowerCase()) as MonsterAreaOfEffect["shape"],
        sizeFeet: Number(areaMatch[1]),
      }
    : undefined;
  const hasSavingThrow =
    action.saveDc !== undefined ||
    action.saveStat !== undefined ||
    /\b(?:saving throw|save DC)\b/i.test(description);
  const damageMultipliers = hasSavingThrow
    ? parseSaveDamageMultipliers(description)
    : {};
  const hasConflictingData = Boolean(
    (action.saveStat &&
      saveMatch &&
      SAVE_STATS[(saveMatch[1] || saveMatch[5]).toLowerCase()] !== action.saveStat) ||
      (action.saveDc !== undefined &&
        describedSaveDc !== undefined &&
        action.saveDc !== describedSaveDc) ||
      (action.areaOfEffect &&
        describedArea &&
        (action.areaOfEffect.shape !== describedArea.shape ||
          action.areaOfEffect.sizeFeet !== describedArea.sizeFeet)) ||
      (action.saveSuccessDamageMultiplier !== undefined &&
        damageMultipliers.success !== undefined &&
        action.saveSuccessDamageMultiplier !== damageMultipliers.success) ||
      (action.saveFailureDamageMultiplier !== undefined &&
        damageMultipliers.failure !== undefined &&
        action.saveFailureDamageMultiplier !== damageMultipliers.failure),
  );

  return {
    hasSavingThrow,
    hasConflictingData,
    saveDc,
    saveStat,
    areaOfEffect,
    successDamageMultiplier:
      action.saveSuccessDamageMultiplier ??
      damageMultipliers.success,
    failureDamageMultiplier:
      action.saveFailureDamageMultiplier ??
      damageMultipliers.failure,
  };
}

export function hasResolvableSaveDamage(
  action: Pick<MonsterAction, "damage" | "damageComponents">,
  mechanics: MonsterSaveMechanics,
): boolean {
  const hasDamage =
    Boolean(action.damage?.trim()) ||
    Boolean(action.damageComponents?.some((component: MonsterDamageComponent) => component.formula.trim()));
  const validMultiplier = (value: number | undefined) =>
    value === 0 || value === 0.5 || value === 1;
  return Boolean(
    mechanics.hasSavingThrow &&
      !mechanics.hasConflictingData &&
      mechanics.saveDc !== undefined &&
      mechanics.saveDc > 0 &&
      mechanics.saveStat &&
      validMultiplier(mechanics.successDamageMultiplier) &&
      validMultiplier(mechanics.failureDamageMultiplier) &&
      hasDamage,
  );
}
