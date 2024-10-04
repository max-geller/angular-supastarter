import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsRegisteredGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.session.pipe(
      take(1),
      switchMap(session => {
        if (!session) {
          // User is not logged in
          return of(this.router.createUrlTree(['/sessions/login']));
        }
        // User is logged in, check if they're registered
        return this.userService.getUserProfile().pipe(
          map(user => {
            if (user && user.is_registered) {
              // User is registered, allow access
              return true;
            } else {
              // User is not registered, redirect to register page
              return this.router.createUrlTree(['/sessions/register']);
            }
          })
        );
      })
    );
  }
}