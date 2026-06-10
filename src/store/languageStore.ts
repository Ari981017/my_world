import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'it' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'it', // Italian default
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'portfolio-language', // localStorage key
    }
  )
);
