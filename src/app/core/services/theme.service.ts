import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);

  private systemTheme = new BehaviorSubject<'light' | 'dark'>('light');
  private currentTheme = new BehaviorSubject<'light' | 'dark'>('light');

  constructor() {
    this.initSystemThemeDetection();
    this.authService.signOut$.subscribe(() => {
      this.resetToDefaultTheme();
    });
  }

  private initSystemThemeDetection() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.setSystemTheme(mediaQuery.matches);
    mediaQuery.addListener((e) => this.setSystemTheme(e.matches));
  }

  private setSystemTheme(isDark: boolean) {
    this.systemTheme.next(isDark ? 'dark' : 'light');
  }

  async initializeTheme() {
    const user = this.authService.getCurrentUser();
    if (user) {
    } else {
      this.resetToDefaultTheme(); // Use this instead of directly applying systemTheme
    }
    this.initThemeObservable();
  }

  private initThemeObservable() {
    combineLatest();
  }

  private applyTheme(theme: 'light' | 'dark') {
    this.currentTheme.next(theme);
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  getCurrentTheme(): Observable<'light' | 'dark'> {
    return this.currentTheme.asObservable();
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    const currentUser = this.authService.getCurrentUser();
  }

  resetToDefaultTheme() {
    this.applyTheme(this.systemTheme.getValue());
    this.currentTheme.next(this.systemTheme.getValue());
  }
}
