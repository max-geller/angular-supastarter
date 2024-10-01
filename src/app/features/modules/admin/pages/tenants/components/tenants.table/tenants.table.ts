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

// Import Services
import { TenantsService } from '../../../../../../../core/services/tenants.service';

// Import Models
import { TenantInterface } from '../../../../../../../core/models/tenant.model';

@Component({
  selector: 'admin-tenants-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './tenants.table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantsTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'created_at', 'is_active'];
  dataSource = new MatTableDataSource<TenantInterface>([]);

  constructor(
    private tenantService: TenantsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.tenantService.getAllTenants().subscribe({
      next: (roles) => {
        console.log('Tenants received:', roles);
        this.dataSource.data = roles;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching tenants:', error);
      },
    });
  }
}
