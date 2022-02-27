import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { SettingService } from './setting.service';
import { TokenStorageService } from './token-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private settings: SettingService,
    private notificationService: NotificationService
  ) { }

  get token() {
    return localStorage.getItem('token');
  }

  login(loignForm: any): Observable<any> {
    const url = this.settings.getUserUrl('login');

    return this.http.post<any>(url, loignForm);
  }

  register(registerForm: any): Observable<any> {
    const url = this.settings.getUserUrl('register');

    return this.http.post<any>(url, registerForm);
  }

}
