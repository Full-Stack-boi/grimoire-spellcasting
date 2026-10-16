import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSpellResourceHandlers } from "../useSpellResourceHandlers";

vi.mock("@owlbear-rodeo/sdk", () => ({
    default: {
        notification: {
            show: vi.fn(),
        },
    },
}));

vi.mock("../../../../services/combatStateService", () => ({
    resetCombatState: vi.fn(async () => {}),
}));

vi.mock("../../../../features/characterFeatures/domain/characterFeatureCatalog", () => ({
    getCharacterFeatures: vi.fn(() => [
        {
            id: "feat-action-surge",
            name: "Action Surge",
            source: "class",
            limitedUse: { max: 1, used: 1, resetType: "Short Rest" },
        },
        {
            id: "feat-second-wind",
            name: "Second Wind",
            source: "class",
            limitedUse: { max: 2, used: 1, resetType: "Short or Long Rest" },
        },
        {
            id: "feat-indomitable",
            name: "Indomitable",
            source: "class",
            limitedUse: { max: 1, used: 1, resetType: "Long Rest" },
        },
    ]),
}));

describe("useSpellResourceHandlers rest actions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockCharacter = {
        id: 777,
        name: "Fighter / Warlock",
        classes: [{ name: "Fighter", level: 5 }, { name: "Warlock", level: 3 }],
        pactMagic: { level: 2, max: 2 },
    } as any;

    it("handleShortRest resets actions, concentration, pact slots, and short rest features but retains long rest resources", () => {
        const setActionUsed = vi.fn();
        const setBonusActionUsed = vi.fn();
        const setConcentrationSpell = vi.fn();
        let pactSlots = { max: 2, used: 2 };
        const setPactSlots = vi.fn((updater) => {
            pactSlots = typeof updater === "function" ? updater(pactSlots) : updater;
        });
        const spellSlots = { 1: { max: 4, used: 3 } };
        const setSpellSlots = vi.fn();
        let featureUses = {
            "feat-action-surge": 1,
            "feat-second-wind": 1,
            "feat-indomitable": 1,
        };
        const setFeatureUses = vi.fn((updater) => {
            featureUses = typeof updater === "function" ? updater(featureUses) : updater;
        });

        const handlers = useSpellResourceHandlers({
            character: mockCharacter,
            drawerItem: null,
            featureUses,
            setFeatureUses,
            spellSlots,
            setSpellSlots,
            pactSlots,
            setPactSlots,
            createdSpellSlots: {},
            setCreatedSpellSlots: vi.fn(),
            setActionUsed,
            setBonusActionUsed,
            setConcentrationSpell,
            setDeathSaves: vi.fn(),
            setHitDiceUsed: vi.fn(),
            setExhaustionLevel: vi.fn(),
        });

        handlers.handleShortRest();

        expect(setActionUsed).toHaveBeenCalledWith(false);
        expect(setBonusActionUsed).toHaveBeenCalledWith(false);
        expect(setConcentrationSpell).toHaveBeenCalledWith(null);
        // Pact slots restored
        expect(pactSlots.used).toBe(0);
        // Regular spell slots untouched
        expect(setSpellSlots).not.toHaveBeenCalled();
        // Short rest features cleared (Action Surge & Second Wind), Long Rest feature preserved (Indomitable)
        expect(featureUses["feat-action-surge"]).toBeUndefined();
        expect(featureUses["feat-second-wind"]).toBeUndefined();
        expect(featureUses["feat-indomitable"]).toBe(1);
    });

    it("handleShortRest automatically opens Hit Dice drawer and regains 1 expended use of Second Wind", () => {
        const setDrawerItem = vi.fn();
        let featureUses = {
            "feat-second-wind": 3,
        };
        const setFeatureUses = vi.fn((updater) => {
            featureUses = typeof updater === "function" ? updater(featureUses) : updater;
        });

        const charWithHp = {
            ...mockCharacter,
            hp: { current: 18, max: 44, temp: 0 },
        };

        const handlers = useSpellResourceHandlers({
            character: charWithHp,
            drawerItem: null,
            setDrawerItem,
            currentHp: 18,
            maxHp: 44,
            tempHp: 0,
            featureUses,
            setFeatureUses,
            spellSlots: {},
            setSpellSlots: vi.fn(),
            pactSlots: { max: 0, used: 0 },
            setPactSlots: vi.fn(),
            createdSpellSlots: {},
            setCreatedSpellSlots: vi.fn(),
            setActionUsed: vi.fn(),
            setBonusActionUsed: vi.fn(),
            setConcentrationSpell: vi.fn(),
            setDeathSaves: vi.fn(),
            setHitDiceUsed: vi.fn(),
            setExhaustionLevel: vi.fn(),
        });

        handlers.handleShortRest();

        // Second wind regains 1 use (3 used -> 2 used)
        expect(featureUses["feat-second-wind"]).toBe(2);

        // Auto-prompts Hit Dice drawer
        expect(setDrawerItem).toHaveBeenCalledWith({
            type: "hp",
            current: 18,
            max: 44,
            temp: 0,
        });
    });

    it("handleLongRest resets all spell slots, hit dice, actions, and calls onResetHpToMax", () => {
        const setActionUsed = vi.fn();
        const setBonusActionUsed = vi.fn();
        const setConcentrationSpell = vi.fn();
        const setSpellSlots = vi.fn();
        const setPactSlots = vi.fn();
        const setFeatureUses = vi.fn();
        const setHitDiceUsed = vi.fn();
        const onResetHpToMax = vi.fn();

        const handlers = useSpellResourceHandlers({
            character: mockCharacter,
            drawerItem: null,
            featureUses: { "feat-indomitable": 1 },
            setFeatureUses,
            spellSlots: { 1: { max: 4, used: 4 } },
            setSpellSlots,
            pactSlots: { max: 2, used: 2 },
            setPactSlots,
            createdSpellSlots: {},
            setCreatedSpellSlots: vi.fn(),
            setActionUsed,
            setBonusActionUsed,
            setConcentrationSpell,
            setDeathSaves: vi.fn(),
            setHitDiceUsed,
            setExhaustionLevel: vi.fn(),
            onResetHpToMax,
        });

        handlers.handleLongRest();

        expect(setActionUsed).toHaveBeenCalledWith(false);
        expect(setBonusActionUsed).toHaveBeenCalledWith(false);
        expect(setConcentrationSpell).toHaveBeenCalledWith(null);
        expect(setFeatureUses).toHaveBeenCalledWith({});
        expect(setHitDiceUsed).toHaveBeenCalledWith({});
        expect(onResetHpToMax).toHaveBeenCalledTimes(1);
    });
});
