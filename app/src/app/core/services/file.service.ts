import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileSelector } from '../models/enums/file-selector.model';
import { UploadResponse } from '../models/responses/upload-response.model';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient,
    private settings: SettingService
    ) { }

  uploadFile(file: FormData, selector: FileSelector): Observable<UploadResponse> {
    const url = this.settings.getFileUrl('upload', { selector: selector });

    return this.http.post<UploadResponse>(url, file);
  }

  removeFile(selector: FileSelector, filename: string): Observable<any> {
    const url = this.settings.getFileUrl('remove', {selector: selector, filename: filename});

    return this.http.get<any>(url);
  }
}
