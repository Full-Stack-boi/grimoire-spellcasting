import OBR from "@owlbear-rodeo/sdk";
import type { DDBParsedCharacter, DDBWeaponAttack, DDBParsedSpell } from "../../../types/ddb";
import { getTokenVitals, setTokenVitals } from "../tokenVitalsService";
import { doubleDiceFormula, rollDamageDDB } from "../../../utils/dice";

export type CombatTriggerEvent = "on_critical_hit" | "on_target_defeated";

export interface CombatEventContext {
  character?: DDBParsedCharacter;
  casterTokenId?: string;
  targetTokenId?: string;
  targetName?: string;
  weapon?: DDBWeaponAttack;
  spell?: DDBParsedSpell;
  damageDiceRoll?: number;
  damageTotal?: number;
  isCritical?: boolean;
  onGrantTempHp?: (amount: number) => void;
}

export interface CombatFeatureTriggerResult {
  featureId: string;
  featureName: string;
  tempHpGranted?: number;
  message: string;
}

export interface CombatFeatureDefinition {
  id: string;
  name: string;
  description: string;
  events: CombatTriggerEvent[];
  /** Predicate to check if the character has this feature (data-driven lookup across actions, feats, options, and classes) */
  isGrantedToCharacter: (character: DDBParsedCharacter) => boolean;
  /** Optional filter to restrict trigger to specific weapon types */
  weaponMatches?: (weapon: DDBWeaponAttack, character: DDBParsedCharacter) => boolean;
  /** Execute the hook and compute the effect */
  execute: (context: CombatEventContext, event: CombatTriggerEvent) => Promise<CombatFeatureTriggerResult | null> | CombatFeatureTriggerResult | null;
}

/**
 * Checks whether a character has a feature, option, feat, action, or classFeature NAME matching the given pattern.
 * Intentionally does NOT match description/snippet prose to prevent false positives
 * (e.g. Monster Hunter's Monster Grimoire listing "Fiends", or Tiefling "Fiendish Legacy" description).
 */
export function hasCharacterFeature(
  character: DDBParsedCharacter,
  pattern: RegExp | string,
  options?: { matchSubclass?: boolean },
): boolean {
  if (!character) return false;
  const regex = typeof pattern === "string" ? new RegExp(pattern, "i") : pattern;
  const matchSubclass = options?.matchSubclass ?? true;

  if (character.actions?.some(a => Boolean(a?.name && regex.test(a.name)))) {
    return true;
  }
  if (character.feats?.some(f => Boolean(f?.name && regex.test(f.name)))) {
    return true;
  }
  if (character.options?.some(o => Boolean(o?.name && regex.test(o.name)))) {
    return true;
  }
  if (
    matchSubclass &&
    character.classes?.some(c => (c.subclass && regex.test(c.subclass)) || regex.test(c.name))
  ) {
    return true;
  }
  if (character.classFeatures && typeof character.classFeatures === "object") {
    for (const [key, value] of Object.entries(character.classFeatures)) {
      if (regex.test(key)) return true;
      if (Array.isArray(value)) {
        for (const entry of value) {
          const entryName =
            typeof entry === "string"
              ? entry
              : entry && typeof entry === "object" && "name" in entry && typeof (entry as { name?: unknown }).name === "string"
                ? (entry as { name: string }).name
                : "";
          if (entryName && regex.test(entryName)) return true;
        }
      }
    }
  }
  return false;
}

/**
 * Checks whether a character has a specific class + subclass combination with level >= minLevel.
 */
export function hasClassSubclass(
  character: DDBParsedCharacter,
  classPattern: RegExp | string,
  subclassPattern: RegExp | string,
  minLevel = 1,
): boolean {
  if (!character?.classes) return false;
  const classRegex = typeof classPattern === "string" ? new RegExp(classPattern, "i") : classPattern;
  const subRegex = typeof subclassPattern === "string" ? new RegExp(subclassPattern, "i") : subclassPattern;
  return character.classes.some(
    c =>
      c.level >= minLevel &&
      classRegex.test(c.name) &&
      Boolean(c.subclass && subRegex.test(c.subclass)),
  );
}

/**
 * Pure helper to extract damage dice count & faces without modifier (e.g. "1d12+4" -> "1d12", "2d6+3" -> "2d6").
 */
export function extractBaseDiceFormula(damageStr?: string): string {
  if (!damageStr) return "1d6";
  const match = damageStr.match(/^(\d+d\d+)/i);
  return match ? match[1] : damageStr.split("+")[0].split("-")[0].trim();
}

/**
 * Dark One's Blessing:
 * When you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to
 * your Charisma modifier + your warlock level (minimum of 1).
 */
export const darkOnesBlessingFeature: CombatFeatureDefinition = {
  id: "dark_ones_blessing",
  name: "Dark One's Blessing",
  description: "Gain Temp HP equal to Warlock Level + CHA modifier when reducing a creature to 0 HP.",
  events: ["on_target_defeated"],
  isGrantedToCharacter: (char: DDBParsedCharacter) => {
    return (
      hasCharacterFeature(char, /\bdark one'?s blessing\b/i, { matchSubclass: false }) ||
      hasClassSubclass(char, /\bwarlock\b/i, /\bfiend\b/i, 1)
    );
  },
  execute: (context: CombatEventContext) => {
    if (!context.character) return null;
    const warlockClass = context.character.classes?.find(c => /\bwarlock\b/i.test(c.name));
    if (
      !warlockClass &&
      !hasCharacterFeature(context.character, /\bdark one'?s blessing\b/i, { matchSubclass: false })
    ) {
      return null;
    }
    const warlockLevel = warlockClass?.level ?? context.character.level;
    const chaMod = context.character.modifiers?.cha ?? 0;
    const tempHp = Math.max(1, warlockLevel + chaMod);

    return {
      featureId: "dark_ones_blessing",
      featureName: "Dark One's Blessing",
      tempHpGranted: tempHp,
      message: `Dark One's Blessing: Gained ${tempHp} Temporary HP from defeating enemy!`,
    };
  },
};

/**
 * Parasitic Leech:
 * When you score a critical hit with your parasitic weapon or reduce a creature to 0 hit points with it,
 * you gain temporary hit points equal to the number rolled on the weapon's damage dice.
 */
export const parasiticLeechFeature: CombatFeatureDefinition = {
  id: "parasitic_leech",
  name: "Parasitic Leech",
  description: "Gain Temp HP equal to rolled damage dice on Critical Hit or when reducing a creature to 0 HP with Parasitic Weapon.",
  events: ["on_critical_hit", "on_target_defeated"],
  isGrantedToCharacter: (char: DDBParsedCharacter) => {
    return hasCharacterFeature(char, /\bparasitic leech\b/i, { matchSubclass: false });
  },
  weaponMatches: (weapon: DDBWeaponAttack) => {
    const wName = (weapon.name || "").toLowerCase();
    const props = (weapon.properties || []).map(p => p.toLowerCase());
    return (
      wName.includes("parasitic") ||
      wName.includes("pact") ||
      props.some(p => p.includes("parasitic") || p.includes("pact"))
    );
  },
  execute: (context: CombatEventContext, event: CombatTriggerEvent) => {
    let diceRoll = context.damageDiceRoll;
    if ((diceRoll === undefined || diceRoll <= 0) && context.weapon) {
      const baseDice = extractBaseDiceFormula(context.weapon.damage);
      const formulaToRoll = event === "on_critical_hit" ? doubleDiceFormula(baseDice) : baseDice;
      const rollRes = rollDamageDDB(formulaToRoll, context.weapon.damageType);
      diceRoll = rollRes.total;
    }
    const tempHp = Math.max(1, diceRoll || 1);
    const reason = event === "on_critical_hit" ? "Critical Hit" : "defeating enemy";

    return {
      featureId: "parasitic_leech",
      featureName: "Parasitic Leech",
      tempHpGranted: tempHp,
      message: `Parasitic Leech: Gained ${tempHp} Temporary HP from ${reason} with ${context.weapon?.name || "Parasitic Weapon"}!`,
    };
  },
};

/**
 * Data-Driven Combat Feature Registry.
 * Extensible for any future 5e/2024 or Grim Hollow triggers without hardcoding.
 */
export const COMBAT_FEATURE_REGISTRY: CombatFeatureDefinition[] = [
  parasiticLeechFeature,
  darkOnesBlessingFeature,
];

/**
 * Dispatches combat events to registered features and applies granted effects (e.g. Temp HP).
 */
export async function dispatchCombatFeatureTrigger(
  event: CombatTriggerEvent,
  context: CombatEventContext
): Promise<CombatFeatureTriggerResult[]> {
  let character = context.character;
  if (!character && context.casterTokenId) {
    try {
      if (OBR.isReady) {
        const items = await OBR.scene.items.getItems([context.casterTokenId]);
        if (items[0]) {
          const { resolveCasterCharacter } = await import("../../../services/ddbService");
          character = resolveCasterCharacter(items[0]) ?? undefined;
        }
      }
    } catch {}
  }
  if (!character) return [];

  const effectiveContext: CombatEventContext & { character: DDBParsedCharacter } = {
    ...context,
    character,
  };

  const matchingFeatures = COMBAT_FEATURE_REGISTRY.filter(feature => {
    if (!feature.events.includes(event)) return false;
    if (!feature.isGrantedToCharacter(character)) return false;
    if (context.weapon && feature.weaponMatches && !feature.weaponMatches(context.weapon, character)) {
      return false;
    }
    return true;
  });

  const results: CombatFeatureTriggerResult[] = [];

  for (const feature of matchingFeatures) {
    try {
      const result = await feature.execute(effectiveContext, event);
      if (!result) continue;

      results.push(result);

      // Apply Temporary HP to the caster's token vitals (non-stacking: keep highest)
      if (result.tempHpGranted && result.tempHpGranted > 0 && context.casterTokenId) {
        const vitals = await getTokenVitals(context.casterTokenId);
        const currentTemp = vitals?.hpTemp ?? 0;
        if (result.tempHpGranted > currentTemp) {
          await setTokenVitals(context.casterTokenId, { hpTemp: result.tempHpGranted });
        }
      }

      // Broadcast event for instant React UI sync in ActionDock and connected components
      if (result.tempHpGranted && result.tempHpGranted > 0) {
        try {
          const channel = new BroadcastChannel("embers-combat-events");
          channel.postMessage({
            type: "TEMP_HP_GRANTED",
            casterTokenId: context.casterTokenId,
            characterId: character.id,
            tempHp: result.tempHpGranted,
            featureId: feature.id,
            featureName: feature.name,
          });
          channel.close();
        } catch {}

        if (context.onGrantTempHp) {
          try {
            context.onGrantTempHp(result.tempHpGranted);
          } catch {}
        }
      }

      // Display OBR notification
      if (OBR.isReady && result.message) {
        OBR.notification.show(result.message, "SUCCESS");
      }
    } catch (err) {
      console.warn(`[CombatFeatureHooks] Error executing feature ${feature.id}:`, err);
    }
  }

  return results;
}
