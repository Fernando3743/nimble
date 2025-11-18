"use client";

import { Link } from "@/lib/i18n/routing";
import { slugify } from "@/utils/cn";
import { useTranslations } from "next-intl";

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
  key: string;
  icon: string;
};

const categories: Category[] = [
  {
    id: 1,
    key: "livingRoom",
    icon: "🪑",
  },
  {
    id: 2,
    key: "planters",
    icon: "🌱",
  },
  {
    id: 3,
    key: "gravelRug",
    icon: "⚪",
  },
  {
    id: 4,
    key: "tableMirror",
    icon: "🪞",
  },
  {
    id: 5,
    key: "tableWears",
    icon: "🛋️",
  },
  {
    id: 6,
    key: "diningDecor",
    icon: "📦",
  },
  {
    id: 7,
    key: "rayTableLamp",
    icon: "💡",
  },
  {
    id: 8,
    key: "bedroom",
    icon: "🛏️",
  },
];

export function CategoryChips() {
  const t = useTranslations("home.categoryChips");

  return (
    <section className="px-4 pt-8">
      <div
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => {
          const name = t(category.key);
          return (
            <Link
              key={category.id}
              href={`/category/${slugify(name)}`}
              className={`flex flex-shrink-0 items-center gap-3 rounded-full ${COLORS.bgWhite} border ${COLORS.border} px-6 py-3 shadow-sm transition-all hover:shadow-md hover:border-zinc-300`}
            >
              <span className="text-2xl" role="img" aria-label={name}>
                {category.icon}
              </span>
              <span className={`${TYPOGRAPHY.chipText} ${COLORS.textBlack}`}>
                {name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
