import { Injectable, inject, Inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { ThemeService } from './_drafts/theme.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private supabaseService = inject(SupabaseService);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  constructor() {}

  async initializeApp(): Promise<void> {
    // Initialize Supabase
    await this.supabaseService.initialize();

    // Initialize AuthService
    await this.authService.initializeAuth();

    // Initialize Theme
    await this.themeService.initializeTheme();

    // Obtain User Role

    // Obtain Basic User Information
  }
}
