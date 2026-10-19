import { describe, it, expect } from "vitest";
import { registerDynamicSpell, getSpellMetadata, SpellMetadata } from "../spellInfo";

describe("spellInfo Character-Scoped Registry", () => {
    it("isolates spells of different characters having the same spell ID", () => {
        const clericSpell: SpellMetadata = {
            id: "custom_bless",
            name: "Bless (Cleric)",
            level: 1,
            school: "Enchantment",
            castingTime: "1 Action",
            range: "30 ft",
            duration: "1 minute",
            components: "V, S, M",
            damage: "1d4 Buff",
            saveOrAttack: "None",
            description: "Blesses allies.",
            concentration: true,
            ritual: false
        };

        const paladinSpell: SpellMetadata = {
            id: "custom_bless",
            name: "Bless (Paladin)",
            level: 1,
            school: "Enchantment",
            castingTime: "1 Action",
            range: "30 ft",
            duration: "1 minute",
            components: "V, S, M",
            damage: "1d4 Radiant Buff",
            saveOrAttack: "None",
            description: "Blesses allies with radiant vigor.",
            concentration: true,
            ritual: false
        };

        // Register for character 101 (Cleric) and character 202 (Paladin)
        registerDynamicSpell(clericSpell, 101);
        registerDynamicSpell(paladinSpell, 202);

        // Fetching with owner ID 101 returns Cleric version
        const resultCleric = getSpellMetadata("custom_bless", undefined, 101);
        expect(resultCleric.name).toBe("Bless (Cleric)");
        expect(resultCleric.damage).toBe("1d4 Buff");

        // Fetching with owner ID 202 returns Paladin version
        const resultPaladin = getSpellMetadata("custom_bless", undefined, 202);
        expect(resultPaladin.name).toBe("Bless (Paladin)");
        expect(resultPaladin.damage).toBe("1d4 Radiant Buff");

        // Overload flexibility: passing owner ID as 2nd argument
        const resultOverload = getSpellMetadata("custom_bless", 101);
        expect(resultOverload.name).toBe("Bless (Cleric)");
    });

    it("dynamically populates SPELL_INFO_MAP from ALL_MANUAL_OVERRIDES (570+ spells)", async () => {
        const { SPELL_INFO_MAP } = await import("../spellInfo");
        const keys = Object.keys(SPELL_INFO_MAP);
        expect(keys.length).toBeGreaterThan(500);

        expect(SPELL_INFO_MAP["fireball"]).toBeDefined();
        expect(SPELL_INFO_MAP["cure_wounds"]).toBeDefined();
        expect(SPELL_INFO_MAP["revivify"]).toBeDefined();
        expect(SPELL_INFO_MAP["aid"]).toBeDefined();
    });

    it("assigns damageType: 'Healing' and saveOrAttack: 'None (Healing)' to healing spells", () => {
        const cureWounds = getSpellMetadata("cure_wounds");
        expect(cureWounds.damageType).toBe("Healing");
        expect(cureWounds.saveOrAttack).toBe("None (Healing)");
        expect(cureWounds.damage).toContain("2d8");

        const healingWord = getSpellMetadata("healing_word");
        expect(healingWord.damageType).toBe("Healing");
        expect(healingWord.damage).toContain("2d4");

        const massCure = getSpellMetadata("mass_cure_wounds");
        expect(massCure.damageType).toBe("Healing");
    });

    it("correctly upcasts Cure Wounds using 2024 mechanics (2d8 base, +2d8 per level)", async () => {
        const { getScaledSpellStats } = await import("../spellInfo");
        const scaledLevel2 = getScaledSpellStats("cure_wounds", 2);
        expect(scaledLevel2.damage).toBe("4d8 + Spellcasting Mod HP");

        const scaledLevel3 = getScaledSpellStats("cure_wounds", 3);
        expect(scaledLevel3.damage).toBe("6d8 + Spellcasting Mod HP");
    });
});
