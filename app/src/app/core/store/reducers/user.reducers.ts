import { Action } from "@ngrx/store";
import { Group } from "../../models/group.model";
import { User } from "../../models/user.model";
import * as UserActions from './../actions/user.actions'

export interface UserState {
  user: User | null,
  isError: boolean,
  message: string | null
}

export const initialState: UserState = {
  user: null,
  isError: false,
  message: null
}

export function UserReducer (state = initialState, action: Action): UserState {
  const userAction = action as UserActions.Actions;

  switch(userAction.type) {
    case UserActions.ActionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        isError: false,
        message: null,
        user: userAction.payload.user,
      }

      case UserActions.ActionTypes.GET_USER_DATA_FAILURE:
        return {
          ...state,
          isError: true,
          message: userAction.payload.message
        }

      case UserActions.ActionTypes.REMOVE_USER_DATA:
        return initialState;

      default:
        return state;
  }
}
