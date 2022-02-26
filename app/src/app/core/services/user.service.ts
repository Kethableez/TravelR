import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import User from '../models/user.model';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private settings: SettingService
    ) { }

  getUserData(userId: string): Observable<User> {
    const url = this.settings.getUserUrl('getUserById', { userId: userId });

    return this.http.get<User>(url).pipe(
      tap(user => {
        console.log(user);
      })
    )
  }
}