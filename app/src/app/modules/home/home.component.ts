import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupService } from 'src/app/core/services/group.service';
import { Logout } from 'src/app/core/store/actions/auth.actions';
import { AppState } from 'src/app/core/store/app.states';
import { AuthState } from 'src/app/core/store/reducers/auth.reducers';
import { GroupState } from 'src/app/core/store/reducers/group.reducers';
import { UserState } from 'src/app/core/store/reducers/user.reducers';
import { userGroups } from 'src/app/core/store/selectors/group.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private store$: Store<AppState>,
    private groupService: GroupService
  ) {
    this.authState = this.store$.select('authState');
    this.userState = this.store$.select('userState');
    this.groupState = this.store$.select('groupState');
  }

  authState: Observable<AuthState>;
  userState: Observable<UserState>;
  groupState: Observable<GroupState>;

  userGroups$ = this.store$.select(userGroups);

  ngOnInit(): void {}

  logout() {
    this.store$.dispatch(new Logout());
  }

  saveUser() {}
}
