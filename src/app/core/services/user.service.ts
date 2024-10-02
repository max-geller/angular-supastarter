import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
    private authService: AuthService,
    private route: ActivatedRoute
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

  registerUser(userData: Partial<UserInterface>, password: string): Observable<UserInterface> {
    return this.route.queryParams.pipe(
      switchMap(params => {
        const userId = params['id'];
        if (!userId) {
          throw new Error('User ID not found in URL parameters');
        }

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
      })
    );
  }
}
