import { describe, it, expect } from "vitest";
import { resolveFeatureActionOptions } from "../classResourceService";
import type { DDBParsedCharacter } from "../../types/ddb";
import type { ManualActionFormula } from "../../types/manualFormula";

const baseCharacter: DDBParsedCharacter = {
    id: 170484944,
    name: "Kazmalia",
    avatarUrl: "",
    level: 5,
    classes: [{ name: "Warlock", level: 5, subclass: "The Fiend" }],
    stats: { str: 10, dex: 14, con: 14, int: 10, wis: 10, cha: 18 },
    modifiers: { str: 0, dex: 2, con: 2, int: 0, wis: 0, cha: 4 },
    proficiencyBonus: 3,
    spellCastingAbility: "CHA",
    spellSaveDC: 15,
    spellSaveDCDisplay: "15",
    spellAttackBonus: 7,
    spellAttackBonusDisplay: "+7",
    spellSlots: {},
    spells: [],
    actions: [],
    senses: {} as DDBParsedCharacter["senses"],
    lastSynced: ""
};

const mockInvocationsFormula: ManualActionFormula = {
    id: "class_feature_eldritch_invocations",
    name: "Eldritch Invocations",
    kind: "class_feature",
    status: "verified",
    classes: ["Warlock"],
    activationType: "special",
    operations: [],
    options: [
        { id: "inv_agonizing_blast", name: "Agonizing Blast", description: "Add Charisma modifier to beam damage." },
        { id: "inv_armor_of_shadows", name: "Armor of Shadows", description: "Cast Mage Armor at will." },
        { id: "inv_devils_sight", name: "Devil's Sight", description: "See normally in darkness, both magical and nonmagical, to a distance of 120 feet." },
        { id: "inv_eldritch_mind", name: "Eldritch Mind", description: "Advantage on Constitution saving throws to maintain concentration." },
        { id: "inv_fiendish_vigor", name: "Fiendish Vigor", description: "Cast False Life at will." },
        { id: "inv_lessons_of_the_first_ones", name: "Lessons of the First Ones", description: "Gain an Origin feat of your choice." },
        { id: "inv_pact_of_the_blade", name: "Pact of the Blade", description: "Bond with a weapon." },
        { id: "inv_repelling_blast", name: "Repelling Blast", description: "Push targets 10 feet away." }
    ]
};

describe("resolveFeatureActionOptions", () => {
    it("filters Eldritch Invocations to only what the character selected on D&D Beyond", () => {
        const charWithOptions: DDBParsedCharacter = {
            ...baseCharacter,
            options: [
                { id: 1, name: "Agonizing Blast", source: "class" },
                { id: 2, name: "Devil's Sight", source: "class" },
                { id: 3, name: "Lessons of the First Ones", source: "class" }
            ]
        };

        const resolved = resolveFeatureActionOptions({
            feature: { name: "Eldritch Invocations" },
            formula: mockInvocationsFormula,
            character: charWithOptions
        });

        expect(resolved).toBeDefined();
        expect(resolved).toHaveLength(3);
        const names = resolved!.map(o => o.name);
        expect(names).toEqual(["Agonizing Blast", "Devil's Sight", "Lessons of the First Ones"]);
    });

    it("matches character options even if recorded in character.actions", () => {
        const charWithActions: DDBParsedCharacter = {
            ...baseCharacter,
            actions: [
                { id: "act_1", name: "Agonizing Blast", source: "class" },
                { id: "act_2", name: "Pact of the Blade: Bond", source: "class" }
            ]
        };

        const resolved = resolveFeatureActionOptions({
            feature: { name: "Eldritch Invocations" },
            formula: mockInvocationsFormula,
            character: charWithActions
        });

        expect(resolved).toBeDefined();
        expect(resolved).toHaveLength(2);
        const names = resolved!.map(o => o.name);
        expect(names).toEqual(["Agonizing Blast", "Pact of the Blade"]);
    });

    it("falls back to full catalog options when character has no choices recorded", () => {
        const resolved = resolveFeatureActionOptions({
            feature: { name: "Eldritch Invocations" },
            formula: mockInvocationsFormula,
            character: baseCharacter
        });

        expect(resolved).toBeDefined();
        expect(resolved).toHaveLength(8);
    });
});
