import { ALL_MANUAL_OVERRIDES } from "./manual-formulas";
import type { SpellFormula } from "./manual-formulas";

export interface SpellMetadata {
    id: string;
    name: string;
    level: number; // 0 for Cantrip, 1-9
    school: "Abjuration" | "Conjuration" | "Divination" | "Enchantment" | "Evocation" | "Illusion" | "Necromancy" | "Transmutation";
    castingTime: string; // e.g. "1 Action", "1 Bonus Action", "1 Reaction"
    range: string; // e.g. "120 ft", "150 ft", "Touch", "Self (15 ft cone)"
    aoe?: string; // e.g. "20 ft radius Sphere", "15 ft Cone", "15 ft Cube", "100 ft Line"
    duration: string; // e.g. "Instantaneous", "1 minute (Concentration)", "8 hours"
    components: string; // e.g. "V, S", "V, S, M (bat guano and sulfur)"
    saveOrAttack?: string; // e.g. "DEX Save", "WIS Save", "Ranged Spell Attack", "Melee Spell Attack"
    damage?: string; // e.g. "8d6 Fire", "1d10 Force", "2d8 Radiant"
    damageType?: string; // e.g. "Fire", "Healing", "Radiant"
    concentration: boolean;
    ritual: boolean;
    description: string;
    higherLevels?: string;
    canUpcast?: boolean;
}

/**
 * Converts a manual spell formula (Single Source of Truth) into SpellMetadata.
 */
export function manualFormulaToSpellMetadata(manual: SpellFormula): SpellMetadata {
    const rawSchool = manual.category.school;
    const schoolFormatted = (
        rawSchool === "any"
            ? "Evocation"
            : (rawSchool.charAt(0).toUpperCase() + rawSchool.slice(1).toLowerCase())
    ) as SpellMetadata["school"];

    const baseDmg = manual.damage.find(d => d.isBase) || manual.damage[0];
    const isHealing =
        manual.damage.some(d => d.type === "healing") ||
        (manual.interaction?.type === "utility" && manual.damage.some(d => d.type === "healing")) ||
        manual.name.toLowerCase().includes("cure wounds") ||
        manual.name.toLowerCase().includes("healing word") ||
        manual.name.toLowerCase().includes("mass cure") ||
        manual.name.toLowerCase().includes("mass healing") ||
        manual.name.toLowerCase().includes("prayer of healing") ||
        manual.name.toLowerCase().includes("power word heal") ||
        manual.name.toLowerCase().includes("revivify") ||
        manual.name.toLowerCase().includes("aid") ||
        manual.name.toLowerCase() === "heal";

    let damageFormatted: string | undefined = undefined;
    let damageType: string | undefined = undefined;

    if (baseDmg) {
        if (baseDmg.type === "healing" || isHealing) {
            damageType = "Healing";
            const modSuffix = baseDmg.addSpellcastingModifier ? " + Spellcasting Mod HP" : " HP";
            damageFormatted = `${baseDmg.dice}${modSuffix}`;
        } else if (baseDmg.dice && baseDmg.dice !== "0") {
            const typeStr = baseDmg.type.charAt(0).toUpperCase() + baseDmg.type.slice(1).toLowerCase();
            damageType = typeStr;
            const modSuffix = baseDmg.addSpellcastingModifier ? " + Mod" : "";
            damageFormatted = `${baseDmg.dice}${modSuffix} ${typeStr}`;
        }
    } else if (isHealing) {
        damageType = "Healing";
        damageFormatted = "Special Healing";
    }

    let saveOrAttack: string | undefined = undefined;
    if (isHealing) {
        saveOrAttack = "None (Healing)";
    } else if (manual.interaction?.type === "save") {
        saveOrAttack = `${manual.interaction.saveAbility ?? "DEX"} Save DC`;
    } else if (manual.interaction?.type === "spell_attack") {
        saveOrAttack = "Ranged Spell Attack";
    } else if (manual.interaction?.type === "melee_spell_attack") {
        saveOrAttack = "Melee Spell Attack";
    } else if (manual.interaction?.type === "weapon_based") {
        saveOrAttack = "Weapon Attack";
    }

    const aoeFormatted = manual.area ? `${manual.area.sizeFeet} ft ${manual.area.shape}` : undefined;

    return {
        id: manual.id,
        name: manual.name,
        level: manual.category.level,
        school: schoolFormatted || "Evocation",
        castingTime: manual.casting.time,
        range: manual.casting.range,
        aoe: aoeFormatted,
        duration: manual.casting.duration,
        components: manual.casting.components,
        saveOrAttack,
        damage: damageFormatted,
        damageType,
        concentration: manual.category.concentration,
        ritual: manual.category.ritual,
        description: manual.notes || manual.effectNotes?.join(" ") || `Sparks and arcane energies concentrate at your command, creating a magical effect on the target.`,
        higherLevels: manual.upcasting?.notes,
        canUpcast: Boolean(manual.upcasting),
    };
}

/**
 * Builds the comprehensive SPELL_INFO_MAP dynamically from all verified manual formulas (Single Source of Truth).
 */
export function buildSpellInfoMapFromManualFormulas(): Record<string, SpellMetadata> {
    const map: Record<string, SpellMetadata> = {};
    for (const [id, formula] of Object.entries(ALL_MANUAL_OVERRIDES)) {
        if (!formula) continue;
        const meta = manualFormulaToSpellMetadata(formula);
        map[id] = meta;
        const normalizedKey = id.toLowerCase().replace(/[^a-z0-9_]/g, "");
        if (normalizedKey && !map[normalizedKey]) {
            map[normalizedKey] = meta;
        }
    }
    return map;
}

export const SPELL_INFO_MAP: Record<string, SpellMetadata> = buildSpellInfoMapFromManualFormulas();

/**
 * Set of all spell IDs in D&D 5e / BG3 that scale with higher spell slots or can be upcast.
 */
export const UPCASTABLE_SPELLS = new Set<string>([
    // Level 1
    "arms_of_hadar",
    "bless",
    "burning_hands",
    "cure_wounds",
    "divine_smite",
    "fog_cloud",
    "guiding_bolt",
    "hex",
    "hunters_mark",
    "ice_knife",
    "magic_missiles",
    "sleep",
    "thunderwave",
    "witch_bolt",

    // Level 2
    "cloud_of_daggers",
    "flaming_sphere",
    "hold_person",
    "moonbeam",
    "scorching_ray",
    "shatter",
    "spiritual_weapon",

    // Level 3
    "call_lightning",
    "fireball",
    "lightning_bolt",
    "spirit_guardians",
    "thunder_step",

    // Level 4
    "banishment",
    "wall_of_fire",

    // Level 5
    "arcane_hand",
    "cloudkill",
    "cone_of_cold",

    // Level 6
    "chain_lightning",
    "disintegrate"
]);

/**
 * Checks whether a spell can be upcast or cast using alternative spell slots.
 * Returns false for Cantrips (Level 0) and spells without higher-slot scaling (e.g. Misty Step, Shield, Darkness).
 */
export function isSpellUpcastable(spellID: string, meta?: SpellMetadata): boolean {
    const key = spellID.toLowerCase().replace(/[^a-z0-9_]/g, "");

    // 1. Check Single Source of Truth
    const manual = ALL_MANUAL_OVERRIDES[spellID] ?? ALL_MANUAL_OVERRIDES[key];
    if (manual) {
        if (manual.category.level === 0) return false;
        return Boolean(manual.upcasting);
    }
    
    // 2. Check known upcastable list
    for (const id of UPCASTABLE_SPELLS) {
        if (key.includes(id) || id.includes(key)) {
            return true;
        }
    }

    const m = meta || getSpellMetadata(spellID);
    if (m.level === 0) return false;
    if (m.canUpcast !== undefined) return m.canUpcast;

    if (m.higherLevels) {
        const text = m.higherLevels.toLowerCase();
        return text.includes("slot level") || text.includes("spell slot of");
    }

    return false;
}

const dynamicSpellRegistry = new Map<string, SpellMetadata>();

/**
 * Registers dynamically loaded spell metadata (e.g. from D&D Beyond character sync).
 * If ownerCharacterId is provided, scopes the registration to that specific character
 * while keeping global fallback, preventing multiple characters with the same spell
 * from overwriting each other's custom damage, DC, or upcast rules.
 */
export function registerDynamicSpell(meta: SpellMetadata, ownerCharacterId?: number | string): void {
    const key = meta.id.toLowerCase().replace(/[^a-z0-9_]/g, "");
    const nameKey = meta.name.toLowerCase().replace(/[^a-z0-9_]/g, "");

    if (ownerCharacterId != null) {
        const ownerPrefix = `${ownerCharacterId}:`;
        dynamicSpellRegistry.set(ownerPrefix + key, meta);
        if (nameKey) dynamicSpellRegistry.set(ownerPrefix + nameKey, meta);
    }

    dynamicSpellRegistry.set(key, meta);
    if (nameKey) dynamicSpellRegistry.set(nameKey, meta);
}

/**
 * Registers a list of dynamically loaded spell metadata.
 */
export function registerDynamicSpells(metas: SpellMetadata[], ownerCharacterId?: number | string): void {
    for (const m of metas) {
        registerDynamicSpell(m, ownerCharacterId);
    }
}

/**
 * Resolves spell metadata by ID or fallback to standard values.
 * Dynamically resolves from Single Source of Truth (manual formulas), D&D Beyond character sync, or dynamic registry.
 * Scoped by ownerCharacterId to prevent cross-character spell data collisions.
 */
export function getSpellMetadata(
    spellID: string,
    spellNameOrOwnerId?: string | number,
    ownerCharacterId?: number | string
): SpellMetadata {
    let spellName: string | undefined = undefined;
    let effectiveOwnerId = ownerCharacterId;

    if (typeof spellNameOrOwnerId === "number") {
        effectiveOwnerId = spellNameOrOwnerId;
    } else if (typeof spellNameOrOwnerId === "string") {
        spellName = spellNameOrOwnerId;
    }

    const key = spellID.toLowerCase().replace(/[^a-z0-9_]/g, "");
    const nameKey = spellName ? spellName.toLowerCase().replace(/[^a-z0-9_]/g, "") : "";

    // 0. Character-Scoped Dynamic in-memory registry (highest priority for character-specific spells)
    if (effectiveOwnerId != null) {
        const ownerPrefix = `${effectiveOwnerId}:`;
        if (dynamicSpellRegistry.has(ownerPrefix + key)) {
            return dynamicSpellRegistry.get(ownerPrefix + key)!;
        }
        if (nameKey && dynamicSpellRegistry.has(ownerPrefix + nameKey)) {
            return dynamicSpellRegistry.get(ownerPrefix + nameKey)!;
        }
    }

    // 1. Single Source of Truth: Manual Formula Catalog (571+ verified spells)
    const manual = ALL_MANUAL_OVERRIDES[spellID] ?? ALL_MANUAL_OVERRIDES[key] ?? (nameKey ? ALL_MANUAL_OVERRIDES[nameKey] : undefined);
    if (manual) {
        return manualFormulaToSpellMetadata(manual);
    }

    // 2. Direct match in built-in dynamic SPELL_INFO_MAP
    if (SPELL_INFO_MAP[spellID]) {
        return SPELL_INFO_MAP[spellID];
    }
    for (const [id, meta] of Object.entries(SPELL_INFO_MAP)) {
        if (key === id || nameKey === id) {
            return meta;
        }
    }

    // 3. Global in-memory dynamic registry fallback
    if (dynamicSpellRegistry.has(key)) {
        return dynamicSpellRegistry.get(key)!;
    }
    if (nameKey && dynamicSpellRegistry.has(nameKey)) {
        return dynamicSpellRegistry.get(nameKey)!;
    }

    // 4. Dynamic lookup from cached D&D Beyond characters in localStorage
    if (typeof window !== "undefined" && window.localStorage) {
        try {
            // If effectiveOwnerId is specified, search the owner's cache first!
            const storageKeys: string[] = [];
            if (effectiveOwnerId != null) {
                for (let i = 0; i < localStorage.length; i++) {
                    const storageKey = localStorage.key(i);
                    if (storageKey && storageKey.includes(String(effectiveOwnerId))) {
                        storageKeys.unshift(storageKey);
                    }
                }
            }
            if (storageKeys.length === 0) {
                for (let i = 0; i < localStorage.length; i++) {
                    const storageKey = localStorage.key(i);
                    if (storageKey && (storageKey.includes("ddb-cache") || storageKey.startsWith("ddb_char_"))) {
                        storageKeys.push(storageKey);
                    }
                }
            }

            for (const storageKey of storageKeys) {
                const raw = localStorage.getItem(storageKey);
                if (raw) {
                    const char = JSON.parse(raw);
                    if (char && Array.isArray(char.spells)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const found = char.spells.find((s: any) => {
                            if (!s) return false;
                            const sKey = (s.id || "").toLowerCase().replace(/[^a-z0-9_]/g, "");
                            const sNameKey = (s.name || "").toLowerCase().replace(/[^a-z0-9_]/g, "");
                            return s.id === spellID
                                || sKey === key
                                || (nameKey && sNameKey === nameKey)
                                || sNameKey === key;
                        });
                        if (found) {
                            const meta: SpellMetadata = {
                                id: found.id,
                                name: found.name,
                                level: typeof found.level === "number" ? found.level : 0,
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                school: (found.school as any) || "Evocation",
                                castingTime: found.castingTime || "1 Action",
                                range: found.rangeText || (found.range ? `${found.range} ft` : "Self"),
                                aoe: found.aoe ? `${found.aoe.size} ft ${found.aoe.shape}` : undefined,
                                duration: found.duration || "Instantaneous",
                                components: found.components || "V, S",
                                concentration: Boolean(found.concentration),
                                ritual: Boolean(found.ritual),
                                damage: found.damage,
                                damageType: found.damageType,
                                saveOrAttack: found.saveOrAttack,
                                description: found.description || "",
                                higherLevels: found.higherLevels,
                                canUpcast: found.canUpcast
                            };
                            registerDynamicSpell(meta, char.id);
                            return meta;
                        }
                    }
                }
            }
        } catch {
            // LocalStorage errors ignored
        }
    }

    return {
        id: spellID,
        name: spellName || spellID.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        level: 1,
        school: "Evocation",
        castingTime: "1 Action",
        range: "60 ft",
        duration: "Instantaneous",
        components: "V, S",
        concentration: false,
        ritual: false,
        description: `Sparks and arcane energies concentrate at your command, creating a magical effect on the target.`
    };
}

/**
 * Returns color, gradient, and emoji for a school of magic.
 */
export function getSchoolStyle(school?: string): { emoji: string; gradient: string; color: string; schoolKey: string; iconUrl: string } {
    const s = school?.toLowerCase() || "";
    if (s.includes("evoc")) {
        return { emoji: "🔥", gradient: "linear-gradient(135deg, #7f1d1d 0%, #1e1b4b 100%)", color: "#f87171", schoolKey: "evocation", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/evocation.svg" };
    }
    if (s.includes("necro")) {
        return { emoji: "💀", gradient: "linear-gradient(135deg, #3b0764 0%, #09090b 100%)", color: "#c084fc", schoolKey: "necromancy", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/necromancy.svg" };
    }
    if (s.includes("abjur")) {
        return { emoji: "🛡️", gradient: "linear-gradient(135deg, #064e3b 0%, #0f172a 100%)", color: "#34d399", schoolKey: "abjuration", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/abjuration.svg" };
    }
    if (s.includes("conjur")) {
        return { emoji: "🌀", gradient: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)", color: "#60a5fa", schoolKey: "conjuration", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/conjuration.svg" };
    }
    if (s.includes("trans")) {
        return { emoji: "⚡", gradient: "linear-gradient(135deg, #78350f 0%, #1c1917 100%)", color: "#fbbf24", schoolKey: "transmutation", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/transmutation.svg" };
    }
    if (s.includes("enchant")) {
        return { emoji: "🔮", gradient: "linear-gradient(135deg, #831843 0%, #2e1065 100%)", color: "#f472b6", schoolKey: "enchantment", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/enchantment.svg" };
    }
    if (s.includes("illus")) {
        return { emoji: "🎭", gradient: "linear-gradient(135deg, #0e7490 0%, #1e1b4b 100%)", color: "#22d3ee", schoolKey: "illusion", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/illusion.svg" };
    }
    if (s.includes("divin")) {
        return { emoji: "👁️", gradient: "linear-gradient(135deg, #4338ca 0%, #1e1b4b 100%)", color: "#a5b4fc", schoolKey: "divination", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/divination.svg" };
    }
    return { emoji: "✦", gradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", color: "#fef08a", schoolKey: "evocation", iconUrl: "https://media.dndbeyond.com/media/spell-school-icons/evocation.svg" };
}

/**
 * Returns a 2-character abbreviation for a spell name (e.g. Eldritch Blast -> EB, Fireball -> FB).
 */
export function getSpellInitials(name: string): string {
    const words = name.replace(/[^a-zA-Z0-9\s]/g, "").trim().split(/\s+/);
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

/**
 * Formats a number to ordinal representation (1st, 2nd, 3rd, 4th, etc.)
 */
export function getOrdinal(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export interface ScaledSpellStats {
    level: number;
    damage?: string;
    description?: string;
    extraNote?: string;
}

/**
 * Calculates scaled spell statistics (damage, darts/rays, targets, radius) when cast at an upcast level.
 */
export function getScaledSpellStats(spellID: string, castLevel: number, meta?: SpellMetadata): ScaledSpellStats {
    const m = meta || getSpellMetadata(spellID);
    const baseLevel = m.level;
    if (castLevel <= baseLevel || !m.damage) {
        return {
            level: castLevel,
            damage: m.damage,
            description: m.description
        };
    }

    const diff = castLevel - baseLevel;
    const key = spellID.toLowerCase().replace(/[^a-z0-9_]/g, "");

    // Specific spell custom scaling rules
    if (key.includes("burning_hands")) {
        return { level: castLevel, damage: `${3 + diff}d6 Fire` };
    }
    if (key.includes("fireball")) {
        return { level: castLevel, damage: `${8 + diff}d6 Fire` };
    }
    if (key.includes("lightning_bolt")) {
        return { level: castLevel, damage: `${8 + diff}d6 Lightning` };
    }
    if (key.includes("thunderwave")) {
        return { level: castLevel, damage: `${2 + diff}d8 Thunder` };
    }
    // 2024 D&D: Cure Wounds is 2d8 base, +2d8 per level!
    if (key.includes("cure_wounds")) {
        return { level: castLevel, damage: `${2 + diff * 2}d8 + Spellcasting Mod HP` };
    }
    // 2024 D&D: Healing Word is 2d4 base, +2d4 per level!
    if (key.includes("healing_word")) {
        return { level: castLevel, damage: `${2 + diff * 2}d4 + Spellcasting Mod HP` };
    }
    if (key.includes("guiding_bolt")) {
        return { level: castLevel, damage: `${4 + diff}d6 Radiant` };
    }
    if (key.includes("magic_missile")) {
        return {
            level: castLevel,
            damage: `1d4 + 1 Force per dart (${3 + diff} darts)`,
            extraNote: `${3 + diff} glowing darts created`
        };
    }
    if (key.includes("scorching_ray")) {
        return {
            level: castLevel,
            damage: `2d6 Fire per ray (${3 + diff} rays)`,
            extraNote: `${3 + diff} fiery rays hurled`
        };
    }
    if (key.includes("shatter")) {
        return { level: castLevel, damage: `${3 + diff}d8 Thunder` };
    }
    if (key.includes("cone_of_cold")) {
        return { level: castLevel, damage: `${8 + diff}d8 Cold` };
    }
    if (key.includes("cloud_of_daggers")) {
        return { level: castLevel, damage: `${4 + diff * 2}d4 Slashing` };
    }
    if (key.includes("moonbeam")) {
        return { level: castLevel, damage: `${2 + diff}d10 Radiant` };
    }
    if (key.includes("call_lightning")) {
        return { level: castLevel, damage: `${3 + diff}d10 Lightning` };
    }
    if (key.includes("spirit_guardians")) {
        return { level: castLevel, damage: `${3 + diff}d8 Radiant or Necrotic` };
    }
    if (key.includes("spiritual_weapon")) {
        const bonus = Math.floor(diff / 2);
        return { level: castLevel, damage: `${1 + bonus}d8 + Spellcasting Mod Force` };
    }
    if (key.includes("wall_of_fire")) {
        return { level: castLevel, damage: `${5 + diff}d8 Fire` };
    }
    if (key.includes("disintegrate")) {
        return { level: castLevel, damage: `${10 + diff * 3}d6 + 40 Force` };
    }
    if (key.includes("divine_smite")) {
        const smiteDice = Math.min(5, 2 + diff);
        return { level: castLevel, damage: `${smiteDice}d8 Radiant` };
    }
    if (key.includes("sleep")) {
        return { level: castLevel, damage: `${5 + diff * 2}d8 HP pool` };
    }
    if (key.includes("ice_knife")) {
        return { level: castLevel, damage: `1d10 Piercing + ${2 + diff}d6 Cold` };
    }

    // Generic dice count increment regex: e.g. "3d6 Fire" -> "4d6 Fire"
    const match = m.damage.match(/^(\d+)(d\d+)(.*)$/);
    if (match) {
        const baseDice = parseInt(match[1], 10);
        const diceType = match[2];
        const rest = match[3];
        return {
            level: castLevel,
            damage: `${baseDice + diff}${diceType}${rest}`
        };
    }

    return {
        level: castLevel,
        damage: m.damage
    };
}
