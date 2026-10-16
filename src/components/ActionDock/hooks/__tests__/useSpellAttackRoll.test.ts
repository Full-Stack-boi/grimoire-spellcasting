import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSpellAttackRoll } from "../useSpellAttackRoll";

vi.mock("@owlbear-rodeo/sdk", () => ({
    default: {
        notification: {
            show: vi.fn(),
        },
        player: {
            getSelection: vi.fn(async () => ["target-token-1"]),
        },
        scene: {
            items: {
                getItems: vi.fn(async (ids?: string[]) => {
                    if (ids && ids.length) {
                        return [{ id: ids[0], name: "Goblin", position: { x: 100, y: 100 } }];
                    }
                    return [
                        { id: "caster-1", name: "Gale", position: { x: 0, y: 0 } },
                        { id: "target-token-1", name: "Goblin", position: { x: 100, y: 100 } },
                    ];
                }),
            },
            grid: {
                getDpi: vi.fn(async () => 150),
                getScale: vi.fn(async () => ({ parsed: { multiplier: 5 } })),
            },
        },
    },
}));

vi.mock("../../../../services/rollLogService", () => ({
    broadcastDDBRoll: vi.fn(),
}));

vi.mock("../../../../services/conditionalTriggerService", () => ({
    checkAndFireActionTriggers: vi.fn(async () => {}),
}));

vi.mock("../../../../features/combat/tokenVitalsService", () => ({
    applyDamage: vi.fn(async (_id: string, damage: number) => ({
        effectiveDamage: damage,
        defenseNote: undefined,
    })),
    applyRayOfFrostSpeedReduction: vi.fn(async () => ({
        speedFeet: 20,
        conditions: [],
        exhaustionLevel: 0,
        effects: [],
    })),
    getTokenVitals: vi.fn(async () => ({
        armorClass: 12,
        conditions: [],
        hideNumbers: false,
    })),
}));

vi.mock("../../../../features/combat/damageModeService", () => ({
    getDamageApplicationMode: vi.fn(async () => "auto"),
}));

vi.mock("../../../../features/combat/initiativeService", () => ({
    getActiveEncounter: vi.fn(async () => null),
}));

import { broadcastDDBRoll } from "../../../../services/rollLogService";

describe("useSpellAttackRoll hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockCharacter = {
        id: "char-1",
        name: "Gale",
        level: 3,
        spellAttackBonus: 5,
        spells: [
            {
                id: "fire_bolt",
                name: "Fire Bolt",
                level: 0,
                damage: "1d10",
                damageType: "Fire",
                saveOrAttack: "Ranged",
            },
            {
                id: "sorcerous_burst",
                name: "Sorcerous Burst",
                level: 0,
                damage: "1d8",
                damageType: "Fire",
                saveOrAttack: "Ranged",
            },
            {
                id: "eldritch_blast",
                name: "Eldritch Blast",
                level: 0,
                damage: "1d10",
                damageType: "Force",
                saveOrAttack: "Ranged",
            },
        ],
    } as any;

    it("emits both TO HIT and DAMAGE cards when a single-beam spell hits", async () => {
        vi.spyOn(Math, "random").mockReturnValue(0.75); // d20 rolls 16, hitting AC 12 easily
        const onSelectSpell = vi.fn();
        const rollSpell = useSpellAttackRoll({
            casterId: "caster-1",
            character: mockCharacter,
            hasSpellAdvantage: false,
            conditions: [],
            exhaustionLevel: 0,
            concentrationSpell: null,
            selectedHexAbility: "",
            onSelectSpell,
        });

        await rollSpell({
            id: "fire_bolt",
            name: "Fire Bolt",
            hitOrDc: "+5",
        });

        expect(broadcastDDBRoll).toHaveBeenCalledTimes(1);
        const cards = vi.mocked(broadcastDDBRoll).mock.calls[0][0];
        expect(cards.length).toBeGreaterThanOrEqual(1);

        const attackCard = cards.find(c => c.actionType === "TO HIT");
        expect(attackCard).toBeDefined();
        expect(attackCard?.actionName).toBe("FIRE BOLT");

        const damageCard = cards.find(c => c.actionType === "DAMAGE");
        expect(damageCard).toBeDefined();
        expect(damageCard?.actionName).toBe("FIRE BOLT");
        expect(damageCard?.damageType).toBe("Fire");
        expect(damageCard?.total).toBeGreaterThanOrEqual(1);

        // Verify NO emojis anywhere in the cards
        const allCardText = JSON.stringify(cards);
        expect(allCardText).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u);
    });

    it("emits DAMAGE card for Sorcerous Burst single-beam attack", async () => {
        vi.spyOn(Math, "random").mockReturnValue(0.75); // d20 rolls 16, hitting AC 12 easily
        const onSelectSpell = vi.fn();
        const rollSpell = useSpellAttackRoll({
            casterId: "caster-1",
            character: mockCharacter,
            hasSpellAdvantage: false,
            conditions: [],
            exhaustionLevel: 0,
            concentrationSpell: null,
            selectedHexAbility: "",
            onSelectSpell,
        });

        await rollSpell({
            id: "sorcerous_burst",
            name: "Sorcerous Burst",
            hitOrDc: "+5",
        });

        expect(broadcastDDBRoll).toHaveBeenCalledTimes(1);
        const cards = vi.mocked(broadcastDDBRoll).mock.calls[0][0];
        const attackCard = cards.find(c => c.actionType === "TO HIT");
        expect(attackCard).toBeDefined();
        expect(attackCard?.actionName).toBe("SORCEROUS BURST");

        const damageCard = cards.find(c => c.actionType === "DAMAGE");
        expect(damageCard).toBeDefined();
        expect(damageCard?.damageType).toBe("Fire");
        expect(damageCard?.formula).toContain("1d8 Fire");
    });

    it("emits grouped multi-beam card for Eldritch Blast at higher levels (level 5+)", async () => {
        const highLevelChar = {
            ...mockCharacter,
            level: 5,
        };
        const onSelectSpell = vi.fn();
        const rollSpell = useSpellAttackRoll({
            casterId: "caster-1",
            character: highLevelChar,
            hasSpellAdvantage: false,
            conditions: [],
            exhaustionLevel: 0,
            concentrationSpell: null,
            selectedHexAbility: "",
            onSelectSpell,
        });

        await rollSpell({
            id: "eldritch_blast",
            name: "Eldritch Blast",
            hitOrDc: "+5",
        });

        expect(broadcastDDBRoll).toHaveBeenCalledTimes(1);
        const cards = vi.mocked(broadcastDDBRoll).mock.calls[0][0];
        expect(cards.length).toBe(1);
        const multiCard = cards[0];
        expect(multiCard.actionType).toBe("SPELL");
        expect(multiCard.subRolls).toBeDefined();
        expect(multiCard.subRolls?.length).toBe(2);
    });
});
