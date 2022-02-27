import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";
import { AuthState } from "../reducers/auth.reducers";

export const selectAuth = (state: AppState) => state.authState;

export const authState = createSelector(
  selectAuth,
  (state: AuthState) => state
)

export const selectUserId = createSelector(
  selectAuth,
  (state: AuthState) => state.userId
)

export const selectIsUserAuthenticated = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthenticated
)

export const selectMessage = createSelector(
  selectAuth,
  (state: AuthState) => state.message
)

export const selectIsError = createSelector(
  selectAuth,
  (state: AuthState) => state.isError
)
