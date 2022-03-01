import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap, filter, map, of,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/store/app.states';
import {
  clearData,
  fetchData
} from 'src/app/modules/home/store/user/user.actions';
import { selectIsLoggedIn } from '.';
import {
  authError,
  login,
  loginSuccess,
  logout,
  register,
  registerSuccess
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) => {
        console.log(action.loginPayload);
        return this.authService.login(action.loginPayload).pipe(
          map((response) =>
            loginSuccess({
              loggedIn: true,
              userId: response.id,
              token: response.token,
            })
          ),
          catchError((error) => of(authError({ message: error.error.message })))
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.authService.register(action.registerPayload).pipe(
          map(() => registerSuccess()),
          catchError((error) => of(authError({ message: error.error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap((action) => {
        localStorage.setItem('token', action.token);
        this.router.navigateByUrl('/home/dashboard');
      }),
      withLatestFrom(this.store$.select(selectIsLoggedIn)),
      // concatMap(action =>
      //   of(action).pipe(
      //     withLatestFrom(this.store$.select(selectIsLoggedIn))
      //   )
      // ),
      filter(([, isLoggedIn]) => isLoggedIn === true),
      map(() => fetchData())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => this.router.navigateByUrl('/start')),
      switchMap(() => of(clearData()))
    )
  );
}
