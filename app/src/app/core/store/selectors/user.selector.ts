import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";
import { UserState } from "../reducers/user.reducers";

export const selectUser = (state: AppState) => state.userState;

export const selectUserData = createSelector(
  selectUser,
  (state: UserState) => state.user
)
