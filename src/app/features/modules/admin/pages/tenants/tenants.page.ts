import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  type OnInit,
} from '@angular/core';

// Import Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

// Import Components
import { TenantsTableComponent } from './components/tenants-table/tenants-table';
import { InviteTenantDialog } from './components/invite-tenant/invite-tenant.dialog';

@Component({
  standalone: true,
  imports: [
    TenantsTableComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './tenants.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantsPage implements OnInit {
  @ViewChild(TenantsTableComponent) tenantsTable!: TenantsTableComponent;

  private dialog = inject(MatDialog);

  ngOnInit(): void {}

  inviteTenantDialog() {
    const dialogRef = this.dialog.open(InviteTenantDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
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
