import { beforeEach, describe, it, expect, vi } from "vitest";

type MockSceneItem = {
  id: string;
  type: string;
  layer: string;
  position: { x: number; y: number };
  metadata: Record<string, unknown>;
};
type MockOverlayItem = { id: string; [key: string]: unknown };

const syncMocks = vi.hoisted(() => ({
  sceneItems: [] as MockSceneItem[],
  sceneFetchCount: 0,
  localItems: [] as MockOverlayItem[],
  metadata: {} as Record<string, unknown>,
  hidden: true,
  itemsChanged: null as ((items: MockSceneItem[]) => void) | null,
  deletedIds: [] as string[],
  addedIds: [] as string[],
  conditions: [] as string[],
  failStatusAdd: false,
  playerRole: "PLAYER" as "GM" | "PLAYER",
  boundsFetchCount: 0,
  metadataFetchCount: 0,
  noVitals: false,
}));
const badgeMocks = vi.hoisted(() => ({
  assetUrl: vi.fn((_badge: { assetKey: string }) => `https://assets.example/combat-badges/${_badge.assetKey}.svg`),
}));

vi.mock("@owlbear-rodeo/sdk", () => {
  class MockShapeBuilder {
    private _item: any = {};
    id(id: string) { this._item.id = id; return this; }
    shapeType(t: string) { this._item.shapeType = t; return this; }
    position(p: any) { this._item.position = p; return this; }
    width(w: number) { this._item.width = w; return this; }
    height(h: number) { this._item.height = h; return this; }
    strokeColor(c: string) { this._item.strokeColor = c; return this; }
    strokeWidth(w: number) { this._item.strokeWidth = w; return this; }
    strokeOpacity(o: number) { this._item.strokeOpacity = o; return this; }
    fillColor(c: string) { this._item.fillColor = c; return this; }
    fillOpacity(o: number) { this._item.fillOpacity = o; return this; }
    layer(l: string) { this._item.layer = l; return this; }
    attachedTo(t: string) { this._item.attachedTo = t; return this; }
    disableHit(d: boolean) { this._item.disableHit = d; return this; }
    locked(l: boolean) { this._item.locked = l; return this; }
    build() { return this._item; }
  }

  class MockTextBuilder {
    private _item: any = {};
    id(id: string) { this._item.id = id; return this; }
    name(n: string) { this._item.name = n; return this; }
    plainText(t: string) { this._item.plainText = t; return this; }
    position(p: any) { this._item.position = p; return this; }
    fontSize(s: number) { this._item.fontSize = s; return this; }
    fontWeight(w: number) { this._item.fontWeight = w; return this; }
    textAlign(a: string) { this._item.textAlign = a; return this; }
    textAlignVertical(a: string) { this._item.textAlignVertical = a; return this; }
    fillColor(c: string) { this._item.fillColor = c; return this; }
    strokeColor(c: string) { this._item.strokeColor = c; return this; }
    strokeWidth(w: number) { this._item.strokeWidth = w; return this; }
    layer(l: string) { this._item.layer = l; return this; }
    attachedTo(t: string) { this._item.attachedTo = t; return this; }
    disableHit(d: boolean) { this._item.disableHit = d; return this; }
    locked(l: boolean) { this._item.locked = l; return this; }
    build() { return this._item; }
  }

  class MockLabelBuilder {
    private _item: any = { type: "LABEL", text: {}, style: {} };
    id(id: string) { this._item.id = id; return this; }
    name(n: string) { this._item.name = n; return this; }
    plainText(t: string) { this._item.text.plainText = t; return this; }
    position(p: any) { this._item.position = p; return this; }
    padding(p: number) { this._item.text.style = { ...this._item.text.style, padding: p }; return this; }
    fontSize(s: number) { this._item.text.style = { ...this._item.text.style, fontSize: s }; return this; }
    fontWeight(w: number) { this._item.text.style = { ...this._item.text.style, fontWeight: w }; return this; }
    textAlign(a: string) { this._item.text.style = { ...this._item.text.style, textAlign: a }; return this; }
    textAlignVertical(a: string) { this._item.text.style = { ...this._item.text.style, textAlignVertical: a }; return this; }
    fillColor(c: string) { this._item.text.style = { ...this._item.text.style, fillColor: c }; return this; }
    backgroundColor(c: string) { this._item.style.backgroundColor = c; return this; }
    backgroundOpacity(o: number) { this._item.style.backgroundOpacity = o; return this; }
    cornerRadius(r: number) { this._item.style.cornerRadius = r; return this; }
    attachedTo(t: string) { this._item.attachedTo = t; return this; }
    disableHit(d: boolean) { this._item.disableHit = d; return this; }
    locked(l: boolean) { this._item.locked = l; return this; }
    build() { return this._item; }
  }

  class MockImageBuilder {
    private _item: any = { type: "IMAGE", text: {}, textItemType: "LABEL" };
    constructor(_player: any, image: any, grid: any) {
      this._item.image = image;
      this._item.grid = grid;
    }
    id(id: string) { this._item.id = id; return this; }
    name(n: string) { this._item.name = n; return this; }
    position(p: any) { this._item.position = p; return this; }
    layer(l: string) { this._item.layer = l; return this; }
    attachedTo(t: string) { this._item.attachedTo = t; return this; }
    disableHit(d: boolean) { this._item.disableHit = d; return this; }
    locked(l: boolean) { this._item.locked = l; return this; }
    build() { return this._item; }
  }

  return {
    default: {
      isReady: true,
      scene: {
        getMetadata: vi.fn(async () => {
          syncMocks.metadataFetchCount++;
          return syncMocks.metadata;
        }),
        onMetadataChange: vi.fn(() => () => {}),
        grid: {
          getDpi: vi.fn(async () => 150),
        },
        items: {
          getItems: vi.fn(async () => {
            syncMocks.sceneFetchCount++;
            return syncMocks.sceneItems;
          }),
          getItemBounds: vi.fn(async () => {
            syncMocks.boundsFetchCount++;
            return {
              center: { x: 100, y: 100 },
              width: 80,
              height: 80,
            };
          }),
          onChange: vi.fn((callback) => {
            syncMocks.itemsChanged = callback;
            return () => {};
          }),
        },
        local: {
          getItems: vi.fn(async () => syncMocks.localItems),
          deleteItems: vi.fn(async (ids: string[]) => {
            syncMocks.deletedIds.push(...ids);
            syncMocks.localItems = syncMocks.localItems.filter((item) => !ids.includes(item.id));
          }),
          addItems: vi.fn(async (items: MockOverlayItem[]) => {
            if (syncMocks.failStatusAdd && items.some((item) =>
              item.id.includes("/vitals-cond/") ||
              item.id.includes("/vitals-effect/") ||
              item.id.includes("/vitals-concentration/")
            )) {
              throw new Error("Simulated status badge add failure");
            }
            syncMocks.addedIds.push(...items.map((item) => item.id));
            syncMocks.localItems.push(...items);
          }),
          updateItems: vi.fn(async (ids: string[], update: (items: MockOverlayItem[]) => void) => {
            const draftItems = syncMocks.localItems
              .filter((item) => ids.includes(item.id))
              .map((item) => ({ ...item }));
            update(draftItems);
            const updatedById = new Map(draftItems.map((item) => [item.id, item]));
            syncMocks.localItems = syncMocks.localItems.map((item) => updatedById.get(item.id) ?? item);
          }),
        },
      },
      player: {
        getRole: vi.fn(async () => syncMocks.playerRole),
        getId: vi.fn(async () => "player-1"),
        onChange: vi.fn(() => () => {}),
      },
    },
    buildShape: () => new MockShapeBuilder(),
    buildLabel: () => new MockLabelBuilder(),
    buildText: () => new MockTextBuilder(),
    buildImage: (img: any, grid: any) => new MockImageBuilder(null, img, grid),
  };
});

vi.mock("../../domain/conditionIcons", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../domain/conditionIcons")>()),
  getCombatBadgeAssetUrl: badgeMocks.assetUrl,
}));

vi.mock("../../../combat/initiativeService", () => ({
  extractEncounterFromMetadata: vi.fn(() => null),
}));
vi.mock("../../../combat/tokenVitalsService", () => ({
  VITALS_METADATA_KEY: "com.fullstackboi.spellcasting/vitals",
  LEGACY_VITALS_METADATA_KEY: "eu.armindo.embers/vitals",
  extractTokenVitals: vi.fn((metadata?: Record<string, unknown>) => {
    if (syncMocks.noVitals) return null;
    const storedVitals = metadata?.["com.fullstackboi.spellcasting/vitals"] as { conditions?: string[] } | undefined;
    return {
      hpCurrent: 12,
      hpMax: 20,
      hpTemp: 0,
      conditions: storedVitals?.conditions ?? syncMocks.conditions,
      hideNumbers: false,
    };
  }),
  getHpGradientColor: vi.fn(() => ({ fill: "#16a34a", stroke: "#15803d" })),
}));
vi.mock("../../../player/playerCharacterService", () => ({
  isCharacterToken: vi.fn((item: MockSceneItem) => item.id === "token-1"),
}));
vi.mock("../../../targeting/application/lineOfSightService", () => ({
  extractDarknessZones: vi.fn(() => syncMocks.sceneItems.some((item) => item.id === "darkness-1")
    ? [{ id: "darkness-1", position: { x: 100, y: 100 }, radiusFeet: 15 }]
    : []),
}));
vi.mock("../../../targeting/infrastructure/obr/activeCasterResolver", () => ({
  resolveActiveCaster: vi.fn(async () => null),
}));
vi.mock("../../../targeting/infrastructure/obr/darknessVisionHandler", () => ({
  isTokenHiddenByDarkness: vi.fn(async () => syncMocks.hidden),
}));

import {
  calculateVitalsBarGeometry,
  buildTokenVitalsItems,
  setupTokenVitalsSync,
  VITALS_BG_PREFIX,
  VITALS_FILL_PREFIX,
  VITALS_TEMP_PREFIX,
  VITALS_TEXT_PREFIX,
  VITALS_COND_PREFIX,
  VITALS_EFFECT_PREFIX,
  VITALS_CONCENTRATION_PREFIX,
} from "../tokenVitalsRenderer";

describe("tokenVitalsRenderer", () => {
  beforeEach(() => {
    badgeMocks.assetUrl.mockReset();
    badgeMocks.assetUrl.mockImplementation(
      (badge) => `https://assets.example/combat-badges/${badge.assetKey}.svg?v=3`,
    );
    syncMocks.sceneItems = [
      {
        id: "token-1",
        type: "IMAGE",
        layer: "CHARACTER",
        position: { x: 60, y: 60 },
        metadata: {},
      },
      {
        id: "darkness-1",
        type: "IMAGE",
        layer: "PROP",
        position: { x: 100, y: 100 },
        metadata: {},
      },
    ];
    syncMocks.sceneFetchCount = 0;
    syncMocks.localItems = [{ id: `${VITALS_BG_PREFIX}token-1` }];
    syncMocks.metadata = {};
    syncMocks.hidden = true;
    syncMocks.itemsChanged = null;
    syncMocks.deletedIds = [];
    syncMocks.addedIds = [];
    syncMocks.conditions = [];
    syncMocks.failStatusAdd = false;
    syncMocks.playerRole = "PLAYER";
    syncMocks.boundsFetchCount = 0;
    syncMocks.metadataFetchCount = 0;
    syncMocks.noVitals = false;
  });

  it("calculates accurate geometry above token position", () => {
    const item = {
      position: { x: 200, y: 300 },
      image: { width: 100, height: 100 },
    };
    const bounds = {
      center: { x: 250, y: 350 },
      width: 100,
      height: 100,
    };
    const geometry = calculateVitalsBarGeometry(item, bounds, 150);
    expect(geometry.centerX).toBe(250);
    // topY is bounds.center.y - height/2 - 16 = 350 - 50 - 16 = 284
    expect(geometry.topY).toBe(284);
    expect(geometry.barWidth).toBe(85); // 100 * 0.85
    expect(geometry.barHeight).toBe(8);
  });

  it("builds background, fill bar, temp HP and text label with attachedTo", async () => {
    const geometry = {
      centerX: 250,
      topY: 284,
      barWidth: 100,
      barHeight: 8,
    };
    const vitals = {
      hpCurrent: 20,
      hpMax: 30,
      speedFeet: 30,
      hpTemp: 5,
      armorClass: 16,
      conditions: ["poisoned"],
    };

    const items = await buildTokenVitalsItems("token_123", vitals, geometry, "GM");

    const bg = items.find((i) => i.id === `${VITALS_BG_PREFIX}token_123`) as any;
    expect(bg).toBeDefined();
    expect(bg.attachedTo).toBe("token_123");
    expect(bg.width).toBe(100);

    const fill = items.find((i) => i.id === `${VITALS_FILL_PREFIX}token_123`) as any;
    expect(fill).toBeDefined();
    // 20/30 = 66.6% of 100 = 66.67 width
    expect(fill.width).toBeCloseTo(66.67, 1);
    expect(fill.fillColor).toBe("#16a34a"); // >50% green

    const temp = items.find((i) => i.id === `${VITALS_TEMP_PREFIX}token_123`) as any;
    expect(temp).toBeDefined();
    expect(temp.fillColor).toBe("#38bdf8"); // light blue

    const text = items.find((i) => i.id === `${VITALS_TEXT_PREFIX}token_123`) as any;
    expect(text).toBeDefined();
    expect(text.plainText).toBe("20/30 (+5)");
    expect(text.position.y).toBe(222);

    const cond = items.find((i) => i.id === `${VITALS_COND_PREFIX}token_123/0`) as any;
    expect(cond).toBeDefined();
    expect(cond.name).toBe("Condition: Poisoned");
    expect(cond.type).toBe("IMAGE");
    expect(cond.image.mime).toBe("image/svg+xml");
    expect(cond.image.url).toBe("https://assets.example/combat-badges/poisoned.svg?v=3");
    expect(cond.image.url.length).toBeLessThan(2048);
    expect(cond.image.width).toBe(256);
    expect(cond.image.height).toBe(256);
    expect(cond.grid.dpi).toBeCloseTo((150 * 256) / 44);
    expect(cond.position).toEqual({ x: 228, y: 234 });
  });

  it("centers badges in horizontal rows and wraps extra conditions above", async () => {
    const items = await buildTokenVitalsItems("token_wrapped", {
      hpCurrent: 12,
      hpMax: 20,
      conditions: ["blinded", "charmed", "deafened", "frightened"],
    }, {
      centerX: 250,
      topY: 284,
      barWidth: 100,
      barHeight: 8,
    }, "GM");

    const badges = items
      .filter((item) => item.id.startsWith(`${VITALS_COND_PREFIX}token_wrapped/`))
      .sort((left, right) => left.id.localeCompare(right.id)) as any[];

    expect(badges.map((badge) => badge.position)).toEqual([
      { x: 204, y: 234 },
      { x: 252, y: 234 },
      { x: 204, y: 186 },
      { x: 252, y: 186 },
    ]);
    expect((items.find((item) => item.id === `${VITALS_TEXT_PREFIX}token_wrapped`) as any).position.y).toBe(174);
  });

  it("keeps health overlays and falls back to a label when a condition icon URL fails", async () => {
    badgeMocks.assetUrl.mockImplementationOnce(() => {
      throw new Error("Simulated badge URL failure");
    });
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const items = await buildTokenVitalsItems("token_fallback", {
      hpCurrent: 12,
      hpMax: 20,
      conditions: ["blinded"],
    }, {
      centerX: 250,
      topY: 284,
      barWidth: 100,
      barHeight: 8,
    }, "GM");

    expect(items.some((item) => item.id === `${VITALS_BG_PREFIX}token_fallback`)).toBe(true);
    expect(items.some((item) => item.id === `${VITALS_TEXT_PREFIX}token_fallback`)).toBe(true);
    const condition = items.find((item) => item.id === `${VITALS_COND_PREFIX}token_fallback/0`) as any;
    expect(condition.type).toBe("LABEL");
    expect(condition.text.plainText).toBe("BLINDED");
    expect(consoleError).toHaveBeenCalledWith(
      '[Vitals] Could not create the "Blinded" icon item; falling back to a text badge.',
      expect.any(Error),
    );

    consoleError.mockRestore();
  });

  it("hides exact numbers from players when hideNumbers is enabled", async () => {
    const geometry = {
      centerX: 250,
      topY: 284,
      barWidth: 100,
      barHeight: 8,
    };
    const vitals = {
      hpCurrent: 14,
      hpMax: 30,
      hideNumbers: true,
    };

    // As Player: no text item
    const playerItems = await buildTokenVitalsItems("token_monster", vitals, geometry, "PLAYER");
    const playerText = playerItems.find((i) => i.id === `${VITALS_TEXT_PREFIX}token_monster`);
    expect(playerText).toBeUndefined();

    // As GM: numbers visible despite hideNumbers
    const gmItems = await buildTokenVitalsItems("token_monster", vitals, geometry, "GM");
    const gmText = gmItems.find((i) => i.id === `${VITALS_TEXT_PREFIX}token_monster`) as any;
    expect(gmText).toBeDefined();
    expect(gmText.plainText).toBe("14/30");
  });

  it("automatically renders dead skull indicator badge on 0 HP", async () => {
    const geometry = {
      centerX: 250,
      topY: 284,
      barWidth: 100,
      barHeight: 8,
    };
    const vitals = {
      hpCurrent: 0,
      hpMax: 25,
      conditions: [],
    };

    const items = await buildTokenVitalsItems("token_dead", vitals, geometry, "GM");
    const deadBadge = items.find((i) => i.id.startsWith(VITALS_COND_PREFIX)) as any;
    expect(deadBadge).toBeDefined();
    expect(deadBadge.name).toBe("Condition: Dead");
  });

  it("renders concentration and temporary speed effects on the affected token", async () => {
    const geometry = { centerX: 250, topY: 284, barWidth: 100, barHeight: 8 };
    const items = await buildTokenVitalsItems("token_effects", {
      hpCurrent: 20,
      hpMax: 30,
      speedFeet: 30,
      concentration: { spellId: "bless", spellName: "Bless" },
      effects: [{
        id: "ray-frost-1",
        kind: "speed_reduction",
        name: "Ray of Frost",
        valueFeet: 10,
        sourceTokenId: "caster",
        sourceName: "Wizard",
        expiresOnTurnStartTokenId: "caster",
      }],
    }, geometry, "PLAYER");

    const concentration = items.find((item) => item.id === `${VITALS_CONCENTRATION_PREFIX}token_effects`) as any;
    const speedEffect = items.find((item) => item.id === `${VITALS_EFFECT_PREFIX}token_effects/0`) as any;
    expect(concentration.name).toBe("Concentrating: Bless");
    expect(concentration.attachedTo).toBe("token_effects");
    expect(concentration.type).toBe("IMAGE");
    expect(speedEffect.name).toContain("Speed 20 ft.");
    expect(speedEffect.name).toContain("reduced by 10 ft.");
    expect(speedEffect.name).toContain("Wizard's next turn");
    expect(speedEffect.attachedTo).toBe("token_effects");
    expect(speedEffect.type).toBe("IMAGE");
  });

  it("removes and restores local token vitals as Darkness visibility changes", async () => {
    const stopSync = setupTokenVitalsSync();

    await vi.waitFor(() => {
      expect(syncMocks.itemsChanged).toBeTypeOf("function");
    });
    await vi.waitFor(() => {
      expect(syncMocks.deletedIds).toContain(`${VITALS_BG_PREFIX}token-1`);
    });

    expect(syncMocks.localItems).toHaveLength(0);

    syncMocks.hidden = false;
    syncMocks.itemsChanged?.(syncMocks.sceneItems);

    await vi.waitFor(() => {
      expect(syncMocks.addedIds).toContain(`${VITALS_BG_PREFIX}token-1`);
    });

    expect(syncMocks.localItems.some((item) => item.id === `${VITALS_BG_PREFIX}token-1`)).toBe(true);
    stopSync();
  });

  it("updates and removes a changed token's status badges without a full scene pass", async () => {
    syncMocks.playerRole = "GM";
    syncMocks.hidden = false;
    syncMocks.conditions = ["blinded"];
    syncMocks.localItems = [];
    const stopSync = setupTokenVitalsSync();

    await vi.waitFor(() => {
      expect(syncMocks.localItems.some((item) => item.id === `${VITALS_COND_PREFIX}token-1/0`)).toBe(true);
    });

    const boundsFetchCount = syncMocks.boundsFetchCount;
    const metadataFetchCount = syncMocks.metadataFetchCount;
    syncMocks.conditions = ["blinded", "poisoned"];
    syncMocks.sceneItems = syncMocks.sceneItems.map((item) => item.id === "token-1"
      ? {
          ...item,
          metadata: {
            ...item.metadata,
            "com.fullstackboi.spellcasting/vitals": {
              hpCurrent: 12,
              hpMax: 20,
              conditions: syncMocks.conditions,
            },
          },
        }
      : item);
    syncMocks.itemsChanged?.(syncMocks.sceneItems);

    await vi.waitFor(() => {
      expect(syncMocks.localItems.some((item) => item.id === `${VITALS_COND_PREFIX}token-1/1`)).toBe(true);
    });

    expect(syncMocks.boundsFetchCount).toBe(boundsFetchCount);
    expect(syncMocks.metadataFetchCount).toBe(metadataFetchCount);

    const setSceneConditions = (conditions: string[]) => {
      syncMocks.conditions = conditions;
      syncMocks.sceneItems = syncMocks.sceneItems.map((item) => item.id === "token-1"
        ? {
            ...item,
            metadata: {
              ...item.metadata,
              "com.fullstackboi.spellcasting/vitals": {
                hpCurrent: 12,
                hpMax: 20,
                conditions,
              },
            },
          }
        : item);
      syncMocks.itemsChanged?.(syncMocks.sceneItems);
    };

    setSceneConditions(["charmed"]);
    setSceneConditions(["poisoned", "frightened"]);

    await vi.waitFor(() => {
      const currentBadges = syncMocks.localItems.filter((item) =>
        item.id.startsWith(`${VITALS_COND_PREFIX}token-1/`)
      );
      expect(currentBadges).toHaveLength(2);
      expect(currentBadges.map((item) => item.name)).toEqual([
        "Condition: Poisoned",
        "Condition: Frightened",
      ]);
    });

    syncMocks.conditions = ["poisoned"];
    syncMocks.sceneItems = syncMocks.sceneItems.map((item) => item.id === "token-1"
      ? {
          ...item,
          metadata: {
            ...item.metadata,
            "com.fullstackboi.spellcasting/vitals": {
              hpCurrent: 12,
              hpMax: 20,
              conditions: syncMocks.conditions,
            },
          },
        }
      : item);
    syncMocks.itemsChanged?.(syncMocks.sceneItems);

    await vi.waitFor(() => {
      const currentBadges = syncMocks.localItems.filter((item) =>
        item.id.startsWith(`${VITALS_COND_PREFIX}token-1/`)
      );
      expect(currentBadges).toHaveLength(1);
      expect(currentBadges[0].name).toBe("Condition: Poisoned");
    });
    expect(syncMocks.deletedIds).toContain(`${VITALS_COND_PREFIX}token-1/1`);
    expect(syncMocks.localItems.some((item) => item.id === `${VITALS_COND_PREFIX}token-1/1`)).toBe(false);
    expect(syncMocks.boundsFetchCount).toBe(boundsFetchCount);
    expect(syncMocks.metadataFetchCount).toBe(metadataFetchCount);
    stopSync();
  });

  it("falls back to full synchronization when the changed token has no cached geometry", async () => {
    syncMocks.playerRole = "GM";
    syncMocks.hidden = false;
    syncMocks.noVitals = true;
    syncMocks.localItems = [];
    const stopSync = setupTokenVitalsSync();

    await vi.waitFor(() => {
      expect(syncMocks.itemsChanged).toBeTypeOf("function");
      expect(syncMocks.sceneFetchCount).toBeGreaterThan(0);
    });

    const sceneFetchCount = syncMocks.sceneFetchCount;
    syncMocks.noVitals = false;
    syncMocks.conditions = ["poisoned"];
    syncMocks.sceneItems = syncMocks.sceneItems.map((item) => item.id === "token-1"
      ? {
          ...item,
          metadata: {
            ...item.metadata,
            "com.fullstackboi.spellcasting/vitals": {
              hpCurrent: 12,
              hpMax: 20,
              conditions: syncMocks.conditions,
            },
          },
        }
      : item);
    syncMocks.itemsChanged?.(syncMocks.sceneItems);

    await vi.waitFor(() => {
      expect(syncMocks.localItems.some((item) => item.id === `${VITALS_COND_PREFIX}token-1/0`)).toBe(true);
    });
    expect(syncMocks.sceneFetchCount).toBeGreaterThan(sceneFetchCount);
    stopSync();
  });

  it("keeps health overlays synchronized when adding a status badge fails", async () => {
    syncMocks.conditions = ["poisoned"];
    syncMocks.failStatusAdd = true;
    syncMocks.hidden = false;
    const stopSync = setupTokenVitalsSync();

    await vi.waitFor(() => {
      expect(syncMocks.addedIds).toContain(`${VITALS_FILL_PREFIX}token-1`);
    });

    expect(syncMocks.localItems.some((item) => item.id === `${VITALS_FILL_PREFIX}token-1`)).toBe(true);
    expect(syncMocks.localItems.some((item) => item.id.startsWith(VITALS_COND_PREFIX))).toBe(false);
    stopSync();
  });
});
