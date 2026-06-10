import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonIT from './resources/it/common.json';
import commonEN from './resources/en/common.json';
import experiencesIT from './resources/it/experiences.json';
import experiencesEN from './resources/en/experiences.json';
import welcomeIT from './resources/it/welcome.json';
import welcomeEN from './resources/en/welcome.json';
import technicalIT from './resources/it/technical.json';
import technicalEN from './resources/en/technical.json';

// Get saved language from localStorage or default to 'it'
const savedLanguage = localStorage.getItem('portfolio-language');
let initialLanguage = 'it';

if (savedLanguage) {
  try {
    const parsed = JSON.parse(savedLanguage);
    if (parsed.state && (parsed.state.language === 'it' || parsed.state.language === 'en')) {
      initialLanguage = parsed.state.language;
    }
  } catch (e) {
    console.error('Error parsing saved language from localStorage:', e);
    // If parsing fails, use default
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      it: {
        common: commonIT,
        experiences: experiencesIT,
        welcome: welcomeIT,
        technical: technicalIT,
      },
      en: {
        common: commonEN,
        experiences: experiencesEN,
        welcome: welcomeEN,
        technical: technicalEN,
      },
    },
    lng: initialLanguage, // Use saved language or default to 'it'
    fallbackLng: 'it',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
