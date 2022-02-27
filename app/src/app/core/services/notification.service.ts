import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  showNotification: boolean;
  message: string | null;
  isError?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  showMessageSubscription = new Subject<Notification>();

  showNotification(
    showNotification: boolean,
    message: string | null,
    isError?: boolean

  ) {
    const notification: Notification = { showNotification, message, isError };
    this.showMessageSubscription.next(notification);
  }
}
