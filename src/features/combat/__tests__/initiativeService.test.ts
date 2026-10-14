import { describe, it, expect } from "vitest";
import {
  advanceTurn,
  previousTurn,
  sortCombatants,
  extractEncounterFromMetadata,
  createEncounter,
  addCombatantsToEncounter,
  removeCombatantFromEncounter,
  updateCombatantInEncounter,
  rollEncounterInitiativePure,
  rollInitiativeDice,
  rollCombatantInitiativePure,
  buildCombatantFromItem,
  ENCOUNTER_METADATA_KEY,
  LEGACY_ENCOUNTER_METADATA_KEY,
} from "../initiativeService";
import type { Combatant, CombatEncounter } from "../domain/types";

describe("initiativeService pure logic", () => {
  const alice: Combatant = {
    id: "token-1",
    name: "Alice",
    initiative: 18,
    initiativeBonus: 3,
    hpCurrent: 24,
    hpMax: 24,
    ac: 15,
  };

  const bob: Combatant = {
    id: "token-2",
    name: "Bob",
    initiative: 14,
    initiativeBonus: 2,
    hpCurrent: 30,
    hpMax: 30,
    ac: 16,
  };

  const charlie: Combatant = {
    id: "token-3",
    name: "Charlie",
    initiative: 18,
    initiativeBonus: 4, // Higher bonus tie breaker than Alice!
    hpCurrent: 18,
    hpMax: 18,
    ac: 13,
  };

  const goblin: Combatant = {
    id: "token-4",
    name: "Goblin",
    initiative: 14,
    initiativeBonus: 2, // Tied with Bob on initiative and bonus -> name tie breaker
    hpCurrent: 7,
    hpMax: 7,
    ac: 15,
  };

  it("sorts combatants by initiative descending, then bonus, then name", () => {
    const list = [bob, alice, goblin, charlie];
    const sorted = sortCombatants(list);

    // Charlie (18, bonus 4) > Alice (18, bonus 3) > Bob (14, bonus 2) > Goblin (14, bonus 2)
    expect(sorted.map((c) => c.name)).toEqual(["Charlie", "Alice", "Bob", "Goblin"]);
  });

  it("advances turn correctly and increments round on wrap-around", () => {
    const encounter: CombatEncounter = {
      id: "enc-1",
      isActive: true,
      round: 1,
      turnIndex: 0,
      combatants: [charlie, alice, bob],
      updatedAt: 100,
    };

    // Charlie's turn -> Alice's turn
    const turn1 = advanceTurn(encounter);
    expect(turn1.round).toBe(1);
    expect(turn1.turnIndex).toBe(1);

    // Alice's turn -> Bob's turn
    const turn2 = advanceTurn(turn1);
    expect(turn2.round).toBe(1);
    expect(turn2.turnIndex).toBe(2);

    // Bob's turn -> Wraps to Charlie at Round 2!
    const turn3 = advanceTurn(turn2);
    expect(turn3.round).toBe(2);
    expect(turn3.turnIndex).toBe(0);
  });

  it("reverts to previous turn and decrements round if wrapping backwards", () => {
    const encounterRound2: CombatEncounter = {
      id: "enc-1",
      isActive: true,
      round: 2,
      turnIndex: 0,
      combatants: [charlie, alice, bob],
      updatedAt: 200,
    };

    // Reverting from Round 2 Turn 0 (Charlie) -> Round 1 Turn 2 (Bob)
    const prev = previousTurn(encounterRound2);
    expect(prev.round).toBe(1);
    expect(prev.turnIndex).toBe(2);

    // Reverting within same round
    const prev2 = previousTurn(prev);
    expect(prev2.round).toBe(1);
    expect(prev2.turnIndex).toBe(1);
  });

  it("does not decrement below round 1 turn 0", () => {
    const encounterRound1: CombatEncounter = {
      id: "enc-1",
      isActive: true,
      round: 1,
      turnIndex: 0,
      combatants: [charlie, alice],
      updatedAt: 100,
    };

    const prev = previousTurn(encounterRound1);
    expect(prev.round).toBe(1);
    expect(prev.turnIndex).toBe(0);
  });

  it("extracts encounter from modern scoped metadata", () => {
    const mockEncounter: CombatEncounter = {
      id: "enc-test",
      isActive: true,
      round: 1,
      turnIndex: 0,
      combatants: [alice],
      updatedAt: 500,
    };

    const metadata = {
      [ENCOUNTER_METADATA_KEY]: mockEncounter,
    };

    const extracted = extractEncounterFromMetadata(metadata);
    expect(extracted).toEqual(mockEncounter);
  });

  it("extracts encounter from legacy metadata fallback", () => {
    const legacyEncounter: CombatEncounter = {
      id: "enc-legacy",
      isActive: true,
      round: 3,
      turnIndex: 1,
      combatants: [bob],
      updatedAt: 400,
    };

    const metadata = {
      [LEGACY_ENCOUNTER_METADATA_KEY]: legacyEncounter,
    };

    const extracted = extractEncounterFromMetadata(metadata);
    expect(extracted).toEqual(legacyEncounter);
  });

  it("creates a new encounter properly sorted", () => {
    const enc = createEncounter([bob, alice]);
    expect(enc.isActive).toBe(true);
    expect(enc.round).toBe(1);
    expect(enc.turnIndex).toBe(0);
    expect(enc.combatants[0].name).toBe("Alice");
    expect(enc.combatants[1].name).toBe("Bob");
  });

  it("adds combatants and preserves active combatant index", () => {
    const enc = createEncounter([alice, bob]);
    // Active turn on Bob (turnIndex = 1)
    const encOnBob = { ...enc, turnIndex: 1 };
    // Add Charlie (initiative 18, tie 4 > Alice) -> new order: Charlie, Alice, Bob
    const updated = addCombatantsToEncounter(encOnBob, [charlie]);
    expect(updated.combatants.map((c) => c.name)).toEqual(["Charlie", "Alice", "Bob"]);
    // Bob should still be the active combatant! Bob is at index 2 now
    expect(updated.turnIndex).toBe(2);
    expect(updated.combatants[updated.turnIndex].name).toBe("Bob");
  });

  it("removes combatant and safely adjusts turnIndex", () => {
    const enc = createEncounter([charlie, alice, bob]);
    // Turn is on Bob (index 2)
    const encOnBob = { ...enc, turnIndex: 2 };
    // Remove Alice (index 1) -> Bob shifts to index 1
    const updated = removeCombatantFromEncounter(encOnBob, "token-1");
    expect(updated.combatants.map((c) => c.name)).toEqual(["Charlie", "Bob"]);
    expect(updated.turnIndex).toBe(1);
    expect(updated.combatants[updated.turnIndex].name).toBe("Bob");
  });

  it("updates combatant vitals", () => {
    const enc = createEncounter([alice]);
    const updated = updateCombatantInEncounter(enc, "token-1", { hpCurrent: 12, conditions: ["Prone"] });
    expect(updated.combatants[0].hpCurrent).toBe(12);
    expect(updated.combatants[0].conditions).toEqual(["Prone"]);
  });

  it("rolls initiative deterministically with roll map", () => {
    const enc = createEncounter([alice, bob]);
    // Alice has bonus 3, Bob has bonus 2
    // If Alice rolls 5 (total 8) and Bob rolls 15 (total 17) -> Bob goes first!
    const updated = rollEncounterInitiativePure(enc, {
      "token-1": 5,
      "token-2": 15,
    });
    expect(updated.combatants[0].name).toBe("Bob");
    expect(updated.combatants[0].initiative).toBe(17);
    expect(updated.combatants[1].name).toBe("Alice");
    expect(updated.combatants[1].initiative).toBe(8);
  });

  it("builds combatant correctly from DDB vs standard token item", () => {
    const tokenItem = { id: "tok-1", name: "Custom Orc", image: { url: "orc.png" } };
    const genericCombatant = buildCombatantFromItem(tokenItem);
    expect(genericCombatant.name).toBe("Custom Orc");
    expect(genericCombatant.ac).toBe(10);
    expect(genericCombatant.isPlayer).toBe(false);

    const ddbChar = {
      name: "Shadowheart",
      avatarUrl: "sh.png",
      initiative: 2,
      armorClass: 18,
      hp: { current: 32, max: 32, temp: 0 },
    };
    const playerCombatant = buildCombatantFromItem(tokenItem, ddbChar);
    expect(playerCombatant.name).toBe("Shadowheart");
    expect(playerCombatant.ac).toBe(18);
    expect(playerCombatant.initiativeBonus).toBe(2);
    expect(playerCombatant.hpCurrent).toBe(32);
    expect(playerCombatant.isPlayer).toBe(true);
  });

  it("rolls initiative with Normal, Advantage, and Disadvantage correctly", () => {
    // Normal: 1d20
    const normal = rollInitiativeDice("normal", { d20_1: 12 });
    expect(normal.selectedD20).toBe(12);

    // Advantage: max(d1, d2)
    const adv = rollInitiativeDice("advantage", { d20_1: 7, d20_2: 18 });
    expect(adv.selectedD20).toBe(18);
    expect(adv.d20_1).toBe(7);
    expect(adv.d20_2).toBe(18);

    // Disadvantage: min(d1, d2)
    const disadv = rollInitiativeDice("disadvantage", { d20_1: 7, d20_2: 18 });
    expect(disadv.selectedD20).toBe(7);
    expect(disadv.d20_1).toBe(7);
    expect(disadv.d20_2).toBe(18);
  });

  it("rolls single combatant initiative with Advantage and updates encounter order", () => {
    const enc = createEncounter([alice, bob]);
    // Alice has bonus 3. Forced roll: d1=5, d2=16 -> Adv takes 16 -> total 19
    const { encounter: updated, rollResult } = rollCombatantInitiativePure(
      enc,
      "token-1",
      "advantage",
      { d20_1: 5, d20_2: 16 }
    );

    expect(rollResult).not.toBeNull();
    expect(rollResult?.selectedD20).toBe(16);
    expect(rollResult?.total).toBe(19);
    expect(updated.combatants[0].name).toBe("Alice");
    expect(updated.combatants[0].initiative).toBe(19);
  });

  it("rolls single combatant initiative with Disadvantage", () => {
    const enc = createEncounter([alice, bob]);
    // Alice has bonus 3. Forced roll: d1=18, d2=4 -> Disadv takes 4 -> total 7
    const { encounter: updated, rollResult } = rollCombatantInitiativePure(
      enc,
      "token-1",
      "disadvantage",
      { d20_1: 18, d20_2: 4 }
    );

    expect(rollResult).not.toBeNull();
    expect(rollResult?.selectedD20).toBe(4);
    expect(rollResult?.total).toBe(7);
    // Bob has initiative 14, Alice now has 7 -> Bob is first!
    expect(updated.combatants[0].name).toBe("Bob");
    expect(updated.combatants[1].name).toBe("Alice");
  });
});

