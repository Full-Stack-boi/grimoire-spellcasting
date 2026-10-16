import { describe, it, expect, vi, beforeEach } from "vitest";
import { useHitPoints } from "../useHitPoints";

vi.mock("@owlbear-rodeo/sdk", () => ({
    default: {
        notification: {
            show: vi.fn(),
        },
    },
}));

vi.mock("../../../../features/combat/tokenVitalsService", () => ({
    setTokenVitals: vi.fn(async () => ({})),
}));

import { setTokenVitals } from "../../../../features/combat/tokenVitalsService";

describe("useHitPoints hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockCharacter = {
        id: 12345,
        name: "Karlach",
        hp: { current: 30, max: 35, temp: 0 },
        modifiers: { con: 3 },
    } as any;

    it("initializes with character stats when customHp is null", () => {
        const customHp = null;
        const setCustomHp = vi.fn();
        const setDeathSaves = vi.fn();

        const hpHook = useHitPoints({
            customHp,
            setCustomHp,
            character: mockCharacter,
            concentrationSpell: null,
            deathSaves: { successes: 0, failures: 0 },
            setDeathSaves,
            casterId: "tok-1",
        });

        expect(hpHook.currentHp).toBe(30);
        expect(hpHook.maxHp).toBe(35);
        expect(hpHook.tempHp).toBe(0);
    });

    it("heals and updates customHp, clearing death saves when reviving from 0", () => {
        let state = { current: 0, max: 35, temp: 0 };
        const setCustomHp = vi.fn((updater) => {
            state = updater(state);
        });
        const setDeathSaves = vi.fn();

        const hpHook = useHitPoints({
            customHp: state,
            setCustomHp,
            character: mockCharacter,
            concentrationSpell: null,
            deathSaves: { successes: 1, failures: 2 },
            setDeathSaves,
            casterId: "tok-1",
        });

        hpHook.heal(10);
        expect(state.current).toBe(10);
        expect(setDeathSaves).toHaveBeenCalledWith({ successes: 0, failures: 0 });
        expect(setTokenVitals).toHaveBeenCalledWith("tok-1", { hpCurrent: 10, hpMax: 35, hpTemp: 0 });
    });

    it("takes damage absorbing through temp HP first", () => {
        let state = { current: 25, max: 35, temp: 8 };
        const setCustomHp = vi.fn((updater) => {
            state = updater(state);
        });
        const setDeathSaves = vi.fn();

        const hpHook = useHitPoints({
            customHp: state,
            setCustomHp,
            character: mockCharacter,
            concentrationSpell: null,
            deathSaves: { successes: 0, failures: 0 },
            setDeathSaves,
            casterId: "tok-1",
        });

        hpHook.takeDamage(10);
        // 8 absorbed by temp, 2 from current
        expect(state.temp).toBe(0);
        expect(state.current).toBe(23);
        expect(setTokenVitals).toHaveBeenCalledWith("tok-1", { hpCurrent: 23, hpMax: 35, hpTemp: 0 });
    });

    it("setDirectHp clamps value between 0 and max and syncs token vitals", () => {
        let state = { current: 20, max: 40, temp: 0 };
        const setCustomHp = vi.fn((updater) => {
            state = updater(state);
        });
        const setDeathSaves = vi.fn();

        const hpHook = useHitPoints({
            customHp: state,
            setCustomHp,
            character: mockCharacter,
            concentrationSpell: null,
            deathSaves: { successes: 0, failures: 0 },
            setDeathSaves,
            casterId: "tok-karlach",
        });

        // Test normal direct setting
        hpHook.setDirectHp(35);
        expect(state.current).toBe(35);
        expect(setTokenVitals).toHaveBeenCalledWith("tok-karlach", { hpCurrent: 35, hpMax: 40, hpTemp: 0 });

        // Test over max clamping
        hpHook.setDirectHp(999);
        expect(state.current).toBe(40);

        // Test negative clamping
        hpHook.setDirectHp(-10);
        expect(state.current).toBe(0);
    });

    it("setDirectMaxHp sets max HP and clamps current if exceeds new max", () => {
        let state = { current: 35, max: 40, temp: 0 };
        const setCustomHp = vi.fn((updater) => {
            state = updater(state);
        });
        const setDeathSaves = vi.fn();

        const hpHook = useHitPoints({
            customHp: state,
            setCustomHp,
            character: mockCharacter,
            concentrationSpell: null,
            deathSaves: { successes: 0, failures: 0 },
            setDeathSaves,
            casterId: "tok-karlach",
        });

        // DM reduces max HP to 25 due to a story curse
        hpHook.setDirectMaxHp(25);
        expect(state.max).toBe(25);
        expect(state.current).toBe(25);
        expect(setTokenVitals).toHaveBeenCalledWith("tok-karlach", { hpCurrent: 25, hpMax: 25, hpTemp: 0 });
    });

    it("setDirectTempHp sets temporary hit points", () => {
        let state = { current: 30, max: 35, temp: 0 };
        const setCustomHp = vi.fn((updater) => {
            state = updater(state);
        });
        const setDeathSaves = vi.fn();

        const hpHook = useHitPoints({
            customHp: state,
            setCustomHp,
            character: mockCharacter,
            concentrationSpell: null,
            deathSaves: { successes: 0, failures: 0 },
            setDeathSaves,
            casterId: "tok-1",
        });

        hpHook.setDirectTempHp(12);
        expect(state.temp).toBe(12);
        expect(setTokenVitals).toHaveBeenCalledWith("tok-1", { hpCurrent: 30, hpMax: 35, hpTemp: 12 });
    });
});
