import { describe, expect, it } from "vitest";
import {
  calculateDisplayedSpeed,
  createPendingConcentrationSave,
  expireEffectsAtTurnStart,
  getConcentrationSaveDc,
  resolveNextConcentrationSave,
} from "../temporaryCombatEffects";
import type { TemporaryCombatEffect } from "../types";

describe("temporary combat effects", () => {
  it("calculates concentration DC as 10 or half damage rounded down", () => {
    expect(getConcentrationSaveDc(9)).toBe(10);
    expect(getConcentrationSaveDc(21)).toBe(10);
    expect(getConcentrationSaveDc(23)).toBe(11);
  });

  it("does not create a concentration save for zero damage", () => {
    expect(createPendingConcentrationSave({ spellId: "hex", spellName: "Hex" }, 0, 42)).toBeNull();
  });

  it("records the spell, damage and DC for a real concentration save", () => {
    expect(createPendingConcentrationSave(
      { spellId: "hex", spellName: "Hex" },
      23,
      42,
    )).toMatchObject({
      spellId: "hex",
      spellName: "Hex",
      damageTaken: 23,
      dc: 11,
      createdAt: 42,
    });
  });

  it("resolves concentration saves in damage order and clears later saves on failure", () => {
    const first = createPendingConcentrationSave({ spellId: "bless", spellName: "Bless" }, 18, 1)!;
    const second = createPendingConcentrationSave({ spellId: "bless", spellName: "Bless" }, 24, 2)!;
    expect(resolveNextConcentrationSave([first, second], 10)).toEqual({
      resolved: first,
      succeeded: true,
      remaining: [second],
    });
    expect(resolveNextConcentrationSave([first, second], 9)).toEqual({
      resolved: first,
      succeeded: false,
      remaining: [],
    });
  });

  it("expires effects only at the configured token's turn start", () => {
    const effects: TemporaryCombatEffect[] = [
      {
        id: "ray-a",
        kind: "speed_reduction",
        name: "Ray of Frost",
        valueFeet: 10,
        sourceTokenId: "caster-a",
        sourceName: "Caster A",
        expiresOnTurnStartTokenId: "caster-a",
      },
      {
        id: "ray-b",
        kind: "speed_reduction",
        name: "Ray of Frost",
        valueFeet: 10,
        sourceTokenId: "caster-b",
        sourceName: "Caster B",
        expiresOnTurnStartTokenId: "caster-b",
      },
    ];
    expect(expireEffectsAtTurnStart(effects, "caster-a")).toEqual([effects[1]]);
  });

  it("calculates current Speed with exhaustion, temporary penalties, and zero-Speed conditions", () => {
    const ray: TemporaryCombatEffect = {
      id: "ray",
      kind: "speed_reduction",
      name: "Ray of Frost",
      valueFeet: 10,
      sourceTokenId: "caster",
      sourceName: "Caster",
      expiresOnTurnStartTokenId: "caster",
    };
    expect(calculateDisplayedSpeed(30, [], 2, [ray])).toEqual({
      speed: 10,
      reduction: 20,
      isZero: false,
    });
    expect(calculateDisplayedSpeed(30, ["restrained"], 0, [ray])).toEqual({
      speed: 0,
      reduction: 10,
      isZero: true,
    });
    expect(calculateDisplayedSpeed(30, ["unconscious"], 0, [])).toEqual({
      speed: 0,
      reduction: 0,
      isZero: true,
    });
  });
});
