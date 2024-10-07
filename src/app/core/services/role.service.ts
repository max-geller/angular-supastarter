import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
        .order('id', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as RoleInterface[];
      })
    );
  }

  addRole(role: Partial<RoleInterface>): Observable<RoleInterface> {
    return from(
      this.supabaseService.getClient()
        .from('roles')
        .insert(role)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as RoleInterface;
      })
    );
  }

  deleteRole(id: number): Observable<void> {
    return from(
      this.supabaseService.getClient()
        .from('roles')
        .delete()
        .eq('id', id)
    ).pipe(
      map(() => {}),
      catchError((error) => {
        throw error;
      })
    );
  }
}
