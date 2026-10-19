import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getSituationalRollState,
  setSituationalRollState,
  resetSituationalRollState,
  consumeSituationalRollOverride,
  subscribeSituationalRollState,
  registerPendingCriticalHit,
  consumePendingCriticalHit,
  peekPendingCriticalHit,
  clearPendingCriticalHits,
  DEFAULT_SITUATIONAL_ROLL_STATE,
} from "../situationalRollModifierService";

describe("situationalRollModifierService", () => {
  beforeEach(() => {
    resetSituationalRollState("attack");
    resetSituationalRollState("checks");
    clearPendingCriticalHits();
  });

  it("initializes with default state (normal mode, 0 bonus, empty diceBonus)", () => {
    const state = getSituationalRollState();
    expect(state).toEqual(DEFAULT_SITUATIONAL_ROLL_STATE);
    expect(state.mode).toBe("normal");
    expect(state.bonus).toBe(0);
    expect(state.diceBonus).toBe("");
  });

  it("updates state and notifies subscribers via setSituationalRollState", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeSituationalRollState(listener);

    // Initial call on subscribe
    expect(listener).toHaveBeenCalledWith(DEFAULT_SITUATIONAL_ROLL_STATE);

    setSituationalRollState({ mode: "advantage", bonus: 2, diceBonus: "1d4" });
    const current = getSituationalRollState();
    expect(current.mode).toBe("advantage");
    expect(current.bonus).toBe(2);
    expect(current.diceBonus).toBe("1d4");
    expect(listener).toHaveBeenLastCalledWith(current);

    unsubscribe();
  });

  it("resets state back to default on resetSituationalRollState", () => {
    setSituationalRollState({ mode: "disadvantage", bonus: -2 });
    expect(getSituationalRollState().mode).toBe("disadvantage");

    resetSituationalRollState();
    expect(getSituationalRollState()).toEqual(DEFAULT_SITUATIONAL_ROLL_STATE);
  });

  it("consumes situational roll override, calculates total bonus, and auto-resets state", () => {
    setSituationalRollState({ mode: "advantage", bonus: 2, diceBonus: "1d4" });

    const override = consumeSituationalRollOverride();
    expect(override.hasOverride).toBe(true);
    expect(override.mode).toBe("advantage");
    expect(override.bonus).toBe(2);
    expect(override.diceBonus).toBe("1d4");
    expect(override.rolledDiceBonus).toBeGreaterThanOrEqual(1);
    expect(override.rolledDiceBonus).toBeLessThanOrEqual(4);
    expect(override.totalBonus).toBe(override.bonus + override.rolledDiceBonus);
    expect(override.breakdown).toContain("1d4");
    expect(override.breakdown).toContain("+2");

    // Must be auto-reset to default immediately after consume
    const after = getSituationalRollState();
    expect(after).toEqual(DEFAULT_SITUATIONAL_ROLL_STATE);
  });

  it("reports hasOverride = false when consuming default state", () => {
    const override = consumeSituationalRollOverride();
    expect(override.hasOverride).toBe(false);
    expect(override.mode).toBe("normal");
    expect(override.totalBonus).toBe(0);
    expect(override.rolledDiceBonus).toBe(0);
  });

  describe("independent scopes ('attack' vs 'checks')", () => {
    it("maintains separate state for attack and checks scopes", () => {
      setSituationalRollState({ mode: "advantage", bonus: 2 }, "attack");
      setSituationalRollState({ mode: "disadvantage", bonus: -1, diceBonus: "1d4" }, "checks");

      const attackState = getSituationalRollState("attack");
      const checksState = getSituationalRollState("checks");

      expect(attackState.mode).toBe("advantage");
      expect(attackState.bonus).toBe(2);
      expect(attackState.diceBonus).toBe("");

      expect(checksState.mode).toBe("disadvantage");
      expect(checksState.bonus).toBe(-1);
      expect(checksState.diceBonus).toBe("1d4");
    });

    it("resets only the specified scope", () => {
      setSituationalRollState({ mode: "advantage", bonus: 3 }, "attack");
      setSituationalRollState({ mode: "disadvantage", bonus: -2 }, "checks");

      resetSituationalRollState("checks");

      expect(getSituationalRollState("checks")).toEqual(DEFAULT_SITUATIONAL_ROLL_STATE);
      expect(getSituationalRollState("attack").mode).toBe("advantage");
      expect(getSituationalRollState("attack").bonus).toBe(3);
    });

    it("consumes override only from the targeted scope", () => {
      setSituationalRollState({ mode: "advantage", bonus: 2 }, "attack");
      setSituationalRollState({ mode: "disadvantage", bonus: -3 }, "checks");

      // Consume checks (e.g., from CharacterChecks.tsx)
      const checksOverride = consumeSituationalRollOverride("checks");
      expect(checksOverride.hasOverride).toBe(true);
      expect(checksOverride.mode).toBe("disadvantage");
      expect(checksOverride.bonus).toBe(-3);

      // Checks must be reset to default
      expect(getSituationalRollState("checks")).toEqual(DEFAULT_SITUATIONAL_ROLL_STATE);

      // Attack state must remain completely unaffected
      const attackState = getSituationalRollState("attack");
      expect(attackState.mode).toBe("advantage");
      expect(attackState.bonus).toBe(2);

      // Consume attack (e.g., from weapon/spell attack)
      const attackOverride = consumeSituationalRollOverride("attack");
      expect(attackOverride.hasOverride).toBe(true);
      expect(attackOverride.mode).toBe("advantage");
      expect(attackOverride.bonus).toBe(2);

      // Now attack state is reset to default
      expect(getSituationalRollState("attack")).toEqual(DEFAULT_SITUATIONAL_ROLL_STATE);
    });

    it("notifies subscribers only for their designated scope", () => {
      const attackListener = vi.fn();
      const checksListener = vi.fn();

      const unsubAttack = subscribeSituationalRollState(attackListener, "attack");
      const unsubChecks = subscribeSituationalRollState(checksListener, "checks");

      attackListener.mockClear();
      checksListener.mockClear();

      // Update attack scope
      setSituationalRollState({ mode: "advantage" }, "attack");
      expect(attackListener).toHaveBeenCalledTimes(1);
      expect(attackListener).toHaveBeenCalledWith(expect.objectContaining({ mode: "advantage" }));
      expect(checksListener).not.toHaveBeenCalled();

      // Update checks scope
      setSituationalRollState({ bonus: 4 }, "checks");
      expect(checksListener).toHaveBeenCalledTimes(1);
      expect(checksListener).toHaveBeenCalledWith(expect.objectContaining({ bonus: 4 }));
      expect(attackListener).toHaveBeenCalledTimes(1);

      unsubAttack();
      unsubChecks();
    });
  });

  describe("pending critical hit tracking", () => {
    it("tracks and consumes pending critical hit by action ID and fallback", () => {
      registerPendingCriticalHit("fire_bolt");
      expect(peekPendingCriticalHit("fire_bolt")).toBe(true);
      expect(peekPendingCriticalHit()).toBe(true);

      const consumed = consumePendingCriticalHit("fire_bolt");
      expect(consumed).toBe(true);
      expect(peekPendingCriticalHit("fire_bolt")).toBe(false);
      expect(peekPendingCriticalHit()).toBe(false);
    });

    it("clears pending critical hits", () => {
      registerPendingCriticalHit("action_1");
      clearPendingCriticalHits();
      expect(peekPendingCriticalHit("action_1")).toBe(false);
      expect(peekPendingCriticalHit()).toBe(false);
    });
  });
});
