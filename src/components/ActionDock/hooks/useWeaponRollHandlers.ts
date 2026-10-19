import type { Dispatch, SetStateAction } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { setSelectedSpell, toolID } from "../../../effectsTool";
import { hasWeaponGraze } from "../../../services/ddbService";
import { addConditionalTrigger, checkAndFireActionTriggers } from "../../../services/conditionalTriggerService";
import { resolveSpellConditionalTrigger } from "../../../services/spellTriggerResolver";
import { broadcastDDBRoll } from "../../../services/rollLogService";
import { resolveWeaponRiders } from "../../../services/weaponDamageRiders";
import { rollAttack, rollDamageBreakdown, rollDamageDDB, combineDamageBonus, formatAttackDiceBreakdown, formatD20Formula } from "../../../utils/dice";
import type { DDBParsedCharacter, DDBWeaponAttack } from "../../../types/ddb";
import type { DDBRollCardData } from "../../../types/ddbRollLog";
import { parseRiderString } from "../domain/riders";

import { getTokenVitals, applyDamage } from "../../../features/combat/tokenVitalsService";
import { getDamageApplicationMode } from "../../../features/combat/damageModeService";
import { resolveAttackHit } from "../../../features/combat/domain/attackResolution";
import { combineD20RollModes, resolveConditionRules, type D20RollMode } from "../../../features/combat/domain/conditionRules";
import { dispatchCombatFeatureTrigger } from "../../../features/combat/domain/combatFeatureHooks";
import {
    consumeSituationalRollOverride,
    registerPendingCriticalHit,
    consumePendingCriticalHit,
} from "../../../services/situationalRollModifierService";

interface UseWeaponRollHandlersOptions {
    casterId?: string;
    character: DDBParsedCharacter | null;
    hasAttackAdvantage: boolean;
    conditions: string[];
    exhaustionLevel: number;
    attackBonus?: number;
    damageBonus?: number;
    isRaging?: boolean;
    activeBuffs?: string[];
    riderChoice?: string;
    concentrationSpell: { id: string; name: string; hexTargetId?: string | null } | null;
    activeRiderMap: Record<string, string | null>;
    setActiveRiderMap: Dispatch<SetStateAction<Record<string, string | null>>>;
    spells: Array<{ id: string; name: string }>;
    setSelected: Dispatch<SetStateAction<string | null>>;
}

export function useWeaponRollHandlers({
    casterId,
    character,
    hasAttackAdvantage,
    conditions,
    exhaustionLevel,
    attackBonus = 0,
    damageBonus,
    isRaging,
    activeBuffs,
    riderChoice,
    concentrationSpell,
    activeRiderMap,
    setActiveRiderMap,
    spells,
    setSelected,
}: UseWeaponRollHandlersOptions) {
    const handleWeaponAttackRoll = async (weapon: DDBWeaponAttack, rollMode?: "melee" | "thrown") => {
        const isThrown = rollMode === "thrown";
        const toHitBase = isThrown ? (weapon.thrownToHit ?? weapon.toHit) : weapon.toHit;
        const casterName = character?.name || "Character";
        const isHexActive = concentrationSpell?.id?.toLowerCase() === "hex" || concentrationSpell?.name?.toLowerCase() === "hex";
        const actionLabel = isThrown ? `${weapon.name} (Thrown)` : weapon.name;

        let targetId: string | undefined;
        let targetName = "TARGET";
        let targetAc: number | undefined;
        let targetHideNumbers = false;
        let targetConditions: string[] = [];
        try {
            const selection = await OBR.player.getSelection().catch(() => [] as string[]);
            if (selection && selection.length > 0) {
                targetId = selection[0];
                const items = await OBR.scene.items.getItems([targetId]);
                if (items[0]?.name) targetName = items[0].name;
                const vitals = await getTokenVitals(targetId);
                if (vitals?.armorClass) targetAc = vitals.armorClass;
                if (vitals?.hideNumbers) targetHideNumbers = true;
                targetConditions = vitals?.conditions ?? [];
            }
        } catch {}

        const conditionRules = resolveConditionRules({
            conditions,
            targetConditions,
            exhaustionLevel,
            rollKind: "attack",
            attackType: isThrown || weapon.type === "ranged" ? "ranged" : "melee",
            actionType: "action",
        });
        if (conditionRules.blocked) {
            OBR.notification.show(
                `Attack prevented by condition: ${conditionRules.reasons.join("; ")}`,
                "WARNING",
            );
            return;
        }
        const situational = consumeSituationalRollOverride();
        let baseMode: D20RollMode = hasAttackAdvantage ? "advantage" : "normal";
        if (situational.mode !== "normal") {
            baseMode = combineD20RollModes(baseMode, situational.mode as D20RollMode);
        }
        const mode = combineD20RollModes(baseMode, conditionRules.mode);
        const effectiveToHit = toHitBase + (attackBonus || 0) + situational.totalBonus - conditionRules.d20Penalty;
        const roll = rollAttack(effectiveToHit, "", mode);

        if (roll.isCrit) {
            registerPendingCriticalHit(weapon.id);
            registerPendingCriticalHit("__last__");
        }

        if (conditionRules.requiresAdjudication.length > 0) {
            OBR.notification.show(
                `DM adjudication needed: ${conditionRules.requiresAdjudication.join("; ")}`,
                "WARNING",
            );
        }
        if (casterId) checkAndFireActionTriggers(casterId, "attack").catch(() => {});

        const hitRes = typeof targetAc === "number"
            ? resolveAttackHit({ d20: roll.d20, total: roll.total, bonus: roll.bonus, mode: roll.mode }, targetAc, { hideAcNumber: targetHideNumbers })
            : undefined;

        const sitNote = situational.hasOverride && situational.totalBonus !== 0 ? ` • Mod (${situational.breakdown || (situational.totalBonus >= 0 ? `+${situational.totalBonus}` : `${situational.totalBonus}`)})` : "";
        const conditionNote = [...conditionRules.reasons, ...conditionRules.requiresAdjudication].join(" • ");
        const subtitle = roll.isCrit
            ? "Critical Hit!"
            : roll.isMiss
                ? "Critical Miss!"
                : `${actionLabel} Attack Roll${attackBonus > 0 ? ` • Channeled Attack (+${attackBonus})` : ""}${sitNote}${conditionNote ? ` • ${conditionNote}` : ""}`;
        const cards: DDBRollCardData[] = [{
            id: `${Date.now()}-dock-atk`,
            casterName,
            targetName,
            targetId,
            targetAc,
            rollD20: roll.d20,
            attackTotal: roll.total,
            isHit: hitRes?.isHit,
            hitLabel: hitRes?.hitLabel,
            actionName: actionLabel.toUpperCase(),
            actionType: "TO HIT",
            dieType: 20,
            diceBreakdown: formatAttackDiceBreakdown(roll),
            formula: formatD20Formula(roll.bonus, roll.mode),
            total: roll.total,
            subtitle,
            isCrit: roll.isCrit,
            isMiss: roll.isMiss,
            rollMode: roll.mode,
            isAdvantage: roll.mode === "advantage",
            isDisadvantage: roll.mode === "disadvantage",
            timestamp: Date.now()
        }];
        if (attackBonus > 0 && casterId) {
            import("../../../services/buffService").then(({ removeTokenBuff }) => {
                removeTokenBuff(casterId, "channeled_attack").catch(() => {});
            });
        }
        if (roll.isCrit && character) {
            dispatchCombatFeatureTrigger("on_critical_hit", {
                character,
                casterTokenId: casterId,
                targetTokenId: targetId,
                targetName,
                weapon,
                isCritical: true,
            }).catch(console.error);
        }
        cards[0].casterId = casterId;
        cards[0].characterId = character?.id;

        const damageMode = await getDamageApplicationMode();
        const isTargetHexed = Boolean(isHexActive && concentrationSpell?.hexTargetId && targetId && concentrationSpell.hexTargetId === targetId);
        if (!roll.isMiss && isTargetHexed) {
            const hexDice = roll.isCrit ? "2d6" : "1d6";
            const hexDmg = rollDamageDDB("1d6", "Necrotic", "", roll.isCrit);
            let hexAppliedAmount: number | undefined;
            let hexResolutionNote: string | undefined;
            let hexStatus: "pending" | "applied" = "pending";
            if (damageMode === "auto" && targetId) {
                const hexRes = await applyDamage(targetId, hexDmg.total, "Necrotic");
                hexAppliedAmount = hexRes?.effectiveDamage ?? hexDmg.total;
                hexResolutionNote = hexRes?.defenseNote;
                hexStatus = "applied";
                if (hexRes?.targetDefeated) {
                    dispatchCombatFeatureTrigger("on_target_defeated", {
                        character: character || undefined,
                        casterTokenId: casterId,
                        targetTokenId: targetId,
                        targetName,
                        damageTotal: hexDmg.total,
                    }).catch(console.error);
                }
            }
            cards.push({
                id: `${Date.now()}-dock-hex-dmg`,
                casterName,
                casterId,
                characterId: character?.id,
                targetName,
                targetId,
                targetAc,
                actionName: "HEX (CURSE)",
                actionType: "DAMAGE",
                dieType: 6,
                diceBreakdown: hexDmg.breakdown.replace(/\+/g, " + "),
                formula: `${hexDice} Necrotic`,
                total: hexDmg.total,
                pendingDamage: hexDmg.total,
                appliedDamageAmount: hexAppliedAmount,
                resolutionNote: hexResolutionNote,
                damageType: "Necrotic",
                damageResolutionStatus: hexStatus,
                subtitle: roll.isCrit ? "Hex Critical Hit (+2d6 Necrotic)" : "Hex Curse (+1d6 Necrotic)",
                isCrit: roll.isCrit,
                timestamp: Date.now() + 1
            });
        } else if (roll.isMiss && hasWeaponGraze(weapon)) {
            const abilityMod = Math.max(1, weapon.toHit - (character?.proficiencyBonus ?? 2));
            const weaponDamageType = weapon.damageType || "Slashing";
            let grazeAppliedAmount: number | undefined;
            let grazeResolutionNote: string | undefined;
            let grazeStatus: "pending" | "applied" = "pending";
            if (damageMode === "auto" && targetId) {
                const grazeRes = await applyDamage(targetId, abilityMod, weaponDamageType);
                grazeAppliedAmount = grazeRes?.effectiveDamage ?? abilityMod;
                grazeResolutionNote = grazeRes?.defenseNote;
                grazeStatus = "applied";
                if (grazeRes?.targetDefeated) {
                    dispatchCombatFeatureTrigger("on_target_defeated", {
                        character: character || undefined,
                        casterTokenId: casterId,
                        targetTokenId: targetId,
                        targetName,
                        weapon,
                        damageTotal: abilityMod,
                    }).catch(console.error);
                }
            }
            cards.push({
                id: `${Date.now()}-dock-graze-dmg`,
                casterName,
                casterId,
                characterId: character?.id,
                targetName,
                targetId,
                actionName: `${weapon.name.toUpperCase()} (GRAZE)`,
                actionType: "DAMAGE",
                dieType: 0,
                diceBreakdown: `${abilityMod}`,
                formula: `${abilityMod} ${weaponDamageType}`,
                total: abilityMod,
                pendingDamage: abilityMod,
                appliedDamageAmount: grazeAppliedAmount,
                resolutionNote: grazeResolutionNote,
                damageType: weaponDamageType,
                damageResolutionStatus: grazeStatus,
                subtitle: "Weapon Mastery: Graze (Damage on Miss)",
                timestamp: Date.now() + 1
            });
        }
        broadcastDDBRoll(cards);
    };

    const handleWeaponDamageRoll = async (weapon: DDBWeaponAttack, riderName?: string | null, rollMode?: "melee" | "thrown") => {
        if (casterId) checkAndFireActionTriggers(casterId, "attack").catch(() => {});
        let riderObj: ReturnType<typeof parseRiderString> | undefined;
        if (riderName && weapon.cantripRiders) {
            const found = weapon.cantripRiders.find(r => r.startsWith(riderName));
            if (found) riderObj = parseRiderString(found);
        }
        const triggerInfo = riderObj ? resolveSpellConditionalTrigger(riderObj.name, riderObj.raw, character?.level || 1) : null;
        const effectiveRiderDamage = triggerInfo?.hasTrigger ? (triggerInfo.immediateOnHitDice || "") : (riderObj?.damage || "");
        const bonusNum = typeof damageBonus === "number" && damageBonus > 0 ? damageBonus : 0;
        const isThrown = rollMode === "thrown";
        const baseDamageFormula = isThrown ? (weapon.thrownDamage ?? weapon.damage) : weapon.damage;
        const isCrit = consumePendingCriticalHit(weapon.id) || consumePendingCriticalHit("__last__");
        const situational = consumeSituationalRollOverride();
        const totalBonusMod = bonusNum + situational.totalBonus;
        const effectiveBaseDamage = combineDamageBonus(baseDamageFormula, totalBonusMod);
        const { total, formatted } = rollDamageBreakdown(effectiveBaseDamage, weapon.damageType, "", riderObj ? {
            name: riderObj.name, damage: effectiveRiderDamage, damageType: riderObj.damageType, moveTrigger: undefined
        } : undefined, isCrit);
        const casterName = character?.name || "Character";
        const isHexActive = concentrationSpell?.id?.toLowerCase() === "hex" || concentrationSpell?.name?.toLowerCase() === "hex";
        let pendingTriggerId: string | undefined;
        let triggerSubtitle = "";

        let targetTokenId: string | undefined;
        let targetTokenName = "TARGET";
        let targetPosition: { x: number; y: number } | undefined;
        let targetAc: number | undefined;
        try {
            const selection = await OBR.player.getSelection().catch(() => [] as string[]);
            if (selection?.length) {
                const sceneItems = await OBR.scene.items.getItems(selection);
                const selItem = sceneItems[0];
                if (selItem) {
                    targetTokenId = selItem.id;
                    targetTokenName = selItem.name || "Target";
                    targetPosition = selItem.position;
                    const vitals = await getTokenVitals(selItem.id);
                    if (vitals?.armorClass) targetAc = vitals.armorClass;
                }
            }
        } catch { /* Ignore selection error */ }

        const bonusNote = totalBonusMod > 0 ? (isRaging ? ` • Rage (+${totalBonusMod})` : situational.totalBonus !== 0 ? ` • Mod (${situational.breakdown || `+${situational.totalBonus}`})` : ` • Buff (+${totalBonusMod})`) : "";

        const buffsToPass = activeBuffs || (isRaging ? ["rage"] : []);
        const riders = resolveWeaponRiders({
            character,
            weapon,
            activeBuffs: buffsToPass,
            riderChoice,
        });

        const extraRiderRolls: Array<{ rider: import("../../../services/weaponDamageRiders").ActiveWeaponRider; roll: import("../../../utils/dice").DDBDamageResult }> = [];
        for (const r of riders.activeDiceRiders) {
            const formula = r.bonus ? `${r.dice}+${r.bonus}` : (r.dice || "1d6");
            const rRoll = rollDamageDDB(formula, r.damageType, "", isCrit);
            extraRiderRolls.push({ rider: r, roll: rRoll });
        }

        const ridersTotal = extraRiderRolls.reduce((sum, item) => sum + item.roll.total, 0);
        const finalTotal = total + ridersTotal;

        const baseBreakdown = formatted.replace(/^Damage:\s*\d+\s*[A-Za-z]*\s*\(/, "").replace(/\)$/, "").replace(/\+/g, " + ");
        let finalBreakdown = baseBreakdown;
        let finalFormula = `${effectiveBaseDamage} ${weapon.damageType}`;

        if (extraRiderRolls.length > 0) {
            finalBreakdown += " + " + extraRiderRolls.map(i => `${i.roll.breakdown.replace(/\+/g, " + ")} (${i.rider.damageType})`).join(" + ");
            finalFormula += " + " + extraRiderRolls.map(i => `${i.rider.dice}${i.rider.bonus ? `+${i.rider.bonus}` : ""} ${i.rider.damageType}`).join(" + ");
        }

        const damageMode = await getDamageApplicationMode();
        let appliedDamageAmount: number | undefined;
        let resolutionNote: string | undefined;
        let damageResolutionStatus: "pending" | "applied" = "pending";
        let isTargetDefeated = false;

        if (damageMode === "auto" && targetTokenId) {
            const applyRes = await applyDamage(targetTokenId, finalTotal, weapon.damageType);
            appliedDamageAmount = applyRes?.effectiveDamage ?? finalTotal;
            resolutionNote = applyRes?.defenseNote;
            damageResolutionStatus = "applied";
            if (applyRes?.targetDefeated) {
                isTargetDefeated = true;
                if (character) {
                    dispatchCombatFeatureTrigger("on_target_defeated", {
                        character,
                        casterTokenId: casterId,
                        targetTokenId,
                        targetName: targetTokenName,
                        weapon,
                        damageDiceRoll: total,
                        damageTotal: finalTotal,
                    }).catch(console.error);
                }
            }
        }

        if (triggerInfo?.hasTrigger && !isTargetDefeated) {
            const triggerId = `trig_${Date.now()}_dock`;
            pendingTriggerId = triggerId;
            await addConditionalTrigger({
                id: triggerId, spellId: riderObj?.name.toLowerCase().replace(/[^a-z0-9_]/g, "") || "rider_spell",
                spellName: riderObj?.name || "Spell", casterName, targetId: targetTokenId || "TARGET", targetName: targetTokenName,
                conditionType: triggerInfo.conditionType, damageFormula: triggerInfo.damageDice,
                damageType: triggerInfo.damageType, conditionDescription: triggerInfo.conditionDesc,
                appliedAt: Date.now(), initialPosition: targetPosition
            });
            triggerSubtitle = ` • Condition Applied: ${triggerInfo.conditionDesc}`;
        }

        const riderSubtitles = extraRiderRolls.map(i => ` • ${i.rider.name} (${i.rider.damageType})`).join("");
        const finalSubtitle = isCrit
            ? `Critical Hit! • Damage (${weapon.damageType})${bonusNote}${riderSubtitles}${triggerSubtitle}`
            : `Damage (${weapon.damageType})${bonusNote}${riderSubtitles}${triggerSubtitle}`;
        const actionLabel = isThrown ? `${weapon.name} (Thrown)` : weapon.name;

        const cards: DDBRollCardData[] = [{
            id: `${Date.now()}-dock-dmg`,
            casterName,
            casterId,
            characterId: character?.id,
            targetName: targetTokenName,
            targetId: targetTokenId,
            targetAc,
            actionName: actionLabel.toUpperCase(),
            actionType: "DAMAGE",
            dieType: 8,
            diceBreakdown: finalBreakdown,
            formula: finalFormula,
            total: finalTotal,
            pendingDamage: finalTotal,
            appliedDamageAmount,
            resolutionNote,
            damageType: weapon.damageType,
            damageResolutionStatus,
            subtitle: finalSubtitle,
            isCrit,
            pendingTriggerId,
            pendingTriggerName: riderObj?.name,
            timestamp: Date.now()
        }];
        const isTargetHexed = Boolean(isHexActive && concentrationSpell?.hexTargetId && targetTokenId && concentrationSpell.hexTargetId === targetTokenId);
        if (isTargetHexed) {
            const hexDmg = rollDamageDDB("1d6", "Necrotic", "", isCrit);
            let hexAppliedAmount: number | undefined;
            let hexResolutionNote: string | undefined;
            let hexStatus: "pending" | "applied" = "pending";
            if (damageMode === "auto" && targetTokenId) {
                const hexRes = await applyDamage(targetTokenId, hexDmg.total, "Necrotic");
                hexAppliedAmount = hexRes?.effectiveDamage ?? hexDmg.total;
                hexResolutionNote = hexRes?.defenseNote;
                hexStatus = "applied";
            }
            cards.push({
                id: `${Date.now()}-dock-hex-dmg`,
                casterName,
                targetName: targetTokenName,
                targetId: targetTokenId,
                targetAc,
                actionName: "HEX (CURSE)",
                actionType: "DAMAGE",
                dieType: 6,
                diceBreakdown: hexDmg.breakdown.replace(/\+/g, " + "),
                formula: isCrit ? "2d6 Necrotic" : "1d6 Necrotic",
                total: hexDmg.total,
                pendingDamage: hexDmg.total,
                appliedDamageAmount: hexAppliedAmount,
                resolutionNote: hexResolutionNote,
                damageType: "Necrotic",
                damageResolutionStatus: hexStatus,
                subtitle: isCrit ? "Hex Critical Hit (+2d6 Necrotic)" : "Hex Curse (+1d6 Necrotic)",
                isCrit,
                timestamp: Date.now() + 1
            });
        }
        broadcastDDBRoll(cards);
    };

    const handleRiderClick = async (weapon: DDBWeaponAttack, rider: ReturnType<typeof parseRiderString>) => {
        const currentActive = activeRiderMap[weapon.id];
        const nextRider = currentActive === rider.name ? null : rider.name;
        setActiveRiderMap(prev => ({ ...prev, [weapon.id]: nextRider }));
        const matchSpell = spells.find(s => s.name.toLowerCase() === rider.name.toLowerCase());
        if (matchSpell) {
            await setSelectedSpell(matchSpell.id);
            setSelected(matchSpell.id);
            OBR.tool.activateTool(toolID);
        }
        const bonusNum = typeof damageBonus === "number" && damageBonus > 0 ? damageBonus : 0;
        const effectiveBaseDamage = combineDamageBonus(weapon.damage, bonusNum);
        const { total, formatted } = rollDamageBreakdown(effectiveBaseDamage, weapon.damageType, "", {
            name: rider.name, damage: rider.damage, damageType: rider.damageType, moveTrigger: rider.moveTrigger
        });
        const casterName = character?.name || "Character";

        let targetId: string | undefined;
        let targetName = "TARGET";
        try {
            const selection = await OBR.player.getSelection().catch(() => [] as string[]);
            if (selection?.length) {
                const sceneItems = await OBR.scene.items.getItems(selection);
                if (sceneItems[0]) {
                    targetId = sceneItems[0].id;
                    targetName = sceneItems[0].name || "Target";
                }
            }
        } catch {}

        const damageMode = await getDamageApplicationMode();
        let appliedDamageAmount: number | undefined;
        let resolutionNote: string | undefined;
        let damageResolutionStatus: "pending" | "applied" = "pending";

        if (damageMode === "auto" && targetId) {
            const applyRes = await applyDamage(targetId, total, weapon.damageType);
            appliedDamageAmount = applyRes?.effectiveDamage ?? total;
            resolutionNote = applyRes?.defenseNote;
            damageResolutionStatus = "applied";
            if (applyRes?.targetDefeated && character) {
                dispatchCombatFeatureTrigger("on_target_defeated", {
                    character,
                    casterTokenId: casterId,
                    targetTokenId: targetId,
                    weapon,
                    damageDiceRoll: total,
                    damageTotal: total,
                }).catch(console.error);
            }
        }

        broadcastDDBRoll([{
            id: `${Date.now()}-dock-rider-dmg`,
            casterName,
            targetName,
            targetId,
            actionName: weapon.name.toUpperCase(),
            actionType: "DAMAGE",
            dieType: 8,
            diceBreakdown: formatted.replace(/^Damage:\s*\d+\s*[A-Za-z]*\s*\(/, "").replace(/\)$/, "").replace(/\+/g, " + "),
            formula: `${effectiveBaseDamage} + ${rider.damage}`,
            total,
            pendingDamage: total,
            appliedDamageAmount,
            resolutionNote,
            damageType: weapon.damageType,
            damageResolutionStatus,
            subtitle: `${rider.name} Rider Damage`,
            timestamp: Date.now()
        }]);
    };

    return { handleWeaponAttackRoll, handleWeaponDamageRoll, handleRiderClick };
}
