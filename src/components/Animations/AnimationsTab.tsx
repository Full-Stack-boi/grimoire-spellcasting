import "./AnimationsTab.css";

import OBR from "@owlbear-rodeo/sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { ALL_MANUAL_OVERRIDES } from "../../assets/manual-formulas";
import { getSpellMetadata, SPELL_INFO_MAP } from "../../assets/spellInfo";
import { APP_KEY, SELECTED_WEAPON_VARIANT_KEY } from "../../config";
import { getEffect, getEffectURL, getVariantName, effectNames } from "../../effects/effects";
import { spells } from "../../effects/spells";
import { getSpellAnimationSlots } from "./animationSlots";
import {
    getPersonalAnimationAssignments,
    getEffectAssetBaseUrl,
    getOneShotAnimationAssignments,
    getRoomAnimationAssignments,
    GLOBAL_STORAGE_KEYS,
    saveOneShotAnimationChoice,
    savePersonalAnimationAssignments,
    saveRoomAnimationAssignments,
    spellAnimationActionKey,
    weaponAnimationActionKey,
    type AnimationAssignments,
    type AnimationChoice,
} from "../Settings/settings";
import { toolMetadataSelectedSpell } from "../../effectsTool";
import { useOBR } from "../../platform/obr/react/providers";
import type { EffectType } from "../../types/effects";

type ActionKind = "spell" | "melee" | "ranged";
type SaveMode = "personal" | "room" | "next" | "current";
const EMPTY_ANIMATION_MAP: Record<string, string> = {};

interface SpellOption {
    id: string;
    name: string;
}

interface VariantOption {
    value: string;
    label: string;
}

const SPELL_OPTIONS: SpellOption[] = (() => {
    const byId = new Map<string, string>();
    for (const [id, meta] of Object.entries(SPELL_INFO_MAP)) {
        byId.set(id, meta.name);
    }
    for (const id of Object.keys(ALL_MANUAL_OVERRIDES)) {
        const meta = getSpellMetadata(id);
        if (meta) byId.set(id, meta.name);
    }
    for (const [id, spell] of Object.entries(spells)) {
        if (spell.name) byId.set(id, spell.name);
    }
    return Array.from(byId, ([id, name]) => ({ id, name }))
        .sort((a, b) => a.name.localeCompare(b.name));
})();

function getWeaponOptions(kind: "melee" | "ranged"): VariantOption[] {
    const spell = spells[`${kind}_weapon_attack`];
    const parameter = spell?.parameters?.find((value) => value.id === "weapon_variant");
    if (!Array.isArray(parameter?.content)) return [];
    return parameter.content.map((option) => ({
        value: option.value,
        label: option.label,
    }));
}

function getWeaponEffectId(kind: "melee" | "ranged", variant: string): string {
    return kind === "melee"
        ? `generic.weapon_attacks.melee.single.${variant}`
        : `generic.weapon_attacks.ranged.${variant}`;
}

function formatError(error: unknown): string {
    return error instanceof Error ? error.message : "Could not save the animation choice.";
}

export default function AnimationsTab() {
    const obr = useOBR();
    const [kind, setKind] = useState<ActionKind>("spell");
    const [search, setSearch] = useState("");
    const [spellId, setSpellId] = useState("healing_word");
    const [weaponMode, setWeaponMode] = useState<"melee" | "ranged">("melee");
    const [weaponProfile, setWeaponProfile] = useState("dagger");
    const [personalAssignments, setPersonalAssignments] = useState<AnimationAssignments>({});
    const [roomAssignments, setRoomAssignments] = useState<AnimationAssignments>({});
    const [oneShotAssignments, setOneShotAssignments] = useState<AnimationAssignments>({});
    const [assetBaseUrl, setAssetBaseUrl] = useState("");
    const [selectedAnimationId, setSelectedAnimationId] = useState("");
    const [selectedSpellAnimations, setSelectedSpellAnimations] = useState<Record<string, string>>({});
    const [previewStageId, setPreviewStageId] = useState("");
    const [saveMode, setSaveMode] = useState<SaveMode>("personal");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [previewFailed, setPreviewFailed] = useState(false);
    const isGM = obr.player?.role === "GM";

    const reloadAssignments = useCallback(async () => {
        const [room, assetUrl] = await Promise.all([
            getRoomAnimationAssignments(),
            getEffectAssetBaseUrl(),
        ]);
        setRoomAssignments(room);
        setPersonalAssignments(getPersonalAnimationAssignments());
        setOneShotAssignments(getOneShotAnimationAssignments());
        setAssetBaseUrl(assetUrl);
    }, []);

    useEffect(() => {
        if (!obr.ready || !obr.sceneReady) return;
        reloadAssignments().catch((loadError: unknown) => {
            console.error("Failed to load animation preferences:", loadError);
            setError(formatError(loadError));
        });
        return OBR.scene.onMetadataChange((metadata) => {
            const roomAnimationsKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.ANIMATION_MAPPINGS}`;
            const assetUrlKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.EFFECT_ASSET_BASE_URL}`;
            if (!(roomAnimationsKey in metadata) && !(assetUrlKey in metadata)) return;
            reloadAssignments().catch((loadError: unknown) => {
                console.error("Failed to refresh animation preferences:", loadError);
                setError(formatError(loadError));
            });
        });
    }, [obr.ready, obr.sceneReady, reloadAssignments]);

    const actionKey = kind === "spell"
        ? spellAnimationActionKey(spellId)
        : weaponAnimationActionKey(weaponMode, weaponProfile);
    const currentSpellId = obr.player?.metadata?.[toolMetadataSelectedSpell];
    const currentWeaponVariant = obr.player?.metadata?.[SELECTED_WEAPON_VARIANT_KEY];
    const currentActionKey = typeof currentSpellId !== "string"
        ? undefined
        : currentSpellId === "melee_weapon_attack" || currentSpellId === "ranged_weapon_attack"
            ? weaponAnimationActionKey(
                currentSpellId === "melee_weapon_attack" ? "melee" : "ranged",
                typeof currentWeaponVariant === "string" ? currentWeaponVariant : "sword",
            )
            : spellAnimationActionKey(currentSpellId);
    const spellAnimationSlots = useMemo(
        () => kind === "spell" ? getSpellAnimationSlots(spellId) : [],
        [kind, spellId],
    );

    const weaponOptions = useMemo(
        () => kind === "spell" ? [] : getWeaponOptions(weaponMode),
        [kind, weaponMode],
    );
    const baseWeaponVariant = weaponOptions.find((option) => option.value === weaponProfile)?.value;
    const compatibleEffectsBySource = useMemo(() => {
        const effectsByType = new Map<EffectType, VariantOption[]>();
        for (const slot of spellAnimationSlots) {
            if (effectsByType.has(slot.type)) continue;
            effectsByType.set(
                slot.type,
                effectNames
                    .filter((name) => getEffect(name)?.type === slot.type)
                    .map((id) => ({ value: id, label: id.replace(/\./g, " / ") }))
                    .sort((a, b) => a.label.localeCompare(b.label)),
            );
        }
        return new Map(spellAnimationSlots.map((slot) => [
            slot.sourceId,
            effectsByType.get(slot.type) ?? [],
        ]));
    }, [spellAnimationSlots]);

    const activeOptions = useMemo(
        () => weaponOptions.map((option) => ({ id: option.value, label: option.label })),
        [weaponOptions],
    );

    const personalChoice = personalAssignments[actionKey];
    const roomChoice = roomAssignments[actionKey];
    const oneShotChoice = oneShotAssignments[actionKey];
    const fallbackSpellChoice = useMemo<AnimationChoice | undefined>(() => {
        if (spellAnimationSlots.length === 0) return undefined;
        if (spellAnimationSlots.length === 1) {
            return { kind: "effect", id: spellAnimationSlots[0].sourceId };
        }
        return {
            kind: "effect-map",
            effects: Object.fromEntries(spellAnimationSlots.map((slot) => [slot.sourceId, slot.sourceId])),
        };
    }, [spellAnimationSlots]);
    const fallbackWeaponVariant = kind === "spell" ? undefined : baseWeaponVariant;
    const displayedChoice = oneShotChoice ?? personalChoice ?? roomChoice ??
        (kind === "spell" && fallbackSpellChoice
            ? fallbackSpellChoice
            : kind !== "spell" && fallbackWeaponVariant
                ? { kind: "weapon-variant" as const, id: fallbackWeaponVariant }
                : undefined);

    const preferredSpellAnimations = displayedChoice?.kind === "effect-map"
        ? displayedChoice.effects
        : EMPTY_ANIMATION_MAP;
    const preferredSpellEffectId = displayedChoice?.kind === "effect" ? displayedChoice.id : "";
    const preferredWeaponVariant = displayedChoice?.kind === "weapon-variant" ? displayedChoice.id : "";
    useEffect(() => {
        const initialSpellAnimations: Record<string, string> = {};
        for (const slot of spellAnimationSlots) {
            const mappedEffect = preferredSpellAnimations[slot.sourceId] ?? preferredSpellEffectId;
            const options = compatibleEffectsBySource.get(slot.sourceId) ?? [];
            initialSpellAnimations[slot.sourceId] = mappedEffect && options.some((option) => option.value === mappedEffect)
                ? mappedEffect
                : options.some((option) => option.value === slot.sourceId)
                    ? slot.sourceId
                    : options[0]?.value ?? "";
        }
        setSelectedSpellAnimations(initialSpellAnimations);
        setPreviewStageId((current) => spellAnimationSlots.some((slot) => slot.sourceId === current)
            ? current
            : spellAnimationSlots[0]?.sourceId ?? "");
        const next = preferredWeaponVariant
            ? preferredWeaponVariant
            : activeOptions[0]?.id ?? "";
        setSelectedAnimationId(next);
        setPreviewFailed(false);
    }, [
        actionKey,
        activeOptions,
        compatibleEffectsBySource,
        preferredSpellAnimations,
        preferredSpellEffectId,
        preferredWeaponVariant,
        spellAnimationSlots,
    ]);

    const filteredSpells = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        return SPELL_OPTIONS.filter((spell) =>
            `${spell.name} ${spell.id}`.toLowerCase().includes(normalizedSearch),
        );
    }, [search]);

    const selectedEffectId = kind === "spell"
        ? selectedSpellAnimations[previewStageId] ?? ""
        : getWeaponEffectId(weaponMode, selectedAnimationId);
    const selectedEffect = getEffect(selectedEffectId);
    const previewVariant = selectedEffect
        ? getVariantName(selectedEffectId, selectedEffect.dpi)
        : undefined;
    const previewUrl = previewVariant
        ? getEffectURL(selectedEffectId, previewVariant, undefined, assetBaseUrl)
        : undefined;
    const previewImageUrl = selectedEffect?.thumbnail
        ? `${assetBaseUrl.replace(/\/+$/, "")}/${selectedEffect.thumbnail}`
        : undefined;

    const selectedChoice = useMemo<AnimationChoice | undefined>(() => {
        if (kind === "spell") {
            if (spellAnimationSlots.length === 0) return undefined;
            const effects = Object.fromEntries(
                spellAnimationSlots.map((slot) => [slot.sourceId, selectedSpellAnimations[slot.sourceId] ?? ""]),
            );
            if (Object.values(effects).some((effectId) => !effectId)) return undefined;
            return spellAnimationSlots.length === 1
                ? { kind: "effect", id: effects[spellAnimationSlots[0].sourceId] }
                : { kind: "effect-map", effects };
        }
        if (!selectedAnimationId) return undefined;
        return { kind: "weapon-variant", id: selectedAnimationId };
    }, [kind, selectedAnimationId, selectedSpellAnimations, spellAnimationSlots]);

    const applySelection = useCallback(async () => {
        setError("");
        setStatus("");
        if (!selectedChoice) {
            setError("Choose an animation first.");
            return;
        }

        try {
            if (saveMode === "personal" || saveMode === "room") {
                if (saveMode === "room" && !isGM) {
                    setError("Only the GM can change room-wide animation defaults.");
                    return;
                }
                if (saveMode === "room") {
                    const next = { ...roomAssignments, [actionKey]: selectedChoice };
                    await saveRoomAnimationAssignments(next);
                    setRoomAssignments(next);
                    OBR.notification.show("Room animation default saved.", "SUCCESS");
                    setStatus("Saved as the room default.");
                } else {
                    const next = { ...personalAssignments, [actionKey]: selectedChoice };
                    savePersonalAnimationAssignments(next);
                    setPersonalAssignments(next);
                    OBR.notification.show("Personal animation default saved.", "SUCCESS");
                    setStatus("Saved as your personal default.");
                }
            } else {
                const targetKey = saveMode === "current" ? currentActionKey : actionKey;
                if (!targetKey) {
                    setError("Select a spell or weapon in the Action Bar first.");
                    return;
                }
                if (saveMode === "current" && targetKey !== actionKey) {
                    setError("Choose the same spell or weapon profile that is currently selected in the Action Bar.");
                    return;
                }
                saveOneShotAnimationChoice(targetKey, selectedChoice);
                setOneShotAssignments((previous) => ({ ...previous, [targetKey]: selectedChoice }));
                setStatus(saveMode === "current"
                    ? "This animation will be used for the currently selected action."
                    : "This animation will be used on the next matching cast or attack only.");
                OBR.notification.show("One-use animation choice saved.", "SUCCESS");
            }
        } catch (saveError) {
            console.error("Failed to save animation choice:", saveError);
            const message = formatError(saveError);
            setError(message);
            OBR.notification.show(message, "ERROR");
        }
    }, [
        actionKey,
        currentActionKey,
        isGM,
        personalAssignments,
        roomAssignments,
        saveMode,
        selectedChoice,
    ]);

    const clearPersonalChoice = useCallback(() => {
        const next = { ...personalAssignments };
        delete next[actionKey];
        savePersonalAnimationAssignments(next);
        setPersonalAssignments(next);
        setStatus("Personal override cleared; the room default will be used.");
        setError("");
    }, [actionKey, personalAssignments]);

    const clearRoomChoice = useCallback(async () => {
        if (!isGM) return;
        const next = { ...roomAssignments };
        delete next[actionKey];
        setError("");
        try {
            await saveRoomAnimationAssignments(next);
            setRoomAssignments(next);
            setStatus("Room default cleared; the built-in animation will be used.");
        } catch (saveError) {
            console.error("Failed to clear room animation default:", saveError);
            const message = formatError(saveError);
            setError(message);
            OBR.notification.show(message, "ERROR");
        }
    }, [actionKey, isGM, roomAssignments]);

    const visibleActionLabel = kind === "spell"
        ? SPELL_OPTIONS.find((spell) => spell.id === spellId)?.name ?? spellId
        : `${weaponMode === "melee" ? "Melee" : "Ranged"} · ${weaponOptions.find((option) => option.value === weaponProfile)?.label ?? weaponProfile}`;
    const librarySearchUrl = `https://library.jb2a.com/#${encodeURIComponent(visibleActionLabel)}`;
    const currentActionMatches = currentActionKey === actionKey;

    return (
        <div className="animations-tab">
            <header className="animations-header">
                <FaWandMagicSparkles aria-hidden="true" />
                <h1>Animations</h1>
            </header>
            <p className="animations-intro">
                Choose JB2A visuals for spells and weapon attacks. DM defaults apply to the room;
                personal choices affect only your casts.
            </p>

            <div className="animations-kind-tabs" role="tablist" aria-label="Animation category">
                <button type="button" role="tab" aria-selected={kind === "spell"} onClick={() => setKind("spell")}>Spells</button>
                <button type="button" role="tab" aria-selected={kind === "melee"} onClick={() => { setKind("melee"); setWeaponMode("melee"); }}>Melee</button>
                <button type="button" role="tab" aria-selected={kind === "ranged"} onClick={() => { setKind("ranged"); setWeaponMode("ranged"); }}>Ranged</button>
            </div>

            {kind === "spell" ? (
                <section className="animations-field">
                    <label htmlFor="animation-spell-search">Find a spell</label>
                    <input
                        id="animation-spell-search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by name..."
                    />
                    {filteredSpells.length > 0 ? (
                        <select
                            aria-label="Spell"
                            size={Math.min(Math.max(filteredSpells.length, 2), 7)}
                            value={spellId}
                            onChange={(event) => setSpellId(event.target.value)}
                        >
                            {filteredSpells.map((spell) => (
                                <option key={spell.id} value={spell.id}>{spell.name}</option>
                            ))}
                        </select>
                    ) : (
                        <p className="animations-muted" role="status">No spells match that search.</p>
                    )}
                    <a className="animations-library-link" href={librarySearchUrl} target="_blank" rel="noreferrer">
                        Search this spell in the JB2A library
                    </a>
                    {spellAnimationSlots.length === 0 && (
                        <p className="animations-muted">No built-in animation is mapped to this spell yet.</p>
                    )}
                </section>
            ) : (
                <section className="animations-field">
                    <label htmlFor="animation-weapon-profile">Weapon profile</label>
                    <select
                        id="animation-weapon-profile"
                        value={weaponProfile}
                        onChange={(event) => setWeaponProfile(event.target.value)}
                    >
                        {weaponOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </section>
            )}

            {kind === "spell" ? (
                spellAnimationSlots.map((slot) => {
                    const options = compatibleEffectsBySource.get(slot.sourceId) ?? [];
                    return (
                        <section className="animations-field" key={slot.sourceId}>
                            <label htmlFor={`animation-choice-${slot.sourceId}`}>
                                Animation · {slot.label}
                            </label>
                            <select
                                id={`animation-choice-${slot.sourceId}`}
                                value={selectedSpellAnimations[slot.sourceId] ?? ""}
                                onChange={(event) => {
                                    const nextValue = event.target.value;
                                    setSelectedSpellAnimations((previous) => ({
                                        ...previous,
                                        [slot.sourceId]: nextValue,
                                    }));
                                    setPreviewFailed(false);
                                }}
                                disabled={options.length === 0}
                            >
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </section>
                    );
                })
            ) : (
                <section className="animations-field">
                    <label htmlFor="animation-choice">Animation</label>
                    <select
                        id="animation-choice"
                        value={selectedAnimationId}
                        onChange={(event) => {
                            const nextValue = event.target.value;
                            setSelectedAnimationId(nextValue);
                            setPreviewFailed(false);
                        }}
                        disabled={activeOptions.length === 0}
                    >
                        {activeOptions.map((option) => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                    </select>
                </section>
            )}

            {kind === "spell" && spellAnimationSlots.length > 1 && (
                <div className="animations-stage-tabs" role="tablist" aria-label="Preview spell stage">
                    {spellAnimationSlots.map((slot) => (
                        <button
                            type="button"
                            role="tab"
                            aria-selected={previewStageId === slot.sourceId}
                            key={slot.sourceId}
                            onClick={() => {
                                setPreviewStageId(slot.sourceId);
                                setPreviewFailed(false);
                            }}
                        >
                            Preview {slot.label.toLowerCase()}
                        </button>
                    ))}
                </div>
            )}

            <section className="animations-preview" aria-label="Animation preview">
                {assetBaseUrl && previewUrl && !previewFailed ? (
                    <video
                        key={previewUrl}
                        src={previewUrl}
                        poster={previewImageUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onError={() => setPreviewFailed(true)}
                    />
                ) : (
                    <div className="animations-preview-empty">
                        {!assetBaseUrl
                            ? "Loading JB2A asset settings..."
                            : previewFailed
                                ? "Preview unavailable for this asset."
                                : "Select an animation to preview it."}
                    </div>
                )}
                <span>
                    {visibleActionLabel}
                    {kind === "spell" && spellAnimationSlots.length > 1
                        ? ` · ${spellAnimationSlots.find((slot) => slot.sourceId === previewStageId)?.label ?? ""}`
                        : ""}
                </span>
            </section>

            <section className="animations-field">
                <label htmlFor="animation-save-mode">Apply this choice</label>
                <select
                    id="animation-save-mode"
                    value={saveMode}
                    onChange={(event) => setSaveMode(event.target.value as SaveMode)}
                >
                    {isGM && <option value="room">Room default · everyone</option>}
                    <option value="personal">My default · future uses</option>
                    <option value="next">Next matching use only</option>
                    <option value="current">Currently selected Action Bar item</option>
                </select>
                {saveMode === "current" && (
                    <p className="animations-muted">
                        {currentActionKey
                            ? `Action Bar selection: ${currentActionMatches ? visibleActionLabel : "choose the matching profile above"}`
                            : "Select a spell or weapon in the Action Bar first."}
                    </p>
                )}
            </section>

            <div className="animations-actions">
                <button type="button" onClick={applySelection} disabled={!selectedChoice}>
                    Apply choice
                </button>
                {personalChoice && (
                    <button type="button" className="animations-secondary" onClick={clearPersonalChoice}>
                        Follow room default
                    </button>
                )}
                {isGM && saveMode === "room" && roomChoice && (
                    <button type="button" className="animations-secondary" onClick={clearRoomChoice}>
                        Reset room default
                    </button>
                )}
            </div>

            <p className="animations-resolution">
                Active: {oneShotChoice ? "one-use override" : personalChoice ? "your personal default" : roomChoice ? "DM room default" : "built-in fallback"}
            </p>
            {status && <p className="animations-status" role="status">{status}</p>}
            {error && <p className="animations-error" role="alert">{error}</p>}
        </div>
    );
}
