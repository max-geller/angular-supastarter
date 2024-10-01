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

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ToastService } from '../../../../../../../core/services/toast.service';
import { AdminService } from '../../../../../../../core/services/admin.service';

import { UserInterface } from '../../../../../../../core/models/user.model';

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
  templateUrl: './add-user.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserDialogDialog {
  addUserForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogDialog>,
    private toastService: ToastService,
  ) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const newUser: Partial<UserInterface> = {
        name: this.addUserForm.get('name')?.value,
        email: this.addUserForm.get('email')?.value,
      };

      this.adminService.createUser(newUser).subscribe({
        next: (createdUser) => {
          this.toastService.showToast('User Created Successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.toastService.showToast('Error creating user. Please try again.');
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}