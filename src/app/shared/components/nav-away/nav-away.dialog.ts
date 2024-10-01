import { ChangeDetectionStrategy, Component } from '@angular/core';

// Import Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './nav-away.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavAwayDialog {
  constructor(private dialogRef: MatDialogRef<NavAwayDialog>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
