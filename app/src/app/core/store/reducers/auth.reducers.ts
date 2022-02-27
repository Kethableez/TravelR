import { Action } from "@ngrx/store";
import * as AuthActions from './../actions/auth.actions'

export interface AuthState {
  isAuthenticated: boolean;
  isError: boolean;
  token: string | null,
  userId: string | null,
  message: string | null,
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isError: false,
  token: null,
  userId: null,
  message: null,
}

export function AuthReducer (state = initialState, action: Action): AuthState {
  const authAction = action as AuthActions.Actions;

  switch (authAction.type) {
    case AuthActions.ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isError: false,
        token: authAction.payload.token,
        userId: authAction.payload.userId,
        message: null,
      };

    case AuthActions.ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isError: false,
        message: authAction.payload.message
      }

    case AuthActions.ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isError: true,
        message: authAction.payload.message
      };

    case AuthActions.ActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isError: true,
        message: authAction.payload.message
      }

    case AuthActions.ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
