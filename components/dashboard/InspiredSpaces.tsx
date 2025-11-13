"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Design tokens
const TYPOGRAPHY = {
  heading: "text-[32px] font-bold leading-tight",
  badgeNumber: "text-[15px] font-semibold",
} as const;

const COLORS = {
  bgWhite: "bg-white",
  textBlack: "text-black",
} as const;

const SIZES = {
  badgeHeight: "h-12",
  badgeWidth: "w-16",
  navButtonSize: "h-12 w-12",
} as const;

type SpaceImage = {
  id: number;
  image: string;
  likes: number;
  alt: string;
};

const spaces: SpaceImage[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    likes: 3,
    alt: "Modern living room with warm tones",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    likes: 3,
    alt: "Minimalist workspace with natural light",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80",
    likes: 3,
    alt: "Green storage unit in modern setting",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=800&q=80",
    likes: 3,
    alt: "Cozy bedroom with neutral palette",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    likes: 3,
    alt: "Contemporary dining area",
  },
];

export function InspiredSpaces() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
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
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial calculation
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className={`${COLORS.bgWhite} px-4 pt-15`}>
      {/* Heading */}
      <h2 className={`${TYPOGRAPHY.heading} ${COLORS.textBlack} mb-8`}>
        Get Inspired by Spaces
      </h2>

      {/* Scrollable Gallery */}
      <div
        ref={scrollContainerRef}
        className="mb-6 flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {spaces.map((space) => (
          <div
            key={space.id}
            className="group relative flex-shrink-0 overflow-hidden rounded-2xl w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[450px] md:h-[500px]"
          >
            <Image
              src={space.image}
              alt={space.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Like Badge */}
            <div
              className={`absolute bottom-6 left-6 flex ${SIZES.badgeHeight} ${SIZES.badgeWidth} items-center justify-center gap-2 rounded-full ${COLORS.bgWhite} shadow-lg`}
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
                className="text-black"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className={`${TYPOGRAPHY.badgeNumber} ${COLORS.textBlack}`}>
                {space.likes}
              </span>
            </div>
          </div>
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

        {/* Arrow Buttons */}
        <div className="ml-4 flex gap-3">
          <button
            onClick={() => scroll("left")}
            className={`flex ${SIZES.navButtonSize} items-center justify-center rounded-full border border-zinc-300 ${COLORS.bgWhite} transition-colors hover:bg-zinc-100`}
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
            className={`flex ${SIZES.navButtonSize} items-center justify-center rounded-full border border-zinc-300 ${COLORS.bgWhite} transition-colors hover:bg-zinc-100`}
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
