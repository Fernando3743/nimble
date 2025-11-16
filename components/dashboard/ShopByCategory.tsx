"use client";

import Link from "next/link";
import { slugify } from "@/lib/utils";
import { useTranslation } from "@/contexts/LanguageContext";

type Category = {
  id: number;
  nameKey: keyof typeof import('@/dictionaries/en')['en']['shopByCategory']['categories'];
  emoji: string;
  emojiLabel: string;
  isSpecial?: boolean;
};

export function ShopByCategory() {
  const t = useTranslation();

  const categories: Category[] = [
    {
      id: 1,
      nameKey: "saleItems",
      emoji: "💰",
      emojiLabel: "Money bag",
      isSpecial: true,
    },
    {
      id: 2,
      nameKey: "pressTables",
      emoji: "🪑",
      emojiLabel: "Chair",
    },
    {
      id: 3,
      nameKey: "lighting",
      emoji: "💡",
      emojiLabel: "Light bulb",
    },
    {
      id: 4,
      nameKey: "spokeSofa",
      emoji: "🛋️",
      emojiLabel: "Couch and lamp",
    },
    {
      id: 5,
      nameKey: "storage",
      emoji: "📦",
      emojiLabel: "Package",
    },
    {
      id: 6,
      nameKey: "turnChairs",
      emoji: "🪑",
      emojiLabel: "Chair",
    },
    {
      id: 7,
      nameKey: "longeChairs",
      emoji: "💺",
      emojiLabel: "Seat",
    },
    {
      id: 8,
      nameKey: "curveCoat",
      emoji: "🧥",
      emojiLabel: "Coat",
    },
    {
      id: 9,
      nameKey: "crossTables",
      emoji: "⭕",
      emojiLabel: "Circle",
    },
    {
      id: 10,
      nameKey: "bendChairs",
      emoji: "🪑",
      emojiLabel: "Chair",
    },
    {
      id: 11,
      nameKey: "barChairs",
      emoji: "🍺",
      emojiLabel: "Beer mug",
    },
    {
      id: 12,
      nameKey: "accessories",
      emoji: "🎨",
      emojiLabel: "Artist palette",
    },
  ];

  return (
    <section className="px-4 pt-8 lg:pt-16">
      <div className="mb-6 lg:mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold lg:text-[32px]">{t.shopByCategory.title}</h2>
        <Link
          href="/categories"
          className="group flex items-center gap-2 text-[15px] font-medium"
          aria-label="View all product categories"
        >
          <span className="relative">
            {t.shopByCategory.shopAllProducts}
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

      <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-xl border border-zinc-200 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => {
          const categoryName = t.shopByCategory.categories[category.nameKey];
          return (
            <Link
              key={category.id}
              href={`/category/${slugify(categoryName)}`}
              className="group flex h-[160px] flex-col items-center justify-center gap-3 border border-zinc-200 transition-colors hover:bg-zinc-50 lg:h-[201px] lg:gap-4"
              aria-label={`Browse ${categoryName}`}
            >
              <div
                className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full bg-zinc-100 transition-transform group-hover:scale-105 lg:h-[110px] lg:w-[110px]"
              >
                {category.isSpecial ? (
                  <div className="flex h-full w-full items-center justify-center bg-red-600">
                    <span className="text-2xl font-bold text-white lg:text-3xl">
                      Sale
                    </span>
                  </div>
                ) : (
                  <span
                    role="img"
                    aria-label={category.emojiLabel}
                    className="text-3xl lg:text-5xl"
                  >
                    {category.emoji}
                  </span>
                )}
              </div>
              <h3
                className="text-center text-[15px] font-medium text-black transition-colors group-hover:text-zinc-600"
              >
                {categoryName}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}