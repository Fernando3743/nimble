import Image from "next/image";
import Link from "next/link";

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
    <section className="px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left Column - Content */}
        <div className="flex flex-col lg:pl-8">
          <div className="space-y-4 lg:space-y-6">
            <p className="text-sm font-bold lg:text-[16px] text-black">
              Featured Collections
            </p>
            <div className="space-y-2 lg:space-y-4">
              <h2 className="text-3xl font-bold leading-tight text-black underline lg:text-[40px] lg:leading-[1.1]">
                {collection.name}
              </h2>
              <div className="space-y-0">
                {collection.items.map((item, idx) => (
                  <p
                    key={`${item}-${idx}`}
                    className="text-3xl font-bold leading-tight text-zinc-400 lg:text-[40px] lg:leading-[1.2]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image - Mobile Only */}
          <div className="relative mt-6 h-[400px] overflow-hidden rounded-3xl lg:hidden">
            <Image
              src={collection.heroImage}
              alt={collection.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Thumbnails */}
          <div className="mt-6 flex gap-3 lg:mt-10">
            {collection.thumbnails.map((thumbnail, index) => (
              <div
                key={`${thumbnail}-${index}`}
                className="flex h-[88px] w-[88px] items-center justify-center rounded-xl bg-zinc-50 text-4xl transition-transform hover:scale-105"
              >
                <span role="img" aria-label={THUMBNAIL_LABELS[index]}>
                  {thumbnail}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-600 lg:mt-10 lg:text-[15px]">
            {collection.description}
          </p>

          {/* CTA Button */}
          <div className="mt-6 lg:mt-10">
            <Link
              href={collection.link}
              className="inline-flex items-center justify-center rounded-full bg-black px-10 py-3 text-[15px] font-semibold text-white transition-all hover:bg-zinc-800"
              aria-label={`Shop ${collection.name} collection`}
            >
              Shop Collection
            </Link>
          </div>
        </div>

        {/* Right Column - Hero Image (Desktop Only) */}
        <div className="relative hidden h-[620px] overflow-hidden rounded-3xl lg:block">
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
