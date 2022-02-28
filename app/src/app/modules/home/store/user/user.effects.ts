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
import { UserService } from 'src/app/core/services/user.service';
import { AppState } from 'src/app/core/store/app.states';
import { selectUserId } from 'src/app/modules/start/store/auth';
import { editUser, fetchData, fetchDataSuccess, userError } from './user.actions';

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
        withLatestFrom(this.store$.select(selectUserId)),
        filter(([, userId]) => !isNull(userId)),
        switchMap(([action, userId]) => {
          return this.userService.editUserData(userId as string, action.data).pipe(
            map((response) => fetchDataSuccess({ user: response })),
            catchError((error) => of(userError({ message: error.error.message })))
          );
        })
      )
  )
}
