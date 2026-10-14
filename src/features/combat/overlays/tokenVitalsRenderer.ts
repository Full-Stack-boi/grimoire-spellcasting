import type { Item, Vector2 } from "@owlbear-rodeo/sdk";
import { APP_KEY } from "../../../config";
import { GLOBAL_STORAGE_KEYS } from "../../../components/Settings/settings";
import type { TokenVitals } from "../domain/types";
import { LEGACY_VITALS_METADATA_KEY, VITALS_METADATA_KEY, extractTokenVitals } from "../tokenVitalsService";
import { calculateDisplayedSpeed } from "../domain/temporaryCombatEffects";
import { getHpGradientColor } from "../tokenVitalsService";
import {
  getCombatBadgeAssetUrl,
  getCombatEffectBadgeUri,
  getConditionBadgeUri,
  type CombatBadge,
} from "../domain/conditionIcons";

export const VITALS_BG_PREFIX = `${APP_KEY}/vitals-bg/`;
export const VITALS_FILL_PREFIX = `${APP_KEY}/vitals-fill/`;
export const VITALS_TEMP_PREFIX = `${APP_KEY}/vitals-temp/`;
export const VITALS_TEXT_PREFIX = `${APP_KEY}/vitals-text/`;
export const VITALS_COND_PREFIX = `${APP_KEY}/vitals-cond/`;
export const VITALS_EFFECT_PREFIX = `${APP_KEY}/vitals-effect/`;
export const VITALS_CONCENTRATION_PREFIX = `${APP_KEY}/vitals-concentration/`;

const VITALS_ITEM_PREFIXES = [
  VITALS_BG_PREFIX,
  VITALS_FILL_PREFIX,
  VITALS_TEMP_PREFIX,
  VITALS_TEXT_PREFIX,
  VITALS_COND_PREFIX,
  VITALS_EFFECT_PREFIX,
  VITALS_CONCENTRATION_PREFIX,
];

async function getOBR() {
  const sdk = await import("@owlbear-rodeo/sdk");
  return {
    OBR: sdk.default,
    buildImage: sdk.buildImage,
    buildShape: sdk.buildShape,
    buildLabel: sdk.buildLabel,
    buildText: sdk.buildText,
  };
}

export interface VitalsBarGeometry {
  centerX: number;
  topY: number;
  barWidth: number;
  barHeight: number;
  dpi?: number;
}

/**
 * Pure function: Calculates geometry for floating health bar above a token.
 */
export function calculateVitalsBarGeometry(
  item: {
    position: Vector2;
    grid?: { dpi?: number };
    image?: { width?: number; height?: number };
    scale?: { x?: number; y?: number };
  },
  bounds?: { center: Vector2; width: number; height: number } | null,
  defaultDpi = 150
): VitalsBarGeometry {
  const dpi = item.grid?.dpi ?? defaultDpi;
  const scaleX = item.scale && typeof item.scale.x === "number" ? Math.abs(item.scale.x) : 1;

  let centerX: number;
  let topY: number;
  let tokenWidth: number;

  if (bounds && bounds.center && typeof bounds.center.x === "number") {
    centerX = bounds.center.x;
    tokenWidth = bounds.width || dpi;
    const tokenHeight = bounds.height || dpi;
    topY = bounds.center.y - tokenHeight / 2 - 16;
  } else {
    const width = item.image && typeof item.image.width === "number" ? item.image.width * scaleX : dpi;
    centerX = item.position.x + width / 2;
    topY = item.position.y - 16;
    tokenWidth = width;
  }

  const barWidth = Math.max(50, Math.min(130, tokenWidth * 0.85));
  const barHeight = 8;

  return {
    centerX,
    topY,
    barWidth,
    barHeight,
    dpi,
  };
}

/**
 * Pure function: Builds OBR items for a token's floating health bar, temp HP, text, and condition badges.
 */
export async function buildTokenVitalsItems(
  tokenId: string,
  vitals: TokenVitals,
  geometry: VitalsBarGeometry,
  playerRole: "GM" | "PLAYER" = "GM"
): Promise<Item[]> {
  const { buildImage, buildShape, buildLabel, buildText } = await getOBR();
  const items: Item[] = [];

  const { centerX, topY, barWidth, barHeight } = geometry;
  const hpCurrent = Math.max(0, vitals.hpCurrent);
  const hpMax = Math.max(1, vitals.hpMax);
  const hpTemp = vitals.hpTemp ?? 0;
  const ratio = Math.max(0, Math.min(1, hpCurrent / hpMax));
  const activeConditions = [...(vitals.conditions || [])];
  if (hpCurrent === 0 && !activeConditions.includes("dead") && !activeConditions.includes("unconscious")) {
    activeConditions.unshift("dead");
  }
  const activeEffects = vitals.effects ?? [];
  const statusCount = activeConditions.length + activeEffects.length + (vitals.concentration ? 1 : 0);
  const hasStatusBadges = statusCount > 0;
  const badgeSize = 44;
  const badgeGap = 4;
  const badgeRowWidth = barWidth * 1.5;
  const badgesPerRow = Math.max(
    1,
    Math.min(2, Math.floor((badgeRowWidth + badgeGap) / (badgeSize + badgeGap))),
  );
  const statusRowCount = Math.ceil(statusCount / badgesPerRow);

  // 1. Background frame bar (dark slate)
  const bgItem = buildShape()
    .id(`${VITALS_BG_PREFIX}${tokenId}`)
    .shapeType("RECTANGLE")
    .position({ x: centerX - barWidth / 2, y: topY })
    .width(barWidth)
    .height(barHeight)
    .strokeColor("#3b4252")
    .strokeWidth(1.5)
    .strokeOpacity(0.95)
    .fillColor("#0f172a")
    .fillOpacity(0.9)
    .layer("ATTACHMENT")
    .attachedTo(tokenId)
    .disableHit(true)
    .locked(true)
    .build();
  items.push(bgItem);

  // 2. Health fill bar
  const gradient = getHpGradientColor(hpCurrent, hpMax);
  const fillWidth = Math.max(0, barWidth * ratio);
  if (fillWidth > 0) {
    const fillItem = buildShape()
      .id(`${VITALS_FILL_PREFIX}${tokenId}`)
      .shapeType("RECTANGLE")
      .position({ x: centerX - barWidth / 2, y: topY })
      .width(fillWidth)
      .height(barHeight)
      .strokeColor(gradient.stroke)
      .strokeWidth(1)
      .strokeOpacity(0.9)
      .fillColor(gradient.fill)
      .fillOpacity(0.95)
      .layer("ATTACHMENT")
      .attachedTo(tokenId)
      .disableHit(true)
      .locked(true)
      .build();
    items.push(fillItem);
  }

  // 3. Temp HP overlay line/bracket (light blue atop the bar)
  if (hpTemp > 0) {
    const tempRatio = Math.min(1, hpTemp / hpMax);
    const tempWidth = barWidth * tempRatio;
    const tempItem = buildShape()
      .id(`${VITALS_TEMP_PREFIX}${tokenId}`)
      .shapeType("RECTANGLE")
      .position({ x: centerX - barWidth / 2, y: topY - 2 })
      .width(tempWidth)
      .height(2.5)
      .strokeColor("#0284c7")
      .strokeWidth(0.5)
      .fillColor("#38bdf8")
      .fillOpacity(1.0)
      .layer("ATTACHMENT")
      .attachedTo(tokenId)
      .disableHit(true)
      .locked(true)
      .build();
    items.push(tempItem);
  }

  // 4. HP Text label (exact numbers: e.g. "24/30 (+5)")
  const showNumbers = playerRole === "GM" || !vitals.hideNumbers;
  if (showNumbers) {
    const tempText = hpTemp > 0 ? ` (+${hpTemp})` : "";
    const hpLabel = `${hpCurrent}/${hpMax}${tempText}`;
    const textItem = buildText()
      .id(`${VITALS_TEXT_PREFIX}${tokenId}`)
      .plainText(hpLabel)
      .position({
        x: centerX,
        y: topY - (hasStatusBadges ? statusRowCount * (badgeSize + badgeGap) + 14 : 14),
      })
      .fontSize(10)
      .fontWeight(700)
      .textAlign("CENTER")
      .textAlignVertical("MIDDLE")
      .fillColor("#f8fafc")
      .strokeColor("#000000")
      .strokeWidth(2)
      .layer("TEXT")
      .attachedTo(tokenId)
      .disableHit(true)
      .locked(true)
      .build();
    items.push(textItem);
  }

  // 5. Status labels
  const statusBadges: Array<{ id: string; name: string; badge: CombatBadge }> = [];

  for (let i = 0; i < activeConditions.length; i++) {
    const condition = activeConditions[i];
    const badgeInfo = getConditionBadgeUri(condition);
    const exhaustionLevel = condition.trim().toLowerCase() === "exhaustion"
      ? vitals.exhaustionLevel ?? 0
      : 0;
    const conditionName = exhaustionLevel > 0
      ? `Condition: Exhaustion ${exhaustionLevel} (-${exhaustionLevel * 2} to D20 tests, -${exhaustionLevel * 5} ft. Speed)`
      : `Condition: ${badgeInfo.label}`;
    statusBadges.push({
      id: `${VITALS_COND_PREFIX}${tokenId}/${i}`,
      name: conditionName,
      badge: badgeInfo,
    });
  }

  if (vitals.concentration) {
    const badgeInfo = getCombatEffectBadgeUri("concentration");
    statusBadges.push({
      id: `${VITALS_CONCENTRATION_PREFIX}${tokenId}`,
      name: `Concentrating: ${vitals.concentration.spellName}`,
      badge: badgeInfo,
    });
  }

  for (let i = 0; i < activeEffects.length; i++) {
    const effect = activeEffects[i];
    const badgeInfo = getCombatEffectBadgeUri(effect.kind);
    const displayedSpeed = calculateDisplayedSpeed(
      vitals.speedFeet,
      vitals.conditions,
      vitals.exhaustionLevel ?? 0,
      activeEffects,
    );
    const speedLabel = displayedSpeed.speed === null
      ? `Speed reduced by ${effect.valueFeet} ft.`
      : `Speed ${displayedSpeed.speed} ft. (reduced by ${effect.valueFeet} ft.)`;
    statusBadges.push({
      id: `${VITALS_EFFECT_PREFIX}${tokenId}/${i}`,
      name: `${effect.name}: ${speedLabel} until ${effect.sourceName}'s next turn`,
      badge: badgeInfo,
    });
  }

  for (let i = 0; i < statusBadges.length; i++) {
    const badge = statusBadges[i];
    const row = Math.floor(i / badgesPerRow);
    const column = i % badgesPerRow;
    const badgesInRow = Math.min(badgesPerRow, statusBadges.length - row * badgesPerRow);
    const rowWidth = badgesInRow * badgeSize + (badgesInRow - 1) * badgeGap;
    const position = {
      x: centerX - rowWidth / 2 + column * (badgeSize + badgeGap),
      y: topY - badgeSize - 6 - row * (badgeSize + badgeGap),
    };

    try {
      const imageUrl = getCombatBadgeAssetUrl(badge.badge);
      const imageSize = 256;
      items.push(
        buildImage(
          {
            width: imageSize,
            height: imageSize,
            mime: "image/svg+xml",
            url: imageUrl,
          },
          {
            dpi: ((geometry.dpi ?? 150) * imageSize) / badgeSize,
            offset: { x: 0, y: 0 },
          },
        )
          .id(badge.id)
          .name(badge.name)
          .position(position)
          .layer("TEXT")
          .attachedTo(tokenId)
          .disableHit(true)
          .locked(true)
          .build()
      );
    } catch (error) {
      console.error(`[Vitals] Could not create the "${badge.badge.label}" icon item; falling back to a text badge.`, error);
      items.push(
        buildLabel()
          .id(badge.id)
          .name(badge.name)
          .plainText(badge.badge.label.toUpperCase())
          .position({ x: centerX, y: position.y + badgeSize / 2 })
          .padding(4)
          .fontSize(10)
          .fontWeight(700)
          .textAlign("CENTER")
          .textAlignVertical("MIDDLE")
          .fillColor("#fff7ed")
          .backgroundColor("#9a3412")
          .backgroundOpacity(1)
          .cornerRadius(6)
          .attachedTo(tokenId)
          .disableHit(true)
          .locked(true)
          .build()
      );
    }
  }

  return items;
}

/**
 * Removes all local floating health bar items for a specific token.
 */
export async function clearTokenVitals(tokenId: string): Promise<void> {
  const { OBR } = await getOBR();
  if (!OBR.isReady) return;
  try {
    const localItems = await OBR.scene.local.getItems();
    const toDelete = localItems
      .filter(
        (it) =>
          it.id === `${VITALS_BG_PREFIX}${tokenId}` ||
          it.id === `${VITALS_FILL_PREFIX}${tokenId}` ||
          it.id === `${VITALS_TEMP_PREFIX}${tokenId}` ||
          it.id === `${VITALS_TEXT_PREFIX}${tokenId}` ||
          it.id.startsWith(`${VITALS_COND_PREFIX}${tokenId}/`) ||
          it.id.startsWith(`${VITALS_EFFECT_PREFIX}${tokenId}/`) ||
          it.id === `${VITALS_CONCENTRATION_PREFIX}${tokenId}`
      )
      .map((it) => it.id);
    if (toDelete.length > 0) {
      await OBR.scene.local.deleteItems(toDelete);
    }
  } catch {}
}

/**
 * Clears all local floating health bar items from the scene.
 */
export async function clearAllTokenVitals(): Promise<void> {
  const { OBR } = await getOBR();
  if (!OBR.isReady) return;
  try {
    const localItems = await OBR.scene.local.getItems();
    const toDelete = localItems
      .filter(
        (it) =>
          it.id.startsWith(VITALS_BG_PREFIX) ||
          it.id.startsWith(VITALS_FILL_PREFIX) ||
          it.id.startsWith(VITALS_TEMP_PREFIX) ||
          it.id.startsWith(VITALS_TEXT_PREFIX) ||
          it.id.startsWith(VITALS_COND_PREFIX) ||
          it.id.startsWith(VITALS_EFFECT_PREFIX) ||
          it.id.startsWith(VITALS_CONCENTRATION_PREFIX)
      )
      .map((it) => it.id);
    if (toDelete.length > 0) {
      await OBR.scene.local.deleteItems(toDelete);
    }
  } catch {}
}

/**
 * Sets up a persistent subscription that renders and synchronizes floating health bars
 * for combatant and vitals tokens on the OBR scene.
 */
export function setupTokenVitalsSync(): () => void {
  let unsubscribed = false;
  let unsubscribeMetadata: (() => void) | null = null;
  let unsubscribeItems: (() => void) | null = null;
  let unsubscribePlayer: (() => void) | null = null;
  let observedSceneItems: Item[] | null = null;
  let cachedPlayerRole: "GM" | "PLAYER" | null = null;
  const cachedGeometry = new Map<string, VitalsBarGeometry>();
  const cachedVisibility = new Map<string, boolean>();
  const pendingTokenItems = new Map<string, Item>();
  let fullSyncPending = false;
  let drainRunning = false;

  async function checkAndUpdate(sceneItemsSnapshot?: Item[]) {
    if (unsubscribed) return;
    const { OBR } = await getOBR();
    if (!OBR.isReady) return;

    try {
      const playerRole = await OBR.player.getRole().catch(() => "PLAYER" as const);
      const items = sceneItemsSnapshot ?? await OBR.scene.items.getItems();
      const metadata = await OBR.scene.getMetadata();
      const { extractEncounterFromMetadata } = await import("../initiativeService");
      const { extractTokenVitals } = await import("../tokenVitalsService");
      const { isCharacterToken } = await import("../../player/playerCharacterService");

      const encounter = extractEncounterFromMetadata(metadata);
      const combatantMap = new Map((encounter?.combatants || []).map((c) => [c.id, c]));
      const hideVitalsInDarknessKey = `${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.HIDE_TOKEN_VITALS_IN_DARKNESS}`;
      const shouldHideVitalsInDarkness = playerRole !== "GM" && metadata[hideVitalsInDarknessKey] !== false;
      const hiddenTokenIds = new Set<string>();

      if (shouldHideVitalsInDarkness) {
        const [{ extractDarknessZones }, { resolveActiveCaster }, { isTokenHiddenByDarkness }] = await Promise.all([
          import("../../targeting/application/lineOfSightService"),
          import("../../targeting/infrastructure/obr/activeCasterResolver"),
          import("../../targeting/infrastructure/obr/darknessVisionHandler"),
        ]);
        const darknessZones = extractDarknessZones(items);
        if (darknessZones.length > 0) {
          const playerId = await OBR.player.getId();
          const activeCaster = await resolveActiveCaster("PLAYER", playerId, { purpose: "view" });
          const rawOpacityMode = metadata[`${APP_KEY}/settings/${GLOBAL_STORAGE_KEYS.DARKNESS_OPACITY_MODE}`];
          const opacityMode = rawOpacityMode === "always-transparent" || rawOpacityMode === "always-opaque"
            ? rawOpacityMode
            : "dynamic";

          for (const item of items) {
            if (await isTokenHiddenByDarkness(
              item,
              "PLAYER",
              playerId,
              activeCaster,
              darknessZones,
              opacityMode
            )) {
              hiddenTokenIds.add(item.id);
            }
          }
        }
      }

      let sceneDpi = 150;
      try {
        const grid = await OBR.scene.grid.getDpi();
        if (grid && grid > 0) sceneDpi = grid;
      } catch {}

      const allVitalsItems: Item[] = [];
      const nextCachedGeometry = new Map<string, VitalsBarGeometry>();
      const nextCachedVisibility = new Map<string, boolean>();
      const tokenItems = items.filter((item) =>
        isCharacterToken(item)
      );

      const tokenOverlays = await Promise.all(tokenItems.map(async (item) => {
        if (hiddenTokenIds.has(item.id)) {
          nextCachedVisibility.set(item.id, false);
          return null;
        }
        nextCachedVisibility.set(item.id, true);

        // Resolve vitals: direct metadata, or active encounter combatant
        let vitals = extractTokenVitals(item.metadata);
        if (!vitals) {
          const combatant = combatantMap.get(item.id);
          if (combatant && typeof combatant.hpMax === "number") {
            vitals = {
              hpCurrent: combatant.hpCurrent ?? combatant.hpMax,
              hpMax: combatant.hpMax,
              hpTemp: combatant.hpTemp ?? 0,
              armorClass: combatant.ac ?? 10,
              conditions: combatant.conditions ?? [],
              hideNumbers: false,
            };
          }
        }

        if (!vitals) return null;

        let geometry: VitalsBarGeometry;
        try {
          const bounds = await OBR.scene.items.getItemBounds([item.id]);
          geometry = calculateVitalsBarGeometry(item as any, bounds, sceneDpi);
        } catch {
          geometry = calculateVitalsBarGeometry(item as any, null, sceneDpi);
        }

        nextCachedGeometry.set(item.id, geometry);
        const tokenOverlayItems = await buildTokenVitalsItems(item.id, vitals, geometry, playerRole);
        return { tokenId: item.id, items: tokenOverlayItems };
      }));

      for (const tokenOverlay of tokenOverlays) {
        if (!tokenOverlay) continue;
        allVitalsItems.push(...tokenOverlay.items);
      }

      const localItems = await OBR.scene.local.getItems();
      const existingIds = new Set(localItems.map((it) => it.id));
      const targetIds = new Set(allVitalsItems.map((it) => it.id));

      // Remove obsolete items
      const toDelete = localItems
        .filter((it) => VITALS_ITEM_PREFIXES.some((prefix) => it.id.startsWith(prefix)) && !targetIds.has(it.id))
        .map((it) => it.id);

      if (toDelete.length > 0) {
        await OBR.scene.local.deleteItems(toDelete);
      }

      // Add or update
      const toAdd: Item[] = [];
      const toUpdate: Item[] = [];

      for (const item of allVitalsItems) {
        if (existingIds.has(item.id)) {
          toUpdate.push(item);
        } else {
          toAdd.push(item);
        }
      }

      const isStatusBadge = (item: Item) =>
        item.id.startsWith(VITALS_COND_PREFIX) ||
        item.id.startsWith(VITALS_EFFECT_PREFIX) ||
        item.id.startsWith(VITALS_CONCENTRATION_PREFIX);
      const addVitals = toAdd.filter((item) => !isStatusBadge(item));
      const addBadges = toAdd.filter(isStatusBadge);
      const updateVitals = toUpdate.filter((item) => !isStatusBadge(item));
      const updateBadges = toUpdate.filter(isStatusBadge);

      const addLocalItems = async (itemsToAdd: Item[], label: string) => {
        if (itemsToAdd.length === 0) return;
        try {
          await OBR.scene.local.addItems(itemsToAdd);
        } catch (error) {
          console.error(`Failed to add token ${label} overlays:`, error);
        }
      };
      const updateLocalItems = async (itemsToUpdate: Item[], label: string) => {
        if (itemsToUpdate.length === 0) return;
        try {
          await OBR.scene.local.updateItems(
            itemsToUpdate.map((item) => item.id),
            (draftItems) => {
              for (const draftItem of draftItems) {
                const newItem = itemsToUpdate.find((item) => item.id === draftItem.id);
                if (newItem) Object.assign(draftItem, newItem);
              }
            }
          );
        } catch (error) {
          console.error(`Failed to update token ${label} overlays:`, error);
        }
      };

      await Promise.all([
        addLocalItems(addVitals, "vitals"),
        addLocalItems(addBadges, "status"),
        updateLocalItems(updateVitals, "vitals"),
        updateLocalItems(updateBadges, "status"),
      ]);
      cachedPlayerRole = playerRole;
      cachedGeometry.clear();
      for (const [tokenId, geometry] of nextCachedGeometry) cachedGeometry.set(tokenId, geometry);
      cachedVisibility.clear();
      for (const [tokenId, isVisible] of nextCachedVisibility) cachedVisibility.set(tokenId, isVisible);
      if (!observedSceneItems) observedSceneItems = items;
    } catch (error) {
      console.error("Failed to synchronize token vitals overlays:", error);
    }
  }

  function getVitalsOnlyChanges(previousItems: Item[], nextItems: Item[]): Item[] | null {
    if (previousItems.length !== nextItems.length) return null;
    const previousById = new Map(previousItems.map((item) => [item.id, item]));
    const changedItems: Item[] = [];

    for (const item of nextItems) {
      const previous = previousById.get(item.id);
      if (!previous) return null;

      const previousMetadata = { ...(previous.metadata ?? {}) };
      const nextMetadata = { ...(item.metadata ?? {}) };
      const previousVitals = previousMetadata[VITALS_METADATA_KEY] ?? previousMetadata[LEGACY_VITALS_METADATA_KEY];
      const nextVitals = nextMetadata[VITALS_METADATA_KEY] ?? nextMetadata[LEGACY_VITALS_METADATA_KEY];
      delete previousMetadata[VITALS_METADATA_KEY];
      delete previousMetadata[LEGACY_VITALS_METADATA_KEY];
      delete nextMetadata[VITALS_METADATA_KEY];
      delete nextMetadata[LEGACY_VITALS_METADATA_KEY];

      const previousWithoutVitals = { ...previous, metadata: previousMetadata };
      const nextWithoutVitals = { ...item, metadata: nextMetadata };
      if (JSON.stringify(previousWithoutVitals) !== JSON.stringify(nextWithoutVitals)) return null;
      if (JSON.stringify(previousVitals) !== JSON.stringify(nextVitals)) changedItems.push(item);
    }

    return changedItems.length > 0 ? changedItems : null;
  }

  async function updateChangedTokens(items: Item[]) {
    const { OBR } = await getOBR();
    if (!OBR.isReady || !cachedPlayerRole) {
      fullSyncPending = true;
      return;
    }

    const { isCharacterToken } = await import("../../player/playerCharacterService");
    const nextOverlayItems: Item[] = [];
    for (const item of items) {
      if (!isCharacterToken(item)) {
        fullSyncPending = true;
        return;
      }
      if (cachedVisibility.get(item.id) === false) continue;
      const geometry = cachedGeometry.get(item.id);
      const vitals = extractTokenVitals(item.metadata);
      if (!geometry || !vitals) {
        fullSyncPending = true;
        return;
      }
      nextOverlayItems.push(...await buildTokenVitalsItems(item.id, vitals, geometry, cachedPlayerRole));
    }

    const localItems = await OBR.scene.local.getItems();
    const updatedTokenIds = new Set(items.map((item) => item.id));
    const existingTokenItems = localItems.filter((localItem) =>
      VITALS_ITEM_PREFIXES.some((prefix) =>
        Array.from(updatedTokenIds).some((tokenId) => {
          const itemId = `${prefix}${tokenId}`;
          return localItem.id === itemId || localItem.id.startsWith(`${itemId}/`);
        })
      )
    );
    const desiredIds = new Set(nextOverlayItems.map((item) => item.id));
    const toDelete = existingTokenItems
      .filter((item) => !desiredIds.has(item.id))
      .map((item) => item.id);
    const existingIds = new Set(existingTokenItems.map((item) => item.id));
    const toAdd = nextOverlayItems.filter((item) => !existingIds.has(item.id));
    const updatesById = new Map(nextOverlayItems.map((item) => [item.id, item]));
    const toUpdate = existingTokenItems.filter((item) => updatesById.has(item.id));

    if (toDelete.length > 0) await OBR.scene.local.deleteItems(toDelete);
    await Promise.all([
      toAdd.length > 0 ? OBR.scene.local.addItems(toAdd) : Promise.resolve(),
      toUpdate.length > 0
        ? OBR.scene.local.updateItems(
            toUpdate.map((item) => item.id),
            (draftItems) => {
              for (const draftItem of draftItems) {
                const updatedItem = updatesById.get(draftItem.id);
                if (updatedItem) Object.assign(draftItem, updatedItem);
              }
            }
          )
        : Promise.resolve(),
    ]);
  }

  async function drainSyncQueue() {
    if (drainRunning || unsubscribed) return;
    drainRunning = true;
    try {
      while (!unsubscribed && (fullSyncPending || pendingTokenItems.size > 0)) {
        if (fullSyncPending) {
          fullSyncPending = false;
          pendingTokenItems.clear();
          await checkAndUpdate();
          continue;
        }
        const changedItems = [...pendingTokenItems.values()];
        pendingTokenItems.clear();
        try {
          await updateChangedTokens(changedItems);
        } catch (error) {
          console.error("Failed to update changed token vitals overlays:", error);
          fullSyncPending = true;
        }
      }
    } finally {
      drainRunning = false;
      if (!unsubscribed && (fullSyncPending || pendingTokenItems.size > 0)) {
        void drainSyncQueue();
      }
    }
  }

  function queueFullSync() {
    fullSyncPending = true;
    pendingTokenItems.clear();
    void drainSyncQueue();
  }

  getOBR()
    .then(({ OBR }) => {
      if (unsubscribed) return;

      const init = () => {
        if (unsubscribed) return;
        queueFullSync();

        unsubscribeMetadata = OBR.scene.onMetadataChange(() => {
          queueFullSync();
        });

        unsubscribeItems = OBR.scene.items.onChange((items) => {
          const changedItems = observedSceneItems
            ? getVitalsOnlyChanges(observedSceneItems, items)
            : null;
          observedSceneItems = items;
          if (changedItems && changedItems.every((item) => cachedVisibility.has(item.id))) {
            for (const item of changedItems) pendingTokenItems.set(item.id, item);
            void drainSyncQueue();
            return;
          }
          queueFullSync();
        });
        unsubscribePlayer = OBR.player.onChange(() => {
          queueFullSync();
        });
      };

      if (OBR.isReady) {
        init();
      } else {
        OBR.onReady(init);
      }
    })
    .catch((error) => {
      console.error("Failed to initialize token vitals synchronization:", error);
    });

  return () => {
    unsubscribed = true;
    if (unsubscribeMetadata) unsubscribeMetadata();
    if (unsubscribeItems) unsubscribeItems();
    if (unsubscribePlayer) unsubscribePlayer();
    pendingTokenItems.clear();
    cachedGeometry.clear();
    cachedVisibility.clear();
    clearAllTokenVitals();
  };
}
