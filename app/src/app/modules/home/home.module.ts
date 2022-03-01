import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupDashboardComponent } from './components/group-dashboard/group-dashboard.component';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { UserStateModule } from './store/user';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { GroupComponent } from './pages/group/group.component';
import { AttractionComponent } from './pages/attraction/attraction.component';
import { NavbarButtonComponent } from './components/navbar-button/navbar-button.component';


@NgModule({
  declarations: [
    HomeComponent,
    GroupFormComponent,
    GroupDashboardComponent,
    GroupCardComponent,
    ProfileComponent,
    NavbarComponent,
    DashboardComponent,
    JourneyComponent,
    GroupComponent,
    AttractionComponent,
    NavbarButtonComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    UserStateModule
  ]
})
export class HomeModule { }
