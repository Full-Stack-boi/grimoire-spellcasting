import type { Item, Vector2 } from "@owlbear-rodeo/sdk";
import { APP_KEY } from "../../../config";
import { extractEncounterFromMetadata } from "../initiativeService";

export const TURN_INDICATOR_RING_ID = `${APP_KEY}/active-turn-ring`;
export const TURN_INDICATOR_GLOW_ID = `${APP_KEY}/active-turn-glow`;

async function getOBR() {
  const sdk = await import("@owlbear-rodeo/sdk");
  return {
    OBR: sdk.default,
    buildShape: sdk.buildShape,
  };
}

export interface TurnIndicatorGeometry {
  center: Vector2;
  radius: number;
}

/**
 * Pure function: Calculates center coordinate and ring radius for a given token item.
 */
export function calculateTurnIndicatorGeometry(
  item: {
    position: Vector2;
    grid?: { dpi?: number };
    image?: { width?: number; height?: number };
    scale?: { x?: number; y?: number };
  },
  defaultDpi = 150
): TurnIndicatorGeometry {
  const dpi = item.grid?.dpi ?? defaultDpi;
  const scaleX =
    item.scale && typeof item.scale.x === "number" ? Math.abs(item.scale.x) : 1;
  const scaleY =
    item.scale && typeof item.scale.y === "number" ? Math.abs(item.scale.y) : 1;
  const width =
    item.image && typeof item.image.width === "number"
      ? item.image.width * scaleX
      : dpi;
  const height =
    item.image && typeof item.image.height === "number"
      ? item.image.height * scaleY
      : dpi;
  const baseSize = Math.max(width, height);
  const radius = Math.max(dpi * 0.55, (baseSize / 2) * 1.15);

  return {
    center: {
      x: item.position.x + width / 2,
      y: item.position.y + height / 2,
    },
    radius,
  };
}

/**
 * Pure function: Constructs local OBR Shape items for the active turn golden indicator.
 */
export async function buildTurnRingItems(
  geometry: TurnIndicatorGeometry
): Promise<Item[]> {
  const { buildShape } = await getOBR();
  const diameter = geometry.radius * 2;

  // Outer glowing dashed ring (extension theme bright red #ef4444, rendered under token)
  const outerRing = buildShape()
    .id(TURN_INDICATOR_RING_ID)
    .shapeType("CIRCLE")
    .position(geometry.center)
    .width(diameter)
    .height(diameter)
    .strokeColor("#ef4444")
    .strokeWidth(3.5)
    .strokeOpacity(0.95)
    .strokeDash([10, 5])
    .fillColor("#000000")
    .fillOpacity(0.0)
    .layer("MOUNT")
    .disableHit(true)
    .locked(true)
    .build();

  // Subtle inner crimson accent ring (extension theme crimson #8b1d24, rendered under token)
  const innerGlow = buildShape()
    .id(TURN_INDICATOR_GLOW_ID)
    .shapeType("CIRCLE")
    .position(geometry.center)
    .width(diameter)
    .height(diameter)
    .strokeColor("#8b1d24")
    .strokeWidth(1.5)
    .strokeOpacity(0.8)
    .fillColor("#000000")
    .fillOpacity(0.0)
    .layer("MOUNT")
    .disableHit(true)
    .locked(true)
    .build();

  return [outerRing, innerGlow];
}

/**
 * Removes local turn indicator ring items from scene canvas.
 */
export async function clearActiveTurnIndicator(): Promise<void> {
  const { OBR } = await getOBR();
  if (!OBR.isReady) return;
  try {
    const existing = await OBR.scene.local.getItems();
    const idsToDelete = existing
      .filter((it) => it.id === TURN_INDICATOR_RING_ID || it.id === TURN_INDICATOR_GLOW_ID)
      .map((it) => it.id);
    if (idsToDelete.length > 0) {
      await OBR.scene.local.deleteItems(idsToDelete);
    }
  } catch {}
}

/**
 * Renders or updates the active turn golden ring underneath the active combatant token.
 */
export async function renderActiveTurnIndicator(
  activeTokenId: string | null
): Promise<void> {
  if (!activeTokenId) {
    await clearActiveTurnIndicator();
    return;
  }

  const { OBR } = await getOBR();
  if (!OBR.isReady) return;

  try {
    const items = await OBR.scene.items.getItems([activeTokenId]);
    const activeItem = items[0];
    if (!activeItem) {
      await clearActiveTurnIndicator();
      return;
    }

    let sceneDpi = 150;
    try {
      const grid = await OBR.scene.grid.getDpi();
      if (grid && grid > 0) sceneDpi = grid;
    } catch {}

    let geometry: TurnIndicatorGeometry;
    try {
      const bounds = await OBR.scene.items.getItemBounds([activeTokenId]);
      if (bounds && bounds.center && typeof bounds.center.x === "number") {
        const baseSize = Math.max(bounds.width || sceneDpi, bounds.height || sceneDpi);
        const radius = Math.max(sceneDpi * 0.55, (baseSize / 2) * 1.15);
        geometry = {
          center: bounds.center,
          radius,
        };
      } else {
        geometry = calculateTurnIndicatorGeometry(activeItem as any, sceneDpi);
      }
    } catch {
      geometry = calculateTurnIndicatorGeometry(activeItem as any, sceneDpi);
    }

    const ringItems = await buildTurnRingItems(geometry);

    const localItems = await OBR.scene.local.getItems();
    const existingIds = new Set(localItems.map((it) => it.id));

    const toAdd: Item[] = [];
    const toUpdate: Item[] = [];

    for (const item of ringItems) {
      if (existingIds.has(item.id)) {
        toUpdate.push(item);
      } else {
        toAdd.push(item);
      }
    }

    if (toAdd.length > 0) {
      await OBR.scene.local.addItems(toAdd);
    }
    if (toUpdate.length > 0) {
      await OBR.scene.local.updateItems(
        toUpdate.map((i) => i.id),
        (draftItems) => {
          for (let i = 0; i < draftItems.length; i++) {
            const newItem = toUpdate.find((u) => u.id === draftItems[i].id);
            if (newItem) {
              Object.assign(draftItems[i], newItem);
            }
          }
        }
      );
    }
  } catch {
    await clearActiveTurnIndicator();
  }
}

/**
 * Sets up a persistent subscription that synchronizes the map turn indicator
 * with the active encounter combatant whenever scene metadata or items change.
 */
export function setupTurnIndicatorSync(): () => void {
  let unsubscribed = false;
  let unsubscribeMetadata: (() => void) | null = null;
  let unsubscribeItems: (() => void) | null = null;
  let currentActiveId: string | null = null;

  async function checkAndUpdate() {
    if (unsubscribed) return;
    const { OBR } = await getOBR();
    if (!OBR.isReady) return;

    try {
      const metadata = await OBR.scene.getMetadata();
      const encounter = extractEncounterFromMetadata(metadata);
      if (!encounter || !encounter.isActive || encounter.combatants.length === 0) {
        currentActiveId = null;
        await clearActiveTurnIndicator();
        return;
      }

      const activeCombatant = encounter.combatants[encounter.turnIndex];
      const newActiveId = activeCombatant?.id ?? null;
      currentActiveId = newActiveId;
      await renderActiveTurnIndicator(newActiveId);
    } catch {}
  }

  getOBR().then(({ OBR }) => {
    if (unsubscribed) return;

    const init = () => {
      if (unsubscribed) return;
      checkAndUpdate();

      unsubscribeMetadata = OBR.scene.onMetadataChange(() => {
        checkAndUpdate();
      });

      unsubscribeItems = OBR.scene.items.onChange((items) => {
        if (currentActiveId && items.some((it) => it.id === currentActiveId)) {
          renderActiveTurnIndicator(currentActiveId);
        }
      });
    };

    if (OBR.isReady) {
      init();
    } else {
      OBR.onReady(init);
    }
  }).catch(() => {});

  return () => {
    unsubscribed = true;
    if (unsubscribeMetadata) unsubscribeMetadata();
    if (unsubscribeItems) unsubscribeItems();
    clearActiveTurnIndicator();
  };
}
