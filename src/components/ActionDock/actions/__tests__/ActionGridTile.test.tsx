import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect, vi } from "vitest";
import { ActionGridTile, ActionGridTooltipProvider } from "../ActionGridTile";

describe("ActionGridTile & ActionGridTooltipProvider", () => {
    it("renders tile with proper labels, class names, and shortcut", () => {
        const html = renderToStaticMarkup(
            <ActionGridTooltipProvider>
                <ActionGridTile
                    name="Hex"
                    category="Spell"
                    subtitle="1st Level Enchantment"
                    description="You place a curse on a creature."
                    details={["1 Bonus Action", "90 ft", "1d6 Necrotic"]}
                    icon={<span>M</span>}
                    accent="#ff66cc"
                    shortcut={26}
                    onActivate={vi.fn()}
                />
            </ActionGridTooltipProvider>
        );

        // Verify tile structure
        expect(html).toContain("ddb-bg3-icon-tile");
        expect(html).toContain('aria-label="Hex, Spell"');
        expect(html).toContain("26");
        expect(html).toContain("--tile-accent:#ff66cc");
    });

    it("renders selected state and custom badges properly", () => {
        const html = renderToStaticMarkup(
            <ActionGridTooltipProvider>
                <ActionGridTile
                    name="Two-Weapon Fighting"
                    category="Bonus Action"
                    subtitle="Offhand Attack"
                    icon={<span>⚔</span>}
                    accent="#d1a75e"
                    shortcut={5}
                    selected={true}
                    handBadge={{
                        type: "offhand",
                        label: "OH ⇄",
                    }}
                    onActivate={vi.fn()}
                />
            </ActionGridTooltipProvider>
        );

        expect(html).toContain("selected");
        expect(html).toContain("ddb-bg3-tile-hand-badge offhand");
        expect(html).toContain("OH ⇄");
    });

    it("renders action badges when provided", () => {
        const html = renderToStaticMarkup(
            <ActionGridTooltipProvider>
                <ActionGridTile
                    name="Throw Dagger"
                    category="Attack"
                    subtitle="Thrown Weapon"
                    icon={<span>🗡</span>}
                    accent="#c9a66b"
                    shortcut={3}
                    actionBadge={{
                        label: "THROWN",
                        className: "thrown-indicator",
                    }}
                    onActivate={vi.fn()}
                />
            </ActionGridTooltipProvider>
        );

        expect(html).toContain("ddb-bg3-tile-action-badge thrown-indicator");
        expect(html).toContain("THROWN");
    });
});
