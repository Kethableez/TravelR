import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appAbstractCleanable]'
})
export class AbstractCleanable implements OnDestroy {

  constructor() { }

  subscriptions: Subscription[] = []

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s.unsubscribe());
  }

  addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

}
