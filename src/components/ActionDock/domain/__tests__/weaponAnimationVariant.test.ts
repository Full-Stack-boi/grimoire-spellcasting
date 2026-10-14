import { describe, expect, it } from "vitest";
import { getWeaponAnimationVariant } from "../weaponAnimationVariant";

describe("getWeaponAnimationVariant", () => {
  it("selects the dagger melee animation instead of the default sword", () => {
    expect(getWeaponAnimationVariant({
      name: "Dagger",
      type: "melee",
      subtype: "Simple Melee Weapon",
    })).toBe("dagger");
  });

  it("selects the dagger throw animation for thrown daggers", () => {
    expect(getWeaponAnimationVariant({
      name: "Dagger +1",
      type: "melee",
    }, "thrown")).toBe("dagger.throw");
  });

  it("selects projectile variants for ranged weapons", () => {
    expect(getWeaponAnimationVariant({
      name: "Light Crossbow",
      type: "ranged",
    })).toBe("bolt");
    expect(getWeaponAnimationVariant({
      name: "Longbow",
      type: "ranged",
    })).toBe("arrow.white");
  });

  it("maps supported heavy melee weapon names", () => {
    expect(getWeaponAnimationVariant({
      name: "Greatsword",
      type: "melee",
    })).toBe("great_sword");
  });
});
