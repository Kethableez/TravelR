import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/core/store/app.states';
import { selectIsUserAuthenticated } from 'src/app/core/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class StartService {

  constructor(private router: Router, private store$: Store<AppState>) {}

  get isUserAuthenticated$(): Observable<boolean> {
    return this.store$.select(selectIsUserAuthenticated).pipe(
      tap((value) => {
        if (value) {
          this.router.navigateByUrl('home');
        }
      })
    );
  }
}
