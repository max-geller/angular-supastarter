Implement RLS policies to ensure that users can only access their own activity logs and those of their tenant:

```SQL

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
```
