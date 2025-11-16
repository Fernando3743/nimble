"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Locale, Dictionary } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LOCALE_STORAGE_KEY = "nimble-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [dictionary, setDictionary] = useState<Dictionary>(getDictionary("en"));

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (savedLocale && (savedLocale === "en" || savedLocale === "es")) {
      setLocaleState(savedLocale);
      setDictionary(getDictionary(savedLocale));
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDictionary(getDictionary(newLocale));
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Convenience hook for just accessing translations
export function useTranslation() {
  const { t } = useLanguage();
  return t;
}
