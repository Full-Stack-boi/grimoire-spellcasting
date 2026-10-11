import { APP_KEY, LEGACY_APP_KEY } from "../../config";
import type { Metadata } from "@owlbear-rodeo/sdk";

/**
 * Universal scoped metadata reader with transparent fallback to legacy namespace.
 *
 * Checks `${APP_KEY}/${keySuffix}` first, and falls back to `${LEGACY_APP_KEY}/${keySuffix}`
 * if the item was saved in older sessions.
 */
export function getScopedMetadata<T = unknown>(
  metadata: Metadata | undefined,
  keySuffix: string,
): T | undefined {
  if (!metadata) return undefined;
  const primaryKey = `${APP_KEY}/${keySuffix}`;
  if (primaryKey in metadata) {
    return metadata[primaryKey] as T;
  }
  const legacyKey = `${LEGACY_APP_KEY}/${keySuffix}`;
  return metadata[legacyKey] as T | undefined;
}

/**
 * Generates the primary metadata key for writing new values.
 */
export function getMetadataKey(keySuffix: string): string {
  return `${APP_KEY}/${keySuffix}`;
}
