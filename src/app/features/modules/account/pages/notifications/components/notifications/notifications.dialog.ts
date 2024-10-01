import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

// TODO: if used, replace "unknown" with an existing type, or replace the type with a new interface
/**
 * Type of the data passed from the page to the dialog when opening the dialog.
 */
export type NotificationsDialogOpenData = unknown;

// TODO: if used, replace "unknown" with an existing type, or replace the type with a new interface
/**
 * Type of the data passed from the dialog to the page when closing the dialog.
 */
export type NotificationsDialogCloseData = unknown;

/**
 * To open the dialog in a type safe way:
 *
 * @example
 * this.matDialog.open<NotificationsDialog, NotificationsDialogOpenData, NotificationsDialogCloseData>(NotificationsDialog, {
 *     data: {} // type NotificationsDialogOpenData
 *   })
 *   .afterClosed()
 *   .subscribe((closeData) => {
 *     closeData; // type: NotificationsDialogCloseData | undefined
 *   });
 */
@Component({
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './notifications.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialog {
  protected readonly openData =
    inject<NotificationsDialogOpenData>(MAT_DIALOG_DATA);
  // TODO: if used, replace with actual data (it can be changed to a signal if the value changes over time)
  protected readonly closeData: NotificationsDialogCloseData = {};
}
