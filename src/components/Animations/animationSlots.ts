import { getEffect } from "../../effects/effects";
import { getSpell } from "../../effects/spells";
import type { EffectType } from "../../types/effects";
import type { Spell } from "../../types/spells";

export interface SpellAnimationSlot {
    sourceId: string;
    label: string;
    type: EffectType;
}

function findEffectIds(blueprints: Spell["blueprints"]): string[] {
    const ids: string[] = [];
    for (const blueprint of blueprints ?? []) {
        if (blueprint.type === "effect" && typeof blueprint.id === "string") {
            if (getEffect(blueprint.id) && !ids.includes(blueprint.id)) {
                ids.push(blueprint.id);
            }
        }
        for (const nestedId of findEffectIds(blueprint.blueprints)) {
            if (!ids.includes(nestedId)) ids.push(nestedId);
        }
    }
    return ids;
}

export function getSpellAnimationSlots(spellId: string): SpellAnimationSlot[] {
    const spell = getSpell(spellId, true);
    return findEffectIds(spell?.blueprints).flatMap((sourceId) => {
        const effect = getEffect(sourceId);
        if (!effect) return [];
        const role = sourceId.split(".").pop();
        const label = role === "caster" || role === "target"
            ? role[0].toUpperCase() + role.slice(1)
            : sourceId.replace(/\./g, " / ");
        return [{ sourceId, label, type: effect.type }];
    });
}
