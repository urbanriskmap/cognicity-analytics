export const environment = {
  envName: 'prod',
  production: true,

  data_server: 'https://data.petabencana.id/',
  instance_region: ['ID-AC', 'ID-BA', 'ID-BB', 'ID-BT', 'ID-BE',
                    'ID-JT', 'ID-KT', 'ID-ST', 'ID-JI', 'ID-KI',
                    'ID-NT', 'ID-GO', 'ID-JK', 'ID-JA', 'ID-LA',
                    'ID-MA', 'ID-KU', 'ID-MU', 'ID-SA', 'ID-SU',
                    'ID-PA', 'ID-RI', 'ID-KR', 'ID-SG', 'ID-KS',
                    'ID-SN', 'ID-SS', 'ID-YO', 'ID-JB', 'ID-KB',
                    'ID-NB', 'ID-PB', 'ID-SR', 'ID-SB'],
  region_name: ['Aceh', 'Bali', 'Kep bangka Belitung', 'Banten', 'Bengkulu',
             'Jawa Tengah', 'Kalimantan Tengah', 'Sulawesi Tengah', 'Jawa Timur', 'Kalimantan Timur',
             'Nusa Tenggara Timur', 'Gorontalo', 'DKI Jakarta', 'Jambi', 'Lampung',
             'Maluku', 'Kalimantan Utara', 'Maluku Utara', 'Sulawesi Utara', 'Sumatera Utara',
             'Papua', 'Riau', 'Kepulauan Riau', 'Sulawesi Tenggara', 'Kalimantan Selatan',
             'Sulawesi Selatan', 'Sumatera Selatan', 'DI Yogyakarta', 'Jawa Barat', 'Kalimantan Barat',
             'Nusa Tenggara Barat', 'Papua Barat', 'Sulawesi Barat', 'Sumatera barat'],

  auth0_client_id: 'ApdfZvV1BrxXmwdg6Djrle4m2nav5ub9',
  auth0_domain: 'auth.petabencana.id',
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
