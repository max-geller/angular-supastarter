import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  type OnInit,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { UsersTableComponent } from './components/users-table/users.table';
import { AddUserDialogDialog } from './components/add-user/add-user.dialog';

@Component({
  standalone: true,
  imports: [
    UsersTableComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './users.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage implements OnInit {
  @ViewChild(UsersTableComponent) usersTable!: UsersTableComponent;

  private dialog = inject(MatDialog);

  ngOnInit(): void {}

  addUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshUsers();
      }
    });
  }

  private refreshUsers() {
    if (this.usersTable) {
      this.usersTable.refreshUsers();
    }
  }
}
