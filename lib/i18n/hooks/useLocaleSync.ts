"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { createClient } from "@/lib/supabase/client";

/**
 * Hook to sync the current locale with:
 * 1. Auth store (for UI state)
 * 2. User metadata (for persistence across sessions)
 */
export function useLocaleSync() {
  const locale = useLocale();
  const { user } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    // Update user metadata with preferred locale if user is logged in
    // and locale is different from stored preference
    const syncLocaleToUser = async () => {
      if (user) {
        const currentPreferredLocale = user.user_metadata?.preferred_locale;

        if (currentPreferredLocale !== locale) {
          // Update user metadata with new locale preference
          await supabase.auth.updateUser({
            data: {
              preferred_locale: locale,
            },
          });
        }
      }
    };

    syncLocaleToUser();
  }, [locale, user, supabase.auth]);

  return locale;
}
