import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TenantService } from '../../../../../../../core/services/tenant.service';
import { TenantInterface } from '../../../../../../../core/models/tenant.model';

@Component({
  selector: 'app-edit-tenant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-tenant.dialog.html',
})
export class EditTenantDialog {
  editTenantForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditTenantDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TenantInterface,
    private fb: FormBuilder,
    private tenantService: TenantService
  ) {
    this.editTenantForm = this.fb.group({
      name: [data.name, Validators.required],
      logo_url: [data.logo_url],
      is_active: [data.is_active]
    });
  }

  onSubmit() {
    if (this.editTenantForm.valid) {
      const updatedTenant: Partial<TenantInterface> = {
        ...this.editTenantForm.value,
        id: this.data.id
      };

      this.tenantService.updateTenant(updatedTenant).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating tenant:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
