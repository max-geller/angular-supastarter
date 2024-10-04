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
            is_registered: true,
            is_active: true,
            created_at: new Date().toISOString(),
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

  getUsersWithTenants(): Observable<UserInterface[]> {
    return from(
      this.supabaseService.getClient()
        .from('users')
        .select(`
          *,
          tenants (
            name
          )
        `)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.map(user => ({
          ...user,
          tenant_name: user.tenants?.name
        })) as UserInterface[];
      })
    );
  }

  getUsersWithTenantsAndRoles(): Observable<UserInterface[]> {
    return from(
      this.supabaseService.getClient()
        .from('users')
        .select(`
          *,
          tenants (
            name
          ),
          roles (
            name
          )
        `)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.map(user => ({
          ...user,
          tenant_name: user.tenants?.name,
          role_name: user.roles?.name
        })) as UserInterface[];
      })
    );
  }

  getUserById(userId: string): Observable<UserInterface> {
    return from(
      this.supabaseService.getClient()
        .from('users')
        .select(`
          *,
          tenants (
            name
          ),
          roles (
            name
          )
        `)
        .eq('id', userId)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return {
          ...data,
          tenant_name: data.tenants?.name,
          role_name: data.roles?.name
        } as UserInterface;
      })
    );
  }

  getCurrentUserWithRole(): Observable<UserInterface> {
    return from(
      this.supabaseService.getClient()
        .from('users')
        .select(`
          *,
          roles (
            name
          )
        `)
        .eq('id', this.authService.getCurrentUser().user?.id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return {
          ...data,
          role_name: data.roles?.name
        } as UserInterface;
      })
    );
  }
}