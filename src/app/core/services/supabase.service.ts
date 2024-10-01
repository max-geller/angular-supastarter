import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private readonly supabaseUrl = import.meta.env['NG_APP_SUPABASE_URL'];
  private readonly supabaseKey = import.meta.env['NG_APP_SUPABASE_KEY'];
  private supabase: SupabaseClient | null = null;

  initialize(): void {
    if (!this.supabase) {
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    } else {
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized. Please ensure the service is initialized before use.');
    }
    return this.supabase;
  }

  
}
