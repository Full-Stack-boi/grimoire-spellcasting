import React, { useEffect, useState } from "react";
import { IconHitDice } from "../shared/Bg3Icons";
import type { DDBParsedCharacter } from "../../../types/ddb";
import type { DetailDrawerItem } from "../domain/types";

type HitPointDrawerItem = Extract<NonNullable<DetailDrawerItem>, { type: "hp" }>;

interface HitPointDrawerContentProps {
    item: HitPointDrawerItem;
    character?: DDBParsedCharacter;
    currentHp?: number;
    maxHp?: number;
    tempHp?: number;
    usedHitDice: Record<string, number>;
    onHeal: (amount: number) => void;
    onDamage: (amount: number) => void;
    onSetCurrentHp?: (hp: number) => void;
    onSetMaxHp?: (max: number) => void;
    onSetTempHp?: (temp: number) => void;
    onRollHitDie: (die: string, maxSides: number) => void;
}

export const HitPointDrawerContent: React.FC<HitPointDrawerContentProps> = ({
    item,
    character,
    currentHp: liveCurrentHp,
    maxHp: liveMaxHp,
    tempHp: liveTempHp,
    usedHitDice,
    onHeal,
    onDamage,
    onSetCurrentHp,
    onSetMaxHp,
    onSetTempHp,
    onRollHitDie,
}) => {
    const currentVal = liveCurrentHp !== undefined ? liveCurrentHp : item.current;
    const maxVal = liveMaxHp !== undefined ? liveMaxHp : item.max;
    const tempVal = liveTempHp !== undefined ? liveTempHp : (item.temp || 0);

    const [currentInput, setCurrentInput] = useState(String(currentVal));
    const [maxInput, setMaxInput] = useState(String(maxVal));
    const [tempInput, setTempInput] = useState(String(tempVal));

    useEffect(() => {
        setCurrentInput(String(currentVal));
    }, [currentVal]);

    useEffect(() => {
        setMaxInput(String(maxVal));
    }, [maxVal]);

    useEffect(() => {
        setTempInput(String(tempVal));
    }, [tempVal]);

    const handleCommitCurrent = () => {
        const val = parseInt(currentInput, 10);
        if (!isNaN(val) && onSetCurrentHp) {
            onSetCurrentHp(val);
        } else {
            setCurrentInput(String(currentVal));
        }
    };

    const handleCommitMax = () => {
        const val = parseInt(maxInput, 10);
        if (!isNaN(val) && val >= 1 && onSetMaxHp) {
            onSetMaxHp(val);
        } else {
            setMaxInput(String(maxVal));
        }
    };

    const handleCommitTemp = () => {
        const val = parseInt(tempInput, 10);
        if (!isNaN(val) && val >= 0 && onSetTempHp) {
            onSetTempHp(val);
        } else {
            setTempInput(String(tempVal));
        }
    };

    return (
        <div className="ddb-drawer-hp-content">
            <div className="ddb-hp-drawer-grid">
                <div className="ddb-hp-stat-card">
                    <label className="ddb-hp-label" htmlFor="hp-input-current">CURRENT</label>
                    <input
                        id="hp-input-current"
                        type="number"
                        className="ddb-hp-val-input"
                        value={currentInput}
                        min={0}
                        max={maxVal}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onBlur={handleCommitCurrent}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleCommitCurrent();
                                (e.target as HTMLInputElement).blur();
                            }
                        }}
                        aria-label="Current Hit Points"
                    />
                </div>
                <div className="ddb-hp-stat-card">
                    <label className="ddb-hp-label" htmlFor="hp-input-max">MAX</label>
                    <input
                        id="hp-input-max"
                        type="number"
                        className="ddb-hp-val-input"
                        value={maxInput}
                        min={1}
                        onChange={(e) => setMaxInput(e.target.value)}
                        onBlur={handleCommitMax}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleCommitMax();
                                (e.target as HTMLInputElement).blur();
                            }
                        }}
                        aria-label="Maximum Hit Points"
                    />
                </div>
                <div className="ddb-hp-stat-card">
                    <label className="ddb-hp-label" htmlFor="hp-input-temp">TEMP</label>
                    <input
                        id="hp-input-temp"
                        type="number"
                        className="ddb-hp-val-input"
                        value={tempInput}
                        min={0}
                        onChange={(e) => setTempInput(e.target.value)}
                        onBlur={handleCommitTemp}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleCommitTemp();
                                (e.target as HTMLInputElement).blur();
                            }
                        }}
                        aria-label="Temporary Hit Points"
                    />
                </div>
            </div>
            <div className="ddb-hp-quick-buttons">
                <button type="button" className="ddb-hp-btn heal" onClick={() => onHeal(5)}>+5 Heal</button>
                <button type="button" className="ddb-hp-btn dmg" onClick={() => onDamage(5)}>-5 Damage</button>
            </div>

            {character?.hitDice && character.hitDice.length > 0 && (
                <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "#38bdf8", letterSpacing: "0.05em", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <IconHitDice size={12} /> SHORT REST HIT DICE:
                    </span>
                    {character.hitDice.map(hitDie => {
                        const used = usedHitDice[hitDie.die] || 0;
                        const remaining = Math.max(0, hitDie.total - used);
                        const sides = parseInt(hitDie.die.replace(/^\d*d/i, ""), 10) || 8;
                        return (
                            <div key={hitDie.die} className="ddb-hit-dice-group">
                                <span style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>
                                    {hitDie.die}: <strong>{remaining}/{hitDie.total}</strong> left
                                </span>
                                <button
                                    type="button"
                                    className="ddb-hit-dice-roll-btn"
                                    disabled={remaining <= 0}
                                    onClick={() => onRollHitDie(hitDie.die, sides)}
                                >
                                    Spend &amp; Roll ({hitDie.die}+{character.modifiers.con})
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
