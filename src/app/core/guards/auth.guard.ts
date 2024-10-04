import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.session.pipe(
      take(1),
      map((session) => {
        if (session) {
          return true;
        } else {
          return this.router.createUrlTree(['/sessions/login']);
        }
      })
    );
  }

  // TODO: ADD ACTIVITY LOGGING SERVICE
  /*
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const { data: { user } } = await this.supabaseService.getSession();
    if (user) {
      await this.activityLogger.logActivity('login');
      return true;
    } else {
      await this.activityLogger.logActivity('logout');
      this.router.navigate(['/login']);
      return false;
    }
  }


-- Allow users to insert their own activity logs
CREATE POLICY insert_own_activity ON user_activity
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own activity logs and those of their tenant
CREATE POLICY read_own_and_tenant_activity ON user_activity
  FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id OR
    tenant_id IN (
      SELECT tenant_id FROM users WHERE id = auth.uid()
    )
  );



    */
}
