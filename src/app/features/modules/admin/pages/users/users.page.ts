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
import { InviteUserDialogDialog } from './components/add-user/invite-user.dialog';

// Import Services
import { AdminService } from '../../../../../core/services/admin.service';

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
  constructor(private adminService: AdminService) {}

  private dialog = inject(MatDialog);

  ngOnInit(): void {}

  addUserDialog() {
    const dialogRef = this.dialog.open(InviteUserDialogDialog, {
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
