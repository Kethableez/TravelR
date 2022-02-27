import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core/models/group.model';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.scss']
})
export class GroupDashboardComponent implements OnInit {

  @Input()
  userGroups?: Observable<Group[]>

  constructor() { }

  ngOnInit(): void {
  }

}
