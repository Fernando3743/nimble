"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/routing";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { icons } from "@/components/icons";
import { useState, useRef, useEffect } from "react";

// Flag emojis for each locale
const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
};

interface LanguageSwitcherProps {
  variant?: "default" | "mobile";
  className?: string;
  theme?: "light" | "dark";
}

export function LanguageSwitcher({
  variant = "default",
  className = "",
  theme = "dark",
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  if (variant === "mobile") {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="px-4 pt-4 pb-2 text-xs font-semibold text-dark-gray uppercase">
          Language / Idioma
        </div>
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`flex items-center gap-3 px-4 py-3 text-[15px] font-semibold transition ${
              loc === locale
                ? "bg-light-gray text-dark"
                : "text-dark-gray hover:bg-light-gray/30"
            }`}
          >
            <span className="text-2xl leading-none">{localeFlags[loc]}</span>
            <span>{localeNames[loc]}</span>
            {loc === locale && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-full px-3 py-1 transition ${
          theme === "light"
            ? "text-dark hover:bg-zinc-100"
            : "text-white hover:bg-white/10"
        }`}
        type="button"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-lg leading-none">{localeFlags[locale]}</span>
        <span className="hidden font-medium lg:inline">
          {localeNames[locale]}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          {icons.chevronLight()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-[200px] overflow-hidden rounded-lg bg-white shadow-lg border border-zinc-200 z-[70]">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold transition ${
                loc === locale
                  ? "bg-light-gray text-dark"
                  : "text-dark-gray hover:bg-light-gray/50"
              }`}
            >
              <span className="text-xl leading-none">{localeFlags[loc]}</span>
              <span className="flex-1">{localeNames[loc]}</span>
              {loc === locale && (
                <span className="text-primary font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
