import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.states';
import { AuthActions } from '../../store/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private store$: Store<AppState>,
  ) { }


  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  login() {
    const payload = this.loginForm.value;

    this.store$.dispatch(AuthActions.login({ loginPayload: payload }));
  }

}
