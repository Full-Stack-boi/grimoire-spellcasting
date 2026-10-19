import OBR from "@owlbear-rodeo/sdk";
import { setupDefaultCasterMenuOption, setupEffectsTool, setupElevationMenuOption } from "./effectsTool";
import { setupDDBTokenContextMenuOption } from "./services/ddbService";
import { setupPlayerCharacterContextMenus } from "./features/player/playerCharacterService";
import {
  sendSpellsUpdate,
  setupGMLocalSpells,
  setupPlayerLocalSpells,
} from "./effects/localSpells";
import { constants } from "./constants";
import { setupMessageListener } from "./effects/messageListener";
import {
  DDB_ROLL_CHANNEL,
  openDDBRollLogPopover,
  saveStoredRollHistory,
  applyRollLogUpdate,
  syncDDBRollLogViewport,
} from "./services/rollLogService";
import { checkAndFireMovementTriggers } from "./services/conditionalTriggerService";
import { setupDarknessVisionHandler } from "./features/targeting/infrastructure/obr/darknessVisionHandler";
import { setupTurnIndicatorSync } from "./features/combat/overlays/turnIndicatorRenderer";
import { setupTokenVitalsSync } from "./features/combat/overlays/tokenVitalsRenderer";
import { subscribeToEncounter } from "./features/combat/initiativeService";
import {
  syncTopTurnTrackerPopover,
  syncTopTurnTrackerViewport,
  closeTopTurnTrackerPopover,
} from "./features/combat/turnTrackerPopoverService";
import {
  syncActionDockViewport,
  prewarmActionDock,
  destroyActionDock,
  updateCachedViewportSize,
} from "./components/ActionDock/domain/popover";

function loadSpellListFromLocalStorage() {
  // Update scene metadata
  const spellListJSON = localStorage.getItem(constants.SPELL_LIST_METADATA_KEY);
  if (spellListJSON == undefined) {
    return;
  }
  const spellList = JSON.parse(spellListJSON);
  OBR.scene.setMetadata({ [constants.SPELL_LIST_METADATA_KEY]: spellList });
}

function setupLocalSpells(role: "GM" | "PLAYER") {
  if (role === "PLAYER") {
    return setupPlayerLocalSpells();
  } else if (role === "GM") {
    return setupGMLocalSpells();
  }
  return null;
}

import { setupTokenSizeContextMenu } from "./features/targeting/infrastructure/obr/tokenSizeContextMenu";
import { isCurrentClientArbitrator, setupArbitratorSync } from "./services/gmArbitratorService";
import { hasActiveMovementTriggers } from "./services/conditionalTriggerService";

function setupScene() {
  const unsubscribeArbitrator = setupArbitratorSync();
  setupDefaultCasterMenuOption();
  setupElevationMenuOption();
  setupDDBTokenContextMenuOption();
  setupPlayerCharacterContextMenus();
  setupTokenSizeContextMenu();
  const unsubscribeDarkness = setupDarknessVisionHandler();
  const unsubscribeTurnIndicator = setupTurnIndicatorSync();
  const unsubscribeVitals = setupTokenVitalsSync();
  const unsubscribePopoverSync = subscribeToEncounter(syncTopTurnTrackerPopover);
  loadSpellListFromLocalStorage();

  const prewarmTimer = window.setTimeout(() => {
    void prewarmActionDock().catch(() => {});
  }, 1000);

  let interval: number | null = null;
  let lastRole: string | null = null;
  let lastId: string | null = null;
  let isInitializing = true;
  let unsubscribeTool: (() => void) | null = null;
  let unsubscribeLocalSpells: (() => void) | null = null;

  Promise.all([OBR.player.getRole(), OBR.player.getId()]).then(([role, id]) => {
    lastRole = role;
    lastId = id;
    unsubscribeTool = setupEffectsTool(role, id);
    unsubscribeLocalSpells = setupLocalSpells(role);

    if (role === "GM") {
      interval = window.setInterval(async () => {
        if (isCurrentClientArbitrator()) {
          sendSpellsUpdate("all");
        }
      }, 30000);
    }

    isInitializing = false;
  });

  const unsubscribePlayer = OBR.player.onChange((player) => {
    if (isInitializing) return;
    if (player.role === lastRole && player.id === lastId) return;

    lastRole = player.role;
    lastId = player.id;

    if (unsubscribeTool) {
      unsubscribeTool();
    }
    if (unsubscribeLocalSpells) {
      unsubscribeLocalSpells();
    }
    if (interval !== null) {
      clearInterval(interval);
    }

    unsubscribeTool = setupEffectsTool(player.role, player.id);
    unsubscribeLocalSpells = setupLocalSpells(player.role);
    if (player.role === "GM") {
      interval = window.setInterval(async () => {
        if (isCurrentClientArbitrator()) {
          sendSpellsUpdate("all");
        }
      }, 30000);
    }
  });

  const lastBackgroundPositions = new Map<string, { x: number; y: number }>();
  let bgDpi = 400;
  OBR.scene.grid
    .getDpi()
    .then((d) => {
      bgDpi = d;
    })
    .catch(() => {});
  const unsubGrid = OBR.scene.grid.onChange((g) => {
    bgDpi = g.dpi;
  });

  // Seed initial positions so static items do not trigger movement on startup
  OBR.scene.items
    .getItems()
    .then((items) => {
      for (const item of items) {
        lastBackgroundPositions.set(item.id, {
          x: item.position.x,
          y: item.position.y,
        });
      }
    })
    .catch(() => {});

  const unsubItems = OBR.scene.items.onChange((items) => {
    if (!isCurrentClientArbitrator()) return;
    if (!hasActiveMovementTriggers()) return;

    for (const item of items) {
      const prev = lastBackgroundPositions.get(item.id);
      if (prev && (prev.x !== item.position.x || prev.y !== item.position.y)) {
        void checkAndFireMovementTriggers(item.id, item.position, bgDpi).catch(
          () => {},
        );
      }
      lastBackgroundPositions.set(item.id, {
        x: item.position.x,
        y: item.position.y,
      });
    }
  });

  return () => {
    window.clearTimeout(prewarmTimer);
    void destroyActionDock().catch(() => {});
    if (interval !== null) clearInterval(interval);
    unsubscribeArbitrator();
    unsubscribePlayer();
    unsubscribeTool?.();
    unsubscribeDarkness?.();
    unsubscribeTurnIndicator?.();
    unsubscribeVitals?.();
    unsubscribePopoverSync?.();
    closeTopTurnTrackerPopover();
    unsubGrid();
    unsubItems();
  };
}

function setupViewportResizeSync(): () => void {
  let lastWidth = 0;
  let lastHeight = 0;
  let resizeTimeout: number | null = null;

  const checkViewport = async () => {
    try {
      const [w, h] = await Promise.all([
        OBR.viewport.getWidth(),
        OBR.viewport.getHeight(),
      ]);
      if (!w || !h || w <= 0 || h <= 0) return;

      if (lastWidth === 0 && lastHeight === 0) {
        lastWidth = w;
        lastHeight = h;
        updateCachedViewportSize(w, h);
        return;
      }

      if (Math.abs(w - lastWidth) >= 4 || Math.abs(h - lastHeight) >= 4) {
        lastWidth = w;
        lastHeight = h;
        updateCachedViewportSize(w, h);

        if (resizeTimeout !== null) {
          window.clearTimeout(resizeTimeout);
        }

        resizeTimeout = window.setTimeout(async () => {
          resizeTimeout = null;
          await Promise.all([
            syncActionDockViewport(w, h).catch(() => {}),
            syncDDBRollLogViewport(w, h).catch(() => {}),
            syncTopTurnTrackerViewport(w, h).catch(() => {}),
          ]);
        }, 100);
      }
    } catch {}
  };

  const intervalId = window.setInterval(checkViewport, 1500);
  void checkViewport();

  const handleWindowResize = () => {
    void checkViewport();
  };
  window.addEventListener("resize", handleWindowResize);

  return () => {
    window.clearInterval(intervalId);
    window.removeEventListener("resize", handleWindowResize);
    if (resizeTimeout !== null) {
      window.clearTimeout(resizeTimeout);
    }
  };
}

function setup() {
  if (window.interactionRecord) {
    window.interactionRecord.clear();
  } else {
    window.interactionRecord = new Map();
  }

  setupMessageListener();
  setupViewportResizeSync();

  OBR.broadcast.onMessage(DDB_ROLL_CHANNEL, async (event) => {
    const payload =
      event.data as import("./types/ddbRollLog").DDBRollLogPayload;
    const myId = await OBR.player.getId().catch(() => null);
    if (payload?.senderId && myId && payload.senderId === myId) {
      return;
    }
    if (payload?.update) {
      applyRollLogUpdate(payload.update);
    }
    if (payload?.cards && Array.isArray(payload.cards) && payload.cards.length > 0) {
      saveStoredRollHistory(payload.cards);
      openDDBRollLogPopover();
    }
  });

  let unsubscribe: (() => void) | null = null;
  OBR.scene.isReady().then((ready) => {
    if (ready) {
      unsubscribe = setupScene();
    }
  });
  OBR.scene.onReadyChange((ready) => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    if (ready) {
      unsubscribe = setupScene();
    }
  });
}

OBR.onReady(setup);
