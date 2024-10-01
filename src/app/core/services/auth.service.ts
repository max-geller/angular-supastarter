import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  User,
} from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _session = new BehaviorSubject<AuthSession | null>(null);
  private hasShownWelcomeMessage = false;
  public signOut$ = new EventEmitter<void>();

  constructor(private supabaseService: SupabaseService) {}

  getCurrentUser(): User | null {
    return this._session.getValue()?.user ?? null;
  }

  async initializeAuth() {
    const { data } = await this.supabaseService.getClient().auth.getSession();
    this._session.next(data.session);
    if (data.session) {
    } else {
    }

    this.supabaseService
      .getClient()
      .auth.onAuthStateChange(async (event, session) => {
        this._session.next(session);
        if (session?.user) {
          if (event === 'SIGNED_IN') {
          }
        } else {
        }
      });
  }

  get session() {
    return this._session.asObservable();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabaseService.getClient().auth.onAuthStateChange(callback);
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
      }

      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  signOut() {
    this.signOut$.emit(); // Emit an event instead of directly calling ThemeService
    return this.supabaseService.getClient().auth.signOut();
  }

  async resetPassword(email: string) {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.resetPasswordForEmail(email, {
          redirectTo: 'https://localhost:4200/sessions/update-pass',
        });
      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  async updatePassword(password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.updateUser({ password });
    if (error) {
      throw error;
    }

    return data;
  }
}
