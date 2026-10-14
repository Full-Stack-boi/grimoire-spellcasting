import OBR from "@owlbear-rodeo/sdk";
import { getSpellBeamInfo } from "../../../services/spellBeamService";
import { broadcastDDBRoll } from "../../../services/rollLogService";
import { checkAndFireActionTriggers } from "../../../services/conditionalTriggerService";
import { hasPotentCantrip } from "../../../services/ddbService";
import { rollAttack, rollDamageDDB, doubleDiceFormula } from "../../../utils/dice";
import type { DDBParsedCharacter } from "../../../types/ddb";
import type { DDBRollCardData, DDBSubRollEntry, DDBSubRollExtraDamage } from "../../../types/ddbRollLog";
import { applyDamage, applyRayOfFrostSpeedReduction, getTokenVitals } from "../../../features/combat/tokenVitalsService";
import { getDamageApplicationMode } from "../../../features/combat/damageModeService";
import { combineD20RollModes, resolveConditionRules } from "../../../features/combat/domain/conditionRules";
import type { D20RollMode } from "../../../features/combat/domain/conditionRules";
import { resolveAttackHit } from "../../../features/combat/domain/attackResolution";
import { calculateDisplayedSpeed } from "../../../features/combat/domain/temporaryCombatEffects";

interface UseSpellAttackRollOptions {
    casterId?: string;
    character: DDBParsedCharacter | null;
    hasSpellAdvantage: boolean;
    conditions: string[];
    exhaustionLevel: number;
    concentrationSpell: { id: string; name: string; hexTargetId?: string | null } | null;
    selectedHexAbility: string;
    onSelectSpell: (spellId: string) => void;
}

export function useSpellAttackRoll({
    casterId,
    character,
    hasSpellAdvantage,
    conditions,
    exhaustionLevel,
    concentrationSpell,
    selectedHexAbility,
    onSelectSpell,
}: UseSpellAttackRollOptions) {
    return async (spell: { id: string; name: string; hitOrDc?: string }) => {
        if (casterId) checkAndFireActionTriggers(casterId, "spell").catch(() => {});
        onSelectSpell(spell.id);
        const casterName = character?.name || "Character";
        const beamInfo = getSpellBeamInfo(spell.id, character?.level ?? 1);

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

        if (spell.hitOrDc?.startsWith("+")) {
            let bonus = parseInt(spell.hitOrDc.replace("+", ""), 10) || 0;
            const targetVitals = targetId ? await getTokenVitals(targetId) : null;
            const conditionRules = resolveConditionRules({
                conditions,
                targetConditions: targetVitals?.conditions,
                exhaustionLevel,
                rollKind: "attack",
                attackType: "ranged",
                actionType: "action",
            });
            if (conditionRules.blocked) {
                OBR.notification.show(conditionRules.reasons.join(" • "), "WARNING");
                return;
            }
            bonus -= conditionRules.d20Penalty;
            if (conditionRules.requiresAdjudication.length > 0) {
                OBR.notification.show(
                    `DM adjudication needed: ${conditionRules.requiresAdjudication.join("; ")}`,
                    "WARNING",
                );
            }
            const mode: D20RollMode = combineD20RollModes(
                hasSpellAdvantage ? "advantage" : "normal",
                conditionRules.mode,
            );
            const conditionNote = [...conditionRules.reasons, ...conditionRules.requiresAdjudication].join(" • ");
            const isHexActive = concentrationSpell?.id?.toLowerCase() === "hex" || concentrationSpell?.name?.toLowerCase() === "hex";
            const isTargetHexed = Boolean(isHexActive && concentrationSpell?.hexTargetId && targetId && concentrationSpell.hexTargetId === targetId);
            const ddbSpell = character?.spells?.find(s => s.id === spell.id || s.name.toLowerCase() === spell.name.toLowerCase());
            const damageType = ddbSpell?.damageType || "Force";
            const dieFaces = Number(ddbSpell?.damage?.match(/d(\d+)/i)?.[1] ?? 10);

            if (beamInfo.isMultiBeam) {
                const subRolls: DDBSubRollEntry[] = [];
                let totalCombinedDamage = 0;
                let totalHexDamage = 0;
                let anyCrit = false;
                let allMiss = true;

                for (let b = 1; b <= beamInfo.totalBeams; b++) {
                    const roll = rollAttack(bonus, "", mode);
                    if (roll.isCrit) anyCrit = true;
                    if (!roll.isMiss) allMiss = false;
                    let bDmgResult: ReturnType<typeof rollDamageDDB> | null = null;
                    const extraDamage: DDBSubRollExtraDamage[] = [];
                    if (!roll.isMiss) {
                        bDmgResult = ddbSpell?.damage ? rollDamageDDB(ddbSpell.damage, damageType, "", roll.isCrit) : null;
                        if (bDmgResult) totalCombinedDamage += bDmgResult.total;
                        if (isTargetHexed) {
                            const hexDice = roll.isCrit ? "2d6" : "1d6";
                            const hexDmg = rollDamageDDB("1d6", "Necrotic", "", roll.isCrit);
                            totalHexDamage += hexDmg.total;
                            extraDamage.push({
                                name: "Hex", total: hexDmg.total, damageType: "Necrotic",
                                diceBreakdown: hexDmg.breakdown.replace(/\+/g, " + "),
                                formula: `${hexDice} Necrotic`, isCrit: roll.isCrit,
                            });
                        }
                    } else {
                        const isCantrip = ddbSpell?.level === 0;
                        if (isCantrip && hasPotentCantrip(character) && ddbSpell?.damage) {
                            const fullDmg = rollDamageDDB(ddbSpell.damage, damageType, "", false);
                            const halfDmg = Math.max(1, Math.floor(fullDmg.total / 2));
                            totalCombinedDamage += halfDmg;
                            bDmgResult = {
                                total: halfDmg, damageType, breakdown: `${halfDmg} (Half)`,
                                formatted: `${halfDmg} ${damageType}`, message: `${halfDmg} ${damageType}`,
                            };
                        }
                    }
                    subRolls.push({
                        unitLabel: `${beamInfo.beamUnit.toUpperCase()} ${b}`,
                        targetName,
                        targetId,
                        toHit: {
                            total: roll.total,
                            diceBreakdown: `${roll.d20} ${roll.bonus >= 0 ? `+ ${roll.bonus}` : `- ${Math.abs(roll.bonus)}`}`,
                            formula: `1d20${bonus >= 0 ? `+${bonus}` : `${bonus}`}${mode === "advantage" ? " (ADV)" : ""}`,
                            isCrit: roll.isCrit, isMiss: roll.isMiss,
                        },
                        damage: bDmgResult ? {
                            total: bDmgResult.total, damageType,
                            diceBreakdown: bDmgResult.breakdown.replace(/\+/g, " + "),
                            formula: (() => {
                                const beamDiceForDisplay = roll.isCrit && ddbSpell?.damage
                                    ? doubleDiceFormula(ddbSpell.damage)
                                    : (ddbSpell?.damage || "");
                                return `${beamDiceForDisplay} ${damageType}`.trim();
                            })(), isCrit: roll.isCrit,
                        } : undefined,
                        extraDamage: extraDamage.length > 0 ? extraDamage : undefined,
                    });
                }
                const totalDamageNum = totalCombinedDamage + totalHexDamage;
                const damageMode = await getDamageApplicationMode();
                let appliedDamageAmount: number | undefined;
                let resolutionNote: string | undefined;
                let damageResolutionStatus: "pending" | "applied" | undefined = totalDamageNum > 0 ? "pending" : undefined;

                if (damageMode === "auto" && targetId && totalDamageNum > 0) {
                    const applyRes = await applyDamage(targetId, totalCombinedDamage, damageType);
                    let effectiveTotal = applyRes?.effectiveDamage ?? totalCombinedDamage;
                    let defNote = applyRes?.defenseNote;
                    if (totalHexDamage > 0) {
                        const hexRes = await applyDamage(targetId, totalHexDamage, "Necrotic");
                        effectiveTotal += (hexRes?.effectiveDamage ?? totalHexDamage);
                        defNote = [defNote, hexRes?.defenseNote].filter(Boolean).join(" • ");
                    }
                    damageResolutionStatus = "applied";
                    appliedDamageAmount = effectiveTotal;
                    resolutionNote = defNote;
                }

                const groupedCard: DDBRollCardData = {
                    id: `${Date.now()}-dock-multi-${spell.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                    casterName,
                    targetName,
                    targetId,
                    actionName: spell.name.toUpperCase(),
                    actionType: "SPELL",
                    dieType: dieFaces,
                    diceBreakdown: subRolls.map(s => `${s.toHit?.total ?? 0}`).join(", "),
                    formula: `${beamInfo.totalBeams} ${beamInfo.beamUnit}s (${ddbSpell?.damage || ""} ${damageType} each)`,
                    total: totalDamageNum,
                    pendingDamage: totalDamageNum > 0 ? totalDamageNum : undefined,
                    appliedDamageAmount,
                    resolutionNote,
                    damageType,
                    damageResolutionStatus,
                    subtitle: `${anyCrit ? `Critical Hit! • ${beamInfo.totalBeams} ${beamInfo.beamUnit}s` : `${beamInfo.totalBeams} ${beamInfo.beamUnit}s • ${damageType}`}${conditionNote ? ` • ${conditionNote}` : ""}`,
                    isCrit: anyCrit,
                    isMiss: allMiss,
                    timestamp: Date.now(),
                    subRolls,
                };
                broadcastDDBRoll([groupedCard]);
                OBR.notification.show(
                    `${casterName} - ${spell.name} (${beamInfo.totalBeams} ${beamInfo.beamUnit}s): ${subRolls.map(s => s.toHit?.total).join(", ")}`,
                    anyCrit ? "SUCCESS" : "INFO"
                );
                return;
            }

            const roll = rollAttack(bonus, "", mode);
            const hitResolution = typeof targetVitals?.armorClass === "number"
                ? resolveAttackHit(
                    { d20: roll.d20, total: roll.total },
                    targetVitals.armorClass,
                    { hideAcNumber: true },
                )
                : null;
            const isHit = !roll.isMiss && (roll.isCrit || hitResolution?.isHit === true);
            const cards: DDBRollCardData[] = [{
                id: `${Date.now()}-dock-spell-atk`,
                casterName,
                targetName,
                targetId,
                actionName: spell.name.toUpperCase(),
                actionType: "TO HIT",
                dieType: 20,
                diceBreakdown: `${roll.d20} ${roll.bonus >= 0 ? `+ ${roll.bonus}` : `- ${Math.abs(roll.bonus)}`}`,
                formula: `1d20${bonus >= 0 ? `+${bonus}` : `${bonus}`}${mode === "advantage" ? " (ADV)" : ""}`,
                total: roll.total,
                subtitle: `${roll.isCrit ? "Critical Hit!" : roll.isMiss ? "Critical Miss!" : "Spell Attack Roll"}${conditionNote ? ` • ${conditionNote}` : ""}`,
                isCrit: roll.isCrit,
                isMiss: roll.isMiss,
                timestamp: Date.now()
            }];

            let extraNotice = "";
            const damageMode = await getDamageApplicationMode();
            if (!roll.isMiss) {
                if (
                    spell.name.trim().toLowerCase() === "ray of frost" &&
                    typeof targetVitals?.armorClass !== "number"
                ) {
                    OBR.notification.show(
                        "DM adjudication needed: target AC is unavailable; confirm the Ray of Frost hit before applying its Speed reduction.",
                        "WARNING",
                    );
                }
                if (spell.name.trim().toLowerCase() === "ray of frost" && isHit && targetId && casterId) {
                    const effect = await applyRayOfFrostSpeedReduction(targetId, casterId, casterName);
                    if (effect) {
                        const displayedSpeed = calculateDisplayedSpeed(
                            effect.speedFeet,
                            effect.conditions,
                            effect.exhaustionLevel ?? 0,
                            effect.effects,
                        );
                        const speedMessage = displayedSpeed.speed === null
                            ? "Speed reduced by 10 ft."
                            : `Speed is now ${displayedSpeed.speed} ft.`;
                        extraNotice = ` | Ray of Frost: ${speedMessage} until your next turn`;
                        OBR.notification.show(
                            `${targetName}'s ${speedMessage} until ${casterName}'s next turn. Movement is not enforced.`,
                            "INFO",
                        );
                    }
                }
                if (isTargetHexed) {
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
                    }
                    cards.push({
                        id: `${Date.now()}-dock-hex-dmg`,
                        casterName,
                        targetName,
                        targetId,
                        actionName: selectedHexAbility ? `HEX (${selectedHexAbility.toUpperCase()})` : "HEX (CURSE)",
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
                    extraNotice = ` | Hex: +${hexDmg.total} Necrotic`;
                }
            } else {
                const isCantrip = ddbSpell?.level === 0;
                if (isCantrip && hasPotentCantrip(character) && ddbSpell?.damage) {
                    const fullDmg = rollDamageDDB(ddbSpell.damage, damageType, "", false);
                    const halfDmg = Math.max(1, Math.floor(fullDmg.total / 2));
                    const potentDieFaces = Number(ddbSpell.damage.match(/d(\d+)/i)?.[1] ?? 8);
                    let potentAppliedAmount: number | undefined;
                    let potentResolutionNote: string | undefined;
                    let potentStatus: "pending" | "applied" = "pending";
                    if (damageMode === "auto" && targetId) {
                        const potentRes = await applyDamage(targetId, halfDmg, damageType);
                        potentAppliedAmount = potentRes?.effectiveDamage ?? halfDmg;
                        potentResolutionNote = potentRes?.defenseNote;
                        potentStatus = "applied";
                    }
                    cards.push({
                        id: `${Date.now()}-dock-potent-dmg`,
                        casterName,
                        targetName,
                        targetId,
                        actionName: `${spell.name.toUpperCase()} (POTENT CANTRIP)`,
                        actionType: "DAMAGE",
                        dieType: potentDieFaces,
                        diceBreakdown: `${halfDmg} (Half)`,
                        formula: `${halfDmg} ${damageType}`,
                        total: halfDmg,
                        pendingDamage: halfDmg,
                        appliedDamageAmount: potentAppliedAmount,
                        resolutionNote: potentResolutionNote,
                        damageType: damageType,
                        damageResolutionStatus: potentStatus,
                        subtitle: "Potent Cantrip (Half Damage on Miss)",
                        timestamp: Date.now() + 1
                    });
                    extraNotice = ` | Potent Cantrip: ${halfDmg} ${damageType}`;
                }
            }
            broadcastDDBRoll(cards);
            OBR.notification.show(`${casterName} - ${spell.name}: ${roll.formatted}${extraNotice}`, roll.isCrit ? "SUCCESS" : roll.isMiss ? "WARNING" : "INFO");
        } else if (spell.hitOrDc) {
            OBR.notification.show(`${spell.name} Save: ${spell.hitOrDc}`, "INFO");
        } else {
            OBR.notification.show(`Selected ${spell.name}`, "INFO");
        }
    };
}
