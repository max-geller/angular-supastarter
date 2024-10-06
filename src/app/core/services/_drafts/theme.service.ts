import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// Import RxJS Resources
import { BehaviorSubject } from 'rxjs';

// Import Services
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

// Import Interfaces
import { UserInterface } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);

  private currentTheme = new BehaviorSubject<'light' | 'dark'>('light');

  constructor(private userService: UserService) {
    this.authService.signOut$.subscribe(() => {});
  }

  async initializeTheme() {
    // Create Theme Observable

    // If No User is Logged In, Set Theme Observable to Light
    if (!this.authService.getCurrentUser().user) {
      this.applyTheme('light');
      return;
    }

    // Get User's Theme From user_settings table, 'theme' column

    // Set The Theme Observable to the User's Theme value
  }

  private applyTheme(theme: 'light' | 'dark') {
    this.currentTheme.next(theme);
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  updateTheme() {
    // Update Theme in user_settings table
    // Update theme observable
    // Push change to the application
  }

  private initThemeObservable() {
    //
  }
}
