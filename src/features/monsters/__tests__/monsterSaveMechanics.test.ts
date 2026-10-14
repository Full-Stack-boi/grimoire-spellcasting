import { describe, expect, it } from "vitest";
import {
  hasResolvableSaveDamage,
  parseMonsterSaveMechanics,
} from "../domain/monsterSaveMechanics";

describe("monster saving throw mechanics", () => {
  it("parses Ancient Gold Dragon Fire Breath save, cone, and damage outcomes", () => {
    const action = {
      description:
        "Dexterity Saving Throw: DC 24, each creature in a 90-foot Cone. Failure: 71 (13d10) Fire damage. Success: Half damage.",
      damage: "13d10",
      damageType: "Fire",
    };
    const mechanics = parseMonsterSaveMechanics(action);

    expect(mechanics).toEqual({
      hasSavingThrow: true,
      hasConflictingData: false,
      saveDc: 24,
      saveStat: "dex",
      areaOfEffect: { shape: "Cone", sizeFeet: 90 },
      successDamageMultiplier: 0.5,
      failureDamageMultiplier: 1,
    });
    expect(hasResolvableSaveDamage(action, mechanics)).toBe(true);
  });

  it("parses legacy save wording and accepts structured DC/stat fields", () => {
    const mechanics = parseMonsterSaveMechanics({
      description:
        "The dragon exhales cold in a 60-foot cone. Each creature must make a DC 18 Constitution saving throw, taking 36 cold damage on a failed save, or half as much damage on a successful one.",
      saveDc: 18,
    });

    expect(mechanics.saveDc).toBe(18);
    expect(mechanics.saveStat).toBe("con");
    expect(mechanics.areaOfEffect).toEqual({ shape: "Cone", sizeFeet: 60 });
    expect(mechanics.successDamageMultiplier).toBe(0.5);
    expect(mechanics.failureDamageMultiplier).toBe(1);
  });

  it("does not resolve save damage when either DC, ability, or success result is unknown", () => {
    const action = {
      description:
        "Dexterity Saving Throw: DC 18, each creature in a 30-foot Cone. The target takes fire damage.",
      damage: "4d6",
      damageType: "Fire",
    };
    expect(
      hasResolvableSaveDamage(action, parseMonsterSaveMechanics(action)),
    ).toBe(false);
    expect(
      hasResolvableSaveDamage(
        action,
        parseMonsterSaveMechanics({
          ...action,
          description: "Each creature in a 30-foot Cone takes fire damage.",
          saveDc: 18,
        }),
      ),
    ).toBe(false);
  });

  it("does not resolve damage when structured save data conflicts with the description", () => {
    const action = {
      description:
        "Dexterity Saving Throw: DC 24, each creature in a 90-foot Cone. Failure: 71 Fire damage. Success: Half damage.",
      damage: "13d10",
      damageType: "Fire",
      saveDc: 22,
      saveStat: "wis" as const,
    };
    const mechanics = parseMonsterSaveMechanics(action);

    expect(mechanics.hasConflictingData).toBe(true);
    expect(hasResolvableSaveDamage(action, mechanics)).toBe(false);
  });
});
