import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HomeComponent } from './home.component';
import { AttractionComponent } from './pages/attraction/attraction.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GroupComponent } from './pages/group/group.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'group', component: GroupComponent },
      { path: 'journey', component: JourneyComponent },
      { path: 'attraction', component: AttractionComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: 'dashboard'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
