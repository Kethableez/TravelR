import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AbstractCleanable } from 'src/app/core/abstract-cleanable.directive';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/app.states';
import { AuthActions, selectUserId } from '../start/store/auth';
import { NavigationService } from './services/navigation.service';
import { UserActions } from './store/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AbstractCleanable implements OnInit {

  constructor(
    private store$: Store<AppState>,
    private navigation: NavigationService,
    ) { super() }

  ngOnInit(): void {

  }

  logout() {
    this.store$.dispatch(AuthActions.logout());
  }

  navigate(url: string) {
    this.navigation.navigateToUrl(url);
  }
}
