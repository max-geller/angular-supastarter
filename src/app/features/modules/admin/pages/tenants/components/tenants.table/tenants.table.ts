import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Angular Material Components
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
// Import Services
import { TenantService } from '../../../../../../../core/services/tenant.service';

// Import Models
import { TenantInterface } from '../../../../../../../core/models/tenant.model';
import { MatDialog } from '@angular/material/dialog';
import { EditTenantDialog } from '../edit-tenant/edit-tenant.dialog';

@Component({
  selector: 'admin-tenants-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule],
  templateUrl: './tenants.table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantsTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'logo_url',
    'name',
    'created_at',
    'is_active',
    'edit',
  ];
  dataSource = new MatTableDataSource<TenantInterface>([]);

  constructor(
    private tenantService: TenantService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants() {
    this.tenantService.getAllTenants().subscribe({
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
      data: tenant
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTenants();
      }
    });
  }
}
