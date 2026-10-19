import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import "./BG3TopTurnTracker.scss";
import { FaChevronLeft, FaChevronRight, FaSkull } from "react-icons/fa6";
import type { Item } from "@owlbear-rodeo/sdk";
import type { Combatant, CombatEncounter } from "../features/combat/domain/types";
import {
  subscribeToEncounter,
  nextCombatTurn,
  prevCombatTurn,
  extractEncounterFromMetadata,
} from "../features/combat/initiativeService";
import { focusCameraOnToken, setTokenDisposition } from "../features/player/playerCharacterService";
import { getScopedMetadata } from "../platform/obr/metadataHelper";
import { getTokenDisposition } from "../features/combat/domain/attackRangeRules";
import { resolveArmorClassFromSources } from "../features/combat/domain/armorClass";
import { resolveCasterCharacter } from "../services/ddbService";
import { APP_KEY } from "../config";
import { GLOBAL_STORAGE_KEYS } from "../components/Settings/settings";
import { darknessVisibilityReducer } from "./darknessVisibilityState";
import { setTurnTrackerTooltipVisible } from "../features/combat/turnTrackerPopoverService";

async function getOBR() {
  const sdk = await import("@owlbear-rodeo/sdk");
  return sdk.default;
}

interface TrackerTooltip {
  combatantId: string;
  left: number;
  top: number;
  content: React.ReactNode;
}

export function clampTooltipLeft(
  anchorCenter: number,
  tooltipWidth: number,
  viewportWidth: number,
): number {
  const gutter = 8;
  const halfTooltipWidth = tooltipWidth / 2;
  const minCenter = gutter + halfTooltipWidth;
  const maxCenter = viewportWidth - gutter - halfTooltipWidth;
  if (maxCenter < minCenter) return viewportWidth / 2;
  return Math.min(Math.max(minCenter, anchorCenter), maxCenter);
}

export interface BG3TopTurnTrackerProps {
  initialEncounter?: CombatEncounter | null;
  initialIsGM?: boolean;
  initialShowHpToPlayers?: boolean;
  initialShowHpBarToPlayers?: boolean;
  initialShowAcToPlayers?: boolean;
  initialDarknessHiddenTokenIds?: string[];
  initialHideVitalsInDarkness?: boolean;
  initialHideTrackerHpBarInDarkness?: boolean;
  initialDarknessVisibilityReady?: boolean;
  initialSceneItems?: Array<Pick<Item, "id" | "metadata">>;
}

export const BG3TopTurnTracker: React.FC<BG3TopTurnTrackerProps> = ({
  initialEncounter = null,
  initialIsGM = false,
  initialShowHpToPlayers = false,
  initialShowHpBarToPlayers = false,
  initialShowAcToPlayers = false,
  initialDarknessHiddenTokenIds = [],
  initialHideVitalsInDarkness = true,
  initialHideTrackerHpBarInDarkness = true,
  initialDarknessVisibilityReady = false,
  initialSceneItems = [],
}) => {
  const [encounter, setEncounter] = useState<CombatEncounter | null>(initialEncounter);
  const [isGM, setIsGM] = useState<boolean>(initialIsGM);
  const [showHpToPlayers, setShowHpToPlayers] = useState<boolean>(initialShowHpToPlayers);
  const [showHpBarToPlayers, setShowHpBarToPlayers] = useState<boolean>(initialShowHpBarToPlayers);
  const [showAcToPlayers, setShowAcToPlayers] = useState<boolean>(initialShowAcToPlayers);
  const [darknessVisibility, dispatchDarknessVisibility] = useReducer(
    darknessVisibilityReducer,
    {
      hiddenTokenIds: new Set(initialDarknessHiddenTokenIds),
      ready: initialDarknessVisibilityReady,
    }
  );
  const [hideVitalsInDarkness, setHideVitalsInDarkness] = useState(initialHideVitalsInDarkness);
  const [hideTrackerHpBarInDarkness, setHideTrackerHpBarInDarkness] = useState(initialHideTrackerHpBarInDarkness);
  const [sceneItems, setSceneItems] = useState<Array<Pick<Item, "id" | "metadata">>>(initialSceneItems);
  const [hoveredTooltip, setHoveredTooltip] = useState<TrackerTooltip | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipRequestIdRef = useRef(0);
  const activeTooltipIdRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (!hoveredTooltip || !tooltipRef.current) return;

    const tooltipWidth = tooltipRef.current.getBoundingClientRect().width;
    const left = clampTooltipLeft(
      hoveredTooltip.left,
      tooltipWidth,
      document.documentElement.clientWidth,
    );
    if (left !== hoveredTooltip.left) {
      setHoveredTooltip((current) =>
        current?.combatantId === hoveredTooltip.combatantId
          ? { ...current, left }
          : current,
      );
    }
  }, [hoveredTooltip]);

  useEffect(() => {
    void setTurnTrackerTooltipVisible(false);
    return () => {
      tooltipRequestIdRef.current += 1;
      activeTooltipIdRef.current = null;
      void setTurnTrackerTooltipVisible(false);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let unsubItems: (() => void) | undefined;
    let unsubMetadata: (() => void) | undefined;
    let unsubPlayer: (() => void) | undefined;
    let currentEncounter = initialEncounter;
    let visibilityRequestId = 0;
    let refreshDarknessVisibility: () => Promise<void> = async () => {};

    const unsubscribe = subscribeToEncounter((enc) => {
      if (mounted) {
        currentEncounter = enc;
        setEncounter(enc);
        void refreshDarknessVisibility();
      }
    });

    getOBR()
      .then((OBR) => {
        refreshDarknessVisibility = async () => {
          const requestId = ++visibilityRequestId;
          if (mounted) dispatchDarknessVisibility({ type: "refresh-started" });
          try {
            const [role, items, metadata] = await Promise.all([
              OBR.player.getRole(),
              OBR.scene.items.getItems(),
              OBR.scene.getMetadata(),
            ]);
            const metadataEncounter = extractEncounterFromMetadata(metadata);
            const activeEncounter = metadataEncounter ?? currentEncounter;
            if (metadataEncounter) {
              currentEncounter = metadataEncounter;
              if (mounted) setEncounter(metadataEncounter);
            }

            const hideVitalsKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.HIDE_TOKEN_VITALS_IN_DARKNESS}`;
            const hideTrackerHpBarKey =
              `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.HIDE_TRACKER_MONSTER_HP_BAR_IN_DARKNESS}`;
            const hideVitals = metadata[hideVitalsKey] !== false;
            const hideTrackerHpBar = metadata[hideTrackerHpBarKey] !== false;
            if (mounted && requestId === visibilityRequestId) {
              setHideVitalsInDarkness(hideVitals);
              setHideTrackerHpBarInDarkness(hideTrackerHpBar);
            }

            if (role === "GM" || !hideVitals || !hideTrackerHpBar || !activeEncounter) {
              if (mounted && requestId === visibilityRequestId) {
                dispatchDarknessVisibility({
                  type: "refresh-completed",
                  hiddenTokenIds: new Set(),
                });
              }
              return;
            }

            const [{ extractDarknessZones }, { getTokenIdsInsideDarkness }] =
              await Promise.all([
                import("../features/targeting/application/lineOfSightService"),
                import("../features/targeting/infrastructure/obr/darknessVisionHandler"),
              ]);
            const darknessZones = extractDarknessZones(items);
            if (darknessZones.length === 0) {
              if (mounted && requestId === visibilityRequestId) {
                dispatchDarknessVisibility({
                  type: "refresh-completed",
                  hiddenTokenIds: new Set(),
                });
              }
              return;
            }

            const trackerTokens = activeEncounter.combatants.flatMap((combatant) => {
              const token = items.find((item) => item.id === combatant.id);
              return token ? [token] : [];
            });
            const hiddenIds = await getTokenIdsInsideDarkness(trackerTokens, darknessZones);
            if (mounted && requestId === visibilityRequestId) {
              dispatchDarknessVisibility({
                type: "refresh-completed",
                hiddenTokenIds: hiddenIds,
              });
            }
          } catch (error) {
            console.error("Failed to update turn tracker Darkness visibility:", error);
          }
        };

        const init = async () => {
          if (!mounted) return;
          try {
            const role = await OBR.player.getRole();
            if (mounted) setIsGM(role === "GM");
          } catch {}
          try {
            const metadata = await OBR.scene.getMetadata();
            const enc = extractEncounterFromMetadata(metadata);
            if (mounted && enc) {
              currentEncounter = enc;
              setEncounter(enc);
            }
            const hpSettingKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_TO_PLAYERS}`;
            if (mounted) setShowHpToPlayers(metadata[hpSettingKey] === true);
            const hpBarSettingKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_BAR_TO_PLAYERS}`;
            if (mounted) setShowHpBarToPlayers(metadata[hpBarSettingKey] === true);
            const acSettingKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_AC_TO_PLAYERS}`;
            if (mounted) setShowAcToPlayers(metadata[acSettingKey] === true);
          } catch {}
          try {
            const items = await OBR.scene.items.getItems();
            if (mounted) setSceneItems(items);
          } catch {}
          await refreshDarknessVisibility();
        };

        if (OBR.isReady) {
          init();
        } else {
          OBR.onReady(init);
        }

        let darknessDebounceTimeout: number | null = null;
        unsubItems = OBR.scene.items.onChange((items) => {
          if (!mounted) return;
          setSceneItems((prev) => {
            const combatantIds = new Set(currentEncounter?.combatants?.map((c) => c.id) || []);
            const prevCombatantTokens = prev.filter((p) => combatantIds.has(p.id));
            const nextCombatantTokens = items.filter((it) => combatantIds.has(it.id));
            if (
              prevCombatantTokens.length === nextCombatantTokens.length &&
              prevCombatantTokens.every((p, i) => {
                const n = nextCombatantTokens[i];
                return p.id === n.id && p.metadata === n.metadata;
              })
            ) {
              return prev;
            }
            return items;
          });

          if (darknessDebounceTimeout !== null) {
            window.clearTimeout(darknessDebounceTimeout);
          }
          darknessDebounceTimeout = window.setTimeout(() => {
            darknessDebounceTimeout = null;
            void refreshDarknessVisibility();
          }, 80);
        });

        unsubMetadata = OBR.scene.onMetadataChange((metadata) => {
          const hpSettingKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_TO_PLAYERS}`;
          if (mounted) setShowHpToPlayers(metadata[hpSettingKey] === true);
          const hpBarSettingKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_BAR_TO_PLAYERS}`;
          if (mounted) setShowHpBarToPlayers(metadata[hpBarSettingKey] === true);
          const acSettingKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_AC_TO_PLAYERS}`;
          if (mounted) setShowAcToPlayers(metadata[acSettingKey] === true);
          void refreshDarknessVisibility();
        });
        unsubPlayer = OBR.player.onChange((player) => {
          if (mounted) {
            setIsGM(player.role === "GM");
          }
          void refreshDarknessVisibility();
        });
      })
      .catch(() => {});

    return () => {
      mounted = false;
      unsubscribe();
      if (unsubItems) unsubItems();
      if (unsubMetadata) unsubMetadata();
      if (unsubPlayer) unsubPlayer();
    };
  }, []);

  const handleNextTurn = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    await nextCombatTurn();
  }, []);

  const handlePrevTurn = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    await prevCombatTurn();
  }, []);

  const handleFocus = useCallback(async (combatant: Combatant) => {
    await focusCameraOnToken(combatant.id);
  }, []);

  const showTooltip = useCallback(
    async (
      event: React.MouseEvent<HTMLDivElement>,
      combatantId: string,
      content: React.ReactNode,
    ) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const requestId = ++tooltipRequestIdRef.current;
      activeTooltipIdRef.current = combatantId;
      await setTurnTrackerTooltipVisible(true);
      if (tooltipRequestIdRef.current !== requestId) return;
      setHoveredTooltip({
        combatantId,
        left: rect.left + rect.width / 2,
        top: rect.top + 60,
        content,
      });
    },
    [],
  );

  const hideTooltip = useCallback((combatantId: string) => {
    if (activeTooltipIdRef.current !== combatantId) return;

    tooltipRequestIdRef.current += 1;
    activeTooltipIdRef.current = null;
    setHoveredTooltip(null);
    void setTurnTrackerTooltipVisible(false);
  }, []);

  if (!encounter || !encounter.isActive || encounter.combatants.length === 0) {
    return null;
  }

  return (
    <div className="bg3-turn-tracker-root" data-testid="bg3-top-turn-tracker">
      <div className="bg3-turn-ribbon-bar">
        {/* Corner Rivet Accents */}
        <div className="bg3-ribbon-rivet top-left" />
        <div className="bg3-ribbon-rivet bottom-left" />
        <div className="bg3-ribbon-rivet top-right" />
        <div className="bg3-ribbon-rivet bottom-right" />

        {/* Left Ornate Wing */}
        <div className="bg3-filigree-wing left">
          <svg className="bg3-filigree-svg" viewBox="0 0 16 48" fill="none">
            <path
              d="M14 4C10 7 6 13 4 19C2 25 2 31 4 37C6 40 10 43 14 45"
              stroke="url(#bg3CrimsonGradLeft)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="6" cy="24" r="2" fill="#ef4444" opacity="0.95" />
            <defs>
              <linearGradient id="bg3CrimsonGradLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b1d24" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#8b1d24" />
              </linearGradient>
            </defs>
          </svg>
          <div className="bg3-round-gem" title={`Round ${encounter.round}`}>
            <span className="bg3-round-label">R{encounter.round}</span>
          </div>
          {isGM && (
            <button
              type="button"
              className="bg3-turn-step-btn prev"
              title="Previous Turn (GM)"
              onClick={handlePrevTurn}
              aria-label="Previous Turn"
            >
              <FaChevronLeft size={9} />
            </button>
          )}
        </div>

        {/* Divider separating round/controls from portraits */}
        <div className="bg3-ribbon-divider" />

        {/* Portraits Track */}
        <div className="bg3-portraits-track" role="list">
          {encounter.combatants.map((combatant, index) => {
            const isActive = index === encounter.turnIndex;
            const tokenItem = sceneItems.find((it) => it.id === combatant.id);
            const vitals = tokenItem ? getScopedMetadata<any>(tokenItem.metadata, "vitals") : null;
            const bound = tokenItem ? getScopedMetadata<any>(tokenItem.metadata, "bound-monster") : null;

            const rawDisp = combatant.disposition ?? (tokenItem ? getTokenDisposition(tokenItem) : null);
            const tokenConditions = ((vitals?.conditions ?? combatant.conditions ?? []) as string[]).map(c => c.toLowerCase());
            const hasHostileMindControl = tokenConditions.includes("crown of madness") || tokenConditions.includes("dominated");

            const isPlayer = combatant.isPlayer ?? false;
            const isAlly = rawDisp === "friendly"
              ? true
              : rawDisp === "hostile"
                ? false
                : hasHostileMindControl
                  ? !isPlayer
                  : isPlayer;
            const isMonster = !isAlly;

            const resolvedHpMax = typeof vitals?.hpMax === "number"
              ? vitals.hpMax
              : (typeof bound?.hitPoints?.average === "number" ? bound.hitPoints.average : (combatant.hpMax ?? 10));

            const resolvedHpCurrent = typeof vitals?.hpCurrent === "number"
              ? vitals.hpCurrent
              : (typeof bound?.hitPoints?.average === "number" && combatant.hpCurrent === undefined
                  ? bound.hitPoints.average
                  : (combatant.hpCurrent ?? resolvedHpMax));

            const linkedDdb = tokenItem ? resolveCasterCharacter(tokenItem) : null;
            const resolvedAc = resolveArmorClassFromSources(
              vitals?.armorClass,
              bound?.armorClass,
              combatant.ac,
              linkedDdb?.armorClass,
            );

            const resolvedHpTemp = typeof vitals?.hpTemp === "number"
              ? vitals.hpTemp
              : (combatant.hpTemp ?? 0);

            const resolvedConditions = (vitals?.conditions && vitals.conditions.length > 0)
              ? vitals.conditions
              : (combatant.conditions ?? []);

            const hpCurrent = resolvedHpCurrent;
            const hpMax = resolvedHpMax;
            const isDefeated = combatant.isDefeated || hpCurrent <= 0;
            const hpPercent = Math.max(0, Math.min(100, Math.round((hpCurrent / hpMax) * 100)));
            const showMonsterVitals = isMonster && (
              isGM || showHpToPlayers || showAcToPlayers ||
              (isDefeated && showHpBarToPlayers)
            );
            const showPlayerVitals = isPlayer;
            const hideHpBarForDarkness =
              !isGM &&
              hideVitalsInDarkness &&
              hideTrackerHpBarInDarkness &&
              (!darknessVisibility.ready || darknessVisibility.hiddenTokenIds.has(combatant.id));
            const showHpBar = (showPlayerVitals || (isMonster && (isGM || showHpBarToPlayers))) &&
              !hideHpBarForDarkness;
            const showHpText = showPlayerVitals || (isMonster && (isGM || showHpToPlayers));
            const showAc = showPlayerVitals || (isMonster && (isGM || showAcToPlayers));
            const showVitals = showPlayerVitals || showMonsterVitals;
            const showDefeated = isDefeated && (
              isPlayer || (isMonster && (isGM || showHpBarToPlayers || showHpToPlayers))
            );
            const tooltipContent = (
              <>
                <span className="bg3-tooltip-name">{combatant.name}</span>
                {showVitals && (
                  <span className="bg3-tooltip-vitals">
                    {showDefeated ? (
                      <span style={{ color: "#ef4444", display: "inline-flex", alignItems: "center", gap: 3 }}>
                        <FaSkull size={8} /> Defeated{showAc ? ` | AC ${resolvedAc}` : ""}
                      </span>
                    ) : (
                      `${showHpText ? `HP ${hpCurrent}/${hpMax}${resolvedHpTemp ? ` (+${resolvedHpTemp})` : ""}` : ""}${showHpText && showAc ? " | " : ""}${showAc ? `AC ${resolvedAc}` : ""}`
                    )}
                  </span>
                )}
                {resolvedConditions && resolvedConditions.length > 0 && (
                  <span className="bg3-tooltip-conditions" style={{ color: "#f59e0b", fontSize: "9px" }}>
                    {resolvedConditions.map((c: string) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}
                  </span>
                )}
                <span className="bg3-tooltip-init">Init: {combatant.initiative}</span>
              </>
            );

            return (
              <div
                key={combatant.id}
                role="listitem"
                className={`bg3-portrait-card ${isActive ? "active" : ""} ${
                  isAlly ? "ally" : "enemy"
                } ${showDefeated ? "defeated" : ""}`}
                onClick={() => handleFocus(combatant)}
                onContextMenu={async (event) => {
                  if (isGM) {
                    event.preventDefault();
                    const nextDisp = isAlly ? "hostile" : "friendly";
                    await setTokenDisposition(combatant.id, nextDisp);
                  }
                }}
                onMouseEnter={(event) =>
                  showTooltip(event, combatant.id, tooltipContent)
                }
                onMouseLeave={() => hideTooltip(combatant.id)}
              >
                <div className="bg3-portrait-img-box">
                  {combatant.avatarUrl ? (
                    <img
                      src={combatant.avatarUrl}
                      alt={combatant.name}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="bg3-portrait-fallback">
                      {combatant.name.charAt(0)}
                    </span>
                  )}
                  {/* Subtle inner shadow vignette */}
                  <div className="bg3-portrait-vignette" />
                </div>

                {/* Micro Health Gauge along bottom */}
                {showHpBar && (
                  <div className="bg3-portrait-hp-bar">
                    <div
                      className={`bg3-portrait-hp-fill ${
                        isDefeated
                          ? "dead"
                          : hpPercent <= 30
                          ? "critical"
                          : hpPercent <= 60
                          ? "injured"
                          : "healthy"
                      }`}
                      style={{ width: `${hpPercent}%` }}
                    />
                  </div>
                )}

                {/* Active marker pointer arrow */}
                {isActive && <div className="bg3-active-marker-arrow" />}

                {/* Hover Tooltip */}
                <div className="bg3-portrait-tooltip" aria-hidden="true">
                  {tooltipContent}
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider separating portraits from next control */}
        {isGM && <div className="bg3-ribbon-divider" />}

        {/* Right Ornate Wing */}
        <div className="bg3-filigree-wing right">
          {isGM && (
            <button
              type="button"
              className="bg3-turn-step-btn next"
              title="Next Turn (GM)"
              onClick={handleNextTurn}
              aria-label="Next Turn"
            >
              <FaChevronRight size={10} />
            </button>
          )}
          <svg className="bg3-filigree-svg flip" viewBox="0 0 16 48" fill="none">
            <path
              d="M14 4C10 7 6 13 4 19C2 25 2 31 4 37C6 40 10 43 14 45"
              stroke="url(#bg3CrimsonGradRight)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="6" cy="24" r="2" fill="#ef4444" opacity="0.95" />
            <defs>
              <linearGradient id="bg3CrimsonGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b1d24" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#8b1d24" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      {hoveredTooltip &&
        createPortal(
          <div
            ref={tooltipRef}
            className="bg3-portrait-tooltip bg3-portrait-tooltip-portal"
            style={{
              left: hoveredTooltip.left,
              top: hoveredTooltip.top,
            }}
          >
            {hoveredTooltip.content}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default BG3TopTurnTracker;
