import { describe, it, expect } from "vitest";
import {
  extractDdbMonsterSlug,
  parseDdbMonsterHtml,
  fetchDdbMonsterByUrl,
} from "../ddbMonsterFetcher";

describe("ddbMonsterFetcher", () => {
  describe("extractDdbMonsterSlug", () => {
    it("should extract slug from full D&D Beyond URL", () => {
      expect(
        extractDdbMonsterSlug("https://www.dndbeyond.com/monsters/16907-goblin")
      ).toBe("16907-goblin");
      expect(
        extractDdbMonsterSlug("https://www.dndbeyond.com/monsters/1fef9034-e77c-473d-986c-7e505886fc24")
      ).toBe("1fef9034-e77c-473d-986c-7e505886fc24");
      expect(
        extractDdbMonsterSlug("https://www.dndbeyond.com/monsters/beholder")
      ).toBe("beholder");
    });

    it("should handle direct slug input", () => {
      expect(extractDdbMonsterSlug("16907-goblin")).toBe("16907-goblin");
      expect(extractDdbMonsterSlug("beholder")).toBe("beholder");
    });

    it("should return null for empty input", () => {
      expect(extractDdbMonsterSlug("")).toBeNull();
    });
  });

  describe("parseDdbMonsterHtml", () => {
    const sampleGoblinHtml = `
      <div id="legacy-badge" class="badge-label" aria-label="legacy">Legacy</div>
      <div class="mon-stat-block">
        <div class="mon-stat-block__header">
          <div class="mon-stat-block__name">
            <a class="mon-stat-block__name-link" href="/monsters/16907-goblin">Goblin</a>
          </div>
          <div class="mon-stat-block__meta">Small Humanoid (Goblinoid), Neutral Evil</div>
        </div>
        <div class="mon-stat-block__attributes">
          <div class="mon-stat-block__attribute">
            <span class="mon-stat-block__attribute-label">Armor Class</span>
            <span class="mon-stat-block__attribute-value">
              <span class="mon-stat-block__attribute-data-value">15</span>
              <span class="mon-stat-block__attribute-data-extra">(leather armor, shield)</span>
            </span>
          </div>
          <div class="mon-stat-block__attribute">
            <span class="mon-stat-block__attribute-label">Hit Points</span>
            <span class="mon-stat-block__attribute-data">
              <span class="mon-stat-block__attribute-data-value">7</span>
              <span class="mon-stat-block__attribute-data-extra">(2d6)</span>
            </span>
          </div>
          <div class="mon-stat-block__attribute">
            <span class="mon-stat-block__attribute-label">Speed</span>
            <span class="mon-stat-block__attribute-data">
              <span class="mon-stat-block__attribute-data-value">30 ft.</span>
            </span>
          </div>
        </div>
        <div class="mon-stat-block__stat-block">
          <div class="ability-block">
            <div class="ability-block__stat ability-block__stat--str">
              <span class="ability-block__score">8</span>
            </div>
            <div class="ability-block__stat ability-block__stat--dex">
              <span class="ability-block__score">14</span>
            </div>
            <div class="ability-block__stat ability-block__stat--con">
              <span class="ability-block__score">10</span>
            </div>
            <div class="ability-block__stat ability-block__stat--int">
              <span class="ability-block__score">10</span>
            </div>
            <div class="ability-block__stat ability-block__stat--wis">
              <span class="ability-block__score">8</span>
            </div>
            <div class="ability-block__stat ability-block__stat--cha">
              <span class="ability-block__score">8</span>
            </div>
          </div>
        </div>
        <div class="mon-stat-block__tidbits">
          <div class="mon-stat-block__tidbit">
            <span class="mon-stat-block__tidbit-label">Skills</span>
            <span class="mon-stat-block__tidbit-data">Stealth +6</span>
          </div>
          <div class="mon-stat-block__tidbit">
            <span class="mon-stat-block__tidbit-label">Senses</span>
            <span class="mon-stat-block__tidbit-data">Darkvision 60 ft., Passive Perception 9</span>
          </div>
          <div class="mon-stat-block__tidbit">
            <span class="mon-stat-block__tidbit-label">Languages</span>
            <span class="mon-stat-block__tidbit-data">Common, Goblin</span>
          </div>
          <div class="mon-stat-block__tidbit">
            <span class="mon-stat-block__tidbit-label">Challenge</span>
            <span class="mon-stat-block__tidbit-data">1/4 (50 XP)</span>
          </div>
          <div class="mon-stat-block__tidbit">
            <span class="mon-stat-block__tidbit-label">Proficiency Bonus</span>
            <span class="mon-stat-block__tidbit-data">+2</span>
          </div>
        </div>
        <div class="mon-stat-block__description-blocks">
          <div class="mon-stat-block__description-block">
            <div class="mon-stat-block__description-block-heading">Traits</div>
            <div class="mon-stat-block__description-block-content">
              <p><em><strong>Nimble Escape.</strong></em> The goblin can take Disengage or Hide as a bonus action.</p>
            </div>
          </div>
          <div class="mon-stat-block__description-block">
            <div class="mon-stat-block__description-block-heading">Actions</div>
            <div class="mon-stat-block__description-block-content">
              <p><em><strong>Scimitar.</strong> Melee Weapon Attack:</em> <span data-dicenotation="1d20+4" data-rolltype="to hit">+4</span> to hit, reach 5 ft., one target. <em>Hit:</em> 5 <span data-dicenotation="1d6+2" data-rolltype="damage" data-rolldamagetype="slashing">(1d6 + 2)</span> slashing damage.</p>
              <p><em><strong>Shortbow.</strong> Ranged Weapon Attack:</em> <span data-dicenotation="1d20+4" data-rolltype="to hit">+4</span> to hit, range 80/320 ft., one target. <em>Hit:</em> 5 <span data-dicenotation="1d6+2" data-rolltype="damage" data-rolldamagetype="piercing">(1d6 + 2)</span> piercing damage.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    it("should parse statblock fields cleanly from D&D Beyond HTML", () => {
      const monster = parseDdbMonsterHtml(sampleGoblinHtml);
      expect(monster).not.toBeNull();
      expect(monster?.name).toBe("Goblin");
      expect(monster?.edition).toBe("2014");
      expect(monster?.isLegacy).toBe(true);
      expect(monster?.size).toBe("Small");
      expect(monster?.type).toBe("Humanoid");
      expect(monster?.subtype).toBe("Goblinoid");
      expect(monster?.alignment).toBe("Neutral Evil");
      expect(monster?.armorClass).toBe(15);
      expect(monster?.armorDesc).toBe("leather armor, shield");
      expect(monster?.hitPoints.average).toBe(7);
      expect(monster?.hitPoints.formula).toBe("2d6");
      expect(monster?.stats.dex).toBe(14);
      expect(monster?.stats.str).toBe(8);
      expect(monster?.skills?.stealth).toBe(6);
      expect(monster?.challengeRating).toBe("1/4");
      expect(monster?.proficiencyBonus).toBe(2);

      // Traits & Actions
      expect(monster?.traits?.length).toBe(1);
      expect(monster?.traits?.[0].name).toBe("Nimble Escape");
      expect(monster?.actions.length).toBe(2);
      expect(monster?.actions[0].name).toBe("Scimitar");
      expect(monster?.actions[0].type).toBe("melee_attack");
      expect(monster?.actions[0].attackBonus).toBe(4);
      expect(monster?.actions[0].damage).toBe("1d6+2");
      expect(monster?.actions[0].damageType).toBe("slashing");

      expect(monster?.actions[1].name).toBe("Shortbow");
      expect(monster?.actions[1].type).toBe("ranged_attack");
      expect(monster?.actions[1].attackBonus).toBe(4);
      expect(monster?.actions[1].rangeFeet).toBe(80);
      expect(monster?.actions[1].rangeLongFeet).toBe(320);
    });

    it("should parse 2024 Monster Manual HTML markup format", () => {
      const sample2024Html = `
        <div class="mon-stat-block-2024">
          <div class="mon-stat-block-2024__header">
            <div class="mon-stat-block-2024__name">
              <a class="mon-stat-block-2024__name-link">Aarakocra Aeromancer</a>
            </div>
            <div class="mon-stat-block-2024__meta">Medium Elemental, Neutral</div>
          </div>
          <div class="mon-stat-block-2024__attributes">
            <div class="mon-stat-block-2024__attribute">
              <span class="mon-stat-block-2024__attribute-label">Armor Class</span>
              <span class="mon-stat-block-2024__attribute-data-value">16</span>
            </div>
            <div class="mon-stat-block-2024__attribute">
              <span class="mon-stat-block-2024__attribute-label">Hit Points</span>
              <span class="mon-stat-block-2024__attribute-data">
                <span class="mon-stat-block-2024__attribute-data-value">66</span>
                <span class="mon-stat-block-2024__attribute-data-extra">(12d8 + 12)</span>
              </span>
            </div>
            <div class="mon-stat-block-2024__attribute">
              <span class="mon-stat-block-2024__attribute-label">Speed</span>
              <span class="mon-stat-block-2024__attribute-data">
                <span class="mon-stat-block-2024__attribute-data-value">30 ft., fly 60 ft.</span>
              </span>
            </div>
          </div>
          <div class="mon-stat-block-2024__stats">
            <table>
              <tr><th>STR</th><td>10</td><td>+0</td><td>+0</td></tr>
              <tr><th>DEX</th><td>16</td><td>+3</td><td>+5</td></tr>
              <tr><th>CON</th><td>12</td><td>+1</td><td>+1</td></tr>
              <tr><th>INT</th><td>13</td><td>+1</td><td>+1</td></tr>
              <tr><th>WIS</th><td>17</td><td>+3</td><td>+5</td></tr>
              <tr><th>CHA</th><td>12</td><td>+1</td><td>+1</td></tr>
            </table>
          </div>
          <div class="mon-stat-block-2024__tidbits">
            <div class="mon-stat-block-2024__tidbit">
              <span class="mon-stat-block-2024__tidbit-label">CR</span>
              <span class="mon-stat-block-2024__tidbit-data">4 (XP 1,100; PB +2)</span>
            </div>
          </div>
          <div class="mon-stat-block-2024__description-blocks">
            <div class="mon-stat-block-2024__description-block">
              <div class="mon-stat-block-2024__description-block-heading">Actions</div>
              <div class="mon-stat-block-2024__description-block-content">
                <p><strong><em>Multiattack.</em></strong> The aarakocra makes two Wind Staff attacks, and it can use Spellcasting to cast Gust of Wind.</p>
                <p><strong><em>Wind Staff.</em></strong> <em>Melee or Ranged Attack Roll:</em> <span data-dicenotation="1d20+5">+5</span>, reach 5 ft. or range 120 ft. <em>Hit:</em> 7 <span data-dicenotation="1d8+3" data-rolldamagetype="Bludgeoning">(1d8 + 3)</span> Bludgeoning damage plus 11 <span data-dicenotation="2d10" data-rolldamagetype="Lightning">(2d10)</span> Lightning damage.</p>
                <p><strong><em>Spellcasting.</em></strong> The aarakocra casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13). At Will -> Elementalism, Gust of Wind, Mage Hand, Message 1/Day: Lightning Bolt.</p>
                <p><strong><em>Fire Breath (Recharge 5–6).</em></strong> Dexterity Saving Throw: DC 24, each creature in a 90-foot Cone. Failure: 71 (13d10) Fire damage. Success: Half damage.</p>
                <p><strong><em>Storm Shroud.</em></strong> The aarakocra can use this ability 2 per 3 days.</p>
                <p><strong><em>Flame Burst (Recharge 5-6).</em></strong> The aarakocra exhales a burst of fire.</p>
              </div>
            </div>
          </div>
        </div>
      `;

      const monster = parseDdbMonsterHtml(sample2024Html);
      expect(monster).not.toBeNull();
      expect(monster?.name).toBe("Aarakocra Aeromancer");
      expect(monster?.edition).toBe("2024");
      expect(monster?.isLegacy).toBe(false);
      expect(monster?.armorClass).toBe(16);
      expect(monster?.hitPoints.average).toBe(66);
      expect(monster?.hitPoints.formula).toBe("12d8 + 12");
      expect(monster?.stats.wis).toBe(17);
      expect(monster?.savingThrows?.wis).toBe(5);
      expect(monster?.challengeRating).toBe("4");
      expect(monster?.proficiencyBonus).toBe(2);
      expect(monster?.actions.length).toBe(6);
      const multiattack = monster?.actions.find((action) => action.name === "Multiattack");
      expect(multiattack?.multiattackSequence).toEqual([
        { actionId: "act_1_wind_staff", count: 2 },
      ]);

      const windStaff = monster?.actions.find((action) => action.name === "Wind Staff");
      expect(windStaff?.type).toBe("ranged_attack");
      expect(windStaff?.attackBonus).toBe(5);
      expect(windStaff?.damage).toBe("1d8+3");
      expect(windStaff?.damageType).toBe("Bludgeoning");
      expect(windStaff?.damageComponents).toEqual([
        { formula: "1d8+3", damageType: "Bludgeoning" },
        { formula: "2d10", damageType: "Lightning" },
      ]);
      expect(windStaff?.reachFeet).toBe(5);
      expect(windStaff?.rangeFeet).toBe(120);

      const spellcasting = monster?.actions.find((action) => action.name === "Spellcasting");
      expect(spellcasting?.type).toBe("spell");
      expect(spellcasting?.spellcastingAbility).toBe("wis");
      expect(spellcasting?.spellSaveDc).toBe(13);
      expect(spellcasting?.spellOptions).toEqual([
        { id: "spell_elementalism", name: "Elementalism", usage: undefined },
        { id: "spell_gust_of_wind", name: "Gust of Wind", usage: undefined },
        { id: "spell_mage_hand", name: "Mage Hand", usage: undefined },
        { id: "spell_message", name: "Message", usage: undefined },
        {
          id: "spell_lightning_bolt",
          name: "Lightning Bolt",
          usage: {
            maxUses: 1,
            resetEvery: 1,
            resetUnit: "day",
            label: "1/Day",
          },
        },
      ]);
      expect(monster?.actions.find((action) => action.name === "Storm Shroud")?.usage).toEqual({
        maxUses: 2,
        resetEvery: 3,
        resetUnit: "day",
        label: "2 per 3 days",
      });
      expect(monster?.actions.find((action) => action.name === "Flame Burst (Recharge 5-6)")?.usage).toEqual({
        maxUses: 1,
        resetEvery: 1,
        resetUnit: "manual",
        label: "Recharge 5-6",
      });
      const fireBreath = monster?.actions.find((action) => action.name === "Fire Breath (Recharge 5–6)");
      expect(fireBreath).toMatchObject({
        saveDc: 24,
        saveStat: "dex",
        areaOfEffect: { shape: "Cone", sizeFeet: 90 },
        damage: "13d10",
        damageType: "Fire",
        saveSuccessDamageMultiplier: 0.5,
        saveFailureDamageMultiplier: 1,
      });
    });
  });

  describe("fetchDdbMonsterByUrl", () => {
    it("should throw error when invalid slug is provided", async () => {
      await expect(fetchDdbMonsterByUrl("")).rejects.toThrow();
    });
  });
});
