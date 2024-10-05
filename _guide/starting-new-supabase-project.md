To recreate the development supbase project with the same tables and data, follow these steps:

Dump the schema and data from your development database:

```bash
pg_dump -h db.xxxxxxxxxxxx.supabase.co -U postgres -d postgres > backup.sql
```


Restore the dump to your production database:

```bash
psql -h db.yyyyyyyyyyyy.supabase.co -U postgres -d postgres < backup.sql
```
