"use client";

import { icons } from "@/components/icons";
import { useEffect, useState } from "react";

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top promotional banner */}
      <div className="bg-primary text-[15px] text-white">
        <div
          className={`${CONTAINER} flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between`}
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
          <p className="text-center font-medium text-white">
            ✌️ Free Express Shipping on orders $500!
          </p>

          {/* Country selector and social icons */}
          <div className="hidden flex-wrap items-center justify-center gap-4 text-white lg:flex">
            <div className="flex items-center gap-2 rounded-full px-3 py-1">
              <span className="text-lg leading-none">🇺🇸</span>
              <span className="font-medium">United States (USD $)</span>
              <span className="pt-0.5">{icons.chevronLight()}</span>
            </div>
            <div className="flex items-center text-white">
              {socialIcons.map((social) => (
                <a
                  key={social}
                  className="inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
                  aria-label={social}
                  href="#"
                >
                  {icons[social]()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          isSticky ? "border-b border-zinc-200 shadow-sm" : ""
        }`}
      >
        {/* Main header bar */}
        <div
          className={`${CONTAINER} flex flex-wrap items-center gap-x-4 gap-y-4 transition-all lg:flex-nowrap lg:gap-x-0 ${
            isSticky ? "py-4" : "py-5"
          }`}
        >
          {/* Menu button (visible when sticky) */}
          <button
            className={`flex items-center justify-center overflow-hidden rounded-full border border-transparent text-dark transition-all duration-200 ${
              isSticky ? "mr-4 h-10 w-10 opacity-100" : "mr-0 h-0 w-0 opacity-0"
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
          <div className="text-[32px] font-black uppercase tracking-tight text-dark lg:mr-[54px]">
            Nimble
          </div>

          {/* Search bar */}
          <div className="order-3 flex w-full items-center gap-4 rounded-full bg-light-gray px-6 py-3 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:order-2 sm:w-auto lg:flex-1">
            <button
              className="flex items-center gap-1 border-0 bg-transparent text-[15px] font-semibold text-black outline-none [appearance:none]"
              type="button"
            >
              All Categories
              {icons.chevron()}
            </button>
            <span className="h-6 w-px bg-zinc-300" />
            <input
              className="w-full flex-1 border-0 bg-transparent text-[15px] text-black outline-none placeholder:text-black"
              placeholder="What are you looking for?"
            />
            <span>{icons.search()}</span>
          </div>

          {/* Action links */}
          <div className="order-2 flex flex-1 items-center justify-end gap-6 text-[15px] text-dark-gray sm:order-3 lg:ml-4">
            {actionLinks.map((action) => {
              const isBag = action.icon === "bag";
              const isLocationOrUser = action.icon === "location" || action.icon === "user";
              return (
                <button
                  key={action.label}
                  className={`flex items-center font-semibold transition hover:text-black ${
                    isBag
                      ? "h-12 w-12 justify-center rounded-full bg-light-gray text-black"
                      : "gap-2"
                  }`}
                  type="button"
                  aria-label={isBag ? action.label : undefined}
                >
                  {icons[action.icon]({
                    className: isBag
                      ? "text-black"
                      : isLocationOrUser
                      ? "size-6 text-dark-gray"
                      : "text-dark-gray",
                  })}
                  {!isBag && <span>{action.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation (hidden when sticky, unless mobile menu is open) */}
        <div
          className={`border-b border-zinc-200 transition-all duration-300 ease-in-out ${
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
    </>
  );
}
