import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Item } from "@owlbear-rodeo/sdk";

const mocks = vi.hoisted(() => ({
    sceneItems: [] as any[],
    localItems: [] as any[],
    selection: [] as string[],
    playerRole: "PLAYER",
    playerId: "player-1",
    opacityMode: "dynamic" as "dynamic" | "always-transparent" | "always-opaque" | undefined,
    activeCaster: null as any,
    deleteLocalItems: vi.fn(async (ids: string[]) => {
        mocks.localItems = mocks.localItems.filter(item => !ids.includes(item.id));
    }),
    updateSceneItems: vi.fn(async (ids: string[], update: (items: any[]) => void) => {
        const items = mocks.sceneItems.filter(item => ids.includes(item.id));
        update(items);
    }),
    updateLocalItems: vi.fn(async (ids: string[], update: (items: any[]) => void) => {
        const items = mocks.localItems.filter(item => ids.includes(item.id));
        update(items);
    }),
}));

vi.mock("@owlbear-rodeo/sdk", () => ({
    default: {
        scene: {
            isReady: vi.fn(async () => true),
            grid: {
                getDpi: vi.fn(async () => 150),
                getScale: vi.fn(async () => ({ parsed: { multiplier: 5 } })),
            },
            items: {
                getItems: vi.fn(async () => mocks.sceneItems),
                updateItems: mocks.updateSceneItems,
                onChange: vi.fn(() => vi.fn()),
            },
            local: {
                getItems: vi.fn(async () => mocks.localItems),
                deleteItems: mocks.deleteLocalItems,
                updateItems: mocks.updateLocalItems,
                addItems: vi.fn(async (items: any[]) => {
                    mocks.localItems.push(...items);
                }),
            },
        },
        player: {
            getRole: vi.fn(async () => mocks.playerRole),
            getId: vi.fn(async () => mocks.playerId),
            getSelection: vi.fn(async () => mocks.selection),
            onChange: vi.fn(() => vi.fn()),
        },
        contextMenu: {
            remove: vi.fn(async () => undefined),
            create: vi.fn(async () => undefined),
        },
        notification: {
            show: vi.fn(),
        },
    },
}));

vi.mock("../../../../../components/Settings/settings", () => ({
    GLOBAL_STORAGE_KEYS: {
        DARKNESS_OPACITY_MODE: "darkness-opacity-mode",
    },
    getGlobalSettingsValue: vi.fn(async () => mocks.opacityMode),
}));

vi.mock("../activeCasterResolver", () => ({
    resolveActiveCaster: vi.fn(async () => mocks.activeCaster),
}));

vi.mock("../../../../../services/ddbService", () => ({
    getLinkedDDBCharacterId: vi.fn(() => null),
}));

vi.mock("../../../../../effects/effects", () => ({
    getEffect: vi.fn(() => undefined),
    buildEffectImage: vi.fn(),
}));

import {
    DARKNESS_ZONE_METADATA_KEY,
    TOKEN_VISION_METADATA_KEY,
} from "../../../application/lineOfSightService";
import type { DarknessZone } from "../../../domain/vision";
import type { ActiveCasterInfo } from "../activeCasterResolver";
import {
    getTokenIdsInsideDarkness,
    isTokenHiddenByDarkness,
    updateDarknessVision,
} from "../darknessVisionHandler";

describe("darknessVisionHandler", () => {
    beforeEach(() => {
        mocks.sceneItems = [];
        mocks.localItems = [];
        mocks.selection = [];
        mocks.playerRole = "PLAYER";
        mocks.playerId = "player-1";
        mocks.opacityMode = "dynamic";
        mocks.activeCaster = null;
        vi.clearAllMocks();
    });

    function addDarknessZone(id: string, position = { x: 100, y: 100 }, radiusFeet = 15, green = false) {
        mocks.sceneItems = [{
            id,
            type: "IMAGE",
            layer: "PROP",
            locked: false,
            disableHit: false,
            disableAutoZIndex: true,
            zIndex: -1,
            position,
            metadata: {
                [DARKNESS_ZONE_METADATA_KEY]: { radiusFeet },
                "eu.armindo.embers/effect-id": green ? "darkness.green.opaque" : "darkness.black.opaque",
            },
        }];
    }

    describe("isTokenHiddenByDarkness", () => {
        const zone: DarknessZone = {
            id: "darkness-1",
            position: { x: 100, y: 100 },
            radiusFeet: 15,
        };
        const obscuredToken = { position: { x: 100, y: 100 } };
        const distantCaster: ActiveCasterInfo = {
            item: {
                id: "caster-1",
                metadata: { [TOKEN_VISION_METADATA_KEY]: {} },
            } as unknown as Item,
            id: "caster-1",
            position: { x: 1000, y: 100 },
            isDM: false,
        };

        it("hides an obscured token from a player with no magical-darkness vision", async () => {
            await expect(isTokenHiddenByDarkness(
                obscuredToken,
                "PLAYER",
                "player-1",
                distantCaster,
                [zone],
                "dynamic"
            )).resolves.toBe(true);
        });

        it("keeps an obscured token visible to a player with Devil's Sight", async () => {
            const caster = {
                ...distantCaster,
                item: {
                    ...distantCaster.item,
                    metadata: { [TOKEN_VISION_METADATA_KEY]: { devilsSight: true } },
                } as unknown as Item,
            };

            await expect(isTokenHiddenByDarkness(
                obscuredToken,
                "PLAYER",
                "player-1",
                caster,
                [zone],
                "dynamic"
            )).resolves.toBe(false);
        });

        it("respects room opacity overrides and the viewer-inside-zone transparency rule", async () => {
            await expect(isTokenHiddenByDarkness(
                obscuredToken,
                "PLAYER",
                "player-1",
                distantCaster,
                [zone],
                "always-transparent"
            )).resolves.toBe(false);
            await expect(isTokenHiddenByDarkness(
                obscuredToken,
                "PLAYER",
                "player-1",
                {
                    ...distantCaster,
                    item: {
                        ...distantCaster.item,
                        metadata: { [TOKEN_VISION_METADATA_KEY]: { devilsSight: true } },
                    } as unknown as Item,
                },
                [zone],
                "always-opaque"
            )).resolves.toBe(true);
            await expect(isTokenHiddenByDarkness(
                obscuredToken,
                "PLAYER",
                "player-1",
                { ...distantCaster, position: zone.position },
                [zone],
                "dynamic"
            )).resolves.toBe(false);
        });

        it("never hides tokens from the GM", async () => {
            await expect(isTokenHiddenByDarkness(
                obscuredToken,
                "GM",
                "gm-1",
                null,
                [zone],
                "always-opaque"
            )).resolves.toBe(false);
        });
    });

    describe("getTokenIdsInsideDarkness", () => {
        it("finds player and monster tokens inside a Darkness zone without vision rules", async () => {
            const zone: DarknessZone = {
                id: "darkness-1",
                position: { x: 100, y: 100 },
                radiusFeet: 15,
            };
            const tokens = [
                { id: "monster-token", position: { x: 100, y: 100 } },
                { id: "player-token", position: { x: 200, y: 100 } },
                { id: "outside-token", position: { x: 1000, y: 100 } },
            ];

            await expect(getTokenIdsInsideDarkness(tokens, [zone])).resolves.toEqual(
                new Set(["monster-token", "player-token"])
            );
        });
    });

    it("deletes stale deterministic local fog when the viewer can see the darkness", async () => {
        mocks.opacityMode = "always-transparent";
        mocks.sceneItems = [{
            id: "darkness-1",
            type: "IMAGE",
            layer: "CHARACTER",
            locked: false,
            disableHit: false,
            zIndex: -1,
            position: { x: 100, y: 100 },
            metadata: {
                [DARKNESS_ZONE_METADATA_KEY]: { radiusFeet: 15 },
            },
        }];
        mocks.localItems = [{
            id: "embers-darkness-fog-darkness-1",
            position: { x: 100, y: 100 },
            metadata: {},
        }];

        await updateDarknessVision();

        expect(mocks.deleteLocalItems).toHaveBeenCalledWith(["embers-darkness-fog-darkness-1"]);
        expect(mocks.localItems).toHaveLength(0);
    });

    it("cleans up a legacy shader veil while the viewer can see the zone", async () => {
        mocks.opacityMode = "always-transparent";
        addDarknessZone("visible-darkness");
        mocks.localItems = [{ id: "embers-darkness-veil-visible-darkness", position: { x: 100, y: 100 } }];

        await updateDarknessVision();

        expect(mocks.deleteLocalItems).toHaveBeenCalledWith(["embers-darkness-veil-visible-darkness"]);
        expect(mocks.localItems).toHaveLength(0);
    });

    it("deletes stale local fog for darkness zones no longer on the scene", async () => {
        mocks.localItems = [{
            id: "embers-darkness-fog-removed-darkness",
            position: { x: 100, y: 100 },
            metadata: {},
        }];

        await updateDarknessVision();

        expect(mocks.deleteLocalItems).toHaveBeenCalledWith(["embers-darkness-fog-removed-darkness"]);
        expect(mocks.localItems).toHaveLength(0);
    });
});
