import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BasicConfirmDeleteComponent } from '../../shared/components/confirm-delete/basic-confirm-delete/confirm-delete.component';
import { AdvancedConfirmDeleteComponent } from '../../shared/components/confirm-delete/advanced-confirm-delete/advanced-confirm-delete.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDeleteService {
  constructor(private dialog: MatDialog) {}

  openBasicConfirmDialog(msg: string): any {
    return this.dialog
      .open(BasicConfirmDeleteComponent, {
        width: '390px',
        disableClose: true,
        data: {
          message: msg,
        },
      })
      .afterClosed();
  }

  openAdvancedConfirmDialog(value: string, type: string): Observable<boolean> {
    {
      return this.dialog
        .open(AdvancedConfirmDeleteComponent, {
          width: '400px',
          data: {
            projectName: value,
            type: type,
          },
        })
        .afterClosed();
    }
  }
}
