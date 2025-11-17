import { Link } from "@/lib/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function AuthCodeErrorPage() {
  const t = await getTranslations("auth.authCodeError");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-dark">{t("title")}</h1>
          <p className="mt-2 text-lg text-dark-gray">
            {t("subtitle")}
          </p>
        </div>

        <div className="rounded-lg bg-red-50 border border-red-200 p-6">
          <p className="text-sm text-red-800">
            {t("description")}
          </p>
          <ul className="mt-3 list-disc list-inside text-sm text-red-700 text-left space-y-1">
            <li>{t("reasons.used")}</li>
            <li>{t("reasons.expired")}</li>
            <li>{t("reasons.old")}</li>
            <li>{t("reasons.provider")}</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full rounded-full bg-black px-6 py-3 text-center font-semibold text-white transition hover:bg-dark disabled:opacity-50"
          >
            {t("tryAgain")}
          </Link>

          <Link
            href="/"
            className="block w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-center font-semibold text-black transition hover:bg-light-gray"
          >
            {t("returnHome")}
          </Link>
        </div>

        <p className="text-sm text-dark-gray">
          {t("needHelp")}{" "}
          <Link href="/help" className="font-medium text-black underline">
            {t("contactSupport")}
          </Link>
        </p>
      </div>
    </div>
  );
}