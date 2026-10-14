import React from "react";
import { DND_CONDITIONS } from "../domain/constants";
import { getConditionBadgeUri } from "../../../features/combat/domain/conditionIcons";

interface ConditionsPopoverProps {
    conditions: string[];
    exhaustionLevel: number;
    onExhaustionChange: (update: (current: number) => number) => void;
    onToggleCondition: (condition: string) => void;
    onClose?: () => void;
}

export const ConditionsPopover: React.FC<ConditionsPopoverProps> = ({
    conditions,
    exhaustionLevel,
    onExhaustionChange,
    onToggleCondition,
    onClose,
}) => (
    <div className="ddb-conditions-popover pillar-floating">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#f59e0b", letterSpacing: "0.04em" }}>CONDITIONS</span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                    title="2024 Exhaustion: -2 to D20 tests and -5 ft. Speed per level; level 6 is fatal."
                    style={{ fontSize: "0.62rem", color: "#94a3b8" }}
                >
                    Exhaustion
                </span>
                <button type="button" style={{ background: "#334155", border: "none", color: "white", padding: "1px 5px", borderRadius: "2px", cursor: "pointer", fontSize: "0.68rem" }} onClick={() => onExhaustionChange(current => Math.max(0, current - 1))}>-</button>
                <span
                    title={`Exhaustion ${exhaustionLevel}: -${exhaustionLevel * 2} to D20 tests, -${exhaustionLevel * 5} ft. Speed`}
                    style={{ fontSize: "0.68rem", fontWeight: 800, color: exhaustionLevel > 0 ? "#f87171" : "#e2e8f0" }}
                >
                    {exhaustionLevel}
                </span>
                <button type="button" style={{ background: "#334155", border: "none", color: "white", padding: "1px 5px", borderRadius: "2px", cursor: "pointer", fontSize: "0.68rem" }} onClick={() => onExhaustionChange(current => Math.min(6, current + 1))}>+</button>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        title="Close Conditions"
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#94a3b8",
                            fontSize: "11px",
                            cursor: "pointer",
                            padding: "0 2px",
                            lineHeight: 1,
                            marginLeft: "4px",
                        }}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
        <div className="ddb-conditions-grid">
            {DND_CONDITIONS.map(condition => {
                const active = conditions.some(value => value.trim().toLowerCase() === condition.toLowerCase());
                const badge = getConditionBadgeUri(condition);
                return (
                    <button
                        key={condition}
                        type="button"
                        className={`ddb-condition-toggle-btn ${active ? "active" : ""}`}
                        onClick={() => onToggleCondition(condition)}
                        title={`${active ? "Remove" : "Add"} ${condition}`}
                        aria-label={`${active ? "Remove" : "Add"} ${condition} condition`}
                        aria-pressed={active}
                    >
                        <span className="ddb-condition-option">
                            <img src={badge.dataUri} alt="" aria-hidden="true" width="16" height="16" />
                            <span>{condition}</span>
                        </span>
                        <span aria-hidden="true">{active ? "✓" : "+"}</span>
                    </button>
                );
            })}
        </div>
    </div>
);
