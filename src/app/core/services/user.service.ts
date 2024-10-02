import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// Import Services
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

// Import Models
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  getUserProfile(): Observable<any> {
    return from(
      this.supabaseService.getClient().from('users').select('*').single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        console.log(data);
        return data;
      })
    );
  }

  registerUser(userId: string, userData: Partial<UserInterface>, password: string): Observable<UserInterface> {
    return from(this.supabaseService.getClient().auth.updateUser({ password })).pipe(
      switchMap(() => {
        return from(this.supabaseService.getClient()
          .from('users')
          .update({
            first_name: userData.first_name,
            last_name: userData.last_name,
            // Add other fields as needed
          })
          .eq('id', userId)
          .select()
          .single()
        );
      }),
      map(({ data, error }) => {
        if (error) throw error;
        return data as UserInterface;
      })
    );
  }

}
