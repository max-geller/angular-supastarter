import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { RoleInterface } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private supabaseService: SupabaseService) {}

  getAllRoles(): Observable<RoleInterface[]> {
    return from(
      this.supabaseService.getClient()
        .from('roles')
        .select('*')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as RoleInterface[];
      })
    );
  }
}
