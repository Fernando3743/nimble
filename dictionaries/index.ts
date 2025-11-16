import { en } from "./en";
import { es } from "./es";

export type Locale = "en" | "es";

export const dictionaries = {
  en,
  es,
} as const;

export const getDictionary = (locale: Locale) => dictionaries[locale];

export { en, es };
export type { Dictionary } from "./en";
