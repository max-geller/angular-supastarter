import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
// Import Services
import { TenantService } from '../../../../../../../core/services/tenant.service';

// Import Models
import { TenantInterface } from '../../../../../../../core/models/tenant.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './add-tenant.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTenantDialogDialog {
  addTenantForm: FormGroup;

  constructor(
    private tenantService: TenantService,
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

      this.tenantService.createTenant(newTenant).subscribe({
        next: (createdTenant) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error creating tenant:', error);
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
