"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n/routing";

// Design tokens
const TYPOGRAPHY = {
  heading: "text-[40px] font-bold",
  username: "text-[15px] font-semibold",
  handle: "text-[15px] font-normal",
} as const;

const COLORS = {
  bgBlue: "bg-[#1e3a8a]",
  textWhite: "text-white",
} as const;

type InstagramPost = {
  id: number;
  image: string;
  username: string;
  profileImage: string;
  instagramUrl: string;
};

const posts: InstagramPost[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80",
    username: "liamwealthy",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    instagramUrl: "https://instagram.com/liamwealthy",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80",
    username: "baddyjam",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    instagramUrl: "https://instagram.com/baddyjam",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80",
    username: "liamwealthy",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    instagramUrl: "https://instagram.com/liamwealthy",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    username: "thisisaaccount",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    instagramUrl: "https://instagram.com/thisisaaccount",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    username: "furniturelover",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    instagramUrl: "https://instagram.com/furniturelover",
  },
];

export function InstagramFeed() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        // Reset to beginning when reaching the end
        container.scrollLeft = 0;
      } else {
        // Scroll by 1px for smooth movement
        container.scrollLeft += 1;
      }
    };

    // Auto-scroll every 30ms for smooth animation
    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={`${COLORS.bgBlue} px-4 py-16`}>
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <h2
          className={`${TYPOGRAPHY.heading} ${COLORS.textWhite} mb-8 text-center`}
        >
          We're on Gram
        </h2>

        {/* Instagram Posts Grid */}
        <div
          ref={scrollContainerRef}
          className="mb-8 flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post) => (
            <Link
              key={post.id}
              href={post.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0"
            >
              <div className="w-[280px] sm:w-[300px] md:w-[320px] overflow-hidden rounded-xl bg-white">
                {/* Image with User Info Overlay */}
                <div className="relative h-[280px] sm:h-[300px] md:h-[320px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={`Post by ${post.username}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* User Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Profile Image */}
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={post.profileImage}
                          alt={post.username}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Username */}
                      <span className={`${TYPOGRAPHY.username} text-black`}>
                        {post.username}
                      </span>
                    </div>

                    {/* Instagram Icon */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-black"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Instagram Handle */}
        <div className="text-center">
          <Link
            href="https://instagram.com/garage_store"
            target="_blank"
            rel="noopener noreferrer"
            className={`${TYPOGRAPHY.handle} ${COLORS.textWhite} inline-block border-b-2 border-white pb-1 transition-opacity hover:opacity-80`}
          >
            @Garage_store
          </Link>
        </div>
      </div>
    </section>
  );
}
