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
import { MatIconModule } from '@angular/material/icon';
// Import Services
import { ToastService } from '../../../../../../../core/services/toast.service';
import { AdminService } from '../../../../../../../core/services/admin.service';

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
    MatIconModule,
  ],
  templateUrl: './invite-tenant.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteTenantDialog {
  inviteTenantForm: FormGroup;

  constructor(
    private adminSerivce: AdminService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InviteTenantDialog>,
    private toastService: ToastService
  ) {
    this.inviteTenantForm = this.fb.group({
      name: ['', Validators.required],
      logo_url: [''],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.inviteTenantForm.valid) {
      const newTenant: Partial<TenantInterface> = {
        name: this.inviteTenantForm.get('name')?.value,
        logo_url: this.inviteTenantForm.get('logo_url')?.value,
      };

      this.adminSerivce.createTenant(newTenant).subscribe({
        next: (createdTenant) => {
          this.toastService.showToast('Tenant Created Successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error creating tenant:', error);
          this.toastService.showToast(
            'Error creating tenant. Please try again.'
          );
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
