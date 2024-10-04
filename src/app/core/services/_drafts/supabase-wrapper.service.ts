import { Injectable } from '@angular/core';
import { SupabaseClient, createClient, User } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ActivityLoggerService } from './activity-logger.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseWrapperService {
  private supabase: SupabaseClient;
  private currentUser = new BehaviorSubject<User | null>(null);
  private currentTenant = new BehaviorSubject<string | null>(null);

  constructor(private activityLogger: ActivityLoggerService) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.initializeUser();
  }

  private async initializeUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (user) {
      this.currentUser.next(user);
      this.currentTenant.next(user.user_metadata.tenant_id);
    }
  }

  async select(table: string, query: any) {
    const result = await this.supabase.from(table).select(query);
    // No need to log for select operations
    return result;
  }

  async insert(table: string, data: any) {
    const result = await this.supabase.from(table).insert(data);
    await this.logActivity('insert', table, null, { data });
    return result;
  }

  async update(table: string, data: any, match: any) {
    const result = await this.supabase.from(table).update(data).match(match);
    await this.logActivity('update', table, null, { data, match });
    return result;
  }

  async delete(table: string, match: any) {
    const result = await this.supabase.from(table).delete().match(match);
    await this.logActivity('delete', table, null, { match });
    return result;
  }

  private async logActivity(
    actionType: string,
    tableName: string,
    recordId: string | null,
    details: any
  ) {
    const user = this.currentUser.getValue();
    const tenant = this.currentTenant.getValue();

    if (!user || !tenant) {
      console.error('No user or tenant found for activity logging');
      return;
    }

    const { error } = await this.supabase
      .from('user_activity')
      .insert({
        user_id: user.id,
        tenant_id: tenant,
        action_type: actionType,
        table_name: tableName,
        record_id: recordId,
        details: details
      });

    if (error) {
      console.error('Error logging activity:', error);
    }
  }

  // Add methods for auth state changes
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (data.user) {
      this.currentUser.next(data.user);
      this.currentTenant.next(data.user.user_metadata.tenant_id);
      await this.logActivity('login', 'auth', null, {});
    }
    return { data, error };
  }

  async signOut() {
    await this.logActivity('logout', 'auth', null, {});
    const { error } = await this.supabase.auth.signOut();
    this.currentUser.next(null);
    this.currentTenant.next(null);
    return { error };
  }
}
