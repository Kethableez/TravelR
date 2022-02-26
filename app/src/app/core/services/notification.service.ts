import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  showNotification: boolean;
  message?: string;
  isError?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showMessageSubscription = new Subject<Notification>();

  dispatchNotification(showNotification: boolean, message?: string, isError?: boolean) {
      const notification: Notification = { showNotification, message, isError };
      this.showMessageSubscription.next(notification);
  }
}
