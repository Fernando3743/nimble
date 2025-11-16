"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/dictionaries";

const languages = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-dark hover:text-dark/70 transition-colors"
        aria-label="Change language"
      >
        <span>{languages[locale].flag}</span>
        <span className="hidden sm:inline">{languages[locale].name}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {(Object.keys(languages) as Locale[]).map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`
              w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
              hover:bg-gray-50 transition-colors
              ${lang === locale ? "bg-gray-50 font-medium" : ""}
              ${lang === "en" ? "rounded-t-lg" : ""}
              ${lang === "es" ? "rounded-b-lg" : ""}
            `}
          >
            <span className="text-lg">{languages[lang].flag}</span>
            <span className="text-dark">{languages[lang].name}</span>
            {lang === locale && (
              <svg
                className="w-4 h-4 ml-auto text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
