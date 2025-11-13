import Image from "next/image";

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
    <section className="bg-white px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1330px]">
        {/* Heading */}
        <h2 className="mb-6 text-center text-[24px] font-bold leading-[1.2] text-black lg:mb-8 lg:text-[32px]">
          This approach resulted in the
          <br />
          beautiful structure
        </h2>

        {/* Badges */}
        <div className="mb-8 flex gap-3 overflow-x-auto scrollbar-hide lg:mb-12 lg:flex-wrap lg:justify-center">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-shrink-0 items-center gap-2 rounded-full bg-[#E8ED6B] px-6 py-3"
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
              <span className="text-[15px] font-bold text-black">
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide lg:grid lg:grid-cols-4 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="w-[164px] flex-shrink-0 lg:w-auto">
              {/* Image */}
              <div className="relative mb-4 h-[164px] overflow-hidden rounded-2xl lg:mb-6 lg:h-[400px]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-2 lg:space-y-3">
                <h3 className="text-[16px] font-bold text-black lg:text-[22px]">
                  {feature.title}
                </h3>
                <p className="text-[15px] font-medium leading-relaxed text-[#666666]">
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
