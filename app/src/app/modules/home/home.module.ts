import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupDashboardComponent } from './components/group-dashboard/group-dashboard.component';
import { GroupCardComponent } from './components/group-card/group-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    GroupFormComponent,
    GroupDashboardComponent,
    GroupCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
