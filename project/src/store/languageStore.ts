import { create } from 'zustand';
import { Language, languages, translations } from '../utils/translations';

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export { languages };
export type { Language };

// Get initial language from localStorage
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const savedLang = localStorage.getItem('app_language') as Language;
  if (savedLang && languages.some(l => l.code === savedLang)) {
    return savedLang;
  }
  return 'en';
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLanguage: getInitialLanguage(),
  setLanguage: (lang) => {
    set({ currentLanguage: lang });
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', lang);
    }
  },
  t: (key: string) => {
    const lang = get().currentLanguage;
    return translations[lang]?.[key] || translations.en[key] || key;
  },
}));

