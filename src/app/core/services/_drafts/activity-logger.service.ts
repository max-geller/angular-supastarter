import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityLoggerService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async logActivity(
    actionType: string,
    tableName?: string,
    recordId?: string,
    details?: any
  ): Promise<void> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    if (!user) {
      console.error('No user found for activity logging');
      return;
    }

    const { error } = await this.supabase.from('user_activity').insert({
      user_id: user.id,
      tenant_id: user.user_metadata.tenant_id, // Assuming tenant_id is stored in user metadata
      action_type: actionType,
      table_name: tableName,
      record_id: recordId,
      details: details,
    });

    if (error) {
      console.error('Error logging activity:', error);
    }
  }

  // TODO: ADDS RLS policies to user-activity table:
  /*
  -- Allow users to insert their own activity logs
CREATE POLICY insert_own_activity ON user_activity
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own activity logs and those of their tenant
CREATE POLICY read_own_and_tenant_activity ON user_activity
  FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id OR
    tenant_id IN (
      SELECT tenant_id FROM users WHERE id = auth.uid()
    )
  );
  */
}
