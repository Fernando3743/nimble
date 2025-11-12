import Link from "next/link";
import Image from "next/image";
import { icons } from "@/components/icons";

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
  text: string;
};

const features: Feature[] = [
  {
    id: 1,
    icon: "location",
    text: "Product locally in New York",
  },
  {
    id: 2,
    icon: "smiley",
    text: "4.8 Review Score",
  },
  {
    id: 3,
    icon: "stool",
    text: "Over 50 Products",
  },
];

export function MeetOurTeam() {
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
        <div className="flex flex-col justify-center space-y-6">
          {/* Eyebrow */}
          <p className={`${TYPOGRAPHY.eyebrow} ${COLORS.textBlack}`}>
            Meet Our Team
          </p>

          {/* Heading */}
          <h2 className={`${TYPOGRAPHY.heading} ${COLORS.textBlack}`}>
            The creative minds behind our studio
          </h2>

          {/* Description */}
          <p className={`${TYPOGRAPHY.body} ${COLORS.textGray}`}>
            As designers we are constantly thinking about how people live and
            what problems we could solve for them.
          </p>

          {/* Features List */}
          <div className="space-y-4 pt-4">
            {features.map((feature) => {
              const Icon = icons[feature.icon];
              return (
                <div key={feature.id} className="flex items-center gap-3">
                  <Icon className="size-6 shrink-0 text-black" />
                  <span className={`${TYPOGRAPHY.feature} ${COLORS.textBlack}`}>
                    {feature.text}
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
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
