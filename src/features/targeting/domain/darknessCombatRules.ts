/**
 * Darkness Combat Rules & 5.5e Vision Evaluation
 *
 * Implements D&D 5.5e (2024 PHB) rules for Darkness, Line of Sight,
 * Unseen Attackers and Targets, and sight requirements for spells.
 */

export interface DarknessCombatRollModifier {
    rollMode: "normal" | "advantage" | "disadvantage";
    reason?: string;
    isUnseenAttacker: boolean;
    isUnseenTarget: boolean;
    isMutualDarkness: boolean;
}

import { ALL_MANUAL_OVERRIDES } from "../../../assets/manual-formulas";

/**
 * Known spells that explicitly require sight according to D&D 5.5e rules.
 * Examples: "a target you can see", "a creature that you can see", "an unoccupied space that you can see".
 */
const KNOWN_SIGHT_REQUIRED_SPELL_IDS = new Set([
    "magic_missile",
    "hold_person",
    "hold_monster",
    "sacred_flame",
    "healing_word",
    "misty_step",
    "vicious_mockery",
    "disintegrate",
    "power_word_kill",
    "power_word_stun",
    "banishment",
    "blindness_deafness",
    "charm_person",
    "command",
    "crown_of_madness",
    "dominate_person",
    "dominate_monster",
    "eyebite",
    "feeblemind",
    "befuddlement",
    "geas",
    "heat_metal",
    "hunter_s_mark",
    "hunters_mark",
    "hex",
    "spiritual_weapon",
    "toll_the_dead",
    "chain_lightning",
    "otto_s_irresistible_dance",
    "ottos_irresistible_dance",
    "polymorph",
    "true_polymorph",
    "maze",
    "imprisonment",
    "flesh_to_stone",
    "teleport"
]);

/**
 * Known spell attacks that do NOT require sight according to D&D 5.5e rules.
 * They target a creature within range and make an attack roll (can be aimed into the dark).
 */
const KNOWN_NO_SIGHT_SPELL_IDS = new Set([
    "fire_bolt",
    "eldritch_blast",
    "ray_of_frost",
    "chill_touch",
    "shocking_grasp",
    "guiding_bolt",
    "inflict_wounds",
    "scorching_ray",
    "chaos_bolt",
    "chromatic_orb",
    "witch_bolt",
    "melf_s_acid_arrow",
    "melfs_acid_arrow",
    "vampiric_touch",
    "storm_sphere",
    "steel_wind_strike",
    "crown_of_stars",
    "blade_ward",
    "true_strike",
    "booming_blade",
    "green_flame_blade",
    "sword_burst",
    "thunderclap",
    "primal_savagery",
    "thorn_whip",
    "shillelagh",
    "produce_flame",
    "acid_splash",
    "poison_spray"
]);

/**
 * Regex patterns in spell descriptions indicating a mandatory line of sight requirement.
 */
const SIGHT_REQUIREMENT_REGEX = /(?:target|creature|point|humanoid|beast|fiend|undead|object|space)\s+(?:of your choice\s+)?(?:within range\s+)?(?:that|whom)?\s*you\s+can\s+see/i;

/**
 * Checks if an action is an attack action (weapon attack or spell attack).
 */
export function isAttackAction(action: {
    selectedSpell?: string;
    spell?: { saveOrAttack?: string; minTargets?: number; maxTargets?: number };
    ddbSpell?: { saveOrAttack?: string };
    spellFormula?: { interaction?: { type?: string } };
}): boolean {
    const id = (action.selectedSpell || "").toLowerCase();

    // 1. Direct weapon attacks
    if (
        id === "melee_weapon_attack" ||
        id === "ranged_weapon_attack" ||
        id === "flurry_of_blows" ||
        id.startsWith("monster_weapon_") ||
        id.includes("unarmed_strike")
    ) {
        return true;
    }

    // 2. Spell formula interaction
    const interactionType = action.spellFormula?.interaction?.type;
    if (
        interactionType === "spell_attack" ||
        interactionType === "melee_spell_attack" ||
        interactionType === "weapon_based"
    ) {
        return true;
    }

    // 3. Manual catalog override
    const normalizedId = id.replace(/[- ]/g, "_");
    const manualFormula = ALL_MANUAL_OVERRIDES[normalizedId] || ALL_MANUAL_OVERRIDES[id];
    if (manualFormula?.interaction) {
        const type = manualFormula.interaction.type;
        if (type === "spell_attack" || type === "melee_spell_attack" || type === "weapon_based") {
            return true;
        }
    }

    // 4. DDB saveOrAttack property
    const saveOrAttack = (action.ddbSpell?.saveOrAttack || action.spell?.saveOrAttack || "").toLowerCase();
    if (saveOrAttack.includes("attack")) {
        return true;
    }

    // 5. Fallback known spell attacks
    if (KNOWN_NO_SIGHT_SPELL_IDS.has(normalizedId)) {
        return true;
    }

    return false;
}

/**
 * Determines whether a spell requires line of sight to target a creature or space.
 * Follows D&D 5.5e rules: only spells that explicitly require "that you can see" need sight.
 * Attack rolls and blind-aimable AoE spells do not require sight.
 */
export function doesSpellRequireSight(spell: {
    id?: string;
    name?: string;
    description?: string;
    ddbSpell?: { description?: string };
    spellFormula?: { interaction?: { type?: string }; effectNotes?: string[] };
}): boolean {
    const id = (spell.id || spell.name || "").toLowerCase().replace(/[- ]/g, "_");

    // Fast-path known lists
    if (KNOWN_NO_SIGHT_SPELL_IDS.has(id)) {
        return false;
    }
    if (KNOWN_SIGHT_REQUIRED_SPELL_IDS.has(id)) {
        return true;
    }

    // Check manual catalog description and range
    const manualFormula = ALL_MANUAL_OVERRIDES[id];
    if (manualFormula) {
        const manualDesc = [
            manualFormula.casting?.range,
            manualFormula.notes,
            Array.isArray(manualFormula.effectNotes) ? manualFormula.effectNotes.join(" ") : undefined
        ].filter(Boolean).join(" ");
        if (SIGHT_REQUIREMENT_REGEX.test(manualDesc)) {
            return true;
        }
    }

    // Check descriptions for explicit sight requirements
    const desc = [
        spell.description,
        spell.ddbSpell?.description,
        Array.isArray(spell.spellFormula?.effectNotes) ? spell.spellFormula.effectNotes.join(" ") : undefined
    ].filter(Boolean).join(" ");

    if (desc && SIGHT_REQUIREMENT_REGEX.test(desc)) {
        return true;
    }

    // Default: If it's a spell attack, it does NOT require sight unless explicitly stated
    const isAttack = isAttackAction({
        selectedSpell: id,
        spellFormula: spell.spellFormula
    });
    if (isAttack) {
        return false;
    }

    return false;
}

/**
 * Resolves the 5.5e (2024 PHB) Darkness combat roll modifier based on 2-way line of sight.
 *
 * 5.5e Rules Matrix:
 * - Caster sees target, Target can't see caster -> Advantage (Unseen Attacker)
 * - Caster can't see target, Target sees caster -> Disadvantage (Unseen Target)
 * - Both can't see each other -> Straight Roll (Advantage & Disadvantage cancel out by 5.5e RAW)
 * - Both can see each other -> Straight Roll (Normal)
 */
export function resolveDarknessCombatModifiers(params: {
    casterCanSeeTarget: boolean;
    targetCanSeeCaster: boolean;
    enableMutualCancel?: boolean;
}): DarknessCombatRollModifier {
    const { casterCanSeeTarget, targetCanSeeCaster, enableMutualCancel = true } = params;

    const isUnseenTarget = !casterCanSeeTarget;
    const isUnseenAttacker = !targetCanSeeCaster;
    const isMutualDarkness = isUnseenTarget && isUnseenAttacker;

    if (isMutualDarkness) {
        if (enableMutualCancel) {
            return {
                rollMode: "normal",
                reason: "Mutual Darkness (Advantage & Disadvantage Cancel)",
                isUnseenAttacker: true,
                isUnseenTarget: true,
                isMutualDarkness: true
            };
        } else {
            return {
                rollMode: "disadvantage",
                reason: "Disadvantage - Blind Combatants",
                isUnseenAttacker: true,
                isUnseenTarget: true,
                isMutualDarkness: true
            };
        }
    }

    if (isUnseenAttacker && casterCanSeeTarget) {
        return {
            rollMode: "advantage",
            reason: "Advantage - Unseen Attacker",
            isUnseenAttacker: true,
            isUnseenTarget: false,
            isMutualDarkness: false
        };
    }

    if (isUnseenTarget && targetCanSeeCaster) {
        return {
            rollMode: "disadvantage",
            reason: "Disadvantage - Unseen Target",
            isUnseenAttacker: false,
            isUnseenTarget: true,
            isMutualDarkness: false
        };
    }

    return {
        rollMode: "normal",
        isUnseenAttacker: false,
        isUnseenTarget: false,
        isMutualDarkness: false
    };
}

/**
 * Safely finds a spell in a DDB character's spell list without throwing TypeErrors
 * when spell objects have missing, null, or non-string properties.
 */
export function findDdbSpellSafely(
    spells: Array<{ id?: string | number; name?: string }> | undefined | null,
    selectedSpell: string | undefined
): any | undefined {
    if (!spells || !selectedSpell) return undefined;
    const targetLower = String(selectedSpell).toLowerCase();
    return spells.find(
        (s) =>
            (typeof s?.name === "string" && s.name.toLowerCase() === targetLower) ||
            String(s?.id).toLowerCase() === targetLower
    );
}

