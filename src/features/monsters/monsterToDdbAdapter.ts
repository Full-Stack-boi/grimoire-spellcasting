import type { Item } from "@owlbear-rodeo/sdk";
import type { MonsterStatblock, MonsterAction, MonsterSpellOption } from "./domain/types";
import type {
  DDBParsedCharacter,
  DDBWeaponAttack,
  DDBFeatureAction,
  DDBSavingThrow,
  DDBSkill,
} from "../../types/ddb";
import type { TokenVitals } from "../combat/domain/types";
import type { TokenVisionRules } from "../targeting/domain/vision";
import spellRecords from "../../assets/spells_record.json";
import { getSpellMetadata } from "../../assets/spellInfo";
import { normalizeSpellId } from "../../services/spellFormulaBuilder";

function isImageItem(item: any): item is { type: "IMAGE"; image: { url: string } } {
  return Boolean(item && item.type === "IMAGE" && item.image?.url);
}

export function resolveMonsterSpellOption(
  option: MonsterSpellOption,
  spellcastingAction?: MonsterAction,
): DDBParsedCharacter["spells"][number] | null {
  const normalizedId = normalizeSpellId(option.name);
  const spellId = Object.keys(spellRecords).find(
    (candidate) => normalizeSpellId(candidate) === normalizedId,
  );
  if (!spellId) return null;

  const metadata = getSpellMetadata(spellId, option.name);
  const interaction = metadata.saveOrAttack?.toLowerCase() || "";
  if (interaction.includes("save") && !spellcastingAction?.spellSaveDc) return null;
  if (interaction.includes("spell attack") && !spellcastingAction?.spellcastingAbility) return null;
  const damageMatch = metadata.damage?.match(/^(.+?)\s+([A-Za-z]+)$/);
  const rangeMatch = metadata.range.match(/(\d+)\s*ft/i);
  const range = rangeMatch ? Number(rangeMatch[1]) : 0;
  const aoeShapeMatch = metadata.aoe?.match(/\b(Sphere|Cone|Cube|Line)\b/i);
  const aoeSizeMatch = metadata.aoe?.match(/\d+/);
  const aoeShape = aoeShapeMatch?.[1];

  return {
    id: spellId,
    name: metadata.name,
    level: metadata.level,
    school: metadata.school,
    castingTime: metadata.castingTime,
    range,
    rangeText: metadata.range,
    aoe:
      aoeShape && aoeSizeMatch
        ? {
            shape: (aoeShape.charAt(0).toUpperCase() + aoeShape.slice(1).toLowerCase()) as
              | "Sphere"
              | "Cone"
              | "Cube"
              | "Line",
            size: Number(aoeSizeMatch[0]),
          }
        : undefined,
    duration: metadata.duration,
    components: metadata.components,
    concentration: metadata.concentration,
    ritual: metadata.ritual,
    damage: damageMatch?.[1],
    damageType: damageMatch?.[2],
    saveOrAttack: metadata.saveOrAttack,
    description: metadata.description,
    higherLevels: metadata.higherLevels,
    canUpcast: Boolean(metadata.canUpcast),
    isPrepared: true,
    usesSpellSlot: false,
    source: "custom",
    usePrimaryStat: true,
  };
}

/**
 * Generate a consistent, stable negative integer ID for a monster statblock.
 * Negative numbers ensure zero collision with positive D&D Beyond character IDs.
 */
export function hashMonsterId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const positive = Math.abs(hash) || 1;
  return -((positive % 900000000) + 100000000);
}

/**
 * Parse speed string (e.g. "30 ft., fly 60 ft.") to get primary numeric speed.
 */
export function parseWalkSpeed(speedText: string): number {
  if (!speedText) return 30;
  const match = speedText.match(/(\d+)\s*ft/i);
  return match ? parseInt(match[1], 10) : 30;
}

/**
 * Parse senses string (e.g. "Darkvision 60 ft., Blindsight 30 ft., Passive Perception 14")
 * into TokenVisionRules for line-of-sight and vision computations.
 */
export function parseMonsterSenses(sensesText?: string): TokenVisionRules {
  const result: TokenVisionRules = {};

  if (!sensesText) return result;

  const dvMatch = sensesText.match(/darkvision\s+(\d+)\s*ft/i);
  if (dvMatch) result.darkvision = parseInt(dvMatch[1], 10);

  const bsMatch = sensesText.match(/blindsight\s+(\d+)\s*ft/i);
  if (bsMatch) result.blindFighting = parseInt(bsMatch[1], 10);

  const tsMatch = sensesText.match(/truesight\s+(\d+)\s*ft/i);
  if (tsMatch) result.truesight = parseInt(tsMatch[1], 10);

  const tremorMatch = sensesText.match(/tremorsense\s+(\d+)\s*ft/i);
  if (tremorMatch) result.tremorsense = parseInt(tremorMatch[1], 10);

  return result;
}

/**
 * Maps a single monster action into a DDBWeaponAttack if it has an attack roll or weapon properties.
 */
export function monsterActionToWeaponAttack(
  action: MonsterAction,
  idx: number,
  monster: MonsterStatblock
): DDBWeaponAttack | null {
  const isAttack =
    action.type === "melee_attack" ||
    action.type === "ranged_attack" ||
    typeof action.attackBonus === "number";

  if (!isAttack) return null;

  const isRanged = action.type === "ranged_attack" || Boolean(action.rangeFeet);
  const reachFeet = !isRanged ? (action.reachFeet || 5) : undefined;
  const rangeFeet = isRanged ? (action.rangeFeet || 60) : (action.reachFeet || 5);

  const strMod = Math.floor((monster.stats.str - 10) / 2);
  const dexMod = Math.floor((monster.stats.dex - 10) / 2);
  const defaultBonus = (isRanged ? dexMod : strMod) + monster.proficiencyBonus;

  return {
    id: action.id ? `monster_weapon_${action.id}` : `monster_weapon_${idx}`,
    name: action.name,
    type: isRanged ? "ranged" : "melee",
    subtype: action.damageType || (isRanged ? "Ranged" : "Melee"),
    rangeText: isRanged
      ? `${action.rangeFeet || 60}${action.rangeLongFeet ? `/${action.rangeLongFeet}` : ""} ft`
      : `${action.reachFeet || 5} ft`,
    rangeFeet,
    longRangeFeet: action.rangeLongFeet,
    reachFeet,
    toHit: action.attackBonus !== undefined ? action.attackBonus : defaultBonus,
    damage: action.damage || "1d4",
    damageType: action.damageType || "slashing",
    properties: [isRanged ? "Ranged" : "Melee"],
  };
}

/**
 * Translates a MonsterStatblock, token Item, and live TokenVitals into a fully compliant
 * DDBParsedCharacter adapter object for the Grimoire ActionDock.
 */
export function monsterToDdbCharacter(
  monster: MonsterStatblock,
  item?: Item | null,
  vitals?: TokenVitals | null
): DDBParsedCharacter {
  // Generate instance-unique numeric ID if token item is present, preventing swarms of identical monsters from colliding in combat state
  const instanceKey = item?.id ? `${monster.id}:${item.id}` : monster.id;
  const numericId = hashMonsterId(instanceKey);

  const strMod = Math.floor((monster.stats.str - 10) / 2);
  const dexMod = Math.floor((monster.stats.dex - 10) / 2);
  const conMod = Math.floor((monster.stats.con - 10) / 2);
  const intMod = Math.floor((monster.stats.int - 10) / 2);
  const wisMod = Math.floor((monster.stats.wis - 10) / 2);
  const chaMod = Math.floor((monster.stats.cha - 10) / 2);

  // Derive Avatar URL from token image if present
  let avatarUrl = "";
  if (item && isImageItem(item)) {
    avatarUrl = item.image.url;
  }

  // Parse weapons from actions
  const weapons: DDBWeaponAttack[] = [];
  monster.actions.forEach((act, idx) => {
    const wp = monsterActionToWeaponAttack(act, idx, monster);
    if (wp) weapons.push(wp);
  });

  // If monster has no attack actions, add an unarmed strike
  if (weapons.length === 0) {
    weapons.push({
      id: "monster_unarmed_strike",
      name: "Unarmed Strike",
      type: "melee",
      subtype: "Melee",
      rangeText: "5 ft",
      rangeFeet: 5,
      reachFeet: 5,
      toHit: strMod + monster.proficiencyBonus,
      damage: `1+${Math.max(0, strMod)}`,
      damageType: "bludgeoning",
      properties: ["Melee"],
    });
  }

  // Map non-weapon actions, traits, bonus actions, reactions, and legendary actions into features
  const actions: DDBFeatureAction[] = [];
  const spells = monster.actions.flatMap((action) =>
    (action.spellOptions || []).flatMap((option) => {
      const spell = resolveMonsterSpellOption(option, action);
      return spell ? [spell] : [];
    }),
  );

  // 1. Special Traits
  if (monster.traits && Array.isArray(monster.traits)) {
    monster.traits.forEach((tr, idx) => {
      actions.push({
        id: `trait_${idx}_${tr.name.toLowerCase().replace(/\s+/g, "_")}`,
        name: tr.name,
        source: "race",
        activationType: "none",
        description: tr.description,
        rawDescription: tr.description,
      });
    });
  }

  // 2. All Monster Actions (including Multiattack, Breath Weapons, Spells)
  monster.actions.forEach((act, idx) => {
    actions.push({
      id: `action_${idx}_${act.name.toLowerCase().replace(/\s+/g, "_")}`,
      name: act.name,
      source: "class",
      activationType: "action",
      description: act.description,
      rawDescription: act.description,
      rangeText: act.rangeFeet ? `${act.rangeFeet} ft` : (act.reachFeet ? `${act.reachFeet} ft` : undefined),
    });
  });

  // 3. Bonus Actions
  if (monster.bonusActions && Array.isArray(monster.bonusActions)) {
    monster.bonusActions.forEach((ba, idx) => {
      actions.push({
        id: `bonus_${idx}_${ba.name.toLowerCase().replace(/\s+/g, "_")}`,
        name: ba.name,
        source: "class",
        activationType: "bonus",
        description: ba.description,
        rawDescription: ba.description,
      });
    });
  }

  // 4. Reactions
  if (monster.reactions && Array.isArray(monster.reactions)) {
    monster.reactions.forEach((rx, idx) => {
      actions.push({
        id: `reaction_${idx}_${rx.name.toLowerCase().replace(/\s+/g, "_")}`,
        name: rx.name,
        source: "class",
        activationType: "reaction",
        description: rx.description,
        rawDescription: rx.description,
      });
    });
  }

  // 5. Legendary Actions
  if (monster.legendaryActions && Array.isArray(monster.legendaryActions)) {
    monster.legendaryActions.forEach((la, idx) => {
      actions.push({
        id: `legendary_${idx}_${la.name.toLowerCase().replace(/\s+/g, "_")}`,
        name: la.name,
        source: "feat",
        activationType: "special",
        description: la.description,
        rawDescription: la.description,
      });
    });
  }

  // Map saving throws
  const makeSave = (stat: "str" | "dex" | "con" | "int" | "wis" | "cha", mod: number): DDBSavingThrow => {
    const override = monster.savingThrows?.[stat];
    const isProf = typeof override === "number";
    return {
      ability: stat,
      label: stat.toUpperCase(),
      bonus: typeof override === "number" ? override : mod,
      proficient: isProf,
    };
  };

  const savingThrows: Record<"str" | "dex" | "con" | "int" | "wis" | "cha", DDBSavingThrow> = {
    str: makeSave("str", strMod),
    dex: makeSave("dex", dexMod),
    con: makeSave("con", conMod),
    int: makeSave("int", intMod),
    wis: makeSave("wis", wisMod),
    cha: makeSave("cha", chaMod),
  };

  // Map skills if present
  const skills: DDBSkill[] = [];
  if (monster.skills) {
    for (const [skillName, bonus] of Object.entries(monster.skills)) {
      skills.push({
        key: skillName.toLowerCase(),
        name: skillName.charAt(0).toUpperCase() + skillName.slice(1),
        ability: "dex",
        abilityLabel: "DEX",
        bonus,
        proficient: true,
      });
    }
  }

  // Calculate HP and AC
  const avgHp = monster.hitPoints.average || 10;
  const currentHp = vitals?.hpCurrent ?? avgHp;
  const maxHp = vitals?.hpMax ?? avgHp;
  const tempHp = vitals?.hpTemp ?? 0;
  const armorClass = vitals?.armorClass ?? monster.armorClass;
  const spellcastingAbility = monster.actions.find((action) => action.spellcastingAbility)?.spellcastingAbility;
  const ddbSpellcastingAbility =
    spellcastingAbility === "int"
      ? "INT"
      : spellcastingAbility === "wis"
        ? "WIS"
        : spellcastingAbility === "cha"
          ? "CHA"
          : "NONE";
  const spellSaveDc =
    monster.actions.find((action) => action.spellSaveDc)?.spellSaveDc ??
    (8 + (monster.proficiencyBonus || 2) +
      (spellcastingAbility === "int"
        ? intMod
        : spellcastingAbility === "wis"
          ? wisMod
          : spellcastingAbility === "cha"
            ? chaMod
            : 0));
  const spellAttackAbilityMod =
    spellcastingAbility === "int"
      ? intMod
      : spellcastingAbility === "wis"
        ? wisMod
        : spellcastingAbility === "cha"
          ? chaMod
          : Math.max(intMod, wisMod, chaMod);

  const crNum = parseFloat(monster.challengeRating) || 1;
  const classLabel = `${monster.size} ${monster.type}${monster.subtype ? ` (${monster.subtype})` : ""} • CR ${monster.challengeRating}`;

  return {
    id: numericId,
    name: item?.name?.trim() ? item.name : monster.name,
    avatarUrl,
    level: Math.max(1, Math.floor(crNum)),
    classes: [
      {
        name: classLabel,
        level: Math.max(1, Math.floor(crNum)),
      },
    ],
    stats: { ...monster.stats },
    modifiers: {
      str: strMod,
      dex: dexMod,
      con: conMod,
      int: intMod,
      wis: wisMod,
      cha: chaMod,
    },
    proficiencyBonus: monster.proficiencyBonus || 2,
    spellCastingAbility: ddbSpellcastingAbility,
    spellSaveDC: spellSaveDc,
    spellSaveDCDisplay: `${spellSaveDc}`,
    spellAttackBonus: (monster.proficiencyBonus || 2) + spellAttackAbilityMod,
    spellAttackBonusDisplay: `+${(monster.proficiencyBonus || 2) + spellAttackAbilityMod}`,
    spellSlots: {},
    spells,
    weapons,
    actions,
    hp: {
      current: currentHp,
      max: maxHp,
      temp: tempHp,
    },
    armorClass,
    speed: parseWalkSpeed(monster.speed),
    initiative: dexMod,
    defenses: {
      resistances: vitals?.resistances ?? monster.damageResistances ?? [],
      immunities: vitals?.immunities ?? monster.damageImmunities ?? [],
      vulnerabilities: vitals?.vulnerabilities ?? monster.damageVulnerabilities ?? [],
      conditionImmunities: monster.conditionImmunities ?? [],
    },
    senses: parseMonsterSenses(monster.senses),
    savingThrows,
    skills,
    inventory: [],
    lastSynced: new Date().toISOString(),
  };
}
