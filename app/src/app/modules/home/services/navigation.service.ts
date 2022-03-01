import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { SettingService } from 'src/app/core/services/setting.service';
import { AppState } from 'src/app/core/store/app.states';
import { logout } from '../../start/store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<AppState>,
    private settings: SettingService
  ) { }

  getCurrentPath() {
    console.log(this.route.snapshot);
  }

  navigateToUrl(url: string) {
    return this.router.navigate([`/home/${url}`]);
  }

  doLogout() {
    this.store$.dispatch(logout());
  }

  navigationData() {
    return this.settings.getNavigationData();
  }

  checkRouterUrl() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => this.getSegments(event.url))
    )
  }

  getSegments(url: string): string[] {
    const segments = url.split('/').filter(s => s !== '');
    console.log(segments)
    return segments;
  }
}
