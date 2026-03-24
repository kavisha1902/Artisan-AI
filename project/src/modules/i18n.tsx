import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useLanguageStore, Language } from '../store/languageStore';
import { translations } from '../utils/translations';

// Legacy wrapper for backward compatibility with existing components
const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
}>({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Directly use Zustand store state - this ensures reactive updates
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  
  const value = useMemo(() => ({ 
    lang: currentLanguage, 
    setLang: (l: Language) => {
      setLanguage(l);
    }
  }), [currentLanguage, setLanguage]);
  
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext).lang;
}

export function useSetLanguage() {
  return useContext(LanguageContext).setLang;
}

export function useTranslation() {
  const { lang } = useContext(LanguageContext);
  return (key: string) => translations[lang]?.[key] ?? translations.en[key] ?? key;
}
