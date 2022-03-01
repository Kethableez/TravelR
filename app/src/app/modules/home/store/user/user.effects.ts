import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isNull } from 'lodash-es';
import {
  catchError,
  filter,
  map,
  of,
  switchMap,
  withLatestFrom
} from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { AppState } from 'src/app/core/store/app.states';
import { selectUserId } from 'src/app/modules/start/store/auth';
import { editUser, editUserSuccess, fetchData, fetchDataSuccess, userError } from './user.actions';
import { selectUser } from './user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private userService: UserService
  ) {}

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchData),
      withLatestFrom(this.store$.select(selectUserId)),
      filter(([, userId]) => !isNull(userId)),
      switchMap(([, userId]) => {
        return this.userService.getUserData(userId as string).pipe(
          map((response) => fetchDataSuccess({ user: response })),
          catchError((error) => of(userError({ message: error.error.message })))
        );
      })
    )
  );

  editUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(editUser),
        withLatestFrom(this.store$.select(selectUser)),
        filter(([, user]) => !isNull(user._id)),
        switchMap(([action, user]) => {
          const changedUser: User = {
            ...user,
            ...action.data
          }

          return this.userService.editUserData(user._id, action.data).pipe(
            map(() => editUserSuccess({ changedUser: changedUser })),
            catchError((error) => of(userError({ message: error.error.message })))
          );
        })
      )
  )
}
