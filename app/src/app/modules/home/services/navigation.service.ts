import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getCurrentPath() {
    console.log(this.route.snapshot);
  }

  navigateToUrl(url: string) {
    return this.router.navigateByUrl(url);
  }
}
