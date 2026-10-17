import { describe, it, expect } from "vitest";
import {
    isAttackAction,
    doesSpellRequireSight,
    resolveDarknessCombatModifiers
} from "./darknessCombatRules";

describe("darknessCombatRules", () => {
    describe("isAttackAction", () => {
        it("identifies standard weapon attacks", () => {
            expect(isAttackAction({ selectedSpell: "melee_weapon_attack" })).toBe(true);
            expect(isAttackAction({ selectedSpell: "ranged_weapon_attack" })).toBe(true);
            expect(isAttackAction({ selectedSpell: "flurry_of_blows" })).toBe(true);
            expect(isAttackAction({ selectedSpell: "monster_weapon_bite" })).toBe(true);
            expect(isAttackAction({ selectedSpell: "weapon_unarmed_strike" })).toBe(true);
        });

        it("identifies spell attacks via formula or saveOrAttack", () => {
            expect(isAttackAction({ selectedSpell: "fire_bolt" })).toBe(true);
            expect(isAttackAction({ selectedSpell: "eldritch_blast" })).toBe(true);
            expect(isAttackAction({
                selectedSpell: "custom_spell",
                ddbSpell: { saveOrAttack: "Ranged Spell Attack" }
            })).toBe(true);
            expect(isAttackAction({
                selectedSpell: "custom_spell",
                spellFormula: { interaction: { type: "spell_attack" } }
            })).toBe(true);
            expect(isAttackAction({
                selectedSpell: "custom_spell",
                spellFormula: { interaction: { type: "weapon_based" } }
            })).toBe(true);
        });

        it("returns false for saving throw or utility spells", () => {
            expect(isAttackAction({
                selectedSpell: "fireball",
                spell: { saveOrAttack: "DEX Save DC" }
            })).toBe(false);
            expect(isAttackAction({
                selectedSpell: "hold_person",
                spell: { saveOrAttack: "WIS Save DC" }
            })).toBe(false);
            expect(isAttackAction({
                selectedSpell: "misty_step",
                spell: { saveOrAttack: "None" }
            })).toBe(false);
        });
    });

    describe("doesSpellRequireSight", () => {
        it("returns true for spells explicitly requiring sight", () => {
            expect(doesSpellRequireSight({ id: "magic_missile" })).toBe(true);
            expect(doesSpellRequireSight({ id: "hold_person" })).toBe(true);
            expect(doesSpellRequireSight({ id: "sacred_flame" })).toBe(true);
            expect(doesSpellRequireSight({ id: "healing_word" })).toBe(true);
            expect(doesSpellRequireSight({ id: "misty_step" })).toBe(true);
            expect(doesSpellRequireSight({ id: "disintegrate" })).toBe(true);
            expect(doesSpellRequireSight({ id: "hex" })).toBe(true);
            expect(doesSpellRequireSight({ id: "hunters_mark" })).toBe(true);
        });

        it("returns false for spell attacks", () => {
            expect(doesSpellRequireSight({ id: "fire_bolt" })).toBe(false);
            expect(doesSpellRequireSight({ id: "eldritch_blast" })).toBe(false);
            expect(doesSpellRequireSight({ id: "ray_of_frost" })).toBe(false);
            expect(doesSpellRequireSight({ id: "guiding_bolt" })).toBe(false);
            expect(doesSpellRequireSight({ id: "scorching_ray" })).toBe(false);
        });

        it("detects sight requirements in custom spell descriptions", () => {
            expect(doesSpellRequireSight({
                id: "custom_blast",
                description: "Choose a target that you can see within 60 feet. It takes 3d6 psychic damage."
            })).toBe(true);
            expect(doesSpellRequireSight({
                id: "custom_smite",
                description: "A creature you can see takes radiant damage."
            })).toBe(true);
            expect(doesSpellRequireSight({
                id: "blind_fire_ray",
                description: "Make a ranged spell attack against a creature within range."
            })).toBe(false);
        });
    });

    describe("resolveDarknessCombatModifiers", () => {
        it("awards Advantage to Unseen Attacker when target cannot see caster", () => {
            const res = resolveDarknessCombatModifiers({
                casterCanSeeTarget: true,
                targetCanSeeCaster: false
            });
            expect(res.rollMode).toBe("advantage");
            expect(res.reason).toBe("Advantage - Unseen Attacker");
            expect(res.isUnseenAttacker).toBe(true);
            expect(res.isUnseenTarget).toBe(false);
        });

        it("inflicts Disadvantage when caster cannot see target but target can see caster", () => {
            const res = resolveDarknessCombatModifiers({
                casterCanSeeTarget: false,
                targetCanSeeCaster: true
            });
            expect(res.rollMode).toBe("disadvantage");
            expect(res.reason).toBe("Disadvantage - Unseen Target");
            expect(res.isUnseenAttacker).toBe(false);
            expect(res.isUnseenTarget).toBe(true);
        });

        it("cancels Advantage and Disadvantage to a Normal roll under 5.5e RAW (Mutual Darkness)", () => {
            const res = resolveDarknessCombatModifiers({
                casterCanSeeTarget: false,
                targetCanSeeCaster: false,
                enableMutualCancel: true
            });
            expect(res.rollMode).toBe("normal");
            expect(res.reason).toContain("Mutual Darkness");
            expect(res.isMutualDarkness).toBe(true);
        });

        it("supports table house-rules where blind combatants suffer Disadvantage", () => {
            const res = resolveDarknessCombatModifiers({
                casterCanSeeTarget: false,
                targetCanSeeCaster: false,
                enableMutualCancel: false
            });
            expect(res.rollMode).toBe("disadvantage");
            expect(res.reason).toBe("Disadvantage - Blind Combatants");
            expect(res.isMutualDarkness).toBe(true);
        });

        it("returns normal roll mode when both combatants can see each other", () => {
            const res = resolveDarknessCombatModifiers({
                casterCanSeeTarget: true,
                targetCanSeeCaster: true
            });
            expect(res.rollMode).toBe("normal");
            expect(res.isUnseenAttacker).toBe(false);
            expect(res.isUnseenTarget).toBe(false);
        });
    });
});
