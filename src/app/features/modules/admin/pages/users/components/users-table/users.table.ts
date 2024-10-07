import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Import Angular Material Components
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
// Import Services
import { ToastService } from '../../../../../../../core/services/toast.service';
import { AdminService } from '../../../../../../../core/services/admin.service';
import { ConfirmDeleteService } from '../../../../../../../core/services/confirm-delete.service';

// Import Models
import { UserInterface } from '../../../../../../../core/models/user.model';

// Import Components
import { EditUserDialog } from '../edit-user/edit-user.dialog';

// Import Third Party Modules
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'admin-users-table',
  standalone: true,
  styleUrls: ['./user.table.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    RouterModule,
    AvatarModule,
    HttpClientModule,
  ],
  templateUrl: './users.table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'edit',
    'avatar',
    'first_name',
    'last_name',
    'email',
    'tenant_name',
    'role_name',
    'title',
    'last_login',
    'created_at',
    'is_active',
    'is_registered',
    'id',
  ];
  dataSource = new MatTableDataSource<UserInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private confirmDeleteService: ConfirmDeleteService,
    private toastService: ToastService
  ) {}

  ngAfterViewInit() {
    this.loadUsers();
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
      this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Users received:', users);
        this.dataSource.data = users.map(user => ({
          ...user,
          tenant_name: user.tenant_name || 'N/A'
        }));
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
