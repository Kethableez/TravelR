import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private authService: AuthService
  ) { }


  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  login() {
    this.authService.loginUser(this.loginForm.value).subscribe(val => {
      console.log(val);
    });
  }

}
