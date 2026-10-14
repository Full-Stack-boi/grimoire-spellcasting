import { describe, expect, it, vi } from "vitest";
import type { EffectInstruction } from "../../types/messageListener";

vi.mock("@owlbear-rodeo/sdk", () => ({
    default: { room: { id: "test-room" } },
}));

import { applyAnimationEffectChoice, applyAnimationEffectMap } from "../spells";

describe("applyAnimationEffectChoice", () => {
    it("replaces compatible effect IDs in the resolved instructions", () => {
        const instructions: EffectInstruction[] = [
            { type: "effect", id: "fire_bolt" },
            { type: "effect", id: "fire_bolt" },
        ];

        expect(applyAnimationEffectChoice(instructions, "ray_of_frost")).toBe(true);
        expect(instructions.map((instruction) => instruction.id)).toEqual([
            "ray_of_frost",
            "ray_of_frost",
        ]);
    });

    it("does not replace an instruction with a different effect geometry", () => {
        const instructions: EffectInstruction[] = [{ type: "effect", id: "fire_bolt" }];

        expect(applyAnimationEffectChoice(instructions, "cure_wounds")).toBe(false);
        expect(instructions[0].id).toBe("fire_bolt");
    });

    it("rejects animation IDs missing from the effect catalog", () => {
        const instructions: EffectInstruction[] = [{ type: "effect", id: "fire_bolt" }];

        expect(applyAnimationEffectChoice(instructions, "not_an_effect")).toBe(false);
        expect(instructions[0].id).toBe("fire_bolt");
    });

    it("keeps caster and target animation choices separate", () => {
        const instructions: EffectInstruction[] = [
            { type: "effect", id: "divine_smite.caster" },
            { type: "effect", id: "divine_smite.target" },
        ];

        expect(applyAnimationEffectMap(instructions, {
            "divine_smite.caster": "divine_smite.target",
            "divine_smite.target": "divine_smite.caster",
        })).toBe(true);
        expect(instructions.map((instruction) => instruction.id)).toEqual([
            "divine_smite.target",
            "divine_smite.caster",
        ]);
    });

    it("does not partially apply a multistage choice when a stage is incompatible", () => {
        const instructions: EffectInstruction[] = [
            { type: "effect", id: "divine_smite.caster" },
            { type: "effect", id: "divine_smite.target" },
        ];

        expect(applyAnimationEffectMap(instructions, {
            "divine_smite.caster": "fire_bolt",
            "divine_smite.target": "divine_smite.caster",
        })).toBe(false);
        expect(instructions.map((instruction) => instruction.id)).toEqual([
            "divine_smite.caster",
            "divine_smite.target",
        ]);
    });
});
