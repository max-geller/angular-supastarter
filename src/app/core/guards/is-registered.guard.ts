import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsRegisteredGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getUserProfile().pipe(
      take(1),
      map(user => {
        if (user && user.is_registered) {
          return true;
        } else {
          this.router.navigate(['/sessions/register']);
          return false;
        }
      })
    );
  }
}