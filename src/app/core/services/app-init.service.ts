import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';
import { TimezoneService } from './timezone.service';
import { DefaultModuleService } from './default-module.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private supabaseService = inject(SupabaseService);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  private timezoneService = inject(TimezoneService);
  private defaultModuleService = inject(DefaultModuleService);

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

    // Navigate to default module
    this.defaultModuleService.navigateToDefaultModule().subscribe();
  }
}
