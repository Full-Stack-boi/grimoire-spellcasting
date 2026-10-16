import React, { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import "./DDBRollCard.scss";
import { DDBRollCardData } from "../../types/ddbRollLog";
import { fireConditionalTrigger } from "../../services/conditionalTriggerService";
import { applyDamage, applyHeal, getTokenVitals } from "../../features/combat/tokenVitalsService";
import { dispatchCombatFeatureTrigger } from "../../features/combat/domain/combatFeatureHooks";
import { updateRollCardResolution } from "../../services/rollLogService";
import { evaluateShieldReaction, formatHitLabelForViewer, resolveAttackHit } from "../../features/combat/domain/attackResolution";
import { aggregateSubRollDamages } from "../../features/combat/domain/multiTargetDamage";
import { getGlobalSettingsValue, GLOBAL_STORAGE_KEYS, SETTINGS_CHANNEL } from "../Settings/settings";
import {
    DieIconD4,
    DieIconD6,
    DieIconD8,
    DieIconD10,
    DieIconD12,
    DieIconD20,
} from "../ActionDock/overlays/CustomDiceRoller";

export const DamageIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
);

export const HalfDamageIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" />
        <circle cx="17.5" cy="17.5" r="2.5" fill="currentColor" />
    </svg>
);

export const ShieldIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export const CheckIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const DismissIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const ElderFlameDieIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="ddb-roll-card-flame-icon">
        <defs>
            <linearGradient id="elderFlameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id="elderGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#elderGlow)" />
        <polygon points="16,3 28.5,10.2 28.5,24.6 16,31.8 3.5,24.6 3.5,10.2" fill="url(#elderFlameGrad)" stroke="#fef3c7" strokeWidth="1" />
        <polygon points="16,7 24.5,14.5 16,26 7.5,14.5" fill="#78350f" fillOpacity="0.3" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="16" y1="3" x2="16" y2="7" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="28.5" y1="10.2" x2="24.5" y2="14.5" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="28.5" y1="24.6" x2="16" y2="26" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="16" y1="31.8" x2="16" y2="26" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="3.5" y1="24.6" x2="7.5" y2="14.5" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="3.5" y1="10.2" x2="7.5" y2="14.5" stroke="#fde68a" strokeWidth="0.8" />
    </svg>
);

function renderDieIcon(dieType: number, size: number = 20) {
    switch (dieType) {
        case 4:
            return <DieIconD4 size={size} />;
        case 6:
            return <DieIconD6 size={size} />;
        case 8:
            return <DieIconD8 size={size} />;
        case 10:
            return <DieIconD10 size={size} />;
        case 12:
            return <DieIconD12 size={size} />;
        case 20:
        default:
            return <DieIconD20 size={size} />;
    }
}

function getTagClass(actionType: DDBRollCardData["actionType"], isConditionTrigger?: boolean): string {
    if (isConditionTrigger) {
        return "tag-trigger";
    }
    switch (actionType) {
        case "CHECK":
            return "tag-check";
        case "TO HIT":
        case "ATTACK":
            return "tag-to-hit";
        case "DAMAGE":
            return "tag-damage";
        case "HEAL":
            return "tag-heal";
        case "SAVE":
            return "tag-save";
        case "SPELL":
            return "tag-spell";
        default:
            return "tag-check";
    }
}

function renderFormattedFormula(formula?: string) {
    if (!formula) return null;
    if (formula.includes("(DIS)")) {
        const parts = formula.split("(DIS)");
        return (
            <>
                {parts[0]}
                <span className="formula-mode-dis">(DIS)</span>
                {parts.slice(1).join("(DIS)")}
            </>
        );
    }
    if (formula.includes("(ADV)")) {
        const parts = formula.split("(ADV)");
        return (
            <>
                {parts[0]}
                <span className="formula-mode-adv">(ADV)</span>
                {parts.slice(1).join("(ADV)")}
            </>
        );
    }
    return formula;
}

export interface DDBRollCardProps {
    data: DDBRollCardData;
}

export const DDBRollCard: React.FC<DDBRollCardProps> = ({ data }) => {
    const [isGm, setIsGm] = useState(false);
    const [hideTargetAcFromPlayers, setHideTargetAcFromPlayers] = useState(true);
    const [applyingTargetSaveId, setApplyingTargetSaveId] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const fetchRole = async () => {
            try {
                const role = await OBR.player.getRole();
                if (mounted) setIsGm(role === "GM");
            } catch {}
        };

        const loadSetting = async () => {
            try {
                const val = await getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.HIDE_TARGET_AC_FROM_PLAYERS);
                if (mounted && typeof val === "boolean") {
                    setHideTargetAcFromPlayers(val);
                }
            } catch {}
        };

        if (OBR.isReady) {
            fetchRole();
            loadSetting();
        } else {
            OBR.onReady(() => {
                fetchRole();
                loadSetting();
            });
        }

        let unsubscribePlayer: (() => void) | undefined;
        let unsubscribeSettings: (() => void) | undefined;

        try {
            unsubscribePlayer = OBR.player.onChange((player) => {
                if (mounted && player?.role) {
                    setIsGm(player.role === "GM");
                }
            });
        } catch {}

        try {
            unsubscribeSettings = OBR.broadcast.onMessage(SETTINGS_CHANNEL, () => {
                loadSetting();
            });
        } catch {}

        return () => {
            mounted = false;
            if (unsubscribePlayer) unsubscribePlayer();
            if (unsubscribeSettings) unsubscribeSettings();
        };
    }, []);

    const isCrit = Boolean(data.isCrit);
    const isMiss = Boolean(data.isMiss);
    const isGrouped = Boolean(data.subRolls && data.subRolls.length > 0);
    const isConditionTrigger = Boolean(data.isConditionTrigger || data.actionName?.includes("(TRIGGER)"));
    const isDisadvantage = Boolean(
        data.isDisadvantage ||
        data.rollMode === "disadvantage" ||
        data.formula?.includes("(DIS)") ||
        data.diceBreakdown?.includes("DIS") ||
        data.subtitle?.toLowerCase().includes("disadvantage")
    );
    const isAdvantage = Boolean(
        data.isAdvantage ||
        data.rollMode === "advantage" ||
        data.formula?.includes("(ADV)") ||
        data.diceBreakdown?.includes("ADV") ||
        data.subtitle?.toLowerCase().includes("advantage")
    );

    const isHeal = Boolean(data.actionType === "HEAL" || data.subtitle?.toLowerCase().includes("healing"));

    const pendingDmg = typeof data.pendingDamage === "number"
        ? data.pendingDamage
        : (data.actionType === "DAMAGE" && typeof data.total === "number" ? data.total : typeof data.total === "string" ? parseInt(data.total, 10) || 0 : 0);
    const targetSaveResolutions = data.targetSaveResolutions ?? [];
    const hasTargetSaveResolutions = targetSaveResolutions.length > 0;
    const hasPendingDamage = Boolean(
        pendingDmg > 0 &&
        !isHeal &&
        !data.requiresManualDamageAdjudication &&
        !hasTargetSaveResolutions,
    );
    const damageParts = data.damageComponents?.length
        ? data.damageComponents
        : [{ total: pendingDmg, damageType: data.damageType || "", diceBreakdown: "", formula: "" }];
    const halfDmg = data.damageComponents?.length
        ? data.damageComponents.reduce((total, component) => total + Math.floor(component.total / 2), 0)
        : Math.max(0, Math.floor(pendingDmg / 2));
    const hitApprovalLabel = data.requiresHitApproval
        ? data.hitApprovalStatus === "confirmed"
            ? "HIT CONFIRMED BY DM"
            : data.hitApprovalStatus === "missed"
                ? "MISS CONFIRMED BY DM"
                : "AWAITING DM HIT APPROVAL"
        : data.hitLabel;
    const hitApprovalTagClass = data.requiresHitApproval
        ? data.hitApprovalStatus === "confirmed"
            ? "tag-hit"
            : data.hitApprovalStatus === "missed"
                ? "tag-miss"
                : "tag-pending"
        : data.isCrit
            ? "tag-crit"
            : data.isMiss || data.isHit === false
                ? "tag-miss"
                : data.isHit
                    ? "tag-hit"
                    : "tag-miss";
    const hitRecommendation =
        data.requiresHitApproval &&
        typeof data.rollD20 === "number" &&
        typeof data.attackTotal === "number" &&
        typeof data.targetAc === "number"
            ? resolveAttackHit(
                { d20: data.rollD20, total: data.attackTotal },
                data.targetAc,
            )
            : null;
    const hitRecommendationKind = hitRecommendation
        ? hitRecommendation.isCrit
            ? "critical-hit"
            : hitRecommendation.isMiss
                ? "critical-miss"
                : hitRecommendation.isHit
                    ? "hit"
                    : "miss"
        : "unavailable";
    const renderHitRecommendation = () => {
        if (!data.requiresHitApproval) return null;
        if (!hitRecommendation) {
            return (
                <div className="ddb-hit-recommendation is-unavailable" role="status">
                    <strong>AC recommendation unavailable</strong>
                    <span>Review the attack roll manually; target AC was not recorded.</span>
                </div>
            );
        }

        const recommendationLabel = hitRecommendation.isCrit
            ? "Natural 20 — automatic hit"
            : hitRecommendation.isMiss
                ? "Natural 1 — automatic miss"
                : hitRecommendation.isHit
                    ? "AC suggests a hit"
                    : "AC suggests a miss";

        return (
            <div
                className={`ddb-hit-recommendation is-${hitRecommendationKind}`}
                role="status"
                aria-label={`${recommendationLabel}. To Hit ${data.attackTotal} vs AC ${data.targetAc}.`}
            >
                <strong>{recommendationLabel}</strong>
                <span>To Hit {data.attackTotal} vs AC {data.targetAc}</span>
                <span className="ddb-hit-recommendation-note">
                    Apply special rules before deciding.
                </span>
            </div>
        );
    };
    const pendingHeal = isHeal
        ? (typeof data.total === "number" ? data.total : parseInt(String(data.total), 10) || 0)
        : 0;
    const hasPendingResolution = Boolean(
        hasPendingDamage || (isHeal && pendingHeal > 0),
    );

    const [targetDefenses, setTargetDefenses] = useState<Record<string, {
        immunity?: boolean;
        resistance?: boolean;
        vulnerability?: boolean;
    }> | null>(null);

    useEffect(() => {
        const sourceDamageTypes = data.damageComponents?.length
            ? data.damageComponents.map((component) => component.damageType)
            : data.damageType
                ? [data.damageType]
                : [];
        const damageTypes = [...new Set(sourceDamageTypes.filter(Boolean))];
        if (!data.targetId || damageTypes.length === 0) {
            setTargetDefenses(null);
            return;
        }
        let mounted = true;
        getTokenVitals(data.targetId).then((vitals) => {
            if (!mounted || !vitals) return;
            const result: NonNullable<typeof targetDefenses> = {};
            for (const damageType of damageTypes) {
                const normalizedType = damageType.toLowerCase();
                const immunity = vitals.immunities?.some((value) => value.toLowerCase() === normalizedType);
                const resistance = vitals.resistances?.some((value) => value.toLowerCase() === normalizedType);
                const vulnerability = vitals.vulnerabilities?.some((value) => value.toLowerCase() === normalizedType);
                if (immunity || resistance || vulnerability) {
                    result[normalizedType] = { immunity, resistance, vulnerability };
                }
            }
            setTargetDefenses(Object.keys(result).length > 0 ? result : null);
        }).catch(() => {});
        return () => {
            mounted = false;
        };
    }, [data.targetId, data.damageType, data.damageComponents]);

    const applyDefensePreview = (amount: number, damageType: string) => {
        const defense = targetDefenses?.[damageType.toLowerCase()];
        if (defense?.immunity) return 0;
        if (defense?.resistance) return Math.max(0, Math.floor(amount / 2));
        if (defense?.vulnerability) return amount * 2;
        return amount;
    };
    const effectivePreviewDmg = damageParts.reduce(
        (total, part) => total + applyDefensePreview(part.total, part.damageType),
        0,
    );

    const effectivePreviewHalfDmg = damageParts.reduce(
        (total, part) =>
            total + applyDefensePreview(Math.floor(part.total / 2), part.damageType),
        0,
    );
    const hasDamageImmunity = Object.values(targetDefenses || {}).some((defense) => defense.immunity);
    const hasDamageResistance = Object.values(targetDefenses || {}).some((defense) => defense.resistance);
    const hasDamageVulnerability = Object.values(targetDefenses || {}).some((defense) => defense.vulnerability);

    const renderDefenseBadges = () => {
        if (!targetDefenses) return null;
        return (
            <>
                {Object.entries(targetDefenses).map(([damageType, defense]) => (
                    <React.Fragment key={damageType}>
                        {defense.immunity && <span className="ddb-defense-badge is-immune">[Immune: {damageType}]</span>}
                        {defense.resistance && <span className="ddb-defense-badge is-resistant">[Resistant: {damageType}]</span>}
                        {defense.vulnerability && <span className="ddb-defense-badge is-vulnerable">[Vulnerable: {damageType}]</span>}
                    </React.Fragment>
                ))}
            </>
        );
    };

    const handleApplyFull = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // 1. Check if card has grouped subrolls with targets
        if (data.subRolls && data.subRolls.length > 0) {
            const targetMap = aggregateSubRollDamages(data.subRolls);
            if (targetMap.size > 0) {
                const appliedNotes: string[] = [];
                let totalEffective = 0;
                for (const [tId, alloc] of targetMap.entries()) {
                    const res = await applyDamage(tId, alloc.totalDamage, alloc.damageType || data.damageType);
                    const eff = res?.effectiveDamage ?? alloc.totalDamage;
                    totalEffective += eff;
                    const defenseText = res?.defenseNote ? ` (${res.defenseNote})` : "";
                    appliedNotes.push(`${alloc.targetName} (-${eff}${defenseText})`);
                }
                OBR.notification.show(`Applied damage: ${appliedNotes.join(", ")}`, "SUCCESS");

                await updateRollCardResolution(data.id, {
                    status: "applied",
                    appliedAmount: totalEffective,
                    note: `Applied: ${appliedNotes.join(", ")}`,
                });
                return;
            }
        }

        // 2. Fallback for single target
        let targetId = data.targetId;
        let targetName = data.targetName;
        if (!targetId) {
            try {
                const selection = await OBR.player.getSelection();
                if (selection && selection.length > 0) {
                    targetId = selection[0];
                    const items = await OBR.scene.items.getItems([targetId]);
                    if (items[0]?.name) targetName = items[0].name;
                }
            } catch {}
        }

        if (data.damageComponents?.length && targetId) {
            let appliedTotal = 0;
            const notes: string[] = [];
            let anyDefeated = false;
            for (const component of data.damageComponents) {
                const result = await applyDamage(targetId, component.total, component.damageType);
                appliedTotal += result?.effectiveDamage ?? component.total;
                if (result?.defenseNote) notes.push(`${component.damageType}: ${result.defenseNote}`);
                if (result?.targetDefeated) anyDefeated = true;
            }
            if (anyDefeated) {
                dispatchCombatFeatureTrigger("on_target_defeated", {
                    casterTokenId: data.casterId,
                    targetTokenId: targetId,
                    targetName: targetName || data.targetName,
                    damageTotal: appliedTotal,
                }).catch(console.error);
            }
            const note = notes.join("; ") || undefined;
            OBR.notification.show(
                `Applied -${appliedTotal} damage${note ? ` • ${note}` : ""} to ${targetName || "target token"}.`,
                "SUCCESS",
            );
            await updateRollCardResolution(data.id, {
                status: "applied",
                appliedAmount: appliedTotal,
                note: note || (targetName ? `Applied to ${targetName}` : "Applied full damage"),
                hitApprovalStatus: data.requiresHitApproval ? "confirmed" : undefined,
            });
            return;
        }

        let effectiveDamage = pendingDmg;
        let defenseNote: string | undefined;
        if (targetId && pendingDmg > 0) {
            const res = await applyDamage(targetId, pendingDmg, data.damageType);
            effectiveDamage = res?.effectiveDamage ?? pendingDmg;
            defenseNote = res?.defenseNote;
            const noteText = defenseNote ? ` • ${defenseNote}` : "";
            OBR.notification.show(`Applied -${effectiveDamage} damage${noteText} to ${targetName || "target token"}.`, "SUCCESS");
            if (res?.targetDefeated) {
                dispatchCombatFeatureTrigger("on_target_defeated", {
                    casterTokenId: data.casterId,
                    targetTokenId: targetId,
                    targetName: targetName || data.targetName,
                    damageTotal: effectiveDamage,
                }).catch(console.error);
            }
        } else {
            OBR.notification.show(`Damage approved (-${pendingDmg}). Select a token on the map to deduct HP.`, "INFO");
        }

        await updateRollCardResolution(data.id, {
            status: "applied",
            appliedAmount: effectiveDamage,
            note: defenseNote ? `${targetName || "Target"}: -${effectiveDamage} (${defenseNote})` : (targetName ? `Applied to ${targetName}` : "Applied Full"),
            hitApprovalStatus: data.requiresHitApproval ? "confirmed" : undefined,
        });
    };

    const handleApplyHalf = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // 1. Check if card has grouped subrolls with targets
        if (data.subRolls && data.subRolls.length > 0) {
            const targetMap = aggregateSubRollDamages(data.subRolls);
            if (targetMap.size > 0) {
                const appliedNotes: string[] = [];
                let totalHalf = 0;
                for (const [tId, alloc] of targetMap.entries()) {
                    const half = Math.max(0, Math.floor(alloc.totalDamage / 2));
                    if (half > 0) {
                        const res = await applyDamage(tId, half, alloc.damageType || data.damageType);
                        const eff = res?.effectiveDamage ?? half;
                        totalHalf += eff;
                        const defenseText = res?.defenseNote ? ` (${res.defenseNote})` : "";
                        appliedNotes.push(`${alloc.targetName} (-${eff}${defenseText})`);
                    }
                }
                OBR.notification.show(`Applied half damage: ${appliedNotes.join(", ")}`, "SUCCESS");

                await updateRollCardResolution(data.id, {
                    status: "applied",
                    appliedAmount: totalHalf,
                    note: `Half damage: ${appliedNotes.join(", ")}`,
                });
                return;
            }
        }

        // 2. Fallback for single target
        let targetId = data.targetId;
        let targetName = data.targetName;
        if (!targetId) {
            try {
                const selection = await OBR.player.getSelection();
                if (selection && selection.length > 0) {
                    targetId = selection[0];
                    const items = await OBR.scene.items.getItems([targetId]);
                    if (items[0]?.name) targetName = items[0].name;
                }
            } catch {}
        }

        if (data.damageComponents?.length && targetId) {
            let appliedTotal = 0;
            const notes: string[] = [];
            for (const component of data.damageComponents) {
                const half = Math.floor(component.total / 2);
                const result = await applyDamage(targetId, half, component.damageType);
                appliedTotal += result?.effectiveDamage ?? half;
                if (result?.defenseNote) notes.push(`${component.damageType}: ${result.defenseNote}`);
            }
            const note = notes.join("; ") || undefined;
            OBR.notification.show(
                `Applied half damage (-${appliedTotal}) to ${targetName || "target token"}${note ? ` • ${note}` : ""}.`,
                "SUCCESS",
            );
            await updateRollCardResolution(data.id, {
                status: "applied",
                appliedAmount: appliedTotal,
                note: note || (targetName ? `Half damage to ${targetName}` : "Half damage"),
                hitApprovalStatus: data.requiresHitApproval ? "confirmed" : undefined,
            });
            return;
        }

        let effectiveHalf = halfDmg;
        let defenseNote: string | undefined;
        if (targetId && halfDmg > 0) {
            const res = await applyDamage(targetId, halfDmg, data.damageType);
            effectiveHalf = res?.effectiveDamage ?? halfDmg;
            defenseNote = res?.defenseNote;
            const noteText = defenseNote ? ` • ${defenseNote}` : "";
            OBR.notification.show(`Applied half damage (-${effectiveHalf}${noteText}) to ${targetName || "target token"}.`, "SUCCESS");
            if (res?.targetDefeated) {
                dispatchCombatFeatureTrigger("on_target_defeated", {
                    casterTokenId: data.casterId,
                    targetTokenId: targetId,
                    targetName: targetName || data.targetName,
                    damageTotal: effectiveHalf,
                }).catch(console.error);
            }
        } else {
            OBR.notification.show(`Half damage approved (-${halfDmg}).`, "INFO");
        }

        await updateRollCardResolution(data.id, {
            status: "applied",
            appliedAmount: effectiveHalf,
            note: defenseNote ? `${targetName || "Target"}: -${effectiveHalf} (${defenseNote})` : (targetName ? `Half damage to ${targetName}` : "Half Damage (Resistance / Save Passed)"),
            hitApprovalStatus: data.requiresHitApproval ? "confirmed" : undefined,
        });
    };

    const handleApplyHeal = async (e: React.MouseEvent) => {
        e.stopPropagation();
        let targetId = data.targetId;
        let targetName = data.targetName;
        if (!targetId) {
            try {
                const selection = await OBR.player.getSelection();
                if (selection && selection.length > 0) {
                    targetId = selection[0];
                    const items = await OBR.scene.items.getItems([targetId]);
                    if (items[0]?.name) targetName = items[0].name;
                }
            } catch {}
        }

        let restored = pendingHeal;
        if (targetId && pendingHeal > 0) {
            const res = await applyHeal(targetId, pendingHeal);
            restored = res?.hpRestored ?? pendingHeal;
            OBR.notification.show(`Applied +${restored} HP heal to ${targetName || "target token"}.`, "SUCCESS");
        } else {
            OBR.notification.show(`Heal approved (+${pendingHeal}). Select a token on the map to restore HP.`, "INFO");
        }

        await updateRollCardResolution(data.id, {
            status: "applied",
            appliedAmount: restored,
            note: targetName ? `Healed ${targetName} (+${restored})` : `Healed +${restored}`,
        });
    };

    const handleShieldReaction = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const attackTotal = data.attackTotal ?? (typeof data.total === "number" ? data.total : parseInt(String(data.total), 10) || 0);
        const naturalD20 = data.rollD20 ?? 10;
        const targetAc = data.targetAc ?? 10;
        const reaction = evaluateShieldReaction(attackTotal, naturalD20, targetAc);
        if (reaction.shieldBlocks) {
            await updateRollCardResolution(data.id, {
                status: "shielded",
                appliedAmount: 0,
                note: reaction.reason,
                hitApprovalStatus: data.requiresHitApproval ? "missed" : undefined,
            });
            OBR.notification.show(`Shield spell (+5 AC) deflected the attack! (Attack ${attackTotal} vs AC ${targetAc + 5})`, "SUCCESS");
        } else {
            await updateRollCardResolution(data.id, {
                status: "pending",
                note: reaction.reason,
                hitApprovalStatus: data.requiresHitApproval ? "pending" : undefined,
            });
            OBR.notification.show(`Shield (+5 AC) was not enough! ${reaction.reason}`, "WARNING");
        }
    };

    const handleDismiss = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await updateRollCardResolution(data.id, {
            status: "dismissed",
            appliedAmount: 0,
            note: "Dismissed by DM",
            hitApprovalStatus: data.requiresHitApproval ? "missed" : undefined,
        });
        OBR.notification.show(
            data.requiresHitApproval ? "Monster attack marked as a miss." : "Damage dismissed by DM.",
            "INFO",
        );
    };

    const handleTargetSaveOutcome = async (
        targetId: string,
        outcome: "success" | "failure",
    ) => {
        const updatedResolutions = targetSaveResolutions.map((resolution) =>
            resolution.targetId === targetId &&
            resolution.damageResolutionStatus === "pending"
                ? { ...resolution, outcome }
                : resolution,
        );
        await updateRollCardResolution(data.id, {
            status: "pending",
            targetSaveResolutions: updatedResolutions,
        });
    };

    const handleApplyTargetSaveDamage = async (targetId: string) => {
        const targetResolution = targetSaveResolutions.find(
            (resolution) => resolution.targetId === targetId,
        );
        if (
            !targetResolution?.outcome ||
            targetResolution.damageResolutionStatus !== "pending"
        ) {
            return;
        }

        setApplyingTargetSaveId(targetId);
        try {
            const saveMultiplier =
                targetResolution.outcome === "success"
                    ? targetResolution.successDamageMultiplier
                    : targetResolution.failureDamageMultiplier;
            const targetVitals = await getTokenVitals(targetId);
            if (!targetVitals) {
                OBR.notification.show(
                    `Could not find HP and defenses for ${targetResolution.targetName}. Damage was not applied.`,
                    "ERROR",
                );
                return;
            }

            let appliedAmount = 0;
            const defenseNotes: string[] = [];
            if (saveMultiplier > 0) {
                const components = data.damageComponents?.length
                    ? data.damageComponents
                    : [{
                        total: pendingDmg,
                        damageType: data.damageType || "",
                        diceBreakdown: "",
                        formula: "",
                    }];
                for (const component of components) {
                    const result = await applyDamage(
                        targetId,
                        component.total,
                        component.damageType,
                        saveMultiplier,
                    );
                    if (!result) {
                        throw new Error(`Damage could not be applied to ${targetResolution.targetName}.`);
                    }
                    appliedAmount += result.effectiveDamage;
                    if (result.defenseNote) defenseNotes.push(result.defenseNote);
                }
            }

            const resolutionNote =
                saveMultiplier === 0
                    ? `${targetResolution.outcome === "success" ? "Successful" : "Failed"} save; no damage`
                    : defenseNotes.length > 0
                        ? defenseNotes.join("; ")
                        : undefined;
            const updatedResolutions = targetSaveResolutions.map((resolution) =>
                resolution.targetId === targetId
                    ? {
                        ...resolution,
                        damageResolutionStatus: "applied" as const,
                        appliedDamageAmount: appliedAmount,
                        resolutionNote,
                    }
                    : resolution,
            );
            const isFullyResolved = updatedResolutions.every(
                (resolution) => resolution.damageResolutionStatus !== "pending",
            );
            const appliedTotal = updatedResolutions.reduce(
                (total, resolution) => total + (resolution.appliedDamageAmount ?? 0),
                0,
            );
            await updateRollCardResolution(data.id, {
                status: isFullyResolved ? "applied" : "pending",
                appliedAmount: appliedTotal,
                note: `${targetResolution.targetName}: ${resolutionNote ?? `${appliedAmount} damage applied`}`,
                targetSaveResolutions: updatedResolutions,
            });
            OBR.notification.show(
                saveMultiplier === 0
                    ? `${targetResolution.targetName}: save recorded; no damage.`
                    : `Applied ${appliedAmount} damage to ${targetResolution.targetName}.`,
                "SUCCESS",
            );
        } catch (error) {
            console.error("Failed to resolve per-target save damage:", error);
            OBR.notification.show(
                `Could not finish applying damage to ${targetResolution.targetName}. Check the target's HP before retrying.`,
                "ERROR",
            );
        } finally {
            setApplyingTargetSaveId(null);
        }
    };

    const cardClasses = [
        "ddb-roll-card",
        isGrouped ? "is-grouped" : "",
        isCrit ? "is-crit" : "",
        isMiss ? "is-miss" : "",
        isConditionTrigger ? "is-condition-trigger" : "",
        isDisadvantage ? "is-disadvantage" : "",
        isAdvantage ? "is-advantage" : "",
        isHeal ? "is-heal" : "",
    ].filter(Boolean).join(" ");

    // Grouped Multi-Roll Card (Multi-Beam / Multi-Ray / Multi-Attack)
    if (isGrouped && data.subRolls) {
        return (
            <div className="ddb-roll-card-wrapper" role="article" aria-label={`${data.casterName} ${data.actionName} grouped roll card`}>
                {/* Top Caster Name */}
                <div className="ddb-roll-card-caster">
                    {data.casterName || "Character"}
                </div>

                <div className={cardClasses}>
                    {/* 1. Header Row */}
                    <div className="ddb-roll-card-header">
                        <div className="ddb-roll-card-title-row">
                            <span className="ddb-roll-card-action-name">{data.actionName}</span>
                            <span className="ddb-roll-card-tag tag-spell">
                                {data.subRolls.length} {data.subRolls.length === 1 ? "BEAM" : "BEAMS"} • SPELL
                            </span>
                            {isDisadvantage && <span className="ddb-roll-card-tag tag-dis">DIS</span>}
                            {isAdvantage && <span className="ddb-roll-card-tag tag-adv">ADV</span>}
                        </div>
                        <div className="ddb-roll-card-target-row">
                            TO: {data.targetName || "TARGET"}
                        </div>
                    </div>

                    {/* 2. Sub-Roll Items */}
                    <div className="ddb-subroll-list">
                        {data.subRolls.map((sub, idx) => {
                            const subCrit = Boolean(sub.toHit?.isCrit || sub.damage?.isCrit);
                            const subMiss = Boolean(sub.toHit?.isMiss);
                            const subDis = Boolean(
                                sub.toHit?.mode === "disadvantage" ||
                                sub.toHit?.formula?.includes("(DIS)") ||
                                sub.toHit?.diceBreakdown?.includes("DIS")
                            );
                            const subAdv = Boolean(
                                sub.toHit?.mode === "advantage" ||
                                sub.toHit?.formula?.includes("(ADV)") ||
                                sub.toHit?.diceBreakdown?.includes("ADV")
                            );
                            const itemClass = [
                                "ddb-subroll-item",
                                subCrit ? "is-crit" : "",
                                subMiss ? "is-miss" : "",
                            ].filter(Boolean).join(" ");

                            return (
                                <div key={idx} className={itemClass}>
                                    <div className="ddb-subroll-item-header">
                                        <span className="ddb-subroll-unit-badge">{sub.unitLabel}</span>
                                        {sub.targetName && (
                                            <span className="ddb-subroll-target-badge" title={sub.targetName}>➔ {sub.targetName}</span>
                                        )}
                                        <div className="ddb-subroll-header-tags">
                                            {subDis && <span className="ddb-subroll-mode-tag tag-dis">DIS</span>}
                                            {subAdv && <span className="ddb-subroll-mode-tag tag-adv">ADV</span>}
                                            {subCrit && <span className="ddb-subroll-crit-pill">CRIT!</span>}
                                            {subMiss && <span className="ddb-subroll-miss-pill">MISS</span>}
                                            {!subCrit && !subMiss && sub.toHit?.hitLabel && (
                                                <span className={`ddb-subroll-hit-badge ${sub.toHit.isHit ? "tag-hit" : "tag-miss"}`}>
                                                    {formatHitLabelForViewer(sub.toHit.hitLabel, isGm, hideTargetAcFromPlayers)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ddb-subroll-item-body">
                                        {/* Attack / To Hit */}
                                        {sub.toHit && (
                                            <div className="ddb-subroll-cell ddb-subroll-tohit">
                                                <span className="ddb-subroll-label">TO HIT</span>
                                                <div className="ddb-subroll-value-row">
                                                    <span className="ddb-subroll-total-val">{sub.toHit.total}</span>
                                                    <span className="ddb-subroll-breakdown-val">({sub.toHit.diceBreakdown})</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Divider */}
                                        {sub.toHit && sub.damage && (
                                            <div className="ddb-subroll-divider" />
                                        )}

                                        {/* Damage */}
                                        {sub.damage && (
                                            <div className="ddb-subroll-cell ddb-subroll-damage">
                                                <span className="ddb-subroll-label">
                                                    DAMAGE <span className="ddb-subroll-dmg-type">({sub.damage.damageType})</span>
                                                </span>
                                                <div className="ddb-subroll-value-row">
                                                    <span className="ddb-subroll-total-val ddb-dmg-num">{sub.damage.total}</span>
                                                    <span className="ddb-subroll-breakdown-val">({sub.damage.diceBreakdown})</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Extra Damage Riders (e.g. Hex) */}
                                    {sub.extraDamage && sub.extraDamage.length > 0 && (
                                        <div className="ddb-subroll-extra-row">
                                            {sub.extraDamage.map((ex, exIdx) => (
                                                <span key={exIdx} className="ddb-subroll-extra-pill">
                                                    +{ex.total} {ex.damageType} ({ex.name}: {ex.diceBreakdown})
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* 3. Footer Summary (Subtle Combined Total) */}
                    <div className="ddb-subroll-footer">
                        <ElderFlameDieIcon size={16} />
                        <div className="ddb-subroll-footer-info">
                            <span className="ddb-subroll-footer-label">
                                {data.damageResolutionStatus === "applied" ? "COMBINED APPLIED:" : "COMBINED POTENTIAL:"}
                            </span>
                            <span className="ddb-subroll-footer-total">
                                {typeof data.appliedDamageAmount === "number"
                                    ? data.appliedDamageAmount
                                    : (typeof data.total === "number" ? data.total : (data.pendingDamage ?? data.total))} DMG
                            </span>
                        </div>
                    </div>

                    {/* Grouped GM Resolution Box */}
                    {hasPendingResolution && (
                        <div className="ddb-card-resolution-box">
                            {data.damageResolutionStatus === "pending" || !data.damageResolutionStatus ? (
                                isGm ? (
                                    <div className="ddb-gm-resolution-actions">
                                        <div className="ddb-gm-resolution-header">
                                            <span className="ddb-gm-resolution-title">
                                                {data.requiresHitApproval ? "GM HIT & DAMAGE APPROVAL" : "GM RESOLUTION"}
                                            </span>
                                            <span className="ddb-gm-resolution-target">
                                                {data.targetName || "TARGET"}
                                                {renderDefenseBadges()}
                                            </span>
                                        </div>
                                        {renderHitRecommendation()}
                                        {isHeal ? (
                                            <div className="ddb-gm-btn-grid">
                                                <button
                                                    type="button"
                                                    className="ddb-gm-action-btn btn-apply-full"
                                                    onClick={handleApplyHeal}
                                                    title="Apply healing to target HP (capped at Max HP)"
                                                >
                                                    <CheckIcon />
                                                    <span>Apply (+{pendingHeal})</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ddb-gm-action-btn btn-dismiss"
                                                    onClick={handleDismiss}
                                                    title="Dismiss heal without restoring HP"
                                                >
                                                    <DismissIcon />
                                                    <span>Dismiss</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="ddb-gm-btn-grid">
                                                <button
                                                    type="button"
                                                    className="ddb-gm-action-btn btn-apply-full"
                                                    onClick={handleApplyFull}
                                                    title={
                                                        hasDamageImmunity
                                                            ? "Target is immune (0 damage)"
                                                            : hasDamageResistance
                                                            ? `Target is resistant (${pendingDmg} halved to ${effectivePreviewDmg})`
                                                            : hasDamageVulnerability
                                                            ? `Target is vulnerable (${pendingDmg} doubled to ${effectivePreviewDmg})`
                                                            : "Apply full damage to target HP (absorbs Temp HP first)"
                                                    }
                                                >
                                                    <DamageIcon />
                                                    <span>{data.requiresHitApproval ? `Confirm Hit • Apply (-${effectivePreviewDmg})` : `Apply (-${effectivePreviewDmg})`}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ddb-gm-action-btn btn-apply-half"
                                                    onClick={handleApplyHalf}
                                                    title={
                                                        hasDamageImmunity
                                                            ? "Target is immune (0 damage)"
                                                            : hasDamageResistance
                                                            ? `Target is resistant (${halfDmg} halved to ${effectivePreviewHalfDmg})`
                                                            : hasDamageVulnerability
                                                            ? `Target is vulnerable (${halfDmg} doubled to ${effectivePreviewHalfDmg})`
                                                            : "Apply half damage (Resistance or Uncanny Dodge)"
                                                    }
                                                >
                                                    <HalfDamageIcon />
                                                    <span>{data.requiresHitApproval ? `Confirm Hit • Half (-${effectivePreviewHalfDmg})` : `Half (-${effectivePreviewHalfDmg})`}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ddb-gm-action-btn btn-dismiss"
                                                    onClick={handleDismiss}
                                                    title="Dismiss damage without reducing HP"
                                                >
                                                    <DismissIcon />
                                                    <span>{data.requiresHitApproval ? "Mark Miss • No Damage" : "Dismiss"}</span>
                                                </button>
                                            </div>
                                        )}
                                        {data.resolutionNote && (
                                            <div className="ddb-resolution-note" style={{ color: "#38bdf8", padding: "2px 0" }}>
                                                {data.resolutionNote}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="ddb-resolution-waiting">
                                        <span className="ddb-resolution-pulse-dot" />
                                        <span>{data.requiresHitApproval ? "PENDING DM HIT APPROVAL" : "PENDING DM RESOLUTION"}</span>
                                    </div>
                                )
                            ) : data.damageResolutionStatus === "applied" ? (
                                <div className="ddb-resolution-applied">
                                    <CheckIcon />
                                    <span>
                                        {data.requiresHitApproval
                                            ? `HIT CONFIRMED • APPLIED: -${data.appliedDamageAmount ?? pendingDmg} HP`
                                            : isHeal
                                            ? `HEALED: +${data.appliedDamageAmount ?? pendingHeal} HP`
                                            : `APPLIED: -${data.appliedDamageAmount ?? pendingDmg} HP`}
                                    </span>
                                    {data.resolutionNote && <span className="ddb-resolution-note">({data.resolutionNote})</span>}
                                </div>
                            ) : (
                                <div className="ddb-resolution-dismissed">
                                    <DismissIcon />
                                    <span>DISMISSED</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Bottom Timestamp */}
                <div className="ddb-roll-card-timestamp">
                    NOW
                </div>
            </div>
        );
    }

    const breakdownLength = (data.diceBreakdown || "").length;
    const breakdownClass = [
        "ddb-roll-card-breakdown",
        breakdownLength > 24 ? "is-extra-long" : breakdownLength > 14 ? "is-long" : "",
    ].filter(Boolean).join(" ");

    return (
        <div className="ddb-roll-card-wrapper" role="article" aria-label={`${data.casterName} roll card`}>
            {/* Top Caster Name */}
            <div className="ddb-roll-card-caster">
                {data.casterName || "Character"}
            </div>

            {/* Main Rounded Dark Card */}
            <div className={cardClasses}>
                {/* 1. Header Row */}
                <div className="ddb-roll-card-header">
                    <div className="ddb-roll-card-title-row">
                        <span className="ddb-roll-card-action-name">{data.actionName}:</span>
                        <span className={`ddb-roll-card-tag ${getTagClass(data.actionType, isConditionTrigger)}`}>
                            {isConditionTrigger ? "TRIGGER" : data.actionType}
                        </span>
                        {hitApprovalLabel && (
                            <span className={`ddb-roll-card-tag ${hitApprovalTagClass}`}>
                                {formatHitLabelForViewer(hitApprovalLabel, isGm, hideTargetAcFromPlayers)}
                            </span>
                        )}
                        {isDisadvantage && <span className="ddb-roll-card-tag tag-dis">DIS</span>}
                        {isAdvantage && <span className="ddb-roll-card-tag tag-adv">ADV</span>}
                    </div>
                    <div className="ddb-roll-card-target-row">
                        TO: {data.targetName || "SELF"}
                    </div>
                </div>

                {/* 2. Middle Calculation Row */}
                <div className="ddb-roll-card-calc-row">
                    <div className="ddb-roll-card-left-calc">
                        <div className="ddb-roll-card-dice-line">
                            <span className="ddb-roll-card-die-icon">
                                {renderDieIcon(data.dieType, 20)}
                            </span>
                            <span className={breakdownClass}>
                                {data.diceBreakdown}
                            </span>
                        </div>
                        <div className="ddb-roll-card-formula">
                            {renderFormattedFormula(data.formula)}
                        </div>
                    </div>

                    <div className="ddb-roll-card-divider-wrap">
                        <div className="ddb-roll-card-vdivider" />
                        <span className="ddb-roll-card-equals">=</span>
                    </div>

                    <div className="ddb-roll-card-right-total">
                        {data.damageResolutionStatus === "applied" &&
                        typeof data.appliedDamageAmount === "number" &&
                        data.appliedDamageAmount !== Number(data.total) ? (
                            <div className="ddb-total-effective-wrap">
                                <span className="ddb-total-original-struck">{data.total}</span>
                                <span className={`ddb-roll-card-total-num is-effective ${isHeal ? "is-heal" : ""}`}>
                                    {data.appliedDamageAmount}
                                </span>
                            </div>
                        ) : (
                            <span className={`ddb-roll-card-total-num ${typeof data.total === "string" && isNaN(Number(data.total)) ? "is-text" : ""}`}>
                                {data.total}
                            </span>
                        )}
                    </div>
                </div>

                {hasTargetSaveResolutions && (
                    <section className="ddb-target-save-panel" aria-label="Target saving throw resolutions">
                        <div className="ddb-target-save-heading">
                            <strong>Saving Throws</strong>
                            <span>{pendingDmg} shared damage roll</span>
                        </div>
                        <p className="ddb-target-save-instructions">
                            Ask each target's owner to roll the listed save, then record the result.
                        </p>
                        <div className="ddb-target-save-list">
                            {targetSaveResolutions.map((resolution) => {
                                const successDamage =
                                    resolution.successDamageMultiplier === 0
                                        ? "no damage"
                                        : resolution.successDamageMultiplier === 0.5
                                            ? "half damage"
                                            : "full damage";
                                const failureDamage =
                                    resolution.failureDamageMultiplier === 0
                                        ? "no damage"
                                        : resolution.failureDamageMultiplier === 0.5
                                            ? "half damage"
                                            : "full damage";
                                const selectedMultiplier =
                                    resolution.outcome === "success"
                                        ? resolution.successDamageMultiplier
                                        : resolution.outcome === "failure"
                                            ? resolution.failureDamageMultiplier
                                            : undefined;
                                const resolutionComplete =
                                    resolution.damageResolutionStatus !== "pending";

                                return (
                                    <div className="ddb-target-save-row" key={resolution.targetId}>
                                        <div className="ddb-target-save-target">
                                            <strong>{resolution.targetName}</strong>
                                            <span>{resolution.saveAbility} SAVE • DC {resolution.saveDc}</span>
                                        </div>
                                        {resolutionComplete ? (
                                            <div className="ddb-target-save-complete" role="status">
                                                <CheckIcon />
                                                <span>
                                                    {resolution.outcome?.toUpperCase()} •{" "}
                                                    {resolution.appliedDamageAmount === 0
                                                        ? "NO DAMAGE"
                                                        : `-${resolution.appliedDamageAmount ?? 0} HP`}
                                                </span>
                                            </div>
                                        ) : isGm ? (
                                            <div className="ddb-target-save-actions">
                                                <div className="ddb-target-save-outcomes" role="group" aria-label={`Record ${resolution.targetName}'s save`}>
                                                    <button
                                                        type="button"
                                                        className={`ddb-target-save-outcome${resolution.outcome === "success" ? " is-selected" : ""}`}
                                                        aria-pressed={resolution.outcome === "success"}
                                                        onClick={() => void handleTargetSaveOutcome(resolution.targetId, "success")}
                                                    >
                                                        Success · {successDamage}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`ddb-target-save-outcome${resolution.outcome === "failure" ? " is-selected" : ""}`}
                                                        aria-pressed={resolution.outcome === "failure"}
                                                        onClick={() => void handleTargetSaveOutcome(resolution.targetId, "failure")}
                                                    >
                                                        Failure · {failureDamage}
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="ddb-target-save-apply"
                                                    disabled={!resolution.outcome || applyingTargetSaveId !== null}
                                                    onClick={() => void handleApplyTargetSaveDamage(resolution.targetId)}
                                                >
                                                    {applyingTargetSaveId === resolution.targetId
                                                        ? "Applying…"
                                                        : selectedMultiplier === 0
                                                            ? "Resolve • No Damage"
                                                            : `Apply ${selectedMultiplier === 0.5 ? "Half" : "Full"} Damage`}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="ddb-resolution-waiting" role="status">
                                                <span className="ddb-resolution-pulse-dot" />
                                                <span>
                                                    {resolution.outcome
                                                        ? `${resolution.outcome.toUpperCase()} RECORDED • PENDING DM`
                                                        : "WAITING FOR SAVE RESULT"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {data.requiresManualDamageAdjudication && !hasTargetSaveResolutions && (
                    <div className="ddb-save-manual-notice" role="status">
                        <strong>Saving throw needs DM adjudication</strong>
                        <span>
                            The save ability, DC, damage outcome, or affected targets could not be confirmed. This roll is logged only; no HP was changed.
                        </span>
                    </div>
                )}

                {/* 3. Damage Resolution & Reaction Box */}
                {hasPendingResolution && (
                    <div className="ddb-card-resolution-box">
                        {data.damageResolutionStatus === "pending" || !data.damageResolutionStatus ? (
                            isGm ? (
                                <div className="ddb-gm-resolution-actions">
                                    <div className="ddb-gm-resolution-header">
                                        <span className="ddb-gm-resolution-title">GM RESOLUTION</span>
                                        <span className="ddb-gm-resolution-target">
                                            {data.targetName}
                                            {renderDefenseBadges()}
                                        </span>
                                    </div>
                                    {renderHitRecommendation()}
                                    {isHeal ? (
                                        <div className="ddb-gm-btn-grid">
                                            <button
                                                type="button"
                                                className="ddb-gm-action-btn btn-apply-full"
                                                onClick={handleApplyHeal}
                                                title="Apply healing to target HP (capped at Max HP)"
                                            >
                                                <CheckIcon />
                                                <span>Apply (+{pendingHeal})</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="ddb-gm-action-btn btn-dismiss"
                                                onClick={handleDismiss}
                                                title="Dismiss heal without restoring HP"
                                            >
                                                <DismissIcon />
                                                <span>Dismiss</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="ddb-gm-btn-grid">
                                            <button
                                                type="button"
                                                className="ddb-gm-action-btn btn-apply-full"
                                                onClick={handleApplyFull}
                                                title={
                                                    hasDamageImmunity
                                                        ? "Target is immune (0 damage)"
                                                        : hasDamageResistance
                                                        ? `Target is resistant (${pendingDmg} halved to ${effectivePreviewDmg})`
                                                        : hasDamageVulnerability
                                                        ? `Target is vulnerable (${pendingDmg} doubled to ${effectivePreviewDmg})`
                                                        : "Apply full damage to target HP (absorbs Temp HP first)"
                                                }
                                            >
                                                <DamageIcon />
                                                <span>Apply (-{effectivePreviewDmg})</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="ddb-gm-action-btn btn-apply-half"
                                                onClick={handleApplyHalf}
                                                title={
                                                    hasDamageImmunity
                                                        ? "Target is immune (0 damage)"
                                                        : hasDamageResistance
                                                        ? `Target is resistant (${halfDmg} halved to ${effectivePreviewHalfDmg})`
                                                        : hasDamageVulnerability
                                                        ? `Target is vulnerable (${halfDmg} doubled to ${effectivePreviewHalfDmg})`
                                                        : "Apply half damage (Resistance or Uncanny Dodge)"
                                                }
                                            >
                                                <HalfDamageIcon />
                                                <span>Half (-{effectivePreviewHalfDmg})</span>
                                            </button>
                                            {data.targetAc && (
                                                <button
                                                    type="button"
                                                    className="ddb-gm-action-btn btn-shield-reaction"
                                                    onClick={handleShieldReaction}
                                                    title="Reaction: Shield spell (+5 AC)"
                                                >
                                                    <ShieldIcon />
                                                    <span>Shield (+5 AC)</span>
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className="ddb-gm-action-btn btn-dismiss"
                                                onClick={handleDismiss}
                                                title="Dismiss damage without reducing HP"
                                            >
                                                <DismissIcon />
                                                <span>Dismiss</span>
                                            </button>
                                        </div>
                                    )}
                                    {data.resolutionNote && (
                                        <div className="ddb-resolution-note" style={{ color: "#38bdf8", padding: "2px 0" }}>
                                            {data.resolutionNote}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="ddb-resolution-waiting">
                                    <span className="ddb-resolution-pulse-dot" />
                                    <span>PENDING DM RESOLUTION</span>
                                </div>
                            )
                        ) : data.damageResolutionStatus === "applied" ? (
                            <div className="ddb-resolution-applied">
                                <CheckIcon />
                                <span>
                                    {isHeal
                                        ? `HEALED: +${data.appliedDamageAmount ?? pendingHeal} HP`
                                        : `APPLIED: -${data.appliedDamageAmount ?? pendingDmg} HP`}
                                </span>
                                {data.resolutionNote && <span className="ddb-resolution-note">({data.resolutionNote})</span>}
                            </div>
                        ) : data.damageResolutionStatus === "shielded" ? (
                            <div className="ddb-resolution-shielded">
                                <ShieldIcon />
                                <span>SHIELD REACTION: {data.resolutionNote || "BLOCKED (+5 AC)"}</span>
                            </div>
                        ) : (
                            <div className="ddb-resolution-dismissed">
                                <DismissIcon />
                                <span>
                                    {data.requiresHitApproval && data.hitApprovalStatus === "missed"
                                        ? "MISS CONFIRMED • NO DAMAGE"
                                        : "DISMISSED (0 DMG)"}
                                </span>
                                {data.resolutionNote && <span className="ddb-resolution-note">({data.resolutionNote})</span>}
                            </div>
                        )}
                    </div>
                )}

                {/* 3. Footer Row */}
                <div className="ddb-roll-card-footer">
                    <ElderFlameDieIcon size={20} />
                    <div className="ddb-roll-card-footer-line" />
                    <span className="ddb-roll-card-subtitle">
                        {data.subtitle || "Rolled with Elder Flame"}
                    </span>
                    {data.pendingTriggerId && (
                        <button
                            type="button"
                            className="ddb-trigger-btn"
                            onClick={async (e) => {
                                e.stopPropagation();
                                await fireConditionalTrigger(data.pendingTriggerId!);
                            }}
                        >
                            Trigger {data.pendingTriggerName || "Effect"}
                        </button>
                    )}
                </div>
            </div>

            {/* Bottom Timestamp */}
            <div className="ddb-roll-card-timestamp">
                NOW
            </div>
        </div>
    );
};
