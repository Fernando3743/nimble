"use client";

import { useState } from "react";
import Image from "next/image";

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
    <section className="bg-white text-[15px] font-medium leading-[24px] text-black">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left Column - Background Image with Product Card */}
        <div className="relative h-[500px] lg:col-span-3 lg:h-[556px]">
          <div className="relative h-full">
            <Image
              src={current.backgroundImage}
              alt="Background"
              fill
              className="object-cover"
            />
            {/* Floating Product Card Wrapper */}
            <div className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white p-4 shadow-lg lg:left-16 lg:w-[250px] lg:translate-x-0">
              {/* Product Card Image Wrapper */}
              <div className="mb-3 overflow-hidden rounded-xl bg-zinc-100">
                <div className="relative h-[240px]">
                  <Image
                    src={current.product.image}
                    alt={current.product.name}
                    fill
                    className="object-cover"
                  />
                  {/* Cart button */}
                  <button className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105">
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
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Card Info */}
              <div className="flex flex-col gap-2">
                <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-600">
                  {current.product.category}
                </p>
                <h3 className="text-[15px] font-bold text-black">
                  {current.product.name}
                </h3>
                <p className="text-[15px] font-bold text-black">
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
        <div className="flex flex-col justify-center bg-[#E8E5F5] px-6 py-12 lg:col-span-2 lg:px-12 lg:py-16">
          <div className="space-y-6 lg:space-y-8">
            {/* Heading */}
            <p className="text-sm font-bold lg:text-[16px] text-black">
              Our Favorite Products
            </p>

            {/* Quote */}
            <blockquote className="text-2xl font-bold leading-tight text-black lg:text-[40px] lg:leading-[1.2]">
              "{current.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="space-y-1">
              <p className="text-base font-bold text-black lg:text-[18px]">
                {current.author}
              </p>
              <p className="text-sm text-zinc-600 lg:text-[16px]">
                {current.location}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              <button
                onClick={goToPrevious}
                className="text-black transition-colors hover:text-zinc-600"
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

              <span className="text-sm font-medium text-black lg:text-[16px]">
                {currentIndex + 1}/{testimonials.length}
              </span>

              <button
                onClick={goToNext}
                className="text-black transition-colors hover:text-zinc-600"
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
