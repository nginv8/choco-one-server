const securityMiddleware = {
  name: 'strapi::security',
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'connect-src': ["'self'", 'https:'],
        'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com'],
        'media-src': [
          "'self'",
          'data:',
          'blob:',
          'market-assets.strapi.io',
          'res.cloudinary.com',
        ],
        upgradeInsecureRequests: null,
      },
    },
  },
};

const faviconMiddleware = {
  name: 'strapi::favicon',
  config: { path: './public/img/favicon.ico' },
};


export default [
  'strapi::logger',
  'strapi::errors',
  securityMiddleware,
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  faviconMiddleware,
  'strapi::public',
];
