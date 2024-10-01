import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Import Services
import { TenantsService } from '../../../../../../../core/services/tenants.service';

// Import Models
import { TenantInterface } from '../../../../../../../core/models/tenant.model';

@Component({
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './add-tenant.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTenantDialogDialog {
  addTenantForm: FormGroup;

  constructor(
    private tenantsService: TenantsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTenantDialogDialog>
  ) {
    this.addTenantForm = this.fb.group({
      name: ['', Validators.required],
      logo_url: [''],
    });
  }

  onSubmit() {
    if (this.addTenantForm.valid) {
      const newTenant: Partial<TenantInterface> = {
        name: this.addTenantForm.get('name')?.value,
        logo_url: this.addTenantForm.get('logo_url')?.value,
      };

      this.tenantsService.createTenant(newTenant).subscribe({
        next: (createdTenant) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error creating tenant:', error);
        }
      });
    }
  }
}
