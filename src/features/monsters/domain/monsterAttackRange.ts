import type { Vector2 } from "@owlbear-rodeo/sdk";
import { isWithinRange, type GridInfo } from "../../targeting/domain/targetingGeometry";
import type { MonsterAction } from "./types";

export interface MonsterAttackRangeResult {
  withinRange: boolean;
  currentDistanceFeet: number;
  normalRangeFeet: number;
  maxRangeFeet: number;
  isLongRange: boolean;
}

export function checkMonsterAttackRange(
  action: MonsterAction,
  attackerPosition: Vector2,
  targetPosition: Vector2,
  grid: GridInfo,
): MonsterAttackRangeResult {
  const isRanged = action.type === "ranged_attack";
  const normalRangeFeet = isRanged
    ? action.rangeFeet ?? 60
    : action.reachFeet ?? 5;
  const maxRangeFeet = isRanged
    ? action.rangeLongFeet ?? normalRangeFeet
    : normalRangeFeet;
  const rangeCheck = isWithinRange(
    attackerPosition,
    targetPosition,
    maxRangeFeet,
    grid,
  );
  const normalRangeCheck = isWithinRange(
    attackerPosition,
    targetPosition,
    normalRangeFeet,
    grid,
  );

  return {
    withinRange: rangeCheck.withinRange,
    currentDistanceFeet: rangeCheck.currentDistanceFeet,
    normalRangeFeet,
    maxRangeFeet,
    isLongRange: isRanged && rangeCheck.withinRange && !normalRangeCheck.withinRange,
  };
}
