import Link from "next/link";
import { slugify } from "@/lib/utils";

// Design tokens
const SPACING = {
  sectionY: "pt-16",
  headerBottom: "mb-8",
} as const;

const TYPOGRAPHY = {
  heading: "text-[32px] font-bold",
  link: "text-[15px] font-medium",
  categoryName: "text-[15px] font-medium",
} as const;

const SIZES = {
  categoryCircle: { width: 110, height: 110 },
  categoryCard: { height: 201 },
  emoji: "text-5xl",
  saleText: "text-3xl",
} as const;

type Category = {
  id: number;
  name: string;
  emoji: string;
  emojiLabel: string;
  isSpecial?: boolean;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Sale Items",
    emoji: "💰",
    emojiLabel: "Money bag",
    isSpecial: true,
  },
  {
    id: 2,
    name: "Press Tables",
    emoji: "🪑",
    emojiLabel: "Chair",
  },
  {
    id: 3,
    name: "Lighting",
    emoji: "💡",
    emojiLabel: "Light bulb",
  },
  {
    id: 4,
    name: "Spoke Sofa",
    emoji: "🛋️",
    emojiLabel: "Couch and lamp",
  },
  {
    id: 5,
    name: "Storage",
    emoji: "📦",
    emojiLabel: "Package",
  },
  {
    id: 6,
    name: "Turn Chairs",
    emoji: "🪑",
    emojiLabel: "Chair",
  },
  {
    id: 7,
    name: "Longe Chairs",
    emoji: "💺",
    emojiLabel: "Seat",
  },
  {
    id: 8,
    name: "Curve Coat",
    emoji: "🧥",
    emojiLabel: "Coat",
  },
  {
    id: 9,
    name: "Cross Tables",
    emoji: "⭕",
    emojiLabel: "Circle",
  },
  {
    id: 10,
    name: "Bend Chairs",
    emoji: "🪑",
    emojiLabel: "Chair",
  },
  {
    id: 11,
    name: "Bar Chairs",
    emoji: "🍺",
    emojiLabel: "Beer mug",
  },
  {
    id: 12,
    name: "Accessories",
    emoji: "🎨",
    emojiLabel: "Artist palette",
  },
];

export function ShopByCategory() {
  return (
    <section className={`px-4 ${SPACING.sectionY}`}>
      <div className={`${SPACING.headerBottom} flex items-center justify-between`}>
        <h2 className={TYPOGRAPHY.heading}>Shop By Categories</h2>
        <Link
          href="/categories"
          className={`group flex items-center gap-2 ${TYPOGRAPHY.link}`}
          aria-label="View all product categories"
        >
          <span className="relative">
            Shop All Products
            <span className="absolute bottom-0 left-0 h-[1px] w-full origin-right scale-x-0 bg-black transition-transform duration-200 ease-out group-hover:origin-left group-hover:scale-x-100"></span>
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-xl border border-zinc-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${slugify(category.name)}`}
            className={`group flex h-[${SIZES.categoryCard.height}px] flex-col items-center justify-center gap-4 border border-zinc-200 transition-colors hover:bg-zinc-50`}
            aria-label={`Browse ${category.name}`}
          >
            <div
              className={`flex h-[${SIZES.categoryCircle.height}px] w-[${SIZES.categoryCircle.width}px] items-center justify-center overflow-hidden rounded-full bg-zinc-100 transition-transform group-hover:scale-105`}
            >
              {category.isSpecial ? (
                <div className="flex h-full w-full items-center justify-center bg-red-600">
                  <span className={`${SIZES.saleText} font-bold text-white`}>
                    Sale
                  </span>
                </div>
              ) : (
                <span
                  role="img"
                  aria-label={category.emojiLabel}
                  className={SIZES.emoji}
                >
                  {category.emoji}
                </span>
              )}
            </div>
            <h3
              className={`text-center ${TYPOGRAPHY.categoryName} text-black transition-colors group-hover:text-zinc-600`}
            >
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
