import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

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
    return from(
      this.supabase.getClient()
        .from('users')
        .select('tenant_id')
        .eq('id', userId)
        .single()
    ).pipe(
      switchMap((userResponse) => {
        if (userResponse.error) throw userResponse.error;
        const tenantId = userResponse.data.tenant_id;
        return from(
          this.supabase.getClient()
            .from('tenants')
            .select('*')
            .eq('id', tenantId)
            .single()
        );
      }),
      map((tenantResponse) => {
        if (tenantResponse.error) throw tenantResponse.error;
        return tenantResponse.data as TenantInterface;
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
