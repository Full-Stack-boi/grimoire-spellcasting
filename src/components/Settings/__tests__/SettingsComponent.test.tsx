import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockOwlbearState = vi.hoisted(() => ({ role: "GM" as "GM" | "PLAYER" }));

vi.mock("@owlbear-rodeo/sdk", () => ({
    default: {
        scene: { grid: { onChange: vi.fn(), getScale: vi.fn() } },
        broadcast: { onMessage: vi.fn() },
    },
}));

vi.mock("../../../platform/obr/react/providers", () => ({
    useOBR: () => ({
        ready: false,
        sceneReady: false,
        player: { role: mockOwlbearState.role },
    }),
}));

import Settings from "../SettingsComponent";

describe("Settings", () => {
    beforeEach(() => {
        mockOwlbearState.role = "GM";
    });

    it("opens Local settings by default and keeps GM categories collapsed", () => {
        const html = renderToStaticMarkup(<Settings />);

        expect(html).toContain('<details class="settings-card settings-accordion" open="">');
        expect(html.match(/<details class="settings-category">/g)).toHaveLength(4);
        expect(html).toContain("Room &amp; Player Settings");
        expect(html).toContain("Combat &amp; Damage");
    });

    it("provides long help through an accessible tooltip trigger", () => {
        const html = renderToStaticMarkup(<Settings />);

        expect(html).toContain('class="settings-row-label" tabindex="0"');
        expect(html).toContain('role="tooltip"');
        expect(html).toContain('aria-describedby="');
        expect(html).not.toContain("settings-help-trigger");
        expect(html).toContain("Useful if your grid size is not 5ft.");
    });

    it("does not render GM-only settings for players", () => {
        mockOwlbearState.role = "PLAYER";
        const html = renderToStaticMarkup(<Settings />);

        expect(html).not.toContain("GM Settings");
        expect(html).not.toContain("Players can cast spells");
        expect(html).toContain("JB2A animation preference");
    });
});
