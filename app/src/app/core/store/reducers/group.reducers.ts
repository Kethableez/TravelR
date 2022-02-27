import { Action } from "@ngrx/store";
import { concat } from "lodash-es";
import { Group } from "../../models/group.model";
import * as GroupAction from './../actions/group.actions'


export interface GroupState {
  userGroups: Group[],
  isError: boolean,
  message: string | null
}

export const initialState: GroupState = {
  userGroups: [],
  isError: false,
  message: null
}

export function GroupReducer (state = initialState, action: Action): GroupState {
  const groupAction = action as GroupAction.Actions;

  switch(groupAction.type) {
    case GroupAction.ActionTypes.GET_GROUP_DATA_SUCCESS:
      return {
        ...state,
        isError: false,
        message: null,
        userGroups: groupAction.payload.userGroups
      }

    case GroupAction.ActionTypes.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        isError: false,
        message: null,
        userGroups: concat(state.userGroups, groupAction.payload.newGroup)
      }

    case GroupAction.ActionTypes.REMOVE_GROUP_SUCCESS:
      return {
        ...state,
        isError: false,
        message: groupAction.payload.message,
        userGroups: state.userGroups.filter(g => g.id !== groupAction.payload.groupId)
      }

    case GroupAction.ActionTypes.CREATE_GROUP_FAILURE:
    case GroupAction.ActionTypes.REMOVE_GROUP_FAILURE:
    case GroupAction.ActionTypes.GET_GROUP_DATA_FAILURE:
      return {
        ...state,
        isError: true,
        message: groupAction.payload.message
      }

    case GroupAction.ActionTypes.REMOVE_GROUP_DATA:
      return initialState;

    default:
      return state;

  }
}
