"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const categories = [
  "Sale Items",
  "Press Tables",
  "Lighting",
  "Spoke Sofa",
  "Storage",
  "Turn Chairs",
  "Chairs",
  "Curve Coat",
  "Bend Chairs",
  "Accessories",
];

const heroSlides = [
  {
    eyebrow: "Modern Elegance",
    title: "Spoke Sofa",
    cta: "Shop Collection",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Contemporary Grace",
    title: "Dining & Kitchen",
    cta: "Shop Collection",
    image:
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Timeless Design",
    title: "Living Room",
    cta: "Shop Collection",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const scrollHero = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    } else {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }
  };

  const hero = heroSlides[currentSlide];

  return (
    <section className="bg-white">
      <div className="px-[50px] pt-[20px]">
        <div className="group relative flex items-center pb-6">
          <button
            onClick={() => scroll("left")}
            className="group/btn relative z-10 flex size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            type="button"
            aria-label="Previous"
          >
            <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-zinc-900 transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
            <svg
              className="relative z-10 size-6 text-zinc-900 transition-colors duration-500 group-hover/btn:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex flex-1 gap-16 overflow-x-auto scrollbar-hide"
          >
            {categories.map((category) => (
              <button
                key={category}
                className="flex flex-col items-center gap-3 transition hover:opacity-80"
                type="button"
              >
                <div
                  className={`flex size-20 items-center justify-center rounded-full transition hover:shadow-md ${
                    category === "Sale Items"
                      ? "bg-[#C4523C] shadow-sm"
                      : "bg-[#F5F5F5] shadow-sm"
                  }`}
                >
                  <span
                    className={`text-lg font-medium ${
                      category === "Sale Items" ? "text-white" : "text-zinc-600"
                    }`}
                  >
                    {category === "Sale Items" ? "Sale" : category[0]}
                  </span>
                </div>
                <span className="text-sm font-medium text-zinc-900">
                  {category}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="group/btn relative z-10 flex size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            type="button"
            aria-label="Next"
          >
            <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-zinc-900 transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
            <svg
              className="relative z-10 size-6 text-zinc-900 transition-colors duration-500 group-hover/btn:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[32px]">
          <div className="relative h-[520px] w-full">
            <Image
              src={hero.image}
              fill
              className="object-cover"
              alt={hero.title}
              priority
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* Navigation Buttons */}
            <button
              onClick={() => scrollHero("left")}
              className="group/btn absolute left-6 top-1/2 z-10 flex size-[38px] -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-md transition-opacity duration-300"
              type="button"
              aria-label="Previous slide"
            >
              <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-zinc-900 transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
              <svg
                className="relative z-10 size-6 text-zinc-900 transition-colors duration-500 group-hover/btn:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => scrollHero("right")}
              className="group/btn absolute right-6 top-1/2 z-10 flex size-[38px] -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-md transition-opacity duration-300"
              type="button"
              aria-label="Next slide"
            >
              <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-zinc-900 transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
              <svg
                className="relative z-10 size-6 text-zinc-900 transition-colors duration-500 group-hover/btn:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Centered Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
                {hero.eyebrow}
              </span>
              <h2 className="text-5xl font-semibold tracking-tight sm:text-6xl">
                {hero.title}
              </h2>
              <button
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-zinc-900 shadow-lg shadow-black/20 transition hover:bg-zinc-100"
                type="button"
              >
                {hero.cta}
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-6 bg-white"
                      : "w-2 bg-white/70 hover:bg-white/90"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
