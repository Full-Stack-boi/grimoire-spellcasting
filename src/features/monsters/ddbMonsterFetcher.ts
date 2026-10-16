import type {
  MonsterStatblock,
  MonsterSize,
  MonsterType,
  MonsterAction,
  MonsterResetUnit,
  MonsterSpellOption,
  MonsterUsageLimit,
  MonsterDamageComponent,
} from "./domain/types";
import { parseMonsterSaveMechanics } from "./domain/monsterSaveMechanics";

const KNOWN_SIZES: MonsterSize[] = [
  "Tiny",
  "Small",
  "Medium",
  "Large",
  "Huge",
  "Gargantuan",
];

const KNOWN_TYPES: MonsterType[] = [
  "Aberration",
  "Beast",
  "Celestial",
  "Construct",
  "Dragon",
  "Elemental",
  "Fey",
  "Fiend",
  "Giant",
  "Humanoid",
  "Monstrosity",
  "Ooze",
  "Plant",
  "Undead",
];

const KNOWN_CONDITIONS = new Set([
  "blinded",
  "charmed",
  "deafened",
  "exhaustion",
  "frightened",
  "grappled",
  "incapacitated",
  "invisible",
  "paralyzed",
  "petrified",
  "poisoned",
  "prone",
  "restrained",
  "stunned",
  "unconscious",
]);

function cleanHtmlText(raw: string): string {
  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseUsageLimit(text: string): MonsterUsageLimit | undefined {
  const rechargeMatch = text.match(/\brecharge\s*(\d+)\s*[-–]\s*(\d+)\b/i);
  if (rechargeMatch) {
    return {
      maxUses: 1,
      resetEvery: 1,
      resetUnit: "manual",
      label: `Recharge ${rechargeMatch[1]}-${rechargeMatch[2]}`,
    };
  }

  const match = text.match(
    /\b(\d+)\s*(?:\/|per)\s*(?:(\d+)\s*)?(rounds?|minutes?|hours?|days?|weeks?|short rests?|long rests?)\b/i,
  );
  if (!match) return undefined;

  const unitText = match[3].toLowerCase().replace(/s$/, "");
  const resetUnit: MonsterResetUnit =
    unitText === "round" || unitText === "minute" || unitText === "hour" ||
    unitText === "day" || unitText === "week" || unitText === "short rest" ||
    unitText === "long rest"
      ? unitText
      : "manual";
  const maxUses = Number(match[1]);
  const resetEvery = Number(match[2] || 1);
  if (!Number.isInteger(maxUses) || maxUses < 1 || !Number.isInteger(resetEvery) || resetEvery < 1) {
    return undefined;
  }

  return {
    maxUses,
    resetEvery,
    resetUnit,
    label: match[0].trim(),
  };
}

function parseSpellOptions(description: string): MonsterSpellOption[] {
  const sectionPattern =
    /(?:^|[;,.]\s*|\s)(At\s+Will|\d+\s*(?:\/|per)\s*(?:(?:\d+)\s*)?(?:rounds?|minutes?|hours?|days?|weeks?|short\s+rests?|long\s+rests?))\s*(?:each\s*)?(?::|->)\s*/gi;
  const sections: Array<{ label: string; markerStart: number; start: number; end: number }> = [];
  let match: RegExpExecArray | null;

  while ((match = sectionPattern.exec(description)) !== null) {
    sections.push({
      label: match[1],
      markerStart: match.index + match[0].lastIndexOf(match[1]),
      start: sectionPattern.lastIndex,
      end: description.length,
    });
  }
  sections.forEach((section, index) => {
    const next = sections[index + 1];
    if (next) section.end = next.markerStart;
  });

  const options: MonsterSpellOption[] = [];
  for (let index = 0; index < sections.length; index += 1) {
    const section = sections[index];
    const content = description.slice(section.start, section.end);
    const usage = /^at\s+will$/i.test(section.label)
      ? undefined
      : parseUsageLimit(section.label);

    for (const rawName of content.split(/,|;|\band\b/i)) {
      const name = rawName.trim().replace(/[.]+$/, "");
      if (!name || name.length > 80 || /^(?:each|cantrips?)$/i.test(name)) continue;
      options.push({
        id: `spell_${name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`,
        name,
        usage,
      });
    }
  }
  return options;
}

function parseDamageComponents(text: string): MonsterDamageComponent[] {
  const damagePattern =
    /(?:\d+\s*)?\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)\s*(bludgeoning|piercing|slashing|fire|cold|lightning|thunder|poison|acid|necrotic|radiant|force|psychic)\s+damage/gi;
  const components: MonsterDamageComponent[] = [];
  let match: RegExpExecArray | null;
  while ((match = damagePattern.exec(text)) !== null) {
    components.push({
      formula: match[1].replace(/\s+/g, ""),
      damageType: match[2],
    });
  }
  return components;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Extracts the monster slug or ID from a user input.
 * Supports:
 * - "https://www.dndbeyond.com/monsters/16907-goblin" -> "16907-goblin"
 * - "https://www.dndbeyond.com/monsters/5195229-goblin-warrior" -> "5195229-goblin-warrior"
 * - "16907-goblin" -> "16907-goblin"
 */
export function extractDdbMonsterSlug(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const urlMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?dndbeyond\.com\/monsters\/([a-zA-Z0-9_-]+)/i
  );
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  if (/^[a-zA-Z0-9_-]+$/.test(trimmed) && !trimmed.startsWith("http")) {
    return trimmed;
  }

  return null;
}

/**
 * Parses full HTML from a D&D Beyond monster page into a clean MonsterStatblock.
 * Seamlessly supports both 2014 (.mon-stat-block) and 2024 (.mon-stat-block-2024) markup formats.
 */
export function parseDdbMonsterHtml(html: string, sourceUrl?: string): MonsterStatblock | null {
  if (!html || (!html.includes("mon-stat-block") && !html.includes("mon-stat-block-2024"))) {
    return null;
  }

  // 1. Name
  const nameMatch =
    html.match(/<div class="mon-stat-block(?:-2024)?__name(?:-link)?"[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i) ||
    html.match(/<div class="mon-stat-block(?:-2024)?__name(?:-link)?"[^>]*>([\s\S]*?)<\/div>/i) ||
    html.match(/<h1 class="page-title"[^>]*>([\s\S]*?)<\/h1>/i);
  const name = nameMatch ? cleanHtmlText(nameMatch[1]) : "Unknown Creature";

  // 2. Legacy Badge detection
  const hasLegacyBadge =
    html.includes('id="legacy-badge"') ||
    html.includes('class="legacy-badge"') ||
    html.includes('aria-label="legacy"') ||
    Boolean(sourceUrl && /legacy/i.test(sourceUrl));

  const edition = hasLegacyBadge ? "2014" : "2024";
  const isLegacy = hasLegacyBadge;

  // 3. Meta (Size, Type, Subtype, Alignment)
  // Example: "Small Humanoid (Goblinoid), Neutral Evil" or "Medium Elemental, Neutral"
  const metaMatch = html.match(/<div class="mon-stat-block(?:-2024)?__meta"[^>]*>([\s\S]*?)<\/div>/i);
  const metaText = metaMatch ? cleanHtmlText(metaMatch[1]) : "";

  let size: MonsterSize = "Medium";
  for (const s of KNOWN_SIZES) {
    if (new RegExp(`\\b${s}\\b`, "i").test(metaText)) {
      size = s;
      break;
    }
  }

  let type: MonsterType = "Humanoid";
  for (const t of KNOWN_TYPES) {
    if (new RegExp(`\\b${t}\\b`, "i").test(metaText)) {
      type = t;
      break;
    }
  }

  const subtypeMatch = metaText.match(/\(([^)]+)\)/);
  const subtype = subtypeMatch ? subtypeMatch[1].trim() : undefined;

  let alignment = "Unaligned";
  const alignParts = metaText.split(",");
  if (alignParts.length > 1) {
    alignment = alignParts[1].trim();
  }

  // 4. Attributes (AC, HP, Speed)
  // Armor Class (2014 "Armor Class", 2024 "AC")
  let armorClass = 10;
  let armorDesc: string | undefined;
  const acBlockMatch = html.match(
    /<div class="mon-stat-block(?:-2024)?__attribute"[\s\S]*?(?:Armor Class|(?:\bAC\b))([\s\S]*?)<\/div>/i
  );
  if (acBlockMatch) {
    const acValMatch = acBlockMatch[1].match(/<span class="mon-stat-block(?:-2024)?__attribute-data-value"[^>]*>\s*(\d+)/i) ||
                       acBlockMatch[1].match(/<span class="mon-stat-block(?:-2024)?__attribute-value"[^>]*>\s*(\d+)/i);
    if (acValMatch) armorClass = parseInt(acValMatch[1], 10);
    const acExtraMatch = acBlockMatch[1].match(/<span class="mon-stat-block(?:-2024)?__attribute-data-extra"[^>]*>([\s\S]*?)<\/span>/i);
    if (acExtraMatch) armorDesc = cleanHtmlText(acExtraMatch[1]).replace(/^\(|\)$/g, "").trim();
  }

  // Hit Points (2014 "Hit Points", 2024 "HP")
  let hpAverage = 10;
  let hpFormula = "2d8";
  const hpBlockMatch = html.match(
    /<div class="mon-stat-block(?:-2024)?__attribute"[\s\S]*?(?:Hit Points|(?:\bHP\b))[\s\S]*?<span class="mon-stat-block(?:-2024)?__attribute-data">([\s\S]*?)<\/div>/i
  );
  if (hpBlockMatch) {
    const hpValMatch = hpBlockMatch[1].match(/<span class="mon-stat-block(?:-2024)?__attribute-data-value"[^>]*>\s*(\d+)/i);
    if (hpValMatch) hpAverage = parseInt(hpValMatch[1], 10);
    const hpExtraMatch = hpBlockMatch[1].match(/<span class="mon-stat-block(?:-2024)?__attribute-data-extra"[^>]*>([\s\S]*?)<\/span>/i);
    if (hpExtraMatch) hpFormula = cleanHtmlText(hpExtraMatch[1]).replace(/^\(|\)$/g, "").trim();
  }

  // Speed
  let speed = "30 ft.";
  const speedBlockMatch = html.match(
    /<div class="mon-stat-block(?:-2024)?__attribute"[\s\S]*?Speed[\s\S]*?<span class="mon-stat-block(?:-2024)?__attribute-data">([\s\S]*?)<\/div>/i
  );
  if (speedBlockMatch) {
    const speedValMatch = speedBlockMatch[1].match(/<span class="mon-stat-block(?:-2024)?__attribute-data-value"[^>]*>([\s\S]*?)<\/span>/i);
    if (speedValMatch) speed = cleanHtmlText(speedValMatch[1]);
  }

  // 5. Abilities (STR, DEX, CON, INT, WIS, CHA)
  const stats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const savingThrows: Partial<Record<keyof typeof stats, number>> = {};
  const statKeys: Array<keyof typeof stats> = ["str", "dex", "con", "int", "wis", "cha"];
  for (const k of statKeys) {
    // 2014 legacy format
    const r2014 = new RegExp(
      `ability-block__stat--${k}[\\s\\S]*?<span class="ability-block__score"[^>]*>\\s*(\\d+)`,
      "i"
    );
    const m2014 = html.match(r2014);
    if (m2014) {
      stats[k] = parseInt(m2014[1], 10);
    } else {
      // 2024 table format: <th>STR</th>\s*<td>10</td>...<td>+0</td>
      const r2024 = new RegExp(
        `<th>${k.toUpperCase()}<\\/th>\\s*<td>\\s*(\\d+)\\s*<\\/td>(?:\\s*<td[^>]*>[^<]*<\\/td>\\s*<td[^>]*>\\s*([+-]?\\d+)\\s*<\\/td>)?`,
        "i"
      );
      const m2024 = html.match(r2024);
      if (m2024) {
        stats[k] = parseInt(m2024[1], 10);
        if (m2024[2]) {
          savingThrows[k] = parseInt(m2024[2], 10);
        }
      }
    }
  }

  // 6. Tidbits: Skills, Senses, Languages, Challenge / CR, Proficiency Bonus, Defenses
  let senses = "Passive Perception 10";
  let languages = "--";
  let challengeRating = "1";
  let proficiencyBonus = 2;
  const damageVulnerabilities: string[] = [];
  const damageResistances: string[] = [];
  const damageImmunities: string[] = [];
  const conditionImmunities: string[] = [];
  const skills: Record<string, number> = {};

  const tidbitRegex =
    /<div class="mon-stat-block(?:-2024)?__tidbit">[\s\S]*?<span class="mon-stat-block(?:-2024)?__tidbit-label">([\s\S]*?)<\/span>[\s\S]*?<span class="mon-stat-block(?:-2024)?__tidbit-data">([\s\S]*?)<\/span>/gi;
  let tidbitMatch: RegExpExecArray | null;
  while ((tidbitMatch = tidbitRegex.exec(html)) !== null) {
    const label = cleanHtmlText(tidbitMatch[1]).toLowerCase();
    const data = cleanHtmlText(tidbitMatch[2]);

    if (label.includes("skills")) {
      const skillPairs = data.split(",");
      for (const pair of skillPairs) {
        const sm = pair.match(/([a-zA-Z\s]+)\s*([+-]\d+)/);
        if (sm) {
          skills[sm[1].trim().toLowerCase()] = parseInt(sm[2], 10);
        }
      }
    } else if (label.includes("senses")) {
      senses = data;
    } else if (label.includes("languages")) {
      languages = data;
    } else if (label.includes("challenge") || label === "cr") {
      const crMatch = data.match(/^([0-9/]+)/);
      if (crMatch) {
        challengeRating = crMatch[1];
      }
      const pbFromCr = data.match(/PB\s*([+-]?\d+)/i);
      if (pbFromCr) {
        proficiencyBonus = parseInt(pbFromCr[1], 10);
      }
    } else if (label.includes("proficiency bonus")) {
      const pbMatch = data.match(/([+-]?\d+)/);
      if (pbMatch) {
        proficiencyBonus = parseInt(pbMatch[1], 10);
      }
    } else if (label.includes("vulnerabilities")) {
      damageVulnerabilities.push(...data.split(",").map((s) => s.trim()).filter(Boolean));
    } else if (label.includes("resistances")) {
      damageResistances.push(...data.split(",").map((s) => s.trim()).filter(Boolean));
    } else if (label.includes("condition immunities") || label.includes("condition immunity")) {
      conditionImmunities.push(...data.split(",").map((s) => s.trim()).filter(Boolean));
    } else if (label.includes("immunities") || label.includes("immunity")) {
      const sections = data.split(";");
      for (const sec of sections) {
        const items = sec.split(",").map((s) => s.trim()).filter(Boolean);
        for (const item of items) {
          if (KNOWN_CONDITIONS.has(item.toLowerCase())) {
            conditionImmunities.push(item);
          } else {
            damageImmunities.push(item);
          }
        }
      }
    }
  }

  // 7. Description blocks: Traits, Actions, Bonus Actions, Reactions, Legendary Actions
  const traits: Array<{ name: string; description: string }> = [];
  const actions: MonsterAction[] = [];
  const bonusActions: Array<{ name: string; description: string }> = [];
  const reactions: Array<{ name: string; description: string }> = [];
  const legendaryActions: Array<{ name: string; description: string }> = [];

  const descBlockRegex =
    /<div class="mon-stat-block(?:-2024)?__description-block">[\s\S]*?<div class="mon-stat-block(?:-2024)?__description-block-heading">([\s\S]*?)<\/div>[\s\S]*?<div class="mon-stat-block(?:-2024)?__description-block-content">([\s\S]*?)<\/div>/gi;
  let descMatch: RegExpExecArray | null;

  while ((descMatch = descBlockRegex.exec(html)) !== null) {
    const heading = cleanHtmlText(descMatch[1]).toLowerCase();
    const contentHtml = descMatch[2];

    const pRegex = /<p>([\s\S]*?)<\/p>/gi;
    let pMatch: RegExpExecArray | null;

    while ((pMatch = pRegex.exec(contentHtml)) !== null) {
      const paragraph = pMatch[1];
      const nameInP =
        paragraph.match(/<em><strong>([\s\S]*?)<\/strong><\/em>/i) ||
        paragraph.match(/<strong><em>([\s\S]*?)<\/em><\/strong>/i) ||
        paragraph.match(/<strong>([\s\S]*?)<\/strong>/i);

      const entryName = nameInP ? cleanHtmlText(nameInP[1]).replace(/\.$/, "") : "";
      const fullText = cleanHtmlText(paragraph);
      const entryDesc = entryName ? fullText.replace(new RegExp(`^${entryName}\\.?\\s*`, "i"), "") : fullText;

      if (!entryName) continue;

      if (heading.includes("traits")) {
        traits.push({ name: entryName, description: entryDesc });
      } else if (heading.includes("reaction")) {
        reactions.push({ name: entryName, description: entryDesc });
      } else if (heading.includes("bonus")) {
        bonusActions.push({ name: entryName, description: entryDesc });
      } else if (heading.includes("legendary")) {
        legendaryActions.push({ name: entryName, description: entryDesc });
      } else if (heading.includes("action")) {
        const isMelee = /melee\s+(?:weapon|spell|attack)/i.test(paragraph);
        const isRanged = /ranged\s+(?:weapon|spell|attack)/i.test(paragraph);
        const isMulti = /multiattack/i.test(entryName);
        const isSpellcasting = /spellcasting/i.test(entryName);

        const atkMatch =
          paragraph.match(/data-dicenotation="1d20([+-]\d+)"/i) ||
          paragraph.match(/([+-]\d+)\s+to hit/i) ||
          paragraph.match(/Attack Roll:\s*([+-]\d+)/i);
        const attackBonus = atkMatch ? parseInt(atkMatch[1], 10) : undefined;

        const dmgDiceMatch =
          paragraph.match(/data-dicenotation="([^"]+)"[^>]*(?:data-rolltype="damage"|data-rolldamagetype)/i) ||
          paragraph.match(/(?:data-rolltype="damage"|data-rolldamagetype="[^"]*")[^>]*data-dicenotation="([^"]+)"/i) ||
          paragraph.match(/Hit:[\s\S]*?\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/i) ||
          paragraph.match(/\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/i);
        const damageComponents = parseDamageComponents(fullText);
        const damage =
          damageComponents[0]?.formula ||
          (dmgDiceMatch ? (dmgDiceMatch[1] || dmgDiceMatch[2]).replace(/\s+/g, "") : undefined);

        const dmgTypeMatch =
          paragraph.match(/data-rolldamagetype="([^"]+)"/i) ||
          paragraph.match(
            /(slashing|piercing|bludgeoning|fire|cold|lightning|thunder|poison|acid|necrotic|radiant|force|psychic)\s+damage/i
          );
        const damageType = damageComponents[0]?.damageType || (dmgTypeMatch ? dmgTypeMatch[1].trim() : undefined);

        const reachMatch = paragraph.match(/reach\s+(\d+)\s*ft/i);
        const reachFeet = reachMatch ? parseInt(reachMatch[1], 10) : undefined;

        const rangeMatch = paragraph.match(/range\s+(\d+)(?:\/(\d+))?\s*ft/i);
        const rangeFeet = rangeMatch ? parseInt(rangeMatch[1], 10) : undefined;
        const rangeLongFeet = rangeMatch && rangeMatch[2] ? parseInt(rangeMatch[2], 10) : undefined;
        const spellcastingAbilityMatch = entryDesc.match(
          /(?:using\s+)?(strength|dexterity|constitution|intelligence|wisdom|charisma)\s+as\s+the\s+spellcasting\s+ability|spellcasting ability(?: is)?\s+(strength|dexterity|constitution|intelligence|wisdom|charisma)/i,
        );
        const abilityName = spellcastingAbilityMatch?.[1] || spellcastingAbilityMatch?.[2];
        const spellcastingAbility = abilityName
          ? (abilityName.slice(0, 3).toLowerCase() as "str" | "dex" | "con" | "int" | "wis" | "cha")
          : undefined;
        const spellSaveDcMatch = entryDesc.match(/spell save DC\s*(\d+)/i);
        const spellSaveDc = spellSaveDcMatch ? Number(spellSaveDcMatch[1]) : undefined;
        const saveMechanics = parseMonsterSaveMechanics({ description: entryDesc });

        actions.push({
          id: `act_${actions.length}_${entryName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
          name: entryName,
          type: isMulti ? "multiattack" : isSpellcasting ? "spell" : isRanged ? "ranged_attack" : isMelee ? "melee_attack" : "ability",
          attackBonus,
          reachFeet,
          rangeFeet,
          rangeLongFeet,
          damage,
          damageType,
          damageComponents: damageComponents.length > 0 ? damageComponents : undefined,
          usage: isSpellcasting ? undefined : parseUsageLimit(`${entryName} ${entryDesc}`),
          spellOptions: isSpellcasting ? parseSpellOptions(entryDesc) : undefined,
          spellcastingAbility,
          spellSaveDc,
          saveDc: saveMechanics.saveDc ?? spellSaveDc,
          saveStat: saveMechanics.saveStat,
          areaOfEffect: saveMechanics.areaOfEffect,
          saveSuccessDamageMultiplier: saveMechanics.successDamageMultiplier,
          saveFailureDamageMultiplier: saveMechanics.failureDamageMultiplier,
          description: entryDesc,
        });
      }
    }
  }

  for (const multiattack of actions.filter((action) => action.type === "multiattack")) {
    const sequence = actions.flatMap((action) => {
      if (action === multiattack || (action.type !== "melee_attack" && action.type !== "ranged_attack")) {
        return [];
      }
      const strikeMatch = multiattack.description.match(
        new RegExp(`\\b(one|two|three|four|five|six|\\d+)\\s+${escapeRegExp(action.name)}\\s+attacks?\\b`, "i"),
      );
      if (!strikeMatch) return [];
      const countWords: Record<string, number> = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
      };
      const count = countWords[strikeMatch[1].toLowerCase()] || Number(strikeMatch[1]);
      return Number.isInteger(count) && count > 0 ? [{ actionId: action.id, count }] : [];
    });
    if (sequence.length > 0) multiattack.multiattackSequence = sequence;
  }

  const footerSourceMatch = html.match(/<div class="more-info-footer-source">([\s\S]*?)<\/div>/i);
  const sourceName = footerSourceMatch ? cleanHtmlText(footerSourceMatch[1]) : (isLegacy ? "Monster Manual (2014)" : "Monster Manual (2024)");

  const id = `ddb_${Date.now()}_${name.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;

  return {
    id,
    name,
    source: `${sourceName}${isLegacy ? " (Legacy)" : ""}`,
    edition,
    isLegacy,
    size,
    type,
    subtype,
    alignment,
    armorClass,
    armorDesc,
    hitPoints: {
      average: hpAverage,
      formula: hpFormula,
    },
    speed,
    stats,
    savingThrows: Object.keys(savingThrows).length > 0 ? savingThrows : undefined,
    skills: Object.keys(skills).length > 0 ? skills : undefined,
    damageVulnerabilities: damageVulnerabilities.length > 0 ? damageVulnerabilities : undefined,
    damageResistances: damageResistances.length > 0 ? damageResistances : undefined,
    damageImmunities: damageImmunities.length > 0 ? damageImmunities : undefined,
    conditionImmunities: conditionImmunities.length > 0 ? conditionImmunities : undefined,
    senses,
    languages,
    challengeRating,
    proficiencyBonus,
    traits: traits.length > 0 ? traits : undefined,
    actions,
    bonusActions: bonusActions.length > 0 ? bonusActions : undefined,
    reactions: reactions.length > 0 ? reactions : undefined,
    legendaryActions: legendaryActions.length > 0 ? legendaryActions : undefined,
  };
}

/**
 * Checks if a local browser (Chrome, Brave, Edge, etc.) with debugging port 9222 is connected via Vite bridge.
 */
export async function checkBrowserBridgeStatus(): Promise<{ connected: boolean; browserName?: string; activeTitle?: string; activeUrl?: string }> {
  try {
    const isLocalHost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.endsWith(".local"));
    if (!isLocalHost) {
      return { connected: false };
    }
    const origin = typeof window !== "undefined" && window.location?.origin ? window.location.origin : "http://localhost:5173";
    const res = await fetch(`${origin}/api/browser/status`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Ignore error
  }
  return { connected: false };
}

// Backward-compatible alias
export const checkBraveBridgeStatus = checkBrowserBridgeStatus;

/**
 * Syncs the currently active monster tab in the connected browser.
 */
export async function syncActiveMonsterFromBrowser(): Promise<MonsterStatblock> {
  const origin = typeof window !== "undefined" && window.location?.origin ? window.location.origin : "http://localhost:5173";
  const res = await fetch(`${origin}/api/browser/active-monster`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to fetch active monster from browser. Ensure a monster detail tab is open in your connected browser.");
  }
  const { html, url } = await res.json();
  const parsed = parseDdbMonsterHtml(html, url);
  if (!parsed) {
    throw new Error("Could not parse monster statblock from active browser tab.");
  }
  return parsed;
}

// Backward-compatible alias
export const syncActiveMonsterFromBrave = syncActiveMonsterFromBrowser;

/**
 * Fetches a monster from D&D Beyond using multi-tier fallbacks:
 * 1. Local Browser Bridge (uses your authenticated browser session with book entitlements)
 * 2. Proxy /api/ddb-monsters (Vite dev server or Vercel serverless proxy)
 * 3. Public CORS proxies
 */
export async function fetchDdbMonsterByUrl(input: string): Promise<MonsterStatblock> {
  const slug = extractDdbMonsterSlug(input);
  if (!slug) {
    throw new Error("Invalid D&D Beyond monster link. Expected format: https://www.dndbeyond.com/monsters/16907-goblin or slug.");
  }

  const ddbUrl = `https://www.dndbeyond.com/monsters/${slug}`;
  const origin = typeof window !== "undefined" && window.location?.origin ? window.location.origin : "http://localhost:5173";
  const isLocalHost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".local"));

  // Tier 1: Try Browser Bridge if on localhost (has user's full login and purchased books in Chrome, Brave, or Edge!)
  if (isLocalHost) {
    try {
      const bridgeRes = await fetch(`${origin}/api/browser/fetch-monster?url=${encodeURIComponent(ddbUrl)}`);
      if (bridgeRes.ok) {
        const data = await bridgeRes.json();
        if (data.html) {
          const parsed = parseDdbMonsterHtml(data.html, ddbUrl);
          if (parsed) {
            return parsed;
          }
        }
      }
    } catch {
      // Fall back to proxies if browser bridge is offline
    }
  }

  const localProxy = `${origin}/api/ddb-monsters/monsters/${slug}`;
  const candidates = [
    localProxy,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(ddbUrl)}`,
    `https://corsproxy.io/?url=${encodeURIComponent(ddbUrl)}`,
  ];

  let lastError: Error | null = null;

  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        headers: {
          Accept: "text/html,application/xhtml+xml",
        },
      });

      if (res.ok) {
        const text = await res.text();
        const parsed = parseDdbMonsterHtml(text, ddbUrl);
        if (parsed) {
          return parsed;
        }
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  throw new Error(
    `Failed to fetch monster from D&D Beyond (${slug}). ` +
      (lastError ? lastError.message : "CORS or book permission blocked. You can open the monster in your browser and click 'Sync from Browser Tab'.")
  );
}
