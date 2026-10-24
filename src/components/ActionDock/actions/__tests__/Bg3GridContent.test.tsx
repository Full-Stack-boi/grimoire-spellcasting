import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect } from "vitest";
import { Bg3GridContent } from "../Bg3GridContent";
import type { DockSpell } from "../../domain/types";

describe("Bg3GridContent Spells Filtering", () => {
    const mockSpells: DockSpell[] = [
        {
            id: "eldritch_blast",
            name: "Eldritch Blast",
            level: 0,
            school: "Evocation",
            castingTime: "1A",
            rangeText: "120 ft.",
            isPrepared: true,
            fromChar: true,
        },
        {
            id: "hex",
            name: "Hex",
            level: 1,
            school: "Enchantment",
            castingTime: "1BA",
            rangeText: "90 ft.",
            isPrepared: true,
            fromChar: true,
        },
        {
            id: "false_life",
            name: "False Life",
            level: 1,
            school: "Necromancy",
            castingTime: "1A",
            rangeText: "Self",
            isPrepared: true,
            fromChar: true,
            hasFreeCast: true,
            freeCast: { max: 1, used: 0, resetType: "Long Rest" },
            canCastWithSlot: true,
        },
        {
            id: "ray_of_enfeeblement",
            name: "Ray of Enfeeblement",
            level: 2,
            school: "Necromancy",
            castingTime: "1A",
            rangeText: "60 ft.",
            isPrepared: true,
            fromChar: true,
            hasFreeCast: true,
            freeCast: { max: 1, used: 0, resetType: "Long Rest" },
            canCastWithSlot: true,
        },
    ];

    it("renders ONLY special & innate spells under SPECIAL/FREE filter in dedicated section", () => {
        const html = renderToStaticMarkup(
            <Bg3GridContent
                mainTab="SPELLS"
                actionsFilter="ALL"
                spellsFilter="SPECIAL"
                spellSearch=""
                actionSearch=""
                weapons={[]}
                attackSpells={[]}
                actionSpells={[]}
                actionFeatures={[]}
                bonusActionSpells={[]}
                bonusActionFeatures={[]}
                reactionSpells={[]}
                reactionFeatures={[]}
                combatActions={[]}
                spells={mockSpells}
                renderWeaponCard={() => null}
                renderSpellCard={(spell) => <div key={spell.id} className="test-spell-card">{spell.name}</div>}
                renderFeatureCard={() => null}
                renderCombatActionCard={() => null}
            />
        );

        // Section header must be Special & Innate Spells
        expect(html).toContain("Special &amp; Innate Spells");
        // Must contain free spells
        expect(html).toContain("False Life");
        expect(html).toContain("Ray of Enfeeblement");
        // Must NOT contain regular slot spells or cantrips
        expect(html).not.toContain("Eldritch Blast");
        expect(html).not.toContain("Hex");
        expect(html).not.toContain("Cantrips");
    });

    it("renders all spells grouped by level under ALL filter", () => {
        const html = renderToStaticMarkup(
            <Bg3GridContent
                mainTab="SPELLS"
                actionsFilter="ALL"
                spellsFilter="ALL"
                spellSearch=""
                actionSearch=""
                weapons={[]}
                attackSpells={[]}
                actionSpells={[]}
                actionFeatures={[]}
                bonusActionSpells={[]}
                bonusActionFeatures={[]}
                reactionSpells={[]}
                reactionFeatures={[]}
                combatActions={[]}
                spells={mockSpells}
                renderWeaponCard={() => null}
                renderSpellCard={(spell) => <div key={spell.id} className="test-spell-card">{spell.name}</div>}
                renderFeatureCard={() => null}
                renderCombatActionCard={() => null}
            />
        );

        expect(html).toContain("Cantrips");
        expect(html).toContain("Level 1");
        expect(html).toContain("Level 2");
        expect(html).toContain("Eldritch Blast");
        expect(html).toContain("Hex");
        expect(html).toContain("False Life");
        expect(html).toContain("Ray of Enfeeblement");
    });
});
