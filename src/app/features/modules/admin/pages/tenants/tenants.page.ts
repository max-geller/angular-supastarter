import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  type OnInit,
} from '@angular/core';

// Import Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

// Import Components
import { TenantsTableComponent } from './components/tenants.table/tenants.table';
import { AddTenantDialogDialog } from './components/add-tenant.dialog/add-tenant.dialog';
import { TenantsService } from '../../../../../core/services/tenants.service';

@Component({
  standalone: true,
  imports: [
    TenantsTableComponent,
    MatButtonModule,
    AddTenantDialogDialog,
    MatDialogModule,
  ],
  templateUrl: './tenants.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantsPage implements OnInit {
  @ViewChild(TenantsTableComponent) tenantsTable!: TenantsTableComponent;

  private dialog = inject(MatDialog);
  constructor(private tenantsService: TenantsService) {}

  ngOnInit(): void {}

  addTenantDialog() {
    const dialogRef = this.dialog.open(AddTenantDialogDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTenants();
      }
    });
  }

  private refreshTenants() {
    if (this.tenantsTable) {
      this.tenantsTable.refreshTenants();
    }
  }
}
