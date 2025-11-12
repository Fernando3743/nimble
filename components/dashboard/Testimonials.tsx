"use client";

import { useState } from "react";
import Image from "next/image";

// Design tokens matching Shopify theme specs
const TYPOGRAPHY = {
  base: "text-[15px] font-medium leading-[24px]", // Base from specs
  eyebrow: "text-[13px] font-semibold uppercase tracking-wide",
  heading: "text-[16px] font-bold",
  quote: "text-[40px] font-bold leading-[1.2]",
  author: "text-[18px] font-bold",
  location: "text-[16px]",
  category: "text-[12px] font-bold uppercase tracking-wider",
  productName: "text-[15px] font-bold",
  price: "text-[15px] font-bold",
  pagination: "text-[16px] font-medium",
} as const;

const COLORS = {
  bgWhite: "bg-white",
  bgPurple: "bg-[#E8E5F5]",
  textBlack: "text-black",
  textGray: "text-zinc-600",
} as const;

const SIZES = {
  sectionHeight: "h-[556px]",
  cardWidth: "w-[250px]",
  cardHeight: "h-[382.5px]",
  cardPadding: "p-4", // 16px
  productImageHeight: "h-[240px]",
} as const;

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  location: string;
  product: {
    category: string;
    name: string;
    price: string;
    colors: string[];
    image: string;
  };
  backgroundImage: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "All products are authentic and imported from the country of origin.",
    author: "Jenny Wilson",
    location: "New Mexico",
    product: {
      category: "CHAIRS",
      name: "Turn Chair Vivid",
      price: "$309.00",
      colors: ["#C44E3D", "#F5B546"],
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    quote: "The quality and craftsmanship exceeded all my expectations.",
    author: "Robert Fox",
    location: "California",
    product: {
      category: "TABLES",
      name: "Modern Desk Pro",
      price: "$459.00",
      colors: ["#2D3748", "#A0AEC0"],
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    quote: "Beautiful design that perfectly complements our home decor.",
    author: "Sarah Chen",
    location: "New York",
    product: {
      category: "LIGHTING",
      name: "Arc Floor Lamp",
      price: "$189.00",
      colors: ["#000000", "#FFD700"],
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      className={`${COLORS.bgWhite} ${TYPOGRAPHY.base} ${COLORS.textBlack} box-border`}
    >
      <div className={`grid grid-cols-1 ${SIZES.sectionHeight} lg:grid-cols-5`}>
        {/* Left Column - Background Image with Product Card */}
        <div className="relative lg:col-span-3">
          <div className="relative h-full">
            <Image
              src={current.backgroundImage}
              alt="Background"
              fill
              className="object-cover"
            />
            {/* Floating Product Card Wrapper */}
            <div
              className={`absolute left-8 top-1/2 ${SIZES.cardWidth} -translate-y-1/2 ${COLORS.bgWhite} ${SIZES.cardPadding} box-border overflow-hidden rounded-xl shadow-lg transition-all md:left-16`}
            >
              {/* Product Card Image Wrapper */}
              <div className="mb-3 overflow-hidden rounded-xl bg-zinc-100">
                <div className={`relative ${SIZES.productImageHeight}`}>
                  <span
                    role="img"
                    aria-label="Chair"
                    className="flex h-full items-center justify-center text-8xl"
                  >
                    🪑
                  </span>
                </div>
              </div>

              {/* Product Card Info */}
              <div className="flex flex-col gap-2">
                <p className={`${TYPOGRAPHY.category} ${COLORS.textGray}`}>
                  {current.product.category}
                </p>
                <h3 className={`${TYPOGRAPHY.productName} ${COLORS.textBlack}`}>
                  {current.product.name}
                </h3>
                <p className={`${TYPOGRAPHY.price} ${COLORS.textBlack}`}>
                  {current.product.price}
                </p>

                {/* Product Card List Actions - Color Swatches */}
                <div className="flex gap-2">
                  {current.product.colors.map((color, index) => (
                    <button
                      key={`color-${index}`}
                      className="h-5 w-5 flex-shrink-0 rounded-full border border-zinc-300 shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Testimonial Content */}
        <div
          className={`${COLORS.bgPurple} flex flex-col justify-center px-8 py-16 lg:col-span-2 lg:px-12`}
        >
          <div className="space-y-8">
            {/* Heading */}
            <p className={`${TYPOGRAPHY.heading} ${COLORS.textBlack}`}>
              Our Favorite Products
            </p>

            {/* Quote */}
            <blockquote className={`${TYPOGRAPHY.quote} ${COLORS.textBlack}`}>
              "{current.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="space-y-1">
              <p className={`${TYPOGRAPHY.author} ${COLORS.textBlack}`}>
                {current.author}
              </p>
              <p className={`${TYPOGRAPHY.location} ${COLORS.textGray}`}>
                {current.location}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              <button
                onClick={goToPrevious}
                className={`${COLORS.textBlack} transition-colors hover:text-zinc-600`}
                aria-label="Previous testimonial"
              >
                <svg
                  width="24"
                  height="24"
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

              <span className={`${TYPOGRAPHY.pagination} ${COLORS.textBlack}`}>
                {currentIndex + 1}/{testimonials.length}
              </span>

              <button
                onClick={goToNext}
                className={`${COLORS.textBlack} transition-colors hover:text-zinc-600`}
                aria-label="Next testimonial"
              >
                <svg
                  width="24"
                  height="24"
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
        </div>
      </div>
    </section>
  );
}
