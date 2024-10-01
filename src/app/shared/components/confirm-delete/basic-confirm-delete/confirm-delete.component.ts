import { Component, Inject } from '@angular/core';

// Import Angular Material Components
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'basic-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-delete.component.html',
})
export class BasicConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<BasicConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
}
