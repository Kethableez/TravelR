import { Action, createReducer, on } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";
import { clearData, editUserSuccess, fetchData, fetchDataSuccess, userError } from "./user.actions";

export interface State {
  user: User | null,
  errorMessage: string
}

export const initialState: State = {
  user: null,
  errorMessage: ''
}

export const userReducer = createReducer(
  initialState,
  on(fetchData, (state) => ({
    ...state,
    user: null,
    errorMessage: '',
  })),
  on(fetchDataSuccess, (state, action) => ({
    ...state,
    user: action.user,
    errorMessage: '',
  })),
  on(editUserSuccess, (state, action) => ({
    ...state,
    user: action.changedUser,
    errorMessage: '',
  })),
  on(clearData, () => ({
    ...initialState
  })),
  on(userError, (state, action) => ({
    ...state,
    errorMessage: action.message
  }))
)

export const userFeatureKey = 'user';

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
