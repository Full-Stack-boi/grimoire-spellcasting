export type MonsterEdition = "2024" | "2014";

export type MonsterSize = "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";

export type MonsterType =
  | "Aberration"
  | "Beast"
  | "Celestial"
  | "Construct"
  | "Dragon"
  | "Elemental"
  | "Fey"
  | "Fiend"
  | "Giant"
  | "Humanoid"
  | "Monstrosity"
  | "Ooze"
  | "Plant"
  | "Undead";

export type MonsterResetUnit =
  | "round"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "short rest"
  | "long rest"
  | "manual";

export interface MonsterUsageLimit {
  maxUses: number;
  resetEvery: number;
  resetUnit: MonsterResetUnit;
  label: string;
}

export interface MonsterDamageComponent {
  formula: string;
  damageType: string;
}

export interface MonsterAreaOfEffect {
  shape: "Sphere" | "Cone" | "Cube" | "Line";
  sizeFeet: number;
}

export interface MonsterMultiattackStrike {
  actionId: string;
  count: number;
}

export interface MonsterSpellOption {
  id: string;
  name: string;
  usage?: MonsterUsageLimit;
}

export interface MonsterAction {
  id: string;
  name: string;
  type: "melee_attack" | "ranged_attack" | "ability" | "spell" | "multiattack";
  attackBonus?: number;
  reachFeet?: number;
  rangeFeet?: number;
  rangeLongFeet?: number;
  damage?: string;
  damageType?: string;
  damageComponents?: MonsterDamageComponent[];
  areaOfEffect?: MonsterAreaOfEffect;
  usage?: MonsterUsageLimit;
  multiattackSequence?: MonsterMultiattackStrike[];
  spellOptions?: MonsterSpellOption[];
  spellcastingAbility?: "str" | "dex" | "con" | "int" | "wis" | "cha";
  spellSaveDc?: number;
  saveDc?: number;
  saveStat?: "str" | "dex" | "con" | "int" | "wis" | "cha";
  saveSuccessDamageMultiplier?: number;
  saveFailureDamageMultiplier?: number;
  description: string;
}

export interface MonsterStatblock {
  id: string;
  name: string;
  source?: string;
  edition: MonsterEdition;
  isLegacy?: boolean;
  size: MonsterSize;
  type: MonsterType;
  subtype?: string;
  alignment: string;
  armorClass: number;
  armorDesc?: string;
  hitPoints: {
    average: number;
    formula: string;
  };
  speed: string;
  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  savingThrows?: Record<string, number>;
  skills?: Record<string, number>;
  damageResistances?: string[];
  damageImmunities?: string[];
  damageVulnerabilities?: string[];
  conditionImmunities?: string[];
  senses: string;
  languages: string;
  challengeRating: string;
  proficiencyBonus: number;
  traits?: Array<{ name: string; description: string }>;
  actions: MonsterAction[];
  bonusActions?: Array<{ name: string; description: string }>;
  reactions?: Array<{ name: string; description: string }>;
  legendaryActions?: Array<{ name: string; description: string }>;
}

export interface MonsterFilterQuery {
  search?: string;
  cr?: string;
  type?: string;
  edition?: "ALL" | "2024" | "2014";
}
