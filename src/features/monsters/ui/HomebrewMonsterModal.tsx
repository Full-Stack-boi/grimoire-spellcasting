import React, { useState } from "react";
import "./HomebrewMonsterModal.css";
import type { MonsterStatblock, MonsterAction, MonsterType } from "../domain/types";
import { saveCustomMonster, isDefaultMonster } from "../monsterService";
import { formatModifier } from "../monsterExportService";

const MONSTER_TYPES: MonsterType[] = [
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

const SIZES = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];

const CR_OPTIONS = [
  "0", "1/8", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "30"
];

export function calculateProficiencyBonus(cr: string): number {
  const numericCr = parseFloat(cr) || 0;
  if (numericCr <= 4) return 2;
  if (numericCr <= 8) return 3;
  if (numericCr <= 12) return 4;
  if (numericCr <= 16) return 5;
  if (numericCr <= 20) return 6;
  if (numericCr <= 24) return 7;
  if (numericCr <= 28) return 8;
  return 9;
}

export type StatKey = "str" | "dex" | "con" | "int" | "wis" | "cha";

export const STAT_KEYS: { key: StatKey; label: string }[] = [
  { key: "str", label: "STR" },
  { key: "dex", label: "DEX" },
  { key: "con", label: "CON" },
  { key: "int", label: "INT" },
  { key: "wis", label: "WIS" },
  { key: "cha", label: "CHA" },
];

export function formatSkills(skills?: Record<string, number>): string {
  if (!skills) return "";
  return Object.entries(skills)
    .map(([name, bonus]) => `${name} ${bonus >= 0 ? `+${bonus}` : bonus}`)
    .join(", ");
}

export function parseSkills(str: string): Record<string, number> | undefined {
  if (!str.trim()) return undefined;
  const result: Record<string, number> = {};
  const parts = str.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^([a-zA-Z\s]+?)\s*[:=]?\s*([+-]?\d+)$/);
    if (match) {
      const skillName = match[1].trim();
      const bonus = parseInt(match[2], 10);
      result[skillName.toLowerCase()] = bonus;
    } else {
      result[trimmed.toLowerCase()] = 0;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

interface HomebrewMonsterModalProps {
  onClose: () => void;
  onSave: (monster: MonsterStatblock) => void;
  initialMonster?: MonsterStatblock | null;
}

export const HomebrewMonsterModal: React.FC<HomebrewMonsterModalProps> = ({
  onClose,
  onSave,
  initialMonster,
}) => {
  // Basic info
  const [name, setName] = useState(initialMonster?.name || "");
  const [edition, setEdition] = useState<"2024" | "2014">(initialMonster?.edition === "2014" ? "2014" : "2024");
  const [size, setSize] = useState(initialMonster?.size || "Medium");
  const [type, setType] = useState<MonsterType>(initialMonster?.type || "Humanoid");
  const [subtype, setSubtype] = useState(initialMonster?.subtype || "");
  const [alignment, setAlignment] = useState(initialMonster?.alignment || "Neutral Evil");
  const [cr, setCr] = useState(initialMonster?.challengeRating || "1");

  // Proficiency Bonus (Auto-derived from CR with manual override)
  const [customProficiencyBonus, setCustomProficiencyBonus] = useState<number | null>(() => {
    if (
      initialMonster?.proficiencyBonus !== undefined &&
      initialMonster.proficiencyBonus !== calculateProficiencyBonus(initialMonster.challengeRating || "1")
    ) {
      return initialMonster.proficiencyBonus;
    }
    return null;
  });
  const proficiencyBonus = customProficiencyBonus ?? calculateProficiencyBonus(cr);

  // Vitals
  const [armorClass, setArmorClass] = useState<number>(initialMonster?.armorClass ?? 13);
  const [armorDesc, setArmorDesc] = useState(initialMonster?.armorDesc || "Natural Armor");
  const [hpAverage, setHpAverage] = useState<number>(initialMonster?.hitPoints.average ?? 22);
  const [hpFormula, setHpFormula] = useState(initialMonster?.hitPoints.formula || "4d8+4");
  const [speed, setSpeed] = useState(initialMonster?.speed || "30 ft.");

  // Ability Scores
  const [str, setStr] = useState<number>(initialMonster?.stats.str ?? 10);
  const [dex, setDex] = useState<number>(initialMonster?.stats.dex ?? 14);
  const [con, setCon] = useState<number>(initialMonster?.stats.con ?? 12);
  const [int, setInt] = useState<number>(initialMonster?.stats.int ?? 10);
  const [wis, setWis] = useState<number>(initialMonster?.stats.wis ?? 12);
  const [cha, setCha] = useState<number>(initialMonster?.stats.cha ?? 8);

  // Saving Throw Proficiencies
  const [savingThrowSettings, setSavingThrowSettings] = useState<
    Record<StatKey, { proficient: boolean; overrideBonus?: number }>
  >(() => {
    const initial: Record<StatKey, { proficient: boolean; overrideBonus?: number }> = {
      str: { proficient: false },
      dex: { proficient: false },
      con: { proficient: false },
      int: { proficient: false },
      wis: { proficient: false },
      cha: { proficient: false },
    };
    if (initialMonster?.savingThrows) {
      for (const { key } of STAT_KEYS) {
        if (initialMonster.savingThrows[key] !== undefined) {
          initial[key] = {
            proficient: true,
            overrideBonus: initialMonster.savingThrows[key],
          };
        }
      }
    }
    return initial;
  });

  // Skills
  const [skills, setSkills] = useState(formatSkills(initialMonster?.skills));

  // Senses & Defenses
  const [senses, setSenses] = useState(initialMonster?.senses || "Darkvision 60 ft., Passive Perception 11");
  const [languages, setLanguages] = useState(initialMonster?.languages || "Common");
  const [resistances, setResistances] = useState(initialMonster?.damageResistances?.join(", ") || "");
  const [immunities, setImmunities] = useState(initialMonster?.damageImmunities?.join(", ") || "");
  const [vulnerabilities, setVulnerabilities] = useState(initialMonster?.damageVulnerabilities?.join(", ") || "");
  const [conditionImmunities, setConditionImmunities] = useState(initialMonster?.conditionImmunities?.join(", ") || "");

  // Traits
  const [traits, setTraits] = useState<Array<{ name: string; description: string }>>(
    initialMonster?.traits || [{ name: "Nimble Escape", description: "The creature can take the Disengage or Hide action as a Bonus Action on each of its turns." }]
  );

  // Actions
  const [actions, setActions] = useState<MonsterAction[]>(
    initialMonster?.actions || [
      {
        id: "act_1",
        name: "Scimitar",
        type: "melee_attack",
        attackBonus: 4,
        reachFeet: 5,
        damage: "1d6+2",
        damageType: "Slashing",
        description: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.",
      },
      {
        id: "act_2",
        name: "Shortbow",
        type: "ranged_attack",
        attackBonus: 4,
        rangeFeet: 80,
        rangeLongFeet: 320,
        damage: "1d6+2",
        damageType: "Piercing",
        description: "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
      },
    ]
  );

  // Bonus Actions & Reactions
  const [bonusActions, setBonusActions] = useState<Array<{ name: string; description: string }>>(
    initialMonster?.bonusActions || []
  );
  const [reactions, setReactions] = useState<Array<{ name: string; description: string }>>(
    initialMonster?.reactions || []
  );
  const [legendaryActions, setLegendaryActions] = useState<Array<{ name: string; description: string }>>(
    initialMonster?.legendaryActions || []
  );

  const [validationError, setValidationError] = useState("");

  // Handle Preset Selection
  const applyPreset = (preset: "skirmisher" | "dragon_whelp" | "undead_brute" | "beast") => {
    if (preset === "skirmisher") {
      setName("Shadow Skirmisher");
      setSize("Small");
      setType("Humanoid");
      setSubtype("Goblinoid");
      setArmorClass(14);
      setArmorDesc("Leather Armor");
      setHpAverage(18);
      setHpFormula("4d6+4");
      setSpeed("30 ft.");
      setStr(8);
      setDex(16);
      setCon(12);
      setInt(10);
      setWis(12);
      setCha(8);
      setCr("1/2");
      setTraits([{ name: "Shadow Stealth", description: "While in dim light or darkness, can Hide as a Bonus Action." }]);
      setActions([
        {
          id: "act_preset_1",
          name: "Shadow Dagger",
          type: "melee_attack",
          attackBonus: 5,
          reachFeet: 5,
          damage: "1d4+3",
          damageType: "Piercing",
          description: "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 5 (1d4+3) piercing.",
        },
      ]);
    } else if (preset === "dragon_whelp") {
      setName("Flame Drake");
      setSize("Medium");
      setType("Dragon");
      setSubtype("");
      setArmorClass(15);
      setArmorDesc("Natural Armor");
      setHpAverage(38);
      setHpFormula("5d8+15");
      setSpeed("30 ft., fly 50 ft.");
      setStr(16);
      setDex(12);
      setCon(16);
      setInt(6);
      setWis(11);
      setCha(9);
      setCr("2");
      setResistances("Fire");
      setTraits([{ name: "Keen Senses", description: "Advantage on Perception checks." }]);
      setActions([
        {
          id: "act_preset_2",
          name: "Bite",
          type: "melee_attack",
          attackBonus: 5,
          reachFeet: 5,
          damage: "1d10+3",
          damageType: "Piercing",
          description: "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 8 (1d10+3) piercing + 3 (1d6) fire damage.",
        },
        {
          id: "act_preset_3",
          name: "Fire Breath",
          type: "ability",
          saveDc: 13,
          saveStat: "dex",
          damage: "4d6",
          damageType: "Fire",
          description: "Exhales fire in a 15-foot cone. Each creature must make a DC 13 Dex save, taking 14 (4d6) fire damage on a failed save, or half on a success.",
        },
      ]);
    } else if (preset === "undead_brute") {
      setName("Rotting Hulk");
      setSize("Large");
      setType("Undead");
      setArmorClass(12);
      setArmorDesc("Natural Armor");
      setHpAverage(59);
      setHpFormula("7d10+21");
      setSpeed("25 ft.");
      setStr(18);
      setDex(8);
      setCon(16);
      setInt(4);
      setWis(8);
      setCha(5);
      setCr("3");
      setImmunities("Poison");
      setConditionImmunities("Poisoned");
      setTraits([{ name: "Undead Fortitude", description: "If damage reduces it to 0 HP, make a Con save DC 5 + damage taken to drop to 1 HP instead." }]);
      setActions([
        {
          id: "act_preset_4",
          name: "Slam",
          type: "melee_attack",
          attackBonus: 6,
          reachFeet: 5,
          damage: "2d8+4",
          damageType: "Bludgeoning",
          description: "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 13 (2d8+4) bludgeoning.",
        },
      ]);
    }
  };

  // Trait helpers
  const handleAddTrait = () => {
    setTraits([...traits, { name: "New Trait", description: "Describe trait effect here." }]);
  };

  const handleUpdateTrait = (idx: number, field: "name" | "description", val: string) => {
    const next = [...traits];
    next[idx] = { ...next[idx], [field]: val };
    setTraits(next);
  };

  const handleRemoveTrait = (idx: number) => {
    setTraits(traits.filter((_, i) => i !== idx));
  };

  // Bonus Action helpers
  const handleAddBonusAction = () => {
    setBonusActions([...bonusActions, { name: "Bonus Action", description: "Describe bonus action effect here." }]);
  };

  const handleUpdateBonusAction = (idx: number, field: "name" | "description", val: string) => {
    const next = [...bonusActions];
    next[idx] = { ...next[idx], [field]: val };
    setBonusActions(next);
  };

  const handleRemoveBonusAction = (idx: number) => {
    setBonusActions(bonusActions.filter((_, i) => i !== idx));
  };

  // Reaction helpers
  const handleAddReaction = () => {
    setReactions([...reactions, { name: "Reaction", description: "Describe reaction trigger and effect here." }]);
  };

  const handleUpdateReaction = (idx: number, field: "name" | "description", val: string) => {
    const next = [...reactions];
    next[idx] = { ...next[idx], [field]: val };
    setReactions(next);
  };

  const handleRemoveReaction = (idx: number) => {
    setReactions(reactions.filter((_, i) => i !== idx));
  };

  // Legendary Action helpers
  const handleAddLegendaryAction = () => {
    setLegendaryActions([
      ...legendaryActions,
      { name: "Legendary Strike", description: "Costs 1 action. The creature makes a weapon attack." },
    ]);
  };

  const handleUpdateLegendaryAction = (idx: number, field: "name" | "description", val: string) => {
    const next = [...legendaryActions];
    next[idx] = { ...next[idx], [field]: val };
    setLegendaryActions(next);
  };

  const handleRemoveLegendaryAction = (idx: number) => {
    setLegendaryActions(legendaryActions.filter((_, i) => i !== idx));
  };

  // Action helpers
  const handleAddAction = (type: "melee_attack" | "ranged_attack" | "ability") => {
    const newAct: MonsterAction = {
      id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      name: type === "melee_attack" ? "Melee Strike" : type === "ranged_attack" ? "Ranged Shot" : "Special Ability",
      type,
      attackBonus: type !== "ability" ? 4 : undefined,
      reachFeet: type === "melee_attack" ? 5 : undefined,
      rangeFeet: type === "ranged_attack" ? 60 : undefined,
      damage: "1d8+2",
      damageType: "Slashing",
      description: "Hit: 6 (1d8+2) damage.",
    };
    setActions([...actions, newAct]);
  };

  const handleUpdateAction = (idx: number, field: keyof MonsterAction, val: any) => {
    const next = [...actions];
    next[idx] = { ...next[idx], [field]: val };
    setActions(next);
  };

  const handleRemoveAction = (idx: number) => {
    setActions(actions.filter((_, i) => i !== idx));
  };

  // Submit
  const handleSave = () => {
    setValidationError("");
    if (!name.trim()) {
      setValidationError("Monster name is required.");
      return;
    }
    if (initialMonster && isDefaultMonster(initialMonster)) {
      setValidationError("Default SRD monsters cannot be modified.");
      return;
    }

    const parseList = (str: string) =>
      str
        ? str
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const savingThrows: Record<string, number> = {};
    for (const { key } of STAT_KEYS) {
      const setting = savingThrowSettings[key];
      if (setting?.proficient) {
        const score =
          key === "str"
            ? str
            : key === "dex"
            ? dex
            : key === "con"
            ? con
            : key === "int"
            ? int
            : key === "wis"
            ? wis
            : cha;
        const abilityMod = Math.floor((score - 10) / 2);
        savingThrows[key] = setting.overrideBonus ?? (abilityMod + proficiencyBonus);
      }
    }

    const mergedActions: MonsterAction[] = actions
      .filter((a) => a.name.trim())
      .map((a) => {
        const existing = initialMonster?.actions?.find((ea) => ea.id === a.id);
        if (!existing) return a;
        return {
          ...existing,
          ...a,
        };
      });

    const newMonster: MonsterStatblock = {
      id: initialMonster?.id || `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: name.trim(),
      source: initialMonster?.source || "Custom Homebrew",
      edition,
      isLegacy: edition === "2014",
      size,
      type,
      subtype: subtype.trim() || undefined,
      alignment: alignment.trim(),
      armorClass,
      armorDesc: armorDesc.trim() || undefined,
      hitPoints: {
        average: hpAverage,
        formula: hpFormula.trim() || "2d8",
      },
      speed: speed.trim() || "30 ft.",
      stats: { str, dex, con, int, wis, cha },
      savingThrows: Object.keys(savingThrows).length > 0 ? savingThrows : undefined,
      skills: parseSkills(skills),
      damageResistances: parseList(resistances),
      damageImmunities: parseList(immunities),
      damageVulnerabilities: parseList(vulnerabilities),
      conditionImmunities: parseList(conditionImmunities),
      senses: senses.trim(),
      languages: languages.trim(),
      challengeRating: cr,
      proficiencyBonus,
      traits: traits.filter((t) => t.name.trim()),
      actions: mergedActions,
      bonusActions: bonusActions.filter((b) => b.name.trim()),
      reactions: reactions.filter((r) => r.name.trim()),
      legendaryActions: legendaryActions.filter((l) => l.name.trim()),
    };

    saveCustomMonster(newMonster);
    onSave(newMonster);
    onClose();
  };

  return (
    <div className="gm-modal-overlay" onClick={onClose}>
      <div className="gm-homebrew-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="gm-hb-header">
          <div className="gm-hb-title-group">
            <h3 className="gm-hb-title">
              {initialMonster ? `Edit Monster: ${initialMonster.name}` : "Create Homebrew Monster"}
            </h3>
            <span className="gm-hb-badge">
              {initialMonster ? "Statblock Editor" : "Homebrew Builder"}
            </span>
          </div>
          <button type="button" className="gm-hb-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Preset Starters */}
        <div className="gm-hb-presets-row">
          <span className="gm-hb-preset-label">Quick Presets:</span>
          <button type="button" className="gm-hb-preset-btn" onClick={() => applyPreset("skirmisher")}>
            Goblin Skirmisher
          </button>
          <button type="button" className="gm-hb-preset-btn" onClick={() => applyPreset("dragon_whelp")}>
            Flame Drake
          </button>
          <button type="button" className="gm-hb-preset-btn" onClick={() => applyPreset("undead_brute")}>
            Rotting Hulk
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="gm-hb-form-body">
          {validationError && <div className="gm-hb-error-banner">{validationError}</div>}

          {/* Section 1: Identity */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-title">1. Basic Identity</div>
            <div className="gm-hb-row">
              <div className="gm-hb-field flex-2">
                <label>Monster Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Shadow Stalker"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="gm-hb-field">
                <label>Rules Edition</label>
                <select value={edition} onChange={(e) => setEdition(e.target.value as any)}>
                  <option value="2024">2024</option>
                  <option value="2014">2014 (Legacy)</option>
                </select>
              </div>

              <div className="gm-hb-field">
                <label>Size</label>
                <select value={size} onChange={(e) => setSize(e.target.value as any)}>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="gm-hb-field">
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as any)}>
                  {MONSTER_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="gm-hb-row">
              <div className="gm-hb-field flex-1">
                <label>Subtype (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Goblinoid, Demon"
                  value={subtype}
                  onChange={(e) => setSubtype(e.target.value)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>Alignment</label>
                <input
                  type="text"
                  placeholder="e.g. Neutral Evil, Any Alignment"
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value)}
                />
              </div>

              <div className="gm-hb-field">
                <label>Challenge Rating (CR)</label>
                <select value={cr} onChange={(e) => setCr(e.target.value)}>
                  {CR_OPTIONS.map((c) => (
                    <option key={c} value={c}>CR {c}</option>
                  ))}
                </select>
              </div>

              <div className="gm-hb-field">
                <label className="gm-hb-prof-label">
                  <span>Prof. Bonus</span>
                  {customProficiencyBonus !== null && (
                    <button
                      type="button"
                      className="gm-hb-auto-btn"
                      title="Reset to CR default"
                      onClick={() => setCustomProficiencyBonus(null)}
                    >
                      Auto
                    </button>
                  )}
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={proficiencyBonus}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setCustomProficiencyBonus(isNaN(val) ? 2 : val);
                  }}
                  className={`gm-hb-prof-input ${customProficiencyBonus !== null ? "custom-override" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Vitals */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-title">2. Armor Class & Hit Points</div>
            <div className="gm-hb-row">
              <div className="gm-hb-field">
                <label>Armor Class (AC)</label>
                <input
                  type="number"
                  value={armorClass}
                  onChange={(e) => setArmorClass(parseInt(e.target.value, 10) || 10)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>Armor Type / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Natural Armor, Chain Mail"
                  value={armorDesc}
                  onChange={(e) => setArmorDesc(e.target.value)}
                />
              </div>

              <div className="gm-hb-field">
                <label>HP Average</label>
                <input
                  type="number"
                  value={hpAverage}
                  onChange={(e) => setHpAverage(parseInt(e.target.value, 10) || 10)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>HP Formula</label>
                <input
                  type="text"
                  placeholder="e.g. 8d8+16"
                  value={hpFormula}
                  onChange={(e) => setHpFormula(e.target.value)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>Speed</label>
                <input
                  type="text"
                  placeholder="e.g. 30 ft., fly 60 ft."
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Ability Scores & Saving Throws */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-title">3. Ability Scores & Saving Throws</div>
            <div className="gm-hb-stats-row">
              {[
                { label: "STR", val: str, set: setStr },
                { label: "DEX", val: dex, set: setDex },
                { label: "CON", val: con, set: setCon },
                { label: "INT", val: int, set: setInt },
                { label: "WIS", val: wis, set: setWis },
                { label: "CHA", val: cha, set: setCha },
              ].map(({ label, val, set }) => (
                <div key={label} className="gm-hb-stat-box">
                  <span className="gm-hb-stat-label">{label}</span>
                  <input
                    type="number"
                    className="gm-hb-stat-input"
                    value={val}
                    onChange={(e) => set(parseInt(e.target.value, 10) || 10)}
                  />
                  <span className="gm-hb-stat-mod">{formatModifier(val)}</span>
                </div>
              ))}
            </div>

            {/* Saving Throw Proficiencies Grid */}
            <div className="gm-hb-saves-container">
              <div className="gm-hb-saves-header">
                <span className="gm-hb-saves-title">Saving Throw Proficiencies</span>
                <span className="gm-hb-saves-hint">
                  Check to make proficient (adds Prof Bonus {proficiencyBonus >= 0 ? `+${proficiencyBonus}` : proficiencyBonus}). Or enter a custom save bonus.
                </span>
              </div>
              <div className="gm-hb-saves-grid">
                {STAT_KEYS.map(({ key, label }) => {
                  const score =
                    key === "str"
                      ? str
                      : key === "dex"
                      ? dex
                      : key === "con"
                      ? con
                      : key === "int"
                      ? int
                      : key === "wis"
                      ? wis
                      : cha;
                  const abilityMod = Math.floor((score - 10) / 2);
                  const isProf = savingThrowSettings[key]?.proficient ?? false;
                  const defaultBonus = abilityMod + proficiencyBonus;
                  const currentBonus = isProf
                    ? (savingThrowSettings[key]?.overrideBonus ?? defaultBonus)
                    : abilityMod;

                  return (
                    <div key={key} className={`gm-hb-save-box ${isProf ? "proficient" : ""}`}>
                      <div className="gm-hb-save-top">
                        <label className="gm-hb-save-check-label">
                          <input
                            type="checkbox"
                            checked={isProf}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setSavingThrowSettings((prev) => ({
                                ...prev,
                                [key]: {
                                  proficient: checked,
                                  overrideBonus: undefined,
                                },
                              }));
                            }}
                          />
                          <span className="gm-hb-save-label">{label} Save</span>
                        </label>
                        {isProf && <span className="gm-hb-save-prof-badge">Prof</span>}
                      </div>

                      <div className="gm-hb-save-val-row">
                        <span className="gm-hb-save-mod-title">Save Mod:</span>
                        {isProf ? (
                          <input
                            type="number"
                            className="gm-hb-save-input"
                            value={currentBonus}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              setSavingThrowSettings((prev) => ({
                                ...prev,
                                [key]: {
                                  proficient: true,
                                  overrideBonus: isNaN(val) ? defaultBonus : val,
                                },
                              }));
                            }}
                          />
                        ) : (
                          <span className="gm-hb-save-mod-readonly">
                            {abilityMod >= 0 ? `+${abilityMod}` : abilityMod}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Senses, Languages & Defenses */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-title">4. Senses, Languages, Skills & Defenses</div>
            <div className="gm-hb-row">
              <div className="gm-hb-field flex-1">
                <label>Senses</label>
                <input
                  type="text"
                  placeholder="Darkvision 60 ft., Passive Perception 12"
                  value={senses}
                  onChange={(e) => setSenses(e.target.value)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>Languages</label>
                <input
                  type="text"
                  placeholder="Common, Goblin, Draconic"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>Skills</label>
                <input
                  type="text"
                  placeholder="e.g. Stealth +6, Perception +4, Athletics +5"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </div>

            <div className="gm-hb-row">
              <div className="gm-hb-field flex-1">
                <label>Damage Resistances</label>
                <input
                  type="text"
                  placeholder="e.g. Fire, Cold"
                  value={resistances}
                  onChange={(e) => setResistances(e.target.value)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>Damage Immunities</label>
                <input
                  type="text"
                  placeholder="e.g. Poison"
                  value={immunities}
                  onChange={(e) => setImmunities(e.target.value)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>Damage Vulnerabilities</label>
                <input
                  type="text"
                  placeholder="e.g. Radiant, Fire"
                  value={vulnerabilities}
                  onChange={(e) => setVulnerabilities(e.target.value)}
                />
              </div>

              <div className="gm-hb-field flex-1">
                <label>Condition Immunities</label>
                <input
                  type="text"
                  placeholder="e.g. Charmed, Frightened"
                  value={conditionImmunities}
                  onChange={(e) => setConditionImmunities(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 5: Traits */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-header-row">
              <div className="gm-hb-section-title">5. Special Traits</div>
              <button type="button" className="gm-hb-add-btn" onClick={handleAddTrait}>
                + Add Trait
              </button>
            </div>

            {traits.map((tr, idx) => (
              <div key={idx} className="gm-hb-item-card">
                <div className="gm-hb-item-header">
                  <input
                    type="text"
                    className="gm-hb-item-name-input"
                    placeholder="Trait Name"
                    value={tr.name}
                    onChange={(e) => handleUpdateTrait(idx, "name", e.target.value)}
                  />
                  <button type="button" className="gm-hb-remove-btn" onClick={() => handleRemoveTrait(idx)}>
                    ✕ Remove
                  </button>
                </div>
                <textarea
                  className="gm-hb-item-desc-input"
                  placeholder="Trait Description..."
                  rows={2}
                  value={tr.description}
                  onChange={(e) => handleUpdateTrait(idx, "description", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Section 6: Actions & Attacks */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-header-row">
              <div className="gm-hb-section-title">6. Actions & Attacks</div>
              <div className="gm-hb-action-add-group">
                <button type="button" className="gm-hb-add-btn" onClick={() => handleAddAction("melee_attack")}>
                  + Melee Attack
                </button>
                <button type="button" className="gm-hb-add-btn" onClick={() => handleAddAction("ranged_attack")}>
                  + Ranged Attack
                </button>
                <button type="button" className="gm-hb-add-btn" onClick={() => handleAddAction("ability")}>
                  + Ability
                </button>
              </div>
            </div>

            {actions.map((act, idx) => (
              <div key={idx} className="gm-hb-item-card">
                <div className="gm-hb-item-header">
                  <input
                    type="text"
                    className="gm-hb-item-name-input"
                    placeholder="Action Name (e.g. Bite)"
                    value={act.name}
                    onChange={(e) => handleUpdateAction(idx, "name", e.target.value)}
                  />
                  <select
                    className="gm-hb-select-compact"
                    value={act.type}
                    onChange={(e) => handleUpdateAction(idx, "type", e.target.value)}
                  >
                    <option value="melee_attack">Melee Attack</option>
                    <option value="ranged_attack">Ranged Attack</option>
                    <option value="ability">Ability / Save</option>
                    <option value="multiattack">Multiattack</option>
                  </select>
                  <button type="button" className="gm-hb-remove-btn" onClick={() => handleRemoveAction(idx)}>
                    ✕ Remove
                  </button>
                </div>

                {/* Attack Stats Row */}
                <div className="gm-hb-row">
                  <div className="gm-hb-field">
                    <label>To Hit Bonus</label>
                    <input
                      type="number"
                      placeholder="+4"
                      value={act.attackBonus ?? ""}
                      onChange={(e) =>
                        handleUpdateAction(
                          idx,
                          "attackBonus",
                          e.target.value ? parseInt(e.target.value, 10) : undefined
                        )
                      }
                    />
                  </div>

                  {act.type === "melee_attack" ? (
                    <div className="gm-hb-field">
                      <label>Reach (ft)</label>
                      <input
                        type="number"
                        placeholder="5"
                        value={act.reachFeet ?? 5}
                        onChange={(e) =>
                          handleUpdateAction(idx, "reachFeet", parseInt(e.target.value, 10) || 5)
                        }
                      />
                    </div>
                  ) : (
                    <div className="gm-hb-field">
                      <label>Range (ft)</label>
                      <input
                        type="number"
                        placeholder="60"
                        value={act.rangeFeet ?? 60}
                        onChange={(e) =>
                          handleUpdateAction(idx, "rangeFeet", parseInt(e.target.value, 10) || 60)
                        }
                      />
                    </div>
                  )}

                  <div className="gm-hb-field flex-1">
                    <label>Damage (e.g. 1d6+2)</label>
                    <input
                      type="text"
                      placeholder="1d6+2"
                      value={act.damage || ""}
                      onChange={(e) => handleUpdateAction(idx, "damage", e.target.value)}
                    />
                  </div>

                  <div className="gm-hb-field flex-1">
                    <label>Damage Type</label>
                    <input
                      type="text"
                      placeholder="Slashing, Piercing, Fire"
                      value={act.damageType || ""}
                      onChange={(e) => handleUpdateAction(idx, "damageType", e.target.value)}
                    />
                  </div>
                </div>

                <textarea
                  className="gm-hb-item-desc-input"
                  placeholder="Action Description (e.g. Hit: 5 (1d6+2) slashing damage.)"
                  rows={2}
                  value={act.description}
                  onChange={(e) => handleUpdateAction(idx, "description", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Section 7: Bonus Actions */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-header-row">
              <div className="gm-hb-section-title">7. Bonus Actions (Optional)</div>
              <button type="button" className="gm-hb-add-btn" onClick={handleAddBonusAction}>
                + Add Bonus Action
              </button>
            </div>

            {bonusActions.map((ba, idx) => (
              <div key={idx} className="gm-hb-item-card">
                <div className="gm-hb-item-header">
                  <input
                    type="text"
                    className="gm-hb-item-name-input"
                    placeholder="Bonus Action Name"
                    value={ba.name}
                    onChange={(e) => handleUpdateBonusAction(idx, "name", e.target.value)}
                  />
                  <button type="button" className="gm-hb-remove-btn" onClick={() => handleRemoveBonusAction(idx)}>
                    ✕ Remove
                  </button>
                </div>
                <textarea
                  className="gm-hb-item-desc-input"
                  placeholder="Bonus Action Description..."
                  rows={2}
                  value={ba.description}
                  onChange={(e) => handleUpdateBonusAction(idx, "description", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Section 8: Reactions */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-header-row">
              <div className="gm-hb-section-title">8. Reactions (Optional)</div>
              <button type="button" className="gm-hb-add-btn" onClick={handleAddReaction}>
                + Add Reaction
              </button>
            </div>

            {reactions.map((rx, idx) => (
              <div key={idx} className="gm-hb-item-card">
                <div className="gm-hb-item-header">
                  <input
                    type="text"
                    className="gm-hb-item-name-input"
                    placeholder="Reaction Name"
                    value={rx.name}
                    onChange={(e) => handleUpdateReaction(idx, "name", e.target.value)}
                  />
                  <button type="button" className="gm-hb-remove-btn" onClick={() => handleRemoveReaction(idx)}>
                    ✕ Remove
                  </button>
                </div>
                <textarea
                  className="gm-hb-item-desc-input"
                  placeholder="Reaction Description..."
                  rows={2}
                  value={rx.description}
                  onChange={(e) => handleUpdateReaction(idx, "description", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Section 9: Legendary Actions */}
          <div className="gm-hb-section">
            <div className="gm-hb-section-header-row">
              <div className="gm-hb-section-title">9. Legendary Actions (Optional)</div>
              <button type="button" className="gm-hb-add-btn" onClick={handleAddLegendaryAction}>
                + Add Legendary Action
              </button>
            </div>

            {legendaryActions.map((la, idx) => (
              <div key={idx} className="gm-hb-item-card">
                <div className="gm-hb-item-header">
                  <input
                    type="text"
                    className="gm-hb-item-name-input"
                    placeholder="Legendary Action Name"
                    value={la.name}
                    onChange={(e) => handleUpdateLegendaryAction(idx, "name", e.target.value)}
                  />
                  <button type="button" className="gm-hb-remove-btn" onClick={() => handleRemoveLegendaryAction(idx)}>
                    ✕ Remove
                  </button>
                </div>
                <textarea
                  className="gm-hb-item-desc-input"
                  placeholder="Legendary Action Description..."
                  rows={2}
                  value={la.description}
                  onChange={(e) => handleUpdateLegendaryAction(idx, "description", e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="gm-hb-footer">
          <button type="button" className="gm-hb-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="gm-hb-save-btn" onClick={handleSave}>
            {initialMonster ? "✓ Save Changes" : "✓ Create Monster"}
          </button>
        </div>
      </div>
    </div>
  );
};
