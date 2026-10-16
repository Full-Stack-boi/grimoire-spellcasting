import React, { useState, useEffect } from "react";
import OBR, { Item, isImage } from "@owlbear-rodeo/sdk";
import "./MonsterStatblockView.scss";
import type { MonsterStatblock, MonsterAction, MonsterSpellOption, MonsterUsageLimit } from "../domain/types";
import {
  bindMonsterToToken,
  unbindMonsterFromToken,
  getBoundMonsterFromToken,
  rollMonsterAction,
  rollMonsterInitiative,
} from "../monsterService";
import { resolveMonsterSpellOption } from "../monsterToDdbAdapter";
import {
  adjustMonsterAbilityUse,
  loadMonsterUsageCounts,
  MONSTER_USAGE_METADATA_KEY,
  recordMonsterAbilityUse,
  resetMonsterAbilityUse,
} from "../monsterUsageService";
import {
  setTokenVitals,
  extractTokenVitals,
  resolveTokenConcentrationSave,
} from "../../combat/tokenVitalsService";
import { rollAttack, rollFormula } from "../../../utils/dice";
import { broadcastDDBRoll } from "../../../services/rollLogService";
import type { DDBRollCardData } from "../../../types/ddbRollLog";
import { MonsterExportModal } from "./MonsterExportModal";
import { FaPen } from "react-icons/fa6";
import { checkMonsterAttackRange } from "../domain/monsterAttackRange";
import { hasResolvableSaveDamage, parseMonsterSaveMechanics } from "../domain/monsterSaveMechanics";
import { combineD20RollModes, resolveConditionRules } from "../../combat/domain/conditionRules";

export interface MonsterStatblockViewProps {
  monster: MonsterStatblock;
  token?: Item | null;
  filter?: string;
  search?: string;
  sceneTokens?: Item[];
  targetTokenId?: string;
  onSelectTargetTokenId?: (id: string) => void;
  onAimAction?: (action: MonsterAction) => void;
  onAimSaveAction?: (action: MonsterAction, casterTokenId: string) => void | Promise<void>;
  onRollAction?: (action: MonsterAction, mode: "normal" | "advantage" | "disadvantage") => void;
  onCastSpell?: (spellId: string, casterTokenId?: string) => void | Promise<void>;
  onRollInitiative?: () => void;
  onRollHp?: () => void;
  onExport?: () => void;
  onEdit?: (monster: MonsterStatblock) => void;
  showBindControls?: boolean;
}

export const MonsterStatblockView: React.FC<MonsterStatblockViewProps> = ({
  monster,
  token,
  filter = "ALL",
  search = "",
  sceneTokens: externalSceneTokens,
  targetTokenId: externalTargetTokenId,
  onSelectTargetTokenId,
  onAimAction,
  onAimSaveAction,
  onRollAction,
  onCastSpell,
  onRollInitiative,
  onRollHp,
  onExport,
  onEdit,
  showBindControls = true,
}) => {
  const [rollMode, setRollMode] = useState<"normal" | "advantage" | "disadvantage">("normal");
  const [rollHp, setRollHp] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [isBinding, setIsBinding] = useState(false);
  const [isUnbinding, setIsUnbinding] = useState(false);
  const [internalSceneTokens, setInternalSceneTokens] = useState<Item[]>([]);
  const [internalTargetTokenId, setInternalTargetTokenId] = useState<string>("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>({});
  const [isGM, setIsGM] = useState(false);
  const usageScopeId = token?.id || monster.id;

  useEffect(() => {
    if (!OBR.isReady) return;
    let active = true;
    OBR.player.getRole()
      .then((role) => {
        if (active) setIsGM(role === "GM");
      })
      .catch((error) => {
        console.error("Failed to resolve role for monster usage controls:", error);
      });
    const refresh = () => {
      loadMonsterUsageCounts(usageScopeId)
        .then((counts) => {
          if (active) setUsageCounts(counts);
        })
        .catch((error) => {
          console.error("Failed to load monster ability usage:", error);
          OBR.notification.show("Could not load monster ability usage counters.", "ERROR");
        });
    };
    refresh();
    const unsubscribe = OBR.scene.onMetadataChange((metadata) => {
      if (Object.prototype.hasOwnProperty.call(metadata, MONSTER_USAGE_METADATA_KEY)) {
        refresh();
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [usageScopeId]);

  const recordUsage = async (
    abilityId: string,
    usage: MonsterUsageLimit,
    displayName: string,
  ): Promise<boolean> => {
    try {
      const result = await recordMonsterAbilityUse(usageScopeId, abilityId, usage.maxUses);
      setUsageCounts((previous) => ({ ...previous, [abilityId]: result.used }));
      if (result.quotaReached) {
        OBR.notification.show(
          `${displayName} has used ${result.used}/${usage.maxUses} (${usage.label}). The limit is advisory; the DM may continue.`,
          "WARNING",
        );
      }
      return true;
    } catch (error) {
      console.error(`Failed to record ${displayName} use:`, error);
      OBR.notification.show(
        `Could not save the ${displayName} usage counter. The action was not started.`,
        "ERROR",
      );
      return false;
    }
  };

  const handleUsageAdjustment = async (
    abilityId: string,
    adjustment: -1 | 1,
  ) => {
    try {
      const used = await adjustMonsterAbilityUse(usageScopeId, abilityId, adjustment);
      setUsageCounts((previous) => ({ ...previous, [abilityId]: used }));
    } catch (error) {
      console.error("Failed to adjust monster ability usage:", error);
      OBR.notification.show("Could not update the monster usage counter.", "ERROR");
    }
  };

  const handleUsageReset = async (abilityId: string) => {
    try {
      await resetMonsterAbilityUse(usageScopeId, abilityId);
      setUsageCounts((previous) => ({ ...previous, [abilityId]: 0 }));
    } catch (error) {
      console.error("Failed to reset monster ability usage:", error);
      OBR.notification.show("Could not reset the monster usage counter.", "ERROR");
    }
  };

  // Compute live token binding state
  const currentBound = token ? getBoundMonsterFromToken(token) : null;
  const isBoundToThis = Boolean(token && currentBound?.id === monster.id);
  const isBoundToOther = Boolean(token && currentBound && currentBound.id !== monster.id);

  // Sync scene tokens if not provided from parent
  useEffect(() => {
    if (externalSceneTokens) return;
    if (!OBR.isReady) return;

    const fetchTokens = async () => {
      try {
        const items = await OBR.scene.items.getItems();
        const valid = items.filter(
          (it) => it.layer === "CHARACTER" || (isImage(it) && it.layer !== "MAP")
        );
        setInternalSceneTokens(valid);
      } catch {}
    };

    fetchTokens();
  }, [externalSceneTokens]);

  const activeTokens = externalSceneTokens || internalSceneTokens;
  const currentTargetId = externalTargetTokenId !== undefined ? externalTargetTokenId : internalTargetTokenId;
  const setTargetId = onSelectTargetTokenId || setInternalTargetTokenId;

  const formatMod = (score: number) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  // Bind to token handler
  const handleBind = async () => {
    if (!token) return;
    setIsBinding(true);
    try {
      await bindMonsterToToken(token.id, monster, { rollHp });
    } finally {
      setIsBinding(false);
    }
  };

  // Unbind from token handler
  const handleUnbind = async () => {
    if (!token) return;
    setIsUnbinding(true);
    try {
      await unbindMonsterFromToken(token.id);
    } finally {
      setIsUnbinding(false);
    }
  };

  // Roll HP handler
  const handleRollHp = async () => {
    if (onRollHp) {
      onRollHp();
      return;
    }
    if (!token) return;
    try {
      const formulaRes = rollFormula(monster.hitPoints.formula);
      const newHp = Math.max(1, formulaRes.total);
      await setTokenVitals(token.id, { hpCurrent: newHp, hpMax: newHp });
      OBR.notification.show(
        `Rolled HP for ${monster.name}: ${newHp} (${monster.hitPoints.formula} -> ${formulaRes.breakdown})`,
        "SUCCESS"
      );
    } catch (err) {
      console.error("Failed to roll HP:", err);
    }
  };

  // Initiative roll handler
  const handleInitiative = async () => {
    if (onRollInitiative) {
      onRollInitiative();
      return;
    }
    setIsRolling(true);
    try {
      const tokenId = token?.id || `virtual-${monster.id}`;
      await rollMonsterInitiative(monster, tokenId, rollMode);
    } finally {
      setIsRolling(false);
    }
  };

  // Ability check roll handler
  const handleRollAbilityCheck = async (
    statKey: "str" | "dex" | "con" | "int" | "wis" | "cha",
    statLabel: string
  ) => {
    const score = monster.stats[statKey];
    const mod = Math.floor((score - 10) / 2);
    const attackerVitals = token ? extractTokenVitals(token.metadata) : null;
    const checkRules = resolveConditionRules({
      conditions: attackerVitals?.conditions,
      exhaustionLevel: attackerVitals?.exhaustionLevel,
      rollKind: "ability_check",
    });

    const effectiveRollMode = combineD20RollModes(rollMode, checkRules.mode);
    const effectiveBonus = mod - checkRules.d20Penalty;
    const attackRes = rollAttack(effectiveBonus, "", effectiveRollMode);
    const conditionNote = [...checkRules.reasons, ...checkRules.requiresAdjudication].join(" • ");
    const cardId = `roll-check-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const card: DDBRollCardData = {
      id: cardId,
      casterName: token?.name || monster.name,
      targetName: "SELF",
      actionName: `${statLabel.toUpperCase()} CHECK`,
      actionType: "CHECK",
      dieType: 20,
      diceBreakdown: `${attackRes.formatted.replace(/^To Hit: \d+ /, "")}`,
      formula: `1d20${effectiveBonus >= 0 ? `+${effectiveBonus}` : effectiveBonus}${effectiveRollMode === "advantage" ? " (ADV)" : effectiveRollMode === "disadvantage" ? " (DIS)" : ""}`,
      total: attackRes.total,
      subtitle: `${statLabel.toUpperCase()} Ability Check (Score ${score})${conditionNote ? ` • ${conditionNote}` : ""}`,
      isCrit: attackRes.isCrit,
      isMiss: attackRes.isMiss,
      rollMode: effectiveRollMode,
      isAdvantage: effectiveRollMode === "advantage",
      isDisadvantage: effectiveRollMode === "disadvantage",
      timestamp: Date.now(),
    };
    await broadcastDDBRoll([card]);
  };

  // Saving throw roll handler
  const handleRollSavingThrow = async (
    statKey: "str" | "dex" | "con" | "int" | "wis" | "cha",
    statLabel: string
  ) => {
    const score = monster.stats[statKey];
    const abilityMod = Math.floor((score - 10) / 2);
    const saveBonus =
      monster.savingThrows?.[statKey] !== undefined
        ? monster.savingThrows[statKey]
        : abilityMod;
    const isProficient = monster.savingThrows?.[statKey] !== undefined;

    const attackerVitals = token ? extractTokenVitals(token.metadata) : null;
    const saveRules = resolveConditionRules({
      conditions: attackerVitals?.conditions,
      exhaustionLevel: attackerVitals?.exhaustionLevel,
      rollKind: "saving_throw",
      ability: statKey,
    });

    const effectiveRollMode = combineD20RollModes(rollMode, saveRules.mode);
    const effectiveBonus = saveBonus - saveRules.d20Penalty;
    const attackRes = saveRules.automaticFailure
      ? null
      : rollAttack(effectiveBonus, "", effectiveRollMode);
    const conditionNote = [...saveRules.reasons, ...saveRules.requiresAdjudication].join(" • ");
    const cardId = `roll-save-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    const card: DDBRollCardData = {
      id: cardId,
      casterName: token?.name || monster.name,
      targetName: "SELF",
      actionName: `${statLabel.toUpperCase()} SAVE`,
      actionType: "SAVE",
      dieType: 20,
      diceBreakdown: saveRules.automaticFailure
        ? "Automatic failure from condition"
        : `${attackRes?.formatted.replace(/^To Hit: \d+ /, "") ?? ""}`,
      formula: saveRules.automaticFailure
        ? "Automatic failure from condition"
        : `1d20${effectiveBonus >= 0 ? `+${effectiveBonus}` : effectiveBonus}${effectiveRollMode === "advantage" ? " (ADV)" : effectiveRollMode === "disadvantage" ? " (DIS)" : ""}`,
      total: saveRules.automaticFailure ? "AUTO FAIL" : (attackRes?.total ?? 0),
      subtitle: `${statLabel.toUpperCase()} Saving Throw (Score ${score})${isProficient ? " • Proficient" : ""}${saveRules.automaticFailure ? " • Automatic Failure" : ""}${conditionNote ? ` • ${conditionNote}` : ""}`,
      isCrit: attackRes?.isCrit,
      isMiss: attackRes?.isMiss,
      rollMode: effectiveRollMode,
      isAdvantage: effectiveRollMode === "advantage",
      isDisadvantage: effectiveRollMode === "disadvantage",
      timestamp: Date.now(),
    };

    await broadcastDDBRoll([card]);

    if (statKey === "con" && token?.id && attackerVitals?.pendingConcentrationSaves?.length) {
      await resolveTokenConcentrationSave(token.id, typeof card.total === "number" ? card.total : 0);
    }
  };

  // Action execution handler
  const handleRollAction: (action: MonsterAction, trackUsage?: boolean) => Promise<void> = async (
    action,
    trackUsage = true,
  ) => {
    if (action.type === "multiattack") {
      const strikes = (action.multiattackSequence || []).flatMap((strike) => {
        const strikeAction = monster.actions.find((candidate) => candidate.id === strike.actionId);
        return strikeAction
          ? Array.from({ length: strike.count }, () => strikeAction)
          : [];
      });
      const targetToken = activeTokens.find((candidate) => candidate.id === currentTargetId);
      if (strikes.length === 0) {
        OBR.notification.show(
          `${action.name} could not be resolved into attack rolls. Use the statblock description to adjudicate it.`,
          "WARNING",
        );
        return;
      }
      if (!token || !targetToken) {
        OBR.notification.show(
          "Select a target and ensure the monster token is on the scene before rolling this Multiattack.",
          "WARNING",
        );
        return;
      }
      if (trackUsage && action.usage && !(await recordUsage(action.id, action.usage, action.name))) {
        return;
      }
      setIsRolling(true);
      try {
        for (const strike of strikes) {
          await handleRollAction(strike, false);
        }
      } finally {
        setIsRolling(false);
      }
      return;
    }

    setIsRolling(true);
    try {
      const targetToken = activeTokens.find((t) => t.id === currentTargetId);
      let effectiveRollMode = rollMode;
      let targetWithinFiveFeet: boolean | undefined;
      if (action.type === "melee_attack" || action.type === "ranged_attack") {
        if (!token || !targetToken) {
          OBR.notification.show(
            "Select a target and ensure the monster token is on the scene before rolling this attack.",
            "WARNING",
          );
          return;
        }

        try {
          const [dpi, scale] = await Promise.all([
            OBR.scene.grid.getDpi(),
            OBR.scene.grid.getScale(),
          ]);
          const range = checkMonsterAttackRange(
            action,
            token.position,
            targetToken.position,
            { dpi, scaleMultiplier: scale.parsed?.multiplier ?? 5 },
          );
          targetWithinFiveFeet = range.currentDistanceFeet <= 5;

          if (!range.withinRange) {
            OBR.notification.show(
              `${action.name} is out of range (${range.currentDistanceFeet.toFixed(1)} ft; max ${range.maxRangeFeet} ft).`,
              "WARNING",
            );
            return;
          }

          if (range.isLongRange) {
            effectiveRollMode =
              effectiveRollMode === "advantage" ? "normal" : "disadvantage";
          }
        } catch (error) {
          console.error("Failed to validate monster attack range:", error);
          OBR.notification.show(
            "Unable to check attack range. The attack was not rolled.",
            "ERROR",
          );
          return;
        }
      }

      const attackerVitals = token ? extractTokenVitals(token.metadata) : null;
      const targetVitals = targetToken ? extractTokenVitals(targetToken.metadata) : null;
      const isAttack =
        action.type === "melee_attack" ||
        action.type === "ranged_attack" ||
        typeof action.attackBonus === "number";
      const actionRules = resolveConditionRules({
        conditions: attackerVitals?.conditions,
        rollKind: "attack",
        targetWithinFiveFeet,
        actionType: "action",
      });
      if (actionRules.blocked) {
        OBR.notification.show(
          `Action prevented by condition: ${actionRules.reasons.join("; ")}`,
          "WARNING",
        );
        return;
      }
      const conditionRules = isAttack
        ? resolveConditionRules({
            conditions: attackerVitals?.conditions,
            targetConditions: targetVitals?.conditions,
            exhaustionLevel: attackerVitals?.exhaustionLevel,
            rollKind: "attack",
            attackType: action.type === "ranged_attack" ? "ranged" : "melee",
            targetWithinFiveFeet,
            actionType: "action",
          })
        : null;
      if (conditionRules?.requiresAdjudication.length) {
        OBR.notification.show(
          `DM adjudication needed: ${conditionRules.requiresAdjudication.join("; ")}`,
          "WARNING",
        );
      }
      if (conditionRules) {
        effectiveRollMode = combineD20RollModes(effectiveRollMode, conditionRules.mode);
      }
      const actionWithConditionPenalty =
        conditionRules
          ? {
              ...action,
              attackBonus: (action.attackBonus ?? 0) - conditionRules.d20Penalty,
            }
          : action;

      if (trackUsage && action.usage && !(await recordUsage(action.id, action.usage, action.name))) {
        return;
      }

      if (onRollAction) {
        onRollAction(actionWithConditionPenalty, effectiveRollMode);
        return;
      }

      const targetPayload = targetToken
        ? { id: targetToken.id, name: targetToken.name || "Target" }
        : null;
      await rollMonsterAction(monster, actionWithConditionPenalty, targetPayload, effectiveRollMode, token?.name);
    } finally {
      setIsRolling(false);
    }
  };

  const handleCastSpell = async (
    action: MonsterAction,
    option: MonsterSpellOption,
    spellId: string,
  ) => {
    if (isRolling) return;
    if (!token?.id || !isBoundToThis) {
      OBR.notification.show("Bind this monster to the selected token before casting its spell.", "WARNING");
      return;
    }
    setIsRolling(true);
    try {
      const counterId = `${action.id}:${option.id}`;
      if (option.usage && !(await recordUsage(counterId, option.usage, option.name))) {
        return;
      }
      if (!onCastSpell) {
        OBR.notification.show("Spell casting is not available in this monster view.", "WARNING");
        return;
      }
      await onCastSpell(spellId, token.id);
    } finally {
      setIsRolling(false);
    }
  };

  const handleAimAction = async (action: MonsterAction) => {
    if (action.usage && !(await recordUsage(action.id, action.usage, action.name))) {
      return;
    }
    onAimAction?.(action);
  };

  const handleAimSaveAction = async (action: MonsterAction) => {
    if (!token?.id || !isBoundToThis) {
      OBR.notification.show(
        "Bind this monster to its scene token before aiming this area action.",
        "WARNING",
      );
      return;
    }
    if (action.usage && !(await recordUsage(action.id, action.usage, action.name))) {
      return;
    }
    await onAimSaveAction?.(action, token.id);
  };

  // Search & Filter matching helpers
  const matchesSearch = (text: string) => {
    if (!search || !search.trim()) return true;
    return text.toLowerCase().includes(search.toLowerCase().trim());
  };

  const normalizedFilter = filter.toUpperCase();
  const showTraits = normalizedFilter === "ALL" || normalizedFilter === "OTHER";
  const showActions =
    normalizedFilter === "ALL" ||
    normalizedFilter === "ATTACK" ||
    normalizedFilter === "ACTION";
  const showBonusActions = normalizedFilter === "ALL" || normalizedFilter === "BONUS" || normalizedFilter === "BONUS ACTION";
  const showReactions = normalizedFilter === "ALL" || normalizedFilter === "REACTION";
  const showLegendary = normalizedFilter === "ALL" || normalizedFilter === "OTHER";

  // Filtered action items
  const filteredActions = monster.actions.filter((act) => {
    if (normalizedFilter === "ATTACK") {
      const isAttack =
        act.type === "melee_attack" ||
        act.type === "ranged_attack" ||
        typeof act.attackBonus === "number";
      if (!isAttack) return false;
    }
    return matchesSearch(act.name) || matchesSearch(act.description);
  });

  const filteredTraits = (monster.traits || []).filter(
    (tr) => matchesSearch(tr.name) || matchesSearch(tr.description)
  );

  const filteredBonusActions = (monster.bonusActions || []).filter(
    (ba) => matchesSearch(ba.name) || matchesSearch(ba.description)
  );

  const filteredReactions = (monster.reactions || []).filter(
    (rx) => matchesSearch(rx.name) || matchesSearch(rx.description)
  );

  const filteredLegendary = (monster.legendaryActions || []).filter(
    (la) => matchesSearch(la.name) || matchesSearch(la.description)
  );

  const renderUsageCounter = (
    abilityId: string,
    usage: MonsterUsageLimit | undefined,
    name: string,
  ) => {
    if (!usage) return null;
    const used = usageCounts[abilityId] || 0;
    return (
      <div className="gm-usage-counter" aria-label={`${name}: ${used} of ${usage.maxUses} uses`}>
        <span className="gm-usage-count">
          Used {used}/{usage.maxUses}
          <span className="gm-usage-reset"> · {usage.label}</span>
        </span>
        {isGM && (
          <span className="gm-usage-controls">
            <button
              type="button"
              aria-label={`Decrease ${name} uses`}
              title={`Decrease ${name} uses`}
              onClick={() => void handleUsageAdjustment(abilityId, -1)}
            >
              −
            </button>
            <button
              type="button"
              aria-label={`Increase ${name} uses`}
              title={`Increase ${name} uses; this can exceed the listed limit`}
              onClick={() => void handleUsageAdjustment(abilityId, 1)}
            >
              +
            </button>
            <button
              type="button"
              className="gm-usage-reset-button"
              onClick={() => void handleUsageReset(abilityId)}
              title={`Reset only ${name}'s usage counter`}
            >
              Reset
            </button>
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="gm-statblock-view-container">
      {/* 1. HEADER */}
      <div className="gm-statblock-header">
        <div className="gm-statblock-title-row">
          <div className="gm-statblock-title-left">
            <span className="gm-statblock-name">{monster.name}</span>
            <span
              className={`gm-badge-edition ${
                monster.isLegacy || monster.edition === "2014"
                  ? "gm-badge-legacy"
                  : "gm-badge-2024"
              }`}
            >
              {monster.edition === "2014" || monster.isLegacy ? "Legacy" : "2024"}
            </span>
          </div>

          <div className="gm-statblock-header-actions">
            {onEdit && (
              <button
                type="button"
                className="gm-btn-edit"
                onClick={() => onEdit(monster)}
                title={`Edit ${monster.name} statblock`}
              >
                <FaPen size={11} /> Edit
              </button>
            )}
            <button
              type="button"
              className="gm-btn-export"
              onClick={onExport ? onExport : () => setShowExportModal(true)}
              title="Export Monster as Grimoire JSON or D&D Beyond Markdown"
            >
              ↗ Export (JSON / DDB)
            </button>
          </div>
        </div>

        <div className="gm-statblock-subtitle">
          {monster.size} {monster.type}
          {monster.subtype ? ` (${monster.subtype})` : ""}, {monster.alignment}
        </div>
        <div className="gm-statblock-source">Source: {monster.source || "Monster Manual"}</div>
      </div>

      {/* 2. ACTION CONTROLS BAR (Token Binding, HP, Initiative) */}
      <div className="gm-statblock-action-bar">
        {showBindControls && (
          <div className="gm-bind-box">
            {isBoundToThis ? (
              <>
                <div
                  className="gm-bound-status-badge"
                  title={`This token is bound to ${monster.name}`}
                >
                  <span className="gm-bound-check">✓</span>
                  <span>Bound to [{token?.name || "Selected Token"}]</span>
                </div>

                <button
                  type="button"
                  className="gm-btn-roll-hp-action"
                  onClick={handleRollHp}
                  title={`Re-roll HP for ${token?.name || "Token"} (${monster.hitPoints.formula})`}
                >
                  🎲 Re-roll HP
                </button>

                <button
                  type="button"
                  className="gm-btn-unbind"
                  disabled={isUnbinding}
                  onClick={handleUnbind}
                  title={`Unbind ${monster.name} from this token`}
                >
                  {isUnbinding ? "Unbinding..." : "Unbind"}
                </button>
              </>
            ) : isBoundToOther ? (
              <>
                <button
                  type="button"
                  className="gm-btn-bind gm-btn-bind-switch"
                  disabled={isBinding}
                  onClick={handleBind}
                  title={`Currently bound to [${currentBound?.name}]. Click to replace and bind [${monster.name}] instead.`}
                >
                  {isBinding
                    ? "Switching..."
                    : `Switch: [${currentBound?.name}] ➔ [${monster.name}]`}
                </button>

                <label className="gm-roll-hp-toggle" title="Roll random HP based on hit dice formula">
                  <input
                    type="checkbox"
                    checked={rollHp}
                    onChange={(e) => setRollHp(e.target.checked)}
                  />
                  Roll HP ({monster.hitPoints.formula})
                </label>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="gm-btn-bind"
                  disabled={isBinding || !token}
                  onClick={handleBind}
                  title={
                    token
                      ? `Bind this statblock to [${token.name || "Token"}]`
                      : "Select a token on the map to bind"
                  }
                >
                  {isBinding
                    ? "Binding..."
                    : token
                    ? `Bind to [${token.name || "Selected Token"}]`
                    : "Select a Token to Bind"}
                </button>

                <label className="gm-roll-hp-toggle" title="Roll random HP based on hit dice formula">
                  <input
                    type="checkbox"
                    checked={rollHp}
                    onChange={(e) => setRollHp(e.target.checked)}
                  />
                  Roll HP ({monster.hitPoints.formula})
                </label>
              </>
            )}
          </div>
        )}

        {/* Quick Re-roll HP button if bound to token */}
        {token && !showBindControls && (
          <button
            type="button"
            className="gm-btn-roll-hp-action"
            onClick={handleRollHp}
            title="Re-roll token HP formula and update vitals"
          >
            🎲 Roll HP ({monster.hitPoints.formula})
          </button>
        )}

        <div className="gm-init-box">
          <select
            className="gm-roll-mode-select"
            value={rollMode}
            onChange={(e) => setRollMode(e.target.value as any)}
          >
            <option value="normal">Normal</option>
            <option value="advantage">Advantage</option>
            <option value="disadvantage">Disadvantage</option>
          </select>

          <button
            type="button"
            className="gm-btn-init"
            disabled={isRolling}
            onClick={handleInitiative}
            title="Roll Initiative for this monster"
          >
            Roll Initiative (DEX {formatMod(monster.stats.dex)})
          </button>
        </div>
      </div>

      {/* 3. VITALS */}
      <div className="gm-statblock-vitals">
        <div className="gm-vital-cell">
          <span className="gm-vital-label">Armor Class</span>
          <span className="gm-vital-val">
            {monster.armorClass} {monster.armorDesc ? `(${monster.armorDesc})` : ""}
          </span>
        </div>
        <div className="gm-vital-cell">
          <span className="gm-vital-label">Hit Points</span>
          <span className="gm-vital-val">
            {monster.hitPoints.average} ({monster.hitPoints.formula})
          </span>
        </div>
        <div className="gm-vital-cell">
          <span className="gm-vital-label">Speed</span>
          <span className="gm-vital-val">{monster.speed}</span>
        </div>
        <div className="gm-vital-cell">
          <span className="gm-vital-label">Proficiency</span>
          <span className="gm-vital-val">+{monster.proficiencyBonus}</span>
        </div>
      </div>

      {/* 4. ABILITIES GRID */}
      <div className="gm-abilities-section">
        <div className="gm-section-micro-header">
          <span className="gm-section-micro-label">Ability Scores & Checks</span>
          <span className="gm-section-micro-hint">Click to roll Check</span>
        </div>
        <div className="gm-abilities-grid">
          {(
            [
              { key: "str", label: "STR" },
              { key: "dex", label: "DEX" },
              { key: "con", label: "CON" },
              { key: "int", label: "INT" },
              { key: "wis", label: "WIS" },
              { key: "cha", label: "CHA" },
            ] as const
          ).map(({ key, label }) => (
            <div
              key={key}
              className="gm-ability-box"
              onClick={() => handleRollAbilityCheck(key, label)}
              title={`Click to roll ${label} check`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  void handleRollAbilityCheck(key, label);
                }
              }}
            >
              <span className="gm-ability-name">{label}</span>
              <span className="gm-ability-score">{monster.stats[key]}</span>
              <span className="gm-ability-mod">{formatMod(monster.stats[key])}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4.5 SAVING THROWS GRID */}
      <div className="gm-saving-throws-section">
        <div className="gm-section-micro-header">
          <span className="gm-section-micro-label">Saving Throws</span>
          <span className="gm-section-micro-hint">Click to roll Save</span>
        </div>
        <div className="gm-saving-throws-grid">
          {(
            [
              { key: "str", label: "STR" },
              { key: "dex", label: "DEX" },
              { key: "con", label: "CON" },
              { key: "int", label: "INT" },
              { key: "wis", label: "WIS" },
              { key: "cha", label: "CHA" },
            ] as const
          ).map(({ key, label }) => {
            const abilityMod = Math.floor((monster.stats[key] - 10) / 2);
            const saveBonus =
              monster.savingThrows?.[key] !== undefined
                ? monster.savingThrows[key]
                : abilityMod;
            const isProficient = monster.savingThrows?.[key] !== undefined;
            const bonusStr = saveBonus >= 0 ? `+${saveBonus}` : `${saveBonus}`;

            return (
              <div
                key={key}
                className={`gm-save-box${isProficient ? " gm-save-proficient" : ""}`}
                onClick={() => handleRollSavingThrow(key, label)}
                title={`Click to roll ${label} saving throw${isProficient ? " (Proficient)" : ""}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    void handleRollSavingThrow(key, label);
                  }
                }}
              >
                <span className="gm-save-name">{label}</span>
                <span className="gm-save-bonus">{bonusStr}</span>
                {isProficient && (
                  <span className="gm-save-prof-dot" title="Proficient">◆</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. DEFENSES & SENSES */}
      {(() => {
        const tokenVitals = token?.metadata ? extractTokenVitals(token.metadata) : null;
        const effectiveVulnerabilities = tokenVitals?.vulnerabilities && tokenVitals.vulnerabilities.length > 0
          ? tokenVitals.vulnerabilities
          : (monster.damageVulnerabilities || []);
        const effectiveResistances = tokenVitals?.resistances && tokenVitals.resistances.length > 0
          ? tokenVitals.resistances
          : (monster.damageResistances || []);
        const effectiveImmunities = tokenVitals?.immunities && tokenVitals.immunities.length > 0
          ? tokenVitals.immunities
          : (monster.damageImmunities || []);
        const effectiveConditionImmunities = monster.conditionImmunities || [];

        const hasAnyDefense =
          effectiveVulnerabilities.length > 0 ||
          effectiveResistances.length > 0 ||
          effectiveImmunities.length > 0 ||
          effectiveConditionImmunities.length > 0;

        return (
          <div className="gm-defense-tags">
            {effectiveVulnerabilities.length > 0 && (
              <div className="gm-defense-row">
                <span className="gm-defense-label">Damage Vulnerabilities:</span>
                {effectiveVulnerabilities.map((v) => (
                  <span key={v} className="gm-pill-tag gm-pill-vuln">
                    {v}
                  </span>
                ))}
              </div>
            )}

            {effectiveResistances.length > 0 && (
              <div className="gm-defense-row">
                <span className="gm-defense-label">Damage Resistances:</span>
                {effectiveResistances.map((r) => (
                  <span key={r} className="gm-pill-tag gm-pill-res">
                    {r}
                  </span>
                ))}
              </div>
            )}

            {effectiveImmunities.length > 0 && (
              <div className="gm-defense-row">
                <span className="gm-defense-label">Damage Immunities:</span>
                {effectiveImmunities.map((i) => (
                  <span key={i} className="gm-pill-tag gm-pill-imm">
                    {i}
                  </span>
                ))}
              </div>
            )}

            {effectiveConditionImmunities.length > 0 && (
              <div className="gm-defense-row">
                <span className="gm-defense-label">Condition Immunities:</span>
                {effectiveConditionImmunities.map((c) => (
                  <span key={c} className="gm-pill-tag gm-pill-cond-imm">
                    {c}
                  </span>
                ))}
              </div>
            )}

            {!hasAnyDefense && (
              <div className="gm-defense-row">
                <span className="gm-defense-label">Defenses:</span>
                <span className="gm-defense-none">None</span>
              </div>
            )}

            <div className="gm-defense-row">
              <span className="gm-defense-label">Senses:</span>
              <span>{monster.senses || "Passive Perception 10"}</span>
            </div>
            <div className="gm-defense-row">
              <span className="gm-defense-label">Languages:</span>
              <span>{monster.languages || "--"}</span>
            </div>
          </div>
        );
      })()}

      {/* 6. TRAITS */}
      {showTraits && filteredTraits.length > 0 && (
        <div className="gm-traits-container">
          <div className="gm-section-title">Special Traits</div>
          {filteredTraits.map((tr) => (
            <div key={tr.name} className="gm-trait-item">
              <span className="gm-trait-name">{tr.name}.</span>
              <span>{tr.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* 7. ACTIONS & ATTACKS */}
      {showActions && filteredActions.length > 0 && (
        <div className="gm-actions-section">
          <div className="gm-section-title">Actions & Attacks</div>

          {/* Target Token Selector */}
          {activeTokens.length > 0 && (
            <div className="gm-target-selector-row">
              <span>Target for AC Check:</span>
              <select
                className="gm-target-select"
                value={currentTargetId}
                onChange={(e) => setTargetId(e.target.value)}
              >
                <option value="">None (Standard Roll)</option>
                {activeTokens
                  .filter((t) => t.id !== token?.id)
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name || "Token"}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {filteredActions.map((act) => {
            const isMelee = act.type === "melee_attack";
            const isRanged = act.type === "ranged_attack";
            const isMultiattack = act.type === "multiattack";
            const isSpellcasting = act.type === "spell";
            const saveMechanics = parseMonsterSaveMechanics(act);
            const isAreaSaveAction = Boolean(
              onAimSaveAction &&
                saveMechanics.hasSavingThrow &&
                saveMechanics.areaOfEffect &&
                hasResolvableSaveDamage(act, saveMechanics),
            );
            const spellOptions = (act.spellOptions || []).map((option) => ({
              option,
              spell: resolveMonsterSpellOption(option, act),
            }));
            const damageDisplay = act.damageComponents?.length
              ? act.damageComponents.map((component) => `${component.formula} ${component.damageType}`).join(" + ")
              : act.damage
                ? `${act.damage} ${act.damageType || ""}`.trim()
                : "";

            const typeLabel = isMelee
              ? "Melee Attack"
              : isRanged
              ? "Ranged Attack"
              : isMultiattack
              ? "Multiattack"
              : isSpellcasting
              ? "Spellcasting"
              : "Ability";

            const badgeClass = isMelee
              ? "gm-type-melee"
              : isRanged
              ? "gm-type-ranged"
              : "gm-type-ability";

            return (
              <div key={act.id} className="gm-action-card">
                <div className="gm-action-header">
                  <span className="gm-action-name">{act.name}</span>
                  <span className={`gm-action-type-badge ${badgeClass}`}>{typeLabel}</span>
                </div>

                <div className="gm-action-desc">{act.description}</div>

                <div className="gm-action-controls">
                  <div className="gm-action-meta-stats">
                    {typeof act.attackBonus === "number" && (
                      <span>
                        Bonus:{" "}
                        <strong>
                          {act.attackBonus >= 0 ? `+${act.attackBonus}` : act.attackBonus}
                        </strong>
                      </span>
                    )}
                    {damageDisplay && <span>Damage: <strong>{damageDisplay}</strong></span>}
                    {isMelee && act.reachFeet && (
                      <span>
                        Reach: <strong>{act.reachFeet} ft.</strong>
                      </span>
                    )}
                    {isRanged && act.rangeFeet && (
                      <span>
                        Range: <strong>{act.rangeFeet}{act.rangeLongFeet ? `/${act.rangeLongFeet}` : ""} ft.</strong>
                      </span>
                    )}
                  </div>

                  <div className="gm-action-btn-group">
                    {/* Aim Button for Melee / Ranged Attacks */}
                    {onAimAction && (isMelee || isRanged) && (
                      <button
                        type="button"
                        className="gm-btn-aim-action"
                        onClick={() => void handleAimAction(act)}
                        title={`Aim ${act.name} on the map canvas`}
                      >
                        🎯 Aim
                      </button>
                    )}

                    {isAreaSaveAction && (
                      <button
                        type="button"
                        className="gm-btn-aim-action"
                        disabled={isRolling || !isBoundToThis}
                        onClick={() => void handleAimSaveAction(act)}
                        title={`Place a ${saveMechanics.areaOfEffect?.sizeFeet ?? ""} ft. ${saveMechanics.areaOfEffect?.shape ?? ""} and resolve saves per target`}
                      >
                        🎯 Aim Area
                      </button>
                    )}

                    {!isSpellcasting && !isAreaSaveAction && (!isMultiattack || Boolean(act.multiattackSequence?.length)) && (
                      <button
                        type="button"
                        className="gm-btn-roll-action"
                        disabled={isRolling}
                        onClick={() => void handleRollAction(act)}
                        title={`Execute roll for ${act.name}`}
                      >
                        Roll {act.name}
                      </button>
                    )}
                    {isMultiattack && !act.multiattackSequence?.length && (
                      <span className="gm-spell-unavailable">
                        Manual adjudication
                      </span>
                    )}
                  </div>
                </div>
                {renderUsageCounter(act.id, act.usage, act.name)}
                {isSpellcasting && spellOptions.length > 0 && (
                  <div className="gm-spell-options" aria-label={`${act.name} spells`}>
                    {spellOptions.map(({ option, spell }) => {
                      const counterId = `${act.id}:${option.id}`;
                      return (
                        <div className="gm-spell-option" key={option.id}>
                          <span className="gm-spell-option-name">
                            {option.name}
                            {option.usage && <span className="gm-spell-option-usage"> · {option.usage.label}</span>}
                          </span>
                          {spell && onCastSpell ? (
                            <button
                              type="button"
                              className="gm-btn-roll-action"
                              disabled={isRolling || !token?.id || !isBoundToThis}
                              onClick={() => void handleCastSpell(act, option, spell.id)}
                              title={isBoundToThis
                                ? `Cast ${option.name} using the spell targeting flow`
                                : "Bind this monster to the selected token before casting"}
                            >
                              Cast
                            </button>
                          ) : (
                            <span className="gm-spell-unavailable" title="This spell does not have complete casting data">
                              Description only
                            </span>
                          )}
                          {renderUsageCounter(counterId, option.usage, option.name)}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 8. BONUS ACTIONS */}
      {showBonusActions && filteredBonusActions.length > 0 && (
        <div className="gm-actions-section">
          <div className="gm-section-title">Bonus Actions</div>
          {filteredBonusActions.map((ba) => (
            <div key={ba.name} className="gm-trait-item">
              <span className="gm-trait-name">{ba.name}.</span>
              <span>{ba.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* 9. REACTIONS */}
      {showReactions && filteredReactions.length > 0 && (
        <div className="gm-actions-section">
          <div className="gm-section-title">Reactions</div>
          {filteredReactions.map((rx) => (
            <div key={rx.name} className="gm-trait-item">
              <span className="gm-trait-name">{rx.name}.</span>
              <span>{rx.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* 10. LEGENDARY ACTIONS */}
      {showLegendary && filteredLegendary.length > 0 && (
        <div className="gm-actions-section">
          <div className="gm-section-title">Legendary Actions</div>
          {filteredLegendary.map((la) => (
            <div key={la.name} className="gm-trait-item">
              <span className="gm-trait-name">{la.name}.</span>
              <span>{la.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* Self-contained Export Modal if onExport not overridden */}
      {showExportModal && (
        <MonsterExportModal
          monster={monster}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};
