import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock @owlbear-rodeo/sdk so that it doesn't try to access window in node environment
vi.mock("@owlbear-rodeo/sdk", () => {
    return {
        default: {
            player: {
                getSelection: vi.fn(async () => []),
                getId: vi.fn(async () => "player-1"),
                getRole: vi.fn(async () => "PLAYER"),
                getMetadata: vi.fn(async () => ({})),
            },
            scene: {
                items: {
                    getItems: vi.fn(async () => []),
                }
            }
        },
        isImage: vi.fn(() => true)
    };
});

import { captureCastContext } from "../castContext";
import * as activeCasterResolver from "../../infrastructure/obr/activeCasterResolver";
import * as ddbService from "../../../../services/ddbService";
import { BOUND_MONSTER_METADATA_KEY } from "../../../monsters/monsterService";
import { SRD_MONSTERS } from "../../../monsters/data/srdMonsters";
import type { MonsterStatblock } from "../../../monsters/domain/types";

describe("captureCastContext", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("returns null when no active caster is resolved", async () => {
        vi.spyOn(activeCasterResolver, "resolveActiveCaster").mockResolvedValue(null);

        const context = await captureCastContext("PLAYER", "player-1");
        expect(context).toBeNull();
    });

    it("creates an immutable snapshot binding caster ID, item, position, and DDB character", async () => {
        const mockItem = {
            id: "token-cleric",
            name: "Shadowheart",
            position: { x: 150, y: 300 },
            layer: "CHARACTER",
            metadata: {}
        } as any;

        const mockDdbChar = {
            id: 123456,
            name: "Shadowheart",
            level: 5,
            classes: [{ name: "Cleric", level: 5 }]
        } as any;

        vi.spyOn(activeCasterResolver, "resolveActiveCaster").mockResolvedValue({
            id: "token-cleric",
            item: mockItem,
            name: "Shadowheart",
            position: { x: 150, y: 300 },
            isDM: false
        });

        vi.spyOn(ddbService, "resolveCasterCharacter").mockReturnValue(mockDdbChar);

        const context = await captureCastContext("PLAYER", "player-1");

        expect(context).not.toBeNull();
        expect(context?.casterTokenId).toBe("token-cleric");
        expect(context?.casterName).toBe("Shadowheart");
        expect(context?.position).toEqual({ x: 150, y: 300 });
        expect(context?.isDM).toBe(false);
        expect(context?.playerId).toBe("player-1");
        expect(context?.ddbCharacter?.id).toBe(123456);
        expect(context?.ddbCharacterId).toBe(123456);

        // Verify resolveActiveCaster was called with purpose: "cast"
        expect(activeCasterResolver.resolveActiveCaster).toHaveBeenCalledWith(
            "PLAYER",
            "player-1",
            { purpose: "cast" }
        );
    });

    it("falls back to Dungeon Master name for GM without bound DDB character", async () => {
        const mockItem = {
            id: "token-dragon",
            name: "Red Dragon",
            position: { x: 500, y: 500 },
            layer: "CHARACTER",
            metadata: {}
        } as any;

        vi.spyOn(activeCasterResolver, "resolveActiveCaster").mockResolvedValue({
            id: "token-dragon",
            item: mockItem,
            name: "",
            position: { x: 500, y: 500 },
            isDM: true
        });

        vi.spyOn(ddbService, "resolveCasterCharacter").mockReturnValue(null);

        const context = await captureCastContext("GM", "gm-1");

        expect(context).not.toBeNull();
        expect(context?.casterTokenId).toBe("token-dragon");
        expect(context?.casterName).toBe("Red Dragon");
        expect(context?.isDM).toBe(true);
        expect(context?.ddbCharacter).toBeNull();
    });

    it.each([
        ["2024", "ddb_gray_ooze_2024", "monster_weapon_act_pseudopod"],
        ["2014 Legacy", "ddb_gray_ooze_legacy", "monster_weapon_act_0_pseudopod"],
    ])("captures adapted attack data for Gray Ooze (%s)", async (_edition, monsterId, weaponId) => {
        const monster = SRD_MONSTERS.find((entry) => entry.id === monsterId);
        expect(monster).toBeDefined();

        const mockItem = {
            id: `token-${monsterId}`,
            name: "Gray Ooze",
            position: { x: 150, y: 300 },
            layer: "CHARACTER",
            metadata: {
                [BOUND_MONSTER_METADATA_KEY]: monster,
            },
        } as any;
        const unrelatedSameNameCharacter = {
            id: 123456,
            name: "Gray Ooze",
            weapons: [],
        } as any;

        vi.spyOn(activeCasterResolver, "resolveActiveCaster").mockResolvedValue({
            id: mockItem.id,
            item: mockItem,
            name: mockItem.name,
            position: mockItem.position,
            isDM: true,
        });
        const resolveDdbCharacter = vi
            .spyOn(ddbService, "resolveCasterCharacter")
            .mockReturnValue(unrelatedSameNameCharacter);

        const context = await captureCastContext("GM", "gm-1");
        const attacks = context?.ddbCharacter?.weapons ?? [];

        expect(attacks.map((attack) => attack.id)).toContain(weaponId);
        expect(context?.ddbCharacter?.name).toBe(monster?.name);
        expect(context?.ddbCharacterId).toBeLessThan(0);
        expect(resolveDdbCharacter).not.toHaveBeenCalled();
    });

    it("adapts a user-provided bound monster instead of resolving a same-name DDB character", async () => {
        const customMonster: MonsterStatblock = {
            id: "external_gray_ooze",
            name: "Gray Ooze",
            edition: "2024",
            size: "Medium",
            type: "Ooze",
            alignment: "Unaligned",
            armorClass: 9,
            hitPoints: { average: 22, formula: "3d8 + 9" },
            speed: "10 ft.",
            stats: { str: 12, dex: 6, con: 16, int: 1, wis: 6, cha: 2 },
            senses: "Blindsight 60 ft.",
            languages: "None",
            challengeRating: "1/2",
            proficiencyBonus: 2,
            actions: [{
                id: "external_pseudopod",
                name: "Pseudopod",
                type: "melee_attack",
                attackBonus: 3,
                reachFeet: 5,
                damage: "2d8+1",
                damageType: "Acid",
                description: "Melee attack.",
            }],
        };
        const mockItem = {
            id: "token-external-gray-ooze",
            name: "Gray Ooze",
            position: { x: 150, y: 300 },
            layer: "CHARACTER",
            metadata: {
                [BOUND_MONSTER_METADATA_KEY]: customMonster,
            },
        } as any;

        vi.spyOn(activeCasterResolver, "resolveActiveCaster").mockResolvedValue({
            id: mockItem.id,
            item: mockItem,
            name: mockItem.name,
            position: mockItem.position,
            isDM: true,
        });
        const resolveDdbCharacter = vi
            .spyOn(ddbService, "resolveCasterCharacter")
            .mockReturnValue({ id: 123456, name: "Gray Ooze", weapons: [] } as any);

        const context = await captureCastContext("GM", "gm-1");

        expect(context?.ddbCharacter?.weapons?.[0]).toMatchObject({
            id: "monster_weapon_external_pseudopod",
            name: "Pseudopod",
            toHit: 3,
            damage: "2d8+1",
            damageType: "Acid",
            reachFeet: 5,
        });
        expect(resolveDdbCharacter).not.toHaveBeenCalled();
    });
});
