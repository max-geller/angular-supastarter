import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { ToastService } from '../../../../../../../core/services/toast.service';
import { AdminService } from '../../../../../../../core/services/admin.service';

import { UserInterface } from '../../../../../../../core/models/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './edit-user.dialog.html',
})
export class EditUserDialog {
  editUserForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastService: ToastService
  ) {
    this.editUserForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      is_active: [data.is_active],
    });
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      const updatedUser: Partial<UserInterface> = {
        ...this.editUserForm.value,
        id: this.data.id,
      };

      this.adminService.updateUser(updatedUser).subscribe({
        next: () => {
          this.toastService.showToast('User Details Updated');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.toastService.showToast('Error updating user. Please try again.');
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
