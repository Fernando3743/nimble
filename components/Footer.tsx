"use client";

import { useState } from "react";
import Link from "next/link";
import { icons } from "@/components/icons";
import { useTranslation } from "@/contexts/LanguageContext";

export function Footer() {
  const t = useTranslation();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <footer className="border-t border-zinc-200 bg-white">
      {/* Contact Info Section */}
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-6 lg:py-8">
        <div className="mx-auto grid max-w-[1330px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Customer Service */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icons.chat({ className: "size-6 text-blue-600 lg:size-7" })}
            </div>
            <div>
              <h3 className="mb-1 text-[15px] font-bold text-black">
                {t.footer.customerService.title}
              </h3>
              <p className="text-[15px] text-zinc-600">
                {t.footer.customerService.hours}
              </p>
            </div>
          </div>

          {/* Call Us */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icons.phone({ className: "size-6 text-blue-600 lg:size-7" })}
            </div>
            <div>
              <h3 className="mb-1 text-[15px] font-bold text-black">
                {t.footer.customerService.callUs}
              </h3>
              <p className="text-[15px] text-zinc-600">
                {t.footer.customerService.phone}
              </p>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icons.paperPlane({ className: "size-6 text-blue-600 lg:size-7" })}
            </div>
            <div>
              <h3 className="mb-1 text-[15px] font-bold text-black">
                {t.footer.customerService.getInTouch}
              </h3>
              <Link
                href={`mailto:${t.footer.customerService.email}`}
                className="text-[15px] text-zinc-600 underline hover:text-black"
              >
                {t.footer.customerService.email}
              </Link>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icons.location({ className: "size-6 text-blue-600 lg:size-7" })}
            </div>
            <div>
              <h3 className="mb-1 text-[15px] font-bold text-black">
                {t.footer.customerService.address}
              </h3>
              <p className="text-[15px] text-zinc-600">
                {t.footer.customerService.addressLine}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-[1330px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-[200px]">
            {/* Newsletter Section */}
            <div className="lg:w-[465px] lg:flex-shrink-0">
              <h2 className="mb-3 text-[22px] font-bold text-black lg:mb-4 lg:text-[28px]">
                {t.footer.newsletter.title}
              </h2>
              <p className="mb-4 text-[15px] text-zinc-600 lg:mb-6">
                {t.footer.newsletter.description}
              </p>

              {/* Email Form */}
              <form className="mb-4 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder={t.footer.newsletter.placeholder}
                  className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-6 py-3 text-[15px] focus:border-zinc-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-black px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  {t.footer.newsletter.button}
                </button>
              </form>

              <p className="text-[13px] text-zinc-600">
                {t.footer.newsletter.agreement}{" "}
                <Link href="/terms" className="underline">
                  {t.footer.newsletter.termsOfService}
                </Link>{" "}
                {t.footer.newsletter.and}{" "}
                <Link href="/privacy" className="underline">
                  {t.footer.newsletter.privacyPolicy}
                </Link>
                .
              </p>
            </div>

            {/* Footer Links */}
            <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Company */}
              <div className="border-b border-zinc-200 pb-6 lg:border-b-0 lg:pb-0">
                <button
                  onClick={() => toggleSection("company")}
                  className="flex w-full items-center justify-between text-[16px] font-bold text-black lg:pointer-events-none lg:mb-4"
                >
                  <span>{t.footer.company.title}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform lg:hidden ${
                      openSection === "company" ? "rotate-45" : ""
                    }`}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <ul
                  className={`space-y-3 overflow-hidden transition-all lg:!mt-0 lg:!block ${
                    openSection === "company" ? "mt-4 block" : "mt-0 hidden"
                  }`}
                >
                  <li>
                    <Link
                      href="/about"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.company.aboutUs}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.company.contact}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faqs"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.company.faqs}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.company.blog}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/stores"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.company.findStore}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Collection */}
              <div className="border-b border-zinc-200 pb-6 lg:border-b-0 lg:pb-0">
                <button
                  onClick={() => toggleSection("collection")}
                  className="flex w-full items-center justify-between text-[16px] font-bold text-black lg:pointer-events-none lg:mb-4"
                >
                  <span>{t.footer.collection.title}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform lg:hidden ${
                      openSection === "collection" ? "rotate-45" : ""
                    }`}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <ul
                  className={`space-y-3 overflow-hidden transition-all lg:!mt-0 lg:!block ${
                    openSection === "collection" ? "mt-4 block" : "mt-0 hidden"
                  }`}
                >
                  <li>
                    <Link
                      href="/collections/tables"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.collection.tables}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/bow-chairs"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.collection.bowChairs}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/turn-table"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.collection.turnTable}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/turn-chair"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.collection.turnChair}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/cross-bar-chair"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.collection.crossBarChair}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Shop */}
              <div className="border-b border-zinc-200 pb-6 lg:border-b-0 lg:pb-0">
                <button
                  onClick={() => toggleSection("shop")}
                  className="flex w-full items-center justify-between text-[16px] font-bold text-black lg:pointer-events-none lg:mb-4"
                >
                  <span>{t.footer.shop.title}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform lg:hidden ${
                      openSection === "shop" ? "rotate-45" : ""
                    }`}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <ul
                  className={`space-y-3 overflow-hidden transition-all lg:!mt-0 lg:!block ${
                    openSection === "shop" ? "mt-4 block" : "mt-0 hidden"
                  }`}
                >
                  <li>
                    <Link
                      href="/shop/sofas"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.shop.sofas}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/outdoor"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.shop.outdoor}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/seating"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.shop.seating}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/lighting"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.shop.lighting}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/accessories"
                      className="text-[15px] text-zinc-600 hover:text-black"
                    >
                      {t.footer.shop.accessories}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-zinc-200 px-4 py-6 lg:py-8">
        <div className="mx-auto max-w-[1330px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Side */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              {/* Country Selector */}
              <button className="flex items-center gap-2 text-[14px] font-medium lg:text-[15px]">
                <span>🇺🇸</span>
                <span>{t.footer.bottom.unitedStates}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Payment Methods */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-8 w-12 items-center justify-center rounded border border-zinc-200 bg-white text-[10px] font-bold text-blue-600">
                  VISA
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded border border-zinc-200 bg-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="12" r="6" fill="#EB001B" />
                    <circle cx="15" cy="12" r="6" fill="#F79E1B" />
                  </svg>
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded border border-zinc-200 bg-white text-[10px] font-bold text-blue-600">
                  AMEX
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded border border-zinc-200 bg-white text-[10px] font-bold text-blue-600">
                  P
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded border border-zinc-200 bg-white text-[10px] font-bold text-blue-600">
                  DC
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded border border-zinc-200 bg-white text-[10px] font-bold text-orange-600">
                  D
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              {/* Social Media */}
              <div className="flex items-center gap-3">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100 lg:h-10 lg:w-10"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lg:h-5 lg:w-5">
                    <path d="M9.1875 13.5223V21H13.2656V13.5223H16.3066L16.9395 10.084H13.2656V8.86758C13.2656 7.05 13.9793 6.35391 15.8215 6.35391C16.3945 6.35391 16.8551 6.36797 17.1223 6.39609V3.27773C16.6195 3.14062 15.3891 3 14.6789 3C10.9207 3 9.1875 4.77539 9.1875 8.60391V10.084H6.86719V13.5223H9.1875Z" />
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100 lg:h-10 lg:w-10"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lg:h-5 lg:w-5">
                    <path d="M3.04221 4L9.72655 12.9408L3 20.21H4.51388L10.403 13.8457L15.1612 20.21H20.313L13.2525 10.7663L19.5135 4H17.9997L12.5761 9.86141L8.19399 4H3.04221Z" />
                  </svg>
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100 lg:h-10 lg:w-10"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="lg:h-5 lg:w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100 lg:h-10 lg:w-10"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lg:h-5 lg:w-5">
                    <path d="M10.2664 17.2589C11.6014 17.2589 12.6837 16.3032 12.6837 14.8417V4H15.5826C15.42 5.97723 17.3855 7.88718 19.5532 7.8435V10.5695C17.6994 10.5695 16.123 9.78561 15.5743 9.35059V14.8417C15.5743 17.2589 13.6728 20 10.2664 20C6.8601 20 5 17.2589 5 14.8417C5 11.43 8.61044 9.45136 11.0017 9.93497V12.7115C10.8814 12.669 10.5712 12.6061 10.3069 12.6061C8.96086 12.5564 7.8492 13.6482 7.8492 14.8417C7.8492 16.1767 8.93143 17.2589 10.2664 17.2589Z" />
                  </svg>
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100 lg:h-10 lg:w-10"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="lg:h-5 lg:w-5"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link>
              </div>

              {/* Copyright & Links */}
              <div className="flex flex-col gap-2 sm:items-end">
                <p className="text-[13px] text-zinc-600">
                  {t.footer.bottom.copyright}
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/terms"
                    className="text-[13px] font-semibold text-black hover:underline"
                  >
                    {t.footer.bottom.termsOfService}
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-[13px] font-semibold text-black hover:underline"
                  >
                    {t.footer.bottom.privacyPolicy}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
