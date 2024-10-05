export const environment = {
  version: '0.0.1',
  name: 'development',
  production: false,
  staging: false,
  development: true,
  showDevFooter: true,
  supabaseCredentials: {
    url: import.meta.env['NG_APP_SUPABASE_DEV_URL'],
    key: import.meta.env['NG_APP_SUPABASE_DEV_KEY'],
  },
};
