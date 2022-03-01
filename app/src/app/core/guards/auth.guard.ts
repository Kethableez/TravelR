import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectIsLoggedIn, State } from 'src/app/modules/start/store/auth';
import { AppState } from '../store/app.states';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store$: Store<AppState>,
    private router: Router
    ) {}

  canActivate(): Observable<boolean> {
    return this.store$.select(selectIsLoggedIn).pipe(
      map(isLoggedIn => {
        if(!isLoggedIn) {
          this.router.navigateByUrl('start');
        }
        return isLoggedIn;
      })
    )
  }

}
