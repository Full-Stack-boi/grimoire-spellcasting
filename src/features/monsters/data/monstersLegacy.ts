import type { MonsterStatblock } from "../domain/types";

export const MONSTERS_LEGACY: MonsterStatblock[] = [
  {
    "id": "aboleth_legacy",
    "name": "Aboleth",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 135,
      "formula": "18d10+36"
    },
    "speed": "10 ft., swim 40 ft.",
    "stats": {
      "str": 21,
      "dex": 9,
      "con": 15,
      "int": 18,
      "wis": 15,
      "cha": 18
    },
    "savingThrows": {
      "con": 6,
      "int": 8,
      "wis": 6
    },
    "skills": {
      "history": 12,
      "perception": 10
    },
    "senses": "Darkvision 120 ft., Passive Perception 20",
    "languages": "Deep Speech, Telepathy 120 ft.",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The aboleth can breathe air and water."
      },
      {
        "name": "Mucous Cloud",
        "description": "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 ft. must make a DC 14 Constitution saving throw or become diseased."
      },
      {
        "name": "Probing Telepathy",
        "description": "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The aboleth makes three tentacle attacks."
      },
      {
        "id": "tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "2d6+5",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft. Hit: 12 (2d6 + 5) bludgeoning. DC 14 CON save or diseased."
      },
      {
        "id": "tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft. Hit: 15 (3d6 + 5) bludgeoning."
      },
      {
        "id": "enslave",
        "name": "Enslave (3/Day)",
        "type": "ability",
        "saveDc": 14,
        "saveStat": "wis",
        "description": "The aboleth targets one creature it can see within 30 ft. Target must make a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or is on a different plane."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The aboleth makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Swipe",
        "description": "The aboleth makes one tail attack."
      },
      {
        "name": "Psychic Drain (Costs 2 Actions)",
        "description": "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage dealt."
      }
    ]
  },
  {
    "id": "ddb_acolyte_legacy",
    "name": "Acolyte",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 10,
    "hitPoints": {
      "average": 9,
      "formula": "2d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 10,
      "con": 10,
      "int": 10,
      "wis": 14,
      "cha": 11
    },
    "skills": {
      "medicine": 4,
      "religion": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Any one language (usually Common)",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The acolyte has following cleric spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_club",
        "name": "Club",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_adult_black_dragon_legacy",
    "name": "Adult Black Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "armorDesc": "natural armor",
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
      "cha": 17
    },
    "skills": {
      "perception": 11,
      "stealth": 7
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "14",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 15,
        "damage": "2d8+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_acid_breath__recharge_5_6__",
        "name": "Acid Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "12d8",
        "damageType": "acid",
        "description": "Acid Breath (Recharge 5–6) . The dragon exhales acid in a 60-­foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_blue_dragon_legacy",
    "name": "Adult Blue Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "armorClass": 19,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 225,
      "formula": "18d12 + 108"
    },
    "speed": "40 ft., Burrow 30 ft., Fly 80 ft.",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 23,
      "int": 16,
      "wis": 15,
      "cha": 19
    },
    "skills": {
      "perception": 12,
      "stealth": 5
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22",
    "languages": "Common, Draconic",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "2d10+7",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage plus 5 (1d10) lightning damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 5,
        "damage": "2d6+7",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 15,
        "damage": "2d8+7",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_lightning_breath__recharge_5_6__",
        "name": "Lightning Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "12d10",
        "damageType": "lightning",
        "description": "Lightning Breath (Recharge 5–6) . The dragon exhales lightning in a 90-­foot line that is 5 feet wide. Each creature in that line must make a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_brass_dragon_legacy",
    "name": "Adult Brass Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "skills": {
      "history": 7,
      "perception": 11,
      "persuasion": 8,
      "stealth": 5
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 15,
        "damage": "2d8+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_fire_breath",
        "name": "Fire Breath",
        "type": "ability",
        "damage": "13d6",
        "damageType": "fire",
        "description": "The dragon exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 45 (13d6) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_sleep_breath",
        "name": "Sleep Breath",
        "type": "ability",
        "description": "The dragon exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_bronze_dragon_legacy",
    "name": "Adult Bronze Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "armorDesc": "natural armor",
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
      "cha": 19
    },
    "skills": {
      "insight": 7,
      "perception": 12,
      "stealth": 5
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22",
    "languages": "Common, Draconic",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "2d10+7",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 5,
        "damage": "2d6+7",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 15,
        "damage": "2d8+7",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_lightning_breath",
        "name": "Lightning Breath",
        "type": "ability",
        "damage": "12d10",
        "damageType": "lightning",
        "description": "The dragon exhales lightning in a 90- foot line that is 5 feet wide. Each creature in that line must make a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_repulsion_breath",
        "name": "Repulsion Breath",
        "type": "ability",
        "description": "The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 19 Strength saving throw. On a failed save, the creature is pushed 60 feet away from the dragon."
      },
      {
        "id": "act_8_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_copper_dragon_legacy",
    "name": "Adult Copper Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
      "cha": 17
    },
    "skills": {
      "deception": 8,
      "perception": 12,
      "stealth": 6
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22",
    "languages": "Common, Draconic",
    "challengeRating": "14",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day) If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 15,
        "damage": "2d8+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_acid_breath",
        "name": "Acid Breath",
        "type": "ability",
        "damage": "12d8",
        "damageType": "acid",
        "description": "The dragon exhales acid in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_slowing_breath",
        "name": "Slowing Breath",
        "type": "ability",
        "description": "The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_gold_dragon_legacy",
    "name": "Adult Gold Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 256,
      "formula": "19d12 + 133"
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
    "skills": {
      "insight": 8,
      "perception": 14,
      "persuasion": 13,
      "stealth": 8
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 24",
    "languages": "Common, Draconic",
    "challengeRating": "17",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "2d10+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 5,
        "damage": "2d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 15,
        "damage": "2d8+8",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_fire_breath",
        "name": "Fire Breath",
        "type": "ability",
        "damage": "12d10",
        "damageType": "fire",
        "description": "The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 66 (12d10) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_weakening_breath",
        "name": "Weakening Breath",
        "type": "ability",
        "description": "The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 21 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_8_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_green_dragon_legacy",
    "name": "Adult Green Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "armorClass": 19,
    "armorDesc": "natural armor",
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
      "cha": 17
    },
    "skills": {
      "deception": 8,
      "insight": 7,
      "perception": 12,
      "persuasion": 8,
      "stealth": 6
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22",
    "languages": "Common, Draconic",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 7 (2d6) poison damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 15,
        "damage": "2d8+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_poison_breath__recharge_5_6__",
        "name": "Poison Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "16d6",
        "damageType": "poison",
        "description": "Poison Breath (Recharge 5–6) . The dragon exhales poisonous gas in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_red_dragon_legacy",
    "name": "Adult Red Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "armorDesc": "natural armor",
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
      "cha": 21
    },
    "skills": {
      "perception": 13,
      "stealth": 6
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 23",
    "languages": "Common, Draconic",
    "challengeRating": "17",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "2d10+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 7 (2d6) fire damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 5,
        "damage": "2d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 15,
        "damage": "2d8+8",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon’s choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature’s saving throw is successful or the effect ends for it, the creature is immune to the dragon’s Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_fire_breath__recharge_5_6__",
        "name": "Fire Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "18d6",
        "damageType": "fire",
        "description": "Fire Breath (Recharge 5–6) . The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 63 (18d6) fire damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_silver_dragon_legacy",
    "name": "Adult Silver Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 243,
      "formula": "18d12 + 126"
    },
    "speed": "40 ft., Fly 80 ft.",
    "stats": {
      "str": 27,
      "dex": 10,
      "con": 25,
      "int": 16,
      "wis": 13,
      "cha": 21
    },
    "skills": {
      "arcana": 8,
      "history": 8,
      "perception": 11,
      "stealth": 5
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 10,
        "damage": "2d10+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 5,
        "damage": "2d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 15,
        "damage": "2d8+8",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_cold_breath",
        "name": "Cold Breath",
        "type": "ability",
        "damage": "13d8",
        "damageType": "cold",
        "description": "The dragon exhales an icy blast in a 60-foot cone. Each creature in that area must make a DC 20 Constitution saving throw, taking 58 (13d8) cold damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_paralyzing_breath",
        "name": "Paralyzing Breath",
        "type": "ability",
        "description": "The dragon exhales paralyzing gas in a 60-foot cone. Each creature in that area must succeed on a DC 20 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_8_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 21 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_adult_white_dragon_legacy",
    "name": "Adult White Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 11,
      "stealth": 5
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21",
    "languages": "Common, Draconic",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra movement."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) cold damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 15,
        "damage": "2d8+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 14 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_cold_breath__recharge_5_6__",
        "name": "Cold Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "12d8",
        "damageType": "cold",
        "description": "Cold Breath (Recharge 5–6) . The dragon exhales an icy blast in a 60-foot cone. Each creature in that area must make a DC 19 Constitution saving throw, taking 54 (12d8) cold damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_air_elemental_legacy",
    "name": "Air Elemental",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 90,
      "formula": "12d10 + 24"
    },
    "speed": "0 ft., Fly 90 ft. (hover)",
    "stats": {
      "str": 14,
      "dex": 20,
      "con": 14,
      "int": 6,
      "wis": 10,
      "cha": 6
    },
    "damageResistances": [
      "Lightning",
      "Thunder; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
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
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Auran",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Air Form",
        "description": "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage."
      },
      {
        "id": "act_2_whirlwind__recharge_4_6__",
        "name": "Whirlwind (Recharge 4–6) ",
        "type": "ability",
        "damage": "3d8+2",
        "damageType": "bludgeoning",
        "description": "Whirlwind (Recharge 4–6) . Each creature in the elemental's space must make a DC 13 Strength saving throw. On a failure, a target takes 15 (3d8 + 2) bludgeoning damage and is flung up 20 feet away from the elemental in a random direction and knocked prone . If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone ."
      }
    ]
  },
  {
    "id": "ddb_allosaurus_legacy",
    "name": "Allosaurus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 5
    },
    "senses": "Passive Perception 15",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pounce",
        "description": "If the allosaurus moves at least 30 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone . If the target is prone , the allosaurus can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_ancient_black_dragon_legacy",
    "name": "Ancient Black Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 22,
    "armorDesc": "natural armor",
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
      "cha": 19
    },
    "skills": {
      "perception": 16,
      "stealth": 9
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 26",
    "languages": "Common, Draconic",
    "challengeRating": "21",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 15,
        "damage": "2d10+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) acid damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 10,
        "damage": "2d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 20,
        "damage": "2d8+8",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_acid_breath__recharge_5_6__",
        "name": "Acid Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "15d8",
        "damageType": "acid",
        "description": "Acid Breath (Recharge 5–6) . The dragon exhales acid in a 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 67 (15d8) acid damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_ancient_blue_dragon_legacy",
    "name": "Ancient Blue Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "armorClass": 22,
    "armorDesc": "natural armor",
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
      "cha": 21
    },
    "skills": {
      "perception": 17,
      "stealth": 7
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "23",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 16,
        "reachFeet": 15,
        "damage": "2d10+9",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage plus 11 (2d10) lightning damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 16,
        "reachFeet": 10,
        "damage": "2d6+9",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 16,
        "reachFeet": 20,
        "damage": "2d8+9",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 20 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_lightning_breath__recharge_5_6__",
        "name": "Lightning Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "16d10",
        "damageType": "lightning",
        "description": "Lightning Breath (Recharge 5–6) . The dragon exhales lightning in a 120-­foot line that is 10 feet wide. Each creature in that line must make a DC 23 Dexterity saving throw, taking 88 (16d10) lightning damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_ancient_brass_dragon_legacy",
    "name": "Ancient Brass Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "armorClass": 20,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 297,
      "formula": "17d20 + 119"
    },
    "speed": "40 ft., Burrow 40 ft., Fly 80 ft.",
    "stats": {
      "str": 27,
      "dex": 10,
      "con": 25,
      "int": 16,
      "wis": 15,
      "cha": 19
    },
    "skills": {
      "history": 9,
      "perception": 14,
      "persuasion": 10,
      "stealth": 6
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 24",
    "languages": "Common, Draconic",
    "challengeRating": "20",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 15,
        "damage": "2d10+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "2d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 20,
        "damage": "2d8+8",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons:"
      },
      {
        "id": "act_6_fire_breath",
        "name": "Fire Breath",
        "type": "ability",
        "damage": "16d6",
        "damageType": "fire",
        "description": "The dragon exhales fire in an 90-foot line that is 10 feet wide. Each creature in that line must make a DC 21 Dexterity saving throw, taking 56 (16d6) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_sleep_breath",
        "name": "Sleep Breath",
        "type": "ability",
        "description": "The dragon exhales sleep gas in a 90-foot cone. Each creature in that area must succeed on a DC 21 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it."
      },
      {
        "id": "act_8_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_ancient_bronze_dragon_legacy",
    "name": "Ancient Bronze Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 22,
    "armorDesc": "natural armor",
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
      "cha": 21
    },
    "skills": {
      "insight": 10,
      "perception": 17,
      "stealth": 7
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "22",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 16,
        "reachFeet": 15,
        "damage": "2d10+9",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 16,
        "reachFeet": 10,
        "damage": "2d6+9",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 16,
        "reachFeet": 20,
        "damage": "2d8+9",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 20 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_lightning_breath",
        "name": "Lightning Breath",
        "type": "ability",
        "damage": "16d10",
        "damageType": "lightning",
        "description": "The dragon exhales lightning in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 23 Dexterity saving throw, taking 88 (16d10) lightning damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_repulsion_breath",
        "name": "Repulsion Breath",
        "type": "ability",
        "description": "The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 23 Strength saving throw. On a failed save, the creature is pushed 60 feet away from the dragon."
      },
      {
        "id": "act_8_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_ancient_copper_dragon_legacy",
    "name": "Ancient Copper Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "armorClass": 21,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 350,
      "formula": "20d20 + 140"
    },
    "speed": "40 ft., Climb 40 ft., Fly 80 ft.",
    "stats": {
      "str": 27,
      "dex": 12,
      "con": 25,
      "int": 20,
      "wis": 17,
      "cha": 19
    },
    "skills": {
      "deception": 11,
      "perception": 17,
      "stealth": 8
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "21",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 15,
        "damage": "2d10+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 10,
        "damage": "2d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 20,
        "damage": "2d8+8",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_acid_breath",
        "name": "Acid Breath",
        "type": "ability",
        "damage": "14d8",
        "damageType": "acid",
        "description": "The dragon exhales acid in an 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 63 (14d8) acid damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_slowing_breath",
        "name": "Slowing Breath",
        "type": "ability",
        "description": "The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 22 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save."
      },
      {
        "id": "act_8_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_ancient_gold_dragon_legacy",
    "name": "Ancient Gold Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 22,
    "armorDesc": "natural armor",
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
    "skills": {
      "insight": 10,
      "perception": 17,
      "persuasion": 16,
      "stealth": 9
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "24",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 15,
        "damage": "2d10+10",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 10,
        "damage": "2d6+10",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 20,
        "damage": "2d8+10",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 24 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_fire_breath",
        "name": "Fire Breath",
        "type": "ability",
        "damage": "13d10",
        "damageType": "fire",
        "description": "The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 71 (13d10) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_weakening_breath",
        "name": "Weakening Breath",
        "type": "ability",
        "description": "The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_8_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_ancient_green_dragon_legacy",
    "name": "Ancient Green Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "armorClass": 21,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 385,
      "formula": "22d20 + 154"
    },
    "speed": "40 ft., Fly 80 ft., Swim 40 ft.",
    "stats": {
      "str": 27,
      "dex": 12,
      "con": 25,
      "int": 20,
      "wis": 17,
      "cha": 19
    },
    "skills": {
      "deception": 11,
      "insight": 10,
      "perception": 17,
      "persuasion": 11,
      "stealth": 8
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27",
    "languages": "Common, Draconic",
    "challengeRating": "22",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 15,
        "damage": "2d10+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 10 (3d6) poison damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 10,
        "damage": "4d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 22 (4d6 + 8) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 20,
        "damage": "2d8+8",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_poison_breath__recharge_5_6__",
        "name": "Poison Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "22d6",
        "damageType": "poison",
        "description": "Poison Breath (Recharge 5–6) . The dragon exhales poisonous gas in a 90-­-foot cone. Each creature in that area must make a DC 22 Constitution saving throw, taking 77 (22d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ancient_red_dragon_legacy",
    "name": "Ancient Red Dragon",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 22,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 546,
      "formula": "28d20+252"
    },
    "speed": "40 ft., climb 40 ft., fly 80 ft.",
    "stats": {
      "str": 30,
      "dex": 10,
      "con": 29,
      "int": 18,
      "wis": 15,
      "cha": 23
    },
    "savingThrows": {
      "dex": 7,
      "con": 16,
      "wis": 9,
      "cha": 13
    },
    "skills": {
      "perception": 16,
      "stealth": 7
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 26",
    "languages": "Common, Draconic",
    "challengeRating": "24",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 15,
        "damage": "2d10+10",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +17 to hit, reach 15 ft. Hit: 21 (2d10 + 10) piercing plus 14 (4d6) fire damage."
      },
      {
        "id": "claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 10,
        "damage": "2d6+10",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +17 to hit, reach 10 ft. Hit: 17 (2d6 + 10) slashing."
      },
      {
        "id": "fire_breath",
        "name": "Fire Breath (Recharge 5-6)",
        "type": "ability",
        "saveDc": 24,
        "saveStat": "dex",
        "damage": "26d6",
        "damageType": "Fire",
        "description": "The dragon exhales fire in a 90-foot cone. DC 24 Dexterity save, taking 91 (26d6) fire damage on a failure, or half on success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "Melee Weapon Attack: +17 to hit, reach 20 ft. Hit: 19 (2d8 + 10) bludgeoning."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. DC 25 Dex save or take 17 (2d6 + 10) bludgeoning and knocked prone. The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_ancient_silver_dragon_legacy",
    "name": "Ancient Silver Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 22,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 487,
      "formula": "25d20 + 225"
    },
    "speed": "40 ft., Fly 80 ft.",
    "stats": {
      "str": 30,
      "dex": 10,
      "con": 29,
      "int": 18,
      "wis": 15,
      "cha": 23
    },
    "skills": {
      "arcana": 11,
      "history": 11,
      "perception": 16,
      "stealth": 7
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 26",
    "languages": "Common, Draconic",
    "challengeRating": "23",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 15,
        "damage": "2d10+10",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 10,
        "damage": "2d6+10",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 20,
        "damage": "2d8+10",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_6_cold_breath",
        "name": "Cold Breath",
        "type": "ability",
        "damage": "15d8",
        "damageType": "cold",
        "description": "The dragon exhales an icy blast in a 90-foot cone. Each creature in that area must make a DC 24 Constitution saving throw, taking 67 (15d8) cold damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_7_paralyzing_breath",
        "name": "Paralyzing Breath",
        "type": "ability",
        "description": "The dragon exhales paralyzing gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_8_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_ancient_white_dragon_legacy",
    "name": "Ancient White Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 20,
    "armorDesc": "natural armor",
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
      "cha": 14
    },
    "skills": {
      "perception": 13,
      "stealth": 6
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 23",
    "languages": "Common, Draconic",
    "challengeRating": "20",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra movement."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 15,
        "damage": "2d10+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) cold damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "2d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 20,
        "damage": "2d8+8",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "id": "act_4_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_5_cold_breath__recharge_5_6__",
        "name": "Cold Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "16d8",
        "damageType": "cold",
        "description": "Cold Breath (Recharge 5–6) . The dragon exhales an icy blast in a 90-foot cone. Each creature in that area must make a DC 22 Constitution saving throw, taking 72 (16d8) cold damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom ( Perception ) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone . The dragon can then fly up to half its flying speed."
      }
    ]
  },
  {
    "id": "ddb_androsphinx_legacy",
    "name": "Androsphinx",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Neutral",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
      "wis": 18,
      "cha": 23
    },
    "skills": {
      "arcana": 9,
      "perception": 10,
      "religion": 15
    },
    "damageImmunities": [
      "Psychic; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened"
    ],
    "senses": "Truesight 120 ft., Passive Perception 20",
    "languages": "Common, Sphinx",
    "challengeRating": "17",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Inscrutable",
        "description": "The sphinx is immune to any effect that would sense its emotions or read its thoughts, as well as any divination spell that it refuses. Wisdom ( Insight ) checks made to ascertain the sphinx's intentions or sincerity have disadvantage."
      },
      {
        "name": "Magic Weapons",
        "description": "The sphinx's weapon attacks are magical."
      },
      {
        "name": "Spellcasting",
        "description": "The sphinx is a 12th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 18, +10 to hit with spell attacks). It requires no material components to cast its spells. The sphinx has the following cleric spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The sphinx makes two claw attacks."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 5,
        "damage": "2d10+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 17 (2d10 + 6) slashing damage."
      },
      {
        "id": "act_2_roar__3_day_",
        "name": "Roar (3/Day)",
        "type": "ability",
        "description": "Roar (3/Day). The sphinx emits a magical roar. Each time it roars before finishing a long rest, the roar is louder and the effect is different, as detailed below. Each creature within 500 feet of the sphinx and able to hear the roar must make a saving throw."
      },
      {
        "id": "act_3_first_roar",
        "name": "First Roar",
        "type": "ability",
        "description": "Each creature that fails a DC 18 Wisdom saving throw is frightened for 1 minute. A frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_4_second_roar",
        "name": "Second Roar",
        "type": "ability",
        "description": "Each creature that fails a DC 18 Wisdom saving throw is deafened and frightened for 1 minute. A frightened creature is paralyzed and can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_5_third_roar",
        "name": "Third Roar",
        "type": "ability",
        "damage": "8d10",
        "damageType": "thunder",
        "description": "Each creature makes a DC 18 Constitution saving throw. On a failed save, a creature takes 44 (8d10) thunder damage and is knocked prone . On a successful save, the creature takes half as much damage and isn't knocked prone ."
      }
    ],
    "legendaryActions": [
      {
        "name": "Claw Attack",
        "description": "The sphinx makes one claw attack."
      },
      {
        "name": "Teleport (Costs 2 Actions)",
        "description": "Teleport (Costs 2 Actions). The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      },
      {
        "name": "Cast a Spell (Costs 3 Actions)",
        "description": "Cast a Spell (Costs 3 Actions). The sphinx casts a spell from its list of prepared spells, using a spell slot as normal."
      }
    ]
  },
  {
    "id": "animated_armor_legacy",
    "name": "Animated Armor",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 18,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 33,
      "formula": "6d8+6"
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
    "damageImmunities": [
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "blinded",
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned"
    ],
    "senses": "Blindsight 60 ft. (blind beyond), Passive Perception 6",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute."
      },
      {
        "name": "False Appearance",
        "description": "While the armor remains motionless, it is indistinguishable from a normal suit of armor."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The armor makes two melee attacks."
      },
      {
        "id": "slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft. Hit: 5 (1d6 + 2) bludgeoning."
      }
    ]
  },
  {
    "id": "ddb_ankheg_legacy",
    "name": "Ankheg",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 14,
    "armorDesc": "natural armor), 11 while prone",
    "hitPoints": {
      "average": 39,
      "formula": "6d10 + 6"
    },
    "speed": "30 ft., Burrow 10 ft.",
    "stats": {
      "str": 17,
      "dex": 11,
      "con": 13,
      "int": 1,
      "wis": 13,
      "cha": 6
    },
    "senses": "Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage plus 3 (1d6) acid damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). Until this grapple ends, the ankheg can bite only the grappled creature and has advantage on attack rolls to do so."
      },
      {
        "id": "act_1_acid_spray__recharge_6__",
        "name": "Acid Spray (Recharge 6) ",
        "type": "ability",
        "damage": "3d6",
        "damageType": "acid",
        "description": "Acid Spray (Recharge 6) . The ankheg spits acid in a line that is 30 feet long and 5 feet wide, provided that it has no creature grappled . Each creature in that line must make a DC 13 Dexterity saving throw, taking 10 (3d6) acid damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_ankylosaurus_legacy",
    "name": "Ankylosaurus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 15,
    "armorDesc": "natural",
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
    "senses": "Passive Perception 11",
    "languages": "--",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "4d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 18 (4d6 + 4) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone ."
      }
    ]
  },
  {
    "id": "ddb_ape_legacy",
    "name": "Ape",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "athletics": 5,
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ape makes two fist attacks."
      },
      {
        "id": "act_1_fist",
        "name": "Fist",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage."
      },
      {
        "id": "act_2_rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 5,
        "rangeFeet": 25,
        "rangeLongFeet": 50,
        "damage": "1d6+3",
        "damageType": "bludgeoning",
        "description": "Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_archmage_legacy",
    "name": "Archmage",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 12,
    "armorDesc": "15 with mage armor",
    "hitPoints": {
      "average": 99,
      "formula": "18d8 + 18"
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
    "skills": {
      "arcana": 13,
      "history": 13
    },
    "damageResistances": [
      "Damage from Spells; Nonmagical Bludgeoning",
      "Piercing",
      "and Slashing (from Stoneskin)"
    ],
    "senses": "Passive Perception 12",
    "languages": "Any six languages",
    "challengeRating": "12",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The archmage has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Spellcasting",
        "description": "The archmage is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks). The archmage can cast disguise self and invisibility at will and has the following wizard spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_dagger",
        "name": "Dagger",
        "type": "ranged_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_assassin_legacy",
    "name": "Assassin",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Non-Good Alignment",
    "armorClass": 15,
    "armorDesc": "studded leather",
    "hitPoints": {
      "average": 78,
      "formula": "12d8 + 24"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 16,
      "con": 14,
      "int": 13,
      "wis": 11,
      "cha": 10
    },
    "skills": {
      "acrobatics": 6,
      "deception": 3,
      "perception": 3,
      "stealth": 9
    },
    "damageResistances": [
      "Poison"
    ],
    "senses": "Passive Perception 13",
    "languages": "Thieves&#x27; cant plus any two languages",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Assassinate",
        "description": "During its first turn, the assassin has advantage on attack rolls against any creature that hasn't taken a turn. Any hit the assassin scores against a surprised creature is a critical hit."
      },
      {
        "name": "Evasion",
        "description": "If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the saving throw, and only half damage if it fails."
      },
      {
        "name": "Sneak Attack",
        "description": "Once per turn, the assassin deals an extra 14 (4d6) damage when it hits a target with a weapon attack and has advantage on the attack roll, or when the target is within 5 feet of an ally of the assassin that isn't incapacitated and the assassin doesn't have disadvantage on the attack roll."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The assassin makes two shortsword attacks."
      },
      {
        "id": "act_1_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_2_light_crossbow",
        "name": "Light Crossbow",
        "type": "ranged_attack",
        "attackBonus": 6,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d8+3",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_awakened_shrub_legacy",
    "name": "Awakened Shrub",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Plant",
    "alignment": "Unaligned",
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
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageResistances": [
      "Piercing"
    ],
    "senses": "Passive Perception 10",
    "languages": "One language known by its creator",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the shrub remains motionless, it is indistinguishable from a normal shrub."
      }
    ],
    "actions": [
      {
        "id": "act_0_rake",
        "name": "Rake",
        "type": "melee_attack",
        "attackBonus": 1,
        "reachFeet": 5,
        "damage": "1d4-1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 − 1) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_awakened_tree_legacy",
    "name": "Awakened Tree",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Plant",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
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
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageResistances": [
      "Bludgeoning",
      "Piercing"
    ],
    "senses": "Passive Perception 10",
    "languages": "One language known by its creator",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the tree remains motionless, it is indistinguishable from a normal tree."
      }
    ],
    "actions": [
      {
        "id": "act_0_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "3d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_axe_beak_legacy",
    "name": "Axe Beak",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
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
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_azer_legacy",
    "name": "Azer",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Lawful Neutral",
    "armorClass": 17,
    "armorDesc": "natural armor, shield",
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
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Passive Perception 11",
    "languages": "Ignan",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Heated Body",
        "description": "A creature that touches the azer or hits it with a melee attack while within 5 feet of it takes 5 (1d10) fire damage."
      },
      {
        "name": "Heated Weapons",
        "description": "When the azer hits with a metal melee weapon, it deals an extra 3 (1d6) fire damage (included in the attack)."
      },
      {
        "name": "Illumination",
        "description": "The azer sheds bright light in a 10-­foot radius and dim light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "id": "act_0_warhammer",
        "name": "Warhammer",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) bludgeoning damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage."
      }
    ]
  },
  {
    "id": "ddb_baboon_legacy",
    "name": "Baboon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Passive Perception 11",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The baboon has advantage on an attack roll against a creature if at least one of the baboon's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 1,
        "reachFeet": 5,
        "damage": "1d4-1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 − 1) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_badger_legacy",
    "name": "Badger",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 3,
      "formula": "1d4 + 1"
    },
    "speed": "20 ft., Burrow 5 ft.",
    "stats": {
      "str": 4,
      "dex": 11,
      "con": 12,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "senses": "Darkvision 30 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The badger has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 piercing damage."
      }
    ]
  },
  {
    "id": "balor_legacy",
    "name": "Balor",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 262,
      "formula": "21d12+126"
    },
    "speed": "40 ft., fly 80 ft.",
    "stats": {
      "str": 26,
      "dex": 15,
      "con": 22,
      "int": 20,
      "wis": 16,
      "cha": 22
    },
    "savingThrows": {
      "str": 14,
      "con": 12,
      "wis": 9,
      "cha": 12
    },
    "damageResistances": [
      "Cold",
      "Lightning",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "poisoned"
    ],
    "senses": "Truesight 120 ft., Passive Perception 13",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "19",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Death Throes",
        "description": "When the balor dies, it explodes in fire. Each creature within 30 ft. must make a DC 20 Dexterity saving throw, taking 70 (20d6) fire damage on failure, half on success."
      },
      {
        "name": "Fire Aura",
        "description": "At the start of each of the balor's turns, each creature within 5 ft. takes 10 (3d6) fire damage."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The balor makes two attacks: one with its longsword and one with its whip."
      },
      {
        "id": "longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "3d8+8",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft. Hit: 21 (3d8 + 8) slashing damage plus 13 (3d8) lightning damage."
      },
      {
        "id": "whip",
        "name": "Whip",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 30,
        "damage": "2d6+8",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +14 to hit, reach 30 ft. Hit: 15 (2d6 + 8) slashing damage plus 10 (3d6) fire damage, and the target is pulled up to 25 ft. toward the balor."
      }
    ]
  },
  {
    "id": "ddb_bandit_legacy",
    "name": "Bandit",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Non-Lawful Alignment",
    "armorClass": 12,
    "armorDesc": "leather armor",
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
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage."
      },
      {
        "id": "act_1_light_crossbow",
        "name": "Light Crossbow",
        "type": "ranged_attack",
        "attackBonus": 3,
        "rangeFeet": 80,
        "damage": "1d8+1",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +3 to hit, range 80 ft./320 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_bandit_captain_legacy",
    "name": "Bandit Captain",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Non-Lawful Alignment",
    "armorClass": 15,
    "armorDesc": "studded leather",
    "hitPoints": {
      "average": 65,
      "formula": "10d8 + 20"
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
    "skills": {
      "athletics": 4,
      "deception": 4
    },
    "senses": "Passive Perception 10",
    "languages": "Any two languages",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers."
      },
      {
        "id": "act_1_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "id": "act_2_dagger",
        "name": "Dagger",
        "type": "ranged_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d4+3",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The captain adds 2 to its AC against one melee attack that would hit it. To do so, the captain must see the attacker and be wielding a melee weapon."
      }
    ]
  },
  {
    "id": "ddb_banshee_legacy",
    "name": "Banshee",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 58,
      "formula": "13d8"
    },
    "speed": "0 ft., Fly 40 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 14,
      "con": 10,
      "int": 12,
      "wis": 11,
      "cha": 17
    },
    "damageResistances": [
      "Acid",
      "Fire",
      "Lightning",
      "Thunder; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
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
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Elvish",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Detect Life",
        "description": "The banshee can magically sense the presence of creatures up to 5 miles away that aren’t undead or constructs. She knows the general direction they’re in but not their exact locations."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The banshee can move through other creatures and objects as if they were difficult terrain. She takes 5 (1d10) force damage if she ends her turn inside an object."
      }
    ],
    "actions": [
      {
        "id": "act_0_corrupting_touch",
        "name": "Corrupting Touch",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "3d6+2",
        "damageType": "necrotic",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one target. Hit: 12 (3d6 + 2) necrotic damage."
      },
      {
        "id": "act_1_horrifying_visage",
        "name": "Horrifying Visage",
        "type": "ability",
        "description": "Each non-undead creature within 60 feet of the banshee that can see her must succeed on a DC 13 Wisdom saving throw or be frightened for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, with disadvantage if the banshee is within line of sight, ending the effect on itself on a success. If a target’s saving throw is successful or the effect ends for it, the target is immune to the banshee’s Horrifying Visage for the next 24 hours."
      },
      {
        "id": "act_2_wail__1_day_",
        "name": "Wail (1/Day)",
        "type": "ability",
        "damage": "3d6",
        "damageType": "psychic",
        "description": "Wail (1/Day). The banshee releases a mournful wail, provided that she isn’t in sunlight. This wail has no effect on constructs and undead. All other creatures within 30 feet of her that can hear her must make a DC 13 Constitution saving throw. On a failure, a creature drops to 0 hit points. On a success, a creature takes 10 (3d6) psychic damage."
      }
    ]
  },
  {
    "id": "ddb_barbed_devil_legacy",
    "name": "Barbed Devil",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 110,
      "formula": "13d8 + 52"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 17,
      "con": 18,
      "int": 12,
      "wis": 14,
      "cha": 14
    },
    "skills": {
      "deception": 5,
      "insight": 5,
      "perception": 8
    },
    "damageResistances": [
      "Cold; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 18",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Barbed Hide",
        "description": "At the start of each of its turns, the barbed devil deals 5 (1d10) piercing damage to any creature grappling it."
      },
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision ."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes three melee attacks: one with its tail and two with its claws. Alternatively, it can use Hurl Flame twice."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "id": "act_2_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage."
      },
      {
        "id": "act_3_hurl_flame",
        "name": "Hurl Flame",
        "type": "ranged_attack",
        "attackBonus": 5,
        "rangeFeet": 150,
        "damage": "3d6",
        "damageType": "fire",
        "description": "Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire."
      }
    ]
  },
  {
    "id": "basilisk_legacy",
    "name": "Basilisk",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 52,
      "formula": "8d8+16"
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
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "--",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Petrifying Gaze",
        "description": "If a creature starts its turn within 30 ft. of the basilisk and the two of them can see each other, the basilisk can force the creature to make a DC 12 Constitution saving throw. On a failure, creature begins to turn to stone and is restrained, repeating save next turn or petrified."
      }
    ],
    "actions": [
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage."
      }
    ]
  },
  {
    "id": "ddb_bat_legacy",
    "name": "Bat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
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
    "senses": "Blindsight 60 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The bat can't use its blindsight while deafened ."
      },
      {
        "name": "Keen Hearing",
        "description": "The bat has advantage on Wisdom ( Perception ) checks that rely on hearing."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 0,
        "reachFeet": 5,
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one creature. Hit: 1 piercing damage."
      }
    ]
  },
  {
    "id": "ddb_bearded_devil_legacy",
    "name": "Bearded Devil",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 52,
      "formula": "8d8 + 16"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 15,
      "con": 15,
      "int": 9,
      "wis": 11,
      "cha": 11
    },
    "damageResistances": [
      "Cold; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision ."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Steadfast",
        "description": "The devil can't be frightened while it can see an allied creature within 30 feet of it."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes two attacks: one with its beard and one with its glaive."
      },
      {
        "id": "act_1_beard",
        "name": "Beard",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the target can't regain hit points. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_2_glaive",
        "name": "Glaive",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 10,
        "damage": "1d10+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 8 (1d10 + 3) slashing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 5 (1d10) . Any creature can take an action to stanch the wound with a successful DC 12 Wisdom ( Medicine ) check. The wound also closes if the target receives magical healing."
      }
    ]
  },
  {
    "id": "ddb_behir_legacy",
    "name": "Behir",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 168,
      "formula": "16d12 + 64"
    },
    "speed": "50 ft., Climb 40 ft.",
    "stats": {
      "str": 23,
      "dex": 16,
      "con": 18,
      "int": 7,
      "wis": 14,
      "cha": 12
    },
    "skills": {
      "perception": 6,
      "stealth": 7
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Darkvision 90 ft., Passive Perception 16",
    "languages": "Draconic",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The behir makes two attacks: one with its bite and one to constrict."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "3d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) piercing damage."
      },
      {
        "id": "act_2_constrict",
        "name": "Constrict",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d10+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one Large or smaller creature. Hit: 17 (2d10 + 6) bludgeoning damage plus 17 (2d10 + 6) slashing damage. The target is grappled (escape DC 16) if the behir isn't already constricting a creature, and the target is restrained until this grapple ends."
      },
      {
        "id": "act_3_lightning_breath__recharge_5_6__",
        "name": "Lightning Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "12d10",
        "damageType": "lightning",
        "description": "Lightning Breath (Recharge 5–6) . The behir exhales a line of lightning that is 20 feet long and 5 feet wide. Each creature in that line must make a DC 16 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_4_swallow",
        "name": "Swallow",
        "type": "ability",
        "damage": "6d6",
        "damageType": "acid",
        "description": "The behir makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is also swallowed, and the grapple ends. While swallowed, the target is blinded and restrained , it has total cover against attacks and other effects outside the behir, and it takes 21 (6d6) acid damage at the start of each of the behir's turns. A behir can have only one creature swallowed at a time."
      }
    ]
  },
  {
    "id": "beholder_legacy",
    "name": "Beholder",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 180,
      "formula": "19d10+76"
    },
    "speed": "0 ft., fly 20 ft. (hover)",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 18,
      "int": 17,
      "wis": 15,
      "cha": 17
    },
    "savingThrows": {
      "int": 8,
      "wis": 7,
      "cha": 8
    },
    "skills": {
      "perception": 12
    },
    "conditionImmunities": [
      "prone"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 22",
    "languages": "Deep Speech, Undercommon",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Antimagic Cone",
        "description": "The beholder's central eye creates an area of antimagic, as in the antimagic field spell, in a 150-foot cone. At the start of each of its turns, the beholder decides which way the cone faces."
      }
    ],
    "actions": [
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "4d6",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 14 (4d6) piercing damage."
      },
      {
        "id": "eye_rays",
        "name": "Eye Rays",
        "type": "ability",
        "description": "The beholder shoots three of the following magical eye rays at random (reroll duplicates), choosing one to three targets it can see within 120 ft.: 1. Charm Ray, 2. Paralyzing Ray, 3. Fear Ray, 4. Slowing Ray, 5. Enervation Ray, 6. Telekinetic Ray, 7. Sleep Ray, 8. Petrification Ray, 9. Disintegration Ray, 10. Death Ray."
      }
    ],
    "legendaryActions": [
      {
        "name": "Eye Ray",
        "description": "The beholder uses one random eye ray."
      }
    ]
  },
  {
    "id": "ddb_berserker_legacy",
    "name": "Berserker",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Chaotic Alignment",
    "armorClass": 13,
    "armorDesc": "hide armor",
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
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Reckless",
        "description": "At the start of its turn, the berserker can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn."
      }
    ],
    "actions": [
      {
        "id": "act_0_greataxe",
        "name": "Greataxe",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d12+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_black_bear_legacy",
    "name": "Black Bear",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 19,
      "formula": "3d8 + 6"
    },
    "speed": "40 ft., Climb 30 ft.",
    "stats": {
      "str": 15,
      "dex": 10,
      "con": 14,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_black_dragon_wyrmling_legacy",
    "name": "Black Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4,
      "stealth": 4
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
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
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) acid damage."
      },
      {
        "id": "act_1_acid_breath__recharge_5_6__",
        "name": "Acid Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "5d8",
        "damageType": "acid",
        "description": "Acid Breath (Recharge 5–6) . The dragon exhales acid in a 15-­foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 22 (5d8) acid damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_black_pudding_legacy",
    "name": "Black Pudding",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "armorClass": 7,
    "hitPoints": {
      "average": 85,
      "formula": "10d10 + 30"
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
    "damageImmunities": [
      "Acid",
      "Cold",
      "Lightning",
      "Slashing"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Prone"
    ],
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 8",
    "languages": "--",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The pudding can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Corrosive Form",
        "description": "A creature that touches the pudding or hits it with a melee attack while within 5 feet of it takes 4 (1d8) acid damage. Any nonmagical weapon made of metal or wood that hits the pudding corrodes. After dealing damage, the weapon takes a permanent and cumulative −1 penalty to damage rolls. If its penalty drops to −5, the weapon is destroyed."
      },
      {
        "name": "Spider Climb",
        "description": "The pudding can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_0_pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 18 (4d8) acid damage. In addition, nonmagical armor worn by the target is partly dissolved and takes a permanent and cumulative −1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10."
      }
    ],
    "reactions": [
      {
        "name": "Split",
        "description": "When a pudding that is Medium or larger is subjected to lightning or slashing damage, it splits into two new puddings if it has at least 10 hit points. Each new pudding has hit points equal to half the original pudding's, rounded down. New puddings are one size smaller than the original pudding."
      }
    ]
  },
  {
    "id": "ddb_blink_dog_legacy",
    "name": "Blink Dog",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 3,
      "stealth": 5
    },
    "senses": "Passive Perception 13",
    "languages": "Blink Dog , understands Sylvan but can&#x27;t speak it",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The dog has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage."
      },
      {
        "id": "act_1_teleport__recharge_4_6__",
        "name": "Teleport (Recharge 4–6) ",
        "type": "ability",
        "description": "Teleport (Recharge 4–6) . The dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack."
      }
    ]
  },
  {
    "id": "ddb_blood_hawk_legacy",
    "name": "Blood Hawk",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The hawk has advantage on Wisdom ( Perception ) checks that rely on sight."
      },
      {
        "name": "Pack Tactics",
        "description": "The hawk has advantage on an attack roll against a creature if at least one of the hawk's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_blue_dragon_wyrmling_legacy",
    "name": "Blue Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 52,
      "formula": "8d8 + 16"
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
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage plus 3 (1d6) lightning damage."
      },
      {
        "id": "act_1_lightning_breath__recharge_5_6__",
        "name": "Lightning Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "4d10",
        "damageType": "lightning",
        "description": "Lightning Breath (Recharge 5–6) . The dragon exhales lightning in a 30-­foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 22 (4d10) lightning damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_boar_legacy",
    "name": "Boar",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 13,
      "dex": 11,
      "con": 12,
      "int": 2,
      "wis": 9,
      "cha": 5
    },
    "senses": "Passive Perception 9",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the boar moves at least 20 feet straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 3 (1d6) slashing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone ."
      },
      {
        "name": "Relentless (Recharges after a Short or Long Rest)",
        "description": "Relentless (Recharges after a Short or Long Rest). If the boar takes 7 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_tusk",
        "name": "Tusk",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_bone_devil_legacy",
    "name": "Bone Devil",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 19,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 142,
      "formula": "15d10 + 60"
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
    "skills": {
      "deception": 7,
      "insight": 6
    },
    "damageResistances": [
      "Cold; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 12",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision ."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes three attacks: two with its claws and one with its sting."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "1d8+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 8 (1d8 + 4) slashing damage."
      },
      {
        "id": "act_2_sting",
        "name": "Sting",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ddb_brass_dragon_wyrmling_legacy",
    "name": "Brass Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "armorClass": 16,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 16,
      "formula": "3d8 + 3"
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
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage."
      },
      {
        "id": "act_1_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_2_fire_breath",
        "name": "Fire Breath",
        "type": "ability",
        "damage": "4d6",
        "damageType": "fire",
        "description": "The dragon exhales fire in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 14 (4d6) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_3_sleep_breath",
        "name": "Sleep Breath",
        "type": "ability",
        "description": "The dragon exhales sleep gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw or fall unconscious for 1 minute. This effect ends for a creature if the creature takes damage or someone uses an action to wake it."
      }
    ]
  },
  {
    "id": "ddb_bronze_dragon_wyrmling_legacy",
    "name": "Bronze Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 32,
      "formula": "5d8 + 10"
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
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
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
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage."
      },
      {
        "id": "act_1_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_2_lightning_breath",
        "name": "Lightning Breath",
        "type": "ability",
        "damage": "3d10",
        "damageType": "lightning",
        "description": "The dragon exhales lightning in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 16 (3d10) lightning damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_3_repulsion_breath",
        "name": "Repulsion Breath",
        "type": "ability",
        "description": "The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 12 Strength saving throw. On a failed save, the creature is pushed 30 feet away from the dragon."
      }
    ]
  },
  {
    "id": "ddb_brown_bear_legacy",
    "name": "Brown Bear",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 34,
      "formula": "4d10 + 12"
    },
    "speed": "40 ft., Climb 30 ft.",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 16,
      "int": 2,
      "wis": 13,
      "cha": 7
    },
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      }
    ]
  },
  {
    "id": "bugbear_legacy",
    "name": "Bugbear",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Goblinoid",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "armorDesc": "Hide Armor, Shield",
    "hitPoints": {
      "average": 27,
      "formula": "5d8+5"
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
    "skills": {
      "stealth": 6,
      "survival": 2
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Goblin",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Brute",
        "description": "A melee weapon deals one extra die of its damage when the bugbear hits with it (included in the attack)."
      },
      {
        "name": "Surprise Attack",
        "description": "If the bugbear surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 7 (2d6) damage from the attack."
      }
    ],
    "actions": [
      {
        "id": "morningstar",
        "name": "Morningstar",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d8+2",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) piercing damage."
      },
      {
        "id": "javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+2",
        "damageType": "Piercing",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_bulette_legacy",
    "name": "Bulette",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 6
    },
    "senses": "Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 16",
    "languages": "--",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Standing Leap",
        "description": "The bulette's long jump is up to 30 feet and its high jump is up to 15 feet, with or without a running start."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "4d12+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (4d12 + 4) piercing damage."
      },
      {
        "id": "act_1_deadly_leap",
        "name": "Deadly Leap",
        "type": "ability",
        "damage": "3d6+4",
        "damageType": "bludgeoning",
        "description": "If the bulette jumps at least 15 feet as part of its movement, it can then use this action to land on its feet in a space that contains one or more other creatures. Each of those creatures must succeed on a DC 16 Strength or Dexterity saving throw (target's choice) or be knocked prone and take 14 (3d6 + 4) bludgeoning damage plus 14 (3d6 + 4) slashing damage. On a successful save, the creature takes only half the damage, isn't knocked prone , and is pushed 5 feet out of the bulette's space into an unoccupied space of the creature's choice. If no unoccupied space is within range, the creature instead falls prone in the bulette's space."
      }
    ]
  },
  {
    "id": "ddb_camel_legacy",
    "name": "Camel",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 9,
    "hitPoints": {
      "average": 15,
      "formula": "2d10 + 4"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 16,
      "dex": 8,
      "con": 14,
      "int": 2,
      "wis": 8,
      "cha": 5
    },
    "senses": "Passive Perception 9",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_cat_legacy",
    "name": "Cat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 2,
      "formula": "1d4"
    },
    "speed": "40 ft., Climb 30 ft.",
    "stats": {
      "str": 3,
      "dex": 15,
      "con": 10,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The cat has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 0,
        "reachFeet": 5,
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage."
      }
    ]
  },
  {
    "id": "ddb_centaur_legacy",
    "name": "Centaur",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Neutral Good",
    "armorClass": 12,
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
    "skills": {
      "athletics": 6,
      "perception": 3,
      "survival": 3
    },
    "senses": "Passive Perception 13",
    "languages": "Elvish, Sylvan",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the centaur moves at least 30 feet straight toward a target and then hits it with a pike attack on the same turn, the target takes an extra 10 (3d6) piercing damage."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The centaur makes two attacks: one with its pike and one with its hooves or two with its longbow."
      },
      {
        "id": "act_1_pike",
        "name": "Pike",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 9 (1d10 + 4) piercing damage."
      },
      {
        "id": "act_2_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      },
      {
        "id": "act_3_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_chain_devil_legacy",
    "name": "Chain Devil",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "armorDesc": "natural armor",
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
    "damageResistances": [
      "Cold; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision ."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes two attacks with its chains."
      },
      {
        "id": "act_1_chain",
        "name": "Chain",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage. The target is grappled (escape DC 14) if the devil isn't already grappling a creature. Until this grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns."
      },
      {
        "id": "act_2_animate_chains__recharges_after_a_short_or_long_rest_",
        "name": "Animate Chains (Recharges after a Short or Long Rest)",
        "type": "ability",
        "description": "Animate Chains (Recharges after a Short or Long Rest). Up to four chains the devil can see within 60 feet of it magically sprout razor-­edged barbs and animate under the devil's control, provided that the chains aren't being worn or carried."
      }
    ],
    "reactions": [
      {
        "name": "Unnerving Mask",
        "description": "When a creature the devil can see starts its turn within 30 feet of the devil, the devil can create the illusion that it looks like one of the creature's departed loved ones or bitter enemies. If the creature can see the devil, it must succeed on a DC 14 Wisdom saving throw or be frightened until the end of its turn."
      }
    ]
  },
  {
    "id": "chimera_legacy",
    "name": "Chimera",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 14,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 114,
      "formula": "12d10+48"
    },
    "speed": "30 ft., fly 60 ft.",
    "stats": {
      "str": 19,
      "dex": 11,
      "con": 19,
      "int": 3,
      "wis": 14,
      "cha": 10
    },
    "skills": {
      "perception": 8
    },
    "senses": "Darkvision 60 ft., Passive Perception 18",
    "languages": "Understands Draconic but can't speak",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The chimera makes three attacks: one with its bite, one with its horns, and one with its claws. When its fire breath is available, it can use the breath in place of its bite or horns."
      },
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 11 (2d6 + 4) piercing."
      },
      {
        "id": "horns",
        "name": "Horns",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d12+4",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 10 (1d12 + 4) bludgeoning."
      },
      {
        "id": "claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 11 (2d6 + 4) slashing."
      },
      {
        "id": "fire_breath",
        "name": "Fire Breath (Recharge 5-6)",
        "type": "ability",
        "saveDc": 15,
        "saveStat": "dex",
        "damage": "7d8",
        "damageType": "Fire",
        "description": "The dragon head exhales fire in a 15-foot cone. Each creature in that area must make a DC 15 Dexterity saving throw, taking 31 (7d8) fire damage on a failed save, or half as much on a successful one."
      }
    ]
  },
  {
    "id": "ddb_chuul_legacy",
    "name": "Chuul",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 93,
      "formula": "11d10 + 33"
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
    "skills": {
      "perception": 4
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 14",
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
        "description": "The chuul senses magic within 120 feet of it at will. This trait otherwise works like the detect magic spell but isn't itself magical."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The chuul makes two pincer attacks. If the chuul is grappling a creature, the chuul can also use its tentacles once."
      },
      {
        "id": "act_1_pincer",
        "name": "Pincer",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage. The target is grappled (escape DC 14) if it is a Large or smaller creature and the chuul doesn't have two other creatures grappled ."
      },
      {
        "id": "act_2_tentacles",
        "name": "Tentacles",
        "type": "ability",
        "description": "One creature grappled by the chuul must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed . The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ddb_clay_golem_legacy",
    "name": "Clay Golem",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 133,
      "formula": "14d10 + 56"
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
    "damageImmunities": [
      "Acid",
      "Poison",
      "Psychic; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Adamantine"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Understands the languages of its creator but can&#x27;t speak",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Acid Absorption",
        "description": "Whenever the golem is subjected to acid damage, it takes no damage and instead regains a number of hit points equal to the acid damage dealt."
      },
      {
        "name": "Berserk",
        "description": "Whenever the golem starts its turn with 60 hit points or fewer, roll a d6 . On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it continues to do so until it is destroyed or regains all its hit points."
      },
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem’s weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d10+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw or have its hit point maximum reduced by an amount equal to the damage taken. The target dies if this attack reduces its hit point maximum to 0. The reduction lasts until removed by the greater restoration spell or other magic."
      },
      {
        "id": "act_2_haste__recharge_5_6__",
        "name": "Haste (Recharge 5–6) ",
        "type": "ability",
        "description": "Haste (Recharge 5–6) . Until the end of its next turn, the golem magically gains a +2 bonus to its AC, has advantage on Dexterity saving throws, and can use its slam attack as a bonus action."
      }
    ]
  },
  {
    "id": "ddb_cloaker_legacy",
    "name": "Cloaker",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Chaotic Neutral",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 78,
      "formula": "12d10 + 12"
    },
    "speed": "10 ft., Fly 40 ft.",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 12,
      "int": 13,
      "wis": 12,
      "cha": 14
    },
    "skills": {
      "stealth": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Deep Speech, Undercommon",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Damage Transfer",
        "description": "While attached to a creature, the cloaker takes only half the damage dealt to it (rounded down), and that creature takes the other half."
      },
      {
        "name": "False Appearance",
        "description": "While the cloaker remains motionless without its underside exposed, it is indistinguishable from a dark leather cloak."
      },
      {
        "name": "Light Sensitivity",
        "description": "While in bright light, the cloaker has disadvantage on attack rolls and Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The cloaker makes two attacks: one with its bite and one with its tail."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 10 (2d6 + 3) piercing damage, and if the target is Large or smaller, the cloaker attaches to it. If the cloaker has advantage against the target, the cloaker attaches to the target's head, and the target is blinded and unable to breathe while the cloaker is attached. While attached, the cloaker can make this attack only against the target and has advantage on the attack roll. The cloaker can detach itself by spending 5 feet of its movement. A creature, including the target, can take its action to detach the cloaker by succeeding on a DC 16 Strength check."
      },
      {
        "id": "act_2_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d8+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 7 (1d8 + 3) slashing damage."
      },
      {
        "id": "act_3_moan",
        "name": "Moan",
        "type": "ability",
        "description": "Each creature within 60 feet of the cloaker that can hear its moan and that isn't an aberration must succeed on a DC 13 Wisdom saving throw or become frightened until the end of the cloaker's next turn. If a creature's saving throw is successful, the creature is immune to the cloaker's moan for the next 24 hours."
      },
      {
        "id": "act_4_phantasms__recharges_after_a_short_or_long_rest_",
        "name": "Phantasms (Recharges after a Short or Long Rest)",
        "type": "ability",
        "description": "Phantasms (Recharges after a Short or Long Rest). The cloaker magically creates three illusory duplicates of itself if it isn't in bright light. The duplicates move with it and mimic its actions, shifting position so as to make it impossible to track which cloaker is the real one. If the cloaker is ever in an area of bright light, the duplicates disappear."
      }
    ]
  },
  {
    "id": "ddb_cloud_giant_legacy",
    "name": "Cloud Giant",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 200,
      "formula": "16d12 + 96"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 27,
      "dex": 10,
      "con": 22,
      "int": 12,
      "wis": 16,
      "cha": 16
    },
    "skills": {
      "insight": 7,
      "perception": 7
    },
    "senses": "Passive Perception 17",
    "languages": "Common, Giant",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The giant has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The giant's innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two morningstar attacks."
      },
      {
        "id": "act_1_morningstar",
        "name": "Morningstar",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 10,
        "damage": "3d8+8",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) piercing damage."
      },
      {
        "id": "act_2_rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 12,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "4d10+8",
        "damageType": "bludgeoning",
        "description": "Ranged Weapon Attack: +12 to hit, range 60/240 ft., one target. Hit: 30 (4d10 + 8) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_cockatrice_legacy",
    "name": "Cockatrice",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 27,
      "formula": "6d6 + 6"
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
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) piercing damage, and the target must succeed on a DC 11 Constitution saving throw against being magically petrified . On a failed save, the creature begins to turn to stone and is restrained . It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified for 24 hours."
      }
    ]
  },
  {
    "id": "ddb_commoner_legacy",
    "name": "Commoner",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
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
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_club",
        "name": "Club",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_constrictor_snake_legacy",
    "name": "Constrictor Snake",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
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
    "senses": "Blindsight 10 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_1_constrict",
        "name": "Constrict",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the creature is restrained , and the snake can't constrict another target."
      }
    ]
  },
  {
    "id": "ddb_copper_dragon_wyrmling_legacy",
    "name": "Copper Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "armorClass": 16,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4,
      "stealth": 3
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage."
      },
      {
        "id": "act_1_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_2_acid_breath",
        "name": "Acid Breath",
        "type": "ability",
        "damage": "4d8",
        "damageType": "acid",
        "description": "The dragon exhales acid in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 18 (4d8) acid damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_3_slowing_breath",
        "name": "Slowing Breath",
        "type": "ability",
        "description": "The dragon exhales gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save."
      }
    ]
  },
  {
    "id": "ddb_couatl_legacy",
    "name": "Couatl",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 97,
      "formula": "13d8 + 39"
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
    "damageResistances": [
      "Radiant"
    ],
    "damageImmunities": [
      "Psychic; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "senses": "Truesight 120 ft., Passive Perception 15",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The couatl's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring only verbal components:"
      },
      {
        "name": "Magic Weapons",
        "description": "The couatl's weapon attacks are magical."
      },
      {
        "name": "Shielded Mind",
        "description": "The couatl is immune to scrying and to any effect that would sense its emotions, read its thoughts, or detect its location."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "1d6+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 8 (1d6 + 5) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 24 hours. Until this poison ends, the target is unconscious . Another creature can use an action to shake the target awake."
      },
      {
        "id": "act_1_constrict",
        "name": "Constrict",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one Medium or smaller creature. Hit: 10 (2d6 + 3) bludgeoning damage, and the target is grappled (escape DC 15). Until this grapple ends, the target is restrained , and the couatl can't constrict another target."
      },
      {
        "id": "act_2_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The couatl magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the couatl's choice)."
      }
    ]
  },
  {
    "id": "ddb_crab_legacy",
    "name": "Crab",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 2,
      "formula": "1d4"
    },
    "speed": "20 ft., Swim 20 ft.",
    "stats": {
      "str": 2,
      "dex": 11,
      "con": 10,
      "int": 1,
      "wis": 8,
      "cha": 2
    },
    "skills": {
      "stealth": 2
    },
    "senses": "Blindsight 30 ft., Passive Perception 9",
    "languages": "--",
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
        "id": "act_0_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 0,
        "reachFeet": 5,
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_crocodile_legacy",
    "name": "Crocodile",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
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
    "skills": {
      "stealth": 2
    },
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 15 minutes."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained , and the crocodile can't bite another target."
      }
    ]
  },
  {
    "id": "ddb_cult_fanatic_legacy",
    "name": "Cult Fanatic",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Non-Good Alignment",
    "armorClass": 13,
    "armorDesc": "leather armor",
    "hitPoints": {
      "average": 33,
      "formula": "6d8 + 6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 14,
      "con": 12,
      "int": 10,
      "wis": 13,
      "cha": 14
    },
    "skills": {
      "deception": 4,
      "persuasion": 4,
      "religion": 2
    },
    "senses": "Passive Perception 11",
    "languages": "Any one language (usually Common)",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Dark Devotion",
        "description": "The fanatic has advantage on saving throws against being charmed or frightened ."
      },
      {
        "name": "Spellcasting",
        "description": "The fanatic is a 4th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 11, +3 to hit with spell attacks). The fanatic has the following cleric spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The fanatic makes two melee attacks."
      },
      {
        "id": "act_1_dagger",
        "name": "Dagger",
        "type": "ranged_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 4 (1d4 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_cultist_legacy",
    "name": "Cultist",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Non-Good Alignment",
    "armorClass": 12,
    "armorDesc": "leather armor",
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
    "skills": {
      "deception": 2,
      "religion": 2
    },
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Dark Devotion",
        "description": "The cultist has advantage on saving throws against being charmed or frightened ."
      }
    ],
    "actions": [
      {
        "id": "act_0_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_cyclops_legacy",
    "name": "Cyclops",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Neutral",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 138,
      "formula": "12d12 + 60"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 22,
      "dex": 11,
      "con": 20,
      "int": 8,
      "wis": 6,
      "cha": 10
    },
    "senses": "Passive Perception 8",
    "languages": "Giant",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Poor Depth Perception",
        "description": "The cyclops has disadvantage on any attack roll against a target more than 30 feet away."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The cyclops makes two greatclub attacks."
      },
      {
        "id": "act_1_greatclub",
        "name": "Greatclub",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "3d8+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage."
      },
      {
        "id": "act_2_rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 9,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "4d10+6",
        "damageType": "bludgeoning",
        "description": "Ranged Weapon Attack: +9 to hit, range 30/120 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_darkmantle_legacy",
    "name": "Darkmantle",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Monstrosity",
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
    "skills": {
      "stealth": 3
    },
    "senses": "Blindsight 60 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The darkmantle can’t use its blindsight while deafened ."
      },
      {
        "name": "False Appearance",
        "description": "While the darkmantle remains motionless, it is indistinguishable from a cave formation such as a stalactite or stalagmite."
      }
    ],
    "actions": [
      {
        "id": "act_0_crush",
        "name": "Crush",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d6 + 3) bludgeoning damage, and the darkmantle attaches to the target. If the target is Medium or smaller and the darkmantle has advantage on the attack roll, it attaches by engulfing the target’s head, and the target is also blinded and unable to breathe while the darkmantle is attached in this way."
      },
      {
        "id": "act_1_darkness_aura__1_day_",
        "name": "Darkness Aura (1/Day)",
        "type": "ability",
        "description": "Darkness Aura (1/Day). A 15­-foot radius of magical darkness extends out from the darkmantle, moves with it, and spreads around corners. The darkness lasts as long as the darkmantle maintains concentration, up to 10 minutes (as if concentrating on a spell). Darkvision can’t penetrate this darkness, and no natural light can illuminate it. If any of the darkness overlaps with an area of light created by a spell of 2nd level or lower, the spell creating the light is dispelled."
      }
    ]
  },
  {
    "id": "ddb_death_dog_legacy",
    "name": "Death Dog",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "senses": "Darkvision 120 ft., Passive Perception 15",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Two-Headed",
        "description": "The dog has advantage on Wisdom ( Perception ) checks and on saving throws against being blinded , charmed , deafened , frightened , stunned , or knocked unconscious ."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dog makes two bite attacks."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0."
      }
    ]
  },
  {
    "id": "ddb_deep_gnome__svirfneblin__legacy",
    "name": "Deep Gnome (Svirfneblin)",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Gnome",
    "alignment": "Neutral Good",
    "armorClass": 15,
    "armorDesc": "chain shirt",
    "hitPoints": {
      "average": 16,
      "formula": "3d6 + 6"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 14,
      "int": 12,
      "wis": 10,
      "cha": 9
    },
    "skills": {
      "investigation": 3,
      "perception": 2,
      "stealth": 4
    },
    "senses": "Darkvision 120 ft., Passive Perception 12",
    "languages": "Gnomish, Terran, Undercommon",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Stone Camouflage",
        "description": "The gnome has advantage on Dexterity ( Stealth ) checks made to hide in rocky terrain."
      },
      {
        "name": "Gnome Cunning",
        "description": "The gnome has advantage on Intelligence, Wisdom, and Charisma saving throws against magic."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The gnome’s innate spellcasting ability is Intelligence (spell save DC 11). It can innately cast the following spells, requiring no material components:"
      }
    ],
    "actions": [
      {
        "id": "act_0_war_pick",
        "name": "War Pick",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage."
      },
      {
        "id": "act_1_poisoned_dart",
        "name": "Poisoned Dart",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ddb_deer_legacy",
    "name": "Deer",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Passive Perception 12",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_deva_legacy",
    "name": "Deva",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 136,
      "formula": "16d8 + 64"
    },
    "speed": "30 ft., Fly 90 ft.",
    "stats": {
      "str": 18,
      "dex": 18,
      "con": 18,
      "int": 17,
      "wis": 20,
      "cha": 20
    },
    "skills": {
      "insight": 9,
      "perception": 9
    },
    "damageResistances": [
      "Radiant; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 19",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The deva's weapon attacks are magical. When the deva hits with any weapon, the weapon deals an extra 4d8 radiant damage (included in the attack)."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The deva's spellcasting ability is Charisma (spell save DC 17). The deva can innately cast the following spells, requiring only verbal components:"
      },
      {
        "name": "Magic Resistance",
        "description": "The deva has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The deva makes two melee attacks."
      },
      {
        "id": "act_1_mace",
        "name": "Mace",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage plus 18 (4d8) radiant damage."
      },
      {
        "id": "act_2_healing_touch__3_day_",
        "name": "Healing Touch (3/Day)",
        "type": "ability",
        "damage": "4d8+2",
        "description": "Healing Touch (3/Day). The deva touches another creature. The target magically regains 20 (4d8 + 2) hit points and is freed from any curse, disease, poison, blindness, or deafness."
      },
      {
        "id": "act_3_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The deva magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the deva's choice)."
      }
    ]
  },
  {
    "id": "ddb_dire_wolf_legacy",
    "name": "Dire Wolf",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 37,
      "formula": "5d10 + 10"
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
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone ."
      }
    ]
  },
  {
    "id": "ddb_diseased_giant_rat_legacy",
    "name": "Diseased Giant Rat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 7,
      "formula": "2d6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 7,
      "dex": 15,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit : 4 (1d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 10 Constitution saving throw or contract a disease. Until the disease is cured, the target can’t regain hit points except by magical means, and the target’s hit point maximum decreases by 3 (1d6) every 24 hours. If the target’s hit point maximum drops to 0 as a result of this disease, the target dies."
      }
    ]
  },
  {
    "id": "displacer_beast_legacy",
    "name": "Displacer Beast",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 85,
      "formula": "10d10+30"
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
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Avoidance",
        "description": "If the displacer beast is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails."
      },
      {
        "name": "Displacement",
        "description": "The displacer beast projects a magical illusion that makes it appear to be standing near its actual location, causing attack rolls against it to have disadvantage. If it is hit by an attack, this trait is disrupted until the end of its next turn."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The displacer beast makes two attacks with its tentacles."
      },
      {
        "id": "tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d6+4",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage plus 3 (1d6) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_djinni_legacy",
    "name": "Djinni",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Chaotic Good",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 161,
      "formula": "14d10 + 84"
    },
    "speed": "30 ft., Fly 90 ft.",
    "stats": {
      "str": 21,
      "dex": 15,
      "con": 22,
      "int": 15,
      "wis": 16,
      "cha": 20
    },
    "damageImmunities": [
      "Lightning",
      "Thunder"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 13",
    "languages": "Auran",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Elemental Demise",
        "description": "If the djinni dies, its body disintegrates into a warm breeze, leaving behind only equipment the djinni was wearing or carrying."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The djinni’s innate spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). It can innately cast the following spells, requiring no material components:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The djinni makes three scimitar attacks."
      },
      {
        "id": "act_1_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d6+5",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage plus 3 (1d6) lightning or thunder damage (djinni’s choice)."
      },
      {
        "id": "act_2_create_whirlwind",
        "name": "Create Whirlwind",
        "type": "ability",
        "description": "A 5-foot-radius, 30-foot-tall cylinder of swirling air magically forms on a point the djinni can see within 120 feet of it. The whirlwind lasts as long as the djinni maintains concentration (as if concentrating on a spell). Any creature but the djinni that enters the whirlwind must succeed on a DC 18 Strength saving throw or be restrained by it. The djinni can move the whirlwind up to 60 feet as an action, and creatures restrained by the whirlwind move with it. The whirlwind ends if the djinni loses sight of it."
      }
    ]
  },
  {
    "id": "ddb_doppelganger_legacy",
    "name": "Doppelganger",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Monstrosity",
    "subtype": "Shapechanger",
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
    "skills": {
      "deception": 6,
      "insight": 3
    },
    "conditionImmunities": [
      "Charmed"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Common",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Ambusher",
        "description": "The doppelganger has advantage on attack rolls against any creature it has surprised."
      },
      {
        "name": "Surprise Attack",
        "description": "If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The doppelganger makes two melee attacks."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage."
      },
      {
        "id": "act_2_read_thoughts",
        "name": "Read Thoughts",
        "type": "ability",
        "description": "The doppelganger magically reads the surface thoughts of one creature within 60 feet of it. The effect can penetrate barriers, but 3 feet of wood or dirt, 2 feet of stone, 2 inches of metal, or a thin sheet of lead blocks it. While the target is in range, the doppelganger can continue reading its thoughts, as long as the doppelganger's concentration isn't broken (as if concentrating on a spell). While reading the target's mind, the doppelganger has advantage on Wisdom ( Insight ) and Charisma ( Deception , Intimidation , and Persuasion ) checks against the target."
      }
    ]
  },
  {
    "id": "ddb_draft_horse_legacy",
    "name": "Draft Horse",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 10,
      "con": 12,
      "int": 2,
      "wis": 11,
      "cha": 7
    },
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d4+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_dragon_turtle_legacy",
    "name": "Dragon Turtle",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Neutral",
    "armorClass": 20,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 341,
      "formula": "22d20 + 110"
    },
    "speed": "20 ft., Swim 40 ft.",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 20,
      "int": 10,
      "wis": 12,
      "cha": 12
    },
    "damageResistances": [
      "Fire"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Aquan, Draconic",
    "challengeRating": "17",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon turtle can breathe air and water."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon turtle makes three attacks: one with its bite and two with its claws. It can make one tail attack in place of its two claw attacks."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 15,
        "damage": "3d12+7",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 10,
        "damage": "2d8+7",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 16 (2d8 + 7) slashing damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 15,
        "damage": "3d12+7",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be pushed up to 10 feet away from the dragon turtle and knocked prone ."
      },
      {
        "id": "act_4_steam_breath__recharge_5_6__",
        "name": "Steam Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "15d6",
        "damageType": "fire",
        "description": "Steam Breath (Recharge 5–6) . The dragon turtle exhales scalding steam in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 52 (15d6) fire damage on a failed save, or half as much damage on a successful one. Being underwater doesn't grant resistance against this damage."
      }
    ]
  },
  {
    "id": "ddb_dretch_legacy",
    "name": "Dretch",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 11,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 18,
      "formula": "4d6 + 4"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 11,
      "dex": 11,
      "con": 12,
      "int": 5,
      "wis": 8,
      "cha": 3
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
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Abyssal, Telepathy 60 ft.",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dretch makes two attacks: one with its bite and one with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "2d4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage."
      },
      {
        "id": "act_3_fetid_cloud__1_day_",
        "name": "Fetid Cloud (1/Day)",
        "type": "ability",
        "description": "Fetid Cloud (1/Day). A 10­-foot radius of disgusting green gas extends out from the dretch. The gas spreads around corners, and its area is lightly obscured. It lasts for 1 minute or until a strong wind disperses it. Any creature that starts its turn in that area must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn. While poisoned in this way, the target can take either an action or a bonus action on its turn, not both, and can't take reactions."
      }
    ]
  },
  {
    "id": "ddb_drider_legacy",
    "name": "Drider",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 123,
      "formula": "13d10 + 52"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 16,
      "dex": 16,
      "con": 18,
      "int": 13,
      "wis": 14,
      "cha": 12
    },
    "skills": {
      "perception": 5,
      "stealth": 9
    },
    "senses": "Darkvision 120 ft., Passive Perception 15",
    "languages": "Elvish, Undercommon",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fey Ancestry",
        "description": "The drider has advantage on saving throws against being charmed , and magic can’t put the drider to sleep."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The drider’s innate spellcasting ability is Wisdom (spell save DC 13). The drider can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Spider Climb",
        "description": "The drider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the drider has disadvantage on attack rolls, as well as on Wisdom ( Perception ) checks that rely on sight."
      },
      {
        "name": "Web Walker",
        "description": "The drider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The drider makes three attacks, either with its longsword or its longbow. It can replace one of those attacks with a bite attack."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 2 (1d4) piercing damage plus 9 (2d8) poison damage."
      },
      {
        "id": "act_2_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands."
      },
      {
        "id": "act_3_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "attackBonus": 6,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+3",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +6 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) poison damage."
      }
    ]
  },
  {
    "id": "ddb_drow_legacy",
    "name": "Drow",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Elf",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "armorDesc": "chain shirt",
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 10,
      "int": 11,
      "wis": 11,
      "cha": 12
    },
    "skills": {
      "perception": 2,
      "stealth": 4
    },
    "senses": "Darkvision 120 ft., Passive Perception 12",
    "languages": "Elvish, Undercommon",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Fey Ancestry",
        "description": "The drow has advantage on saving throws against being charmed , and magic can’t put the drow to sleep."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The drow’s spellcasting ability is Charisma (spell save DC 11). It can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_1_hand_crossbow",
        "name": "Hand Crossbow",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the target is also unconscious while poisoned in this way. The target wakes up if it takes damage or if another creature takes an action to shake it awake."
      }
    ]
  },
  {
    "id": "ddb_druid_legacy",
    "name": "Druid",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 11,
    "armorDesc": "16 with barkskin",
    "hitPoints": {
      "average": 27,
      "formula": "5d8 + 5"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 12,
      "con": 13,
      "int": 12,
      "wis": 15,
      "cha": 11
    },
    "skills": {
      "medicine": 4,
      "nature": 3,
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "Druidic plus any two languages",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The druid is a 4th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). It has the following druid spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_quarterstaff",
        "name": "Quarterstaff",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +2 to hit ( +4 to hit with shillelagh ), reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage, 4 (1d8) bludgeoning damage if wielded with two hands, or 6 (1d8 + 2) bludgeoning damage with shillelagh ."
      }
    ]
  },
  {
    "id": "ddb_dryad_legacy",
    "name": "Dryad",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Neutral",
    "armorClass": 11,
    "armorDesc": "16 with barkskin",
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
    "skills": {
      "perception": 4,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Elvish, Sylvan",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The dryad’s innate spellcasting ability is Charisma (spell save DC 14). The dryad can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Magic Resistance",
        "description": "The dryad has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Speak with Beasts and Plants",
        "description": "The dryad can communicate with beasts and plants as if they shared a language."
      },
      {
        "name": "Tree Stride",
        "description": "Once on her turn, the dryad can use 10 feet of her movement to step magically into one living tree within her reach and emerge from a second living tree within 60 feet of the first tree, appearing in an unoccupied space within 5 feet of the second tree. Both trees must be Large or bigger."
      }
    ],
    "actions": [
      {
        "id": "act_0_club",
        "name": "Club",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +2 to hit ( +6 to hit with shillelagh), reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage, or 8 (1d8 + 4) bludgeoning damage with shillelagh."
      },
      {
        "id": "act_1_fey_charm",
        "name": "Fey Charm",
        "type": "ability",
        "description": "The dryad targets one humanoid or beast that she can see within 30 feet of her. If the target can see the dryad, it must succeed on a DC 14 Wisdom saving throw or be magically charmed . The charmed creature regards the dryad as a trusted friend to be heeded and protected. Although the target isn’t under the dryad’s control, it takes the dryad’s requests or actions in the most favorable way it can."
      }
    ]
  },
  {
    "id": "ddb_duergar_legacy",
    "name": "Duergar",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Dwarf",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "armorDesc": "scale mail, shield",
    "hitPoints": {
      "average": 26,
      "formula": "4d8 + 8"
    },
    "speed": "25 ft.",
    "stats": {
      "str": 14,
      "dex": 11,
      "con": 14,
      "int": 11,
      "wis": 10,
      "cha": 9
    },
    "damageResistances": [
      "Poison"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Dwarvish, Undercommon",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Duergar Resilience",
        "description": "The duergar has advantage on saving throws against poison, spells, and illusions, as well as to resist being charmed or paralyzed ."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_enlarge__recharges_after_a_short_or_long_rest_",
        "name": "Enlarge (Recharges after a Short or Long Rest)",
        "type": "ability",
        "description": "Enlarge (Recharges after a Short or Long Rest). For 1 minute, the duergar magically increases in size, along with anything it is wearing or carrying. While enlarged, the duergar is Large, doubles its damage dice on Strength-based weapon attacks (included in the attacks), and makes Strength checks and Strength saving throws with advantage. If the duergar lacks the room to become Large, it attains the maximum size possible in the space available."
      },
      {
        "id": "act_1_war_pick",
        "name": "War Pick",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage, or 11 (2d8 + 2) piercing damage while enlarged."
      },
      {
        "id": "act_2_javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 9 (2d6 + 2) piercing damage while enlarged."
      },
      {
        "id": "act_3_invisibility__recharges_after_a_short_or_long_rest_",
        "name": "Invisibility (Recharges after a Short or Long Rest)",
        "type": "ability",
        "description": "Invisibility (Recharges after a Short or Long Rest). The duergar magically turns invisible until it attacks, casts a spell, or uses its Enlarge, or until its concentration is broken, up to 1 hour (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it."
      }
    ]
  },
  {
    "id": "ddb_dust_devil_legacy",
    "name": "Dust Devil",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 15,
    "hitPoints": {
      "average": 90,
      "formula": "12d10 + 24"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 14,
      "dex": 20,
      "con": 14,
      "int": 1,
      "wis": 10,
      "cha": 1
    },
    "damageResistances": [
      "Lightning",
      "Thunder; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
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
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Auran",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Air Form",
        "description": "The dust devil can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dust devil makes two slam attacks."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage."
      },
      {
        "id": "act_2_whirlwind__recharge_4_6__",
        "name": "Whirlwind (Recharge 4–6) ",
        "type": "ability",
        "damage": "3d8+2",
        "damageType": "bludgeoning",
        "description": "Whirlwind (Recharge 4–6) . Each creature in the dust devil's space must make a DC 13 Strength saving throw. On a failure, a target takes 15 (3d8 + 2) bludgeoning damage and is flung up 20 feet away from the dust devil in a random direction and knocked prone . If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone ."
      }
    ]
  },
  {
    "id": "ddb_dust_mephit_legacy",
    "name": "Dust Mephit",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Auran, Terran",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a burst of dust. Each creature within 5 feet of it must then succeed on a DC 10 Constitution saving throw or be blinded for 1 minute. A blinded creature can repeat the saving throw on each of its turns, ending the effect on itself on a success."
      },
      {
        "name": "Innate Spellcasting (1/Day)",
        "description": "Innate Spellcasting (1/Day). The mephit can innately cast sleep , requiring no material components. Its innate spellcasting ability is Charisma."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) slashing damage."
      },
      {
        "id": "act_1_blinding_breath__recharge_6__",
        "name": "Blinding Breath (Recharge 6) ",
        "type": "ability",
        "description": "Blinding Breath (Recharge 6) . The mephit exhales a 15- foot cone of blinding dust. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ddb_eagle_legacy",
    "name": "Eagle",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 3,
      "formula": "1d6"
    },
    "speed": "10 ft., Fly 60 ft.",
    "stats": {
      "str": 6,
      "dex": 15,
      "con": 10,
      "int": 2,
      "wis": 14,
      "cha": 7
    },
    "skills": {
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The eagle has advantage on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_talons",
        "name": "Talons",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_earth_elemental_legacy",
    "name": "Earth Elemental",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 126,
      "formula": "12d10 + 60"
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
    "damageVulnerabilities": [
      "Thunder"
    ],
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
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
    "senses": "Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 10",
    "languages": "Terran",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Earth Glide",
        "description": "The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through."
      },
      {
        "name": "Siege Monster",
        "description": "The elemental deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d8+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_efreeti_legacy",
    "name": "Efreeti",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 200,
      "formula": "16d10 + 112"
    },
    "speed": "40 ft., Fly 60 ft.",
    "stats": {
      "str": 22,
      "dex": 12,
      "con": 24,
      "int": 16,
      "wis": 15,
      "cha": 16
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 12",
    "languages": "Ignan",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Elemental Demise",
        "description": "If the efreeti dies, its body disintegrates in a flash of fire and puff of smoke, leaving behind only equipment the efreeti was wearing or carrying."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The efreeti’s innate spellcasting ability is Charisma (spell save DC 15, +7 to hit with spell attacks). It can innately cast the following spells, requiring no material components:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The efreeti makes two scimitar attacks or uses its Hurl Flame twice."
      },
      {
        "id": "act_1_scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage plus 7 (2d6) fire damage."
      },
      {
        "id": "act_2_hurl_flame",
        "name": "Hurl Flame",
        "type": "ranged_attack",
        "attackBonus": 7,
        "rangeFeet": 120,
        "damage": "5d6",
        "damageType": "fire",
        "description": "Ranged Spell Attack: +7 to hit, range 120 ft., one target. Hit: 17 (5d6) fire damage."
      }
    ]
  },
  {
    "id": "ddb_elephant_legacy",
    "name": "Elephant",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
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
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the elephant moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone . If the target is prone , the elephant can make one stomp attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_gore",
        "name": "Gore",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "3d8+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) piercing damage."
      },
      {
        "id": "act_1_stomp",
        "name": "Stomp",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "3d10+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_elk_legacy",
    "name": "Elk",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 13,
      "formula": "2d10 + 2"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 16,
      "dex": 10,
      "con": 12,
      "int": 2,
      "wis": 10,
      "cha": 6
    },
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the elk moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone ."
      }
    ],
    "actions": [
      {
        "id": "act_0_ram",
        "name": "Ram",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage."
      },
      {
        "id": "act_1_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d4+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one prone creature. Hit: 8 (2d4 + 3) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_erinyes_legacy",
    "name": "Erinyes",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "armorDesc": "plate",
    "hitPoints": {
      "average": 153,
      "formula": "18d8 + 72"
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
    "damageResistances": [
      "Cold; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Truesight 120 ft., Passive Perception 12",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "12",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Hellish Weapons",
        "description": "The erinyes's weapon attacks are magical and deal an extra 13 (3d8) poison damage on a hit (included in the attacks)."
      },
      {
        "name": "Magic Resistance",
        "description": "The erinyes has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The erinyes makes three attacks."
      },
      {
        "id": "act_1_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 13 (3d8) poison damage."
      },
      {
        "id": "act_2_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "attackBonus": 7,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+3",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage, and the target must succeed on a DC 14 Constitution saving throw or be poisoned . The poison lasts until it is removed by the lesser restoration spell or similar magic."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The erinyes adds 4 to its AC against one melee attack that would hit it. To do so, the erinyes must see the attacker and be wielding a melee weapon."
      }
    ]
  },
  {
    "id": "ddb_ettercap_legacy",
    "name": "Ettercap",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 3,
      "stealth": 4,
      "survival": 3
    },
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The ettercap can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the ettercap knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The ettercap ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ettercap makes two attacks: one with its bite and one with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage plus 4 (1d8) poison damage. The target must succeed on a DC 11 Constitution saving throw or be poisoned for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage."
      },
      {
        "id": "act_3_web__recharge_5_6__",
        "name": "Web (Recharge 5–6) ",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 30,
        "rangeLongFeet": 60,
        "damageType": "fire",
        "description": "Web (Recharge 5–6) . Ranged Weapon Attack: +4 to hit, range 30/60 ft., one Large or smaller creature. Hit: The creature is restrained by webbing. As an action, the restrained creature can make a DC 11 Strength check, escaping from the webbing on a success. The effect also ends if the webbing is destroyed. The webbing has AC 10, 5 hit points, vulnerability to fire damage, and immunity to bludgeoning, poison, and psychic damage."
      }
    ]
  },
  {
    "id": "ddb_ettin_legacy",
    "name": "Ettin",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Giant, Orc",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Two Heads",
        "description": "The ettin has advantage on Wisdom ( Perception ) checks and on saving throws against being blinded , charmed , deafened , frightened , stunned , and knocked unconscious ."
      },
      {
        "name": "Wakeful",
        "description": "When one of the ettin’s heads is asleep, its other head is awake."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ettin makes two attacks: one with its battleaxe and one with its morningstar."
      },
      {
        "id": "act_1_battleaxe",
        "name": "Battleaxe",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage."
      },
      {
        "id": "act_2_morningstar",
        "name": "Morningstar",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage."
      }
    ]
  },
  {
    "id": "fire_elemental_legacy",
    "name": "Fire Elemental",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 13,
    "hitPoints": {
      "average": 102,
      "formula": "12d10+36"
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
    "damageResistances": [
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "exhaustion",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "unconscious"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Ignan",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fire Form",
        "description": "The elemental can move through a space as narrow as 1 inch wide without squeezing. A creature that touches the elemental or hits it with a melee attack while within 5 ft. takes 5 (1d10) fire damage."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elemental makes two touch attacks."
      },
      {
        "id": "touch",
        "name": "Touch",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "Fire",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) fire damage. If the target is a creature or flammable object, it ignites."
      }
    ]
  },
  {
    "id": "fire_giant_legacy",
    "name": "Fire Giant",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "armorDesc": "Plate",
    "hitPoints": {
      "average": 162,
      "formula": "13d12+78"
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
      "dex": 3,
      "con": 10,
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
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two greatsword attacks."
      },
      {
        "id": "greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "6d6+7",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft. Hit: 28 (6d6 + 7) slashing."
      },
      {
        "id": "rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 11,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "4d10+7",
        "damageType": "Bludgeoning",
        "description": "Ranged Weapon Attack: +11 to hit, range 60/240 ft. Hit: 29 (4d10 + 7) bludgeoning."
      }
    ]
  },
  {
    "id": "ddb_flameskull_legacy",
    "name": "Flameskull",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 40,
      "formula": "9d4 + 18"
    },
    "speed": "0 ft., Fly 40 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 17,
      "con": 14,
      "int": 16,
      "wis": 10,
      "cha": 11
    },
    "skills": {
      "arcana": 5,
      "perception": 2
    },
    "damageResistances": [
      "Lightning",
      "Necrotic",
      "Piercing"
    ],
    "damageImmunities": [
      "Cold",
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Paralyzed",
      "Poisoned",
      "Prone"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Common",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Illumination",
        "description": "The flameskull sheds either dim light in a 15-foot radius, or bright light in a 15-foot radius and dim light for an additional 15 feet. It can switch between the options as an action."
      },
      {
        "name": "Magic Resistance",
        "description": "The flameskull has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Rejuvenation",
        "description": "If the flameskull is destroyed, it regains all its hit points in 1 hour unless holy water is sprinkled on its remains or a dispel magic or remove curse spell is cast on them."
      },
      {
        "name": "Spellcasting",
        "description": "The flameskull is a 5th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 13, +5 to hit with spell attacks). It requires no somatic or material components to cast its spells. The flameskull has the following wizard spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The flameskull uses Fire Ray twice."
      },
      {
        "id": "act_1_fire_ray",
        "name": "Fire Ray",
        "type": "ranged_attack",
        "attackBonus": 5,
        "rangeFeet": 30,
        "damage": "3d6",
        "damageType": "fire",
        "description": "Ranged Spell Attack: +5 to hit, range 30 ft., one target. Hit: 10 (3d6) fire damage."
      }
    ]
  },
  {
    "id": "flesh_golem_legacy",
    "name": "Flesh Golem",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Construct",
    "alignment": "Neutral",
    "armorClass": 9,
    "hitPoints": {
      "average": 93,
      "formula": "11d8+44"
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
    "damageImmunities": [
      "Lightning",
      "Poison",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks That Aren't Adamantine"
    ],
    "conditionImmunities": [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Understands the languages of its creator but can't speak",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Berserk",
        "description": "Whenever the golem starts its turn with 40 hit points or fewer, roll a d6. On a 6, the golem goes berserk."
      },
      {
        "name": "Aversion to Fire",
        "description": "If the golem takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn."
      },
      {
        "name": "Lightning Absorption",
        "description": "Whenever the golem is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "id": "slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 13 (2d8 + 4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_flying_snake_legacy",
    "name": "Flying Snake",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 5,
      "formula": "2d4"
    },
    "speed": "30 ft., Fly 60 ft., Swim 30 ft.",
    "stats": {
      "str": 4,
      "dex": 18,
      "con": 11,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "senses": "Blindsight 10 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The snake doesn't provoke opportunity attacks when it flies out of an enemy's reach."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "3d4",
        "damageType": "poison",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 1 piercing damage plus 7 (3d4) poison damage."
      }
    ]
  },
  {
    "id": "ddb_flying_sword_legacy",
    "name": "Flying Sword",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 17,
      "formula": "5d6"
    },
    "speed": "0 ft., Fly 50 ft. (hover)",
    "stats": {
      "str": 12,
      "dex": 15,
      "con": 11,
      "int": 1,
      "wis": 5,
      "cha": 1
    },
    "damageImmunities": [
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 7",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The sword is incapacitated while in the area of an antimagic field . If targeted by dispel magic , the sword must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute."
      },
      {
        "name": "False Appearance",
        "description": "While the sword remains motionless and isn't flying, it is indistinguishable from a normal sword."
      }
    ],
    "actions": [
      {
        "id": "act_0_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d8+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_frog_legacy",
    "name": "Frog",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
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
    "skills": {
      "perception": 1,
      "stealth": 3
    },
    "senses": "Darkvision 30 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The frog can breathe air and water."
      },
      {
        "name": "Standing Leap",
        "description": "The frog's long jump is up to 10 feet and its high jump is up to 5 feet, with or without a running start."
      }
    ],
    "actions": []
  },
  {
    "id": "frost_giant_legacy",
    "name": "Frost Giant",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "armorDesc": "Patchwork Armor",
    "hitPoints": {
      "average": 138,
      "formula": "12d12+60"
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
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two greataxe attacks."
      },
      {
        "id": "greataxe",
        "name": "Greataxe",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "3d12+6",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft. Hit: 25 (3d12 + 6) slashing."
      },
      {
        "id": "rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 9,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "4d10+6",
        "damageType": "Bludgeoning",
        "description": "Ranged Weapon Attack: +9 to hit, range 60/240 ft. Hit: 28 (4d10 + 6) bludgeoning."
      }
    ]
  },
  {
    "id": "ddb_gargoyle_legacy",
    "name": "Gargoyle",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 52,
      "formula": "7d8 + 21"
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
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Adamantine"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Terran",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the gargoyle remains motionless, it is indistinguishable from an inanimate statue."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The gargoyle makes two attacks: one with its bite and one with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage."
      }
    ]
  },
  {
    "id": "gelatinous_cube_legacy",
    "name": "Gelatinous Cube",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "armorClass": 6,
    "hitPoints": {
      "average": 84,
      "formula": "8d10+40"
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
    "conditionImmunities": [
      "blinded",
      "charmed",
      "deafened",
      "exhaustion",
      "prone"
    ],
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 8",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ooze Cube",
        "description": "The cube takes up its entire space. Other creatures can enter the space, but a creature that does so is subjected to the cube's Engulf and has disadvantage on the saving throw."
      },
      {
        "name": "Transparent",
        "description": "Even when the cube is in plain sight, it takes a successful DC 15 Wisdom (Perception) check to spot a cube that has neither moved nor attacked."
      }
    ],
    "actions": [
      {
        "id": "pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "3d6",
        "damageType": "Acid",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) acid damage."
      },
      {
        "id": "engulf",
        "name": "Engulf",
        "type": "ability",
        "saveDc": 12,
        "saveStat": "dex",
        "damage": "3d6",
        "damageType": "Acid",
        "description": "The cube moves up to its speed. While doing so, it can enter Large or smaller creatures' spaces. Target must make a DC 12 Dexterity saving throw. On a failure, creature enters cube space, takes 10 (3d6) acid damage and is engulfed."
      }
    ]
  },
  {
    "id": "ddb_ghast_legacy",
    "name": "Ghast",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Stench",
        "description": "Any creature that starts its turn within 5 feet of the ghast must succeed on a DC 10 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the ghast's Stench for 24 hours."
      },
      {
        "name": "Turning Defiance",
        "description": "The ghast and any ghouls within 30 feet of it have advantage on saving throws against effects that turn undead."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d8+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 12 (2d8 + 3) piercing damage."
      },
      {
        "id": "act_1_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a creature other than an undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ghost_legacy",
    "name": "Ghost",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Any Alignment",
    "armorClass": 11,
    "hitPoints": {
      "average": 45,
      "formula": "10d8"
    },
    "speed": "0 ft., fly 40 ft. (hover)",
    "stats": {
      "str": 7,
      "dex": 13,
      "con": 10,
      "int": 10,
      "wis": 12,
      "cha": 17
    },
    "damageResistances": [
      "Acid",
      "Fire",
      "Lightning",
      "Thunder",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Cold",
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "charmed",
      "exhaustion",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Any languages it knew in life",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ethereal Sight",
        "description": "The ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane, and vice versa."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The ghost can move through other creatures and objects as if they were difficult terrain. Takes 5 (1d10) force damage if it ends its turn inside an object."
      }
    ],
    "actions": [
      {
        "id": "withering_touch",
        "name": "Withering Touch",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "4d6+3",
        "damageType": "Necrotic",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) necrotic damage."
      },
      {
        "id": "possession",
        "name": "Possession (Recharge 6)",
        "type": "ability",
        "saveDc": 13,
        "saveStat": "cha",
        "description": "One humanoid that the ghost can see within 5 ft. must succeed on a DC 13 Charisma saving throw or be possessed by the ghost."
      }
    ]
  },
  {
    "id": "ghoul_legacy",
    "name": "Ghoul",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
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
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "charmed",
      "exhaustion",
      "poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft. Hit: 9 (2d6 + 2) piercing."
      },
      {
        "id": "claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "Slashing",
        "saveDc": 10,
        "saveStat": "con",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft. Hit: 7 (2d4 + 2) slashing. Target must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute (elf or undead immune)."
      }
    ]
  },
  {
    "id": "ddb_giant_ape_legacy",
    "name": "Giant Ape",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 157,
      "formula": "15d12 + 60"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 23,
      "dex": 14,
      "con": 18,
      "int": 7,
      "wis": 12,
      "cha": 7
    },
    "skills": {
      "athletics": 9,
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "--",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The ape makes two fist attacks."
      },
      {
        "id": "act_1_fist",
        "name": "Fist",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "3d10+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) bludgeoning damage."
      },
      {
        "id": "act_2_rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 9,
        "rangeFeet": 50,
        "rangeLongFeet": 100,
        "damage": "7d6+6",
        "damageType": "bludgeoning",
        "description": "Ranged Weapon Attack: +9 to hit, range 50/100 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_giant_badger_legacy",
    "name": "Giant Badger",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 13,
      "formula": "2d8 + 4"
    },
    "speed": "30 ft., Burrow 10 ft.",
    "stats": {
      "str": 13,
      "dex": 10,
      "con": 15,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "senses": "Darkvision 30 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The badger has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The badger makes two attacks: one with its bite and one with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d4+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_bat_legacy",
    "name": "Giant Bat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Blindsight 60 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The bat can't use its blindsight while deafened ."
      },
      {
        "name": "Keen Hearing",
        "description": "The bat has advantage on Wisdom ( Perception ) checks that rely on hearing."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_boar_legacy",
    "name": "Giant Boar",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
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
    "senses": "Passive Perception 8",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the boar moves at least 20 feet straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 7 (2d6) slashing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone ."
      },
      {
        "name": "Relentless (Recharges after a Short or Long Rest)",
        "description": "Relentless (Recharges after a Short or Long Rest). If the boar takes 10 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_tusk",
        "name": "Tusk",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_centipede_legacy",
    "name": "Giant Centipede",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 4,
      "formula": "1d6 + 1"
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
    "senses": "Blindsight 30 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or take 10 (3d6) poison damage. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way."
      }
    ]
  },
  {
    "id": "ddb_giant_constrictor_snake_legacy",
    "name": "Giant Constrictor Snake",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 2
    },
    "senses": "Blindsight 10 ft., Passive Perception 12",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage."
      },
      {
        "id": "act_1_constrict",
        "name": "Constrict",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 13 (2d8 + 4) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the creature is restrained , and the snake can't constrict another target."
      }
    ]
  },
  {
    "id": "ddb_giant_crab_legacy",
    "name": "Giant Crab",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 13,
      "dex": 15,
      "con": 11,
      "int": 1,
      "wis": 9,
      "cha": 3
    },
    "skills": {
      "stealth": 4
    },
    "senses": "Blindsight 30 ft., Passive Perception 9",
    "languages": "--",
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
        "id": "act_0_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage, and the target is grappled (escape DC 11). The crab has two claws, each of which can grapple only one target."
      }
    ]
  },
  {
    "id": "ddb_giant_crocodile_legacy",
    "name": "Giant Crocodile",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "armorDesc": "natural armor",
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
    "skills": {
      "stealth": 5
    },
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 30 minutes."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The crocodile makes two attacks: one with its bite and one with its tail."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "3d10+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 21 (3d10 + 5) piercing damage, and the target is grappled (escape DC 16). Until this grapple ends, the target is restrained , and the crocodile can't bite another target."
      },
      {
        "id": "act_2_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d8+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target not grappled by the crocodile. Hit: 14 (2d8 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 16 Strength saving throw or be knocked prone ."
      }
    ]
  },
  {
    "id": "ddb_giant_eagle_legacy",
    "name": "Giant Eagle",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
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
    "skills": {
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "Giant Eagle , understands Common and Auran but can&#x27;t speak them",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The eagle has advantage on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The eagle makes two attacks: one with its beak and one with its talons."
      },
      {
        "id": "act_1_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "id": "act_2_talons",
        "name": "Talons",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_elk_legacy",
    "name": "Giant Elk",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 42,
      "formula": "5d12 + 10"
    },
    "speed": "60 ft.",
    "stats": {
      "str": 19,
      "dex": 16,
      "con": 14,
      "int": 7,
      "wis": 14,
      "cha": 10
    },
    "skills": {
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "Giant Elk , understands Common, Elvish, and Sylvan but can&#x27;t speak them",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the elk moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone ."
      }
    ],
    "actions": [
      {
        "id": "act_0_ram",
        "name": "Ram",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      },
      {
        "id": "act_1_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "4d8+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one prone creature. Hit: 22 (4d8 + 4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_giant_fire_beetle_legacy",
    "name": "Giant Fire Beetle",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 4,
      "formula": "1d6 + 1"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 8,
      "dex": 10,
      "con": 12,
      "int": 1,
      "wis": 7,
      "cha": 3
    },
    "senses": "Blindsight 30 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Illumination",
        "description": "The beetle sheds bright light in a 10-foot radius and dim light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 1,
        "reachFeet": 5,
        "damage": "1d6-1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 − 1) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_frog_legacy",
    "name": "Giant Frog",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 2,
      "stealth": 3
    },
    "senses": "Darkvision 30 ft., Passive Perception 12",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The frog can breathe air and water."
      },
      {
        "name": "Standing Leap",
        "description": "The frog's long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage, and the target is grappled (escape DC 11). Until this grapple ends, the target is restrained , and the frog can't bite another target."
      },
      {
        "id": "act_1_swallow",
        "name": "Swallow",
        "type": "ability",
        "damage": "2d4",
        "damageType": "acid",
        "description": "The frog makes one bite attack against a Small or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained , it has total cover against attacks and other effects outside the frog, and it takes 5 (2d4) acid damage at the start of each of the frog's turns. The frog can have only one target swallowed at a time. If the frog dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 feet of movement, exiting prone ."
      }
    ]
  },
  {
    "id": "ddb_giant_goat_legacy",
    "name": "Giant Goat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 17,
      "dex": 11,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "senses": "Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the goat moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 5 (2d4) bludgeoning damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone ."
      },
      {
        "name": "Sure-Footed",
        "description": "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone ."
      }
    ],
    "actions": [
      {
        "id": "act_0_ram",
        "name": "Ram",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d4+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_giant_hyena_legacy",
    "name": "Giant Hyena",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Rampage",
        "description": "When the hyena reduces a creature to 0 hit points with a melee attack on its turn, the hyena can take a bonus action to move up to half its speed and make a bite attack."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_lizard_legacy",
    "name": "Giant Lizard",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 15,
      "dex": 12,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "senses": "Darkvision 30 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_octopus_legacy",
    "name": "Giant Octopus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 52,
      "formula": "8d10 + 8"
    },
    "speed": "10 ft., Swim 60 ft.",
    "stats": {
      "str": 17,
      "dex": 13,
      "con": 13,
      "int": 4,
      "wis": 10,
      "cha": 4
    },
    "skills": {
      "perception": 4,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "While out of water, the octopus can hold its breath for 1 hour."
      },
      {
        "name": "Underwater Camouflage",
        "description": "The octopus has advantage on Dexterity ( Stealth ) checks made while underwater."
      },
      {
        "name": "Water Breathing",
        "description": "The octopus can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_0_tentacles",
        "name": "Tentacles",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 15,
        "damage": "2d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 15 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If the target is a creature, it is grappled (escape DC 16). Until this grapple ends, the target is restrained , and the octopus can't use its tentacles on another target."
      },
      {
        "id": "act_1_ink_cloud__recharges_after_a_short_or_long_rest_",
        "name": "Ink Cloud (Recharges after a Short or Long Rest)",
        "type": "ability",
        "description": "Ink Cloud (Recharges after a Short or Long Rest). A 20-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action."
      }
    ]
  },
  {
    "id": "ddb_giant_owl_legacy",
    "name": "Giant Owl",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
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
      "int": 8,
      "wis": 13,
      "cha": 10
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "senses": "Darkvision 120 ft., Passive Perception 15",
    "languages": "Giant Owl , understands Common, Elvish, and Sylvan but can’t speak them",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach."
      },
      {
        "name": "Keen Hearing and Sight",
        "description": "The owl has advantage on Wisdom ( Perception ) checks that rely on hearing or sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_talons",
        "name": "Talons",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d6+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 8 (2d6 + 1) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_poisonous_snake_legacy",
    "name": "Giant Poisonous Snake",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 10,
      "dex": 18,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "skills": {
      "perception": 2
    },
    "senses": "Blindsight 10 ft., Passive Perception 12",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d4+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 6 (1d4 + 4) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_giant_rat_legacy",
    "name": "Giant Rat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 7,
      "formula": "2d6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 7,
      "dex": 15,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit : 4 (1d4 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_scorpion_legacy",
    "name": "Giant Scorpion",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 52,
      "formula": "7d10 + 14"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 15,
      "dex": 13,
      "con": 15,
      "int": 1,
      "wis": 9,
      "cha": 3
    },
    "senses": "Blindsight 60 ft., Passive Perception 9",
    "languages": "--",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The scorpion makes three attacks: two with its claws and one with its sting."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 12). The scorpion has two claws, each of which can grapple only one target."
      },
      {
        "id": "act_2_sting",
        "name": "Sting",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 12 Constitution saving throw, taking 22 (4d10) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_giant_sea_horse_legacy",
    "name": "Giant Sea Horse",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 16,
      "formula": "3d10"
    },
    "speed": "0 ft., Swim 40 ft.",
    "stats": {
      "str": 12,
      "dex": 15,
      "con": 11,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "senses": "Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the sea horse moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) bludgeoning damage. It the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone ."
      },
      {
        "name": "Water Breathing",
        "description": "The sea horse can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_0_ram",
        "name": "Ram",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_giant_shark_legacy",
    "name": "Giant Shark",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 126,
      "formula": "11d12 + 55"
    },
    "speed": "0 ft., Swim 50 ft.",
    "stats": {
      "str": 23,
      "dex": 11,
      "con": 21,
      "int": 1,
      "wis": 10,
      "cha": 5
    },
    "skills": {
      "perception": 3
    },
    "senses": "Blindsight 60 ft., Passive Perception 13",
    "languages": "--",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The shark has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "3d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 22 (3d10 + 6) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_spider_legacy",
    "name": "Giant Spider",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "armorDesc": "natural armor",
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
    "skills": {
      "stealth": 7
    },
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 9 (2d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way."
      },
      {
        "id": "act_1_web__recharge_5_6__",
        "name": "Web (Recharge 5–6) ",
        "type": "ranged_attack",
        "attackBonus": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 60,
        "damageType": "fire",
        "description": "Web (Recharge 5–6) . Ranged Weapon Attack: +5 to hit, range 30/60 ft., one creature. Hit: The target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage)."
      }
    ]
  },
  {
    "id": "ddb_giant_toad_legacy",
    "name": "Giant Toad",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 39,
      "formula": "6d10 + 6"
    },
    "speed": "20 ft., Swim 40 ft.",
    "stats": {
      "str": 15,
      "dex": 13,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "senses": "Darkvision 30 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The toad can breathe air and water."
      },
      {
        "name": "Standing Leap",
        "description": "The toad's long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 5 (1d10) poison damage, and the target is grappled (escape DC 13). Until this grapple ends, the target is restrained , and the toad can't bite another target."
      },
      {
        "id": "act_1_swallow",
        "name": "Swallow",
        "type": "ability",
        "damage": "3d6",
        "damageType": "acid",
        "description": "The toad makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained , it has total cover against attacks and other effects outside the toad, and it takes 10 (3d6) acid damage at the start of each of the toad's turns. The toad can have only one target swallowed at a time. If the toad dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 feet of movement, exiting prone ."
      }
    ]
  },
  {
    "id": "ddb_giant_vulture_legacy",
    "name": "Giant Vulture",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Neutral Evil",
    "armorClass": 10,
    "hitPoints": {
      "average": 22,
      "formula": "3d10 + 6"
    },
    "speed": "10 ft., Fly 60 ft.",
    "stats": {
      "str": 15,
      "dex": 10,
      "con": 15,
      "int": 6,
      "wis": 12,
      "cha": 7
    },
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "Understands Common but can&#x27;t speak it",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight and Smell",
        "description": "The vulture has advantage on Wisdom ( Perception ) checks that rely on sight or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The vulture has advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The vulture makes two attacks: one with its beak and one with its talons."
      },
      {
        "id": "act_1_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage."
      },
      {
        "id": "act_2_talons",
        "name": "Talons",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_wasp_legacy",
    "name": "Giant Wasp",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
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
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_sting",
        "name": "Sting",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way."
      }
    ]
  },
  {
    "id": "ddb_giant_weasel_legacy",
    "name": "Giant Weasel",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 9,
      "formula": "2d8"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 11,
      "dex": 16,
      "con": 10,
      "int": 4,
      "wis": 12,
      "cha": 5
    },
    "skills": {
      "perception": 3,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The weasel has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_giant_wolf_spider_legacy",
    "name": "Giant Wolf Spider",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 3,
      "stealth": 7
    },
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 13",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 7 (2d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way."
      }
    ]
  },
  {
    "id": "ddb_gibbering_mouther_legacy",
    "name": "Gibbering Mouther",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral",
    "armorClass": 9,
    "hitPoints": {
      "average": 67,
      "formula": "9d8 + 27"
    },
    "speed": "10 ft., Swim 10 ft.",
    "stats": {
      "str": 10,
      "dex": 8,
      "con": 16,
      "int": 3,
      "wis": 10,
      "cha": 6
    },
    "conditionImmunities": [
      "Prone"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aberrant Ground",
        "description": "The ground in a 10-foot radius around the mouther is doughlike difficult terrain. Each creature that starts its turn in that area must succeed on a DC 10 Strength saving throw or have its speed reduced to 0 until the start of its next turn."
      },
      {
        "name": "Gibbering",
        "description": "The mouther babbles incoherently while it can see any creature and isn’t incapacitated . Each creature that starts its turn within 20 feet of the mouther and can hear the gibbering must succeed on a DC 10 Wisdom saving throw. On a failure, the creature can’t take reactions until the start of its next turn and rolls a d8 to determine what it does during its turn. On a 1 to 4, the creature does nothing. On a 5 or 6, the creature takes no action or bonus action and uses all its movement to move in a randomly determined direction. On a 7 or 8, the creature makes a melee attack against a randomly determined creature within its reach or does nothing if it can’t make such an attack."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The gibbering mouther makes one bite attack and, if it can, uses its Blinding Spittle."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "5d6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 17 (5d6) piercing damage. If the target is Medium or smaller, it must succeed on a DC 10 Strength saving throw or be knocked prone . If the target is killed by this damage, it is absorbed into the mouther."
      },
      {
        "id": "act_2_blinding_spittle__recharge_5_6__",
        "name": "Blinding Spittle (Recharge 5–6) ",
        "type": "ability",
        "description": "Blinding Spittle (Recharge 5–6) . The mouther spits a chemical glob at a point it can see within 15 feet of it. The glob explodes in a blinding flash of light on impact. Each creature within 5 feet of the flash must succeed on a DC 13 Dexterity saving throw or be blinded until the end of the mouther’s next turn."
      }
    ]
  },
  {
    "id": "ddb_glabrezu_legacy",
    "name": "Glabrezu",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 157,
      "formula": "15d10 + 75"
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
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Truesight 120 ft., Passive Perception 13",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The glabrezu's spellcasting ability is Intelligence (spell save DC 16). The glabrezu can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Magic Resistance",
        "description": "The glabrezu has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The glabrezu makes four attacks: two with its pincers and two with its fists. Alternatively, it makes two attacks with its pincers and casts one spell."
      },
      {
        "id": "act_1_pincer",
        "name": "Pincer",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "2d10+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a Medium or smaller creature, it is grappled (escape DC 15). The glabrezu has two pincers, each of which can grapple only one target."
      },
      {
        "id": "act_2_fist",
        "name": "Fist",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_gladiator_legacy",
    "name": "Gladiator",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 16,
    "armorDesc": "studded leather, shield",
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
    "skills": {
      "athletics": 10,
      "intimidation": 5
    },
    "senses": "Passive Perception 11",
    "languages": "Any one language (usually Common)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Brave",
        "description": "The gladiator has advantage on saving throws against being frightened ."
      },
      {
        "name": "Brute",
        "description": "A melee weapon deals one extra die of its damage when the gladiator hits with it (included in the attack)."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The gladiator makes three melee attacks or two ranged attacks."
      },
      {
        "id": "act_1_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "2d6+4",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. and range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack."
      },
      {
        "id": "act_2_shield_bash",
        "name": "Shield Bash",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d4+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 9 (2d4 + 4) bludgeoning damage. If the target is a Medium or smaller creature, it must succeed on a DC 15 Strength saving throw or be knocked prone ."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The gladiator adds 3 to its AC against one melee attack that would hit it. To do so, the gladiator must see the attacker and be wielding a melee weapon."
      }
    ]
  },
  {
    "id": "ddb_gnoll_legacy",
    "name": "Gnoll",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Gnoll",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "armorDesc": "hide armor, shield",
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
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
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Gnoll",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Rampage",
        "description": "When the gnoll reduces a creature to 0 hit points with a melee attack on its turn, the gnoll can take a bonus action to move up to half its speed and make a bite attack."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage."
      },
      {
        "id": "act_1_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack."
      },
      {
        "id": "act_2_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "attackBonus": 3,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+1",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_goat_legacy",
    "name": "Goat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 4,
      "formula": "1d8"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 12,
      "dex": 10,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the goat moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 2 (1d4) bludgeoning damage. If the target is a creature, it must succeed on a DC 10 Strength saving throw or be knocked prone ."
      },
      {
        "name": "Sure-Footed",
        "description": "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone ."
      }
    ],
    "actions": [
      {
        "id": "act_0_ram",
        "name": "Ram",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage."
      }
    ]
  },
  {
    "id": "goblin_legacy",
    "name": "Goblin",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Goblinoid",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "armorDesc": "Leather Armor, Shield",
    "hitPoints": {
      "average": 7,
      "formula": "2d6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 8,
      "dex": 14,
      "con": 10,
      "int": 10,
      "wis": 8,
      "cha": 8
    },
    "skills": {
      "stealth": 6
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Common, Goblin",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Nimble Escape",
        "description": "The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
      }
    ],
    "actions": [
      {
        "id": "scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage."
      },
      {
        "id": "shortbow",
        "name": "Shortbow",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d6+2",
        "damageType": "Piercing",
        "description": "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "goblin_boss_legacy",
    "name": "Goblin Boss",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Goblinoid",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "armorDesc": "Chain Shirt, Shield",
    "hitPoints": {
      "average": 21,
      "formula": "6d6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 10,
      "int": 10,
      "wis": 8,
      "cha": 10
    },
    "skills": {
      "stealth": 6
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Common, Goblin",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Nimble Escape",
        "description": "Can take Disengage or Hide as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The goblin boss makes two attacks with its scimitar."
      },
      {
        "id": "scimitar",
        "name": "Scimitar",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft. Hit: 5 (1d6 + 2) slashing."
      },
      {
        "id": "javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "attackBonus": 2,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6",
        "damageType": "Piercing",
        "description": "Ranged Weapon Attack: +2 to hit, range 30/120 ft. Hit: 3 (1d6) piercing."
      }
    ],
    "reactions": [
      {
        "name": "Redirect Attack",
        "description": "When a creature the goblin boss can see targets it with an attack, the goblin boss chooses another goblin within 5 ft. The attack targets that goblin instead."
      }
    ]
  },
  {
    "id": "ddb_gold_dragon_wyrmling_legacy",
    "name": "Gold Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4,
      "stealth": 4
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": []
  },
  {
    "id": "ddb_gorgon_legacy",
    "name": "Gorgon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 19,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4
    },
    "conditionImmunities": [
      "Petrified"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "--",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the gorgon moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 16 Strength saving throw or be knocked prone . If the target is prone , the gorgon can make one attack with its hooves against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_gore",
        "name": "Gore",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d12+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 18 (2d12 + 5) piercing damage."
      },
      {
        "id": "act_1_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d10+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage."
      },
      {
        "id": "act_2_petrifying_breath__recharge_5_6__",
        "name": "Petrifying Breath (Recharge 5–6) ",
        "type": "ability",
        "description": "Petrifying Breath (Recharge 5–6) . The gorgon exhales petrifying gas in a 30-foot cone. Each creature in that area must succeed on a DC 13 Constitution saving throw. On a failed save, a target begins to turn to stone and is restrained . The restrained target must repeat the saving throw at the end of its next turn. On a success, the effect ends on the target. On a failure, the target is petrified until freed by the greater restoration spell or other magic."
      }
    ]
  },
  {
    "id": "ddb_gray_ooze_legacy",
    "name": "Gray Ooze",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Ooze",
    "alignment": "Unaligned",
    "armorClass": 8,
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
      "Prone"
    ],
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 8",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The ooze can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Corrode Metal",
        "description": "Any nonmagical weapon made of metal that hits the ooze corrodes. After dealing damage, the weapon takes a permanent and cumulative −1 penalty to damage rolls. If its penalty drops to −5, the weapon is destroyed. Nonmagical ammunition made of metal that hits the ooze is destroyed after dealing damage."
      },
      {
        "name": "False Appearance",
        "description": "While the ooze remains motionless, it is indistinguishable from an oily pool or wet rock."
      }
    ],
    "actions": [
      {
        "id": "act_0_pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage plus 7 (2d6) acid damage, and if the target is wearing nonmagical metal armor, its armor is partly corroded and takes a permanent and cumulative −1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10."
      }
    ]
  },
  {
    "id": "ddb_green_dragon_wyrmling_legacy",
    "name": "Green Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
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
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 3 (1d6) poison damage."
      },
      {
        "id": "act_1_poison_breath__recharge_5_6__",
        "name": "Poison Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "6d6",
        "damageType": "poison",
        "description": "Poison Breath (Recharge 5–6) . The dragon exhales poisonous gas in a 15-foot cone. Each creature in that area must make a DC 11 Constitution saving throw, taking 21 (6d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_green_hag_legacy",
    "name": "Green Hag",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 82,
      "formula": "11d8 + 33"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 12,
      "con": 16,
      "int": 13,
      "wis": 14,
      "cha": 14
    },
    "skills": {
      "arcana": 3,
      "deception": 4,
      "perception": 4,
      "stealth": 3
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Common, Draconic, Sylvan",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The hag can breathe air and water."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The hag's innate spellcasting ability is Charisma (spell save DC 12). She can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Mimicry",
        "description": "The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations with a successful DC 14 Wisdom ( Insight ) check."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      },
      {
        "id": "act_1_illusory_appearance",
        "name": "Illusory Appearance",
        "type": "ability",
        "description": "The hag covers herself and anything she is wearing or carrying with a magical illusion that makes her look like another creature of her general size and humanoid shape. The illusion ends if the hag takes a bonus action to end it or if she dies."
      },
      {
        "id": "act_2_invisible_passage",
        "name": "Invisible Passage",
        "type": "ability",
        "description": "The hag magically turns invisible until she attacks or casts a spell, or until her concentration ends (as if concentrating on a spell). While invisible , she leaves no physical evidence of her passage, so she can be tracked only by magic. Any equipment she wears or carries is invisible with her."
      }
    ]
  },
  {
    "id": "ddb_grick_legacy",
    "name": "Grick",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Neutral",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 27,
      "formula": "6d8"
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
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Stone Camouflage",
        "description": "The grick has advantage on Dexterity ( Stealth ) checks made to hide in rocky terrain."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The grick makes one attack with its tentacles. If that attack hits, the grick can make one beak attack against the same target."
      },
      {
        "id": "act_1_tentacles",
        "name": "Tentacles",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage."
      },
      {
        "id": "act_2_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_griffon_legacy",
    "name": "Griffon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 15",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The griffon has advantage on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The griffon makes two attacks: one with its beak and one with its claws."
      },
      {
        "id": "act_1_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_grimlock_legacy",
    "name": "Grimlock",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Grimlock",
    "alignment": "Neutral Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 12,
      "int": 9,
      "wis": 8,
      "cha": 6
    },
    "skills": {
      "athletics": 5,
      "perception": 3,
      "stealth": 3
    },
    "conditionImmunities": [
      "Blinded"
    ],
    "senses": "Blindsight 30 ft. or 10 ft. while deafened (blind beyond this radius), Passive Perception 13",
    "languages": "Undercommon",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blind Senses",
        "description": ". The grimlock can't use its blindsight while deafened and unable to smell."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The grimlock has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      },
      {
        "name": "Stone Camouflage",
        "description": "The grimlock has advantage on Dexterity ( Stealth ) checks made to hide in rocky terrain."
      }
    ],
    "actions": [
      {
        "id": "act_0_spiked_bone_club",
        "name": "Spiked Bone Club",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) bludgeoning damage plus 2 (1d4) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_guard_legacy",
    "name": "Guard",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 16,
    "armorDesc": "chain shirt, shield",
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
    "skills": {
      "perception": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Any one language (usually Common)",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6+1",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
      }
    ]
  },
  {
    "id": "ddb_guardian_naga_legacy",
    "name": "Guardian Naga",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Good",
    "armorClass": 18,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 127,
      "formula": "15d10 + 45"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 19,
      "dex": 18,
      "con": 16,
      "int": 16,
      "wis": 19,
      "cha": 18
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Celestial, Common",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Rejuvenation",
        "description": "If it dies, the naga returns to life in 1d6 days and regains all its hit points. Only a wish spell can prevent this trait from functioning."
      },
      {
        "name": "Spellcasting",
        "description": "The naga is an 11th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 16, +8 to hit with spell attacks), and it needs only verbal components to cast its spells. It has the following cleric spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "1d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one creature. Hit: 8 (1d8 + 4) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_1_spit_poison",
        "name": "Spit Poison",
        "type": "ranged_attack",
        "attackBonus": 8,
        "rangeFeet": 15,
        "rangeLongFeet": 30,
        "damage": "10d8",
        "damageType": "poison",
        "description": "Ranged Weapon Attack: +8 to hit, range 15/30 ft., one creature. Hit: The target must make a DC 15 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_gynosphinx_legacy",
    "name": "Gynosphinx",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Neutral",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 136,
      "formula": "16d10 + 48"
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
    "skills": {
      "arcana": 12,
      "history": 12,
      "perception": 8,
      "religion": 8
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Psychic"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened"
    ],
    "senses": "Truesight 120 ft., Passive Perception 18",
    "languages": "Common, Sphinx",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Inscrutable",
        "description": "The sphinx is immune to any effect that would sense its emotions or read its thoughts, as well as any divination spell that it refuses. Wisdom ( Insight ) checks made to ascertain the sphinx's intentions or sincerity have disadvantage."
      },
      {
        "name": "Magic Weapons",
        "description": "The sphinx's weapon attacks are magical."
      },
      {
        "name": "Spellcasting",
        "description": "The sphinx is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 16, +8 to hit with spell attacks). It requires no material components to cast its spells. The sphinx has the following wizard spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The sphinx makes two claw attacks."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      }
    ],
    "legendaryActions": [
      {
        "name": "Claw Attack",
        "description": "The sphinx makes one claw attack."
      },
      {
        "name": "Teleport (Costs 2 Actions)",
        "description": "Teleport (Costs 2 Actions). The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      },
      {
        "name": "Cast a Spell (Costs 3 Actions)",
        "description": "Cast a Spell (Costs 3 Actions). The sphinx casts a spell from its list of prepared spells, using a spell slot as normal."
      }
    ]
  },
  {
    "id": "ddb_half_red_dragon_veteran_legacy",
    "name": "Half-Red Dragon Veteran",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Human",
    "alignment": "Any Alignment",
    "armorClass": 18,
    "armorDesc": "plate",
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
    "skills": {
      "athletics": 5,
      "perception": 2
    },
    "damageResistances": [
      "Fire"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 12",
    "languages": "Common, Draconic",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack."
      },
      {
        "id": "act_1_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands."
      },
      {
        "id": "act_2_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "id": "act_3_heavy_crossbow",
        "name": "Heavy Crossbow",
        "type": "ranged_attack",
        "attackBonus": 3,
        "rangeFeet": 100,
        "rangeLongFeet": 400,
        "damage": "1d10+1",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +3 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage."
      },
      {
        "id": "act_4_fire_breath__recharge_5_6__",
        "name": "Fire Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "7d6",
        "damageType": "fire",
        "description": "Fire Breath (Recharge 5–6) . The veteran exhales fire in a 15-foot cone. Each creature in that area must make a DC 15 Dexterity saving throw, taking 24 (7d6) fire damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_harpy_legacy",
    "name": "Harpy",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Passive Perception 10",
    "languages": "Common",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The harpy makes two attacks: one with its claws and one with its club."
      },
      {
        "id": "act_1_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d4+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage."
      },
      {
        "id": "act_2_club",
        "name": "Club",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage."
      },
      {
        "id": "act_3_luring_song",
        "name": "Luring Song",
        "type": "ability",
        "description": "The harpy sings a magical melody. Every humanoid and giant within 300 feet of the harpy that can hear the song must succeed on a DC 11 Wisdom saving throw or be charmed until the song ends. The harpy must take a bonus action on its subsequent turns to continue singing. It can stop singing at any time. The song ends if the harpy is incapacitated ."
      }
    ]
  },
  {
    "id": "ddb_hawk_legacy",
    "name": "Hawk",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
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
    "skills": {
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The hawk has advantage on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_talons",
        "name": "Talons",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 slashing damage."
      }
    ]
  },
  {
    "id": "ddb_hell_hound_legacy",
    "name": "Hell Hound",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 45,
      "formula": "7d8 + 14"
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
    "skills": {
      "perception": 5
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 15",
    "languages": "Understands Infernal but can&#x27;t speak it",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The hound has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The hound has advantage on an attack roll against a creature if at least one of the hound's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 7 (2d6) fire damage."
      },
      {
        "id": "act_1_fire_breath__recharge_5_6__",
        "name": "Fire Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "6d6",
        "damageType": "fire",
        "description": "Fire Breath (Recharge 5–6) . The hound exhales fire in a 15-foot cone. Each creature in that area must make a DC 12 Dexterity saving throw, taking 21 (6d6) fire damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_hezrou_legacy",
    "name": "Hezrou",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 136,
      "formula": "13d10 + 65"
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
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The hezrou has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Stench",
        "description": "Any creature that starts its turn within 10 feet of the hezrou must succeed on a DC 14 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the hezrou's stench for 24 hours."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hezrou makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      }
    ]
  },
  {
    "id": "hill_giant_legacy",
    "name": "Hill Giant",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 105,
      "formula": "10d12+40"
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
    "skills": {
      "perception": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Giant",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two greatclub attacks."
      },
      {
        "id": "greatclub",
        "name": "Greatclub",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "3d8+5",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft. Hit: 18 (3d8 + 5) bludgeoning."
      },
      {
        "id": "rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 8,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "3d10+5",
        "damageType": "Bludgeoning",
        "description": "Ranged Weapon Attack: +8 to hit, range 60/240 ft. Hit: 21 (3d10 + 5) bludgeoning."
      }
    ]
  },
  {
    "id": "ddb_hippogriff_legacy",
    "name": "Hippogriff",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 19,
      "formula": "3d10 + 3"
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
    "skills": {
      "perception": 5
    },
    "senses": "Passive Perception 15",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The hippogriff has advantage on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hippogriff makes two attacks: one with its beak and one with its claws."
      },
      {
        "id": "act_1_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      }
    ]
  },
  {
    "id": "hobgoblin_legacy",
    "name": "Hobgoblin",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Goblinoid",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "armorDesc": "Chain Mail, Shield",
    "hitPoints": {
      "average": 11,
      "formula": "2d8+2"
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
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Goblin",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Martial Advantage",
        "description": "Once per turn, the hobgoblin can deal an extra 7 (2d6) damage to a creature it hits with a weapon attack if that creature is within 5 ft. of an ally of the hobgoblin that isn't incapacitated."
      }
    ],
    "actions": [
      {
        "id": "longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d8+1",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands."
      },
      {
        "id": "longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "attackBonus": 3,
        "rangeFeet": 150,
        "rangeLongFeet": 60,
        "damage": "1d8+1",
        "damageType": "Piercing",
        "description": "Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_homunculus_legacy",
    "name": "Homunculus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Construct",
    "alignment": "Neutral",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 5,
      "formula": "2d4"
    },
    "speed": "20 ft., Fly 40 ft.",
    "stats": {
      "str": 4,
      "dex": 15,
      "con": 11,
      "int": 10,
      "wis": 10,
      "cha": 7
    },
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Understands the languages of its creator but can&#x27;t speak",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Telepathic Bond",
        "description": "While the homunculus is on the same plane of existence as its master, it can magically convey what it senses to its master, and the two can communicate telepathically."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. If the saving throw fails by 5 or more, the target is instead poisoned for 5 (1d10) minutes and unconscious while poisoned in this way."
      }
    ]
  },
  {
    "id": "ddb_horned_devil_legacy",
    "name": "Horned Devil",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 178,
      "formula": "17d10 + 85"
    },
    "speed": "20 ft., Fly 60 ft.",
    "stats": {
      "str": 22,
      "dex": 17,
      "con": 21,
      "int": 12,
      "wis": 16,
      "cha": 17
    },
    "damageResistances": [
      "Cold; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 13",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision ."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes three melee attacks: two with its fork and one with its tail. It can use Hurl Flame in place of any melee attack."
      },
      {
        "id": "act_1_fork",
        "name": "Fork",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d8+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (2d8 + 6) piercing damage."
      },
      {
        "id": "act_2_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "1d8+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 10 (1d8 + 6) piercing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 17 Constitution saving throw or lose 10 (3d6) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 10 (3d6) . Any creature can take an action to stanch the wound with a successful DC 12 Wisdom ( Medicine ) check. The wound also closes if the target receives magical healing."
      },
      {
        "id": "act_3_hurl_flame",
        "name": "Hurl Flame",
        "type": "ranged_attack",
        "attackBonus": 7,
        "rangeFeet": 150,
        "damage": "4d6",
        "damageType": "fire",
        "description": "Ranged Spell Attack: +7 to hit, range 150 ft., one target. Hit: 14 (4d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire."
      }
    ]
  },
  {
    "id": "ddb_hunter_shark_legacy",
    "name": "Hunter Shark",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "0 ft., Swim 40 ft.",
    "stats": {
      "str": 18,
      "dex": 13,
      "con": 15,
      "int": 1,
      "wis": 10,
      "cha": 4
    },
    "skills": {
      "perception": 2
    },
    "senses": "Blindsight 30 ft., Passive Perception 12",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The shark has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage."
      }
    ]
  },
  {
    "id": "hydra_legacy",
    "name": "Hydra",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 15,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 172,
      "formula": "15d12+75"
    },
    "speed": "30 ft., swim 30 ft.",
    "stats": {
      "str": 20,
      "dex": 12,
      "con": 20,
      "int": 2,
      "wis": 10,
      "cha": 7
    },
    "skills": {
      "perception": 6
    },
    "senses": "Darkvision 60 ft., Passive Perception 16",
    "languages": "--",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The hydra can hold its breath for 1 hour."
      },
      {
        "name": "Multiple Heads",
        "description": "The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious."
      },
      {
        "name": "Reactive Heads",
        "description": "For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks."
      },
      {
        "name": "Wakeful",
        "description": "While the hydra sleeps, at least one of its heads is awake."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The hydra makes as many bite attacks as it has heads."
      },
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "1d10+5",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_hyena_legacy",
    "name": "Hyena",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The hyena has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_ice_devil_legacy",
    "name": "Ice Devil",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 180,
      "formula": "19d10 + 76"
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
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "damageImmunities": [
      "Cold",
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 12",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "14",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision ."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The devil makes three attacks: one with its bite, one with its claws, and one with its tail."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d6+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage plus 10 (3d6) cold damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d4+5",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 10 (2d4 + 5) slashing damage plus 10 (3d6) cold damage."
      },
      {
        "id": "act_3_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d6+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage plus 10 (3d6) cold damage."
      },
      {
        "id": "act_4_wall_of_ice__recharge_6__",
        "name": "Wall of Ice (Recharge 6) ",
        "type": "ability",
        "description": "Wall of Ice (Recharge 6) . The devil magically forms an opaque wall of ice on a solid surface it can see within 60 feet of it. The wall is 1 foot thick and up to 30 feet long and 10 feet high, or it's a hemispherical dome up to 20 feet in diameter."
      }
    ]
  },
  {
    "id": "ddb_ice_mephit_legacy",
    "name": "Ice Mephit",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 2,
      "stealth": 3
    },
    "damageVulnerabilities": [
      "Bludgeoning",
      "Fire"
    ],
    "damageImmunities": [
      "Cold",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Aquan, Auran",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a burst of jagged ice. Each creature within 5 feet of it must make a DC 10 Dexterity saving throw, taking 4 (1d8) slashing damage on a failed save, or half as much damage on a successful one."
      },
      {
        "name": "False Appearance",
        "description": "While the mephit remains motionless, it is indistinguishable from an ordinary shard of ice."
      },
      {
        "name": "Innate Spellcasting (1/Day)",
        "description": "Innate Spellcasting (1/Day). The mephit can innately cast fog cloud , requiring no material components. Its innate spellcasting ability is Charisma."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) cold damage."
      },
      {
        "id": "act_1_frost_breath__recharge_6__",
        "name": "Frost Breath (Recharge 6) ",
        "type": "ability",
        "damage": "2d4",
        "damageType": "cold",
        "description": "Frost Breath (Recharge 6) . The mephit exhales a 15- foot cone of cold air. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 5 (2d4) cold damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_imp_legacy",
    "name": "Imp",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 10,
      "formula": "3d4 + 3"
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
    "skills": {
      "deception": 4,
      "insight": 3,
      "persuasion": 4,
      "stealth": 5
    },
    "damageResistances": [
      "Cold; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Common, Infernal",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The imp can use its action to polymorph into a beast form that resembles a rat (speed 20 ft.), a raven (20 ft., fly 60 ft.), or a spider (20 ft., climb 20 ft.), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the imp's darkvision ."
      },
      {
        "name": "Magic Resistance",
        "description": "The imp has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_sting__bite_in_beast_form_",
        "name": "Sting (Bite in Beast Form)",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "piercing",
        "description": "Sting (Bite in Beast Form). Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_1_invisibility",
        "name": "Invisibility",
        "type": "ability",
        "description": "The imp magically turns invisible until it attacks or until its concentration ends (as if concentrating on a spell). Any equipment the imp wears or carries is invisible with it."
      }
    ]
  },
  {
    "id": "ddb_incubus_legacy",
    "name": "Incubus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Shapechanger",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
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
      "Lightning",
      "Poison; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 15",
    "languages": "Abyssal, Common, Infernal, Telepathy 60 ft.",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Telepathic Bond",
        "description": "The fiend ignores the range restriction on its telepathy when communicating with a creature it has charmed . The two don't even need to be on the same plane of existence."
      },
      {
        "name": "Shapechanger",
        "description": "The fiend can use its action to polymorph into a Small or Medium humanoid, or back into its true form. Without wings, the fiend loses its flying speed. Other than its size and speed, its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      }
    ],
    "actions": [
      {
        "id": "act_0_claw__fiend_form_only_",
        "name": "Claw (Fiend Form Only)",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "slashing",
        "description": "Claw (Fiend Form Only). Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "id": "act_1_charm",
        "name": "Charm",
        "type": "ability",
        "description": "One humanoid the fiend can see within 30 feet of it must succeed on a DC 15 Wisdom saving throw or be magically charmed for 1 day. The charmed target obeys the fiend's verbal or telepathic commands. If the target suffers any harm or receives a suicidal command, it can repeat the saving throw, ending the effect on a success. If the target successfully saves against the effect, or if the effect on it ends, the target is immune to this fiend's Charm for the next 24 hours."
      },
      {
        "id": "act_2_draining_kiss",
        "name": "Draining Kiss",
        "type": "ability",
        "damage": "5d10+5",
        "damageType": "psychic",
        "description": "The fiend kisses a creature charmed by it or a willing creature. The target must make a DC 15 Constitution saving throw against this magic, taking 32 (5d10 + 5) psychic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."
      },
      {
        "id": "act_3_etherealness",
        "name": "Etherealness",
        "type": "ability",
        "description": "The fiend magically enters the Ethereal Plane from the Material Plane, or vice versa."
      }
    ]
  },
  {
    "id": "ddb_invisible_stalker_legacy",
    "name": "Invisible Stalker",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 14,
    "hitPoints": {
      "average": 104,
      "formula": "16d8 + 32"
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
    "skills": {
      "perception": 8,
      "stealth": 10
    },
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
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
    "senses": "Darkvision 60 ft., Passive Perception 18",
    "languages": "Auran , Understands Common but doesn&#x27;t speak it",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Invisibility",
        "description": "The stalker is invisible ."
      },
      {
        "name": "Faultless Tracker",
        "description": "The stalker is given a quarry by its summoner. The stalker knows the direction and distance to its quarry as long as the two of them are on the same plane of existence. The stalker also knows the location of its summoner."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The stalker makes two slam attacks."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage."
      }
    ]
  },
  {
    "id": "iron_golem_legacy",
    "name": "Iron Golem",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 20,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 210,
      "formula": "20d10+100"
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
    "damageImmunities": [
      "Fire",
      "Poison",
      "Psychic",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks That Aren't Adamantine"
    ],
    "conditionImmunities": [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Understands the languages of its creator but can't speak",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Fire Absorption",
        "description": "Whenever the golem is subjected to fire damage, it takes no damage and instead regains a number of hit points equal to the fire damage dealt."
      },
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The golem makes two melee attacks."
      },
      {
        "id": "slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 5,
        "damage": "3d8+7",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft. Hit: 20 (3d8 + 7) bludgeoning damage."
      },
      {
        "id": "sword",
        "name": "Sword",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 10,
        "damage": "3d10+7",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft. Hit: 23 (3d10 + 7) slashing damage."
      },
      {
        "id": "poison_breath",
        "name": "Poison Breath (Recharge 6)",
        "type": "ability",
        "saveDc": 19,
        "saveStat": "con",
        "damage": "10d8",
        "damageType": "Poison",
        "description": "The golem exhales poisonous gas in a 15-foot cone. DC 19 Constitution save, taking 45 (10d8) poison damage on failure, half on success."
      }
    ]
  },
  {
    "id": "ddb_jackal_legacy",
    "name": "Jackal",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The jackal has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The jackal has advantage on an attack roll against a creature if at least one of the jackal's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 1,
        "reachFeet": 5,
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 – 1) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_killer_whale_legacy",
    "name": "Killer Whale",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 90,
      "formula": "12d12 + 12"
    },
    "speed": "0 ft., Swim 60 ft.",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 13,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "skills": {
      "perception": 3
    },
    "senses": "Blindsight 120 ft., Passive Perception 13",
    "languages": "--",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The whale can't use its blindsight while deafened ."
      },
      {
        "name": "Hold Breath",
        "description": "The whale can hold its breath for 30 minutes."
      },
      {
        "name": "Keen Hearing",
        "description": "The whale has advantage on Wisdom ( Perception ) checks that rely on hearing."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "5d6+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (5d6 + 4) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_knight_legacy",
    "name": "Knight",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 18,
    "armorDesc": "plate",
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
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Brave",
        "description": "The knight has advantage on saving throws against being frightened ."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The knight makes two melee attacks."
      },
      {
        "id": "act_1_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      },
      {
        "id": "act_2_heavy_crossbow",
        "name": "Heavy Crossbow",
        "type": "ranged_attack",
        "attackBonus": 2,
        "rangeFeet": 100,
        "rangeLongFeet": 400,
        "damage": "1d10",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage."
      },
      {
        "id": "act_3_leadership__recharges_after_a_short_or_long_rest_",
        "name": "Leadership (Recharges after a Short or Long Rest)",
        "type": "ability",
        "description": "Leadership (Recharges after a Short or Long Rest). For 1 minute, the knight can utter a special command or warning whenever a nonhostile creature that it can see within 30 feet of it makes an attack roll or a saving throw. The creature can add a d4 to its roll provided it can hear and understand the knight. A creature can benefit from only one Leadership die at a time. This effect ends if the knight is incapacitated ."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon."
      }
    ]
  },
  {
    "id": "ddb_kobold_legacy",
    "name": "Kobold",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Humanoid",
    "subtype": "Kobold",
    "alignment": "Lawful Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 5,
      "formula": "2d6 - 2"
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
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "Common, Draconic",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom ( Perception ) checks that rely on sight."
      },
      {
        "name": "Pack Tactics",
        "description": "The kobold has advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_dagger",
        "name": "Dagger",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      },
      {
        "id": "act_1_sling",
        "name": "Sling",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d4+2",
        "damageType": "bludgeoning",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_kraken_legacy",
    "name": "Kraken",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Monstrosity",
    "subtype": "Titan",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 472,
      "formula": "27d20 + 189"
    },
    "speed": "20 ft., Swim 60 ft.",
    "stats": {
      "str": 30,
      "dex": 11,
      "con": 25,
      "int": 22,
      "wis": 18,
      "cha": 20
    },
    "damageImmunities": [
      "Lightning; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "conditionImmunities": [
      "Frightened",
      "Paralyzed"
    ],
    "senses": "Truesight 120 ft., Passive Perception 14",
    "languages": "Abyssal, Celestial, Infernal, Primordial, Telepathy 120 ft. but can&#x27;t speak",
    "challengeRating": "23",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The kraken can breathe air and water."
      },
      {
        "name": "Freedom of Movement",
        "description": "The kraken ignores difficult terrain, and magical effects can't reduce its speed or cause it to be restrained . It can spend 5 feet of movement to escape from nonmagical restraints or being grappled ."
      },
      {
        "name": "Siege Monster",
        "description": "The kraken deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The kraken makes three tentacle attacks, each of which it can replace with one use of Fling."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 5,
        "damage": "3d8+10",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +17 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 10) piercing damage. If the target is a Large or smaller creature grappled by the kraken, that creature is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained , it has total cover against attacks and other effects outside the kraken, and it takes 42 (12d6) acid damage at the start of each of the kraken's turns."
      },
      {
        "id": "act_2_tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "attackBonus": 17,
        "reachFeet": 30,
        "damage": "3d6+10",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 20 (3d6 + 10) bludgeoning damage, and the target is grappled (escape DC 18). Until this grapple ends, the target is restrained . The kraken has ten tentacles, each of which can grapple one target."
      },
      {
        "id": "act_3_fling",
        "name": "Fling",
        "type": "ability",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "description": "One Large or smaller object held or creature grappled by the kraken is thrown up to 60 feet in a random direction and knocked prone . If a thrown target strikes a solid surface, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 18 Dexterity saving throw or take the same damage and be knocked prone ."
      },
      {
        "id": "act_4_lightning_storm",
        "name": "Lightning Storm",
        "type": "ability",
        "damage": "4d10",
        "damageType": "lightning",
        "description": "The kraken magically creates three bolts of lightning, each of which can strike a target the kraken can see within 120 feet of it. A target must make a DC 23 Dexterity saving throw, taking 22 (4d10) lightning damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "legendaryActions": [
      {
        "name": "Tentacle Attack or Fling",
        "description": "The kraken makes one tentacle attack or uses its Fling."
      },
      {
        "name": "Lightning Storm (Costs 2 Actions)",
        "description": "Lightning Storm (Costs 2 Actions). The kraken uses Lightning Storm."
      },
      {
        "name": "Ink Cloud (Costs 3 Actions)",
        "description": "Ink Cloud (Costs 3 Actions). While underwater, the kraken expels an ink cloud in a 60-foot radius. The cloud spreads around corners, and that area is heavily obscured to creatures other than the kraken. Each creature other than the kraken that ends its turn there must succeed on a DC 23 Constitution saving throw, taking 16 (3d10) poison damage on a failed save, or half as much damage on a successful one. A strong current disperses the cloud, which otherwise disappears at the end of the kraken's next turn."
      }
    ]
  },
  {
    "id": "ddb_lamia_legacy",
    "name": "Lamia",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 97,
      "formula": "13d10 + 26"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 13,
      "con": 15,
      "int": 14,
      "wis": 15,
      "cha": 16
    },
    "skills": {
      "deception": 7,
      "insight": 4,
      "stealth": 3
    },
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Abyssal, Common",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The lamia’s innate spellcasting ability is Charisma (spell save DC 13). It can innately cast the following spells, requiring no material components."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The lamia makes two attacks: one with its claws and one with its dagger or Intoxicating Touch."
      },
      {
        "id": "act_1_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d10+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage."
      },
      {
        "id": "act_2_dagger",
        "name": "Dagger",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage."
      },
      {
        "id": "act_3_intoxicating_touch",
        "name": "Intoxicating Touch",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "description": "Melee Spell Attack: +5 to hit, reach 5 ft., one creature. Hit: The target is magically cursed for 1 hour. Until the curse ends, the target has disadvantage on Wisdom saving throws and all ability checks."
      }
    ]
  },
  {
    "id": "ddb_lemure_legacy",
    "name": "Lemure",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 7,
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "15 ft.",
    "stats": {
      "str": 10,
      "dex": 5,
      "con": 11,
      "int": 1,
      "wis": 11,
      "cha": 3
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
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Understands Infernal but can&#x27;t speak it",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the lemure's darkvision ."
      },
      {
        "name": "Hellish Rejuvenation",
        "description": "A lemure that dies in the Nine Hells comes back to life with all its hit points in 1d10 days unless it is killed by a good-aligned creature with a bless spell cast on that creature or its remains are sprinkled with holy water ."
      }
    ],
    "actions": [
      {
        "id": "act_0_fist",
        "name": "Fist",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "lich_legacy",
    "name": "Lich",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Any Evil Alignment",
    "armorClass": 17,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 135,
      "formula": "18d8+54"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 16,
      "con": 16,
      "int": 20,
      "wis": 14,
      "cha": 16
    },
    "savingThrows": {
      "con": 10,
      "int": 12,
      "wis": 9
    },
    "skills": {
      "arcana": 18,
      "history": 12,
      "insight": 9,
      "perception": 9
    },
    "damageResistances": [
      "Cold",
      "Lightning",
      "Necrotic"
    ],
    "damageImmunities": [
      "Poison",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks"
    ],
    "conditionImmunities": [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "poisoned"
    ],
    "senses": "Truesight 120 ft., Passive Perception 19",
    "languages": "Common plus up to five other languages",
    "challengeRating": "21",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the lich fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Rejuvenation",
        "description": "If it has a phylactery, a destroyed lich gains a new body in 1d10 days, regaining all its HP and becoming active again."
      },
      {
        "name": "Turn Resistance",
        "description": "The lich has advantage on saving throws against any effect that turns undead."
      }
    ],
    "actions": [
      {
        "id": "paralyzing_touch",
        "name": "Paralyzing Touch",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 5,
        "damage": "3d6",
        "damageType": "Cold",
        "saveDc": 18,
        "saveStat": "con",
        "description": "Melee Spell Attack: +12 to hit, reach 5 ft., one creature. Hit: 10 (3d6) cold damage. The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute."
      },
      {
        "id": "finger_of_death",
        "name": "Finger of Death",
        "type": "ability",
        "saveDc": 20,
        "saveStat": "con",
        "damage": "7d8+30",
        "damageType": "Necrotic",
        "description": "DC 20 Constitution save. Takes 61 (7d8 + 30) necrotic damage on failure, half on success. A humanoid killed by this spell rises at the start of the lich's next turn as a zombie permanently under its command."
      },
      {
        "id": "power_word_kill",
        "name": "Power Word Kill",
        "type": "spell",
        "description": "The lich utters a word of power. If the target has 100 hit points or fewer, it dies immediately."
      }
    ],
    "legendaryActions": [
      {
        "name": "Cantrip",
        "description": "The lich casts a cantrip."
      },
      {
        "name": "Paralyzing Touch (Costs 2 Actions)",
        "description": "The lich uses its Paralyzing Touch."
      },
      {
        "name": "Frightening Gaze (Costs 2 Actions)",
        "description": "The lich fixes its gaze on one creature it can see within 10 ft. Target must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute."
      },
      {
        "name": "Disrupt Life (Costs 3 Actions)",
        "description": "Each non-undead creature within 20 ft. must make a DC 18 Constitution saving throw, taking 21 (6d6) necrotic damage on a failure, half on success."
      }
    ]
  },
  {
    "id": "ddb_lion_legacy",
    "name": "Lion",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 26,
      "formula": "4d10 + 4"
    },
    "speed": "50 ft.",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 13,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "skills": {
      "perception": 3,
      "stealth": 6
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The lion has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The lion has advantage on an attack roll against a creature if at least one of the lion’s allies is within 5 feet of the creature and the ally isn’t incapacitated."
      },
      {
        "name": "Pounce",
        "description": "If the lion moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone . If the target is prone , the lion can make one bite attack against it as a bonus action."
      },
      {
        "name": "Running Leap",
        "description": "With a 10-foot running start, the lion can long jump up to 25 feet."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_lizard_legacy",
    "name": "Lizard",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Darkvision 30 ft., Passive Perception 9",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 0,
        "reachFeet": 5,
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage."
      }
    ]
  },
  {
    "id": "ddb_lizardfolk_legacy",
    "name": "Lizardfolk",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Lizardfolk",
    "alignment": "Neutral",
    "armorClass": 15,
    "armorDesc": "natural armor, shield",
    "hitPoints": {
      "average": 22,
      "formula": "4d8 + 4"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 15,
      "dex": 10,
      "con": 13,
      "int": 7,
      "wis": 12,
      "cha": 7
    },
    "skills": {
      "perception": 3,
      "stealth": 4,
      "survival": 5
    },
    "senses": "Passive Perception 13",
    "languages": "Draconic",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The lizardfolk can hold its breath for 15 minutes."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The lizardfolk makes two melee attacks, each one with a different weapon."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_2_heavy_club",
        "name": "Heavy Club",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage."
      },
      {
        "id": "act_3_javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_4_spiked_shield",
        "name": "Spiked Shield",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_mage_legacy",
    "name": "Mage",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 12,
    "armorDesc": "15 with mage armor",
    "hitPoints": {
      "average": 40,
      "formula": "9d8"
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
    "skills": {
      "arcana": 6,
      "history": 6
    },
    "senses": "Passive Perception 11",
    "languages": "Any four languages",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_dagger",
        "name": "Dagger",
        "type": "ranged_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_magma_mephit_legacy",
    "name": "Magma Mephit",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "armorClass": 11,
    "hitPoints": {
      "average": 22,
      "formula": "5d6 + 5"
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
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Ignan, Terran",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a burst of lava. Each creature within 5 feet of it must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "name": "False Appearance",
        "description": "While the mephit remains motionless, it is indistinguishable from an ordinary mound of magma."
      },
      {
        "name": "Innate Spellcasting (1/Day)",
        "description": "Innate Spellcasting (1/Day). The mephit can innately cast heat metal (spell save DC 10), requiring no material components. Its innate spellcasting ability is Charisma."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) fire damage."
      },
      {
        "id": "act_1_fire_breath__recharge_6__",
        "name": "Fire Breath (Recharge 6) ",
        "type": "ability",
        "damage": "2d6",
        "damageType": "fire",
        "description": "Fire Breath (Recharge 6) . The mephit exhales a 15-foot cone of fire. Each creature in that area must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_magmin_legacy",
    "name": "Magmin",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Elemental",
    "alignment": "Chaotic Neutral",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 9,
      "formula": "2d6 + 2"
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
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Ignan",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the magmin dies, it explodes in a burst of fire and magma. Each creature within 10 feet of it must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one. Flammable objects that aren't being worn or carried in that area are ignited."
      },
      {
        "name": "Ignited Illumination",
        "description": "As a bonus action, the magmin can set itself ablaze or extinguish its flames. While ablaze, the magmin sheds bright light in a 10-foot radius and dim light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "id": "act_0_touch",
        "name": "Touch",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6",
        "damageType": "fire",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d6) fire damage. If the target is a creature or a flammable object, it ignites. Until a creature takes an action to douse the fire, the target takes 3 (1d6) fire damage at the end of each of its turns."
      }
    ]
  },
  {
    "id": "ddb_mammoth_legacy",
    "name": "Mammoth",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 126,
      "formula": "11d12 + 55"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 24,
      "dex": 9,
      "con": 21,
      "int": 3,
      "wis": 11,
      "cha": 6
    },
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the mammoth moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 18 Strength saving throw or be knocked prone . If the target is prone , the mammoth can make one stomp attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_gore",
        "name": "Gore",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "4d8+7",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 25 (4d8 + 7) piercing damage."
      },
      {
        "id": "act_1_stomp",
        "name": "Stomp",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "4d10+7",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one prone creature. Hit: 29 (4d10 + 7) bludgeoning damage."
      }
    ]
  },
  {
    "id": "manticore_legacy",
    "name": "Manticore",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Evil",
    "armorClass": 14,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 68,
      "formula": "8d10+24"
    },
    "speed": "30 ft., fly 50 ft.",
    "stats": {
      "str": 17,
      "dex": 16,
      "con": 17,
      "int": 7,
      "wis": 12,
      "cha": 8
    },
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Common",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The manticore makes three attacks: one with its bite and two with its claws or three with its tail spikes."
      },
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) piercing."
      },
      {
        "id": "claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 6 (1d6 + 3) slashing."
      },
      {
        "id": "tail_spike",
        "name": "Tail Spike",
        "type": "ranged_attack",
        "attackBonus": 5,
        "rangeFeet": 100,
        "rangeLongFeet": 200,
        "damage": "1d8+3",
        "damageType": "Piercing",
        "description": "Ranged Weapon Attack: +5 to hit, range 100/200 ft. Hit: 7 (1d8 + 3) piercing."
      }
    ]
  },
  {
    "id": "ddb_marilith_legacy",
    "name": "Marilith",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 189,
      "formula": "18d10 + 90"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 20,
      "con": 20,
      "int": 18,
      "wis": 16,
      "cha": 20
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Truesight 120 ft., Passive Perception 13",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The marilith has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The marilith's weapon attacks are magical."
      },
      {
        "name": "Reactive",
        "description": "The marilith can take one reaction on every turn in a combat."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The marilith makes seven attacks: six with its longswords and one with its tail."
      },
      {
        "id": "act_1_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      },
      {
        "id": "act_2_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 15 (2d10 + 4) bludgeoning damage. If the target is Medium or smaller, it is grappled (escape DC 19). Until this grapple ends, the target is restrained , the marilith can automatically hit the target with its tail, and the marilith can't make tail attacks against other targets."
      },
      {
        "id": "act_3_teleport",
        "name": "Teleport",
        "type": "ability",
        "description": "The marilith magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The marilith adds 5 to its AC against one melee attack that would hit it. To do so, the marilith must see the attacker and be wielding a melee weapon."
      }
    ]
  },
  {
    "id": "ddb_mastiff_legacy",
    "name": "Mastiff",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The mastiff has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone ."
      }
    ]
  },
  {
    "id": "medusa_legacy",
    "name": "Medusa",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Lawful Evil",
    "armorClass": 15,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 127,
      "formula": "17d8+51"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 15,
      "con": 16,
      "int": 12,
      "wis": 13,
      "cha": 15
    },
    "skills": {
      "deception": 5,
      "insight": 4,
      "perception": 4,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Common",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Petrifying Gaze",
        "description": "When a creature that can see the medusa's eyes starts its turn within 30 feet of the medusa, the medusa can force it to make a DC 14 Constitution saving throw or begin turning to stone."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The medusa makes either three melee attacks—one with its snake hair and two with its shortsword—or two ranged attacks with its longbow."
      },
      {
        "id": "snake_hair",
        "name": "Snake Hair",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 4 (1d4 + 2) piercing damage plus 14 (4d6) poison damage."
      },
      {
        "id": "shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 5 (1d6 + 2) piercing."
      },
      {
        "id": "longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "attackBonus": 5,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+2",
        "damageType": "Piercing",
        "description": "Ranged Weapon Attack: +5 to hit, range 150/600 ft. Hit: 6 (1d8 + 2) piercing plus 7 (2d6) poison damage."
      }
    ]
  },
  {
    "id": "ddb_merfolk_legacy",
    "name": "Merfolk",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Merfolk",
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
      "wis": 11,
      "cha": 12
    },
    "skills": {
      "perception": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Aquan, Common",
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
        "id": "act_0_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +2 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 3 (1d6) piercing damage, or 4 (1d8) piercing damage if used with two hands to make a melee attack."
      }
    ]
  },
  {
    "id": "ddb_merrow_legacy",
    "name": "Merrow",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "10 ft., Swim 40 ft.",
    "stats": {
      "str": 18,
      "dex": 10,
      "con": 15,
      "int": 8,
      "wis": 10,
      "cha": 9
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Abyssal, Aquan",
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
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The merrow makes two attacks: one with its bite and one with its claws or harpoon."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d4+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage."
      },
      {
        "id": "act_3_harpoon",
        "name": "Harpoon",
        "type": "ranged_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "2d6+4",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a Huge or smaller creature, it must succeed on a Strength contest against the merrow or be pulled up to 20 feet toward the merrow."
      }
    ]
  },
  {
    "id": "mimic_legacy",
    "name": "Mimic",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Monstrosity",
    "subtype": "Shapechanger",
    "alignment": "Neutral",
    "armorClass": 12,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 58,
      "formula": "9d8+18"
    },
    "speed": "15 ft.",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 15,
      "int": 5,
      "wis": 13,
      "cha": 8
    },
    "skills": {
      "stealth": 5
    },
    "damageImmunities": [
      "Acid"
    ],
    "conditionImmunities": [
      "prone"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The mimic can use its action to polymorph into an object or back into its true, amorphous form."
      },
      {
        "name": "Adhesive (Object Form Only)",
        "description": "The mimic adheres to anything that touches it. A Huge or smaller creature adhered to the mimic is also grappled by it (escape DC 13)."
      },
      {
        "name": "False Appearance (Object Form Only)",
        "description": "While the mimic remains motionless, it is indistinguishable from an ordinary object."
      }
    ],
    "actions": [
      {
        "id": "pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage. If the mimic is in object form, the target is subjected to its Adhesive trait."
      },
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) acid damage."
      }
    ]
  },
  {
    "id": "mind_flayer_legacy",
    "name": "Mind Flayer",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "armorClass": 15,
    "armorDesc": "Breastplate",
    "hitPoints": {
      "average": 71,
      "formula": "13d8+13"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 11,
      "dex": 12,
      "con": 12,
      "int": 19,
      "wis": 17,
      "cha": 17
    },
    "savingThrows": {
      "int": 7,
      "wis": 6,
      "cha": 6
    },
    "skills": {
      "arcana": 7,
      "deception": 6,
      "insight": 6,
      "perception": 6,
      "stealth": 4
    },
    "senses": "Darkvision 120 ft., Passive Perception 16",
    "languages": "Deep Speech, Undercommon, Telepathy 120 ft.",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "Advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Innate Spellcasting (Psionics)",
        "description": "DC 15 Psionic spells: At will: detect thoughts, levitate; 1/day each: dominate monster, plane shift (self only)."
      }
    ],
    "actions": [
      {
        "id": "tentacles",
        "name": "Tentacles",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d10+4",
        "damageType": "Psychic",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 15 (2d10 + 4) psychic damage. If the target is Medium or smaller, it is grappled (escape DC 15) and must succeed on a DC 15 INT saving throw or be stunned until this grapple ends."
      },
      {
        "id": "extract_brain",
        "name": "Extract Brain",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "10d10",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one incapacitated humanoid grappled by the mind flayer. Hit: The target takes 55 (10d10) piercing damage. If this damage reduces the target to 0 HP, the mind flayer kills the target by extracting and eating its brain."
      },
      {
        "id": "mind_blast",
        "name": "Mind Blast (Recharge 5-6)",
        "type": "ability",
        "saveDc": 15,
        "saveStat": "int",
        "damage": "4d8+4",
        "damageType": "Psychic",
        "description": "The mind flayer magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 15 Intelligence saving throw or take 22 (4d8 + 4) psychic damage and be stunned for 1 minute."
      }
    ]
  },
  {
    "id": "minotaur_legacy",
    "name": "Minotaur",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 14,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 76,
      "formula": "9d10+27"
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
    "skills": {
      "perception": 7
    },
    "senses": "Darkvision 60 ft., Passive Perception 17",
    "languages": "Abyssal",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the minotaur moves at least 10 ft. straight toward a target and hits with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be pushed up to 10 ft. and knocked prone."
      },
      {
        "name": "Labyrinthine Recall",
        "description": "The minotaur can perfectly recall any path it has traveled."
      },
      {
        "name": "Reckless",
        "description": "At the start of its turn, the minotaur can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn."
      }
    ],
    "actions": [
      {
        "id": "greataxe",
        "name": "Greataxe",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d12+4",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 17 (2d12 + 4) slashing damage."
      },
      {
        "id": "gore",
        "name": "Gore",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 13 (2d8 + 4) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_minotaur_skeleton_legacy",
    "name": "Minotaur Skeleton",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 67,
      "formula": "9d10 + 18"
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
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Understands Abyssal but can&#x27;t speak it",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the skeleton moves at least 10 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be pushed up to 10 feet away and knocked prone ."
      }
    ],
    "actions": [
      {
        "id": "act_0_greataxe",
        "name": "Greataxe",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d12+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage."
      },
      {
        "id": "act_1_gore",
        "name": "Gore",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_mule_legacy",
    "name": "Mule",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Beast of Burden",
        "description": "The mule is considered to be a Large animal for the purpose of determining its carrying capacity."
      },
      {
        "name": "Sure-Footed",
        "description": "The mule has advantage on Strength and Dexterity saving throws made against effects that would knock it prone ."
      }
    ],
    "actions": [
      {
        "id": "act_0_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_mummy_legacy",
    "name": "Mummy",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 11,
    "armorDesc": "natural armor",
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
      "wis": 10,
      "cha": 12
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
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
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "The languages it knew in life",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The mummy can use its Dreadful Glare and makes one attack with its rotting fist."
      },
      {
        "id": "act_1_rotting_fist",
        "name": "Rotting Fist",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage plus 10 (3d6) necrotic damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw or be cursed with mummy rot. The cursed target can't regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target's hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic."
      },
      {
        "id": "act_2_dreadful_glare",
        "name": "Dreadful Glare",
        "type": "ability",
        "description": "The mummy targets one creature it can see within 60 feet of it. If the target can see the mummy, it must succeed on a DC 11 Wisdom saving throw against this magic or become frightened until the end of the mummy's next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies (but not mummy lords) for the next 24 hours."
      }
    ]
  },
  {
    "id": "ddb_mummy_lord_legacy",
    "name": "Mummy Lord",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 97,
      "formula": "13d8 + 39"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 18,
      "dex": 10,
      "con": 17,
      "int": 11,
      "wis": 18,
      "cha": 16
    },
    "skills": {
      "history": 5,
      "religion": 5
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "The languages it knew in life",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The mummy lord has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Rejuvenation",
        "description": "A destroyed mummy lord gains a new body in 24 hours if its heart is intact, regaining all its hit points and becoming active again. The new body appears within 5 feet of the mummy lord's heart."
      },
      {
        "name": "Spellcasting",
        "description": "The mummy lord is a 10th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 17, +9 to hit with spell attacks). The mummy lord has the following cleric spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The mummy can use its Dreadful Glare and makes one attack with its rotting fist."
      },
      {
        "id": "act_1_rotting_fist",
        "name": "Rotting Fist",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "3d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage plus 21 (6d6) necrotic damage. If the target is a creature, it must succeed on a DC 16 Constitution saving throw or be cursed with mummy rot. The cursed target can't regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target's hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic."
      },
      {
        "id": "act_2_dreadful_glare",
        "name": "Dreadful Glare",
        "type": "ability",
        "description": "The mummy lord targets one creature it can see within 60 feet of it. If the target can see the mummy lord, it must succeed on a DC 16 Wisdom saving throw against this magic or become frightened until the end of the mummy's next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies and mummy lords for the next 24 hours."
      }
    ],
    "legendaryActions": [
      {
        "name": "Attack",
        "description": "The mummy lord makes one attack with its rotting fist or uses its Dreadful Glare."
      },
      {
        "name": "Blinding Dust",
        "description": "Blinding dust and sand swirls magically around the mummy lord. Each creature within 5 feet of the mummy lord must succeed on a DC 16 Constitution saving throw or be blinded until the end of the creature's next turn."
      },
      {
        "name": "Blasphemous Word (Costs 2 Actions)",
        "description": "Blasphemous Word (Costs 2 Actions). The mummy lord utters a blasphemous word. Each non-undead creature within 10 feet of the mummy lord that can hear the magical utterance must succeed on a DC 16 Constitution saving throw or be stunned until the end of the mummy lord's next turn."
      },
      {
        "name": "Channel Negative Energy (Costs 2 Actions)",
        "description": "Channel Negative Energy (Costs 2 Actions). The mummy lord magically unleashes negative energy. Creatures within 60 feet of the mummy lord, including ones behind barriers and around corners, can't regain hit points until the end of the mummy lord's next turn."
      },
      {
        "name": "Whirlwind of Sand (Costs 2 Actions)",
        "description": "Whirlwind of Sand (Costs 2 Actions). The mummy lord magically transforms into a whirlwind of sand, moves up to 60 feet, and reverts to its normal form. While in whirlwind form, the mummy lord is immune to all damage, and it can't be grappled , petrified , knocked prone , restrained , or stunned . Equipment worn or carried by the mummy lord remain in its possession."
      }
    ]
  },
  {
    "id": "ddb_nalfeshnee_legacy",
    "name": "Nalfeshnee",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Truesight 120 ft., Passive Perception 11",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The nalfeshnee has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The nalfeshnee uses Horror Nimbus if it can. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "5d10+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 32 (5d10 + 5) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "3d6+5",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) slashing damage."
      },
      {
        "id": "act_3_horror_nimbus__recharge_5_6__",
        "name": "Horror Nimbus (Recharge 5–6) ",
        "type": "ability",
        "description": "Horror Nimbus (Recharge 5–6) . The nalfeshnee magically emits scintillating, multicolored light. Each creature within 15 feet of the nalfeshnee that can see the light must succeed on a DC 15 Wisdom saving throw or be frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the nalfeshnee's Horror Nimbus for the next 24 hours."
      },
      {
        "id": "act_4_teleport",
        "name": "Teleport",
        "type": "ability",
        "description": "The nalfeshnee magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      }
    ]
  },
  {
    "id": "ddb_night_hag_legacy",
    "name": "Night Hag",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Neutral Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "deception": 7,
      "insight": 6,
      "perception": 6,
      "stealth": 6
    },
    "damageResistances": [
      "Cold",
      "Fire; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "conditionImmunities": [
      "Charmed"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 16",
    "languages": "Abyssal, Common, Infernal, Primordial",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The hag's innate spellcasting ability is Charisma (spell save DC 14, +6 to hit with spell attacks). She can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Magic Resistance",
        "description": "The hag has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "slashing",
        "description": "(Hag Form Only). Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      },
      {
        "id": "act_1_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The hag magically polymorphs into a Small or Medium female humanoid, or back into her true form. Her statistics are the same in each form. Any equipment she is wearing or carrying isn't transformed. She reverts to her true form if she dies."
      },
      {
        "id": "act_2_etherealness",
        "name": "Etherealness",
        "type": "ability",
        "description": "The hag magically enters the Ethereal Plane from the Material Plane, or vice versa. To do so, the hag must have a heartstone in her possession."
      },
      {
        "id": "act_3_nightmare_haunting__1_day_",
        "name": "Nightmare Haunting (1/Day)",
        "type": "ability",
        "damage": "1d10",
        "description": "Nightmare Haunting (1/Day). While on the Ethereal Plane, the hag magically touches a sleeping humanoid on the Material Plane. A protection from evil and good spell cast on the target prevents this contact, as does a magic circle . As long as the contact persists, the target has dreadful visions. If these visions last for at least 1 hour, the target gains no benefit from its rest, and its hit point maximum is reduced by 5 (1d10) . If this effect reduces the target's hit point maximum to 0, the target dies, and if the target was evil, its soul is trapped in the hag's soul bag. The reduction to the target's hit point maximum lasts until removed by the greater restoration spell or similar magic."
      }
    ]
  },
  {
    "id": "ddb_nightmare_legacy",
    "name": "Nightmare",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 68,
      "formula": "8d10 + 24"
    },
    "speed": "60 ft., Fly 90 ft.",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 10,
      "wis": 13,
      "cha": 15
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Passive Perception 11",
    "languages": "Common and Infernal but can&#x27;t speak",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Confer Fire Resistance",
        "description": "The nightmare can grant resistance to fire damage to anyone riding it."
      },
      {
        "name": "Illumination",
        "description": "The nightmare sheds bright light in a 10-foot radius and dim light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "id": "act_0_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 7 (2d6) fire damage."
      },
      {
        "id": "act_1_ethereal_stride",
        "name": "Ethereal Stride",
        "type": "ability",
        "description": "The nightmare and up to three willing creatures within 5 feet of it magically enter the Ethereal Plane from the Material Plane, or vice versa."
      }
    ]
  },
  {
    "id": "ddb_noble_legacy",
    "name": "Noble",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 15,
    "armorDesc": "breastplate",
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
    "skills": {
      "deception": 5,
      "insight": 4,
      "persuasion": 5
    },
    "senses": "Passive Perception 12",
    "languages": "Any two languages",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_rapier",
        "name": "Rapier",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d8+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The noble adds 2 to its AC against one melee attack that would hit it. To do so, the noble must see the attacker and be wielding a melee weapon."
      }
    ]
  },
  {
    "id": "ddb_nothic_legacy",
    "name": "Nothic",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
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
    "skills": {
      "arcana": 3,
      "insight": 4,
      "perception": 2,
      "stealth": 5
    },
    "senses": "Truesight 120 ft., Passive Perception 12",
    "languages": "Undercommon",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The nothic has advantage on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The nothic makes two claw attacks."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "id": "act_2_rotting_gaze",
        "name": "Rotting Gaze",
        "type": "ability",
        "damage": "3d6",
        "damageType": "necrotic",
        "description": "The nothic targets one creature it can see within 30 feet of it. The target must succeed on a DC 12 Constitution saving throw against this magic or take 10 (3d6) necrotic damage."
      },
      {
        "id": "act_3_weird_insight",
        "name": "Weird Insight",
        "type": "ability",
        "description": "The nothic targets one creature it can see within 30 feet of it. The target must contest its Charisma ( Deception ) check against the nothic’s Wisdom ( Insight ) check. If the nothic wins, it magically learns one fact or secret about the target. The target automatically wins if it is immune to being charmed ."
      }
    ]
  },
  {
    "id": "ddb_ochre_jelly_legacy",
    "name": "Ochre Jelly",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "armorClass": 8,
    "hitPoints": {
      "average": 45,
      "formula": "6d10 + 12"
    },
    "speed": "10 ft., Climb 10 ft.",
    "stats": {
      "str": 15,
      "dex": 6,
      "con": 14,
      "int": 2,
      "wis": 6,
      "cha": 1
    },
    "damageResistances": [
      "Acid"
    ],
    "damageImmunities": [
      "Lightning",
      "Slashing"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Prone"
    ],
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 8",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The jelly can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Spider Climb",
        "description": "The jelly can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_0_pseudopod",
        "name": "Pseudopod",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) bludgeoning damage plus 3 (1d6) acid damage."
      }
    ],
    "reactions": [
      {
        "name": "Split",
        "description": "When a jelly that is Medium or larger is subjected to lightning or slashing damage, it splits into two new jellies if it has at least 10 hit points. Each new jelly has hit points equal to half the original jelly's, rounded down. New jellies are one size smaller than the original jelly."
      }
    ]
  },
  {
    "id": "ddb_octopus_legacy",
    "name": "Octopus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 2,
      "stealth": 4
    },
    "senses": "Darkvision 30 ft., Passive Perception 12",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "While out of water, the octopus can hold its breath for 30 minutes."
      },
      {
        "name": "Underwater Camouflage",
        "description": "The octopus has advantage on Dexterity ( Stealth ) checks made while underwater."
      },
      {
        "name": "Water Breathing",
        "description": "The octopus can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_0_tentacles",
        "name": "Tentacles",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage, and the target is grappled (escape DC 10). Until this grapple ends, the octopus can't use its tentacles on another target."
      },
      {
        "id": "act_1_ink_cloud__recharges_after_a_short_or_long_rest_",
        "name": "Ink Cloud (Recharges after a Short or Long Rest)",
        "type": "ability",
        "description": "Ink Cloud (Recharges after a Short or Long Rest). A 5-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action."
      }
    ]
  },
  {
    "id": "ddb_ogre_legacy",
    "name": "Ogre",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 11,
    "armorDesc": "hide armor",
    "hitPoints": {
      "average": 59,
      "formula": "7d10 + 21"
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
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "Common, Giant",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_greatclub",
        "name": "Greatclub",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      },
      {
        "id": "act_1_javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "2d6+4",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 11 (2d6 + 4) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_ogre_zombie_legacy",
    "name": "Ogre Zombie",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "Understands Common and Giant but can&#x27;t speak",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_morningstar",
        "name": "Morningstar",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_oni_legacy",
    "name": "Oni",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Giant",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "armorDesc": "chain mail",
    "hitPoints": {
      "average": 110,
      "formula": "13d10 + 39"
    },
    "speed": "30 ft., Fly 30 ft.",
    "stats": {
      "str": 19,
      "dex": 11,
      "con": 16,
      "int": 14,
      "wis": 12,
      "cha": 15
    },
    "skills": {
      "arcana": 5,
      "deception": 8,
      "perception": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Common, Giant",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The oni's innate spellcasting ability is Charisma (spell save DC 13). The oni can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Magic Weapons",
        "description": "The oni's weapon attacks are magical."
      },
      {
        "name": "Regeneration",
        "description": "The oni regains 10 hit points at the start of its turn if it has at least 1 hit point."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The oni makes two attacks, either with its claws or its glaive."
      },
      {
        "id": "act_1_claw__oni_form_only_",
        "name": "Claw (Oni Form Only)",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "slashing",
        "description": "Claw (Oni Form Only). Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage."
      },
      {
        "id": "act_2_glaive",
        "name": "Glaive",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) slashing damage, or 9 (1d10 + 4) slashing damage in Small or Medium form."
      },
      {
        "id": "act_3_change_shape",
        "name": "Change Shape",
        "type": "ability",
        "description": "The oni magically polymorphs into a Small or Medium humanoid, into a Large giant, or back into its true form. Other than its size, its statistics are the same in each form. The only equipment that is transformed is its glaive, which shrinks so that it can be wielded in humanoid form. If the oni dies, it reverts to its true form, and its glaive reverts to its normal size."
      }
    ]
  },
  {
    "id": "ddb_orc_legacy",
    "name": "Orc",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Orc",
    "alignment": "Chaotic Evil",
    "armorClass": 13,
    "armorDesc": "hide armor",
    "hitPoints": {
      "average": 15,
      "formula": "2d8 + 6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 16,
      "int": 7,
      "wis": 11,
      "cha": 10
    },
    "skills": {
      "intimidation": 2
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Orc",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aggressive",
        "description": ". As a bonus action, the orc can move up to its speed toward a hostile creature that it can see."
      }
    ],
    "actions": [
      {
        "id": "act_0_greataxe",
        "name": "Greataxe",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d12+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage."
      },
      {
        "id": "act_1_javelin",
        "name": "Javelin",
        "type": "ranged_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_otyugh_legacy",
    "name": "Otyugh",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Aberration",
    "alignment": "Neutral",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 114,
      "formula": "12d10 + 48"
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
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Otyugh",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Limited Telepathy",
        "description": "The otyugh can magically transmit simple messages and images to any creature within 120 feet of it that can understand a language. This form of telepathy doesn't allow the receiving creature to telepathically respond."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The otyugh makes three attacks: one with its bite and two with its tentacles."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d8+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the target must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. The disease is cured on a success. The target dies if the disease reduces its hit point maximum to 0. This reduction to the target's hit point maximum lasts until the disease is cured."
      },
      {
        "id": "act_2_tentacle",
        "name": "Tentacle",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "1d8+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage plus 4 (1d8) piercing damage. If the target is Medium or smaller, it is grappled (escape DC 13) and restrained until the grapple ends. The otyugh has two tentacles, each of which can grapple one target."
      },
      {
        "id": "act_3_tentacle_slam",
        "name": "Tentacle Slam",
        "type": "ability",
        "damage": "2d6+3",
        "damageType": "bludgeoning",
        "description": "The otyugh slams creatures grappled by it into each other or a solid surface. Each creature must succeed on a DC 14 Constitution saving throw or take 10 (2d6 + 3) bludgeoning damage and be stunned until the end of the otyugh's next turn. On a successful save, the target takes half the bludgeoning damage and isn't stunned ."
      }
    ]
  },
  {
    "id": "ddb_owl_legacy",
    "name": "Owl",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
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
    "skills": {
      "perception": 3,
      "stealth": 3
    },
    "senses": "Darkvision 120 ft., Passive Perception 13",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach."
      },
      {
        "name": "Keen Hearing and Sight",
        "description": "The owl has advantage on Wisdom ( Perception ) checks that rely on hearing or sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_talons",
        "name": "Talons",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 1 slashing damage."
      }
    ]
  },
  {
    "id": "ddb_owlbear_legacy",
    "name": "Owlbear",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 59,
      "formula": "7d10 + 21"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 20,
      "dex": 12,
      "con": 17,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "skills": {
      "perception": 3
    },
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "--",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight and Smell",
        "description": "The owlbear has advantage on Wisdom ( Perception ) checks that rely on sight or smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The owlbear makes two attacks: one with its beak and one with its claws."
      },
      {
        "id": "act_1_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d10+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 10 (1d10 + 5) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_panther_legacy",
    "name": "Panther",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "50 ft., Climb 40 ft.",
    "stats": {
      "str": 14,
      "dex": 15,
      "con": 10,
      "int": 3,
      "wis": 14,
      "cha": 7
    },
    "skills": {
      "perception": 4,
      "stealth": 6
    },
    "senses": "Passive Perception 14",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The panther has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the panther moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone . If the target is prone , the panther can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_pegasus_legacy",
    "name": "Pegasus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 6
    },
    "senses": "Passive Perception 16",
    "languages": "Celestial, Common, Elvish and Sylvan but can&#x27;t speak",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_phase_spider_legacy",
    "name": "Phase Spider",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 32,
      "formula": "5d10 + 5"
    },
    "speed": "30 ft., Climb 30 ft.",
    "stats": {
      "str": 15,
      "dex": 15,
      "con": 12,
      "int": 6,
      "wis": 10,
      "cha": 6
    },
    "skills": {
      "stealth": 6
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ethereal Jaunt",
        "description": "As a bonus action, the spider can magically shift from the Material Plane to the Ethereal Plane, or vice versa."
      },
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 18 (4d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way."
      }
    ]
  },
  {
    "id": "pit_fiend_legacy",
    "name": "Pit Fiend",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Devil",
    "alignment": "Lawful Evil",
    "armorClass": 19,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 300,
      "formula": "24d10+168"
    },
    "speed": "30 ft., fly 60 ft.",
    "stats": {
      "str": 26,
      "dex": 14,
      "con": 24,
      "int": 22,
      "wis": 18,
      "cha": 24
    },
    "savingThrows": {
      "dex": 8,
      "con": 13,
      "wis": 10
    },
    "damageResistances": [
      "Cold",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks That Aren't Silvered"
    ],
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "poisoned"
    ],
    "senses": "Truesight 120 ft., Passive Perception 14",
    "languages": "Infernal, Telepathy 120 ft.",
    "challengeRating": "20",
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Fear Aura",
        "description": "Any creature hostile to the pit fiend that starts its turn within 20 feet of the pit fiend must make a DC 21 Wisdom saving throw. On failure, frightened until start of next turn."
      },
      {
        "name": "Magic Resistance",
        "description": "Advantage on saving throws against spells and magical effects."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The pit fiend makes four attacks: one with its bite, one with its claw, one with its mace, and one with its tail."
      },
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 5,
        "damage": "4d6+8",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft. Hit: 22 (4d6 + 8) piercing damage. DC 21 CON save or poisoned."
      },
      {
        "id": "claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "2d8+8",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft. Hit: 17 (2d8 + 8) slashing."
      },
      {
        "id": "mace",
        "name": "Mace",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "2d6+8",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft. Hit: 15 (2d6 + 8) bludgeoning plus 21 (6d6) fire damage."
      },
      {
        "id": "tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "3d10+8",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft. Hit: 24 (3d10 + 8) bludgeoning."
      }
    ]
  },
  {
    "id": "ddb_planetar_legacy",
    "name": "Planetar",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 19,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 200,
      "formula": "16d10 + 112"
    },
    "speed": "40 ft., Fly 120 ft.",
    "stats": {
      "str": 24,
      "dex": 20,
      "con": 24,
      "int": 19,
      "wis": 22,
      "cha": 25
    },
    "skills": {
      "perception": 11
    },
    "damageResistances": [
      "Radiant; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened"
    ],
    "senses": "Truesight 120 ft., Passive Perception 21",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "16",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The planetar's weapon attacks are magical. When the planetar hits with any weapon, the weapon deals an extra 5d8 radiant damage (included in the attack)."
      },
      {
        "name": "Divine Awareness",
        "description": "The planetar knows if it hears a lie."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The planetar's spellcasting ability is Charisma (spell save DC 20). The planetar can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Magic Resistance",
        "description": "The planetar has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The planetar makes two melee attacks."
      },
      {
        "id": "act_1_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "attackBonus": 12,
        "reachFeet": 5,
        "damage": "4d6+7",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 21 (4d6 + 7) slashing damage plus 22 (5d8) radiant damage."
      },
      {
        "id": "act_2_healing_touch",
        "name": "Healing Touch",
        "type": "ability",
        "damage": "6d8+3",
        "description": "(4/Day). The planetar touches another creature. The target magically regains 30 (6d8 + 3) hit points and is freed from any curse, disease, poison, blindness, or deafness."
      }
    ]
  },
  {
    "id": "ddb_plesiosaurus_legacy",
    "name": "Plesiosaurus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Passive Perception 13",
    "languages": "--",
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
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 10,
        "damage": "3d6+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_poisonous_snake_legacy",
    "name": "Poisonous Snake",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 2,
      "formula": "1d4"
    },
    "speed": "30 ft., Swim 30 ft.",
    "stats": {
      "str": 2,
      "dex": 16,
      "con": 11,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "senses": "Blindsight 10 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d4",
        "damageType": "poison",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage, and the target must make a DC 10 Constitution saving throw, taking 5 (2d4) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_polar_bear_legacy",
    "name": "Polar Bear",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 42,
      "formula": "5d10 + 15"
    },
    "speed": "40 ft., Swim 30 ft.",
    "stats": {
      "str": 20,
      "dex": 10,
      "con": 16,
      "int": 2,
      "wis": 13,
      "cha": 7
    },
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d8+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+5",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_pony_legacy",
    "name": "Pony",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_priest_legacy",
    "name": "Priest",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 13,
    "armorDesc": "chain shirt",
    "hitPoints": {
      "average": 27,
      "formula": "5d8 + 5"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 10,
      "con": 12,
      "int": 13,
      "wis": 16,
      "cha": 13
    },
    "skills": {
      "medicine": 7,
      "persuasion": 3,
      "religion": 5
    },
    "senses": "Passive Perception 13",
    "languages": "Any two languages",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Divine Eminence",
        "description": "As a bonus action, the priest can expend a spell slot to cause its melee weapon attacks to magically deal an extra 10 (3d6) radiant damage to a target on a hit. This benefit lasts until the end of the turn. If the priest expends a spell slot of 2nd level or higher, the extra damage increases by 1d6 for each level above 1st."
      },
      {
        "name": "Spellcasting",
        "description": "The priest is a 5th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 13, +5 to hit with spell attacks). The priest has the following cleric spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_mace",
        "name": "Mace",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_pseudodragon_legacy",
    "name": "Pseudodragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Dragon",
    "alignment": "Neutral Good",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 7,
      "formula": "2d4 + 2"
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
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 13",
    "languages": "Understands Common and Draconic but can&#x27;t speak them",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Senses",
        "description": "The pseudodragon has advantage on Wisdom ( Perception ) checks that rely on sight, hearing, or smell."
      },
      {
        "name": "Magic Resistance",
        "description": "The pseudodragon has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Limited Telepathy",
        "description": "The pseudodragon can magically communicate simple ideas, emotions, and images telepathically with any creature within 100 feet of it that can understand a language."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      },
      {
        "id": "act_1_sting",
        "name": "Sting",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or become poisoned for 1 hour. If the saving throw fails by 5 or more, the target falls unconscious for the same duration, or until it takes damage or another creature uses an action to shake it awake."
      }
    ]
  },
  {
    "id": "ddb_pteranodon_legacy",
    "name": "Pteranodon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 1
    },
    "senses": "Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The pteranodon doesn’t provoke an opportunity attack when it flies out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d4+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_purple_worm_legacy",
    "name": "Purple Worm",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 18,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 247,
      "formula": "15d20 + 90"
    },
    "speed": "50 ft., Burrow 30 ft.",
    "stats": {
      "str": 28,
      "dex": 7,
      "con": 22,
      "int": 1,
      "wis": 8,
      "cha": 4
    },
    "senses": "Blindsight 30 ft., Tremorsense 60 ft., Passive Perception 9",
    "languages": "--",
    "challengeRating": "15",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Tunneler",
        "description": "The worm can burrow through solid rock at half its burrow speed and leaves a 10-foot-diameter tunnel in its wake."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The worm makes two attacks: one with its bite and one with its stinger."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "3d8+9",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 22 (3d8 + 9) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 19 Dexterity saving throw or be swallowed by the worm. A swallowed creature is blinded and restrained , it has total cover against attacks and other effects outside the worm, and it takes 21 (6d6) acid damage at the start of each of the worm's turns."
      },
      {
        "id": "act_2_tail_stinger",
        "name": "Tail Stinger",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "3d6+9",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one creature. Hit: 19 (3d6 + 9) piercing damage, and the target must make a DC 19 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_quasit_legacy",
    "name": "Quasit",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Fiend",
    "subtype": "Demon, Shapechanger",
    "alignment": "Shapechanger)",
    "armorClass": 13,
    "hitPoints": {
      "average": 7,
      "formula": "3d4"
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
    "skills": {
      "stealth": 5
    },
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Abyssal, Common",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The quasit can use its action to polymorph into a beast form that resembles a bat (speed 10 ft. fly 40 ft.), a centipede (40 ft., climb 40 ft.), or a toad (40 ft., swim 40 ft.), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Magic Resistance",
        "description": "The quasit has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws__bite_in_beast_form_",
        "name": "Claws (Bite in Beast Form)",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "piercing",
        "description": "Claws (Bite in Beast Form). Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or take 5 (2d4) poison damage and become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      },
      {
        "id": "act_1_scare__1_day_",
        "name": "Scare (1/Day)",
        "type": "ability",
        "description": "Scare (1/Day). One creature of the quasit's choice within 20 feet of it must succeed on a DC 10 Wisdom saving throw or be frightened for 1 minute. The target can repeat the saving throw at the end of each of its turns, with disadvantage if the quasit is within line of sight, ending the effect on itself on a success."
      },
      {
        "id": "act_2_invisibility",
        "name": "Invisibility",
        "type": "ability",
        "description": "The quasit magically turns invisible until it attacks or uses Scare, or until its concentration ends (as if concentrating on a spell). Any equipment the quasit wears or carries is invisible with it."
      }
    ]
  },
  {
    "id": "ddb_quipper_legacy",
    "name": "Quipper",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
    },
    "speed": "0 ft., Swim 40 ft.",
    "stats": {
      "str": 2,
      "dex": 16,
      "con": 9,
      "int": 1,
      "wis": 7,
      "cha": 2
    },
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The quipper has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The quipper can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage."
      }
    ]
  },
  {
    "id": "ddb_rakshasa_legacy",
    "name": "Rakshasa",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 110,
      "formula": "13d8 + 52"
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
    "skills": {
      "deception": 10,
      "insight": 8
    },
    "damageVulnerabilities": [
      "Piercing from Magic Weapons Wielded by Good Creatures"
    ],
    "damageImmunities": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "Common, Infernal",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Limited Magic Immunity",
        "description": "The rakshasa can't be affected or detected by spells of 6th level or lower unless it wishes to be. It has advantage on saving throws against all other spells and magical effects."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The rakshasa's innate spellcasting ability is Charisma (spell save DC 18, +10 to hit with spell attacks). The rakshasa can innately cast the following spells, requiring no material components:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The rakshasa makes two claw attacks."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage, and the target is cursed if it is a creature. The magical curse takes effect whenever the target takes a short or long rest, filling the target's thoughts with horrible images and dreams. The cursed target gains no benefit from finishing a short or long rest. The curse lasts until it is lifted by a remove curse spell or similar magic."
      }
    ]
  },
  {
    "id": "ddb_rat_legacy",
    "name": "Rat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 2,
      "dex": 11,
      "con": 9,
      "int": 2,
      "wis": 10,
      "cha": 4
    },
    "senses": "Darkvision 30 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 0,
        "reachFeet": 5,
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage."
      }
    ]
  },
  {
    "id": "ddb_raven_legacy",
    "name": "Raven",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
    },
    "speed": "10 ft., Fly 50 ft.",
    "stats": {
      "str": 2,
      "dex": 14,
      "con": 8,
      "int": 2,
      "wis": 12,
      "cha": 6
    },
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Mimicry",
        "description": "The raven can mimic simple sounds it has heard, such as a person whispering, a baby crying, or an animal chittering. A creature that hears the sounds can tell they are imitations with a successful DC 10 Wisdom ( Insight ) check."
      }
    ],
    "actions": [
      {
        "id": "act_0_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 piercing damage."
      }
    ]
  },
  {
    "id": "ddb_red_dragon_wyrmling_legacy",
    "name": "Red Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage plus 3 (1d6) fire damage."
      },
      {
        "id": "act_1_fire_breath__recharge_5_6__",
        "name": "Fire Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "7d6",
        "damageType": "fire",
        "description": "Fire Breath (Recharge 5–6) . The dragon exhales fire in a 15-foot cone. Each creature in that area must make a DC 13 Dexterity saving throw, taking 24 (7d6) fire damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_reef_shark_legacy",
    "name": "Reef Shark",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 22,
      "formula": "4d8 + 4"
    },
    "speed": "0 ft., Swim 40 ft.",
    "stats": {
      "str": 14,
      "dex": 13,
      "con": 13,
      "int": 1,
      "wis": 10,
      "cha": 4
    },
    "skills": {
      "perception": 2
    },
    "senses": "Blindsight 30 ft., Passive Perception 12",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The shark has advantage on an attack roll against a creature if at least one of the shark's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_remorhaz_legacy",
    "name": "Remorhaz",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 195,
      "formula": "17d12 + 85"
    },
    "speed": "30 ft., Burrow 20 ft.",
    "stats": {
      "str": 24,
      "dex": 13,
      "con": 21,
      "int": 4,
      "wis": 10,
      "cha": 5
    },
    "damageImmunities": [
      "Cold",
      "Fire"
    ],
    "senses": "Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Heated Body",
        "description": "A creature that touches the remorhaz or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 11,
        "reachFeet": 10,
        "damage": "6d10+7",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 40 (6d10 + 7) piercing damage plus 10 (3d6) fire damage. If the target is a creature, it is grappled (escape DC 17). Until this grapple ends, the target is restrained , and the remorhaz can't bite another target."
      },
      {
        "id": "act_1_swallow",
        "name": "Swallow",
        "type": "ability",
        "damage": "6d6",
        "damageType": "acid",
        "description": "The remorhaz makes one bite attack against a Medium or smaller creature it is grappling. If the attack hits, that creature takes the bite's damage and is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained , it has total cover against attacks and other effects outside the remorhaz, and it takes 21 (6d6) acid damage at the start of each of the remorhaz's turns."
      }
    ]
  },
  {
    "id": "ddb_rhinoceros_legacy",
    "name": "Rhinoceros",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "armorDesc": "natural armor",
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
    "senses": "Passive Perception 11",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the rhinoceros moves at least 20 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone ."
      }
    ],
    "actions": [
      {
        "id": "act_0_gore",
        "name": "Gore",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+5",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_riding_horse_legacy",
    "name": "Riding Horse",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 13,
      "formula": "2d10 + 2"
    },
    "speed": "60 ft.",
    "stats": {
      "str": 16,
      "dex": 10,
      "con": 12,
      "int": 2,
      "wis": 11,
      "cha": 7
    },
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d4+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_roc_legacy",
    "name": "Roc",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 15,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "--",
    "challengeRating": "11",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The roc has advantage on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The roc makes two attacks: one with its beak and one with its talons."
      },
      {
        "id": "act_1_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 10,
        "damage": "4d8+9",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 27 (4d8 + 9) piercing damage."
      },
      {
        "id": "act_2_talons",
        "name": "Talons",
        "type": "melee_attack",
        "attackBonus": 13,
        "reachFeet": 5,
        "damage": "4d6+9",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 23 (4d6 + 9) slashing damage, and the target is grappled (escape DC 19). Until this grapple ends, the target is restrained , and the roc can't use its talons on another target."
      }
    ]
  },
  {
    "id": "ddb_roper_legacy",
    "name": "Roper",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 20,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 93,
      "formula": "11d10 + 33"
    },
    "speed": "10 ft., Climb 10 ft.",
    "stats": {
      "str": 18,
      "dex": 8,
      "con": 17,
      "int": 7,
      "wis": 16,
      "cha": 6
    },
    "skills": {
      "perception": 6,
      "stealth": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 16",
    "languages": "--",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the roper remains motionless, it is indistinguishable from a normal cave formation, such as a stalagmite."
      },
      {
        "name": "Grasping Tendrils",
        "description": "The roper can have up to six tendrils at a time. Each tendril can be attacked (AC 20; 10 hit points; immunity to poison and psychic damage). Destroying a tendril deals no damage to the roper, which can extrude a replacement tendril on its next turn. A tendril can also be broken if a creature takes an action and succeeds on a DC 15 Strength check against it."
      },
      {
        "name": "Spider Climb",
        "description": "The roper can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The roper makes four attacks with its tendrils, uses Reel, and makes one attack with its bite."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "4d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage."
      },
      {
        "id": "act_2_tendril",
        "name": "Tendril",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 50,
        "description": "Melee Weapon Attack: +7 to hit, reach 50 ft., one creature. Hit: The target is grappled (escape DC 15). Until the grapple ends, the target is restrained and has disadvantage on Strength checks and Strength saving throws, and the roper can't use the same tendril on another target."
      },
      {
        "id": "act_3_reel",
        "name": "Reel",
        "type": "ability",
        "description": "The roper pulls each creature grappled by it up to 25 feet straight toward it."
      }
    ]
  },
  {
    "id": "ddb_rug_of_smothering_legacy",
    "name": "Rug of Smothering",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 33,
      "formula": "6d10"
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
    "damageImmunities": [
      "Poison",
      "Psychic"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 6",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The rug is incapacitated while in the area of an antimagic field . If targeted by dispel magic , the rug must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute."
      },
      {
        "name": "Damage Transfer",
        "description": "While it is grappling a creature, the rug takes only half the damage dealt to it, and the creature grappled by the rug takes the other half."
      },
      {
        "name": "False Appearance",
        "description": "While the rug remains motionless, it is indistinguishable from a normal rug."
      }
    ],
    "actions": [
      {
        "id": "act_0_smother",
        "name": "Smother",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one Medium or smaller creature. Hit: The creature is grappled (escape DC 13). Until this grapple ends, the target is restrained , blinded , and at risk of suffocating, and the rug can't smother another target. In addition, at the start of each of the target's turns, the target takes 10 (2d6 + 3) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_rust_monster_legacy",
    "name": "Rust Monster",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 27,
      "formula": "5d8 + 5"
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
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Iron Scent",
        "description": "The rust monster can pinpoint, by scent, the location of ferrous metal within 30 feet of it."
      },
      {
        "name": "Rust Metal",
        "description": "Any nonmagical weapon made of metal that hits the rust monster corrodes. After dealing damage, the weapon takes a permanent and cumulative −1 penalty to damage rolls. If its penalty drops to −5, the weapon is destroyed. Nonmagical ammunition made of metal that hits the rust monster is destroyed after dealing damage."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d8+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      },
      {
        "id": "act_1_antennae",
        "name": "Antennae",
        "type": "ability",
        "description": "The rust monster corrodes a nonmagical ferrous metal object it can see within 5 feet of it. If the object isn't being worn or carried, the touch destroys a 1-foot cube of it. If the object is being worn or carried by a creature, the creature can make a DC 11 Dexterity saving throw to avoid the rust monster's touch."
      }
    ]
  },
  {
    "id": "ddb_saber_toothed_tiger_legacy",
    "name": "Saber-Toothed Tiger",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 52,
      "formula": "7d10 + 14"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 15,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "skills": {
      "perception": 3,
      "stealth": 6
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The tiger has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the tiger moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone . If the target is prone , the tiger can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d10+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (1d10 + 5) piercing damage."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+5",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_sahuagin_legacy",
    "name": "Sahuagin",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Sahuagin",
    "alignment": "Lawful Evil",
    "armorClass": 12,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 5
    },
    "senses": "Darkvision 120 ft., Passive Perception 15",
    "languages": "Sahuagin",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The sahuagin has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Limited Amphibiousness",
        "description": "The sahuagin can breathe air and water, but it needs to be submerged at least once every 4 hours to avoid suffocating."
      },
      {
        "name": "Shark Telepathy",
        "description": "The sahuagin can magically command any shark within 120 feet of it, using a limited telepathy."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The sahuagin makes two melee attacks: one with its bite and one with its claws or spear."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) slashing damage."
      },
      {
        "id": "act_3_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6+1",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
      }
    ]
  },
  {
    "id": "ddb_salamander_legacy",
    "name": "Salamander",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 90,
      "formula": "12d10 + 24"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 15,
      "int": 11,
      "wis": 10,
      "cha": 12
    },
    "damageVulnerabilities": [
      "Cold"
    ],
    "damageResistances": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Ignan",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Heated Body",
        "description": "A creature that touches the salamander or hits it with a melee attack while within 5 feet of it takes 7 (2d6) fire damage."
      },
      {
        "name": "Heated Weapons",
        "description": "Any metal melee weapon the salamander wields deals an extra 3 (1d6) fire damage on a hit (included in the attack)."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The salamander makes two attacks: one with its spear and one with its tail."
      },
      {
        "id": "act_1_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "rangeFeet": 20,
        "damage": "2d6+4",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20 ft./60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage."
      },
      {
        "id": "act_2_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage plus 7 (2d6) fire damage, and the target is grappled (escape DC 14). Until this grapple ends, the target is restrained , the salamander can automatically hit the target with its tail, and the salamander can’t make tail attacks against other targets."
      }
    ]
  },
  {
    "id": "ddb_satyr_legacy",
    "name": "Satyr",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Chaotic Neutral",
    "armorClass": 14,
    "armorDesc": "leather armor",
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
        "description": "The satyr has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_ram",
        "name": "Ram",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "2d4+1",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) bludgeoning damage."
      },
      {
        "id": "act_1_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "id": "act_2_shortbow",
        "name": "Shortbow",
        "type": "ranged_attack",
        "attackBonus": 5,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_scorpion_legacy",
    "name": "Scorpion",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
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
    "senses": "Blindsight 10 ft., Passive Perception 9",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_sting",
        "name": "Sting",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d8",
        "damageType": "poison",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must make a DC 9 Constitution saving throw, taking 4 (1d8) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_scout_legacy",
    "name": "Scout",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 13,
    "armorDesc": "leather armor",
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
    "skills": {
      "nature": 4,
      "perception": 5,
      "stealth": 6,
      "survival": 5
    },
    "senses": "Passive Perception 15",
    "languages": "Any one language (usually Common)",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Sight",
        "description": "The scout has advantage on Wisdom ( Perception ) checks that rely on hearing or sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The scout makes two melee attacks or two ranged attacks."
      },
      {
        "id": "act_1_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_2_longbow",
        "name": "Longbow",
        "type": "ranged_attack",
        "attackBonus": 4,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +4 to hit, ranged 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_sea_hag_legacy",
    "name": "Sea Hag",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fey",
    "alignment": "Chaotic Evil",
    "armorClass": 14,
    "armorDesc": "natural armor",
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
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Aquan, Common, Giant",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The hag can breathe air and water."
      },
      {
        "name": "Horrific Appearance",
        "description": "Any humanoid that starts its turn within 30 feet of the hag and can see the hag's true form must make a DC 11 Wisdom saving throw. On a failed save, the creature is frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, with disadvantage if the hag is within line of sight, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the hag's Horrific Appearance for the next 24 hours."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      },
      {
        "id": "act_1_death_glare",
        "name": "Death Glare",
        "type": "ability",
        "description": "The hag targets one frightened creature she can see within 30 feet of her. If the target can see the hag, it must succeed on a DC 11 Wisdom saving throw against this magic or drop to 0 hit points."
      },
      {
        "id": "act_2_illusory_appearance",
        "name": "Illusory Appearance",
        "type": "ability",
        "description": "The hag covers herself and anything she is wearing or carrying with a magical illusion that makes her look like an ugly creature of her general size and humanoid shape. The effect ends if the hag takes a bonus action to end it or if she dies."
      }
    ]
  },
  {
    "id": "ddb_sea_horse_legacy",
    "name": "Sea Horse",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 11,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
    },
    "speed": "0 ft., Swim 20 ft.",
    "stats": {
      "str": 1,
      "dex": 12,
      "con": 8,
      "int": 1,
      "wis": 10,
      "cha": 2
    },
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The sea horse can breathe only underwater."
      }
    ],
    "actions": []
  },
  {
    "id": "ddb_shadow_legacy",
    "name": "Shadow",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 16,
      "formula": "3d8 + 3"
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
    "skills": {
      "stealth": 4
    },
    "damageVulnerabilities": [
      "Radiant"
    ],
    "damageResistances": [
      "Acid",
      "Cold",
      "Fire",
      "Lightning",
      "Thunder; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
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
      "Restrained"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The shadow can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Shadow Stealth",
        "description": "While in dim light or darkness, the shadow can take the Hide action as a bonus action."
      },
      {
        "name": "Sunlight Weakness",
        "description": "While in sunlight, the shadow has disadvantage on attack rolls, ability checks, and saving throws."
      }
    ],
    "actions": [
      {
        "id": "act_0_strength_drain",
        "name": "Strength Drain",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6+2",
        "damageType": "necrotic",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d6 + 2) necrotic damage, and the target's Strength score is reduced by 1d4 . The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest."
      }
    ]
  },
  {
    "id": "ddb_shambling_mound_legacy",
    "name": "Shambling Mound",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Plant",
    "alignment": "Unaligned",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 136,
      "formula": "16d10 + 48"
    },
    "speed": "20 ft., Swim 20 ft.",
    "stats": {
      "str": 18,
      "dex": 8,
      "con": 16,
      "int": 5,
      "wis": 10,
      "cha": 5
    },
    "skills": {
      "stealth": 2
    },
    "damageResistances": [
      "Cold",
      "Fire"
    ],
    "damageImmunities": [
      "Lightning"
    ],
    "conditionImmunities": [
      "Blinded",
      "Deafened",
      "Exhaustion"
    ],
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 10",
    "languages": "--",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Lightning Absorption",
        "description": "Whenever the shambling mound is subjected to lightning damage, it takes no damage and regains a number of hit points equal to the lightning damage dealt."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The shambling mound makes two slam attacks. If both attacks hit a Medium or smaller target, the target is grappled (escape DC 14), and the shambling mound uses its Engulf on it."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      },
      {
        "id": "act_2_engulf",
        "name": "Engulf",
        "type": "ability",
        "damage": "2d8+4",
        "damageType": "bludgeoning",
        "description": "The shambling mound engulfs a Medium or smaller creature grappled by it. The engulfed target is blinded , restrained , and unable to breathe, and it must succeed on a DC 14 Constitution saving throw at the start of each of the mound’s turns or take 13 (2d8 + 4) bludgeoning damage. If the mound moves, the engulfed target moves with it. The mound can have only one creature engulfed at a time."
      }
    ]
  },
  {
    "id": "ddb_shield_guardian_legacy",
    "name": "Shield Guardian",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 10",
    "languages": "Understands commands given in any language but can&#x27;t speak",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Bound",
        "description": "The shield guardian is magically bound to an amulet. As long as the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 feet of the amulet's wearer, half of any damage the wearer takes (rounded up) is transferred to the guardian."
      },
      {
        "name": "Regeneration",
        "description": "The shield guardian regains 10 hit points at the start of its turn if it has at least 1 hit point."
      },
      {
        "name": "Spell Storing",
        "description": "A spellcaster who wears the shield guardian's amulet can cause the guardian to store one spell of 4th level or lower. To do so, the wearer must cast the spell on the guardian. The spell has no effect but is stored within the guardian. When commanded to do so by the wearer or when a situation arises that was predefined by the spellcaster, the guardian casts the stored spell with any parameters set by the original caster, requiring no components. When the spell is cast or a new spell is stored, any previously stored spell is lost."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The guardian makes two fist attacks."
      },
      {
        "id": "act_1_fist",
        "name": "Fist",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      }
    ],
    "reactions": [
      {
        "name": "Shield",
        "description": "When a creature makes an attack against the wearer of the guardian's amulet, the guardian grants a +2 bonus to the wearer's AC if the guardian is within 5 feet of the wearer."
      }
    ]
  },
  {
    "id": "ddb_shrieker_legacy",
    "name": "Shrieker",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Plant",
    "alignment": "Unaligned",
    "armorClass": 5,
    "hitPoints": {
      "average": 13,
      "formula": "3d8"
    },
    "speed": "0 ft.",
    "stats": {
      "str": 1,
      "dex": 1,
      "con": 10,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "conditionImmunities": [
      "Blinded",
      "Deafened",
      "Frightened"
    ],
    "senses": "Blindsight 30 ft. (blind beyond this radius), Passive Perception 6",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the shrieker remains motionless, it is indistinguishable from an ordinary fungus."
      }
    ],
    "actions": [],
    "reactions": [
      {
        "name": "Shriek",
        "description": "When bright light or a creature is within 30 feet of the shrieker, it emits a shriek audible within 300 feet of it. The shrieker continues to shriek until the disturbance moves out of range and for 1d4 of the shrieker's turns afterward."
      }
    ]
  },
  {
    "id": "ddb_silver_dragon_wyrmling_legacy",
    "name": "Silver Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage."
      },
      {
        "id": "act_1_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_2_cold_breath",
        "name": "Cold Breath",
        "type": "ability",
        "damage": "4d8",
        "damageType": "cold",
        "description": "The dragon exhales an icy blast in a 15-foot cone. Each creature in that area must make a DC 13 Constitution saving throw, taking 18 (4d8) cold damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_3_paralyzing_breath",
        "name": "Paralyzing Breath",
        "type": "ability",
        "description": "The dragon exhales paralyzing gas in a 15-foot cone. Each creature in that area must succeed on a DC 13 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ddb_skeleton_legacy",
    "name": "Skeleton",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "armorDesc": "armor scraps",
    "hitPoints": {
      "average": 13,
      "formula": "2d8 + 4"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 15,
      "int": 6,
      "wis": 8,
      "cha": 5
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
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Understands all languages it knew in life but can&#x27;t speak",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_1_shortbow",
        "name": "Shortbow",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 80,
        "rangeLongFeet": 320,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_solar_legacy",
    "name": "Solar",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 21,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 243,
      "formula": "18d10 + 144"
    },
    "speed": "50 ft., Fly 150 ft.",
    "stats": {
      "str": 26,
      "dex": 22,
      "con": 26,
      "int": 25,
      "wis": 25,
      "cha": 30
    },
    "skills": {
      "perception": 14
    },
    "damageResistances": [
      "Radiant; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Poisoned"
    ],
    "senses": "Truesight 120 ft., Passive Perception 24",
    "languages": "All, Telepathy 120 ft.",
    "challengeRating": "21",
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The solar's weapon attacks are magical. When the solar hits with any weapon, the weapon deals an extra 6d8 radiant damage (included in the attack)."
      },
      {
        "name": "Divine Awareness",
        "description": "The solar knows if it hears a lie."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The solar's spellcasting ability is Charisma (spell save DC 25). It can innately cast the following spells, requiring no material components:"
      },
      {
        "name": "Magic Resistance",
        "description": "The solar has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The solar makes two greatsword attacks."
      },
      {
        "id": "act_1_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "attackBonus": 15,
        "reachFeet": 5,
        "damage": "4d6+8",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +15 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) slashing damage plus 27 (6d8) radiant damage."
      },
      {
        "id": "act_2_slaying_longbow",
        "name": "Slaying Longbow",
        "type": "ranged_attack",
        "attackBonus": 13,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "2d8+6",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +13 to hit, range 150/600 ft., one target. Hit: 15 (2d8 + 6) piercing damage plus 27 (6d8) radiant damage. If the target is a creature that has 100 hit points or fewer, it must succeed on a DC 15 Constitution saving throw or die."
      },
      {
        "id": "act_3_flying_sword",
        "name": "Flying Sword",
        "type": "ability",
        "description": "The solar releases its greatsword to hover magically in an unoccupied space within 5 feet of it. If the solar can see the sword, the solar can mentally command it as a bonus action to fly up to 50 feet and either make one attack against a target or return to the solar's hands. If the hovering sword is targeted by any effect, the solar is considered to be holding it. The hovering sword falls if the solar dies."
      },
      {
        "id": "act_4_healing_touch__4_day_",
        "name": "Healing Touch (4/Day)",
        "type": "ability",
        "damage": "8d8+4",
        "description": "Healing Touch (4/Day). The solar touches another creature. The target magically regains 40 (8d8 + 4) hit points and is freed from any curse, disease, poison, blindness, or deafness."
      }
    ],
    "legendaryActions": [
      {
        "name": "Teleport",
        "description": "The solar magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      },
      {
        "name": "Searing Burst (Costs 2 Actions)",
        "description": "Searing Burst (Costs 2 Actions). The solar emits magical, divine energy. Each creature of its choice in a 10-foot radius must make a DC 23 Dexterity saving throw, taking 14 (4d6) fire damage plus 14 (4d6) radiant damage on a failed save, or half as much damage on a successful one."
      },
      {
        "name": "Blinding Gaze (Costs 3 Actions)",
        "description": "Blinding Gaze (Costs 3 Actions). The solar targets one creature it can see within 30 feet of it. If the target can see it, the target must succeed on a DC 15 Constitution saving throw or be blinded until magic such as the lesser restoration spell removes the blindness."
      }
    ]
  },
  {
    "id": "ddb_spectator_legacy",
    "name": "Spectator",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Lawful Neutral",
    "armorClass": 14,
    "armorDesc": "natural",
    "hitPoints": {
      "average": 39,
      "formula": "6d8 + 12"
    },
    "speed": "0 ft., Fly 30 ft. (hover)",
    "stats": {
      "str": 8,
      "dex": 14,
      "con": 14,
      "int": 13,
      "wis": 14,
      "cha": 11
    },
    "skills": {
      "perception": 6
    },
    "conditionImmunities": [
      "Prone"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 16",
    "languages": "Deep Speech, Telepathy 120 ft., Undercommon",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 1,
        "reachFeet": 5,
        "damage": "1d6-1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 − 1) piercing damage."
      },
      {
        "id": "act_1_eye_rays",
        "name": "Eye Rays",
        "type": "ability",
        "description": "The spectator shoots up to two of the following magical eye rays at one or two creatures it can see within 90 feet of it. It can use each ray only once on a turn."
      },
      {
        "id": "act_2_create_food_and_water",
        "name": "Create Food and Water",
        "type": "ability",
        "description": "The spectator magically creates enough food and water to sustain itself for 24 hours."
      }
    ],
    "reactions": [
      {
        "name": "Spell Reflection",
        "description": "If the spectator makes a successful saving throw against a spell, or a spell attack misses it, the spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of the spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature."
      }
    ]
  },
  {
    "id": "ddb_specter_legacy",
    "name": "Specter",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "0 ft., Fly 50 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 14,
      "con": 11,
      "int": 10,
      "wis": 10,
      "cha": 11
    },
    "damageResistances": [
      "Acid",
      "Cold",
      "Fire",
      "Lightning",
      "Thunder; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
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
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Understands all languages it knew in life but can&#x27;t speak",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The specter can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the specter has disadvantage on attack rolls, as well as on Wisdom ( Perception ) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "act_0_life_drain",
        "name": "Life Drain",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "3d6",
        "damageType": "necrotic",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) necrotic damage. The target must succeed on a DC 10 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the creature finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."
      }
    ]
  },
  {
    "id": "ddb_spider_legacy",
    "name": "Spider",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
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
    "skills": {
      "stealth": 4
    },
    "senses": "Darkvision 30 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "poison",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 9 Constitution saving throw or take 2 (1d4) poison damage."
      }
    ]
  },
  {
    "id": "ddb_spirit_naga_legacy",
    "name": "Spirit Naga",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 75,
      "formula": "10d10 + 20"
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
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Abyssal, Common",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Rejuvenation",
        "description": "If it dies, the naga returns to life in 1d6 days and regains all its hit points. Only a wish spell can prevent this trait from functioning."
      },
      {
        "name": "Spellcasting",
        "description": "The naga is a 10th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks), and it needs only verbal components to cast its spells. It has the following wizard spells prepared:"
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "1d6+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 7 (1d6 + 4) piercing damage, and the target must make a DC 13 Constitution saving throw, taking 31 (7d8) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_sprite_legacy",
    "name": "Sprite",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Fey",
    "alignment": "Neutral Good",
    "armorClass": 15,
    "armorDesc": "leather armor",
    "hitPoints": {
      "average": 2,
      "formula": "1d4"
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
        "id": "act_0_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 slashing damage."
      },
      {
        "id": "act_1_shortbow",
        "name": "Shortbow",
        "type": "ranged_attack",
        "attackBonus": 6,
        "rangeFeet": 40,
        "rangeLongFeet": 160,
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +6 to hit, range 40/160 ft., one target. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or become poisoned for 1 minute. If its saving throw result is 5 or lower, the poisoned target falls unconscious for the same duration, or until it takes damage or another creature takes an action to shake it awake."
      },
      {
        "id": "act_2_heart_sight",
        "name": "Heart Sight",
        "type": "ability",
        "description": "The sprite touches a creature and magically knows the creature's current emotional state. If the target fails a DC 10 Charisma saving throw, the sprite also knows the creature's alignment. Celestials, fiends, and undead automatically fail the saving throw."
      },
      {
        "id": "act_3_invisibility",
        "name": "Invisibility",
        "type": "ability",
        "description": "The sprite magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell). Any equipment the sprite wears or carries is invisible with it."
      }
    ]
  },
  {
    "id": "ddb_spy_legacy",
    "name": "Spy",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 12,
    "hitPoints": {
      "average": 27,
      "formula": "6d8"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 15,
      "con": 10,
      "int": 12,
      "wis": 14,
      "cha": 16
    },
    "skills": {
      "deception": 5,
      "insight": 4,
      "investigation": 5,
      "perception": 6,
      "persuasion": 5,
      "sleight of hand": 4,
      "stealth": 4
    },
    "senses": "Passive Perception 16",
    "languages": "Any two languages",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Cunning Action",
        "description": "On each of its turns, the spy can use a bonus action to take the Dash , Disengage , or Hide action."
      },
      {
        "name": "Sneak Attack (1/Turn)",
        "description": "Sneak Attack (1/Turn). The spy deals an extra 7 (2d6) damage when it hits a target with a weapon attack and has advantage on the attack roll, or when the target is within 5 feet of an ally of the spy that isn't incapacitated and the spy doesn't have disadvantage on the attack roll."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The spy makes two melee attacks."
      },
      {
        "id": "act_1_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_2_hand_crossbow",
        "name": "Hand Crossbow",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_steam_mephit_legacy",
    "name": "Steam Mephit",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "armorClass": 10,
    "hitPoints": {
      "average": 21,
      "formula": "6d6"
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
    "damageImmunities": [
      "Fire",
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Aquan, Ignan",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a cloud of steam. Each creature within 5 feet of the mephit must succeed on a DC 10 Dexterity saving throw or take 4 (1d8) fire damage."
      },
      {
        "name": "Innate Spellcasting (1/Day)",
        "description": "Innate Spellcasting (1/Day). The mephit can innately cast blur , requiring no material components. Its innate spellcasting ability is Charisma."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 2 (1d4) slashing damage plus 2 (1d4) fire damage."
      },
      {
        "id": "act_1_steam_breath__recharge_6__",
        "name": "Steam Breath (Recharge 6) ",
        "type": "ability",
        "damage": "1d8",
        "damageType": "fire",
        "description": "Steam Breath (Recharge 6) . The mephit exhales a 15- foot cone of scalding steam. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 4 (1d8) fire damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_stirge_legacy",
    "name": "Stirge",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 14,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 2,
      "formula": "1d4"
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
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "--",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_blood_drain",
        "name": "Blood Drain",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d4+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d4 + 3) piercing damage, and the stirge attaches to the target. While attached, the stirge doesn't attack. Instead, at the start of each of the stirge's turns, the target loses 5 (1d4 + 3) hit points due to blood loss."
      }
    ]
  },
  {
    "id": "ddb_stone_giant_legacy",
    "name": "Stone Giant",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "athletics": 12,
      "perception": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Giant",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Stone Camouflage",
        "description": "The giant has advantage on Dexterity ( Stealth ) checks made to hide in rocky terrain."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two greatclub attacks."
      },
      {
        "id": "act_1_greatclub",
        "name": "Greatclub",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 15,
        "damage": "3d8+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage."
      },
      {
        "id": "act_2_rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 9,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "4d10+6",
        "damageType": "bludgeoning",
        "description": "Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 17 Strength saving throw or be knocked prone ."
      }
    ],
    "reactions": [
      {
        "name": "Rock Catching",
        "description": "If a rock or similar object is hurled at the giant, the giant can, with a successful DC 10 Dexterity saving throw, catch the missile and take no bludgeoning damage from it."
      }
    ]
  },
  {
    "id": "ddb_stone_golem_legacy",
    "name": "Stone Golem",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 178,
      "formula": "17d10 + 85"
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
    "damageImmunities": [
      "Poison",
      "Psychic; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Adamantine"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Understands the languages of its creator but can&#x27;t speak",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "3d8+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage."
      },
      {
        "id": "act_2_slow__recharge_5_6__",
        "name": "Slow (Recharge 5–6) ",
        "type": "ability",
        "description": "Slow (Recharge 5–6) . The golem targets one or more creatures it can see within 10 feet of it. Each target must make a DC 17 Wisdom saving throw against this magic. On a failed save, a target can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the target can take either an action or a bonus action on its turn, not both. These effects last for 1 minute. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ddb_storm_giant_legacy",
    "name": "Storm Giant",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Good",
    "armorClass": 16,
    "armorDesc": "scale mail",
    "hitPoints": {
      "average": 230,
      "formula": "20d12 + 100"
    },
    "speed": "50 ft., Swim 50 ft.",
    "stats": {
      "str": 29,
      "dex": 14,
      "con": 20,
      "int": 16,
      "wis": 18,
      "cha": 18
    },
    "skills": {
      "arcana": 8,
      "athletics": 14,
      "history": 8,
      "perception": 9
    },
    "damageResistances": [
      "Cold"
    ],
    "damageImmunities": [
      "Lightning",
      "Thunder"
    ],
    "senses": "Passive Perception 19",
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
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The giant makes two Greatsword attacks."
      },
      {
        "id": "act_1_greatsword",
        "name": "Greatsword",
        "type": "melee_attack",
        "attackBonus": 14,
        "reachFeet": 10,
        "damage": "6d6+9",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 30 (6d6 + 9) slashing damage."
      },
      {
        "id": "act_2_rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 14,
        "rangeFeet": 60,
        "rangeLongFeet": 240,
        "damage": "4d12+9",
        "damageType": "bludgeoning",
        "description": "Ranged Weapon Attack: +14 to hit, range 60/240 ft., one target. Hit: 35 (4d12 + 9) bludgeoning damage."
      },
      {
        "id": "act_3_lightning_strike__recharge_5_6__",
        "name": "Lightning Strike (Recharge 5–6) ",
        "type": "ability",
        "damage": "12d8",
        "damageType": "lightning",
        "description": "Lightning Strike (Recharge 5–6) . The giant hurls a magical lightning bolt at a point it can see within 500 feet of it. Each creature within 10 feet of that point must make a DC 17 Dexterity saving throw, taking 54 (12d8) lightning damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_4_spellcasting",
        "name": "Spellcasting",
        "type": "ability",
        "description": "The giant casts one of the following spells, requiring no material spell components and using Charisma as the spellcasting ability (spell save DC 17):"
      }
    ]
  },
  {
    "id": "ddb_succubus_legacy",
    "name": "Succubus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Fiend",
    "subtype": "Shapechanger",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
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
      "Lightning",
      "Poison; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 15",
    "languages": "Abyssal, Common, Infernal, Telepathy 60 ft.",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Telepathic Bond",
        "description": "The fiend ignores the range restriction on its telepathy when communicating with a creature it has charmed . The two don't even need to be on the same plane of existence."
      },
      {
        "name": "Shapechanger",
        "description": "The fiend can use its action to polymorph into a Small or Medium humanoid, or back into its true form. Without wings, the fiend loses its flying speed. Other than its size and speed, its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      }
    ],
    "actions": [
      {
        "id": "act_0_claw__fiend_form_only_",
        "name": "Claw (Fiend Form Only)",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "slashing",
        "description": "Claw (Fiend Form Only). Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "id": "act_1_charm",
        "name": "Charm",
        "type": "ability",
        "description": "One humanoid the fiend can see within 30 feet of it must succeed on a DC 15 Wisdom saving throw or be magically charmed for 1 day. The charmed target obeys the fiend's verbal or telepathic commands. If the target suffers any harm or receives a suicidal command, it can repeat the saving throw, ending the effect on a success. If the target successfully saves against the effect, or if the effect on it ends, the target is immune to this fiend's Charm for the next 24 hours."
      },
      {
        "id": "act_2_draining_kiss",
        "name": "Draining Kiss",
        "type": "ability",
        "damage": "5d10+5",
        "damageType": "psychic",
        "description": "The fiend kisses a creature charmed by it or a willing creature. The target must make a DC 15 Constitution saving throw against this magic, taking 32 (5d10 + 5) psychic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."
      },
      {
        "id": "act_3_etherealness",
        "name": "Etherealness",
        "type": "ability",
        "description": "The fiend magically enters the Ethereal Plane from the Material Plane, or vice versa."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_bats_legacy",
    "name": "Swarm of Bats",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "0 ft., Fly 30 ft.",
    "stats": {
      "str": 5,
      "dex": 15,
      "con": 10,
      "int": 2,
      "wis": 12,
      "cha": 4
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
    "senses": "Blindsight 60 ft., Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The swarm can’t use its blindsight while deafened ."
      },
      {
        "name": "Keen Hearing",
        "description": "The swarm has advantage on Wisdom ( Perception ) checks that rely on hearing."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature’s space and vice versa, and the swarm can move through any opening large enough for a Tiny bat. The swarm can’t regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 0,
        "damage": "2d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 0 ft., one creature in the swarm's space. Hit: 5 (2d4) piercing damage, or 2 (1d4) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_insects_legacy",
    "name": "Swarm of Insects",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "20 ft., Climb 20 ft.",
    "stats": {
      "str": 3,
      "dex": 13,
      "con": 10,
      "int": 1,
      "wis": 7,
      "cha": 1
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
    "senses": "Blindsight 10 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 0,
        "damage": "4d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_insects__beetles__legacy",
    "name": "Swarm of Insects (Beetles)",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "20 ft., Climb 20 ft., Burrow 5 ft.",
    "stats": {
      "str": 3,
      "dex": 13,
      "con": 10,
      "int": 1,
      "wis": 7,
      "cha": 1
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
    "senses": "Blindsight 10 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 0,
        "damage": "4d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_insects__centipedes__legacy",
    "name": "Swarm of Insects (Centipedes)",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "20 ft., Climb 20 ft.",
    "stats": {
      "str": 3,
      "dex": 13,
      "con": 10,
      "int": 1,
      "wis": 7,
      "cha": 1
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
    "senses": "Blindsight 10 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 0,
        "damage": "4d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_insects__spiders__legacy",
    "name": "Swarm of Insects (Spiders)",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "20 ft., Climb 20 ft.",
    "stats": {
      "str": 3,
      "dex": 13,
      "con": 10,
      "int": 1,
      "wis": 7,
      "cha": 1
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
    "senses": "Blindsight 10 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      },
      {
        "name": "Spider Climb",
        "description": "The swarm can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the swarm knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The swarm ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 0,
        "damage": "4d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_insects__wasps__legacy",
    "name": "Swarm of Insects (Wasps)",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 22,
      "formula": "5d8"
    },
    "speed": "5 ft., Fly 30 ft.",
    "stats": {
      "str": 3,
      "dex": 13,
      "con": 10,
      "int": 1,
      "wis": 7,
      "cha": 1
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
    "senses": "Blindsight 10 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 0,
        "damage": "4d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_poisonous_snakes_legacy",
    "name": "Swarm of Poisonous Snakes",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Blindsight 10 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny snake. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 0,
        "damage": "2d6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 0 ft., one creature in the swarm's space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer. The target must make a DC 10 Constitution saving throw, taking 14 (4d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_quippers_legacy",
    "name": "Swarm of Quippers",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 28,
      "formula": "8d8 - 8"
    },
    "speed": "0 ft., Swim 40 ft.",
    "stats": {
      "str": 13,
      "dex": 16,
      "con": 9,
      "int": 1,
      "wis": 7,
      "cha": 2
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
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The swarm has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny quipper. The swarm can't regain hit points or gain temporary hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The swarm can breathe only underwater."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 0,
        "damage": "4d6",
        "damageType": "piercing",
        "description": ". Melee Weapon Attack: +5 to hit, reach 0 ft., one creature in the swarm's space. Hit: 14 (4d6) piercing damage, or 7 (2d6) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_rats_legacy",
    "name": "Swarm of Rats",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 10,
    "hitPoints": {
      "average": 24,
      "formula": "7d8 - 7"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 9,
      "dex": 11,
      "con": 9,
      "int": 2,
      "wis": 10,
      "cha": 3
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
    "senses": "Darkvision 30 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The swarm has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny rat. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 0,
        "damage": "2d6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +2 to hit, reach 0 ft., one target in the swarm's space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_swarm_of_ravens_legacy",
    "name": "Swarm of Ravens",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Humanoid",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 24,
      "formula": "7d8 - 7"
    },
    "speed": "10 ft., Fly 50 ft.",
    "stats": {
      "str": 6,
      "dex": 14,
      "con": 8,
      "int": 3,
      "wis": 12,
      "cha": 6
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
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny raven. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "id": "act_0_beaks",
        "name": "Beaks",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target in the swarm's space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer."
      }
    ]
  },
  {
    "id": "ddb_tarrasque_legacy",
    "name": "Tarrasque",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Gargantuan",
    "type": "Monstrosity",
    "subtype": "Titan",
    "alignment": "Unaligned",
    "armorClass": 25,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 676,
      "formula": "33d20 + 330"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 30,
      "dex": 11,
      "con": 30,
      "int": 3,
      "wis": 11,
      "cha": 11
    },
    "damageImmunities": [
      "Fire",
      "Poison; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Blindsight 120 ft., Passive Perception 10",
    "languages": "--",
    "challengeRating": "30",
    "proficiencyBonus": 9,
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "Legendary Resistance (3/Day). If the tarrasque fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "description": "The tarrasque has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Reflective Carapace",
        "description": "Any time the tarrasque is targeted by a magic missile spell, a line spell, or a spell that requires a ranged attack roll, roll a d6 . On a 1 to 5, the tarrasque is unaffected. On a 6, the tarrasque is unaffected, and the effect is reflected back at the caster as though it originated from the tarrasque, turning the caster into the target."
      },
      {
        "name": "Siege Monster",
        "description": "The tarrasque deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The tarrasque can use its Frightful Presence. It then makes five attacks: one with its bite, two with its claws, one with its horns, and one with its tail. It can use its Swallow instead of its bite."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 19,
        "reachFeet": 10,
        "damage": "4d12+10",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +19 to hit, reach 10 ft., one target. Hit: 36 (4d12 + 10) piercing damage. If the target is a creature, it is grappled (escape DC 20). Until this grapple ends, the target is restrained , and the tarrasque can’t bite another target."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 19,
        "reachFeet": 15,
        "damage": "4d8+10",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +19 to hit, reach 15ft., one target. Hit: 28 (4d8 + 10) slashing damage."
      },
      {
        "id": "act_3_horns",
        "name": "Horns",
        "type": "melee_attack",
        "attackBonus": 19,
        "reachFeet": 10,
        "damage": "4d10+10",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +19 to hit, reach 10ft., one target. Hit: 32 (4d10 + 10) piercing damage."
      },
      {
        "id": "act_4_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 19,
        "reachFeet": 20,
        "damage": "4d6+10",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +19 to hit, reach 20ft., one target. Hit: 24 (4d6 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be knocked prone ."
      },
      {
        "id": "act_5_frightful_presence",
        "name": "Frightful Presence",
        "type": "ability",
        "description": "Each creature of the tarrasque’s choice within 120 feet of it and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, with disadvantage if the tarrasque is within line of sight, ending the effect on itself on a success. If a creature’s saving throw is successful or the effect ends for it, the creature is immune to the tarrasque’s Frightful Presence for the next 24 hours."
      },
      {
        "id": "act_6_swallow",
        "name": "Swallow",
        "type": "ability",
        "damage": "16d6",
        "damageType": "acid",
        "description": "The tarrasque makes one bite attack against a Large or smaller creature it is grappling. If the attack hits, the target takes the bite’s damage, the target is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained , it has total cover against attacks and other effects outside the tarrasque, and it takes 56 (16d6) acid damage at the start of each of the tarrasque’s turns."
      }
    ],
    "legendaryActions": [
      {
        "name": "Attack",
        "description": "The tarrasque makes one claw attack or tail attack."
      },
      {
        "name": "Move",
        "description": "The tarrasque moves up to half its speed."
      },
      {
        "name": "Chomp (Costs 2 Actions)",
        "description": "Chomp (Costs 2 Actions). The tarrasque makes one bite attack or uses its Swallow."
      }
    ]
  },
  {
    "id": "ddb_thug_legacy",
    "name": "Thug",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Non-Good Alignment",
    "armorClass": 11,
    "armorDesc": "leather armor",
    "hitPoints": {
      "average": 32,
      "formula": "5d8 + 10"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 15,
      "dex": 11,
      "con": 14,
      "int": 10,
      "wis": 10,
      "cha": 11
    },
    "skills": {
      "intimidation": 2
    },
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The thug has advantage on an attack roll against a creature if at least one of the thug's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The thug makes two melee attacks."
      },
      {
        "id": "act_1_mace",
        "name": "Mace",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) bludgeoning damage."
      },
      {
        "id": "act_2_heavy_crossbow",
        "name": "Heavy Crossbow",
        "type": "ranged_attack",
        "attackBonus": 2,
        "rangeFeet": 100,
        "rangeLongFeet": 400,
        "damage": "1d10",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_tiger_legacy",
    "name": "Tiger",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 12,
    "hitPoints": {
      "average": 37,
      "formula": "5d10 + 10"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 14,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "skills": {
      "perception": 3,
      "stealth": 6
    },
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "--",
    "challengeRating": "1",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The tiger has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the tiger moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone . If the target is prone , the tiger can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_treant_legacy",
    "name": "Treant",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Plant",
    "alignment": "Chaotic Good",
    "armorClass": 16,
    "armorDesc": "natural armor",
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
        "name": "False Appearance",
        "description": "While the treant remains motionless, it is indistinguishable from a normal tree."
      },
      {
        "name": "Siege Monster",
        "description": "The treant deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The treant makes two slam attacks."
      },
      {
        "id": "act_1_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "3d6+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 16 (3d6 + 6) bludgeoning damage."
      },
      {
        "id": "act_2_rock",
        "name": "Rock",
        "type": "ranged_attack",
        "attackBonus": 10,
        "rangeFeet": 60,
        "rangeLongFeet": 180,
        "damage": "4d10+6",
        "damageType": "bludgeoning",
        "description": "Ranged Weapon Attack: +10 to hit, range 60/180 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage."
      },
      {
        "id": "act_3_animate_trees__1_day_",
        "name": "Animate Trees (1/Day)",
        "type": "ability",
        "description": "Animate Trees (1/Day). The treant magically animates one or two trees it can see within 60 feet of it. These trees have the same statistics as a treant, except they have Intelligence and Charisma scores of 1, they can't speak, and they have only the Slam action option. An animated tree acts as an ally of the treant. The tree remains animate for 1 day or until it dies; until the treant dies or is more than 120 feet from the tree; or until the treant takes a bonus action to turn it back into an inanimate tree. The tree then takes root if possible."
      }
    ]
  },
  {
    "id": "ddb_tribal_warrior_legacy",
    "name": "Tribal Warrior",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 12,
    "armorDesc": "hide armor",
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 13,
      "dex": 11,
      "con": 12,
      "int": 8,
      "wis": 11,
      "cha": 8
    },
    "senses": "Passive Perception 10",
    "languages": "Any one language",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The warrior has advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_spear",
        "name": "Spear",
        "type": "ranged_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6+1",
        "damageType": "piercing",
        "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
      }
    ]
  },
  {
    "id": "ddb_triceratops_legacy",
    "name": "Triceratops",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 95,
      "formula": "10d12 + 30"
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
    "senses": "Passive Perception 10",
    "languages": "--",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the triceratops moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone . If the target is prone , the triceratops can make one stomp attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_gore",
        "name": "Gore",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "4d8+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 24 (4d8 + 6) piercing damage."
      },
      {
        "id": "act_1_stomp",
        "name": "Stomp",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "3d10+6",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_troll_legacy",
    "name": "Troll",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 84,
      "formula": "8d10 + 40"
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
    "skills": {
      "perception": 2
    },
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Giant",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The troll has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Regeneration",
        "description": "The troll regains 10 hit points at the start of its turn. If the troll takes acid or fire damage, this trait doesn't function at the start of the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The troll makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_twig_blight_legacy",
    "name": "Twig Blight",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Small",
    "type": "Plant",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 4,
      "formula": "1d6 + 1"
    },
    "speed": "20 ft.",
    "stats": {
      "str": 6,
      "dex": 13,
      "con": 12,
      "int": 4,
      "wis": 8,
      "cha": 3
    },
    "skills": {
      "stealth": 3
    },
    "damageVulnerabilities": [
      "Fire"
    ],
    "conditionImmunities": [
      "Blinded",
      "Deafened"
    ],
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 9",
    "languages": "understands Common but can’t speak",
    "challengeRating": "1/8",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the blight remains motionless, it is indistinguishable from a dead shrub."
      }
    ],
    "actions": [
      {
        "id": "act_0_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d4+1",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_tyrannosaurus_rex_legacy",
    "name": "Tyrannosaurus Rex",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4
    },
    "senses": "Passive Perception 14",
    "languages": "--",
    "challengeRating": "8",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The tyrannosaurus makes two attacks: one with its bite and one with its tail. It can't make both attacks against the same target."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "4d12+7",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 33 (4d12 + 7) piercing damage. If the target is a Medium or smaller creature, it is grappled (escape DC 17). Until this grapple ends, the target is restrained , and the tyrannosaurus can't bite another target."
      },
      {
        "id": "act_2_tail",
        "name": "Tail",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "3d8+7",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 20 (3d8 + 7) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_unicorn_legacy",
    "name": "Unicorn",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "armorClass": 12,
    "hitPoints": {
      "average": 67,
      "formula": "9d10 + 18"
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
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Paralyzed",
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "Celestial, Elvish, Sylvan, Telepathy 60 ft.",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Charge",
        "description": "If the unicorn moves at least 20 feet straight toward a target and then hits it with a horn attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone ."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The unicorn’s innate spellcasting ability is Charisma (spell save DC 14). The unicorn can innately cast the following spells, requiring no components:"
      },
      {
        "name": "Magic Resistance",
        "description": "The unicorn has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The unicorn’s weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The unicorn makes two attacks: one with its hooves and one with its horn."
      },
      {
        "id": "act_1_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      },
      {
        "id": "act_2_horn",
        "name": "Horn",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage."
      },
      {
        "id": "act_3_healing_touch__3_day_",
        "name": "Healing Touch (3/Day)",
        "type": "ability",
        "damage": "2d8+2",
        "description": "Healing Touch (3/Day). The unicorn touches another creature with its horn. The target magically regains 11 (2d8 + 2) hit points. In addition, the touch removes all diseases and neutralizes all poisons afflicting the target."
      },
      {
        "id": "act_4_teleport__1_day_",
        "name": "Teleport (1/Day)",
        "type": "ability",
        "description": "Teleport (1/Day). The unicorn magically teleports itself and up to three willing creatures it can see within 5 feet of it, along with any equipment they are wearing or carrying, to a location the unicorn is familiar with, up to 1 mile away."
      }
    ],
    "legendaryActions": [
      {
        "name": "Hooves",
        "description": "The unicorn makes one attack with its hooves."
      },
      {
        "name": "Shimmering Shield (Costs 2 Actions)",
        "description": "Shimmering Shield (Costs 2 Actions). The unicorn creates a shimmering, magical field around itself or another creature it can see within 60 feet of it. The target gains a +2 bonus to AC until the end of the unicorn’s next turn."
      },
      {
        "name": "Heal Self (Costs 3 Actions)",
        "description": "Heal Self (Costs 3 Actions). The unicorn magically regains 11 (2d8 + 2) hit points."
      }
    ]
  },
  {
    "id": "vampire_legacy",
    "name": "Vampire",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "subtype": "Shapechanger",
    "alignment": "Lawful Evil",
    "armorClass": 16,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 144,
      "formula": "17d8+68"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 18,
      "dex": 18,
      "con": 18,
      "int": 17,
      "wis": 15,
      "cha": 18
    },
    "savingThrows": {
      "dex": 9,
      "wis": 7,
      "cha": 9
    },
    "skills": {
      "perception": 7,
      "stealth": 9
    },
    "damageResistances": [
      "Necrotic",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 17",
    "languages": "The languages it knew in life",
    "challengeRating": "13",
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Regeneration",
        "description": "The vampire regains 20 HP at the start of its turn if it has at least 1 HP and isn't in sunlight or running water. If the vampire takes radiant damage or holy water, this trait doesn't function at the start of its next turn."
      },
      {
        "name": "Spider Climb",
        "description": "The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the vampire fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The vampire makes two attacks, only one of which can be a bite attack."
      },
      {
        "id": "unarmed_strike",
        "name": "Unarmed Strike",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "1d8+4",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one creature. Hit: 8 (1d8 + 4) bludgeoning damage. Instead of dealing damage, the vampire can grapple the target (escape DC 18)."
      },
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage. The target's max HP is reduced by an amount equal to the necrotic damage taken, and the vampire regains HP equal to that amount."
      },
      {
        "id": "charm",
        "name": "Charm",
        "type": "ability",
        "saveDc": 17,
        "saveStat": "wis",
        "description": "The vampire targets one humanoid it can see within 30 ft. Target must make a DC 17 Wisdom saving throw or be charmed for 24 hours."
      }
    ],
    "legendaryActions": [
      {
        "name": "Move",
        "description": "The vampire moves up to its speed without provoking opportunity attacks."
      },
      {
        "name": "Unarmed Strike",
        "description": "The vampire makes one unarmed strike."
      },
      {
        "name": "Bite (Costs 2 Actions)",
        "description": "The vampire makes one bite attack."
      }
    ]
  },
  {
    "id": "ddb_vampire_spawn_legacy",
    "name": "Vampire Spawn",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 82,
      "formula": "11d8 + 33"
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
    "skills": {
      "perception": 3,
      "stealth": 6
    },
    "damageResistances": [
      "Necrotic; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "the languages it knew in life",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Regeneration",
        "description": "The vampire regains 10 hit points at the start of its turn if it has at least 1 hit point and isn't in sunlight or running water. If the vampire takes radiant damage or damage from holy water, this trait doesn't function at the start of the vampire's next turn."
      },
      {
        "name": "Spider Climb",
        "description": "The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Vampire Weaknesses",
        "description": "The vampire has the following flaws:"
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The vampire makes two attacks, only one of which can be a bite attack."
      },
      {
        "id": "act_1_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d4+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 8 (2d4 + 3) slashing damage. Instead of dealing damage, the vampire can grapple the target (escape DC 13)."
      },
      {
        "id": "act_2_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated , or restrained . Hit: 6 (1d6 + 3) piercing damage plus 7 (2d6) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."
      }
    ]
  },
  {
    "id": "ddb_veteran_legacy",
    "name": "Veteran",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Any Race",
    "alignment": "Any Alignment",
    "armorClass": 17,
    "armorDesc": "splint",
    "hitPoints": {
      "average": 58,
      "formula": "9d8 + 18"
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
    "skills": {
      "athletics": 5,
      "perception": 2
    },
    "senses": "Passive Perception 12",
    "languages": "Any one language (usually Common)",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack."
      },
      {
        "id": "act_1_longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands."
      },
      {
        "id": "act_2_shortsword",
        "name": "Shortsword",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "id": "act_3_heavy_crossbow",
        "name": "Heavy Crossbow",
        "type": "ranged_attack",
        "attackBonus": 3,
        "rangeFeet": 100,
        "rangeLongFeet": 400,
        "damage": "1d10+1",
        "damageType": "piercing",
        "description": "Ranged Weapon Attack: +3 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_violet_fungus_legacy",
    "name": "Violet Fungus",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "conditionImmunities": [
      "Blinded",
      "Deafened",
      "Frightened"
    ],
    "senses": "Blindsight 30 ft. (blind beyond this radius), Passive Perception 6",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the violet fungus remains motionless, it is indistinguishable from an ordinary fungus."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The fungus makes 1d4 Rotting Touch attacks."
      },
      {
        "id": "act_1_rotting_touch",
        "name": "Rotting Touch",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 10,
        "damage": "1d8",
        "damageType": "necrotic",
        "description": "Melee Weapon Attack: +2 to hit, reach 10 ft., one creature. Hit: 4 (1d8) necrotic damage."
      }
    ]
  },
  {
    "id": "ddb_vrock_legacy",
    "name": "Vrock",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Fiend",
    "subtype": "Demon",
    "alignment": "Chaotic Evil",
    "armorClass": 15,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 104,
      "formula": "11d10 + 44"
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
    "damageResistances": [
      "Cold",
      "Fire",
      "Lightning; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Abyssal, Telepathy 120 ft.",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The vrock has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The vrock makes two attacks: one with its beak and one with its talons."
      },
      {
        "id": "act_1_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage."
      },
      {
        "id": "act_2_talons",
        "name": "Talons",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d10+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage."
      },
      {
        "id": "act_3_spores__recharge_6__",
        "name": "Spores (Recharge 6) ",
        "type": "ability",
        "damage": "1d10",
        "damageType": "poison",
        "description": "Spores (Recharge 6) . A 15­-foot­-radius cloud of toxic spores extends out from the vrock. The spores spread around corners. Each creature in that area must succeed on a DC 14 Constitution saving throw or become poisoned . While poisoned in this way, a target takes 5 (1d10) poison damage at the start of each of its turns. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Emptying a vial of holy water on the target also ends the effect on it."
      },
      {
        "id": "act_4_stunning_screech__1_day_",
        "name": "Stunning Screech (1/Day)",
        "type": "ability",
        "description": "Stunning Screech (1/Day). The vrock emits a horrific screech. Each creature within 20 feet of it that can hear it and that isn't a demon must succeed on a DC 14 Constitution saving throw or be stunned until the end of the vrock's next turn."
      }
    ]
  },
  {
    "id": "ddb_vulture_legacy",
    "name": "Vulture",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "skills": {
      "perception": 3
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight and Smell",
        "description": "The vulture has advantage on Wisdom ( Perception ) checks that rely on sight or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The vulture has advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_beak",
        "name": "Beak",
        "type": "melee_attack",
        "attackBonus": 2,
        "reachFeet": 5,
        "damage": "1d4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_warhorse_legacy",
    "name": "Warhorse",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
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
    "senses": "Passive Perception 11",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the horse moves at least 20 feet straight toward a creature and then hits it with a hooves attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone . If the target is prone , the horse can make another attack with its hooves against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "ddb_warhorse_skeleton_legacy",
    "name": "Warhorse Skeleton",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "armorClass": 13,
    "armorDesc": "barding scraps",
    "hitPoints": {
      "average": 22,
      "formula": "3d10 + 6"
    },
    "speed": "60 ft.",
    "stats": {
      "str": 18,
      "dex": 12,
      "con": 15,
      "int": 2,
      "wis": 8,
      "cha": 5
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
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "--",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_hooves",
        "name": "Hooves",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      }
    ]
  },
  {
    "id": "water_elemental_legacy",
    "name": "Water Elemental",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 14,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 114,
      "formula": "12d10+48"
    },
    "speed": "30 ft., swim 90 ft.",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 18,
      "int": 5,
      "wis": 10,
      "cha": 8
    },
    "damageResistances": [
      "Acid",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "exhaustion",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "unconscious"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Aquan",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Water Form",
        "description": "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing."
      }
    ],
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "id": "slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "Bludgeoning",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      },
      {
        "id": "whelm",
        "name": "Whelm (Recharge 4-6)",
        "type": "ability",
        "saveDc": 15,
        "saveStat": "str",
        "damage": "2d8+4",
        "damageType": "Bludgeoning",
        "description": "Each creature in the elemental's space must make a DC 15 Strength saving throw. On a failure, a target takes 13 (2d8 + 4) bludgeoning damage and is grappled (escape DC 14) and restrained and unable to breathe."
      }
    ]
  },
  {
    "id": "ddb_weasel_legacy",
    "name": "Weasel",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "hitPoints": {
      "average": 1,
      "formula": "1d4 - 1"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 3,
      "dex": 16,
      "con": 8,
      "int": 2,
      "wis": 12,
      "cha": 3
    },
    "skills": {
      "perception": 3,
      "stealth": 5
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "0",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The weasel has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage."
      }
    ]
  },
  {
    "id": "ddb_werebear_legacy",
    "name": "Werebear",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Human, Shapechanger",
    "alignment": "Shapechanger)",
    "armorClass": 10,
    "armorDesc": "in humanoid form, 11 (natural armor) in bear and hybrid form",
    "hitPoints": {
      "average": 135,
      "formula": "18d8 + 54"
    },
    "speed": "30 ft., (40 ft. , Climb 30 ft. in bear or hybrid form)",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 17,
      "int": 11,
      "wis": 12,
      "cha": 12
    },
    "skills": {
      "perception": 7
    },
    "damageImmunities": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "senses": "Passive Perception 17",
    "languages": "Common (can&#x27;t speak in bear form)",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The werebear can use its action to polymorph into a Large bear-humanoid hybrid or into a Large bear, or back into its true form, which is humanoid. Its statistics, other than its size and AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Smell",
        "description": "The werebear has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "In bear form, the werebear makes two claw attacks. In humanoid form, it makes two greataxe attacks. In hybrid form, it can attack like a bear or a humanoid."
      },
      {
        "id": "act_1_bite__bear_or_hybrid_form_only_",
        "name": "Bite (Bear or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d10+4",
        "damageType": "piercing",
        "description": "Bite (Bear or Hybrid Form Only). Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage. If the target is a humanoid, it must succeed on a DC 14 Constitution saving throw or be cursed with werebear lycanthropy."
      },
      {
        "id": "act_2_claw__bear_or_hybrid_form_only_",
        "name": "Claw (Bear or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "slashing",
        "description": "Claw (Bear or Hybrid Form Only). Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      },
      {
        "id": "act_3_greataxe__humanoid_or_hybrid_form_only_",
        "name": "Greataxe (Humanoid or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "1d12+4",
        "damageType": "slashing",
        "description": "Greataxe (Humanoid or Hybrid Form Only). Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) slashing damage."
      }
    ]
  },
  {
    "id": "ddb_wereboar_legacy",
    "name": "Wereboar",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Human, Shapechanger",
    "alignment": "Shapechanger)",
    "armorClass": 10,
    "armorDesc": "in humanoid form, 11 (natural armor) in boar or hybrid form",
    "hitPoints": {
      "average": 78,
      "formula": "12d8 + 24"
    },
    "speed": "30 ft., 40 ft. in boar form",
    "stats": {
      "str": 17,
      "dex": 10,
      "con": 15,
      "int": 10,
      "wis": 11,
      "cha": 8
    },
    "skills": {
      "perception": 2
    },
    "damageImmunities": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "senses": "Passive Perception 12",
    "languages": "Common (can&#x27;t speak in boar form)",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The wereboar can use its action to polymorph into a boar-humanoid hybrid or into a boar, or back into its true form, which is humanoid. Its statistics, other than its AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Charge (Boar or Hybrid Form Only)",
        "description": "Charge (Boar or Hybrid Form Only). If the wereboar moves at least 15 feet straight toward a target and then hits it with its tusks on the same turn, the target takes an extra 7 (2d6) slashing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone ."
      },
      {
        "name": "Relentless (Recharges after a Short or Long Rest)",
        "description": "Relentless (Recharges after a Short or Long Rest). If the wereboar takes 14 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack__humanoid_or_hybrid_form_only_",
        "name": "Multiattack (Humanoid or Hybrid Form Only)",
        "type": "multiattack",
        "description": "Multiattack (Humanoid or Hybrid Form Only). The wereboar makes two attacks, only one of which can be with its tusks."
      },
      {
        "id": "act_1_maul__humanoid_or_hybrid_form_only_",
        "name": "Maul (Humanoid or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "bludgeoning",
        "description": "Maul (Humanoid or Hybrid Form Only). Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage."
      },
      {
        "id": "act_2_tusks__boar_or_hybrid_form_only_",
        "name": "Tusks (Boar or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "slashing",
        "description": "Tusks (Boar or Hybrid Form Only). Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with wereboar lycanthropy."
      }
    ]
  },
  {
    "id": "ddb_wererat_legacy",
    "name": "Wererat",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Human, Shapechanger",
    "alignment": "Shapechanger)",
    "armorClass": 12,
    "hitPoints": {
      "average": 33,
      "formula": "6d8 + 6"
    },
    "speed": "30 ft.",
    "stats": {
      "str": 10,
      "dex": 15,
      "con": 12,
      "int": 11,
      "wis": 10,
      "cha": 8
    },
    "skills": {
      "perception": 2,
      "stealth": 4
    },
    "damageImmunities": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "senses": "Darkvision 60 ft. (rat form only), Passive Perception 12",
    "languages": "Common (can’t speak in rat form)",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The wererat can use its action to polymorph into a rat-humanoid hybrid or into a giant rat, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Smell",
        "description": "The wererat has advantage on Wisdom ( Perception ) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack__humanoid_or_hybrid_form_only_",
        "name": "Multiattack (Humanoid or Hybrid Form Only)",
        "type": "multiattack",
        "description": "Multiattack (Humanoid or Hybrid Form Only). The wererat makes two attacks, only one of which can be a bite."
      },
      {
        "id": "act_1_bite__rat_or_hybrid_form_only_",
        "name": "Bite (Rat or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d4+2",
        "damageType": "piercing",
        "description": "Bite (Rat or Hybrid Form Only). Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 11 Constitution saving throw or be cursed with wererat lycanthropy."
      },
      {
        "id": "act_2_shortsword__humanoid_or_hybrid_form_only_",
        "name": "Shortsword (Humanoid or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Shortsword (Humanoid or Hybrid Form Only). Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "id": "act_3_hand_crossbow__humanoid_or_hybrid_form_only_",
        "name": "Hand Crossbow (Humanoid or Hybrid Form Only)",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 30,
        "rangeLongFeet": 120,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Hand Crossbow (Humanoid or Hybrid Form Only). Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_weretiger_legacy",
    "name": "Weretiger",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Human, Shapechanger",
    "alignment": "Shapechanger)",
    "armorClass": 12,
    "hitPoints": {
      "average": 120,
      "formula": "16d8 + 48"
    },
    "speed": "30 ft., (40 ft. in tiger form)",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 16,
      "int": 10,
      "wis": 13,
      "cha": 11
    },
    "skills": {
      "perception": 5,
      "stealth": 4
    },
    "damageImmunities": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 15",
    "languages": "Common (can&#x27;t speak in tiger form)",
    "challengeRating": "4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The weretiger can use its action to polymorph into a tiger-humanoid hybrid or into a tiger, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The weretiger has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      },
      {
        "name": "Pounce (Tiger or Hybrid Form Only)",
        "description": "Pounce (Tiger or Hybrid Form Only). If the weretiger moves at least 15 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone . If the target is prone , the weretiger can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack__humanoid_or_hybrid_form_only_",
        "name": "Multiattack (Humanoid or Hybrid Form Only)",
        "type": "multiattack",
        "description": "Multiattack (Humanoid or Hybrid Form Only). In humanoid form, the weretiger makes two scimitar attacks or two longbow attacks. In hybrid form, it can attack like a humanoid or make two claw attacks."
      },
      {
        "id": "act_1_bite__tiger_or_hybrid_form_only_",
        "name": "Bite (Tiger or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d10+3",
        "damageType": "piercing",
        "description": "Bite (Tiger or Hybrid Form Only). Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage. If the target is a humanoid, it must succeed on a DC 13 Constitution saving throw or be cursed with weretiger lycanthropy."
      },
      {
        "id": "act_2_claw__tiger_or_hybrid_form_only_",
        "name": "Claw (Tiger or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d8+3",
        "damageType": "slashing",
        "description": "Claw (Tiger or Hybrid Form Only). Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage."
      },
      {
        "id": "act_3_scimitar__humanoid_or_hybrid_form_only_",
        "name": "Scimitar (Humanoid or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "slashing",
        "description": "Scimitar (Humanoid or Hybrid Form Only). Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "id": "act_4_longbow__humanoid_or_hybrid_form_only_",
        "name": "Longbow (Humanoid or Hybrid Form Only)",
        "type": "ranged_attack",
        "attackBonus": 4,
        "rangeFeet": 150,
        "rangeLongFeet": 600,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Longbow (Humanoid or Hybrid Form Only). Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_werewolf_legacy",
    "name": "Werewolf",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Humanoid",
    "subtype": "Human, Shapechanger",
    "alignment": "Shapechanger)",
    "armorClass": 11,
    "armorDesc": "in humanoid form, 12 (natural armor) in wolf or hybrid form",
    "hitPoints": {
      "average": 58,
      "formula": "9d8 + 18"
    },
    "speed": "30 ft., (40 ft. in wolf form)",
    "stats": {
      "str": 15,
      "dex": 13,
      "con": 14,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "skills": {
      "perception": 4,
      "stealth": 3
    },
    "damageImmunities": [
      "Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks that aren&#x27;t Silvered"
    ],
    "senses": "Passive Perception 14",
    "languages": "Common (can&#x27;t speak in wolf form)",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The werewolf can use its action to polymorph into a wolf-humanoid hybrid or into a wolf, or back into its true form, which is humanoid. Its statistics, other than its AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The werewolf has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack___humanoid_or_hybrid_form_only_",
        "name": "Multiattack. (Humanoid or Hybrid Form Only)",
        "type": "multiattack",
        "description": "Multiattack. (Humanoid or Hybrid Form Only). The werewolf makes two attacks: two with its spear (humanoid form) or one with its bite and one with its claws (hybrid form)."
      },
      {
        "id": "act_1_bite__wolf_or_hybrid_form_only_",
        "name": "Bite (Wolf or Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "piercing",
        "description": "Bite (Wolf or Hybrid Form Only). Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with werewolf lycanthropy."
      },
      {
        "id": "act_2_claws___hybrid_form_only_",
        "name": "Claws. (Hybrid Form Only)",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "slashing",
        "description": "Claws. (Hybrid Form Only). Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (2d4 + 2) slashing damage."
      },
      {
        "id": "act_3_spear__humanoid_form_only_",
        "name": "Spear (Humanoid Form Only)",
        "type": "ranged_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "rangeFeet": 20,
        "rangeLongFeet": 60,
        "damage": "1d6+2",
        "damageType": "piercing",
        "description": "Spear (Humanoid Form Only). Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack."
      }
    ]
  },
  {
    "id": "ddb_white_dragon_wyrmling_legacy",
    "name": "White Dragon Wyrmling",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 16,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4,
      "stealth": 2
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d10+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) cold damage."
      },
      {
        "id": "act_1_cold_breath__recharge_5_6__",
        "name": "Cold Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "5d8",
        "damageType": "cold",
        "description": "Cold Breath (Recharge 5–6) . The dragon exhales an icy blast of hail in a 15-foot cone. Each creature in that area must make a DC 12 Constitution saving throw, taking 22 (5d8) cold damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "wight_legacy",
    "name": "Wight",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 14,
    "armorDesc": "Studded Leather",
    "hitPoints": {
      "average": 45,
      "formula": "6d8+18"
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
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "damageResistances": [
      "Necrotic",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks That Aren't Silvered"
    ],
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "exhaustion",
      "poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "The languages it knew in life",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The wight makes two longsword attacks or two longbow attacks. It can use its Life Drain in place of one longsword attack."
      },
      {
        "id": "life_drain",
        "name": "Life Drain",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d6+2",
        "damageType": "Necrotic",
        "saveDc": 13,
        "saveStat": "con",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft. Hit: 5 (1d6 + 2) necrotic. Target must succeed on a DC 13 Constitution save or max HP is reduced by damage dealt."
      },
      {
        "id": "longsword",
        "name": "Longsword",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "1d8+2",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft. Hit: 6 (1d8 + 2) slashing."
      }
    ]
  },
  {
    "id": "ddb_will_o__x27__wisp_legacy",
    "name": "Will-o&#x27;-Wisp",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Tiny",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "armorClass": 19,
    "hitPoints": {
      "average": 22,
      "formula": "9d4"
    },
    "speed": "0 ft., Fly 50 ft. (hover)",
    "stats": {
      "str": 1,
      "dex": 28,
      "con": 10,
      "int": 13,
      "wis": 14,
      "cha": 11
    },
    "damageResistances": [
      "Acid",
      "Cold",
      "Fire",
      "Necrotic",
      "Thunder; Bludgeoning",
      "Piercing",
      "and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Lightning",
      "Poison"
    ],
    "conditionImmunities": [
      "Exhaustion",
      "Grappled",
      "Paralyzed",
      "Poisoned",
      "Prone",
      "Restrained",
      "Unconscious"
    ],
    "senses": "Darkvision 120 ft., Passive Perception 12",
    "languages": "The languages it knew in life",
    "challengeRating": "2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Consume Life",
        "description": "As a bonus action, the will-o'-wisp can target one creature it can see within 5 feet of it that has 0 hit points and is still alive. The target must succeed on a DC 10 Constitution saving throw against this magic or die. If the target dies, the will-o'-wisp regains 10 (3d6) hit points."
      },
      {
        "name": "Ephemeral",
        "description": "The will-o'-wisp can't wear or carry anything."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The will-o'-wisp can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Variable Illumination",
        "description": "The will-o'-wisp sheds bright light in a 5- to 20-foot radius and dim light for an additional number of feet equal to the chosen radius. The will-o'-wisp can alter the radius as a bonus action."
      }
    ],
    "actions": [
      {
        "id": "act_0_shock",
        "name": "Shock",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d8",
        "damageType": "lightning",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d8) lightning damage."
      },
      {
        "id": "act_1_invisibility",
        "name": "Invisibility",
        "type": "ability",
        "description": "The will-o'-wisp and its light magically become invisible until it attacks or uses its Consume Life, or until its concentration ends (as if concentrating on a spell)."
      }
    ]
  },
  {
    "id": "ddb_winter_wolf_legacy",
    "name": "Winter Wolf",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 5,
      "stealth": 3
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Passive Perception 15",
    "languages": "Common, Giant, Winter Wolf",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't incapacitated ."
      },
      {
        "name": "Snow Camouflage",
        "description": "The wolf has advantage on Dexterity ( Stealth ) checks made to hide in snowy terrain."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone ."
      },
      {
        "id": "act_1_cold_breath__recharge_5_6__",
        "name": "Cold Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "4d8",
        "damageType": "cold",
        "description": "Cold Breath (Recharge 5–6) . The wolf exhales a blast of freezing wind in a 15-foot cone. Each creature in that area must make a DC 12 Dexterity saving throw, taking 18 (4d8) cold damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_wolf_legacy",
    "name": "Wolf",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 11,
      "formula": "2d8 + 2"
    },
    "speed": "40 ft.",
    "stats": {
      "str": 12,
      "dex": 15,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "skills": {
      "perception": 3,
      "stealth": 4
    },
    "senses": "Passive Perception 13",
    "languages": "--",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf has advantage on attack rolls against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn’t incapacitated ."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 4,
        "reachFeet": 5,
        "damage": "2d4+2",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone ."
      }
    ]
  },
  {
    "id": "ddb_worg_legacy",
    "name": "Worg",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Goblin, Worg",
    "challengeRating": "1/2",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The worg has advantage on Wisdom ( Perception ) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "id": "act_0_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 5,
        "reachFeet": 5,
        "damage": "2d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone ."
      }
    ]
  },
  {
    "id": "wraith_legacy",
    "name": "Wraith",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 13,
    "hitPoints": {
      "average": 67,
      "formula": "9d8+27"
    },
    "speed": "0 ft., fly 60 ft. (hover)",
    "stats": {
      "str": 6,
      "dex": 16,
      "con": 16,
      "int": 12,
      "wis": 14,
      "cha": 15
    },
    "damageResistances": [
      "Acid",
      "Cold",
      "Fire",
      "Lightning",
      "Thunder",
      "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks"
    ],
    "damageImmunities": [
      "Necrotic",
      "Poison"
    ],
    "conditionImmunities": [
      "charmed",
      "exhaustion",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "The languages it knew in life",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The wraith can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the wraith has disadvantage on attack rolls and on Perception checks that rely on sight."
      }
    ],
    "actions": [
      {
        "id": "life_drain",
        "name": "Life Drain",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "4d8+3",
        "damageType": "Necrotic",
        "saveDc": 14,
        "saveStat": "con",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 21 (4d8 + 3) necrotic damage. The target must succeed on a DC 14 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken."
      },
      {
        "id": "create_specter",
        "name": "Create Specter",
        "type": "ability",
        "description": "The wraith targets a humanoid within 10 ft. that has been dead for no longer than 1 minute and died violently. The target's spirit rises as a specter under the wraith's control."
      }
    ]
  },
  {
    "id": "ddb_wyvern_legacy",
    "name": "Wyvern",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Unaligned",
    "armorClass": 13,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 110,
      "formula": "13d10 + 39"
    },
    "speed": "20 ft., Fly 80 ft.",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 16,
      "int": 5,
      "wis": 12,
      "cha": 6
    },
    "skills": {
      "perception": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "--",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The wyvern makes two attacks: one with its bite and one with its stinger. While flying, it can use its claws in place of one other attack."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage."
      },
      {
        "id": "act_2_claws",
        "name": "Claws",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d8+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      },
      {
        "id": "act_3_stinger",
        "name": "Stinger",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d6+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage. The target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_xorn_legacy",
    "name": "Xorn",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Neutral",
    "armorClass": 19,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 73,
      "formula": "7d8 + 42"
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
    "skills": {
      "perception": 6,
      "stealth": 3
    },
    "damageResistances": [
      "Piercing and Slashing from Nonmagical Attacks that aren&#x27;t Adamantine"
    ],
    "senses": "Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 16",
    "languages": "Terran",
    "challengeRating": "5",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Earth Glide",
        "description": "The xorn can burrow through nonmagical, unworked earth and stone. While doing so, the xorn doesn't disturb the material it moves through."
      },
      {
        "name": "Stone Camouflage",
        "description": "The xorn has advantage on Dexterity ( Stealth ) checks made to hide in rocky terrain."
      },
      {
        "name": "Treasure Sense",
        "description": "The xorn can pinpoint, by scent, the location of precious metals and stones, such as coins and gems, within 60 feet of it."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The xorn makes three claw attacks and one bite attack."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d6+3",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "id": "act_2_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "3d6+3",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (3d6 + 3) piercing damage."
      }
    ]
  },
  {
    "id": "ddb_yeti_legacy",
    "name": "Yeti",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "armorClass": 12,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 51,
      "formula": "6d10 + 18"
    },
    "speed": "40 ft., Climb 40 ft.",
    "stats": {
      "str": 18,
      "dex": 13,
      "con": 16,
      "int": 8,
      "wis": 12,
      "cha": 7
    },
    "skills": {
      "perception": 3,
      "stealth": 3
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "Yeti",
    "challengeRating": "3",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Fear of Fire",
        "description": "If the yeti takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn."
      },
      {
        "name": "Keen Smell",
        "description": "The yeti has advantage on Wisdom ( Perception ) checks that rely on smell."
      },
      {
        "name": "Snow Camouflage",
        "description": "The yeti has advantage on Dexterity ( Stealth ) checks made to hide in snowy terrain."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The yeti can use its Chilling Gaze and makes two claw attacks."
      },
      {
        "id": "act_1_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 6,
        "reachFeet": 5,
        "damage": "1d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) slashing damage plus 3 (1d6) cold damage."
      },
      {
        "id": "act_2_chilling_gaze",
        "name": "Chilling Gaze",
        "type": "ability",
        "damage": "3d6",
        "damageType": "cold",
        "description": "The yeti targets one creature it can see within 30 feet of it. If the target can see the yeti, the target must succeed on a DC 13 Constitution saving throw against this magic or take 10 (3d6) cold damage and then be paralyzed for 1 minute, unless it is immune to cold damage. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If the target’s saving throw is successful, or if the effect ends on it, the target is immune to the Chilling Gaze of all yetis (but not abominable yetis ) for 1 hour."
      }
    ]
  },
  {
    "id": "ddb_young_black_dragon_legacy",
    "name": "Young Black Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 6,
      "stealth": 5
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 16",
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
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 4 (1d8) acid damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "id": "act_3_acid_breath__recharge_5_6__",
        "name": "Acid Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "11d8",
        "damageType": "acid",
        "description": "Acid Breath (Recharge 5–6) . The dragon exhales acid in a 30­-foot line that is 5 feet wide. Each creature in that line must make a DC 14 Dexterity saving throw, taking 49 (11d8) acid damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "young_blue_dragon_legacy",
    "name": "Young Blue Dragon",
    "source": "Monster Manual (2014)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "armorDesc": "Natural Armor",
    "hitPoints": {
      "average": 152,
      "formula": "16d10+64"
    },
    "speed": "40 ft., burrow 20 ft., fly 80 ft.",
    "stats": {
      "str": 21,
      "dex": 10,
      "con": 19,
      "int": 14,
      "wis": 13,
      "cha": 17
    },
    "savingThrows": {
      "dex": 4,
      "con": 8,
      "wis": 5,
      "cha": 7
    },
    "skills": {
      "perception": 9,
      "stealth": 4
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 19",
    "languages": "Common, Draconic",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 10,
        "damage": "2d10+5",
        "damageType": "Piercing",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft. Hit: 16 (2d10 + 5) piercing damage plus 5 (1d10) lightning damage."
      },
      {
        "id": "claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 9,
        "reachFeet": 5,
        "damage": "2d6+5",
        "damageType": "Slashing",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft. Hit: 12 (2d6 + 5) slashing."
      },
      {
        "id": "lightning_breath",
        "name": "Lightning Breath (Recharge 5-6)",
        "type": "ability",
        "saveDc": 16,
        "saveStat": "dex",
        "damage": "10d10",
        "damageType": "Lightning",
        "description": "The dragon exhales lightning in a 60-foot line that is 5 feet wide. DC 16 Dex save, taking 55 (10d10) lightning damage on failure, half on success."
      }
    ]
  },
  {
    "id": "ddb_young_brass_dragon_legacy",
    "name": "Young Brass Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 6,
      "persuasion": 5,
      "stealth": 3
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 16",
    "languages": "Common, Draconic",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "id": "act_3_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_4_fire_breath",
        "name": "Fire Breath",
        "type": "ability",
        "damage": "12d6",
        "damageType": "fire",
        "description": "The dragon exhales fire in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 14 Dexterity saving throw, taking 42 (12d6) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_5_sleep_breath",
        "name": "Sleep Breath",
        "type": "ability",
        "description": "The dragon exhales sleep gas in a 30-foot cone. Each creature in that area must succeed on a DC 14 Constitution saving throw or fall unconscious for 5 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it."
      }
    ]
  },
  {
    "id": "ddb_young_bronze_dragon_legacy",
    "name": "Young Bronze Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "skills": {
      "insight": 4,
      "perception": 7,
      "stealth": 3
    },
    "damageImmunities": [
      "Lightning"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 17",
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
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 10,
        "damage": "2d10+5",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 8,
        "reachFeet": 5,
        "damage": "2d6+5",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage."
      },
      {
        "id": "act_3_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_4_lightning_breath",
        "name": "Lightning Breath",
        "type": "ability",
        "damage": "10d10",
        "damageType": "lightning",
        "description": "The dragon exhales lightning in a 60- foot line that is 5 feet wide. Each creature in that line must make a DC 15 Dexterity saving throw, taking 55 (10d10) lightning damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_5_repulsion_breath",
        "name": "Repulsion Breath",
        "type": "ability",
        "description": "The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 15 Strength saving throw. On a failed save, the creature is pushed 40 feet away from the dragon."
      }
    ]
  },
  {
    "id": "ddb_young_copper_dragon_legacy",
    "name": "Young Copper Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "armorClass": 17,
    "armorDesc": "natural armor",
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
    "skills": {
      "deception": 5,
      "perception": 7,
      "stealth": 4
    },
    "damageImmunities": [
      "Acid"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 17",
    "languages": "Common, Draconic",
    "challengeRating": "7",
    "proficiencyBonus": 3,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "id": "act_3_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_4_acid_breath",
        "name": "Acid Breath",
        "type": "ability",
        "damage": "9d8",
        "damageType": "acid",
        "description": "The dragon exhales acid in an 40-foot line that is 5 feet wide. Each creature in that line must make a DC 14 Dexterity saving throw, taking 40 (9d8) acid damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_5_slowing_breath",
        "name": "Slowing Breath",
        "type": "ability",
        "description": "The dragon exhales gas in a 30-foot cone. Each creature in that area must succeed on a DC 14 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save."
      }
    ]
  },
  {
    "id": "ddb_young_gold_dragon_legacy",
    "name": "Young Gold Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "skills": {
      "insight": 5,
      "perception": 9,
      "persuasion": 9,
      "stealth": 6
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 19",
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
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "id": "act_3_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_4_fire_breath",
        "name": "Fire Breath",
        "type": "ability",
        "damage": "10d10",
        "damageType": "fire",
        "description": "The dragon exhales fire in a 30-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw, taking 55 (10d10) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_5_weakening_breath",
        "name": "Weakening Breath",
        "type": "ability",
        "description": "The dragon exhales gas in a 30-foot cone. Each creature in that area must succeed on a DC 17 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ddb_young_green_dragon_legacy",
    "name": "Young Green Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 17",
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
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 7 (2d6) poison damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "id": "act_3_poison_breath__recharge_5_6__",
        "name": "Poison Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "12d6",
        "damageType": "poison",
        "description": "Poison Breath (Recharge 5–6) . The dragon exhales poisonous gas in a 30-foot cone. Each creature in that area must make a DC 14 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_young_red_dragon_legacy",
    "name": "Young Red Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "skills": {
      "perception": 8,
      "stealth": 4
    },
    "damageImmunities": [
      "Fire"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 18",
    "languages": "Common, Draconic",
    "challengeRating": "10",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 3 (1d6) fire damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "id": "act_3_fire_breath__recharge_5_6__",
        "name": "Fire Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "16d6",
        "damageType": "fire",
        "description": "Fire Breath (Recharge 5–6) . The dragon exhales fire in a 30-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw, taking 56 (16d6) fire damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_young_silver_dragon_legacy",
    "name": "Young Silver Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "armorClass": 18,
    "armorDesc": "natural armor",
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
    "skills": {
      "arcana": 6,
      "history": 6,
      "perception": 8,
      "stealth": 4
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 18",
    "languages": "Common, Draconic",
    "challengeRating": "9",
    "proficiencyBonus": 4,
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 10,
        "damage": "2d10+6",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 10,
        "reachFeet": 5,
        "damage": "2d6+6",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "id": "act_3_breath_weapons__recharge_5_6__",
        "name": "Breath Weapons (Recharge 5–6) ",
        "type": "ability",
        "description": "Breath Weapons (Recharge 5–6) . The dragon uses one of the following breath weapons."
      },
      {
        "id": "act_4_cold_breath",
        "name": "Cold Breath",
        "type": "ability",
        "damage": "12d8",
        "damageType": "cold",
        "description": "The dragon exhales an icy blast in a 30-foot cone. Each creature in that area must make a DC 17 Constitution saving throw, taking 54 (12d8) cold damage on a failed save, or half as much damage on a successful one."
      },
      {
        "id": "act_5_paralyzing_breath",
        "name": "Paralyzing Breath",
        "type": "ability",
        "description": "The dragon exhales paralyzing gas in a 30-foot cone. Each creature in that area must succeed on a DC 17 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ]
  },
  {
    "id": "ddb_young_white_dragon_legacy",
    "name": "Young White Dragon",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "armorClass": 17,
    "armorDesc": "natural armor",
    "hitPoints": {
      "average": 133,
      "formula": "14d10 + 56"
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
    "skills": {
      "perception": 6,
      "stealth": 3
    },
    "damageImmunities": [
      "Cold"
    ],
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 16",
    "languages": "Common, Draconic",
    "challengeRating": "6",
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra movement."
      }
    ],
    "actions": [
      {
        "id": "act_0_multiattack",
        "name": "Multiattack",
        "type": "multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "id": "act_1_bite",
        "name": "Bite",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 10,
        "damage": "2d10+4",
        "damageType": "piercing",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 4 (1d8) cold damage."
      },
      {
        "id": "act_2_claw",
        "name": "Claw",
        "type": "melee_attack",
        "attackBonus": 7,
        "reachFeet": 5,
        "damage": "2d6+4",
        "damageType": "slashing",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "id": "act_3_cold_breath__recharge_5_6__",
        "name": "Cold Breath (Recharge 5–6) ",
        "type": "ability",
        "damage": "10d8",
        "damageType": "cold",
        "description": "Cold Breath (Recharge 5–6) . The dragon exhales an icy blast in a 30-foot cone. Each creature in that area must make a DC 15 Constitution saving throw, taking 45 (10d8) cold damage on a failed save, or half as much damage on a successful one."
      }
    ]
  },
  {
    "id": "ddb_zombie_legacy",
    "name": "Zombie",
    "source": "Basic Rules (2014) (Legacy)",
    "edition": "2014",
    "isLegacy": true,
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "armorClass": 8,
    "hitPoints": {
      "average": 22,
      "formula": "3d8 + 9"
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
    "damageImmunities": [
      "Poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "understands the languages it knew in life but can&#x27;t speak",
    "challengeRating": "1/4",
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "id": "act_0_slam",
        "name": "Slam",
        "type": "melee_attack",
        "attackBonus": 3,
        "reachFeet": 5,
        "damage": "1d6+1",
        "damageType": "bludgeoning",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage."
      }
    ]
  }
];
