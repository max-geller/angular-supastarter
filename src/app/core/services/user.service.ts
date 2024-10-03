import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// Import Services
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { TenantService } from './tenant.service';

// Import Models
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private tenantService: TenantService
  ) {}

  getUserProfile(): Observable<UserInterface> {
    return from(
      this.supabaseService.getClient()
        .from('users')
        .select('*')
        .eq('id', this.authService.getCurrentUser().user?.id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as UserInterface;
      })
    );
  }
  registerUser(userId: string, userData: Partial<UserInterface>, password: string): Observable<UserInterface> {
    return from(this.supabaseService.getClient().auth.updateUser({ password })).pipe(
      switchMap(() => {
        return from(this.supabaseService.getClient()
          .from('users')
          .upsert({
            id: userId,
            first_name: userData.first_name,
            last_name: userData.last_name,
            is_registered: true
          })
          .select()
          .single()
        );
      }),
      map(({ data, error }) => {
        if (error) throw error;
        if (!data) throw new Error('No user data returned');
        return data as UserInterface;
      })
    );
  }

  getCurrentUserTenantName(): Observable<string> {
    return this.getUserProfile().pipe(
      switchMap((user: UserInterface) => {
        if (!user.tenant_id) {
          throw new Error('User has no associated tenant');
        }
        return this.tenantService.getTenantById(user.tenant_id);
      }),
      map(tenant => tenant.name)
    );
  }
}
