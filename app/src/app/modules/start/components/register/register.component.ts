import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Register } from 'src/app/core/store/actions/auth.actions';
import { AppState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private store$: Store<AppState>
  ) { }


  registerForm = this.builder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
    avatarRef: ['user/avatar.jpg', Validators.required]
  })

  ngOnInit(): void {
  }

  uploadForm() {
    const payload = this.registerForm.value;

    this.store$.dispatch( new Register( payload ))
  }

}
