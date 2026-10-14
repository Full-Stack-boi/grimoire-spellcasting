import { describe, expect, it, vi } from "vitest";

vi.mock("@owlbear-rodeo/sdk", () => ({
  default: {},
}));

vi.mock("../../../components/Settings/settings", () => ({
  GLOBAL_STORAGE_KEYS: { DAMAGE_APPLICATION_MODE: "damage-application-mode" },
  getGlobalSettingsValue: vi.fn(),
}));

import { getHealResolutionStatus } from "../damageModeService";

describe("getHealResolutionStatus", () => {
  it("marks a successfully auto-applied heal as resolved", () => {
    expect(getHealResolutionStatus("auto", true)).toBe("applied");
  });

  it("keeps heals pending when the GM must approve them", () => {
    expect(getHealResolutionStatus("gm_approval", false)).toBe("pending");
  });

  it("keeps an unsuccessful auto-heal pending for manual resolution", () => {
    expect(getHealResolutionStatus("auto", false)).toBe("pending");
  });
});
