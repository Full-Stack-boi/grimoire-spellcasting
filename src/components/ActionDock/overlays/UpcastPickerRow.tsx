import React from "react";
import type { DDBParsedSpell } from "../../../types/ddb";
import { IconCastLightning } from "../shared/Bg3Icons";

interface UpcastPickerRowProps {
    spell: { id: string; level: number; rawDdbSpell?: DDBParsedSpell };
    colSpan: number;
    availableLevels: number[];
    selectedLevel: number;
    pactMagicLevel?: number;
    getRemainingSlots: (level: number) => number;
    onLevelChange: (level: number) => void;
    onCast: (spellId: string, level: number) => void;
    onCancel: () => void;
}

export const UpcastPickerRow: React.FC<UpcastPickerRowProps> = ({
    spell,
    colSpan,
    availableLevels,
    selectedLevel,
    pactMagicLevel,
    getRemainingSlots,
    onLevelChange,
    onCast,
    onCancel,
}) => {
    const hasFree = Boolean(spell.rawDdbSpell?.hasFreeCast || (spell.rawDdbSpell?.usesSpellSlot === false && spell.rawDdbSpell?.limitedUse));
    const freeMax = spell.rawDdbSpell?.freeCast?.max ?? spell.rawDdbSpell?.limitedUse?.max ?? 1;
    const freeReset = spell.rawDdbSpell?.freeCast?.resetType ?? spell.rawDdbSpell?.limitedUse?.resetType ?? "Long Rest";

    return (
        <tr className="ddb-upcast-picker-row">
            <td colSpan={colSpan}>
                <div className="ddb-upcast-picker" onClick={event => event.stopPropagation()}>
                    {hasFree && (
                        <div className="ddb-free-cast-section" style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                            <button
                                type="button"
                                className="ddb-upcast-confirm-btn free-cast-btn"
                                style={{
                                    background: "linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(202, 138, 4, 0.35))",
                                    border: "1px solid rgba(234, 179, 8, 0.6)",
                                    color: "#fef08a",
                                    width: "100%",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    padding: "6px 12px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                }}
                                onClick={() => onCast(spell.id, 0)}
                            >
                                <IconCastLightning size={12} />
                                <span>✨ Cast Free ({freeMax}/{freeReset} • 0 Slots)</span>
                            </button>
                        </div>
                    )}
                    {availableLevels.length > 0 && (
                        <>
                            <div className="ddb-upcast-levels">
                                <span className="ddb-upcast-picker-label">{hasFree ? "Or cast using spell slot:" : "Cast at level:"}</span>
                                {availableLevels.map(level => {
                                    const remaining = getRemainingSlots(level);
                                    const isPact = level === pactMagicLevel;
                                    return (
                                        <button
                                            key={level}
                                            type="button"
                                            className={["ddb-upcast-lvl-btn", selectedLevel === level ? "selected" : "", remaining === 0 ? "exhausted" : "", isPact ? "pact" : ""].filter(Boolean).join(" ")}
                                            disabled={remaining === 0}
                                            onClick={() => onLevelChange(level)}
                                            title={`${remaining} slot${remaining !== 1 ? "s" : ""} remaining`}
                                        >
                                            <span className="ddb-upcast-lvl-num">{level}</span><span className="ddb-upcast-lvl-remain">{remaining} left</span>
                                        </button>
                                    );
                                })}
                            </div>
                            {spell.rawDdbSpell?.higherLevels && selectedLevel > spell.level && (
                                <div className="ddb-upcast-effect-text">
                                    <span className="ddb-upcast-effect-label">At Level {selectedLevel}:</span>
                                    <span>{spell.rawDdbSpell.higherLevels}</span>
                                </div>
                            )}
                            <div className="ddb-upcast-confirm-row">
                                <button type="button" className="ddb-upcast-confirm-btn" disabled={selectedLevel === 0 || getRemainingSlots(selectedLevel) === 0} onClick={() => onCast(spell.id, selectedLevel)}>
                                    <IconCastLightning size={12} /><span>Cast at Level {selectedLevel || spell.level}</span>
                                </button>
                                <button type="button" className="ddb-upcast-cancel-btn" onClick={onCancel}>Cancel</button>
                            </div>
                        </>
                    )}
                    {availableLevels.length === 0 && !hasFree && (
                        <div className="ddb-upcast-confirm-row">
                            <button type="button" className="ddb-upcast-cancel-btn" onClick={onCancel}>Close</button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};
