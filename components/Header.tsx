"use client";

import { icons } from "@/components/icons";
import { Link } from "@/lib/i18n/routing";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

// Constants
const CONTAINER = "w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[50px]";
const SCROLL_THRESHOLD = 10;

const socialIcons = ["facebook", "x", "instagram", "tiktok"] as const;

// Reusable class patterns
const underlineAnimation =
  "absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100";

export function Header() {
  const t = useTranslations("header");
  const { user, getAvatarUrl } = useAuthStore();
  const avatarUrl = getAvatarUrl();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open (only on mobile)
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top promotional banner */}
      <div className={"bg-primary text-[15px] text-white" }>
        <div
          className={`${CONTAINER} flex flex-col gap-3 py-2 lg:flex-row lg:items-center lg:justify-between lg:py-3`}
        >
          {/* Utility links */}
          <div className="hidden flex-wrap items-center gap-6 text-white lg:flex">
            <a className="font-medium text-white transition hover:text-white/80" href="#">
              {t("utilityLinks.helpCenter")}
            </a>
            <a className="font-medium text-white transition hover:text-white/80" href="#">
              {t("utilityLinks.findStore")}
            </a>
            <a className="font-medium text-white transition hover:text-white/80" href="#">
              {t("utilityLinks.contact")}
            </a>
          </div>

          {/* Promotional message */}
          <p className="text-center text-sm font-medium text-white lg:text-[15px]">
            {t("promo")}
          </p>

          {/* Language selector and social icons */}
          <div className="hidden flex-wrap items-center justify-center gap-4 text-white lg:flex">
            <LanguageSwitcher />
            <div className="flex items-center">
              {socialIcons.map((social) => (
                <a
                  key={social}
                  className="inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
                  aria-label={social}
                  href="#"
                >
                  {icons[social]({ className: "text-white" })}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky header */}
      <header
        className={`sticky top-0 z-[60] bg-white transition-shadow duration-200 border-b border-zinc-200 ${
          isSticky && !isMobileMenuOpen ? "shadow-sm" : ""
        }`}
      >
        {/* Main header bar */}
        <div
          className={`${CONTAINER} flex flex-wrap items-center gap-x-2 gap-y-3 transition-all lg:flex-nowrap lg:gap-x-0 lg:gap-y-4 ${
            isSticky ? "py-3 lg:py-4" : "py-3 lg:py-5"
          }`}
        >
          {/* Menu button (always visible on mobile, visible when sticky on desktop) */}
          <button
            className={`flex items-center justify-center overflow-hidden rounded-full border border-transparent text-dark transition-all duration-200 h-10 w-10 opacity-100 ${
              isSticky ? "lg:mr-4" : "lg:mr-0 lg:h-0 lg:w-0 lg:opacity-0"
            }`}
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            tabIndex={isSticky ? 0 : -1}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen
              ? icons.close({ className: "text-dark" })
              : icons.hamburger({ className: "text-dark" })}
          </button>

          {/* Logo */}
          <div className="text-2xl font-black uppercase tracking-tight text-dark lg:mr-[54px] lg:text-[32px]">
            Nimble
          </div>

          {/* Search bar */}
          <div className="order-3 flex w-full items-center gap-2 rounded-full bg-light-gray px-4 py-2.5 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:order-2 lg:gap-4 lg:px-6 lg:py-3 lg:flex-1">
            <button
              className="flex items-center gap-1 border-0 bg-transparent text-[15px] font-semibold text-black outline-none [appearance:none]"
              type="button"
            >
              <span className="hidden lg:inline">{t("search.allCategories")}</span>
              <span className="lg:hidden">{t("search.all")}</span>
              {icons.chevron()}
            </button>
            <span className="hidden h-6 w-px bg-zinc-300 sm:block" />
            <input
              className="w-full flex-1 border-0 bg-transparent text-sm text-black outline-none placeholder:text-black/60 lg:text-[15px] lg:placeholder:text-black"
              placeholder={t("search.placeholder")}
            />
            <span>{icons.search()}</span>
          </div>

          {/* Action links */}
          <div className="order-2 flex flex-1 items-center justify-end gap-3 text-[15px] text-dark-gray sm:order-3 lg:ml-4 lg:gap-6">
            {/* Find a store */}
            <button
              className="flex items-center gap-2 font-semibold transition hover:text-black"
              type="button"
              aria-label={t("actions.findStore")}
            >
              {icons.location({ className: "size-6 text-dark-gray" })}
              <span className="hidden lg:inline">{t("actions.findStore")}</span>
            </button>

            {/* User profile / Sign in */}
            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 font-semibold transition hover:text-black"
              >
                {avatarUrl ? (
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-light-gray">
                    <img
                      src={avatarUrl}
                      alt={user.user_metadata?.first_name || user.email?.split("@")[0] || "User"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  icons.user({ className: "size-6 text-dark-gray" })
                )}
                <span className="hidden lg:inline">
                  {user.user_metadata?.first_name || user.email?.split("@")[0]}
                </span>
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center gap-2 font-semibold transition hover:text-black"
              >
                {icons.user({ className: "size-6 text-dark-gray" })}
                <span className="hidden lg:inline">{t("actions.signInRegister")}</span>
              </Link>
            )}

            {/* Bag */}
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-light-gray text-black font-semibold transition hover:text-black"
              type="button"
              aria-label={t("actions.bag")}
            >
              {icons.bag({ className: "text-black" })}
            </button>
          </div>
        </div>

        {/* Desktop Navigation (hidden when sticky unless menu is open) */}
        <div
          className={`hidden border-b border-zinc-200 transition-all duration-300 ease-in-out lg:block ${
            isSticky && !isMobileMenuOpen
              ? "max-h-0 overflow-hidden opacity-0"
              : "max-h-20 opacity-100"
          }`}
        >
          <nav className={`${CONTAINER} flex flex-wrap items-center gap-6 pb-3 text-[15px] font-bold text-dark-gray`}>
            <a className="group relative inline-flex items-center gap-1 pb-2 transition hover:text-black" href="#">
              <span aria-hidden className={underlineAnimation} />
              <span className="flex items-center gap-1">
                {t("navigation.shopByCategories")}
                <span>{icons.chevron()}</span>
              </span>
            </a>
            <a className="group relative inline-flex items-center gap-1 pb-2 transition hover:text-black" href="#">
              <span aria-hidden className={underlineAnimation} />
              <span className="flex items-center gap-1">
                {t("navigation.shopByRoom")}
                <span>{icons.chevron()}</span>
              </span>
            </a>
            <a className="group relative inline-flex items-center gap-1 pb-2 transition text-black" href="#">
              <span aria-hidden className={underlineAnimation} />
              <span className="flex items-center gap-1">
                {t("navigation.tablesDesks")}
                <span>{icons.chevron()}</span>
              </span>
            </a>
            <a className="group relative inline-flex items-center gap-1 pb-2 transition hover:text-black" href="#">
              <span aria-hidden className={underlineAnimation} />
              <span className="flex items-center gap-1">
                {t("navigation.chairsStools")}
                <span>{icons.chevron()}</span>
              </span>
            </a>
            <a className="group relative inline-flex items-center gap-1 pb-2 transition hover:text-black" href="#">
              <span aria-hidden className={underlineAnimation} />
              <span className="flex items-center gap-1">
                {t("navigation.pages")}
                <span>{icons.chevron()}</span>
              </span>
            </a>
            <a className="group relative inline-flex items-center gap-1 pb-2 transition hover:text-black" href="#">
              <span aria-hidden className={underlineAnimation} />
              <span className="flex items-center gap-1">
                {t("navigation.themeFeatures")}
                <span>{icons.chevron()}</span>
              </span>
            </a>
            <span className="group relative inline-flex items-center gap-1 pb-2 text-sale">
              <span aria-hidden className={underlineAnimation} />
              {t("navigation.onSale")}
              <span className="text-sale">{icons.sparkle()}</span>
            </span>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Mobile Navigation Links */}
          <nav className="fixed left-0 right-0 top-[126px] bottom-0 z-40 flex flex-col bg-white lg:hidden overflow-y-auto">
            <a className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold text-black transition hover:bg-light-gray/30" href="#">
              <span>{t("navigation.shopByCategories")}</span>
              <span>{icons.chevron()}</span>
            </a>
            <a className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold text-black transition hover:bg-light-gray/30" href="#">
              <span>{t("navigation.shopByRoom")}</span>
              <span>{icons.chevron()}</span>
            </a>
            <a className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold text-black transition hover:bg-light-gray/30" href="#">
              <span>{t("navigation.tablesDesks")}</span>
              <span>{icons.chevron()}</span>
            </a>
            <a className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold text-black transition hover:bg-light-gray/30" href="#">
              <span>{t("navigation.chairsStools")}</span>
              <span>{icons.chevron()}</span>
            </a>
            <a className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold text-black transition hover:bg-light-gray/30" href="#">
              <span>{t("navigation.pages")}</span>
              <span>{icons.chevron()}</span>
            </a>
            <a className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold text-black transition hover:bg-light-gray/30" href="#">
              <span>{t("navigation.themeFeatures")}</span>
              <span>{icons.chevron()}</span>
            </a>
            <a
              className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold transition hover:bg-light-gray/30"
              href="#"
            >
              <span className="text-sale">* {t("navigation.onSale")} *</span>
            </a>

            {/* Additional Action Items */}
            <a
              className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 text-[15px] font-semibold text-black transition hover:bg-light-gray/30 mt-8"
              href="#"
            >
              {icons.location({ className: "size-6 text-dark-gray" })}
              <span>{t("actions.findStore")}</span>
            </a>
            {user ? (
              <Link
                className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 text-[15px] font-semibold text-black transition hover:bg-light-gray/30"
                href="/profile"
              >
                {avatarUrl ? (
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-light-gray">
                    <img
                      src={avatarUrl}
                      alt={user.user_metadata?.first_name || user.email?.split("@")[0] || "User"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  icons.user({ className: "size-6 text-dark-gray" })
                )}
                <span>
                  {user.user_metadata?.first_name || user.email?.split("@")[0]} - {t("navigation.myProfile")}
                </span>
              </Link>
            ) : (
              <Link
                className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 text-[15px] font-semibold text-black transition hover:bg-light-gray/30"
                href="/auth/signin"
              >
                {icons.user({ className: "size-6 text-dark-gray" })}
                <span>{t("actions.signInRegister")}</span>
              </Link>
            )}

            {/* Language Selector */}
            <LanguageSwitcher variant="mobile" className="border-t border-zinc-100 mt-4" />

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 px-4 py-4">
              {socialIcons.map((social) => (
                <a
                  key={social}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300 text-black transition hover:border-black hover:text-black"
                  aria-label={social}
                  href="#"
                >
                  {icons[social]({ className: "h-6 w-6" })}
                </a>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
