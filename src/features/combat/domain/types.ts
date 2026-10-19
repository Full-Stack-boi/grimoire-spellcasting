export type TokenDisposition = "friendly" | "hostile" | "neutral";

export interface Combatant {
  id: string; // Token ID on OBR scene
  name: string;
  initiative: number;
  initiativeBonus: number;
  hpCurrent?: number;
  hpMax?: number;
  hpTemp?: number;
  ac?: number;
  conditions?: string[];
  resistances?: string[];
  immunities?: string[];
  vulnerabilities?: string[];
  isDefeated?: boolean;
  avatarUrl?: string;
  isPlayer?: boolean;
  disposition?: TokenDisposition;
  notes?: string;
}

export interface CombatEncounter {
  id: string;
  isActive: boolean;
  round: number;
  turnIndex: number;
  combatants: Combatant[];
  updatedAt: number;
}

export interface TokenVitals {
  hpCurrent: number;
  hpMax: number;
  hpTemp?: number;
  armorClass?: number;
  conditions?: string[];
  resistances?: string[];
  immunities?: string[];
  vulnerabilities?: string[];
  speedFeet?: number;
  exhaustionLevel?: number;
  effects?: TemporaryCombatEffect[];
  concentration?: ConcentrationState | null;
  pendingConcentrationSaves?: PendingConcentrationSave[];
  disposition?: TokenDisposition;
  hideNumbers?: boolean;
  resolvedRollKeys?: string[];
  updatedAt?: number;
}

export interface ConcentrationState {
  spellId: string;
  spellName: string;
  hexTargetId?: string | null;
}

export interface PendingConcentrationSave {
  id: string;
  spellId: string;
  spellName: string;
  damageTaken: number;
  dc: number;
  createdAt: number;
}

export interface TemporaryCombatEffect {
  id: string;
  kind: "speed_reduction";
  name: string;
  valueFeet: number;
  concentrationSpellId?: string;
  sourceTokenId: string;
  sourceName: string;
  expiresOnTurnStartTokenId: string;
}

export const STANDARD_5E_CONDITIONS = [
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
] as const;

export type Standard5eCondition = typeof STANDARD_5E_CONDITIONS[number];

export const DEFAULT_ENCOUNTER: CombatEncounter = {
  id: "",
  isActive: false,
  round: 1,
  turnIndex: 0,
  combatants: [],
  updatedAt: 0,
};

export const TOKEN_DISPOSITION_METADATA_KEY = "com.fullstackboi.spellcasting/disposition";
export const LEGACY_TOKEN_DISPOSITION_METADATA_KEY = "eu.armindo.embers/disposition";
