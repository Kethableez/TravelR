import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";
import { GroupState } from "../reducers/group.reducers";

export const selectGroup = (state: AppState) => state.groupState;

export const userGroups = createSelector(
  selectGroup,
  (state: GroupState) => state.userGroups
)
