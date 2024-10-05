export const environment = {
  version: '0.0.1',
  name: 'production',
  production: true,
  staging: false,
  development: false,
  showDevFooter: false,
  supabaseCredentials: {
    url: import.meta.env['NG_APP_SUPABASE_PROD_URL'],
    key: import.meta.env['NG_APP_SUPABASE_PROD_KEY'],
  },
};
