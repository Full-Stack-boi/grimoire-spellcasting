import type { MonsterStatblock } from "../domain/types";
import { MONSTERS_2024 } from "./monsters2024";
import { MONSTERS_LEGACY } from "./monstersLegacy";

export { MONSTERS_2024, MONSTERS_LEGACY };

export const SRD_MONSTERS: MonsterStatblock[] = [
  ...MONSTERS_2024,
  ...MONSTERS_LEGACY,
];
