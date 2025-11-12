import Image from "next/image";

// Design tokens
const TYPOGRAPHY = {
  heading: "text-[32px] font-bold leading-[1.2] text-center",
  badge: "text-[15px] font-bold",
  cardTitle: "text-[22px] font-bold",
  cardDescription: "text-[15px] font-medium leading-relaxed",
} as const;

const COLORS = {
  bgWhite: "bg-white",
  bgYellow: "bg-[#E8ED6B]",
  textBlack: "text-black",
  textGray: "text-[#666666]",
} as const;

type Badge = {
  id: number;
  text: string;
};

type Feature = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const badges: Badge[] = [
  { id: 1, text: "All Eco-Certified" },
  { id: 2, text: "Product Protection" },
  { id: 3, text: "Make It Yours" },
  { id: 4, text: "Unique Tailored" },
];

const features: Feature[] = [
  {
    id: 1,
    title: "Comfortable",
    description:
      "Bow Chair is available in Natural or Black-stained Oak with full EU Ecolabel certification.",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Price transparency",
    description:
      "Fair pricing ensures you know exactly what you're paying for, with no hidden costs or markups.",
    image:
      "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "All eco-certified",
    description:
      "All products consider a more holistic environmental impact and are designed for a longer lifetime in a way.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Sustainability",
    description:
      "Committed to sustainable practices, ethical sourcing, and reducing environmental impact.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
  },
];

export function ApproachFeatures() {
  return (
    <section className={`${COLORS.bgWhite} px-4 py-16`}>
      <div className="mx-auto max-w-[1330px]">
        {/* Heading */}
        <h2 className={`${TYPOGRAPHY.heading} ${COLORS.textBlack} mb-8`}>
          This approach resulted in the
          <br />
          beautiful structure
        </h2>

        {/* Badges */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex items-center gap-2 rounded-full ${COLORS.bgYellow} px-6 py-3`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className={`${TYPOGRAPHY.badge} ${COLORS.textBlack}`}>
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col">
              {/* Image */}
              <div className="relative mb-6 h-[400px] overflow-hidden rounded-2xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className={`${TYPOGRAPHY.cardTitle} ${COLORS.textBlack}`}>
                  {feature.title}
                </h3>
                <p
                  className={`${TYPOGRAPHY.cardDescription} ${COLORS.textGray}`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
