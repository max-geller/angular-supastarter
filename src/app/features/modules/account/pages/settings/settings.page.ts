import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Import Services
import { AuthService } from '../../../../../core/services/auth.service';
import { ThemeService } from '../../../../../core/services/theme.service';
import { TimezoneService } from '../../../../../core/services/timezone.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { UserService } from '../../../../../core/services/user.service';
import { DefaultModuleService } from '../../../../../core/services/default-module.service';


@Component({
  standalone: true,
  selector: 'settings-page',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
  ],
  templateUrl: './settings.page.html',
})
export class SettingsPage implements OnInit {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private timezoneService = inject(TimezoneService);
  private toastService = inject(ToastService);
  private defaultModuleService = inject(DefaultModuleService);
  private userService = inject(UserService);

  currentTheme$!: Observable<'light' | 'dark' | 'system'>;
  currentTimezone$!: Observable<string>;
  detectedTimezone: string = '';
  currentDefaultModule$!: Observable<string>;

  ngOnInit() {
    this.currentTheme$ = this.themeService.getCurrentTheme();
    this.currentTimezone$ = this.timezoneService.getCurrentTimezone();
    this.setDefaultTimezoneIfNotSet();
    this.currentDefaultModule$ = this.userService.getUserSettings(this.authService.getCurrentUser().user!.id)
      .pipe(map(settings => settings?.default_module || 'dashboard'));
  }

  onThemeChange(theme: 'light' | 'dark' | 'system') {
    this.themeService.updateTheme(theme);
  }

  onTimezoneChange(timezone: string) {
    this.timezoneService.setTimezone(timezone);
  }

  private setDefaultTimezoneIfNotSet() {
    this.detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fallbackTimezone = this.timezoneService.getFallbackTimezone(this.detectedTimezone);
    this.currentTimezone$.subscribe(currentTimezone => {
      if (!currentTimezone || currentTimezone === 'UTC') {
        this.timezoneService.setTimezone(fallbackTimezone);
      }
    });
  }

  onDefaultModuleChange(module: string) {
    this.defaultModuleService.updateDefaultModule(module).subscribe();
  }
}
