import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ChangeDetectorRef,
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MatTableModule, MatTableDataSource } from '@angular/material/table';
  import { MatPaginatorModule } from '@angular/material/paginator';
  import { MatSortModule } from '@angular/material/sort';
  import { MatIconModule } from '@angular/material/icon';
  import { MatDialog } from '@angular/material/dialog';
  
  // Import Services
  import { ToastService } from '../../../../../../../core/services/toast.service';
  import { AdminService } from '../../../../../../../core/services/admin.service';
  
  // Import Models
  import { UserInterface } from '../../../../../../../core/models/user.model';

  // Import Components
  import { EditUserDialog } from '../edit-user/edit-user.dialog';
  import { ConfirmDeleteService } from '../../../../../../../core/services/confirm-delete.service';

  @Component({
    selector: 'admin-users-table',
    standalone: true,
    imports: [
      CommonModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatIconModule,
    ],
    templateUrl: './users.table.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class UsersTableComponent implements OnInit {
    displayedColumns: string[] = [
      'id',
      'email',
      'first_name',
      'last_name',
      'created_at',
      'is_active',
      'edit',
      'delete',
    ];
    dataSource = new MatTableDataSource<UserInterface>([]);
  
    constructor(
      private adminService: AdminService,
      private cdr: ChangeDetectorRef,
      private dialog: MatDialog,
      private confirmDeleteService: ConfirmDeleteService,
      private toastService: ToastService
    ) {}
  
    ngOnInit() {
      this.loadUsers();
    }
  
    loadUsers() {
      this.adminService.getAllUsers().subscribe({
        next: (users) => {
          console.log('Users received:', users);
          this.dataSource.data = users;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
    }
  
    refreshUsers() {
      this.loadUsers();
    }
  
    editUser(user: UserInterface) {
      const dialogRef = this.dialog.open(EditUserDialog, {
        width: '400px',
        data: user,
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.refreshUsers();
        }
      });
    }
  
    deleteUser(user: UserInterface) {
      this.confirmDeleteService
        .openAdvancedConfirmDialog(`${user.first_name} ${user.last_name}`, 'user')
        .subscribe((confirmed) => {
          if (confirmed) {
            this.adminService.deleteUser(user.id).subscribe({
              next: () => {
                this.toastService.showToast('User deleted successfully');
                this.refreshUsers();
              },
              error: (error) => {
                console.error('Error deleting user:', error);
                this.toastService.showToast(
                  'Error deleting user. Please try again.'
                );
              },
            });
          }
        });
    }
  }