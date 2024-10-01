import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

// Import Angular Material Components
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'advanced-confirm-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './advanced-confirm-delete.component.html',
})
export class AdvancedConfirmDeleteComponent {
  form: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<AdvancedConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { projectName?: string; type?: string }
  ) {
    this.form = new FormGroup({
      projectNameControl: new FormControl('', [
        Validators.required,
        Validators.pattern(this.data.projectName || ''),
      ]),
      confirmCheck: new FormControl(false, Validators.requiredTrue),
    });
  }

  isDeleteDisabled(): boolean {
    return !this.form.valid;
  }
}
