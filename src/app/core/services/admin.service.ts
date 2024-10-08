import { Injectable } from '@angular/core';
import { Observable, from, switchMap, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Import Services
import { SupabaseService } from './supabase.service';
import { UserService } from './user.service';
import { ToastService } from './toast.service';
// Import Models
import { TenantInterface } from '../models/tenant.model';
import { UserInterface } from '../models/user.model';

// Import Supabase Resources

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private supabase: SupabaseService,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  getAllTenants(): Observable<TenantInterface[]> {
    return from(
      this.supabase
        .getClient()
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: false })
    ).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data as TenantInterface[];
      }),
      catchError((error) => {
        console.error('Error fetching roles:', error);
        return [];
      })
    );
  }
  // Create New Tenant from Admin Dashboard
  createTenant(tenant: Partial<TenantInterface>): Observable<TenantInterface> {
    const newTenant = { ...tenant, is_active: true };
    return from(
      this.supabase
        .getClient()
        .from('tenants')
        .insert(newTenant)
        .select()
        .single()
    ).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data as TenantInterface;
      }),
      catchError((error) => {
        console.error('Error creating tenant:', error);
        throw error;
      })
    );
  }

  updateTenant(tenant: Partial<TenantInterface>): Observable<TenantInterface> {
    return from(
      this.supabase
        .getClient()
        .from('tenants')
        .update(tenant)
        .eq('id', tenant.id)
        .select()
        .single()
    ).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data as TenantInterface;
      }),
      catchError((error) => {
        console.error('Error updating tenant:', error);
        throw error;
      })
    );
  }

  deleteTenant(id: string): Observable<void> {
    return from(
      this.supabase.getClient().from('tenants').delete().eq('id', id)
    ).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);

        }
      }),
      catchError((error) => {
        console.error('Error deleting tenant:', error);
        this.toastService.showToast(
          'Error deleting tenant', 3000
        );
        throw error;
      })
    );
  }

  getAllUsers(): Observable<UserInterface[]> {
    return this.userService.getUsersWithTenantsAndRoles();
  }

  updateUser(user: Partial<UserInterface>): Observable<UserInterface> {
    return from(
      this.supabase
        .getClient()
        .from('users')
        .update(user)
        .eq('id', user.id)
        .select()
        .single()
    ).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data as UserInterface;
      }),
      catchError((error) => {
        console.error('Error updating user:', error);
        throw error;
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    return from(
      this.supabase.getClient().from('users').delete().eq('id', id)
    ).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
      }),
      catchError((error) => {
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  }

  inviteUser(email: string, tenantId: string): Observable<string> {
    const redirectTo = `/sessions/register`;
    return from(
      this.supabase
        .getClient()
        .auth.admin.inviteUserByEmail(email, { redirectTo })
    ).pipe(
      switchMap((response) => {
        if (response.error) {
          console.error('Supabase error:', response.error);
          throw new Error(response.error.message);
        }
        if (response.data && response.data.user && response.data.user.id) {
          const userId = response.data.user.id;

          return from(
            this.supabase
              .getClient()
              .from('users')
              .upsert(
                { id: userId, email: email, tenant_id: tenantId },
                { onConflict: 'id' }
              )
          ).pipe(
            map((upsertResponse) => {
              if (upsertResponse.error) {
                console.error(
                  'Error upserting user data:',
                  upsertResponse.error
                );
                throw new Error(upsertResponse.error.message);
              }
              this.toastService.showToast(
                'User invited successfully', 3000
              );
              return userId;
            })
          );
        } else {
          throw new Error('User ID not found in the response');
        }
      }),
      catchError((error) => {
        this.toastService.showToast(
          'Error inviting user', 3000
        );
        console.error('Error inviting user:', error);
        throw error;
      })
    );
  }

  inviteTenant(email: string, tenantId: string): Observable<string> {
    const redirectTo = `/sessions/register`;
    return from(
      this.supabase
        .getClient()
        .auth.admin.inviteUserByEmail(email, { redirectTo })
    ).pipe(
      switchMap((response) => {
        if (response.error) {
          console.error('Supabase error:', response.error);
          throw new Error(response.error.message);
        }
        if (response.data && response.data.user && response.data.user.id) {
          const userId = response.data.user.id;

          return from(
            this.supabase
              .getClient()
              .from('users')
              .upsert(
                // Automatically assign the role of TenantAdmin
                { id: userId, email: email, tenant_id: tenantId, role_id: 2 },
                { onConflict: 'id' }
              )
          ).pipe(
            map((upsertResponse) => {
              if (upsertResponse.error) {
                console.error(
                  'Error upserting user data:',
                  upsertResponse.error
                );
                throw new Error(upsertResponse.error.message);
              }
              this.toastService.showToast(
                'Tenant invited successfully', 3000
              );
              return userId;
            })
          );
        } else {
          this.toastService.showToast(
            'Error inviting tenant', 3000
          );
          throw new Error('User ID not found in the response');
        }
      }),
      catchError((error) => {
        console.error('Error inviting user:', error);
        throw error;
      })
    );
  }
}
