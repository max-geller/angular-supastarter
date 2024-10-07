import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
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
import { ThemeService } from '../../../../../core/services/theme.service';
import { TimezoneService } from '../../../../../core/services/_drafts/timezone.service';
import { ToastService } from '../../../../../core/services/toast.service';

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
  private timezoneService = inject(TimezoneService);
  private toastService = inject(ToastService);

  currentTheme$!: Observable<'light' | 'dark' | 'system'>;
  currentTimezone$!: Observable<string>;

  ngOnInit() {
    this.currentTheme$ = this.themeService.getCurrentTheme();
    this.currentTimezone$ = this.timezoneService.getCurrentTimezone();
  }

  onThemeChange(theme: 'light' | 'dark' | 'system') {
    this.themeService.updateTheme(theme);
  }

  onTimezoneChange(timezone: string) {
    this.timezoneService.setTimezone(timezone);
  }
}
