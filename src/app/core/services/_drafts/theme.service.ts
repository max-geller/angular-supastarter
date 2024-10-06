import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { ToastService } from '../toast.service';
import { UserInterface } from '../../../core/models/user.model';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  private currentTheme = new BehaviorSubject<'light' | 'dark' | 'system'>('light');

  constructor() {
    this.authService.signOut$.subscribe(() => {
      this.applyTheme('light', false);
    });
  }

  async initializeTheme() {
    const currentUser = this.authService.getCurrentUser().user;
    if (!currentUser) {
      this.applyTheme('light', false);
      return;
    }

    try {
      const userSettings = await this.userService.getUserSettingsById(currentUser.id).toPromise();
      const theme = userSettings?.theme || 'light';
      this.applyTheme(theme as 'light' | 'dark' | 'system', false);
    } catch (error) {
      console.error('Error fetching user settings:', error);
      this.applyTheme('light', false);
    }
  }

  private applyTheme(theme: 'light' | 'dark' | 'system', showToast: boolean = true) {
    this.currentTheme.next(theme);
    if (theme === 'system') {
      this.applySystemTheme();
    } else {
      this.applySpecificTheme(theme);
    }

    if (showToast) {
      this.toastService.showToast(`Theme updated to ${theme} mode`);
    }
  }

  private applySpecificTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  private applySystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applySpecificTheme(prefersDark ? 'dark' : 'light');
  }

  updateTheme(theme: 'light' | 'dark' | 'system') {
    const currentUser = this.authService.getCurrentUser().user;
    if (currentUser) {
      this.userService.updateUserSettings(currentUser.id, { theme }).subscribe(
        () => {
          this.applyTheme(theme, true);
        },
        (error) => {
          console.error('Error updating theme:', error);
          this.toastService.showToast('Error updating theme. Please try again.');
        }
      );
    } else {
      this.applyTheme(theme, true);
    }
  }

  getCurrentTheme(): Observable<'light' | 'dark' | 'system'> {
    return this.currentTheme.asObservable();
  }
}
