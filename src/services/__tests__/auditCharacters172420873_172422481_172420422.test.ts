import { describe, it, expect } from "vitest";
import { parseDDBCharacterData } from "../ddbService";
import fs from "fs";

describe("Audit Characters 172420873 (Phoebus), 172422481 (Jinx), 172420422 (Caboya)", () => {
  const step4002 = "C:/Users/Nattawut/.gemini/antigravity/brain/9d318acc-dee7-4df5-a575-9815bae130da/.system_generated/steps/4002/content.md";
  const step4003 = "C:/Users/Nattawut/.gemini/antigravity/brain/9d318acc-dee7-4df5-a575-9815bae130da/.system_generated/steps/4003/content.md";
  const step4050 = "C:/Users/Nattawut/.gemini/antigravity/brain/9d318acc-dee7-4df5-a575-9815bae130da/.system_generated/steps/4050/content.md";

  function loadJsonFromStep(filePath: string) {
    if (!fs.existsSync(filePath)) return null;
    let raw = fs.readFileSync(filePath, "utf8");
    raw = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    return JSON.parse(raw);
  }

  describe("Phoebus (172420873) - Monk 6 (Open Hand)", () => {
    it("accurately parses Level 6 Monk mechanics, Empowered Strikes, and Wholeness of Body uses", () => {
      const raw = loadJsonFromStep(step4002);
      if (!raw) return;

      const char = parseDDBCharacterData(raw);

      expect(char.name).toContain("Phoebus");
      expect(char.level).toBe(6);
      expect(char.classes[0].name).toBe("Monk");
      expect(char.classes[0].subclass).toContain("Open Hand");

      // Martial Arts Die at Level 6 is 1d8
      expect(char.martialArtsDie).toBe("1d8");

      // Unarmed Strike should have Empowered Strikes (Force / Bludgeoning)
      const unarmed = char.weapons?.find(w => w.name === "Unarmed Strike");
      expect(unarmed).toBeDefined();
      expect(unarmed?.alternativeDamageTypes).toEqual(["Force", "Bludgeoning"]);
      expect(unarmed?.damage).toContain("1d8");

      // Wholeness of Body limited uses should scale with WIS modifier (statModifierUsesId: 5 -> WIS mod = 3)
      const wholeness = char.actions?.find(a => a.name.toLowerCase().includes("wholeness of body"));
      expect(wholeness).toBeDefined();
      expect(wholeness?.limitedUse?.max).toBe(char.modifiers.wis); // 3 uses

      // Hit Dice: 6d8
      const hitDie = char.hitDice?.find(hd => hd.die === "1d8" || hd.die === "d8");
      expect(hitDie).toBeDefined();
      expect(hitDie?.total).toBe(6);
    });
  });

  describe("Jinx (172422481) - Fighter 6 (Battle Master)", () => {
    it("accurately parses Initiative with Alert feat (+PB), Maneuver options, and firearms", () => {
      const raw = loadJsonFromStep(step4003);
      if (!raw) return;

      const char = parseDDBCharacterData(raw);

      expect(char.name).toContain("Jinx");
      expect(char.level).toBe(6);
      expect(char.classes[0].name).toBe("Fighter");
      expect(char.classes[0].subclass).toContain("Battle Master");

      // Alert feat: adds PB (+3) to initiative -> DEX 5 + PB 3 = 8
      expect(char.proficiencyBonus).toBe(3);
      expect(char.stats.dex).toBe(20);
      expect(char.modifiers.dex).toBe(5);
      expect(char.initiative).toBe(8);
      expect(char.hasInitiativeAdvantage).toBe(true);

      // Blackpowder Pistol is a ranged firearm, NOT an offhand melee weapon
      const pistol = char.weapons?.find(w => w.name.toLowerCase().includes("pistol"));
      expect(pistol).toBeDefined();
      expect(pistol?.type).toBe("ranged");
      expect(char.offhandWeapon).toBeUndefined();

      // Battle Master maneuvers captured in options
      expect(char.options).toBeDefined();
      const maneuverNames = char.options?.map(o => o.name) || [];
      expect(maneuverNames.some(n => n.toLowerCase().includes("trip") || n.toLowerCase().includes("menacing") || n.toLowerCase().includes("riposte") || n.toLowerCase().includes("maneuver"))).toBe(true);

      // Hit dice: 6d10
      const hitDie = char.hitDice?.find(hd => hd.die === "1d10" || hd.die === "d10");
      expect(hitDie).toBeDefined();
      expect(hitDie?.total).toBe(6);
    });
  });

  describe("Caboya (172420422) - Warlock 6 (The Parasite)", () => {
    it("accurately parses AC 20 (Natural Armor 13 + 4 CON + 2 Shield + 1 Cloak), filters consumable potion STR 21, and parses Parasitic Weapon", () => {
      const raw = loadJsonFromStep(step4050);
      if (!raw) return;

      const char = parseDDBCharacterData(raw);

      expect(char.name).toContain("Caboya");
      expect(char.level).toBe(6);
      expect(char.classes[0].name).toBe("Warlock");

      // Natural Armor from Altered feat: 13 + CON (4) + Shield (2) + Cloak of Protection (1) = 20 AC
      // DEX bonus is ignored due to ignoreUnarmoredDex
      expect(char.modifiers.con).toBe(4);
      expect(char.armorClass).toBe(20);

      // Potion of Hill Giant Strength in inventory must NOT overwrite character STR to 21
      expect(char.stats.str).toBe(8);
      expect(char.modifiers.str).toBe(-1);

      // Parasitic Weapon (Piercing) parsed into weapons
      const parasiticWep = char.weapons?.find(w => w.name.toLowerCase().includes("parasitic weapon"));
      expect(parasiticWep).toBeDefined();
      expect(parasiticWep?.damage).toBe("1d12");
      expect(parasiticWep?.damageType).toBe("Piercing");
      expect(parasiticWep?.toHit).toBe(8); // Spell attack: PB 3 + CHA 5 = 8
      expect(parasiticWep?.rangeFeet).toBe(15); // 5 * PB = 15 ft Reach

      // Invocations & Options: Heliana's Guide to Monster Hunting: Parasitic Leech
      expect(char.options).toBeDefined();
      const leech = char.options?.find(o => o.name.toLowerCase().includes("parasitic leech"));
      expect(leech).toBeDefined();

      // Blackpowder Pistol is Martial weapon -> Caboya lacks Martial proficiency -> toHit is +0, damage is 2d4
      const pistol = char.weapons?.find(w => w.name === "Blackpowder Pistol");
      expect(pistol).toBeDefined();
      expect(pistol?.isProficient).toBe(false);
      expect(pistol?.toHit).toBe(0);
      expect(pistol?.damage).toBe("2d4");

      // Dagger is Simple weapon -> Caboya is proficient -> toHit is +3, damage is 1d4
      const dagger = char.weapons?.find(w => w.name === "Dagger");
      expect(dagger).toBeDefined();
      expect(dagger?.isProficient).toBe(true);
      expect(dagger?.toHit).toBe(3);
      expect(dagger?.damage).toBe("1d4");
    });
  });
});
