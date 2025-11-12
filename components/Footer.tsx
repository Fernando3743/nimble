import Link from "next/link";
import { icons } from "@/components/icons";

// Design tokens
const TYPOGRAPHY = {
  contactHeading: "text-[15px] font-bold",
  contactText: "text-[15px]",
  newsletterHeading: "text-[28px] font-bold",
  newsletterDescription: "text-[15px]",
  footerLink: "text-[15px]",
  footerHeading: "text-[16px] font-bold",
  copyright: "text-[13px]",
  termsLink: "text-[13px] font-semibold",
} as const;

const COLORS = {
  bgLight: "bg-zinc-50",
  textBlack: "text-black",
  textGray: "text-zinc-600",
  borderGray: "border-zinc-200",
  bgBlack: "bg-black",
  textWhite: "text-white",
} as const;

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      {/* Contact Info Section */}
      <div className={`${COLORS.bgLight} border-b ${COLORS.borderGray} px-4 py-8`}>
        <div className="mx-auto grid max-w-[1330px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Customer Service */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icons.chat({ className: "size-7 text-blue-600" })}
            </div>
            <div>
              <h3 className={`${TYPOGRAPHY.contactHeading} ${COLORS.textBlack} mb-1`}>
                Customer Service
              </h3>
              <p className={`${TYPOGRAPHY.contactText} ${COLORS.textGray}`}>
                Mon-Sat, 9am-6pm EST.
              </p>
            </div>
          </div>

          {/* Call Us */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icons.phone({ className: "size-7 text-blue-600" })}
            </div>
            <div>
              <h3 className={`${TYPOGRAPHY.contactHeading} ${COLORS.textBlack} mb-1`}>
                Call Us
              </h3>
              <p className={`${TYPOGRAPHY.contactText} ${COLORS.textGray}`}>
                +1 888-234-1234 (toll-free)
              </p>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icons.paperPlane({ className: "size-7 text-blue-600" })}
            </div>
            <div>
              <h3 className={`${TYPOGRAPHY.contactHeading} ${COLORS.textBlack} mb-1`}>
                Get in Touch
              </h3>
              <Link
                href="mailto:touch@garacestore.com"
                className={`${TYPOGRAPHY.contactText} ${COLORS.textGray} underline hover:text-black`}
              >
                touch@garacestore.com
              </Link>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icons.location({ className: "size-7 text-blue-600" })}
            </div>
            <div>
              <h3 className={`${TYPOGRAPHY.contactHeading} ${COLORS.textBlack} mb-1`}>
                Address
              </h3>
              <p className={`${TYPOGRAPHY.contactText} ${COLORS.textGray}`}>
                382 NE 191st St # 87394 Miami
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-[1330px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-[200px]">
            {/* Newsletter Section */}
            <div className="lg:w-[465px] lg:flex-shrink-0">
              <h2 className={`${TYPOGRAPHY.newsletterHeading} ${COLORS.textBlack} mb-4`}>
                Join Our Newsletter
              </h2>
              <p className={`${TYPOGRAPHY.newsletterDescription} ${COLORS.textGray} mb-6`}>
                Sign up to our newsletter & receive 10% off your first order.
              </p>

              {/* Email Form */}
              <form className="mb-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-6 py-3 text-[15px] focus:border-zinc-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className={`rounded-full ${COLORS.bgBlack} px-8 py-3 text-[15px] font-semibold ${COLORS.textWhite} transition-colors hover:bg-zinc-800`}
                >
                  Sign Up
                </button>
              </form>

              <p className={`${TYPOGRAPHY.contactText} ${COLORS.textGray} text-[13px]`}>
                By subscribing you agree to the{" "}
                <Link href="/terms" className="underline">
                  Terms of Services
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Footer Links */}
            <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Company */}
              <div>
                <h3 className={`${TYPOGRAPHY.footerHeading} ${COLORS.textBlack} mb-4`}>
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faqs"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/stores"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Find a Store
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Collection */}
              <div>
                <h3 className={`${TYPOGRAPHY.footerHeading} ${COLORS.textBlack} mb-4`}>
                  Collection
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/collections/tables"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Tables
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/bow-chairs"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Bow Chairs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/turn-table"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Turn Table
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/turn-chair"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Turn Chair
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/cross-bar-chair"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Cross Bar Chair
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Shop */}
              <div>
                <h3 className={`${TYPOGRAPHY.footerHeading} ${COLORS.textBlack} mb-4`}>
                  Shop
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/shop/sofas"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Sofas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/outdoor"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Outdoor
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/seating"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Seating
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/lighting"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Lighting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/accessories"
                      className={`${TYPOGRAPHY.footerLink} ${COLORS.textGray} hover:text-black`}
                    >
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-zinc-200 px-4 py-8">
        <div className="mx-auto max-w-[1330px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Side */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              {/* Country Selector */}
              <button className="flex items-center gap-2 text-[15px] font-medium">
                <span>🇺🇸</span>
                <span>United States (USD $)</span>
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
              <div className="flex items-center gap-2">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.1875 13.5223V21H13.2656V13.5223H16.3066L16.9395 10.084H13.2656V8.86758C13.2656 7.05 13.9793 6.35391 15.8215 6.35391C16.3945 6.35391 16.8551 6.36797 17.1223 6.39609V3.27773C16.6195 3.14062 15.3891 3 14.6789 3C10.9207 3 9.1875 4.77539 9.1875 8.60391V10.084H6.86719V13.5223H9.1875Z" />
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.04221 4L9.72655 12.9408L3 20.21H4.51388L10.403 13.8457L15.1612 20.21H20.313L13.2525 10.7663L19.5135 4H17.9997L12.5761 9.86141L8.19399 4H3.04221Z" />
                  </svg>
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.2664 17.2589C11.6014 17.2589 12.6837 16.3032 12.6837 14.8417V4H15.5826C15.42 5.97723 17.3855 7.88718 19.5532 7.8435V10.5695C17.6994 10.5695 16.123 9.78561 15.5743 9.35059V14.8417C15.5743 17.2589 13.6728 20 10.2664 20C6.8601 20 5 17.2589 5 14.8417C5 11.43 8.61044 9.45136 11.0017 9.93497V12.7115C10.8814 12.669 10.5712 12.6061 10.3069 12.6061C8.96086 12.5564 7.8492 13.6482 7.8492 14.8417C7.8492 16.1767 8.93143 17.2589 10.2664 17.2589Z" />
                  </svg>
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link>
              </div>

              {/* Copyright & Links */}
              <div className="flex flex-col gap-2 sm:items-end">
                <p className={`${TYPOGRAPHY.copyright} ${COLORS.textGray}`}>
                  © 2025 Hyper Garace. Powered by Shopify
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/terms"
                    className={`${TYPOGRAPHY.termsLink} ${COLORS.textBlack} hover:underline`}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy"
                    className={`${TYPOGRAPHY.termsLink} ${COLORS.textBlack} hover:underline`}
                  >
                    Privacy Policy
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
