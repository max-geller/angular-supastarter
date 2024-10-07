import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DefaultModuleService {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  navigateToDefaultModule(): Observable<boolean> {
    const userId = this.authService.getCurrentUser().user?.id;
    if (!userId) {
      return of(false);
    }

    return this.userService.getUserSettings(userId).pipe(
      switchMap((settings) => {
        const defaultModule = settings?.default_module || 'features/template';
        // Convert the Promise to an Observable
        return from(this.router.navigate([defaultModule]));
      }),
      catchError((error) => {
        console.error('Error navigating to default module:', error);
        // Convert the Promise to an Observable
        return from(this.router.navigate(['features/admin']));
      })
    );
  }

  updateDefaultModule(module: string): Observable<void> {
    const userId = this.authService.getCurrentUser().user?.id;
    if (!userId) {
      return of(undefined);
    }

    return this.userService.updateUserSettings(userId, { default_module: module }).pipe(
      switchMap(() => of(undefined)),
      catchError((error) => {
        console.error('Error updating default module:', error);
        return of(undefined);
      })
    );
  }
}