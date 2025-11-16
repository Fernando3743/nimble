"use client";

import { icons } from "@/components/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

// Constants
const CONTAINER = "w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[50px]";
const SCROLL_THRESHOLD = 10;

// Navigation data
const utilityLinks = ["Help Center", "Find a Store", "Contact"];

const navLinks = [
  { label: "Shop By Categories", dropdown: true },
  { label: "Shop By Room", dropdown: true },
  { label: "Tables & Desks", dropdown: true },
  { label: "Chairs & Stools", dropdown: true },
  { label: "Pages", dropdown: true },
  { label: "Theme Features", dropdown: true },
] as const;

const activeNav = "Tables & Desks";

const actionLinks = [
  { label: "Find a store", icon: "location" },
  { label: "Sign in / Register", icon: "user" },
  { label: "Bag", icon: "bag" },
] as const;

const socialIcons = ["facebook", "x", "instagram", "tiktok"] as const;

// Reusable class patterns
const underlineAnimation =
  "absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100";

export function Header() {
  const { user, avatarUrl, initAuth } = useAuthStore();
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

  // Initialize auth on mount
  useEffect(() => {
    initAuth();
  }, [initAuth]);

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
            {utilityLinks.map((link) => (
              <a
                key={link}
                className="font-medium text-white transition hover:text-white/80"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Promotional message */}
          <p className="text-center text-sm font-medium text-white lg:text-[15px]">
            ✌️ Free Express Shipping on orders $500!
          </p>

          {/* Country selector and social icons */}
          <div className="hidden flex-wrap items-center justify-center gap-4 text-white lg:flex">
            <div className="flex items-center gap-2 rounded-full px-3 py-1">
              <span className="text-lg leading-none">🇺🇸</span>
              <span className="font-medium">United States (USD $)</span>
              <span className="pt-0.5">{icons.chevronLight()}</span>
            </div>
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
              <span className="hidden lg:inline">All Categories</span>
              <span className="lg:hidden">All</span>
              {icons.chevron()}
            </button>
            <span className="hidden h-6 w-px bg-zinc-300 sm:block" />
            <input
              className="w-full flex-1 border-0 bg-transparent text-sm text-black outline-none placeholder:text-black/60 lg:text-[15px] lg:placeholder:text-black"
              placeholder="What are you looking for?"
            />
            <span>{icons.search()}</span>
          </div>

          {/* Action links */}
          <div className="order-2 flex flex-1 items-center justify-end gap-3 text-[15px] text-dark-gray sm:order-3 lg:ml-4 lg:gap-6">
            {actionLinks.map((action) => {
              const isBag = action.icon === "bag";
              const isUser = action.icon === "user";
              const isLocationOrUser = action.icon === "location" || action.icon === "user";

              if (isUser) {
                // Show user menu if logged in
                if (user) {
                  const userEmail = user.email || "";
                  const userName = user.user_metadata?.first_name || userEmail.split("@")[0];

                  return (
                    <Link
                      key={action.label}
                      href="/profile"
                      className="flex items-center gap-2 font-semibold transition hover:text-black"
                    >
                      {avatarUrl ? (
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-light-gray">
                          <img
                            src={avatarUrl}
                            alt={userName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        icons[action.icon]({
                          className: "size-6 text-dark-gray",
                        })
                      )}
                      <span className="hidden lg:inline">{userName}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={action.label}
                    href="/auth/signin"
                    className="flex items-center gap-2 font-semibold transition hover:text-black"
                  >
                    {icons[action.icon]({
                      className: "size-6 text-dark-gray",
                    })}
                    <span className="hidden lg:inline">{action.label}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={action.label}
                  className={`flex items-center font-semibold transition hover:text-black ${
                    isBag
                      ? "h-12 w-12 justify-center rounded-full bg-light-gray text-black"
                      : "gap-2"
                  }`}
                  type="button"
                  aria-label={action.label}
                >
                  {icons[action.icon]({
                    className: isBag
                      ? "text-black"
                      : isLocationOrUser
                      ? "size-6 text-dark-gray"
                      : "text-dark-gray",
                  })}
                  {!isBag && <span className="hidden lg:inline">{action.label}</span>}
                </button>
              );
            })}
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={`group relative inline-flex items-center gap-1 pb-2 transition ${
                  link.label === activeNav ? "text-black" : "hover:text-black"
                }`}
                href="#"
              >
                <span aria-hidden className={underlineAnimation} />
                <span className="flex items-center gap-1">
                  {link.label}
                  {link.dropdown && <span>{icons.chevron()}</span>}
                </span>
              </a>
            ))}
            <span className="group relative inline-flex items-center gap-1 pb-2 text-sale">
              <span aria-hidden className={underlineAnimation} />
              On Sale
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold text-black transition hover:bg-light-gray/30"
                href="#"
              >
                <span>{link.label}</span>
                {link.dropdown && <span>{icons.chevron()}</span>}
              </a>
            ))}
            <a
              className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 text-[15px] font-bold transition hover:bg-light-gray/30"
              href="#"
            >
              <span className="text-sale">* On Sale *</span>
            </a>

            {/* Additional Action Items */}
            <a
              className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 text-[15px] font-semibold text-black transition hover:bg-light-gray/30 mt-8"
              href="#"
            >
              {icons.location({ className: "size-6 text-dark-gray" })}
              <span>Find a store</span>
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
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  icons.user({ className: "size-6 text-dark-gray" })
                )}
                <span>
                  {user.user_metadata?.first_name || user.email?.split("@")[0]} - My Profile
                </span>
              </Link>
            ) : (
              <Link
                className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 text-[15px] font-semibold text-black transition hover:bg-light-gray/30"
                href="/auth/signin"
              >
                {icons.user({ className: "size-6 text-dark-gray" })}
                <span>Sign in/ Register</span>
              </Link>
            )}

            {/* Country Selector */}
            <button
              className="flex items-center gap-2 px-4 py-4 text-[15px] font-medium text-black transition hover:bg-light-gray/30"
              type="button"
            >
              <span className="text-lg leading-none">🇺🇸</span>
              <span className="flex-1 text-left">United States (USD $)</span>
              <span>{icons.chevron()}</span>
            </button>

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
