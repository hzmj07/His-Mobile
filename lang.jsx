import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationAR from './i18/arabic.json';
import translationTR from './i18/tr.json';
import translationEN from './i18/ing.json';


const resources = {
  ar: {
    translation: translationAR,
  },
  tr: {
    translation: translationTR,
  },
  en: {
    translation: translationEN,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Varsayılan dil
    fallbackLng: 'ar', // Yedek dil
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
