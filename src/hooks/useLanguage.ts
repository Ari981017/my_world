import { useTranslation } from 'react-i18next';
import { useLanguageStore, type Language } from '../store/languageStore';

export function useLanguage() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const changeLanguage = (newLang: Language) => {
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return { language, changeLanguage };
}
