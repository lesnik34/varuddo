const imagesDomains = {
  development: ['localhost', 'varuddo.com', '127.0.0.1'],
  prom: ['varuddo.com'],
};

module.exports = {
  env: require(`./config/${process.env.ENV_MODE}.json`),
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
  images: {
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600],
    imageSizes: [160, 240, 320, 480],
    domains: imagesDomains[process.env.ENV_MODE],
  },
};
