export interface DDBSubRollToHit {
  total: number;
  diceBreakdown: string; // e.g. "14 + 7"
  formula?: string; // e.g. "1d20+7"
  isCrit?: boolean;
  isMiss?: boolean;
  mode?: "normal" | "advantage" | "disadvantage";
  isAdvantage?: boolean;
  isDisadvantage?: boolean;
  targetAc?: number;
  isHit?: boolean;
  hitLabel?: string;
}

export interface DDBSubRollDamage {
  total: number;
  damageType: string; // e.g. "Force", "Fire"
  diceBreakdown: string; // e.g. "8 + 4"
  formula?: string; // e.g. "1d10+4 Force"
  isCrit?: boolean;
}

export interface DDBSubRollExtraDamage {
  name: string; // e.g. "Hex", "Hunter's Mark"
  total: number;
  damageType: string; // e.g. "Necrotic"
  diceBreakdown: string; // e.g. "3"
  formula?: string; // e.g. "1d6 Necrotic"
  isCrit?: boolean;
}

export interface DDBSubRollEntry {
  unitLabel: string; // e.g. "BEAM 1", "RAY 2", "DART 1", "ATTACK 1"
  targetName?: string; // e.g. "Goblin Archer"
  targetId?: string;
  toHit?: DDBSubRollToHit; // Attack roll
  damage?: DDBSubRollDamage; // Base damage
  extraDamage?: DDBSubRollExtraDamage[]; // Optional riders (Hex, etc.)
  damageResolutionStatus?: "pending" | "applied" | "shielded" | "dismissed";
  appliedDamageAmount?: number;
}

export interface DDBDamageComponent {
  total: number;
  damageType: string;
  diceBreakdown: string;
  formula: string;
}

export interface DDBTargetSaveResolution {
  targetId: string;
  targetName: string;
  saveAbility: string;
  saveDc: number;
  successDamageMultiplier: number;
  failureDamageMultiplier: number;
  outcome?: "success" | "failure";
  damageResolutionStatus: "pending" | "applied" | "dismissed";
  appliedDamageAmount?: number;
  resolutionNote?: string;
}

export interface DDBRollCardData {
  id: string;
  casterName: string;
  casterId?: string;
  characterId?: number | string;
  targetName?: string;
  targetId?: string;
  actionName: string; // e.g. "ARCANA", "ELDRITCH BLAST", "RAPIER", "FIRE BOLT"
  actionType:
    | "CHECK"
    | "TO HIT"
    | "ATTACK"
    | "DAMAGE"
    | "HEAL"
    | "SAVE"
    | "SPELL"
    | "MULTI_ATTACK";
  dieType: number; // 20, 10, 8, 6, 4, 12, 100
  diceBreakdown: string; // e.g. "14 + 4", "11 + 6", "9 + 3", "ADV: 11 + 6"
  formula: string; // e.g. "1d20+4", "1d20+6", "1d10+3 Force"
  total: number | string; // e.g. 18, 17, 12, 22
  subtitle?: string; // e.g. "Beam 1 Attack", "Beam 1 Damage", "Critical Hit!", "Rolled with Elder Flame"
  isCrit?: boolean;
  isMiss?: boolean;
  timestamp: number;

  // Attack vs AC resolution
  rollD20?: number;
  attackTotal?: number;
  targetAc?: number;
  isHit?: boolean;
  hitLabel?: string;
  requiresHitApproval?: boolean;
  hitApprovalStatus?: "pending" | "confirmed" | "missed";
  relatedCardIds?: string[];

  // Pending Damage & GM Approval
  pendingDamage?: number;
  damageType?: string;
  damageComponents?: DDBDamageComponent[];
  damageResolutionStatus?: "pending" | "applied" | "shielded" | "dismissed";
  appliedDamageAmount?: number;
  resolutionNote?: string;
  targetSaveResolutions?: DDBTargetSaveResolution[];
  requiresManualDamageAdjudication?: boolean;

  // Optional grouped multi-strike entries
  subRolls?: DDBSubRollEntry[];

  // Optional pending trigger for interactive manual triggering
  pendingTriggerId?: string;
  pendingTriggerName?: string;

  // Highlight flag for conditional trigger effects (e.g. Vengeful Blade, Booming Blade)
  isConditionTrigger?: boolean;
  triggerConditionDesc?: string;

  // Advantage / Disadvantage roll mode
  rollMode?: "normal" | "advantage" | "disadvantage";
  isAdvantage?: boolean;
  isDisadvantage?: boolean;
}

export interface DDBRollCardUpdatePayload {
  cardId: string;
  damageResolutionStatus: "pending" | "applied" | "shielded" | "dismissed";
  appliedDamageAmount?: number;
  resolutionNote?: string;
  hitApprovalStatus?: "pending" | "confirmed" | "missed";
  subIndex?: number;
  targetSaveResolutions?: DDBTargetSaveResolution[];
}

export interface DDBRollLogPayload {
  cards: DDBRollCardData[];
  senderId?: string;
  update?: DDBRollCardUpdatePayload;
}
