import { Injectable } from '@angular/core';

// Import Supabase Client
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Import Environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly supabaseUrl = environment.supabaseCredentials.url;
  private readonly supabaseKey = environment.supabaseCredentials.key;
  private supabase: SupabaseClient | null = null;

  initialize(): void {
    if (!this.supabase) {
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
      console.log('Supabase client initialized');
    } else {
      console.log('Supabase client already initialized');
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error(
        'Supabase client not initialized. Please ensure the service is initialized before use.'
      );
    }
    return this.supabase;
  }
}
