export const environment = {
  envName: 'prod',
  production: true,

  data_server: 'https://data.petabencana.id/',
  instance_region: 'jbd',

  auth0_client_id: 'ApdfZvV1BrxXmwdg6Djrle4m2nav5ub9',
  auth0_domain: 'cdn.au.auth0.com',
  auth0_callbackURL: 'https://dashboard.petabencana.id/callback',

  locales: {
    supportedLanguages: [
      {code: 'en', name: 'English'},
      {code: 'id', name: 'Bahasa'}
    ],
    defaultLanguage: 'id'
  },
  timezones: {
    locale: 'id',
    tz: 'Asia/Jakarta'
  }
};
