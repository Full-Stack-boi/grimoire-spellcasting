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

  const isStacked = layout === "stacked";
  const barTitle = scope === "checks"
    ? "Configure situational Advantage/Disadvantage and Modifiers for your next Check or Saving Throw. Resets automatically after rolling."
    : "Configure situational Advantage/Disadvantage and Modifiers for your next Attack roll. Resets automatically after rolling.";

  if (isStacked) {
    return (
      <div
        className={`situational-roll-bar stacked ${hasOverride ? "has-override" : ""} ${className}`}
        title={barTitle}
      >
        {/* Top Row: Roll Mode Selection & Reset */}
        <div className="srb-row srb-row-top">
          <div className="srb-mode-cluster">
            <span className="srb-label">Roll Mod:</span>
            <div className="srb-mode-group">
              <button
                type="button"
                className={`srb-mode-btn ${state.mode === "advantage" ? "active adv" : ""}`}
                onClick={() => handleModeChange("advantage")}
                title="Roll next action with Advantage (roll 2d20, keep highest)"
              >
                ADV
              </button>
              <button
                type="button"
                className={`srb-mode-btn ${state.mode === "normal" ? "active norm" : ""}`}
                onClick={() => handleModeChange("normal")}
                title="Roll normally"
              >
                NORM
              </button>
              <button
                type="button"
                className={`srb-mode-btn ${state.mode === "disadvantage" ? "active dis" : ""}`}
                onClick={() => handleModeChange("disadvantage")}
                title="Roll next action with Disadvantage (roll 2d20, keep lowest)"
              >
                DIS
              </button>
            </div>
          </div>

          {hasOverride && (
            <div className="srb-override-cluster">
              <button
                type="button"
                className="srb-reset-btn"
                onClick={() => resetSituationalRollState(scope)}
                title="Reset to Normal & +0"
              >
                ↺
              </button>
              <span className="srb-auto-reset-tag">1-shot</span>
            </div>
          )}
        </div>

        {/* Bottom Row: Stepper & Quick Pills */}
        <div className="srb-row srb-row-bottom">
          <div className="srb-mod-section">
            <span className="srb-sublabel">Bonus:</span>
            <button
              type="button"
              className="srb-stepper-btn"
              onClick={() => handleBonusStep(-1)}
              title="Decrease modifier by 1"
            >
              -
            </button>
            <span
              className={`srb-value-badge ${
                state.bonus > 0 ? "positive" : state.bonus < 0 ? "negative" : "neutral"
              }`}
            >
              {state.diceBonus ? `${state.diceBonus}${state.bonus !== 0 ? (state.bonus > 0 ? `+${state.bonus}` : `${state.bonus}`) : ""}` : displayBonus}
            </span>
            <button
              type="button"
              className="srb-stepper-btn"
              onClick={() => handleBonusStep(1)}
              title="Increase modifier by 1"
            >
              +
            </button>

            {!compact && (
              <div className="srb-quick-pills">
                <button
                  type="button"
                  className={`srb-pill ${state.bonus === 2 && !state.diceBonus ? "active" : ""}`}
                  onClick={() => handleQuickBonus(2)}
                  title="Situational +2 (e.g. cover, circumstance)"
                >
                  +2
                </button>
                <button
                  type="button"
                  className={`srb-pill ${state.diceBonus === "1d4" ? "active" : ""}`}
                  onClick={() => handleQuickBonus(0, "1d4")}
                  title="Add 1d4 (e.g. Bless, Guidance)"
                >
                  +1d4
                </button>
                <button
                  type="button"
                  className={`srb-pill ${state.bonus === -2 && !state.diceBonus ? "active" : ""}`}
                  onClick={() => handleQuickBonus(-2)}
                  title="Situational -2 (e.g. heavy weather, penalty)"
                >
                  -2
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`situational-roll-bar ${compact ? "compact" : ""} ${hasOverride ? "has-override" : ""} ${className}`}
      title={barTitle}
    >
      <span className="srb-label">Roll Mod:</span>

      {/* Mode selection: ADV / NORM / DIS */}
      <div className="srb-mode-group">
        <button
          type="button"
          className={`srb-mode-btn ${state.mode === "advantage" ? "active adv" : ""}`}
          onClick={() => handleModeChange("advantage")}
          title="Roll next action with Advantage (roll 2d20, keep highest)"
        >
          ADV
        </button>
        <button
          type="button"
          className={`srb-mode-btn ${state.mode === "normal" ? "active norm" : ""}`}
          onClick={() => handleModeChange("normal")}
          title="Roll normally"
        >
          NORM
        </button>
        <button
          type="button"
          className={`srb-mode-btn ${state.mode === "disadvantage" ? "active dis" : ""}`}
          onClick={() => handleModeChange("disadvantage")}
          title="Roll next action with Disadvantage (roll 2d20, keep lowest)"
        >
          DIS
        </button>
      </div>

      {/* Modifier Adjustment */}
      <div className="srb-mod-section">
        <button
          type="button"
          className="srb-stepper-btn"
          onClick={() => handleBonusStep(-1)}
          title="Decrease modifier by 1"
        >
          -
        </button>
        <span
          className={`srb-value-badge ${
            state.bonus > 0 ? "positive" : state.bonus < 0 ? "negative" : "neutral"
          }`}
        >
          {state.diceBonus ? `${state.diceBonus}${state.bonus !== 0 ? (state.bonus > 0 ? `+${state.bonus}` : `${state.bonus}`) : ""}` : displayBonus}
        </span>
        <button
          type="button"
          className="srb-stepper-btn"
          onClick={() => handleBonusStep(1)}
          title="Increase modifier by 1"
        >
          +
        </button>

        {!compact && (
          <div className="srb-quick-pills">
            <button
              type="button"
              className={`srb-pill ${state.bonus === 2 && !state.diceBonus ? "active" : ""}`}
              onClick={() => handleQuickBonus(2)}
              title="Situational +2 (e.g. cover, circumstance)"
            >
              +2
            </button>
            <button
              type="button"
              className={`srb-pill ${state.diceBonus === "1d4" ? "active" : ""}`}
              onClick={() => handleQuickBonus(0, "1d4")}
              title="Add 1d4 (e.g. Bless, Guidance)"
            >
              +1d4
            </button>
            <button
              type="button"
              className={`srb-pill ${state.bonus === -2 && !state.diceBonus ? "active" : ""}`}
              onClick={() => handleQuickBonus(-2)}
              title="Situational -2 (e.g. heavy weather, penalty)"
            >
              -2
            </button>
          </div>
        )}
      </div>

      {hasOverride && (
        <button
          type="button"
          className="srb-reset-btn"
          onClick={() => resetSituationalRollState(scope)}
          title="Reset to Normal & +0"
        >
          ↺
        </button>
      )}

      {hasOverride && (
        <span className="srb-auto-reset-tag">1-shot auto-reset</span>
      )}
    </div>
  );
};
