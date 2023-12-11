/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "zh", "ja", "es", "de", "fr", "ko", "pt", "ar", "pseudo"],
  pseudoLocale: 'pseudo',
  sourceLocale: "en",
  fallbackLocales: {
    default: 'en'
  },
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: ["pages", "components", "utils", "config"],
    },
  ],
  format: "po",
};
