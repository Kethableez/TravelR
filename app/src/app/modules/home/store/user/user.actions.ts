import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";

export const fetchData = createAction(
  '[User] Fetch data'
)

export const fetchDataSuccess = createAction(
  '[User] Fetch data success',
  props<{ user: User }>()
)

export const editUser = createAction(
  '[User] Edit user',
  props<{ data: any }>()
)

export const editUserSuccess = createAction(
  '[User] Edit user success',
  props<{ changedUser: any}>()
)

export const clearData = createAction(
  '[User] Clear data'
)

export const userError = createAction(
  '[User] Error',
  props<{ message: string }>()
)

