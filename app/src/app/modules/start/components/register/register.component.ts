import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, flatMap, map, mergeMap, of } from 'rxjs';
import { FileSelector } from 'src/app/core/models/enums/file-selector.model';
import { UploadResponse } from 'src/app/core/models/responses/upload-response.model';
import { FileService } from 'src/app/core/services/file.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private authService: AuthService
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
    this.authService.registerUser(this.registerForm.value).subscribe();
  }

}
