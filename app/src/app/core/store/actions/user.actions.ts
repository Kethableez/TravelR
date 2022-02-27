import { Action } from '@ngrx/store';

export enum ActionTypes {
  GET_USER_DATA = '[USER] Get User Data',
  GET_USER_DATA_SUCCESS = '[USER] Get User Data Success',
  GET_USER_DATA_FAILURE = '[USER] Get User Data Failure',
  REMOVE_USER_DATA = '[USER] Remove User Data'
}

export class GetUserData implements Action {
  readonly type = ActionTypes.GET_USER_DATA;
  constructor(public payload: any) {}
}

export class GetUserDataSuccess implements Action {
  readonly type = ActionTypes.GET_USER_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class GetUserDataFailure implements Action {
  readonly type = ActionTypes.GET_USER_DATA_FAILURE;
  constructor(public payload: any) {}
}

export class RemoveUserData implements Action {
  readonly type = ActionTypes.REMOVE_USER_DATA;
}

export type Actions =
| GetUserData
| GetUserDataSuccess
| GetUserDataFailure
| RemoveUserData
