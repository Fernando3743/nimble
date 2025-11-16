"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/contexts/LanguageContext";

export default function ProfileHeader() {
  const t = useTranslation();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-dark">{t.profile.title}</h1>
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-lg px-2">
              <LanguageSwitcher />
            </div>
            <Link
              href="/"
              className="text-sm font-semibold text-dark-gray hover:text-dark"
            >
              {t.profile.backToHome}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
