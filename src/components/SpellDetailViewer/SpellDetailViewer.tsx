import React, { useEffect, useState } from "react";
import "./SpellDetailViewer.scss";
import { getSpellMetadata, isSpellUpcastable, getScaledSpellStats, getOrdinal } from "../../assets/spellInfo";
import { setSelectedSpell } from "../../effectsTool";
import OBR from "@owlbear-rodeo/sdk";
import { toolID } from "../../effectsTool";
import { IconCastLightning } from "../ActionDock/shared/Bg3Icons";
import { DndIcon } from "../ActionDock/shared/DndIcon";

const SCHOOL_COLORS: Record<string, string> = {
    abjuration:    "#7b9fd4",
    conjuration:   "#b19cd9",
    divination:    "#f0c44a",
    enchantment:   "#f48fb1",
    evocation:     "#ef7c56",
    illusion:      "#80cbc4",
    necromancy:    "#90a4ae",
    transmutation: "#81c784",
};

const DAMAGE_COLORS: Record<string, string> = {
    acid:        "#bef264",
    cold:        "#38bdf8",
    fire:        "#f97316",
    force:       "#f87171",
    lightning:   "#60a5fa",
    necrotic:    "#34d399",
    poison:      "#84cc16",
    psychic:     "#f472b6",
    radiant:     "#facc15",
    thunder:     "#a855f7",
    slashing:    "#94a3b8",
    piercing:    "#94a3b8",
    bludgeoning: "#94a3b8",
};

const getDamageTypeFromName = (dmgStr?: string): string | null => {
    if (!dmgStr) return null;
    const lower = dmgStr.toLowerCase();
    const types = ["fire", "cold", "lightning", "necrotic", "radiant", "acid", "poison", "psychic", "thunder", "force", "slashing", "piercing", "bludgeoning"];
    return types.find(t => lower.includes(t)) || null;
};

export interface SpellDetailViewerProps {
    spellID: string;
    spellName?: string;
    onClose?: () => void;
    onCast?: (castLevel?: number) => void;
    compact?: boolean;
    castButtonLabel?: string;
    style?: React.CSSProperties;
    isModal?: boolean;
}

export const SpellDetailViewer: React.FC<SpellDetailViewerProps> = ({
    spellID,
    spellName,
    onClose,
    onCast,
    compact = false,
    castButtonLabel,
    style,
    isModal = false,
}) => {
    const meta = getSpellMetadata(spellID, spellName);
    const [castLevel, setCastLevel] = useState<number>(meta.level);

    useEffect(() => {
        setCastLevel(meta.level);
    }, [spellID, meta.level]);

    const isUpcastable = isSpellUpcastable(spellID, meta);
    const scaled = getScaledSpellStats(spellID, castLevel, meta);
    const detectedDamageType = getDamageTypeFromName(scaled.damage || meta.damage);
    const schoolKey = meta.school ? meta.school.toLowerCase() : "";
    const schoolColor = SCHOOL_COLORS[schoolKey] || "var(--bg3-gold-primary)";

    const handleCast = async (levelToCast: number = castLevel) => {
        await setSelectedSpell(spellID);
        OBR.tool.activateTool(toolID);
        const upcastMsg = levelToCast > meta.level
            ? ` at ${getOrdinal(levelToCast)} Level (${scaled.damage || "Upcast"})`
            : "";
        OBR.notification.show(`Selected ${meta.name}${upcastMsg}`, "INFO");
        if (onCast) {
            onCast(levelToCast);
        } else if (onClose) {
            onClose();
        }
    };

    const levelText = meta.level === 0 ? "Cantrip" : `Level ${meta.level}`;

    return (
        <div className={`bg3-spell-card ${compact ? "compact" : ""} ${isModal ? "modal-mode" : ""}`} style={style}>
            {/* Header */}
            <div className="bg3-card-header">
                <div className="bg3-card-title-group">
                    {meta.school && (
                        <div
                            className="bg3-card-school-badge-wrapper"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 38,
                                height: 38,
                                borderRadius: "50%",
                                background: "rgba(10, 13, 19, 0.8)",
                                border: `1px solid ${schoolColor}`,
                                boxShadow: `0 0 10px ${schoolColor}33`,
                                flexShrink: 0,
                            }}
                        >
                            <DndIcon
                                category="spell"
                                name={schoolKey}
                                size={22}
                                color={schoolColor}
                                title={meta.school}
                            />
                        </div>
                    )}
                    <div className="bg3-card-title-text">
                        <h3 className="bg3-card-title">{meta.name}</h3>
                        <p className="bg3-card-subtitle" style={{ color: schoolColor }}>
                            {meta.school}
                        </p>
                    </div>
                </div>
                <div className="bg3-card-header-right">
                    <div className="bg3-card-badges">
                        <span className="bg3-badge bg3-badge-level">{levelText}</span>
                        {meta.concentration && (
                            <span className="bg3-badge bg3-badge-concentration" title="Requires Concentration">
                                Conc
                            </span>
                        )}
                        {meta.ritual && (
                            <span className="bg3-badge bg3-badge-ritual" title="Can be cast as a Ritual">
                                Ritual
                            </span>
                        )}
                    </div>
                    {onClose && (
                        <button
                            type="button"
                            className="bg3-header-close-btn"
                            onClick={onClose}
                            title="Close"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="bg3-card-scroll-body">
                {/* D&D Beyond Cast & Level Selector Bar */}
                <div className="dndb-cast-action-bar">
                    <button
                        type="button"
                        className="dndb-cast-btn"
                        onClick={() => handleCast(castLevel)}
                        title={`Cast ${meta.name} at ${getOrdinal(castLevel)} level`}
                    >
                        <IconCastLightning />
                        <span>CAST</span>
                        <span className="dndb-slot-badge">
                            {meta.level === 0 ? "CANTRIP" : `${getOrdinal(castLevel)} SPELL SLOT`}
                        </span>
                    </button>

                    {isUpcastable && (
                        <div className="dndb-level-selector">
                            <span className="dndb-level-label">LEVEL</span>
                            <div className="dndb-stepper">
                                <button
                                    type="button"
                                    className="dndb-step-btn"
                                    onClick={() => setCastLevel(prev => Math.max(meta.level, prev - 1))}
                                    disabled={castLevel <= meta.level}
                                    title="Decrease spell slot level"
                                    aria-label="Decrease spell level"
                                >
                                    −
                                </button>
                                <span className="dndb-level-value">{getOrdinal(castLevel)}</span>
                                <button
                                    type="button"
                                    className="dndb-step-btn"
                                    onClick={() => setCastLevel(prev => Math.min(9, prev + 1))}
                                    disabled={castLevel >= 9}
                                    title="Increase spell slot level (Upcast)"
                                    aria-label="Increase spell level"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* D&D Beyond Scaled Damage Banner */}
                {scaled.damage && (
                    <div className="dndb-scaled-damage-banner">
                        {detectedDamageType && (
                            <DndIcon
                                category="damage"
                                name={detectedDamageType}
                                size={18}
                                color={DAMAGE_COLORS[detectedDamageType] || "#f87171"}
                            />
                        )}
                        <span className="dndb-damage-amount" style={{ color: detectedDamageType ? DAMAGE_COLORS[detectedDamageType] : "#f87171" }}>
                            {scaled.damage}
                        </span>
                        <span className="dndb-damage-label">Damage / Effect</span>
                        {castLevel > meta.level && (
                            <span className="dndb-upcast-tag">Upcast +{castLevel - meta.level}</span>
                        )}
                    </div>
                )}

                {/* Core Stats Grid */}
                <div className="bg3-card-stats-grid">
                    <div className="bg3-stat-item">
                        <span className="bg3-stat-label">Casting Time</span>
                        <span className="bg3-stat-value">
                            <DndIcon
                                category="combat"
                                name={meta.castingTime.toLowerCase().includes("bonus") ? "bonus-action" : meta.castingTime.toLowerCase().includes("reaction") ? "reaction" : "action"}
                                size={13}
                                color="#9ca3af"
                                style={{ marginRight: 6 }}
                            />
                            {meta.castingTime}
                        </span>
                    </div>
                    <div className="bg3-stat-item">
                        <span className="bg3-stat-label">Range</span>
                        <span className="bg3-stat-value highlight-range">
                            <DndIcon
                                category="combat"
                                name={meta.range.toLowerCase().includes("touch") || meta.range.toLowerCase().includes("self") ? "melee" : "ranged"}
                                size={13}
                                color="#38bdf8"
                                style={{ marginRight: 6 }}
                            />
                            {meta.range}
                        </span>
                    </div>
                    {meta.aoe && (
                        <div className="bg3-stat-item aoe-item">
                            <span className="bg3-stat-label">Area of Effect</span>
                            <span className="bg3-stat-value highlight-aoe">{meta.aoe}</span>
                        </div>
                    )}
                    <div className="bg3-stat-item">
                        <span className="bg3-stat-label">Duration</span>
                        <span className="bg3-stat-value">{meta.duration}</span>
                    </div>
                    <div className="bg3-stat-item">
                        <span className="bg3-stat-label">Components</span>
                        <span className="bg3-stat-value">{meta.components}</span>
                    </div>
                    {scaled.damage && (
                        <div className="bg3-stat-item">
                            <span className="bg3-stat-label">Damage / Effect</span>
                            <span className="bg3-stat-value highlight-damage">
                                {detectedDamageType && (
                                    <DndIcon
                                        category="damage"
                                        name={detectedDamageType}
                                        size={14}
                                        color={DAMAGE_COLORS[detectedDamageType] || "#f87171"}
                                        style={{ marginRight: 6 }}
                                    />
                                )}
                                {scaled.damage}
                            </span>
                        </div>
                    )}
                    {meta.saveOrAttack && (
                        <div className="bg3-stat-item">
                            <span className="bg3-stat-label">Attack / Save</span>
                            <span className="bg3-stat-value">{meta.saveOrAttack}</span>
                        </div>
                    )}
                </div>

                {/* Spell Description */}
                <div className="bg3-card-description-section">
                    <p className="bg3-card-description">{meta.description}</p>
                </div>

                {/* Higher Levels Upcast */}
                {meta.higherLevels && (
                    <div className="bg3-card-higher-levels">
                        <strong className="higher-levels-title">At Higher Levels: </strong>
                        <span>{meta.higherLevels}</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            {!compact && (
                <div className="bg3-card-footer">
                    {onClose && (
                        <button type="button" className="bg3-close-btn" onClick={onClose}>
                            Close
                        </button>
                    )}
                    <button type="button" className="bg3-cast-btn" onClick={() => handleCast(castLevel)}>
                        {castButtonLabel ? castButtonLabel : (
                            <span className="bg3-cast-btn-content">
                                <IconCastLightning />
                                <span>Cast Spell</span>
                            </span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpellDetailViewer;
