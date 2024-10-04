import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Angular Material Components
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Import Services
import { ConfirmDeleteService } from '../../../../../../../core/services/confirm-delete.service';
import { ToastService } from '../../../../../../../core/services/toast.service';
import { RoleService } from '../../../../../../../core/services/role.service';

// Import Models
import { RoleInterface } from '../../../../../../../core/models/role.model';


@Component({
  selector: 'admin-roles-table',
  standalone: true,
  styleUrls: ['./roles-table.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './roles-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'edit',
    'name',
    'description',
    'created_at',
    'updated_at',
    'created_by',
    'updated_by',
    'is_active',
  ];
  dataSource = new MatTableDataSource<RoleInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private confirmDeleteService: ConfirmDeleteService,
    private toastService: ToastService
  ) {}

  ngAfterViewInit() {
    this.loadRoles();
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

  loadRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        console.log('Roles received:', roles);
        this.dataSource.data = roles;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
      },
    });
  }

  refreshRoles() {
    this.loadRoles();
  }

  editRole(role: RoleInterface) {
    // Implement edit role functionality
  }

  deleteRole(role: RoleInterface) {
    this.confirmDeleteService
      .openAdvancedConfirmDialog(role.name, 'role')
      .subscribe((confirmed) => {
        if (confirmed) {
          // Implement delete role functionality
        }
      });
  }
}