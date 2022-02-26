import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginResponse } from 'src/app/core/models/responses/login-response.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private settings: SettingService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService
    ) { }

  registerUser(registerForm: any): Observable<any> {
    const url = this.settings.getUserUrl('register');

    return this.http.post<any>(url, registerForm).pipe(
      tap(response => {
        this.notificationService.dispatchNotification(true, response.message, false);
      }),
      catchError(err => {
        this.notificationService.dispatchNotification(true, err.error.message, true);

        return of({
          token: '',
          message: err.error.message,
          error: err.error
        })
      })
    )
  }

  loginUser(loginForm: any): Observable<LoginResponse> {
    const url = this.settings.getUserUrl('login');
    return this.http.post<LoginResponse>(url, loginForm).pipe(
      tap(response => {
        const { token, id } = response;
        this.tokenStorage.saveToken(token);
        this.userService.getUserData(id as string).subscribe();
        this.router.navigate(['/home']);
      }),
      catchError(err => {
        this.notificationService.dispatchNotification(true, err.error.message, true);
        return of({
          token: '',
          message: err.error.message,
          error: err.error
        })
      })
    )
  }

  checkAvailability(selector: string, value: string) {
    const url = this.settings.getUserUrl('check', { selector: selector, value: value });
    console.log(url);
  }

}
