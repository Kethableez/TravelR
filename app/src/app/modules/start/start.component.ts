import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/core/store/app.states';
import { AuthState } from 'src/app/core/store/reducers/auth.reducers';
import { selectIsUserAuthenticated } from 'src/app/core/store/selectors/auth.selectors';
import { StartService } from './services/start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    private store$: Store<AppState>,
    private startService: StartService
  ) {
    this.state = this.store$.select('authState');
    }

  state: Observable<AuthState>

  ngOnInit(): void {
    this.startService.isUserAuthenticated$.subscribe();
  }

}
