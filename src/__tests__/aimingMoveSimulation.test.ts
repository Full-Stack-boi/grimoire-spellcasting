import { describe, it, expect } from "vitest";
import { findDdbSpellSafely, doesSpellRequireSight } from "../features/targeting/domain/darknessCombatRules";
import { getCachedDDBCharacter, cacheDDBCharacter } from "../services/ddbService";

describe("Aiming Overlay Simulation & Resilience", () => {
    it("safely finds spells even when list contains entries with missing or null names", () => {
        const spells = [
            { id: "spell-1", name: "Fire Bolt" },
            { id: "spell-2" }, // missing name!
            { id: "spell-3", name: undefined as any },
            { id: "spell-4", name: "Eldritch Blast" },
        ];

        // Should not throw TypeError
        expect(() => findDdbSpellSafely(spells, "eldritch_blast")).not.toThrow();
        expect(findDdbSpellSafely(spells, "Eldritch Blast")?.id).toBe("spell-4");
        expect(findDdbSpellSafely(spells, "fire bolt")?.id).toBe("spell-1");
        expect(findDdbSpellSafely(spells, "spell-2")?.id).toBe("spell-2");
        expect(findDdbSpellSafely(spells, "non_existent")).toBeUndefined();
        expect(findDdbSpellSafely(undefined, "fire bolt")).toBeUndefined();
    });

    it("verifies safe scene item position handling does not throw on missing position", () => {
        const sceneItems = [
            { id: "item-1", layer: "CHARACTER" }, // missing position
            { id: "item-2", layer: "CHARACTER", position: { x: 100, y: 100 } },
        ];
        const targetPos = { x: 100, y: 100 };

        const found = sceneItems.find(
            (item: any) =>
                item.position?.x != null &&
                item.position?.y != null &&
                Math.hypot(item.position.x - targetPos.x, item.position.y - targetPos.y) < 50
        );

        expect(found?.id).toBe("item-2");
    });

    it("verifies doesSpellRequireSight does not throw on various spell structures", () => {
        // Spell attack: Fire Bolt
        expect(doesSpellRequireSight({ id: "fire_bolt", name: "Fire Bolt" })).toBe(false);
        // Sight required: Magic Missile
        expect(doesSpellRequireSight({ id: "magic_missile", name: "Magic Missile" })).toBe(true);
        // Hold Person
        expect(doesSpellRequireSight({ id: "hold_person", name: "Hold Person" })).toBe(true);
        // Custom spell with null effectNotes
        expect(() => doesSpellRequireSight({
            id: "custom_spell",
            name: "Custom",
            spellFormula: { effectNotes: undefined } as any
        })).not.toThrow();
    });

    it("verifies getCachedDDBCharacter can be called safely with character id", () => {
        const storage = new Map<string, string>();
        const originalLocalStorage = (globalThis as any).localStorage;
        (globalThis as any).localStorage = {
            getItem: (key: string) => storage.get(key) ?? null,
            setItem: (key: string, val: string) => storage.set(key, val),
            removeItem: (key: string) => storage.delete(key),
            clear: () => storage.clear(),
        };

        try {
            const mockChar = {
                id: 99999,
                name: "Astarion",
                spells: [{ id: "fire_bolt", name: "Fire Bolt" }]
            };
            cacheDDBCharacter(mockChar as any);
            const retrieved = getCachedDDBCharacter(99999);
            expect(retrieved?.name).toBe("Astarion");
        } finally {
            (globalThis as any).localStorage = originalLocalStorage;
        }
    });
});
