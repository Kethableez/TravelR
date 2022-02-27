import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import {
  ActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  Register,
  RegisterFailure,
  RegisterSuccess,
} from '../actions/auth.actions';
import { GetGroupData } from '../actions/group.actions';
import { GetUserData, RemoveUserData } from '../actions/user.actions';
import { AppState } from '../app.states';

@Injectable()
export class AuthEffects extends NotificationService {
  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private actions: Actions,
    private authService: AuthService
  ) {
    super();
  }

  login$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap((payload) => {
        return this.authService.login(payload).pipe(
          map((response) => {
            return new LoginSuccess({
              token: response.token,
              userId: response.id,
            });
          }),
          catchError((error) => {
            return of(new LoginFailure({ message: error.error.message }));
          })
        );
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ActionTypes.REGISTER),
      map((action: Register) => action.payload),
      switchMap((payload) => {
        return this.authService.register(payload).pipe(
          map((response) => {
            return new RegisterSuccess({
              message: response.message,
            });
          }),
          catchError((error) => {
            return of(new RegisterFailure({ message: error.error.message }));
          })
        );
      })
    );
  });

  logout$ = createEffect(() =>
    this.actions.pipe(
      ofType(ActionTypes.LOGOUT),
      map(() => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/start');
      }),
      switchMap(() => of(new RemoveUserData()))
    )
  );

  loginSuccess$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ActionTypes.LOGIN_SUCCESS),
      map((action: LoginSuccess) => action.payload),
      tap((payload) => {
        this.router.navigateByUrl('/home');
        localStorage.setItem('token', payload.token);
      }),
      mergeMap(payload => {
        const userId = payload.userId;

        return [
          new GetGroupData(userId),
          new GetUserData(userId)
        ]
      })
    );
  });

  registerSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(ActionTypes.REGISTER_SUCCESS),
        map((action: RegisterSuccess) => action.payload),
        tap((payload) => {
          console.log(payload);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => this.actions.pipe(ofType(ActionTypes.LOGIN_FAILURE)),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () => this.actions.pipe(ofType(ActionTypes.REGISTER_FAILURE)),
    { dispatch: false }
  );
}
