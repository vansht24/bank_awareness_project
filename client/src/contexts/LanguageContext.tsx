import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { type Language, translations, getTranslation } from '@/lib/i18n';
import { apiRequest } from '@/lib/queryClient';

// Define the shape of the translation object based on the 'en' export
type TranslationSet = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSet;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Cache for storing dynamically fetched translations
const translationCache = new Map<Language, TranslationSet>();

// Populate cache with static translations
for (const langKey of Object.keys(translations)) {
  translationCache.set(langKey, translations[langKey as keyof typeof translations]);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });
  
  // Initialize 't' with the translation for the starting language
  const [t, setT] = useState<TranslationSet>(() => getTranslation(language));
  const [loading, setLoading] = useState(false);

  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    // 1. Check cache (this now includes static translations)
    if (translationCache.has(lang)) {
      setT(translationCache.get(lang)!);
      return;
    }

    // 2. Fetch from API
    setLoading(true);
    try {
      // We translate from English, which is our source of truth
      const translated = await apiRequest('POST', '/api/translate', {
        target: lang,
        texts: translations.en,
      });
      const newTranslations: TranslationSet = await translated.json();
      
      translationCache.set(lang, newTranslations); // Save to cache
      setT(newTranslations); // Set new translations
    } catch (error) {
      console.error("Translation failed, falling back to English", error);
      setT(translations.en); // Fallback to English on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to load the initial language on app load
  useEffect(() => {
    setLanguage(language);
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}