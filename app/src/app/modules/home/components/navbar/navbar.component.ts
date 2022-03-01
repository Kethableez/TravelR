import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/core/services/setting.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private navigation: NavigationService
  ) {}

  navigationData = this.navigation.navigationData();

  ngOnInit(): void {}

  navigate(url: string) {
    this.navigation.navigateToUrl(url);
  }

  logout() {
    this.navigation.doLogout();
  }
}
