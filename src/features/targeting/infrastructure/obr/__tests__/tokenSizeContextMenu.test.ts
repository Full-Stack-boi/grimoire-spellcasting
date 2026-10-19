import { describe, expect, it, vi, beforeEach } from "vitest";
import OBR from "@owlbear-rodeo/sdk";
import {
    applyToken5eSize,
    autoFitTokenFromBoundMonster,
    setupTokenSizeContextMenu,
    TOKEN_SIZE_AUTOFIT_MENU_ID,
    TOKEN_SIZE_HUGE_MENU_ID,
} from "../tokenSizeContextMenu";
import { COMBAT_SPACE_METADATA_KEY } from "../../../domain/targetingGeometry";

vi.mock("@owlbear-rodeo/sdk", () => {
    const updateItems = vi.fn();
    const create = vi.fn();
    const remove = vi.fn();
    const showNotification = vi.fn();

    return {
        default: {
            isReady: true,
            scene: {
                items: {
                    updateItems,
                },
            },
            contextMenu: {
                create,
                remove,
            },
            notification: {
                show: showNotification,
            },
        },
    };
});

describe("Token Size Context Menu Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("registers all 5e size presets and auto-fit context menu options for GM", async () => {
        await setupTokenSizeContextMenu();

        // 1 auto-fit + 5 presets = 6 context menu options
        expect(OBR.contextMenu.create).toHaveBeenCalledTimes(6);

        const createdCalls = vi.mocked(OBR.contextMenu.create).mock.calls;
        const createdIds = createdCalls.map((c) => c[0].id);

        expect(createdIds).toContain(TOKEN_SIZE_AUTOFIT_MENU_ID);
        expect(createdIds).toContain(TOKEN_SIZE_HUGE_MENU_ID);

        // Check filter ensures GM role
        const hugeOption = createdCalls.find((c) => c[0].id === TOKEN_SIZE_HUGE_MENU_ID)?.[0];
        expect(hugeOption?.icons[0].filter?.roles).toEqual(["GM"]);
    });

    it("applies 5e Huge (3x3, 15ft) size to token and preserves DM visual scale", async () => {
        const mockItem = {
            id: "token-devil",
            type: "IMAGE",
            image: { width: 600, height: 300 },
            grid: { dpi: 100, offset: { x: 0, y: 0 } },
            scale: { x: 2, y: 2 },
            metadata: {},
        } as any;

        vi.mocked(OBR.scene.items.updateItems).mockImplementation(async (_ids, updater) => {
            updater([mockItem]);
        });

        await applyToken5eSize(["token-devil"], 3, "Huge", 15);

        expect(OBR.scene.items.updateItems).toHaveBeenCalledWith(["token-devil"], expect.any(Function));

        // Metadata check
        const combatSpace = mockItem.metadata[COMBAT_SPACE_METADATA_KEY];
        expect(combatSpace).toEqual({
            sizeInSquares: 3,
            sizeCategory: "Huge",
            sizeFeet: 15,
        });

        // DM visual scale preservation check: grid.dpi and scale must not be squashed or overwritten
        expect(mockItem.grid.dpi).toBe(100);
        expect(mockItem.scale).toEqual({ x: 2, y: 2 });
        expect(OBR.notification.show).toHaveBeenCalledWith(
            expect.stringContaining("Set 5e Combat Space to Huge (3x3, 15 ft)"),
            "INFO"
        );
    });

    it("auto-fits token from bound monster statblock with size Huge", async () => {
        const boundMonsterItem = {
            id: "token-bound-devil",
            metadata: {
                "embers/bound-monster": {
                    name: "Horned Devil",
                    size: "Huge",
                },
            },
        } as any;

        vi.mocked(OBR.scene.items.updateItems).mockImplementation(async (_ids, updater) => {
            updater([boundMonsterItem]);
        });

        const success = await autoFitTokenFromBoundMonster(boundMonsterItem);
        expect(success).toBe(true);

        const space = boundMonsterItem.metadata[COMBAT_SPACE_METADATA_KEY];
        expect(space.sizeInSquares).toBe(3);
        expect(space.sizeCategory).toBe("Huge");
        expect(space.sizeFeet).toBe(15);
    });

    it("warns when trying to auto-fit token without bound monster", async () => {
        const unboundItem = {
            id: "token-unbound",
            metadata: {},
        } as any;

        const success = await autoFitTokenFromBoundMonster(unboundItem);
        expect(success).toBe(false);
        expect(OBR.notification.show).toHaveBeenCalledWith(
            expect.stringContaining("No bound monster found"),
            "WARNING"
        );
    });
});
