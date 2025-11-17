"use client";

import { Link } from "@/lib/i18n/routing";
import Image from "next/image";
import { icons } from "@/components/icons";
import { useTranslations } from "next-intl";

// Design tokens
const TYPOGRAPHY = {
  eyebrow: "text-[16px] font-bold",
  heading: "text-[40px] font-bold leading-[1.1]",
  body: "text-[15px] leading-relaxed",
  feature: "text-[18px] font-bold",
  button: "text-[15px] font-semibold",
  badgeText: "text-[11px] font-bold uppercase tracking-[0.15em]",
} as const;

const COLORS = {
  bgBeige: "bg-[#F5F5F0]",
  bgBlack: "bg-black",
  bgYellow: "bg-[#E8ED6B]",
  textBlack: "text-black",
  textGray: "text-[#666666]",
  textWhite: "text-white",
} as const;

type Feature = {
  id: number;
  icon: keyof typeof icons;
  translationKey: string;
};

const features: Feature[] = [
  {
    id: 1,
    icon: "location",
    translationKey: "feature1",
  },
  {
    id: 2,
    icon: "smiley",
    translationKey: "feature2",
  },
  {
    id: 3,
    icon: "stool",
    translationKey: "feature3",
  },
];

export function MeetOurTeam() {
  const t = useTranslations("home.meetOurTeam");
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-[1330px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[100px]">
        {/* Left Column - Image */}
        <div className="relative">
          {/* Team Image */}
          <div className="relative h-[500px] overflow-hidden rounded-3xl lg:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Meet our team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
          {/* Eyebrow */}
          <p className="text-sm font-bold lg:text-[16px] text-black">
            {t("eyebrow")}
          </p>

          {/* Heading */}
          <h2 className="text-[28px] font-bold leading-tight text-black lg:text-[40px] lg:leading-[1.1]">
            {t("heading")}
          </h2>

          {/* Description */}
          <p className="text-[15px] leading-relaxed text-[#666666]">
            {t("description")}
          </p>

          {/* Features List */}
          <div className="space-y-3 pt-3 lg:space-y-4 lg:pt-4">
            {features.map((feature) => {
              const Icon = icons[feature.icon];
              return (
                <div key={feature.id} className="flex items-center gap-3">
                  <Icon className="size-6 shrink-0 text-black" />
                  <span className="text-[16px] font-bold text-black lg:text-[18px]">
                    {t(feature.translationKey)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Contact Button */}
          <div className="pt-4">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center rounded-full ${COLORS.bgBlack} px-8 py-4 ${TYPOGRAPHY.button} ${COLORS.textWhite} transition-all hover:bg-zinc-800`}
            >
              {t("button")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
