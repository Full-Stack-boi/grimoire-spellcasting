import { describe, expect, it } from "vitest";
import { checkMonsterAttackRange } from "./monsterAttackRange";
import type { MonsterAction } from "./types";

const grid = { dpi: 100, scaleMultiplier: 5 };
const origin = { x: 0, y: 0 };

describe("checkMonsterAttackRange", () => {
  it("accepts targets within the monster's melee reach", () => {
    const action: MonsterAction = {
      id: "bite",
      name: "Bite",
      type: "melee_attack",
      reachFeet: 10,
      description: "",
    };

    expect(
      checkMonsterAttackRange(action, origin, { x: 200, y: 0 }, grid).withinRange,
    ).toBe(true);
    expect(
      checkMonsterAttackRange(action, origin, { x: 300, y: 0 }, grid).withinRange,
    ).toBe(false);
  });

  it("marks ranged targets beyond normal range as long-range up to the maximum", () => {
    const action: MonsterAction = {
      id: "spit",
      name: "Spit",
      type: "ranged_attack",
      rangeFeet: 60,
      rangeLongFeet: 120,
      description: "",
    };

    expect(
      checkMonsterAttackRange(action, origin, { x: 1500, y: 0 }, grid),
    ).toMatchObject({ withinRange: true, isLongRange: true });
    expect(
      checkMonsterAttackRange(action, origin, { x: 2500, y: 0 }, grid).withinRange,
    ).toBe(false);
  });
});
