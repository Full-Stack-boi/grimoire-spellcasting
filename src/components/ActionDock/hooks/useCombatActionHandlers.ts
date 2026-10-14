import type { Dispatch, SetStateAction } from "react";
import OBR from "@owlbear-rodeo/sdk";
import type { DDBParsedCharacter, DDBWeaponAttack } from "../../../types/ddb";
import { rollAttack, rollFormula } from "../../../utils/dice";
import { rollSingleCombatantInitiative } from "../../../features/combat/initiativeService";
import { combineD20RollModes, resolveConditionRules } from "../../../features/combat/domain/conditionRules";

interface UseCombatActionHandlersOptions {
    tokenId?: string;
    character: DDBParsedCharacter | null;
    conditions: string[];
    exhaustionLevel: number;
    weapons: DDBWeaponAttack[];
    offhandWeapon?: DDBWeaponAttack;
    setHeroicInspiration: Dispatch<SetStateAction<boolean>>;
    onSelectWeapon: (weapon: DDBWeaponAttack, mode?: "melee" | "thrown", attackCount?: number) => void;
}

export function useCombatActionHandlers({ tokenId, character, conditions, exhaustionLevel, weapons, offhandWeapon, setHeroicInspiration, onSelectWeapon }: UseCombatActionHandlersOptions) {
    const handleTwoWeaponFighting = () => {
        const effectiveOffhand = offhandWeapon || character?.offhandWeapon;
        if (effectiveOffhand) {
            const rules = resolveConditionRules({
                conditions,
                exhaustionLevel,
                rollKind: "attack",
                actionType: "bonus_action",
                attackType: "melee",
            });
            if (rules.blocked) {
                OBR.notification.show(`Action prevented by condition: ${rules.reasons.join("; ")}`, "WARNING");
                return;
            }
            onSelectWeapon(effectiveOffhand, "melee");
            const attack = rollAttack(
                effectiveOffhand.toHit - rules.d20Penalty,
                `Two-Weapon Fighting (Offhand)${rules.mode === "advantage" ? " (ADV)" : rules.mode === "disadvantage" ? " (DIS)" : ""}`,
                rules.mode,
            );
            const damage = rollFormula(effectiveOffhand.damage);
            OBR.notification.show(`${attack.message} | Dmg: ${damage.breakdown} ${effectiveOffhand.damageType}${rules.reasons.length ? ` • ${rules.reasons.join("; ")}` : ""}`, "INFO");
        } else {
            OBR.notification.show("Two-Weapon Fighting: Attack with second Light weapon as a Bonus Action", "INFO");
        }
    };

    const handleOpportunityAttack = () => {
        const weapon = weapons[0];
        if (weapon) {
            const rules = resolveConditionRules({
                conditions,
                exhaustionLevel,
                rollKind: "attack",
                actionType: "reaction",
                attackType: "melee",
            });
            if (rules.blocked) {
                OBR.notification.show(`Action prevented by condition: ${rules.reasons.join("; ")}`, "WARNING");
                return;
            }
            onSelectWeapon(weapon, "melee");
            const attack = rollAttack(
                weapon.toHit - rules.d20Penalty,
                `Opportunity Attack (${weapon.name})${rules.mode === "advantage" ? " (ADV)" : rules.mode === "disadvantage" ? " (DIS)" : ""}`,
                rules.mode,
            );
            const damage = rollFormula(weapon.damage);
            OBR.notification.show(`${attack.message} | Dmg: ${damage.breakdown} ${weapon.damageType}${rules.reasons.length ? ` • ${rules.reasons.join("; ")}` : ""}`, "INFO");
        } else {
            OBR.notification.show("Opportunity Attack: Make 1 melee attack when a hostile creature leaves your reach", "INFO");
        }
    };

    const handleInitiativeRoll = async () => {
        const initiativeBonus = character?.initiative ?? (character ? character.modifiers.dex : 3);
        const hasAdvantage = character?.hasInitiativeAdvantage ?? false;
        const rules = resolveConditionRules({
            conditions,
            exhaustionLevel,
            rollKind: "ability_check",
            ability: "dex",
        });
        if (rules.blocked) {
            OBR.notification.show(rules.reasons.join(" • "), "WARNING");
            return;
        }
        const mode = combineD20RollModes(
            hasAdvantage ? "advantage" : "normal",
            rules.mode,
        );

        if (tokenId) {
            const rollResult = await rollSingleCombatantInitiative(
                tokenId,
                mode,
                undefined,
                -rules.d20Penalty,
            );
            if (rollResult) {
                return;
            }
        }

        const roll = rollAttack(initiativeBonus - rules.d20Penalty, "Initiative", mode);
        OBR.notification.show(
            `${roll.message}${rules.requiresAdjudication.length ? ` • DM adjudication needed: ${rules.requiresAdjudication.join("; ")}` : ""}${rules.reasons.length ? ` • ${rules.reasons.join("; ")}` : ""}`,
            "INFO",
        );
    };

    const handleToggleInspiration = () => {
        setHeroicInspiration(previous => {
            const next = !previous;
            OBR.notification.show(next ? "Heroic Inspiration gained!" : "Heroic Inspiration spent", "INFO");
            return next;
        });
    };

    return { handleTwoWeaponFighting, handleOpportunityAttack, handleInitiativeRoll, handleToggleInspiration };
}
