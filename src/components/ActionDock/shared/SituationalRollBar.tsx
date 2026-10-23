import React, { useEffect, useState } from "react";
import {
  SituationalAdvantageMode,
  SituationalRollScope,
  SituationalRollState,
  getSituationalRollState,
  setSituationalRollState,
  resetSituationalRollState,
  subscribeSituationalRollState,
} from "../../../services/situationalRollModifierService";
import "./SituationalRollBar.scss";

export interface SituationalRollBarProps {
  className?: string;
  compact?: boolean;
  layout?: "auto" | "stacked" | "inline";
  scope?: SituationalRollScope;
}

export const SituationalRollBar: React.FC<SituationalRollBarProps> = ({
  className = "",
  compact = false,
  layout = "auto",
  scope = "attack",
}) => {
  const [state, setState] = useState<SituationalRollState>(() => getSituationalRollState(scope));

  useEffect(() => {
    setState(getSituationalRollState(scope));
    return subscribeSituationalRollState((newState) => {
      setState(newState);
    }, scope);
  }, [scope]);

  const handleModeChange = (mode: SituationalAdvantageMode) => {
    if (state.mode === mode && mode !== "normal") {
      setSituationalRollState({ mode: "normal" }, scope);
    } else {
      setSituationalRollState({ mode }, scope);
    }
  };

  const handleBonusStep = (delta: number) => {
    setSituationalRollState({ bonus: state.bonus + delta }, scope);
  };

  const handleQuickBonus = (bonus: number, diceBonus = "") => {
    if (state.bonus === bonus && state.diceBonus === diceBonus) {
      setSituationalRollState({ bonus: 0, diceBonus: "" }, scope);
    } else {
      setSituationalRollState({ bonus, diceBonus }, scope);
    }
  };

  const hasOverride =
    state.mode !== "normal" || state.bonus !== 0 || Boolean(state.diceBonus);

  const displayBonus =
    state.bonus > 0 ? `+${state.bonus}` : state.bonus < 0 ? `${state.bonus}` : "+0";

  const bonusText = state.diceBonus
    ? `${state.diceBonus}${state.bonus !== 0 ? (state.bonus > 0 ? `+${state.bonus}` : state.bonus) : ""}`
    : displayBonus;

  const isStacked = layout === "stacked";
  const barTitle = scope === "checks"
    ? "Situational Advantage / Modifiers for next Check or Save (Auto-resets after rolling)"
    : "Situational Advantage / Modifiers for next Attack roll (Auto-resets after rolling)";

  if (isStacked) {
    return (
      <div
        className={`situational-roll-bar stacked ${compact ? "compact" : ""} ${hasOverride ? "has-override" : ""} ${className}`}
        title={barTitle}
      >
        {/* Row 1: ADV / NORM / DIS Mode & Reset */}
        <div className="srb-row srb-row-top">
          <div className="srb-mode-group" role="group" aria-label="Roll Mode">
            <button
              type="button"
              className={`srb-mode-btn adv ${state.mode === "advantage" ? "active" : ""}`}
              onClick={() => handleModeChange("advantage")}
              title="Advantage (roll 2d20, keep highest)"
            >
              ADV
            </button>
            <button
              type="button"
              className={`srb-mode-btn norm ${state.mode === "normal" ? "active" : ""}`}
              onClick={() => handleModeChange("normal")}
              title="Normal roll"
            >
              NORM
            </button>
            <button
              type="button"
              className={`srb-mode-btn dis ${state.mode === "disadvantage" ? "active" : ""}`}
              onClick={() => handleModeChange("disadvantage")}
              title="Disadvantage (roll 2d20, keep lowest)"
            >
              DIS
            </button>
          </div>

          {hasOverride && (
            <div className="srb-override-cluster">
              <button
                type="button"
                className="srb-reset-btn"
                onClick={() => resetSituationalRollState(scope)}
                title="Reset modifiers to Normal & +0"
                aria-label="Reset roll modifier"
              >
                ↺
              </button>
              <span className="srb-auto-reset-tag">1-shot</span>
            </div>
          )}
        </div>

        {/* Row 2: Capsule Stepper & Quick Pills */}
        <div className="srb-row srb-row-bottom">
          <div className="srb-stepper-capsule">
            <button
              type="button"
              className="srb-stepper-btn minus"
              onClick={() => handleBonusStep(-1)}
              title="Decrease modifier by 1"
              aria-label="Decrease modifier by 1"
            >
              −
            </button>
            <span
              className={`srb-value-badge ${
                state.bonus > 0 || state.diceBonus ? "positive" : state.bonus < 0 ? "negative" : "neutral"
              }`}
            >
              {bonusText}
            </span>
            <button
              type="button"
              className="srb-stepper-btn plus"
              onClick={() => handleBonusStep(1)}
              title="Increase modifier by 1"
              aria-label="Increase modifier by 1"
            >
              +
            </button>
          </div>

          <div className="srb-quick-pills">
            <button
              type="button"
              className={`srb-pill ${state.bonus === 2 && !state.diceBonus ? "active" : ""}`}
              onClick={() => handleQuickBonus(2)}
              title="Situational +2"
            >
              +2
            </button>
            <button
              type="button"
              className={`srb-pill ${state.diceBonus === "1d4" ? "active" : ""}`}
              onClick={() => handleQuickBonus(0, "1d4")}
              title="Add 1d4 (Bless, Guidance)"
            >
              +1d4
            </button>
            <button
              type="button"
              className={`srb-pill ${state.bonus === -2 && !state.diceBonus ? "active" : ""}`}
              onClick={() => handleQuickBonus(-2)}
              title="Situational -2"
            >
              −2
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Inline Layout (Single sleek horizontal row)
  return (
    <div
      className={`situational-roll-bar inline ${compact ? "compact" : ""} ${hasOverride ? "has-override" : ""} ${className}`}
      title={barTitle}
    >
      {/* 1. Mode selection: ADV / NORM / DIS */}
      <div className="srb-mode-group" role="group" aria-label="Roll Mode">
        <button
          type="button"
          className={`srb-mode-btn adv ${state.mode === "advantage" ? "active" : ""}`}
          onClick={() => handleModeChange("advantage")}
          title="Advantage (roll 2d20, keep highest)"
        >
          ADV
        </button>
        <button
          type="button"
          className={`srb-mode-btn norm ${state.mode === "normal" ? "active" : ""}`}
          onClick={() => handleModeChange("normal")}
          title="Normal roll"
        >
          NORM
        </button>
        <button
          type="button"
          className={`srb-mode-btn dis ${state.mode === "disadvantage" ? "active" : ""}`}
          onClick={() => handleModeChange("disadvantage")}
          title="Disadvantage (roll 2d20, keep lowest)"
        >
          DIS
        </button>
      </div>

      <div className="srb-divider" />

      {/* 2. Unified Stepper Capsule [-] [+0] [+] */}
      <div className="srb-stepper-capsule">
        <button
          type="button"
          className="srb-stepper-btn minus"
          onClick={() => handleBonusStep(-1)}
          title="Decrease modifier by 1"
          aria-label="Decrease modifier by 1"
        >
          −
        </button>
        <span
          className={`srb-value-badge ${
            state.bonus > 0 || state.diceBonus ? "positive" : state.bonus < 0 ? "negative" : "neutral"
          }`}
        >
          {bonusText}
        </span>
        <button
          type="button"
          className="srb-stepper-btn plus"
          onClick={() => handleBonusStep(1)}
          title="Increase modifier by 1"
          aria-label="Increase modifier by 1"
        >
          +
        </button>
      </div>

      {/* 3. Quick Chips (+2, +1d4, -2) */}
      <div className="srb-quick-pills">
        <button
          type="button"
          className={`srb-pill ${state.bonus === 2 && !state.diceBonus ? "active" : ""}`}
          onClick={() => handleQuickBonus(2)}
          title="Situational +2"
        >
          +2
        </button>
        <button
          type="button"
          className={`srb-pill ${state.diceBonus === "1d4" ? "active" : ""}`}
          onClick={() => handleQuickBonus(0, "1d4")}
          title="Add 1d4 (Bless, Guidance)"
        >
          +1d4
        </button>
        <button
          type="button"
          className={`srb-pill ${state.bonus === -2 && !state.diceBonus ? "active" : ""}`}
          onClick={() => handleQuickBonus(-2)}
          title="Situational -2"
        >
          −2
        </button>
      </div>

      {/* 4. Reset Button & Tag */}
      {hasOverride && (
        <div className="srb-override-cluster">
          <button
            type="button"
            className="srb-reset-btn"
            onClick={() => resetSituationalRollState(scope)}
            title="Reset to Normal & +0"
            aria-label="Reset roll modifier"
          >
            ↺
          </button>
          <span className="srb-auto-reset-tag">1-shot</span>
        </div>
      )}
    </div>
  );
};
