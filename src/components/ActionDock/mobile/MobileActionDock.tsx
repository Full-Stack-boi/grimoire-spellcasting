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
    IconSpellInfo,
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
import { getResourceBadge } from "../character/resourceBadges";
import { GemAction, GemBonusAction } from "../shared/Bg3Icons";
import { resolveWeaponRiders } from "../../../services/weaponDamageRiders";
import { findMatchingActionFormula } from "../../../assets/manual-formulas";
import { useActionLists } from "../hooks/useActionLists";

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
    onSetTempHp?: (temp: number) => void;
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
    pactSlots?: SpellSlotConfig;
    pactMagicLevel?: number;
    onTogglePactPip?: () => void;
    resources?: DDBFeatureAction[];
    featureUses?: Record<string, number>;
    onToggleResource?: (feature: DDBFeatureAction) => void;
    actionUsed?: boolean;
    bonusActionUsed?: boolean;
    onToggleAction?: () => void;
    onToggleBonusAction?: () => void;
    onShortRest?: () => void;
    onLongRest?: () => void;
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
    initialTab?: MobileTab;
    isAiming?: boolean;
    aimingName?: string;
    onCancelAiming?: () => void;

    // Phase 1: Spells Parity
    onSpellAttackRoll?: (spell: DockSpell) => void;
    onSpellDamageRoll?: (spell: DockSpell) => void;
    getAvailableSlotLevels?: (baseLevel: number) => number[];
    getSpellChoices?: (spell: { id: string; name?: string }) => string[] | null;
    spellDamageTypeOverrides?: Record<string, string>;
    onSelectDamageType?: (spellId: string, chosen: string) => void;
    selectedHexAbility?: string;
    onSelectHexAbility?: (ability: string) => void;

    // Phase 2: Actions Parity
    hasTWF?: boolean;
    effectiveMainHandId?: string | null;
    effectiveOffhandId?: string | null;
    effectiveOffhandWeapon?: DDBWeaponAttack;
    onSwapWeaponHands?: () => void;
    riderChoice?: string;
    onSelectRiderChoice?: (choice: string) => void;
    filteredCombatActions?: Array<{ name: string; description: string }>;
    onFlurryOfBlows?: () => void;
    onBonusUnarmedStrike?: () => void;
    onTwoWeaponFighting?: () => void;
    onOpportunityAttack?: () => void;

    // Phase 3: Vitals & Status Parity
    concentrationSpell?: { id: string; name: string } | null;
    onBreakConcentration?: () => void;
    exhaustionLevel?: number;
    onExhaustionChange?: (updater: number | ((prev: number) => number)) => void;
    deathSaves?: { successes: number; failures: number };
    onRollDeathSave?: () => void;
    usedHitDice?: Record<string, number>;
    onRollHitDie?: (die: string, maxSides: number) => void;

    // Phase 4: Items & Features Parity
    attunedCount?: number;
    totalInventoryWeight?: number;
    maxCarryWeight?: number;
    onToggleEquipItem?: (item: DDBInventoryItem) => void;
    onToggleItemAttunement?: (item: DDBInventoryItem) => void;
    onFeatureOptionClick?: (feature: DDBFeatureAction, optionId: string) => void;
}

export type MobileTab = "ACTIONS" | "SPELLS" | "FEATURES" | "ITEMS" | "SHEET" | "BESTIARY";

const ALL_5E_CONDITIONS = [
    "Blinded", "Charmed", "Deafened", "Frightened", "Grappled",
    "Incapacitated", "Invisible", "Paralyzed", "Petrified",
    "Poisoned", "Prone", "Restrained", "Stunned", "Unconscious"
];

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
    onSetTempHp,
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
    pactSlots,
    pactMagicLevel,
    onTogglePactPip,
    resources,
    featureUses,
    onToggleResource,
    actionUsed = false,
    bonusActionUsed = false,
    onToggleAction,
    onToggleBonusAction,
    onShortRest,
    onLongRest,
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
    initialTab,
    isAiming,
    aimingName,
    onCancelAiming,
    onSpellAttackRoll,
    onSpellDamageRoll,
    getAvailableSlotLevels,
    getSpellChoices,
    spellDamageTypeOverrides,
    onSelectDamageType,
    selectedHexAbility = "dexterity",
    onSelectHexAbility,
    hasTWF,
    effectiveMainHandId,
    effectiveOffhandId,
    effectiveOffhandWeapon,
    onSwapWeaponHands,
    riderChoice = "none",
    onSelectRiderChoice,
    filteredCombatActions = [],
    onFlurryOfBlows,
    onBonusUnarmedStrike,
    onTwoWeaponFighting,
    onOpportunityAttack,
    concentrationSpell,
    onBreakConcentration,
    exhaustionLevel = 0,
    onExhaustionChange,
    deathSaves,
    onRollDeathSave,
    usedHitDice,
    onRollHitDie,
    attunedCount = 0,
    totalInventoryWeight = 0,
    maxCarryWeight = 150,
    onToggleEquipItem,
    onToggleItemAttunement,
    onFeatureOptionClick,
}) => {
    const [activeTab, setActiveTab] = useState<MobileTab>(initialTab || "ACTIONS");
    const [actionFilter, setActionFilter] = useState<string>("ALL");
    const [itemsFilter, setItemsFilter] = useState<string>("ALL");
    const [showHpModal, setShowHpModal] = useState(initialShowHpModal ?? false);
    const [showDiceRoller, setShowDiceRoller] = useState<boolean>(false);
    const [showConditionPicker, setShowConditionPicker] = useState<boolean>(false);

    // HP Input UX: store raw string so user can clear/backspace freely and type single digits (like 8)
    const [hpInputText, setHpInputText] = useState<string>("5");
    const hpInputNumber = Math.max(1, parseInt(hpInputText, 10) || 1);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [viewMode, setViewMode] = useState<"cards" | "compact">("cards");
    const [collapsedLevels, setCollapsedLevels] = useState<Record<number, boolean>>({});
    const [isAimingBarMinimized, setIsAimingBarMinimized] = useState<boolean>(true);
    const [spellLevelFilter, setSpellLevelFilter] = useState<string>("ALL");

    // Dynamic Weapon Modes (Melee vs Thrown)
    const [weaponModes, setWeaponModes] = useState<Record<string, "melee" | "thrown">>({});

    // Upcast & Spell Choices Picker State
    const [expandedSpellDetails, setExpandedSpellDetails] = useState<Record<string, boolean>>({});
    const [expandedFeatureDetails, setExpandedFeatureDetails] = useState<Record<string, boolean>>({});
    const [expandedItemDetails, setExpandedItemDetails] = useState<Record<string, boolean>>({});
    const [activeSpellOptionsId, setActiveSpellOptionsId] = useState<string | null>(null);
    const [spellUpcastLevels, setSpellUpcastLevels] = useState<Record<string, number>>({});

    const toggleLevelCollapse = (lvl: number) => {
        setCollapsedLevels((prev) => ({ ...prev, [lvl]: !prev[lvl] }));
    };

    const toggleSpellDetails = (spellId: string) => {
        setExpandedSpellDetails((prev) => ({ ...prev, [spellId]: !prev[spellId] }));
    };

    const toggleFeatureDetails = (featId: string) => {
        setExpandedFeatureDetails((prev) => ({ ...prev, [featId]: !prev[featId] }));
    };

    const toggleItemDetails = (itemId: string) => {
        setExpandedItemDetails((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
    };

    const toggleSpellOptions = (spellId: string) => {
        setActiveSpellOptionsId((prev) => (prev === spellId ? null : spellId));
    };

    const isMonk = useMemo(
        () => Boolean(character?.classes?.some((c) => c.name.toLowerCase() === "monk")),
        [character]
    );

    const {
        filteredWeapons: baseFilteredWeapons,
        actionFeatures,
        bonusActionFeatures,
        bonusActionSpells,
        reactionFeatures,
        reactionSpells,
        filteredCombatActions: derivedCombatActions,
    } = useActionLists({
        search: searchQuery,
        weapons,
        spells,
        features,
        character,
    });

    const effectiveCombatActions = filteredCombatActions.length > 0 ? filteredCombatActions : derivedCombatActions;

    const filteredWeapons = useMemo(() => {
        return baseFilteredWeapons.filter((w) => {
            if (actionFilter === "MELEE") return w.type === "melee";
            if (actionFilter === "RANGED") return w.type === "ranged" || Boolean(w.hasThrown);
            if (actionFilter === "BONUS" || actionFilter === "REACTION" || actionFilter === "COMBAT") return false;
            return true;
        });
    }, [baseFilteredWeapons, actionFilter]);

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
        return features.filter((f) => {
            if (!q) return true;
            return (
                f.name.toLowerCase().includes(q) ||
                (f.description && f.description.toLowerCase().includes(q)) ||
                (f.source && f.source.toLowerCase().includes(q))
            );
        });
    }, [features, searchQuery]);

    const filteredInventory = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return inventory.filter((item) => {
            if (itemsFilter === "EQUIPPED" && !item.equipped) return false;
            if (itemsFilter === "ATTUNED" && !item.isAttuned) return false;
            if (!q) return true;
            return (
                item.name.toLowerCase().includes(q) ||
                (item.type && item.type.toLowerCase().includes(q))
            );
        });
    }, [inventory, searchQuery, itemsFilter]);

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

    // Draggable Floating Action Button (FAB) State & Handlers
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

    // Drag Handle Handlers
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

        if (deltaY > 150 || rawH < 180) {
            onToggleSnap("fab");
            return;
        }

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

    // Horizontal Swipe Navigation
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
                const nextTab = availableTabs[(idx + 1) % availableTabs.length];
                switchTab(nextTab);
            } else {
                const prevTab = availableTabs[(idx - 1 + availableTabs.length) % availableTabs.length];
                switchTab(prevTab);
            }
        }
    };

    const getSlotInfo = (lvl: number): { remaining: number; max: number; isPact?: boolean } | null => {
        if (pactMagicLevel === lvl && pactSlots && pactSlots.max > 0) {
            return {
                remaining: Math.max(0, pactSlots.max - pactSlots.used),
                max: pactSlots.max,
                isPact: true,
            };
        }
        if (spellSlots && spellSlots[lvl] && spellSlots[lvl].max > 0) {
            const slot = spellSlots[lvl];
            return { remaining: Math.max(0, slot.max - slot.used), max: slot.max };
        }
        if (getRemainingSlots) {
            const remaining = getRemainingSlots(lvl);
            if (remaining > 0) return { remaining, max: remaining };
        }
        return null;
    };

    // HP calculation & styling
    const totalMaxHp = maxHp || 10;
    const effectiveHp = currentHp + (tempHp > 0 ? tempHp : 0);
    const hpRatio = Math.max(0, Math.min(1, currentHp / totalMaxHp));
    const hpColor = hpRatio > 0.5 ? "#22c55e" : hpRatio > 0.2 ? "#eab308" : "#ef4444";

    const effectiveAc = boundMonster?.armorClass || character?.armorClass || 10;
    const initMod = boundMonster
        ? Math.floor((boundMonster.stats.dex - 10) / 2)
        : (character?.initiative ?? character?.modifiers?.dex ?? 0);

    // Active weapon riders resolution
    const resolvedWeaponRiders = useMemo(() => {
        if (!character || !weapons?.[0]) return null;
        return resolveWeaponRiders({
            character,
            weapon: weapons[0],
            activeBuffs: [],
            riderChoice,
        });
    }, [character, weapons, riderChoice]);

    const renderMobileResourceStrip = () => {
        const hasActionGems = onToggleAction || onToggleBonusAction;
        const hasPact = pactSlots && pactSlots.max > 0;
        const activeSlotLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(lvl => (spellSlots?.[lvl]?.max ?? 0) > 0);
        const activeResources = (resources || []).filter(r => (r.limitedUse?.max || 0) > 0);

        if (!hasActionGems && !hasPact && activeSlotLevels.length === 0 && activeResources.length === 0) {
            return null;
        }

        return (
            <div className="mobile-resource-strip">
                {hasActionGems && (
                    <div className="mobile-action-gems-group" title="Turn Action Economy">
                        <button
                            type="button"
                            className={`mobile-turn-gem action ${actionUsed ? "expended" : ""}`}
                            onClick={onToggleAction}
                            title={`Action: ${actionUsed ? "Expended" : "Available"} (Tap to toggle)`}
                            aria-label="Action point"
                        >
                            <GemAction expended={actionUsed} />
                        </button>
                        <button
                            type="button"
                            className={`mobile-turn-gem bonus ${bonusActionUsed ? "expended" : ""}`}
                            onClick={onToggleBonusAction}
                            title={`Bonus Action: ${bonusActionUsed ? "Expended" : "Available"} (Tap to toggle)`}
                            aria-label="Bonus action point"
                        >
                            <GemBonusAction expended={bonusActionUsed} />
                        </button>
                    </div>
                )}

                {(hasPact || activeSlotLevels.length > 0 || activeResources.length > 0) && (
                    <div className="mobile-resource-pills-row">
                        {hasPact && (
                            <button
                                type="button"
                                className="mobile-resource-pill pact"
                                onClick={onTogglePactPip}
                                title={`Pact Magic (Level ${pactMagicLevel || 1}): ${pactSlots.max - pactSlots.used}/${pactSlots.max} available (Tap to toggle)`}
                            >
                                <span className="mobile-res-name">PACT{pactMagicLevel ? ` ${pactMagicLevel}` : ""}</span>
                                <span className="mobile-res-val">{pactSlots.max - pactSlots.used}/{pactSlots.max}</span>
                            </button>
                        )}

                        {activeSlotLevels.map(lvl => {
                            const slot = spellSlots![lvl];
                            const available = Math.max(0, slot.max - slot.used);
                            const status = available === 0 ? "empty" : (available < slot.max ? "partial" : "full");
                            return (
                                <button
                                    key={lvl}
                                    type="button"
                                    className={`mobile-resource-pill slot ${status}`}
                                    onClick={() => onToggleSlotPip(lvl, Math.max(0, available - 1))}
                                    title={`Level ${lvl} Slots: ${available}/${slot.max} available (Tap to toggle)`}
                                >
                                    <span className="mobile-res-name">Lv{lvl}</span>
                                    <span className="mobile-res-val">{available}/{slot.max}</span>
                                </button>
                            );
                        })}

                        {activeResources.map(feat => {
                            const max = feat.limitedUse?.max || 0;
                            const used = featureUses?.[feat.id] ?? (feat.limitedUse?.used || 0);
                            const available = Math.max(0, max - used);
                            const { label, theme } = getResourceBadge(feat.name, feat.source);
                            const status = available === 0 ? "empty" : (available < max ? "partial" : "full");

                            return (
                                <button
                                    key={feat.id}
                                    type="button"
                                    className={`mobile-resource-pill ${theme} ${status}`}
                                    onClick={() => onToggleResource?.(feat)}
                                    title={`${feat.name}: ${available}/${max} available (Tap to toggle)`}
                                >
                                    <span className="mobile-res-name">{label}</span>
                                    <span className="mobile-res-val">{available}/{max}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {(onShortRest || onLongRest) && (
                    <div className="mobile-rest-actions-group">
                        {onShortRest && (
                            <button
                                type="button"
                                className="mobile-quick-rest-btn short"
                                onClick={onShortRest}
                                title="Short Rest (Restore Pact Slots & Abilities)"
                            >
                                SR
                            </button>
                        )}
                        {onLongRest && (
                            <button
                                type="button"
                                className="mobile-quick-rest-btn long"
                                onClick={onLongRest}
                                title="Long Rest (Full Recovery)"
                            >
                                LR
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // 1. COLLAPSED FAB MODE
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

    // 2. COMPACT AIMING BAR
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

    // 3. EXPANDED MOBILE ACTION SHEET MODE
    return (
        <div className="mobile-sheet-container expanded">
            {/* Top Drag Handle */}
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
                            {tempHp > 0 && (
                                <div
                                    className="mobile-hp-temp-fill"
                                    style={{ width: `${Math.min(100 - (hpRatio * 100), (tempHp / (totalMaxHp || 1)) * 100)}%` }}
                                />
                            )}
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
                        title="Custom Dice Roller"
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

            {/* Status Strip: Concentration, Conditions, Exhaustion (Shown when active) */}
            {(concentrationSpell || exhaustionLevel > 0 || (conditions && conditions.length > 0)) && (
                <div className="mobile-status-strip">
                    {concentrationSpell && (
                        <div className="mobile-concentration-pill" title="Concentrating on Spell">
                            <span>CONC: {concentrationSpell.name}</span>
                            {onBreakConcentration && (
                                <button
                                    type="button"
                                    className="mobile-conc-break-btn"
                                    onClick={onBreakConcentration}
                                    title="Break Concentration"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    )}

                    {onExhaustionChange !== undefined && exhaustionLevel > 0 && (
                        <div className="mobile-exhaustion-pill" title="Exhaustion Level">
                            <span>EXH {exhaustionLevel}/6</span>
                            <div className="mobile-exh-stepper">
                                <button
                                    type="button"
                                    onClick={() => onExhaustionChange(Math.max(0, exhaustionLevel - 1))}
                                    title="Decrease Exhaustion"
                                >
                                    −
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onExhaustionChange(Math.min(6, exhaustionLevel + 1))}
                                    title="Increase Exhaustion"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    {conditions && conditions.length > 0 && (
                        <div className="mobile-active-conditions-list">
                            {conditions.map((cond) => (
                                <span
                                    key={cond}
                                    onClick={() => onToggleCondition(cond)}
                                    className="mobile-condition-chip"
                                    title="Tap to remove condition"
                                >
                                    <span>{cond}</span>
                                    <IconClose size={8} />
                                </span>
                            ))}
                        </div>
                    )}

                    <button
                        type="button"
                        className="mobile-add-condition-btn"
                        onClick={() => setShowConditionPicker((prev) => !prev)}
                        title="Add / Manage Conditions"
                    >
                        + COND
                    </button>
                </div>
            )}

            {/* Quick Condition Picker Overlay */}
            {showConditionPicker && (
                <div className="mobile-condition-picker-popup">
                    <div className="mobile-condition-picker-header">
                        <span>Toggle Conditions</span>
                        <button type="button" onClick={() => setShowConditionPicker(false)}>✕</button>
                    </div>
                    <div className="mobile-condition-picker-grid">
                        {ALL_5E_CONDITIONS.map((cond) => {
                            const isActive = conditions?.some((c) => c.toLowerCase() === cond.toLowerCase());
                            return (
                                <button
                                    key={cond}
                                    type="button"
                                    className={`mobile-cond-opt-btn ${isActive ? "active" : ""}`}
                                    onClick={() => onToggleCondition(cond)}
                                >
                                    {cond}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Situational Roll Modifier Bar */}
            {activeTab === "ACTIONS" && (
                <div className="mobile-roll-bar-wrapper">
                    <SituationalRollBar
                        layout="inline"
                        scope="attack"
                    />
                </div>
            )}

            {/* Render Resources Strip */}
            {!boundMonster && renderMobileResourceStrip()}

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

            {/* Content Workspaces */}
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

                {/* 2. PLAYER ACTIONS TAB */}
                {!boundMonster && activeTab === "ACTIONS" && (
                    <>
                        <div className="mobile-subfilter-bar">
                            {["ALL", "MELEE", "RANGED", "BONUS", "REACTION", "COMBAT"].map((f) => (
                                <button
                                    key={f}
                                    type="button"
                                    className={`mobile-subfilter-chip ${actionFilter === f ? "active" : ""}`}
                                    onClick={() => setActionFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                            <button
                                type="button"
                                className={`mobile-subfilter-chip ${showConditionPicker ? "active" : ""}`}
                                onClick={() => setShowConditionPicker((prev) => !prev)}
                                title="Toggle Conditions"
                            >
                                + COND
                            </button>
                        </div>

                        {/* Weapon Riders Strip (Only when showing weapons) */}
                        {(actionFilter === "ALL" || actionFilter === "MELEE" || actionFilter === "RANGED") &&
                            resolvedWeaponRiders?.availableRiderChoice &&
                            onSelectRiderChoice && (
                                <div className="mobile-riders-strip">
                                    <span className="mobile-rider-label">{resolvedWeaponRiders.availableRiderChoice.riderName}:</span>
                                    <button
                                        type="button"
                                        className={`mobile-rider-chip ${riderChoice === "none" ? "active" : ""}`}
                                        onClick={() => onSelectRiderChoice("none")}
                                    >
                                        None
                                    </button>
                                    {resolvedWeaponRiders.availableRiderChoice.choices.map((choice) => (
                                        <button
                                            key={choice}
                                            type="button"
                                            className={`mobile-rider-chip ${riderChoice === choice ? "active" : ""}`}
                                            onClick={() => onSelectRiderChoice(riderChoice === choice ? "none" : choice)}
                                        >
                                            {choice}
                                        </button>
                                    ))}
                                </div>
                            )}

                        {/* Off-Hand Weapon Card (Two-Weapon Fighting) */}
                        {hasTWF && effectiveOffhandWeapon && (actionFilter === "ALL" || actionFilter === "BONUS") && (
                            <div className="mobile-action-card offhand">
                                <div className="mobile-action-title-row">
                                    <div className="mobile-action-name-group">
                                        <span className="mobile-action-name">{effectiveOffhandWeapon.name}</span>
                                        <span className="mobile-twf-badge">OFF-HAND</span>
                                    </div>
                                    {onSwapWeaponHands && (
                                        <button
                                            type="button"
                                            className="mobile-swap-hands-btn"
                                            onClick={onSwapWeaponHands}
                                            title="Swap Main & Off Hand"
                                        >
                                            Swap Hands
                                        </button>
                                    )}
                                </div>
                                <div className="mobile-action-desc">
                                    {effectiveOffhandWeapon.damage} • Bonus Action Attack
                                </div>
                                <div className="mobile-action-btn-row">
                                    {onSelectWeapon && (
                                        <button
                                            type="button"
                                            className="mobile-action-btn aim"
                                            onClick={() => onSelectWeapon(effectiveOffhandWeapon, "melee")}
                                        >
                                            <IconAim size={13} />
                                            <span>Aim</span>
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="mobile-action-btn attack"
                                        onClick={() => {
                                            if (onTwoWeaponFighting) {
                                                onTwoWeaponFighting();
                                            } else {
                                                onWeaponAttack?.(effectiveOffhandWeapon, "melee");
                                            }
                                        }}
                                    >
                                        <IconSword size={13} />
                                        <span>Attack ({effectiveOffhandWeapon.toHit >= 0 ? `+${effectiveOffhandWeapon.toHit}` : effectiveOffhandWeapon.toHit})</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="mobile-action-btn damage"
                                        onClick={() => onWeaponDamage?.(effectiveOffhandWeapon, riderChoice !== "none" ? riderChoice : null, "melee")}
                                    >
                                        <IconDamage size={13} />
                                        <span>Damage ({effectiveOffhandWeapon.damage})</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Weapons List (Shown in ALL, MELEE, RANGED) */}
                        {(actionFilter === "ALL" || actionFilter === "MELEE" || actionFilter === "RANGED") && (
                            filteredWeapons.length === 0 ? (
                                actionFilter !== "ALL" && (
                                    <div style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 13 }}>
                                        {searchQuery ? "No weapons matching search." : `No ${actionFilter.toLowerCase()} weapons available.`}
                                    </div>
                                )
                            ) : viewMode === "cards" ? (
                                filteredWeapons.map((weapon) => {
                                    const currentMode = weaponModes[weapon.id] || (weapon.type === "ranged" ? "thrown" : "melee");
                                    const isRanged = weapon.type === "ranged" || currentMode === "thrown";
                                    const isMainHand = hasTWF && weapon.id === effectiveMainHandId;
                                    const isOffHand = hasTWF && weapon.id === effectiveOffhandId;

                                    return (
                                        <div key={weapon.id} className="mobile-action-card">
                                            <div className="mobile-action-title-row">
                                                <div className="mobile-action-name-group">
                                                    <span className="mobile-action-name">{weapon.name}</span>
                                                    {isMainHand && <span className="mobile-twf-badge main">MAIN</span>}
                                                    {isOffHand && <span className="mobile-twf-badge">OFF</span>}
                                                </div>
                                                {weapon.hasThrown ? (
                                                    <div className="mobile-mode-switch">
                                                        <button
                                                            type="button"
                                                            className={`mobile-mode-opt ${currentMode === "melee" ? "active" : ""}`}
                                                            onClick={() => setWeaponModes(prev => ({ ...prev, [weapon.id]: "melee" }))}
                                                        >
                                                            Melee
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`mobile-mode-opt ${currentMode === "thrown" ? "active" : ""}`}
                                                            onClick={() => setWeaponModes(prev => ({ ...prev, [weapon.id]: "thrown" }))}
                                                        >
                                                            Thrown
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="mobile-action-badge">
                                                        {weapon.rangeText || (isRanged ? `${weapon.rangeFeet || 60} ft` : "5 ft Reach")}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mobile-action-desc">
                                                {weapon.rangeText || (isRanged ? "Range 60 ft" : "Reach 5 ft")} • {weapon.damage} {weapon.damageType}
                                            </div>
                                            <div className="mobile-action-btn-row">
                                                {onSelectWeapon && (
                                                    <button
                                                        type="button"
                                                        className="mobile-action-btn aim"
                                                        onClick={() => onSelectWeapon(weapon, currentMode)}
                                                        title="Aim at token on map"
                                                    >
                                                        <IconAim size={13} />
                                                        <span>Aim</span>
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="mobile-action-btn attack"
                                                    onClick={() => onWeaponAttack?.(weapon, currentMode)}
                                                    title="Roll Attack"
                                                >
                                                    <IconSword size={13} />
                                                    <span>Attack ({weapon.toHit >= 0 ? `+${weapon.toHit}` : weapon.toHit})</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mobile-action-btn damage"
                                                    onClick={() => onWeaponDamage?.(weapon, riderChoice !== "none" ? riderChoice : null, currentMode)}
                                                    title="Roll Damage"
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
                                        const currentMode = weaponModes[weapon.id] || (weapon.type === "ranged" ? "thrown" : "melee");
                                        return (
                                            <div key={weapon.id} className="mobile-compact-row">
                                                <div className="mobile-compact-info">
                                                    <span className="mobile-compact-name">{weapon.name}</span>
                                                    <span className="mobile-compact-sub">
                                                        <span className="mobile-compact-badge">{weapon.rangeText || "5 ft"}</span>
                                                        <span>{weapon.toHit >= 0 ? `+${weapon.toHit}` : weapon.toHit} to hit</span>
                                                        <span>{weapon.damage}</span>
                                                    </span>
                                                </div>
                                                <div className="mobile-compact-actions">
                                                    {onSelectWeapon && (
                                                        <button
                                                            type="button"
                                                            className="mobile-compact-btn aim"
                                                            onClick={() => onSelectWeapon(weapon, currentMode)}
                                                            title="Aim weapon"
                                                        >
                                                            <IconAim size={12} />
                                                            <span>Aim</span>
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="mobile-compact-btn attack"
                                                        onClick={() => onWeaponAttack?.(weapon, currentMode)}
                                                        title="Roll Attack"
                                                    >
                                                        <IconSword size={12} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="mobile-compact-btn damage"
                                                        onClick={() => onWeaponDamage?.(weapon, riderChoice !== "none" ? riderChoice : null, currentMode)}
                                                        title="Roll Damage"
                                                    >
                                                        <IconDamage size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                        )}

                        {/* BONUS ACTIONS FILTER: Bonus Action Features & Bonus Action Spells */}
                        {(actionFilter === "BONUS" || actionFilter === "ALL") && (
                            <>
                                {bonusActionFeatures.map((feat) => {
                                    const featLower = feat.name.toLowerCase();
                                    const isFlurry = isMonk && featLower.includes("flurry of blows");
                                    const isBonusStrike = isMonk && !isFlurry && (featLower.includes("bonus unarmed strike") || (featLower.includes("martial arts") && feat.activationType === "bonus"));
                                    const isDetailsOpen = Boolean(expandedFeatureDetails[feat.id]);
                                    const max = feat.limitedUse?.max || 0;
                                    const used = featureUses?.[feat.id] ?? (feat.limitedUse?.used || 0);
                                    const available = Math.max(0, max - used);

                                    return (
                                        <div key={feat.id} className="mobile-action-card">
                                            <div className="mobile-action-title-row" onClick={() => toggleFeatureDetails(feat.id)}>
                                                <span className="mobile-action-name">{feat.name}</span>
                                                <span className="mobile-action-badge">
                                                    Bonus Action{max > 0 ? ` • ${available}/${max}` : ""}
                                                </span>
                                            </div>
                                            <div className="mobile-action-desc" onClick={() => toggleFeatureDetails(feat.id)}>
                                                {isDetailsOpen
                                                    ? feat.description
                                                    : (feat.description?.slice(0, 140) || "Bonus action feature") + (feat.description && feat.description.length > 140 ? "..." : "")}
                                            </div>
                                            <div className="mobile-action-btn-row">
                                                {isFlurry && onFlurryOfBlows ? (
                                                    <button type="button" className="mobile-action-btn aim" onClick={onFlurryOfBlows}>
                                                        <IconAim size={13} />
                                                        <span>Flurry of Blows (2 Strikes)</span>
                                                    </button>
                                                ) : isBonusStrike && onBonusUnarmedStrike ? (
                                                    <button type="button" className="mobile-action-btn aim" onClick={onBonusUnarmedStrike}>
                                                        <IconAim size={13} />
                                                        <span>Bonus Unarmed Strike</span>
                                                    </button>
                                                ) : (
                                                    <button type="button" className="mobile-action-btn feature" onClick={() => onActivateFeature(feat)}>
                                                        <IconFeature size={13} />
                                                        <span>Use Bonus Action</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {actionFilter === "BONUS" && bonusActionSpells.map((spell) => (
                                    <div key={spell.id} className="mobile-action-card">
                                        <div className="mobile-action-title-row">
                                            <span className="mobile-action-name">{spell.name}</span>
                                            <span className="mobile-action-badge">Bonus Spell • Lv{spell.level}</span>
                                        </div>
                                        <div className="mobile-action-desc">
                                            Range: {spell.rangeText || "Self"}{spell.damage ? ` • ${spell.damage}` : ""}
                                        </div>
                                        <div className="mobile-action-btn-row">
                                            <button
                                                type="button"
                                                className="mobile-action-btn cast"
                                                onClick={() => onCastSpell(spell.id, spell.usesSpellSlot === false ? 0 : spell.level)}
                                            >
                                                <IconCast size={13} />
                                                <span>Cast {spell.name}</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {actionFilter === "BONUS" &&
                                    !hasTWF &&
                                    bonusActionFeatures.length === 0 &&
                                    bonusActionSpells.length === 0 && (
                                        <div style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 13 }}>
                                            No bonus actions available.
                                        </div>
                                    )}
                            </>
                        )}

                        {/* REACTIONS FILTER: Opportunity Attack, Reaction Features & Reaction Spells */}
                        {actionFilter === "REACTION" && (
                            <>
                                {onOpportunityAttack && (
                                    <div className="mobile-action-card">
                                        <div className="mobile-action-title-row">
                                            <span className="mobile-action-name">Opportunity Attack</span>
                                            <span className="mobile-action-badge">Reaction</span>
                                        </div>
                                        <div className="mobile-action-desc">
                                            Make one melee attack when a hostile creature you can see moves out of your reach.
                                        </div>
                                        <div className="mobile-action-btn-row">
                                            <button
                                                type="button"
                                                className="mobile-action-btn attack"
                                                onClick={onOpportunityAttack}
                                            >
                                                <IconSword size={13} />
                                                <span>Roll Opportunity Attack</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {reactionFeatures.map((feat) => (
                                    <div key={feat.id} className="mobile-action-card">
                                        <div className="mobile-action-title-row">
                                            <span className="mobile-action-name">{feat.name}</span>
                                            <span className="mobile-action-badge">Reaction</span>
                                        </div>
                                        <div className="mobile-action-desc">
                                            {feat.description?.slice(0, 160) || "Reaction feature"}
                                        </div>
                                        <div className="mobile-action-btn-row">
                                            <button type="button" className="mobile-action-btn feature" onClick={() => onActivateFeature(feat)}>
                                                <IconFeature size={13} />
                                                <span>Use Reaction</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {reactionSpells.map((spell) => (
                                    <div key={spell.id} className="mobile-action-card">
                                        <div className="mobile-action-title-row">
                                            <span className="mobile-action-name">{spell.name}</span>
                                            <span className="mobile-action-badge">Reaction Spell • Lv{spell.level}</span>
                                        </div>
                                        <div className="mobile-action-desc">
                                            Range: {spell.rangeText || "Self"}{spell.damage ? ` • ${spell.damage}` : ""}
                                        </div>
                                        <div className="mobile-action-btn-row">
                                            <button
                                                type="button"
                                                className="mobile-action-btn cast"
                                                onClick={() => onCastSpell(spell.id, spell.usesSpellSlot === false ? 0 : spell.level)}
                                            >
                                                <IconCast size={13} />
                                                <span>Cast {spell.name}</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* COMBAT ACTIONS FILTER: 1-Action Features & Standard Combat Actions */}
                        {actionFilter === "COMBAT" && (
                            <div className="mobile-combat-actions-grid">
                                {actionFeatures.map((feat) => (
                                    <div key={feat.id} className="mobile-action-card">
                                        <div className="mobile-action-title-row">
                                            <span className="mobile-action-name">{feat.name}</span>
                                            <span className="mobile-action-badge">1 Action</span>
                                        </div>
                                        <div className="mobile-action-desc">
                                            {feat.description?.slice(0, 160) || "Action feature"}
                                        </div>
                                        <div className="mobile-action-btn-row">
                                            <button type="button" className="mobile-action-btn feature" onClick={() => onActivateFeature(feat)}>
                                                <IconFeature size={13} />
                                                <span>Use Action</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {effectiveCombatActions.map((act) => (
                                    <div key={act.name} className="mobile-action-card combat">
                                        <div className="mobile-action-title-row">
                                            <span className="mobile-action-name">{act.name}</span>
                                            <span className="mobile-action-badge">Action</span>
                                        </div>
                                        <div className="mobile-action-desc">{act.description}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* 3. PLAYER SPELLS TAB */}
                {!boundMonster && activeTab === "SPELLS" && (
                    <>
                        {/* Spell Level Quick Filter Bar */}
                        <div className="mobile-spell-level-filter-bar">
                            <button
                                type="button"
                                className={`mobile-level-filter-chip ${spellLevelFilter === "ALL" ? "active" : ""}`}
                                onClick={() => setSpellLevelFilter("ALL")}
                            >
                                ALL ({new Set(spellGroups.flatMap(g => g.spells.map(s => s.id))).size})
                            </button>
                            {spellGroups.map(g => {
                                const isSpecial = Boolean(g.isSpecial || g.level < 0);
                                const slot = !isSpecial && g.level > 0 ? getSlotInfo(g.level) : null;
                                const filterKey = isSpecial ? "SPECIAL" : String(g.level);
                                const isLvlActive = spellLevelFilter === filterKey;
                                return (
                                    <button
                                        key={g.label}
                                        type="button"
                                        className={`mobile-level-filter-chip ${isLvlActive ? "active" : ""} ${isSpecial ? "special" : (slot?.isPact ? "pact" : "")}`}
                                        onClick={() => setSpellLevelFilter(isLvlActive ? "ALL" : filterKey)}
                                    >
                                        <span>{isSpecial ? "FREE" : g.level === 0 ? "0" : slot?.isPact ? `PACT ${g.level}` : `${g.level}`}</span>
                                        {slot ? (
                                            <span className="chip-slot-badge">{slot.remaining}/{slot.max}</span>
                                        ) : (
                                            <span className="chip-count-badge">({g.spells.length})</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {filteredSpellGroups.length === 0 ? (
                            <div style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 13 }}>
                                {searchQuery ? "No spells matching search." : "No prepared spells found."}
                            </div>
                        ) : (
                            filteredSpellGroups
                                .filter(g => {
                                    if (spellLevelFilter === "ALL") return true;
                                    if (spellLevelFilter === "SPECIAL") return g.isSpecial || g.level < 0;
                                    return String(g.level) === spellLevelFilter;
                                })
                                .map((group) => {
                                    const isSpecialGroup = Boolean(group.isSpecial || group.level < 0);
                                    const isCollapsed = Boolean(collapsedLevels[group.level]);
                                    const slotInfo = !isSpecialGroup && group.level > 0 ? getSlotInfo(group.level) : null;

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
                                                {group.level > 0 && !isSpecialGroup && slotInfo && slotInfo.max > 0 && (
                                                    <div className="mobile-header-slot-pips" onClick={(e) => e.stopPropagation()}>
                                                        {slotInfo.isPact && (
                                                            <span className="mobile-header-pact-badge">PACT</span>
                                                        )}
                                                        <span className="mobile-header-slot-count">{slotInfo.remaining}/{slotInfo.max}</span>
                                                        <div className="mobile-header-pips-row">
                                                            {Array.from({ length: slotInfo.max }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`mobile-slot-pip ${slotInfo.isPact ? "pact" : ""} ${i < slotInfo.remaining ? "used" : ""}`}
                                                                    onClick={() => {
                                                                        if (slotInfo.isPact && onTogglePactPip) {
                                                                            onTogglePactPip();
                                                                        } else {
                                                                            onToggleSlotPip(group.level, i);
                                                                        }
                                                                    }}
                                                                    title={`${slotInfo.isPact ? "Pact Magic" : `Slot ${group.level}`} (${i + 1}/${slotInfo.max})`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {!isCollapsed && (
                                                viewMode === "cards" ? (
                                                    <div className="mobile-spells-list-cards">
                                                        {group.spells.map((spell) => {
                                                            const isDetailsOpen = Boolean(expandedSpellDetails[spell.id]);
                                                            const isOptionsOpen = activeSpellOptionsId === spell.id;
                                                            const availableLevels = getAvailableSlotLevels ? getAvailableSlotLevels(spell.level) : [];
                                                            const choices = getSpellChoices ? getSpellChoices(spell) : null;
                                                            const isHex = spell.name.toLowerCase() === "hex" || spell.id.toLowerCase() === "hex";
                                                            const canUpcast = !isSpecialGroup && spell.level > 0 && availableLevels.length > 1;
                                                            const hasOptions = canUpcast || Boolean(choices?.length) || isHex;
                                                            const chosenLevel = spellUpcastLevels[spell.id] ?? (isSpecialGroup ? 0 : spell.level);

                                                            return (
                                                                <div key={spell.id} className="mobile-action-card">
                                                                    <div className="mobile-action-title-row" onClick={() => toggleSpellDetails(spell.id)}>
                                                                        <div className="mobile-action-name-group">
                                                                            <span className="mobile-action-name">{spell.name}</span>
                                                                            {isSpecialGroup && (
                                                                                <span className="mobile-free-badge">
                                                                                    {spell.freeCast
                                                                                        ? `FREE ${Math.max(0, spell.freeCast.max - spell.freeCast.used)}/${spell.freeCast.max} ${spell.freeCast.resetType}`
                                                                                        : "AT-WILL"}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <div className="mobile-card-header-actions">
                                                                            <span className="mobile-action-badge">
                                                                                {spell.school} • {spell.castingTime}
                                                                            </span>
                                                                            <IconSpellInfo size={13} className="mobile-info-icon" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="mobile-action-desc">
                                                                        Range: {spell.rangeText || "Self"}
                                                                        {spell.damage && ` • Damage: ${spell.damage}`}
                                                                        {spell.hitOrDc && ` • ${spell.hitOrDc}`}
                                                                    </div>

                                                                    {/* Tap-to-Expand Full Spell Details */}
                                                                    {isDetailsOpen && (
                                                                        <div className="mobile-detail-accordion">
                                                                            <div className="mobile-detail-row">
                                                                                <span>Duration: {spell.rawDdbSpell?.duration || "Instantaneous"}</span>
                                                                                {spell.rawDdbSpell?.concentration && <span className="mobile-conc-tag">Concentration</span>}
                                                                            </div>
                                                                            {(spell.rawDdbSpell?.description || spell.notes) && (
                                                                                <div className="mobile-detail-desc">{spell.rawDdbSpell?.description || spell.notes}</div>
                                                                            )}
                                                                        </div>
                                                                    )}

                                                                    {/* Inline Upcast & Choices Strip */}
                                                                    {isOptionsOpen && (
                                                                        <div className="mobile-spell-options-panel">
                                                                            {canUpcast && (
                                                                                <div className="mobile-options-row">
                                                                                    <span className="mobile-opt-label">Slot:</span>
                                                                                    {availableLevels.map(lvl => (
                                                                                        <button
                                                                                            key={lvl}
                                                                                            type="button"
                                                                                            className={`mobile-opt-chip ${chosenLevel === lvl ? "active" : ""}`}
                                                                                            onClick={() => setSpellUpcastLevels(prev => ({ ...prev, [spell.id]: lvl }))}
                                                                                        >
                                                                                            Lv{lvl}
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            )}

                                                                            {choices && choices.length > 0 && onSelectDamageType && (
                                                                                <div className="mobile-options-row">
                                                                                    <span className="mobile-opt-label">Type:</span>
                                                                                    {choices.map(choice => (
                                                                                        <button
                                                                                            key={choice}
                                                                                            type="button"
                                                                                            className={`mobile-opt-chip ${spellDamageTypeOverrides?.[spell.id] === choice ? "active" : ""}`}
                                                                                            onClick={() => onSelectDamageType(spell.id, choice)}
                                                                                        >
                                                                                            {choice}
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            )}

                                                                            {isHex && onSelectHexAbility && (
                                                                                <div className="mobile-options-row">
                                                                                    <span className="mobile-opt-label">Hex:</span>
                                                                                    {["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map(ab => (
                                                                                        <button
                                                                                            key={ab}
                                                                                            type="button"
                                                                                            className={`mobile-opt-chip ${selectedHexAbility === ab ? "active" : ""}`}
                                                                                            onClick={() => onSelectHexAbility(ab)}
                                                                                        >
                                                                                            {ab.slice(0, 3).toUpperCase()}
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}

                                                                    <div className="mobile-action-btn-row">
                                                                        {/* Spell Attack Roll */}
                                                                        {onSpellAttackRoll && spell.hitOrDc && spell.hitOrDc.startsWith("+") && (
                                                                            <button
                                                                                type="button"
                                                                                className="mobile-action-btn attack"
                                                                                onClick={() => onSpellAttackRoll(spell)}
                                                                                title="Roll Spell Attack"
                                                                            >
                                                                                <IconSword size={12} />
                                                                                <span>Attack ({spell.hitOrDc})</span>
                                                                            </button>
                                                                        )}

                                                                        {/* Spell Damage Roll */}
                                                                        {onSpellDamageRoll && spell.damage && (
                                                                            <button
                                                                                type="button"
                                                                                className="mobile-action-btn damage"
                                                                                onClick={() => onSpellDamageRoll(spell)}
                                                                                title="Roll Spell Damage"
                                                                            >
                                                                                <IconDamage size={12} />
                                                                                <span>Damage</span>
                                                                            </button>
                                                                        )}

                                                                        {hasOptions && (
                                                                            <button
                                                                                type="button"
                                                                                className={`mobile-action-btn options ${isOptionsOpen ? "active" : ""}`}
                                                                                onClick={() => toggleSpellOptions(spell.id)}
                                                                                title="Toggle Upcast / Options"
                                                                            >
                                                                                <span>{isOptionsOpen ? "Close" : `Lv${chosenLevel}`}</span>
                                                                            </button>
                                                                        )}

                                                                        {/* Cast Button: passes level 0 if isSpecialGroup so no slot is used */}
                                                                        <button
                                                                            type="button"
                                                                            className="mobile-action-btn cast"
                                                                            onClick={() => onCastSpell(
                                                                                spell.id,
                                                                                isSpecialGroup ? 0 : chosenLevel,
                                                                                isHex ? selectedHexAbility : undefined,
                                                                                spellDamageTypeOverrides?.[spell.id]
                                                                            )}
                                                                        >
                                                                            <IconCast size={13} />
                                                                            <span>
                                                                                {isSpecialGroup
                                                                                    ? (spell.freeCast
                                                                                        ? `Free Cast (${Math.max(0, spell.freeCast.max - spell.freeCast.used)}/${spell.freeCast.max})`
                                                                                        : "Free Cast (At-Will)")
                                                                                    : (spell.level === 0 ? "Cast Cantrip" : `Cast Level ${chosenLevel}`)}
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div className="mobile-compact-list">
                                                        {group.spells.map((spell) => {
                                                            const chosenLevel = spellUpcastLevels[spell.id] ?? (isSpecialGroup ? 0 : spell.level);
                                                            return (
                                                                <div key={spell.id} className="mobile-compact-row">
                                                                    <div className="mobile-compact-info" onClick={() => toggleSpellDetails(spell.id)}>
                                                                        <span className="mobile-compact-name">{spell.name}</span>
                                                                        <span className="mobile-compact-sub">
                                                                            <span className="mobile-compact-badge">{isSpecialGroup ? "FREE" : (spell.level === 0 ? "CANTRIP" : `LV${spell.level}`)}</span>
                                                                            <span>{spell.rangeText || "Self"}</span>
                                                                            {spell.damage && <span>{spell.damage}</span>}
                                                                        </span>
                                                                    </div>
                                                                    <div className="mobile-compact-actions">
                                                                        {onSpellAttackRoll && spell.hitOrDc && spell.hitOrDc.startsWith("+") && (
                                                                            <button
                                                                                type="button"
                                                                                className="mobile-compact-btn attack"
                                                                                onClick={() => onSpellAttackRoll(spell)}
                                                                                title="Roll Attack"
                                                                            >
                                                                                <IconSword size={12} />
                                                                            </button>
                                                                        )}
                                                                        {onSpellDamageRoll && spell.damage && (
                                                                            <button
                                                                                type="button"
                                                                                className="mobile-compact-btn damage"
                                                                                onClick={() => onSpellDamageRoll(spell)}
                                                                                title="Roll Damage"
                                                                            >
                                                                                <IconDamage size={12} />
                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            type="button"
                                                                            className="mobile-compact-btn cast"
                                                                            onClick={() => onCastSpell(
                                                                                spell.id,
                                                                                isSpecialGroup ? 0 : chosenLevel,
                                                                                undefined,
                                                                                spellDamageTypeOverrides?.[spell.id]
                                                                            )}
                                                                            title={`Cast ${spell.name}`}
                                                                        >
                                                                            <IconCast size={12} />
                                                                            <span>{isSpecialGroup ? "Free" : "Cast"}</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
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
                            {searchQuery ? "No features matching search." : "No active features found."}
                        </div>
                    ) : viewMode === "cards" ? (
                        filteredFeatures.map((feat) => {
                            const isDetailsOpen = Boolean(expandedFeatureDetails[feat.id]);
                            const formula = findMatchingActionFormula(feat.name, character);
                            const options = formula?.options;

                            return (
                                <div key={feat.id} className="mobile-action-card">
                                    <div className="mobile-action-title-row" onClick={() => toggleFeatureDetails(feat.id)}>
                                        <span className="mobile-action-name">{feat.name}</span>
                                        {feat.limitedUse && (() => {
                                            const max = feat.limitedUse.max;
                                            const used = featureUses?.[feat.id] ?? (feat.limitedUse.used || 0);
                                            const available = Math.max(0, max - used);
                                            return (
                                                <span
                                                    className="mobile-action-badge clickable"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onToggleResource?.(feat);
                                                    }}
                                                    title="Tap to toggle use"
                                                >
                                                    {available}/{max}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                    <div className="mobile-action-desc" onClick={() => toggleFeatureDetails(feat.id)}>
                                        {isDetailsOpen ? feat.description : (feat.description?.slice(0, 160) || "Class feature") + (feat.description && feat.description.length > 160 ? "..." : "")}
                                    </div>

                                    {/* Feature Sub-Options */}
                                    {options && options.length > 0 && onFeatureOptionClick && (
                                        <div className="mobile-feature-options-row">
                                            {options.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    className="mobile-opt-chip"
                                                    onClick={() => onFeatureOptionClick(feat, opt.id)}
                                                >
                                                    {opt.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}

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
                            );
                        })
                    ) : (
                        <div className="mobile-compact-list">
                            {filteredFeatures.map((feat) => (
                                <div key={feat.id} className="mobile-compact-row">
                                    <div className="mobile-compact-info" onClick={() => toggleFeatureDetails(feat.id)}>
                                        <span className="mobile-compact-name">{feat.name}</span>
                                        <span className="mobile-compact-sub">
                                            {feat.limitedUse ? (() => {
                                                const max = feat.limitedUse.max;
                                                const used = featureUses?.[feat.id] ?? (feat.limitedUse.used || 0);
                                                const available = Math.max(0, max - used);
                                                return `${available}/${max} uses`;
                                            })() : "Passive / At-Will"}
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
                    <>
                        <div className="mobile-inventory-summary">
                            <span>Weight: {Math.round(totalInventoryWeight)} / {maxCarryWeight} lb</span>
                            <span>Attuned: {attunedCount} / 3</span>
                        </div>
                        <div className="mobile-subfilter-bar">
                            {["ALL", "EQUIPPED", "ATTUNED"].map((f) => (
                                <button
                                    key={f}
                                    type="button"
                                    className={`mobile-subfilter-chip ${itemsFilter === f ? "active" : ""}`}
                                    onClick={() => setItemsFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {filteredInventory.length === 0 ? (
                            <div style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 13 }}>
                                {searchQuery ? "No items matching search." : "Inventory is empty."}
                            </div>
                        ) : viewMode === "cards" ? (
                            filteredInventory.map((item) => {
                                const isDetailsOpen = Boolean(expandedItemDetails[item.id != null ? String(item.id) : item.name]);
                                return (
                                    <div key={item.id != null ? item.id : item.name} className="mobile-action-card">
                                        <div className="mobile-action-title-row" onClick={() => toggleItemDetails(item.id != null ? String(item.id) : item.name)}>
                                            <span className="mobile-action-name">{item.name}</span>
                                            <span className="mobile-action-badge">Qty: {item.quantity || 1}</span>
                                        </div>
                                        <div className="mobile-action-desc" onClick={() => toggleItemDetails(item.id != null ? String(item.id) : item.name)}>
                                            {isDetailsOpen ? item.description : (item.description?.slice(0, 120) || "Equipment item") + (item.description && item.description.length > 120 ? "..." : "")}
                                        </div>
                                        <div className="mobile-action-btn-row">
                                            {onToggleEquipItem && (
                                                <button
                                                    type="button"
                                                    className={`mobile-action-btn equip ${item.equipped ? "active" : ""}`}
                                                    onClick={() => onToggleEquipItem(item)}
                                                >
                                                    {item.equipped ? "Equipped" : "Equip"}
                                                </button>
                                            )}
                                            {onToggleItemAttunement && (item.canAttune || item.isAttuned) && (
                                                <button
                                                    type="button"
                                                    className={`mobile-action-btn attune ${item.isAttuned ? "active" : ""}`}
                                                    onClick={() => onToggleItemAttunement(item)}
                                                >
                                                    {item.isAttuned ? "Attuned" : "Attune"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="mobile-compact-list">
                                {filteredInventory.map((item) => (
                                    <div key={item.id != null ? item.id : item.name} className="mobile-compact-row">
                                        <div className="mobile-compact-info" onClick={() => toggleItemDetails(item.id != null ? String(item.id) : item.name)}>
                                            <span className="mobile-compact-name">{item.name}</span>
                                            <span className="mobile-compact-sub">
                                                <span className="mobile-compact-badge">Qty: {item.quantity || 1}</span>
                                                {item.equipped && <span className="mobile-compact-badge" style={{ color: "#86efac", borderColor: "#16a34a" }}>EQUIPPED</span>}
                                                {item.isAttuned && <span className="mobile-compact-badge" style={{ color: "#fde047", borderColor: "#ca8a04" }}>ATTUNED</span>}
                                            </span>
                                        </div>
                                        <div className="mobile-compact-actions">
                                            {onToggleEquipItem && (
                                                <button
                                                    type="button"
                                                    className={`mobile-compact-btn ${item.equipped ? "active" : ""}`}
                                                    onClick={() => onToggleEquipItem(item)}
                                                >
                                                    {item.equipped ? "Eq" : "Un"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* 6. SHEET / CHECKS TAB */}
                {activeTab === "SHEET" && (
                    <CharacterChecks
                        passedChar={character}
                        passedTokenId={caster?.item?.id}
                    />
                )}

                {/* 7. GM BESTIARY TAB */}
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

                        {/* Death Saving Throws (when currentHp === 0) */}
                        {currentHp === 0 && deathSaves && onRollDeathSave && (
                            <div className="mobile-death-saves-section">
                                <div className="mobile-ds-title">DEATH SAVES</div>
                                <div className="mobile-ds-row">
                                    <span>Successes:</span>
                                    <div className="mobile-ds-pips">
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className={`mobile-ds-pip success ${i < deathSaves.successes ? "filled" : ""}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="mobile-ds-row">
                                    <span>Failures:</span>
                                    <div className="mobile-ds-pips">
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className={`mobile-ds-pip failure ${i < deathSaves.failures ? "filled" : ""}`} />
                                        ))}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="mobile-roll-ds-btn"
                                    onClick={onRollDeathSave}
                                >
                                    <IconDiceD20 size={14} />
                                    <span>Roll Death Save</span>
                                </button>
                            </div>
                        )}

                        {/* Quick Presets Row */}
                        <div className="mobile-hp-modal-presets">
                            {[1, 5, 10, 20].map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    className={`mobile-hp-preset-chip ${hpInputText === String(preset) ? "active" : ""}`}
                                    onClick={() => setHpInputText(String(preset))}
                                >
                                    {preset}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="mobile-hp-preset-chip max"
                                onClick={() => setHpInputText(String(Math.max(1, maxHp - currentHp || maxHp)))}
                                title="Remaining to full HP"
                            >
                                Max
                            </button>
                        </div>

                        {/* Stepper + Raw Text Input (Allows clearing/typing single digits like 8, auto-selects on focus) */}
                        <div className="mobile-hp-modal-input-row">
                            <button
                                type="button"
                                className="mobile-hp-stepper-btn minus"
                                onClick={() => setHpInputText(String(Math.max(1, hpInputNumber - 5)))}
                                title="Decrease by 5"
                            >
                                −5
                            </button>
                            <button
                                type="button"
                                className="mobile-hp-stepper-btn minus mini"
                                onClick={() => setHpInputText(String(Math.max(1, hpInputNumber - 1)))}
                                title="Decrease by 1"
                            >
                                −1
                            </button>
                            <div className="mobile-hp-input-wrap">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={hpInputText}
                                    onChange={(e) => {
                                        const clean = e.target.value.replace(/[^0-9]/g, "");
                                        setHpInputText(clean);
                                    }}
                                    onFocus={(e) => e.target.select()}
                                    onBlur={() => {
                                        if (!hpInputText || parseInt(hpInputText, 10) <= 0) {
                                            setHpInputText("1");
                                        }
                                    }}
                                    className="mobile-hp-modal-input"
                                    aria-label="Hit point amount"
                                />
                            </div>
                            <button
                                type="button"
                                className="mobile-hp-stepper-btn plus mini"
                                onClick={() => setHpInputText(String(hpInputNumber + 1))}
                                title="Increase by 1"
                            >
                                +1
                            </button>
                            <button
                                type="button"
                                className="mobile-hp-stepper-btn plus"
                                onClick={() => setHpInputText(String(hpInputNumber + 5))}
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
                                    onDamage(hpInputNumber);
                                    setShowHpModal(false);
                                }}
                            >
                                <IconMeleeSwords size={15} />
                                <span>Take {hpInputNumber} Damage</span>
                            </button>
                            <button
                                type="button"
                                className="mobile-hp-modal-action heal"
                                onClick={() => {
                                    onHeal(hpInputNumber);
                                    setShowHpModal(false);
                                }}
                            >
                                <IconHeart size={15} />
                                <span>Heal {hpInputNumber} HP</span>
                            </button>
                        </div>
                        {onSetTempHp && (
                            <div className="mobile-hp-modal-btn-row temp-row">
                                <button
                                    type="button"
                                    className="mobile-hp-modal-action temp"
                                    onClick={() => {
                                        onSetTempHp(hpInputNumber);
                                        setShowHpModal(false);
                                    }}
                                >
                                    <FaShieldHalved size={14} />
                                    <span>Set {hpInputNumber} Temp HP</span>
                                </button>
                                {tempHp > 0 && (
                                    <button
                                        type="button"
                                        className="mobile-hp-modal-action clear-temp"
                                        onClick={() => {
                                            onSetTempHp(0);
                                            setShowHpModal(false);
                                        }}
                                        title="Clear temporary hit points to 0"
                                    >
                                        <span>Clear Temp (0)</span>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Hit Dice Short Rest Healing */}
                        {character?.hitDice && onRollHitDie && (
                            <div className="mobile-hit-dice-section">
                                <div className="mobile-hd-title">Hit Dice (Short Rest Healing)</div>
                                <div className="mobile-hd-list">
                                    {character.hitDice.map((hd) => {
                                        const currentUsed = usedHitDice?.[hd.die] || 0;
                                        const remaining = Math.max(0, (hd.total || 1) - currentUsed);
                                        const sides = Number(hd.die.replace(/^d/i, "")) || 8;
                                        return (
                                            <div key={hd.die} className="mobile-hd-row">
                                                <span>{hd.die.toUpperCase()}: {remaining}/{hd.total || 1} available</span>
                                                <button
                                                    type="button"
                                                    disabled={remaining === 0}
                                                    onClick={() => onRollHitDie(hd.die, sides)}
                                                    className="mobile-hd-roll-btn"
                                                >
                                                    Roll {hd.die} + CON
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Custom Dice Roller Modal */}
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

export default MobileActionDock;
