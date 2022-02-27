import { Action } from "@ngrx/store";

export enum ActionTypes {
  GET_GROUP_DATA = '[GROUP] Get Group Data',
  GET_GROUP_DATA_SUCCESS = '[GROUP] Get Group Data Success',
  GET_GROUP_DATA_FAILURE = '[GROUP] Get Group Data Failure',
  CREATE_GROUP = '[GROUP] Create Group',
  CREATE_GROUP_SUCCESS = '[GROUP] Create Group Success',
  CREATE_GROUP_FAILURE = '[GROUP] Create Group Failure',
  REMOVE_GROUP = '[GROUP] Remove Group',
  REMOVE_GROUP_SUCCESS = '[GROUP] Remove Group Success',
  REMOVE_GROUP_FAILURE = '[GROUP] Remove Group Failure',
  REMOVE_GROUP_DATA = '[GROUP] Remove Group Data'
}

export class GetGroupData implements Action {
  readonly type = ActionTypes.GET_GROUP_DATA;
  constructor(public payload: any) {}
}

export class CreateGroup implements Action {
  readonly type = ActionTypes.CREATE_GROUP;
  constructor(public payload: any) {}
}

export class RemoveGroup implements Action {
  readonly type = ActionTypes.REMOVE_GROUP;
  constructor(public payload: any) {}
}

export class GetGroupDataSuccess implements Action {
  readonly type = ActionTypes.GET_GROUP_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateGroupSuccess implements Action {
  readonly type = ActionTypes.CREATE_GROUP_SUCCESS;
  constructor(public payload: any) {}
}

export class RemoveGroupSuccess implements Action {
  readonly type = ActionTypes.REMOVE_GROUP_SUCCESS;
  constructor(public payload: any) {}
}

export class GetGroupDataFailure implements Action {
  readonly type = ActionTypes.GET_GROUP_DATA_FAILURE;
  constructor(public payload: any) {}
}

export class CreateGroupFailure implements Action {
  readonly type = ActionTypes.CREATE_GROUP_FAILURE;
  constructor(public payload: any) {}
}

export class RemoveGroupFailure implements Action {
  readonly type = ActionTypes.REMOVE_GROUP_FAILURE;
  constructor(public payload: any) {}
}

export class RemoveGroupData implements Action {
  readonly type = ActionTypes.REMOVE_GROUP_DATA;
}

export type Actions =
| GetGroupData
| CreateGroup
| RemoveGroup
| GetGroupDataSuccess
| CreateGroupSuccess
| RemoveGroupSuccess
| GetGroupDataFailure
| CreateGroupFailure
| RemoveGroupFailure
| RemoveGroupData
