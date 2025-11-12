import Image from "next/image";
import Link from "next/link";

// Design tokens
const SPACING = {
  sectionY: "py-16",
  itemGap: "mt-10",
  headingGap: "space-y-6",
  subHeadingGap: "space-y-4",
} as const;

const TYPOGRAPHY = {
  eyebrow: "text-[16px] font-bold",
  heading: "text-[40px] font-bold leading-[1.1]",
  subheading: "text-[40px] font-bold leading-[1.2]",
  body: "text-[15px] font-normal leading-relaxed",
  button: "text-[15px] font-semibold",
} as const;

const SIZES = {
  thumbnail: { width: 88, height: 88 },
  heroImage: { mobile: 500, desktop: 620 },
} as const;

type Collection = {
  name: string;
  items: string[];
  description: string;
  thumbnails: string[];
  heroImage: string;
  link: string;
};

const collections: Collection[] = [
  {
    name: "Heritage Living",
    items: ["The Haven Collection", "Solace Series"],
    description:
      "With a shape inspired by the bollards used to secure vessels to a jetty",
    thumbnails: ["🪑", "🛋️", "🪑", "💺"],
    heroImage:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
    link: "/collections/heritage-living",
  },
];

const THUMBNAIL_LABELS = ["Chair", "Sofa", "Chair", "Seat"] as const;

export function FeaturedCollections() {
  const collection = collections[0];

  return (
    <section className={`px-4 ${SPACING.sectionY}`}>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Column - Content */}
        <div className="flex flex-col lg:pl-8">
          <div className={SPACING.headingGap}>
            <p className={`${TYPOGRAPHY.eyebrow} text-black`}>
              Featured Collections
            </p>
            <div className={SPACING.subHeadingGap}>
              <h2 className={`${TYPOGRAPHY.heading} text-black underline`}>
                {collection.name}
              </h2>
              <div className="space-y-0">
                {collection.items.map((item, idx) => (
                  <p
                    key={`${item}-${idx}`}
                    className={`${TYPOGRAPHY.subheading} text-zinc-400`}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Product Thumbnails */}
          <div className={`${SPACING.itemGap} flex gap-3`}>
            {collection.thumbnails.map((thumbnail, index) => (
              <div
                key={`${thumbnail}-${index}`}
                className={`flex h-[${SIZES.thumbnail.height}px] w-[${SIZES.thumbnail.width}px] items-center justify-center rounded-xl bg-zinc-50 text-4xl transition-transform hover:scale-105`}
              >
                <span role="img" aria-label={THUMBNAIL_LABELS[index]}>
                  {thumbnail}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p
            className={`${SPACING.itemGap} max-w-sm ${TYPOGRAPHY.body} text-zinc-600`}
          >
            {collection.description}
          </p>

          {/* CTA Button */}
          <div className={SPACING.itemGap}>
            <Link
              href={collection.link}
              className={`inline-flex items-center justify-center rounded-full bg-black px-10 py-3 ${TYPOGRAPHY.button} text-white transition-all hover:bg-zinc-800`}
              aria-label={`Shop ${collection.name} collection`}
            >
              Shop Collection
            </Link>
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <div
          className={`relative h-[${SIZES.heroImage.mobile}px] overflow-hidden rounded-3xl lg:h-[${SIZES.heroImage.desktop}px]`}
        >
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
