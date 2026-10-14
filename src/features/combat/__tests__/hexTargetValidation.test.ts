import { describe, it, expect } from "vitest";
import { isTargetHexed, type EmbersCombatState } from "../../../services/combatStateService";
import { aggregateSubRollDamages } from "../domain/multiTargetDamage";
import type { DDBSubRollEntry } from "../../../types/ddbRollLog";

describe("Hex Target-Specific Validation & Damage Isolation", () => {
  const baseCombatState: EmbersCombatState = {
    characterId: 170484944,
    spellSlotsUsed: {},
    createdSpellSlots: {},
    pactSlotsUsed: 0,
    featureUses: {},
    hpCurrent: 35,
    hpMax: 35,
    hpTemp: 0,
    actionUsed: false,
    bonusActionUsed: false,
    heroicInspiration: false,
    concentrationSpellId: "hex",
    concentrationSpellName: "Hex (Dexterity)",
    hexTargetId: "token-goblin-chief",
    hexTargetName: "Goblin Chief",
    hexAbility: "dexterity",
    deathSaves: { successes: 0, failures: 0 },
    hitDiceUsed: {},
    exhaustionLevel: 0,
    conditions: [],
    lastUpdated: new Date().toISOString(),
  };

  describe("isTargetHexed validation", () => {
    it("returns true only when targetId exactly matches hexTargetId of an active Hex", () => {
      expect(isTargetHexed(baseCombatState, "token-goblin-chief")).toBe(true);
    });

    it("returns false when targetId does NOT match hexTargetId (Monk & Fiend case)", () => {
      // User scenario: Caster is concentrating on Hex on someone else, but attacks Monk and Fiend
      expect(isTargetHexed(baseCombatState, "token-monk")).toBe(false);
      expect(isTargetHexed(baseCombatState, "token-fiend")).toBe(false);
      expect(isTargetHexed(baseCombatState, undefined)).toBe(false);
      expect(isTargetHexed(baseCombatState, null)).toBe(false);
    });

    it("returns false if caster is not concentrating on Hex", () => {
      const nonHexState: EmbersCombatState = {
        ...baseCombatState,
        concentrationSpellId: "bless",
        concentrationSpellName: "Bless",
      };
      expect(isTargetHexed(nonHexState, "token-goblin-chief")).toBe(false);
    });

    it("returns false if hexTargetId is empty or null", () => {
      const unattachedHexState: EmbersCombatState = {
        ...baseCombatState,
        hexTargetId: null,
      };
      expect(isTargetHexed(unattachedHexState, "token-goblin-chief")).toBe(false);
    });

    it("returns false if state is null or undefined", () => {
      expect(isTargetHexed(null, "token-goblin-chief")).toBe(false);
      expect(isTargetHexed(undefined, "token-goblin-chief")).toBe(false);
    });
  });

  describe("Multi-Beam Eldritch Blast Hex Isolation", () => {
    it("allocates damage to each target correctly without leaking Hex to non-hexed targets", () => {
      // Simulate 2 beams: Beam 1 to Monk (not hexed), Beam 2 to Fiend (not hexed)
      const subRolls: DDBSubRollEntry[] = [
        {
          unitLabel: "BEAM 1",
          targetName: "Monk",
          targetId: "token-monk",
          toHit: { total: 20, diceBreakdown: "14 + 6", isHit: true },
          damage: { total: 5, damageType: "Force", diceBreakdown: "2 + 3" },
          // Notice: No Hex rider because isTargetHexed('token-monk') is false!
        },
        {
          unitLabel: "BEAM 2",
          targetName: "Fiend",
          targetId: "token-fiend",
          toHit: { total: 21, diceBreakdown: "15 + 6", isHit: true },
          damage: { total: 13, damageType: "Force", diceBreakdown: "10 + 3" },
          // Notice: No Hex rider because isTargetHexed('token-fiend') is false!
        },
      ];

      const targetMap = aggregateSubRollDamages(subRolls);
      expect(targetMap.size).toBe(2);

      const monkAlloc = targetMap.get("token-monk");
      expect(monkAlloc?.totalDamage).toBe(5);
      expect(monkAlloc?.targetName).toBe("Monk");

      const fiendAlloc = targetMap.get("token-fiend");
      expect(fiendAlloc?.totalDamage).toBe(13);
      expect(fiendAlloc?.targetName).toBe("Fiend");
    });

    it("applies Hex only to the target that actually has Hex", () => {
      // Simulate: Fiend is hexed, Monk is not hexed
      const subRolls: DDBSubRollEntry[] = [
        {
          unitLabel: "BEAM 1",
          targetName: "Monk",
          targetId: "token-monk",
          toHit: { total: 20, diceBreakdown: "14 + 6", isHit: true },
          damage: { total: 5, damageType: "Force", diceBreakdown: "2 + 3" },
        },
        {
          unitLabel: "BEAM 2",
          targetName: "Fiend",
          targetId: "token-fiend",
          toHit: { total: 21, diceBreakdown: "15 + 6", isHit: true },
          damage: { total: 13, damageType: "Force", diceBreakdown: "10 + 3" },
          extraDamage: [
            {
              name: "Hex",
              total: 5,
              damageType: "Necrotic",
              diceBreakdown: "5",
              formula: "1d6 Necrotic",
            },
          ],
        },
      ];

      const targetMap = aggregateSubRollDamages(subRolls);
      expect(targetMap.size).toBe(2);

      // Monk takes only 5 Force
      expect(targetMap.get("token-monk")?.totalDamage).toBe(5);

      // Fiend takes 13 Force + 5 Hex Necrotic = 18 total
      expect(targetMap.get("token-fiend")?.totalDamage).toBe(18);
    });
  });
});
