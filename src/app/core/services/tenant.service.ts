import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Import Services
import { SupabaseService } from './supabase.service';

// Import Models
import { TenantInterface } from '../models/tenant.model';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(private supabase: SupabaseService) {}

  getUserTenant(userId: string): Observable<TenantInterface> {
    return from(this.supabase.getClient().from('tenants').select('*').eq('user_id', userId).single())
      .pipe(
        map((response) => {
          if (response.error) throw response.error;
          return response.data as TenantInterface;
        }),
        catchError((error) => {
          console.error('Error fetching user tenant:', error);
          throw error;
        })
      );
  }

  getTenantById(tenantId: string): Observable<TenantInterface> {
    return from(this.supabase.getClient().from('tenants').select('*').eq('id', tenantId).single())
      .pipe(
        map((response) => {
          if (response.error) throw response.error;
          return response.data as TenantInterface;
        }),
        catchError((error) => {
          console.error('Error fetching tenant:', error);
          throw error;
        })
      );
  }
}
