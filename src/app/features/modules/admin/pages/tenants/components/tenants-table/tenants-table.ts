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
import { AdminService } from '../../../../../../../core/services/admin.service';

// Import Models
import { TenantInterface } from '../../../../../../../core/models/tenant.model';
import { EditTenantDialog } from '../edit-tenant/edit-tenant.dialog';

@Component({
  selector: 'admin-tenants-table',
  standalone: true,
  styleUrls: ['./tenants-table.scss'],
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
  templateUrl: './tenants-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantsTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'edit',
    'logo_url',
    'name',
    'created_at',
    'is_active',
    'id',

  ];
  dataSource = new MatTableDataSource<TenantInterface>([]);

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
    this.loadTenants();
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

  loadTenants() {
    this.adminService.getAllTenants().subscribe({
      next: (tenants) => {
        console.log('Tenants received:', tenants);
        this.dataSource.data = tenants;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching tenants:', error);
      },
    });
  }

  refreshTenants() {
    this.loadTenants();
  }

  editTenant(tenant: TenantInterface) {
    const dialogRef = this.dialog.open(EditTenantDialog, {
      width: '400px',
      data: tenant,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTenants();
      }
    });
  }

  deleteTenant(tenant: TenantInterface) {
    this.confirmDeleteService
      .openAdvancedConfirmDialog(tenant.name, 'tenant')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.adminService.deleteTenant(tenant.id).subscribe({
            next: () => {
              this.toastService.showToast('Tenant deleted successfully');
              this.refreshTenants();
            },
            error: (error) => {
              console.error('Error deleting tenant:', error);
              this.toastService.showToast(
                'Error deleting tenant. Please try again.'
              );
            },
          });
        }
      });
  }
}
