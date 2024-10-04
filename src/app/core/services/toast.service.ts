import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
}
