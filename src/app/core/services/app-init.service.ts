import { Injectable, inject, Inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  isDevMode: boolean;
  isStaging: boolean;
  private supabaseService = inject(SupabaseService);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  constructor(@Inject('ENVIRONMENT') private env: any) {
    this.isDevMode = !env.production;
    this.isStaging = env.staging;
  }

  async initializeApp(): Promise<void> {
    // Initialize Supabase
    await this.supabaseService.initialize();

    // Initialize AuthService
    await this.authService.initializeAuth();

    // Initialize Theme
    await this.themeService.initializeTheme();

    // Obtain User Role
    

    // Obtain Basic User Information

    // Log Environment
    console.log('Environment:', environment);
  }
}
