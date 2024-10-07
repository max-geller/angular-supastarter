import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

// Import Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Import Services
import { RoleService } from '../../../../../../../core/services/role.service';
import { ToastService } from '../../../../../../../core/services/toast.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './add-role.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRoleDialog {
  private fb = inject(FormBuilder);
  private roleService = inject(RoleService);
  private dialogRef = inject(MatDialogRef<AddRoleDialog>);
  private toastService = inject(ToastService);

  roleForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    is_active: [true]
  });

  onSubmit() {
    if (this.roleForm.valid) {
      this.roleService.addRole(this.roleForm.value).subscribe({
        next: (role) => {
          this.toastService.showToast('Role added successfully', 3000, 'top', 'right');
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.toastService.showToast('Error adding role', 3000, 'top', 'right');
          console.error('Error adding role:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
