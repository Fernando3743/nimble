"use client";

import Link from "next/link";
import { slugify } from "@/lib/utils";
import { useTranslation } from "@/contexts/LanguageContext";

// Design tokens
const TYPOGRAPHY = {
  chipText: "text-[15px] font-semibold",
} as const;

const COLORS = {
  bgWhite: "bg-white",
  textBlack: "text-black",
  border: "border-zinc-200",
} as const;

type Category = {
  id: number;
  name: string;
  icon: string;
};


export function CategoryChips() {
  const t = useTranslation();

  const categories: Category[] = [
    { id: 1, name: t.categoryChips.categories[0], icon: "🪑" },
    { id: 2, name: t.categoryChips.categories[1], icon: "🌱" },
    { id: 3, name: t.categoryChips.categories[2], icon: "⚪" },
    { id: 4, name: t.categoryChips.categories[3], icon: "🪞" },
    { id: 5, name: t.categoryChips.categories[4], icon: "🛋️" },
    { id: 6, name: t.categoryChips.categories[5], icon: "📦" },
    { id: 7, name: t.categoryChips.categories[6], icon: "💡" },
    { id: 8, name: t.categoryChips.categories[7], icon: "🛏️" },
  ];

  return (
    <section className="px-4 pt-8">
      <div
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${slugify(category.name)}`}
            className={`flex flex-shrink-0 items-center gap-3 rounded-full ${COLORS.bgWhite} border ${COLORS.border} px-6 py-3 shadow-sm transition-all hover:shadow-md hover:border-zinc-300`}
          >
            <span className="text-2xl" role="img" aria-label={category.name}>
              {category.icon}
            </span>
            <span className={`${TYPOGRAPHY.chipText} ${COLORS.textBlack}`}>
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
