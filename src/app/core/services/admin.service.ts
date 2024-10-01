import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Import Services
import { SupabaseService } from './supabase.service';

// Import Models
import { TenantInterface } from '../models/tenant.model';
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private supabase: SupabaseService) {}


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
      this.supabase
        .getClient()
        .from('tenants')
        .delete()
        .eq('id', id)
    ).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
      }),
      catchError((error) => {
        console.error('Error deleting tenant:', error);
        throw error;
      })
    );
  }

  getAllUsers(): Observable<UserInterface[]> {
    return from(
      this.supabase
        .getClient()
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
    ).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data as UserInterface[];
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return [];
      })
    );
  }

  createUser(user: Partial<UserInterface>): Observable<UserInterface> {
    const newUser = { ...user, is_active: true };
    return from(
      this.supabase
        .getClient()
        .from('users')
        .insert(newUser)
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
        console.error('Error creating user:', error);
        throw error;
      })
    );
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
      this.supabase
        .getClient()
        .from('users')
        .delete()
        .eq('id', id)
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
}
