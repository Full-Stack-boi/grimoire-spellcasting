import OBR, { Item } from "@owlbear-rodeo/sdk";
import { getMetadataKey, getScopedMetadata } from "../../../../platform/obr/metadataHelper";
import { COMBAT_SPACE_METADATA_KEY, TokenCombatSpace } from "../../domain/targetingGeometry";

export const TOKEN_SIZE_MEDIUM_MENU_ID = getMetadataKey("menu-set-size-medium");
export const TOKEN_SIZE_LARGE_MENU_ID = getMetadataKey("menu-set-size-large");
export const TOKEN_SIZE_HUGE_MENU_ID = getMetadataKey("menu-set-size-huge");
export const TOKEN_SIZE_GARGANTUAN_MENU_ID = getMetadataKey("menu-set-size-gargantuan");
export const TOKEN_SIZE_TINY_MENU_ID = getMetadataKey("menu-set-size-tiny");
export const TOKEN_SIZE_AUTOFIT_MENU_ID = getMetadataKey("menu-set-size-autofit");

export interface SizePreset {
    sizeInSquares: number;
    sizeCategory: string;
    sizeFeet: number;
    label: string;
    menuId: string;
}

export const SIZE_PRESETS: SizePreset[] = [
    { sizeInSquares: 1, sizeCategory: "Medium", sizeFeet: 5, label: "Set 5e Size: Medium (1x1, 5 ft)", menuId: TOKEN_SIZE_MEDIUM_MENU_ID },
    { sizeInSquares: 2, sizeCategory: "Large", sizeFeet: 10, label: "Set 5e Size: Large (2x2, 10 ft)", menuId: TOKEN_SIZE_LARGE_MENU_ID },
    { sizeInSquares: 3, sizeCategory: "Huge", sizeFeet: 15, label: "Set 5e Size: Huge (3x3, 15 ft)", menuId: TOKEN_SIZE_HUGE_MENU_ID },
    { sizeInSquares: 4, sizeCategory: "Gargantuan", sizeFeet: 20, label: "Set 5e Size: Gargantuan (4x4, 20 ft)", menuId: TOKEN_SIZE_GARGANTUAN_MENU_ID },
    { sizeInSquares: 1, sizeCategory: "Tiny", sizeFeet: 2.5, label: "Set 5e Size: Tiny (1x1, 2.5 ft)", menuId: TOKEN_SIZE_TINY_MENU_ID }
];

/**
 * Applies a 5e size preset to given tokens: updates metadata and auto-fits image grid in Owlbear Rodeo.
 */
export async function applyToken5eSize(
    itemIds: string[],
    sizeInSquares: number,
    sizeCategory: string,
    sizeFeet: number
): Promise<void> {
    if (!OBR.isReady || itemIds.length === 0) return;

    await OBR.scene.items.updateItems(itemIds, (items) => {
        for (const item of items) {
            const combatSpace: TokenCombatSpace = {
                sizeInSquares,
                sizeCategory,
                sizeFeet,
            };

            item.metadata = {
                ...item.metadata,
                [COMBAT_SPACE_METADATA_KEY]: combatSpace,
                [getMetadataKey("combat-space")]: combatSpace,
            };
        }
    });

    try {
        await OBR.notification.show(
            `Set 5e Combat Space to ${sizeCategory} (${sizeInSquares}x${sizeInSquares}, ${sizeFeet} ft).`,
            "INFO"
        );
    } catch {
        // Ignore notification errors
    }
}

/**
 * Automatically fits a token to its bound monster's official 5e size.
 */
export async function autoFitTokenFromBoundMonster(item: Item): Promise<boolean> {
    const boundMonster = getScopedMetadata<{ size?: string; name?: string }>(item.metadata, "bound-monster")
        ?? (item.metadata?.["embers/bound-monster"] as { size?: string; name?: string } | undefined);

    if (!boundMonster?.size) {
        OBR.notification.show("No bound monster found on token. Set a preset size instead.", "WARNING");
        return false;
    }

    const s = boundMonster.size.toLowerCase();
    let sizeInSquares = 1;
    let sizeFeet = 5;
    let sizeCategory = "Medium";

    if (s.includes("large")) {
        sizeInSquares = 2;
        sizeFeet = 10;
        sizeCategory = "Large";
    } else if (s.includes("huge")) {
        sizeInSquares = 3;
        sizeFeet = 15;
        sizeCategory = "Huge";
    } else if (s.includes("gargantuan")) {
        sizeInSquares = 4;
        sizeFeet = 20;
        sizeCategory = "Gargantuan";
    } else if (s.includes("tiny")) {
        sizeInSquares = 1;
        sizeFeet = 2.5;
        sizeCategory = "Tiny";
    } else if (s.includes("small")) {
        sizeInSquares = 1;
        sizeFeet = 5;
        sizeCategory = "Small";
    }

    await applyToken5eSize([item.id], sizeInSquares, sizeCategory, sizeFeet);
    return true;
}

/**
 * Registers GM context menu options for quick 5e sizing and auto-fitting.
 */
export async function setupTokenSizeContextMenu(): Promise<void> {
    if (!OBR.isReady) return;

    const baseFilter = {
        roles: ["GM" as const],
        min: 1,
        some: [
            { key: "layer", value: "CHARACTER" },
            { key: "layer", value: "ATTACHMENT" },
            { key: "layer", value: "MOUNT" },
            { key: "layer", value: "PROP" },
        ],
    };

    // 1. Auto-Fit from Bound Monster option
    try {
        await OBR.contextMenu.remove(TOKEN_SIZE_AUTOFIT_MENU_ID);
        await OBR.contextMenu.create({
            id: TOKEN_SIZE_AUTOFIT_MENU_ID,
            icons: [
                {
                    icon: "/embers.svg",
                    label: "Auto-Fit 5e Size (From Bound Monster)",
                    filter: baseFilter,
                },
            ],
            onClick: async (context) => {
                const item = context.items?.[0];
                if (!item) return;
                await autoFitTokenFromBoundMonster(item);
            },
        });
    } catch (e) {
        console.error("Failed to register Auto-Fit Token Size context menu:", e);
    }

    // 2. Preset size options
    for (const preset of SIZE_PRESETS) {
        try {
            await OBR.contextMenu.remove(preset.menuId);
            await OBR.contextMenu.create({
                id: preset.menuId,
                icons: [
                    {
                        icon: "/embers.svg",
                        label: preset.label,
                        filter: baseFilter,
                    },
                ],
                onClick: async (context) => {
                    const ids = (context.items || []).map((it) => it.id);
                    if (ids.length === 0) return;
                    await applyToken5eSize(ids, preset.sizeInSquares, preset.sizeCategory, preset.sizeFeet);
                },
            });
        } catch (e) {
            console.error(`Failed to register Token Size context menu (${preset.sizeCategory}):`, e);
        }
    }
}
