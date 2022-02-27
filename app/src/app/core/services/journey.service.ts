import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(
    private http: HttpClient,
    private settings: SettingService
    ) { }
}
