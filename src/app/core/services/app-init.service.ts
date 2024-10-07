import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

// Import Services
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';
import { TimezoneService } from './_drafts/timezone.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private supabaseService = inject(SupabaseService);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  private timezoneService = inject(TimezoneService);

  constructor() {}

  async initializeApp(): Promise<void> {
    // Initialize Supabase
    await this.supabaseService.initialize();

    // Initialize AuthService
    await this.authService.initializeAuth();

    // Initialize Theme
    await this.themeService.initializeTheme();

    // Initialize Timezone
    await this.timezoneService.loadUserTimezone();
  }
}
