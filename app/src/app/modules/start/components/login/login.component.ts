import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/core/store/actions/auth.actions';
import { AppState } from 'src/app/core/store/app.states';

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

    this.store$.dispatch(new Login(payload));
  }

}
