import OBR from "@owlbear-rodeo/sdk";

let cachedIsArbitrator = false;
let isInitialized = false;

/**
 * Checks whether the local client is the primary GM arbitrator.
 * When multiple DMs/GMs are online, only the primary GM (first sorted GM ID)
 * executes automated triggers, sync loops, or background actions.
 * If no GMs are online, falls back to the lowest player ID.
 */
export async function isDesignatedTriggerArbitrator(): Promise<boolean> {
  try {
    const myRole = await OBR.player.getRole();
    const myId = await OBR.player.getId();
    const players = await OBR.party.getPlayers();

    const gmPlayerIds = players.filter((p) => p.role === "GM").map((p) => p.id);
    if (myRole === "GM") {
      gmPlayerIds.push(myId);
    }
    const uniqueGMs = [...new Set(gmPlayerIds)].sort();

    let result = false;
    if (uniqueGMs.length > 0) {
      result = myRole === "GM" && uniqueGMs[0] === myId;
    } else {
      const allPlayerIds = [...new Set([myId, ...players.map((p) => p.id)])].sort();
      result = allPlayerIds[0] === myId;
    }
    cachedIsArbitrator = result;
    isInitialized = true;
    return result;
  } catch {
    cachedIsArbitrator = true;
    isInitialized = true;
    return true;
  }
}

/**
 * Fast, synchronous check for high-frequency loops (e.g. OBR.scene.items.onChange).
 * Eliminates 3 async IPC bridge calls per frame during token movement.
 */
export function isCurrentClientArbitrator(): boolean {
  if (!isInitialized) {
    void isDesignatedTriggerArbitrator();
    return true;
  }
  return cachedIsArbitrator;
}

/**
 * Subscribes to player and party changes to keep cached arbitrator status fresh.
 */
export function setupArbitratorSync(): () => void {
  void isDesignatedTriggerArbitrator();

  const unsubPlayer = OBR.player.onChange(() => {
    void isDesignatedTriggerArbitrator();
  });
  const unsubParty = OBR.party.onChange(() => {
    void isDesignatedTriggerArbitrator();
  });

  return () => {
    unsubPlayer();
    unsubParty();
  };
}
