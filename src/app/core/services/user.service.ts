import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

// Import Services
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  // Create Observable for Current User's Basic Information
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
}
