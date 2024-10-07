import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Import Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Import Services
import { RoleService } from '../../../../../../../core/services/role.service';
import { ToastService } from '../../../../../../../core/services/toast.service';

// Import Models
import { RoleInterface } from '../../../../../../../core/models/role.model';

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
  templateUrl: './edit-role.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRoleDialog {
  private fb = inject(FormBuilder);
  private roleService = inject(RoleService);
  private dialogRef = inject(MatDialogRef<EditRoleDialog>);
  private toastService = inject(ToastService);

  editRoleForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: RoleInterface) {
    this.editRoleForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description],
      is_active: [data.is_active]
    });
  }

  onSubmit() {
    if (this.editRoleForm.valid) {
      const updatedRole: RoleInterface = {
        ...this.data,
        ...this.editRoleForm.value
      };
      this.roleService.updateRole(updatedRole).subscribe({
        next: (role) => {
          this.toastService.showToast('Role updated successfully', 3000, 'top', 'right');
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.toastService.showToast('Error updating role', 3000, 'top', 'right');
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}