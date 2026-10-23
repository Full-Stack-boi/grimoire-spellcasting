import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import "./MobileActionDock.scss";

import type {
    DDBParsedCharacter,
    DDBWeaponAttack,
    DDBFeatureAction,
    DDBInventoryItem,
} from "../../../types/ddb";
import type { MonsterStatblock } from "../../../features/monsters/domain/types";
import type { DockSpell, SpellGroup, SpellSlotConfig } from "../domain/types";
import type { ActiveCasterInfo } from "../../../features/targeting/infrastructure/obr/activeCasterResolver";

import {
    IconDiceD20,
    IconMeleeSwords,
    IconCastLightning,
    IconClose,
    IconDragon,
    IconHeart,
    IconAim,
    IconSword,
    IconDamage,
    IconCast,
    IconFeature,
    IconInspiration,
    IconSearch,
    IconGrid,
    IconList,
    IconChevronDown,
    IconChevronRight,
} from "../shared/Bg3Icons";
import { FaShieldHalved } from "react-icons/fa6";
import {
    type MobileDockMode,
    getSavedMobileDockHeight,
    saveMobileDockHeight,
    resizeActionDockMobile,
    resizeActionDockMobileAimingBar,
    snapActionDockMobile,
    getCachedViewportSize,
    moveMobileFab,
    getSavedMobileFabPosition,
    MOBILE_TOP_SAFE_MARGIN,
} from "../domain/popover";
import { MonsterStatblockView } from "../../../features/monsters/ui/MonsterStatblockView";
import CharacterChecks from "../../CharacterChecks/CharacterChecks";
import { SituationalRollBar } from "../shared/SituationalRollBar";

const GmMonsterDrawer = React.lazy(() =>
    import("../../../features/monsters/ui/GmMonsterDrawer").then((m) => ({ default: m.GmMonsterDrawer }))
);
const CustomDiceRoller = React.lazy(() =>
    import("../overlays/CustomDiceRoller").then((m) => ({ default: m.CustomDiceRoller }))
);

export interface CharacterTokenOption {
    id: string;
    name?: string;
}

export interface MobileActionDockProps {
    character: DDBParsedCharacter | null;
    caster: ActiveCasterInfo | null;
    casterName: string;
    avatarUrl: string;
    boundMonster: MonsterStatblock | null;
    characterTokens?: CharacterTokenOption[];
    onSelectCaster?: (tokenId: string) => void;
    isGM: boolean;
    currentHp: number;
    maxHp: number;
    tempHp: number;
    onDamage: (amount: number) => void;
    onHeal: (amount: number) => void;
    onInitiativeRoll: () => void;
    weapons: DDBWeaponAttack[];
    onSelectWeapon?: (weapon: DDBWeaponAttack, mode?: "melee" | "thrown") => void;
    onWeaponAttack?: (weapon: DDBWeaponAttack, rollMode?: "melee" | "thrown") => void;
    onWeaponDamage?: (weapon: DDBWeaponAttack, riderName?: string | null, rollMode?: "melee" | "thrown") => void;
    spells: DockSpell[];
    spellGroups: SpellGroup[];
    spellSlots?: Record<number, SpellSlotConfig>;
    getRemainingSlots?: (level: number) => number;
    onCastSpell: (spellId: string, level?: number, ability?: string, damageType?: string) => void;
    onToggleSlotPip: (level: number, pipIndex: number) => void;
    features: DDBFeatureAction[];
    onActivateFeature: (feature: DDBFeatureAction) => void;
    inventory: DDBInventoryItem[];
    conditions: string[];
    onToggleCondition: (condition: string) => void;
    heroicInspiration: boolean;
    onToggleInspiration: () => void;
    onClose: () => void;
    onToggleSnap: (mode: MobileDockMode) => void;
    mobileMode: MobileDockMode;
    onEditMonster?: (m: MonsterStatblock) => void;
    initialShowHpModal?: boolean;
    isAiming?: boolean;
    aimingName?: string;
    onCancelAiming?: () => void;
}

export type MobileTab = "ACTIONS" | "SPELLS" | "FEATURES" | "ITEMS" | "SHEET" | "BESTIARY";



export const MobileActionDock: React.FC<MobileActionDockProps> = ({
    character,
    caster,
    casterName,
    avatarUrl,
    boundMonster,
    characterTokens,
    onSelectCaster,
    isGM,
    currentHp,
    maxHp,
    tempHp,
    onDamage,
    onHeal,
    onInitiativeRoll,
    weapons,
    onSelectWeapon,
    onWeaponAttack,
    onWeaponDamage,
    spells,
    spellGroups,
    spellSlots,
    getRemainingSlots,
    onCastSpell,
    onToggleSlotPip,
    features,
    onActivateFeature,
    inventory,
    conditions,
    onToggleCondition,
    heroicInspiration,
    onToggleInspiration,
    onClose,
    onToggleSnap,
    mobileMode,
    onEditMonster,
    initialShowHpModal,
    isAiming,
    aimingName,
    onCancelAiming,
}) => {
    const [activeTab, setActiveTab] = useState<MobileTab>("ACTIONS");
    const [actionFilter, setActionFilter] = useState<string>("ALL");
    const [showHpModal, setShowHpModal] = useState(initialShowHpModal ?? false);
    const [showDiceRoller, setShowDiceRoller] = useState<boolean>(false);
    const [hpInput, setHpInput] = useState<number>(5);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [viewMode, setViewMode] = useState<"cards" | "compact">("cards");
    const [collapsedLevels, setCollapsedLevels] = useState<Record<number, boolean>>({});
    const [isAimingBarMinimized, setIsAimingBarMinimized] = useState<boolean>(true);

    const toggleLevelCollapse = (lvl: number) => {
        setCollapsedLevels((prev) => ({ ...prev, [lvl]: !prev[lvl] }));
    };

    const filteredWeapons = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return weapons.filter((w) => {
            if (actionFilter === "MELEE" && w.type !== "melee") return false;
            if (actionFilter === "RANGED" && w.type !== "ranged" && !w.hasThrown) return false;
            if (!q) return true;
            return (
                w.name.toLowerCase().includes(q) ||
                (w.damageType && w.damageType.toLowerCase().includes(q)) ||
                (w.properties && w.properties.some((p) => p.toLowerCase().includes(q)))
            );
        });
    }, [weapons, actionFilter, searchQuery]);

    const filteredSpellGroups = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return spellGroups;
        return spellGroups
            .map((group) => ({
                ...group,
                spells: group.spells.filter(
                    (s) =>
                        s.name.toLowerCase().includes(q) ||
                        (s.school && s.school.toLowerCase().includes(q)) ||
                        (s.damage && s.damage.toLowerCase().includes(q)) ||
                        (s.damageType && s.damageType.toLowerCase().includes(q)) ||
                        (s.rangeText && s.rangeText.toLowerCase().includes(q)) ||
                        (s.notes && s.notes.toLowerCase().includes(q)) ||
                        (s.hitOrDc && s.hitOrDc.toLowerCase().includes(q))
                ),
            }))
            .filter((group) => group.spells.length > 0);
    }, [spellGroups, searchQuery]);

    const filteredFeatures = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return features;
        return features.filter(
            (f) =>
                f.name.toLowerCase().includes(q) ||
                (f.description && f.description.toLowerCase().includes(q)) ||
                (f.source && f.source.toLowerCase().includes(q))
        );
    }, [features, searchQuery]);

    const filteredInventory = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return inventory;
        return inventory.filter(
            (item) =>
                item.name.toLowerCase().includes(q) ||
                (item.type && item.type.toLowerCase().includes(q))
        );
    }, [inventory, searchQuery]);

    // Continuous Drag Resizing State (GPU-accelerated, physical screen coordinates)
    const [sheetHeight, setSheetHeight] = useState<number>(() => getSavedMobileDockHeight());

    // Automatic sheet minimization to Aiming Bar during tactical aiming
    useEffect(() => {
        if (isAiming) {
            setIsAimingBarMinimized(true);
            resizeActionDockMobileAimingBar().catch(() => {});
        } else {
            setIsAimingBarMinimized(false);
            if (mobileMode === "expanded") {
                snapActionDockMobile("expanded").catch(() => {});
            }
        }
    }, [isAiming, mobileMode]);
    const dragStartScreenY = useRef<number | null>(null);
    const dragStartH = useRef<number>(sheetHeight);
    const isResizingRef = useRef<boolean>(false);
    const rafId = useRef<number | null>(null);
    const pendingHeight = useRef<number | null>(null);

    // Tab Navigation & Slide Direction
    const [slideDirection, setSlideDirection] = useState<"left" | "right" | "none">("none");

    // Touch/Pointer Swipe Tracking for Horizontal Tab Switch
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const touchDeltaX = useRef<number>(0);
    const touchDeltaY = useRef<number>(0);

    // ── Draggable Floating Action Button (FAB) State & Handlers ──
    const fabDragStart = useRef<{ screenX: number; screenY: number; startLeft: number; startTop: number } | null>(null);
    const isFabDraggingRef = useRef<boolean>(false);
    const fabRafId = useRef<number | null>(null);
    const fabPendingPos = useRef<{ left: number; top: number } | null>(null);

    const handleFabPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.isPrimary) return;
        const { height: viewH } = getCachedViewportSize();
        const savedPos = getSavedMobileFabPosition();
        const startLeft = savedPos ? savedPos.left : 16;
        const startTop = savedPos ? savedPos.top : Math.max(MOBILE_TOP_SAFE_MARGIN, viewH - 64 - 16);

        fabDragStart.current = {
            screenX: e.screenX,
            screenY: e.screenY,
            startLeft,
            startTop,
        };
        isFabDraggingRef.current = false;
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
    };

    const handleFabPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!fabDragStart.current) return;
        const dx = e.screenX - fabDragStart.current.screenX;
        const dy = e.screenY - fabDragStart.current.screenY;

        // If moved more than 6px, treat as drag
        if (!isFabDraggingRef.current && Math.hypot(dx, dy) > 6) {
            isFabDraggingRef.current = true;
        }

        if (!isFabDraggingRef.current) return;

        const nextLeft = fabDragStart.current.startLeft + dx;
        const nextTop = fabDragStart.current.startTop + dy;
        fabPendingPos.current = { left: nextLeft, top: nextTop };

        if (fabRafId.current === null) {
            fabRafId.current = requestAnimationFrame(() => {
                fabRafId.current = null;
                if (fabPendingPos.current !== null && isFabDraggingRef.current) {
                    const { left, top } = fabPendingPos.current;
                    void moveMobileFab(left, top);
                }
            });
        }
    };

    const handleFabPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {}

        if (fabRafId.current !== null) {
            cancelAnimationFrame(fabRafId.current);
            fabRafId.current = null;
        }

        const wasDragging = isFabDraggingRef.current;
        const start = fabDragStart.current;
        fabDragStart.current = null;
        isFabDraggingRef.current = false;

        if (start && wasDragging) {
            const dx = e.screenX - start.screenX;
            const dy = e.screenY - start.screenY;
            const finalLeft = start.startLeft + dx;
            const finalTop = start.startTop + dy;
            void moveMobileFab(finalLeft, finalTop);
            return;
        }

        // Tap detected -> open expanded sheet
        onToggleSnap("expanded");
    };

    const handleFabPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {}
        if (fabRafId.current !== null) {
            cancelAnimationFrame(fabRafId.current);
            fabRafId.current = null;
        }
        fabDragStart.current = null;
        isFabDraggingRef.current = false;
    };

    const getTrueViewportHeight = (): number => {
        const { height } = getCachedViewportSize();
        const screenH = typeof window !== "undefined" ? (window.screen?.availHeight || window.screen?.height || 0) : 0;
        if (height > 200) return height;
        if (screenH > 200) return screenH;
        return 700;
    };

    const availableTabs: MobileTab[] = useMemo(() => {
        if (boundMonster) {
            const tabs: MobileTab[] = ["ACTIONS", "SHEET"];
            if (isGM) tabs.push("BESTIARY");
            return tabs;
        }
        const tabs: MobileTab[] = ["ACTIONS", "SPELLS", "FEATURES", "ITEMS", "SHEET"];
        if (isGM) tabs.push("BESTIARY");
        return tabs;
    }, [boundMonster, isGM]);

    const switchTab = (tab: MobileTab) => {
        if (!availableTabs.includes(tab) || tab === activeTab) return;
        const curIdx = availableTabs.indexOf(activeTab);
        const nextIdx = availableTabs.indexOf(tab);
        setSlideDirection(nextIdx > curIdx ? "left" : "right");
        setActiveTab(tab);
    };

    // ── Continuous Drag Handle Handlers (e.screenY prevents iframe coordinate drift) ──
    const handleResizePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.isPrimary) return;
        dragStartScreenY.current = e.screenY;
        dragStartH.current = sheetHeight;
        isResizingRef.current = true;
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
    };

    const handleResizePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isResizingRef.current || dragStartScreenY.current === null) return;
        const deltaY = e.screenY - dragStartScreenY.current;
        const viewH = getTrueViewportHeight();
        const maxH = Math.max(220, viewH - MOBILE_TOP_SAFE_MARGIN - 8);
        const minH = 220;
        const rawH = dragStartH.current - deltaY;
        const clampedH = Math.min(Math.max(minH, rawH), maxH);

        pendingHeight.current = clampedH;
        if (rafId.current === null) {
            rafId.current = requestAnimationFrame(() => {
                rafId.current = null;
                if (pendingHeight.current !== null && isResizingRef.current) {
                    const h = pendingHeight.current;
                    setSheetHeight(h);
                    void resizeActionDockMobile(h);
                }
            });
        }
    };

    const handleResizePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isResizingRef.current) return;
        isResizingRef.current = false;
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {}

        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }

        const startScreenY = dragStartScreenY.current;
        dragStartScreenY.current = null;
        if (startScreenY === null) return;

        const deltaY = e.screenY - startScreenY;
        const rawH = dragStartH.current - deltaY;

        // If pulled down substantially or resulting height falls below 180, collapse to FAB
        if (deltaY > 150 || rawH < 180) {
            onToggleSnap("fab");
            return;
        }

        // Tap toggle between 3 snap tiers: Compact (280px) -> Expanded (520px) -> Full (clamped safe max)
        if (Math.abs(deltaY) < 8) {
            const viewH = getTrueViewportHeight();
            const fullH = Math.max(220, viewH - MOBILE_TOP_SAFE_MARGIN - 8);
            const expandedH = Math.min(520, Math.round(viewH * 0.65));
            const compactH = 280;

            let nextH = compactH;
            if (sheetHeight <= compactH + 40) {
                nextH = expandedH;
            } else if (sheetHeight <= expandedH + 40) {
                nextH = fullH;
            } else {
                nextH = compactH;
            }

            setSheetHeight(nextH);
            saveMobileDockHeight(nextH);
            void resizeActionDockMobile(nextH);
            return;
        }

        const viewH = getTrueViewportHeight();
        const maxH = Math.max(220, viewH - MOBILE_TOP_SAFE_MARGIN - 8);
        const minH = 220;
        const clamped = Math.min(Math.max(minH, rawH), maxH);
        setSheetHeight(clamped);
        saveMobileDockHeight(clamped);
        void resizeActionDockMobile(clamped);
    };

    const handleResizePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
        isResizingRef.current = false;
        dragStartScreenY.current = null;
        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {}
    };

    // ── Horizontal Swipe Navigation on Sheet Content ────────────────────────
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return;
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchDeltaX.current = 0;
        touchDeltaY.current = 0;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null) return;
        const dx = touchDeltaX.current;
        const dy = touchDeltaY.current;
        touchStartX.current = null;
        touchStartY.current = null;

        if (Math.abs(dx) > 40 && Math.abs(dx) > 1.3 * Math.abs(dy)) {
            const idx = availableTabs.indexOf(activeTab);
            if (idx === -1) return;
            if (dx < 0) {
                // Swiped Left -> Next Tab
                const nextTab = availableTabs[(idx + 1) % availableTabs.length];
                switchTab(nextTab);
            } else {
                // Swiped Right -> Prev Tab
                const prevTab = availableTabs[(idx - 1 + availableTabs.length) % availableTabs.length];
                switchTab(prevTab);
            }
        }
    };

    const getSlotInfo = (lvl: number): { remaining: number; max: number } | null => {
        if (spellSlots && spellSlots[lvl]) {
            const slot = spellSlots[lvl];
            return { remaining: Math.max(0, slot.max - slot.used), max: slot.max };
        }
        if (getRemainingSlots) {
            const remaining = getRemainingSlots(lvl);
            return { remaining, max: remaining };
        }
        return null;
    };

    // HP calculation & styling
    const totalMaxHp = maxHp || 10;
    const effectiveHp = currentHp + (tempHp > 0 ? tempHp : 0);
    const hpRatio = Math.max(0, Math.min(1, currentHp / totalMaxHp));
    const hpColor = hpRatio > 0.5 ? "#22c55e" : hpRatio > 0.2 ? "#eab308" : "#ef4444";

    // Effective AC and Initiative mod
    const effectiveAc = boundMonster?.armorClass || character?.armorClass || 10;
    const initMod = boundMonster
        ? Math.floor((boundMonster.stats.dex - 10) / 2)
        : (character?.initiative ?? character?.modifiers?.dex ?? 0);

    // ─────────────────────────────────────────────────────────────────────────
    // 1. COLLAPSED FAB MODE (Always-On Floating Button)
    // ─────────────────────────────────────────────────────────────────────────
    if (mobileMode === "fab") {
        return (
            <div
                className="mobile-fab-container"
                onPointerDown={handleFabPointerDown}
                onPointerMove={handleFabPointerMove}
                onPointerUp={handleFabPointerUp}
                onPointerCancel={handleFabPointerCancel}
            >
                <button
                    type="button"
                    className="mobile-fab-button"
                    title={`Drag to reposition, tap to open Combat HUD (${boundMonster?.name || casterName})`}
                    aria-label={`Open Combat HUD for ${boundMonster?.name || casterName}`}
                >
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={casterName}
                            className="mobile-fab-avatar"
                            draggable={false}
                        />
                    ) : (
                        <IconMeleeSwords size={24} className="mobile-fab-icon" />
                    )}
                    <span className="mobile-fab-hp-badge" style={{ borderColor: hpColor }}>
                        {effectiveHp}
                    </span>
                </button>
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. COMPACT AIMING BAR (When Aiming on Mobile to unblock map view)
    // ─────────────────────────────────────────────────────────────────────────
    if (isAiming && isAimingBarMinimized) {
        return (
            <div className="mobile-aiming-bar-container">
                <div className="mobile-aiming-bar-info">
                    <IconAim size={16} className="aiming-pulse-icon" />
                    <div className="mobile-aiming-bar-text">
                        <span className="mobile-aiming-bar-label">AIMING</span>
                        <span className="mobile-aiming-bar-name">{aimingName || "Tap target on map"}</span>
                    </div>
                </div>
                <div className="mobile-aiming-bar-actions">
                    <button
                        type="button"
                        className="mobile-aiming-bar-btn expand"
                        onClick={() => {
                            setIsAimingBarMinimized(false);
                            snapActionDockMobile("expanded").catch(() => {});
                        }}
                        title="Expand Full Sheet"
                    >
                        Expand
                    </button>
                    {onCancelAiming && (
                        <button
                            type="button"
                            className="mobile-aiming-bar-btn cancel"
                            onClick={onCancelAiming}
                            title="Cancel Aiming"
                        >
                            <IconClose size={12} />
                            <span>Cancel</span>
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 3. EXPANDED MOBILE ACTION SHEET MODE
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="mobile-sheet-container expanded">
            {/* Top Drag Handle for continuous dynamic height resizing */}
            <div
                className="mobile-sheet-drag-handle"
                onPointerDown={handleResizePointerDown}
                onPointerMove={handleResizePointerMove}
                onPointerUp={handleResizePointerUp}
                onPointerCancel={handleResizePointerCancel}
                title="Drag up or down to adjust height; pull down to minimize to FAB"
            >
                <span className="mobile-drag-pill" />
            </div>

            {/* Header & Vitals Cluster */}
            <header className="mobile-sheet-header">
                <div className="mobile-sheet-identity">
                    <img src={avatarUrl} alt={casterName} className="mobile-sheet-avatar" />
                    <div className="mobile-sheet-name-col">
                        <span className="mobile-sheet-name">
                            {boundMonster ? boundMonster.name : casterName}
                        </span>
                        {isGM && characterTokens && characterTokens.length > 1 ? (
                            <select
                                className="mobile-token-select"
                                value={caster?.item?.id || ""}
                                onChange={(e) => {
                                    onSelectCaster?.(e.target.value);
                                }}
                            >
                                {characterTokens.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name || t.id}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span className="mobile-sheet-sub">
                                {boundMonster
                                    ? `CR ${boundMonster.challengeRating} • ${boundMonster.size} ${boundMonster.type}`
                                    : character?.classes?.map((c) => `${c.name} ${c.level}`).join(" / ") || "Adventurer"}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mobile-vitals-cluster">
                    {/* HP Box */}
                    <div
                        className="mobile-hp-pill"
                        role="button"
                        tabIndex={0}
                        onClick={() => setShowHpModal(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setShowHpModal(true);
                            }
                        }}
                        title="Tap to Heal or Take Damage"
                    >
                        <span className="mobile-hp-text">
                            {currentHp}/{totalMaxHp}
                            {tempHp > 0 && <span style={{ color: "#38bdf8" }}>+{tempHp}</span>}
                        </span>
                        <div className="mobile-hp-bar">
                            <div
                                className="mobile-hp-fill"
                                style={{ width: `${hpRatio * 100}%`, background: hpColor }}
                            />
                        </div>
                    </div>

                    {/* AC Badge */}
                    <div className="mobile-ac-badge" title="Armor Class">
                        <FaShieldHalved size={10} />
                        <span>{effectiveAc}</span>
                    </div>

                    {/* Initiative Button */}
                    <button
                        type="button"
                        className="mobile-init-btn"
                        onClick={onInitiativeRoll}
                        title="Roll Initiative"
                    >
                        <IconDiceD20 size={12} />
                        <span>{initMod >= 0 ? `+${initMod}` : initMod}</span>
                    </button>

                    {/* Custom Dice Roller Button */}
                    <button
                        type="button"
                        className={`mobile-dice-btn ${showDiceRoller ? "active" : ""}`}
                        onClick={() => setShowDiceRoller((prev) => !prev)}
                        title="Custom Dice Roller (เลือกทอยเต๋าเอง)"
                        aria-label="Custom Dice Roller"
                    >
                        <IconDiceD20 size={12} />
                        <span>DICE</span>
                    </button>

                    {/* Heroic Inspiration Button */}
                    <button
                        type="button"
                        className="mobile-init-btn"
                        style={{
                            background: heroicInspiration ? "#eab308" : "#1e293b",
                            color: heroicInspiration ? "#000" : "#64748b",
                            borderColor: heroicInspiration ? "#fde047" : "#334155",
                            minWidth: 26,
                            padding: "0 4px",
                        }}
                        onClick={onToggleInspiration}
                        title={heroicInspiration ? "Heroic Inspiration Active" : "No Heroic Inspiration (Tap to toggle)"}
                    >
                        <IconInspiration size={12} />
                    </button>

                    {/* Close / Minimize to FAB Button */}
                    <button
                        type="button"
                        className="mobile-header-btn"
                        onClick={onClose}
                        title="Close Action Dock (Minimizes to FAB)"
                    >
                        <IconClose size={12} />
                    </button>
                </div>
            </header>

            {/* Tactical Aiming Banner HUD */}
            {isAiming && (
                <div className="mobile-aiming-hud-banner">
                    <div className="mobile-aiming-hud-info">
                        <IconAim size={14} className="aiming-pulse-icon" />
                        <div className="mobile-aiming-text-cluster">
                            <span className="mobile-aiming-title">AIMING</span>
                            <span className="mobile-aiming-desc">{aimingName || "Tap target on map"}</span>
                        </div>
                    </div>
                    <div className="mobile-aiming-hud-actions">
                        <button
                            type="button"
                            className="mobile-aiming-minimize-btn"
                            onClick={() => {
                                setIsAimingBarMinimized(true);
                                resizeActionDockMobileAimingBar().catch(() => {});
                            }}
                            title="Minimize to Aiming Bar"
                        >
                            Minimize
                        </button>
                        {onCancelAiming && (
                            <button
                                type="button"
                                className="mobile-aiming-cancel-btn"
                                onClick={onCancelAiming}
                                title="Cancel Aiming"
                            >
                                <IconClose size={11} />
                                <span>Cancel</span>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Active Conditions Strip */}
            {conditions && conditions.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "2px 10px 6px" }}>
                    {conditions.map((cond) => (
                        <span
                            key={cond}
                            onClick={() => onToggleCondition(cond)}
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "2px 6px",
                                borderRadius: 4,
                                background: "#7f1d1d",
                                color: "#fecaca",
                                border: "1px solid #b91c1c",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 3,
                            }}
                            title="Tap to remove condition"
                        >
                            <span>{cond}</span>
                            <IconClose size={8} />
                        </span>
                    ))}
                </div>
            )}

            {/* Full Situational Roll Modifier Bar (Only on ACTIONS / STATBLOCK tab where attacks are made) */}
            {activeTab === "ACTIONS" && (
                <div className="mobile-roll-bar-wrapper">
                    <SituationalRollBar
                        layout="inline"
                        scope="attack"
                    />
                </div>
            )}

            {/* Navigation Tabs */}
            <nav className="mobile-tab-strip">
                <button
                    type="button"
                    className={`mobile-tab-btn ${activeTab === "ACTIONS" ? "active" : ""}`}
                    onClick={() => switchTab("ACTIONS")}
                >
                    <IconMeleeSwords size={12} />
                    <span>{boundMonster ? "STATBLOCK" : "ACTIONS"}</span>
                </button>
                {!boundMonster && (
                    <button
                        type="button"
                        className={`mobile-tab-btn ${activeTab === "SPELLS" ? "active" : ""}`}
                        onClick={() => switchTab("SPELLS")}
                    >
                        <IconCastLightning size={12} />
                        <span>SPELLS ({spells.length})</span>
                    </button>
                )}
                {!boundMonster && (
                    <button
                        type="button"
                        className={`mobile-tab-btn ${activeTab === "FEATURES" ? "active" : ""}`}
                        onClick={() => switchTab("FEATURES")}
                    >
                        <span>FEATURES</span>
                    </button>
                )}
                {!boundMonster && (
                    <button
                        type="button"
                        className={`mobile-tab-btn ${activeTab === "ITEMS" ? "active" : ""}`}
                        onClick={() => switchTab("ITEMS")}
                    >
                        <span>ITEMS ({inventory.length})</span>
                    </button>
                )}
                <button
                    type="button"
                    className={`mobile-tab-btn ${activeTab === "SHEET" ? "active" : ""}`}
                    onClick={() => switchTab("SHEET")}
                >
                    <IconDiceD20 size={12} />
                    <span>CHECKS</span>
                </button>
                {isGM && (
                    <button
                        type="button"
                        className={`mobile-tab-btn ${activeTab === "BESTIARY" ? "active" : ""}`}
                        onClick={() => switchTab("BESTIARY")}
                    >
                        <IconDragon size={12} />
                        <span>BESTIARY</span>
                    </button>
                )}
            </nav>

            {/* Content Workspaces with Horizontal Swipe Gesture support */}
            <main
                className={`mobile-sheet-content slide-${slideDirection}`}
                onAnimationEnd={() => setSlideDirection("none")}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Search & View Mode Toolbar */}
                {activeTab !== "SHEET" && activeTab !== "BESTIARY" && !boundMonster && (
                    <div className="mobile-deck-toolbar">
                        <div className="mobile-dock-search-box">
                            <IconSearch size={12} className="mobile-search-icon" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab.toLowerCase()}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="mobile-search-input"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="mobile-search-clear-btn"
                                    onClick={() => setSearchQuery("")}
                                    title="Clear search"
                                >
                                    <IconClose size={10} />
                                </button>
                            )}
                        </div>
                        <div className="mobile-view-mode-toggle">
                            <button
                                type="button"
                                className={`mobile-view-mode-btn ${viewMode === "cards" ? "active" : ""}`}
                                onClick={() => setViewMode("cards")}
                                title="Cards View"
                            >
                                <IconGrid size={11} />
                            </button>
                            <button
                                type="button"
                                className={`mobile-view-mode-btn ${viewMode === "compact" ? "active" : ""}`}
                                onClick={() => setViewMode("compact")}
                                title="Compact Row View"
                            >
                                <IconList size={11} />
                            </button>
                        </div>
                    </div>
                )}

                {/* 1. MONSTER STATBLOCK MODE */}
                {boundMonster && activeTab === "ACTIONS" && (
                    <MonsterStatblockView
                        monster={boundMonster}
                        token={caster?.item}
                        showBindControls={false}
                        onEdit={onEditMonster}
                    />
                )}

                {/* 2. PLAYER ACTIONS TAB (WEAPONS) */}
                {!boundMonster && activeTab === "ACTIONS" && (
                    <>
                        <div className="mobile-subfilter-bar">
                            {["ALL", "MELEE", "RANGED"].map((f) => (
                                <button
                                    key={f}
                                    type="button"
                                    className={`mobile-subfilter-chip ${actionFilter === f ? "active" : ""}`}
                                    onClick={() => setActionFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {filteredWeapons.length === 0 ? (
                            <div style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 13 }}>
                                {searchQuery ? "No weapons matching search." : "No weapons or unarmed strikes available."}
                            </div>
                        ) : viewMode === "cards" ? (
                            filteredWeapons.map((weapon) => {
                                const isRanged = weapon.type === "ranged";
                                const hasReach = weapon.properties?.some((p) => p.toLowerCase().includes("reach"));
                                const rangeBadge = weapon.rangeText || (weapon.reachFeet ? `${weapon.reachFeet} ft Reach` : (hasReach ? "10 ft Reach" : (isRanged ? `${weapon.rangeFeet || 60} ft` : "5 ft Reach")));
                                return (
                                    <div key={weapon.id} className="mobile-action-card">
                                        <div className="mobile-action-title-row">
                                            <span className="mobile-action-name">{weapon.name}</span>
                                            <span className="mobile-action-badge">{rangeBadge}</span>
                                        </div>
                                        <div className="mobile-action-desc">
                                            {weapon.properties?.join(", ") || "Standard weapon"}
                                        </div>
                                        <div className="mobile-action-btn-row">
                                            {onSelectWeapon && (
                                                <button
                                                    type="button"
                                                    className="mobile-action-btn aim"
                                                    onClick={() => onSelectWeapon(weapon, "melee")}
                                                    title="Aim at a token on the map"
                                                >
                                                    <IconAim size={13} />
                                                    <span>Aim</span>
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className="mobile-action-btn attack"
                                                onClick={() => onWeaponAttack?.(weapon)}
                                                title="Roll Attack directly into chat"
                                            >
                                                <IconSword size={13} />
                                                <span>Attack ({weapon.toHit >= 0 ? `+${weapon.toHit}` : weapon.toHit})</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="mobile-action-btn damage"
                                                onClick={() => onWeaponDamage?.(weapon, null)}
                                                title="Roll weapon damage"
                                            >
                                                <IconDamage size={13} />
                                                <span>Damage ({weapon.damage || "1d4"})</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="mobile-compact-list">
                                {filteredWeapons.map((weapon) => {
                                    const isRanged = weapon.type === "ranged";
                                    const hasReach = weapon.properties?.some((p) => p.toLowerCase().includes("reach"));
                                    const rangeBadge = weapon.rangeText || (weapon.reachFeet ? `${weapon.reachFeet} ft` : (hasReach ? "10 ft" : (isRanged ? `${weapon.rangeFeet || 60} ft` : "5 ft")));
                                    return (
                                        <div key={weapon.id} className="mobile-compact-row">
                                            <div className="mobile-compact-info">
                                                <span className="mobile-compact-name">{weapon.name}</span>
                                                <span className="mobile-compact-sub">
                                                    <span className="mobile-compact-badge">{rangeBadge}</span>
                                                    <span>{weapon.toHit >= 0 ? `+${weapon.toHit}` : weapon.toHit} to hit</span>
                                                    <span>{weapon.damage}</span>
                                                </span>
                                            </div>
                                            <div className="mobile-compact-actions">
                                                {onSelectWeapon && (
                                                    <button
                                                        type="button"
                                                        className="mobile-compact-btn aim"
                                                        onClick={() => onSelectWeapon(weapon, "melee")}
                                                        title="Aim weapon"
                                                    >
                                                        <IconAim size={12} />
                                                        <span>Aim</span>
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="mobile-compact-btn attack"
                                                    onClick={() => onWeaponAttack?.(weapon)}
                                                    title="Roll Attack"
                                                >
                                                    <IconSword size={12} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mobile-compact-btn damage"
                                                    onClick={() => onWeaponDamage?.(weapon, null)}
                                                    title="Roll Damage"
                                                >
                                                    <IconDamage size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {/* 3. PLAYER SPELLS TAB */}
                {!boundMonster && activeTab === "SPELLS" && (
                    <>
                        {/* Spell Slots Strip */}
                        <div className="mobile-spell-slots-bar">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => {
                                const slots = getSlotInfo(lvl);
                                if (!slots || slots.max === 0) return null;
                                return (
                                    <div key={lvl} className="mobile-slot-group">
                                        <span>Lv{lvl}:</span>
                                        <div className="mobile-slot-pips">
                                            {Array.from({ length: slots.max }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`mobile-slot-pip ${i < slots.remaining ? "used" : ""}`}
                                                    onClick={() => onToggleSlotPip(lvl, i)}
                                                    title={`Slot ${lvl} pip ${i + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filteredSpellGroups.length === 0 ? (
                            <div style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 13 }}>
                                {searchQuery ? "No spells matching search." : "No prepared spells found."}
                            </div>
                        ) : (
                            filteredSpellGroups.map((group) => {
                                const isCollapsed = Boolean(collapsedLevels[group.level]);
                                const slotInfo = group.level > 0 ? getSlotInfo(group.level) : null;
                                return (
                                    <div key={group.label} className="mobile-spell-group-section">
                                        <div
                                            className="mobile-spell-level-header"
                                            onClick={() => toggleLevelCollapse(group.level)}
                                        >
                                            <div className="mobile-level-title-group">
                                                {isCollapsed ? <IconChevronRight size={11} /> : <IconChevronDown size={11} />}
                                                <span className="mobile-level-title-text">{group.label} ({group.spells.length})</span>
                                            </div>
                                            {group.level > 0 && slotInfo && slotInfo.max > 0 && (
                                                <div className="mobile-header-slot-pips" onClick={(e) => e.stopPropagation()}>
                                                    {Array.from({ length: slotInfo.max }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`mobile-slot-pip ${i < slotInfo.remaining ? "used" : ""}`}
                                                            onClick={() => onToggleSlotPip(group.level, i)}
                                                            title={`Slot ${group.level} pip ${i + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {!isCollapsed && (
                                            viewMode === "cards" ? (
                                                <div className="mobile-spells-list-cards">
                                                    {group.spells.map((spell) => (
                                                        <div key={spell.id} className="mobile-action-card">
                                                            <div className="mobile-action-title-row">
                                                                <span className="mobile-action-name">{spell.name}</span>
                                                                <span className="mobile-action-badge">
                                                                    {spell.school} • {spell.castingTime}
                                                                </span>
                                                            </div>
                                                            <div className="mobile-action-desc">
                                                                Range: {spell.rangeText || "Self"}
                                                                {spell.damage && ` • Damage: ${spell.damage}`}
                                                            </div>
                                                            <div className="mobile-action-btn-row">
                                                                <button
                                                                    type="button"
                                                                    className="mobile-action-btn cast"
                                                                    onClick={() => onCastSpell(spell.id, spell.level)}
                                                                >
                                                                    <IconCast size={13} />
                                                                    <span>Cast {spell.level === 0 ? "Cantrip" : `Level ${spell.level}`}</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="mobile-compact-list">
                                                    {group.spells.map((spell) => (
                                                        <div key={spell.id} className="mobile-compact-row">
                                                            <div className="mobile-compact-info">
                                                                <span className="mobile-compact-name">{spell.name}</span>
                                                                <span className="mobile-compact-sub">
                                                                    <span className="mobile-compact-badge">{spell.school || "Spell"}</span>
                                                                    <span>{spell.rangeText || "Self"}</span>
                                                                    {spell.damage && <span>{spell.damage}</span>}
                                                                </span>
                                                            </div>
                                                            <div className="mobile-compact-actions">
                                                                <button
                                                                    type="button"
                                                                    className="mobile-compact-btn cast"
                                                                    onClick={() => onCastSpell(spell.id, spell.level)}
                                                                    title={`Cast ${spell.name}`}
                                                                >
                                                                    <IconCast size={12} />
                                                                    <span>Cast</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </>
                )}

                {/* 4. PLAYER FEATURES TAB */}
                {!boundMonster && activeTab === "FEATURES" && (
                    filteredFeatures.length === 0 ? (
                        <div style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 13 }}>
                            {searchQuery ? "No features matching search." : "No active class or racial features found."}
                        </div>
                    ) : viewMode === "cards" ? (
                        filteredFeatures.map((feat) => (
                            <div key={feat.id} className="mobile-action-card">
                                <div className="mobile-action-title-row">
                                    <span className="mobile-action-name">{feat.name}</span>
                                    {feat.limitedUse && (
                                        <span className="mobile-action-badge">
                                            {feat.limitedUse.max - feat.limitedUse.used}/{feat.limitedUse.max}
                                        </span>
                                    )}
                                </div>
                                <div className="mobile-action-desc">
                                    {feat.description?.slice(0, 160) || "Class feature"}...
                                </div>
                                <div className="mobile-action-btn-row">
                                    <button
                                        type="button"
                                        className="mobile-action-btn feature"
                                        onClick={() => onActivateFeature(feat)}
                                    >
                                        <IconFeature size={13} />
                                        <span>Use Feature</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mobile-compact-list">
                            {filteredFeatures.map((feat) => (
                                <div key={feat.id} className="mobile-compact-row">
                                    <div className="mobile-compact-info">
                                        <span className="mobile-compact-name">{feat.name}</span>
                                        <span className="mobile-compact-sub">
                                            {feat.limitedUse ? `${feat.limitedUse.max - feat.limitedUse.used}/${feat.limitedUse.max} uses` : "Passive / At-Will"}
                                        </span>
                                    </div>
                                    <div className="mobile-compact-actions">
                                        <button
                                            type="button"
                                            className="mobile-compact-btn feature"
                                            onClick={() => onActivateFeature(feat)}
                                            title={`Use ${feat.name}`}
                                        >
                                            <IconFeature size={12} />
                                            <span>Use</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}

                {/* 5. INVENTORY TAB */}
                {!boundMonster && activeTab === "ITEMS" && (
                    filteredInventory.length === 0 ? (
                        <div style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 13 }}>
                            {searchQuery ? "No items matching search." : "Inventory is empty."}
                        </div>
                    ) : viewMode === "cards" ? (
                        filteredInventory.map((item) => (
                            <div key={item.id} className="mobile-action-card">
                                <div className="mobile-action-title-row">
                                    <span className="mobile-action-name">{item.name}</span>
                                    <span className="mobile-action-badge">Qty: {item.quantity || 1}</span>
                                </div>
                                <div className="mobile-action-desc">
                                    {item.description?.slice(0, 120) || "Equipment item"}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mobile-compact-list">
                            {filteredInventory.map((item) => (
                                <div key={item.id} className="mobile-compact-row">
                                    <div className="mobile-compact-info">
                                        <span className="mobile-compact-name">{item.name}</span>
                                        <span className="mobile-compact-sub">
                                            <span className="mobile-compact-badge">Qty: {item.quantity || 1}</span>
                                            <span>{item.type || "Item"}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}

                {/* 6. SHEET / CHECKS TAB */}
                {activeTab === "SHEET" && (
                    <CharacterChecks
                        passedChar={character}
                        passedTokenId={caster?.item?.id}
                    />
                )}

                {/* 7. GM BESTIARY TAB (Render GmMonsterDrawer instead of blank void) */}
                {isGM && activeTab === "BESTIARY" && (
                    <Suspense fallback={<div style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>Loading Bestiary...</div>}>
                        <GmMonsterDrawer isMobile={true} onCastSpell={(spellId) => onCastSpell(spellId)} />
                    </Suspense>
                )}
            </main>

            {/* Quick HP Adjustment Modal */}
            {showHpModal && (
                <div className="mobile-hp-modal-overlay" onClick={() => setShowHpModal(false)}>
                    <div className="mobile-hp-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="mobile-hp-modal-header">
                            <div className="mobile-hp-modal-title-col">
                                <span className="mobile-hp-modal-title">Adjust Hit Points</span>
                                <span className="mobile-hp-modal-sub">
                                    Current: <strong style={{ color: currentHp > maxHp * 0.5 ? "#22c55e" : (currentHp > maxHp * 0.2 ? "#f59e0b" : "#ef4444") }}>{currentHp}</strong> / {maxHp} HP
                                    {tempHp > 0 && <span className="mobile-hp-modal-temp"> (+{tempHp} Temp)</span>}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="mobile-hp-modal-close"
                                onClick={() => setShowHpModal(false)}
                                title="Close"
                            >
                                <IconClose size={13} />
                            </button>
                        </div>

                        {/* Quick Presets Row */}
                        <div className="mobile-hp-modal-presets">
                            {[1, 5, 10, 20].map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    className={`mobile-hp-preset-chip ${hpInput === preset ? "active" : ""}`}
                                    onClick={() => setHpInput(preset)}
                                >
                                    {preset}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="mobile-hp-preset-chip max"
                                onClick={() => setHpInput(Math.max(1, maxHp - currentHp || maxHp))}
                                title="Remaining to full HP"
                            >
                                Max
                            </button>
                        </div>

                        {/* Stepper + Input */}
                        <div className="mobile-hp-modal-input-row">
                            <button
                                type="button"
                                className="mobile-hp-stepper-btn minus"
                                onClick={() => setHpInput((v) => Math.max(1, v - 5))}
                                title="Decrease by 5"
                            >
                                −5
                            </button>
                            <button
                                type="button"
                                className="mobile-hp-stepper-btn minus mini"
                                onClick={() => setHpInput((v) => Math.max(1, v - 1))}
                                title="Decrease by 1"
                            >
                                −1
                            </button>
                            <div className="mobile-hp-input-wrap">
                                <input
                                    type="number"
                                    min={1}
                                    max={999}
                                    value={hpInput}
                                    onChange={(e) => setHpInput(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                    className="mobile-hp-modal-input"
                                    aria-label="Hit point amount"
                                />
                            </div>
                            <button
                                type="button"
                                className="mobile-hp-stepper-btn plus mini"
                                onClick={() => setHpInput((v) => v + 1)}
                                title="Increase by 1"
                            >
                                +1
                            </button>
                            <button
                                type="button"
                                className="mobile-hp-stepper-btn plus"
                                onClick={() => setHpInput((v) => v + 5)}
                                title="Increase by 5"
                            >
                                +5
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="mobile-hp-modal-btn-row">
                            <button
                                type="button"
                                className="mobile-hp-modal-action damage"
                                onClick={() => {
                                    onDamage(hpInput);
                                    setShowHpModal(false);
                                }}
                            >
                                <IconMeleeSwords size={15} />
                                <span>Take {hpInput} Damage</span>
                            </button>
                            <button
                                type="button"
                                className="mobile-hp-modal-action heal"
                                onClick={() => {
                                    onHeal(hpInput);
                                    setShowHpModal(false);
                                }}
                            >
                                <IconHeart size={15} />
                                <span>Heal {hpInput} HP</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Dice Roller Modal (เลือกทอยเต๋าเอง) */}
            {showDiceRoller && (
                <div className="mobile-dice-modal-overlay" onClick={() => setShowDiceRoller(false)}>
                    <div className="mobile-dice-modal-card" onClick={(e) => e.stopPropagation()}>
                        <Suspense fallback={<div className="mobile-dice-loading">Loading Dice Roller...</div>}>
                            <CustomDiceRoller
                                onClose={() => setShowDiceRoller(false)}
                                casterName={boundMonster?.name || casterName}
                            />
                        </Suspense>
                    </div>
                </div>
            )}
        </div>
    );
};
