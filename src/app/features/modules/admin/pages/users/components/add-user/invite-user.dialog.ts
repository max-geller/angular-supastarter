import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
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
    MatSelectModule,
  ],
  templateUrl: './invite-user.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteUserDialogDialog {
  inviteUserForm: FormGroup;
  tenants: TenantInterface[] = [];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InviteUserDialogDialog>,
    private toastService: ToastService
  ) {
    this.inviteUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      tenant_id: ['', Validators.required],
    });

    this.loadTenants();
  }

  loadTenants() {
    this.adminService.getAllTenants().subscribe({
      next: (tenants) => {
        this.tenants = tenants;
      },
      error: (error) => {
        console.error('Error loading tenants:', error);
        this.toastService.showToast('Error loading tenants. Please try again.');
      },
    });
  }

  onSubmit() {
    if (this.inviteUserForm.valid) {
      const email = this.inviteUserForm.get('email')?.value;
      const tenantId = this.inviteUserForm.get('tenant_id')?.value;
  
      this.adminService.inviteUser(email, tenantId).subscribe({
        next: (userId) => {
          console.log('User invited successfully. User ID:', userId);
          this.toastService.showToast('User invited successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error inviting user:', error);
          this.toastService.showToast('Error inviting user. Please try again.');
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
