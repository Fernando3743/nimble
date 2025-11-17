"use client";

import { useRef, useState, useEffect } from "react";
import { Link } from "@/lib/i18n/routing";
import { slugify } from "@/utils/cn";

// Design tokens
const TYPOGRAPHY = {
  heading: "text-[32px] font-bold leading-tight",
  subheading: "text-[15px] font-normal leading-relaxed",
  link: "text-[15px] font-bold",
  category: "text-[12px] font-bold uppercase tracking-wider",
  productName: "text-[15px] font-bold",
  price: "text-[15px] font-bold",
  originalPrice: "text-[15px] font-normal",
  badge: "text-[13px] font-semibold",
} as const;

const COLORS = {
  bgWhite: "bg-white",
  bgLightGray: "bg-zinc-100",
  textBlack: "text-black",
  textGray: "text-zinc-600",
  redBadge: "bg-[#DC2626]",
  greenBadge: "bg-[#16A34A]",
  redPrice: "text-[#DC2626]",
  whiteText: "text-white",
} as const;

const SIZES = {
  cardWidth: "w-[242px]",
  cardHeight: "h-[400px]",
  imageHeight: "h-[242px]",
} as const;

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: "Sale" | "New";
  sellingFast?: boolean;
  colors: string[];
  image: string;
  slug: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Cross Table Bark",
    category: "TABLES",
    price: 170.0,
    originalPrice: 200.0,
    badge: "Sale",
    colors: ["#8B4513"],
    image: "🪑",
    slug: "cross-table-bark",
  },
  {
    id: 2,
    name: "Axis Storage System",
    category: "RACK WALL",
    price: 135.0,
    originalPrice: 185.0,
    badge: "Sale",
    colors: ["#D2691E"],
    image: "📦",
    slug: "axis-storage-system",
  },
  {
    id: 3,
    name: "Task Chair Luxe",
    category: "CHAIRS",
    price: 559.0,
    originalPrice: 599.0,
    badge: "Sale",
    sellingFast: true,
    colors: ["#8B4513"],
    image: "🪑",
    slug: "task-chair-luxe",
  },
  {
    id: 4,
    name: "Cross Chair Heritage",
    category: "CHAIRS",
    price: 589.0,
    originalPrice: 600.0,
    badge: "Sale",
    colors: ["#D2B48C", "#8B4513"],
    image: "🪑",
    slug: "cross-chair-heritage",
  },
  {
    id: 5,
    name: "Plush Stool",
    category: "BAR STOOLS",
    price: 219.0,
    badge: "New",
    colors: ["#D3D3D3"],
    image: "🪑",
    slug: "plush-stool",
  },
  {
    id: 6,
    name: "Grind Vessel",
    category: "ACCESSORIES",
    price: 65.0,
    originalPrice: 100.0,
    badge: "Sale",
    colors: ["#2C3E50", "#D2B48C"],
    image: "🏺",
    slug: "grind-vessel",
  },
];

export function ShopOurOffers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="px-4 pt-8 lg:pt-14">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="mb-2 text-[22px] font-bold leading-tight text-black lg:text-[32px]">
          Shop Our Offers
        </h2>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[15px] font-normal leading-relaxed text-zinc-600">
            Traditional divides between personal and professional space.
          </p>
          <Link
            href="/products"
            className={`group relative ${TYPOGRAPHY.link} ${COLORS.textBlack} flex items-center gap-2 whitespace-nowrap`}
          >
            <span>Shop All Products</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div
        ref={scrollContainerRef}
        className="mb-6 flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className={`group flex-shrink-0 ${SIZES.cardWidth}`}
          >
            {/* Card */}
            <div className="flex flex-col">
              {/* Image Container */}
              <div
                className={`relative mb-4 overflow-hidden rounded-2xl ${COLORS.bgLightGray} ${SIZES.imageHeight}`}
              >
                {/* Badge */}
                {product.badge && (
                  <div
                    className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 ${TYPOGRAPHY.badge} ${
                      product.badge === "Sale"
                        ? COLORS.redBadge
                        : COLORS.greenBadge
                    } ${COLORS.whiteText} shadow-md`}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Selling Fast Badge */}
                {product.sellingFast && (
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-md">
                    <span className="text-xs font-semibold">Selling Fast</span>
                    <span role="img" aria-label="lightning">
                      ⚡
                    </span>
                  </div>
                )}

                {/* Product Image - Emoji Placeholder */}
                <div className="flex h-full items-center justify-center text-9xl">
                  {product.image}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                {/* Category */}
                <p className={`${TYPOGRAPHY.category} ${COLORS.textGray}`}>
                  {product.category}
                </p>

                {/* Product Name */}
                <h3 className={`${TYPOGRAPHY.productName} ${COLORS.textBlack}`}>
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span
                    className={`${TYPOGRAPHY.price} ${
                      product.badge === "Sale" ? COLORS.redPrice : COLORS.textBlack
                    }`}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span
                      className={`${TYPOGRAPHY.originalPrice} ${COLORS.textGray} line-through`}
                    >
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Color Swatches */}
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={`${product.id}-color-${index}`}
                      className="h-5 w-5 flex-shrink-0 rounded-full border border-zinc-300 shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                      onClick={(e) => e.preventDefault()}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center">
        {/* Progress Bar */}
        <div className="relative h-[1px] flex-1 bg-zinc-200">
          <div
            className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Arrow Buttons - Desktop Only */}
        <div className="ml-4 hidden gap-3 lg:flex">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-white transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Scroll left"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-white transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Scroll right"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
