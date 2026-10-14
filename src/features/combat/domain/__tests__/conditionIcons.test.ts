import { describe, expect, it } from "vitest";
import {
  getCombatBadgeAssetUrl,
  getCombatEffectBadgeUri,
  getConditionBadgeUri,
} from "../conditionIcons";
import { buildCombatBadgeSvg, CONDITION_BADGE_COLORS } from "../conditionBadgeAssets";

describe("combat badge asset URLs", () => {
  it("resolves standard URLs for condition, dead, and custom status icons", () => {
    expect(getCombatBadgeAssetUrl(getConditionBadgeUri("blinded"), "https://extension.example"))
      .toBe("https://extension.example/combat-badges/blinded.svg?v=3");
    expect(getCombatBadgeAssetUrl(getConditionBadgeUri("dead"), "https://extension.example"))
      .toBe("https://extension.example/combat-badges/dead.svg?v=3");
    expect(getCombatBadgeAssetUrl(getConditionBadgeUri("homebrew"), "https://extension.example"))
      .toBe("https://extension.example/combat-badges/custom.svg?v=3");
  });

  it("provides distinct image assets for concentration and temporary speed effects", () => {
    expect(getCombatBadgeAssetUrl(getCombatEffectBadgeUri("concentration"), "https://extension.example"))
      .toBe("https://extension.example/combat-badges/concentration.svg?v=3");
    expect(getCombatBadgeAssetUrl(getCombatEffectBadgeUri("speed_reduction"), "https://extension.example"))
      .toBe("https://extension.example/combat-badges/speed-reduction.svg?v=3");
  });

  it("assigns a distinct readable color to every supported condition", () => {
    const colors = Object.values(CONDITION_BADGE_COLORS);
    expect(new Set(colors).size).toBe(colors.length);

    for (const color of colors) {
      const [red, green, blue] = color.slice(1).match(/.{2}/g)!.map((channel) => parseInt(channel, 16) / 255);
      const luminance = [red, green, blue]
        .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
        .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);

      expect(1.05 / (luminance + 0.05)).toBeGreaterThanOrEqual(3);
    }
  });

  it("uses color for conditions while preserving dark framing for other combat badges", () => {
    const sourceSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M10 10h80v80H10z"/></svg>';

    const poisoned = buildCombatBadgeSvg(sourceSvg, "poisoned");
    expect(poisoned).toContain(`fill="${CONDITION_BADGE_COLORS.poisoned}"`);
    expect(poisoned).toContain('<g fill="#f8fafc" stroke="#f8fafc">');

    const concentration = buildCombatBadgeSvg(sourceSvg, "concentration");
    expect(concentration).toContain('fill="#0f172a"');
  });
});
