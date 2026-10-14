import { beforeEach, describe, expect, it, vi } from "vitest";

const mockRoom = vi.hoisted(() => ({ metadata: {} as Record<string, unknown> }));
const localStore = new Map<string, string>();

vi.mock("@owlbear-rodeo/sdk", () => ({
    default: {
        scene: {
            getMetadata: vi.fn(async () => mockRoom.metadata),
            setMetadata: vi.fn(async (metadata: Record<string, unknown>) => {
                Object.assign(mockRoom.metadata, metadata);
            }),
        },
    },
}));

vi.stubGlobal("localStorage", {
    getItem: (key: string) => localStore.get(key) ?? null,
    setItem: (key: string, value: string) => localStore.set(key, value),
    removeItem: (key: string) => localStore.delete(key),
    clear: () => localStore.clear(),
    key: (index: number) => Array.from(localStore.keys())[index] ?? null,
    get length() { return localStore.size; },
});

const {
    consumeOneShotAnimationChoice,
    getResolvedAnimationChoice,
    GLOBAL_STORAGE_KEYS,
    LOCAL_STORAGE_KEYS,
    saveOneShotAnimationChoice,
    savePersonalAnimationAssignments,
    setGlobalSettingsValue,
    setSettingsValue,
    spellAnimationActionKey,
} = await import("../settings");
const { APP_KEY } = await import("../../../config");

describe("animation preference resolution", () => {
    beforeEach(() => {
        localStore.clear();
        mockRoom.metadata = {};
    });

    it("resolves one-use, personal, room, then fallback settings in order", async () => {
        const actionKey = spellAnimationActionKey("Healing Word");
        const roomChoice = { kind: "effect" as const, id: "cure_wounds" };
        const personalChoice = { kind: "effect" as const, id: "healing_word" };
        const oneShotChoice = { kind: "effect" as const, id: "sacred_flame" };
        await setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.ANIMATION_MAPPINGS, {
            [actionKey]: roomChoice,
        });
        savePersonalAnimationAssignments({ [actionKey]: personalChoice });
        expect(await getResolvedAnimationChoice(actionKey)).toEqual({
            choice: personalChoice,
            source: "personal",
        });

        saveOneShotAnimationChoice(actionKey, oneShotChoice);
        expect(await getResolvedAnimationChoice(actionKey)).toEqual({
            choice: oneShotChoice,
            source: "one-shot",
        });
        consumeOneShotAnimationChoice(actionKey);
        expect(await getResolvedAnimationChoice(actionKey)).toEqual({
            choice: personalChoice,
            source: "personal",
        });

        savePersonalAnimationAssignments({});
        expect(await getResolvedAnimationChoice(actionKey)).toEqual({
            choice: roomChoice,
            source: "room",
        });
        expect(await getResolvedAnimationChoice("spell:unmapped")).toBeUndefined();
    });

    it("keeps room and personal mappings in their respective stores", async () => {
        const actionKey = spellAnimationActionKey("fireball");
        setSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_MAPPINGS, {
            [actionKey]: { kind: "effect", id: "fire_bolt" },
        });
        await setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.ANIMATION_MAPPINGS, {
            "spell:healing_word": { kind: "effect", id: "cure_wounds" },
        });

        expect(localStore.get(`${APP_KEY}/settings`)).toContain("fireball");
        expect(mockRoom.metadata[`${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.ANIMATION_MAPPINGS}`])
            .toEqual({ "spell:healing_word": { kind: "effect", id: "cure_wounds" } });
    });

    it("persists and resolves per-stage spell animation choices", async () => {
        const actionKey = spellAnimationActionKey("divine_smite");
        const choice = {
            kind: "effect-map" as const,
            effects: {
                "divine_smite.caster": "divine_smite.caster",
                "divine_smite.target": "divine_smite.target",
            },
        };
        saveOneShotAnimationChoice(actionKey, choice);

        expect(await getResolvedAnimationChoice(actionKey)).toEqual({
            choice,
            source: "one-shot",
        });
    });

    it("normalizes spell action keys consistently", () => {
        expect(spellAnimationActionKey("Healing Word")).toBe("spell:healing_word");
        expect(spellAnimationActionKey("Misty-Step!")).toBe("spell:misty_step");
    });
});
