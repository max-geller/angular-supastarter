import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) { }

  showToast(
    message: string,
    duration: number = 3000,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      verticalPosition,
      horizontalPosition,
    };

    this.snackBar.open(message, 'Close', config);
  }

  showTimezoneDiscrepancy(
    message: string,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right'
  ): MatSnackBarRef<TextOnlySnackBar> {
    const config: MatSnackBarConfig = {
      verticalPosition,
      horizontalPosition,
      duration: 0, // Set duration to 0 to keep it open until user interaction
    };

    return this.snackBar.open(message, 'Update', config);
  }
}
