import i18next from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from "./locales/en/common.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: common
      }
    },
    partialBundledLanguages: true,
    lng: 'en',
    fallbackLng: "en",
    ns: ['common', 'translation'],
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json"
    }
  });


export default i18n;