"use client";

import { useRef, useState } from "react";
import { icons } from "../icons";
import { ProductCard, type Product } from "./ProductCard";

// ===== CONSTANTS =====
const CONTAINER_PADDING = "px-[50px]";
const GRAY_COLOR = "#666666";
const SCROLL_AMOUNT = 400;

const products: Product[] = [
  {
    id: 1,
    category: "SOFAS",
    name: "Ray Sofa Basic",
    price: 3289.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    colors: ["#E5E5E5", "#A8C69F"],
    onSale: false,
    sellingFast: false,
  },
  {
    id: 2,
    category: "CHAIRS",
    name: "Turn Chair Vivid",
    price: 309.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    colors: ["#C4523C", "#E9C46A"],
    onSale: false,
    sellingFast: false,
  },
  {
    id: 3,
    category: "SOFA",
    name: "Loop Sofa Armrest",
    price: 3289.0,
    originalPrice: 3369.0,
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80",
    colors: ["#4A4A4A", "#B4D4D4"],
    onSale: true,
    sellingFast: false,
  },
  {
    id: 4,
    category: "FLOATING WALL",
    name: "Pixel Shelves",
    price: 85.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
    colors: ["#B8936E"],
    onSale: false,
    sellingFast: false,
  },
  {
    id: 5,
    category: "CHAIRS",
    name: "Arc Chair",
    price: 699.0,
    originalPrice: 729.0,
    image:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80",
    colors: ["#E5D5C8", "#F4D03F", "#1A1A1A"],
    onSale: true,
    sellingFast: true,
  },
  {
    id: 6,
    category: "RACK WALL",
    name: "Axis Storage System",
    price: 135.0,
    originalPrice: 185.0,
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    colors: ["#8B7355"],
    onSale: true,
    sellingFast: true,
  },
];

// ===== SUB-COMPONENTS =====
const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`relative pb-1 text-[15px] font-semibold transition ${
      active ? "text-black" : `text-[${GRAY_COLOR}]`
    }`}
    type="button"
  >
    {children}
    {active && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-black" />}
  </button>
);

const NavButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex size-[44px] items-center justify-center rounded-full border-2 border-zinc-200 bg-white transition hover:border-zinc-900"
    type="button"
    aria-label={`Scroll ${direction}`}
  >
    {direction === "left"
      ? icons.chevronLeft({ className: "size-5 text-zinc-900" })
      : icons.chevronRight({ className: "size-5 text-zinc-900" })}
  </button>
);

// ===== MAIN COMPONENT =====
export function NewArrivals() {
  const [activeTab, setActiveTab] = useState<"new" | "hot">("new");
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  return (
    <section className="bg-white pt-[40px]">
      {/* Header Section */}
      <div className={`mb-8 ${CONTAINER_PADDING}`}>
        <div className="flex items-end justify-between">
          {/* Title & Description */}
          <div>
            <h2 className="mb-2 text-[32px] font-bold text-black">New Arrivals</h2>
            <p className={`text-[15px] text-[${GRAY_COLOR}]`}>
              Traditional divides between personal and professional space.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-8">
            <TabButton active={activeTab === "new"} onClick={() => setActiveTab("new")}>
              New Arrivals
            </TabButton>
            <TabButton active={activeTab === "hot"} onClick={() => setActiveTab("hot")}>
              Hot Items
            </TabButton>
          </div>
        </div>
      </div>

      {/* Products Scroll Section */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={`flex gap-6 overflow-x-auto ${CONTAINER_PADDING} scrollbar-hide`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Progress Bar & Navigation */}
      <div className={`mt-20 flex items-center justify-between gap-6 ${CONTAINER_PADDING}`}>
        {/* Progress Bar */}
        <div className="relative h-0.5 flex-1 bg-zinc-200">
          <div
            className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Navigation Arrows */}
        <div className="flex shrink-0 gap-2">
          <NavButton direction="left" onClick={() => scroll("left")} />
          <NavButton direction="right" onClick={() => scroll("right")} />
        </div>
      </div>
    </section>
  );
}
