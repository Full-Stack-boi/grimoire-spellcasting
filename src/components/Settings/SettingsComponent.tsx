import "./SettingsComponent.css";

import {
    FaChevronDown,
    FaCrown,
    FaGear,
    FaSliders,
} from "react-icons/fa6";
import OBR, { GridScale } from "@owlbear-rodeo/sdk";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
    getGlobalSettingsValue,
    getSettingsValue,
    GLOBAL_STORAGE_KEYS,
    GRID_UNIT_FACTORS,
    LOCAL_STORAGE_KEYS,
    normalizeEffectAssetBaseUrl,
    setGlobalSettingsValue,
    setSettingsValue,
    SETTINGS_CHANNEL,
    type AnimationOverride,
} from "./settings";
import { useOBR } from "../../platform/obr/react/providers";

function parseGridScale(raw: string): GridScale {
    const regexMatch = raw.match(/(\d*)(\.\d*)?([a-zA-Z]*)/);
    if (regexMatch) {
        const multiplier = parseFloat(regexMatch[1]);
        const digits = parseFloat(regexMatch[2]);
        const unit = regexMatch[3] || "";
        if (!isNaN(multiplier) && !isNaN(digits)) {
            return {
                raw,
                parsed: {
                    multiplier: multiplier + digits,
                    unit,
                    digits: regexMatch[2].length - 1,
                },
            };
        }
        if (!isNaN(multiplier) && isNaN(digits)) {
            return { raw, parsed: { multiplier, unit, digits: 0 } };
        }
    }
    return { raw, parsed: { multiplier: 1, unit: "", digits: 0 } };
}

function tryComputeGridScaling(gridScale: GridScale | null) {
    if (gridScale == null) {
        return null;
    }
    const gridScaleFactor = gridScale.parsed.multiplier;
    const unitFactor = GRID_UNIT_FACTORS[gridScale.parsed.unit] ?? 1;
    return 5 / (gridScaleFactor * unitFactor);
}

interface SettingsRowInfoProps {
    label: string;
    help: string;
    description: string;
}

function SettingsRowInfo({ label, help, description }: SettingsRowInfoProps) {
    const helpId = useId();

    return (
        <div className="settings-row-info">
            <div className="settings-row-heading">
                <span className="settings-row-label" tabIndex={0} aria-describedby={helpId}>
                    {label}
                </span>
                <span id={helpId} role="tooltip" className="settings-help-content">
                    {help}
                </span>
            </div>
            <span className="settings-row-desc">{description}</span>
        </div>
    );
}

export default function Settings() {
    const obr = useOBR();

    const [mostRecentSize, _setMostRecentSize] = useState<number | null>(null);
    const [gridScalingFactor, _setGridScalingFactor] = useState<number | null | undefined>(undefined);
    const [keepTargets, setKeepTargets] = useState<boolean | null>(null);
    const [playersCastSpells, setPlayersCastSpells] = useState<boolean | null>(null);
    const [summonedEntities, setSummonedEntities] = useState<string | null>(null);
    const [darknessOpacityMode, setDarknessOpacityMode] = useState<string | null>(null);
    const [damageApplicationMode, setDamageApplicationMode] = useState<string | null>(null);
    const [monsterHitResolutionMode, setMonsterHitResolutionMode] = useState<string | null>(null);
    const [hideTargetAc, setHideTargetAc] = useState<boolean | null>(null);
    const [showTurnTrackerHpToPlayers, setShowTurnTrackerHpToPlayers] = useState<boolean | null>(null);
    const [showTurnTrackerHpBarToPlayers, setShowTurnTrackerHpBarToPlayers] = useState<boolean | null>(null);
    const [showTurnTrackerAcToPlayers, setShowTurnTrackerAcToPlayers] = useState<boolean | null>(null);
    const [hideTokenVitalsInDarkness, setHideTokenVitalsInDarkness] = useState<boolean | null>(null);
    const [hideTrackerMonsterHpBarInDarkness, setHideTrackerMonsterHpBarInDarkness] = useState<boolean | null>(null);
    const [gridScale, setGridScale] = useState<GridScale | null>(null);
    const [animationRate, _setAnimationRate] = useState<number | null>(null);
    const [animationOverride, setAnimationOverride] = useState<AnimationOverride>("follow");
    const [roomAnimationsEnabled, setRoomAnimationsEnabled] = useState<boolean | null>(null);
    const [effectAssetBaseUrl, setEffectAssetBaseUrl] = useState<string | null>(null);
    const [effectAssetBaseUrlError, setEffectAssetBaseUrlError] = useState<string | null>(null);
    const [smartActionOnTarget, setSmartActionOnTarget] = useState<boolean | null>(null);
    const mainDiv = useRef<HTMLDivElement>(null);

    const setMostRecentSize = useCallback((size: string) => {
        const recentSize = parseInt(size);
        if (isNaN(recentSize)) {
            _setMostRecentSize(null);
            return;
        }
        _setMostRecentSize(recentSize);
    }, []);

    const setGridScalingFactor = useCallback((factor: string) => {
        const scaleFactor = parseFloat(factor);
        if (isNaN(scaleFactor)) {
            _setGridScalingFactor(null);
            return;
        }
        _setGridScalingFactor(scaleFactor);
    }, []);

    const setAnimationRate = useCallback((rate: string) => {
        const intRate = parseInt(rate);
        if (isNaN(intRate)) {
            _setAnimationRate(null);
            return;
        }
        _setAnimationRate(intRate);
    }, []);

    const reloadSettings = useCallback(() => {
        _setMostRecentSize(getSettingsValue(LOCAL_STORAGE_KEYS.MOST_RECENT_SPELLS_LIST_SIZE));
        _setGridScalingFactor(getSettingsValue(LOCAL_STORAGE_KEYS.GRID_SCALING_FACTOR));
        _setAnimationRate(getSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_UPDATE_RATE));
        setAnimationOverride(
            getSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_OVERRIDE) ?? "follow"
        );
        setKeepTargets(getSettingsValue(LOCAL_STORAGE_KEYS.KEEP_SELECTED_TARGETS));
        setSmartActionOnTarget(getSettingsValue(LOCAL_STORAGE_KEYS.SMART_ACTION_ON_TARGET) ?? true);
    }, []);

    useEffect(() => {
        reloadSettings();
    }, [reloadSettings]);

    useEffect(() => {
        if (!obr.ready || !obr.sceneReady) {
            return;
        }
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.PLAYERS_CAN_CAST_SPELLS).then((value) =>
            setPlayersCastSpells(value as boolean)
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.ANIMATIONS_ENABLED).then((value) =>
            setRoomAnimationsEnabled(value !== false)
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.EFFECT_ASSET_BASE_URL).then((value) =>
            setEffectAssetBaseUrl(typeof value === "string" ? value : "")
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.SUMMONED_ENTITIES_RULE).then((value) =>
            setSummonedEntities(value as string)
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.DARKNESS_OPACITY_MODE).then((value) =>
            setDarknessOpacityMode((value as string) ?? "dynamic")
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.DAMAGE_APPLICATION_MODE).then((value) =>
            setDamageApplicationMode((value as string) ?? "gm_approval")
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.MONSTER_HIT_RESOLUTION_MODE).then((value) =>
            setMonsterHitResolutionMode(value === "auto_ac" ? "auto_ac" : "gm_approval")
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.HIDE_TARGET_AC_FROM_PLAYERS).then((value) =>
            setHideTargetAc((value as boolean) ?? true)
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_TO_PLAYERS).then((value) =>
            setShowTurnTrackerHpToPlayers((value as boolean) ?? false)
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_BAR_TO_PLAYERS).then((value) =>
            setShowTurnTrackerHpBarToPlayers((value as boolean) ?? false)
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_AC_TO_PLAYERS).then((value) =>
            setShowTurnTrackerAcToPlayers((value as boolean) ?? false)
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.HIDE_TOKEN_VITALS_IN_DARKNESS).then((value) =>
            setHideTokenVitalsInDarkness((value as boolean) ?? true)
        );
        getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.HIDE_TRACKER_MONSTER_HP_BAR_IN_DARKNESS).then((value) =>
            setHideTrackerMonsterHpBarInDarkness((value as boolean) ?? true)
        );
    }, [obr.ready, obr.sceneReady]);

    useEffect(() => {
        if (!obr.ready || !obr.sceneReady) {
            return;
        }
        const handler = OBR.scene.grid.onChange((grid) => {
            const parsedGridScale = parseGridScale(grid.scale);
            setGridScale(parsedGridScale);
        });
        OBR.scene.grid.getScale().then((scale) => setGridScale(scale));

        return handler;
    }, [obr.ready, obr.sceneReady]);

    useEffect(() => {
        if (!obr.ready || !obr.sceneReady) {
            return;
        }

        return OBR.broadcast.onMessage(SETTINGS_CHANNEL, () => {
            reloadSettings();
        });
    }, [obr.ready, obr.sceneReady, reloadSettings]);

    useEffect(() => {
        if (mostRecentSize == null) {
            return;
        }
        if (isNaN(mostRecentSize) || mostRecentSize <= 0) {
            setSettingsValue(LOCAL_STORAGE_KEYS.MOST_RECENT_SPELLS_LIST_SIZE, null);
            return;
        }
        setSettingsValue(LOCAL_STORAGE_KEYS.MOST_RECENT_SPELLS_LIST_SIZE, mostRecentSize);
    }, [mostRecentSize]);

    useEffect(() => {
        if (gridScalingFactor === undefined) return;
        if (gridScalingFactor == null || isNaN(gridScalingFactor) || gridScalingFactor <= 0) {
            setSettingsValue(LOCAL_STORAGE_KEYS.GRID_SCALING_FACTOR, null);
            return;
        }
        setSettingsValue(LOCAL_STORAGE_KEYS.GRID_SCALING_FACTOR, gridScalingFactor);
    }, [gridScalingFactor]);

    useEffect(() => {
        if (keepTargets == null) {
            return;
        }
        setSettingsValue(LOCAL_STORAGE_KEYS.KEEP_SELECTED_TARGETS, keepTargets);
    }, [keepTargets]);

    useEffect(() => {
        if (animationRate == null) {
            return;
        }
        if (isNaN(animationRate) || animationRate <= 0) {
            setSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_UPDATE_RATE, null);
            return;
        }
        setSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_UPDATE_RATE, animationRate);
    }, [animationRate]);

    useEffect(() => {
        if (playersCastSpells == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.PLAYERS_CAN_CAST_SPELLS, playersCastSpells);
    }, [playersCastSpells]);

    useEffect(() => {
        if (roomAnimationsEnabled == null) {
            return;
        }
        setGlobalSettingsValue(
            GLOBAL_STORAGE_KEYS.ANIMATIONS_ENABLED,
            roomAnimationsEnabled
        ).catch((error) => {
            console.error("Failed to save the room animation setting:", error);
            OBR.notification.show("Could not save the room animation setting.", "ERROR");
        });
    }, [roomAnimationsEnabled]);

    useEffect(() => {
        if (summonedEntities == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.SUMMONED_ENTITIES_RULE, summonedEntities);
    }, [summonedEntities]);

    useEffect(() => {
        if (darknessOpacityMode == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.DARKNESS_OPACITY_MODE, darknessOpacityMode);
    }, [darknessOpacityMode]);

    useEffect(() => {
        if (damageApplicationMode == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.DAMAGE_APPLICATION_MODE, damageApplicationMode);
    }, [damageApplicationMode]);

    useEffect(() => {
        if (monsterHitResolutionMode == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.MONSTER_HIT_RESOLUTION_MODE, monsterHitResolutionMode);
    }, [monsterHitResolutionMode]);

    useEffect(() => {
        if (hideTargetAc == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.HIDE_TARGET_AC_FROM_PLAYERS, hideTargetAc);
    }, [hideTargetAc]);

    useEffect(() => {
        if (showTurnTrackerHpToPlayers == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_TO_PLAYERS, showTurnTrackerHpToPlayers);
    }, [showTurnTrackerHpToPlayers]);

    useEffect(() => {
        if (showTurnTrackerHpBarToPlayers == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_BAR_TO_PLAYERS, showTurnTrackerHpBarToPlayers);
    }, [showTurnTrackerHpBarToPlayers]);

    useEffect(() => {
        if (showTurnTrackerAcToPlayers == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_AC_TO_PLAYERS, showTurnTrackerAcToPlayers);
    }, [showTurnTrackerAcToPlayers]);

    useEffect(() => {
        if (hideTokenVitalsInDarkness == null) {
            return;
        }
        setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.HIDE_TOKEN_VITALS_IN_DARKNESS, hideTokenVitalsInDarkness);
    }, [hideTokenVitalsInDarkness]);

    useEffect(() => {
        if (hideTrackerMonsterHpBarInDarkness == null) {
            return;
        }
        setGlobalSettingsValue(
            GLOBAL_STORAGE_KEYS.HIDE_TRACKER_MONSTER_HP_BAR_IN_DARKNESS,
            hideTrackerMonsterHpBarInDarkness
        );
    }, [hideTrackerMonsterHpBarInDarkness]);

    return (
        <div ref={mainDiv} className="settings-container">
            <div className="settings-header">
                <div className="settings-header-title">
                    <FaGear className="settings-header-icon" />
                    <span>Settings</span>
                </div>
            </div>

            <details className="settings-card settings-accordion" open>
                <summary className="settings-card-header settings-accordion-header">
                    <div className="settings-card-title-group">
                        <FaSliders style={{ color: "#38bdf8" }} />
                        <span>Local Settings</span>
                    </div>
                    <div className="settings-accordion-meta">
                        <span className="settings-card-badge local">Client Only</span>
                        <FaChevronDown className="settings-accordion-chevron" aria-hidden="true" />
                    </div>
                </summary>

                <div className="settings-row">
                    <SettingsRowInfo
                        label="Grid scaling factor"
                        description="Multiplier for non-5ft grids"
                        help="A scaling factor for effects; a spell's width and height will be multiplied by this number. Useful if your grid size is not 5ft."
                    />
                    <div className="settings-row-control">
                        <input
                            name="grid-scaling-factor"
                            min="0"
                            step="0.1"
                            type="number"
                            placeholder={(tryComputeGridScaling(gridScale) ?? 1).toString()}
                            className="settings-dark-input"
                            value={gridScalingFactor ?? ""}
                            onChange={(event) => setGridScalingFactor(event.target.value)}
                        />
                    </div>
                </div>

                <div className="settings-row">
                    <SettingsRowInfo
                        label="Smart Action-on-Target"
                        description="Aim-click token to cast (Shift: Adv, Ctrl: Disadv)"
                        help="Clicking a character token while aiming will immediately cast and roll the attack/spell (Shift+click for Advantage, Ctrl+click for Disadvantage)."
                    />
                    <div className="settings-row-control">
                        <label className="settings-toggle-switch">
                            <input
                                type="checkbox"
                                checked={smartActionOnTarget ?? true}
                                onChange={(event) => {
                                    setSmartActionOnTarget(event.currentTarget.checked);
                                    setSettingsValue(LOCAL_STORAGE_KEYS.SMART_ACTION_ON_TARGET, event.currentTarget.checked);
                                }}
                            />
                            <span className="settings-toggle-slider" />
                        </label>
                    </div>
                </div>

                <div className="settings-row">
                    <SettingsRowInfo
                        label="Keep selected targets"
                        description="Preserve targets after cast"
                        help="Whether to keep the selected targets the same after a spell is cast or the tool is deselected."
                    />
                    <div className="settings-row-control">
                        <label className="settings-toggle-switch">
                            <input
                                type="checkbox"
                                checked={keepTargets ?? false}
                                onChange={(event) => setKeepTargets(event.currentTarget.checked)}
                            />
                            <span className="settings-toggle-slider" />
                        </label>
                    </div>
                </div>

                <div className="settings-row">
                    <SettingsRowInfo
                        label="Recent spells list size"
                        description="Max items in quick spells"
                        help="The maximum size of the recent spells list in the spellbook."
                    />
                    <div className="settings-row-control">
                        <input
                            name="recent-spells-list-size"
                            min="0"
                            type="number"
                            className="settings-dark-input"
                            value={mostRecentSize ?? ""}
                            onChange={(event) => setMostRecentSize(event.target.value)}
                        />
                    </div>
                </div>

                <div className="settings-row">
                    <SettingsRowInfo
                        label="Animation update rate"
                        description="Animation FPS (updates/sec)"
                        help="How many updates per second are performed when animating items."
                    />
                    <div className="settings-row-control">
                        <input
                            name="animation-update-rate"
                            min="0"
                            type="number"
                            className="settings-dark-input"
                            value={animationRate ?? ""}
                            onChange={(event) => setAnimationRate(event.target.value)}
                        />
                    </div>
                </div>

                <div className="settings-row">
                    <SettingsRowInfo
                        label="JB2A animation preference"
                        description="Animation setting for your casts"
                        help="Choose whether your casts use JB2A animations or follow the DM's room default."
                    />
                    <div className="settings-row-control">
                        <select
                            className="settings-dark-select"
                            value={animationOverride}
                            onChange={(event) => {
                                const next = event.currentTarget.value as AnimationOverride;
                                setAnimationOverride(next);
                                setSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_OVERRIDE, next);
                            }}
                        >
                            <option value="follow">Follow DM default</option>
                            <option value="on">Always use animations</option>
                            <option value="off">Never use animations</option>
                        </select>
                    </div>
                </div>
                </details>

            {obr.player?.role === "GM" && (
                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-card-title-group">
                            <FaCrown style={{ color: "#fbbf24" }} />
                            <span>GM Settings</span>
                        </div>
                        <span className="settings-card-badge gm">GM Only</span>
                    </div>

                    <details className="settings-category">
                        <summary className="settings-category-header">
                            <span>Room &amp; Player Settings</span>
                            <FaChevronDown className="settings-accordion-chevron" aria-hidden="true" />
                        </summary>
                        <div className="settings-row">
                            <SettingsRowInfo
                                label="Players can cast spells"
                                description="Allow players to cast spells"
                                help="If disabled, only the GM can cast spells."
                            />
                            <div className="settings-row-control">
                                <label className="settings-toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={playersCastSpells ?? false}
                                        onChange={(event) => setPlayersCastSpells(event.currentTarget.checked)}
                                    />
                                    <span className="settings-toggle-slider" />
                                </label>
                            </div>
                        </div>

                        <div className="settings-row">
                            <SettingsRowInfo
                                label="JB2A animations by default"
                                description="Players can choose their own cast preference"
                                help="Default animation preference for this room. Players can override it for their own casts."
                            />
                            <div className="settings-row-control">
                                <label className="settings-toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={roomAnimationsEnabled ?? true}
                                        onChange={(event) => setRoomAnimationsEnabled(event.currentTarget.checked)}
                                    />
                                    <span className="settings-toggle-slider" />
                                </label>
                            </div>
                        </div>

                        <div className="settings-row settings-row-stacked">
                            <SettingsRowInfo
                                label="JB2A asset base URL"
                                description="For a hosted Patreon-compatible pack; leave blank to use the free library"
                                help="JB2A assets must be hosted at a URL that all room participants can access."
                            />
                            <div className="settings-row-control settings-row-control-wide">
                                <input
                                    name="effect-asset-base-url"
                                    type="url"
                                    className="settings-dark-input"
                                    placeholder="https://jb2a-free.s3.eu-west-3.amazonaws.com"
                                    value={effectAssetBaseUrl ?? ""}
                                    onChange={(event) => {
                                        setEffectAssetBaseUrl(event.currentTarget.value);
                                        setEffectAssetBaseUrlError(null);
                                    }}
                                />
                                <button
                                    type="button"
                                    className="settings-dark-button"
                                    onClick={async () => {
                                        try {
                                            const normalized = normalizeEffectAssetBaseUrl(effectAssetBaseUrl ?? "");
                                            await setGlobalSettingsValue(
                                                GLOBAL_STORAGE_KEYS.EFFECT_ASSET_BASE_URL,
                                                normalized
                                            );
                                            setEffectAssetBaseUrl(normalized);
                                            setEffectAssetBaseUrlError(null);
                                            OBR.notification.show("JB2A asset URL saved for this room.", "SUCCESS");
                                        } catch (error) {
                                            const message = error instanceof Error ? error.message : "Invalid JB2A asset URL.";
                                            setEffectAssetBaseUrlError(message);
                                            OBR.notification.show(message, "ERROR");
                                        }
                                    }}
                                >
                                    Save
                                </button>
                                {effectAssetBaseUrlError && (
                                    <span className="settings-inline-error" role="alert">
                                        {effectAssetBaseUrlError}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="settings-row">
                            <SettingsRowInfo
                                label="Summoned entities rule"
                                description="Ownership of summoned items"
                                help={'Who should own items summoned by Embers. "Caster" means the player who cast the spell will own them, while "GM" means that the GM will own them.'}
                            />
                            <div className="settings-row-control">
                                <select
                                    className="settings-dark-select"
                                    onChange={(event) => setSummonedEntities(event.target.value)}
                                    value={summonedEntities ?? ""}
                                >
                                    <option value="gm-only">GM Only</option>
                                    <option value="caster">Caster</option>
                                </select>
                            </div>
                        </div>
                    </details>

                    <details className="settings-category">
                        <summary className="settings-category-header">
                            <span>Darkness &amp; Visibility</span>
                            <FaChevronDown className="settings-accordion-chevron" aria-hidden="true" />
                        </summary>
                    <div className="settings-row">
                        <SettingsRowInfo
                            label="Darkness opacity mode"
                            description="Dynamic vision vs fixed fog"
                            help="Darkness spell opacity mode. 'Dynamic' applies D&D rules (Devil's Sight/Truesight see through, others see opaque black fog). 'Always Transparent' makes all darkness transparent for the whole room. 'Always Opaque' forces solid fog for everyone."
                        />
                        <div className="settings-row-control">
                            <select
                                className="settings-dark-select"
                                onChange={(event) => setDarknessOpacityMode(event.target.value)}
                                value={darknessOpacityMode ?? "dynamic"}
                            >
                                <option value="dynamic">Dynamic (Vision)</option>
                                <option value="always-transparent">Always Transparent</option>
                                <option value="always-opaque">Always Opaque</option>
                            </select>
                        </div>
                    </div>

                    <div className="settings-row">
                        <SettingsRowInfo
                            label="Hide token vitals in Darkness"
                            description="Follow each player’s Darkness vision"
                            help="Hide token HP bars, numbers, temporary HP, and condition badges from players when Darkness obscures a token."
                        />
                        <div className="settings-row-control">
                            <label className="settings-toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={hideTokenVitalsInDarkness ?? true}
                                    onChange={(event) => setHideTokenVitalsInDarkness(event.currentTarget.checked)}
                                />
                                <span className="settings-toggle-slider" />
                            </label>
                        </div>
                    </div>

                    <div className="settings-row settings-row-nested">
                        <SettingsRowInfo
                            label="BG3 Top Turn Tracker HP bars"
                            description="Hide from players in obscuring Darkness"
                            help="Also hide monster HP bars in the BG3 Top Turn Tracker while Darkness obscures the monster."
                        />
                        <div className="settings-row-control">
                            <label className="settings-toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={hideTrackerMonsterHpBarInDarkness ?? true}
                                    onChange={(event) => setHideTrackerMonsterHpBarInDarkness(event.currentTarget.checked)}
                                />
                                <span className="settings-toggle-slider" />
                            </label>
                        </div>
                    </div>

                    </details>

                    <details className="settings-category">
                        <summary className="settings-category-header">
                            <span>Combat &amp; Damage</span>
                            <FaChevronDown className="settings-accordion-chevron" aria-hidden="true" />
                        </summary>
                    <div className="settings-row">
                        <SettingsRowInfo
                            label="Damage application mode"
                            description="GM review & reaction vs instant auto-apply"
                            help="Controls how combat damage from attacks is applied to target token HP. 'GM Approval' lets the DM review and apply damage with 1-click reactions (e.g. Shield +5 AC, half damage). 'Auto-Apply' deducts HP immediately on hit. 'Manual Only' displays numbers in log without modifying HP."
                        />
                        <div className="settings-row-control">
                            <select
                                className="settings-dark-select"
                                onChange={(event) => setDamageApplicationMode(event.target.value)}
                                value={damageApplicationMode ?? "gm_approval"}
                            >
                                <option value="gm_approval">GM Approval (Recommended)</option>
                                <option value="auto">Instant Auto-Apply</option>
                                <option value="manual">Manual Only</option>
                            </select>
                        </div>
                    </div>

                    <div className="settings-row settings-row-nested">
                        <SettingsRowInfo
                            label="Monster hit resolution"
                            description="DM confirms hits or compare against target AC"
                            help="Choose how monster attacks are adjudicated. GM approval is the default; automatic mode compares the attack roll against the target's AC."
                        />
                        <div className="settings-row-control">
                            <select
                                className="settings-dark-select"
                                onChange={(event) => setMonsterHitResolutionMode(event.target.value)}
                                value={monsterHitResolutionMode ?? "gm_approval"}
                            >
                                <option value="gm_approval">DM Approval (Default)</option>
                                <option value="auto_ac">Compare against AC</option>
                            </select>
                        </div>
                    </div>

                    <div className="settings-row">
                        <SettingsRowInfo
                            label="Hide target AC from players"
                            description="Show HIT/MISS without revealing monster AC"
                            help="When enabled, players only see whether an attack HIT or MISS without revealing the target's Armor Class. GM always sees the full AC comparison."
                        />
                        <div className="settings-row-control">
                            <label className="settings-toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={hideTargetAc ?? true}
                                    onChange={(event) => setHideTargetAc(event.currentTarget.checked)}
                                />
                                <span className="settings-toggle-slider" />
                            </label>
                        </div>
                    </div>

                    </details>

                    <details className="settings-category">
                        <summary className="settings-category-header">
                            <span>BG3 Top Turn Tracker</span>
                            <FaChevronDown className="settings-accordion-chevron" aria-hidden="true" />
                        </summary>
                    <div className="settings-row">
                        <SettingsRowInfo
                            label="Show monster HP bar to players"
                            description="Top turn tracker"
                            help="Choose whether players can see monster HP bars in the top turn tracker."
                        />
                        <div className="settings-row-control">
                            <label className="settings-toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={showTurnTrackerHpBarToPlayers ?? false}
                                    onChange={(event) => setShowTurnTrackerHpBarToPlayers(event.currentTarget.checked)}
                                />
                                <span className="settings-toggle-slider" />
                            </label>
                        </div>
                    </div>

                    <div className="settings-row">
                        <SettingsRowInfo
                            label="Show monster HP numbers to players"
                            description="Top turn tracker"
                            help="Choose whether players can see monster HP numbers in the top turn tracker."
                        />
                        <div className="settings-row-control">
                            <label className="settings-toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={showTurnTrackerHpToPlayers ?? false}
                                    onChange={(event) => setShowTurnTrackerHpToPlayers(event.currentTarget.checked)}
                                />
                                <span className="settings-toggle-slider" />
                            </label>
                        </div>
                    </div>

                    <div className="settings-row">
                        <SettingsRowInfo
                            label="Show monster AC to players"
                            description="Top turn tracker"
                            help="Choose whether players can see monster AC in the top turn tracker."
                        />
                        <div className="settings-row-control">
                            <label className="settings-toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={showTurnTrackerAcToPlayers ?? false}
                                    onChange={(event) => setShowTurnTrackerAcToPlayers(event.currentTarget.checked)}
                                />
                                <span className="settings-toggle-slider" />
                            </label>
                        </div>
                    </div>
                    </details>
                </div>
            )}
        </div>
    );
}
