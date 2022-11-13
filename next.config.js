const imagesDomains = {
  development: ['localhost'],
  prom: [],
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
