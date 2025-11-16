"use client";

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";

// Design tokens
const TYPOGRAPHY = {
  heading: "text-[32px] font-bold leading-tight",
  description: "text-[16px] leading-relaxed",
  button: "text-[15px] font-semibold",
  badgeText: "text-[20px] font-bold",
  badgeSave: "text-[13px] font-semibold",
} as const;

const COLORS = {
  pinkBg: "bg-[#F5E6E8]",
  mintBg: "bg-[#E8F3EE]",
  yellowBadge: "bg-[#E8ED6B]",
  redBadge: "bg-[#E63946]",
  blackText: "text-black",
  grayText: "text-zinc-600",
  whiteText: "text-white",
  blackButton: "bg-black",
} as const;

const SIZES = {
  badgeSize: "h-24 w-24",
} as const;

type PromoBanner = {
  id: number;
  title: string;
  description: string;
  discount: string;
  badgeColor: string;
  backgroundColor: string;
  badgeTextColor: string;
  buttonLink: string;
  emoji: string;
};


export function PromoBanners() {
  const t = useTranslation();

  const banners: PromoBanner[] = [
    {
      id: 1,
      title: t.promoBanners.banners[0].title,
      description: t.promoBanners.banners[0].description,
      discount: t.promoBanners.banners[0].discount,
      badgeColor: COLORS.yellowBadge,
      backgroundColor: COLORS.pinkBg,
      badgeTextColor: COLORS.blackText,
      buttonLink: "/products/turn-chairs",
      emoji: "🪑",
    },
    {
      id: 2,
      title: t.promoBanners.banners[1].title,
      description: t.promoBanners.banners[1].description,
      discount: t.promoBanners.banners[1].discount,
      badgeColor: COLORS.redBadge,
      backgroundColor: COLORS.mintBg,
      badgeTextColor: COLORS.whiteText,
      buttonLink: "/products/cross-chairs",
      emoji: "🪑",
    },
  ];

  return (
    <section className="px-4 pt-8 lg:pt-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`relative overflow-hidden rounded-3xl ${banner.backgroundColor} p-6 lg:p-10`}
          >
            <div className="relative z-10 flex flex-col justify-between gap-6">
              {/* Content */}
              <div className="space-y-3 lg:space-y-4">
                <h2 className="text-[22px] font-bold leading-tight text-black lg:text-[32px]">
                  {banner.title}
                </h2>
                <p className="max-w-xs text-sm leading-relaxed text-zinc-600 lg:text-[16px]">
                  {banner.description}
                </p>
              </div>

              {/* Button */}
              <div>
                <Link
                  href={banner.buttonLink}
                  className={`inline-flex items-center justify-center rounded-full ${COLORS.blackButton} px-8 py-4 ${TYPOGRAPHY.button} ${COLORS.whiteText} transition-all hover:bg-zinc-800`}
                >
                  {t.promoBanners.banners[0].cta}
                </Link>
              </div>
            </div>

            {/* Product Image - Emoji Placeholder */}
            <div className="absolute bottom-0 right-8 top-1/2 flex -translate-y-1/2 items-center text-[180px]">
              {banner.emoji}
            </div>

            {/* Discount Badge */}
            <div
              className={`absolute right-8 top-8 flex ${SIZES.badgeSize} flex-col items-center justify-center rounded-full ${banner.badgeColor} shadow-lg`}
            >
              <span
                className={`${TYPOGRAPHY.badgeSave} ${banner.badgeTextColor}`}
              >
                {t.promoBanners.banners[0].label}
              </span>
              <span
                className={`${TYPOGRAPHY.badgeText} ${banner.badgeTextColor} leading-none`}
              >
                {banner.discount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
