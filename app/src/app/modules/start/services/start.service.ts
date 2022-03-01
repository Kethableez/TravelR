import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/core/store/app.states';
import { selectIsLoggedIn } from '../store/auth';

@Injectable({
  providedIn: 'root',
})
export class StartService {

  constructor(
    private router: Router,
    private store$: Store<AppState>) {}


  check() {
    return this.store$.select(selectIsLoggedIn).pipe(
      tap((isLoggedIn) => {
        if(isLoggedIn) {
          this.router.navigateByUrl('/home/dashboard');
        }
      })
    )
  }
}
