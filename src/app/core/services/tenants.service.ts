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
export class TenantsService {
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
}
