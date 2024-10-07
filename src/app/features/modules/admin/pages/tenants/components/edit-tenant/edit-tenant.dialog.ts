import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import Angular Material Components
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Import Services    
import { TenantService } from '../../../../../../../core/services/tenant.service';
import { ToastService } from '../../../../../../../core/services/toast.service';

// Import Models  
import { TenantInterface } from '../../../../../../../core/models/tenant.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-tenant.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTenantDialog {
  private fb = inject(FormBuilder);
  private tenantService = inject(TenantService);
  private dialogRef = inject(MatDialogRef<EditTenantDialog>);
  private toastService = inject(ToastService);

  editTenantForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TenantInterface) {
    this.editTenantForm = this.fb.group({
      name: [data.name, Validators.required],
      logo_url: [data.logo_url],
      is_active: [data.is_active]
    });
  }

  onSubmit() {
    if (this.editTenantForm.valid) {
      const updatedTenant: TenantInterface = {
        ...this.data,
        ...this.editTenantForm.value
      };
      this.tenantService.updateTenant(updatedTenant).subscribe({
        next: (tenant) => {
          this.toastService.showToast('Tenant updated successfully', 3000, 'top', 'right');
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.toastService.showToast('Error updating tenant', 3000, 'top', 'right');
          console.error('Error updating tenant:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
