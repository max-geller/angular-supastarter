import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'advanced-confirm-delete-dialog',
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
