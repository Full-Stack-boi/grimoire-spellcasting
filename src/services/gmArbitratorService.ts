import OBR from "@owlbear-rodeo/sdk";

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

    if (uniqueGMs.length > 0) {
      return myRole === "GM" && uniqueGMs[0] === myId;
    }

    const allPlayerIds = [...new Set([myId, ...players.map((p) => p.id)])].sort();
    return allPlayerIds[0] === myId;
  } catch {
    return true;
  }
}
