export type DarknessVisibilityState = {
  hiddenTokenIds: Set<string>;
  ready: boolean;
};

export type DarknessVisibilityAction =
  | { type: "refresh-started" }
  | { type: "refresh-completed"; hiddenTokenIds: Set<string> };

export function darknessVisibilityReducer(
  state: DarknessVisibilityState,
  action: DarknessVisibilityAction
): DarknessVisibilityState {
  if (action.type === "refresh-started") {
    return state;
  }

  return { hiddenTokenIds: action.hiddenTokenIds, ready: true };
}
