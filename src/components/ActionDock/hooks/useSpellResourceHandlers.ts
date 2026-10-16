import type { Dispatch, SetStateAction } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { SORCERER_CLASS_FORMULAS } from "../../../assets/manual-formulas/index";
import { getCharacterFeatures } from "../../../features/characterFeatures/domain/characterFeatureCatalog";
import { canConvertSlotToSorceryPoints, convertSlotToSorceryPoints } from "../../../features/characterFeatures/domain/sorceryPointRules";
import { resetCombatState } from "../../../services/combatStateService";
import type { DDBFeatureAction, DDBParsedCharacter } from "../../../types/ddb";
import type { SpellSlotConfig, DetailDrawerItem } from "../domain/types";

interface UseSpellResourceHandlersOptions {
    character: DDBParsedCharacter | null;
    drawerItem: DetailDrawerItem | null;
    setDrawerItem?: Dispatch<SetStateAction<DetailDrawerItem>>;
    currentHp?: number;
    maxHp?: number;
    tempHp?: number;
    featureUses: Record<string, number>;
    setFeatureUses: Dispatch<SetStateAction<Record<string, number>>>;
    spellSlots: Record<number, SpellSlotConfig>;
    setSpellSlots: Dispatch<SetStateAction<Record<number, SpellSlotConfig>>>;
    pactSlots: SpellSlotConfig;
    setPactSlots: Dispatch<SetStateAction<SpellSlotConfig>>;
    createdSpellSlots: Record<number, number>;
    setCreatedSpellSlots: Dispatch<SetStateAction<Record<number, number>>>;
    setActionUsed: Dispatch<SetStateAction<boolean>>;
    setBonusActionUsed: Dispatch<SetStateAction<boolean>>;
    setConcentrationSpell: Dispatch<SetStateAction<{ id: string; name: string; hexTargetId?: string | null } | null>>;
    setDeathSaves: Dispatch<SetStateAction<{ successes: number; failures: number }>>;
    setHitDiceUsed: Dispatch<SetStateAction<Record<string, number>>>;
    setExhaustionLevel: Dispatch<SetStateAction<number>>;
    onResetHpToMax?: () => void;
}

export function useSpellResourceHandlers({
    character,
    drawerItem,
    setDrawerItem,
    currentHp,
    maxHp,
    tempHp,
    featureUses,
    setFeatureUses,
    spellSlots,
    setSpellSlots,
    pactSlots,
    setPactSlots,
    createdSpellSlots,
    setCreatedSpellSlots,
    setActionUsed,
    setBonusActionUsed,
    setConcentrationSpell,
    setDeathSaves,
    setHitDiceUsed,
    setExhaustionLevel,
    onResetHpToMax,
}: UseSpellResourceHandlersOptions) {
    const toggleSlotPip = (level: number) => {
        setSpellSlots(prev => {
            const current = prev[level];
            if (!current) return prev;
            const nextUsed = current.used >= current.max ? 0 : current.used + 1;
            return { ...prev, [level]: { ...current, used: nextUsed } };
        });
    };

    const findFontOfMagic = (targetFeatId?: string) => {
        let featId = targetFeatId;
        let featMax: number | undefined;
        let featUsed: number | undefined;
        if (targetFeatId && character) {
            const feature = getCharacterFeatures(character).find(item => item.id === targetFeatId);
            if (feature) {
                featId = feature.id;
                featMax = feature.limitedUse?.max;
                featUsed = feature.limitedUse?.used;
            }
        }
        if (!featId && drawerItem?.type === "feature" && drawerItem.name.toLowerCase().includes("font of magic")) {
            featId = drawerItem.id;
            featMax = drawerItem.limitedUse?.max;
            featUsed = drawerItem.limitedUse?.used;
        }
        if (!featId && character) {
            const feature = getCharacterFeatures(character).find(item => item.name.toLowerCase().includes("font of magic"));
            if (feature) {
                featId = feature.id;
                featMax = feature.limitedUse?.max;
                featUsed = feature.limitedUse?.used;
            }
        }
        return featId ? { featId, featMax, featUsed } : null;
    };

    const getSorcererLevel = () => character?.classes
        .filter(characterClass => characterClass.name.toLowerCase().includes("sorcerer"))
        .reduce((total, characterClass) => total + characterClass.level, 0) ?? 0;

    const handleConvertSlotToSorceryPoints = (slotLevel: number, usePactSlot = false, targetFeatId?: string) => {
        const resource = findFontOfMagic(targetFeatId);
        if (!resource) return;
        const { featId, featMax, featUsed } = resource;
        const sorcererLevel = getSorcererLevel();
        const usedPoints = featureUses[featId] ?? featUsed ?? 0;
        const maxPoints = featMax || sorcererLevel;
        if (!canConvertSlotToSorceryPoints(maxPoints, usedPoints, slotLevel)) return;
        const slot = spellSlots[slotLevel];
        const hasSlot = usePactSlot
            ? pactSlots.max > pactSlots.used && pactSlots.max > 0 && character?.pactMagic?.level === slotLevel
            : Boolean(slot && slot.max > slot.used);
        if (!hasSlot) return;

        if (usePactSlot) setPactSlots(prev => ({ ...prev, used: prev.used + 1 }));
        else setSpellSlots(prev => ({ ...prev, [slotLevel]: { ...prev[slotLevel], used: prev[slotLevel].used + 1 } }));
        const conversion = SORCERER_CLASS_FORMULAS.fontOfMagic.operations.find(operation => operation.type === "convert_spell_slot_to_resource");
        if (!conversion || conversion.type !== "convert_spell_slot_to_resource") return;
        setFeatureUses(prev => ({ ...prev, [featId]: convertSlotToSorceryPoints(usedPoints, slotLevel * conversion.resourcePerSlotLevel, maxPoints) }));
        OBR.notification.show(`Converted a level ${slotLevel} spell slot into ${slotLevel} Sorcery Point${slotLevel === 1 ? "" : "s"} (No action used).`, "SUCCESS");
    };

    const handleCreateSorcererSpellSlot = (slotLevel: number, pointCost: number, minimumClassLevel: number, targetFeatId?: string) => {
        const resource = findFontOfMagic(targetFeatId);
        if (!resource) return;
        const { featId, featMax, featUsed } = resource;
        const sorcererLevel = getSorcererLevel();
        const usedPoints = featureUses[featId] ?? featUsed ?? 0;
        const maxPoints = featMax || sorcererLevel;
        if (sorcererLevel < minimumClassLevel || maxPoints - usedPoints < pointCost) return;
        setFeatureUses(prev => ({ ...prev, [featId]: usedPoints + pointCost }));
        setSpellSlots(prev => ({ ...prev, [slotLevel]: { max: (prev[slotLevel]?.max ?? 0) + 1, used: prev[slotLevel]?.used ?? 0 } }));
        setCreatedSpellSlots(prev => ({ ...prev, [slotLevel]: (prev[slotLevel] ?? 0) + 1 }));
        setBonusActionUsed(true);
        OBR.notification.show(`Created a level ${slotLevel} spell slot for ${pointCost} Sorcery Points. Bonus Action used.`, "SUCCESS");
    };

    const togglePactPip = () => {
        setPactSlots(prev => {
            if (prev.max <= 0) return prev;
            const nextUsed = prev.used >= prev.max ? 0 : prev.used + 1;
            return { ...prev, used: nextUsed };
        });
    };

    const toggleClassResource = (feat: DDBFeatureAction) => {
        const max = feat.limitedUse?.max ?? 0;
        if (max <= 0) return;
        const currentUsed = featureUses[feat.id] ?? (feat.limitedUse?.used ?? 0);
        const nextUsed = currentUsed >= max ? 0 : currentUsed + 1;
        setFeatureUses(prev => ({ ...prev, [feat.id]: nextUsed }));
    };

    const handleShortRest = () => {
        setActionUsed(false);
        setBonusActionUsed(false);
        setConcentrationSpell(null);
        setPactSlots(prev => ({ ...prev, used: 0 }));
        setFeatureUses(prev => {
            const next = { ...prev };
            if (character) {
                const features = getCharacterFeatures(character);
                for (const feat of features) {
                    const rt = (feat.limitedUse?.resetType || "").toLowerCase();
                    const name = feat.name.toLowerCase();
                    if (name.includes("second wind")) {
                        // 2024 Fighter: Regain 1 expended use on a Short Rest
                        const currentUsed = next[feat.id] ?? (feat.limitedUse?.used ?? 0);
                        if (currentUsed > 0) {
                            const newUsed = currentUsed - 1;
                            if (newUsed === 0) {
                                delete next[feat.id];
                            } else {
                                next[feat.id] = newUsed;
                            }
                        }
                    } else {
                        const isShortRest = rt.includes("short") ||
                            name.includes("action surge") ||
                            name.includes("focus point") ||
                            name.includes("ki") ||
                            name.includes("channel divinity") ||
                            name.includes("wild shape") ||
                            name.includes("font of inspiration");
                        if (isShortRest) {
                            delete next[feat.id];
                        }
                    }
                }
            }
            return next;
        });

        // Auto-prompt Hit Dice drawer on Short Rest so player can choose Hit Dice to roll
        if (setDrawerItem) {
            const cur = currentHp ?? (character?.hp?.current ?? 10);
            const mx = maxHp ?? (character?.hp?.max ?? 10);
            const tmp = tempHp ?? (character?.hp?.temp ?? 0);
            setDrawerItem({ type: "hp", current: cur, max: mx, temp: tmp });
        }

        OBR.notification.show("Short Rest completed: Actions, Pact Slots, and Short Rest abilities restored! Choose Hit Dice to heal.", "SUCCESS");
    };

    const handleLongRest = () => {
        setActionUsed(false);
        setBonusActionUsed(false);
        setSpellSlots(prev => {
            const reset: Record<number, SpellSlotConfig> = {};
            for (const [lvl, config] of Object.entries(prev)) {
                const level = Number(lvl);
                reset[level] = { max: Math.max(0, config.max - (createdSpellSlots[level] ?? 0)), used: 0 };
            }
            return reset;
        });
        setCreatedSpellSlots({});
        setPactSlots(prev => ({ ...prev, used: 0 }));
        setFeatureUses({});
        setConcentrationSpell(null);
        setDeathSaves({ successes: 0, failures: 0 });
        setHitDiceUsed({});
        setExhaustionLevel(prev => Math.max(0, prev - 1));
        if (onResetHpToMax) onResetHpToMax();
        if (character?.id) resetCombatState(character.id).catch(console.error);
        OBR.notification.show("Long Rest completed: HP, actions, slots, hit dice, and 1 exhaustion level restored!", "INFO");
    };

    return {
        toggleSlotPip,
        handleConvertSlotToSorceryPoints,
        handleCreateSorcererSpellSlot,
        togglePactPip,
        toggleClassResource,
        handleShortRest,
        handleLongRest,
    };
}
