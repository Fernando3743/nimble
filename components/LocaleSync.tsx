"use client";

import { useLocaleSync } from "@/lib/i18n/hooks/useLocaleSync";

/**
 * Client component that syncs locale preferences
 * Must be included in the layout to sync locale changes to user metadata
 */
export function LocaleSync() {
  useLocaleSync();
  return null;
}
