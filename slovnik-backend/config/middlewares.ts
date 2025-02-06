module.exports = [
  'strapi::errors',
  'strapi::security',  // Added missing required middleware
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://novo-cestina.lynder.dev', 'http://localhost:3000'],
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      keepHeaderOnError: true,
      credentials: true,
      maxAge: 86400,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];