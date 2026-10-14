import React, { useEffect, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import "./initiative-tracker.css";
import {
  FaForwardStep,
  FaBackwardStep,
  FaDiceD20,
  FaPlus,
  FaXmark,
  FaShieldHalved,
  FaHeartPulse,
  FaSkull,
  FaPlay,
  FaStop,
  FaChevronUp,
  FaChevronDown,
  FaLocationCrosshairs,
  FaTv,
  FaCaretDown,
} from "react-icons/fa6";
import type { Combatant, CombatEncounter } from "../../../features/combat/domain/types";
import {
  subscribeToEncounter,
  nextCombatTurn,
  prevCombatTurn,
  startEncounter,
  endEncounter,
  addCombatants,
  removeCombatant,
  rollEncounterInitiative,
  rollSingleCombatantInitiative,
  setCombatantInitiative,
  buildCombatantFromItem,
  RollAdvantageMode,
} from "../../../features/combat/initiativeService";
import {
  isCharacterToken,
  focusCameraOnToken,
  getMyPrimaryCharacterToken,
} from "../../../features/player/playerCharacterService";
import {
  toggleTopTurnTrackerPopover,
  openTopTurnTrackerPopover,
} from "../../../features/combat/turnTrackerPopoverService";
import type { Item } from "@owlbear-rodeo/sdk";
import { getLinkedDDBCharacterId, getCachedDDBCharacter } from "../../../services/ddbService";
import { getScopedMetadata } from "../../../platform/obr/metadataHelper";

async function getOBR() {
  const sdk = await import("@owlbear-rodeo/sdk");
  return sdk.default;
}

export interface InitiativeTrackerBarProps {
  className?: string;
  defaultCollapsed?: boolean;
  initialEncounter?: CombatEncounter | null;
  isGM?: boolean;
}

export const InitiativeTrackerBar: React.FC<InitiativeTrackerBarProps> = ({
  className = "",
  defaultCollapsed = false,
  initialEncounter = null,
  isGM: propIsGM,
}) => {
  const [encounter, setEncounter] = useState<CombatEncounter | null>(initialEncounter);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [editingTokenId, setEditingTokenId] = useState<string | null>(null);
  const [editInitValue, setEditInitValue] = useState<number>(10);
  const [roleIsGM, setRoleIsGM] = useState<boolean>(false);
  const [myPrimaryTokenId, setMyPrimaryTokenId] = useState<string | null>(null);
  interface RollMenuAnchorState {
    type: "all" | "single";
    tokenId?: string;
    combatantName?: string;
    top: number;
    left: number;
  }
  const [rollMenuAnchor, setRollMenuAnchor] = useState<RollMenuAnchorState | null>(null);
  const [sceneItems, setSceneItems] = useState<Item[]>([]);

  const isGM = propIsGM ?? roleIsGM;

  // Auto-dismiss roll dropdown when clicking outside or scrolling
  useEffect(() => {
    if (!rollMenuAnchor) return;
    const handleDismiss = () => {
      setRollMenuAnchor(null);
    };
    window.addEventListener("click", handleDismiss);
    window.addEventListener("scroll", handleDismiss, true);
    return () => {
      window.removeEventListener("click", handleDismiss);
      window.removeEventListener("scroll", handleDismiss, true);
    };
  }, [rollMenuAnchor]);

  useEffect(() => {
    let unsubItems: (() => void) | undefined;
    const unsubscribe = subscribeToEncounter((enc) => {
      setEncounter(enc);
    });

    getOBR()
      .then((OBR) => {
        if (OBR.isReady) {
          OBR.player.getRole().then((role) => {
            setRoleIsGM(role === "GM");
          });
          OBR.player.getId().then((id) => {
            getMyPrimaryCharacterToken(id).then((token) => {
              if (token) setMyPrimaryTokenId(token.id);
            }).catch(() => {});
          });
          OBR.scene.items.getItems().then((items) => setSceneItems(items)).catch(() => {});
          unsubItems = OBR.scene.items.onChange((items) => setSceneItems(items));
        }
      })
      .catch(() => {});

    return () => {
      unsubscribe();
      if (unsubItems) unsubItems();
    };
  }, []);

  const handleNextTurn = useCallback(async () => {
    await nextCombatTurn();
  }, []);

  const handlePrevTurn = useCallback(async () => {
    await prevCombatTurn();
  }, []);

  const handleRollAll = useCallback(async (mode: RollAdvantageMode = "normal") => {
    setRollMenuAnchor(null);
    await rollEncounterInitiative(mode);
  }, []);

  const handleRollSingle = useCallback(async (tokenId: string, mode: RollAdvantageMode = "normal") => {
    setRollMenuAnchor(null);
    await rollSingleCombatantInitiative(tokenId, mode);
  }, []);

  const handleToggleTopRibbon = useCallback(async () => {
    const count = encounter?.combatants.length ?? 4;
    await toggleTopTurnTrackerPopover(count);
  }, [encounter?.combatants.length]);

  const handleEndCombat = useCallback(async () => {
    await endEncounter();
  }, []);

  const handleStartCombatFromSelection = useCallback(async () => {
    try {
      const OBR = await getOBR();
      if (!OBR.isReady) return;
      const selection = await OBR.player.getSelection();

      let targetItems = [];
      if (selection && selection.length > 0) {
        targetItems = await OBR.scene.items.getItems(selection);
      } else {
        const allItems = await OBR.scene.items.getItems();
        targetItems = allItems.filter((it) => isCharacterToken(it));
      }

      const validTokens = targetItems.filter((it) => isCharacterToken(it));
      if (validTokens.length === 0) {
        OBR.notification.show("No valid character tokens found on scene.", "WARNING");
        return;
      }

      const newCombatants: Combatant[] = validTokens.map((item) => {
        const ddbId = getLinkedDDBCharacterId(item);
        const cachedDdb = ddbId ? getCachedDDBCharacter(ddbId) : null;
        return buildCombatantFromItem(item, cachedDdb);
      });

      await startEncounter(newCombatants);
      await openTopTurnTrackerPopover(newCombatants.length);
      OBR.notification.show(`Encounter started with ${newCombatants.length} combatant(s).`, "SUCCESS");
    } catch (err) {
      console.error("Failed to start combat:", err);
    }
  }, []);

  const handleAddSelectedTokens = useCallback(async () => {
    try {
      const OBR = await getOBR();
      if (!OBR.isReady) return;
      const selection = await OBR.player.getSelection();
      if (!selection || selection.length === 0) {
        OBR.notification.show("Select token(s) on the map first.", "INFO");
        return;
      }

      const items = await OBR.scene.items.getItems(selection);
      const validTokens = items.filter((it) => isCharacterToken(it));
      if (validTokens.length === 0) {
        OBR.notification.show("Selected items are not character tokens.", "WARNING");
        return;
      }

      const newCombatants: Combatant[] = validTokens.map((item) => {
        const ddbId = getLinkedDDBCharacterId(item);
        const cachedDdb = ddbId ? getCachedDDBCharacter(ddbId) : null;
        return buildCombatantFromItem(item, cachedDdb);
      });

      await addCombatants(newCombatants);
      OBR.notification.show(`Added ${newCombatants.length} token(s) to initiative.`, "SUCCESS");
    } catch (err) {
      console.error("Failed to add combatants:", err);
    }
  }, []);

  const handleCardClick = useCallback(async (combatant: Combatant) => {
    await focusCameraOnToken(combatant.id);
  }, []);

  const handleRemove = useCallback(async (e: React.MouseEvent, tokenId: string) => {
    e.stopPropagation();
    await removeCombatant(tokenId);
  }, []);

  const handleStartEditInit = useCallback((e: React.MouseEvent, combatant: Combatant) => {
    e.stopPropagation();
    setEditingTokenId(combatant.id);
    setEditInitValue(combatant.initiative);
  }, []);

  const handleSaveInit = useCallback(
    async (tokenId: string) => {
      await setCombatantInitiative(tokenId, editInitValue);
      setEditingTokenId(null);
    },
    [editInitValue]
  );

  const isActive = Boolean(encounter && encounter.isActive && encounter.combatants.length > 0);
  const activeCombatant = isActive && encounter ? encounter.combatants[encounter.turnIndex] : null;

  const myCombatant = useMemo(() => {
    if (!encounter || isGM) return null;
    if (myPrimaryTokenId) {
      const found = encounter.combatants.find((c) => c.id === myPrimaryTokenId);
      if (found) return found;
    }
    return encounter.combatants.find((c) => c.isPlayer) ?? null;
  }, [encounter, isGM, myPrimaryTokenId]);

  if (!isActive && !isGM) {
    return null;
  }

  return (
    <div
      className={`ddb-bg3-initiative-tracker ${isCollapsed ? "collapsed" : ""} ${className}`}
      data-testid="bg3-initiative-tracker"
    >
      {/* Header bar */}
      <div className="ddb-bg3-initiative-header">
        {/* Row 1: Status & Tools */}
        <div className="ddb-bg3-initiative-header-row">
          <div className="ddb-bg3-initiative-header-left">
            {isActive && encounter ? (
              <>
                <span className="ddb-bg3-round-badge">
                  Round {encounter.round}
                </span>
                <span className="ddb-bg3-turn-summary" title={activeCombatant?.name ?? "Unknown"}>
                  Turn {encounter.turnIndex + 1}/{encounter.combatants.length}:{" "}
                  <strong>{activeCombatant?.name ?? "Unknown"}</strong>
                </span>
              </>
            ) : (
              <span className="ddb-bg3-round-badge inactive">
                No Combat Active
              </span>
            )}
          </div>

          <div className="ddb-bg3-header-right-tools">
            {isActive && (
              <button
                type="button"
                className="ddb-bg3-combat-btn icon-only"
                title="Toggle BG3 Top Ribbon"
                onClick={handleToggleTopRibbon}
                aria-label="Toggle BG3 Top Ribbon"
              >
                <FaTv size={11} />
              </button>
            )}
            <button
              type="button"
              className="ddb-bg3-combat-btn icon-only"
              title={isCollapsed ? "Expand Tracker" : "Collapse Tracker"}
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label={isCollapsed ? "Expand Tracker" : "Collapse Tracker"}
            >
              {isCollapsed ? <FaChevronDown size={11} /> : <FaChevronUp size={11} />}
            </button>
          </div>
        </div>

        {/* Row 2: GM Controls */}
        {isGM && (
          <div className="ddb-bg3-initiative-controls">
            {isActive ? (
              <>
                <button
                  type="button"
                  className="ddb-bg3-combat-btn icon-only"
                  title="Previous Turn (GM)"
                  onClick={handlePrevTurn}
                  aria-label="Previous Turn"
                >
                  <FaBackwardStep size={11} />
                </button>
                <button
                  type="button"
                  className="ddb-bg3-combat-btn primary"
                  title="Next Turn (GM)"
                  onClick={handleNextTurn}
                  aria-label="Next Turn"
                >
                  <FaForwardStep size={11} />
                  <span>Next</span>
                </button>

                {/* Roll All with Dropdown */}
                <div className="ddb-bg3-roll-menu-container">
                  <button
                    type="button"
                    className="ddb-bg3-combat-btn"
                    title="Roll All Initiative (GM)"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (rollMenuAnchor?.type === "all") {
                        setRollMenuAnchor(null);
                      } else {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const hasRoomBelow = rect.bottom + 115 <= window.innerHeight;
                        setRollMenuAnchor({
                          type: "all",
                          top: hasRoomBelow ? rect.bottom + 4 : Math.max(8, rect.top - 105),
                          left: Math.max(8, Math.min(window.innerWidth - 150, rect.left)),
                        });
                      }
                    }}
                    aria-label="Roll All Initiative"
                  >
                    <FaDiceD20 size={11} />
                    <span>Roll All</span>
                    <FaCaretDown size={9} />
                  </button>
                </div>

                <button
                  type="button"
                  className="ddb-bg3-combat-btn icon-only"
                  title="Add Selected Tokens to Combat (GM)"
                  onClick={handleAddSelectedTokens}
                  aria-label="Add Selected Tokens"
                >
                  <FaPlus size={11} />
                </button>
                <button
                  type="button"
                  className="ddb-bg3-combat-btn icon-only"
                  title="End Combat (GM)"
                  onClick={handleEndCombat}
                  aria-label="End Combat"
                >
                  <FaStop size={11} />
                </button>
              </>
            ) : (
              <button
                type="button"
                className="ddb-bg3-combat-btn gold"
                onClick={handleStartCombatFromSelection}
                aria-label="Start Combat"
              >
                <FaPlay size={10} />
                <span>Start Combat</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Content (when not collapsed) */}
      {!isCollapsed && (
        <>
          {/* Player Quick Roll Initiative Banner */}
          {isActive && myCombatant && (
            <div className="ddb-bg3-player-roll-prompt" data-testid="player-roll-prompt">
              <div className="ddb-bg3-player-roll-label">
                <span>
                  Roll Initiative: <strong>{myCombatant.name}</strong> ({myCombatant.initiativeBonus >= 0 ? `+${myCombatant.initiativeBonus}` : myCombatant.initiativeBonus})
                </span>
              </div>
              <div className="ddb-bg3-player-roll-actions">
                <button
                  type="button"
                  className="ddb-bg3-roll-mode-btn normal"
                  onClick={() => handleRollSingle(myCombatant.id, "normal")}
                >
                  <FaDiceD20 size={11} />
                  <span>Normal</span>
                </button>
                <button
                  type="button"
                  className="ddb-bg3-roll-mode-btn advantage"
                  onClick={() => handleRollSingle(myCombatant.id, "advantage")}
                >
                  <FaDiceD20 size={11} />
                  <span>Advantage</span>
                </button>
                <button
                  type="button"
                  className="ddb-bg3-roll-mode-btn disadvantage"
                  onClick={() => handleRollSingle(myCombatant.id, "disadvantage")}
                >
                  <FaDiceD20 size={11} />
                  <span>Disadvantage</span>
                </button>
              </div>
            </div>
          )}

          {isActive && encounter ? (
            <div className="ddb-bg3-combatants-reel" role="list">
              {encounter.combatants.map((combatant, index) => {
                const isCurrentTurn = index === encounter.turnIndex;

                const tokenItem = sceneItems.find((it) => it.id === combatant.id);
                const vitals = tokenItem ? getScopedMetadata<any>(tokenItem.metadata, "vitals") : null;
                const bound = tokenItem ? getScopedMetadata<any>(tokenItem.metadata, "bound-monster") : null;

                const resolvedHpMax = typeof vitals?.hpMax === "number"
                  ? vitals.hpMax
                  : (typeof bound?.hitPoints?.average === "number" ? bound.hitPoints.average : (combatant.hpMax ?? 10));

                const resolvedHpCurrent = typeof vitals?.hpCurrent === "number"
                  ? vitals.hpCurrent
                  : (typeof bound?.hitPoints?.average === "number" && combatant.hpCurrent === undefined
                      ? bound.hitPoints.average
                      : (combatant.hpCurrent ?? resolvedHpMax));

                const resolvedAc = typeof vitals?.armorClass === "number"
                  ? vitals.armorClass
                  : (typeof bound?.armorClass === "number" ? bound.armorClass : (combatant.ac ?? 10));

                const resolvedImmunities: string[] = Array.isArray(vitals?.immunities) && vitals.immunities.length > 0
                  ? vitals.immunities
                  : (Array.isArray(bound?.damageImmunities) ? bound.damageImmunities : (combatant.immunities ?? []));

                const resolvedResistances: string[] = Array.isArray(vitals?.resistances) && vitals.resistances.length > 0
                  ? vitals.resistances
                  : (Array.isArray(bound?.damageResistances) ? bound.damageResistances : (combatant.resistances ?? []));

                const hpCurrent = resolvedHpCurrent;
                const hpMax = resolvedHpMax;
                const hpRatio = hpMax > 0 ? Math.max(0, Math.min(1, hpCurrent / hpMax)) : 1;
                const isDefeated = combatant.isDefeated || hpCurrent <= 0;
                const canRollThisCombatant = isGM || combatant.isPlayer || (myPrimaryTokenId && combatant.id === myPrimaryTokenId);

                let hpClass = "high";
                if (isDefeated) hpClass = "dead";
                else if (hpRatio < 0.25) hpClass = "low";
                else if (hpRatio < 0.5) hpClass = "mid";

                return (
                  <div
                    key={combatant.id}
                    role="listitem"
                    className={`ddb-bg3-combatant-card ${isCurrentTurn ? "active" : ""} ${
                      isDefeated ? "defeated" : ""
                    }`}
                    onClick={() => handleCardClick(combatant)}
                    title={`Click to focus camera on ${combatant.name}`}
                  >
                    {isCurrentTurn && (
                      <span className="ddb-bg3-card-turn-banner">Active</span>
                    )}

                    <div className="ddb-bg3-card-top">
                      <div className="ddb-bg3-card-avatar">
                        {combatant.avatarUrl ? (
                          <img
                            src={combatant.avatarUrl}
                            alt={combatant.name}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="ddb-bg3-card-avatar-fallback">
                            {combatant.name.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="ddb-bg3-card-details">
                        <span className="ddb-bg3-card-name" title={combatant.name}>
                          {combatant.name}
                        </span>

                        <div className="ddb-bg3-card-badges-row">
                          {editingTokenId === combatant.id ? (
                            <input
                              type="number"
                              className="ddb-bg3-init-badge"
                              style={{ width: 36, padding: "0 2px" }}
                              value={editInitValue}
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => setEditInitValue(parseInt(e.target.value, 10) || 0)}
                              onBlur={() => handleSaveInit(combatant.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveInit(combatant.id);
                                else if (e.key === "Escape") setEditingTokenId(null);
                              }}
                            />
                          ) : isGM ? (
                            <span
                              className="ddb-bg3-init-badge interactive"
                              title="Click to edit initiative (GM)"
                              onClick={(e) => handleStartEditInit(e, combatant)}
                            >
                              Init {combatant.initiative}
                            </span>
                          ) : (
                            <span className="ddb-bg3-init-badge" title="Initiative">
                              Init {combatant.initiative}
                            </span>
                          )}

                          {/* Quick Roll Button & Menu for this combatant */}
                          {canRollThisCombatant && (
                            <div className="ddb-bg3-roll-menu-container">
                              <button
                                type="button"
                                className="ddb-bg3-card-roll-btn"
                                title={`Roll Initiative for ${combatant.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (rollMenuAnchor?.type === "single" && rollMenuAnchor.tokenId === combatant.id) {
                                    setRollMenuAnchor(null);
                                  } else {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const hasRoomBelow = rect.bottom + 115 <= window.innerHeight;
                                    setRollMenuAnchor({
                                      type: "single",
                                      tokenId: combatant.id,
                                      combatantName: combatant.name,
                                      top: hasRoomBelow ? rect.bottom + 4 : Math.max(8, rect.top - 105),
                                      left: Math.max(8, Math.min(window.innerWidth - 150, rect.left)),
                                    });
                                  }
                                }}
                                aria-label={`Roll Initiative for ${combatant.name}`}
                              >
                                <FaDiceD20 size={10} />
                              </button>
                            </div>
                          )}

                          <span className="ddb-bg3-ac-badge" title="Armor Class">
                            <FaShieldHalved size={9} />
                            {resolvedAc}
                          </span>

                          {resolvedImmunities.length > 0 && (
                            <span
                              className="ddb-bg3-defense-badge imm"
                              style={{
                                fontSize: "9px",
                                background: "rgba(56, 189, 248, 0.15)",
                                border: "1px solid rgba(56, 189, 248, 0.4)",
                                color: "#38bdf8",
                                borderRadius: "3px",
                                padding: "1px 4px",
                                fontWeight: 600,
                              }}
                              title={`Damage Immunities: ${resolvedImmunities.join(", ")}`}
                            >
                              Imm: {resolvedImmunities[0]}{resolvedImmunities.length > 1 ? ` +${resolvedImmunities.length - 1}` : ""}
                            </span>
                          )}

                          {resolvedResistances.length > 0 && (
                            <span
                              className="ddb-bg3-defense-badge res"
                              style={{
                                fontSize: "9px",
                                background: "rgba(34, 197, 94, 0.15)",
                                border: "1px solid rgba(34, 197, 94, 0.4)",
                                color: "#86efac",
                                borderRadius: "3px",
                                padding: "1px 4px",
                                fontWeight: 600,
                              }}
                              title={`Damage Resistances: ${resolvedResistances.join(", ")}`}
                            >
                              Res: {resolvedResistances[0]}{resolvedResistances.length > 1 ? ` +${resolvedResistances.length - 1}` : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Vitals row */}
                    <div className="ddb-bg3-card-hp-wrapper">
                      <div className="ddb-bg3-card-hp-text">
                        <span>
                          {isDefeated ? (
                            <FaSkull size={9} style={{ color: "#ef4444", marginRight: 3 }} />
                          ) : (
                            <FaHeartPulse size={9} style={{ color: "#10b981", marginRight: 3 }} />
                          )}
                          {isDefeated ? "Defeated" : `${hpCurrent}/${hpMax}`}
                        </span>
                        <FaLocationCrosshairs size={9} style={{ opacity: 0.6 }} />
                      </div>
                      <div className="ddb-bg3-card-hp-track">
                        <div
                          className={`ddb-bg3-card-hp-fill ${hpClass}`}
                          style={{ width: `${Math.round(hpRatio * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick remove button (GM only) */}
                    {isGM && (
                      <button
                        type="button"
                        className="ddb-bg3-card-remove-btn"
                        title="Remove from combat (GM)"
                        onClick={(e) => handleRemove(e, combatant.id)}
                        aria-label="Remove combatant"
                      >
                        <FaXmark size={9} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : isGM ? (
            <div className="ddb-bg3-initiative-empty">
              <span className="ddb-bg3-initiative-empty-text">
                Select tokens on map and click Start Combat to begin initiative.
              </span>
              <button
                type="button"
                className="ddb-bg3-combat-btn gold"
                onClick={handleStartCombatFromSelection}
              >
                <FaPlay size={10} />
                <span>Start Combat</span>
              </button>
            </div>
          ) : null}
        </>
      )}

      {/* Floating Roll Initiative Portal Menu (Unclipped by tracker or reel overflow) */}
      {rollMenuAnchor && typeof document !== "undefined" && createPortal(
        <div
          className="ddb-bg3-roll-menu-popover ddb-bg3-roll-menu-portal"
          style={{
            position: "fixed",
            top: rollMenuAnchor.top,
            left: rollMenuAnchor.left,
            zIndex: 99999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {rollMenuAnchor.type === "all" ? (
            <>
              <button
                type="button"
                className="ddb-bg3-roll-menu-item"
                onClick={() => handleRollAll("normal")}
              >
                <span>Normal All</span>
                <span style={{ opacity: 0.6 }}>1d20</span>
              </button>
              <button
                type="button"
                className="ddb-bg3-roll-menu-item adv"
                onClick={() => handleRollAll("advantage")}
              >
                <span>Advantage All</span>
                <span style={{ opacity: 0.6 }}>2d20kh1</span>
              </button>
              <button
                type="button"
                className="ddb-bg3-roll-menu-item disadv"
                onClick={() => handleRollAll("disadvantage")}
              >
                <span>Disadvantage All</span>
                <span style={{ opacity: 0.6 }}>2d20kl1</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="ddb-bg3-roll-menu-item"
                onClick={() => rollMenuAnchor.tokenId && handleRollSingle(rollMenuAnchor.tokenId, "normal")}
              >
                <span>Normal</span>
                <span style={{ opacity: 0.6 }}>1d20</span>
              </button>
              <button
                type="button"
                className="ddb-bg3-roll-menu-item adv"
                onClick={() => rollMenuAnchor.tokenId && handleRollSingle(rollMenuAnchor.tokenId, "advantage")}
              >
                <span>Advantage</span>
                <span style={{ opacity: 0.6 }}>2d20kh1</span>
              </button>
              <button
                type="button"
                className="ddb-bg3-roll-menu-item disadv"
                onClick={() => rollMenuAnchor.tokenId && handleRollSingle(rollMenuAnchor.tokenId, "disadvantage")}
              >
                <span>Disadvantage</span>
                <span style={{ opacity: 0.6 }}>2d20kl1</span>
              </button>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default InitiativeTrackerBar;
