"use client";

import { icons } from "@/components/icons";
import { Link, useRouter } from "@/lib/i18n/routing";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { showError, showSuccess, showLoading, updateToast } from "@/utils/toast";
import { useTranslations } from "next-intl";

export default function SignUpPage() {
  const t = useTranslations("auth.signUp");
  const tSuccess = useTranslations("auth.success");
  const tErrors = useTranslations("auth.errors");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    marketingConsent: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      showError(tErrors("passwordsDontMatch"));
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      showError(tErrors("passwordMinLength"));
      setLoading(false);
      return;
    }

    const toastId = showLoading(t("creating"));

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            marketing_consent: formData.marketingConsent,
          },
        },
      });

      if (error) {
        updateToast(toastId, "error", error.message);
        setLoading(false);
        return;
      }

      // Show success message
      updateToast(toastId, "success", tSuccess("accountCreated"));
      setLoading(false);

      // Redirect to sign in page after 2 seconds
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (err) {
      updateToast(toastId, "error", tErrors("genericError"));
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const toastId = showLoading(t("connecting"));

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        updateToast(toastId, "error", error.message);
        setLoading(false);
      } else {
        updateToast(toastId, "info", tSuccess("redirecting"));
      }
    } catch (err) {
      updateToast(toastId, "error", tErrors("genericError"));
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 lg:bg-white">
      {/* Header - Only visible on mobile */}
      <header className="border-b border-zinc-200 bg-white lg:hidden">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-black uppercase tracking-tight text-dark">
            Nimble
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:flex lg:min-h-screen lg:max-w-none lg:p-0">
        {/* Left Side - Brand/Image Section (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:bg-primary lg:p-16 lg:pt-20 xl:p-24 xl:pt-24">
          <Link href="/" className="mb-12 text-4xl font-black uppercase tracking-tight text-white xl:text-5xl">
            Nimble
          </Link>
          <h2 className="mb-6 text-4xl font-black leading-tight text-white xl:text-5xl">
            {t("desktopTitle")}
            <br />
            {t("desktopSubtitle")}
          </h2>
          <p className="text-lg text-white/90 xl:text-xl">
            {t("desktopDescription")}
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="full-shadow rounded-2xl bg-white p-8 lg:w-1/2 lg:flex lg:items-center lg:justify-center lg:overflow-y-auto lg:p-16 lg:shadow-none xl:p-24">
          <div className="w-full lg:max-w-md">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-black text-dark lg:text-4xl">{t("title")}</h1>
              <p className="mt-2 text-sm text-dark-gray lg:text-base">
                {t("subtitle")}
              </p>
            </div>

            {/* Social Login */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-6 py-3 text-[15px] font-semibold text-dark transition hover:border-dark hover:bg-light-gray/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {tCommon("continueWith", { provider: "Google" })}
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-dark-gray">{t("withEmail")}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-dark">
                  {t("firstName")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-dark">
                  {t("lastName")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark">
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10"
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark">
                {t("phone")} <span className="font-normal text-dark-gray">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-dark">
                {t("password")}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-dark">
                {t("confirmPassword")}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10"
                placeholder="••••••••"
              />
            </div>

            {/* Marketing Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="marketingConsent"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <label htmlFor="marketingConsent" className="text-sm text-dark-gray">
                {t("marketingConsent")}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary px-6 py-3 text-[15px] font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? t("creating") : t("button")}
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-dark-gray">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-dark underline hover:no-underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-dark underline hover:no-underline">
                Privacy Policy
              </Link>
            </p>
          </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-dark-gray">
                {t("haveAccount")}{" "}
                <Link href="/auth/signin" className="font-semibold text-dark underline hover:no-underline">
                  {t("signInHere")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
