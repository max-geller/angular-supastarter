import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Angular Material Components
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// Import Components
import { NotificationsDialog } from './components/notifications/notifications.dialog';

// Import Data

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    NotificationsDialog,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './notifications.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsPage implements OnInit {
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.matDialog.open(NotificationsDialog);
  }
}
