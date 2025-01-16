// next-i18next.config.js

const path = require('path');

module.exports = {
  i18n: {
    locales: ['en'], 
    defaultLocale: 'en', 
  },
  localePath: path.resolve('./locales'), 
};
