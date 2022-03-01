import { Component, Input, OnInit } from '@angular/core';
import { includes } from 'lodash-es';
import { AbstractCleanable } from 'src/app/core/abstract-cleanable.directive';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.scss'],
})
export class NavbarButtonComponent extends AbstractCleanable implements OnInit {
  @Input()
  buttonKey: string = '';

  @Input()
  navigationUrl: string = '';

  @Input()
  isLogout: boolean = false;

  style = 'button';

  constructor(private navigation: NavigationService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.navigation.checkRouterUrl().subscribe((segments: string[]) => {
        if (includes(segments, this.navigationUrl)) {
          this.style = 'button active';
        } else {
          this.style = 'button';
        }
      })
    );
  }

  clickEvent() {
    if (this.isLogout) {
      this.navigation.doLogout();
    } else {
      this.navigation.navigateToUrl(this.navigationUrl);
    }
  }
}
