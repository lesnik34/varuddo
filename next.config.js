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
    domains: imagesDomains[process.env.ENV_MODE],
  },
};
