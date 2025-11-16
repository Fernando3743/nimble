"use client";

import { icons } from "@/components/icons";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { showError, showLoading, updateToast } from "@/utils/toast";
import { useTranslation } from "@/contexts/LanguageContext";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const t = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);

  // Get redirect URL from search params
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = showLoading(t.signIn.toastSigningIn);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        updateToast(toastId, "error", error.message);
        setLoading(false);
        return;
      }

      updateToast(toastId, "success", t.signIn.toastWelcomeBack);
      // Redirect to intended page on success
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      updateToast(toastId, "error", t.signIn.toastError);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const toastId = showLoading(t.signIn.toastConnectingGoogle);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`,
        },
      });

      if (error) {
        updateToast(toastId, "error", error.message);
        setLoading(false);
      } else {
        updateToast(toastId, "info", t.signIn.toastRedirectingGoogle);
      }
    } catch (err) {
      updateToast(toastId, "error", t.signIn.toastGoogleError);
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
            {t.signIn.heroTitle}
          </h2>
          <p className="text-lg text-white/90 xl:text-xl">
            {t.signIn.heroSubtitle}
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="full-shadow rounded-2xl bg-white p-8 lg:w-1/2 lg:flex lg:items-center lg:justify-center lg:p-16 lg:shadow-none xl:p-24">
          <div className="w-full lg:max-w-md">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-black text-dark lg:text-4xl">{t.signIn.title}</h1>
              <p className="mt-2 text-sm text-dark-gray lg:text-base">
                {t.signIn.subtitle}
              </p>
            </div>

            {/* Error messages now handled by toasts */}

            {/* Social Login */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
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
              {t.signIn.continueWithGoogle}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-dark-gray">{t.signIn.orSignInWith}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark">
                {t.signIn.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10"
                placeholder={t.signIn.emailPlaceholder}
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-dark">
                  {t.signIn.passwordLabel}
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-semibold text-dark-gray underline hover:text-dark hover:no-underline"
                >
                  {t.signIn.forgotPassword}
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10"
                placeholder={t.signIn.passwordPlaceholder}
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-zinc-300 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <label htmlFor="rememberMe" className="text-sm text-dark-gray">
                {t.signIn.rememberMe}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary px-6 py-3 text-[15px] font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? t.signIn.signingIn : t.signIn.signInButton}
            </button>
          </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-dark-gray">
                {t.signIn.noAccount}{" "}
                <Link href="/auth/signup" className="font-semibold text-dark underline hover:no-underline">
                  {t.signIn.createAccount}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
