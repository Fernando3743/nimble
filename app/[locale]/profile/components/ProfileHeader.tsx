"use client";

import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function ProfileHeader() {
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-dark">{t("title")}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher theme="light" />
            <Link
              href="/"
              className="text-sm font-semibold text-dark-gray hover:text-dark"
            >
              ← {tCommon("backToHome")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
