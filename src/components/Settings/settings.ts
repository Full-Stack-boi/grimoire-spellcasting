import { APP_KEY, ASSET_LOCATION } from "../../config";
import OBR, { GridScale } from "@owlbear-rodeo/sdk";

export const LOCAL_STORAGE_KEYS = {
    MOST_RECENT_SPELLS_LIST_SIZE: "most-recent-list",
    GRID_SCALING_FACTOR: "grid-scaling-factor",
    KEEP_SELECTED_TARGETS: "keep-selected-targets",
    DEFAULT_CASTER: "default-caster",
    ANIMATION_UPDATE_RATE: "animation-update-rate",
    ANIMATION_OVERRIDE: "animation-override",
    ANIMATION_MAPPINGS: "animation-mappings",
    ANIMATION_ONE_SHOT_OVERRIDES: "animation-one-shot-overrides",
    SMART_ACTION_ON_TARGET: "smart-action-on-target",
};

export const GLOBAL_STORAGE_KEYS = {
    PLAYERS_CAN_CAST_SPELLS: "players-cast-spells",
    SUMMONED_ENTITIES_RULE: "summoned-entities",
    DARKNESS_OPACITY_MODE: "darkness-opacity-mode", // "dynamic" | "always-transparent" | "always-opaque"
    DAMAGE_APPLICATION_MODE: "damage-application-mode", // "gm_approval" | "auto" | "manual"
    MONSTER_HIT_RESOLUTION_MODE: "monster-hit-resolution-mode", // "gm_approval" | "auto_ac"
    HIDE_TARGET_AC_FROM_PLAYERS: "hide-target-ac-from-players",
    SHOW_TURN_TRACKER_HP_TO_PLAYERS: "show-turn-tracker-hp-to-players",
    SHOW_TURN_TRACKER_HP_BAR_TO_PLAYERS: "show-turn-tracker-hp-bar-to-players",
    SHOW_TURN_TRACKER_AC_TO_PLAYERS: "show-turn-tracker-ac-to-players",
    HIDE_TOKEN_VITALS_IN_DARKNESS: "hide-token-vitals-in-darkness",
    HIDE_TRACKER_MONSTER_HP_BAR_IN_DARKNESS: "hide-tracker-monster-hp-bar-in-darkness",
    ANIMATIONS_ENABLED: "animations-enabled",
    ANIMATION_MAPPINGS: "animation-mappings",
    EFFECT_ASSET_BASE_URL: "effect-asset-base-url",
};

export const SETTINGS_CHANNEL = `${APP_KEY}/settings`;

export const DEFAULT_VALUES = {
    [LOCAL_STORAGE_KEYS.MOST_RECENT_SPELLS_LIST_SIZE]: 10,
    [LOCAL_STORAGE_KEYS.GRID_SCALING_FACTOR]: null,
    [LOCAL_STORAGE_KEYS.KEEP_SELECTED_TARGETS]: false,
    [LOCAL_STORAGE_KEYS.DEFAULT_CASTER]: [],
    [LOCAL_STORAGE_KEYS.ANIMATION_UPDATE_RATE]: 50,
    [LOCAL_STORAGE_KEYS.ANIMATION_OVERRIDE]: "follow",
    [LOCAL_STORAGE_KEYS.ANIMATION_MAPPINGS]: {},
    [LOCAL_STORAGE_KEYS.ANIMATION_ONE_SHOT_OVERRIDES]: {},
    [LOCAL_STORAGE_KEYS.SMART_ACTION_ON_TARGET]: true,
    [GLOBAL_STORAGE_KEYS.PLAYERS_CAN_CAST_SPELLS]: true,
    [GLOBAL_STORAGE_KEYS.SUMMONED_ENTITIES_RULE]: "caster",
    [GLOBAL_STORAGE_KEYS.DARKNESS_OPACITY_MODE]: "dynamic",
    [GLOBAL_STORAGE_KEYS.DAMAGE_APPLICATION_MODE]: "gm_approval",
    [GLOBAL_STORAGE_KEYS.MONSTER_HIT_RESOLUTION_MODE]: "gm_approval",
    [GLOBAL_STORAGE_KEYS.HIDE_TARGET_AC_FROM_PLAYERS]: true,
    [GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_TO_PLAYERS]: false,
    [GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_HP_BAR_TO_PLAYERS]: false,
    [GLOBAL_STORAGE_KEYS.SHOW_TURN_TRACKER_AC_TO_PLAYERS]: false,
    [GLOBAL_STORAGE_KEYS.HIDE_TOKEN_VITALS_IN_DARKNESS]: true,
    [GLOBAL_STORAGE_KEYS.HIDE_TRACKER_MONSTER_HP_BAR_IN_DARKNESS]: true,
    [GLOBAL_STORAGE_KEYS.ANIMATIONS_ENABLED]: true,
    [GLOBAL_STORAGE_KEYS.ANIMATION_MAPPINGS]: {},
    [GLOBAL_STORAGE_KEYS.EFFECT_ASSET_BASE_URL]: ASSET_LOCATION,
}

export type AnimationOverride = "follow" | "on" | "off";

export type AnimationChoice =
    | { kind: "effect"; id: string }
    | { kind: "effect-map"; effects: Record<string, string> }
    | { kind: "weapon-variant"; id: string };

export type AnimationAssignments = Record<string, AnimationChoice>;

export interface ResolvedAnimationChoice {
    choice: AnimationChoice;
    source: "one-shot" | "personal" | "room";
}

function parseAnimationAssignments(value: unknown): AnimationAssignments {
    if (value == null || typeof value !== "object" || Array.isArray(value)) {
        return {};
    }

    const assignments: AnimationAssignments = {};
    for (const [key, rawChoice] of Object.entries(value)) {
        if (
            typeof rawChoice !== "object" ||
            rawChoice == null ||
            !("kind" in rawChoice)
        ) {
            continue;
        }
        if (rawChoice.kind === "effect-map" && "effects" in rawChoice) {
            const effects: Record<string, string> = {};
            if (typeof rawChoice.effects !== "object" || rawChoice.effects == null || Array.isArray(rawChoice.effects)) {
                continue;
            }
            for (const [sourceId, selectedId] of Object.entries(rawChoice.effects)) {
                if (typeof selectedId === "string" && selectedId.length > 0) {
                    effects[sourceId] = selectedId;
                }
            }
            if (Object.keys(effects).length > 0) {
                assignments[key] = { kind: "effect-map", effects };
            }
        } else if (
            (rawChoice.kind === "effect" || rawChoice.kind === "weapon-variant") &&
            "id" in rawChoice &&
            typeof rawChoice.id === "string" &&
            rawChoice.id.length > 0
        ) {
            assignments[key] = { kind: rawChoice.kind, id: rawChoice.id };
        }
    }
    return assignments;
}

export function spellAnimationActionKey(spellId: string): string {
    return `spell:${spellId.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "")}`;
}

export function weaponAnimationActionKey(mode: "melee" | "ranged", profile: string): string {
    return `weapon:${mode}:${profile}`;
}

export function getPersonalAnimationAssignments(): AnimationAssignments {
    return parseAnimationAssignments(
        getSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_MAPPINGS),
    );
}

export function getOneShotAnimationAssignments(): AnimationAssignments {
    return parseAnimationAssignments(
        getSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_ONE_SHOT_OVERRIDES),
    );
}

export async function getRoomAnimationAssignments(): Promise<AnimationAssignments> {
    return parseAnimationAssignments(
        await getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.ANIMATION_MAPPINGS),
    );
}

export function savePersonalAnimationAssignments(assignments: AnimationAssignments): void {
    setSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_MAPPINGS, assignments);
}

export async function saveRoomAnimationAssignments(assignments: AnimationAssignments): Promise<void> {
    await setGlobalSettingsValue(GLOBAL_STORAGE_KEYS.ANIMATION_MAPPINGS, assignments);
}

export function saveOneShotAnimationChoice(actionKey: string, choice: AnimationChoice): void {
    const assignments = getOneShotAnimationAssignments();
    setSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_ONE_SHOT_OVERRIDES, {
        ...assignments,
        [actionKey]: choice,
    });
}

export function consumeOneShotAnimationChoice(actionKey: string): void {
    const assignments = getOneShotAnimationAssignments();
    if (!(actionKey in assignments)) {
        return;
    }
    delete assignments[actionKey];
    setSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_ONE_SHOT_OVERRIDES, assignments);
}

export async function getResolvedAnimationChoice(
    actionKey: string,
    knownRoomAssignments?: AnimationAssignments,
): Promise<ResolvedAnimationChoice | undefined> {
    const roomAssignments = knownRoomAssignments ?? await getRoomAnimationAssignments();
    const oneShotAssignments = getOneShotAnimationAssignments();
    const personalAssignments = getPersonalAnimationAssignments();
    const oneShot = oneShotAssignments[actionKey];
    if (oneShot) return { choice: oneShot, source: "one-shot" };

    const personal = personalAssignments[actionKey];
    if (personal) return { choice: personal, source: "personal" };

    const room = roomAssignments[actionKey];
    if (room) return { choice: room, source: "room" };
    return undefined;
}

export function normalizeEffectAssetBaseUrl(value: string): string {
    const trimmed = value.trim();
    const candidate = trimmed || ASSET_LOCATION;
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
        throw new Error("The JB2A asset URL must use HTTP or HTTPS.");
    }
    return url.toString().replace(/\/+$/, "");
}

export async function getEffectAssetBaseUrl(): Promise<string> {
    const value = await getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.EFFECT_ASSET_BASE_URL);
    if (typeof value !== "string") {
        return normalizeEffectAssetBaseUrl(ASSET_LOCATION);
    }
    return normalizeEffectAssetBaseUrl(value);
}

export async function getEffectiveAnimationsEnabled(): Promise<boolean> {
    const override = getSettingsValue(LOCAL_STORAGE_KEYS.ANIMATION_OVERRIDE) as AnimationOverride;
    if (override === "on") return true;
    if (override === "off") return false;
    const defaultEnabled = await getGlobalSettingsValue(GLOBAL_STORAGE_KEYS.ANIMATIONS_ENABLED);
    return defaultEnabled !== false;
}

// Migrate legacy default: keep-selected-targets used to default to true.
// Ensure it defaults to false so target markers are cleaned up after casting.
try {
    const MIGRATION_KEY = `${APP_KEY}/migrated-keep-targets-default-v2`;
    if (typeof localStorage !== "undefined" && !localStorage.getItem(MIGRATION_KEY)) {
        const settingsObjectString = localStorage.getItem(`${APP_KEY}/settings`);
        if (settingsObjectString) {
            const settingsObject = JSON.parse(settingsObjectString);
            if (settingsObject[LOCAL_STORAGE_KEYS.KEEP_SELECTED_TARGETS] === true) {
                settingsObject[LOCAL_STORAGE_KEYS.KEEP_SELECTED_TARGETS] = false;
                localStorage.setItem(`${APP_KEY}/settings`, JSON.stringify(settingsObject));
            }
        }
        localStorage.setItem(MIGRATION_KEY, "true");
    }
} catch {
    // Ignore in non-browser or test environments
}

export const GRID_UNIT_FACTORS: Record<string, number> = {
    "ft": 1,
    "m": 1.524,
}

function tryComputeGridScaling(gridScale: GridScale | null) {
    if (gridScale == null) {
        return null;
    }
    const gridScaleFactor = gridScale.parsed.multiplier;
    const unitFactor = GRID_UNIT_FACTORS[gridScale.parsed.unit] ?? 1;
    return 5 / (gridScaleFactor * unitFactor);
}

export async function getDefaultGridScaleFactor() {
    const gridScale = await OBR.scene.grid.getScale();
    return tryComputeGridScaling(gridScale) ?? 1;
}

export function getSettingsValue(key: string) {
    if (typeof localStorage === "undefined") {
        return DEFAULT_VALUES[key];
    }
    const settingsObjectString = localStorage.getItem(`${APP_KEY}/settings`);
    if (settingsObjectString == undefined) {
        return DEFAULT_VALUES[key];
    }
    const settingsObject = JSON.parse(settingsObjectString);
    if (settingsObject[key] == undefined) {
        return DEFAULT_VALUES[key];
    }
    return settingsObject[key];
}

export function setSettingsValue(key: string, value: unknown) {
    if (typeof localStorage === "undefined") {
        return;
    }
    const settingsObjectString = localStorage.getItem(`${APP_KEY}/settings`);
    if (settingsObjectString == undefined) {
        localStorage.setItem(`${APP_KEY}/settings`, JSON.stringify({ [key]: value }));
        return;
    }
    const settingsObject = JSON.parse(settingsObjectString);
    settingsObject[key] = value;
    localStorage.setItem(`${APP_KEY}/settings`, JSON.stringify(settingsObject));
}

export async function getGlobalSettingsValue(key: string) {
    const metadata = await OBR.scene.getMetadata();
    const settingsObject = metadata[`${APP_KEY}/settings/${key}`];
    if (settingsObject == undefined) {
        return DEFAULT_VALUES[key];
    }
    return settingsObject;
}

export async function setGlobalSettingsValue(key: string, value: unknown) {
    await OBR.scene.setMetadata({
        [`${APP_KEY}/settings/${key}`]: value
    });
}
