import React, { useEffect, useMemo, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import "./CharacterChecks.scss";
import { useOBR } from "../../platform/obr/react/providers/BaseOBRProvider";
import { resolveActiveCaster, ActiveCasterInfo } from "../../features/targeting/infrastructure/obr/activeCasterResolver";
import {
    getLinkedDDBCharacterId,
    getCachedDDBCharacter,
    fetchDDBCharacter
} from "../../services/ddbService";
import { DDBParsedCharacter, DDBSkill, DDBSavingThrow } from "../../types/ddb";
import { rollAttack } from "../../utils/dice";
import { broadcastDDBRoll } from "../../services/rollLogService";
import { getTokenVitals, resolveTokenConcentrationSave } from "../../features/combat/tokenVitalsService";
import { resolveConditionRules } from "../../features/combat/domain/conditionRules";
import { loadCombatState, saveCombatState } from "../../services/combatStateService";
import { IconDragon, IconSearch, IconDiceD20 } from "../ActionDock/shared/Bg3Icons";
import { openDDBSyncModal } from "../../views/DDBSyncModal";

export type ChecksTab = "SAVES" | "SKILLS" | "PROFICIENCIES_SENSES";

const ABILITY_CONFIG: Array<{ key: "str" | "dex" | "con" | "int" | "wis" | "cha"; label: string; full: string }> = [
    { key: "str", label: "STR", full: "STRENGTH" },
    { key: "dex", label: "DEX", full: "DEXTERITY" },
    { key: "con", label: "CON", full: "CONSTITUTION" },
    { key: "int", label: "INT", full: "INTELLIGENCE" },
    { key: "wis", label: "WIS", full: "WISDOM" },
    { key: "cha", label: "CHA", full: "CHARISMA" },
];

export const CharacterChecks: React.FC<{ passedChar?: DDBParsedCharacter | null; passedTokenId?: string }> = ({ passedChar, passedTokenId }) => {
    const obr = useOBR();
    const [caster, setCaster] = useState<ActiveCasterInfo | null>(null);
    const [syncedChar, setSyncedChar] = useState<DDBParsedCharacter | null>(passedChar || null);
    const [activeTab, setActiveTab] = useState<ChecksTab>("SAVES");
    const [skillSearch, setSkillSearch] = useState<string>("");
    const [abilityFilter, setAbilityFilter] = useState<string>("ALL");

    useEffect(() => {
        if (passedChar) {
            setSyncedChar(passedChar);
            return;
        }

        if (!obr.ready || !obr.sceneReady) return;

        const updateCaster = async () => {
            try {
                const role = obr.player?.role || "PLAYER";
                const id = obr.player?.id || "";
                const active = await resolveActiveCaster(role, id);
                setCaster(active);

                if (active?.item) {
                    const charId = getLinkedDDBCharacterId(active.item);
                    if (charId) {
                        const cached = getCachedDDBCharacter(charId);
                        if (cached) {
                            setSyncedChar(cached);
                        } else {
                            fetchDDBCharacter(charId).then(setSyncedChar).catch(console.error);
                        }
                    } else {
                        setSyncedChar(null);
                    }
                }
            } catch (err) {
                console.error("CharacterChecks update error:", err);
            }
        };

        updateCaster();
    }, [obr.ready, obr.sceneReady, obr.player, passedChar]);

    // Fallback default stats if no character linked (memoized)
    const stats = useMemo(() => syncedChar?.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }, [syncedChar?.stats]);
    const modifiers = useMemo(() => syncedChar?.modifiers || { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }, [syncedChar?.modifiers]);
    const proficiencyBonus = syncedChar?.proficiencyBonus || 2;

    // Saving throws (memoized to avoid re-renders)
    const savingThrows: Record<"str" | "dex" | "con" | "int" | "wis" | "cha", DDBSavingThrow> = useMemo(() => {
        return syncedChar?.savingThrows || {
            str: { ability: "str", label: "STR", bonus: modifiers.str, proficient: false },
            dex: { ability: "dex", label: "DEX", bonus: modifiers.dex, proficient: false },
            con: { ability: "con", label: "CON", bonus: modifiers.con, proficient: false },
            int: { ability: "int", label: "INT", bonus: modifiers.int, proficient: false },
            wis: { ability: "wis", label: "WIS", bonus: modifiers.wis, proficient: false },
            cha: { ability: "cha", label: "CHA", bonus: modifiers.cha, proficient: false },
        };
    }, [syncedChar?.savingThrows, modifiers]);

    // Skills (memoized to avoid re-renders)
    const skillsList: DDBSkill[] = useMemo(() => {
        return syncedChar?.skills || [
            { key: "acrobatics", name: "Acrobatics", ability: "dex", abilityLabel: "DEX", bonus: modifiers.dex, proficient: false },
            { key: "animal-handling", name: "Animal Handling", ability: "wis", abilityLabel: "WIS", bonus: modifiers.wis, proficient: false },
            { key: "arcana", name: "Arcana", ability: "int", abilityLabel: "INT", bonus: modifiers.int, proficient: false },
            { key: "athletics", name: "Athletics", ability: "str", abilityLabel: "STR", bonus: modifiers.str, proficient: false },
            { key: "deception", name: "Deception", ability: "cha", abilityLabel: "CHA", bonus: modifiers.cha, proficient: false },
            { key: "history", name: "History", ability: "int", abilityLabel: "INT", bonus: modifiers.int, proficient: false },
            { key: "insight", name: "Insight", ability: "wis", abilityLabel: "WIS", bonus: modifiers.wis, proficient: false },
            { key: "intimidation", name: "Intimidation", ability: "cha", abilityLabel: "CHA", bonus: modifiers.cha, proficient: false },
            { key: "investigation", name: "Investigation", ability: "int", abilityLabel: "INT", bonus: modifiers.int, proficient: false },
            { key: "medicine", name: "Medicine", ability: "wis", abilityLabel: "WIS", bonus: modifiers.wis, proficient: false },
            { key: "nature", name: "Nature", ability: "int", abilityLabel: "INT", bonus: modifiers.int, proficient: false },
            { key: "perception", name: "Perception", ability: "wis", abilityLabel: "WIS", bonus: modifiers.wis, proficient: false },
            { key: "performance", name: "Performance", ability: "cha", abilityLabel: "CHA", bonus: modifiers.cha, proficient: false },
            { key: "persuasion", name: "Persuasion", ability: "cha", abilityLabel: "CHA", bonus: modifiers.cha, proficient: false },
            { key: "religion", name: "Religion", ability: "int", abilityLabel: "INT", bonus: modifiers.int, proficient: false },
            { key: "sleight-of-hand", name: "Sleight of Hand", ability: "dex", abilityLabel: "DEX", bonus: modifiers.dex, proficient: false },
            { key: "stealth", name: "Stealth", ability: "dex", abilityLabel: "DEX", bonus: modifiers.dex, proficient: false },
            { key: "survival", name: "Survival", ability: "wis", abilityLabel: "WIS", bonus: modifiers.wis, proficient: false },
        ];
    }, [syncedChar?.skills, modifiers]);

    const filteredSkills = useMemo(() => {
        return skillsList.filter(s => {
            if (abilityFilter === "PROFICIENT" && !s.proficient) return false;
            if (abilityFilter !== "ALL" && abilityFilter !== "PROFICIENT" && s.abilityLabel !== abilityFilter) return false;
            if (!skillSearch.trim()) return true;
            const q = skillSearch.trim().toLowerCase();
            return s.name.toLowerCase().includes(q) || s.abilityLabel.toLowerCase().includes(q);
        });
    }, [skillsList, abilityFilter, skillSearch]);

    // Count proficient skills and saves for tab badges
    const proficientSkillsCount = useMemo(() => skillsList.filter(s => s.proficient).length, [skillsList]);
    const proficientSavesCount = useMemo(() => Object.values(savingThrows).filter(s => s.proficient).length, [savingThrows]);

    // Senses
    const senses = syncedChar?.sensesInfo || {
        passivePerception: 10 + (skillsList.find(s => s.key === "perception")?.bonus || modifiers.wis),
        passiveInvestigation: 10 + (skillsList.find(s => s.key === "investigation")?.bonus || modifiers.int),
        passiveInsight: 10 + (skillsList.find(s => s.key === "insight")?.bonus || modifiers.wis),
        specialSenses: ["Darkvision 60 ft."]
    };

    // Proficiencies
    const proficiencies = syncedChar?.proficiencies || {
        armor: ["Light Armor"],
        weapons: ["Simple Weapons"],
        tools: ["Thieves' Tools"],
        languages: ["Common"]
    };

    // Roll Handlers
    const resolveRollContext = async (rollKind: "ability_check" | "saving_throw", ability: string) => {
        let tokenId = passedTokenId || caster?.item?.id;
        if (!tokenId) {
            const selection = await OBR.player.getSelection().catch(() => [] as string[]);
            tokenId = selection?.[0];
        }
        const [vitals, combatState] = await Promise.all([
            tokenId ? getTokenVitals(tokenId) : Promise.resolve(null),
            syncedChar?.id ? loadCombatState(syncedChar.id) : Promise.resolve(null),
        ]);
        const rules = resolveConditionRules({
            conditions: [...(vitals?.conditions ?? []), ...(combatState?.conditions ?? [])],
            exhaustionLevel: vitals?.exhaustionLevel ?? combatState?.exhaustionLevel,
            rollKind,
            ability,
        });
        if (rules.requiresAdjudication.length > 0) {
            OBR.notification.show(
                `DM adjudication needed: ${rules.requiresAdjudication.join("; ")}`,
                "WARNING",
            );
        }
        return { rules, tokenId, vitals };
    };

    const handleRollAbilityCheck = async (ability: "str" | "dex" | "con" | "int" | "wis" | "cha", label: string) => {
        const { rules } = await resolveRollContext("ability_check", ability);
        if (rules.blocked) {
            OBR.notification.show(rules.reasons.join(" • "), "WARNING");
            return;
        }
        const effectiveBonus = modifiers[ability] - rules.d20Penalty;
        const res = rollAttack(effectiveBonus, "", rules.mode);
        const casterName = syncedChar?.name || "Character";
        const bonusStr = effectiveBonus >= 0 ? `+ ${effectiveBonus}` : `- ${Math.abs(effectiveBonus)}`;
        const conditionNote = [...rules.reasons, ...rules.requiresAdjudication].join(" • ");

        broadcastDDBRoll([
            {
                id: `${Date.now()}-check`,
                casterName,
                targetName: "SELF",
                actionName: label.toUpperCase(),
                actionType: "CHECK",
                dieType: 20,
                diceBreakdown: `${res.d20} ${bonusStr}`,
                formula: `1d20${effectiveBonus >= 0 ? `+${effectiveBonus}` : `${effectiveBonus}`}${rules.mode === "advantage" ? " (ADV)" : rules.mode === "disadvantage" ? " (DIS)" : ""}`,
                total: res.total,
                subtitle: `${label} Ability Check${conditionNote ? ` • ${conditionNote}` : ""}`,
                isCrit: res.isCrit,
                isMiss: res.isMiss,
                rollMode: rules.mode,
                isAdvantage: rules.mode === "advantage",
                isDisadvantage: rules.mode === "disadvantage",
                timestamp: Date.now()
            }
        ]);
        OBR.notification.show(`${casterName} - ${label} Check: ${res.formatted}${conditionNote ? ` • ${conditionNote}` : ""}`, res.isCrit ? "SUCCESS" : res.isMiss ? "WARNING" : "INFO");
    };

    const handleRollSavingThrow = async (save: DDBSavingThrow) => {
        const { rules, tokenId, vitals } = await resolveRollContext("saving_throw", save.ability);
        if (rules.blocked) {
            OBR.notification.show(rules.reasons.join(" • "), "WARNING");
            return;
        }
        const effectiveBonus = save.bonus - rules.d20Penalty;
        const res = rules.automaticFailure ? null : rollAttack(effectiveBonus, "", rules.mode);
        const casterName = syncedChar?.name || "Character";
        const bonusStr = effectiveBonus >= 0 ? `+ ${effectiveBonus}` : `- ${Math.abs(effectiveBonus)}`;
        const conditionNote = [...rules.reasons, ...rules.requiresAdjudication].join(" • ");

        broadcastDDBRoll([
            {
                id: `${Date.now()}-save`,
                casterName,
                targetName: "SELF",
                actionName: save.label.toUpperCase(),
                actionType: "SAVE",
                dieType: 20,
                diceBreakdown: res ? `${res.d20} ${bonusStr}` : "Automatic failure",
                formula: res
                    ? `1d20${effectiveBonus >= 0 ? `+${effectiveBonus}` : `${effectiveBonus}`}${rules.mode === "advantage" ? " (ADV)" : rules.mode === "disadvantage" ? " (DIS)" : ""}`
                    : "Automatic failure from condition",
                total: res ? res.total : "AUTO FAIL",
                subtitle: `${save.label} Saving Throw${rules.automaticFailure ? " • Automatic Failure" : ""}${conditionNote ? ` • ${conditionNote}` : ""}`,
                isCrit: res?.isCrit,
                isMiss: res?.isMiss,
                rollMode: rules.mode,
                isAdvantage: rules.mode === "advantage",
                isDisadvantage: rules.mode === "disadvantage",
                timestamp: Date.now()
            }
        ]);
        OBR.notification.show(
            rules.automaticFailure
                ? `${casterName} - ${save.label} Save automatically fails. ${conditionNote}`
                : `${casterName} - ${save.label} Save: ${res?.formatted}${conditionNote ? ` • ${conditionNote}` : ""}`,
            rules.automaticFailure ? "WARNING" : res?.isCrit ? "SUCCESS" : res?.isMiss ? "WARNING" : "INFO",
        );
        if (save.ability === "con" && tokenId && vitals?.pendingConcentrationSaves?.length) {
            const resolution = await resolveTokenConcentrationSave(tokenId, res?.total ?? 0);
            if (resolution.resolved && resolution.succeeded === false) {
                if (syncedChar?.id) {
                    await saveCombatState(syncedChar.id, {
                        concentrationSpellId: null,
                        concentrationSpellName: null,
                        hexTargetId: null,
                        hexTargetName: null,
                        hexAbility: null,
                    });
                }
                OBR.notification.show(
                    `Concentration on "${resolution.resolved.spellName}" ends: CON save failed DC ${resolution.resolved.dc}.`,
                    "WARNING",
                );
            } else if (resolution.resolved && resolution.succeeded) {
                OBR.notification.show(
                    `Concentration maintained: CON save succeeded DC ${resolution.resolved.dc}.`,
                    "SUCCESS",
                );
            }
        }
    };

    const handleRollSkill = async (skill: DDBSkill) => {
        const { rules } = await resolveRollContext("ability_check", skill.ability);
        if (rules.blocked) {
            OBR.notification.show(rules.reasons.join(" • "), "WARNING");
            return;
        }
        const effectiveBonus = skill.bonus - rules.d20Penalty;
        const res = rollAttack(effectiveBonus, "", rules.mode);
        const casterName = syncedChar?.name || "Character";
        const bonusStr = effectiveBonus >= 0 ? `+ ${effectiveBonus}` : `- ${Math.abs(effectiveBonus)}`;
        const conditionNote = [...rules.reasons, ...rules.requiresAdjudication].join(" • ");

        broadcastDDBRoll([
            {
                id: `${Date.now()}-skill`,
                casterName,
                targetName: "SELF",
                actionName: skill.name.toUpperCase(),
                actionType: "CHECK",
                dieType: 20,
                diceBreakdown: `${res.d20} ${bonusStr}`,
                formula: `1d20${effectiveBonus >= 0 ? `+${effectiveBonus}` : `${effectiveBonus}`}${rules.mode === "advantage" ? " (ADV)" : rules.mode === "disadvantage" ? " (DIS)" : ""}`,
                total: res.total,
                subtitle: `${skill.name} Ability Check${conditionNote ? ` • ${conditionNote}` : ""}`,
                isCrit: res.isCrit,
                isMiss: res.isMiss,
                rollMode: rules.mode,
                isAdvantage: rules.mode === "advantage",
                isDisadvantage: rules.mode === "disadvantage",
                timestamp: Date.now()
            }
        ]);
        OBR.notification.show(`${casterName} - ${skill.name} Check: ${res.formatted}${conditionNote ? ` • ${conditionNote}` : ""}`, res.isCrit ? "SUCCESS" : res.isMiss ? "WARNING" : "INFO");
    };

    return (
        <div className="ddb-checks-container">
            {/* Top Identity & Sync Header */}
            <div className="ddb-checks-header">
                <div className="ddb-checks-char-identity">
                    <span className="ddb-checks-char-name">
                        {syncedChar?.name || "Active Character"}
                    </span>
                    {syncedChar && syncedChar.classes && syncedChar.classes.length > 0 && (
                        <span className="ddb-checks-classes-tag">
                            {syncedChar.classes.map(c => `${c.name} ${c.level}`).join(" / ")}
                        </span>
                    )}
                    <span className="ddb-checks-prof-badge">
                        PROF: +{proficiencyBonus}
                    </span>
                </div>
                {!syncedChar && (
                    <button
                        type="button"
                        className="ddb-checks-link-btn"
                        onClick={() => openDDBSyncModal(caster?.id)}
                        title="Link D&D Beyond Character"
                    >
                        <IconDragon size={12} />
                        <span>Link Character</span>
                    </button>
                )}
            </div>

            {/* Quick Ability Scores Strip (Always available at the top for 1-click rolling) */}
            <div className="ddb-abilities-strip">
                {ABILITY_CONFIG.map(({ key, label, full }) => {
                    const score = stats[key] ?? 10;
                    const mod = modifiers[key] ?? 0;
                    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;

                    return (
                        <button
                            key={key}
                            type="button"
                            className={`ddb-ability-strip-pill ${key.toLowerCase()}`}
                            onClick={() => handleRollAbilityCheck(key, full)}
                            title={`Roll ${full} Check (${modStr})`}
                        >
                            <span className="pill-label">{label}</span>
                            <span className="pill-mod">{modStr}</span>
                            <span className="pill-score">({score})</span>
                        </button>
                    );
                })}
            </div>

            {/* Subtabs Navigation Bar (Compact labels that fit 100% without horizontal cutoff) */}
            <div className="ddb-checks-nav-tabs">
                <button
                    type="button"
                    className={`ddb-checks-nav-btn ${activeTab === "SAVES" ? "active" : ""}`}
                    onClick={() => setActiveTab("SAVES")}
                >
                    <span className="tab-title">SAVES</span>
                    <span className="nav-badge">{proficientSavesCount}</span>
                </button>
                <button
                    type="button"
                    className={`ddb-checks-nav-btn ${activeTab === "SKILLS" ? "active" : ""}`}
                    onClick={() => setActiveTab("SKILLS")}
                >
                    <span className="tab-title">SKILLS</span>
                    <span className="nav-badge">{proficientSkillsCount}</span>
                </button>
                <button
                    type="button"
                    className={`ddb-checks-nav-btn ${activeTab === "PROFICIENCIES_SENSES" ? "active" : ""}`}
                    onClick={() => setActiveTab("PROFICIENCIES_SENSES")}
                >
                    <span className="tab-title">PROF &amp; SENSES</span>
                </button>
            </div>

            {/* ========================================================= */}
            {/* TAB 1: SAVING THROWS                                     */}
            {/* ========================================================= */}
            {activeTab === "SAVES" && (
                <div className="ddb-checks-tab-panel saves-panel">
                    {/* Section: Saving Throws (1-column full width, perfectly avoids 2-col overflow) */}
                    <div className="ddb-section-block">
                        <div className="ddb-section-header">
                            <span className="ddb-section-title">SAVING THROWS</span>
                            <span className="ddb-section-hint">Click row to roll Save</span>
                        </div>
                        <div className="ddb-saves-list-full">
                            {ABILITY_CONFIG.map(({ key, label, full }) => {
                                const save = savingThrows[key];
                                const bonusStr = save.bonus >= 0 ? `+${save.bonus}` : `${save.bonus}`;

                                return (
                                    <div
                                        key={key}
                                        className={`ddb-save-row-item ${save.proficient ? "proficient" : ""}`}
                                        onClick={() => handleRollSavingThrow(save)}
                                        title={`Roll ${full} Saving Throw (${bonusStr})`}
                                    >
                                        <div className="ddb-save-row-left">
                                            <div
                                                className={`ddb-prof-dot ${save.proficient ? "filled" : ""}`}
                                                title={save.proficient ? "Proficient" : "Not Proficient"}
                                            />
                                            <span className="ddb-save-full-name">{full}</span>
                                            <span className={`ddb-save-short-tag ${key.toLowerCase()}`}>({label})</span>
                                            {save.proficient && (
                                                <span className="ddb-save-prof-badge">PROFICIENT</span>
                                            )}
                                        </div>
                                        <div className="ddb-save-row-right">
                                            <button
                                                type="button"
                                                className="ddb-save-action-pill"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRollSavingThrow(save);
                                                }}
                                                title={`Roll ${full} Saving Throw: 1d20 ${bonusStr}`}
                                            >
                                                <IconDiceD20 size={12} />
                                                <span>Save {bonusStr}</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: SKILLS (Full-width, Spacious & Filterable)         */}
            {/* ========================================================= */}
            {activeTab === "SKILLS" && (
                <div className="ddb-checks-tab-panel skills-panel">
                    {/* Filters & Search Row */}
                    <div className="ddb-skills-filter-row">
                        <div className="ddb-skills-chip-bar">
                            {["ALL", "PROFICIENT", "STR", "DEX", "INT", "WIS", "CHA"].map(f => (
                                <button
                                    key={f}
                                    type="button"
                                    className={`ddb-filter-chip ${f.toLowerCase()} ${abilityFilter === f ? "active" : ""}`}
                                    onClick={() => setAbilityFilter(f)}
                                >
                                    {f === "PROFICIENT" ? "★ PROF" : f}
                                </button>
                            ))}
                        </div>
                        <div className="ddb-skill-search-wrap">
                            <IconSearch size={11} className="ddb-skill-search-icon" />
                            <input
                                type="text"
                                className="ddb-skill-search-input"
                                placeholder="Search skills..."
                                value={skillSearch}
                                onChange={(e) => setSkillSearch(e.target.value)}
                            />
                            {skillSearch && (
                                <button
                                    type="button"
                                    className="ddb-skill-search-clear"
                                    onClick={() => setSkillSearch("")}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Full-Width Skills Table */}
                    <div className="ddb-skills-table-wrap full-width">
                        <table className="ddb-skills-table">
                            <thead>
                                <tr>
                                    <th className="th-prof" title="Proficiency">PROF</th>
                                    <th className="th-mod" title="Ability Modifier">MOD</th>
                                    <th className="th-name">SKILL</th>
                                    <th className="th-bonus">ROLL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSkills.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="ddb-skills-empty-row">
                                            No skills found matching filter.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSkills.map(skill => {
                                        const bonusStr = skill.bonus >= 0 ? `+${skill.bonus}` : `${skill.bonus}`;

                                        return (
                                            <tr
                                                key={skill.key}
                                                className={`ddb-skill-row ${skill.proficient ? "proficient" : ""}`}
                                                onClick={() => handleRollSkill(skill)}
                                                title={`Click to roll ${skill.name} (${bonusStr})`}
                                            >
                                                <td className="td-prof">
                                                    <div
                                                        className={`ddb-prof-dot ${skill.proficient ? "filled" : ""} ${skill.expertise ? "expertise" : ""}`}
                                                        title={skill.expertise ? "Expertise" : skill.proficient ? "Proficient" : "Not Proficient"}
                                                    />
                                                </td>
                                                <td className="td-mod">
                                                    <span className={`ddb-skill-ability ${skill.abilityLabel.toLowerCase()}`}>
                                                        {skill.abilityLabel}
                                                    </span>
                                                </td>
                                                <td className="td-name">
                                                    <span className="ddb-skill-name">{skill.name}</span>
                                                </td>
                                                <td className="td-bonus">
                                                    <button
                                                        type="button"
                                                        className="ddb-skill-bonus-pill"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRollSkill(skill);
                                                        }}
                                                        title={`Roll ${skill.name}: 1d20 ${bonusStr}`}
                                                    >
                                                        <IconDiceD20 size={11} />
                                                        <span>{bonusStr}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: PROFICIENCIES & SENSES                            */}
            {/* ========================================================= */}
            {activeTab === "PROFICIENCIES_SENSES" && (
                <div className="ddb-checks-tab-panel senses-profs-panel">
                    {/* Passive Senses Grid */}
                    <div className="ddb-section-block">
                        <div className="ddb-section-header">
                            <span className="ddb-section-title">PASSIVE SENSES</span>
                        </div>
                        <div className="ddb-passives-row">
                            <div className="ddb-passive-tile">
                                <span className="passive-value">{senses.passivePerception}</span>
                                <span className="passive-name">PASSIVE PERCEPTION</span>
                            </div>
                            <div className="ddb-passive-tile">
                                <span className="passive-value">{senses.passiveInvestigation}</span>
                                <span className="passive-name">PASSIVE INVESTIGATION</span>
                            </div>
                            <div className="ddb-passive-tile">
                                <span className="passive-value">{senses.passiveInsight}</span>
                                <span className="passive-name">PASSIVE INSIGHT</span>
                            </div>
                        </div>
                        {senses.specialSenses && senses.specialSenses.length > 0 && (
                            <div className="ddb-special-senses-wrap">
                                {senses.specialSenses.map((sense, idx) => (
                                    <span key={idx} className="ddb-special-sense-chip">
                                        👁️ {sense}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Proficiencies & Training */}
                    <div className="ddb-section-block">
                        <div className="ddb-section-header">
                            <span className="ddb-section-title">PROFICIENCIES &amp; TRAINING</span>
                        </div>
                        <div className="ddb-prof-cards-grid">
                            <div className="ddb-prof-block">
                                <span className="prof-block-title">ARMOR TRAINING</span>
                                <div className="prof-chips-wrap">
                                    {proficiencies.armor.length > 0 ? (
                                        proficiencies.armor.map((item, idx) => (
                                            <span key={idx} className="prof-chip armor">{item}</span>
                                        ))
                                    ) : (
                                        <span className="prof-empty">None</span>
                                    )}
                                </div>
                            </div>

                            <div className="ddb-prof-block">
                                <span className="prof-block-title">WEAPON PROFICIENCIES</span>
                                <div className="prof-chips-wrap">
                                    {proficiencies.weapons.length > 0 ? (
                                        proficiencies.weapons.map((item, idx) => (
                                            <span key={idx} className="prof-chip weapon">{item}</span>
                                        ))
                                    ) : (
                                        <span className="prof-empty">None</span>
                                    )}
                                </div>
                            </div>

                            <div className="ddb-prof-block">
                                <span className="prof-block-title">TOOL PROFICIENCIES</span>
                                <div className="prof-chips-wrap">
                                    {proficiencies.tools.length > 0 ? (
                                        proficiencies.tools.map((item, idx) => (
                                            <span key={idx} className="prof-chip tool">{item}</span>
                                        ))
                                    ) : (
                                        <span className="prof-empty">None</span>
                                    )}
                                </div>
                            </div>

                            <div className="ddb-prof-block">
                                <span className="prof-block-title">LANGUAGES</span>
                                <div className="prof-chips-wrap">
                                    {proficiencies.languages.length > 0 ? (
                                        proficiencies.languages.map((item, idx) => (
                                            <span key={idx} className="prof-chip language">{item}</span>
                                        ))
                                    ) : (
                                        <span className="prof-empty">Common</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterChecks;
