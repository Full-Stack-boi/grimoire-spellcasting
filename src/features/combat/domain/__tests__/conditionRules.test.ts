import { describe, expect, it } from "vitest";
import { combineD20RollModes, resolveConditionRules } from "../conditionRules";

describe("resolveConditionRules", () => {
  it("applies attack disadvantage from blinded, poisoned, prone, and restrained", () => {
    for (const condition of ["blinded", "poisoned", "prone", "restrained"]) {
      expect(resolveConditionRules({ conditions: [condition], rollKind: "attack" }).mode)
        .toBe("disadvantage");
    }
  });

  it("cancels advantage and disadvantage from the combined source and target state", () => {
    const result = resolveConditionRules({
      conditions: ["poisoned"],
      targetConditions: ["stunned"],
      rollKind: "attack",
    });
    expect(result.mode).toBe("normal");
  });

  it("applies prone-target advantage only for melee attacks within five feet", () => {
    expect(resolveConditionRules({
      targetConditions: ["prone"],
      rollKind: "attack",
      attackType: "melee",
      targetWithinFiveFeet: true,
    }).mode).toBe("advantage");
    expect(resolveConditionRules({
      targetConditions: ["prone"],
      rollKind: "attack",
      attackType: "ranged",
      targetWithinFiveFeet: true,
    }).mode).toBe("disadvantage");
  });

  it("does not guess when a condition requires missing context", () => {
    const result = resolveConditionRules({
      conditions: ["frightened"],
      targetConditions: ["prone"],
      rollKind: "attack",
    });
    expect(result.requiresAdjudication).toHaveLength(2);
    expect(result.mode).toBe("normal");
  });

  it("automatically fails strength and dexterity saves for specified conditions", () => {
    for (const condition of ["paralyzed", "petrified", "stunned", "unconscious"]) {
      expect(resolveConditionRules({
        conditions: [condition],
        rollKind: "saving_throw",
        ability: "DEX",
      }).automaticFailure).toBe(true);
    }
    expect(resolveConditionRules({
      conditions: ["stunned"],
      rollKind: "saving_throw",
      ability: "CON",
    }).automaticFailure).toBe(false);
  });

  it("requires adjudication when Blinded or Deafened checks lack sensory context", () => {
    expect(resolveConditionRules({
      conditions: ["blinded"],
      rollKind: "ability_check",
      ability: "wis",
    }).requiresAdjudication).toContain("Blinded: confirm whether this ability check requires sight");
    expect(resolveConditionRules({
      conditions: ["deafened"],
      rollKind: "ability_check",
      ability: "wis",
    }).requiresAdjudication).toContain("Deafened: confirm whether this ability check requires hearing");
  });

  it("applies 2024 exhaustion penalties and speed reduction per level", () => {
    expect(resolveConditionRules({
      rollKind: "ability_check",
      exhaustionLevel: 3,
    })).toMatchObject({
      d20Penalty: 6,
      speedReductionFeet: 15,
    });
  });

  it("blocks actions for incapacitating conditions", () => {
    expect(resolveConditionRules({
      conditions: ["unconscious"],
      rollKind: "attack",
      actionType: "action",
    }).blocked).toBe(true);
  });

  it("sets Speed to zero for Paralyzed, Petrified, Stunned, and Unconscious", () => {
    for (const condition of ["paralyzed", "petrified", "stunned", "unconscious"]) {
      expect(resolveConditionRules({ conditions: [condition], rollKind: "attack" }).speedIsZero).toBe(true);
    }
  });

  it("blocks actions for Dead creatures", () => {
    expect(resolveConditionRules({
      conditions: ["dead"],
      rollKind: "attack",
      actionType: "action",
    }).blocked).toBe(true);
    expect(resolveConditionRules({
      conditions: ["dead"],
      rollKind: "saving_throw",
      ability: "con",
    }).blocked).toBe(true);
  });

  it("grants the Charmer advantage on social checks against a Charmed target", () => {
    expect(resolveConditionRules({
      targetConditions: ["charmed"],
      rollKind: "ability_check",
      socialCheckAgainstCharmedTarget: true,
    }).mode).toBe("advantage");
  });

  it("cancels advantage against disadvantage from different sources", () => {
    expect(combineD20RollModes("advantage", "disadvantage")).toBe("normal");
    expect(combineD20RollModes("advantage", "normal")).toBe("advantage");
    expect(combineD20RollModes("normal", "disadvantage")).toBe("disadvantage");
  });
});
