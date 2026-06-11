import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import tr from './tr.json';
import en from './en.json';

const resources = {
  tr: { translation: tr },
  en: { translation: en },
};

const languageTag = RNLocalize.getLocales()[0]?.languageTag ?? 'tr';
const lng = languageTag.startsWith('tr') ? 'tr' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng,
    fallbackLng: 'tr',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
  });

export default i18n;
export const changeLanguage = (lang: 'tr' | 'en') => i18n.changeLanguage(lang);
