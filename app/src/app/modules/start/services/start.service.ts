import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/core/store/app.states';

@Injectable({
  providedIn: 'root',
})
export class StartService {

  constructor(private router: Router, private store$: Store<AppState>) {}

}
