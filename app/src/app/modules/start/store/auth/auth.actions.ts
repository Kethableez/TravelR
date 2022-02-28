import { createAction, props } from "@ngrx/store";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  avatarRef: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

export const login = createAction(
  '[AUTH] Login',
  props<{ loginPayload: LoginPayload }>()
)

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ loggedIn: boolean, userId: string, token: string }>()
)

export const register = createAction(
  '[AUTH] Register',
  props<{ registerPayload: RegisterPayload }>()
)

export const registerSuccess = createAction(
  '[Auth] Register success'
)

export const logout = createAction(
  '[AUTH] Logout'
)

export const authError = createAction(
  '[Auth] Error',
  props<{ message: string }>()
)
