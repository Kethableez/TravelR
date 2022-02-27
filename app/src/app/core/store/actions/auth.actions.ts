import { Action } from '@ngrx/store';

export enum ActionTypes {
  LOGIN = '[Auth] Login',
  REGISTER = '[Auth] Register',
  LOGOUT = '[Auth] Logout',
  LOGIN_SUCCESS = '[Auth] Login Success',
  REGISTER_SUCCESS = '[Auth] Register Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  REGISTER_FAILURE = '[Auth] Register Failure',
}

export class Login implements Action {
  readonly type = ActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class Register implements Action {
  readonly type = ActionTypes.REGISTER;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
  readonly type = ActionTypes.REGISTER_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class RegisterFailure implements Action {
  readonly type = ActionTypes.REGISTER_FAILURE;
  constructor(public payload: any) {}
}

export type Actions =
| Login
| Register
| Logout
| LoginSuccess
| RegisterSuccess
| LoginFailure
| RegisterFailure
