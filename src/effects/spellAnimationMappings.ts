export const SPELL_ANIMATION_MAPPINGS: Record<string, string> = {
  healing_word: "cure_wounds",
  mass_healing_word: "cure_wounds",
  sorcerous_burst: "fire_bolt",
};

export function normalizeSpellAnimationId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}
