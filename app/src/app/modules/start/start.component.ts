import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/core/store/app.states';
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
    }

  ngOnInit(): void {
  }

}
