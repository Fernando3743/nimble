import type { JSX } from "react";

export const icons = {
  chevron: (
    <svg viewBox="0 0 12 12" aria-hidden className="size-3 text-zinc-500">
      <path
        d="M3 4l3 3 3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevronLight: (
    <svg viewBox="0 0 12 12" aria-hidden className="size-3 text-white">
      <path
        d="M3 4l3 3 3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 20 20" aria-hidden className="size-4 text-zinc-500">
      <path
        d="M9.25 3.5a5.75 5.75 0 014.565 9.17l2.758 2.759a.9.9 0 11-1.272 1.272l-2.759-2.758A5.75 5.75 0 119.25 3.5zm0 1.8a3.95 3.95 0 100 7.9 3.95 3.95 0 000-7.9z"
        fill="currentColor"
      />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 20 20" aria-hidden className="size-4 text-zinc-600">
      <path
        d="M10 2.5a5 5 0 015 5c0 3.1-4.2 8.09-4.58 8.53a.55.55 0 01-.84 0C9.2 15.59 5 10.6 5 7.5a5 5 0 015-5zm0 1.8a3.2 3.2 0 00-3.2 3.2c0 2.01 2.24 5.33 3.2 6.52.96-1.2 3.2-4.51 3.2-6.52A3.2 3.2 0 0010 4.3zm0 1.7a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
        fill="currentColor"
      />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 20 20" aria-hidden className="size-4 text-zinc-600">
      <path
        d="M10 3.4a3.1 3.1 0 110 6.2 3.1 3.1 0 010-6.2zm0 7.7c2.47 0 4.6 1.2 5.6 3.1a.8.8 0 11-1.43.74c-.65-1.24-2.2-2.04-4.17-2.04s-3.52.8-4.17 2.04a.8.8 0 01-1.42-.74c1-1.9 3.13-3.1 5.6-3.1z"
        fill="currentColor"
      />
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 20 20" aria-hidden className="size-4 text-zinc-600">
      <path
        d="M6.75 7a3.25 3.25 0 016.5 0H16a1.25 1.25 0 011.24 1.11l.76 6.1a2 2 0 01-1.99 2.24H3.99A2 2 0 012 14.21L2.76 8.1A1.25 1.25 0 014 7h2.75zm1.8 0h2.9a1.45 1.45 0 00-2.9 0z"
        fill="currentColor"
      />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 text-white">
      <path
        d="M14 8.5V6.8c0-.7.4-1.1 1.2-1.1H16V3h-2.2C11.8 3 11 4.6 11 6.5V8.5H9v2.6h2v7.9h3V11.1h2.3L16.6 8.5H14z"
        fill="currentColor"
      />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 text-white">
      <path
        d="M6 5l5.9 7.2L6.5 19h2.5l3.7-4.7L16 19h3l-6.2-7.4L18 5h-2.6l-3.3 4.1L8.7 5z"
        fill="currentColor"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 text-white">
      <path
        d="M8 3C5.8 3 4 4.8 4 7v10c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V7c0-2.2-1.8-4-4-4H8zm8 2c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h8zm-4 3.2A3.8 3.8 0 1015.8 12 3.8 3.8 0 0012 8.2zm0 6a2.2 2.2 0 112.2-2.2A2.2 2.2 0 0112 14.2zm4.9-8.5a1 1 0 11-1 1 1 1 0 011-1z"
        fill="currentColor"
      />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 text-white">
      <path
        d="M16.4 5.3a4.4 4.4 0 01-.4-1.8h-2.8v11a2 2 0 01-2 2 2 2 0 010-4c.2 0 .5 0 .7.1V9.4A5.4 5.4 0 007 14.7a5.3 5.3 0 005.2 5.3 5.3 5.3 0 005.3-5.2v-4A6 6 0 0019 11V8.3a3.8 3.8 0 01-2.6-1.1z"
        fill="currentColor"
      />
    </svg>
  ),
} as const satisfies Record<string, JSX.Element>;

export type IconName = keyof typeof icons;
