import { describe, it, expect, vi } from "vitest";

vi.mock("react", () => ({
    useMemo: (fn: () => unknown) => fn(),
}));

import { useCharacterTabData } from "../useCharacterTabData";
import type { DockSpell } from "../../domain/types";

describe("useCharacterTabData", () => {
    const dummySpells: DockSpell[] = [
        {
            id: "fire_bolt",
            name: "Fire Bolt",
            level: 0,
            school: "Evocation",
            castingTime: "1 Action",
            rangeText: "120 ft.",
            isPrepared: true,
            fromChar: true,
        },
        {
            id: "magic_missile",
            name: "Magic Missile",
            level: 1,
            school: "Evocation",
            castingTime: "1 Action",
            rangeText: "120 ft.",
            isPrepared: true,
            fromChar: true,
        },
        {
            id: "misty_step",
            name: "Misty Step",
            level: 2,
            school: "Conjuration",
            castingTime: "1 Bonus Action",
            rangeText: "Self",
            isPrepared: true,
            fromChar: true,
        },
        {
            id: "hunger_of_hadar",
            name: "Hunger of Hadar",
            level: 3,
            school: "Conjuration",
            castingTime: "1 Action",
            rangeText: "150 ft.",
            isPrepared: true,
            fromChar: true,
        },
    ];

    it("returns no spells under PACT filter when pactMagicLevel is undefined (non-Warlock)", () => {
        const result = useCharacterTabData({
            spells: dummySpells,
            spellsFilter: "PACT",
            spellSearch: "",
            pactMagicLevel: undefined,
            features: [],
            featuresFilter: "ALL",
            inventory: [],
            inventoryFilter: "ALL",
            inventorySearch: "",
            strength: 10,
        });

        // Previously, undefined pactMagicLevel fell back to level 2, mistakenly returning level-2 spells (like Misty Step)
        expect(result.spellGroups).toEqual([]);
    });

    it("returns only matching pact-level spells when pactMagicLevel is specified", () => {
        const result = useCharacterTabData({
            spells: dummySpells,
            spellsFilter: "PACT",
            spellSearch: "",
            pactMagicLevel: 3,
            features: [],
            featuresFilter: "ALL",
            inventory: [],
            inventoryFilter: "ALL",
            inventorySearch: "",
            strength: 10,
        });

        expect(result.spellGroups).toHaveLength(1);
        expect(result.spellGroups[0].level).toBe(3);
        expect(result.spellGroups[0].spells.map(s => s.name)).toEqual(["Hunger of Hadar"]);
    });

    it("returns all spells under ALL filter regardless of pactMagicLevel", () => {
        const result = useCharacterTabData({
            spells: dummySpells,
            spellsFilter: "ALL",
            spellSearch: "",
            pactMagicLevel: undefined,
            features: [],
            featuresFilter: "ALL",
            inventory: [],
            inventoryFilter: "ALL",
            inventorySearch: "",
            strength: 10,
        });

        const totalSpells = result.spellGroups.reduce((acc, g) => acc + g.spells.length, 0);
        expect(totalSpells).toBe(4);
    });

    it("returns ONLY special and innate spells under SPECIAL filter without duplicates or cantrips", () => {
        const testSpells: DockSpell[] = [
            ...dummySpells,
            {
                id: "false_life",
                name: "False Life",
                level: 1,
                school: "Necromancy",
                castingTime: "1 Action",
                rangeText: "Self",
                isPrepared: true,
                fromChar: true,
                hasFreeCast: true,
                freeCast: { max: 1, used: 0, resetType: "Long Rest" },
                canCastWithSlot: true,
            },
            {
                id: "ray_of_enfeeblement",
                name: "Ray of Enfeeblement",
                level: 2,
                school: "Necromancy",
                castingTime: "1 Action",
                rangeText: "60 ft.",
                isPrepared: true,
                fromChar: true,
                hasFreeCast: true,
                freeCast: { max: 1, used: 0, resetType: "Long Rest" },
                canCastWithSlot: true,
            },
        ];

        const result = useCharacterTabData({
            spells: testSpells,
            spellsFilter: "SPECIAL",
            spellSearch: "",
            pactMagicLevel: 2,
            features: [],
            featuresFilter: "ALL",
            inventory: [],
            inventoryFilter: "ALL",
            inventorySearch: "",
            strength: 10,
        });

        // Must ONLY return SPECIAL & INNATE SPELLS group (no CANTRIP, no 1ST LEVEL, no 2ND LEVEL)
        expect(result.spellGroups).toHaveLength(1);
        expect(result.spellGroups[0].label).toBe("SPECIAL & INNATE SPELLS");
        expect(result.spellGroups[0].spells.map(s => s.name)).toEqual(["False Life", "Ray of Enfeeblement"]);
    });
});
