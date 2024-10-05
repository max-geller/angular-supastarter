export const environment = {
  version: '0.0.1',
  name: 'staging',
  production: false,
  staging: true,
  development: true,
  showDevFooter: true,
  supabaseCredentials: {
    url: import.meta.env['NG_APP_SUPABASE_DEV_URL'],
    key: import.meta.env['NG_APP_SUPABASE_DEV_KEY'],
  },
};
