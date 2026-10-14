import { describe, it, expect, beforeEach, vi } from "vitest";

const store: Record<string, string> = {};
(globalThis as any).localStorage = {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
  key: (i: number) => Object.keys(store)[i] ?? null,
  length: 0,
};
(globalThis as any).window = {
  localStorage: (globalThis as any).localStorage,
  location: { search: "" },
  addEventListener: () => {},
  removeEventListener: () => {},
};

vi.mock("@owlbear-rodeo/sdk", () => {
  return {
    default: {
      isReady: true,
      scene: {
        items: {
          getItems: vi.fn(async () => []),
          updateItems: vi.fn(async () => {}),
        },
        getMetadata: vi.fn(async () => ({})),
        setMetadata: vi.fn(async () => {}),
      },
      player: {
        getId: vi.fn(async () => "mock-player-id"),
        getRole: vi.fn(async () => "GM"),
        getSelection: vi.fn(async () => []),
        onChange: vi.fn(() => () => {}),
      },
      notification: {
        show: vi.fn(async () => {}),
      },
      broadcast: {
        sendMessage: vi.fn(async () => {}),
      },
      popover: {
        open: vi.fn(async () => {}),
        close: vi.fn(async () => {}),
      },
    },
  };
});
import {
  getAllMonsters,
  filterMonsters,
  saveCustomMonster,
  deleteCustomMonster,
  getCustomMonsters,
  importMonsterFromJson,
  getBoundMonsterFromToken,
  bindMonsterToToken,
  unbindMonsterFromToken,
  rollMonsterAction,
  BOUND_MONSTER_METADATA_KEY,
} from "../monsterService";
import type { MonsterStatblock } from "../domain/types";
import * as tokenVitalsService from "../../combat/tokenVitalsService";
import * as rollLogService from "../../../services/rollLogService";
import * as settingsService from "../../../components/Settings/settings";

describe("monsterService & Catalog", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("Catalog & Editions", () => {
    it("should provide built-in monsters from both 2024 and 2014 Legacy", () => {
      const monsters = getAllMonsters();
      expect(monsters.length).toBeGreaterThanOrEqual(700);

      const count2024 = monsters.filter((m) => m.edition === "2024" && !m.isLegacy).length;
      const count2014Legacy = monsters.filter((m) => m.edition === "2014" && m.isLegacy === true).length;

      expect(count2024).toBeGreaterThanOrEqual(350);
      expect(count2014Legacy).toBeGreaterThanOrEqual(300);
    });

    it("should properly identify 2014 Legacy monsters with isLegacy=true", () => {
      const monsters = getAllMonsters();
      const legacyGoblins = monsters.filter((m) => m.id === "goblin_legacy" || (m.name.includes("Legacy") && m.isLegacy));
      expect(legacyGoblins.length).toBeGreaterThan(0);
      expect(legacyGoblins[0].isLegacy).toBe(true);
      expect(legacyGoblins[0].edition).toBe("2014");
    });
  });

  describe("Filtering Monsters", () => {
    it("should filter by search keyword matching name or subtype", () => {
      const all = getAllMonsters();
      const goblins = filterMonsters(all, { search: "goblin" });
      expect(goblins.length).toBeGreaterThan(0);
      expect(goblins.every((g) => g.name.toLowerCase().includes("goblin") || g.subtype?.toLowerCase().includes("goblin"))).toBe(true);
    });

    it("should filter by edition: 2024 vs 2014 Legacy", () => {
      const all = getAllMonsters();
      const only2024 = filterMonsters(all, { edition: "2024" });
      const onlyLegacy = filterMonsters(all, { edition: "2014" });

      expect(only2024.every((m) => m.edition === "2024" && !m.isLegacy)).toBe(true);
      expect(onlyLegacy.every((m) => m.edition === "2014" || m.isLegacy)).toBe(true);
    });

    it("should filter by challenge rating", () => {
      const all = getAllMonsters();
      const crQuarter = filterMonsters(all, { cr: "1/4" });
      expect(crQuarter.length).toBeGreaterThan(0);
      expect(crQuarter.every((m) => m.challengeRating === "1/4")).toBe(true);
    });

    it("should filter by monster type", () => {
      const all = getAllMonsters();
      const dragons = filterMonsters(all, { type: "Dragon" });
      expect(dragons.length).toBeGreaterThan(0);
      expect(dragons.every((m) => m.type === "Dragon")).toBe(true);
    });
  });

  describe("Custom Monsters & JSON Import", () => {
    it("should import a valid custom monster from JSON and persist it", () => {
      const json = JSON.stringify({
        name: "Custom Kobold Chieftain",
        edition: "2014",
        isLegacy: true,
        size: "Small",
        type: "Humanoid",
        armorClass: 15,
        hitPoints: { average: 27, formula: "6d6+6" },
        speed: "30 ft.",
        stats: { str: 9, dex: 15, con: 12, int: 8, wis: 10, cha: 14 },
        actions: [
          {
            id: "spear",
            name: "Spear",
            type: "melee_attack",
            attackBonus: 4,
            damage: "1d6+2",
            damageType: "Piercing",
            description: "Melee Attack",
          },
        ],
      });

      const imported = importMonsterFromJson(json);
      expect(imported).not.toBeNull();
      expect(imported?.name).toBe("Custom Kobold Chieftain");
      expect(imported?.isLegacy).toBe(true);
      expect(imported?.edition).toBe("2014");
      expect(imported?.armorClass).toBe(15);

      const all = getAllMonsters();
      expect(all.some((m) => m.name === "Custom Kobold Chieftain")).toBe(true);
    });

    it("should return null for malformed JSON or empty string", () => {
      expect(importMonsterFromJson("")).toBeNull();
      expect(importMonsterFromJson("{ malformed json")).toBeNull();
      expect(importMonsterFromJson("{}")).toBeNull();
    });

    it("should delete a custom monster", () => {
      const custom: MonsterStatblock = {
        id: "temp-monster-1",
        name: "Temp Monster",
        edition: "2024",
        size: "Medium",
        type: "Beast",
        alignment: "Unaligned",
        armorClass: 12,
        hitPoints: { average: 10, formula: "2d8" },
        speed: "30 ft.",
        stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        challengeRating: "1/2",
        proficiencyBonus: 2,
        senses: "Passive Perception 10",
        languages: "--",
        actions: [],
      };

      saveCustomMonster(custom);
      expect(getCustomMonsters().some((m) => m.id === "temp-monster-1")).toBe(true);

      deleteCustomMonster("temp-monster-1");
      expect(getCustomMonsters().some((m) => m.id === "temp-monster-1")).toBe(false);
      expect(getAllMonsters().some((m) => m.id === "temp-monster-1")).toBe(false);
      expect(getAllMonsters().some((m) => m.id === "goblin_legacy")).toBe(true);
    });

    it("surfaces storage failures when deleting a custom monster", () => {
      const storageError = new Error("Storage unavailable");
      const setItemSpy = vi.spyOn(localStorage, "setItem").mockImplementation(() => {
        throw storageError;
      });
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => deleteCustomMonster("temp-monster-1")).toThrow(storageError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to delete custom monster:",
        storageError,
      );

      setItemSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe("Token Metadata & Binding", () => {
    it("should retrieve bound monster from token metadata", () => {
      const sample = getAllMonsters()[0];
      const token = {
        id: "token-1",
        metadata: {
          [BOUND_MONSTER_METADATA_KEY]: sample,
        },
      };

      const retrieved = getBoundMonsterFromToken(token as any);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.id).toBe(sample.id);
      expect(retrieved?.name).toBe(sample.name);
    });

    it("should resolve bound monster if metadata stores only monster ID", () => {
      const sample = getAllMonsters()[0];
      const token = {
        id: "token-1",
        metadata: {
          [BOUND_MONSTER_METADATA_KEY]: sample.id,
        },
      };

      const retrieved = getBoundMonsterFromToken(token as any);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.id).toBe(sample.id);
    });

    it("should bind monster to token and update vitals", async () => {
      const setTokenVitalsSpy = vi.spyOn(tokenVitalsService, "setTokenVitals").mockResolvedValue({} as any);
      const monster = getAllMonsters()[0];
      const success = await bindMonsterToToken("token-test-1", monster);
      expect(success).toBe(true);
      expect(setTokenVitalsSpy).toHaveBeenCalledWith(
        "token-test-1",
        expect.objectContaining({
          hpMax: monster.hitPoints.average,
          armorClass: monster.armorClass,
        })
      );
      setTokenVitalsSpy.mockRestore();
    });

    it("should unbind monster from token and clean metadata", async () => {
      const OBR = (await import("@owlbear-rodeo/sdk")).default;
      const updateItemsSpy = vi.spyOn(OBR.scene.items, "updateItems").mockImplementation(async (ids, cb: any) => {
        const item: any = {
          id: Array.isArray(ids) ? ids[0] : "token-test-1",
          name: "Test Goblin",
          metadata: {
            [BOUND_MONSTER_METADATA_KEY]: { id: "goblin" },
          },
        };
        cb([item]);
        expect(item.metadata[BOUND_MONSTER_METADATA_KEY]).toBeUndefined();
      });

      const success = await unbindMonsterFromToken("token-test-1");
      expect(success).toBe(true);
      expect(updateItemsSpy).toHaveBeenCalledWith(["token-test-1"], expect.any(Function));
    });
  });

  describe("rollMonsterAction", () => {
    it("should roll an attack action and broadcast DDB roll card", async () => {
      const broadcastSpy = vi.spyOn(rollLogService, "broadcastDDBRoll").mockResolvedValue();
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
      const getTokenVitalsSpy = vi.spyOn(tokenVitalsService, "getTokenVitals").mockResolvedValue({
        armorClass: 30,
        hpCurrent: 20,
        hpMax: 20,
      } as any);

      const monster = getAllMonsters().find((m) => m.name.toLowerCase().includes("goblin"))!;
      const action = monster.actions.find((a) => a.type === "melee_attack")!;

      const card = await rollMonsterAction(
        monster,
        action,
        { id: "target-1", name: "Player Paladin" },
        "normal"
      );

      expect(card).toBeDefined();
      expect(card.actionType).toBe("ATTACK");
      expect(card.targetName).toBe("Player Paladin");
      expect(card.targetAc).toBe(30);
      expect(card.isHit).toBeUndefined();
      expect(card.requiresHitApproval).toBe(true);
      expect(card.hitApprovalStatus).toBe("pending");
      expect(card.pendingDamage).toBeGreaterThan(0);
      expect(broadcastSpy).toHaveBeenCalledTimes(1);

      broadcastSpy.mockRestore();
      randomSpy.mockRestore();
      getTokenVitalsSpy.mockRestore();
    });

    it("rolls and preserves each typed damage component", async () => {
      const broadcastSpy = vi.spyOn(rollLogService, "broadcastDDBRoll").mockResolvedValue();
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
      const getTokenVitalsSpy = vi.spyOn(tokenVitalsService, "getTokenVitals").mockResolvedValue({
        armorClass: 10,
        hpCurrent: 20,
        hpMax: 20,
      } as any);
      const monster = getAllMonsters().find((entry) => entry.name.toLowerCase().includes("goblin"))!;
      const baseAction = monster.actions.find((entry) => entry.type === "melee_attack")!;
      const action = {
        ...baseAction,
        damage: "1d4",
        damageType: "bludgeoning",
        damageComponents: [
          { formula: "1d4", damageType: "bludgeoning" },
          { formula: "1d6", damageType: "lightning" },
        ],
      };

      const card = await rollMonsterAction(
        monster,
        action,
        { id: "target-typed-damage", name: "Target" },
        "normal",
      );

      expect(card.pendingDamage).toBeGreaterThan(0);
      expect(card.damageComponents).toHaveLength(2);
      expect(card.subtitle).toContain("bludgeoning");
      expect(card.subtitle).toContain("lightning");

      broadcastSpy.mockRestore();
      randomSpy.mockRestore();
      getTokenVitalsSpy.mockRestore();
    });

    it("does not offer damage for a natural 1", async () => {
      const broadcastSpy = vi.spyOn(rollLogService, "broadcastDDBRoll").mockResolvedValue();
      const randomSpy = vi.spyOn(Math, "random")
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0.8)
        .mockReturnValue(0.5);
      const getTokenVitalsSpy = vi.spyOn(tokenVitalsService, "getTokenVitals").mockResolvedValue({
        armorClass: 14,
        hpCurrent: 20,
        hpMax: 20,
      } as any);

      const monster = getAllMonsters().find((m) => m.name.toLowerCase().includes("goblin"))!;
      const action = monster.actions.find((a) => a.type === "melee_attack")!;
      const card = await rollMonsterAction(
        monster,
        action,
        { id: "target-1", name: "Player Paladin" },
        "normal",
      );

      expect(card.isMiss).toBe(true);
      expect(card.isHit).toBe(false);
      expect(card.pendingDamage).toBeUndefined();
      expect(card.hitApprovalStatus).toBeUndefined();

      broadcastSpy.mockRestore();
      randomSpy.mockRestore();
      getTokenVitalsSpy.mockRestore();
    });

    it("uses automatic AC resolution when configured", async () => {
      const broadcastSpy = vi.spyOn(rollLogService, "broadcastDDBRoll").mockResolvedValue();
      const settingsSpy = vi.spyOn(settingsService, "getGlobalSettingsValue").mockResolvedValue("auto_ac");
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
      const getTokenVitalsSpy = vi.spyOn(tokenVitalsService, "getTokenVitals").mockResolvedValue({
        armorClass: 10,
        hpCurrent: 20,
        hpMax: 20,
      } as any);

      const monster = getAllMonsters().find((m) => m.name.toLowerCase().includes("goblin"))!;
      const action = monster.actions.find((a) => a.type === "melee_attack")!;
      const card = await rollMonsterAction(
        monster,
        action,
        { id: "target-1", name: "Player Paladin" },
        "normal",
      );

      expect(card.isHit).toBe(true);
      expect(card.hitLabel).toContain("HIT");
      expect(card.requiresHitApproval).toBe(false);

      broadcastSpy.mockRestore();
      settingsSpy.mockRestore();
      randomSpy.mockRestore();
      getTokenVitalsSpy.mockRestore();
    });

    it("should attach [Legacy] badge in casterName when rolling for a 2014 legacy monster", async () => {
      const broadcastSpy = vi.spyOn(rollLogService, "broadcastDDBRoll").mockResolvedValue();

      const legacyMonster: MonsterStatblock = {
        id: "beholder_legacy_test",
        name: "Beholder",
        edition: "2014",
        isLegacy: true,
        size: "Large",
        type: "Aberration",
        alignment: "Lawful Evil",
        armorClass: 18,
        hitPoints: { average: 180, formula: "19d10+76" },
        speed: "0 ft., fly 20 ft.",
        stats: { str: 10, dex: 14, con: 18, int: 17, wis: 15, cha: 17 },
        challengeRating: "13",
        proficiencyBonus: 5,
        senses: "Darkvision 120 ft.",
        languages: "Deep Speech, Undercommon",
        actions: [
          {
            id: "bite",
            name: "Bite",
            type: "melee_attack",
            attackBonus: 5,
            damage: "4d6",
            damageType: "Piercing",
            description: "Melee Attack",
          },
        ],
      };

      const card = await rollMonsterAction(legacyMonster, legacyMonster.actions[0], null, "normal");
      expect(card.casterName).toBe("Beholder [Legacy]");
      expect(card.actionName).toBe("BITE");
      expect(broadcastSpy).toHaveBeenCalled();

      broadcastSpy.mockRestore();
    });
  });
});
