# ⚔ Grimoire: Spellcasting & Tactical Combat HUD

An authentic, dark fantasy tactical combat extension for **Owlbear Rodeo**, combining a Baldur's Gate 3 style Action Dock HUD, D&D Beyond character sheet synchronization, 3D tactical targeting, animated spellcasting, and full combat tracking.

---

## Key Capabilities

### 1. Baldur's Gate 3 Action Dock HUD
* **Vitals & Resources**: Real-time HP tracking (Current, Max, Temp), Death Saves, Spell Slots, Pact Magic, and dynamic class resources (Ki/Focus, Sorcery Points, Rage, Bardic Inspiration).
* **Action Dock**: Interactive bottom-docked HUD presenting prepared spells, weapon attacks, bonus actions, reactions, and class features.
* **Flyout Bar**: Multi-step spellcasting and weapon management supporting upcasting, Hex curse targeting, and resource deduction.
* **Character Checks**: One-click ability checks and skill checks with live modifiers and proficiency bonuses.

### 2. D&D Beyond Character Synchronization
* **Live Sync**: Seamlessly import characters from D&D Beyond via character ID or URL.
* **Automatic Feature Discovery**: Dynamically scans 5e & 2024 class features and subclasses without hardcoded rules.
* **Roll Log Stream**: Broadcasts attacks, damage, and spell casts to a synchronized game roll log across all players in the room.

### 3. 3D Tactical Targeting & Darkness Vision
* **Line of Sight & Darkness Vision**: Dynamic raycasting for scene obstacles, magical Darkness, and authentic D&D 2024 vision rules (Shadow Monk sight, Devil's Sight, Truesight).
* **3D Elevation & Flight**: Full 3D distance and line of sight calculation against aerial tokens and spherical spell zones.
* **Aiming Overlays**: Live distance tethers, AoE grid cell highlights, and caster indicator rings.

### 4. Pure Data-Driven Architecture (Single Source of Truth)
* **570+ Verified Formulas**: Catalogs cantrips, leveled spells, class mechanics, and feats across all 8 schools of magic.
* **Zero UI Hardcoding**: UI components never contain hardcoded class names, dice formulas, or subclass rules. Everything is schema-driven.

---

## Development

```powershell
# Install dependencies
npm install

# Run Vitest test suites
npm test

# Build for production
npm run build
```

---

## License
MIT
