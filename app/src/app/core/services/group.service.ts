import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Group } from '../models/group.model';
import { GroupResponse, IGroup } from '../models/responses/group-response.model';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
    private settings: SettingService
    ) { }

  getUserGroups(userId: string): Observable<Group[]> {
    const url = this.settings.getGroupUrl('getUserGroups', { userId: userId });
    return this.http.get<IGroup[]>(url).pipe(
      tap(groups => console.log(groups)),
      map(groups => groups.map(g => new Group(g)))
    )
  }

  createGroup(groupForm: any): Observable<Group> {
    const url = this.settings.getGroupUrl('createGroup');
    console.log(url);
    return this.http.post<GroupResponse>(url, groupForm).pipe(
      map(response => new Group(response.object))
    )
  }

  deleteGroup(groupId: string): Observable<any> {
    const url = this.settings.getGroupUrl('deleteGroup', { groupId: groupId });

    return this.http.post<any>(url, {}).pipe(
      map(() => groupId)
    );
  }
}
