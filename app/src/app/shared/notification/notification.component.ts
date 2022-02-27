import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from 'src/app/core/services/notification.service';

enum NotificationState {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE'
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notification: NotificationService) {}

  state = NotificationState.CLOSE;
  message: string | null = null;
  isError?: boolean = false;
  showNotification: boolean = false;

  ngOnInit(): void {
    this.notification.showMessageSubscription.subscribe(
      (showMessage: Notification) => {
        console.log('xad');
        this.showNotification = showMessage.showNotification;
        this.message = showMessage.message;
        this.isError = showMessage.isError;
      }
    );
  }

  open() {
    this.state = NotificationState.OPEN;
  }

  close() {
    this.showNotification = false;
  }
}
