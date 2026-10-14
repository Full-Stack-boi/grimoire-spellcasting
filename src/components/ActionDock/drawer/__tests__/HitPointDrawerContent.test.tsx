import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect, vi } from "vitest";
import { HitPointDrawerContent } from "../HitPointDrawerContent";

describe("HitPointDrawerContent Component", () => {
    const mockCharacter = {
        id: 999,
        name: "Shadowheart",
        modifiers: { con: 2 },
        hitDice: [
            { die: "d8", total: 5 },
        ],
    } as any;

    it("renders direct numeric input fields for CURRENT, MAX, and TEMP", () => {
        const html = renderToStaticMarkup(
            <HitPointDrawerContent
                item={{ type: "hp", current: 28, max: 38, temp: 5 }}
                character={mockCharacter}
                currentHp={28}
                maxHp={38}
                tempHp={5}
                usedHitDice={{ d8: 2 }}
                onHeal={vi.fn()}
                onDamage={vi.fn()}
                onRollHitDie={vi.fn()}
            />
        );

        // Inputs rendered with correct attributes
        expect(html).toContain('id="hp-input-current"');
        expect(html).toContain('type="number"');
        expect(html).toContain('value="28"');

        expect(html).toContain('id="hp-input-max"');
        expect(html).toContain('value="38"');

        expect(html).toContain('id="hp-input-temp"');
        expect(html).toContain('value="5"');

        // Hit dice section rendered
        expect(html).toContain("SHORT REST HIT DICE");
        expect(html).toContain("3/5");
        expect(html).toContain("Spend &amp; Roll (d8+2)");

        // Zero emoji check
        expect(html).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u);
        expect(html).not.toContain("💖");
        expect(html).not.toContain("🎲");
        expect(html).not.toContain("🩸");
    });

    it("renders disabled hit dice roll button when all dice are spent", () => {
        const html = renderToStaticMarkup(
            <HitPointDrawerContent
                item={{ type: "hp", current: 15, max: 38, temp: 0 }}
                character={mockCharacter}
                currentHp={15}
                maxHp={38}
                tempHp={0}
                usedHitDice={{ d8: 5 }}
                onHeal={vi.fn()}
                onDamage={vi.fn()}
                onRollHitDie={vi.fn()}
            />
        );

        expect(html).toContain("0/5");
        expect(html).toContain("disabled");
    });
});
