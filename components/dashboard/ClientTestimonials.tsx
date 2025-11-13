"use client";

import { useState } from "react";

// Design tokens
const TYPOGRAPHY = {
  eyebrow: "text-[16px] font-bold",
  quote: "text-[32px] font-bold leading-[1.2]",
  author: "text-[18px] font-bold",
  location: "text-[15px]",
} as const;

const COLORS = {
  bgYellow: "bg-[#E8ED6B]",
  textBlack: "text-black",
  textGray: "text-[#666666]",
  borderGray: "border-zinc-300",
  bgWhite: "bg-white",
} as const;

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The products are artful, fun, have a story just as unique as the designers who made it.",
    author: "Jenny Wilson",
    location: "New Mexico",
  },
  {
    id: 2,
    quote:
      "Each piece is like a masterpiece, combining design and authenticity beautifully.",
    author: "Robert Martinez",
    location: "Texas",
  },
  {
    id: 3,
    quote:
      "The best coat I have ever owned, amazing quality and materials throughout.",
    author: "Samantha Chen",
    location: "California",
  },
];

export function ClientTestimonials() {
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

  const previousIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;

  return (
    <section className="group relative bg-[#E8ED6B] px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1330px]">
        {/* Eyebrow */}
        <p className="mb-6 text-center text-sm font-bold text-black lg:mb-8 lg:text-[16px]">
          What Clients Talk About Us
        </p>

        <div className="relative flex items-center justify-center gap-8">
          {/* Previous Testimonial (Faded) - Desktop Only */}
          <div className="hidden flex-1 lg:block">
            <p className="text-[32px] font-bold leading-[1.2] text-black opacity-20">
              "{testimonials[previousIndex].quote}"
            </p>
          </div>

          {/* Current Testimonial */}
          <div className="z-10 mx-auto w-full max-w-3xl flex-shrink-0 px-4 text-center lg:px-0">
            <blockquote className="mb-6 break-words text-[22px] font-bold leading-tight text-black lg:mb-8 lg:text-[32px] lg:leading-[1.2]">
              "{current.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="space-y-1">
              <p className="text-base font-bold text-black lg:text-[18px]">
                {current.author}
              </p>
              <p className="text-sm text-[#666666] lg:text-[15px]">
                {current.location}
              </p>
            </div>

            {/* Pagination - Mobile Only */}
            <div className="mt-6 flex items-center justify-center gap-4 lg:hidden">
              <button
                onClick={goToPrevious}
                className="text-black"
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

              <span className="text-base font-medium text-black">
                {currentIndex + 1}/{testimonials.length}
              </span>

              <button
                onClick={goToNext}
                className="text-black"
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

          {/* Next Testimonial (Faded) - Desktop Only */}
          <div className="hidden flex-1 lg:block">
            <p className="text-[32px] font-bold leading-[1.2] text-black opacity-20">
              "{testimonials[nextIndex].quote}"
            </p>
          </div>

          {/* Navigation Arrows - Desktop Only, Show on hover */}
          <button
            onClick={goToPrevious}
            className="absolute left-8 hidden h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-white opacity-0 transition-all hover:bg-zinc-100 group-hover:opacity-100 lg:flex"
            aria-label="Previous testimonial"
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
            onClick={goToNext}
            className="absolute right-8 hidden h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-white opacity-0 transition-all hover:bg-zinc-100 group-hover:opacity-100 lg:flex"
            aria-label="Next testimonial"
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
