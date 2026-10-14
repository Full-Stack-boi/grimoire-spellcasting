import type { MonsterStatblock } from "../domain/types";

export const MONSTERS_2024: MonsterStatblock[] = [
  {
    "id": "ddb_aarakocra_aeromancer_2024",
    "name": "Aarakocra Aeromancer",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 16,
    "hitPoints": {
      "average": 66,
      "formula": "12d8 + 12"
    },
    "speed": "20 ft., Fly 50 ft.",
    "stats": {
      "str": 10,
      "dex": 16,
      "con": 12,
      "int": 13,
      "wis": 17,
      "cha": 12
    },
    "savingThrows": {
      "str": 0,
      "dex": 5,
      "con": 1,
      "int": 1,
      "wis": 5,
      "cha": 1
    },
    "skills": {
      "arcana": 3,
      "nature": 5,
      "perception": 7
    },
    "senses": "Passive Perception 17",
    "languages": "Aarakocra, Primordial (Auran)",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The aarakocra makes two Wind Staff attacks, and it can use Spellcasting to cast Gust of Wind ."
      },
      {
        "id": "act_wind_staff",
        "name": "Wind Staff",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +5 , reach 5 ft. or range 120 ft. Hit: 7 (1d8 + 3) Bludgeoning damage plus 11 (2d10) Lightning damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "rangeFeet": 120,
        "damage": "1d8+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The aarakocra casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Elementalism , Gust of Wind , Mage Hand , Message 1/Day: Lightning Bolt"
      }
    ],
    "reactions": [
      {
        "name": "Feather Fall (1/Day)",
        "description": "The aarakocra casts Feather Fall in response to that spell’s trigger, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_aberrant_cultist_2024",
    "name": "Aberrant Cultist",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 137,
      "formula": "25d8 + 25"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 19,
      "con": 12,
      "int": 16,
      "wis": 18,
      "cha": 15
    },
    "savingThrows": {
      "str": 0,
      "dex": 4,
      "con": 1,
      "int": 6,
      "wis": 7,
      "cha": 2
    },
    "skills": {
      "arcana": 6,
      "perception": 7,
      "religion": 6
    },
    "senses": "Darkvision 90 ft.; Passive Perception 17",
    "languages": "Common, Deep Speech, Telepathy 30 ft.",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The cultist makes two Tentacle Lash attacks. It can replace any attack with a use of Mind Rot."
      },
      {
        "id": "act_tentacle_lash",
        "name": "Tentacle Lash",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 7 (1d6 + 4) Slashing damage plus 14 (4d6) Psychic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of two tentacles, and it has the Restrained condition until the grapple ends.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "1d6+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_mind_rot",
        "name": "Mind Rot",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 15, one creature the cultist can see within 90 feet. Failure: 27 (6d8) Psychic damage, and the target has the Poisoned condition until the start of the cultist’s next turn. Success: Half damage only.",
        "damage": "6d8",
        "damageType": "Psychic",
        "saveDc": 15,
        "saveStat": "wis"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Thoughts , Minor Illusion"
      }
    ],
    "reactions": [
      {
        "name": "Counterspell (2/Day)",
        "description": "The cultist casts Counterspell in response to that spell’s trigger, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_aboleth_2024",
    "name": "Aboleth",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 150,
      "formula": "20d10 + 40"
    },
    "speed": "10 ft., Swim 40 ft.",
    "stats": {
      "str": 21,
      "dex": 9,
      "con": 15,
      "int": 18,
      "wis": 15,
      "cha": 18
    },
    "savingThrows": {
      "str": 5,
      "dex": 3,
      "con": 6,
      "int": 8,
      "wis": 6,
      "cha": 4
    },
    "skills": {
      "history": 12,
      "perception": 10
    },
    "senses": "Darkvision 120 ft.; Passive Perception 20",
    "languages": "Deep Speech, Telepathy 120 ft.",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The aboleth can breathe air and water."
      },
      {
        "name": "Eldritch Restoration",
        "description": "If destroyed, the aboleth gains a new body in 5d10 days, reviving with all its Hit Points in the Far Realm or another location chosen by the DM."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the aboleth fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Mucus Cloud",
        "description": "While underwater, the aboleth is surrounded by mucus. Constitution Saving Throw: DC 14, each creature in a 5-foot Emanation originating from the aboleth at the end of the aboleth’s turn. Failure: The target is cursed. Until the curse ends, the target’s skin becomes slimy, the target can breathe air and water, and it can’t regain Hit Points unless it is underwater."
      },
      {
        "name": "Probing Telepathy",
        "description": "If a creature the aboleth can see communicates telepathically with the aboleth, the aboleth learns the creature’s greatest desires."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The aboleth makes two Tentacle attacks and uses either Consume Memories or Dominate Mind if available."
      },
      {
        "id": "act_tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 15 ft. Hit: 12 (2d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of four tentacles.",
        "attackBonus": 9,
        "reachFeet": 15,
        "damage": "2d6+5",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_consume_memories",
        "name": "Consume Memories",
        "type": "ability",
        "description": "Intelligence Saving Throw: DC 16, one creature within 30 feet that is Charmed or Grappled by the aboleth. Failure: 10 (3d6) Psychic damage. Success: Half damage. Failure or Success: The aboleth gains the target’s memories if the target is a Humanoid and is reduced to 0 Hit Points by this action.",
        "damage": "3d6",
        "damageType": "Psychic",
        "saveDc": 16,
        "saveStat": "int"
      },
      {
        "id": "act_dominate_mind_2_day_",
        "name": "Dominate Mind (2/Day)",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 16, one creature the aboleth can see within 30 feet. Failure: The target has the Charmed condition until the aboleth dies or is on a different plane of existence from the target. While Charmed, the target acts as an ally to the aboleth and is under its control while within 60 feet of it. In addition, the aboleth and the target can communicate telepathically with each other over any distance.",
        "saveDc": 16,
        "saveStat": "wis"
      }
    ],
    "legendaryActions": [
      {
        "name": "Lash",
        "description": "The aboleth makes one Tentacle attack."
      },
      {
        "name": "Psychic Drain",
        "description": "If the aboleth has at least one creature Charmed or Grappled , it uses Consume Memories and regains 5 (1d10) Hit Points."
      }
    ]
  },
  {
    "id": "ddb_adult_black_dragon_2024",
    "name": "Adult Black Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 195,
      "formula": "17d12 + 85"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 23,
      "dex": 14,
      "con": 21,
      "int": 14,
      "wis": 13,
      "cha": 19
    },
    "savingThrows": {
      "str": 6,
      "dex": 7,
      "con": 5,
      "int": 2,
      "wis": 6,
      "cha": 4
    },
    "skills": {
      "perception": 11,
      "stealth": 7
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "14",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Melf’s Acid Arrow (level 3 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +11 , reach 10 ft. Hit: 13 (2d6 + 6) Slashing damage plus 4 (1d8) Acid damage.",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d6+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_breath_recharge_5_6_",
        "name": "Acid Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 18, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 54 (12d8) Acid damage. Success: Half damage.",
        "damage": "12d8",
        "damageType": "Acid",
        "saveDc": 18,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17, +9 to hit with spell attacks):",
        "attackBonus": 9
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Fear , Melf’s Acid Arrow (level 3 version)"
      },
      {
        "id": "act_1_day_each_",
        "name": "1/Day Each:",
        "type": "ability",
        "description": "Speak with Dead , Vitriolic Sphere"
      }
    ],
    "legendaryActions": [
      {
        "name": "Cloud of Insects",
        "description": "Dexterity Saving Throw: DC 17, one creature the dragon can see within 120 feet. Failure: 22 (4d10) Poison damage, and the target has Disadvantage on saving throws to maintain Concentration until the end of its next turn. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Frightful Presence",
        "description": "The dragon uses Spellcasting to cast Fear . The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon can move up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_adult_blue_dragon_2024",
    "name": "Adult Blue Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Lawful Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 212,
      "formula": "17d12 + 102"
    },
    "speed": "40 ft., Burrow 30 ft., Fly 80 ft.",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 23,
      "int": 16,
      "wis": 15,
      "cha": 20
    },
    "savingThrows": {
      "str": 7,
      "dex": 5,
      "con": 6,
      "int": 3,
      "wis": 7,
      "cha": 5
    },
    "skills": {
      "perception": 12,
      "stealth": 5
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 22",
    "languages": "Common, Draconic",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Shatter ."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +12 , reach 10 ft. Hit: 16 (2d8 + 7) Slashing damage plus 5 (1d10) Lightning damage.",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "2d8+7",
        "damageType": "Slashing"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 19, each creature in a 90-foot-long, 5-foot-wide Line. Failure: 60 (11d10) Lightning damage. Success: Half damage.",
        "damage": "11d10",
        "damageType": "Lightning",
        "saveDc": 19,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Invisibility , Mage Hand , Shatter 1/Day Each: Scrying , Sending"
      }
    ],
    "legendaryActions": [
      {
        "name": "Cloaked Flight",
        "description": "The dragon uses Spellcasting to cast Invisibility on itself, and it can fly up to half its Fly Speed. The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Sonic Boom",
        "description": "The dragon uses Spellcasting to cast Shatter . The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Tail Swipe",
        "description": "The dragon makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_adult_brass_dragon_2024",
    "name": "Adult Brass Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Chaotic Good",
    "armorClass": 18,
    "hitPoints": {
      "average": 172,
      "formula": "15d12 + 75"
    },
    "speed": "40 ft., Burrow 30 ft., Fly 80 ft.",
    "stats": {
      "str": 23,
      "dex": 10,
      "con": 21,
      "int": 14,
      "wis": 13,
      "cha": 17
    },
    "savingThrows": {
      "str": 6,
      "dex": 5,
      "con": 5,
      "int": 2,
      "wis": 6,
      "cha": 3
    },
    "skills": {
      "history": 7,
      "perception": 11,
      "persuasion": 8,
      "stealth": 5
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Sleep Breath or (B) Spellcasting to cast Scorching Ray ."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +11 , reach 10 ft. Hit: 17 (2d10 + 6) Slashing damage plus 4 (1d8) Fire damage.",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 18, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 45 (10d8) Fire damage. Success: Half damage.",
        "damage": "10d8",
        "damageType": "Fire",
        "saveDc": 18,
        "saveStat": "dex"
      },
      {
        "id": "act_sleep_breath",
        "name": "Sleep Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. First Failure: The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. Second Failure: The target has the Unconscious condition for 10 minutes. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.",
        "saveDc": 18,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Minor Illusion , Scorching Ray , Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell), Speak with Animals 1/Day Each: Detect Thoughts , Control Weather"
      }
    ],
    "legendaryActions": [
      {
        "name": "Blazing Light",
        "description": "The dragon uses Spellcasting to cast Scorching Ray ."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      },
      {
        "name": "Scorching Sands",
        "description": "Dexterity Saving Throw: DC 16, one creature the dragon can see within 120 feet. Failure: 27 (6d8) Fire damage, and the target’s Speed is halved until the end of its next turn. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_adult_bronze_dragon_2024",
    "name": "Adult Bronze Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 18,
    "hitPoints": {
      "average": 212,
      "formula": "17d12 + 102"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 23,
      "int": 16,
      "wis": 15,
      "cha": 20
    },
    "savingThrows": {
      "str": 7,
      "dex": 5,
      "con": 6,
      "int": 3,
      "wis": 7,
      "cha": 5
    },
    "skills": {
      "insight": 7,
      "perception": 12,
      "stealth": 5
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 22",
    "languages": "Common, Draconic",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Repulsion Breath or (B) Spellcasting to cast Guiding Bolt (level 2 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +12 , reach 10 ft. Hit: 16 (2d8 + 7) Slashing damage plus 5 (1d10) Lightning damage.",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "2d8+7",
        "damageType": "Slashing"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 19, each creature in a 90-foot-long, 5-foot-wide Line. Failure: 55 (10d10) Lightning damage. Success: Half damage.",
        "damage": "10d10",
        "damageType": "Lightning",
        "saveDc": 19,
        "saveStat": "dex"
      },
      {
        "id": "act_repulsion_breath",
        "name": "Repulsion Breath",
        "type": "ability",
        "description": "Strength Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: The target is pushed up to 60 feet straight away from the dragon and has the Prone condition.",
        "saveDc": 19,
        "saveStat": "str"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17, +10 to hit with spell attacks):",
        "attackBonus": 10
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Guiding Bolt (level 2 version), Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell), Speak with Animals , Thaumaturgy 1/Day Each: Detect Thoughts , Water Breathing"
      }
    ],
    "legendaryActions": [
      {
        "name": "Guiding Light",
        "description": "The dragon uses Spellcasting to cast Guiding Bolt (level 2 version)."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      },
      {
        "name": "Thunderclap",
        "description": "Constitution Saving Throw: DC 17, each creature in a 20-foot-radius Sphere centered on a point the dragon can see within 90 feet. Failure: 10 (3d6) Thunder damage, and the target has the Deafened condition until the end of its next turn."
      }
    ]
  },
  {
    "id": "ddb_adult_copper_dragon_2024",
    "name": "Adult Copper Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Chaotic Good",
    "armorClass": 18,
    "hitPoints": {
      "average": 184,
      "formula": "16d12 + 80"
    },
    "speed": "40 ft., Climb 40 ft., Fly 80 ft.",
    "stats": {
      "str": 23,
      "dex": 12,
      "con": 21,
      "int": 18,
      "wis": 15,
      "cha": 18
    },
    "savingThrows": {
      "str": 6,
      "dex": 6,
      "con": 5,
      "int": 4,
      "wis": 7,
      "cha": 4
    },
    "skills": {
      "deception": 9,
      "perception": 12,
      "stealth": 6
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 22",
    "languages": "Common, Draconic",
    "challengeRating": "14",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Slowing Breath or (B) Spellcasting to cast Mind Spike (level 4 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +11 , reach 10 ft. Hit: 17 (2d10 + 6) Slashing damage plus 4 (1d8) Acid damage.",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_breath_recharge_5_6_",
        "name": "Acid Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 18, each creature in an 60-foot-long, 5-foot-wide Line. Failure: 54 (12d8) Acid damage. Success: Half damage.",
        "damage": "12d8",
        "damageType": "Acid",
        "saveDc": 18,
        "saveStat": "dex"
      },
      {
        "id": "act_slowing_breath",
        "name": "Slowing Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: The target can’t take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. This effect lasts until the end of its next turn.",
        "saveDc": 18,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Mind Spike (level 4 version), Minor Illusion , Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) 1/Day Each: Greater Restoration , Major Image"
      }
    ],
    "legendaryActions": [
      {
        "name": "Giggling Magic",
        "description": "Charisma Saving Throw: DC 17, one creature the dragon can see within 90 feet. Failure: 24 (7d6) Psychic damage. Until the end of its next turn, the target rolls 1d6 whenever it makes an ability check or attack roll and subtracts the number rolled from the D20 Test . Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Mind Jolt",
        "description": "The dragon uses Spellcasting to cast Mind Spike (level 4 version). The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_adult_gold_dragon_2024",
    "name": "Adult Gold Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "hitPoints": {
      "average": 243,
      "formula": "18d12 + 126"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 27,
      "dex": 14,
      "con": 25,
      "int": 16,
      "wis": 15,
      "cha": 24
    },
    "savingThrows": {
      "str": 8,
      "dex": 8,
      "con": 7,
      "int": 3,
      "wis": 8,
      "cha": 7
    },
    "skills": {
      "insight": 8,
      "perception": 14,
      "persuasion": 13,
      "stealth": 8
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 24",
    "languages": "Common, Draconic",
    "challengeRating": "17",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast Guiding Bolt (level 2 version) or (B) Weakening Breath."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 17 (2d8 + 8) Slashing damage plus 4 (1d8) Fire damage.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "2d8+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 21, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage.",
        "damage": "12d10",
        "damageType": "Fire",
        "saveDc": 21,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21, +13 to hit with spell attacks):",
        "attackBonus": 13
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Guiding Bolt (level 2 version), Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) 1/Day Each: Flame Strike , Zone of Truth"
      },
      {
        "id": "act_weakening_breath",
        "name": "Weakening Breath",
        "type": "ability",
        "description": "Strength Saving Throw: DC 21, each creature that isn’t currently affected by this breath in a 60-foot Cone. Failure: The target has Disadvantage on Strength-based D20 Tests and subtracts 3 (1d6) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 21,
        "saveStat": "str"
      }
    ],
    "legendaryActions": [
      {
        "name": "Banish",
        "description": "Charisma Saving Throw: DC 21, one creature the dragon can see within 120 feet. Failure: 10 (3d6) Force damage, and the target has the Incapacitated condition and is transported to a harmless demiplane until the start of the dragon’s next turn, at which point it reappears in an unoccupied space of the dragon’s choice within 120 feet of the dragon. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Guiding Light",
        "description": "The dragon uses Spellcasting to cast Guiding Bolt (level 2 version)."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_adult_green_dragon_2024",
    "name": "Adult Green Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Lawful Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 207,
      "formula": "18d12 + 90"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 23,
      "dex": 12,
      "con": 21,
      "int": 18,
      "wis": 15,
      "cha": 18
    },
    "savingThrows": {
      "str": 6,
      "dex": 6,
      "con": 5,
      "int": 4,
      "wis": 7,
      "cha": 4
    },
    "skills": {
      "deception": 9,
      "perception": 12,
      "persuasion": 9,
      "stealth": 6
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 22",
    "languages": "Common, Draconic",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Mind Spike (level 3 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +11 , reach 10 ft. Hit: 15 (2d8 + 6) Slashing damage plus 7 (2d6) Poison damage.",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d8+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_poison_breath_recharge_5_6_",
        "name": "Poison Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 56 (16d6) Poison damage. Success: Half damage.",
        "damage": "16d6",
        "damageType": "Poison",
        "saveDc": 18,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Mind Spike (level 3 version) 1/Day: Geas"
      }
    ],
    "legendaryActions": [
      {
        "name": "Mind Invasion",
        "description": "The dragon uses Spellcasting to cast Mind Spike (level 3 version)."
      },
      {
        "name": "Noxious Miasma",
        "description": "Constitution Saving Throw: DC 17, each creature in a 20-foot-radius Sphere centered on a point the dragon can see within 90 feet. Failure: 7 (2d6) Poison damage, and the target takes a −2 penalty to AC until the end of its next turn. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_adult_red_dragon_2024",
    "name": "Adult Red Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 256,
      "formula": "19d12 + 133"
    },
    "speed": "40 ft., Climb 40 ft., Fly 80 ft.",
    "stats": {
      "str": 27,
      "dex": 10,
      "con": 25,
      "int": 16,
      "wis": 13,
      "cha": 23
    },
    "savingThrows": {
      "str": 8,
      "dex": 6,
      "con": 7,
      "int": 3,
      "wis": 7,
      "cha": 6
    },
    "skills": {
      "perception": 13,
      "stealth": 6
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 23",
    "languages": "Common, Draconic",
    "challengeRating": "17",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray ."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 13 (1d10 + 8) Slashing damage plus 5 (2d4) Fire damage.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "1d10+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 21, each creature in a 60-foot Cone. Failure: 59 (17d6) Fire damage. Success: Half damage.",
        "damage": "17d6",
        "damageType": "Fire",
        "saveDc": 21,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks):",
        "attackBonus": 12
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Command (level 2 version), Detect Magic , Scorching Ray 1/Day: Fireball"
      }
    ],
    "legendaryActions": [
      {
        "name": "Commanding Presence",
        "description": "The dragon uses Spellcasting to cast Command (level 2 version). The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Fiery Rays",
        "description": "The dragon uses Spellcasting to cast Scorching Ray . The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_adult_silver_dragon_2024",
    "name": "Adult Silver Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "hitPoints": {
      "average": 216,
      "formula": "16d12 + 112"
    },
    "speed": "40 ft., Fly 80 ft.",
    "stats": {
      "str": 27,
      "dex": 10,
      "con": 25,
      "int": 16,
      "wis": 13,
      "cha": 22
    },
    "savingThrows": {
      "str": 8,
      "dex": 5,
      "con": 7,
      "int": 3,
      "wis": 6,
      "cha": 6
    },
    "skills": {
      "history": 8,
      "perception": 11,
      "stealth": 5
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Paralyzing Breath or (B) Spellcasting to cast Ice Knife ."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +13 , reach 10 ft. Hit: 17 (2d8 + 8) Slashing damage plus 4 (1d8) Cold damage.",
        "attackBonus": 13,
        "reachFeet": 10,
        "damage": "2d8+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 20, each creature in a 60-foot Cone. Failure: 54 (12d8) Cold damage. Success: Half damage.",
        "damage": "12d8",
        "damageType": "Cold",
        "saveDc": 20,
        "saveStat": "con"
      },
      {
        "id": "act_paralyzing_breath",
        "name": "Paralyzing Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 20, each creature in a 60-foot Cone. First Failure: The target has the Incapacitated condition until the end of its next turn, when it repeats the save. Second Failure: The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 20,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 19, +11 to hit with spell attacks):",
        "attackBonus": 11
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Hold Monster , Ice Knife , Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) 1/Day Each: Ice Storm (level 5 version), Zone of Truth"
      }
    ],
    "legendaryActions": [
      {
        "name": "Chill",
        "description": "The dragon uses Spellcasting to cast Hold Monster . The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Cold Gale",
        "description": "Dexterity Saving Throw: DC 19, each creature in a 60-foot-long, 10-foot-wide Line. Failure: 14 (4d6) Cold damage, and the target is pushed up to 30 feet straight away from the dragon. Success: Half damage only. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_adult_white_dragon_2024",
    "name": "Adult White Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 200,
      "formula": "16d12 + 96"
    },
    "speed": "40 ft., Burrow 30 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 22,
      "dex": 10,
      "con": 22,
      "int": 8,
      "wis": 12,
      "cha": 12
    },
    "savingThrows": {
      "str": 6,
      "dex": 5,
      "con": 6,
      "wis": 6,
      "cha": 1
    },
    "skills": {
      "perception": 11,
      "stealth": 5
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, Difficult Terrain composed of ice or snow doesn’t cost it extra movement."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +11 , reach 10 ft. Hit: 13 (2d6 + 6) Slashing damage plus 4 (1d8) Cold damage.",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d6+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 54 (12d8) Cold damage. Success: Half damage.",
        "damage": "12d8",
        "damageType": "Cold",
        "saveDc": 19,
        "saveStat": "con"
      }
    ],
    "legendaryActions": [
      {
        "name": "Freezing Burst",
        "description": "Constitution Saving Throw: DC 14, each creature in a 30-foot-radius Sphere centered on a point the dragon can see within 120 feet. Failure: 7 (2d6) Cold damage, and the target’s Speed is 0 until the end of the target’s next turn. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Frightful Presence",
        "description": "The dragon casts Fear , requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14). The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_air_elemental_2024",
    "name": "Air Elemental",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 90,
      "formula": "12d10 + 24"
    },
    "speed": "10 ft., Fly 90 ft. (hover)",
    "stats": {
      "str": 14,
      "dex": 20,
      "con": 14,
      "int": 6,
      "wis": 10,
      "cha": 6
    },
    "savingThrows": {
      "str": 2,
      "dex": 5,
      "con": 2,
      "wis": 0
    },
    "damageResistances": [
      "Bludgeoning",
      "Lightning",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Poison",
      "Thunder"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Primordial (Auran)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Air Form",
        "description": "The elemental can enter a creature’s space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elemental makes two Thunderous Slam attacks."
      },
      {
        "id": "act_thunderous_slam",
        "name": "Thunderous Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 14 (2d8 + 5) Thunder damage.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d8+5",
        "damageType": "Thunder"
      },
      {
        "id": "act_whirlwind_recharge_4_6_",
        "name": "Whirlwind (Recharge 4–6)",
        "type": "ability",
        "description": "Strength Saving Throw: DC 13, one Medium or smaller creature in the elemental’s space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the elemental and has the Prone condition. Success: Half damage only.",
        "damage": "4d10+2",
        "damageType": "Thunder",
        "saveDc": 13,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_allosaurus_2024",
    "name": "Allosaurus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "subtype": "Dinosaur",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 51,
      "formula": "6d10 + 18"
    },
    "speed": "60 ft.",
    "stats": {
      "str": 19,
      "dex": 13,
      "con": 17,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "senses": "Passive Perception 15",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 15 (2d10 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d10+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_claws",
        "name": "Claws",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 8 (1d8 + 4) Slashing damage. If the target is a Large or smaller creature and the allosaurus moved 30+ feet straight toward it immediately before the hit, the target has the Prone condition, and the allosaurus can make one Bite attack against it.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_ancient_black_dragon_2024",
    "name": "Ancient Black Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 22,
    "hitPoints": {
      "average": 367,
      "formula": "21d20 + 147"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 27,
      "dex": 14,
      "con": 25,
      "int": 16,
      "wis": 15,
      "cha": 22
    },
    "savingThrows": {
      "str": 8,
      "dex": 9,
      "con": 7,
      "int": 3,
      "wis": 9,
      "cha": 6
    },
    "skills": {
      "perception": 16,
      "stealth": 9
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 26",
    "languages": "Common, Draconic",
    "challengeRating": "21",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Melf’s Acid Arrow (level 4 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +15 , reach 15 ft. Hit: 17 (2d8 + 8) Slashing damage plus 9 (2d8) Acid damage.",
        "attackBonus": 15,
        "reachFeet": 15,
        "damage": "2d8+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_breath_recharge_5_6_",
        "name": "Acid Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw : DC 22, each creature in a 90-foot-long, 10-foot-wide Line. Failure: 67 (15d8) Acid damage. Success: Half damage.",
        "damage": "15d8",
        "damageType": "Acid"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21, +13 to hit with spell attacks):",
        "attackBonus": 13
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Fear , Melf’s Acid Arrow (level 4 version) 1/Day Each: Create Undead , Speak with Dead , Vitriolic Sphere (level 5 version)"
      }
    ],
    "legendaryActions": [
      {
        "name": "Cloud of Insects",
        "description": "Dexterity Saving Throw: DC 21, one creature the dragon can see within 120 feet. Failure: 33 (6d10) Poison damage, and the target has Disadvantage on saving throws to maintain Concentration until the end of its next turn. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Frightful Presence",
        "description": "The dragon uses Spellcasting to cast Fear . The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_ancient_blue_dragon_2024",
    "name": "Ancient Blue Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Lawful Evil",
    "armorClass": 22,
    "hitPoints": {
      "average": 481,
      "formula": "26d20 + 208"
    },
    "speed": "40 ft., Burrow 40 ft., Fly 80 ft.",
    "stats": {
      "str": 29,
      "dex": 10,
      "con": 27,
      "int": 18,
      "wis": 17,
      "cha": 25
    },
    "savingThrows": {
      "str": 9,
      "dex": 7,
      "con": 8,
      "int": 4,
      "wis": 10,
      "cha": 7
    },
    "skills": {
      "perception": 17,
      "stealth": 7
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "23",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Shatter (level 3 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +16 , reach 15 ft. Hit: 18 (2d8 + 9) Slashing damage plus 11 (2d10) Lightning damage.",
        "attackBonus": 16,
        "reachFeet": 15,
        "damage": "2d8+9",
        "damageType": "Slashing"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 23, each creature in a 120-foot-long, 10-foot-wide Line. Failure: 88 (16d10) Lightning damage. Success: Half damage.",
        "damage": "16d10",
        "damageType": "Lightning",
        "saveDc": 23,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 22):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Invisibility , Mage Hand , Shatter (level 3 version) 1/Day Each: Scrying , Sending"
      }
    ],
    "legendaryActions": [
      {
        "name": "Cloaked Flight",
        "description": "The dragon uses Spellcasting to cast Invisibility on itself, and it can fly up to half its Fly Speed. The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Sonic Boom",
        "description": "The dragon uses Spellcasting to cast Shatter (level 3 version). The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Tail Swipe",
        "description": "The dragon makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_ancient_brass_dragon_2024",
    "name": "Ancient Brass Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Chaotic Good",
    "armorClass": 20,
    "hitPoints": {
      "average": 332,
      "formula": "19d20 + 133"
    },
    "speed": "40 ft., Burrow 40 ft., Fly 80 ft.",
    "stats": {
      "str": 27,
      "dex": 10,
      "con": 25,
      "int": 16,
      "wis": 15,
      "cha": 22
    },
    "savingThrows": {
      "str": 8,
      "dex": 6,
      "con": 7,
      "int": 3,
      "wis": 8,
      "cha": 6
    },
    "skills": {
      "history": 9,
      "perception": 14,
      "persuasion": 12,
      "stealth": 6
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 24",
    "languages": "Common, Draconic",
    "challengeRating": "20",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Sleep Breath or (B) Spellcasting to cast Scorching Ray (level 3 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 15 ft. Hit: 19 (2d10 + 8) Slashing damage plus 7 (2d6) Fire damage.",
        "attackBonus": 14,
        "reachFeet": 15,
        "damage": "2d10+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 21, each creature in a 90-foot-long, 5-foot-wide Line. Failure: 58 (13d8) Fire damage. Success: Half damage.",
        "damage": "13d8",
        "damageType": "Fire",
        "saveDc": 21,
        "saveStat": "dex"
      },
      {
        "id": "act_sleep_breath",
        "name": "Sleep Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. First Failure: The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. Second Failure: The target has the Unconscious condition for 10 minutes. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.",
        "saveDc": 21,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Minor Illusion , Scorching Ray (level 3 version), Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell), Speak with Animals 1/Day Each: Control Weather , Detect Thoughts"
      }
    ],
    "legendaryActions": [
      {
        "name": "Blazing Light",
        "description": "The dragon uses Spellcasting to cast Scorching Ray (level 3 version)."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      },
      {
        "name": "Scorching Sands",
        "description": "Dexterity Saving Throw: DC 20, one creature the dragon can see within 120 feet. Failure: 36 (8d8) Fire damage, and the target’s Speed is halved until the end of its next turn. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_ancient_bronze_dragon_2024",
    "name": "Ancient Bronze Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 22,
    "hitPoints": {
      "average": 444,
      "formula": "24d20 + 192"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 29,
      "dex": 10,
      "con": 27,
      "int": 18,
      "wis": 17,
      "cha": 25
    },
    "savingThrows": {
      "str": 9,
      "dex": 7,
      "con": 8,
      "int": 4,
      "wis": 10,
      "cha": 7
    },
    "skills": {
      "insight": 10,
      "perception": 17,
      "stealth": 7
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "22",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Repulsion Breath or (B) Spellcasting to cast Guiding Bolt (level 2 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +16 , reach 15 ft. Hit: 18 (2d8 + 9) Slashing damage plus 9 (2d8) Lightning damage.",
        "attackBonus": 16,
        "reachFeet": 15,
        "damage": "2d8+9",
        "damageType": "Slashing"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 23, each creature in a 120-foot-long, 10-foot-wide Line. Failure: 82 (15d10) Lightning damage. Success: Half damage.",
        "damage": "15d10",
        "damageType": "Lightning",
        "saveDc": 23,
        "saveStat": "dex"
      },
      {
        "id": "act_repulsion_breath",
        "name": "Repulsion Breath",
        "type": "ability",
        "description": "Strength Saving Throw: DC 23, each creature in a 30-foot Cone. Failure: The target is pushed up to 60 feet straight away from the dragon and has the Prone condition.",
        "saveDc": 23,
        "saveStat": "str"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 22, +14 to hit with spell attacks):",
        "attackBonus": 14
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Guiding Bolt (level 2 version), Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell), Speak with Animals , Thaumaturgy 1/Day Each: Detect Thoughts , Control Water , Scrying , Water Breathing"
      }
    ],
    "legendaryActions": [
      {
        "name": "Guiding Light",
        "description": "The dragon uses Spellcasting to cast Guiding Bolt (level 2 version)."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      },
      {
        "name": "Thunderclap",
        "description": "Constitution Saving Throw: DC 22, each creature in a 20-foot-radius Sphere centered on a point the dragon can see within 120 feet. Failure: 13 (3d8) Thunder damage, and the target has the Deafened condition until the end of its next turn."
      }
    ]
  },
  {
    "id": "ddb_ancient_copper_dragon_2024",
    "name": "Ancient Copper Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Chaotic Good",
    "armorClass": 21,
    "hitPoints": {
      "average": 367,
      "formula": "21d20 + 147"
    },
    "speed": "40 ft., Climb 40 ft., Fly 80 ft.",
    "stats": {
      "str": 27,
      "dex": 12,
      "con": 25,
      "int": 20,
      "wis": 17,
      "cha": 22
    },
    "savingThrows": {
      "str": 8,
      "dex": 8,
      "con": 7,
      "int": 5,
      "wis": 10,
      "cha": 6
    },
    "skills": {
      "deception": 13,
      "perception": 17,
      "stealth": 8
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "21",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Slowing Breath or (B) Spellcasting to cast Mind Spike (level 5 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +15 , reach 15 ft. Hit: 19 (2d10 + 8) Slashing damage plus 9 (2d8) Acid damage.",
        "attackBonus": 15,
        "reachFeet": 15,
        "damage": "2d10+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_breath_recharge_5_6_",
        "name": "Acid Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 22, each creature in an 90-foot-long, 10-foot-wide Line. Failure: 63 (14d8) Acid damage. Success: Half damage.",
        "damage": "14d8",
        "damageType": "Acid",
        "saveDc": 22,
        "saveStat": "dex"
      },
      {
        "id": "act_slowing_breath",
        "name": "Slowing Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 22, each creature in a 90-foot Cone. Failure: The target can’t take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. This effect lasts until the end of its next turn.",
        "saveDc": 22,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Mind Spike (level 5 version), Minor Illusion , Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) 1/Day Each: Greater Restoration , Major Image , Project Image"
      }
    ],
    "legendaryActions": [
      {
        "name": "Giggling Magic",
        "description": "Charisma Saving Throw: DC 21, one creature the dragon can see within 120 feet. Failure: 31 (9d6) Psychic damage. Until the end of its next turn, the target rolls 1d8 whenever it makes an ability check or attack roll and subtracts the number rolled from the D20 Test . Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Mind Jolt",
        "description": "The dragon uses Spellcasting to cast Mind Spike (level 5 version). The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_ancient_gold_dragon_2024",
    "name": "Ancient Gold Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 22,
    "hitPoints": {
      "average": 546,
      "formula": "28d20 + 252"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 30,
      "dex": 14,
      "con": 29,
      "int": 18,
      "wis": 17,
      "cha": 28
    },
    "savingThrows": {
      "str": 10,
      "dex": 9,
      "con": 9,
      "int": 4,
      "wis": 10,
      "cha": 9
    },
    "skills": {
      "insight": 10,
      "perception": 17,
      "persuasion": 16,
      "stealth": 9
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "24",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast Guiding Bolt (level 4 version) or (B) Weakening Breath."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +17 to hit, reach 15 ft. Hit: 19 (2d8 + 10) Slashing damage plus 9 (2d8) Fire damage.",
        "attackBonus": 17,
        "reachFeet": 15,
        "damage": "2d8+10",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 24, each creature in a 90-foot Cone. Failure: 71 (13d10) Fire damage. Success: Half damage.",
        "damage": "13d10",
        "damageType": "Fire",
        "saveDc": 24,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 24, +16 to hit with spell attacks):",
        "attackBonus": 16
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Guiding Bolt (level 4 version), Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) 1/Day Each: Flame Strike (level 6 version), Word of Recall , Zone of Truth"
      },
      {
        "id": "act_weakening_breath",
        "name": "Weakening Breath",
        "type": "ability",
        "description": "Strength Saving Throw: DC 24, each creature that isn’t currently affected by this breath in a 90-foot Cone. Failure: The target has Disadvantage on Strength-based D20 Tests and subtracts 5 (1d10) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 24,
        "saveStat": "str"
      }
    ],
    "legendaryActions": [
      {
        "name": "Banish",
        "description": "Charisma Saving Throw: DC 24, one creature the dragon can see within 120 feet. Failure: 24 (7d6) Force damage, and the target has the Incapacitated condition and is transported to a harmless demiplane until the start of the dragon’s next turn, at which point it reappears in an unoccupied space of the dragon’s choice within 120 feet of the dragon. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Guiding Light",
        "description": "The dragon uses Spellcasting to cast Guiding Bolt (level 4 version)."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_ancient_green_dragon_2024",
    "name": "Ancient Green Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Lawful Evil",
    "armorClass": 21,
    "hitPoints": {
      "average": 402,
      "formula": "23d20 + 161"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 27,
      "dex": 12,
      "con": 25,
      "int": 20,
      "wis": 17,
      "cha": 22
    },
    "savingThrows": {
      "str": 8,
      "dex": 8,
      "con": 7,
      "int": 5,
      "wis": 10,
      "cha": 6
    },
    "skills": {
      "deception": 13,
      "perception": 17,
      "persuasion": 13,
      "stealth": 8
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "22",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Mind Spike (level 5 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +15 , reach 15 ft. Hit: 17 (2d8 + 8) Slashing damage plus 10 (3d6) Poison damage.",
        "attackBonus": 15,
        "reachFeet": 15,
        "damage": "2d8+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_poison_breath_recharge_5_6_",
        "name": "Poison Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 22, each creature in a 90-foot Cone. Failure: 77 (22d6) Poison damage. Success: Half damage.",
        "damage": "22d6",
        "damageType": "Poison",
        "saveDc": 22,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Mind Spike (level 5 version) 1/Day Each: Geas , Modify Memory"
      }
    ],
    "legendaryActions": [
      {
        "name": "Mind Invasion",
        "description": "The dragon uses Spellcasting to cast Mind Spike (level 5 version)."
      },
      {
        "name": "Noxious Miasma",
        "description": "Constitution Saving Throw: DC 21, each creature in a 30-foot-radius Sphere centered on a point the dragon can see within 90 feet. Failure: 17 (5d6) Poison damage, and the target takes a −2 penalty to AC until the end of its next turn. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_ancient_red_dragon_2024",
    "name": "Ancient Red Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 22,
    "hitPoints": {
      "average": 507,
      "formula": "26d20 + 234"
    },
    "speed": "40 ft., Climb 40 ft., Fly 80 ft.",
    "stats": {
      "str": 30,
      "dex": 10,
      "con": 29,
      "int": 18,
      "wis": 15,
      "cha": 27
    },
    "savingThrows": {
      "str": 10,
      "dex": 7,
      "con": 9,
      "int": 4,
      "wis": 9,
      "cha": 8
    },
    "skills": {
      "perception": 16,
      "stealth": 7
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60, Darkvision 120 ft.; Passive Perception 26",
    "languages": "Common, Draconic",
    "challengeRating": "24",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray (level 3 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +17 , reach 15 ft. Hit: 19 (2d8 + 10) Slashing damage plus 10 (3d6) Fire damage.",
        "attackBonus": 17,
        "reachFeet": 15,
        "damage": "2d8+10",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 24, each creature in a 90-foot Cone. Failure: 91 (26d6) Fire damage. Success: Half damage.",
        "damage": "26d6",
        "damageType": "Fire",
        "saveDc": 24,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 23, +15 to hit with spell attacks):",
        "attackBonus": 15
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Command (level 2 version), Detect Magic , Scorching Ray (level 3 version) 1/Day Each: Fireball (level 6 version), Scrying"
      }
    ],
    "legendaryActions": [
      {
        "name": "Commanding Presence",
        "description": "The dragon uses Spellcasting to cast Command (level 2 version). The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Fiery Rays",
        "description": "The dragon uses Spellcasting to cast Scorching Ray (level 3 version). The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_ancient_silver_dragon_2024",
    "name": "Ancient Silver Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 22,
    "hitPoints": {
      "average": 468,
      "formula": "24d20 + 216"
    },
    "speed": "40 ft., Fly 80 ft.",
    "stats": {
      "str": 30,
      "dex": 10,
      "con": 29,
      "int": 18,
      "wis": 15,
      "cha": 26
    },
    "savingThrows": {
      "str": 10,
      "dex": 7,
      "con": 9,
      "int": 4,
      "wis": 9,
      "cha": 8
    },
    "skills": {
      "history": 11,
      "perception": 16,
      "stealth": 7
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 26",
    "languages": "Common, Draconic",
    "challengeRating": "23",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Paralyzing Breath or (B) Spellcasting to cast Ice Knife (level 2 version)."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +17 , reach 15 ft. Hit: 19 (2d8 + 10) Slashing damage plus 9 (2d8) Cold damage.",
        "attackBonus": 17,
        "reachFeet": 15,
        "damage": "2d8+10",
        "damageType": "Slashing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 24, each creature in a 90-foot Cone. Failure: 67 (15d8) Cold damage. Success: Half damage.",
        "damage": "15d8",
        "damageType": "Cold",
        "saveDc": 24,
        "saveStat": "con"
      },
      {
        "id": "act_paralyzing_breath",
        "name": "Paralyzing Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 24, each creature in a 90-foot Cone. First Failure: The target has the Incapacitated condition until the end of its next turn, when it repeats the save. Second Failure: The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 24,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 23, +15 to hit with spell attacks):",
        "attackBonus": 15
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Magic , Hold Monster , Ice Knife (level 2 version), Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) 1/Day Each: Control Weather , Ice Storm (level 7 version), Teleport , Zone of Truth"
      }
    ],
    "legendaryActions": [
      {
        "name": "Chill",
        "description": "The dragon uses Spellcasting to cast Hold Monster . The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Cold Gale",
        "description": "Dexterity Saving Throw: DC 23, each creature in a 60-foot-long, 10-foot-wide Line. Failure: 14 (4d6) Cold damage, and the target is pushed up to 30 feet straight away from the dragon. Success: Half damage only. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_ancient_white_dragon_2024",
    "name": "Ancient White Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 20,
    "hitPoints": {
      "average": 333,
      "formula": "18d20 + 144"
    },
    "speed": "40 ft., Burrow 40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 26,
      "dex": 10,
      "con": 26,
      "int": 10,
      "wis": 13,
      "cha": 18
    },
    "savingThrows": {
      "str": 8,
      "dex": 6,
      "con": 8,
      "int": 0,
      "wis": 7,
      "cha": 4
    },
    "skills": {
      "perception": 13,
      "stealth": 6
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft.; Passive Perception 23",
    "languages": "Common, Draconic",
    "challengeRating": "20",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, Difficult Terrain composed of ice or snow doesn’t cost it extra movement."
      },
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 15 ft. Hit: 17 (2d8 + 8) Slashing damage plus 7 (2d6) Cold damage.",
        "attackBonus": 14,
        "reachFeet": 15,
        "damage": "2d8+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 22, each creature in a 90-foot Cone. Failure: 63 (14d8) Cold damage. Success: Half damage.",
        "damage": "14d8",
        "damageType": "Cold",
        "saveDc": 22,
        "saveStat": "con"
      }
    ],
    "legendaryActions": [
      {
        "name": "Freezing Burst",
        "description": "Constitution Saving Throw: DC 20, each creature in a 30-foot-radius Sphere centered on a point the dragon can see within 120 feet. Failure: 14 (4d6) Cold damage, and the target’s Speed is 0 until the end of the target’s next turn. Failure or Success: The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Frightful Presence",
        "description": "The dragon casts Fear , requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18). The dragon can’t take this action again until the start of its next turn."
      },
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_animated_armor_2024",
    "name": "Animated Armor",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 18,
    "hitPoints": {
      "average": 33,
      "formula": "6d8 + 6"
    },
    "speed": "25 ft.",
    "stats": {
      "str": 14,
      "dex": 11,
      "con": 13,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 1
    },
    "damageImmunities": [
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 6",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The armor makes two Slam attacks."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Bludgeoning damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_animated_flying_sword_2024",
    "name": "Animated Flying Sword",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 17,
    "hitPoints": {
      "average": 14,
      "formula": "4d6"
    },
    "speed": "5 ft., Fly 50 ft. (hover)",
    "stats": {
      "str": 12,
      "dex": 15,
      "con": 11,
      "int": 1,
      "wis": 5,
      "cha": 1
    },
    "savingThrows": {
      "str": 1,
      "dex": 4,
      "con": 0
    },
    "damageImmunities": [
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 7",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_slash",
        "name": "Slash",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_animated_rug_of_smothering_2024",
    "name": "Animated Rug of Smothering",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 27,
      "formula": "5d10"
    },
    "speed": "10 ft.",
    "stats": {
      "str": 17,
      "dex": 14,
      "con": 10,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 0
    },
    "damageImmunities": [
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 6",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_smother",
        "name": "Smother",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, the rug can give it the Grappled condition (escape DC 13) instead of dealing damage. Until the grapple ends, the target has the Blinded and Restrained conditions, is suffocating, and takes 10 (2d6 + 3) Bludgeoning damage at the start of each of its turns. The rug can smother only one creature at a time.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_ankheg_2024",
    "name": "Ankheg",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "30 ft., Burrow 10 ft.",
    "stats": {
      "str": 17,
      "dex": 11,
      "con": 14,
      "int": 1,
      "wis": 13,
      "cha": 6
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 2,
      "wis": 1
    },
    "senses": "Darkvision 60 ft., Tremorsense 60 ft.; Passive Perception 11",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Tunneler",
        "description": "The ankheg can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 (with Advantage if the target is Grappled by the ankheg), reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage plus 3 (1d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13).",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_spray_recharge_6_",
        "name": "Acid Spray (Recharge 6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 12, each creature in a 30-foot-long, 5-foot-wide Line. Failure: 14 (4d6) Acid damage. Success: Half damage.",
        "damage": "4d6",
        "damageType": "Acid",
        "saveDc": 12,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_ankylosaurus_2024",
    "name": "Ankylosaurus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "subtype": "Dinosaur",
    "alignment": "Unaligned",
    "armorClass": 15,
    "hitPoints": {
      "average": 68,
      "formula": "8d12 + 16"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 19,
      "dex": 11,
      "con": 15,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 6,
      "dex": 0,
      "con": 2,
      "wis": 1
    },
    "senses": "Passive Perception 11",
    "languages": "None",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ankylosaurus makes two Tail attacks."
      },
      {
        "id": "act_tail",
        "name": "Tail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 9 (1d10 + 4) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d10+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_ape_2024",
    "name": "Ape",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 19,
      "formula": "3d8 + 6"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 16,
      "dex": 14,
      "con": 14,
      "int": 6,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "athletics": 5,
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ape makes two Fist attacks."
      },
      {
        "id": "act_fist",
        "name": "Fist",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Bludgeoning damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_rock_recharge_6_",
        "name": "Rock (Recharge 6)",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 25/50 ft. Hit: 10 (2d6 + 3) Bludgeoning damage.",
        "attackBonus": 5,
        "rangeFeet": 25,
        "rangeLongFeet": 50,
        "damage": "2d6+3",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_arcanaloth_2024",
    "name": "Arcanaloth",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Yugoloth",
    "alignment": "Neutral Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 175,
      "formula": "27d8 + 54"
    },
    "speed": "30 ft., Fly 30 ft. (hover)",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 14,
      "int": 20,
      "wis": 16,
      "cha": 17
    },
    "savingThrows": {
      "str": 3,
      "dex": 5,
      "con": 6,
      "int": 9,
      "wis": 7,
      "cha": 3
    },
    "skills": {
      "arcana": 9,
      "deception": 7,
      "insight": 7,
      "perception": 7
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning"
    ],
    "damageImmunities": [
      "Acid",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 17",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "12",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Fiendish Restoration",
        "description": "If the arcanaloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly and revives with all its Hit Points in Gehenna."
      },
      {
        "name": "Magic Resistance",
        "description": "The arcanaloth has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Soul Tome",
        "description": "The arcanaloth has a magic tome. While holding or carrying the tome, the arcanaloth can use its Banishing Claw action."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The arcanaloth makes three Fiendish Burst attacks. It can replace one attack with a Banishing Claw attack."
      },
      {
        "id": "act_banishing_claw_requires_soul_tome_",
        "name": "Banishing Claw (Requires Soul Tome)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 10 (2d4 + 5) Slashing damage plus 19 (3d12) Psychic damage. If the target is a creature, it is subjected to the following effect. Charisma Saving Throw: DC 17. Failure: The target is trapped in a demiplane inside the Soul Tome. While trapped there, the target has the Incapacitated condition. At the end of each of its turns, the target repeats the save, escaping the tome on a success. When the target escapes, it appears in the space it left or, if that space is occupied, the nearest unoccupied space.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d4+5",
        "damageType": "Slashing",
        "saveDc": 17,
        "saveStat": "cha"
      },
      {
        "id": "act_fiendish_burst",
        "name": "Fiendish Burst",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll : +9 , reach 5 ft. or range 120 ft. Hit: 31 (4d12 + 5) Necrotic damage.",
        "attackBonus": 9,
        "reachFeet": 5,
        "rangeFeet": 120,
        "damage": "4d12+5",
        "damageType": "Necrotic"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The arcanaloth casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 17):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Alter Self , Detect Magic , Identify , Mage Hand , Prestidigitation 1/Day Each: Contact Other Plane , Detect Thoughts , Dimension Door , Mind Blank"
      }
    ],
    "bonusActions": [
      {
        "name": "Teleport",
        "description": "The arcanaloth teleports up to 30 feet to an unoccupied space it can see."
      }
    ],
    "reactions": [
      {
        "name": "Counterspell",
        "description": "The arcanaloth casts Counterspell in response to that spell’s trigger, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_archelon_2024",
    "name": "Archelon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "subtype": "Dinosaur",
    "alignment": "Unaligned",
    "armorClass": 17,
    "hitPoints": {
      "average": 90,
      "formula": "12d12 + 12"
    },
    "speed": "20 ft., Swim 80 ft.",
    "stats": {
      "str": 18,
      "dex": 16,
      "con": 13,
      "int": 4,
      "wis": 14,
      "cha": 6
    },
    "savingThrows": {
      "str": 4,
      "dex": 3,
      "con": 1,
      "wis": 2
    },
    "skills": {
      "stealth": 5
    },
    "senses": "Passive Perception 12",
    "languages": "None",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The archelon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The archelon makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 14 (3d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "3d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_archmage_2024",
    "name": "Archmage",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Wizard",
    "alignment": "Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 170,
      "formula": "31d8 + 31"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 12,
      "int": 20,
      "wis": 15,
      "cha": 16
    },
    "savingThrows": {
      "str": 0,
      "dex": 2,
      "con": 1,
      "int": 9,
      "wis": 6,
      "cha": 3
    },
    "skills": {
      "arcana": 13,
      "history": 9,
      "perception": 6
    },
    "damageImmunities": [
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed"
    ],
    "senses": "Passive Perception 16",
    "languages": "Common plus five other languages",
    "challengeRating": "12",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The archmage has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The archmage makes four Arcane Burst attacks."
      },
      {
        "id": "act_arcane_burst",
        "name": "Arcane Burst",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +9 , reach 5 ft. or range 150 ft. Hit: 27 (4d10 + 5) Force damage.",
        "attackBonus": 9,
        "reachFeet": 5,
        "rangeFeet": 150,
        "damage": "4d10+5",
        "damageType": "Force"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Detect Thoughts , Disguise Self , Invisibility , Light , Mage Armor (included in AC), Mage Hand , Prestidigitation 2/Day Each: Fly , Lightning Bolt (level 7 version) 1/Day Each: Cone of Cold (level 9 version), Mind Blank (cast before combat), Scrying , Teleport"
      }
    ],
    "bonusActions": [
      {
        "name": "Misty Step (3/Day)",
        "description": "The mage casts Misty Step , using the same spellcasting ability as Spellcasting."
      }
    ],
    "reactions": [
      {
        "name": "Protective Magic (3/Day)",
        "description": "The archmage casts Counterspell or Shield in response to the spell’s trigger, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_archpriest_2024",
    "name": "Archpriest",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Cleric",
    "alignment": "Neutral",
    "armorClass": 16,
    "hitPoints": {
      "average": 240,
      "formula": "32d8 + 96"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 17,
      "int": 14,
      "wis": 21,
      "cha": 14
    },
    "savingThrows": {
      "str": 7,
      "dex": 1,
      "con": 7,
      "int": 6,
      "wis": 9,
      "cha": 2
    },
    "skills": {
      "insight": 9,
      "medicine": 9,
      "perception": 9,
      "religion": 10
    },
    "senses": "Passive Perception 19",
    "languages": "Common plus two other languages",
    "challengeRating": "12",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The archpriest makes three Radiant Burst attacks."
      },
      {
        "id": "act_radiant_burst",
        "name": "Radiant Burst",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +9 , reach 5 ft. or range 60 ft. Hit: 27 (4d10 + 5) Radiant damage.",
        "attackBonus": 9,
        "reachFeet": 5,
        "rangeFeet": 60,
        "damage": "4d10+5",
        "damageType": "Radiant"
      },
      {
        "id": "act_holy_word_recharge_4_6_",
        "name": "Holy Word (Recharge 4–6)",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 17, each enemy in a 20-foot Emanation originating from the archpriest. Failure: 21 (6d6) Radiant damage, and the target has the Stunned condition until the end of the archpriest’s next turn. Success: Half damage only.",
        "damage": "6d6",
        "damageType": "Radiant",
        "saveDc": 17,
        "saveStat": "wis"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The archpriest casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 17):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Light , Thaumaturgy 1/Day Each: Flame Strike (level 6 version), Greater Restoration , Raise Dead , Zone of Truth"
      }
    ],
    "bonusActions": [
      {
        "name": "Divine Aid (3/Day)",
        "description": "The priest casts Bless , Dispel Magic , Healing Word , or Lesser Restoration , using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_assassin_2024",
    "name": "Assassin",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 16,
    "hitPoints": {
      "average": 97,
      "formula": "15d8 + 30"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 18,
      "con": 14,
      "int": 16,
      "wis": 11,
      "cha": 10
    },
    "savingThrows": {
      "str": 0,
      "dex": 7,
      "con": 2,
      "int": 6,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "acrobatics": 7,
      "perception": 6,
      "stealth": 10
    },
    "damageResistances": [
      "Poison"
    ],
    "senses": "Passive Perception 16",
    "languages": "Common, Thieves&#x27; Cant",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Evasion",
        "description": "If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the save and only half damage if it fails. It can’t use this trait if it has the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The assassin makes three attacks, using Shortsword or Light Crossbow in any combination."
      },
      {
        "id": "act_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 7 (1d6 + 4) Piercing damage plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the start of the assassin’s next turn.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_light_crossbow",
        "name": "Light Crossbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +7 , range 80/320 ft. Hit: 8 (1d8 + 4) Piercing damage plus 21 (6d6) Poison damage.",
        "attackBonus": 7,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d8+4",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Cunning Action",
        "description": "The assassin takes the Dash , Disengage , or Hide action."
      }
    ]
  },
  {
    "id": "ddb_awakened_shrub_2024",
    "name": "Awakened Shrub",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Plant",
    "alignment": "Neutral",
    "armorClass": 9,
    "hitPoints": {
      "average": 10,
      "formula": "3d6"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 3,
      "dex": 8,
      "con": 11,
      "int": 10,
      "wis": 10,
      "cha": 6
    },
    "savingThrows": {
      "con": 0,
      "int": 0,
      "wis": 0
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageResistances": [
      "Piercing"
    ],
    "senses": "Passive Perception 10",
    "languages": "Common plus one other language",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_rake",
        "name": "Rake",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +1 , reach 5 ft. Hit: 1 Slashing damage.",
        "attackBonus": 1,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_awakened_tree_2024",
    "name": "Awakened Tree",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Plant",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 59,
      "formula": "7d12 + 14"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 19,
      "dex": 6,
      "con": 15,
      "int": 10,
      "wis": 10,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "con": 2,
      "int": 0,
      "wis": 0
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageResistances": [
      "Bludgeoning",
      "Piercing"
    ],
    "senses": "Passive Perception 10",
    "languages": "Common plus one other language",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 13 (2d8 + 4) Bludgeoning damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d8+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_axe_beak_2024",
    "name": "Axe Beak",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 14,
      "dex": 12,
      "con": 12,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 1,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_beak",
        "name": "Beak",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_azer_pyromancer_2024",
    "name": "Azer Pyromancer",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Lawful Neutral",
    "armorClass": 18,
    "hitPoints": {
      "average": 97,
      "formula": "13d8 + 39"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 16,
      "int": 12,
      "wis": 18,
      "cha": 13
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 6,
      "int": 1,
      "wis": 7,
      "cha": 1
    },
    "skills": {
      "arcana": 4,
      "perception": 7
    },
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Passive Perception 17",
    "languages": "Primordial (Ignan)",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fire Aura",
        "description": "At the end of each of the azer’s turns, each creature of the azer’s choice in a 5-foot Emanation originating from the azer takes 11 (2d10) Fire damage unless the azer has the Incapacitated condition."
      },
      {
        "name": "Illumination",
        "description": "The azer sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The azer makes two Flame Burst attacks."
      },
      {
        "id": "act_flame_burst",
        "name": "Flame Burst",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +7 , reach 5 ft. or range 120 ft. Hit: 15 (2d10 + 4) Fire damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "rangeFeet": 120,
        "damage": "2d10+4",
        "damageType": "Fire"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The azer casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 15):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Elementalism , Mage Hand 1/Day: Fireball"
      }
    ],
    "reactions": [
      {
        "name": "Hellish Rebuke (2/Day)",
        "description": "The azer casts Hellish Rebuke in response to that spell’s trigger, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_azer_sentinel_2024",
    "name": "Azer Sentinel",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Lawful Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 39,
      "formula": "6d8 + 12"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 15,
      "int": 12,
      "wis": 13,
      "cha": 10
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 4,
      "int": 1,
      "wis": 1,
      "cha": 0
    },
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Passive Perception 11",
    "languages": "Primordial (Ignan)",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Fire Aura",
        "description": "At the end of each of the azer’s turns, each creature of the azer’s choice in a 5-foot Emanation originating from the azer takes 5 (1d10) Fire damage unless the azer has the Incapacitated condition."
      },
      {
        "name": "Illumination",
        "description": "The azer sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "id": "act_burning_hammer",
        "name": "Burning Hammer",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (1d10 + 3) Bludgeoning damage plus 3 (1d6) Fire damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_baboon_2024",
    "name": "Baboon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 3,
      "formula": "1d6"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 8,
      "dex": 14,
      "con": 11,
      "int": 4,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 1
    },
    "senses": "Passive Perception 11",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The baboon has Advantage on an attack roll against a creature if at least one of the baboon’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +1 , reach 5 ft. Hit: 1 (1d4 - 1) Piercing damage.",
        "attackBonus": 1,
        "reachFeet": 5,
        "damage": "1d4-1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_badger_2024",
    "name": "Badger",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 5,
      "formula": "1d4 + 3"
    },
    "speed": "20 ft., Burrow 5 ft.",
    "stats": {
      "str": 10,
      "dex": 11,
      "con": 16,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 0,
      "dex": 0,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "damageResistances": [
      "Poison"
    ],
    "senses": "Darkvision 30 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 1 Piercing damage.",
        "attackBonus": 2,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_balor_2024",
    "name": "Balor",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 287,
      "formula": "23d12 + 138"
    },
    "speed": "40 ft., Fly 80 ft.",
    "stats": {
      "str": 26,
      "dex": 15,
      "con": 22,
      "int": 20,
      "wis": 16,
      "cha": 22
    },
    "savingThrows": {
      "str": 8,
      "dex": 2,
      "con": 12,
      "int": 5,
      "wis": 9,
      "cha": 6
    },
    "skills": {
      "perception": 9
    },
    "damageResistances": [
      "Cold",
      "Lightning"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 19",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "19",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Death Throes",
        "description": "The balor explodes when it dies. Dexterity Saving Throw: DC 20, each creature in a 30-foot Emanation originating from the balor. Failure: 31 (9d6) Fire damage plus 31 (9d6) Force damage. Success: Half damage. Failure or Success: If the balor dies outside the Abyss, it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss."
      },
      {
        "name": "Fire Aura",
        "description": "At the end of each of the balor’s turns, each creature in a 5-foot Emanation originating from the balor takes 13 (3d8) Fire damage."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the balor fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "description": "The balor has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The balor makes one Flame Whip attack and one Lightning Blade attack."
      },
      {
        "id": "act_flame_whip",
        "name": "Flame Whip",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 30 ft. Hit: 18 (3d6 + 8) Force damage plus 17 (5d6) Fire damage. If the target is a Huge or smaller creature, the balor pulls the target up to 25 feet straight toward itself, and the target has the Prone condition.",
        "attackBonus": 14,
        "reachFeet": 30,
        "damage": "3d6+8",
        "damageType": "Force"
      },
      {
        "id": "act_lightning_blade",
        "name": "Lightning Blade",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 21 (3d8 + 8) Force damage plus 22 (4d10) Lightning damage, and the target can’t take Reactions until the start of the balor’s next turn.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "3d8+8",
        "damageType": "Force"
      }
    ],
    "bonusActions": [
      {
        "name": "Teleport",
        "description": "The balor teleports itself or a willing demon within 10 feet of itself up to 60 feet to an unoccupied space the balor can see."
      }
    ]
  },
  {
    "id": "ddb_bandit_2024",
    "name": "Bandit",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 12,
      "con": 12,
      "int": 10,
      "wis": 10,
      "cha": 10
    },
    "savingThrows": {
      "str": 0,
      "dex": 1,
      "con": 1,
      "int": 0,
      "wis": 0,
      "cha": 0
    },
    "senses": "Passive Perception 10",
    "languages": "Common, Thieves&#x27; Cant",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 4 (1d6 + 1) Slashing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "Slashing"
      },
      {
        "id": "act_light_crossbow",
        "name": "Light Crossbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +3 , range 80/320 ft. Hit: 5 (1d8 + 1) Piercing damage.",
        "attackBonus": 3,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d8+1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_bandit_captain_2024",
    "name": "Bandit Captain",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 52,
      "formula": "8d8 + 16"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 15,
      "dex": 16,
      "con": 14,
      "int": 14,
      "wis": 11,
      "cha": 14
    },
    "savingThrows": {
      "str": 4,
      "dex": 5,
      "con": 2,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "skills": {
      "athletics": 4,
      "deception": 4
    },
    "senses": "Passive Perception 10",
    "languages": "Common, Thieves&#x27; Cant",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bandit makes two attacks, using Scimitar and Pistol in any combination."
      },
      {
        "id": "act_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_pistol",
        "name": "Pistol",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 30/90 ft. Hit: 8 (1d10 + 3) Piercing damage.",
        "attackBonus": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 90,
        "damage": "1d10+3",
        "damageType": "Piercing"
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "Trigger: The bandit is hit by a melee attack roll while holding a weapon. Response: The bandit adds 2 to its AC against that attack, possibly causing it to miss."
      }
    ]
  },
  {
    "id": "ddb_banshee_2024",
    "name": "Banshee",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 54,
      "formula": "12d8"
    },
    "speed": "5 ft., Fly 40 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 14,
      "con": 10,
      "int": 12,
      "wis": 11,
      "cha": 17
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "int": 1,
      "wis": 2,
      "cha": 3
    },
    "damageResistances": [
      "Acid",
      "Bludgeoning",
      "Fire",
      "Lightning",
      "Piercing",
      "Slashing",
      "Thunder"
    ],
    "damageImmunities": [
      "Cold",
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Common, Elvish",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Detect Life",
        "description": "The banshee magically senses the direction of creatures up to 1 mile away that aren’t Constructs or Undead."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The banshee can move through other creatures and objects as if they were Difficult Terrain . It takes 5 (1d10) Force damage if it ends its turn inside an object."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The banshee makes two Corrupting Touch attacks and uses Horrify."
      },
      {
        "id": "act_corrupting_touch",
        "name": "Corrupting Touch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Necrotic damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Necrotic"
      },
      {
        "id": "act_horrify",
        "name": "Horrify",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 13, one creature the banshee can see within 60 feet that can see the banshee. Failure: The target has the Frightened condition until the start of the banshee’s next turn. Success: The target is immune to this banshee’s Horrify for 24 hours.",
        "saveDc": 13,
        "saveStat": "wis"
      },
      {
        "id": "act_deathly_wail_1_day_",
        "name": "Deathly Wail (1/Day)",
        "type": "ability",
        "description": "The banshee releases a mournful wail if it isn’t in sunlight. Constitution Saving Throw: DC 13, each creature within 30 feet that can hear the wail and isn’t a Construct or an Undead. Failure: If the target has 25 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, the target takes 10 (3d6) Psychic damage.",
        "damage": "3d6",
        "damageType": "Psychic",
        "saveDc": 13,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_barbed_devil_2024",
    "name": "Barbed Devil",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 110,
      "formula": "13d8 + 52"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 16,
      "dex": 17,
      "con": 18,
      "int": 12,
      "wis": 14,
      "cha": 14
    },
    "savingThrows": {
      "str": 6,
      "dex": 3,
      "con": 7,
      "int": 1,
      "wis": 5,
      "cha": 5
    },
    "skills": {
      "deception": 5,
      "insight": 5,
      "perception": 8
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft. (unimpeded by magical Darkness); Passive Perception 18",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Barbed Hide",
        "description": "At the start of each of its turns, the devil deals 5 (1d10) Piercing damage to any creature it is grappling or any creature grappling it."
      },
      {
        "name": "Diabolical Restoration",
        "description": "If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes one Claws attack and one Tail attack, or it makes two Hurl Flame attacks."
      },
      {
        "id": "act_claws",
        "name": "Claws",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 10 (2d6 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13) from both claws.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_tail",
        "name": "Tail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 14 (2d10 + 3) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d10+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_hurl_flame",
        "name": "Hurl Flame",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 150 ft. Hit: 17 (5d6) Fire damage. If the target is a flammable object that isn’t being worn or carried, it starts burning.",
        "attackBonus": 5,
        "rangeFeet": 150,
        "damage": "5d6",
        "damageType": "Fire"
      }
    ]
  },
  {
    "id": "ddb_basilisk_2024",
    "name": "Basilisk",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 15,
    "hitPoints": {
      "average": 52,
      "formula": "8d8 + 16"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 16,
      "dex": 8,
      "con": 15,
      "int": 2,
      "wis": 8,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "con": 2
    },
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Piercing damage plus 7 (2d6) Poison damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Petrifying Gaze (Recharge 4–6)",
        "description": "Constitution Saving Throw: DC 12, each creature in a 30-foot Cone . If the basilisk sees its reflection within the Cone, the basilisk must make this save. First Failure: The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. Second Failure: The target has the Petrified condition instead of the Restrained condition."
      }
    ]
  },
  {
    "id": "ddb_bat_2024",
    "name": "Bat",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "5 ft., Fly 30 ft.",
    "stats": {
      "str": 2,
      "dex": 15,
      "con": 8,
      "int": 2,
      "wis": 12,
      "cha": 4
    },
    "savingThrows": {
      "dex": 2,
      "wis": 1
    },
    "senses": "Blindsight 60 ft.; Passive Perception 11",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 to hit, reach 5 ft. Hit: 1 Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_bearded_devil_2024",
    "name": "Bearded Devil",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 58,
      "formula": "9d8 + 18"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 15,
      "con": 15,
      "int": 9,
      "wis": 11,
      "cha": 14
    },
    "savingThrows": {
      "str": 5,
      "dex": 2,
      "con": 4,
      "wis": 0,
      "cha": 4
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Frightened",
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft. (unimpeded by magical Darkness); Passive Perception 10",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The devil has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes one Beard attack and one Infernal Glaive attack."
      },
      {
        "id": "act_beard",
        "name": "Beard",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage, and the target has the Poisoned condition until the start of the devil’s next turn. Until this poison ends, the target can’t regain Hit Points.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_infernal_glaive",
        "name": "Infernal Glaive",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 10 ft. Hit: 8 (1d10 + 3) Slashing damage. If the target is a creature and doesn’t already have an infernal wound, it is subjected to the following effect. Constitution Saving Throw: DC 12. Failure: The target receives an infernal wound. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, doing so by succeeding on a DC 12 Wisdom ( Medicine ) check.",
        "attackBonus": 5,
        "reachFeet": 10,
        "damage": "1d10+3",
        "damageType": "Slashing",
        "saveDc": 12,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_behir_2024",
    "name": "Behir",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 168,
      "formula": "16d12 + 64"
    },
    "speed": "50 ft., Climb 50 ft.",
    "stats": {
      "str": 23,
      "dex": 16,
      "con": 18,
      "int": 7,
      "wis": 14,
      "cha": 12
    },
    "savingThrows": {
      "str": 6,
      "dex": 3,
      "con": 4,
      "wis": 2,
      "cha": 1
    },
    "skills": {
      "perception": 6,
      "stealth": 7
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Darkvision 90 ft.; Passive Perception 16",
    "languages": "Draconic",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The behir makes one Bite attack and uses Constrict."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 19 (2d12 + 6) Piercing damage plus 11 (2d10) Lightning damage.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d12+6",
        "damageType": "Piercing"
      },
      {
        "id": "act_constrict",
        "name": "Constrict",
        "type": "ability",
        "description": "Strength Saving Throw: DC 18, one Large or smaller creature the behir can see within 5 feet. Failure: 28 (5d8 + 6) Bludgeoning damage. The target has the Grappled condition (escape DC 16), and it has the Restrained condition until the grapple ends.",
        "damage": "5d8+6",
        "damageType": "Bludgeoning",
        "saveDc": 18,
        "saveStat": "str"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 16, each creature in a 90-foot-long, 5-foot- wide Line. Failure: 66 (12d10) Lightning damage. Success: Half damage.",
        "damage": "12d10",
        "damageType": "Lightning",
        "saveDc": 16,
        "saveStat": "dex"
      }
    ],
    "bonusActions": [
      {
        "name": "Swallow",
        "description": "Dexterity Saving Throw: DC 18, one Large or smaller creature Grappled by the behir (the behir can have only one creature swallowed at a time). Failure: The behir swallows the target, which is no longer Grappled. While swallowed, a creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the behir, and takes 21 (6d6) Acid damage at the start of each of the behir’s turns."
      }
    ]
  },
  {
    "id": "ddb_beholder_zombie_2024",
    "name": "Beholder Zombie",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 93,
      "formula": "11d10 + 33"
    },
    "speed": "5 ft., Fly 20 ft. (hover)",
    "stats": {
      "str": 14,
      "dex": 8,
      "con": 16,
      "int": 3,
      "wis": 8,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "con": 3,
      "wis": 2
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned",
      "Prone"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "Understands Deep Speech and Undercommon but can’t speak",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The zombie uses Eye Rays twice."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 16 (4d6 + 2) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "4d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_eye_rays",
        "name": "Eye Rays",
        "type": "ability",
        "description": "The zombie randomly shoots one of the following magical rays at a target it can see within 120 feet of itself (roll 1d4; reroll if the zombie has already used that ray during this turn):"
      }
    ]
  },
  {
    "id": "ddb_berserker_2024",
    "name": "Berserker",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 67,
      "formula": "9d8 + 27"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 17,
      "int": 9,
      "wis": 11,
      "cha": 9
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 3,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "Common",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Bloodied Frenzy",
        "description": "While Bloodied , the berserker has Advantage on attack rolls and saving throws."
      }
    ],
    "actions": [
      {
        "id": "act_greataxe",
        "name": "Greataxe",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 9 (1d12 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d12+3",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_black_bear_2024",
    "name": "Black Bear",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 19,
      "formula": "3d8 + 6"
    },
    "speed": "30 ft., Climb 30 ft., Swim 30 ft.",
    "stats": {
      "str": 15,
      "dex": 12,
      "con": 14,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bear makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_black_dragon_wyrmling_2024",
    "name": "Black Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 33,
      "formula": "6d8 + 6"
    },
    "speed": "30 ft., Fly 60 ft., Swim 30 ft.",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 13,
      "int": 10,
      "wis": 11,
      "cha": 13
    },
    "savingThrows": {
      "str": 2,
      "dex": 4,
      "con": 1,
      "int": 0,
      "wis": 2,
      "cha": 1
    },
    "skills": {
      "perception": 4,
      "stealth": 4
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Slashing damage plus 2 (1d4) Acid damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_breath_recharge_5_6_",
        "name": "Acid Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 11, each creature in a 15-foot-long, 5-foot-wide Line. Failure: 22 (5d8) Acid damage. Success: Half damage.",
        "damage": "5d8",
        "damageType": "Acid",
        "saveDc": 11,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_black_pudding_2024",
    "name": "Black Pudding",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "armorClass": 7,
    "hitPoints": {
      "average": 68,
      "formula": "8d10 + 24"
    },
    "speed": "20 ft., Climb 20 ft.",
    "stats": {
      "str": 16,
      "dex": 5,
      "con": 16,
      "int": 1,
      "wis": 6,
      "cha": 1
    },
    "savingThrows": {
      "str": 3,
      "con": 3
    },
    "damageImmunities": [
      "Acid",
      "Cold",
      "Lightning",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Grappled",
      "Prone",
      "Restrained"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The pudding can move through a space as narrow as 1 inch without expending extra movement to do so."
      },
      {
        "name": "Corrosive Form",
        "description": "A creature that hits the pudding with a melee attack roll takes 4 (1d8) Acid damage. Nonmagical ammunition is destroyed immediately after hitting the pudding and dealing any damage. Any nonmagical weapon takes a cumulative −1 penalty to attack rolls immediately after dealing damage to the pudding and coming into contact with it. The weapon is destroyed if the penalty reaches −5. The penalty can be removed by casting the Mending spell on the weapon."
      },
      {
        "name": "Spider Climb",
        "description": "The pudding can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_dissolving_pseudopod",
        "name": "Dissolving Pseudopod",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 10 ft. Hit: 17 (4d6 + 3) Acid damage. Nonmagical armor worn by the target takes a −1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.",
        "attackBonus": 5,
        "reachFeet": 10,
        "damage": "4d6+3",
        "damageType": "Acid"
      }
    ],
    "reactions": [
      {
        "name": "Split",
        "description": "Trigger: While the pudding is Large or Medium and has 10+ Hit Points, it becomes Bloodied or is subjected to Lightning or Slashing damage. Response: The pudding splits into two new Black Puddings . Each new pudding is one size smaller than the original pudding and acts on its Initiative. The original pudding’s Hit Points are divided evenly between the new puddings (round down)."
      }
    ]
  },
  {
    "id": "ddb_blink_dog_2024",
    "name": "Blink Dog",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Lawful Good",
    "armorClass": 13,
    "hitPoints": {
      "average": 22,
      "formula": "4d8 + 4"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 12,
      "dex": 17,
      "con": 12,
      "int": 10,
      "wis": 13,
      "cha": 11
    },
    "savingThrows": {
      "str": 1,
      "dex": 3,
      "con": 1,
      "int": 0,
      "wis": 1,
      "cha": 0
    },
    "skills": {
      "perception": 5,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "Understands Elvish and Sylvan but can’t speak them",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Teleport (Recharge 4–6)",
        "description": "The dog teleports up to 40 feet to an unoccupied space it can see."
      }
    ]
  },
  {
    "id": "ddb_blood_hawk_2024",
    "name": "Blood Hawk",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 7,
      "formula": "2d6"
    },
    "speed": "10 ft., Fly 60 ft.",
    "stats": {
      "str": 6,
      "dex": 14,
      "con": 10,
      "int": 3,
      "wis": 14,
      "cha": 5
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 2
    },
    "skills": {
      "perception": 6
    },
    "senses": "Passive Perception 16",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The hawk has Advantage on an attack roll against a creature if at least one of the hawk’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_beak",
        "name": "Beak",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage, or 6 (1d8 + 2) Piercing damage if the target is Bloodied .",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_blue_dragon_wyrmling_2024",
    "name": "Blue Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 65,
      "formula": "10d8 + 20"
    },
    "speed": "30 ft., Burrow 15 ft., Fly 60 ft.",
    "stats": {
      "str": 17,
      "dex": 10,
      "con": 15,
      "int": 12,
      "wis": 11,
      "cha": 15
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (1d10 + 3) Slashing damage plus 3 (1d6) Lightning damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 12, each creature in a 30-foot-long, 5-foot-wide Line. Failure: 21 (6d6) Lightning damage. Success: Half damage.",
        "damage": "6d6",
        "damageType": "Lightning",
        "saveDc": 12,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_boar_2024",
    "name": "Boar",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 13,
      "formula": "2d8 + 4"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 13,
      "dex": 11,
      "con": 14,
      "int": 2,
      "wis": 9,
      "cha": 5
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 2
    },
    "senses": "Passive Perception 9",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Bloodied Fury",
        "description": "While Bloodied , the boar has Advantage on attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 4 (1d6 + 1) Piercing damage. If the target is a Medium or smaller creature and the boar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 3 (1d6) Piercing damage and has the Prone condition.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_bone_devil_2024",
    "name": "Bone Devil",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 161,
      "formula": "17d10 + 68"
    },
    "speed": "40 ft., Fly 40 ft.",
    "stats": {
      "str": 18,
      "dex": 16,
      "con": 18,
      "int": 13,
      "wis": 14,
      "cha": 16
    },
    "savingThrows": {
      "str": 8,
      "dex": 3,
      "con": 4,
      "int": 5,
      "wis": 6,
      "cha": 7
    },
    "skills": {
      "deception": 7,
      "insight": 6
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft. (unimpeded by magical Darkness); Passive Perception 12",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Diabolical Restoration",
        "description": "If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes two Claw attacks and one Infernal Sting attack."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 13 (2d8 + 4) Slashing damage.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d8+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_infernal_sting",
        "name": "Infernal Sting",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 15 (2d10 + 4) Piercing damage plus 18 (4d8) Poison damage, and the target has the Poisoned condition until the start of the devil’s next turn. While Poisoned, the target can’t regain Hit Points.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_brass_dragon_wyrmling_2024",
    "name": "Brass Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Chaotic Good",
    "armorClass": 15,
    "hitPoints": {
      "average": 22,
      "formula": "4d8 + 4"
    },
    "speed": "30 ft., Burrow 15 ft., Fly 60 ft.",
    "stats": {
      "str": 15,
      "dex": 10,
      "con": 13,
      "int": 10,
      "wis": 11,
      "cha": 13
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 1,
      "int": 0,
      "wis": 2,
      "cha": 1
    },
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (1d10 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 11, each creature in a 20-foot-long, 5-foot-wide Line. Failure: 14 (4d6) Fire damage. Success: Half damage.",
        "damage": "4d6",
        "damageType": "Fire",
        "saveDc": 11,
        "saveStat": "dex"
      },
      {
        "id": "act_sleep_breath",
        "name": "Sleep Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 11, each creature in a 15-foot Cone. First Failure: The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. Second Failure: The target has the Unconscious condition for 1 minute. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.",
        "saveDc": 11,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_bronze_dragon_wyrmling_2024",
    "name": "Bronze Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 15,
    "hitPoints": {
      "average": 39,
      "formula": "6d8 + 12"
    },
    "speed": "30 ft., Fly 60 ft., Swim 30 ft.",
    "stats": {
      "str": 17,
      "dex": 10,
      "con": 15,
      "int": 12,
      "wis": 11,
      "cha": 15
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (1d10 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 12, each creature in a 40-foot-long, 5-foot-wide Line. Failure: 16 (3d10) Lightning damage. Success: Half damage.",
        "damage": "3d10",
        "damageType": "Lightning",
        "saveDc": 12,
        "saveStat": "dex"
      },
      {
        "id": "act_repulsion_breath",
        "name": "Repulsion Breath",
        "type": "ability",
        "description": "Strength Saving Throw: DC 12, each creature in a 30-foot Cone. Failure: The target is pushed up to 30 feet straight away from the dragon and has the Prone condition.",
        "saveDc": 12,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_brown_bear_2024",
    "name": "Brown Bear",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 22,
      "formula": "3d10 + 6"
    },
    "speed": "40 ft., Climb 30 ft.",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 15,
      "int": 2,
      "wis": 13,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bear makes one Bite attack and one Claw attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_bugbear_stalker_2024",
    "name": "Bugbear Stalker",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "subtype": "Goblinoid",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 65,
      "formula": "10d8 + 20"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 17,
      "dex": 14,
      "con": 14,
      "int": 11,
      "wis": 12,
      "cha": 11
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 4,
      "int": 0,
      "wis": 3,
      "cha": 0
    },
    "skills": {
      "stealth": 6,
      "survival": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "Common, Goblin",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Abduct",
        "description": "The bugbear needn’t spend extra movement to move a creature it is grappling ."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bugbear makes two Javelin or Morningstar attacks."
      },
      {
        "id": "act_javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +5 , reach 10 ft. or range 30/120 ft. Hit: 13 (3d6 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 10,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "3d6+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_morningstar",
        "name": "Morningstar",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 (with Advantage if the target is Grappled by the bugbear), reach 10 ft. Hit: 12 (2d8 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 10,
        "damage": "2d8+3",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Quick Grapple",
        "description": "Dexterity Saving Throw: DC 13, one Medium or smaller creature the bugbear can see within 10 feet. Failure: The target has the Grappled condition (escape DC 13)."
      }
    ]
  },
  {
    "id": "ddb_bugbear_warrior_2024",
    "name": "Bugbear Warrior",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "subtype": "Goblinoid",
    "alignment": "Chaotic Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 33,
      "formula": "6d8 + 6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 13,
      "int": 8,
      "wis": 11,
      "cha": 9
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "stealth": 6,
      "survival": 2
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Common, Goblin",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Abduct",
        "description": "The bugbear needn’t spend extra movement to move a creature it is grappling ."
      }
    ],
    "actions": [
      {
        "id": "act_grab",
        "name": "Grab",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 10 ft. Hit: 9 (2d6 + 2) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12).",
        "attackBonus": 4,
        "reachFeet": 10,
        "damage": "2d6+2",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_light_hammer",
        "name": "Light Hammer",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +4 (with Advantage if the target is Grappled by the bugbear), reach 10 ft. or range 20/60 ft. Hit: 9 (3d4 + 2) Bludgeoning damage.",
        "attackBonus": 4,
        "reachFeet": 10,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "3d4+2",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_bulette_2024",
    "name": "Bulette",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 17,
    "hitPoints": {
      "average": 94,
      "formula": "9d10 + 45"
    },
    "speed": "40 ft., Burrow 40 ft.",
    "stats": {
      "str": 19,
      "dex": 11,
      "con": 21,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 5,
      "wis": 0
    },
    "skills": {
      "perception": 6
    },
    "senses": "Darkvision 60 ft., Tremorsense 120 ft.; Passive Perception 16",
    "languages": "--",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bulette makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 17 (2d12 + 4) Piercing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d12+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_deadly_leap",
        "name": "Deadly Leap",
        "type": "ability",
        "description": "The bulette spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Dexterity Saving Throw: DC 15, each creature in the bulette’s destination space. Failure: 19 (3d12) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away from the bulette.",
        "damage": "3d12",
        "damageType": "Bludgeoning",
        "saveDc": 15,
        "saveStat": "dex"
      }
    ],
    "bonusActions": [
      {
        "name": "Leap",
        "description": "The bulette jumps up to 30 feet by spending 10 feet of movement."
      }
    ]
  },
  {
    "id": "ddb_bullywug_bog_sage_2024",
    "name": "Bullywug Bog Sage",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Neutral",
    "armorClass": 16,
    "hitPoints": {
      "average": 52,
      "formula": "8d8 + 16"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 8,
      "dex": 16,
      "con": 14,
      "int": 10,
      "wis": 16,
      "cha": 12
    },
    "savingThrows": {
      "dex": 3,
      "con": 4,
      "int": 0,
      "wis": 5,
      "cha": 3
    },
    "skills": {
      "nature": 4,
      "stealth": 5
    },
    "senses": "Passive Perception 13",
    "languages": "Bullywug, Common",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The bullywug can breathe air and water."
      },
      {
        "name": "Speak with Frogs and Toads",
        "description": "The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bullywug makes two Bog Staff attacks. It can replace any attack with a use of Spellcasting to cast Ray of Sickness ."
      },
      {
        "id": "act_bog_staff",
        "name": "Bog Staff",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Bludgeoning damage plus 10 (3d6) Poison damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The bullywug casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13, +5 to hit with spell attacks):",
        "attackBonus": 5
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Dancing Lights , Druidcraft , Ray of Sickness 1/Day Each: Speak with Plants , Vitriolic Sphere"
      }
    ],
    "bonusActions": [
      {
        "name": "Leap",
        "description": "The bullywug can jump up to 30 feet by spending 10 feet of movement."
      }
    ]
  },
  {
    "id": "ddb_bullywug_warrior_2024",
    "name": "Bullywug Warrior",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 12,
      "dex": 14,
      "con": 13,
      "int": 7,
      "wis": 10,
      "cha": 7
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "stealth": 4
    },
    "senses": "Passive Perception 10",
    "languages": "Bullywug, Common",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The bullywug can breathe air and water."
      },
      {
        "name": "Speak with Frogs and Toads",
        "description": "The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug."
      }
    ],
    "actions": [
      {
        "id": "act_insectile_rapier",
        "name": "Insectile Rapier",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage plus 2 (1d4) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Leap",
        "description": "The bullywug can jump up to 30 feet by spending 10 feet of movement."
      }
    ]
  },
  {
    "id": "ddb_cambion_2024",
    "name": "Cambion",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Neutral Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 105,
      "formula": "14d8 + 42"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 18,
      "dex": 18,
      "con": 16,
      "int": 14,
      "wis": 12,
      "cha": 16
    },
    "savingThrows": {
      "str": 7,
      "dex": 4,
      "con": 6,
      "int": 5,
      "wis": 1,
      "cha": 6
    },
    "skills": {
      "deception": 6,
      "perception": 4,
      "stealth": 7
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 14",
    "languages": "Abyssal, Common, Infernal",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The cambion makes two attacks, using Claw or Fire Ray in any combination."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 8 (1d8 + 4) Slashing damage plus 7 (2d6) Fire damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_ray",
        "name": "Fire Ray",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +7 , range 120 ft. Hit: 13 (3d6 + 3) Fire damage.",
        "attackBonus": 7,
        "rangeFeet": 120,
        "damage": "3d6+3",
        "damageType": "Fire"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The cambion casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14):"
      },
      {
        "id": "act_2_day_each_",
        "name": "2/Day Each:",
        "type": "ability",
        "description": "Alter Self , Command (level 3 version), Detect Magic 1/Day Each: Dominate Person (level 8 version), Plane Shift (self only)"
      }
    ]
  },
  {
    "id": "ddb_camel_2024",
    "name": "Camel",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 17,
      "formula": "2d10 + 6"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 15,
      "dex": 8,
      "con": 17,
      "int": 2,
      "wis": 11,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "con": 5,
      "wis": 0
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit : 4 (1d4 + 2) Bludgeoning damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_carrion_crawler_2024",
    "name": "Carrion Crawler",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 51,
      "formula": "6d10 + 18"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 14,
      "dex": 13,
      "con": 16,
      "int": 1,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The carrion crawler can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The carrion crawler uses Paralyzing Tentacles and makes one Bite attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (2d4 + 2) Piercing damage plus 3 (1d6) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_paralyzing_tentacles",
        "name": "Paralyzing Tentacles",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 12, one creature the carrion crawler can see within 10 feet. Failure: The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Poisoned, the target has the Paralyzed condition.",
        "saveDc": 12,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_cat_2024",
    "name": "Cat",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 2,
      "formula": "1d4"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 3,
      "dex": 15,
      "con": 10,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "dex": 4,
      "con": 0,
      "wis": 1
    },
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Jumper",
        "description": "The cat's jump distance is determined using its Dexterity rather than its Strength."
      }
    ],
    "actions": [
      {
        "id": "act_scratch",
        "name": "Scratch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 1 Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_centaur_trooper_2024",
    "name": "Centaur Trooper",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fey",
    "alignment": "Neutral Good",
    "armorClass": 16,
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 14,
      "int": 9,
      "wis": 13,
      "cha": 11
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 2,
      "wis": 1,
      "cha": 0
    },
    "skills": {
      "athletics": 6,
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "Elvish, Sylvan",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The centaur makes two attacks, using Pike or Longbow in any combination."
      },
      {
        "id": "act_pike",
        "name": "Pike",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 9 (1d10 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d10+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 150/600 ft. Hit: 6 (1d8 + 2) Piercing damage.",
        "attackBonus": 4,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+2",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Trampling Charge (Recharge 5–6)",
        "description": "The centaur moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space the centaur enters is targeted once by the following effect. Strength Saving Throw: DC 14. Failure: 7 (1d6 + 4) Bludgeoning damage, and the target has the Prone condition."
      }
    ]
  },
  {
    "id": "ddb_chain_devil_2024",
    "name": "Chain Devil",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 85,
      "formula": "10d8 + 40"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 18,
      "int": 11,
      "wis": 12,
      "cha": 14
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 7,
      "int": 0,
      "wis": 4,
      "cha": 2
    },
    "damageResistances": [
      "Bludgeoning",
      "Cold",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft. (unimpeded by magical darkness); Passive Perception 11",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Diabolical Restoration",
        "description": "If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes two Chain attacks and uses Conjure Infernal Chain."
      },
      {
        "id": "act_chain",
        "name": "Chain",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 11 (2d6 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of two chains, and it has the Restrained condition until the grapple ends.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_conjure_infernal_chain",
        "name": "Conjure Infernal Chain",
        "type": "ability",
        "description": "The devil conjures a fiery chain to bind a creature. Dexterity Saving Throw: DC 15, one creature the devil can see within 60 feet. Failure: 9 (2d4 + 4) Fire damage, and the target has the Restrained condition until the end of the devil’s next turn, at which point the chain disappears. If the target is Large or smaller, the devil moves the target up to 30 feet straight toward itself. Success: The chain disappears.",
        "damage": "2d4+4",
        "damageType": "Fire",
        "saveDc": 15,
        "saveStat": "dex"
      }
    ],
    "reactions": [
      {
        "name": "Unnerving Gaze",
        "description": "Trigger: A creature the devil can see starts its turn within 30 feet of the devil and can see the devil. Response—Wisdom Saving Throw: DC 15, the triggering creature. Failure: The target has the Frightened condition until the end of its turn. Success: The target is immune to this devil’s Unnerving Gaze for 24 hours."
      }
    ]
  },
  {
    "id": "ddb_chimera_2024",
    "name": "Chimera",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 114,
      "formula": "12d10 + 48"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 19,
      "dex": 11,
      "con": 19,
      "int": 3,
      "wis": 14,
      "cha": 10
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 4,
      "wis": 2,
      "cha": 0
    },
    "skills": {
      "perception": 8
    },
    "senses": "Darkvision 60 ft.; Passive Perception 18",
    "languages": "Understands Draconic but can’t speak",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The chimera makes one Ram attack, one Bite attack, and one Claw attack. It can replace the Claw attack with a use of Fire Breath if available."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 11 (2d6 + 4) Piercing damage, or 18 (4d6 + 4) Piercing damage if the chimera had Advantage on the attack roll.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 7 (1d6 + 4) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_ram",
        "name": "Ram",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 10 (1d12 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d12+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 31 (7d8) Fire damage. Success: Half damage.",
        "damage": "7d8",
        "damageType": "Fire",
        "saveDc": 15,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_chuul_2024",
    "name": "Chuul",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 76,
      "formula": "9d10 + 27"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 16,
      "int": 5,
      "wis": 11,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 3,
      "wis": 0
    },
    "skills": {
      "perception": 4
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Understands Deep Speech but can&#x27;t speak",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The chuul can breathe air and water."
      },
      {
        "name": "Sense Magic",
        "description": "The chuul senses magic within 120 feet of itself. This trait otherwise works like the Detect Magic spell but isn’t itself magical."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The chuul makes two Pincer attacks and uses Paralyzing Tentacles."
      },
      {
        "id": "act_pincer",
        "name": "Pincer",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 9 (1d10 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of two pincers.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d10+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_paralyzing_tentacles",
        "name": "Paralyzing Tentacles",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 13, one creature Grappled by the chuul. Failure: The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Poisoned, the target has the Paralyzed condition.",
        "saveDc": 13,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_clay_golem_2024",
    "name": "Clay Golem",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 123,
      "formula": "13d10 + 52"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 20,
      "dex": 9,
      "con": 18,
      "int": 3,
      "wis": 8,
      "cha": 1
    },
    "savingThrows": {
      "str": 5,
      "con": 4
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Acid",
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "Common plus one other language",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Acid Absorption",
        "description": "Whenever the golem is subjected to Acid damage, it takes no damage and instead regains a number of Hit Points equal to the Acid damage dealt."
      },
      {
        "name": "Berserk",
        "description": "Whenever the golem starts its turn Bloodied , roll 1d6 . On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object. Once the golem goes berserk, it continues to be berserk until it is destroyed or it is no longer Bloodied."
      },
      {
        "name": "Immutable Form",
        "description": "The golem can’t shape-shift."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 10 (1d10 + 5) Bludgeoning damage plus 6 (1d12) Acid damage, and the target’s Hit Point maximum decreases by an amount equal to the Acid damage taken.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "1d10+5",
        "damageType": "Bludgeoning"
      }
    ],
    "bonusActions": [
      {
        "name": "Hasten (Recharge 5–6)",
        "description": "The golem takes the Dash and Disengage actions."
      }
    ]
  },
  {
    "id": "ddb_cloaker_2024",
    "name": "Cloaker",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Chaotic Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 91,
      "formula": "14d10 + 14"
    },
    "speed": "10 ft., Fly 40 ft.",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 12,
      "int": 13,
      "wis": 14,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 1,
      "int": 1,
      "wis": 2
    },
    "skills": {
      "stealth": 5
    },
    "conditionImmunities": [
      "Frightened"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 12",
    "languages": "Deep Speech, Undercommon",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Light Sensitivity",
        "description": "While in Bright Light , the cloaker has Disadvantage on attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The cloaker makes one Attach attack and two Tail attacks."
      },
      {
        "id": "act_attach",
        "name": "Attach",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 13 (3d6 + 3) Piercing damage. If the target is a Large or smaller creature, the cloaker attaches to it. While the cloaker is attached, the target has the Blinded condition, and the cloaker can’t make Attach attacks against other targets. In addition, the cloaker halves the damage it takes (round down), and the target takes the same amount of damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "3d6+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_tail",
        "name": "Tail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 8 (1d10 + 3) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d10+3",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Moan",
        "description": "Wisdom Saving Throw: DC 13, each creature in a 60-foot Emanation originating from the cloaker. Failure: The target has the Frightened condition until the end of the cloaker’s next turn. Success: The target is immune to this cloaker’s Moan for the next 24 hours."
      },
      {
        "name": "Phantasms (Recharge after a Short or Long Rest)",
        "description": "The cloaker casts the Mirror Image spell, requiring no spell components and using Wisdom as the spellcasting ability. The spell ends early if the cloaker starts or ends its turn in Bright Light ."
      }
    ]
  },
  {
    "id": "ddb_cloud_giant_2024",
    "name": "Cloud Giant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 200,
      "formula": "16d12 + 96"
    },
    "speed": "40 ft., Fly 20 ft.",
    "stats": {
      "str": 27,
      "dex": 10,
      "con": 22,
      "int": 12,
      "wis": 16,
      "cha": 16
    },
    "savingThrows": {
      "str": 8,
      "dex": 0,
      "con": 10,
      "int": 1,
      "wis": 7,
      "cha": 3
    },
    "skills": {
      "insight": 7,
      "perception": 11
    },
    "senses": "Passive Perception 21",
    "languages": "Common, Giant",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two attacks, using Thunderous Mace or Thundercloud in any combination. It can replace one attack with a use of Spellcasting to cast Fog Cloud ."
      },
      {
        "id": "act_thunderous_mace",
        "name": "Thunderous Mace",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +12 , reach 10 ft. Hit: 21 (3d8 + 8) Bludgeoning damage plus 7 (2d6) Thunder damage.",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "3d8+8",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_thundercloud",
        "name": "Thundercloud",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +12 , range 240 ft. Hit: 18 (3d6 + 8) Thunder damage, and the target has the Incapacitated condition until the end of its next turn.",
        "attackBonus": 12,
        "rangeFeet": 240,
        "damage": "3d6+8",
        "damageType": "Thunder"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The giant casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Fog Cloud , Light 1/Day Each: Control Weather , Gaseous Form , Telekinesis"
      }
    ],
    "bonusActions": [
      {
        "name": "Misty Step",
        "description": "The giant casts the Misty Step spell, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_cockatrice_2024",
    "name": "Cockatrice",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 22,
      "formula": "5d6 + 5"
    },
    "speed": "20 ft., Fly 40 ft.",
    "stats": {
      "str": 6,
      "dex": 12,
      "con": 12,
      "int": 2,
      "wis": 13,
      "cha": 5
    },
    "savingThrows": {
      "dex": 1,
      "con": 1,
      "wis": 1
    },
    "conditionImmunities": [
      "Petrified"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_petrifying_bite",
        "name": "Petrifying Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 3 (1d4 + 1) Piercing damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 11. First Failure: The target has the Restrained condition. The target repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. Second Failure: The target has the Petrified condition, instead of the Restrained condition, for 24 hours.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "Piercing",
        "saveDc": 11,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_commoner_2024",
    "name": "Commoner",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 10,
    "hitPoints": {
      "average": 4,
      "formula": "1d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 10,
      "con": 10,
      "int": 10,
      "wis": 10,
      "cha": 10
    },
    "savingThrows": {
      "str": 0,
      "dex": 0,
      "con": 0,
      "int": 0,
      "wis": 0,
      "cha": 0
    },
    "senses": "Passive Perception 10",
    "languages": "Common",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Training",
        "description": "The commoner has proficiency in one skill of the DM’s choice and has Advantage whenever it makes an ability check using that skill."
      }
    ],
    "actions": [
      {
        "id": "act_club",
        "name": "Club",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 2 (1d4) Bludgeoning damage.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_constrictor_snake_2024",
    "name": "Constrictor Snake",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 13,
      "formula": "2d10 + 2"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 12,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "perception": 2,
      "stealth": 4
    },
    "senses": "Blindsight 10 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_constrict",
        "name": "Constrict",
        "type": "ability",
        "description": "Strength Saving Throw: DC 12, one Medium or smaller creature the snake can see within 5 feet. Failure: 7 (3d4) Bludgeoning damage, and the target has the Grappled condition (escape DC 12).",
        "damage": "3d4",
        "damageType": "Bludgeoning",
        "saveDc": 12,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_copper_dragon_wyrmling_2024",
    "name": "Copper Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Chaotic Good",
    "armorClass": 16,
    "hitPoints": {
      "average": 22,
      "formula": "4d8 + 4"
    },
    "speed": "30 ft., Climb 30 ft., Fly 60 ft.",
    "stats": {
      "str": 15,
      "dex": 12,
      "con": 13,
      "int": 14,
      "wis": 11,
      "cha": 13
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 1,
      "int": 2,
      "wis": 2,
      "cha": 1
    },
    "skills": {
      "perception": 4,
      "stealth": 3
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (1d10 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_breath_recharge_5_6_",
        "name": "Acid Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 11, each creature in a 20-foot-long, 5-foot-wide Line. Failure: 18 (4d8) Acid damage. Success: Half damage.",
        "damage": "4d8",
        "damageType": "Acid",
        "saveDc": 11,
        "saveStat": "dex"
      },
      {
        "id": "act_slowing_breath",
        "name": "Slowing Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 11, each creature in a 15-foot Cone. Failure: The target can’t take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. This effect lasts until the end of its next turn.",
        "saveDc": 11,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_couatl_2024",
    "name": "Couatl",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "hitPoints": {
      "average": 60,
      "formula": "8d8 + 24"
    },
    "speed": "30 ft., Fly 90 ft.",
    "stats": {
      "str": 16,
      "dex": 20,
      "con": 17,
      "int": 18,
      "wis": 20,
      "cha": 18
    },
    "savingThrows": {
      "str": 3,
      "dex": 5,
      "con": 5,
      "int": 4,
      "wis": 7,
      "cha": 4
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Psychic",
      "Radiant"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 15",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shielded Mind",
        "description": "The couatl’s thoughts can’t be read by any means, and other creatures can communicate with it telepathically only if it allows them."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 11 (1d12 + 5) Piercing damage, and the target has the Poisoned condition until the end of the couatl’s next turn.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d12+5",
        "damageType": "Piercing"
      },
      {
        "id": "act_constrict",
        "name": "Constrict",
        "type": "ability",
        "description": "Strength Saving Throw: DC 15, one Medium or smaller creature the couatl can see within 5 feet. Failure: 8 (1d6 + 5) Bludgeoning damage. The target has the Grappled condition (escape DC 13), and it has the Restrained condition until the grapple ends.",
        "damage": "1d6+5",
        "damageType": "Bludgeoning",
        "saveDc": 15,
        "saveStat": "str"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The couatl casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 15):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Evil and Good , Detect Magic , Detect Thoughts , Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) 1/Day Each: Create Food and Water , Dream , Greater Restoration , Scrying , Sleep"
      }
    ],
    "bonusActions": [
      {
        "name": "Divine Aid (2/Day)",
        "description": "The couatl casts Bless , Lesser Restoration , or Sanctuary , requiring no spell components and using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_crab_2024",
    "name": "Crab",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 3,
      "formula": "1d4 + 1"
    },
    "speed": "20 ft., Swim 20 ft.",
    "stats": {
      "str": 6,
      "dex": 11,
      "con": 12,
      "int": 1,
      "wis": 8,
      "cha": 2
    },
    "savingThrows": {
      "dex": 0,
      "con": 1
    },
    "skills": {
      "stealth": 2
    },
    "senses": "Blindsight 30 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The crab can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 1 Bludgeoning damage.",
        "attackBonus": 2,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_crocodile_2024",
    "name": "Crocodile",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 13,
      "formula": "2d10 + 2"
    },
    "speed": "20 ft., Swim 30 ft.",
    "stats": {
      "str": 15,
      "dex": 10,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 3,
      "wis": 0
    },
    "skills": {
      "stealth": 2
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 1 hour."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_cultist_2024",
    "name": "Cultist",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 9,
      "formula": "2d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 12,
      "con": 10,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "savingThrows": {
      "str": 0,
      "dex": 1,
      "con": 0,
      "int": 0,
      "wis": 2,
      "cha": 0
    },
    "skills": {
      "deception": 2,
      "religion": 2
    },
    "senses": "Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_ritual_sickle",
        "name": "Ritual Sickle",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 3 (1d4 + 1) Slashing damage plus 1 Necrotic damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_cultist_fanatic_2024",
    "name": "Cultist Fanatic",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 44,
      "formula": "8d8 + 8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 14,
      "con": 12,
      "int": 10,
      "wis": 14,
      "cha": 13
    },
    "savingThrows": {
      "str": 0,
      "dex": 2,
      "con": 1,
      "int": 0,
      "wis": 4,
      "cha": 1
    },
    "skills": {
      "deception": 3,
      "persuasion": 3,
      "religion": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Common",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_pact_blade",
        "name": "Pact Blade",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Slashing damage plus 7 (2d6) Necrotic damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 12, +4 to hit with spell attacks):",
        "attackBonus": 4
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Light , Thaumaturgy 2/Day: Command 1/Day: Hold Person"
      }
    ],
    "bonusActions": [
      {
        "name": "Spiritual Weapon (2/Day)",
        "description": "The cultist casts the Spiritual Weapon spell, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_darkmantle_2024",
    "name": "Darkmantle",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Aberration",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 22,
      "formula": "5d6 + 5"
    },
    "speed": "10 ft., Fly 30 ft.",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "stealth": 3
    },
    "senses": "Blindsight 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_crush",
        "name": "Crush",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage, and the darkmantle attaches to the target. If the target is a Medium or smaller creature and the darkmantle had Advantage on the attack roll, it covers the target, which has the Blinded condition and is suffocating while the darkmantle is attached in this way.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_darkness_aura_1_day_",
        "name": "Darkness Aura (1/Day)",
        "type": "ability",
        "description": "Magical Darkness fills a 15-foot Emanation originating from the darkmantle. This effect lasts while the darkmantle maintains Concentration on it, up to 10 minutes. Darkvision can’t penetrate this area, and no light can illuminate it."
      }
    ]
  },
  {
    "id": "ddb_death_cultist_2024",
    "name": "Death Cultist",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 127,
      "formula": "15d8 + 60"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 19,
      "dex": 12,
      "con": 18,
      "int": 12,
      "wis": 16,
      "cha": 14
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 7,
      "int": 1,
      "wis": 6,
      "cha": 2
    },
    "skills": {
      "insight": 6,
      "perception": 6,
      "religion": 4
    },
    "senses": "Passive Perception 16",
    "languages": "Common",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The cultist makes three attacks, using Dread Scythe or Deathly Ray in any combination."
      },
      {
        "id": "act_dread_scythe",
        "name": "Dread Scythe",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 9 (1d10 + 4) Slashing damage plus 11 (2d10) Necrotic damage, and the target can’t regain Hit Points until the end of its next turn.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "1d10+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_deathly_ray",
        "name": "Deathly Ray",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +6 , range 120 ft. Hit: 22 (4d10) Necrotic damage.",
        "attackBonus": 6,
        "rangeFeet": 120,
        "damage": "4d10",
        "damageType": "Necrotic"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Speak with Dead , Thaumaturgy"
      }
    ],
    "bonusActions": [
      {
        "name": "Spirit Wail (Recharge 5–6)",
        "description": "Wisdom Saving Throw: DC 14, each creature in a 20-foot Emanation originating from the cultist. Failure: 14 (4d6) Psychic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only."
      }
    ]
  },
  {
    "id": "ddb_death_dog_2024",
    "name": "Death Dog",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 39,
      "formula": "6d8 + 12"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 14,
      "int": 3,
      "wis": 13,
      "cha": 6
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened",
      "Stunned",
      "Unconscious"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The death dog makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 12. First Failure: The target has the Poisoned condition. While Poisoned, the target’s Hit Point maximum doesn’t return to normal when finishing a Long Rest, and it repeats the save every 24 hours that elapse, ending the effect on itself on a success. Subsequent Failures: The Poisoned target’s Hit Point maximum decreases by 5 (1d10) .",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Piercing",
        "saveDc": 12,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_death_knight_aspirant_2024",
    "name": "Death Knight Aspirant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 20,
    "hitPoints": {
      "average": 178,
      "formula": "21d8 + 84"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 20,
      "dex": 10,
      "con": 18,
      "int": 10,
      "wis": 12,
      "cha": 16
    },
    "savingThrows": {
      "str": 5,
      "dex": 4,
      "con": 4,
      "int": 0,
      "wis": 5,
      "cha": 3
    },
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Frightened",
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 11",
    "languages": "Abyssal, Common",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The aspirant has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Marshal Undead",
        "description": "Undead creatures of the aspirant’s choice (excluding itself) in a 60-foot Emanation originating from it have Advantage on attack rolls and saving throws. It can’t use this trait if it has the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The aspirant makes three Dread Blade attacks."
      },
      {
        "id": "act_dread_blade",
        "name": "Dread Blade",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 14 (2d8 + 5) Slashing damage plus 10 (3d6) Necrotic damage.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_hellfire_orb_recharge_5_6_",
        "name": "Hellfire Orb (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 15, each creature in a 20-foot-radius Sphere centered on a point the aspirant can see within 120 feet of itself. Failure: 21 (6d6) Fire damage plus 21 (6d6) Necrotic damage. Success: Half damage.",
        "damage": "6d6",
        "damageType": "Fire",
        "saveDc": 15,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The aspirant casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 15):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Phantom Steed 1/Day Each: Destructive Wave (Necrotic), Dispel Magic"
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "Trigger: The aspirant is hit by a melee attack roll while holding a weapon. Response: The aspirant adds 4 to its AC against that attack, possibly causing it to miss."
      }
    ]
  },
  {
    "id": "ddb_deer_2024",
    "name": "Deer",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 4,
      "formula": "1d8"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 11,
      "dex": 16,
      "con": 11,
      "int": 2,
      "wis": 14,
      "cha": 5
    },
    "savingThrows": {
      "str": 0,
      "dex": 3,
      "con": 0,
      "wis": 2
    },
    "skills": {
      "perception": 4
    },
    "senses": "Darkvision 60; Passive Perception 14",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Agile",
        "description": "The deer doesn’t provoke an Opportunity Attack when it moves out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_ram",
        "name": "Ram",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 2 (1d4) Bludgeoning damage.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_deva_2024",
    "name": "Deva",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Celestial",
    "subtype": "Angel",
    "alignment": "Lawful Good",
    "armorClass": 17,
    "hitPoints": {
      "average": 229,
      "formula": "27d8 + 108"
    },
    "speed": "30 ft., Fly 90 ft. (hover)",
    "stats": {
      "str": 18,
      "dex": 18,
      "con": 18,
      "int": 17,
      "wis": 20,
      "cha": 20
    },
    "savingThrows": {
      "str": 4,
      "dex": 4,
      "con": 4,
      "int": 3,
      "wis": 9,
      "cha": 9
    },
    "skills": {
      "insight": 9,
      "perception": 9
    },
    "damageResistances": [
      "Radiant"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 19",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Exalted Restoration",
        "description": "If the deva dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia."
      },
      {
        "name": "Magic Resistance",
        "description": "The deva has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The deva makes two Holy Mace attacks."
      },
      {
        "id": "act_holy_mace",
        "name": "Holy Mace",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 5 ft. Hit: 7 (1d6 + 4) Bludgeoning damage plus 18 (4d8) Radiant damage.",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The deva casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Detect Evil and Good , Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) 1/Day Each: Commune , Raise Dead"
      }
    ],
    "bonusActions": [
      {
        "name": "Divine Aid (2/Day)",
        "description": "The deva casts Cure Wounds , Lesser Restoration , or Remove Curse , using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_dire_wolf_2024",
    "name": "Dire Wolf",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 22,
      "formula": "3d10 + 6"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 15,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The wolf has Advantage on an attack roll against a creature if at least one of the wolf’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_displacer_beast_2024",
    "name": "Displacer Beast",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 76,
      "formula": "9d10 + 27"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 6,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "wis": 1
    },
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "Understands Sylvan but can’t speak",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Avoidance",
        "description": "If the displacer beast is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the save and half damage if it fails. It can’t use this trait if it has the Incapacitated condition."
      },
      {
        "name": "Displacement",
        "description": "Attack rolls against the displacer beast have Disadvantage , since it projects an illusion that makes it appear to be near its actual location. This trait is suppressed while the displacer beast has the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The displacer beast makes one Rend attack and one Tentacle attack."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 feet. Hit: 9 (1d10 + 4) Slashing damage. If target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 6,
        "damage": "1d10+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 feet. Hit: 11 (2d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "damage": "2d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_djinni_2024",
    "name": "Djinni",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Elemental",
    "subtype": "Genie",
    "alignment": "Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 218,
      "formula": "19d10 + 114"
    },
    "speed": "30 ft., Fly 90 ft. (hover)",
    "stats": {
      "str": 21,
      "dex": 15,
      "con": 22,
      "int": 15,
      "wis": 16,
      "cha": 20
    },
    "savingThrows": {
      "str": 5,
      "dex": 6,
      "con": 6,
      "int": 2,
      "wis": 7,
      "cha": 5
    },
    "damageImmunities": [
      "Lightning",
      "Thunder"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 13",
    "languages": "Primordial (Auran)",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Elemental Restoration",
        "description": "If the djinni dies outside the Elemental Plane of Air, its body dissolves into mist, and it gains a new body in 1d4 days, reviving with all its Hit Points somewhere on the Plane of Air."
      },
      {
        "name": "Magic Resistance",
        "description": "The djinni has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Wishes",
        "description": "The djinni has a 30 percent chance of knowing the Wish spell. If the djinni knows it, the djinni can cast it only on behalf of a non-genie creature who communicates a wish in a way the djinni can understand. If the djinni casts the spell for the creature, the djinni suffers none of the spell’s stress. Once the djinni has cast it three times, the djinni can’t do so again for 365 days."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The djinni makes three attacks, using Storm Blade or Storm Bolt in any combination."
      },
      {
        "id": "act_storm_blade",
        "name": "Storm Blade",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 feet. Hit: 12 (2d6 + 5) Slashing damage plus 7 (2d6) Lightning damage.",
        "attackBonus": 9,
        "damage": "2d6+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_storm_bolt",
        "name": "Storm Bolt",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +9 , range 120 feet. Hit: 13 (3d8) Thunder damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 9,
        "damage": "3d8",
        "damageType": "Thunder"
      },
      {
        "id": "act_create_whirlwind",
        "name": "Create Whirlwind",
        "type": "ability",
        "description": "The djinni conjures a whirlwind at a point it can see within 120 feet. The whirlwind fills a 20-foot-radius, 60-foot-high Cylinder centered on that point. The whirlwind lasts until the djinni’s Concentration on it ends. The djinni can move the whirlwind up to 20 feet at the start of each of its turns."
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The djinni casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Evil and Good , Detect Magic 2/Day Each: Create Food and Water (can create wine instead of water), Tongues , Wind Walk 1/Day Each: Creation , Gaseous Form , Invisibility , Major Image , Plane Shift"
      }
    ]
  },
  {
    "id": "ddb_doppelganger_2024",
    "name": "Doppelganger",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 52,
      "formula": "8d8 + 16"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 18,
      "con": 14,
      "int": 11,
      "wis": 12,
      "cha": 14
    },
    "savingThrows": {
      "str": 0,
      "dex": 4,
      "con": 2,
      "int": 0,
      "wis": 1,
      "cha": 2
    },
    "skills": {
      "deception": 6,
      "insight": 3
    },
    "conditionImmunities": [
      "Charmed"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "Common plus three other languages",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The doppelganger makes two Slam attacks and uses Unsettling Visage if available."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 (with Advantage during the first round of each combat), reach 5 ft. Hit: 11 (2d6 + 4) Bludgeoning damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_read_thoughts",
        "name": "Read Thoughts",
        "type": "spell",
        "description": "The doppelganger casts Detect Thoughts , requiring no spell components and using Charisma as the spellcasting ability (spell save DC 12)."
      },
      {
        "id": "act_unsettling_visage_recharge_6_",
        "name": "Unsettling Visage (Recharge 6)",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 12, each creature in a 15-foot Emanation originating from the doppelganger that can see the doppelganger. Failure: The target has the Frightened condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 12,
        "saveStat": "wis"
      }
    ],
    "bonusActions": [
      {
        "name": "Shape-Shift",
        "description": "The doppelganger shape-shifts into a Medium or Small Humanoid, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_draft_horse_2024",
    "name": "Draft Horse",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 15,
      "formula": "2d10 + 4"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 10,
      "con": 15,
      "int": 2,
      "wis": 11,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 2,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 6 (1d4 + 4) Bludgeoning damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d4+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_dragon_turtle_2024",
    "name": "Dragon Turtle",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Neutral",
    "armorClass": 20,
    "hitPoints": {
      "average": 356,
      "formula": "23d20 + 115"
    },
    "speed": "20 ft., Swim 50 ft.",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 20,
      "int": 10,
      "wis": 12,
      "cha": 12
    },
    "savingThrows": {
      "str": 7,
      "dex": 0,
      "con": 11,
      "int": 0,
      "wis": 7,
      "cha": 1
    },
    "damageResistances": [
      "Fire"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 11",
    "languages": "Draconic, Primordial (Aquan)",
    "challengeRating": "17",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Bite attacks. It can replace one attack with a Tail attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +13 , reach 15 ft. Hit: 23 (3d10 + 7) Piercing damage plus 7 (2d6) Fire damage. Being underwater doesn’t grant Resistance to this Fire damage.",
        "attackBonus": 13,
        "reachFeet": 15,
        "damage": "3d10+7",
        "damageType": "Piercing"
      },
      {
        "id": "act_tail",
        "name": "Tail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +13 , reach 15 ft. Hit: 18 (2d10 + 7) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.",
        "attackBonus": 13,
        "reachFeet": 15,
        "damage": "2d10+7",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_steam_breath_recharge_5_6_",
        "name": "Steam Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 56 (16d6) Fire damage. Success: Half damage. Failure or Success: Being underwater doesn’t grant Resistance to this Fire damage.",
        "damage": "16d6",
        "damageType": "Fire",
        "saveDc": 19,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_dretch_2024",
    "name": "Dretch",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 18,
      "formula": "4d6 + 4"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 12,
      "dex": 11,
      "con": 12,
      "int": 5,
      "wis": 8,
      "cha": 3
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 1
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "Abyssal, Telepathy 60 ft. (works only with creatures that understand Abyssal)",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 4 (1d6 + 1) Slashing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "Slashing"
      },
      {
        "id": "act_fetid_cloud_1_day_",
        "name": "Fetid Cloud (1/Day)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 11, each creature in a 10-foot Emanation originating from the dretch. Failure: The target has the Poisoned condition until the end of its next turn. While Poisoned, the creature can take either an action or a Bonus Action on its turn, not both, and it can’t take Reactions.",
        "saveDc": 11,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_drider_2024",
    "name": "Drider",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 123,
      "formula": "13d10 + 52"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 16,
      "dex": 19,
      "con": 18,
      "int": 13,
      "wis": 16,
      "cha": 12
    },
    "savingThrows": {
      "str": 3,
      "dex": 4,
      "con": 4,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "skills": {
      "perception": 6,
      "stealth": 10
    },
    "senses": "Darkvision 120 ft.; Passive Perception 16",
    "languages": "Elvish, Undercommon",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The drider can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the drider has Disadvantage on ability checks and attack rolls."
      },
      {
        "name": "Web Walker",
        "description": "The drider ignores movement restrictions caused by webs, and the drider knows the location of any other creature in contact with the same web."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The drider makes three attacks, using Foreleg or Poison Burst in any combination."
      },
      {
        "id": "act_foreleg",
        "name": "Foreleg",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 13 (2d8 + 4) Piercing damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d8+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_poison_burst",
        "name": "Poison Burst",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +6 , range 120 ft. Hit: 13 (3d6 + 3) Poison damage.",
        "attackBonus": 6,
        "rangeFeet": 120,
        "damage": "3d6+3",
        "damageType": "Poison"
      }
    ],
    "bonusActions": [
      {
        "name": "Magic of the Spider Queen (Recharge 5–6)",
        "description": "The drider casts Darkness , Faerie Fire , or Web , requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 14)."
      }
    ]
  },
  {
    "id": "ddb_druid_2024",
    "name": "Druid",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 44,
      "formula": "8d8 + 8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 12,
      "con": 13,
      "int": 12,
      "wis": 16,
      "cha": 11
    },
    "savingThrows": {
      "str": 0,
      "dex": 1,
      "con": 1,
      "int": 1,
      "wis": 3,
      "cha": 0
    },
    "skills": {
      "medicine": 5,
      "nature": 3,
      "perception": 5
    },
    "senses": "Passive Perception 15",
    "languages": "Common, Druidic, Sylvan",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination."
      },
      {
        "id": "act_vine_staff",
        "name": "Vine Staff",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Bludgeoning damage plus 2 (1d4) Poison damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_verdant_wisp",
        "name": "Verdant Wisp",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 90 ft. Hit: 10 (3d6) Radiant damage.",
        "attackBonus": 5,
        "rangeFeet": 90,
        "damage": "3d6",
        "damageType": "Radiant"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The druid casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Druidcraft , Speak with Animals 2/Day Each: Entangle , Thunderwave 1/Day Each: Animal Messenger , Longstrider , Moonbeam"
      }
    ]
  },
  {
    "id": "ddb_dryad_2024",
    "name": "Dryad",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Neutral",
    "armorClass": 16,
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 12,
      "con": 11,
      "int": 14,
      "wis": 15,
      "cha": 18
    },
    "savingThrows": {
      "str": 0,
      "dex": 1,
      "con": 0,
      "int": 2,
      "wis": 2,
      "cha": 4
    },
    "skills": {
      "perception": 4,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Elvish, Sylvan",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The dryad has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Speak with Beasts and Plants",
        "description": "The dryad can communicate with Beasts and Plants as if they shared a language."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dryad makes one Vine Lash or Thorn Burst attack, and it can use Spellcasting to cast Charm Monster ."
      },
      {
        "id": "act_vine_lash",
        "name": "Vine Lash",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 8 (1d8 + 4) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d8+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_thorn_burst",
        "name": "Thorn Burst",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +6 , range 60 ft. Hit: 7 (1d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "rangeFeet": 60,
        "damage": "1d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The dryad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "spell",
        "description": "Animal Friendship , Charm Monster (lasts 24 hours; ends early if the dryad casts the spell again), Druidcraft 1/Day Each: Entangle , Pass without Trace"
      }
    ],
    "bonusActions": [
      {
        "name": "Tree Stride",
        "description": "If within 5 feet of a Large or bigger tree, the dryad teleports to an unoccupied space within 5 feet of a second Large or bigger tree that is within 60 feet of the previous tree."
      }
    ]
  },
  {
    "id": "ddb_dust_mephit_2024",
    "name": "Dust Mephit",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 17,
      "formula": "5d6"
    },
    "speed": "30 ft., Fly 30 ft.",
    "stats": {
      "str": 5,
      "dex": 14,
      "con": 10,
      "int": 9,
      "wis": 11,
      "cha": 10
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "perception": 2,
      "stealth": 4
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "Primordial (Auran, Terran)",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "The mephit explodes when it dies. Dexterity Saving Throw: DC 10, each creature in a 5-foot Emanation originating from the mephit. Failure: 5 (2d4) Bludgeoning damage. Success: Half damage."
      }
    ],
    "actions": [
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_blinding_breath_recharge_6_",
        "name": "Blinding Breath (Recharge 6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 10, each creature in a 15-foot Cone. Failure: The target has the Blinded condition until the end of the mephit’s next turn.",
        "saveDc": 10,
        "saveStat": "dex"
      },
      {
        "id": "act_sleep_1_day_",
        "name": "Sleep (1/Day)",
        "type": "spell",
        "description": "The mephit casts the Sleep spell, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 10)."
      }
    ]
  },
  {
    "id": "ddb_eagle_2024",
    "name": "Eagle",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 4,
      "formula": "1d6 + 1"
    },
    "speed": "10 ft., Fly 60 ft.",
    "stats": {
      "str": 6,
      "dex": 15,
      "con": 12,
      "int": 2,
      "wis": 14,
      "cha": 7
    },
    "savingThrows": {
      "dex": 2,
      "con": 1,
      "wis": 2
    },
    "skills": {
      "perception": 6
    },
    "senses": "Passive Perception 16",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_talons",
        "name": "Talons",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 feet. Hit: 4 (1d4 + 2) Slashing damage.",
        "attackBonus": 4,
        "damage": "1d4+2",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_earth_elemental_2024",
    "name": "Earth Elemental",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 147,
      "formula": "14d10 + 70"
    },
    "speed": "30 ft., Burrow 30 ft.",
    "stats": {
      "str": 20,
      "dex": 8,
      "con": 20,
      "int": 5,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 5,
      "con": 5,
      "wis": 0
    },
    "damageVulnerabilities": [
      "Thunder"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft., Tremorsense 60 ft.; Passive Perception 10",
    "languages": "Primordial (Terran)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Earth Glide",
        "description": "The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn’t disturb the material it moves through."
      },
      {
        "name": "Siege Monster",
        "description": "The elemental deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elemental makes two attacks, using Slam or Rock Launch in any combination."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 14 (2d8 + 5) Bludgeoning damage.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d8+5",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_rock_launch",
        "name": "Rock Launch",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +8 , range 60 ft. Hit: 8 (1d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 8,
        "rangeFeet": 60,
        "damage": "1d6+5",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_efreeti_2024",
    "name": "Efreeti",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Elemental",
    "subtype": "Genie",
    "alignment": "Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 212,
      "formula": "17d10 + 119"
    },
    "speed": "40 ft., Fly 60 ft. (hover)",
    "stats": {
      "str": 22,
      "dex": 12,
      "con": 24,
      "int": 16,
      "wis": 15,
      "cha": 19
    },
    "savingThrows": {
      "str": 6,
      "dex": 1,
      "con": 7,
      "int": 3,
      "wis": 6,
      "cha": 8
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 12",
    "languages": "Primordial (Ignan)",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Elemental Restoration",
        "description": "If the efreeti dies outside the Elemental Plane of Fire, its body dissolves into ash, and it gains a new body in 1d4 days, reviving with all its Hit Points somewhere on the Plane of Fire."
      },
      {
        "name": "Magic Resistance",
        "description": "The efreeti has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Wishes",
        "description": "The efreeti has a 30 percent chance of knowing the Wish spell. If the efreeti knows it, the efreeti can cast it only on behalf of a non-genie creature who communicates a wish in a way the efreeti can understand. If the efreeti casts the spell for the creature, the efreeti suffers none of the spell’s stress. Once the efreeti has cast it three times, the efreeti can’t do so again for 365 days."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The efreeti makes three attacks, using Heated Blade or Hurl Flame in any combination."
      },
      {
        "id": "act_heated_blade",
        "name": "Heated Blade",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 5 ft. Hit: 13 (2d6 + 6) Slashing damage plus 13 (2d12) Fire damage.",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_hurl_flame",
        "name": "Hurl Flame",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +8 , range 120 ft. Hit: 24 (7d6) Fire damage.",
        "attackBonus": 8,
        "rangeFeet": 120,
        "damage": "7d6",
        "damageType": "Fire"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The efreeti casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Elementalism 1/Day Each: Gaseous Form , Invisibility , Major Image , Plane Shift , Tongues , Wall of Fire (level 7 version)"
      }
    ]
  },
  {
    "id": "ddb_elemental_cultist_2024",
    "name": "Elemental Cultist",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 135,
      "formula": "18d8 + 54"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 12,
      "con": 16,
      "int": 14,
      "wis": 18,
      "cha": 12
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 6,
      "int": 2,
      "wis": 7,
      "cha": 1
    },
    "skills": {
      "arcana": 5,
      "perception": 7,
      "religion": 5
    },
    "senses": "Passive Perception 17",
    "languages": "Common, Primordial",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The cultist makes three attacks, using Elemental Flail or Elemental Claw in any combination."
      },
      {
        "id": "act_elemental_flail",
        "name": "Elemental Flail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 25 (6d6 + 4) damage of a type chosen by the cultist: Acid , Cold , Fire , Lightning , or Thunder .",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "Acid",
        "damageType": "Acid"
      },
      {
        "id": "act_elemental_claw",
        "name": "Elemental Claw",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +7 , range 120 ft. Hit: 22 (4d10) damage of a type chosen by the cultist: Acid , Cold , Fire , Lightning , or Thunder . If the target is a Medium or smaller creature, the cultist moves the target up to 10 feet straight toward or away from itself.",
        "attackBonus": 7,
        "rangeFeet": 120,
        "damage": "Acid",
        "damageType": "Acid"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Elementalism , Mage Hand"
      }
    ],
    "reactions": [
      {
        "name": "Elemental Absorption (1/Day)",
        "description": "Trigger: The cultist takes Acid, Cold, Fire, Lightning, or Thunder damage. Response: The cultist gives itself Resistance to that instance of damage and gains 10 Temporary Hit Points ."
      }
    ]
  },
  {
    "id": "ddb_elephant_2024",
    "name": "Elephant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 76,
      "formula": "8d12 + 24"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 22,
      "dex": 9,
      "con": 17,
      "int": 3,
      "wis": 11,
      "cha": 6
    },
    "savingThrows": {
      "str": 6,
      "con": 3,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elephant makes two Gore attacks."
      },
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 5 ft. Hit: 15 (2d8 + 6) Piercing damage. If the target is a Huge or smaller creature and the elephant moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition.",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d8+6",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Trample",
        "description": "Dexterity Saving Throw: DC 16, one creature within 5 feet that has the Prone condition. Failure: 17 (2d10 + 6) Bludgeoning damage. Success: Half damage."
      }
    ]
  },
  {
    "id": "ddb_elk_2024",
    "name": "Elk",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 11,
      "formula": "2d10"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 16,
      "dex": 10,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 6
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 0,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_ram",
        "name": "Ram",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature and the elk moved 20+ feet straight toward it immediately before the hit, the target takes an extra 3 (1d6) Bludgeoning damage and has the Prone condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_erinyes_2024",
    "name": "Erinyes",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 178,
      "formula": "21d8 + 84"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 18,
      "dex": 16,
      "con": 18,
      "int": 14,
      "wis": 14,
      "cha": 18
    },
    "savingThrows": {
      "str": 4,
      "dex": 7,
      "con": 8,
      "int": 2,
      "wis": 2,
      "cha": 8
    },
    "skills": {
      "perception": 6,
      "persuasion": 8
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 16",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "12",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Diabolical Restoration",
        "description": "If the erinyes dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells."
      },
      {
        "name": "Magic Resistance",
        "description": "The erinyes has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Rope",
        "description": "The erinyes has a magic rope. While bearing it, the erinyes can use the Entangling Rope action. The rope has AC 20, HP 90, and Immunity to Poison and Psychic damage. The rope turns to dust if reduced to 0 Hit Points, if it is 5+ feet away from the erinyes for 1 hour or more, or if the erinyes dies. If the rope is damaged or destroyed, the erinyes can fully restore it when finishing a Short or Long Rest."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The erinyes makes three Withering Sword attacks and can use Entangling Rope."
      },
      {
        "id": "act_withering_sword",
        "name": "Withering Sword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 5 ft. Hit: 13 (2d8 + 4) Slashing damage plus 11 (2d10) Necrotic damage.",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_entangling_rope_requires_magic_rope_",
        "name": "Entangling Rope (Requires Magic Rope)",
        "type": "ability",
        "description": "Strength Saving Throw: DC 16, one creature the erinyes can see within 120 feet. Failure: 14 (4d6) Force damage, and the target has the Restrained condition until the rope is destroyed, the erinyes uses a Bonus Action to release the target, or the erinyes uses Entangling Rope again.",
        "damage": "4d6",
        "damageType": "Force",
        "saveDc": 16,
        "saveStat": "str"
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "Trigger: The erinyes is hit by a melee attack roll while holding a weapon. Response: The erinyes adds 4 to its AC against that attack, possibly causing it to miss."
      }
    ]
  },
  {
    "id": "ddb_ettercap_2024",
    "name": "Ettercap",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 44,
      "formula": "8d8 + 8"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 14,
      "dex": 15,
      "con": 13,
      "int": 7,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 3,
      "stealth": 4,
      "survival": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The ettercap can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The ettercap ignores movement restrictions caused by webs, and the ettercap knows the location of any other creature in contact with the same web."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ettercap makes one Bite attack and one Claw attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage plus 2 (1d4) Poison damage, and the target has the Poisoned condition until the start of the ettercap’s next turn.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (2d4 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_web_strand_recharge_5_6_",
        "name": "Web Strand (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 12, one Large or smaller creature the ettercap can see within 30 feet. Failure: The target has the Restrained condition until the web is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Bludgeoning, Poison, and Psychic damage).",
        "saveDc": 12,
        "saveStat": "dex"
      }
    ],
    "bonusActions": [
      {
        "name": "Reel",
        "description": "The ettercap pulls one creature within 30 feet of itself that is Restrained by its Web Strand up to 25 feet straight toward itself."
      }
    ]
  },
  {
    "id": "ddb_ettin_2024",
    "name": "Ettin",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 85,
      "formula": "10d10 + 30"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 21,
      "dex": 8,
      "con": 17,
      "int": 6,
      "wis": 10,
      "cha": 8
    },
    "savingThrows": {
      "str": 5,
      "con": 3,
      "wis": 0
    },
    "skills": {
      "perception": 4
    },
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened",
      "Stunned",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Giant",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ettin makes one Battleaxe attack and one Morningstar attack."
      },
      {
        "id": "act_battleaxe",
        "name": "Battleaxe",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 14 (2d8 + 5) Slashing damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_morningstar",
        "name": "Morningstar",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 14 (2d8 + 5) Piercing damage, and the target has Disadvantage on the next attack roll it makes before the end of its next turn.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_fiend_cultist_2024",
    "name": "Fiend Cultist",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 127,
      "formula": "17d8 + 51"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 19,
      "dex": 15,
      "con": 16,
      "int": 12,
      "wis": 18,
      "cha": 10
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 6,
      "int": 1,
      "wis": 7,
      "cha": 0
    },
    "skills": {
      "perception": 7,
      "religion": 4
    },
    "senses": "Darkvision 90 ft. (unimpeded by magical Darkness); Passive Perception 17",
    "languages": "Abyssal, Common, Infernal",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The cultist makes three Pact Axe attacks."
      },
      {
        "id": "act_pact_axe",
        "name": "Pact Axe",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 10 (1d12 + 4) Slashing damage plus 13 (3d8) Fire damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d12+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks):",
        "attackBonus": 7
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Scorching Ray (level 5 version), Thaumaturgy 2/Day: Fireball (level 6 version)"
      }
    ],
    "reactions": [
      {
        "name": "Hellish Rebuke",
        "description": "The cultist casts Hellish Rebuke in response to that spell’s trigger, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_fire_elemental_2024",
    "name": "Fire Elemental",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 93,
      "formula": "11d10 + 33"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 10,
      "dex": 17,
      "con": 16,
      "int": 6,
      "wis": 10,
      "cha": 7
    },
    "savingThrows": {
      "str": 0,
      "dex": 3,
      "con": 3,
      "wis": 0
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Primordial (Ignan)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fire Aura",
        "description": "At the end of each of the elemental’s turns, each creature in a 10-foot Emanation originating from the elemental takes 5 (1d10) Fire damage. Creatures and flammable objects in the Emanation start burning ."
      },
      {
        "name": "Fire Form",
        "description": "The elemental can move through a space as narrow as 1 inch without expending extra movement to do so, and it can enter a creature’s space and stop there. The first time it enters a creature’s space on a turn, that creature takes 5 (1d10) Fire damage."
      },
      {
        "name": "Illumination",
        "description": "The elemental sheds Bright Light in a 30- foot radius and Dim Light for an additional 30 feet."
      },
      {
        "name": "Water Susceptibility",
        "description": "The elemental takes 3 (1d6) Cold damage for every 5 feet the elemental moves in water or for every gallon of water splashed on it."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elemental makes two Burn attacks."
      },
      {
        "id": "act_burn",
        "name": "Burn",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 10 (2d6 + 3) Fire damage. If the target is a creature or a flammable object, it starts burning .",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Fire"
      }
    ]
  },
  {
    "id": "ddb_fire_giant_2024",
    "name": "Fire Giant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 162,
      "formula": "13d12 + 78"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 25,
      "dex": 9,
      "con": 23,
      "int": 10,
      "wis": 14,
      "cha": 13
    },
    "savingThrows": {
      "str": 7,
      "dex": 3,
      "con": 10,
      "int": 0,
      "wis": 2,
      "cha": 5
    },
    "skills": {
      "athletics": 11,
      "perception": 6
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Passive Perception 16",
    "languages": "Giant",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two attacks, using Flame Sword or Hammer Throw in any combination."
      },
      {
        "id": "act_flame_sword",
        "name": "Flame Sword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +11 , reach 10 ft. Hit: 21 (4d6 + 7) Slashing damage plus 10 (3d6) Fire damage.",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "4d6+7",
        "damageType": "Slashing"
      },
      {
        "id": "act_hammer_throw",
        "name": "Hammer Throw",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +11 , range 60/240 ft. Hit: 23 (3d10 + 7) Bludgeoning damage plus 4 (1d8) Fire damage, and the target is pushed up to 15 feet straight away from the giant and has Disadvantage on the next attack roll it makes before the end of its next turn.",
        "attackBonus": 11,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "3d10+7",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_flesh_golem_2024",
    "name": "Flesh Golem",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Construct",
    "alignment": "Neutral",
    "armorClass": 9,
    "hitPoints": {
      "average": 127,
      "formula": "15d8 + 60"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 19,
      "dex": 9,
      "con": 18,
      "int": 6,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "con": 4,
      "wis": 0
    },
    "damageImmunities": [
      "Lightning",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Understands Common plus one other language but can&#x27;t speak",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Aversion to Fire",
        "description": "If the golem takes Fire damage, it has Disadvantage on attack rolls and ability checks until the end of its next turn."
      },
      {
        "name": "Berserk",
        "description": "Whenever the golem starts its turn Bloodied , roll 1d6 . On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object. Once the golem goes berserk, it remains so until it is destroyed or it is no longer Bloodied."
      },
      {
        "name": "Immutable Form",
        "description": "The golem can’t shape-shift."
      },
      {
        "name": "Lightning Absorption",
        "description": "Whenever the golem is subjected to Lightning damage, it regains a number of Hit Points equal to the Lightning damage dealt."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The golem makes two Slam attacks."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 13 (2d8 + 4) Bludgeoning damage plus 4 (1d8) Lightning damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_flying_snake_2024",
    "name": "Flying Snake",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 5,
      "formula": "2d4"
    },
    "speed": "30 ft., Fly 60 ft., Swim 30 ft.",
    "stats": {
      "str": 4,
      "dex": 15,
      "con": 11,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 1
    },
    "senses": "Blindsight 10 ft.; Passive Perception 11",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The snake doesn’t provoke an Opportunity Attack when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 1 Piercing damage plus 5 (2d4) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4",
        "damageType": "Poison"
      }
    ]
  },
  {
    "id": "ddb_frog_2024",
    "name": "Frog",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "20 ft., Swim 20 ft.",
    "stats": {
      "str": 1,
      "dex": 13,
      "con": 8,
      "int": 1,
      "wis": 8,
      "cha": 3
    },
    "savingThrows": {
      "dex": 1
    },
    "skills": {
      "perception": 1,
      "stealth": 3
    },
    "senses": "Darkvision 30 ft.; Passive Perception 11",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The frog can breathe air and water."
      },
      {
        "name": "Standing Leap",
        "description": "The frog’s Long Jump is up to 10 feet and its High Jump is up to 5 feet with or without a running start."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 1 Piercing damage.",
        "attackBonus": 3,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_frost_giant_2024",
    "name": "Frost Giant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 149,
      "formula": "13d12 + 65"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 23,
      "dex": 9,
      "con": 21,
      "int": 9,
      "wis": 10,
      "cha": 12
    },
    "savingThrows": {
      "str": 6,
      "con": 8,
      "wis": 3,
      "cha": 4
    },
    "skills": {
      "athletics": 9,
      "perception": 3
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Passive Perception 13",
    "languages": "Giant",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two attacks, using Frost Axe or Great Bow in any combination."
      },
      {
        "id": "act_frost_axe",
        "name": "Frost Axe",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 10 ft. Hit: 19 (2d12 + 6) Slashing damage plus 9 (2d8) Cold damage.",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "2d12+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_great_bow",
        "name": "Great Bow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +9 , range 150/600 ft. Hit: 17 (2d10 + 6) Piercing damage plus 7 (2d6) Cold damage, and the target’s Speed decreases by 10 feet until the end of its next turn.",
        "attackBonus": 9,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "2d10+6",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "War Cry (Recharge 5–6)",
        "description": "The giant or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of the giant’s next turn."
      }
    ]
  },
  {
    "id": "ddb_gargoyle_2024",
    "name": "Gargoyle",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 67,
      "formula": "9d8 + 27"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 15,
      "dex": 11,
      "con": 16,
      "int": 6,
      "wis": 11,
      "cha": 7
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 3,
      "wis": 0
    },
    "skills": {
      "stealth": 4
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Primordial (Terran)",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The gargoyle doesn’t provoke an Opportunity Attack when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The gargoyle makes two Claw attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (2d4 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_gelatinous_cube_2024",
    "name": "Gelatinous Cube",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "armorClass": 6,
    "hitPoints": {
      "average": 63,
      "formula": "6d10 + 30"
    },
    "speed": "15 ft.",
    "stats": {
      "str": 14,
      "dex": 3,
      "con": 20,
      "int": 1,
      "wis": 6,
      "cha": 1
    },
    "savingThrows": {
      "str": 2,
      "con": 5
    },
    "damageImmunities": [
      "Acid"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Prone"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ooze Cube",
        "description": "The cube fills its entire space and is transparent. Other creatures can enter that space, but a creature that does so is subjected to the cube’s Engulf and has Disadvantage on the saving throw."
      },
      {
        "name": "Transparent",
        "description": "Even when the cube is in plain sight, a creature must succeed on a DC 15 Wisdom ( Perception ) check to notice the cube if the creature hasn’t witnessed the cube move or otherwise act."
      }
    ],
    "actions": [
      {
        "id": "act_pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 12 (3d6 + 2) Acid damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "3d6+2",
        "damageType": "Acid"
      },
      {
        "id": "act_engulf",
        "name": "Engulf",
        "type": "spell",
        "description": "The cube moves up to its Speed without provoking Opportunity Attacks . The cube can move through the spaces of Large or smaller creatures if it has room inside itself to contain them (see the Ooze Cube trait). Dexterity Saving Throw: DC 12, each creature whose space the cube enters for the first time during this move. Failure: 10 (3d6) Acid damage, and the target is engulfed. An engulfed target is suffocating , can’t cast spells with a Verbal component, has the Restrained condition, and takes 10 (3d6) Acid damage at the start of each of the cube’s turns. When the cube moves, the engulfed target moves with it. An engulfed target can try to escape by taking an action to make a DC 12 Strength ( Athletics ) check. On a successful check, the target escapes and enters the nearest unoccupied space. Success: Half damage, and the target moves to an unoccupied space within 5 feet of the cube. If there is no unoccupied space, the target fails the save instead.",
        "damage": "3d6",
        "damageType": "Acid",
        "saveDc": 12,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_ghast_2024",
    "name": "Ghast",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 36,
      "formula": "8d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 17,
      "con": 10,
      "int": 11,
      "wis": 10,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 3,
      "con": 0,
      "int": 0,
      "wis": 2
    },
    "damageResistances": [
      "Necrotic"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Common",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Stench",
        "description": "Constitution Saving Throw: DC 10, any creature that starts its turn in a 5-foot Emanation originating from the ghast. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this ghast’s Stench for 24 hours."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage plus 9 (2d8) Necrotic damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage. If the target is a non-Undead creature, it is subjected to the following effect. Constitution Saving Throw: DC 10. Failure: The target has the Paralyzed condition until the end of its next turn.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing",
        "saveDc": 10,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_ghast_gravecaller_2024",
    "name": "Ghast Gravecaller",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 97,
      "formula": "15d8 + 30"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 17,
      "con": 14,
      "int": 18,
      "wis": 14,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 3,
      "con": 5,
      "int": 4,
      "wis": 5
    },
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 12",
    "languages": "Abyssal, Common",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Stench",
        "description": "Constitution Saving Throw: DC 13, any creature that starts its turn in a 5-foot Emanation originating from the ghast. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this ghast’s Stench for 24 hours."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ghast makes two Horrific Necrosis attacks. It can replace one attack with a Claw attack."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 13 (3d6 + 3) Slashing damage. If the target isn’t an Undead, it has the Paralyzed condition until the end of its next turn.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "3d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_horrific_necrosis",
        "name": "Horrific Necrosis",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +7 , reach 5 ft. or range 120 ft. Hit: 15 (2d10 + 4) Necrotic damage, and the target has the Frightened condition until the end of its next turn.",
        "attackBonus": 7,
        "reachFeet": 5,
        "rangeFeet": 120,
        "damage": "2d10+4",
        "damageType": "Necrotic"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The ghast casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability:"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Speak with Dead , Thaumaturgy"
      }
    ]
  },
  {
    "id": "ddb_ghost_2024",
    "name": "Ghost",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral",
    "armorClass": 11,
    "hitPoints": {
      "average": 45,
      "formula": "10d8"
    },
    "speed": "5 ft., Fly 40 ft. (hover)",
    "stats": {
      "str": 7,
      "dex": 13,
      "con": 10,
      "int": 10,
      "wis": 12,
      "cha": 17
    },
    "savingThrows": {
      "dex": 1,
      "con": 0,
      "int": 0,
      "wis": 1,
      "cha": 3
    },
    "damageResistances": [
      "Acid",
      "Bludgeoning",
      "Cold",
      "Fire",
      "Lightning",
      "Piercing",
      "Slashing",
      "Thunder"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "Common plus one other language",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ethereal Sight",
        "description": "The ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The ghost can move through other creatures and objects as if they were Difficult Terrain . It takes 5 (1d10) Force damage if it ends its turn inside an object."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ghost makes two Withering Touch attacks."
      },
      {
        "id": "act_withering_touch",
        "name": "Withering Touch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 19 (3d10 + 3) Necrotic damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "3d10+3",
        "damageType": "Necrotic"
      },
      {
        "id": "act_etherealness",
        "name": "Etherealness",
        "type": "spell",
        "description": "The ghost casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The ghost is visible on the Material Plane while on the Border Ethereal and vice versa, but it can’t affect or be affected by anything on the other plane."
      },
      {
        "id": "act_horrific_visage",
        "name": "Horrific Visage",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the ghost and isn’t an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the ghost’s next turn. Success: The target is immune to this ghost’s Horrific Visage for 24 hours.",
        "damage": "2d6+3",
        "damageType": "Psychic",
        "saveDc": 13,
        "saveStat": "wis"
      },
      {
        "id": "act_possession_recharge_6_",
        "name": "Possession (Recharge 6)",
        "type": "spell",
        "description": "Charisma Saving Throw: DC 13, one Humanoid the ghost can see within 5 feet. Failure: The target is possessed by the ghost; the ghost disappears, and the target has the Incapacitated condition and loses control of its body. The ghost now controls the body, but the target retains awareness. The ghost can’t be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The ghost’s game statistics are the same, except it uses the possessed target’s Speed, as well as the target’s Strength, Dexterity, and Constitution modifiers.",
        "saveDc": 13,
        "saveStat": "cha"
      }
    ]
  },
  {
    "id": "ddb_ghoul_2024",
    "name": "Ghoul",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 13,
      "dex": 15,
      "con": 10,
      "int": 7,
      "wis": 10,
      "cha": 6
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 0,
      "wis": 0
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ghoul makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage plus 3 (1d6) Necrotic damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Slashing damage. If the target is a creature that isn’t an Undead or elf, it is subjected to the following effect. Constitution Saving Throw: DC 10. Failure: The target has the Paralyzed condition until the end of its next turn.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Slashing",
        "saveDc": 10,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_giant_ape_2024",
    "name": "Giant Ape",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 168,
      "formula": "16d12 + 64"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 23,
      "dex": 14,
      "con": 18,
      "int": 5,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 6,
      "dex": 2,
      "con": 4,
      "wis": 1
    },
    "skills": {
      "athletics": 9,
      "perception": 4,
      "survival": 4
    },
    "senses": "Passive Perception 14",
    "languages": "None",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ape makes two Fist attacks."
      },
      {
        "id": "act_fist",
        "name": "Fist",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 10 ft. Hit: 22 (3d10 + 6) Bludgeoning damage.",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "3d10+6",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_boulder_toss_recharge_6_",
        "name": "Boulder Toss (Recharge 6)",
        "type": "ability",
        "description": "The ape hurls a boulder at a point it can see within 90 feet. Dexterity Saving Throw: DC 17, each creature in a 5-foot-radius Sphere centered on that point. Failure: 24 (7d6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition. Success: Half damage only.",
        "damage": "7d6",
        "damageType": "Bludgeoning",
        "saveDc": 17,
        "saveStat": "dex"
      }
    ],
    "bonusActions": [
      {
        "name": "Leap",
        "description": "The ape jumps up to 30 feet by spending 10 feet of movement."
      }
    ]
  },
  {
    "id": "ddb_giant_badger_2024",
    "name": "Giant Badger",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 15,
      "formula": "2d8 + 6"
    },
    "speed": "30 ft., Burrow 10 ft.",
    "stats": {
      "str": 13,
      "dex": 10,
      "con": 17,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "damageResistances": [
      "Poison"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 6 (2d4 + 1) Piercing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d4+1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_bat_2024",
    "name": "Giant Bat",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 22,
      "formula": "4d10"
    },
    "speed": "10 ft., Fly 60 ft.",
    "stats": {
      "str": 15,
      "dex": 16,
      "con": 11,
      "int": 2,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 0,
      "wis": 1
    },
    "senses": "Blindsight 120 ft.; Passive Perception 11",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_boar_2024",
    "name": "Giant Boar",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 42,
      "formula": "5d10 + 15"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 17,
      "dex": 10,
      "con": 16,
      "int": 2,
      "wis": 7,
      "cha": 5
    },
    "savingThrows": {
      "str": 5,
      "dex": 0,
      "con": 3
    },
    "senses": "Passive Perception 8",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Bloodied Fury",
        "description": "The boar has Advantage on melee attack rolls while it is Bloodied ."
      }
    ],
    "actions": [
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Piercing damage. If the target is a Large or smaller creature and the boar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and has the Prone condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_centipede_2024",
    "name": "Giant Centipede",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 9,
      "formula": "2d6 + 2"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 5,
      "dex": 14,
      "con": 12,
      "int": 1,
      "wis": 7,
      "cha": 3
    },
    "savingThrows": {
      "dex": 2,
      "con": 1
    },
    "senses": "Blindsight 30 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage, and the target has the Poisoned condition until the start of the centipede’s next turn.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_constrictor_snake_2024",
    "name": "Giant Constrictor Snake",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 60,
      "formula": "8d12 + 8"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 19,
      "dex": 14,
      "con": 12,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Blindsight 10 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The snake makes one Bite attack and uses Constrict."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 11 (2d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_constrict",
        "name": "Constrict",
        "type": "ability",
        "description": "Strength Saving Throw: DC 14, one Large or smaller creature the snake can see within 10 feet. Failure: 13 (2d8 + 4) Bludgeoning damage, and the target has the Grappled condition (escape DC 14).",
        "damage": "2d8+4",
        "damageType": "Bludgeoning",
        "saveDc": 14,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_giant_crab_2024",
    "name": "Giant Crab",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 15,
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 13,
      "dex": 13,
      "con": 11,
      "int": 1,
      "wis": 9,
      "cha": 3
    },
    "savingThrows": {
      "str": 1,
      "dex": 1,
      "con": 0
    },
    "skills": {
      "stealth": 3
    },
    "senses": "Blindsight 30 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The crab can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 4 (1d6 + 1) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 11) from one of two claws.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_giant_crocodile_2024",
    "name": "Giant Crocodile",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 85,
      "formula": "9d12 + 27"
    },
    "speed": "30 ft., Swim 50 ft.",
    "stats": {
      "str": 21,
      "dex": 9,
      "con": 17,
      "int": 2,
      "wis": 10,
      "cha": 7
    },
    "savingThrows": {
      "str": 5,
      "con": 3,
      "wis": 0
    },
    "skills": {
      "stealth": 5
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 1 hour."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The crocodile makes one Bite attack and one Tail attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 5 ft. Hit: 21 (3d10 + 5) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition and can’t be targeted by the crocodile’s Tail.",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "3d10+5",
        "damageType": "Piercing"
      },
      {
        "id": "act_tail",
        "name": "Tail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 18 (3d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "3d8+5",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_giant_eagle_2024",
    "name": "Giant Eagle",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Neutral Good",
    "armorClass": 13,
    "hitPoints": {
      "average": 26,
      "formula": "4d10 + 4"
    },
    "speed": "10 ft., Fly 80 ft.",
    "stats": {
      "str": 16,
      "dex": 17,
      "con": 13,
      "int": 8,
      "wis": 14,
      "cha": 10
    },
    "savingThrows": {
      "str": 3,
      "dex": 3,
      "con": 1,
      "wis": 2,
      "cha": 0
    },
    "skills": {
      "perception": 6
    },
    "damageResistances": [
      "Necrotic",
      "Radiant"
    ],
    "senses": "Passive Perception 16",
    "languages": "Celestial ; understands Common and Primordial (Auran) but can’t speak them",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The eagle makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Slashing damage plus 3 (1d6) Radiant damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_giant_elk_2024",
    "name": "Giant Elk",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Celestial",
    "alignment": "Neutral Good",
    "armorClass": 14,
    "hitPoints": {
      "average": 42,
      "formula": "5d12 + 10"
    },
    "speed": "60 ft.",
    "stats": {
      "str": 19,
      "dex": 18,
      "con": 14,
      "int": 7,
      "wis": 14,
      "cha": 10
    },
    "savingThrows": {
      "str": 6,
      "dex": 6,
      "con": 2,
      "wis": 2,
      "cha": 0
    },
    "skills": {
      "perception": 4
    },
    "damageResistances": [
      "Necrotic",
      "Radiant"
    ],
    "senses": "Darkvision 90 ft.; Passive Perception 14",
    "languages": "Celestial ; understands Common, Elvish, and Sylvan but can’t speak them",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_ram",
        "name": "Ram",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 11 (2d6 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage. If the target is a Huge or smaller creature and the elk moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 (2d4) Bludgeoning damage and has the Prone condition.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_giant_fire_beetle_2024",
    "name": "Giant Fire Beetle",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 4,
      "formula": "1d6 + 1"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 8,
      "dex": 10,
      "con": 12,
      "int": 1,
      "wis": 7,
      "cha": 3
    },
    "savingThrows": {
      "dex": 0,
      "con": 1
    },
    "damageResistances": [
      "Fire"
    ],
    "senses": "Blindsight 30 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Illumination",
        "description": "The beetle sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +1 , reach 5 ft. Hit: 1 Fire damage.",
        "attackBonus": 1,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_giant_frog_2024",
    "name": "Giant Frog",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 18,
      "formula": "4d8"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 12,
      "dex": 13,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 1,
      "dex": 1,
      "con": 0,
      "wis": 0
    },
    "skills": {
      "perception": 2,
      "stealth": 4
    },
    "senses": "Darkvision 30 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The frog can breathe air and water."
      },
      {
        "name": "Standing Leap",
        "description": "The frog’s Long Jump is up to 20 feet and its High Jump is up to 10 feet with or without a running start."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 11).",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_swallow",
        "name": "Swallow",
        "type": "ability",
        "description": "The frog swallows a Small or smaller target it is grappling . While swallowed, the target isn’t Grappled but has the Blinded and Restrained conditions, and it has Total Cover against attacks and other effects outside the frog. While swallowing the target, the frog can’t use Bite, and if the frog dies, the swallowed target is no longer Restrained and can escape from the corpse using 5 feet of movement, exiting with the Prone condition."
      }
    ]
  },
  {
    "id": "ddb_giant_goat_2024",
    "name": "Giant Goat",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
    },
    "speed": "40 ft., Climb 30 ft.",
    "stats": {
      "str": 17,
      "dex": 13,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": 5,
      "dex": 1,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_ram",
        "name": "Ram",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature and the goat moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 (2d4) Bludgeoning damage and has the Prone condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_giant_hyena_2024",
    "name": "Giant Hyena",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 16,
      "dex": 14,
      "con": 14,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Rampage (1/Day)",
        "description": "Immediately after dealing damage to a creature that was already Bloodied , the hyena can move up to half its Speed, and it makes one Bite attack."
      }
    ]
  },
  {
    "id": "ddb_giant_lizard_2024",
    "name": "Giant Lizard",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 15,
      "dex": 12,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 1,
      "wis": 0
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The lizard can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_octopus_2024",
    "name": "Giant Octopus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 45,
      "formula": "7d10 + 7"
    },
    "speed": "10 ft., Swim 60 ft.",
    "stats": {
      "str": 17,
      "dex": 13,
      "con": 13,
      "int": 5,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "perception": 4,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The octopus can breathe only underwater. It can hold its breath for 1 hour outside water."
      }
    ],
    "actions": [
      {
        "id": "act_tentacles",
        "name": "Tentacles",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 10 ft. Hit: 10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from all eight tentacles. While Grappled, the target has the Restrained condition.",
        "attackBonus": 5,
        "reachFeet": 10,
        "damage": "2d6+3",
        "damageType": "Bludgeoning"
      }
    ],
    "reactions": [
      {
        "name": "Ink Cloud (1/Day)",
        "description": "Trigger: The octopus takes damage while underwater. Response: The octopus releases ink that fills a 10-foot Cube centered on itself, and the octopus moves up to its Swim Speed. The Cube is Heavily Obscured for 1 minute or until a strong current or similar effect disperses the ink."
      }
    ]
  },
  {
    "id": "ddb_giant_owl_2024",
    "name": "Giant Owl",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
    },
    "speed": "5 ft., Fly 60 ft.",
    "stats": {
      "str": 13,
      "dex": 15,
      "con": 12,
      "int": 10,
      "wis": 14,
      "cha": 10
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 1,
      "int": 0,
      "wis": 4,
      "cha": 0
    },
    "skills": {
      "perception": 6,
      "stealth": 6
    },
    "damageResistances": [
      "Necrotic",
      "Radiant"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 16",
    "languages": "Celestial ; understands Common, Elvish, and Sylvan but can’t speak them",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The owl doesn’t provoke an Opportunity Attack when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_talons",
        "name": "Talons",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (1d10 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The owl casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability:"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Evil and Good , Detect Magic 1/Day: Clairvoyance"
      }
    ]
  },
  {
    "id": "ddb_giant_rat_2024",
    "name": "Giant Rat",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 7,
      "formula": "2d6"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 7,
      "dex": 16,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "dex": 5,
      "con": 0,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The rat has Advantage on an attack roll against a creature if at least one of the rat’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 feet. Hit: 5 (1d4 + 3) Piercing damage.",
        "attackBonus": 5,
        "damage": "1d4+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_scorpion_2024",
    "name": "Giant Scorpion",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 15,
    "hitPoints": {
      "average": 52,
      "formula": "7d10 + 14"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 16,
      "dex": 13,
      "con": 15,
      "int": 1,
      "wis": 9,
      "cha": 3
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 2
    },
    "senses": "Blindsight 60 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The scorpion makes two Claw attacks and one Sting attack."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13) from one of two claws.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_sting",
        "name": "Sting",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage plus 11 (2d10) Poison damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_seahorse_2024",
    "name": "Giant Seahorse",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 16,
      "formula": "3d10"
    },
    "speed": "5 ft., Swim 40 ft.",
    "stats": {
      "str": 15,
      "dex": 12,
      "con": 11,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 0,
      "wis": 1
    },
    "senses": "Passive Perception 11",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The seahorse can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_ram",
        "name": "Ram",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 9 (2d6 + 2) Bludgeoning damage, or 11 (2d8 + 2) Bludgeoning damage if the seahorse moved 20+ feet straight toward the target immediately before the hit.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "Bludgeoning"
      }
    ],
    "bonusActions": [
      {
        "name": "Bubble Dash",
        "description": "While underwater, the seahorse moves up to half its Swim Speed without provoking Opportunity Attacks ."
      }
    ]
  },
  {
    "id": "ddb_giant_shark_2024",
    "name": "Giant Shark",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 92,
      "formula": "8d12 + 40"
    },
    "speed": "5 ft., Swim 60 ft.",
    "stats": {
      "str": 23,
      "dex": 11,
      "con": 21,
      "int": 1,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 6,
      "dex": 0,
      "con": 5,
      "wis": 0
    },
    "skills": {
      "perception": 3
    },
    "senses": "Blindsight 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The shark makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 (with Advantage if the target doesn’t have all its Hit Points), reach 5 ft. Hit: 22 (3d10 + 6) Piercing damage.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "3d10+6",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_spider_2024",
    "name": "Giant Spider",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 26,
      "formula": "4d10 + 4"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 14,
      "dex": 16,
      "con": 12,
      "int": 2,
      "wis": 11,
      "cha": 4
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "perception": 4,
      "stealth": 7
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage plus 7 (2d6) Poison damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_web_recharge_5_6_",
        "name": "Web (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 13, one creature the spider can see within 60 feet. Failure: The target has the Restrained condition until the web is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).",
        "saveDc": 13,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_giant_toad_2024",
    "name": "Giant Toad",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 39,
      "formula": "6d10 + 6"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 15,
      "dex": 13,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 1,
      "wis": 0
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The toad can breathe air and water."
      },
      {
        "name": "Standing Leap",
        "description": "The toad’s Long Jump is up to 20 feet and its High Jump is up to 10 feet with or without a running start."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage plus 5 (2d4) Poison damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12).",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_swallow",
        "name": "Swallow",
        "type": "ability",
        "description": "The toad swallows a Medium or smaller target it is grappling . While swallowed, the target isn’t Grappled but has the Blinded and Restrained conditions, and it has Total Cover against attacks and other effects outside the toad. In addition, the target takes 10 (3d6) Acid damage at the end of each of the toad’s turns. The toad can have only one target swallowed at a time, and it can’t use Bite while it has a swallowed target. If the toad dies, a swallowed creature is no longer Restrained and can escape from the corpse using 5 feet of movement, exiting with the Prone condition.",
        "damage": "3d6",
        "damageType": "Acid"
      }
    ]
  },
  {
    "id": "ddb_giant_venomous_snake_2024",
    "name": "Giant Venomous Snake",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "40 ft., Swim 40 ft.",
    "stats": {
      "str": 10,
      "dex": 18,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 0,
      "dex": 4,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Blindsight 10 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 6 (1d4 + 4) Piercing damage plus 4 (1d8) Poison damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d4+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_vulture_2024",
    "name": "Giant Vulture",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 10,
    "hitPoints": {
      "average": 25,
      "formula": "3d10 + 9"
    },
    "speed": "10 ft., Fly 60 ft.",
    "stats": {
      "str": 15,
      "dex": 10,
      "con": 16,
      "int": 6,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "damageResistances": [
      "Necrotic"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "Understands Common but can’t speak",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The vulture has Advantage on an attack roll against a creature if at least one of the vulture’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_gouge",
        "name": "Gouge",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 9 (2d6 + 2) Piercing damage, and the target has the Poisoned condition until the end of its next turn.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_wasp_2024",
    "name": "Giant Wasp",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "10 ft., Fly 50 ft.",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 10,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 0,
      "dex": 2,
      "con": 0,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The wasp doesn’t provoke an Opportunity Attack when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_sting",
        "name": "Sting",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage plus 5 (2d4) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_weasel_2024",
    "name": "Giant Weasel",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 9,
      "formula": "2d8"
    },
    "speed": "40 ft., Climb 30 ft.",
    "stats": {
      "str": 11,
      "dex": 17,
      "con": 10,
      "int": 4,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 0,
      "dex": 3,
      "con": 0,
      "wis": 1
    },
    "skills": {
      "acrobatics": 5,
      "perception": 3,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_giant_wolf_spider_2024",
    "name": "Giant Wolf Spider",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 12,
      "dex": 16,
      "con": 13,
      "int": 3,
      "wis": 12,
      "cha": 4
    },
    "savingThrows": {
      "str": 1,
      "dex": 3,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 3,
      "stealth": 7
    },
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage plus 5 (2d4) Poison damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_gibbering_mouther_2024",
    "name": "Gibbering Mouther",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Chaotic Neutral",
    "armorClass": 9,
    "hitPoints": {
      "average": 52,
      "formula": "7d8 + 21"
    },
    "speed": "20 ft., Swim 20 ft.",
    "stats": {
      "str": 10,
      "dex": 8,
      "con": 16,
      "int": 3,
      "wis": 10,
      "cha": 6
    },
    "savingThrows": {
      "str": 0,
      "con": 3,
      "wis": 0
    },
    "conditionImmunities": [
      "Prone"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aberrant Ground",
        "description": "The ground in a 10-foot Emanation originating from the mouther is Difficult Terrain ."
      },
      {
        "name": "Gibbering",
        "description": "The mouther babbles incoherently while it doesn’t have the Incapacitated condition. Wisdom Saving Throw: DC 10, any creature that starts its turn within 20 feet of the mouther while it is babbling. Failure: The target rolls 1d8 to determine what it does during the current turn:"
      },
      {
        "name": "1–4",
        "description": "The target does nothing. 5–6. The target takes no action or Bonus Action and uses all its movement to move in a random direction. 7–8. The target makes a melee attack against a randomly determined creature within its reach or does nothing if it can’t make such an attack."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 7 (2d6) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition. The target dies if it is reduced to 0 Hit Points by this attack. Its body is then absorbed into the mouther, leaving only equipment behind.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "2d6",
        "damageType": "Piercing"
      },
      {
        "id": "act_blinding_spittle_recharge_5_6_",
        "name": "Blinding Spittle (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 10, each creature in a 10-foot-radius Sphere centered on a point within 30 feet. Failure: 7 (2d6) Radiant damage, and the target has the Blinded condition until the end of the mouther’s next turn.",
        "damage": "2d6",
        "damageType": "Radiant",
        "saveDc": 10,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_glabrezu_2024",
    "name": "Glabrezu",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 189,
      "formula": "18d10 + 90"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 20,
      "dex": 15,
      "con": 21,
      "int": 19,
      "wis": 17,
      "cha": 16
    },
    "savingThrows": {
      "str": 9,
      "dex": 2,
      "con": 9,
      "int": 4,
      "wis": 7,
      "cha": 7
    },
    "skills": {
      "deception": 7,
      "perception": 7
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 17",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Demonic Restoration",
        "description": "If the glabrezu dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss."
      },
      {
        "name": "Magic Resistance",
        "description": "The glabrezu has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The glabrezu makes two Pincer attacks and uses Pummel or Spellcasting."
      },
      {
        "id": "act_pincer",
        "name": "Pincer",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 10 ft. Hit: 16 (2d10 + 5) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 15) from one of two pincers.",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "2d10+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_pummel",
        "name": "Pummel",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 17, one creature Grappled by the glabrezu. Failure: 15 (3d6 + 5) Bludgeoning damage. Success: Half damage.",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "saveDc": 17,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The glabrezu casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 16):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Darkness , Detect Magic , Dispel Magic 1/Day Each: Confusion , Fly , Power Word Stun"
      }
    ]
  },
  {
    "id": "ddb_gladiator_2024",
    "name": "Gladiator",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 16,
    "hitPoints": {
      "average": 112,
      "formula": "15d8 + 45"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 10,
      "wis": 12,
      "cha": 15
    },
    "savingThrows": {
      "str": 7,
      "dex": 5,
      "con": 6,
      "int": 0,
      "wis": 4,
      "cha": 2
    },
    "skills": {
      "athletics": 10,
      "performance": 5
    },
    "senses": "Passive Perception 11",
    "languages": "Common",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The gladiator makes three Spear attacks. It can replace one attack with a use of Shield Bash."
      },
      {
        "id": "act_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +7 , reach 5 ft. or range 20/60 ft. Hit: 11 (2d6 + 4) Piercing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "2d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_shield_bash",
        "name": "Shield Bash",
        "type": "ability",
        "description": "Strength Saving Throw: DC 15, one creature within 5 feet that the gladiator can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.",
        "damage": "2d4+4",
        "damageType": "Bludgeoning",
        "saveDc": 15,
        "saveStat": "str"
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "Trigger: The gladiator is hit by a melee attack roll while holding a weapon. Response: The gladiator adds 3 to its AC against that attack, possibly causing it to miss."
      }
    ]
  },
  {
    "id": "ddb_gnoll_warrior_2024",
    "name": "Gnoll Warrior",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 27,
      "formula": "6d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 14,
      "dex": 12,
      "con": 11,
      "int": 6,
      "wis": 10,
      "cha": 7
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 0,
      "wis": 0
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Gnoll",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_bone_bow",
        "name": "Bone Bow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +3 , range 150/600 ft. Hit: 6 (1d10 + 1) Piercing damage.",
        "attackBonus": 3,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d10+1",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Rampage (1/Day)",
        "description": "Immediately after dealing damage to a creature that is already Bloodied , the gnoll moves up to half its Speed, and it makes one Rend attack."
      }
    ]
  },
  {
    "id": "ddb_goat_2024",
    "name": "Goat",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 4,
      "formula": "1d8"
    },
    "speed": "40 ft., Climb 30 ft.",
    "stats": {
      "str": 11,
      "dex": 10,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 0,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_ram",
        "name": "Ram",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 1 Bludgeoning damage, or 2 (1d4) Bludgeoning damage if the goat moved 20+ feet straight toward the target immediately before the hit.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_goblin_boss_2024",
    "name": "Goblin Boss",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Fey",
    "subtype": "Goblinoid",
    "alignment": "Chaotic Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 21,
      "formula": "6d6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 15,
      "con": 10,
      "int": 10,
      "wis": 8,
      "cha": 10
    },
    "savingThrows": {
      "str": 0,
      "dex": 2,
      "con": 0,
      "int": 0,
      "cha": 0
    },
    "skills": {
      "stealth": 6
    },
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "Common, Goblin",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The goblin makes two attacks, using Scimitar or Shortbow in any combination."
      },
      {
        "id": "act_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage .",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_shortbow",
        "name": "Shortbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 80/320 ft. Hit: 5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage .",
        "attackBonus": 4,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d6+2",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Nimble Escape",
        "description": "The goblin takes the Disengage or Hide action."
      }
    ],
    "reactions": [
      {
        "name": "Redirect Attack",
        "description": "Trigger: A creature the goblin can see makes an attack roll against it. Response: The goblin chooses a Small or Medium ally within 5 feet of itself. The goblin and that ally swap places, and the ally becomes the target of the attack instead."
      }
    ]
  },
  {
    "id": "ddb_goblin_minion_2024",
    "name": "Goblin Minion",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Fey",
    "subtype": "Goblinoid",
    "alignment": "Chaotic Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 7,
      "formula": "2d6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 8,
      "dex": 15,
      "con": 10,
      "int": 10,
      "wis": 8,
      "cha": 8
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "int": 0
    },
    "skills": {
      "stealth": 6
    },
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "Common, Goblin",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_dagger",
        "name": "Dagger",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +4 , reach 5 ft. or range 20/60 ft. Hit: 4 (1d4 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d4+2",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Nimble Escape",
        "description": "The goblin takes the Disengage or Hide action."
      }
    ]
  },
  {
    "id": "ddb_goblin_warrior_2024",
    "name": "Goblin Warrior",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Fey",
    "subtype": "Goblinoid",
    "alignment": "Chaotic Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 10,
      "formula": "3d6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 8,
      "dex": 15,
      "con": 10,
      "int": 10,
      "wis": 8,
      "cha": 8
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "int": 0
    },
    "skills": {
      "stealth": 6
    },
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "Common, Goblin",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage .",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_shortbow",
        "name": "Shortbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 80/320 ft. Hit: 5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage .",
        "attackBonus": 4,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d6+2",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Nimble Escape",
        "description": "The goblin takes the Disengage or Hide action."
      }
    ]
  },
  {
    "id": "ddb_gold_dragon_wyrmling_2024",
    "name": "Gold Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 17,
    "hitPoints": {
      "average": 60,
      "formula": "8d8 + 24"
    },
    "speed": "30 ft., Fly 60 ft., Swim 30 ft.",
    "stats": {
      "str": 19,
      "dex": 14,
      "con": 17,
      "int": 14,
      "wis": 11,
      "cha": 16
    },
    "savingThrows": {
      "str": 4,
      "dex": 4,
      "con": 3,
      "int": 2,
      "wis": 2,
      "cha": 3
    },
    "skills": {
      "perception": 4,
      "stealth": 4
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 9 (1d10 + 4) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d10+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: 22 (4d10) Fire damage. Success: Half damage.",
        "damage": "4d10",
        "damageType": "Fire",
        "saveDc": 13,
        "saveStat": "dex"
      },
      {
        "id": "act_weakening_breath",
        "name": "Weakening Breath",
        "type": "ability",
        "description": "Strength Saving Throw: DC 13, each creature that isn’t currently affected by this breath in a 15-foot Cone. Failure: The target has Disadvantage on Strength-based D20 Tests and subtracts 2 (1d4) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 13,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_gorgon_2024",
    "name": "Gorgon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 19,
    "hitPoints": {
      "average": 114,
      "formula": "12d10 + 48"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 20,
      "dex": 11,
      "con": 18,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 5,
      "dex": 0,
      "con": 4,
      "wis": 1
    },
    "skills": {
      "perception": 7
    },
    "conditionImmunities": [
      "Exhaustion",
      "Petrified"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 17",
    "languages": "None",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 5 ft. Hit: 18 (2d12 + 5) Piercing damage. If the target is a Large or smaller creature and the gorgon moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition.",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d12+5",
        "damageType": "Piercing"
      },
      {
        "id": "act_petrifying_breath_recharge_5_6_",
        "name": "Petrifying Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. First Failure: The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. Second Failure: The target has the Petrified condition instead of the Restrained condition.",
        "saveDc": 15,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Trample",
        "description": "Dexterity Saving Throw: DC 16, one creature within 5 feet that has the Prone condition. Failure: 16 (2d10 + 5) Bludgeoning damage. Success: Half damage."
      }
    ]
  },
  {
    "id": "ddb_gray_ooze_2024",
    "name": "Gray Ooze",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Ooze",
    "alignment": "Unaligned",
    "armorClass": 9,
    "hitPoints": {
      "average": 22,
      "formula": "3d8 + 9"
    },
    "speed": "10 ft., Climb 10 ft.",
    "stats": {
      "str": 12,
      "dex": 6,
      "con": 16,
      "int": 1,
      "wis": 6,
      "cha": 2
    },
    "savingThrows": {
      "str": 1,
      "con": 3
    },
    "skills": {
      "stealth": 2
    },
    "damageResistances": [
      "Acid",
      "Cold",
      "Fire"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Grappled",
      "Prone",
      "Restrained"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The ooze can move through a space as narrow as 1 inch without expending extra movement to do so."
      },
      {
        "name": "Corrosive Form",
        "description": "Nonmagical ammunition is destroyed immediately after hitting the ooze and dealing any damage. Any nonmagical weapon takes a cumulative −1 penalty to attack rolls immediately after dealing damage to the ooze and coming into contact with it. The weapon is destroyed if the penalty reaches −5. The penalty can be removed by casting the Mending spell on the weapon."
      }
    ],
    "actions": [
      {
        "id": "act_pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 10 (2d8 + 1) Acid damage. Nonmagical armor worn by the target takes a −1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d8+1",
        "damageType": "Acid"
      }
    ]
  },
  {
    "id": "ddb_green_dragon_wyrmling_2024",
    "name": "Green Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 38,
      "formula": "7d8 + 7"
    },
    "speed": "30 ft., Fly 60 ft., Swim 30 ft.",
    "stats": {
      "str": 15,
      "dex": 12,
      "con": 13,
      "int": 14,
      "wis": 11,
      "cha": 13
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 1,
      "int": 2,
      "wis": 2,
      "cha": 1
    },
    "skills": {
      "perception": 4,
      "stealth": 3
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (1d10 + 2) Slashing damage plus 3 (1d6) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_poison_breath_recharge_5_6_",
        "name": "Poison Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 11, each creature in a 15-foot Cone. Failure: 21 (6d6) Poison damage. Success: Half damage.",
        "damage": "6d6",
        "damageType": "Poison",
        "saveDc": 11,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_green_hag_2024",
    "name": "Green Hag",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 82,
      "formula": "11d8 + 33"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 18,
      "dex": 12,
      "con": 16,
      "int": 13,
      "wis": 14,
      "cha": 14
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 3,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "skills": {
      "arcana": 5,
      "deception": 4,
      "perception": 4,
      "stealth": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Common, Elvish, Sylvan",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The hag can breathe air and water."
      },
      {
        "name": "Coven Magic",
        "description": "While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell’s normal casting time, and using Intelligence as the spellcasting ability (spell save DC 11): Augury , Find Familiar , Identify , Locate Object , Scrying , or Unseen Servant . The hag must finish a Long Rest before using this trait to cast that spell again."
      },
      {
        "name": "Mimicry",
        "description": "The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom ( Insight ) check."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hag makes two Claw attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 8 (1d8 + 4) Slashing damage plus 3 (1d6) Poison damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The hag casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 12, +4 to hit with spell attacks):",
        "attackBonus": 4
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Dancing Lights , Disguise Self (24-hour duration), Invisibility (self only, and the hag leaves no tracks while Invisible ), Minor Illusion , Ray of Sickness (level 3 version)"
      }
    ]
  },
  {
    "id": "ddb_grick_2024",
    "name": "Grick",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 54,
      "formula": "12d8"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 14,
      "dex": 14,
      "con": 11,
      "int": 3,
      "wis": 14,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 0,
      "wis": 2
    },
    "skills": {
      "stealth": 4
    },
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The grick makes one Beak attack and one Tentacles attack."
      },
      {
        "id": "act_beak",
        "name": "Beak",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 9 (2d6 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_tentacles",
        "name": "Tentacles",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (1d10 + 2) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12) from all four tentacles.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_griffon_2024",
    "name": "Griffon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 59,
      "formula": "7d10 + 21"
    },
    "speed": "30 ft., Fly 80 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 2,
      "wis": 13,
      "cha": 8
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The griffon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 8 (1d8 + 4) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14) from both of the griffon’s front claws.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_grimlock_2024",
    "name": "Grimlock",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 12,
      "int": 9,
      "wis": 8,
      "cha": 6
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 1
    },
    "skills": {
      "athletics": 5,
      "perception": 3,
      "stealth": 5
    },
    "senses": "Blindsight 30 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bone_cudgel",
        "name": "Bone Cudgel",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage plus 2 (1d4) Psychic damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_guard_2024",
    "name": "Guard",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 16,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 13,
      "dex": 12,
      "con": 12,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "savingThrows": {
      "str": 1,
      "dex": 1,
      "con": 1,
      "int": 0,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Common",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +3 , reach 5 ft. or range 20/60 ft. Hit: 4 (1d6 + 1) Piercing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6+1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_guard_captain_2024",
    "name": "Guard Captain",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 18,
    "hitPoints": {
      "average": 75,
      "formula": "10d8 + 30"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 16,
      "int": 12,
      "wis": 14,
      "cha": 13
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "skills": {
      "athletics": 6,
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "Common",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The guard makes two attacks, using Javelin or Longsword in any combination."
      },
      {
        "id": "act_javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +6 , reach 5 ft. or range 30/120 ft. Hit: 14 (3d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "3d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 15 (2d10 + 4) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d10+4",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_guardian_naga_2024",
    "name": "Guardian Naga",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 18,
    "hitPoints": {
      "average": 136,
      "formula": "16d10 + 48"
    },
    "speed": "40 ft., Climb 40 ft., Swim 40 ft.",
    "stats": {
      "str": 19,
      "dex": 18,
      "con": 16,
      "int": 16,
      "wis": 19,
      "cha": 18
    },
    "savingThrows": {
      "str": 4,
      "dex": 8,
      "con": 7,
      "int": 7,
      "wis": 8,
      "cha": 8
    },
    "skills": {
      "arcana": 11,
      "history": 11,
      "religion": 11
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Paralyzed",
      "Poisoned",
      "Restrained"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Celestial, Common",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Celestial Restoration",
        "description": "If the naga dies, it returns to life in 1d6 days and regains all its Hit Points unless Dispel Evil and Good is cast on its remains."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The naga makes two Bite attacks. It can replace any attack with a use of Poisonous Spittle."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 17 (2d12 + 4) Piercing damage plus 22 (4d10) Poison damage.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d12+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_poisonous_spittle",
        "name": "Poisonous Spittle",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 16, one creature the naga can see within 60 feet. Failure: 31 (7d8) Poison damage, and the target has the Blinded condition until the start of the naga’s next turn. Success: Half damage only.",
        "damage": "7d8",
        "damageType": "Poison",
        "saveDc": 16,
        "saveStat": "con"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The naga casts one of the following spells, requiring no Somatic or Material components and using Wisdom as the spellcasting ability (spell save DC 16):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Thaumaturgy 1/Day Each: Clairvoyance , Cure Wounds (level 6 version), Flame Strike (level 6 version), Geas , True Seeing"
      }
    ]
  },
  {
    "id": "ddb_gulthias_blight_2024",
    "name": "Gulthias Blight",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Plant",
    "alignment": "Neutral Evil",
    "armorClass": 20,
    "hitPoints": {
      "average": 264,
      "formula": "16d20 + 96"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 22,
      "int": 10,
      "wis": 18,
      "cha": 12
    },
    "savingThrows": {
      "str": 7,
      "dex": 0,
      "con": 6,
      "int": 0,
      "wis": 4,
      "cha": 1
    },
    "skills": {
      "perception": 9
    },
    "damageResistances": [
      "Fire",
      "Necrotic"
    ],
    "conditionImmunities": [
      "Deafened"
    ],
    "senses": "Blindsight 120 ft.; Passive Perception 19",
    "languages": "Common, Druidic",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Blight Seeds",
        "description": "When it finishes a Long Rest, the blight expels 1d6 seeds into unoccupied spaces on the ground within 30 feet of itself. After 24 hours, the seeds become creatures under the blight’s control. Roll 1d8 for each seed to determine the creature it becomes: on 1–4, Twig Blight ; on 5–6, Needle Blight ; on 7–8, Vine Blight ."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The blight makes two attacks, using Slam or Thorn Volley in any combination. It also uses Life-Draining Root."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +12 , reach 10 ft. Hit: 25 (4d8 + 7) Bludgeoning damage.",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "4d8+7",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_thorn_volley",
        "name": "Thorn Volley",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +12 , range 60/180 ft. Hit: 20 (3d8 + 7) Piercing damage.",
        "attackBonus": 12,
        "rangeFeet": 60,
        "rangeLongFeet": 180,
        "damage": "3d8+7",
        "damageType": "Piercing"
      },
      {
        "id": "act_life_draining_root",
        "name": "Life-Draining Root",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 20, one Huge or smaller creature the blight can see within 30 feet. Failure: 14 (2d6 + 7) Necrotic damage, and the target has the Grappled condition (escape DC 17) from one of six roots. Until the grapple ends, the target has the Restrained condition and takes 14 (4d6) Necrotic damage at the start of each of its turns. The target’s Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the blight regains Hit Points equal to that amount.",
        "damage": "2d6+7",
        "damageType": "Necrotic",
        "saveDc": 20,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_half_dragon_2024",
    "name": "Half-Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Neutral",
    "armorClass": 18,
    "hitPoints": {
      "average": 105,
      "formula": "14d8 + 42"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 19,
      "dex": 14,
      "con": 16,
      "int": 10,
      "wis": 15,
      "cha": 14
    },
    "savingThrows": {
      "str": 4,
      "dex": 5,
      "con": 3,
      "int": 0,
      "wis": 5,
      "cha": 2
    },
    "skills": {
      "athletics": 7,
      "perception": 5,
      "stealth": 5
    },
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 15",
    "languages": "Common, Draconic",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Resistances",
        "description": "Damage type chosen for the Draconic Origin trait below."
      },
      {
        "name": "Draconic Origin",
        "description": "The half-dragon is related to a type of dragon associated with one of the following damage types (DM’s choice): Acid, Cold, Fire, Lightning, or Poison. This choice affects other aspects of the stat block."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The half-dragon makes two Claw attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 6 (1d4 + 4) Slashing damage plus 7 (2d6) damage of the type chosen for the Draconic Origin trait.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "1d4+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_dragon_s_breath_recharge_5_6_",
        "name": "Dragon’s Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 14, each creature in a 30-foot Cone. Failure: 28 (8d6) damage of the type chosen for the Draconic Origin trait. Success: Half damage.",
        "damage": "8d6",
        "saveDc": 14,
        "saveStat": "dex"
      }
    ],
    "bonusActions": [
      {
        "name": "Leap",
        "description": "The half-dragon jumps up to 30 feet by spending 10 feet of movement."
      }
    ]
  },
  {
    "id": "ddb_harpy_2024",
    "name": "Harpy",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 38,
      "formula": "7d8 + 7"
    },
    "speed": "20 ft., Fly 40 ft.",
    "stats": {
      "str": 12,
      "dex": 13,
      "con": 12,
      "int": 7,
      "wis": 10,
      "cha": 13
    },
    "savingThrows": {
      "str": 1,
      "dex": 1,
      "con": 1,
      "wis": 0,
      "cha": 1
    },
    "senses": "Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 6 (2d4 + 1) Slashing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d4+1",
        "damageType": "Slashing"
      },
      {
        "id": "act_luring_song",
        "name": "Luring Song",
        "type": "ability",
        "description": "The harpy sings a magical melody, which lasts until the harpy’s Concentration ends on it. Wisdom Saving Throw: DC 11, each Humanoid and Giant in a 300-foot Emanation originating from the harpy when the song starts. Failure: The target has the Charmed condition until the song ends and repeats the save at the end of each of its turns. While Charmed, the target has the Incapacitated condition and ignores the Luring Song of other harpies. If the target is more than 5 feet from the harpy, the target moves on its turn toward the harpy by the most direct route, trying to get within 5 feet of the harpy. It doesn’t avoid Opportunity Attacks ; however, before moving into damaging terrain (such as lava or a pit) and whenever it takes damage from a source other than the harpy, the target repeats the save. Success: The target is immune to this harpy’s Luring Song for 24 hours.",
        "saveDc": 11,
        "saveStat": "wis"
      }
    ]
  },
  {
    "id": "ddb_haunting_revenant_2024",
    "name": "Haunting Revenant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Undead",
    "alignment": "Neutral",
    "armorClass": 20,
    "hitPoints": {
      "average": 203,
      "formula": "14d20 + 56"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 20,
      "dex": 12,
      "con": 18,
      "int": 16,
      "wis": 18,
      "cha": 20
    },
    "savingThrows": {
      "str": 5,
      "dex": 1,
      "con": 8,
      "int": 3,
      "wis": 8,
      "cha": 5
    },
    "damageResistances": [
      "Necrotic",
      "Psychic"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Truesight 60 ft.; Passive Perception 14",
    "languages": "Common plus two other languages",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Haunted Zone",
        "description": "Constitution Saving Throw: DC 17, any creature that casts a spell while inside the revenant’s space. Failure: The spell fails and is wasted."
      },
      {
        "name": "Undead Restoration",
        "description": "If the revenant dies, it revives 24 hours later unless Dispel Evil and Good is cast on its remains. If it revives, it animates another Gargantuan object or structure elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its Hit Points."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The revenant makes two Object Slam attacks and uses Invitation."
      },
      {
        "id": "act_object_slam",
        "name": "Object Slam",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +9 (with Advantage if the target is inside the revenant’s space), reach 10 ft. or range 30/90 ft. Hit: 27 (5d8 + 5) Bludgeoning damage.",
        "attackBonus": 9,
        "reachFeet": 10,
        "rangeFeet": 30,
        "rangeLongFeet": 90,
        "damage": "5d8+5",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_invitation",
        "name": "Invitation",
        "type": "ability",
        "description": "Charisma Saving Throw: DC 17, each creature in a 60-foot Cone. Failure: The target is teleported inside the revenant’s space and swallowed. A swallowed creature has Total Cover against attacks and other effects outside the revenant.",
        "saveDc": 17,
        "saveStat": "cha"
      }
    ]
  },
  {
    "id": "ddb_hawk_2024",
    "name": "Hawk",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "10 ft., Fly 60 ft.",
    "stats": {
      "str": 5,
      "dex": 16,
      "con": 8,
      "int": 2,
      "wis": 14,
      "cha": 6
    },
    "savingThrows": {
      "dex": 3,
      "wis": 2
    },
    "skills": {
      "perception": 6
    },
    "senses": "Passive Perception 16",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_talons",
        "name": "Talons",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 1 Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_hell_hound_2024",
    "name": "Hell Hound",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 58,
      "formula": "9d8 + 18"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 14,
      "int": 6,
      "wis": 13,
      "cha": 6
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "Understands Infernal but can’t speak",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The hound has Advantage on an attack roll against a creature if at least one of the hound’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hound makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage plus 3 (1d6) Fire damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: 17 (5d6) Fire damage. Success: Half damage.",
        "damage": "5d6",
        "damageType": "Fire",
        "saveDc": 12,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_hezrou_2024",
    "name": "Hezrou",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 157,
      "formula": "15d10 + 75"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 19,
      "dex": 17,
      "con": 20,
      "int": 5,
      "wis": 12,
      "cha": 13
    },
    "savingThrows": {
      "str": 7,
      "dex": 3,
      "con": 8,
      "wis": 4,
      "cha": 1
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 11",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Demonic Restoration",
        "description": "If the hezrou dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss."
      },
      {
        "name": "Magic Resistance",
        "description": "The hezrou has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Stench",
        "description": "Constitution Saving Throw: DC 16, any creature that starts its turn in a 10-foot Emanation originating from the hezrou. Failure: The target has the Poisoned condition until the start of its next turn."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hezrou makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 6 (1d4 + 4) Slashing damage plus 9 (2d8) Poison damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d4+4",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Leap",
        "description": "The hezrou jumps up to 30 feet by spending 10 feet of movement."
      }
    ]
  },
  {
    "id": "ddb_hill_giant_2024",
    "name": "Hill Giant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 105,
      "formula": "10d12 + 40"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 21,
      "dex": 8,
      "con": 19,
      "int": 5,
      "wis": 9,
      "cha": 6
    },
    "savingThrows": {
      "str": 5,
      "con": 4
    },
    "skills": {
      "perception": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Giant",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two attacks, using Tree Club or Trash Lob in any combination."
      },
      {
        "id": "act_tree_club",
        "name": "Tree Club",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 18 (3d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "3d8+5",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_trash_lob",
        "name": "Trash Lob",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +8 , range 60/240 ft. Hit: 16 (2d10 + 5) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.",
        "attackBonus": 8,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "2d10+5",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_hippogriff_2024",
    "name": "Hippogriff",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 26,
      "formula": "4d10 + 4"
    },
    "speed": "40 ft., Fly 60 ft.",
    "stats": {
      "str": 17,
      "dex": 13,
      "con": 13,
      "int": 2,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "senses": "Passive Perception 15",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The hippogriff doesn’t provoke an Opportunity Attack when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hippogriff makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_hippopotamus_2024",
    "name": "Hippopotamus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 82,
      "formula": "11d10 + 22"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 21,
      "dex": 7,
      "con": 15,
      "int": 2,
      "wis": 12,
      "cha": 4
    },
    "savingThrows": {
      "str": 7,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "None",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The hippopotamus can hold its breath for 10 minutes."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hippopotamus makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 16 (2d10 + 5) Piercing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d10+5",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_hobgoblin_captain_2024",
    "name": "Hobgoblin Captain",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "subtype": "Goblinoid",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 58,
      "formula": "9d8 + 18"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 14,
      "int": 12,
      "wis": 10,
      "cha": 13
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 2,
      "int": 1,
      "wis": 0,
      "cha": 1
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Common, Goblin",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aura of Authority",
        "description": "While in a 10-foot Emanation originating from the hobgoblin, the hobgoblin and its allies have Advantage on attack rolls and saving throws, provided the hobgoblin doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hobgoblin makes two attacks, using Greatsword or Longbow in any combination."
      },
      {
        "id": "act_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 9 (2d6 + 2) Slashing damage plus 3 (1d6) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 150/600 ft. Hit: 6 (1d8 + 2) Piercing damage plus 5 (2d4) Poison damage.",
        "attackBonus": 4,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_hobgoblin_warrior_2024",
    "name": "Hobgoblin Warrior",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "subtype": "Goblinoid",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 13,
      "dex": 12,
      "con": 12,
      "int": 10,
      "wis": 10,
      "cha": 9
    },
    "savingThrows": {
      "str": 1,
      "dex": 1,
      "con": 1,
      "int": 0,
      "wis": 0
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Common, Goblin",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 12 (2d10 + 1) Slashing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d10+1",
        "damageType": "Slashing"
      },
      {
        "id": "act_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +3 , range 150/600 ft. Hit: 5 (1d8 + 1) Piercing damage plus 7 (3d4) Poison damage.",
        "attackBonus": 3,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_homunculus_2024",
    "name": "Homunculus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Construct",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 4,
      "formula": "1d4 + 2"
    },
    "speed": "20 ft., Fly 40 ft.",
    "stats": {
      "str": 4,
      "dex": 15,
      "con": 14,
      "int": 10,
      "wis": 10,
      "cha": 7
    },
    "savingThrows": {
      "dex": 2,
      "con": 2,
      "int": 0,
      "wis": 2,
      "cha": 0
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Understands Common plus one other language but can’t speak",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Telepathic Bond",
        "description": "While the homunculus is on the same plane of existence as its master, the two of them can communicate telepathically with each other."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 1 Piercing damage, and the target is subjected to the following effect. Constitution Saving Throw: DC 12. Failure: The target has the Poisoned condition until the end of the homunculus’s next turn. Failure by 5 or More: The target has the Poisoned condition for 1 minute. While Poisoned, the target has the Unconscious condition, which ends early if the target takes any damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "saveDc": 12,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_horned_devil_2024",
    "name": "Horned Devil",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 199,
      "formula": "19d10 + 95"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 22,
      "dex": 17,
      "con": 21,
      "int": 12,
      "wis": 16,
      "cha": 18
    },
    "savingThrows": {
      "str": 10,
      "dex": 7,
      "con": 5,
      "int": 1,
      "wis": 7,
      "cha": 8
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 150 ft. (unimpeded by magical Darkness); Passive Perception 13",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Diabolical Restoration",
        "description": "If the devil dies outside the Nine Hells , its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes three attacks, using Searing Fork or Hurl Flame in any combination. It can replace one attack with a use of Infernal Tail."
      },
      {
        "id": "act_searing_fork",
        "name": "Searing Fork",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 15 (2d8 + 6) Piercing damage plus 9 (2d8) Fire damage.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d8+6",
        "damageType": "Piercing"
      },
      {
        "id": "act_hurl_flame",
        "name": "Hurl Flame",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +8 , range 150 ft. Hit: 26 (5d8 + 4) Fire damage. If the target is a flammable object that isn’t being worn or carried, it starts burning .",
        "attackBonus": 8,
        "rangeFeet": 150,
        "damage": "5d8+4",
        "damageType": "Fire"
      },
      {
        "id": "act_infernal_tail",
        "name": "Infernal Tail",
        "type": "spell",
        "description": "Dexterity Saving Throw: DC 17, one creature the devil can see within 10 feet. Failure: 10 (1d8 + 6) Necrotic damage, and the target receives an infernal wound if it doesn’t have one. While wounded, the target loses 10 (3d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, doing so by succeeding on a DC 17 Wisdom ( Medicine ) check.",
        "damage": "1d8+6",
        "damageType": "Necrotic",
        "saveDc": 17,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_hunter_shark_2024",
    "name": "Hunter Shark",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "5 ft., Swim 40 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 15,
      "int": 1,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 2,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Blindsight 60 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 (with Advantage if the target doesn’t have all its Hit Points), reach 5 ft. Hit: 14 (3d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "3d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_hydra_2024",
    "name": "Hydra",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 15,
    "hitPoints": {
      "average": 184,
      "formula": "16d12 + 80"
    },
    "speed": "40 ft., Swim 40 ft.",
    "stats": {
      "str": 20,
      "dex": 12,
      "con": 20,
      "int": 2,
      "wis": 10,
      "cha": 7
    },
    "savingThrows": {
      "str": 5,
      "dex": 1,
      "con": 5,
      "wis": 0
    },
    "skills": {
      "perception": 6
    },
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened",
      "Stunned",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 16",
    "languages": "None",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The hydra can hold its breath for 1 hour."
      },
      {
        "name": "Multiple Heads",
        "description": "The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead. At the end of each of its turns when it has at least one living head, the hydra grows two heads for each of its heads that died since its last turn, unless it has taken Fire damage since its last turn. The hydra regains 20 Hit Points when it grows new heads."
      },
      {
        "name": "Reactive Heads",
        "description": "For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks ."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hydra makes as many Bite attacks as it has heads."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 10 (1d10 + 5) Piercing damage.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "1d10+5",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_hyena_2024",
    "name": "Hyena",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 5,
      "formula": "1d8 + 1"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 11,
      "dex": 13,
      "con": 12,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 0,
      "dex": 1,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The hyena has Advantage on an attack roll against a creature if at least one of the hyena’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 3 (1d6) Piercing damage.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d6",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_ice_devil_2024",
    "name": "Ice Devil",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 228,
      "formula": "24d10 + 96"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 21,
      "dex": 14,
      "con": 18,
      "int": 18,
      "wis": 15,
      "cha": 18
    },
    "savingThrows": {
      "str": 5,
      "dex": 7,
      "con": 9,
      "int": 4,
      "wis": 7,
      "cha": 9
    },
    "skills": {
      "insight": 7,
      "perception": 7,
      "persuasion": 9
    },
    "damageImmunities": [
      "Cold",
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Blindsight 120 ft.; Passive Perception 17",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "14",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Diabolical Restoration",
        "description": "If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes three Ice Spear attacks. It can replace one attack with a Tail attack."
      },
      {
        "id": "act_ice_spear",
        "name": "Ice Spear",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +10 , reach 5 ft. or range 30/120 ft. Hit: 14 (2d8 + 5) Piercing damage plus 10 (3d6) Cold damage. Until the end of its next turn, the target can’t take a Bonus Action or Reaction, its Speed decreases by 10 feet, and it can move or take one action on its turn, not both. Hit or Miss: The spear magically returns to the devil’s hand immediately after a ranged attack.",
        "attackBonus": 10,
        "reachFeet": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "2d8+5",
        "damageType": "Piercing"
      },
      {
        "id": "act_tail",
        "name": "Tail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 15 (3d6 + 5) Bludgeoning damage plus 18 (4d8) Cold damage.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "3d6+5",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_ice_wall_recharge_6_",
        "name": "Ice Wall (Recharge 6)",
        "type": "spell",
        "description": "The devil casts Wall of Ice (level 8 version), requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17)."
      }
    ]
  },
  {
    "id": "ddb_ice_mephit_2024",
    "name": "Ice Mephit",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 21,
      "formula": "6d6"
    },
    "speed": "30 ft., Fly 30 ft.",
    "stats": {
      "str": 7,
      "dex": 13,
      "con": 10,
      "int": 9,
      "wis": 11,
      "cha": 12
    },
    "savingThrows": {
      "dex": 1,
      "con": 0,
      "wis": 0,
      "cha": 1
    },
    "skills": {
      "perception": 2,
      "stealth": 3
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageImmunities": [
      "Cold",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "Primordial (Aquan, Auran)",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "The mephit explodes when it dies. Constitution Saving Throw: DC 10, each creature in a 5-foot Emanation originating from the mephit. Failure: 5 (2d4) Cold damage. Success: Half damage."
      }
    ],
    "actions": [
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 3 (1d4 + 1) Slashing damage plus 2 (1d4) Cold damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "Slashing"
      },
      {
        "id": "act_fog_cloud_1_day_",
        "name": "Fog Cloud (1/Day)",
        "type": "spell",
        "description": "The mephit casts Fog Cloud , requiring no spell components and using Charisma as the spellcasting ability."
      },
      {
        "id": "act_frost_breath_recharge_6_",
        "name": "Frost Breath (Recharge 6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 10, each creature in a 15-foot Cone. Failure: 7 (3d4) Cold damage. Success: Half damage.",
        "damage": "3d4",
        "damageType": "Cold",
        "saveDc": 10,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_imp_2024",
    "name": "Imp",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 21,
      "formula": "6d4 + 6"
    },
    "speed": "20 ft., Fly 40 ft.",
    "stats": {
      "str": 6,
      "dex": 17,
      "con": 13,
      "int": 11,
      "wis": 12,
      "cha": 14
    },
    "savingThrows": {
      "dex": 3,
      "con": 1,
      "int": 0,
      "wis": 1,
      "cha": 2
    },
    "skills": {
      "deception": 4,
      "insight": 3,
      "stealth": 5
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft. (unimpeded by magical Darkness); Passive Perception 11",
    "languages": "Common, Infernal",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The imp has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_sting",
        "name": "Sting",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Piercing damage plus 7 (2d6) Poison damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_invisibility",
        "name": "Invisibility",
        "type": "spell",
        "description": "The imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability."
      },
      {
        "id": "act_shape_shift",
        "name": "Shape-Shift",
        "type": "ability",
        "description": "The imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_incubus_2024",
    "name": "Incubus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 66,
      "formula": "12d8 + 12"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 8,
      "dex": 17,
      "con": 13,
      "int": 15,
      "wis": 12,
      "cha": 20
    },
    "savingThrows": {
      "dex": 3,
      "con": 1,
      "int": 2,
      "wis": 1,
      "cha": 5
    },
    "skills": {
      "deception": 9,
      "insight": 5,
      "perception": 5,
      "persuasion": 9,
      "stealth": 7
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Poison",
      "Psychic"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "Abyssal, Common, Infernal, Telepathy 60 ft.",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Succubus Form",
        "description": "When the incubus finishes a Long Rest, it can shape-shift into a Succubus , using that stat block instead of this one. Any equipment it’s wearing or carrying isn’t transformed."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The incubus makes two Restless Touch attacks."
      },
      {
        "id": "act_restless_touch",
        "name": "Restless Touch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 15 (3d6 + 5) Psychic damage, and the target is cursed for 24 hours or until the incubus dies. Until the curse ends, the target gains no benefit from finishing Short Rests.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "3d6+5",
        "damageType": "Psychic"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The incubus casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Disguise Self , Etherealness 1/Day Each: Dream , Hypnotic Pattern"
      }
    ],
    "bonusActions": [
      {
        "name": "Nightmare (Recharge 6)",
        "description": "Wisdom Saving Throw: DC 15, one creature the incubus can see within 60 feet. Failure: If the target has 20 Hit Points or fewer, it has the Unconscious condition for 1 hour, until it takes damage, or until a creature within 5 feet of it takes an action to wake it. Otherwise, the target takes 18 (4d8) Psychic damage."
      }
    ]
  },
  {
    "id": "ddb_intellect_devourer_2024",
    "name": "Intellect Devourer",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 28,
      "formula": "8d4 + 8"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 6,
      "dex": 14,
      "con": 13,
      "int": 14,
      "wis": 11,
      "cha": 10
    },
    "savingThrows": {
      "dex": 2,
      "con": 1,
      "int": 2,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "perception": 2,
      "stealth": 4
    },
    "damageResistances": [
      "Psychic"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 12",
    "languages": "Telepathy 60 ft., Understands Deep Speech but can’t speak",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Detect Intelligence",
        "description": "The intellect devourer magically senses the location of any creature within 300 feet of itself that has an Intelligence score of 3 or higher, regardless of interposing barriers."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The intellect devourer makes one Claw attack and uses Devour Intellect."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (2d4 + 2) Slashing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_devour_intellect",
        "name": "Devour Intellect",
        "type": "ability",
        "description": "Intelligence Saving Throw: DC 12, one creature the intellect devourer can see within 5 feet. Failure: 11 (2d10) Psychic damage, and the target has the Stunned condition until the end of the intellect devourer’s next turn.",
        "damage": "2d10",
        "damageType": "Psychic",
        "saveDc": 12,
        "saveStat": "int"
      },
      {
        "id": "act_steal_body",
        "name": "Steal Body",
        "type": "spell",
        "description": "Intelligence Saving Throw: DC 12, one Small or Medium creature within 5 feet that has the Incapacitated condition, is a Humanoid or Beast, and has 10 Hit Points or fewer. Failure: The intellect devourer possesses the target, consumes its brain, and teleports inside its skull. While there, the intellect devourer has Total Cover against attacks and other effects originating outside its host. The intellect devourer retains its Intelligence, Wisdom, and Charisma scores; its understanding of Deep Speech; its telepathy; and its Detect Intelligence trait. It otherwise adopts the target’s game statistics. It knows everything the target knew, including spells and languages.",
        "saveDc": 12,
        "saveStat": "int"
      }
    ]
  },
  {
    "id": "ddb_invisible_stalker_2024",
    "name": "Invisible Stalker",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 97,
      "formula": "13d10 + 26"
    },
    "speed": "50 ft., Fly 50 ft. (hover)",
    "stats": {
      "str": 16,
      "dex": 19,
      "con": 14,
      "int": 10,
      "wis": 15,
      "cha": 11
    },
    "savingThrows": {
      "str": 3,
      "dex": 4,
      "con": 2,
      "int": 0,
      "wis": 2,
      "cha": 0
    },
    "skills": {
      "perception": 8,
      "stealth": 10
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 18",
    "languages": "Common, Primordial (Auran)",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Air Form",
        "description": "The stalker can enter an enemy’s space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so."
      },
      {
        "name": "Invisibility",
        "description": "The stalker has the Invisible condition."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The stalker makes three Wind Swipe attacks. It can replace one attack with a use of Vortex."
      },
      {
        "id": "act_wind_swipe",
        "name": "Wind Swipe",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 11 (2d6 + 4) Force damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Force"
      },
      {
        "id": "act_vortex",
        "name": "Vortex",
        "type": "spell",
        "description": "Constitution Saving Throw: DC 14, one Large or smaller creature in the stalker’s space. Failure: 7 (1d8 + 3) Thunder damage, and the target has the Grappled condition (escape DC 13). Until the grapple ends, the target can’t cast spells with a Verbal component and takes 7 (2d6) Thunder damage at the start of each of the stalker’s turns.",
        "damage": "1d8+3",
        "damageType": "Thunder",
        "saveDc": 14,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_iron_golem_2024",
    "name": "Iron Golem",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 20,
    "hitPoints": {
      "average": 252,
      "formula": "24d10 + 120"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 24,
      "dex": 9,
      "con": 20,
      "int": 3,
      "wis": 11,
      "cha": 1
    },
    "savingThrows": {
      "str": 7,
      "con": 5,
      "wis": 0
    },
    "damageImmunities": [
      "Fire",
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 10",
    "languages": "Understands Common plus two other languages but can’t speak",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Fire Absorption",
        "description": "Whenever the golem is subjected to Fire damage, it regains a number of Hit Points equal to the Fire damage dealt."
      },
      {
        "name": "Immutable Form",
        "description": "The golem can’t shape-shift."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The golem makes two attacks, using Bladed Arm or Fiery Bolt in any combination."
      },
      {
        "id": "act_bladed_arm",
        "name": "Bladed Arm",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +12 , reach 10 ft. Hit: 20 (3d8 + 7) Slashing damage plus 10 (3d6) Fire damage.",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "3d8+7",
        "damageType": "Slashing"
      },
      {
        "id": "act_fiery_bolt",
        "name": "Fiery Bolt",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +10 , range 120 ft. Hit: 36 (8d8) Fire damage.",
        "attackBonus": 10,
        "rangeFeet": 120,
        "damage": "8d8",
        "damageType": "Fire"
      },
      {
        "id": "act_poison_breath_recharge_6_",
        "name": "Poison Breath (Recharge 6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 55 (10d10) Poison damage. Success: Half damage.",
        "damage": "10d10",
        "damageType": "Poison",
        "saveDc": 18,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_jackal_2024",
    "name": "Jackal",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 3,
      "formula": "1d6"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 8,
      "dex": 15,
      "con": 11,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 1
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "senses": "Darkvision 90 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +1 , reach 5 ft. Hit: 1 (1d4 – 1) Piercing damage.",
        "attackBonus": 1,
        "reachFeet": 5,
        "damage": "1d4–1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_killer_whale_2024",
    "name": "Killer Whale",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 90,
      "formula": "12d12 + 12"
    },
    "speed": "5 ft., Swim 60 ft.",
    "stats": {
      "str": 19,
      "dex": 14,
      "con": 13,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Blindsight 120 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The whale can hold its breath for 30 minutes."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 21 (5d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "5d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_knight_2024",
    "name": "Knight",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 18,
    "hitPoints": {
      "average": 52,
      "formula": "8d8 + 16"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 11,
      "con": 14,
      "int": 11,
      "wis": 11,
      "cha": 15
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 4,
      "int": 0,
      "wis": 2,
      "cha": 2
    },
    "conditionImmunities": [
      "Frightened"
    ],
    "senses": "Passive Perception 10",
    "languages": "Common plus one other language",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination."
      },
      {
        "id": "act_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage plus 4 (1d8) Radiant damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_heavy_crossbow",
        "name": "Heavy Crossbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +2 , range 100/400 ft. Hit: 11 (2d10) Piercing damage plus 4 (1d8) Radiant damage.",
        "attackBonus": 2,
        "rangeFeet": 100,
        "rangeLongFeet": 400,
        "damage": "2d10",
        "damageType": "Piercing"
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "Trigger: The knight is hit by a melee attack roll while holding a weapon. Response: The knight adds 2 to its AC against that attack, possibly causing it to miss."
      }
    ]
  },
  {
    "id": "ddb_kobold_warrior_2024",
    "name": "Kobold Warrior",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Dragon",
    "alignment": "Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 7,
      "formula": "3d6 − 3"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 7,
      "dex": 15,
      "con": 9,
      "int": 8,
      "wis": 7,
      "cha": 8
    },
    "savingThrows": {
      "dex": 2
    },
    "senses": "Darkvision 60 ft.; Passive Perception 8",
    "languages": "Common, Draconic",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The kobold has Advantage on an attack roll against a creature if at least one of the kobold’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the kobold has Disadvantage on ability checks and attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_dagger",
        "name": "Dagger",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +4 , reach 5 ft. or range 20/60 ft. Hit: 4 (1d4 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d4+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_kraken_2024",
    "name": "Kraken",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Monstrosity",
    "subtype": "Titan",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 481,
      "formula": "26d20 + 208"
    },
    "speed": "30 ft., Swim 120 ft.",
    "stats": {
      "str": 30,
      "dex": 11,
      "con": 26,
      "int": 22,
      "wis": 18,
      "cha": 20
    },
    "savingThrows": {
      "str": 17,
      "dex": 7,
      "con": 15,
      "int": 6,
      "wis": 11,
      "cha": 5
    },
    "skills": {
      "history": 13,
      "perception": 11
    },
    "damageImmunities": [
      "Cold",
      "Lightning"
    ],
    "conditionImmunities": [
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Restrained"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 21",
    "languages": "Telepathy 120 ft. Understands Abyssal, Celestial, Infernal, and Primordial but can’t speak",
    "challengeRating": "23",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The kraken can breathe air and water."
      },
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the kraken fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Siege Monster",
        "description": "The kraken deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow."
      },
      {
        "id": "act_tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +17 , reach 30 ft. Hit: 24 (4d6 + 10) Bludgeoning damage. The target has the Grappled condition (escape DC 20) from one of ten tentacles, and it has the Restrained condition until the grapple ends.",
        "attackBonus": 17,
        "reachFeet": 30,
        "damage": "4d6+10",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_fling",
        "name": "Fling",
        "type": "ability",
        "description": "The kraken throws a Large or smaller creature Grappled by it to a space it can see within 60 feet of itself that isn’t in the air. Dexterity Saving Throw: DC 25, the creature thrown and each creature in the destination space. Failure: 18 (4d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.",
        "damage": "4d8",
        "damageType": "Bludgeoning",
        "saveDc": 25,
        "saveStat": "dex"
      },
      {
        "id": "act_lightning_strike",
        "name": "Lightning Strike",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 23, one creature the kraken can see within 120 feet. Failure: 33 (6d10) Lightning damage. Success: Half damage.",
        "damage": "6d10",
        "damageType": "Lightning",
        "saveDc": 23,
        "saveStat": "dex"
      },
      {
        "id": "act_swallow",
        "name": "Swallow",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 25, one creature Grappled by the kraken (it can have up to four creatures swallowed at a time). Failure: 23 (3d8 + 10) Piercing damage. If the target is Large or smaller, it is swallowed and no longer Grappled. A swallowed creature has the Restrained condition, has Total Cover against attacks and other effects outside the kraken, and takes 24 (7d6) Acid damage at the start of each of its turns.",
        "damage": "3d8+10",
        "damageType": "Piercing",
        "saveDc": 25,
        "saveStat": "dex"
      }
    ],
    "legendaryActions": [
      {
        "name": "Storm Bolt",
        "description": "The kraken uses Lightning Strike."
      },
      {
        "name": "Toxic Ink",
        "description": "Constitution Saving Throw: DC 23, each creature in a 15-foot Emanation originating from the kraken while it is underwater. Failure: The target has the Blinded and Poisoned conditions until the end of the kraken’s next turn. The kraken then moves up to its Speed. Failure or Success: The kraken can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_kuo_toa_2024",
    "name": "Kuo-toa",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 18,
      "formula": "4d8"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 13,
      "dex": 10,
      "con": 11,
      "int": 11,
      "wis": 10,
      "cha": 8
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 0,
      "int": 0,
      "wis": 0
    },
    "skills": {
      "perception": 4
    },
    "senses": "Darkvision 120 ft., Truesight 30 ft.; Passive Perception 14",
    "languages": "Undercommon",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The kuo-toa can breathe air and water."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +3 , reach 5 ft. or range 20/60 ft. Hit: 5 (1d8 + 1) Piercing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d8+1",
        "damageType": "Piercing"
      },
      {
        "id": "act_sticky_net_1_day_",
        "name": "Sticky Net (1/Day)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 10, one Large or smaller creature the kuo-toa can see within 15 feet. Failure: The target has the Restrained condition until the net is destroyed (AC 10; HP 5; Immunity to Bludgeoning, Poison, and Psychic damage). A creature can take an action to make a DC 10 Strength ( Athletics ) check to free itself or another creature in a net within 5 feet, destroying the net on a success.",
        "saveDc": 10,
        "saveStat": "dex"
      }
    ],
    "reactions": [
      {
        "name": "Sticky Shield",
        "description": "Trigger: A creature misses the kuo-toa with a melee attack roll using a weapon. Response—Strength Saving Throw: DC 11, the triggering creature. Failure: The attack’s weapon sticks to the kuo-toa’s shield. If the target doesn’t let go of the weapon, the target has the Grappled condition while the weapon is stuck (escape DC 11). While stuck, the weapon can’t be used. The target can take an action to make a DC 11 Strength ( Athletics ) check, freeing the weapon on a success."
      }
    ]
  },
  {
    "id": "ddb_kuo_toa_archpriest_2024",
    "name": "Kuo-toa Archpriest",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 105,
      "formula": "14d8 + 42"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 16,
      "dex": 14,
      "con": 16,
      "int": 13,
      "wis": 16,
      "cha": 14
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 3,
      "int": 1,
      "wis": 3,
      "cha": 2
    },
    "skills": {
      "perception": 9,
      "religion": 4
    },
    "senses": "Darkvision 120 ft., Truesight 30 ft.; Passive Perception 19",
    "languages": "Undercommon",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The kuo-toa can breathe air and water."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The kuo-toa makes three Strange Scepter attacks."
      },
      {
        "id": "act_strange_scepter",
        "name": "Strange Scepter",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +6 , reach 5 ft. or range 120 ft. Hit: 20 (5d6 + 3) Lightning damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "rangeFeet": 120,
        "damage": "5d6+3",
        "damageType": "Lightning"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The kuo-toa casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 14):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Thaumaturgy 1/Day Each: Destructive Wave , Divination , Hold Monster (level 6 version), Scrying , Tongues"
      }
    ],
    "bonusActions": [
      {
        "name": "Shield of Faith (2/Day)",
        "description": "The kuo-toa casts Shield of Faith , using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_lacedon_ghoul_2024",
    "name": "Lacedon Ghoul",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 13,
      "dex": 15,
      "con": 10,
      "int": 7,
      "wis": 10,
      "cha": 6
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 0,
      "wis": 0
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ghoul makes two Icy Bite attacks."
      },
      {
        "id": "act_icy_bite",
        "name": "Icy Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 9 (2d6 + 2) Cold damage, and the target’s Speed decreases by 5 feet until the start of the ghoul’s next turn.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "Cold"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Slashing damage. If the target is a creature that isn’t an Undead or elf, it is subjected to the following effect. Constitution Saving Throw: DC 10. Failure: The target has the Paralyzed condition until the end of its next turn.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Slashing",
        "saveDc": 10,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Watery Rush",
        "description": "While underwater, the ghoul moves up to half its Swim Speed without provoking Opportunity Attacks ."
      }
    ]
  },
  {
    "id": "ddb_lamia_2024",
    "name": "Lamia",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 97,
      "formula": "13d10 + 26"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 16,
      "dex": 13,
      "con": 15,
      "int": 14,
      "wis": 15,
      "cha": 16
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 2,
      "int": 2,
      "wis": 2,
      "cha": 3
    },
    "skills": {
      "deception": 7,
      "insight": 4,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "Abyssal, Common",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The lamia makes two Claw attacks. It can replace one attack with a use of Corrupting Touch."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Slashing damage plus 7 (2d6) Psychic damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_corrupting_touch",
        "name": "Corrupting Touch",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 13, one creature the lamia can see within 5 feet. Failure: 13 (3d8) Psychic damage, and the target is cursed for 1 hour. Until the curse ends, the target has the Charmed and Poisoned conditions.",
        "damage": "3d8",
        "damageType": "Psychic",
        "saveDc": 13,
        "saveStat": "wis"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The lamia casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Disguise Self (can appear as a Large or Medium biped), Minor Illusion 1/Day Each: Geas , Major Image , Scrying"
      }
    ],
    "bonusActions": [
      {
        "name": "Leap",
        "description": "The lamia jumps up to 30 feet by spending 10 feet of movement."
      }
    ]
  },
  {
    "id": "ddb_lemure_2024",
    "name": "Lemure",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 9,
    "hitPoints": {
      "average": 9,
      "formula": "2d8"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 10,
      "dex": 5,
      "con": 11,
      "int": 1,
      "wis": 11,
      "cha": 3
    },
    "savingThrows": {
      "str": 0,
      "con": 0,
      "wis": 0
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft. (unimpeded by magical Darkness); Passive Perception 10",
    "languages": "Understands Infernal but can’t speak",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hellish Restoration",
        "description": "If the lemure dies in the Nine Hells, it revives with all its Hit Points in 1d10 days unless it is killed by a creature under the effects of a Bless spell or its remains are sprinkled with Holy Water ."
      }
    ],
    "actions": [
      {
        "id": "act_vile_slime",
        "name": "Vile Slime",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 2 (1d4) Poison damage.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "Poison"
      }
    ]
  },
  {
    "id": "ddb_lich_2024",
    "name": "Lich",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "subtype": "Wizard",
    "alignment": "Neutral Evil",
    "armorClass": 20,
    "hitPoints": {
      "average": 315,
      "formula": "42d8 + 126"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 16,
      "con": 16,
      "int": 21,
      "wis": 14,
      "cha": 16
    },
    "savingThrows": {
      "str": 0,
      "dex": 10,
      "con": 10,
      "int": 12,
      "wis": 9,
      "cha": 3
    },
    "skills": {
      "arcana": 19,
      "history": 12,
      "insight": 9,
      "perception": 9
    },
    "damageResistances": [
      "Cold",
      "Lightning"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 19",
    "languages": "All",
    "challengeRating": "21",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (4/Day, or 5/Day in Lair)",
        "description": "If the lich fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Spirit Jar",
        "description": "If destroyed, the lich reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the lich’s lair."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The lich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination."
      },
      {
        "id": "act_eldritch_burst",
        "name": "Eldritch Burst",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +12 , reach 5 ft. or range 120 ft. Hit: 31 (4d12 + 5) Force damage.",
        "attackBonus": 12,
        "reachFeet": 5,
        "rangeFeet": 120,
        "damage": "4d12+5",
        "damageType": "Force"
      },
      {
        "id": "act_paralyzing_touch",
        "name": "Paralyzing Touch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +12 , reach 5 ft. Hit: 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition until the start of the lich’s next turn.",
        "attackBonus": 12,
        "reachFeet": 5,
        "damage": "3d6+5",
        "damageType": "Cold"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The lich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Detect Thoughts , Dispel Magic , Fireball (level 5 version), Invisibility , Lightning Bolt (level 5 version), Mage Hand , Prestidigitation 2/Day Each: Animate Dead , Dimension Door , Plane Shift 1/Day Each: Chain Lightning , Finger of Death , Power Word Kill , Scrying"
      }
    ],
    "reactions": [
      {
        "name": "Protective Magic",
        "description": "The lich casts Counterspell or Shield in response to the spell’s trigger, using the same spellcasting ability as Spellcasting."
      }
    ],
    "legendaryActions": [
      {
        "name": "Deathly Teleport",
        "description": "The lich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage."
      },
      {
        "name": "Disrupt Life",
        "description": "Constitution Saving Throw: DC 20, each creature that isn’t an Undead in a 20-foot Emanation originating from the lich. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: The lich can’t take this action again until the start of its next turn."
      },
      {
        "name": "Frightening Gaze",
        "description": "The lich casts Fear , using the same spellcasting ability as Spellcasting. The lich can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_lion_2024",
    "name": "Lion",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "4d10"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 11,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 0,
      "wis": 1
    },
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The lion has Advantage on an attack roll against a creature if at least one of the lion’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      },
      {
        "name": "Running Leap",
        "description": "With a 10-foot running start, the lion can Long Jump up to 25 feet."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The lion makes two Rend attacks. It can replace one attack with a use of Roar."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_roar",
        "name": "Roar",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 11, one creature within 15 feet. Failure: The target has the Frightened condition until the start of the lion’s next turn.",
        "saveDc": 11,
        "saveStat": "wis"
      }
    ]
  },
  {
    "id": "ddb_lizard_2024",
    "name": "Lizard",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 2,
      "formula": "1d4"
    },
    "speed": "20 ft., Climb 20 ft.",
    "stats": {
      "str": 2,
      "dex": 11,
      "con": 10,
      "int": 1,
      "wis": 8,
      "cha": 3
    },
    "savingThrows": {
      "dex": 0,
      "con": 0
    },
    "senses": "Darkvision 30 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The lizard can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 1 Piercing damage.",
        "attackBonus": 2,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_lizardfolk_sovereign_2024",
    "name": "Lizardfolk Sovereign",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 78,
      "formula": "12d8 + 24"
    },
    "speed": "30 ft., Burrow 20 ft., Swim 30 ft.",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 15,
      "int": 11,
      "wis": 11,
      "cha": 15
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 4,
      "int": 0,
      "wis": 2,
      "cha": 2
    },
    "skills": {
      "perception": 4,
      "stealth": 5
    },
    "conditionImmunities": [
      "Frightened"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic, Primordial (Terran)",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The lizardfolk makes one Bite attack and one Earthen Maul attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (1d10 + 3) Piercing damage. If the target is a creature that isn’t a Construct or an Undead, the lizardfolk gains Temporary Hit Points equal to the damage dealt.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_earthen_maul",
        "name": "Earthen Maul",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Bludgeoning"
      }
    ],
    "bonusActions": [
      {
        "name": "Charge",
        "description": "The lizardfolk moves up to its Speed or Swim Speed straight toward an enemy it can see."
      }
    ]
  },
  {
    "id": "ddb_mage_2024",
    "name": "Mage",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Wizard",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 81,
      "formula": "18d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 9,
      "dex": 14,
      "con": 11,
      "int": 17,
      "wis": 12,
      "cha": 11
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "int": 6,
      "wis": 4,
      "cha": 0
    },
    "skills": {
      "arcana": 6,
      "history": 6,
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "Common and any three languages",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The mage makes three Arcane Burst attacks."
      },
      {
        "id": "act_arcane_burst",
        "name": "Arcane Burst",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +6 , reach 5 ft. or range 120 ft. Hit: 16 (3d8 + 3) Force damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "rangeFeet": 120,
        "damage": "3d8+3",
        "damageType": "Force"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Light , Mage Armor (included in AC), Mage Hand , Prestidigitation 2/Day Each: Fireball (level 4 version), Invisibility 1/Day Each: Cone of Cold , Fly"
      }
    ],
    "bonusActions": [
      {
        "name": "Misty Step (3/Day)",
        "description": "The mage casts Misty Step , using the same spellcasting ability as Spellcasting."
      }
    ],
    "reactions": [
      {
        "name": "Protective Magic (3/Day)",
        "description": "The mage casts Counterspell or Shield in response to the spell’s trigger, using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_mage_apprentice_2024",
    "name": "Mage Apprentice",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Wizard",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 49,
      "formula": "9d8 + 9"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 8,
      "dex": 14,
      "con": 12,
      "int": 16,
      "wis": 13,
      "cha": 10
    },
    "savingThrows": {
      "dex": 2,
      "con": 1,
      "int": 5,
      "wis": 3,
      "cha": 0
    },
    "skills": {
      "arcana": 5,
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "Common plus one other language",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_arcane_burst",
        "name": "Arcane Burst",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +5 , reach 5 ft. or range 120 ft. Hit: 14 (2d10 + 3) Force damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "rangeFeet": 120,
        "damage": "2d10+3",
        "damageType": "Force"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 13, +5 to hit with spell attacks):",
        "attackBonus": 5
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Mage Hand , Prestidigitation 1/Day Each: Disguise Self , Ice Knife , Mage Armor (included in AC), Thunderwave"
      }
    ]
  },
  {
    "id": "ddb_magma_mephit_2024",
    "name": "Magma Mephit",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 18,
      "formula": "4d6 + 4"
    },
    "speed": "30 ft., Fly 30 ft.",
    "stats": {
      "str": 8,
      "dex": 12,
      "con": 12,
      "int": 7,
      "wis": 10,
      "cha": 10
    },
    "savingThrows": {
      "dex": 1,
      "con": 1,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "stealth": 3
    },
    "damageVulnerabilities": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Primordial (Ignan, Terran)",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "The mephit explodes when it dies. Dexterity Saving Throw: DC 11, each creature in a 5-foot Emanation originating from the mephit. Failure: 7 (2d6) Fire damage. Success: Half damage."
      }
    ],
    "actions": [
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 3 (1d4 + 1) Slashing damage plus 3 (1d6) Fire damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_6_",
        "name": "Fire Breath (Recharge 6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 11, each creature in a 15-foot Cone. Failure: 7 (2d6) Fire damage. Success: Half damage.",
        "damage": "2d6",
        "damageType": "Fire",
        "saveDc": 11,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_magmin_2024",
    "name": "Magmin",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Elemental",
    "alignment": "Chaotic Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 13,
      "formula": "3d6 + 3"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 7,
      "dex": 15,
      "con": 12,
      "int": 8,
      "wis": 11,
      "cha": 10
    },
    "savingThrows": {
      "dex": 2,
      "con": 1,
      "wis": 0,
      "cha": 0
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Primordial (Ignan)",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "The magmin explodes when it dies. Dexterity Saving Throw: DC 11, each creature in a 10-foot Emanation originating from the magmin. Failure: 7 (2d6) Fire damage. Success: Half damage."
      }
    ],
    "actions": [
      {
        "id": "act_touch",
        "name": "Touch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (2d4 + 2) Fire damage. If the target is a creature or a flammable object that isn’t being worn or carried, it starts burning.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "Fire"
      }
    ],
    "bonusActions": [
      {
        "name": "Ignited Illumination",
        "description": "The magmin sets itself ablaze or extinguishes its flames. While ablaze, the magmin sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet."
      }
    ]
  },
  {
    "id": "ddb_mammoth_2024",
    "name": "Mammoth",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 126,
      "formula": "11d12 + 55"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 24,
      "dex": 9,
      "con": 21,
      "int": 3,
      "wis": 11,
      "cha": 6
    },
    "savingThrows": {
      "str": 10,
      "con": 8,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The mammoth makes two Gore attacks."
      },
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 18 (2d10 + 7) Piercing damage. If the target is a Huge or smaller creature and the mammoth moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d10+7",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Trample",
        "description": "Dexterity Saving Throw: DC 18, one creature within 5 feet that has the Prone condition. Failure: 29 (4d10 + 7) Bludgeoning damage. Success: Half damage."
      }
    ]
  },
  {
    "id": "ddb_manticore_2024",
    "name": "Manticore",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 68,
      "formula": "8d10 + 24"
    },
    "speed": "30 ft., Fly 50 ft.",
    "stats": {
      "str": 17,
      "dex": 16,
      "con": 17,
      "int": 7,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 3,
      "con": 3,
      "wis": 1
    },
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "Common",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The manticore makes three attacks, using Rend or Tail Spike in any combination."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_tail_spike",
        "name": "Tail Spike",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 100/200 ft. Hit: 7 (1d8 + 3) Piercing damage.",
        "attackBonus": 5,
        "rangeFeet": 100,
        "rangeLongFeet": 200,
        "damage": "1d8+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_marilith_2024",
    "name": "Marilith",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 220,
      "formula": "21d10 + 105"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 18,
      "dex": 20,
      "con": 20,
      "int": 18,
      "wis": 16,
      "cha": 20
    },
    "savingThrows": {
      "str": 9,
      "dex": 5,
      "con": 10,
      "int": 4,
      "wis": 8,
      "cha": 10
    },
    "skills": {
      "perception": 8
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 18",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Demonic Restoration",
        "description": "If the marilith dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss."
      },
      {
        "name": "Magic Resistance",
        "description": "The marilith has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Reactive",
        "description": "The marilith can take one Reaction on every turn of combat."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The marilith makes six Pact Blade attacks and uses Constrict."
      },
      {
        "id": "act_pact_blade",
        "name": "Pact Blade",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 5 ft. Hit: 10 (1d10 + 5) Slashing damage plus 7 (2d6) Necrotic damage.",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "1d10+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_constrict",
        "name": "Constrict",
        "type": "ability",
        "description": "Strength Saving Throw: DC 17, one Medium or smaller creature the marilith can see within 5 feet. Failure: 15 (2d10 + 4) Bludgeoning damage. The target has the Grappled condition (escape DC 14), and it has the Restrained condition until the grapple ends.",
        "damage": "2d10+4",
        "damageType": "Bludgeoning",
        "saveDc": 17,
        "saveStat": "str"
      }
    ],
    "bonusActions": [
      {
        "name": "Teleport (Recharge 5–6)",
        "description": "The marilith teleports up to 120 feet to an unoccupied space it can see."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "Trigger: The marilith is hit by a melee attack roll while holding a weapon. Response: The marilith adds 5 to its AC against that attack, possibly causing it to miss."
      }
    ]
  },
  {
    "id": "ddb_mastiff_2024",
    "name": "Mastiff",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 5,
      "formula": "1d8 + 1"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 13,
      "dex": 14,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 4 (1d6 + 1) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_medusa_2024",
    "name": "Medusa",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Lawful Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 127,
      "formula": "17d8 + 51"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 17,
      "con": 16,
      "int": 12,
      "wis": 13,
      "cha": 15
    },
    "savingThrows": {
      "str": 0,
      "dex": 3,
      "con": 3,
      "int": 1,
      "wis": 4,
      "cha": 2
    },
    "skills": {
      "deception": 5,
      "perception": 4,
      "stealth": 6
    },
    "senses": "Darkvision 150 ft.; Passive Perception 14",
    "languages": "Common plus one other language",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The medusa makes two Claw attacks and one Snake Hair attack, or it makes three Poison Ray attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_snake_hair",
        "name": "Snake Hair",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage plus 14 (4d6) Poison damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_poison_ray",
        "name": "Poison Ray",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 150 ft. Hit: 11 (2d8 + 2) Poison damage.",
        "attackBonus": 5,
        "rangeFeet": 150,
        "damage": "2d8+2",
        "damageType": "Poison"
      }
    ],
    "bonusActions": [
      {
        "name": "Petrifying Gaze (Recharge 5–6)",
        "description": "Constitution Saving Throw: DC 13, each creature in a 30-foot Cone. If the medusa sees its reflection in the Cone, the medusa must make this save. First Failure: The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. Second Failure: The target has the Petrified condition instead of the Restrained condition."
      }
    ]
  },
  {
    "id": "ddb_merfolk_skirmisher_2024",
    "name": "Merfolk Skirmisher",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 11,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "10 ft., Swim 40 ft.",
    "stats": {
      "str": 10,
      "dex": 13,
      "con": 12,
      "int": 11,
      "wis": 14,
      "cha": 12
    },
    "savingThrows": {
      "str": 0,
      "dex": 1,
      "con": 1,
      "int": 0,
      "wis": 2,
      "cha": 1
    },
    "senses": "Passive Perception 12",
    "languages": "Common, Primordial (Aquan)",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The merfolk can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_ocean_spear",
        "name": "Ocean Spear",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +2 , reach 5 ft. or range 20/60 ft. Hit: 3 (1d6) Piercing damage plus 2 (1d4) Cold damage. If the target is a creature, its Speed decreases by 10 feet until the end of its next turn. Hit or Miss: The spear magically returns to the merfolk’s hand immediately after a ranged attack.",
        "attackBonus": 2,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_merrow_2024",
    "name": "Merrow",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "10 ft., Swim 40 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 15,
      "int": 8,
      "wis": 10,
      "cha": 9
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 2,
      "wis": 0
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Abyssal, Primordial (Aquan)",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The merrow can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The merrow makes two attacks, using Bite, Claw, or Harpoon in any combination."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 6 (1d4 + 4) Piercing damage, and the target has the Poisoned condition until the end of the merrow’s next turn.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d4+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 9 (2d4 + 4) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d4+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_harpoon",
        "name": "Harpoon",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +6 , reach 5 ft. or range 20/60 ft. Hit: 11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature, the merrow pulls the target up to 15 feet straight toward itself.",
        "attackBonus": 6,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "2d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_mimic_2024",
    "name": "Mimic",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 58,
      "formula": "9d8 + 18"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 15,
      "int": 5,
      "wis": 13,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "stealth": 5
    },
    "damageImmunities": [
      "Acid"
    ],
    "conditionImmunities": [
      "Prone"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Adhesive (Object Form Only)",
        "description": "The mimic adheres to anything that touches it. A Huge or smaller creature adhered to the mimic has the Grappled condition (escape DC 13). Ability checks made to escape this grapple have Disadvantage ."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 (with Advantage if the target is Grappled by the mimic), reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage—or 12 (2d8 + 3) Piercing damage if the target is Grappled by the mimic—plus 4 (1d8) Acid damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Bludgeoning damage plus 4 (1d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). Ability checks made to escape this grapple have Disadvantage .",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Bludgeoning"
      }
    ],
    "bonusActions": [
      {
        "name": "Shape-Shift",
        "description": "The mimic shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true blob form. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_minotaur_of_baphomet_2024",
    "name": "Minotaur of Baphomet",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 85,
      "formula": "10d10 + 30"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 11,
      "con": 16,
      "int": 6,
      "wis": 16,
      "cha": 9
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 3,
      "wis": 3
    },
    "skills": {
      "perception": 7,
      "survival": 7
    },
    "senses": "Darkvision 60 ft.; Passive Perception 17",
    "languages": "Abyssal",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_abyssal_glaive",
        "name": "Abyssal Glaive",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 10 (1d12 + 4) Slashing damage plus 10 (3d6) Necrotic damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d12+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_gore_recharge_5_6_",
        "name": "Gore (Recharge 5–6)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 18 (4d6 + 4) Piercing damage. If the target is a Large or smaller creature and the minotaur moved 10+ feet straight toward it immediately before the hit, the target takes an extra 10 (3d6) Piercing damage and has the Prone condition.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "4d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_minotaur_skeleton_2024",
    "name": "Minotaur Skeleton",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 11,
      "con": 15,
      "int": 6,
      "wis": 8,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 2
    },
    "damageVulnerabilities": [
      "Bludgeoning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "Understands Abyssal but can’t speak",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature and the skeleton moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 15 (2d10 + 4) Bludgeoning damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d10+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_mule_2024",
    "name": "Mule",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 14,
      "dex": 10,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 1,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Beast of Burden",
        "description": "The mule counts as one size larger for the purpose of determining its carrying capacity."
      }
    ],
    "actions": [
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Bludgeoning damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_mummy_2024",
    "name": "Mummy",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 58,
      "formula": "9d8 + 18"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 16,
      "dex": 8,
      "con": 15,
      "int": 6,
      "wis": 12,
      "cha": 12
    },
    "savingThrows": {
      "str": 3,
      "con": 2,
      "wis": 3,
      "cha": 1
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "Common plus two other languages",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The mummy makes two Rotting Fist attacks and uses Dreadful Glare."
      },
      {
        "id": "act_rotting_fist",
        "name": "Rotting Fist",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can’t regain Hit Points, its Hit Point maximum doesn’t return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_dreadful_glare",
        "name": "Dreadful Glare",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 11, one creature the mummy can see within 60 feet. Failure: The target has the Frightened condition until the end of the mummy’s next turn. Success: The target is immune to this mummy’s Dreadful Glare for 24 hours.",
        "saveDc": 11,
        "saveStat": "wis"
      }
    ]
  },
  {
    "id": "ddb_mummy_lord_2024",
    "name": "Mummy Lord",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "subtype": "Cleric",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 187,
      "formula": "25d8 + 75"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 10,
      "con": 17,
      "int": 11,
      "wis": 19,
      "cha": 16
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 3,
      "int": 5,
      "wis": 9,
      "cha": 3
    },
    "skills": {
      "history": 5,
      "perception": 9,
      "religion": 5
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Truesight 60 ft.; Passive Perception 19",
    "languages": "Common plus three other languages",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the mummy fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "description": "The mummy has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Undead Restoration",
        "description": "If destroyed, the mummy gains a new body in 24 hours if its heart is intact, reviving with all its Hit Points. The new body appears in an unoccupied space within the mummy’s lair. The heart is a Tiny object that has AC 17, HP 10, and Immunity to all damage except Fire."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The mummy makes one Rotting Fist or Channel Negative Energy attack, and it uses Dreadful Glare."
      },
      {
        "id": "act_rotting_fist",
        "name": "Rotting Fist",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 15 (2d10 + 4) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can’t regain Hit Points, it gains no benefit from finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d10+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_channel_negative_energy",
        "name": "Channel Negative Energy",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +9 , range 60 ft. Hit: 25 (6d6 + 4) Necrotic damage.",
        "attackBonus": 9,
        "rangeFeet": 60,
        "damage": "6d6+4",
        "damageType": "Necrotic"
      },
      {
        "id": "act_dreadful_glare",
        "name": "Dreadful Glare",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 17, one creature the mummy can see within 60 feet. Failure: 25 (6d6 + 4) Psychic damage, and the target has the Paralyzed condition until the end of the mummy’s next turn.",
        "damage": "6d6+4",
        "damageType": "Psychic",
        "saveDc": 17,
        "saveStat": "wis"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The mummy casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 17, +9 to hit with spell attacks):",
        "attackBonus": 9
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Dispel Magic , Thaumaturgy 1/Day Each: Animate Dead , Harm , Insect Plague (level 7 version)"
      }
    ],
    "reactions": [
      {
        "name": "Whirlwind of Sand",
        "description": "Trigger: The mummy is hit by an attack roll. Response: The mummy adds 2 to its AC against the attack, possibly causing the attack to miss, and the mummy teleports up to 60 feet to an unoccupied space it can see. Each creature of its choice that it can see within 5 feet of its destination space has the Blinded condition until the end of the mummy’s next turn."
      }
    ],
    "legendaryActions": [
      {
        "name": "Dread Command",
        "description": "The mummy casts Command (level 2 version), using the same spellcasting ability as Spellcasting. The mummy can’t take this action again until the start of its next turn."
      },
      {
        "name": "Glare",
        "description": "The mummy uses Dreadful Glare. The mummy can’t take this action again until the start of its next turn."
      },
      {
        "name": "Necrotic Strike",
        "description": "The mummy makes one Rotting Fist or Channel Negative Energy attack."
      }
    ]
  },
  {
    "id": "ddb_nalfeshnee_2024",
    "name": "Nalfeshnee",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 184,
      "formula": "16d10 + 96"
    },
    "speed": "20 ft., Fly 30 ft.",
    "stats": {
      "str": 21,
      "dex": 10,
      "con": 22,
      "int": 19,
      "wis": 12,
      "cha": 15
    },
    "savingThrows": {
      "str": 5,
      "dex": 0,
      "con": 11,
      "int": 9,
      "wis": 6,
      "cha": 7
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Frightened",
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 11",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Demonic Restoration",
        "description": "If the nalfeshnee dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss."
      },
      {
        "name": "Magic Resistance",
        "description": "The nalfeshnee has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The nalfeshnee makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 16 (2d10 + 5) Slashing damage plus 11 (2d10) Force damage.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d10+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_teleport",
        "name": "Teleport",
        "type": "ability",
        "description": "The nalfeshnee teleports up to 120 feet to an unoccupied space it can see."
      }
    ],
    "bonusActions": [
      {
        "name": "Horror Nimbus (Recharge 5–6)",
        "description": "Wisdom Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the nalfeshnee. Failure: 28 (8d6) Psychic damage, and the target has the Frightened condition for 1 minute, until it takes damage, or until it ends its turn with the nalfeshnee out of line of sight. Success: The target is immune to this nalfeshnee’s Horror Nimbus for 24 hours."
      }
    ],
    "reactions": [
      {
        "name": "Pursuit",
        "description": "Trigger: Another creature the nalfeshnee can see ends its move within 120 feet of the nalfeshnee. Response: The nalfeshnee uses Teleport, but its destination space must be within 10 feet of the triggering creature."
      }
    ]
  },
  {
    "id": "ddb_night_hag_2024",
    "name": "Night Hag",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 112,
      "formula": "15d8 + 45"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 16,
      "wis": 14,
      "cha": 16
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "int": 3,
      "wis": 2,
      "cha": 3
    },
    "skills": {
      "deception": 6,
      "insight": 5,
      "perception": 5,
      "stealth": 5
    },
    "damageResistances": [
      "Cold",
      "Fire"
    ],
    "conditionImmunities": [
      "Charmed"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 15",
    "languages": "Abyssal, Common, Infernal, Primordial",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Coven Magic",
        "description": "While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell’s normal casting time, and using Intelligence as the spellcasting ability (spell save DC 14): Augury , Find Familiar , Identify , Locate Object , Scrying , or Unseen Servant . The hag must finish a Long Rest before using this trait to cast that spell again."
      },
      {
        "name": "Magic Resistance",
        "description": "The hag has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Soul Bag",
        "description": "The hag has a soul bag. While holding or carrying the bag, the hag can use its Nightmare Haunting action."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hag makes two Claw attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 13 (2d8 + 4) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_nightmare_haunting_1_day_requires_soul_bag_",
        "name": "Nightmare Haunting (1/Day; Requires Soul Bag)",
        "type": "spell",
        "description": "While on the Ethereal Plane, the hag casts Dream , using the same spellcasting ability as Spellcasting. Only the hag can serve as the spell’s messenger, and the target must be a creature the hag can see on the Material Plane. The spell fails and is wasted if the target is under the effect of the Protection from Evil and Good spell or within a Magic Circle spell."
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The hag casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 14):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Etherealness , Magic Missile (level 4 version) 2/Day Each: Phantasmal Killer , Plane Shift (self only)"
      }
    ],
    "bonusActions": [
      {
        "name": "Shape-Shift",
        "description": "The hag shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_nightmare_2024",
    "name": "Nightmare",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 68,
      "formula": "8d10 + 24"
    },
    "speed": "60 ft., Fly 90 ft. (hover)",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 10,
      "wis": 13,
      "cha": 15
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "int": 0,
      "wis": 1,
      "cha": 2
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Passive Perception 11",
    "languages": "Understands Abyssal, Common, and Infernal but can’t speak",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Confer Fire Resistance",
        "description": "The nightmare can grant Resistance to Fire damage to a rider while it is on the nightmare."
      },
      {
        "name": "Illumination",
        "description": "The nightmare sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 13 (2d8 + 4) Bludgeoning damage plus 10 (3d6) Fire damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_ethereal_stride",
        "name": "Ethereal Stride",
        "type": "ability",
        "description": "The nightmare and up to three willing creatures within 5 feet of it teleport to the Ethereal Plane from the Material Plane or vice versa."
      }
    ]
  },
  {
    "id": "ddb_noble_2024",
    "name": "Noble",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 9,
      "formula": "2d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 12,
      "con": 11,
      "int": 12,
      "wis": 14,
      "cha": 16
    },
    "savingThrows": {
      "str": 0,
      "dex": 1,
      "con": 0,
      "int": 1,
      "wis": 2,
      "cha": 3
    },
    "skills": {
      "deception": 5,
      "insight": 4,
      "persuasion": 5
    },
    "senses": "Passive Perception 12",
    "languages": "Common plus two other languages",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_rapier",
        "name": "Rapier",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 5 (1d8 + 1) Piercing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d8+1",
        "damageType": "Piercing"
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "Trigger: The noble is hit by a melee attack roll while holding a weapon. Response: The noble adds 2 to its AC against that attack, possibly causing it to miss."
      }
    ]
  },
  {
    "id": "ddb_nothic_2024",
    "name": "Nothic",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 45,
      "formula": "6d8 + 18"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 14,
      "dex": 16,
      "con": 16,
      "int": 13,
      "wis": 10,
      "cha": 8
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 3,
      "int": 1,
      "wis": 0
    },
    "skills": {
      "arcana": 3,
      "insight": 4,
      "perception": 4,
      "stealth": 5
    },
    "senses": "Truesight 120 ft.; Passive Perception 14",
    "languages": "Undercommon",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The nothic makes two Claw attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (1d10 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_rotting_gaze",
        "name": "Rotting Gaze",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 13, one creature the nothic can see within 120 feet. Failure: 17 (5d6) Necrotic damage. Success: Half damage.",
        "damage": "5d6",
        "damageType": "Necrotic",
        "saveDc": 13,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Weird Insight (Recharge 6)",
        "description": "Wisdom Saving Throw: DC 14, one creature the nothic can see within 120 feet. Failure: The nothic magically learns one fact or secret about the target."
      }
    ]
  },
  {
    "id": "ddb_ochre_jelly_2024",
    "name": "Ochre Jelly",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "armorClass": 8,
    "hitPoints": {
      "average": 52,
      "formula": "7d10 + 14"
    },
    "speed": "20 ft., Climb 20 ft.",
    "stats": {
      "str": 15,
      "dex": 6,
      "con": 14,
      "int": 2,
      "wis": 6,
      "cha": 1
    },
    "savingThrows": {
      "str": 2,
      "con": 2
    },
    "damageResistances": [
      "Acid"
    ],
    "damageImmunities": [
      "Lightning",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Grappled",
      "Prone",
      "Restrained"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The jelly can move through a space as narrow as 1 inch without expending extra movement to do so."
      },
      {
        "name": "Spider Climb",
        "description": "The jelly can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 12 (3d6 + 2) Acid damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "3d6+2",
        "damageType": "Acid"
      }
    ],
    "reactions": [
      {
        "name": "Split",
        "description": "Trigger: While the jelly is Large or Medium and has 10+ Hit Points, it becomes Bloodied or is subjected to Lightning or Slashing damage. Response: The jelly splits into two new Ochre Jellies . Each new jelly is one size smaller than the original jelly and acts on its Initiative. The original jelly’s Hit Points are divided evenly between the new jellies (round down)."
      }
    ]
  },
  {
    "id": "ddb_octopus_2024",
    "name": "Octopus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 3,
      "formula": "1d6"
    },
    "speed": "5 ft., Swim 30 ft.",
    "stats": {
      "str": 4,
      "dex": 15,
      "con": 11,
      "int": 3,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 0
    },
    "skills": {
      "perception": 2,
      "stealth": 6
    },
    "senses": "Darkvision 30 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Compression",
        "description": "The octopus can move through a space as narrow as 1 inch without expending extra movement to do so."
      },
      {
        "name": "Water Breathing",
        "description": "The octopus can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_tentacles",
        "name": "Tentacles",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 1 Bludgeoning damage.",
        "attackBonus": 4,
        "reachFeet": 5
      }
    ],
    "reactions": [
      {
        "name": "Ink Cloud (1/Day)",
        "description": "Trigger: A creature ends its turn within 5 feet of the octopus while underwater. Response: The octopus releases ink that fills a 5-foot Cube centered on itself, and the octopus moves up to its Swim Speed. The Cube is Heavily Obscured for 1 minute or until a strong current or similar effect disperses the ink."
      }
    ]
  },
  {
    "id": "ddb_ogre_2024",
    "name": "Ogre",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 68,
      "formula": "8d10 + 24"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 19,
      "dex": 8,
      "con": 16,
      "int": 5,
      "wis": 7,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "con": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 8",
    "languages": "Common, Giant",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_greatclub",
        "name": "Greatclub",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 13 (2d8 + 4) Bludgeoning damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +6 , reach 5 ft. or range 30/120 ft. Hit: 11 (2d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "2d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_ogre_zombie_2024",
    "name": "Ogre Zombie",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 8,
    "hitPoints": {
      "average": 85,
      "formula": "9d10 + 36"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 19,
      "dex": 6,
      "con": 18,
      "int": 3,
      "wis": 6,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "con": 4,
      "wis": 0
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 8",
    "languages": "Understands Common and Giant but can’t speak",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead."
      }
    ],
    "actions": [
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 13 (2d8 + 4) Bludgeoning damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_oni_2024",
    "name": "Oni",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 119,
      "formula": "14d10 + 42"
    },
    "speed": "30 ft., Fly 30 ft. (hover)",
    "stats": {
      "str": 19,
      "dex": 11,
      "con": 16,
      "int": 14,
      "wis": 12,
      "cha": 15
    },
    "savingThrows": {
      "str": 4,
      "dex": 3,
      "con": 6,
      "int": 2,
      "wis": 4,
      "cha": 5
    },
    "skills": {
      "arcana": 5,
      "deception": 8,
      "perception": 4
    },
    "damageResistances": [
      "Cold"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Common, Giant",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Regeneration",
        "description": "The oni regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The oni makes two Claw or Nightmare Ray attacks. It can replace one attack with a use of Spellcasting."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 10 (1d12 + 4) Slashing damage plus 9 (2d8) Necrotic damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "1d12+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_nightmare_ray",
        "name": "Nightmare Ray",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 60 ft. Hit: 9 (2d6 + 2) Psychic damage, and the target has the Frightened condition until the start of the oni’s next turn.",
        "attackBonus": 5,
        "rangeFeet": 60,
        "damage": "2d6+2",
        "damageType": "Psychic"
      },
      {
        "id": "act_shape_shift",
        "name": "Shape-Shift",
        "type": "ability",
        "description": "The oni shape-shifts into a Small or Medium Humanoid or a Large Giant, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn’t transformed."
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The oni casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):"
      },
      {
        "id": "act_1_day_each_",
        "name": "1/Day Each:",
        "type": "ability",
        "description": "Charm Person (level 2 version), Darkness , Gaseous Form , Sleep"
      }
    ],
    "bonusActions": [
      {
        "name": "Invisibility",
        "description": "The oni casts Invisibility on itself, requiring no spell components and using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_otyugh_2024",
    "name": "Otyugh",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 104,
      "formula": "11d10 + 44"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 11,
      "con": 19,
      "int": 6,
      "wis": 13,
      "cha": 6
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 7,
      "wis": 1
    },
    "senses": "Darkvision 120 ft.; Passive Perception 11",
    "languages": "Otyugh, Telepathy 120 ft. (doesn’t allow the receiving creature to respond telepathically)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The otyugh makes one Bite attack and two Tentacle attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 12 (2d8 + 3) Piercing damage, and the target has the Poisoned condition. Whenever the Poisoned target finishes a Long Rest, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target’s Hit Point maximum decreases by 5 (1d10) and doesn’t return to normal until the Poisoned condition ends on the target. Success: The Poisoned condition ends.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+3",
        "damageType": "Piercing",
        "saveDc": 15,
        "saveStat": "con"
      },
      {
        "id": "act_tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 12 (2d8 + 3) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two tentacles.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_tentacle_slam",
        "name": "Tentacle Slam",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 14, each creature Grappled by the otyugh. Failure: 16 (3d8 + 3) Bludgeoning damage, and the target has the Stunned condition until the start of the otyugh’s next turn. Success: Half damage only.",
        "damage": "3d8+3",
        "damageType": "Bludgeoning",
        "saveDc": 14,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_owl_2024",
    "name": "Owl",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "5 ft., Fly 60 ft.",
    "stats": {
      "str": 3,
      "dex": 13,
      "con": 8,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "dex": 1,
      "wis": 1
    },
    "skills": {
      "perception": 5,
      "stealth": 5
    },
    "senses": "Darkvision 120 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The owl doesn’t provoke Opportunity Attacks when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_talons",
        "name": "Talons",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 1 Slashing damage.",
        "attackBonus": 3,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_owlbear_2024",
    "name": "Owlbear",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 59,
      "formula": "7d10 + 21"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 20,
      "dex": 12,
      "con": 17,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 5,
      "dex": 1,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The owlbear makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 14 (2d8 + 5) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_panther_2024",
    "name": "Panther",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "50 ft., Climb 40 ft.",
    "stats": {
      "str": 14,
      "dex": 16,
      "con": 10,
      "int": 3,
      "wis": 14,
      "cha": 7
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 0,
      "wis": 2
    },
    "skills": {
      "perception": 4,
      "stealth": 7
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Slashing damage",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Nimble Escape",
        "description": "The panther takes the Disengage or Hide action."
      }
    ]
  },
  {
    "id": "ddb_pegasus_2024",
    "name": "Pegasus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Chaotic Good",
    "armorClass": 12,
    "hitPoints": {
      "average": 59,
      "formula": "7d10 + 21"
    },
    "speed": "60 ft., Fly 90 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 10,
      "wis": 15,
      "cha": 13
    },
    "savingThrows": {
      "str": 4,
      "dex": 4,
      "con": 5,
      "int": 0,
      "wis": 4,
      "cha": 3
    },
    "skills": {
      "perception": 6
    },
    "senses": "Passive Perception 16",
    "languages": "Understands Celestial, Common, Elvish, and Sylvan but can’t speak",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 7 (1d6 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_performer_2024",
    "name": "Performer",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 27,
      "formula": "5d8 + 5"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 12,
      "dex": 16,
      "con": 12,
      "int": 13,
      "wis": 14,
      "cha": 16
    },
    "savingThrows": {
      "str": 1,
      "dex": 5,
      "con": 1,
      "int": 1,
      "wis": 2,
      "cha": 5
    },
    "skills": {
      "acrobatics": 5,
      "athletics": 3,
      "performance": 7
    },
    "senses": "Passive Perception 12",
    "languages": "Common plus one other language",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Piercing"
      }
    ],
    "reactions": [
      {
        "name": "Uncanny Dodge",
        "description": "Trigger: The performer is hit by an attack roll. Response: The performer halves the damage (round down) it takes from that attack."
      }
    ]
  },
  {
    "id": "ddb_performer_legend_2024",
    "name": "Performer Legend",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 20,
    "hitPoints": {
      "average": 162,
      "formula": "25d8 + 50"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 12,
      "dex": 20,
      "con": 14,
      "int": 15,
      "wis": 16,
      "cha": 20
    },
    "savingThrows": {
      "str": 1,
      "dex": 9,
      "con": 2,
      "int": 6,
      "wis": 7,
      "cha": 9
    },
    "skills": {
      "acrobatics": 13,
      "athletics": 5,
      "perception": 7,
      "performance": 13,
      "stealth": 9
    },
    "senses": "Passive Perception 17",
    "languages": "Common plus two other languages",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The performer makes three Bejeweled Baton attacks."
      },
      {
        "id": "act_bejeweled_baton",
        "name": "Bejeweled Baton",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 10 (2d4 + 5) Bludgeoning damage plus 10 (3d6) Psychic damage.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d4+5",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_majestic_song",
        "name": "Majestic Song",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 17, each creature in a 20-foot-radius Sphere centered on a point within 120 feet. Failure: 22 (4d8 + 4) Psychic damage, and the target has the Charmed or Frightened condition (performer’s choice) until the end of the performer’s next turn. Success: Half damage only.",
        "damage": "4d8+4",
        "damageType": "Psychic",
        "saveDc": 17,
        "saveStat": "wis"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The performer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Mage Hand , Minor Illusion , Prestidigitation 1/Day Each: Major Image , Project Image"
      }
    ],
    "reactions": [
      {
        "name": "Warding Charm",
        "description": "Trigger: A creature hits the performer with an attack roll. Response—Wisdom Saving Throw: DC 17, the triggering creature. Failure: The attack roll misses the performer, and the target has the Charmed condition until the end of the performer’s next turn."
      }
    ]
  },
  {
    "id": "ddb_peryton_2024",
    "name": "Peryton",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 33,
      "formula": "6d8 + 6"
    },
    "speed": "20 ft., Fly 60 ft.",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 13,
      "int": 9,
      "wis": 12,
      "cha": 10
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 1,
      "wis": 1,
      "cha": 0
    },
    "skills": {
      "perception": 5,
      "stealth": 3
    },
    "senses": "Passive Perception 15",
    "languages": "Understands Common and Elvish but can’t speak",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The peryton doesn’t provoke an Opportunity Attack when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The peryton makes one Gore attack and one Talons attack."
      },
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage. If the peryton moved 30+ feet straight toward the target immediately before the hit, the target takes an extra 9 (2d8) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_talons",
        "name": "Talons",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (2d4 + 3) Piercing damage. If the attack reduces a Humanoid target to 0 Hit Points, the peryton kills the target by removing its heart.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d4+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_phase_spider_2024",
    "name": "Phase Spider",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 45,
      "formula": "7d10 + 7"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 15,
      "dex": 16,
      "con": 12,
      "int": 6,
      "wis": 10,
      "cha": 6
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "stealth": 7
    },
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ethereal Sight",
        "description": "The spider can see 60 feet into the Ethereal Plane while on the Material Plane and vice versa."
      },
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webs, and the spider knows the location of any other creature in contact with the same web."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The spider makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (1d10 + 3) Piercing damage plus 9 (2d8) Poison damage. If this damage reduces the target to 0 Hit Points, the target becomes Stable , and it has the Poisoned condition for 1 hour. While Poisoned, the target also has the Paralyzed condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Ethereal Jaunt",
        "description": "The spider teleports from the Material Plane to the Ethereal Plane or vice versa."
      }
    ]
  },
  {
    "id": "ddb_piranha_2024",
    "name": "Piranha",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "5 ft., Swim 40 ft.",
    "stats": {
      "str": 2,
      "dex": 16,
      "con": 9,
      "int": 1,
      "wis": 7,
      "cha": 2
    },
    "savingThrows": {
      "dex": 3
    },
    "senses": "Darkvision 60 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The piranha can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 (with Advantage if the target doesn’t have all its Hit Points), reach 5 ft. Hit: 1 Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_pirate_2024",
    "name": "Pirate",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 33,
      "formula": "6d8 + 6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 16,
      "con": 12,
      "int": 8,
      "wis": 12,
      "cha": 14
    },
    "savingThrows": {
      "str": 0,
      "dex": 5,
      "con": 1,
      "wis": 1,
      "cha": 4
    },
    "senses": "Passive Perception 11",
    "languages": "Common plus one other language",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The pirate makes two Dagger attacks. It can replace one attack with a use of Enthralling Panache."
      },
      {
        "id": "act_dagger",
        "name": "Dagger",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +5 , reach 5 ft. or range 20/60 ft. Hit: 5 (1d4 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d4+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_enthralling_panache",
        "name": "Enthralling Panache",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 12, one creature the pirate can see within 30 feet. Failure: The target has the Charmed condition until the start of the pirate’s next turn.",
        "saveDc": 12,
        "saveStat": "wis"
      }
    ]
  },
  {
    "id": "ddb_pirate_captain_2024",
    "name": "Pirate Captain",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 84,
      "formula": "13d8 + 26"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 18,
      "con": 14,
      "int": 10,
      "wis": 14,
      "cha": 17
    },
    "savingThrows": {
      "str": 3,
      "dex": 7,
      "con": 2,
      "int": 0,
      "wis": 5,
      "cha": 6
    },
    "skills": {
      "acrobatics": 7,
      "perception": 5
    },
    "senses": "Passive Perception 15",
    "languages": "Common plus one other language",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The pirate makes three attacks, using Rapier or Pistol in any combination."
      },
      {
        "id": "act_rapier",
        "name": "Rapier",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 13 (2d8 + 4) Piercing damage, and the pirate has Advantage on the next attack roll it makes before the end of this turn.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_pistol",
        "name": "Pistol",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +7 , range 30/90 ft. Hit: 15 (2d10 + 4) Piercing damage.",
        "attackBonus": 7,
        "rangeFeet": 30,
        "rangeLongFeet": 90,
        "damage": "2d10+4",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Captain’s Charm",
        "description": "Wisdom Saving Throw: DC 14, one creature the pirate can see within 30 feet. Failure: The target has the Charmed condition until the start of the pirate’s next turn."
      }
    ],
    "reactions": [
      {
        "name": "Riposte",
        "description": "Trigger: The pirate is hit by a melee attack roll while holding a weapon. Response: The pirate adds 3 to its AC against that attack, possibly causing it to miss. On a miss, the pirate makes one Rapier attack against the triggering creature if within range."
      }
    ]
  },
  {
    "id": "ddb_pit_fiend_2024",
    "name": "Pit Fiend",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 21,
    "hitPoints": {
      "average": 337,
      "formula": "27d10 + 189"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 26,
      "dex": 14,
      "con": 24,
      "int": 22,
      "wis": 18,
      "cha": 24
    },
    "savingThrows": {
      "str": 8,
      "dex": 8,
      "con": 7,
      "int": 6,
      "wis": 10,
      "cha": 7
    },
    "skills": {
      "perception": 10,
      "persuasion": 19
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 20",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "20",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Diabolical Restoration",
        "description": "If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells."
      },
      {
        "name": "Fear Aura",
        "description": "The pit fiend emanates an aura in a 20-foot Emanation while it doesn’t have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend’s aura for 24 hours."
      },
      {
        "name": "Legendary Resistance (4/Day)",
        "description": "If the pit fiend fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "description": "The pit fiend has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can’t regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "3d6+8",
        "damageType": "Piercing",
        "saveDc": 21,
        "saveStat": "con"
      },
      {
        "id": "act_devilish_claw",
        "name": "Devilish Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 26 (4d8 + 8) Necrotic damage.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "4d8+8",
        "damageType": "Necrotic"
      },
      {
        "id": "act_fiery_mace",
        "name": "Fiery Mace",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "4d6+8",
        "damageType": "Force"
      },
      {
        "id": "act_hellfire_spellcasting_recharge_4_6_",
        "name": "Hellfire Spellcasting (Recharge 4–6)",
        "type": "spell",
        "description": "The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire ."
      }
    ]
  },
  {
    "id": "ddb_planetar_2024",
    "name": "Planetar",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "subtype": "Angel",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "hitPoints": {
      "average": 262,
      "formula": "21d10 + 147"
    },
    "speed": "40 ft., Fly 120 ft. (hover)",
    "stats": {
      "str": 24,
      "dex": 20,
      "con": 24,
      "int": 19,
      "wis": 22,
      "cha": 25
    },
    "savingThrows": {
      "str": 12,
      "dex": 5,
      "con": 12,
      "int": 4,
      "wis": 11,
      "cha": 12
    },
    "skills": {
      "perception": 11
    },
    "damageResistances": [
      "Radiant"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 21",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Divine Awareness",
        "description": "The planetar knows if it hears a lie."
      },
      {
        "name": "Exalted Restoration",
        "description": "If the planetar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia."
      },
      {
        "name": "Magic Resistance",
        "description": "The planetar has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The planetar makes three Radiant Sword attacks or uses Holy Burst twice."
      },
      {
        "id": "act_radiant_sword",
        "name": "Radiant Sword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +12 , reach 10 ft. Hit: 14 (2d6 + 7) Slashing damage plus 18 (4d8) Radiant damage.",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "2d6+7",
        "damageType": "Slashing"
      },
      {
        "id": "act_holy_burst",
        "name": "Holy Burst",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 20, each enemy in a 20-foot-radius Sphere centered on a point the planetar can see within 120 feet. Failure: 24 (7d6) Radiant damage. Success: Half damage.",
        "damage": "7d6",
        "damageType": "Radiant",
        "saveDc": 20,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The planetar casts one of the following spells, requiring no Material components and using Charisma as spellcasting ability (spell save DC 20):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Evil and Good 1/Day Each: Commune , Control Weather , Dispel Evil and Good , Raise Dead"
      }
    ],
    "bonusActions": [
      {
        "name": "Divine Aid (2/Day)",
        "description": "The planetar casts Cure Wounds , Invisibility , Lesser Restoration , or Remove Curse , using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_plesiosaurus_2024",
    "name": "Plesiosaurus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "subtype": "Dinosaur",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 68,
      "formula": "8d10 + 24"
    },
    "speed": "20 ft., Swim 40 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Passive Perception 13",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The plesiosaurus can hold its breath for 1 hour."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 10 ft. Hit: 11 (2d6 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_polar_bear_2024",
    "name": "Polar Bear",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 42,
      "formula": "5d10 + 15"
    },
    "speed": "40 ft., Swim 40 ft.",
    "stats": {
      "str": 20,
      "dex": 14,
      "con": 16,
      "int": 2,
      "wis": 13,
      "cha": 7
    },
    "savingThrows": {
      "str": 5,
      "dex": 2,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "damageResistances": [
      "Cold"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bear makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 9 (1d8 + 5) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d8+5",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_poltergeist_2024",
    "name": "Poltergeist",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "alignment": "Chaotic Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "5 ft., Fly 50 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 14,
      "con": 11,
      "int": 10,
      "wis": 10,
      "cha": 14
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "int": 0,
      "wis": 0,
      "cha": 2
    },
    "damageResistances": [
      "Acid",
      "Bludgeoning",
      "Cold",
      "Fire",
      "Lightning",
      "Piercing",
      "Slashing",
      "Thunder"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Common plus one other language",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The poltergeist can move through other creatures and objects as if they were Difficult Terrain . It takes 5 (1d10) Force damage if it ends its turn inside an object."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The poltergeist makes one Object Slam attack and uses Telekinetic Thrust."
      },
      {
        "id": "act_object_slam",
        "name": "Object Slam",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +4 , reach 5 ft. or range 30 ft. Hit: 7 (2d4 + 2) Bludgeoning damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "rangeFeet": 30,
        "damage": "2d4+2",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_telekinetic_thrust",
        "name": "Telekinetic Thrust",
        "type": "ability",
        "description": "Strength Saving Throw: DC 12, one creature the poltergeist can see within 30 feet. Failure: 9 (2d6 + 2) Force damage, and the target is pushed up to 30 feet straight away from the poltergeist.",
        "damage": "2d6+2",
        "damageType": "Force",
        "saveDc": 12,
        "saveStat": "str"
      }
    ],
    "bonusActions": [
      {
        "name": "Vanish",
        "description": "The poltergeist gives itself the Invisible condition or ends that condition on itself."
      }
    ]
  },
  {
    "id": "ddb_pony_2024",
    "name": "Pony",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 15,
      "dex": 10,
      "con": 13,
      "int": 2,
      "wis": 11,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 1,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Bludgeoning damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_priest_2024",
    "name": "Priest",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Cleric",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 38,
      "formula": "7d8 + 7"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 10,
      "con": 12,
      "int": 13,
      "wis": 16,
      "cha": 13
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 1,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "skills": {
      "medicine": 7,
      "perception": 5,
      "religion": 5
    },
    "senses": "Passive Perception 15",
    "languages": "Common plus one other language",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The priest makes two attacks, using Mace or Radiant Flame in any combination."
      },
      {
        "id": "act_mace",
        "name": "Mace",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_radiant_flame",
        "name": "Radiant Flame",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 60 ft. Hit: 11 (2d10) Radiant damage.",
        "attackBonus": 5,
        "rangeFeet": 60,
        "damage": "2d10",
        "damageType": "Radiant"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The priest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Light , Thaumaturgy 1/Day: Spirit Guardians"
      }
    ],
    "bonusActions": [
      {
        "name": "Divine Aid (3/Day)",
        "description": "The priest casts Bless , Dispel Magic , Healing Word , or Lesser Restoration , using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_priest_acolyte_2024",
    "name": "Priest Acolyte",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Cleric",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 14,
      "dex": 10,
      "con": 12,
      "int": 10,
      "wis": 14,
      "cha": 11
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 1,
      "int": 0,
      "wis": 2,
      "cha": 0
    },
    "skills": {
      "medicine": 4,
      "religion": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Common",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_mace",
        "name": "Mace",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Bludgeoning damage plus 2 (1d4) Radiant damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_radiant_flame",
        "name": "Radiant Flame",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 60 ft. Hit: 7 (2d6) Radiant damage.",
        "attackBonus": 4,
        "rangeFeet": 60,
        "damage": "2d6",
        "damageType": "Radiant"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The priest casts one of the following spells, using Wisdom as the spellcasting ability:"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Light , Thaumaturgy"
      }
    ],
    "bonusActions": [
      {
        "name": "Divine Aid (1/Day)",
        "description": "The priest casts Bless , Healing Word , or Sanctuary , using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_primeval_owlbear_2024",
    "name": "Primeval Owlbear",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 16,
    "hitPoints": {
      "average": 126,
      "formula": "12d12 + 48"
    },
    "speed": "40 ft., Climb 40 ft., Fly 5 ft.",
    "stats": {
      "str": 22,
      "dex": 14,
      "con": 19,
      "int": 8,
      "wis": 15,
      "cha": 7
    },
    "savingThrows": {
      "str": 6,
      "dex": 2,
      "con": 7,
      "wis": 5
    },
    "skills": {
      "perception": 8
    },
    "senses": "Darkvision 120 ft.; Passive Perception 18",
    "languages": "None",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The owlbear has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The owlbear makes two Ravage attacks."
      },
      {
        "id": "act_ravage",
        "name": "Ravage",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 15 (2d8 + 6) Slashing damage. If the target is a Huge or smaller creature and the owlbear moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Slashing damage and has the Prone condition.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d8+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_screech_recharge_5_6_",
        "name": "Screech (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 15, each creature in a 30-foot Emanation originating from the owlbear. Failure: 27 (6d8) Thunder damage, and the target has the Incapacitated condition until the end of its next turn. Success: Half damage only.",
        "damage": "6d8",
        "damageType": "Thunder",
        "saveDc": 15,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_pseudodragon_2024",
    "name": "Pseudodragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Dragon",
    "alignment": "Neutral Good",
    "armorClass": 14,
    "hitPoints": {
      "average": 10,
      "formula": "3d4 + 3"
    },
    "speed": "15 ft., Fly 60 ft.",
    "stats": {
      "str": 6,
      "dex": 15,
      "con": 13,
      "int": 10,
      "wis": 12,
      "cha": 10
    },
    "savingThrows": {
      "dex": 2,
      "con": 1,
      "int": 0,
      "wis": 1,
      "cha": 0
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 15",
    "languages": "Understands Common and Draconic but can’t speak",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The pseudodragon has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The pseudodragon makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_sting",
        "name": "Sting",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 12, one creature the pseudodragon can see within 5 feet. Failure: 5 (2d4) Poison damage, and the target has the Poisoned condition for 1 hour. While Poisoned, the target also has the Unconscious condition, which ends early if the target takes damage or a creature within 5 feet of it takes an action to wake it.",
        "damage": "2d4",
        "damageType": "Poison",
        "saveDc": 12,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_pteranodon_2024",
    "name": "Pteranodon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "subtype": "Dinosaur",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "10 ft., Fly 60 ft.",
    "stats": {
      "str": 12,
      "dex": 15,
      "con": 10,
      "int": 2,
      "wis": 9,
      "cha": 5
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 0
    },
    "skills": {
      "perception": 1
    },
    "senses": "Passive Perception 11",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The pteranodon doesn’t provoke an Opportunity Attack when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_purple_worm_2024",
    "name": "Purple Worm",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 18,
    "hitPoints": {
      "average": 247,
      "formula": "15d20 + 90"
    },
    "speed": "50 ft., Burrow 50 ft.",
    "stats": {
      "str": 28,
      "dex": 7,
      "con": 22,
      "int": 1,
      "wis": 8,
      "cha": 4
    },
    "savingThrows": {
      "str": 9,
      "con": 11,
      "wis": 4
    },
    "senses": "Blindsight 30 ft., Tremorsense 60 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Tunneler",
        "description": "The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The worm makes one Bite attack and one Tail Stinger attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 19), and it has the Restrained condition until the grapple ends.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "3d8+9",
        "damageType": "Piercing"
      },
      {
        "id": "act_tail_stinger",
        "name": "Tail Stinger",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "2d6+9",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Swallow",
        "description": "Strength Saving Throw: DC 19, one Large or smaller creature Grappled by the worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 17 (5d6) Acid damage at the start of each of the worm’s turns."
      }
    ]
  },
  {
    "id": "ddb_quaggoth_thonot_2024",
    "name": "Quaggoth Thonot",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Chaotic Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 67,
      "formula": "9d8 + 27"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 16,
      "int": 6,
      "wis": 14,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 3,
      "wis": 2
    },
    "skills": {
      "athletics": 5
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 12",
    "languages": "Undercommon",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Bloodied Fury",
        "description": "While Bloodied , the quaggoth has Advantage on attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The quaggoth makes two Claw attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Slashing damage plus 5 (2d4) Psychic damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The quaggoth casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 12):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Mage Hand (the hand is Invisible ), Minor Illusion 2/Day: Mind Spike"
      }
    ],
    "reactions": [
      {
        "name": "Psionic Defense (3/Day)",
        "description": "The quaggoth casts Feather Fall or Shield in response to the spell’s trigger, requiring no spell components and using the same spellcasting ability as Spellcasting."
      }
    ]
  },
  {
    "id": "ddb_quasit_2024",
    "name": "Quasit",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 25,
      "formula": "10d4"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 5,
      "dex": 17,
      "con": 10,
      "int": 7,
      "wis": 10,
      "cha": 10
    },
    "savingThrows": {
      "dex": 3,
      "con": 0,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "stealth": 5
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 10",
    "languages": "Abyssal, Common",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The quasit has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Slashing damage, and the target has the Poisoned condition until the start of the quasit’s next turn.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_invisibility",
        "name": "Invisibility",
        "type": "spell",
        "description": "The quasit casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability."
      },
      {
        "id": "act_scare_1_day_",
        "name": "Scare (1/Day)",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 10, one creature within 20 feet. Failure: The target has the Frightened condition. At the end of each of its turns, the target repeats the save, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 10,
        "saveStat": "wis"
      },
      {
        "id": "act_shape_shift",
        "name": "Shape-Shift",
        "type": "ability",
        "description": "The quasit shape-shifts to resemble a bat (Speed 10 ft., Fly 40 ft.), a centipede (40 ft., Climb 40 ft.), or a toad (40 ft., Swim 40 ft.), or it returns to its true form. Its game statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_questing_knight_2024",
    "name": "Questing Knight",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 18,
    "hitPoints": {
      "average": 202,
      "formula": "27d8 + 81"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 20,
      "dex": 16,
      "con": 16,
      "int": 11,
      "wis": 12,
      "cha": 18
    },
    "savingThrows": {
      "str": 9,
      "dex": 3,
      "con": 7,
      "int": 0,
      "wis": 5,
      "cha": 8
    },
    "skills": {
      "athletics": 9,
      "perception": 5,
      "persuasion": 8
    },
    "conditionImmunities": [
      "Charmed",
      "Frightened"
    ],
    "senses": "Passive Perception 15",
    "languages": "Common plus one other language",
    "challengeRating": "12",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Aura of Bravery",
        "description": "Creatures of the knight’s choice in a 30-foot Emanation originating from it have Immunity to the Charmed and Frightened conditions while there."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The knight makes three attacks, using Greatsword or Longbow in any combination."
      },
      {
        "id": "act_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 12 (2d6 + 5) Slashing damage plus 22 (5d8) Radiant damage.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d6+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +7 , range 150/600 ft. Hit: 12 (2d8 + 3) Piercing damage plus 22 (5d8) Radiant damage.",
        "attackBonus": 7,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "2d8+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The knight casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 16):"
      },
      {
        "id": "act_1_day_each_",
        "name": "1/Day Each:",
        "type": "ability",
        "description": "Daylight , Dispel Evil and Good , Greater Restoration , Phantom Steed"
      }
    ]
  },
  {
    "id": "ddb_rakshasa_2024",
    "name": "Rakshasa",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 221,
      "formula": "26d8 + 104"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 14,
      "dex": 17,
      "con": 18,
      "int": 13,
      "wis": 16,
      "cha": 20
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 4,
      "int": 1,
      "wis": 3,
      "cha": 5
    },
    "skills": {
      "deception": 10,
      "insight": 8,
      "perception": 8
    },
    "damageVulnerabilities": [
      "Piercing damage from weapons wielded by creatures under the effect of a Bless spell"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened"
    ],
    "senses": "Truesight 60 ft.; Passive Perception 18",
    "languages": "Common, Infernal",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Greater Magic Resistance",
        "description": "The rakshasa automatically succeeds on saving throws against spells and other magical effects, and the attack rolls of spells automatically miss it. Without the rakshasa’s permission, no spell can observe the rakshasa remotely or detect its thoughts, creature type, or alignment."
      },
      {
        "name": "Fiendish Restoration",
        "description": "If the rakshasa dies outside the Nine Hells, its body turns to ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The rakshasa makes three Cursed Touch attacks."
      },
      {
        "id": "act_cursed_touch",
        "name": "Cursed Touch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 5 ft. Hit: 12 (2d6 + 5) Slashing damage plus 19 (3d12) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target gains no benefit from finishing a Short or Long Rest.",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d6+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_baleful_command_recharge_5_6_",
        "name": "Baleful Command (Recharge 5–6)",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 18, each enemy in a 30-foot Emanation originating from the rakshasa. Failure: 28 (8d6) Psychic damage, and the target has the Frightened and Incapacitated conditions until the start of the rakshasa’s next turn.",
        "damage": "8d6",
        "damageType": "Psychic",
        "saveDc": 18,
        "saveStat": "wis"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The rakshasa casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Detect Thoughts , Disguise Self , Mage Hand , Minor Illusion 1/Day Each: Fly , Invisibility , Major Image , Plane Shift"
      }
    ]
  },
  {
    "id": "ddb_rat_2024",
    "name": "Rat",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "20 ft., Climb 20 ft.",
    "stats": {
      "str": 2,
      "dex": 11,
      "con": 9,
      "int": 2,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "dex": 0,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Darkvision 30 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Agile",
        "description": "The rat doesn’t provoke Opportunity Attacks when it moves out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 1 Piercing damage.",
        "attackBonus": 2,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_raven_2024",
    "name": "Raven",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 2,
      "formula": "1d4"
    },
    "speed": "10 ft., Fly 50 ft.",
    "stats": {
      "str": 2,
      "dex": 14,
      "con": 10,
      "int": 5,
      "wis": 13,
      "cha": 6
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Mimicry",
        "description": "The raven can mimic simple sounds it has heard, such as a whisper or chitter. A hearer can discern the sounds are imitations with a successful DC 10 Wisdom ( Insight ) check."
      }
    ],
    "actions": [
      {
        "id": "act_beak",
        "name": "Beak",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 1 Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_red_dragon_wyrmling_2024",
    "name": "Red Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 75,
      "formula": "10d8 + 30"
    },
    "speed": "30 ft., Climb 30 ft., Fly 60 ft.",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 17,
      "int": 12,
      "wis": 11,
      "cha": 15
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 9 (1d10 + 4) Slashing damage plus 3 (1d6) Fire damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d10+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: 24 (7d6) Fire damage. Success: Half damage.",
        "damage": "7d6",
        "damageType": "Fire",
        "saveDc": 13,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_reef_shark_2024",
    "name": "Reef Shark",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "4d8 + 4"
    },
    "speed": "5 ft., Swim 30 ft.",
    "stats": {
      "str": 14,
      "dex": 15,
      "con": 13,
      "int": 1,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Blindsight 30 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The shark has Advantage on an attack roll against a creature if at least one of the shark’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (2d4 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_remorhaz_2024",
    "name": "Remorhaz",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 17,
    "hitPoints": {
      "average": 195,
      "formula": "17d12 + 85"
    },
    "speed": "40 ft., Burrow 30 ft.",
    "stats": {
      "str": 24,
      "dex": 13,
      "con": 21,
      "int": 4,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 7,
      "dex": 1,
      "con": 5,
      "wis": 0
    },
    "damageImmunities": [
      "Cold",
      "Fire"
    ],
    "senses": "Darkvision 60 ft., Tremorsense 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Heat Aura",
        "description": "At the end of each of the remorhaz’s turns, each creature in a 5-foot Emanation originating from the remorhaz takes 16 (3d10) Fire damage."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +11 , reach 10 ft. Hit: 18 (2d10 + 7) Piercing damage plus 14 (4d6) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17), and it has the Restrained condition until the grapple ends.",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d10+7",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Swallow",
        "description": "Strength Saving Throw: DC 19, one Large or smaller creature Grappled by the remorhaz (it can have up to two creatures swallowed at a time). Failure: The target is swallowed by the remorhaz, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, it has Total Cover against attacks and other effects outside the remorhaz, and it takes 10 (3d6) Acid damage plus 10 (3d6) Fire damage at the start of each of the remorhaz’s turns."
      }
    ]
  },
  {
    "id": "ddb_revenant_2024",
    "name": "Revenant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 127,
      "formula": "15d8 + 60"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 18,
      "int": 13,
      "wis": 16,
      "cha": 18
    },
    "savingThrows": {
      "str": 7,
      "dex": 2,
      "con": 7,
      "int": 1,
      "wis": 6,
      "cha": 7
    },
    "damageResistances": [
      "Necrotic",
      "Psychic"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Poisoned",
      "Stunned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "Common plus one other language",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Regeneration",
        "description": "The revenant regains 10 Hit Points at the start of each of its turns. If the revenant takes Fire or Radiant damage, this trait doesn’t function at the start of its next turn. Its body is destroyed only if it starts its turn with 0 Hit Points and doesn’t regenerate."
      },
      {
        "name": "Undead Restoration",
        "description": "If the revenant dies, it revives 24 hours later in a different body unless Dispel Evil and Good is cast on its corpse. If it revives, it animates a Humanoid corpse elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its Hit Points."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The revenant uses Vengeful Glare and makes two Slam attacks."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 11 (2d6 + 4) Necrotic damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Necrotic"
      },
      {
        "id": "act_vengeful_glare",
        "name": "Vengeful Glare",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 15, one creature the revenant can see within 30 feet. Failure: The target has the Frightened condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. If the Frightened target is cursed by the revenant (see Vow of Revenge), the target also has the Paralyzed condition for the duration.",
        "saveDc": 15,
        "saveStat": "wis"
      }
    ],
    "bonusActions": [
      {
        "name": "Vow of Revenge (1/Day)",
        "description": "The revenant curses one creature it can see within 30 feet of itself. The revenant knows the distance to and direction of the cursed target, even if it is on a different plane of existence. The curse ends on the target if the revenant uses this Bonus Action on a different creature."
      }
    ]
  },
  {
    "id": "ddb_rhinoceros_2024",
    "name": "Rhinoceros",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 21,
      "dex": 8,
      "con": 15,
      "int": 2,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": 5,
      "con": 2,
      "wis": 1
    },
    "senses": "Passive Perception 11",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 14 (2d8 + 5) Piercing damage. If target is a Large or smaller creature and the rhinoceros moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_riding_horse_2024",
    "name": "Riding Horse",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 13,
      "formula": "2d10 + 2"
    },
    "speed": "60 ft.",
    "stats": {
      "str": 16,
      "dex": 13,
      "con": 12,
      "int": 2,
      "wis": 11,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 1,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Bludgeoning damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_roc_2024",
    "name": "Roc",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 15,
    "hitPoints": {
      "average": 248,
      "formula": "16d20 + 80"
    },
    "speed": "20 ft., Fly 120 ft.",
    "stats": {
      "str": 28,
      "dex": 10,
      "con": 20,
      "int": 3,
      "wis": 10,
      "cha": 9
    },
    "savingThrows": {
      "str": 9,
      "dex": 4,
      "con": 5,
      "wis": 4
    },
    "skills": {
      "perception": 8
    },
    "senses": "Passive Perception 18",
    "languages": "None",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The roc makes two Beak attacks. It can replace one attack with a Talons attack."
      },
      {
        "id": "act_beak",
        "name": "Beak",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +13 , reach 10 ft. Hit: 28 (3d12 + 9) Piercing damage.",
        "attackBonus": 13,
        "reachFeet": 10,
        "damage": "3d12+9",
        "damageType": "Piercing"
      },
      {
        "id": "act_talons",
        "name": "Talons",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +13 , reach 5 ft. Hit: 23 (4d6 + 9) Slashing damage. If the target is a Huge or smaller creature, it has the Grappled condition (escape DC 19) from both talons, and it has the Restrained condition until the grapple ends.",
        "attackBonus": 13,
        "reachFeet": 5,
        "damage": "4d6+9",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Swoop (Recharge 5–6)",
        "description": "If the roc has a creature Grappled , the roc flies up to half its Fly Speed without provoking Opportunity Attacks and drops that creature."
      }
    ]
  },
  {
    "id": "ddb_roper_2024",
    "name": "Roper",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Neutral Evil",
    "armorClass": 20,
    "hitPoints": {
      "average": 93,
      "formula": "11d10 + 33"
    },
    "speed": "10 ft., Climb 20 ft.",
    "stats": {
      "str": 18,
      "dex": 8,
      "con": 17,
      "int": 7,
      "wis": 16,
      "cha": 6
    },
    "savingThrows": {
      "str": 4,
      "con": 3,
      "wis": 3
    },
    "skills": {
      "perception": 6,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 16",
    "languages": "None",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The roper can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The roper makes two Tentacle attacks, uses Reel, and makes two Bite attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 17 (3d8 + 4) Piercing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "3d8+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 60 ft. Hit: The target has the Grappled condition (escape DC 14) from one of six tentacles, and the target has the Poisoned condition until the grapple ends.",
        "attackBonus": 7,
        "reachFeet": 60
      },
      {
        "id": "act_reel",
        "name": "Reel",
        "type": "ability",
        "description": "The roper pulls each creature Grappled by it up to 30 feet straight toward it."
      }
    ]
  },
  {
    "id": "ddb_rust_monster_2024",
    "name": "Rust Monster",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 33,
      "formula": "6d8 + 6"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 13,
      "dex": 12,
      "con": 13,
      "int": 2,
      "wis": 13,
      "cha": 6
    },
    "savingThrows": {
      "str": 1,
      "dex": 1,
      "con": 1,
      "wis": 1
    },
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Iron Scent",
        "description": "The rust monster can pinpoint the location of ferrous metal within 30 feet of itself."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The rust monster makes one Bite attack and uses Antennae twice."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 5 (1d8 + 1) Piercing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d8+1",
        "damageType": "Piercing"
      },
      {
        "id": "act_antennae",
        "name": "Antennae",
        "type": "spell",
        "description": "The rust monster targets one nonmagical metal object—armor or a weapon—worn or carried by a creature within 5 feet of itself. Dexterity Saving Throw: DC 11, the creature with the object. Failure: The object takes a −1 penalty to the AC it offers (armor) or to its attack rolls (weapon). Armor is destroyed if the penalty reduces its AC to 10, and a weapon is destroyed if its penalty reaches −5. The penalty can be removed by casting the Mending spell on the armor or weapon.",
        "saveDc": 11,
        "saveStat": "dex"
      },
      {
        "id": "act_destroy_metal",
        "name": "Destroy Metal",
        "type": "ability",
        "description": "The rust monster touches a nonmagical metal object within 5 feet of itself that isn’t being worn or carried. The touch destroys a 1-foot Cube of the object."
      }
    ],
    "reactions": [
      {
        "name": "Reflexive Antennae",
        "description": "Trigger: An attack roll hits the rust monster. Response: The rust monster uses Antennae."
      }
    ]
  },
  {
    "id": "ddb_saber_toothed_tiger_2024",
    "name": "Saber-Toothed Tiger",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 52,
      "formula": "7d10 + 14"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 17,
      "con": 15,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 6,
      "dex": 5,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 5,
      "stealth": 7
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Running Leap",
        "description": "With a 10-foot running start, the tiger can Long Jump up to 25 feet."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The tiger makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 11 (2d6 + 4) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Nimble Escape",
        "description": "The tiger takes the Disengage or Hide action."
      }
    ]
  },
  {
    "id": "ddb_sahuagin_baron_2024",
    "name": "Sahuagin Baron",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 76,
      "formula": "9d10 + 27"
    },
    "speed": "30 ft., Swim 50 ft.",
    "stats": {
      "str": 19,
      "dex": 15,
      "con": 16,
      "int": 14,
      "wis": 13,
      "cha": 17
    },
    "savingThrows": {
      "str": 4,
      "dex": 5,
      "con": 6,
      "int": 2,
      "wis": 4,
      "cha": 3
    },
    "skills": {
      "perception": 7
    },
    "damageResistances": [
      "Acid",
      "Cold"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 17",
    "languages": "Sahuagin",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The sahuagin has Advantage on attack rolls against any creature that doesn’t have all its Hit Points."
      },
      {
        "name": "Limited Amphibiousness",
        "description": "The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water."
      },
      {
        "name": "Shark Telepathy",
        "description": "The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The sahuagin makes three Trident attacks."
      },
      {
        "id": "act_trident",
        "name": "Trident",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +7 , reach 5 ft. or range 20/60 ft. Hit: 13 (2d8 + 4) Piercing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "2d8+4",
        "damageType": "Piercing"
      }
    ],
    "reactions": [
      {
        "name": "Fiendish Blood",
        "description": "Trigger: The sahuagin takes Piercing or Slashing damage. Response—Constitution Saving Throw: DC 14, each creature of the sahuagin’s choice in a 5-foot Emanation originating from the sahuagin. Failure: 10 (3d6) Acid damage, and the target is cursed until it finishes a Short or Long Rest. While cursed, the target can’t benefit from the Invisible condition, its Speed decreases by 10 feet, and all Fiends within 120 feet of the target can sense its location regardless of interposing obstacles."
      }
    ]
  },
  {
    "id": "ddb_sahuagin_warrior_2024",
    "name": "Sahuagin Warrior",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "4d8 + 4"
    },
    "speed": "30 ft., Swim 40 ft.",
    "stats": {
      "str": 13,
      "dex": 11,
      "con": 12,
      "int": 12,
      "wis": 13,
      "cha": 9
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 1,
      "int": 1,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "damageResistances": [
      "Acid",
      "Cold"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 15",
    "languages": "Sahuagin",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The sahuagin has Advantage on attack rolls against any creature that doesn’t have all its Hit Points."
      },
      {
        "name": "Limited Amphibiousness",
        "description": "The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water."
      },
      {
        "name": "Shark Telepathy",
        "description": "The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The sahuagin makes two Claw attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 4 (1d6 + 1) Slashing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Aquatic Charge",
        "description": "The sahuagin swims up to its Swim Speed straight toward an enemy it can see."
      }
    ]
  },
  {
    "id": "ddb_salamander_2024",
    "name": "Salamander",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 90,
      "formula": "12d10 + 24"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 15,
      "int": 11,
      "wis": 10,
      "cha": 12
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 2,
      "int": 0,
      "wis": 0,
      "cha": 1
    },
    "damageVulnerabilities": [
      "Cold"
    ],
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Primordial (Ignan)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fire Aura",
        "description": "At the end of each of the salamander’s turns, each creature of the salamander’s choice in a 5-foot Emanation originating from the salamander takes 7 (2d6) Fire damage."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The salamander makes two Flame Spear attacks. It can replace one attack with a use of Constrict."
      },
      {
        "id": "act_flame_spear",
        "name": "Flame Spear",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +7 , reach 5 ft. or range 20/60 ft. Hit: 13 (2d8 + 4) Piercing damage plus 7 (2d6) Fire damage. Hit or Miss: The spear magically returns to the salamander’s hand immediately after a ranged attack.",
        "attackBonus": 7,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "2d8+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_constrict",
        "name": "Constrict",
        "type": "ability",
        "description": "Strength Saving Throw: DC 15, one Large or smaller creature the salamander can see within 10 feet. Failure: 11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Fire damage. The target has the Grappled condition (escape DC 14), and it has the Restrained condition until the grapple ends.",
        "damage": "2d6+4",
        "damageType": "Bludgeoning",
        "saveDc": 15,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_satyr_2024",
    "name": "Satyr",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Chaotic Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 31,
      "formula": "7d8"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 12,
      "dex": 16,
      "con": 11,
      "int": 12,
      "wis": 10,
      "cha": 14
    },
    "savingThrows": {
      "str": 1,
      "dex": 3,
      "con": 0,
      "int": 1,
      "wis": 0,
      "cha": 2
    },
    "skills": {
      "perception": 2,
      "performance": 6,
      "stealth": 5
    },
    "senses": "Passive Perception 12",
    "languages": "Common, Elvish, Sylvan",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The satyr has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, the satyr pushes the target up to 10 feet straight away from itself.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_mockery",
        "name": "Mockery",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 12, one creature the satyr can see within 90 feet. Failure: 5 (1d6 + 2) Psychic damage.",
        "damage": "1d6+2",
        "damageType": "Psychic",
        "saveDc": 12,
        "saveStat": "wis"
      }
    ]
  },
  {
    "id": "ddb_scorpion_2024",
    "name": "Scorpion",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "10 ft.",
    "stats": {
      "str": 2,
      "dex": 11,
      "con": 8,
      "int": 1,
      "wis": 8,
      "cha": 2
    },
    "savingThrows": {
      "dex": 0
    },
    "senses": "Blindsight 10 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_sting",
        "name": "Sting",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 1 Piercing damage plus 3 (1d6) Poison damage.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d6",
        "damageType": "Poison"
      }
    ]
  },
  {
    "id": "ddb_scout_2024",
    "name": "Scout",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 16,
      "formula": "3d8 + 3"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 14,
      "con": 12,
      "int": 11,
      "wis": 13,
      "cha": 11
    },
    "savingThrows": {
      "str": 0,
      "dex": 2,
      "con": 1,
      "int": 0,
      "wis": 1,
      "cha": 0
    },
    "skills": {
      "nature": 4,
      "perception": 5,
      "stealth": 6,
      "survival": 5
    },
    "senses": "Passive Perception 15",
    "languages": "Common plus one other language",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The scout makes two attacks, using Shortsword and Longbow in any combination."
      },
      {
        "id": "act_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 150/600 ft. Hit: 6 (1d8 + 2) Piercing damage.",
        "attackBonus": 4,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_sea_hag_2024",
    "name": "Sea Hag",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Chaotic Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 52,
      "formula": "7d8 + 21"
    },
    "speed": "30 ft., Swim 40 ft.",
    "stats": {
      "str": 16,
      "dex": 13,
      "con": 16,
      "int": 12,
      "wis": 12,
      "cha": 13
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "Common, Giant, Primordial (Aquan)",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The hag can breathe air and water."
      },
      {
        "name": "Coven Magic",
        "description": "While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell’s normal casting time, and using Intelligence as the spellcasting ability (spell save DC 11): Augury , Find Familiar , Identify , Locate Object , Scrying , or Unseen Servant . The hag must finish a Long Rest before using this trait to cast that spell again."
      },
      {
        "name": "Vile Appearance",
        "description": "Wisdom Saving Throw: DC 11, any Beast or Humanoid that starts its turn within 30 feet of the hag and can see the hag’s true form. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this hag’s Vile Appearance for 24 hours."
      }
    ],
    "actions": [
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_death_glare_recharge_5_6_",
        "name": "Death Glare (Recharge 5–6)",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 11, one Frightened creature the hag can see within 30 feet. Failure: If the target has 20 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, the target takes 13 (3d8) Psychic damage.",
        "damage": "3d8",
        "damageType": "Psychic",
        "saveDc": 11,
        "saveStat": "wis"
      },
      {
        "id": "act_illusory_appearance",
        "name": "Illusory Appearance",
        "type": "spell",
        "description": "The hag casts Disguise Self , using Constitution as the spellcasting ability (spell save DC 13). The spell’s duration is 24 hours."
      }
    ]
  },
  {
    "id": "ddb_seahorse_2024",
    "name": "Seahorse",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "5 ft., Swim 20 ft.",
    "stats": {
      "str": 1,
      "dex": 12,
      "con": 8,
      "int": 1,
      "wis": 10,
      "cha": 2
    },
    "savingThrows": {
      "dex": 1,
      "wis": 0
    },
    "skills": {
      "perception": 2,
      "stealth": 5
    },
    "senses": "Passive Perception 12",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The seahorse can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_bubble_dash",
        "name": "Bubble Dash",
        "type": "ability",
        "description": "While underwater, the seahorse moves up to its Swim Speed without provoking Opportunity Attacks ."
      }
    ]
  },
  {
    "id": "ddb_shadow_2024",
    "name": "Shadow",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 27,
      "formula": "5d8 + 5"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 6,
      "dex": 14,
      "con": 13,
      "int": 6,
      "wis": 10,
      "cha": 8
    },
    "savingThrows": {
      "dex": 2,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "stealth": 6
    },
    "damageVulnerabilities": [
      "Radiant"
    ],
    "damageResistances": [
      "Acid",
      "Cold",
      "Fire",
      "Lightning",
      "Thunder"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The shadow can move through a space as narrow as 1 inch without expending extra movement to do so."
      },
      {
        "name": "Sunlight Weakness",
        "description": "While in sunlight, the shadow has Disadvantage on D20 Tests ."
      }
    ],
    "actions": [
      {
        "id": "act_draining_swipe",
        "name": "Draining Swipe",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Necrotic damage, and the target’s Strength score decreases by 1d4 . The target dies if this reduces that score to 0. If a Humanoid is slain by this attack, a Shadow rises from the corpse 1d4 hours later.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Necrotic"
      }
    ],
    "bonusActions": [
      {
        "name": "Shadow Stealth",
        "description": "While in Dim Light or Darkness , the shadow takes the Hide action."
      }
    ]
  },
  {
    "id": "ddb_shadow_demon_2024",
    "name": "Shadow Demon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 66,
      "formula": "12d8 + 12"
    },
    "speed": "30 ft., Fly 30 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 17,
      "con": 12,
      "int": 14,
      "wis": 13,
      "cha": 14
    },
    "savingThrows": {
      "dex": 5,
      "con": 1,
      "int": 2,
      "wis": 1,
      "cha": 4
    },
    "skills": {
      "stealth": 7
    },
    "damageVulnerabilities": [
      "Radiant"
    ],
    "damageResistances": [
      "Acid",
      "Bludgeoning",
      "Cold",
      "Fire",
      "Lightning",
      "Piercing",
      "Slashing",
      "Thunder"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 11",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Demonic Restoration",
        "description": "If the demon dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The demon can move through other creatures and objects as if they were Difficult Terrain . It takes 5 (1d10) Force damage if it ends its turn inside an object."
      },
      {
        "name": "Light Sensitivity",
        "description": "While in Bright Light , the demon has Disadvantage on ability checks and attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_umbral_claw",
        "name": "Umbral Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 16 (3d8 + 3) Psychic damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "3d8+3",
        "damageType": "Psychic"
      }
    ],
    "bonusActions": [
      {
        "name": "Shadow Stealth",
        "description": "While in Dim Light or Darkness , the demon takes the Hide action."
      }
    ]
  },
  {
    "id": "ddb_shadow_dragon_huge_2024",
    "name": "Shadow Dragon (Huge)",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 189,
      "formula": "18d12 + 72"
    },
    "speed": "40 ft., Climb 40 ft., Fly 80 ft.",
    "stats": {
      "str": 21,
      "dex": 19,
      "con": 18,
      "int": 14,
      "wis": 12,
      "cha": 18
    },
    "savingThrows": {
      "str": 5,
      "dex": 9,
      "con": 4,
      "int": 2,
      "wis": 6,
      "cha": 4
    },
    "skills": {
      "perception": 11,
      "stealth": 14
    },
    "damageImmunities": [
      "Necrotic"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Resistances",
        "description": "See Living Shadow."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Living Shadow",
        "description": "While in Dim Light or Darkness , the dragon has Resistance to damage that isn’t Force, Psychic, or Radiant."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the dragon has Disadvantage on ability checks and attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 12 (2d6 + 5) Slashing damage plus 3 (1d6) Necrotic damage.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d6+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_shadow_breath_recharge_5_6_",
        "name": "Shadow Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 17, each creature in a 60-foot Cone. Failure: 35 (10d6) Necrotic damage. Success: Half damage. Failure or Success: A Humanoid reduced to 0 Hit Points by this damage dies, and a Shadow rises from the corpse. The shadow is under the dragon’s control and shares the dragon’s Initiative count but acts immediately after the dragon.",
        "damage": "10d6",
        "damageType": "Necrotic",
        "saveDc": 17,
        "saveStat": "dex"
      }
    ],
    "bonusActions": [
      {
        "name": "Shadow Stealth",
        "description": "While in Dim Light or Darkness , the dragon takes the Hide action."
      }
    ],
    "legendaryActions": [
      {
        "name": "Pounce",
        "description": "The dragon moves up to half its Speed, and it makes one Rend attack."
      },
      {
        "name": "Veil of Shadow",
        "description": "The dragon uses Shadow Stealth, and one creature of its choice that it can see within 10 feet of it takes 10 (3d6) Necrotic damage. The dragon can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_shambling_mound_2024",
    "name": "Shambling Mound",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Plant",
    "alignment": "Unaligned",
    "armorClass": 15,
    "hitPoints": {
      "average": 110,
      "formula": "13d10 + 39"
    },
    "speed": "30 ft., Swim 20 ft.",
    "stats": {
      "str": 18,
      "dex": 8,
      "con": 16,
      "int": 5,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "con": 3,
      "wis": 0
    },
    "skills": {
      "stealth": 3
    },
    "damageResistances": [
      "Cold",
      "Fire"
    ],
    "damageImmunities": [
      "Lightning"
    ],
    "conditionImmunities": [
      "Deafened",
      "Exhaustion"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Lightning Absorption",
        "description": "Whenever the shambling mound is subjected to Lightning damage, it regains a number of Hit Points equal to the Lightning damage dealt."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The shambling mound makes three Charged Tendril attacks. It can replace one attack with a use of Engulf."
      },
      {
        "id": "act_charged_tendril",
        "name": "Charged Tendril",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 7 (1d6 + 4) Bludgeoning damage plus 5 (2d4) Lightning damage. If the target is a Medium or smaller creature, the shambling mound pulls the target 5 feet straight toward itself.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "1d6+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_engulf",
        "name": "Engulf",
        "type": "ability",
        "description": "Strength Saving Throw: DC 15, one Medium or smaller creature within 5 feet. Failure: The target is pulled into the shambling mound’s space and has the Grappled condition (escape DC 14). Until the grapple ends, the target has the Blinded and Restrained conditions, and it takes 10 (3d6) Lightning damage at the start of each of its turns. When the shambling mound moves, the Grappled target moves with it, costing it no extra movement. The shambling mound can have only one creature Grappled by this action at a time.",
        "damage": "3d6",
        "damageType": "Lightning",
        "saveDc": 15,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_shield_guardian_2024",
    "name": "Shield Guardian",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 17,
    "hitPoints": {
      "average": 142,
      "formula": "15d10 + 60"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 8,
      "con": 18,
      "int": 7,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 4,
      "con": 4,
      "wis": 0
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 10",
    "languages": "Understands commands given in any language but can’t speak",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Bound",
        "description": "The guardian is magically bound to an amulet. While the guardian and its amulet are on the same plane of existence, the amulet’s wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 feet of the amulet’s wearer, half of any damage the wearer takes (round up) is transferred to the guardian."
      },
      {
        "name": "Regeneration",
        "description": "The guardian regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point."
      },
      {
        "name": "Spell Storing",
        "description": "A spellcaster who wears the guardian’s amulet can cause the guardian to store one spell of level 4 or lower. To do so, the wearer must cast the spell on the guardian while within 5 feet of it. The spell has no effect but is stored within the guardian. Any previously stored spell is lost when a new spell is stored. The guardian can cast the spell stored with any parameters set by the original caster, requiring no spell components and using the caster’s spellcasting ability. The stored spell is then lost."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The guardian makes two Fist attacks."
      },
      {
        "id": "act_fist",
        "name": "Fist",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Force damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "Bludgeoning"
      }
    ],
    "reactions": [
      {
        "name": "Protection",
        "description": "Trigger: An attack roll hits the wearer of the guardian’s amulet while the wearer is within 5 feet of the guardian. Response: The wearer gains a +5 bonus to AC, including against the triggering attack and possibly causing it to miss, until the start of the guardian’s next turn."
      }
    ]
  },
  {
    "id": "ddb_shrieker_fungus_2024",
    "name": "Shrieker Fungus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Plant",
    "alignment": "Unaligned",
    "armorClass": 5,
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "5 ft.",
    "stats": {
      "str": 1,
      "dex": 1,
      "con": 10,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "savingThrows": {
      "con": 0
    },
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened"
    ],
    "senses": "Blindsight 30 ft.; Passive Perception 6",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [],
    "reactions": [
      {
        "name": "Shriek",
        "description": "Trigger: A creature or a source of Bright Light moves within 30 feet of the shrieker. Response: The shrieker emits a shriek audible within 300 feet of itself for 1 minute or until the shrieker dies."
      }
    ]
  },
  {
    "id": "ddb_silver_dragon_wyrmling_2024",
    "name": "Silver Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 17,
    "hitPoints": {
      "average": 45,
      "formula": "6d8 + 18"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 17,
      "int": 12,
      "wis": 11,
      "cha": 15
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 9 (1d10 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d10+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: 18 (4d8) Cold damage. Success: Half damage.",
        "damage": "4d8",
        "damageType": "Cold",
        "saveDc": 13,
        "saveStat": "con"
      },
      {
        "id": "act_paralyzing_breath",
        "name": "Paralyzing Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 13, each creature in a 15-foot Cone. First Failure: The target has the Incapacitated condition until the end of its next turn, when it repeats the save. Second Failure: The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 13,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_skeleton_2024",
    "name": "Skeleton",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 13,
      "formula": "2d8 + 4"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 16,
      "con": 15,
      "int": 6,
      "wis": 8,
      "cha": 5
    },
    "savingThrows": {
      "str": 0,
      "dex": 3,
      "con": 2
    },
    "damageVulnerabilities": [
      "Bludgeoning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "Understands Common plus one other language but can’t speak",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_shortbow",
        "name": "Shortbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 80/320 ft. Hit: 6 (1d6 + 3) Piercing damage.",
        "attackBonus": 5,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d6+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_slaad_tadpole_2024",
    "name": "Slaad Tadpole",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Aberration",
    "alignment": "Chaotic Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 7,
      "formula": "3d4"
    },
    "speed": "30 ft., Burrow 10 ft.",
    "stats": {
      "str": 7,
      "dex": 15,
      "con": 10,
      "int": 3,
      "wis": 5,
      "cha": 3
    },
    "savingThrows": {
      "dex": 2,
      "con": 0
    },
    "skills": {
      "stealth": 4
    },
    "damageResistances": [
      "Acid",
      "Cold",
      "Fire",
      "Lightning",
      "Thunder"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 7",
    "languages": "Understands Slaad but can&#x27;t speak",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The slaad has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_solar_2024",
    "name": "Solar",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "subtype": "Angel",
    "alignment": "Lawful Good",
    "armorClass": 21,
    "hitPoints": {
      "average": 297,
      "formula": "22d10 + 176"
    },
    "speed": "50 ft., Fly 150 ft. (hover)",
    "stats": {
      "str": 26,
      "dex": 22,
      "con": 26,
      "int": 25,
      "wis": 25,
      "cha": 30
    },
    "savingThrows": {
      "str": 8,
      "dex": 6,
      "con": 8,
      "int": 7,
      "wis": 7,
      "cha": 10
    },
    "skills": {
      "perception": 14
    },
    "damageImmunities": [
      "Poison",
      "Radiant"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Poisoned"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 24",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "21",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Divine Awareness",
        "description": "The solar knows if it hears a lie."
      },
      {
        "name": "Exalted Restoration",
        "description": "If the solar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia."
      },
      {
        "name": "Legendary Resistance (4/Day)",
        "description": "If the solar fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "description": "The solar has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The solar makes two Flying Sword attacks. It can replace one attack with a use of Slaying Bow."
      },
      {
        "id": "act_flying_sword",
        "name": "Flying Sword",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +15 , reach 10 ft. or range 120 ft. Hit: 22 (4d6 + 8) Slashing damage plus 36 (8d8) Radiant damage. Hit or Miss: The sword magically returns to the solar’s hand or hovers within 5 feet of the solar immediately after a ranged attack.",
        "attackBonus": 15,
        "reachFeet": 10,
        "rangeFeet": 120,
        "damage": "4d6+8",
        "damageType": "Slashing"
      },
      {
        "id": "act_slaying_bow",
        "name": "Slaying Bow",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 21, one creature the solar can see within 600 feet. Failure: If the creature has 100 Hit Points or fewer, it dies. It otherwise takes 24 (4d8 + 6) Piercing damage plus 36 (8d8) Radiant damage.",
        "damage": "4d8+6",
        "damageType": "Piercing",
        "saveDc": 21,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The solar casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 25):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Evil and Good 1/Day Each: Commune , Control Weather , Dispel Evil and Good , Resurrection"
      }
    ],
    "bonusActions": [
      {
        "name": "Divine Aid (3/Day)",
        "description": "The solar casts Cure Wounds (level 2 version), Lesser Restoration , or Remove Curse , using the same spellcasting ability as Spellcasting."
      }
    ],
    "legendaryActions": [
      {
        "name": "Blinding Gaze",
        "description": "Constitution Saving Throw: DC 25, one creature the solar can see within 120 feet. Failure: The target has the Blinded condition for 1 minute. Failure or Success: The solar can’t take this action again until the start of its next turn."
      },
      {
        "name": "Radiant Teleport",
        "description": "The solar teleports up to 60 feet to an unoccupied space it can see. Dexterity Saving Throw: DC 25, each creature in a 10-foot Emanation originating from the solar at its destination space. Failure: 11 (2d10) Radiant damage. Success: Half damage."
      }
    ]
  },
  {
    "id": "ddb_specter_2024",
    "name": "Specter",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "30 ft., Fly 50 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 14,
      "con": 11,
      "int": 10,
      "wis": 10,
      "cha": 11
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "int": 0,
      "wis": 0,
      "cha": 0
    },
    "damageResistances": [
      "Acid",
      "Bludgeoning",
      "Cold",
      "Fire",
      "Lightning",
      "Piercing",
      "Slashing",
      "Thunder"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Understands Common plus one other language but can’t speak",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The specter can move through other creatures and objects as if they were Difficult Terrain . It takes 5 (1d10) Force damage if it ends its turn inside an object."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the specter has Disadvantage on ability checks and attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_life_drain",
        "name": "Life Drain",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 7 (2d6) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the damage taken.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6",
        "damageType": "Necrotic"
      }
    ]
  },
  {
    "id": "ddb_sphinx_of_lore_2024",
    "name": "Sphinx of Lore",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 170,
      "formula": "20d10 + 60"
    },
    "speed": "40 ft., Fly 60 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 18,
      "wis": 18,
      "cha": 18
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "int": 4,
      "wis": 4,
      "cha": 4
    },
    "skills": {
      "arcana": 12,
      "history": 12,
      "perception": 8,
      "religion": 12
    },
    "damageResistances": [
      "Necrotic",
      "Radiant"
    ],
    "damageImmunities": [
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 18",
    "languages": "Celestial, Common",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Inscrutable",
        "description": "No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom ( Insight ) checks made to ascertain its intentions or sincerity are made with Disadvantage ."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the sphinx fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The sphinx makes three Claw attacks."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 5 ft. Hit: 14 (3d6 + 4) Slashing damage.",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "3d6+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_mind_rending_roar_recharge_5_6_",
        "name": "Mind-Rending Roar (Recharge 5–6)",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 16, each enemy in a 300-foot Emanation originating from the sphinx. Failure: 35 (10d6) Psychic damage, and the target has the Incapacitated condition until the start of the sphinx’s next turn.",
        "damage": "10d6",
        "damageType": "Psychic",
        "saveDc": 16,
        "saveStat": "wis"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The sphinx casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 16):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Identify , Mage Hand , Minor Illusion , Prestidigitation 1/Day Each: Dispel Magic , Legend Lore , Locate Object , Plane Shift , Remove Curse , Tongues"
      }
    ],
    "legendaryActions": [
      {
        "name": "Arcane Prowl",
        "description": "The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack."
      },
      {
        "name": "Weight of Years",
        "description": "Constitution Saving Throw: DC 16, one creature the sphinx can see within 120 feet. Failure: The target gains 1 Exhaustion level. While the target has any Exhaustion levels, it appears 3d10 years older. Failure or Success: The sphinx can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_sphinx_of_valor_2024",
    "name": "Sphinx of Valor",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 199,
      "formula": "19d10 + 95"
    },
    "speed": "40 ft., Fly 60 ft.",
    "stats": {
      "str": 22,
      "dex": 10,
      "con": 20,
      "int": 16,
      "wis": 23,
      "cha": 18
    },
    "savingThrows": {
      "str": 6,
      "dex": 6,
      "con": 11,
      "int": 9,
      "wis": 12,
      "cha": 4
    },
    "skills": {
      "arcana": 9,
      "perception": 12,
      "religion": 15
    },
    "damageResistances": [
      "Necrotic",
      "Radiant"
    ],
    "damageImmunities": [
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened"
    ],
    "senses": "Truesight 120 ft.; Passive Perception 22",
    "languages": "Celestial, Common",
    "challengeRating": "17",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Inscrutable",
        "description": "No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom ( Insight ) checks made to ascertain its intentions or sincerity are made with Disadvantage ."
      },
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the sphinx fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The sphinx makes two Claw attacks and uses Roar."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +12 , reach 5 ft. Hit: 20 (4d6 + 6) Slashing damage.",
        "attackBonus": 12,
        "reachFeet": 5,
        "damage": "4d6+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_roar_3_day_",
        "name": "Roar (3/Day)",
        "type": "ability",
        "description": "The sphinx emits a magical roar. Whenever it roars, the roar has a different effect, as detailed below (the sequence resets when it takes a Long Rest):"
      },
      {
        "id": "act_first_roar",
        "name": "First Roar",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 20, each enemy in a 500-foot Emanation originating from the sphinx. Failure: The target has the Frightened condition for 1 minute. Second Roar. Wisdom Saving Throw: DC 20, each enemy in a 500-foot Emanation originating from the sphinx. Failure: The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. Third Roar. Constitution Saving Throw: DC 20, each enemy in a 500-foot Emanation originating from the sphinx. Failure: 44 (8d10) Thunder damage, and the target has the Prone condition. Success: Half damage only.",
        "damage": "8d10",
        "damageType": "Thunder",
        "saveDc": 20,
        "saveStat": "wis"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The sphinx casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 20):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Evil and Good , Thaumaturgy 1/Day Each: Detect Magic , Dispel Magic , Greater Restoration , Heroes’ Feast , Zone of Truth"
      }
    ],
    "legendaryActions": [
      {
        "name": "Arcane Prowl",
        "description": "The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack."
      },
      {
        "name": "Weight of Years",
        "description": "Constitution Saving Throw: DC 16, one creature the sphinx can see within 120 feet. Failure: The target gains 1 Exhaustion level. While the target has any Exhaustion levels, it appears 3d10 years older. Failure or Success: The sphinx can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_sphinx_of_wonder_2024",
    "name": "Sphinx of Wonder",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 13,
    "hitPoints": {
      "average": 24,
      "formula": "7d4 + 7"
    },
    "speed": "20 ft., Fly 40 ft.",
    "stats": {
      "str": 6,
      "dex": 17,
      "con": 13,
      "int": 15,
      "wis": 12,
      "cha": 11
    },
    "savingThrows": {
      "dex": 3,
      "con": 1,
      "int": 2,
      "wis": 1,
      "cha": 0
    },
    "skills": {
      "arcana": 4,
      "religion": 4,
      "stealth": 5
    },
    "damageResistances": [
      "Necrotic",
      "Psychic",
      "Radiant"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 11",
    "languages": "Celestial, Common",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The sphinx has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 5 (1d4 + 3) Slashing damage plus 7 (2d6) Radiant damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "Slashing"
      }
    ],
    "reactions": [
      {
        "name": "Burst of Ingenuity (2/Day)",
        "description": "Trigger: The sphinx or another creature within 30 feet makes an ability check or a saving throw. Response: The sphinx adds 2 to the roll."
      }
    ]
  },
  {
    "id": "ddb_spider_2024",
    "name": "Spider",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "20 ft., Climb 20 ft.",
    "stats": {
      "str": 2,
      "dex": 14,
      "con": 8,
      "int": 1,
      "wis": 10,
      "cha": 2
    },
    "savingThrows": {
      "dex": 2,
      "wis": 0
    },
    "skills": {
      "stealth": 4
    },
    "senses": "Darkvision 30 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webs, and the spider knows the location of any other creature in contact with the same web."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 1 Piercing damage plus 2 (1d4) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "Poison"
      }
    ]
  },
  {
    "id": "ddb_spirit_naga_2024",
    "name": "Spirit Naga",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 135,
      "formula": "18d10 + 36"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 17,
      "con": 14,
      "int": 16,
      "wis": 15,
      "cha": 16
    },
    "savingThrows": {
      "str": 4,
      "dex": 6,
      "con": 5,
      "int": 3,
      "wis": 5,
      "cha": 6
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "Abyssal, Common",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fiendish Restoration",
        "description": "If it dies, the naga returns to life in 1d6 days and regains all its Hit Points. Only a Wish spell can prevent this trait from functioning."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The naga makes three attacks, using Bite or Necrotic Ray in any combination."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 7 (1d6 + 4) Piercing damage plus 14 (4d6) Poison damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "1d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_necrotic_ray",
        "name": "Necrotic Ray",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +6 , range 60 ft. Hit: 21 (6d6) Necrotic damage.",
        "attackBonus": 6,
        "rangeFeet": 60,
        "damage": "6d6",
        "damageType": "Necrotic"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The naga casts one of the following spells, requiring no Somatic or Material components and using Intelligence as the spellcasting ability (spell save DC 14):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Mage Hand , Minor Illusion , Water Breathing 2/Day Each: Detect Thoughts , Dimension Door , Hold Person (level 3 version), Lightning Bolt (level 4 version)"
      }
    ]
  },
  {
    "id": "ddb_sprite_2024",
    "name": "Sprite",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Fey",
    "alignment": "Neutral Good",
    "armorClass": 15,
    "hitPoints": {
      "average": 10,
      "formula": "4d4"
    },
    "speed": "10 ft., Fly 40 ft.",
    "stats": {
      "str": 3,
      "dex": 18,
      "con": 10,
      "int": 14,
      "wis": 13,
      "cha": 11
    },
    "savingThrows": {
      "dex": 4,
      "con": 0,
      "int": 2,
      "wis": 1,
      "cha": 0
    },
    "skills": {
      "perception": 3,
      "stealth": 8
    },
    "senses": "Passive Perception 13",
    "languages": "Common, Elvish, Sylvan",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_needle_sword",
        "name": "Needle Sword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 6 (1d4 + 4) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d4+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_enchanting_bow",
        "name": "Enchanting Bow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +6 , range 40/160 ft. Hit: 1 Piercing damage, and the target has the Charmed condition until the start of the sprite’s next turn.",
        "attackBonus": 6,
        "rangeFeet": 40,
        "rangeLongFeet": 160
      },
      {
        "id": "act_heart_sight",
        "name": "Heart Sight",
        "type": "ability",
        "description": "Charisma Saving Throw: DC 10, one creature within 5 feet the sprite can see (Celestials, Fiends, and Undead automatically fail the save). Failure: The sprite knows the target’s emotions and alignment.",
        "saveDc": 10,
        "saveStat": "cha"
      },
      {
        "id": "act_invisibility",
        "name": "Invisibility",
        "type": "spell",
        "description": "The sprite casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability."
      }
    ]
  },
  {
    "id": "ddb_spy_2024",
    "name": "Spy",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 27,
      "formula": "6d8"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 10,
      "dex": 15,
      "con": 10,
      "int": 12,
      "wis": 14,
      "cha": 16
    },
    "savingThrows": {
      "str": 0,
      "dex": 2,
      "con": 0,
      "int": 1,
      "wis": 2,
      "cha": 3
    },
    "skills": {
      "deception": 5,
      "insight": 4,
      "investigation": 5,
      "perception": 6,
      "sleight of hand": 4,
      "stealth": 6
    },
    "senses": "Passive Perception 16",
    "languages": "Common plus one other language",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_hand_crossbow",
        "name": "Hand Crossbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 30/120 ft. Hit: 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.",
        "attackBonus": 4,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+2",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Cunning Action",
        "description": "The spy takes the Dash , Disengage , or Hide action."
      }
    ]
  },
  {
    "id": "ddb_spy_master_2024",
    "name": "Spy Master",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 19,
    "hitPoints": {
      "average": 137,
      "formula": "25d8 + 25"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 10,
      "dex": 20,
      "con": 12,
      "int": 18,
      "wis": 16,
      "cha": 16
    },
    "savingThrows": {
      "str": 0,
      "dex": 9,
      "con": 5,
      "int": 8,
      "wis": 7,
      "cha": 3
    },
    "skills": {
      "deception": 7,
      "insight": 7,
      "investigation": 8,
      "perception": 11,
      "sleight of hand": 9,
      "stealth": 13
    },
    "senses": "Passive Perception 21",
    "languages": "Common plus two other languages",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The spy makes three attacks, using Rapier or Hand Crossbow in any combination."
      },
      {
        "id": "act_rapier",
        "name": "Rapier",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 14 (2d8 + 5) Piercing damage plus 7 (2d6) Poison damage.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "Piercing"
      },
      {
        "id": "act_hand_crossbow",
        "name": "Hand Crossbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +9 , range 30/120 ft. Hit: 12 (2d6 + 5) Piercing damage plus 9 (2d8) Poison damage.",
        "attackBonus": 9,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "2d6+5",
        "damageType": "Piercing"
      },
      {
        "id": "act_smoke_bomb_1_day_",
        "name": "Smoke Bomb (1/Day)",
        "type": "ability",
        "description": "The spy throws a bomb to a point it can see within 30 feet of itself. Constitution Saving Throw: DC 16, each creature in a 20-foot-radius Sphere centered on that point. Failure: 28 (8d6) Poison damage, and the target has the Blinded condition until the end of the spy’s next turn. Success: Half damage only.",
        "damage": "8d6",
        "damageType": "Poison",
        "saveDc": 16,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Cunning Action",
        "description": "The spy takes the Dash , Disengage , or Hide action."
      }
    ]
  },
  {
    "id": "ddb_steam_mephit_2024",
    "name": "Steam Mephit",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "armorClass": 10,
    "hitPoints": {
      "average": 17,
      "formula": "5d6"
    },
    "speed": "30 ft., Fly 30 ft.",
    "stats": {
      "str": 5,
      "dex": 11,
      "con": 10,
      "int": 11,
      "wis": 10,
      "cha": 12
    },
    "savingThrows": {
      "dex": 0,
      "con": 0,
      "int": 0,
      "wis": 0,
      "cha": 1
    },
    "skills": {
      "stealth": 2
    },
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Primordial (Aquan, Ignan)",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blurred Form",
        "description": "Attack rolls against the mephit are made with Disadvantage unless the mephit has the Incapacitated condition."
      },
      {
        "name": "Death Burst",
        "description": "The mephit explodes when it dies. Dexterity Saving Throw: DC 10, each creature in a 5-foot Emanation originating from the mephit. Failure: 5 (2d4) Fire damage. Success: Half damage."
      }
    ],
    "actions": [
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 2 (1d4) Slashing damage plus 2 (1d4) Fire damage.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "Slashing"
      },
      {
        "id": "act_steam_breath_recharge_6_",
        "name": "Steam Breath (Recharge 6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 10, each creature in a 15-foot Cone. Failure: 5 (2d4) Fire damage, and the target’s Speed decreases by 10 feet until the end of the mephit’s next turn. Success: Half damage only. Failure or Success: Being underwater doesn’t grant Resistance to this Fire damage.",
        "damage": "2d4",
        "damageType": "Fire",
        "saveDc": 10,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_stirge_2024",
    "name": "Stirge",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 5,
      "formula": "2d4"
    },
    "speed": "10 ft., Fly 40 ft.",
    "stats": {
      "str": 4,
      "dex": 16,
      "con": 11,
      "int": 2,
      "wis": 8,
      "cha": 6
    },
    "savingThrows": {
      "dex": 3,
      "con": 0
    },
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_proboscis",
        "name": "Proboscis",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Piercing damage, and the stirge attaches to the target. While attached, the stirge can’t make Proboscis attacks, and the target takes 5 (2d4) Necrotic damage at the start of each of the stirge’s turns.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_stone_giant_2024",
    "name": "Stone Giant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 126,
      "formula": "11d12 + 55"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 23,
      "dex": 15,
      "con": 20,
      "int": 10,
      "wis": 12,
      "cha": 9
    },
    "savingThrows": {
      "str": 6,
      "dex": 5,
      "con": 8,
      "int": 0,
      "wis": 4
    },
    "skills": {
      "athletics": 12,
      "perception": 4,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Giant",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two attacks, using Stone Club or Boulder in any combination."
      },
      {
        "id": "act_stone_club",
        "name": "Stone Club",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 15 ft. Hit: 22 (3d10 + 6) Bludgeoning damage.",
        "attackBonus": 9,
        "reachFeet": 15,
        "damage": "3d10+6",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_boulder",
        "name": "Boulder",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +9 , range 60/240 ft. Hit: 15 (2d8 + 6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 9,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "2d8+6",
        "damageType": "Bludgeoning"
      }
    ],
    "reactions": [
      {
        "name": "Deflect Missile (Recharge 5–6)",
        "description": "Trigger: The giant is hit by a ranged attack roll and takes Bludgeoning, Piercing, or Slashing damage from it. Response: The giant reduces the damage it takes from the attack by 11 (1d10 + 6) , and if that damage is reduced to 0, the giant can redirect some of the attack’s force. Dexterity Saving Throw: DC 17, one creature the giant can see within 60 feet. Failure: 11 (1d10 + 6) Force damage."
      }
    ]
  },
  {
    "id": "ddb_stone_golem_2024",
    "name": "Stone Golem",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 18,
    "hitPoints": {
      "average": 220,
      "formula": "21d10 + 105"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 22,
      "dex": 9,
      "con": 20,
      "int": 3,
      "wis": 11,
      "cha": 1
    },
    "savingThrows": {
      "str": 6,
      "con": 5,
      "wis": 0
    },
    "damageImmunities": [
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 10",
    "languages": "Understands Common plus two other languages but can’t speak",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Immutable Form",
        "description": "The golem can’t shape-shift."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The golem makes two attacks, using Slam or Force Bolt in any combination."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 5 ft. Hit: 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d8+6",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_force_bolt",
        "name": "Force Bolt",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +9 , range 120 ft. Hit: 22 (4d10) Force damage.",
        "attackBonus": 9,
        "rangeFeet": 120,
        "damage": "4d10",
        "damageType": "Force"
      }
    ],
    "bonusActions": [
      {
        "name": "Slow (Recharge 5–6)",
        "description": "The golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17)."
      }
    ]
  },
  {
    "id": "ddb_storm_giant_2024",
    "name": "Storm Giant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Good",
    "armorClass": 16,
    "hitPoints": {
      "average": 230,
      "formula": "20d12 + 100"
    },
    "speed": "50 ft., Fly 25 ft. (hover), Swim 50 ft.",
    "stats": {
      "str": 29,
      "dex": 14,
      "con": 20,
      "int": 16,
      "wis": 20,
      "cha": 18
    },
    "savingThrows": {
      "str": 14,
      "dex": 2,
      "con": 10,
      "int": 3,
      "wis": 10,
      "cha": 9
    },
    "skills": {
      "arcana": 8,
      "athletics": 14,
      "history": 8,
      "perception": 10
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Lightning",
      "Thunder"
    ],
    "senses": "Darkvision 120 ft., Truesight 30 ft.; Passive Perception 20",
    "languages": "Common, Giant",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The giant can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two attacks, using Storm Sword or Thunderbolt in any combination."
      },
      {
        "id": "act_storm_sword",
        "name": "Storm Sword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +14 , reach 10 ft. Hit: 23 (4d6 + 9) Slashing damage plus 13 (3d8) Lightning damage.",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "4d6+9",
        "damageType": "Slashing"
      },
      {
        "id": "act_thunderbolt",
        "name": "Thunderbolt",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +14 , range 500 ft. Hit: 22 (2d12 + 9) Lightning damage, and the target has the Blinded and Deafened conditions until the start of the giant’s next turn.",
        "attackBonus": 14,
        "rangeFeet": 500,
        "damage": "2d12+9",
        "damageType": "Lightning"
      },
      {
        "id": "act_lightning_storm_recharge_5_6_",
        "name": "Lightning Storm (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 18, each creature in a 10-foot-radius, 40-foot-high Cylinder originating from a point the giant can see within 500 feet. Failure: 55 (10d10) Lightning damage. Success: Half damage.",
        "damage": "10d10",
        "damageType": "Lightning",
        "saveDc": 18,
        "saveStat": "dex"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The giant casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 18):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Magic , Light 1/Day: Control Weather"
      }
    ]
  },
  {
    "id": "ddb_succubus_2024",
    "name": "Succubus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 71,
      "formula": "13d8 + 13"
    },
    "speed": "30 ft., Fly 60 ft.",
    "stats": {
      "str": 8,
      "dex": 17,
      "con": 13,
      "int": 15,
      "wis": 12,
      "cha": 20
    },
    "savingThrows": {
      "dex": 3,
      "con": 1,
      "int": 2,
      "wis": 1,
      "cha": 5
    },
    "skills": {
      "deception": 9,
      "insight": 5,
      "perception": 5,
      "persuasion": 9,
      "stealth": 7
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Poison",
      "Psychic"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "Abyssal, Common, Infernal, Telepathy 60 ft.",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Incubus Form",
        "description": "When the succubus finishes a Long Rest, it can shape-shift into an Incubus , using that stat block instead of this one."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The succubus makes one Fiendish Touch attack and uses Charm or Draining Kiss."
      },
      {
        "id": "act_fiendish_touch",
        "name": "Fiendish Touch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 16 (2d10 + 5) Psychic damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d10+5",
        "damageType": "Psychic"
      },
      {
        "id": "act_charm",
        "name": "Charm",
        "type": "spell",
        "description": "The succubus casts Dominate Person (level 8 version), requiring no spell components and using Charisma as the spellcasting ability (spell save DC 15)."
      },
      {
        "id": "act_draining_kiss",
        "name": "Draining Kiss",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 15, one creature Charmed by the succubus within 5 feet. Failure: 13 (3d8) Psychic damage. Success: Half damage. Failure or Success: The target’s Hit Point maximum decreases by an amount equal to the damage taken.",
        "damage": "3d8",
        "damageType": "Psychic",
        "saveDc": 15,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Shape-Shift",
        "description": "The succubus shape-shifts to resemble a Medium or Small Humanoid or back into its true form. Its game statistics are the same in each form, except its Fly Speed is available only in its true form. Any equipment it’s wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_bats_2024",
    "name": "Swarm of Bats",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 11,
      "formula": "2d10"
    },
    "speed": "5 ft., Fly 30 ft.",
    "stats": {
      "str": 5,
      "dex": 15,
      "con": 10,
      "int": 2,
      "wis": 12,
      "cha": 4
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 1
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 11",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny bat. The swarm can’t regain Hit Points or gain Temporary Hit Points ."
      }
    ],
    "actions": [
      {
        "id": "act_bites",
        "name": "Bites",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (2d4) Piercing damage, or 2 (1d4) Piercing damage if the swarm is Bloodied .",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_swarm_of_crawling_claws_2024",
    "name": "Swarm of Crawling Claws",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 49,
      "formula": "11d8"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 14,
      "dex": 14,
      "con": 11,
      "int": 5,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 0,
      "wis": 0
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Grappled",
      "Incapacitated",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "senses": "Blindsight 30 ft.; Passive Perception 10",
    "languages": "Understands Common but can’t speak",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can’t regain Hit Points or gain Temporary Hit Points ."
      }
    ],
    "actions": [
      {
        "id": "act_swarm_of_grasping_hands",
        "name": "Swarm of Grasping Hands",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 20 (4d8 + 2) Necrotic damage, or 11 (2d8 + 2) Necrotic damage if the swarm is Bloodied . If the target is a Medium or smaller creature, it has the Prone condition.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "4d8+2",
        "damageType": "Necrotic"
      }
    ]
  },
  {
    "id": "ddb_swarm_of_insects_2024",
    "name": "Swarm of Insects",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 19,
      "formula": "3d8 + 6"
    },
    "speed": "20 ft., Climb or Fly 20 ft. (DM&#x27;s choice)",
    "stats": {
      "str": 3,
      "dex": 13,
      "con": 14,
      "int": 1,
      "wis": 7,
      "cha": 1
    },
    "savingThrows": {
      "dex": 1,
      "con": 2
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "senses": "Blindsight 30 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "If the swarm has a Climb Speed, the swarm can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can’t regain Hit Points or gain Temporary Hit Points ."
      }
    ],
    "actions": [
      {
        "id": "act_bites",
        "name": "Bites",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 6 (2d4 + 1) Poison damage, or 3 (1d4 + 1) Poison damage if the swarm is Bloodied .",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d4+1",
        "damageType": "Poison"
      }
    ]
  },
  {
    "id": "ddb_swarm_of_piranhas_2024",
    "name": "Swarm of Piranhas",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 28,
      "formula": "8d8 − 8"
    },
    "speed": "5 ft., Swim 40 ft.",
    "stats": {
      "str": 13,
      "dex": 16,
      "con": 9,
      "int": 1,
      "wis": 7,
      "cha": 2
    },
    "savingThrows": {
      "str": 1,
      "dex": 3
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 8",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny piranha. The swarm can’t regain Hit Points or gain Temporary Hit Points ."
      },
      {
        "name": "Water Breathing",
        "description": "The swarm can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_bites",
        "name": "Bites",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 (with Advantage if the target doesn’t have all its Hit Points), reach 5 ft. Hit: 8 (2d4 + 3) Piercing damage, or 5 (1d4 + 3) Piercing damage if the swarm is Bloodied .",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d4+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_swarm_of_rats_2024",
    "name": "Swarm of Rats",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 14,
      "formula": "4d8 − 4"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 9,
      "dex": 11,
      "con": 9,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "dex": 0,
      "wis": 0
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "senses": "Darkvision 30 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny rat. The swarm can’t regain Hit Points or gain Temporary Hit Points ."
      }
    ],
    "actions": [
      {
        "id": "act_bites",
        "name": "Bites",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 5 (2d4) Piercing damage, or 2 (1d4) Piercing damage if the swarm is Bloodied .",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "2d4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_swarm_of_ravens_2024",
    "name": "Swarm of Ravens",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "10 ft., Fly 50 ft.",
    "stats": {
      "str": 6,
      "dex": 14,
      "con": 12,
      "int": 5,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "dex": 2,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 5
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "senses": "Passive Perception 15",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny raven. The swarm can’t regain Hit Points or gain Temporary Hit Points ."
      }
    ],
    "actions": [
      {
        "id": "act_beaks",
        "name": "Beaks",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage, or 2 (1d4) Piercing damage if the swarm is Bloodied .",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_cacophony_recharge_6_",
        "name": "Cacophony (Recharge 6)",
        "type": "ability",
        "description": "Wisdom Saving Throw: DC 10, one creature in the swarm’s space. Failure: The target has the Deafened condition until the start of the swarm’s next turn. While Deafened, the target also has Disadvantage on ability checks and attack rolls.",
        "saveDc": 10,
        "saveStat": "wis"
      }
    ]
  },
  {
    "id": "ddb_swarm_of_stirges_2024",
    "name": "Swarm of Stirges",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 36,
      "formula": "8d8"
    },
    "speed": "10 ft., Fly 40 ft.",
    "stats": {
      "str": 4,
      "dex": 16,
      "con": 11,
      "int": 2,
      "wis": 8,
      "cha": 6
    },
    "savingThrows": {
      "dex": 3,
      "con": 0
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can’t regain Hit Points or gain Temporary Hit Points ."
      }
    ],
    "actions": [
      {
        "id": "act_swarm_of_proboscises",
        "name": "Swarm of Proboscises",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 14 (2d10 + 3) Piercing damage, or 8 (1d10 + 3) Piercing damage if the swarm is Bloodied . If the target is a Medium or smaller creature in the swarm’s space, the target has the Grappled condition (escape DC 13). Until the grapple ends, the target takes 7 (2d6) Necrotic damage at the end of each of its turns.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d10+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_swarm_of_venomous_snakes_2024",
    "name": "Swarm of Venomous Snakes",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 36,
      "formula": "8d8"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 8,
      "dex": 18,
      "con": 11,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "dex": 4,
      "con": 0,
      "wis": 0
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "senses": "Blindsight 10 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny snake. The swarm can’t regain Hit Points or gain Temporary Hit Points ."
      }
    ],
    "actions": [
      {
        "id": "act_bites",
        "name": "Bites",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 8 (1d8 + 4) Piercing damage—or 6 (1d4 + 4) Piercing damage if the swarm is Bloodied —plus 10 (3d6) Poison damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_tarrasque_2024",
    "name": "Tarrasque",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Gargantuan",
    "type": "Monstrosity",
    "subtype": "Titan",
    "alignment": "Unaligned",
    "armorClass": 25,
    "hitPoints": {
      "average": 697,
      "formula": "34d20 + 340"
    },
    "speed": "60 ft., Burrow 40 ft., Climb 60 ft.",
    "stats": {
      "str": 30,
      "dex": 11,
      "con": 30,
      "int": 3,
      "wis": 11,
      "cha": 11
    },
    "savingThrows": {
      "str": 10,
      "dex": 9,
      "con": 10,
      "int": 5,
      "wis": 9,
      "cha": 9
    },
    "skills": {
      "perception": 9
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Deafened",
      "Frightened",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Blindsight 120 ft.; Passive Perception 19",
    "languages": "None",
    "challengeRating": "30",
    "proficiencyBonus": 9,
    "traits": [
      {
        "name": "Legendary Resistance (6/Day)",
        "description": "If the tarrasque fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "description": "The tarrasque has Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Reflective Carapace",
        "description": "If the tarrasque is targeted by a Magic Missile spell or a spell that requires a ranged attack roll, roll 1d6 . On a 1–5, the tarrasque is unaffected. On a 6, the tarrasque is unaffected and reflects the spell, turning the caster into the target."
      },
      {
        "name": "Siege Monster",
        "description": "The tarrasque deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The tarrasque makes one Bite attack and three other attacks, using Claw or Tail in any combination."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +19 , reach 15 ft. Hit: 36 (4d12 + 10) Piercing damage, and the target has the Grappled condition (escape DC 20). Until the grapple ends, the target has the Restrained condition and can’t teleport.",
        "attackBonus": 19,
        "reachFeet": 15,
        "damage": "4d12+10",
        "damageType": "Piercing"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +19 , reach 15 ft. Hit: 28 (4d8 + 10) Slashing damage.",
        "attackBonus": 19,
        "reachFeet": 15,
        "damage": "4d8+10",
        "damageType": "Slashing"
      },
      {
        "id": "act_tail",
        "name": "Tail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +19 , reach 30 ft. Hit: 23 (3d8 + 10) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.",
        "attackBonus": 19,
        "reachFeet": 30,
        "damage": "3d8+10",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_thunderous_bellow_recharge_5_6_",
        "name": "Thunderous Bellow (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 27, each creature and each object that isn’t being worn or carried in a 150-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened and Frightened conditions until the end of its next turn. Success: Half damage only.",
        "damage": "12d12",
        "damageType": "Thunder",
        "saveDc": 27,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Swallow",
        "description": "Strength Saving Throw: DC 27, one Large or smaller creature Grappled by the tarrasque (it can have up to six creatures swallowed at a time). Failure: The target is swallowed, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions and can’t teleport, it has Total Cover against attacks and other effects outside the tarrasque, and it takes 56 (16d6) Acid damage at the start of each of the tarrasque’s turns."
      }
    ],
    "legendaryActions": [
      {
        "name": "Onslaught",
        "description": "The tarrasque moves up to half its Speed, and it makes one Claw or Tail attack."
      },
      {
        "name": "World-Shaking Movement",
        "description": "The tarrasque moves up to its Speed. At the end of this movement, the tarrasque creates an instantaneous shock wave in a 60-foot Emanation originating from itself. Creatures in that area lose Concentration and, if Medium or smaller, have the Prone condition. The tarrasque can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_tiger_2024",
    "name": "Tiger",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 30,
      "formula": "4d10 + 8"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 17,
      "dex": 16,
      "con": 14,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 3,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 3,
      "stealth": 7
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Nimble Escape",
        "description": "The tiger takes the Disengage or Hide action."
      }
    ]
  },
  {
    "id": "ddb_tough_2024",
    "name": "Tough",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 32,
      "formula": "5d8 + 10"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 15,
      "dex": 12,
      "con": 14,
      "int": 10,
      "wis": 10,
      "cha": 11
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 2,
      "int": 0,
      "wis": 0,
      "cha": 0
    },
    "senses": "Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The tough has Advantage on an attack roll against a creature if at least one of the tough’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_mace",
        "name": "Mace",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Bludgeoning damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_heavy_crossbow",
        "name": "Heavy Crossbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +3 , range 100/400 ft. Hit: 6 (1d10 + 1) Piercing damage.",
        "attackBonus": 3,
        "rangeFeet": 100,
        "rangeLongFeet": 400,
        "damage": "1d10+1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_tough_boss_2024",
    "name": "Tough Boss",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 16,
    "hitPoints": {
      "average": 82,
      "formula": "11d8 + 33"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 17,
      "dex": 14,
      "con": 16,
      "int": 11,
      "wis": 10,
      "cha": 11
    },
    "savingThrows": {
      "str": 5,
      "dex": 2,
      "con": 5,
      "int": 0,
      "wis": 0,
      "cha": 2
    },
    "senses": "Passive Perception 10",
    "languages": "Common plus one other language",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The tough has Advantage on an attack roll against a creature if at least one of the tough’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The tough makes two attacks, using Warhammer or Heavy Crossbow in any combination."
      },
      {
        "id": "act_warhammer",
        "name": "Warhammer",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, the tough pushes the target up to 10 feet straight away from itself.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d8+3",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_heavy_crossbow",
        "name": "Heavy Crossbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 100/400 ft. Hit: 13 (2d10 + 2) Piercing damage.",
        "attackBonus": 4,
        "rangeFeet": 100,
        "rangeLongFeet": 400,
        "damage": "2d10+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_treant_2024",
    "name": "Treant",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Plant",
    "alignment": "Chaotic Good",
    "armorClass": 16,
    "hitPoints": {
      "average": 138,
      "formula": "12d12 + 60"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 23,
      "dex": 8,
      "con": 21,
      "int": 12,
      "wis": 16,
      "cha": 12
    },
    "savingThrows": {
      "str": 6,
      "con": 5,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageResistances": [
      "Bludgeoning",
      "Piercing"
    ],
    "senses": "Passive Perception 13",
    "languages": "Common, Druidic, Elvish, Sylvan",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Siege Monster",
        "description": "The treant deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The treant makes two Slam attacks."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 5 ft. Hit: 16 (3d6 + 6) Bludgeoning damage.",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "3d6+6",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_hail_of_bark",
        "name": "Hail of Bark",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +10 , range 180 ft. Hit: 28 (4d10 + 6) Piercing damage.",
        "attackBonus": 10,
        "rangeFeet": 180,
        "damage": "4d10+6",
        "damageType": "Piercing"
      },
      {
        "id": "act_animate_trees_1_day_",
        "name": "Animate Trees (1/Day)",
        "type": "ability",
        "description": "The treant magically animates up to two trees it can see within 60 feet of itself. Each tree uses the Treant stat block, except it has Intelligence and Charisma scores of 1, it can’t speak, and it lacks this action. The tree takes its turn immediately after the treant on the same Initiative count, and it obeys the treant. A tree remains animate for 1 day or until it dies, the treant dies, or it is more than 120 feet from the treant. The tree then takes root if possible."
      }
    ]
  },
  {
    "id": "ddb_triceratops_2024",
    "name": "Triceratops",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "subtype": "Dinosaur",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 114,
      "formula": "12d12 + 36"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 22,
      "dex": 9,
      "con": 17,
      "int": 2,
      "wis": 11,
      "cha": 5
    },
    "savingThrows": {
      "str": 6,
      "con": 3,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "None",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The triceratops makes two Gore attacks."
      },
      {
        "id": "act_gore",
        "name": "Gore",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 19 (2d12 + 6) Piercing damage. If the target is Huge or smaller and the triceratops moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d12+6",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_troll_2024",
    "name": "Troll",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 94,
      "formula": "9d10 + 45"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 13,
      "con": 20,
      "int": 7,
      "wis": 9,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 5
    },
    "skills": {
      "perception": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "Giant",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Loathsome Limbs (4/Day)",
        "description": "If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll’s limbs is severed, falls into the troll’s space, and becomes a Troll Limb . The limb acts immediately after the troll’s turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points."
      },
      {
        "name": "Regeneration",
        "description": "The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn’t function on the troll’s next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn’t regenerate."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The troll makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 11 (2d6 + 4) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Charge",
        "description": "The troll moves up to half its Speed straight toward an enemy it can see."
      }
    ]
  },
  {
    "id": "ddb_troll_limb_2024",
    "name": "Troll Limb",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 14,
      "formula": "4d6"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 18,
      "dex": 12,
      "con": 10,
      "int": 1,
      "wis": 9,
      "cha": 1
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 0
    },
    "senses": "Darkvision 60 ft.; Passive Perception 9",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Regeneration",
        "description": "The limb regains 5 Hit Points at the start of each of its turns. If the limb takes Acid or Fire damage, this trait doesn’t function on the limb’s next turn. The limb dies only if it starts its turn with 0 Hit Points and doesn’t regenerate."
      },
      {
        "name": "Troll Spawn",
        "description": "The limb uncannily has the same senses as a whole troll. If the limb isn’t destroyed within 24 hours, roll 1d12 . On a 12, the limb turns into a Troll . Otherwise, the limb withers away."
      }
    ],
    "actions": [
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 9 (2d4 + 4) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d4+4",
        "damageType": "Slashing"
      }
    ]
  },
  {
    "id": "ddb_tyrannosaurus_rex_2024",
    "name": "Tyrannosaurus Rex",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Huge",
    "type": "Beast",
    "subtype": "Dinosaur",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 136,
      "formula": "13d12 + 52"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 19,
      "int": 2,
      "wis": 12,
      "cha": 9
    },
    "savingThrows": {
      "str": 10,
      "dex": 0,
      "con": 4,
      "wis": 4
    },
    "skills": {
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "None",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The tyrannosaurus makes one Bite attack and one Tail attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 33 (4d12 + 7) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition and can’t be targeted by the tyrannosaurus’s Tail.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "4d12+7",
        "damageType": "Piercing"
      },
      {
        "id": "act_tail",
        "name": "Tail",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 15 ft. Hit: 25 (4d8 + 7) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.",
        "attackBonus": 10,
        "reachFeet": 15,
        "damage": "4d8+7",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_unicorn_2024",
    "name": "Unicorn",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 12,
    "hitPoints": {
      "average": 97,
      "formula": "13d10 + 26"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 15,
      "int": 11,
      "wis": 17,
      "cha": 16
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 2,
      "int": 0,
      "wis": 3,
      "cha": 3
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "Celestial, Elvish, Sylvan, Telepathy 120 ft.",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the unicorn fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "description": "The unicorn has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The unicorn makes one Hooves attack and one Radiant Horn attack."
      },
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 11 (2d6 + 4) Bludgeoning damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_radiant_horn",
        "name": "Radiant Horn",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 9 (1d10 + 4) Radiant damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d10+4",
        "damageType": "Radiant"
      },
      {
        "id": "act_spellcasting",
        "name": "Spellcasting",
        "type": "spell",
        "description": "The unicorn casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 14):"
      },
      {
        "id": "act_at_will_",
        "name": "At Will:",
        "type": "ability",
        "description": "Detect Evil and Good , Druidcraft 1/Day Each: Calm Emotions , Dispel Evil and Good , Entangle , Pass without Trace , Word of Recall"
      }
    ],
    "bonusActions": [
      {
        "name": "Unicorn’s Blessing (3/Day)",
        "description": "The unicorn touches another creature with its horn and casts Cure Wounds or Lesser Restoration on that creature, using the same spellcasting ability as Spellcasting."
      }
    ],
    "legendaryActions": [
      {
        "name": "Charging Horn",
        "description": "The unicorn moves up to half its Speed without provoking Opportunity Attacks , and it makes one Radiant Horn attack."
      },
      {
        "name": "Shimmering Shield",
        "description": "The unicorn targets itself or one creature it can see within 60 feet of itself. The target gains 10 (3d6) Temporary Hit Points , and its AC increases by 2 until the end of the unicorn’s next turn. The unicorn can’t take this action again until the start of its next turn."
      }
    ]
  },
  {
    "id": "ddb_vampire_2024",
    "name": "Vampire",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 195,
      "formula": "23d8 + 92"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 18,
      "dex": 18,
      "con": 18,
      "int": 17,
      "wis": 15,
      "cha": 18
    },
    "savingThrows": {
      "str": 4,
      "dex": 9,
      "con": 9,
      "int": 3,
      "wis": 7,
      "cha": 9
    },
    "skills": {
      "perception": 7,
      "stealth": 9
    },
    "damageResistances": [
      "Necrotic"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 17",
    "languages": "Common plus two other languages",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the vampire fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Misty Escape",
        "description": "If the vampire drops to 0 Hit Points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can’t use Shape-Shift, it is destroyed."
      },
      {
        "name": "Spider Climb",
        "description": "The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Vampire Weakness",
        "description": "The vampire has these weaknesses:"
      },
      {
        "name": "Forbiddance",
        "description": "The vampire can’t enter a residence without an invitation from an occupant. Running Water. The vampire takes 20 Acid damage if it ends its turn in running water. Stake to the Heart. If a weapon that deals Piercing damage is driven into the vampire’s heart while the vampire has the Incapacitated condition in its resting place, the vampire has the Paralyzed condition until the weapon is removed. Sunlight. The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack_vampire_form_only_",
        "name": "Multiattack (Vampire Form Only)",
        "type": "multiattack",
        "description": "The vampire makes two Grave Strike attacks and uses Bite."
      },
      {
        "id": "act_grave_strike_vampire_form_only_",
        "name": "Grave Strike (Vampire Form Only)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of two hands.",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_bite_bat_or_vampire_form_only_",
        "name": "Bite (Bat or Vampire Form Only)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 17, one creature within 5 feet that is willing or that has the Grappled , Incapacitated , or Restrained condition. Failure: 6 (1d4 + 4) Piercing damage plus 13 (3d8) Necrotic damage. The target’s Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire’s control.",
        "damage": "1d4+4",
        "damageType": "Piercing",
        "saveDc": 17,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Charm (Recharge 5–6)",
        "description": "The vampire casts Charm Person , requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the vampire’s Bite, the damage of which doesn’t end the spell. When the spell ends, the target is unaware it was Charmed by the vampire."
      },
      {
        "name": "Shape-Shift",
        "description": "If the vampire isn’t in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it."
      }
    ],
    "legendaryActions": [
      {
        "name": "Beguile",
        "description": "The vampire casts Command , requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can’t take this action again until the start of its next turn."
      },
      {
        "name": "Deathless Strike",
        "description": "The vampire moves up to half its Speed, and it makes one Grave Strike attack."
      }
    ]
  },
  {
    "id": "ddb_vampire_familiar_2024",
    "name": "Vampire Familiar",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 65,
      "formula": "10d8 + 20"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 17,
      "dex": 16,
      "con": 15,
      "int": 10,
      "wis": 10,
      "cha": 14
    },
    "savingThrows": {
      "str": 3,
      "dex": 5,
      "con": 2,
      "int": 0,
      "wis": 2,
      "cha": 2
    },
    "skills": {
      "perception": 4,
      "persuasion": 4,
      "stealth": 7
    },
    "damageResistances": [
      "Necrotic"
    ],
    "conditionImmunities": [
      "Charmed"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Common plus one other language",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Vampiric Connection",
        "description": "While the familiar and its vampire master are on the same plane of existence, the vampire can communicate with the familiar telepathically, and the vampire can perceive through the familiar’s senses."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The familiar makes two Umbral Dagger attacks."
      },
      {
        "id": "act_umbral_dagger",
        "name": "Umbral Dagger",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +5 , reach 5 ft. or range 20/60 ft. Hit: 5 (1d4 + 3) Piercing damage plus 7 (3d4) Necrotic damage. If the target is reduced to 0 Hit Points by this attack, the target becomes Stable but has the Poisoned condition for 1 hour. While it has the Poisoned condition, the target has the Paralyzed condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d4+3",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Deathless Agility",
        "description": "The familiar takes the Dash or Disengage action."
      }
    ]
  },
  {
    "id": "ddb_vampire_nightbringer_2024",
    "name": "Vampire Nightbringer",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 142,
      "formula": "19d8 + 57"
    },
    "speed": "30 ft., Fly 30 ft. (hover)",
    "stats": {
      "str": 16,
      "dex": 18,
      "con": 16,
      "int": 13,
      "wis": 14,
      "cha": 15
    },
    "savingThrows": {
      "str": 3,
      "dex": 7,
      "con": 3,
      "int": 1,
      "wis": 5,
      "cha": 2
    },
    "skills": {
      "perception": 5,
      "stealth": 7
    },
    "damageImmunities": [
      "Cold",
      "Necrotic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 15",
    "languages": "Common plus one other language",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Sunlight Hypersensitivity",
        "description": "The vampire takes 10 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The vampire makes one Bite attack and one Shadow Strike attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 7 (1d6 + 4) Piercing damage plus 10 (3d6) Necrotic damage. The target’s Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_shadow_strike",
        "name": "Shadow Strike",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 7 (1d6 + 4) Slashing damage plus 14 (4d6) Cold damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Shadow Stealth",
        "description": "While in Dim Light or Darkness , the vampire takes the Hide action."
      }
    ]
  },
  {
    "id": "ddb_vampire_spawn_2024",
    "name": "Vampire Spawn",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 90,
      "formula": "12d8 + 36"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 16,
      "con": 16,
      "int": 11,
      "wis": 10,
      "cha": 12
    },
    "savingThrows": {
      "str": 3,
      "dex": 6,
      "con": 3,
      "int": 0,
      "wis": 3,
      "cha": 1
    },
    "skills": {
      "perception": 3,
      "stealth": 6
    },
    "damageResistances": [
      "Necrotic"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "Common plus one other language",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Vampire Weakness",
        "description": "The vampire has these weaknesses:"
      },
      {
        "name": "Forbiddance",
        "description": "The vampire can’t enter a residence without an invitation from an occupant. Running Water. The vampire takes 20 Acid damage if it ends its turn in running water. Stake to the Heart. The vampire is destroyed if a weapon that deals Piercing damage is driven into the vampire’s heart while the vampire has the Incapacitated condition. Sunlight. The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The vampire makes two Claw attacks and uses Bite."
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 8 (2d4 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two claws.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d4+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 14, one creature within 5 feet that is willing or that has the Grappled , Incapacitated , or Restrained condition. Failure: 5 (1d4 + 3) Piercing damage plus 10 (3d6) Necrotic damage. The target’s Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount.",
        "damage": "1d4+3",
        "damageType": "Piercing",
        "saveDc": 14,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Deathless Agility",
        "description": "The vampire takes the Dash or Disengage action."
      }
    ]
  },
  {
    "id": "ddb_vampire_umbral_lord_2024",
    "name": "Vampire Umbral Lord",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 187,
      "formula": "22d8 + 88"
    },
    "speed": "40 ft., Climb 40 ft., Fly 40 ft. (hover)",
    "stats": {
      "str": 20,
      "dex": 18,
      "con": 18,
      "int": 19,
      "wis": 16,
      "cha": 21
    },
    "savingThrows": {
      "str": 10,
      "dex": 9,
      "con": 4,
      "int": 4,
      "wis": 8,
      "cha": 10
    },
    "skills": {
      "arcana": 9,
      "perception": 13,
      "stealth": 9
    },
    "damageImmunities": [
      "Cold",
      "Necrotic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion"
    ],
    "senses": "Blindsight 120 ft.; Passive Perception 23",
    "languages": "Common plus three other languages",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day, or 4/Day in Lair)",
        "description": "If the vampire fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Shadow Escape",
        "description": "If the vampire drops to 0 Hit Points outside its resting place, it teleports into its resting place unless it is in running water or sunlight. If it can’t teleport, it is destroyed. Once inside its resting place, it has the Paralyzed condition for 1 hour, after which it regains 1 Hit Point."
      },
      {
        "name": "Vampire Weakness",
        "description": "The vampire has these weaknesses:"
      },
      {
        "name": "Forbiddance",
        "description": "The vampire can’t enter a residence without an invitation from an occupant. Running Water. The vampire takes 20 Acid damage if it ends its turn in running water. Stake to the Heart. If a weapon that deals Piercing damage is driven into the vampire’s heart while the vampire has the Incapacitated condition in its resting place, the vampire has the Paralyzed condition until the weapon is removed. Sunlight. The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The vampire makes two attacks, using Grave Strike or Sickening Ray in any combination."
      },
      {
        "id": "act_grave_strike",
        "name": "Grave Strike",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 5 ft. Hit: 9 (1d8 + 5) Slashing damage plus 13 (3d8) Necrotic damage.",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "1d8+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_sickening_ray",
        "name": "Sickening Ray",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +10 , range 120 ft. Hit: 16 (2d10 + 5) Necrotic damage, and the target has the Poisoned condition until the start of the vampire’s next turn.",
        "attackBonus": 10,
        "rangeFeet": 120,
        "damage": "2d10+5",
        "damageType": "Necrotic"
      },
      {
        "id": "act_hunger_of_hadar_recharge_5_6_",
        "name": "Hunger of Hadar (Recharge 5–6)",
        "type": "spell",
        "description": "The vampire casts Hunger of Hadar (level 5 version), requiring no spell components and using Charisma as the spellcasting ability (spell save DC 18)."
      }
    ],
    "bonusActions": [
      {
        "name": "Sanguine Drain",
        "description": "Constitution Saving Throw: DC 18, one creature the vampire can see within 30 feet that isn’t a Construct or an Undead. Failure: 14 (4d6) Necrotic damage. The target’s Hit Point maximum decreases by an amount equal to the damage taken, and the vampire regains Hit Points equal to that amount."
      }
    ],
    "legendaryActions": [
      {
        "name": "Beguile",
        "description": "The vampire casts Command , requiring no spell components and using Charisma as the spellcasting ability (spell save DC 18). The vampire can’t take this action again until the start of its next turn."
      },
      {
        "name": "Umbral Strike",
        "description": "The vampire moves up to half its Speed, and it makes one Grave Strike or Sickening Ray attack."
      }
    ]
  },
  {
    "id": "ddb_venomous_snake_2024",
    "name": "Venomous Snake",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 5,
      "formula": "2d4"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 2,
      "dex": 15,
      "con": 11,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "dex": 2,
      "con": 0,
      "wis": 0
    },
    "senses": "Blindsight 10 ft.; Passive Perception 10",
    "languages": "None",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage plus 3 (1d6) Poison damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_vine_blight_2024",
    "name": "Vine Blight",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Plant",
    "alignment": "Neutral Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 19,
      "formula": "3d8 + 6"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 15,
      "dex": 8,
      "con": 14,
      "int": 5,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 2,
      "con": 2,
      "wis": 0
    },
    "skills": {
      "stealth": 1
    },
    "conditionImmunities": [
      "Deafened"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_constricting_vine",
        "name": "Constricting Vine",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 10 ft. Hit: 6 (1d8 + 2) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). Until the grapple ends, the target takes 4 (1d8) Bludgeoning damage at the start of each of its turns, and the blight can’t make Constricting Vine attacks.",
        "attackBonus": 4,
        "reachFeet": 10,
        "damage": "1d8+2",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_entangling_plants_recharge_5_6_",
        "name": "Entangling Plants (Recharge 5–6)",
        "type": "spell",
        "description": "The blight casts the Entangle spell, using Constitution as the spellcasting ability (spell save DC 12)."
      }
    ]
  },
  {
    "id": "ddb_violet_fungus_2024",
    "name": "Violet Fungus",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Plant",
    "alignment": "Unaligned",
    "armorClass": 5,
    "hitPoints": {
      "average": 18,
      "formula": "4d8"
    },
    "speed": "5 ft.",
    "stats": {
      "str": 3,
      "dex": 1,
      "con": 10,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "savingThrows": {
      "con": 0
    },
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened"
    ],
    "senses": "Blindsight 30 ft.; Passive Perception 6",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The fungus makes two Rotting Touch attacks."
      },
      {
        "id": "act_rotting_touch",
        "name": "Rotting Touch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 10 ft. Hit: 4 (1d8) Necrotic damage.",
        "attackBonus": 2,
        "reachFeet": 10,
        "damage": "1d8",
        "damageType": "Necrotic"
      }
    ]
  },
  {
    "id": "ddb_violet_fungus_necrohulk_2024",
    "name": "Violet Fungus Necrohulk",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Plant",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 123,
      "formula": "13d10 + 52"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 19,
      "dex": 12,
      "con": 18,
      "int": 7,
      "wis": 14,
      "cha": 10
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 4,
      "wis": 2,
      "cha": 0
    },
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened",
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft.; Passive Perception 12",
    "languages": "None",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The necrohulk makes two Rotting Slam attacks."
      },
      {
        "id": "act_rotting_slam",
        "name": "Rotting Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 9 (1d10 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "1d10+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_spore_bomb_recharge_5_6_",
        "name": "Spore Bomb (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 15, each creature in a 20-foot-radius Sphere centered on a point the necrohulk can see within 60 feet. Failure: 28 (8d6) Necrotic damage, and the target has the Poisoned condition until the start of the necrohulk’s next turn. While Poisoned, the target can’t regain Hit Points. Success: Half damage only.",
        "damage": "8d6",
        "damageType": "Necrotic",
        "saveDc": 15,
        "saveStat": "con"
      }
    ],
    "bonusActions": [
      {
        "name": "Absorb Body",
        "description": "Strength Saving Throw: DC 15, one Medium or Small creature the necrohulk can see within 5 feet. Failure: The target is pulled into the necrohulk’s space and becomes grafted to its body. The necrohulk can have only one target grafted at a time."
      }
    ]
  },
  {
    "id": "ddb_vrock_2024",
    "name": "Vrock",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 152,
      "formula": "16d10 + 64"
    },
    "speed": "40 ft., Fly 60 ft.",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 18,
      "int": 8,
      "wis": 13,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 5,
      "con": 4,
      "wis": 4,
      "cha": 2
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 11",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Demonic Restoration",
        "description": "If the vrock dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss."
      },
      {
        "name": "Magic Resistance",
        "description": "The vrock has Advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The vrock makes two Shred attacks."
      },
      {
        "id": "act_shred",
        "name": "Shred",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 10 (2d6 + 3) Piercing damage plus 10 (3d6) Poison damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_spores_recharge_6_",
        "name": "Spores (Recharge 6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 15, each creature in a 20-foot Emanation originating from the vrock. Failure: The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. While Poisoned, the target takes 5 (1d10) Poison damage at the start of each of its turns. Emptying a flask of Holy Water on the target ends the effect early.",
        "damage": "1d10",
        "damageType": "Poison",
        "saveDc": 15,
        "saveStat": "con"
      },
      {
        "id": "act_stunning_screech_1_day_",
        "name": "Stunning Screech (1/Day)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 15, each creature in a 20-foot Emanation originating from the vrock (demons succeed automatically). Failure: 10 (3d6) Thunder damage, and the target has the Stunned condition until the end of the vrock’s next turn.",
        "damage": "3d6",
        "damageType": "Thunder",
        "saveDc": 15,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_vulture_2024",
    "name": "Vulture",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 5,
      "formula": "1d8 + 1"
    },
    "speed": "10 ft., Fly 50 ft.",
    "stats": {
      "str": 7,
      "dex": 10,
      "con": 13,
      "int": 2,
      "wis": 12,
      "cha": 4
    },
    "savingThrows": {
      "dex": 0,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The vulture has Advantage on an attack roll against a creature if at least one of the vulture’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_beak",
        "name": "Beak",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +2 , reach 5 ft. Hit: 2 (1d4) Piercing damage.",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_warhorse_2024",
    "name": "Warhorse",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
    },
    "speed": "60 ft.",
    "stats": {
      "str": 18,
      "dex": 12,
      "con": 13,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 1,
      "wis": 3
    },
    "senses": "Passive Perception 11",
    "languages": "None",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 9 (2d4 + 4) Bludgeoning damage. If the target is a Large or smaller creature and the horse moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 (2d4) Bludgeoning damage and has the Prone condition.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d4+4",
        "damageType": "Bludgeoning"
      }
    ]
  },
  {
    "id": "ddb_warrior_commander_2024",
    "name": "Warrior Commander",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 18,
    "hitPoints": {
      "average": 161,
      "formula": "19d8 + 76"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 21,
      "dex": 20,
      "con": 18,
      "int": 14,
      "wis": 16,
      "cha": 14
    },
    "savingThrows": {
      "str": 9,
      "dex": 9,
      "con": 8,
      "int": 2,
      "wis": 7,
      "cha": 2
    },
    "skills": {
      "athletics": 9,
      "insight": 7,
      "perception": 7
    },
    "senses": "Passive Perception 17",
    "languages": "Common plus one other language",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The warrior makes three attacks, using Greatsword or Longbow in any combination."
      },
      {
        "id": "act_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 5 ft. Hit: 19 (4d6 + 5) Slashing damage. The warrior also creates one of the following effects:",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "4d6+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_sap",
        "name": "Sap",
        "type": "ability",
        "description": "The target has Disadvantage on its next attack roll before the start of the warrior’s next turn."
      },
      {
        "id": "act_maneuver",
        "name": "Maneuver",
        "type": "ability",
        "description": "One ally who can see or hear the warrior can take a Reaction to move up to half the ally’s Speed without provoking Opportunity Attacks ."
      },
      {
        "id": "act_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +9 , range 150/600 ft. Hit: 18 (3d8 + 5) Piercing damage, and the target’s Speed decreases by 10 feet until the end of the target’s next turn.",
        "attackBonus": 9,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "3d8+5",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Tactical Charge",
        "description": "The warrior moves up to half its Speed straight toward an enemy it can see without provoking Opportunity Attacks ."
      }
    ],
    "reactions": [
      {
        "name": "Counterattack",
        "description": "Trigger: The warrior is hit by an attack roll. Response: The warrior adds 4 to its AC against that attack, possibly causing it to miss. On a miss, the warrior can make one Greatsword or Longbow attack against the attacker."
      }
    ]
  },
  {
    "id": "ddb_warrior_infantry_2024",
    "name": "Warrior Infantry",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 9,
      "formula": "2d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 13,
      "dex": 11,
      "con": 11,
      "int": 8,
      "wis": 11,
      "cha": 8
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 0,
      "wis": 0
    },
    "senses": "Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The warrior has Advantage on an attack roll against a creature if at least one of the warrior’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +3 , reach 5 ft. or range 20/60 ft. Hit: 4 (1d6 + 1) Piercing damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6+1",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_warrior_veteran_2024",
    "name": "Warrior Veteran",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Humanoid",
    "alignment": "Neutral",
    "armorClass": 17,
    "hitPoints": {
      "average": 65,
      "formula": "10d8 + 20"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 13,
      "con": 14,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 2,
      "int": 0,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "athletics": 5,
      "perception": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Common plus one other language",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The warrior makes two Greatsword or Heavy Crossbow attacks."
      },
      {
        "id": "act_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_heavy_crossbow",
        "name": "Heavy Crossbow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +3 , range 100/400 ft. Hit: 12 (2d10 + 1) Piercing damage.",
        "attackBonus": 3,
        "rangeFeet": 100,
        "rangeLongFeet": 400,
        "damage": "2d10+1",
        "damageType": "Piercing"
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "Trigger: The warrior is hit by a melee attack roll while holding a weapon. Response: The warrior adds 2 to its AC against that attack, possibly causing it to miss."
      }
    ]
  },
  {
    "id": "ddb_water_elemental_2024",
    "name": "Water Elemental",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 114,
      "formula": "12d10 + 48"
    },
    "speed": "30 ft., Swim 90 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 18,
      "int": 5,
      "wis": 10,
      "cha": 8
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 4,
      "wis": 0
    },
    "damageResistances": [
      "Acid",
      "Fire"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 10",
    "languages": "Primordial (Aquan)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Freeze",
        "description": "If the elemental takes Cold damage, its Speed decreases by 20 feet until the end of its next turn."
      },
      {
        "name": "Water Form",
        "description": "The elemental can enter an enemy’s space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elemental makes two Slam attacks."
      },
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 13 (2d8 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Bludgeoning"
      },
      {
        "id": "act_whelm_recharge_4_6_",
        "name": "Whelm (Recharge 4–6)",
        "type": "ability",
        "description": "Strength Saving Throw: DC 15, each creature in the elemental’s space. Failure: 22 (4d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). Until the grapple ends, the target has the Restrained condition, is suffocating unless it can breathe water, and takes 9 (2d8) Bludgeoning damage at the start of each of the elemental’s turns. The elemental can grapple one Large creature or up to two Medium or smaller creatures at a time with Whelm. As an action, a creature within 5 feet of the elemental can pull a creature out of it by succeeding on a DC 14 Strength ( Athletics ) check. Success: Half damage only.",
        "damage": "4d8+4",
        "damageType": "Bludgeoning",
        "saveDc": 15,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_weasel_2024",
    "name": "Weasel",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 − 1"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 3,
      "dex": 16,
      "con": 8,
      "int": 2,
      "wis": 12,
      "cha": 3
    },
    "savingThrows": {
      "dex": 3,
      "wis": 1
    },
    "skills": {
      "acrobatics": 5,
      "perception": 3,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "None",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 1 Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5
      }
    ]
  },
  {
    "id": "ddb_werebear_2024",
    "name": "Werebear",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Monstrosity",
    "subtype": "Lycanthrope",
    "alignment": "Neutral Good",
    "armorClass": 15,
    "hitPoints": {
      "average": 135,
      "formula": "18d8 + 54"
    },
    "speed": "30 ft., 40 ft. (bear form only) , Climb 30 ft. (bear form only)",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 17,
      "int": 11,
      "wis": 12,
      "cha": 12
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 3,
      "int": 0,
      "wis": 1,
      "cha": 1
    },
    "skills": {
      "perception": 7
    },
    "senses": "Darkvision 60 ft.; Passive Perception 17",
    "languages": "Common (can’t speak in bear form)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The werebear makes two attacks, using Handaxe or Rend in any combination. It can replace one attack with a Bite attack."
      },
      {
        "id": "act_bite_bear_or_hybrid_form_only_",
        "name": "Bite (Bear or Hybrid Form Only)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 17 (2d12 + 4) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. Constitution Saving Throw: DC 14. Failure: The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Werebear under the DM’s control and has 10 Hit Points. Success: The target is immune to this werebear’s curse for 24 hours.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d12+4",
        "damageType": "Piercing",
        "saveDc": 14,
        "saveStat": "con"
      },
      {
        "id": "act_handaxe_humanoid_or_hybrid_form_only_",
        "name": "Handaxe (Humanoid or Hybrid Form Only)",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +7 , reach 5 ft or range 20/60 ft. Hit: 14 (3d6 + 4) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "3d6+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_rend_bear_or_hybrid_form_only_",
        "name": "Rend (Bear or Hybrid Form Only)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 13 (2d8 + 4) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Shape-Shift",
        "description": "The werebear shape-shifts into a Large bear-humanoid hybrid form or a Large bear, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_wereboar_2024",
    "name": "Wereboar",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Monstrosity",
    "subtype": "Lycanthrope",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 97,
      "formula": "15d8 + 30"
    },
    "speed": "30 ft., 40 ft. (boar form only)",
    "stats": {
      "str": 17,
      "dex": 10,
      "con": 15,
      "int": 10,
      "wis": 11,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 2,
      "int": 0,
      "wis": 0
    },
    "skills": {
      "perception": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Common (can’t speak in boar form)",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The wereboar makes two attacks, using Javelin or Tusk in any combination. It can replace one attack with a Gore attack."
      },
      {
        "id": "act_gore_boar_or_hybrid_form_only_",
        "name": "Gore (Boar or Hybrid Form Only)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 12 (2d8 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. Constitution Saving Throw: DC 12. Failure: The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Wereboar under the DM’s control and has 10 Hit Points. Success: The target is immune to this wereboar’s curse for 24 hours.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d8+3",
        "damageType": "Piercing",
        "saveDc": 12,
        "saveStat": "con"
      },
      {
        "id": "act_javelin_humanoid_or_hybrid_form_only_",
        "name": "Javelin (Humanoid or Hybrid Form Only)",
        "type": "ranged_attack",
        "description": "Melee or Ranged Attack Roll: +5 , reach 5 ft. or range 30/120 ft. Hit: 13 (3d6 + 3) Piercing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "3d6+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_tusk_boar_or_hybrid_form_only_",
        "name": "Tusk (Boar or Hybrid Form Only)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Piercing damage. If the target is a Medium or smaller creature and the wereboar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and has the Prone condition.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Shape-Shift",
        "description": "The wereboar shape-shifts into a Medium boar-humanoid hybrid or a Small boar, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_wererat_2024",
    "name": "Wererat",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Monstrosity",
    "subtype": "Lycanthrope",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 60,
      "formula": "11d8 + 11"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 10,
      "dex": 16,
      "con": 12,
      "int": 11,
      "wis": 10,
      "cha": 8
    },
    "savingThrows": {
      "str": 0,
      "dex": 3,
      "con": 1,
      "int": 0,
      "wis": 0
    },
    "skills": {
      "perception": 4,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Common (can’t speak in rat form)",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The wererat makes two attacks, using Scratch or Hand Crossbow in any combination. It can replace one attack with a Bite attack."
      },
      {
        "id": "act_bite_rat_or_hybrid_form_only_",
        "name": "Bite (Rat or Hybrid Form Only)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 8 (2d4 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. Constitution Saving Throw: DC 11. Failure: The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Wererat under the DM’s control and has 10 Hit Points. Success: The target is immune to this wererat’s curse for 24 hours.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d4+3",
        "damageType": "Piercing",
        "saveDc": 11,
        "saveStat": "con"
      },
      {
        "id": "act_scratch",
        "name": "Scratch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 6 (1d6 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_hand_crossbow_humanoid_or_hybrid_form_only_",
        "name": "Hand Crossbow (Humanoid or Hybrid Form Only)",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +5 , range 30/120 ft. Hit: 6 (1d6 + 3) Piercing damage.",
        "attackBonus": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+3",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Shape-Shift",
        "description": "The wererat shape-shifts into a Medium rat-humanoid hybrid or a Small rat, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_weretiger_2024",
    "name": "Weretiger",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Monstrosity",
    "subtype": "Lycanthrope",
    "alignment": "Neutral",
    "armorClass": 12,
    "hitPoints": {
      "average": 120,
      "formula": "16d8 + 48"
    },
    "speed": "30 ft., 40 ft. (tiger form only)",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 16,
      "int": 10,
      "wis": 13,
      "cha": 11
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 3,
      "int": 0,
      "wis": 1,
      "cha": 0
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "Common (can’t speak in tiger form)",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The weretiger makes two attacks, using Scratch or Longbow in any combination. It can replace one attack with a Bite attack."
      },
      {
        "id": "act_bite_tiger_or_hybrid_form_only_",
        "name": "Bite (Tiger or Hybrid Form Only)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 12 (2d8 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Weretiger under the DM’s control and has 10 Hit Points. Success: The target is immune to this weretiger’s curse for 24 hours.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d8+3",
        "damageType": "Piercing",
        "saveDc": 13,
        "saveStat": "con"
      },
      {
        "id": "act_scratch",
        "name": "Scratch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_longbow_humanoid_or_hybrid_form_only_",
        "name": "Longbow (Humanoid or Hybrid Form Only)",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 150/600 ft. Hit: 11 (2d8 + 2) Piercing damage.",
        "attackBonus": 4,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "2d8+2",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Prowl (Tiger or Hybrid Form Only)",
        "description": "The weretiger moves up to its Speed without provoking Opportunity Attacks . At the end of this movement, the weretiger can take the Hide action."
      },
      {
        "name": "Shape-Shift",
        "description": "The weretiger shape-shifts into a Large tiger-humanoid hybrid or a Large tiger, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_werewolf_2024",
    "name": "Werewolf",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Monstrosity",
    "subtype": "Lycanthrope",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "hitPoints": {
      "average": 71,
      "formula": "11d8 + 22"
    },
    "speed": "30 ft., 40 ft. (wolf form only)",
    "stats": {
      "str": 16,
      "dex": 14,
      "con": 14,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "int": 0,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "perception": 4,
      "stealth": 4
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Common (can’t speak in wolf form)",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The werewolf has Advantage on an attack roll against a creature if at least one of the werewolf’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The werewolf makes two attacks, using Scratch or Longbow in any combination. It can replace one attack with a Bite attack."
      },
      {
        "id": "act_bite_wolf_or_hybrid_form_only_",
        "name": "Bite (Wolf or Hybrid Form Only)",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 12 (2d8 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. Constitution Saving Throw: DC 12. Failure: The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Werewolf under the DM’s control and has 10 Hit Points. Success: The target is immune to this werewolf’s curse for 24 hours.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d8+3",
        "damageType": "Piercing",
        "saveDc": 12,
        "saveStat": "con"
      },
      {
        "id": "act_scratch",
        "name": "Scratch",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage.",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Slashing"
      },
      {
        "id": "act_longbow_humanoid_or_hybrid_form_only_",
        "name": "Longbow (Humanoid or Hybrid Form Only)",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 150/600 ft. Hit: 11 (2d8 + 2) Piercing damage.",
        "attackBonus": 4,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "2d8+2",
        "damageType": "Piercing"
      }
    ],
    "bonusActions": [
      {
        "name": "Shape-Shift",
        "description": "The werewolf shape-shifts into a Large wolf-humanoid hybrid or a Medium wolf, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed."
      }
    ]
  },
  {
    "id": "ddb_white_dragon_wyrmling_2024",
    "name": "White Dragon Wyrmling",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "hitPoints": {
      "average": 32,
      "formula": "5d8 + 10"
    },
    "speed": "30 ft., Burrow 15 ft., Fly 60 ft., Swim 30 ft.",
    "stats": {
      "str": 14,
      "dex": 10,
      "con": 14,
      "int": 5,
      "wis": 10,
      "cha": 11
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 2,
      "wis": 2,
      "cha": 0
    },
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft.; Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, Difficult Terrain composed of ice or snow doesn’t cost it extra movement."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes two Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Slashing damage plus 2 (1d4) Cold damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: 22 (5d8) Cold damage. Success: Half damage.",
        "damage": "5d8",
        "damageType": "Cold",
        "saveDc": 12,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_wight_2024",
    "name": "Wight",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 14,
    "hitPoints": {
      "average": 82,
      "formula": "11d8 + 33"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 16,
      "int": 10,
      "wis": 13,
      "cha": 15
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 3,
      "int": 0,
      "wis": 1,
      "cha": 2
    },
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "damageResistances": [
      "Necrotic"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "languages": "Common plus one other language",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the wight has Disadvantage on ability checks and attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The wight makes two attacks, using Necrotic Sword or Necrotic Bow in any combination. It can replace one attack with a use of Life Drain."
      },
      {
        "id": "act_necrotic_sword",
        "name": "Necrotic Sword",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 6 (1d8 + 2) Slashing damage plus 4 (1d8) Necrotic damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Slashing"
      },
      {
        "id": "act_necrotic_bow",
        "name": "Necrotic Bow",
        "type": "ranged_attack",
        "description": "Ranged Attack Roll: +4 , range 150/600 ft. Hit: 6 (1d8 + 2) Piercing damage plus 4 (1d8) Necrotic damage.",
        "attackBonus": 4,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+2",
        "damageType": "Piercing"
      },
      {
        "id": "act_life_drain",
        "name": "Life Drain",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 13, one creature within 5 feet. Failure: 6 (1d8 + 2) Necrotic damage, and the target’s Hit Point maximum decreases by an amount equal to the damage taken.",
        "damage": "1d8+2",
        "damageType": "Necrotic",
        "saveDc": 13,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_will_o_wisp_2024",
    "name": "Will-o’-Wisp",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Tiny",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 27,
      "formula": "11d4"
    },
    "speed": "5 ft., Fly 50 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 28,
      "con": 10,
      "int": 13,
      "wis": 14,
      "cha": 11
    },
    "savingThrows": {
      "dex": 9,
      "con": 0,
      "int": 1,
      "wis": 2,
      "cha": 0
    },
    "damageResistances": [
      "Acid",
      "Bludgeoning",
      "Cold",
      "Fire",
      "Necrotic",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Lightning",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 120 ft.; Passive Perception 12",
    "languages": "Common plus one other language",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ephemeral",
        "description": "The wisp can’t wear or carry anything."
      },
      {
        "name": "Illumination",
        "description": "The wisp sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The wisp can move through other creatures and objects as if they were Difficult Terrain . It takes 5 (1d10) Force damage if it ends its turn inside an object."
      }
    ],
    "actions": [
      {
        "id": "act_shock",
        "name": "Shock",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 11 (2d8 + 2) Lightning damage.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d8+2",
        "damageType": "Lightning"
      }
    ],
    "bonusActions": [
      {
        "name": "Consume Life",
        "description": "Constitution Saving Throw: DC 10, one living creature the wisp can see within 5 feet that has 0 Hit Points. Failure: The target dies, and the wisp regains 10 (3d6) Hit Points."
      },
      {
        "name": "Vanish",
        "description": "The wisp and its light have the Invisible condition until the wisp’s Concentration ends on this effect, which ends early immediately after the wisp makes an attack roll or uses Consume Life."
      }
    ]
  },
  {
    "id": "ddb_winter_wolf_2024",
    "name": "Winter Wolf",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 75,
      "formula": "10d10 + 20"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 18,
      "dex": 13,
      "con": 14,
      "int": 7,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 2,
      "wis": 1
    },
    "skills": {
      "perception": 5,
      "stealth": 5
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Passive Perception 15",
    "languages": "Common, Giant",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The wolf has Advantage on an attack roll against a creature if at least one of the wolf’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: 18 (4d8) Cold damage. Success: Half damage.",
        "damage": "4d8",
        "damageType": "Cold",
        "saveDc": 12,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_wolf_2024",
    "name": "Wolf",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 14,
      "dex": 15,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 1,
      "wis": 1
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "senses": "Darkvision 60 ft.; Passive Perception 15",
    "languages": "None",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The wolf has Advantage on attack rolls against a creature if at least one of the wolf’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition."
      }
    ],
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +4 , reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition.",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_worg_2024",
    "name": "Worg",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Fey",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 26,
      "formula": "4d10 + 4"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 16,
      "dex": 13,
      "con": 13,
      "int": 7,
      "wis": 11,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 1,
      "wis": 0
    },
    "skills": {
      "perception": 4
    },
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "languages": "Goblin, Worg",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +5 , reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage, and the next attack roll made against the target before the start of the worg’s next turn has Advantage .",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_wraith_2024",
    "name": "Wraith",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Small",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 67,
      "formula": "9d8 + 27"
    },
    "speed": "5 ft., Fly 60 ft. (hover)",
    "stats": {
      "str": 6,
      "dex": 16,
      "con": 16,
      "int": 12,
      "wis": 14,
      "cha": 15
    },
    "savingThrows": {
      "dex": 3,
      "con": 3,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "damageResistances": [
      "Acid",
      "Bludgeoning",
      "Cold",
      "Fire",
      "Piercing",
      "Slashing"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 12",
    "languages": "Common plus two other languages",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The wraith can move through other creatures and objects as if they were Difficult Terrain . It takes 5 (1d10) Force damage if it ends its turn inside an object."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the wraith has Disadvantage on ability checks and attack rolls."
      }
    ],
    "actions": [
      {
        "id": "act_life_drain",
        "name": "Life Drain",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 21 (4d8 + 3) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the damage taken.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "4d8+3",
        "damageType": "Necrotic"
      },
      {
        "id": "act_create_specter",
        "name": "Create Specter",
        "type": "ability",
        "description": "The wraith targets a Humanoid corpse within 10 feet of itself that has been dead for no longer than 1 minute. The target’s spirit rises as a Specter in the space of its corpse or in the nearest unoccupied space. The specter is under the wraith’s control. The wraith can have no more than seven specters under its control at a time."
      }
    ]
  },
  {
    "id": "ddb_wyvern_2024",
    "name": "Wyvern",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 127,
      "formula": "15d10 + 45"
    },
    "speed": "30 ft., Fly 80 ft.",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 16,
      "int": 5,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 3,
      "wis": 1
    },
    "skills": {
      "perception": 4
    },
    "senses": "Darkvision 120 ft.; Passive Perception 14",
    "languages": "None",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The wyvern makes one Bite attack and one Sting attack."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 5 ft. Hit: 13 (2d8 + 4) Piercing damage.",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Piercing"
      },
      {
        "id": "act_sting",
        "name": "Sting",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 11 (2d6 + 4) Piercing damage plus 24 (7d6) Poison damage, and the target has the Poisoned condition until the start of the wyvern’s next turn.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "Piercing"
      }
    ]
  },
  {
    "id": "ddb_xorn_2024",
    "name": "Xorn",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 19,
    "hitPoints": {
      "average": 84,
      "formula": "8d8 + 48"
    },
    "speed": "20 ft., Burrow 20 ft.",
    "stats": {
      "str": 17,
      "dex": 10,
      "con": 22,
      "int": 11,
      "wis": 10,
      "cha": 11
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 6,
      "int": 0,
      "wis": 0,
      "cha": 0
    },
    "skills": {
      "perception": 6,
      "stealth": 6
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Tremorsense 60 ft.; Passive Perception 16",
    "languages": "Primordial (Terran)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Earth Glide",
        "description": "The xorn can burrow through nonmagical, unworked earth and stone. While doing so, the xorn doesn’t disturb the material it moves through."
      },
      {
        "name": "Treasure Sense",
        "description": "The xorn can pinpoint the location of precious metals and stones within 60 feet of itself."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The xorn makes one Bite attack and three Claw attacks."
      },
      {
        "id": "act_bite",
        "name": "Bite",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 17 (4d6 + 3) Piercing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "4d6+3",
        "damageType": "Piercing"
      },
      {
        "id": "act_claw",
        "name": "Claw",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +6 , reach 5 ft. Hit: 8 (1d10 + 3) Slashing damage.",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "Slashing"
      }
    ],
    "bonusActions": [
      {
        "name": "Charge",
        "description": "The xorn moves up to its Speed or Burrow Speed straight toward an enemy it can sense."
      }
    ]
  },
  {
    "id": "ddb_young_black_dragon_2024",
    "name": "Young Black Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 127,
      "formula": "15d10 + 45"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 19,
      "dex": 14,
      "con": 17,
      "int": 12,
      "wis": 11,
      "cha": 15
    },
    "savingThrows": {
      "str": 4,
      "dex": 5,
      "con": 3,
      "int": 1,
      "wis": 3,
      "cha": 2
    },
    "skills": {
      "perception": 6,
      "stealth": 5
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 16",
    "languages": "Common, Draconic",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 9 (2d4 + 4) Slashing damage plus 3 (1d6) Acid damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d4+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_breath_recharge_5_6_",
        "name": "Acid Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 14, each creature in a 30-foot-long, 5-foot-wide Line. Failure: 49 (14d6) Acid damage. Success: Half damage.",
        "damage": "14d6",
        "damageType": "Acid",
        "saveDc": 14,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_young_blue_dragon_2024",
    "name": "Young Blue Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 152,
      "formula": "16d10 + 64"
    },
    "speed": "40 ft., Burrow 20 ft., Fly 80 ft.",
    "stats": {
      "str": 21,
      "dex": 10,
      "con": 19,
      "int": 14,
      "wis": 13,
      "cha": 17
    },
    "savingThrows": {
      "str": 5,
      "dex": 4,
      "con": 4,
      "int": 2,
      "wis": 5,
      "cha": 3
    },
    "skills": {
      "perception": 9,
      "stealth": 4
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 19",
    "languages": "Common, Draconic",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +9 , reach 10 ft. Hit: 12 (2d6 + 5) Slashing damage plus 5 (1d10) Lightning damage.",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "2d6+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 16, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 55 (10d10) Lightning damage. Success: Half damage.",
        "damage": "10d10",
        "damageType": "Lightning",
        "saveDc": 16,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_young_brass_dragon_2024",
    "name": "Young Brass Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Chaotic Good",
    "armorClass": 17,
    "hitPoints": {
      "average": 110,
      "formula": "13d10 + 39"
    },
    "speed": "40 ft., Burrow 20 ft., Fly 80 ft.",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 17,
      "int": 12,
      "wis": 11,
      "cha": 15
    },
    "savingThrows": {
      "str": 4,
      "dex": 3,
      "con": 3,
      "int": 1,
      "wis": 3,
      "cha": 2
    },
    "skills": {
      "perception": 6,
      "persuasion": 5,
      "stealth": 3
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 16",
    "languages": "Common, Draconic",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace two attacks with a use of Sleep Breath."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 15 (2d10 + 4) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 14, each creature in a 40-foot-long, 5-foot-wide Line. Failure: 38 (11d6) Fire damage. Success: Half damage.",
        "damage": "11d6",
        "damageType": "Fire",
        "saveDc": 14,
        "saveStat": "dex"
      },
      {
        "id": "act_sleep_breath",
        "name": "Sleep Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 14, each creature in a 30-foot Cone. First Failure: The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. Second Failure: The target has the Unconscious condition for 1 minute. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.",
        "saveDc": 14,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_young_bronze_dragon_2024",
    "name": "Young Bronze Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 17,
    "hitPoints": {
      "average": 142,
      "formula": "15d10 + 60"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 21,
      "dex": 10,
      "con": 19,
      "int": 14,
      "wis": 13,
      "cha": 17
    },
    "savingThrows": {
      "str": 5,
      "dex": 3,
      "con": 4,
      "int": 2,
      "wis": 4,
      "cha": 3
    },
    "skills": {
      "insight": 4,
      "perception": 7,
      "stealth": 3
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 17",
    "languages": "Common, Draconic",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Repulsion Breath."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +8 , reach 10 ft. Hit: 16 (2d10 + 5) Slashing damage.",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d10+5",
        "damageType": "Slashing"
      },
      {
        "id": "act_lightning_breath_recharge_5_6_",
        "name": "Lightning Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 15, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 49 (9d10) Lightning damage. Success: Half damage.",
        "damage": "9d10",
        "damageType": "Lightning",
        "saveDc": 15,
        "saveStat": "dex"
      },
      {
        "id": "act_repulsion_breath",
        "name": "Repulsion Breath",
        "type": "ability",
        "description": "Strength Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: The target is pushed up to 40 feet straight away from the dragon and has the Prone condition.",
        "saveDc": 15,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_young_copper_dragon_2024",
    "name": "Young Copper Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Chaotic Good",
    "armorClass": 17,
    "hitPoints": {
      "average": 119,
      "formula": "14d10 + 42"
    },
    "speed": "40 ft., Climb 40 ft., Fly 80 ft.",
    "stats": {
      "str": 19,
      "dex": 12,
      "con": 17,
      "int": 16,
      "wis": 13,
      "cha": 15
    },
    "savingThrows": {
      "str": 4,
      "dex": 4,
      "con": 3,
      "int": 3,
      "wis": 4,
      "cha": 2
    },
    "skills": {
      "deception": 5,
      "perception": 7,
      "stealth": 4
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 17",
    "languages": "Common, Draconic",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Slowing Breath."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 15 (2d10 + 4) Slashing damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_acid_breath_recharge_5_6_",
        "name": "Acid Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 14, each creature in a 40-foot-long, 5-foot-wide Line. Failure: 40 (9d8) Acid damage. Success: Half damage.",
        "damage": "9d8",
        "damageType": "Acid",
        "saveDc": 14,
        "saveStat": "dex"
      },
      {
        "id": "act_slowing_breath",
        "name": "Slowing Breath",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 14, each creature in a 30-foot Cone. Failure: The target can’t take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. This effect lasts until the end of its next turn.",
        "saveDc": 14,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_young_gold_dragon_2024",
    "name": "Young Gold Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 18,
    "hitPoints": {
      "average": 178,
      "formula": "17d10 + 85"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 23,
      "dex": 14,
      "con": 21,
      "int": 16,
      "wis": 13,
      "cha": 20
    },
    "savingThrows": {
      "str": 6,
      "dex": 6,
      "con": 5,
      "int": 3,
      "wis": 5,
      "cha": 5
    },
    "skills": {
      "insight": 5,
      "perception": 9,
      "persuasion": 9,
      "stealth": 6
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 19",
    "languages": "Common, Draconic",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Weakening Breath."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 17 (2d10 + 6) Slashing damage.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 55 (10d10) Fire damage. Success: Half damage.",
        "damage": "10d10",
        "damageType": "Fire",
        "saveDc": 17,
        "saveStat": "dex"
      },
      {
        "id": "act_weakening_breath",
        "name": "Weakening Breath",
        "type": "ability",
        "description": "Strength Saving Throw: DC 17, each creature that isn’t currently affected by this breath in a 30-foot Cone. Failure: The target has Disadvantage on Strength-based D20 Tests and subtracts 3 (1d6) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        "saveDc": 17,
        "saveStat": "str"
      }
    ]
  },
  {
    "id": "ddb_young_green_dragon_2024",
    "name": "Young Green Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 136,
      "formula": "16d10 + 48"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 19,
      "dex": 12,
      "con": 17,
      "int": 16,
      "wis": 13,
      "cha": 15
    },
    "savingThrows": {
      "str": 4,
      "dex": 4,
      "con": 3,
      "int": 3,
      "wis": 4,
      "cha": 2
    },
    "skills": {
      "deception": 5,
      "perception": 7,
      "stealth": 4
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 17",
    "languages": "Common, Draconic",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 11 (2d6 + 4) Slashing damage plus 7 (2d6) Poison damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_poison_breath_recharge_5_6_",
        "name": "Poison Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 14, each creature in a 30-foot Cone. Failure: 42 (12d6) Poison damage. Success: Half damage.",
        "damage": "12d6",
        "damageType": "Poison",
        "saveDc": 14,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_young_red_dragon_2024",
    "name": "Young Red Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "hitPoints": {
      "average": 178,
      "formula": "17d10 + 85"
    },
    "speed": "40 ft., Climb 40 ft., Fly 80 ft.",
    "stats": {
      "str": 23,
      "dex": 10,
      "con": 21,
      "int": 14,
      "wis": 11,
      "cha": 19
    },
    "savingThrows": {
      "str": 6,
      "dex": 4,
      "con": 5,
      "int": 2,
      "wis": 4,
      "cha": 4
    },
    "skills": {
      "perception": 8,
      "stealth": 4
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 18",
    "languages": "Common, Draconic",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 13 (2d6 + 6) Slashing damage plus 3 (1d6) Fire damage.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d6+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_fire_breath_recharge_5_6_",
        "name": "Fire Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Dexterity Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 56 (16d6) Fire damage. Success: Half damage.",
        "damage": "16d6",
        "damageType": "Fire",
        "saveDc": 17,
        "saveStat": "dex"
      }
    ]
  },
  {
    "id": "ddb_young_silver_dragon_2024",
    "name": "Young Silver Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Metallic",
    "alignment": "Lawful Good",
    "armorClass": 18,
    "hitPoints": {
      "average": 168,
      "formula": "16d10 + 80"
    },
    "speed": "40 ft., Fly 80 ft.",
    "stats": {
      "str": 23,
      "dex": 10,
      "con": 21,
      "int": 14,
      "wis": 11,
      "cha": 19
    },
    "savingThrows": {
      "str": 6,
      "dex": 4,
      "con": 5,
      "int": 2,
      "wis": 4,
      "cha": 4
    },
    "skills": {
      "history": 6,
      "perception": 8,
      "stealth": 4
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 18",
    "languages": "Common, Draconic",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks. It can replace one attack with a use of Paralyzing Breath."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +10 , reach 10 ft. Hit: 15 (2d8 + 6) Slashing damage.",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d8+6",
        "damageType": "Slashing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 49 (11d8) Cold damage. Success: Half damage.",
        "damage": "11d8",
        "damageType": "Cold",
        "saveDc": 17,
        "saveStat": "con"
      },
      {
        "id": "act_paralyzing_breath",
        "name": "Paralyzing Breath",
        "type": "ability",
        "description": "Constitution Saving Throw : DC 17, each creature in a 30-foot Cone. First Failure: The target has the Incapacitated condition until the end of its next turn, when it repeats the save. Second Failure: The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
      }
    ]
  },
  {
    "id": "ddb_young_white_dragon_2024",
    "name": "Young White Dragon",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Large",
    "type": "Dragon",
    "subtype": "Chromatic",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "hitPoints": {
      "average": 123,
      "formula": "13d10 + 52"
    },
    "speed": "40 ft., Burrow 20 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 18,
      "dex": 10,
      "con": 18,
      "int": 6,
      "wis": 11,
      "cha": 12
    },
    "savingThrows": {
      "str": 4,
      "dex": 3,
      "con": 4,
      "wis": 3,
      "cha": 1
    },
    "skills": {
      "perception": 6,
      "stealth": 3
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft.; Passive Perception 16",
    "languages": "Common, Draconic",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, Difficult Terrain composed of ice or snow doesn’t cost it extra movement."
      }
    ],
    "actions": [
      {
        "id": "act_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three Rend attacks."
      },
      {
        "id": "act_rend",
        "name": "Rend",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +7 , reach 10 ft. Hit: 9 (2d4 + 4) Slashing damage plus 2 (1d4) Cold damage.",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d4+4",
        "damageType": "Slashing"
      },
      {
        "id": "act_cold_breath_recharge_5_6_",
        "name": "Cold Breath (Recharge 5–6)",
        "type": "ability",
        "description": "Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 40 (9d8) Cold damage. Success: Half damage.",
        "damage": "9d8",
        "damageType": "Cold",
        "saveDc": 15,
        "saveStat": "con"
      }
    ]
  },
  {
    "id": "ddb_zombie_2024",
    "name": "Zombie",
    "source": "Monster Manual",
    "edition": "2024",
    "isLegacy": false,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 8,
    "hitPoints": {
      "average": 15,
      "formula": "2d8 + 6"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 13,
      "dex": 6,
      "con": 16,
      "int": 3,
      "wis": 6,
      "cha": 5
    },
    "savingThrows": {
      "str": 1,
      "con": 3,
      "wis": 0
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft.; Passive Perception 8",
    "languages": "Understands Common plus one other language but can’t speak",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead."
      }
    ],
    "actions": [
      {
        "id": "act_slam",
        "name": "Slam",
        "type": "melee_attack",
        "description": "Melee Attack Roll: +3 , reach 5 ft. Hit: 5 (1d8 + 1) Bludgeoning damage.",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d8+1",
        "damageType": "Bludgeoning"
      }
    ]
  }
];
