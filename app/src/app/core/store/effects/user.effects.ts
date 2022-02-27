import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select } from '@ngrx/store';
import { catchError, combineLatest, combineLatestWith, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import {
  ActionTypes,
  GetUserData,
  GetUserDataFailure,
  GetUserDataSuccess,
} from '../actions/user.actions';
import { selectUserId } from '../selectors/auth.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userService: UserService
    ) {}

  GetUserData$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ActionTypes.GET_USER_DATA),
      map((action: GetUserData) => action.payload),
      switchMap(payload => {
        return this.userService.getUserData(payload).pipe(
          map((user) => {
            return new GetUserDataSuccess({
              user: user,
            })
          }),
          catchError(error => {
            return of(new GetUserDataFailure({ message: error.error.message }));
          })
        )
      })
    )
  })

  GetUserDataSuccess$ = createEffect(
    () => this.actions.pipe(ofType(ActionTypes.GET_USER_DATA_SUCCESS), map((action: GetUserDataSuccess) =>
      action.payload
    ),
    tap(payload => {
      console.log(payload)
    })

      ),
    { dispatch: false }
  );

  GetUserDataFailure$ = createEffect(
    () => this.actions.pipe(ofType(ActionTypes.GET_USER_DATA_FAILURE)),
    { dispatch: false }
  );
}
