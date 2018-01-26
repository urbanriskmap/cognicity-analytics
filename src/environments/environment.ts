export const environment = {
  production: false,

  data_server: 'https://data.petabencana.id/',
  instance_region: 'jbd',

  auth0_client_id: 'KoKRTjjUC7CpdS770rp29WZyeS73mR1x',
  auth0_domain: 'dev-riskmap.auth0.com',
  auth0_callbackURL: 'http://localhost:4200/callback',

  locales: {
    supportedLanguages: [
      {code: 'en', name: 'English'},
      {code: 'id', name: 'Bahasa'}
    ],
    defaultLanguage: 'en'
  },
  timezones: {
    locale: 'id',
    tz: 'Asia/Jakarta'
  }
};
