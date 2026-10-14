import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockPlayer = vi.hoisted(() => ({ role: "PLAYER" as "GM" | "PLAYER" }));
vi.mock("@owlbear-rodeo/sdk", () => ({
    default: {
        scene: { onMetadataChange: vi.fn(() => () => {}) },
        notification: { show: vi.fn() },
    },
}));

vi.mock("../../../platform/obr/react/providers", () => ({
    useOBR: () => ({
        ready: false,
        sceneReady: false,
        player: { role: mockPlayer.role, metadata: {} },
    }),
}));

import AnimationsTab from "../AnimationsTab";
import { getSpellAnimationSlots } from "../animationSlots";

describe("AnimationsTab", () => {
    beforeEach(() => {
        mockPlayer.role = "PLAYER";
    });

    it("provides spell, weapon, preview, and application-scope controls in the sidebar tab", () => {
        const html = renderToStaticMarkup(<AnimationsTab />);

        expect(html).toContain("<h1>Animations</h1>");
        expect(html).toContain('aria-label="Animation category"');
        expect(html).toContain('aria-label="Spell"');
        expect(html).toContain('aria-label="Animation preview"');
        expect(html).toContain("Search this spell in the JB2A library");
        expect(html).toContain("https://library.jb2a.com/#Healing%20Word");
        expect(html).toContain("My default · future uses");
        expect(html).toContain("Next matching use only");
        expect(html).toContain("Currently selected Action Bar item");
        expect(html).not.toContain("Room default · everyone");
    });

    it("offers shared room defaults only to the GM", () => {
        mockPlayer.role = "GM";
        const html = renderToStaticMarkup(<AnimationsTab />);

        expect(html).toContain("Room default · everyone");
    });

    it("identifies Divine Smite's separate caster and target effects", () => {
        expect(getSpellAnimationSlots("divine_smite").map(({ sourceId, label }) => ({ sourceId, label })))
            .toEqual([
                { sourceId: "divine_smite.caster", label: "Caster" },
                { sourceId: "divine_smite.target", label: "Target" },
            ]);
    });
});
