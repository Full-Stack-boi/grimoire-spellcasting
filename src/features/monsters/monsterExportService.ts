import type { MonsterStatblock, MonsterAction } from "./domain/types";

/**
 * Format a number as a modifier string (e.g. +3 or -1).
 */
export function formatModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

/**
 * Serialize a MonsterStatblock to standard Grimoire JSON string.
 */
export function exportMonsterToJson(monster: MonsterStatblock): string {
  return JSON.stringify(monster, null, 2);
}

/**
 * Trigger a browser file download for a MonsterStatblock as a .json file.
 */
export function downloadMonsterJsonFile(monster: MonsterStatblock): void {
  try {
    const jsonStr = exportMonsterToJson(monster);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const sanitizedName = monster.name.toLowerCase().replace(/[^a-z0-9_-]/g, "_");
    const a = document.createElement("a");
    a.href = url;
    a.download = `monster_${sanitizedName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to download monster JSON file:", err);
  }
}

/**
 * Convert a MonsterAction into D&D Beyond Homebrew markup text.
 * Uses official DDB tooltip syntax:
 * [rollable]+5;{diceNotation:"1d20+5",rollType:"to hit"}[/rollable]
 * [rollable]2d6+3;{diceNotation:"2d6+3",rollType:"damage",rollAction:"Bite"}[/rollable]
 * [action]Attack Name[/action]
 */
export function formatActionForDdb(action: MonsterAction): string {
  const isAttack =
    action.type === "melee_attack" ||
    action.type === "ranged_attack" ||
    typeof action.attackBonus === "number";

  let out = `***${action.name}.*** `;

  if (isAttack) {
    const isRanged = action.type === "ranged_attack" || Boolean(action.rangeFeet);
    const attackTypeLabel = isRanged ? "Ranged Weapon Attack" : "Melee Weapon Attack";
    const bonus = action.attackBonus ?? 0;
    const bonusStr = bonus >= 0 ? `+${bonus}` : `${bonus}`;
    const toHitTag = `[rollable]${bonusStr};{diceNotation:"1d20${bonusStr}",rollType:"to hit"}[/rollable]`;

    let rangeStr = "";
    if (isRanged) {
      rangeStr = `range ${action.rangeFeet || 60}${action.rangeLongFeet ? `/${action.rangeLongFeet}` : ""} ft.`;
    } else {
      rangeStr = `reach ${action.reachFeet || 5} ft.`;
    }

    out += `*[action]${attackTypeLabel}[/action]:* ${toHitTag} to hit, ${rangeStr}, one target. `;

    if (action.damage) {
      const dmgType = action.damageType ? ` ${action.damageType.toLowerCase()}` : "";
      const dmgTag = `[rollable]${action.damage};{diceNotation:"${action.damage}",rollType:"damage",rollAction:"${action.name}"}[/rollable]`;
      out += `*Hit:* ${dmgTag}${dmgType} damage. `;
    }

    if (action.description) {
      // If the description has extra sentences after the standard attack hit line, append them
      const customDesc = action.description
        .replace(/^(Melee|Ranged) Weapon Attack:.*?(Hit:.*?damage\.)?/i, "")
        .trim();
      if (customDesc) {
        out += `${customDesc}`;
      }
    }
  } else {
    // Non-attack action (e.g. Multiattack, Breath Weapon, Roar, Spellcasting)
    let desc = action.description || "";

    // Convert damage dice in description to DDB rollable tags if not already converted
    if (action.damage && !desc.includes("[rollable]")) {
      const dmgTag = `[rollable]${action.damage};{diceNotation:"${action.damage}",rollType:"damage",rollAction:"${action.name}"}[/rollable]`;
      desc = desc.replace(new RegExp(`\\b${action.damage}\\b`, "g"), dmgTag);
    }

    // Convert DC save stats to DDB savingthrow tags
    if (action.saveDc && action.saveStat) {
      const fullStatMap: Record<string, string> = {
        str: "Strength",
        dex: "Dexterity",
        con: "Constitution",
        int: "Intelligence",
        wis: "Wisdom",
        cha: "Charisma",
      };
      const statLower = action.saveStat.toLowerCase();
      const fullStat = fullStatMap[statLower] || (action.saveStat.charAt(0).toUpperCase() + action.saveStat.slice(1));
      const pattern = `DC\\s*${action.saveDc}\\s*(?:${fullStat}|${action.saveStat})(?:\\s*(?:saving\\s*throw|save))?`;
      desc = desc.replace(
        new RegExp(pattern, "i"),
        `DC ${action.saveDc} [savingthrow]${fullStat}[/savingthrow] saving throw`
      );
    }

    out += desc;
  }

  return out.trim();
}

export interface DdbExportPackage {
  basicFields: {
    name: string;
    size: string;
    type: string;
    subtype: string;
    alignment: string;
    armorClass: number;
    armorDesc: string;
    hitPointsAverage: number;
    hitPointsFormula: string;
    speed: string;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    strMod: string;
    dexMod: string;
    conMod: string;
    intMod: string;
    wisMod: string;
    chaMod: string;
    challengeRating: string;
    proficiencyBonus: number;
    senses: string;
    languages: string;
    damageResistances: string;
    damageImmunities: string;
    damageVulnerabilities: string;
    conditionImmunities: string;
  };
  traitsText: string;
  actionsTextDdb: string;
  bonusActionsText: string;
  reactionsText: string;
  legendaryActionsText: string;
  fullMarkdownStatblock: string;
}

/**
 * Generate a complete package for D&D Beyond Homebrew monster fields and formatted text.
 */
export function formatMonsterForDdb(monster: MonsterStatblock): DdbExportPackage {
  const strMod = formatModifier(monster.stats.str);
  const dexMod = formatModifier(monster.stats.dex);
  const conMod = formatModifier(monster.stats.con);
  const intMod = formatModifier(monster.stats.int);
  const wisMod = formatModifier(monster.stats.wis);
  const chaMod = formatModifier(monster.stats.cha);

  // Format Traits
  const traitsText = (monster.traits || [])
    .map((tr) => `***${tr.name}.*** ${tr.description}`)
    .join("\n\n");

  // Format Actions with DDB Tooltip markup
  const actionsTextDdb = (monster.actions || [])
    .map(formatActionForDdb)
    .join("\n\n");

  // Format Bonus Actions
  const bonusActionsText = (monster.bonusActions || [])
    .map((ba) => `***${ba.name}.*** ${ba.description}`)
    .join("\n\n");

  // Format Reactions
  const reactionsText = (monster.reactions || [])
    .map((rx) => `***${rx.name}.*** ${rx.description}`)
    .join("\n\n");

  // Format Legendary Actions
  const legendaryActionsText = (monster.legendaryActions || [])
    .map((la) => `***${la.name}.*** ${la.description}`)
    .join("\n\n");

  // Build Full Markdown Statblock
  let fullMarkdown = `## ${monster.name}\n`;
  fullMarkdown += `*${monster.size} ${monster.type}${monster.subtype ? ` (${monster.subtype})` : ""}, ${monster.alignment}*\n\n`;
  fullMarkdown += `**Armor Class** ${monster.armorClass}${monster.armorDesc ? ` (${monster.armorDesc})` : ""}\n`;
  fullMarkdown += `**Hit Points** ${monster.hitPoints.average} (${monster.hitPoints.formula})\n`;
  fullMarkdown += `**Speed** ${monster.speed}\n\n`;

  fullMarkdown += `| STR | DEX | CON | INT | WIS | CHA |\n`;
  fullMarkdown += `|:---:|:---:|:---:|:---:|:---:|:---:|\n`;
  fullMarkdown += `| ${monster.stats.str} (${strMod}) | ${monster.stats.dex} (${dexMod}) | ${monster.stats.con} (${conMod}) | ${monster.stats.int} (${intMod}) | ${monster.stats.wis} (${wisMod}) | ${monster.stats.cha} (${chaMod}) |\n\n`;

  if (monster.damageVulnerabilities?.length) {
    fullMarkdown += `**Damage Vulnerabilities** ${monster.damageVulnerabilities.join(", ")}\n`;
  }
  if (monster.damageResistances?.length) {
    fullMarkdown += `**Damage Resistances** ${monster.damageResistances.join(", ")}\n`;
  }
  if (monster.damageImmunities?.length) {
    fullMarkdown += `**Damage Immunities** ${monster.damageImmunities.join(", ")}\n`;
  }
  if (monster.conditionImmunities?.length) {
    fullMarkdown += `**Condition Immunities** ${monster.conditionImmunities.join(", ")}\n`;
  }

  fullMarkdown += `**Senses** ${monster.senses}\n`;
  fullMarkdown += `**Languages** ${monster.languages}\n`;
  fullMarkdown += `**Challenge** ${monster.challengeRating} (Proficiency Bonus +${monster.proficiencyBonus})\n\n`;

  if (traitsText) {
    fullMarkdown += `### Traits\n${traitsText}\n\n`;
  }

  if (actionsTextDdb) {
    fullMarkdown += `### Actions\n${actionsTextDdb}\n\n`;
  }

  if (bonusActionsText) {
    fullMarkdown += `### Bonus Actions\n${bonusActionsText}\n\n`;
  }

  if (reactionsText) {
    fullMarkdown += `### Reactions\n${reactionsText}\n\n`;
  }

  if (legendaryActionsText) {
    fullMarkdown += `### Legendary Actions\n${legendaryActionsText}\n\n`;
  }

  return {
    basicFields: {
      name: monster.name,
      size: monster.size,
      type: monster.type,
      subtype: monster.subtype || "",
      alignment: monster.alignment,
      armorClass: monster.armorClass,
      armorDesc: monster.armorDesc || "",
      hitPointsAverage: monster.hitPoints.average,
      hitPointsFormula: monster.hitPoints.formula,
      speed: monster.speed,
      str: monster.stats.str,
      dex: monster.stats.dex,
      con: monster.stats.con,
      int: monster.stats.int,
      wis: monster.stats.wis,
      cha: monster.stats.cha,
      strMod,
      dexMod,
      conMod,
      intMod,
      wisMod,
      chaMod,
      challengeRating: monster.challengeRating,
      proficiencyBonus: monster.proficiencyBonus,
      senses: monster.senses,
      languages: monster.languages,
      damageResistances: monster.damageResistances?.join(", ") || "",
      damageImmunities: monster.damageImmunities?.join(", ") || "",
      damageVulnerabilities: monster.damageVulnerabilities?.join(", ") || "",
      conditionImmunities: monster.conditionImmunities?.join(", ") || "",
    },
    traitsText,
    actionsTextDdb,
    bonusActionsText,
    reactionsText,
    legendaryActionsText,
    fullMarkdownStatblock: fullMarkdown.trim(),
  };
}
