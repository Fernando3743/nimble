# CLAUDE.md - AI Assistant Guide for Nimble

> Last Updated: November 16, 2025
> Codebase Version: 0.1.0
> Total Lines of Code: ~3,927

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Directory Structure](#directory-structure)
4. [Development Workflows](#development-workflows)
5. [Coding Conventions](#coding-conventions)
6. [Component Patterns](#component-patterns)
7. [Styling Guidelines](#styling-guidelines)
8. [Type System](#type-system)
9. [Git Conventions](#git-conventions)
10. [Common Tasks](#common-tasks)
11. [Best Practices](#best-practices)
12. [Things to Avoid](#things-to-avoid)

---

## Project Overview

**Nimble** is a modern e-commerce furniture storefront built with Next.js 16 and React 19. The application features a single-page architecture with modular, composable sections focused on delivering an exceptional mobile-first user experience.

### Key Characteristics
- **Type**: E-commerce frontend (furniture/home decor)
- **Architecture**: Component-based, server-first with selective client components
- **Design Philosophy**: Mobile-first responsive design
- **State Management**: Minimal, localized component state (no external library)
- **Rendering**: Server Components by default, Client Components for interactivity

---

## Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.1 | React framework with App Router |
| **React** | 19.2.0 | UI library |
| **React-DOM** | 19.2.0 | React DOM bindings |
| **TypeScript** | 5.x | Type safety |

### Styling & Design
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **@tailwindcss/postcss** | 4.x | Tailwind PostCSS plugin |
| **Instrument Sans** | - | Google Font (via next/font) |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.x | Code linting |
| **eslint-config-next** | 16.0.1 | Next.js ESLint rules |

### Next.js Features Utilized
- ✅ App Router (directory-based routing)
- ✅ Server Components (default)
- ✅ Client Components ("use client")
- ✅ Image Optimization (`next/image`)
- ✅ Font Optimization (`next/font`)
- ✅ Link Component (client-side navigation)
- ✅ Metadata API
- ✅ Remote image patterns (Unsplash CDN)

---

## Directory Structure

```
nimble/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (font config, metadata)
│   ├── page.tsx                  # Home page (composes all sections)
│   └── globals.css               # Global styles, Tailwind imports, CSS variables
│
├── components/                   # React components
│   ├── Header.tsx                # 293 lines - Client component, sticky header
│   ├── Footer.tsx                # 479 lines - Client component, collapsible sections
│   ├── icons.tsx                 # 406 lines - Centralized SVG icon library
│   └── dashboard/                # Page section components
│       ├── Hero.tsx              # Featured slider with touch gestures
│       ├── NewArrivals.tsx       # Horizontal scrollable products
│       ├── FlashSale.tsx         # Countdown timer component
│       ├── FeaturedProducts.tsx  # Product grid with gradients
│       ├── ShopByCategory.tsx    # Category navigation grid
│       ├── FeaturedCollections.tsx
│       ├── Testimonials.tsx
│       ├── InspiredSpaces.tsx
│       ├── PromoBanners.tsx
│       ├── CategoryChips.tsx
│       ├── ShopOurOffers.tsx
│       ├── MeetOurTeam.tsx
│       ├── ClientTestimonials.tsx
│       ├── ApproachFeatures.tsx
│       ├── InstagramFeed.tsx
│       └── ProductCard.tsx       # Reusable product display
│
├── lib/                          # Utility functions
│   └── utils.ts                  # slugify, cn helper functions
│
├── public/                       # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── Configuration Files
│   ├── next.config.ts            # Next.js configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── eslint.config.mjs         # ESLint configuration
│   ├── package.json              # Dependencies and scripts
│   └── .gitignore                # Git ignore patterns
│
└── .git/                         # Git repository
```

### Directory Responsibilities

#### `/app`
- **Purpose**: Next.js App Router directory
- **Contains**: Layouts, pages, and global styles
- **Current Pages**: Home page only (`page.tsx`)
- **Scalability**: Ready for `/products/[id]`, `/about`, `/cart`, etc.

#### `/components`
- **Purpose**: Reusable React components
- **Organization**: Root-level shared components + `/dashboard` for page sections
- **Naming**: PascalCase matching component names
- **Exports**: Named exports (not default)

#### `/components/dashboard`
- **Purpose**: Page section components composing the home page
- **Pattern**: Each file exports one main section component
- **Usage**: Imported and composed in `app/page.tsx`

#### `/lib`
- **Purpose**: Utility functions and helpers
- **Current Functions**: `slugify()`, `cn()`
- **Future Use**: Can contain API clients, data fetching, formatters, etc.

#### `/public`
- **Purpose**: Static assets served from root `/`
- **Current Contents**: SVG icons
- **Access Pattern**: Reference as `/file.svg` in code

---

## Development Workflows

### Local Development

```bash
# Install dependencies (first time)
npm install

# Start development server
npm run dev
# → Runs on http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Development Server Behavior
- **Hot Reload**: Automatic reload on file changes
- **Fast Refresh**: Preserves component state during edits
- **Error Overlay**: Displays build errors in browser
- **Port**: Default `3000` (configurable)

### Testing Workflow
⚠️ **Note**: No test framework is currently configured. Consider adding:
- Jest + React Testing Library (unit/integration tests)
- Playwright or Cypress (E2E tests)

### Build & Deployment
- **Build Command**: `npm run build`
- **Output Directory**: `.next/` (gitignored)
- **Production Mode**: Optimized bundles, image optimization, font subsetting
- **Recommended Platform**: Vercel (native Next.js support)

---

## Coding Conventions

### File Naming
- **Components**: PascalCase (e.g., `Header.tsx`, `ProductCard.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Config Files**: Various (follow ecosystem standards)

### Component Exports
```typescript
// ✅ CORRECT - Named export
export function Header() {
  return <header>...</header>;
}

// ❌ AVOID - Default export
export default function Header() { ... }
```

### Import Organization
```typescript
// 1. React imports
"use client"; // If needed
import { useState, useRef, useEffect } from "react";

// 2. Next.js imports
import Link from "next/link";
import Image from "next/image";

// 3. Internal components (use @/ alias)
import { Header } from "@/components/Header";
import { icons } from "@/components/icons";
import { slugify, cn } from "@/lib/utils";

// 4. Type imports (separate or inline)
import type { Product } from "./ProductCard";
```

### Import Path Alias
Always use `@/` for internal imports:
```typescript
// ✅ CORRECT
import { Header } from "@/components/Header";
import { slugify } from "@/lib/utils";

// ❌ AVOID
import { Header } from "../components/Header";
import { slugify } from "../../lib/utils";
```

### Constants Pattern
Define constants at the top of component files:
```typescript
// Color constants
const SALE_COLOR = "#C4523C";
const GRAY_COLOR = "#666666";

// Reusable class strings
const CONTAINER = "w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[50px]";

// Configuration
const SCROLL_THRESHOLD = 10;

// Data arrays with type inference
const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
] as const;
```

### Function Naming
- **Components**: PascalCase (`ProductCard`, `Header`)
- **Utilities**: camelCase (`slugify`, `mergeClasses`)
- **Event Handlers**: `on` prefix (`onClick`, `onTouchStart`)
- **Handlers**: `handle` prefix (`handleScroll`, `handleSubmit`)

---

## Component Patterns

### Server vs Client Components

#### Server Components (Default)
Use for static content, data fetching, and non-interactive UI:
```typescript
// No "use client" directive
export function ShopByCategory() {
  // Can use async/await here
  return <div>...</div>;
}
```

**When to use Server Components:**
- ✅ Static content display
- ✅ Data fetching (API calls)
- ✅ Database queries
- ✅ SEO-critical content
- ✅ Large dependencies (they stay on server)

#### Client Components
Use for interactive features, state, and effects:
```typescript
"use client";

import { useState, useEffect } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Browser-only code
  }, []);

  return <header onClick={() => setIsOpen(true)}>...</header>;
}
```

**When to use Client Components:**
- ✅ State (`useState`, `useReducer`)
- ✅ Effects (`useEffect`, `useLayoutEffect`)
- ✅ Event handlers (`onClick`, `onChange`)
- ✅ Browser APIs (`window`, `localStorage`)
- ✅ Custom hooks
- ✅ Context providers/consumers

### Component Structure Template
```typescript
// Component file: components/dashboard/ProductCard.tsx

// Type definitions first
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  onSale: boolean;
};

// Constants
const SALE_COLOR = "#C4523C";
const GRAY_COLOR = "#666666";

// Component
export function ProductCard({ product }: { product: Product }) {
  // Hooks (if client component)
  const [selected, setSelected] = useState(false);

  // Event handlers
  const handleClick = () => {
    setSelected(true);
  };

  // Render
  return (
    <div className="group relative">
      {/* Component JSX */}
    </div>
  );
}
```

### Common Interactive Patterns

#### Touch Gesture Handling
```typescript
"use client";

export function Hero() {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Content */}
    </div>
  );
}
```

#### Scroll Behavior
```typescript
"use client";

export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const SCROLL_THRESHOLD = 10;

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isSticky ? "sticky top-0" : ""}>
      {/* Header content */}
    </header>
  );
}
```

#### Horizontal Scroll with Buttons
```typescript
"use client";

export function NewArrivals() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="group relative">
      <button onClick={() => scroll("left")}>←</button>
      <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide">
        {/* Scrollable content */}
      </div>
      <button onClick={() => scroll("right")}>→</button>
    </div>
  );
}
```

---

## Styling Guidelines

### Tailwind CSS v4 Configuration

#### Global Styles (`app/globals.css`)
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: #1d3a9a;
  --color-dark: #101010;
  --color-dark-gray: #1a1a1a;
  --color-light-gray: #ededed;
  --color-sale: #d93a2b;
  --font-sans: var(--font-instrument-sans);
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Custom CSS Utilities
```css
/* Hide scrollbars while maintaining scroll functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

### Responsive Design Pattern

This project uses a **mobile-first** approach with consistent breakpoints:

```typescript
// Standard container padding
const CONTAINER = "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[50px]";

// Responsive visibility
<div className="hidden lg:flex">Desktop only</div>
<div className="flex lg:hidden">Mobile only</div>

// Responsive text sizes
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

// Responsive grids
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* Grid items */}
</div>
```

### Breakpoints Reference
| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large desktops |

### Color Usage
```typescript
// Use custom theme colors
<div className="bg-primary text-white">Primary color</div>
<div className="text-sale">Sale price</div>
<div className="bg-dark text-light-gray">Dark background</div>

// Tailwind color palette
<div className="bg-white text-zinc-900">White background</div>
<div className="text-zinc-500">Muted text</div>
<div className="border-stone-300">Stone border</div>
```

### Common Styling Patterns

#### Group Hover Effects
```typescript
<div className="group">
  <button className="opacity-0 group-hover:opacity-100">
    Appears on parent hover
  </button>
</div>

// Named groups
<div className="group/card">
  <button className="group-hover/card:scale-110">
    Scales when card is hovered
  </button>
</div>
```

#### Gradient Backgrounds
```typescript
<div className="bg-gradient-to-br from-stone-300 to-stone-400">
  Gradient background
</div>

<div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  Multi-color gradient
</div>
```

#### Transitions & Animations
```typescript
<button className="transition duration-200 ease-out hover:scale-105">
  Smooth hover effect
</button>

<div className="transition-opacity duration-300 opacity-0 hover:opacity-100">
  Fade in on hover
</div>
```

#### Scrollable Containers
```typescript
<div className="flex gap-4 overflow-x-auto scrollbar-hide">
  {items.map(item => (
    <div key={item.id} className="shrink-0">
      {/* Item content */}
    </div>
  ))}
</div>
```

---

## Type System

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,              // Strict type checking enabled
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react-jsx",          // React 17+ JSX transform
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]             // Path alias for imports
    }
  }
}
```

### Type Definition Patterns

#### Component Types
```typescript
// Export types with components
export type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  colors: string[];
  onSale: boolean;
  sellingFast: boolean;
};

export function ProductCard({ product }: { product: Product }) {
  // Component implementation
}
```

#### Props Types
```typescript
// Inline props type
export function Header({ className }: { className?: string }) { ... }

// Dedicated type (for complex props)
type TestimonialProps = {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
  product: {
    name: string;
    image: string;
  };
};

export function Testimonial({ testimonial }: { testimonial: TestimonialProps }) { ... }
```

#### Const Assertions
```typescript
// For readonly arrays
const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
] as const;

// For tuples
const socialIcons = ["facebook", "x", "instagram", "tiktok"] as const;
```

#### Event Types
```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // Handle click
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Handle input change
};

const onTouchStart = (e: React.TouchEvent) => {
  // Handle touch
};
```

### Utility Types Usage
```typescript
// Pick specific properties
type ProductPreview = Pick<Product, "id" | "name" | "image">;

// Make all properties optional
type PartialProduct = Partial<Product>;

// Make all properties required
type RequiredProduct = Required<Product>;

// Exclude properties
type ProductWithoutId = Omit<Product, "id">;
```

---

## Git Conventions

### Commit Message Format
This project follows conventional commit patterns:

```
<type>: <description>

Types:
- feat:     New feature
- fix:      Bug fix
- refactor: Code refactoring (no functional change)
- style:    Formatting, styling changes
- docs:     Documentation changes
- test:     Adding or updating tests
- chore:    Maintenance tasks
```

### Examples from Recent History
```bash
feat: add social media icons to mobile menu and improve search bar
fix: ensure consistent header styling when mobile menu is open
refactor: simplify promotional banner styling
feat: redesign mobile hamburger menu with full-screen overlay
feat: add responsive mobile design to Footer with collapsible sections
fix: improve ClientTestimonials mobile responsiveness
```

### Branch Strategy
- **Main Branch**: Not specified in repository
- **Feature Branches**: Use descriptive names prefixed with context
  - Example: `claude/feature-name-sessionid`
  - Example: `mobile-responsive-footer`
  - Example: `add-product-filtering`

### Commit Best Practices
1. **Atomic commits**: One logical change per commit
2. **Descriptive messages**: Clear description of what changed and why
3. **Test before commit**: Ensure code builds and runs
4. **Small commits**: Easier to review and revert if needed

### Files to Never Commit
Already configured in `.gitignore`:
- `node_modules/`
- `.next/`, `/out/`, `/build`
- `.env*` (environment files)
- `*.tsbuildinfo`
- `.DS_Store`
- `*.pem`
- Debug logs (`npm-debug.log*`, etc.)

---

## Common Tasks

### Adding a New Page

1. Create page file in `app/` directory:
```typescript
// app/products/page.tsx
export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <h1>Products</h1>
    </div>
  );
}
```

2. Add metadata (optional):
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Nimble",
  description: "Browse our furniture collection",
};
```

### Adding a New Component

1. Create component file in appropriate directory:
```typescript
// components/dashboard/NewSection.tsx

export function NewSection() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[50px] py-12">
      <h2 className="text-2xl font-semibold mb-6">New Section</h2>
      {/* Section content */}
    </section>
  );
}
```

2. Add to page composition:
```typescript
// app/page.tsx
import { NewSection } from "@/components/dashboard/NewSection";

export default function Home() {
  return (
    <div>
      {/* Other sections */}
      <NewSection />
    </div>
  );
}
```

### Adding a New Icon

Add to the centralized icon library:
```typescript
// components/icons.tsx
export const icons = {
  // ... existing icons
  newIcon: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("size-6", className)}
    >
      <path d="..." fill="currentColor" />
    </svg>
  ),
};
```

Usage:
```typescript
import { icons } from "@/components/icons";

<button>
  {icons.newIcon({ className: "size-4" })}
</button>
```

### Adding Remote Image Domains

Update `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com", // New domain
      },
    ],
  },
};
```

### Adding a Utility Function

Add to `lib/utils.ts`:
```typescript
/**
 * Formats a price in USD
 * @param price - The price in cents
 * @returns Formatted price string (e.g., "$19.99")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}
```

### Debugging Build Issues

```bash
# Clean Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Type check only
npx tsc --noEmit

# Build with verbose output
npm run build -- --debug
```

---

## Best Practices

### Performance Optimization

#### 1. Use Next.js Image Component
```typescript
// ✅ CORRECT - Optimized
import Image from "next/image";

<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={300}
  quality={85}
/>

// ❌ AVOID - No optimization
<img src="/product.jpg" alt="Product" />
```

#### 2. Lazy Load Components
```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

#### 3. Minimize Client Components
Keep interactive boundaries small:
```typescript
// ✅ CORRECT - Only interactive part is client component
export function ProductList() {
  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <AddToCartButton key={product.id} product={product} />
      ))}
    </div>
  );
}

// AddToCartButton.tsx
"use client";
export function AddToCartButton({ product }) {
  const [loading, setLoading] = useState(false);
  // Interactive logic here
}
```

### Accessibility

#### 1. Semantic HTML
```typescript
// ✅ CORRECT
<nav>
  <ul>
    <li><Link href="/">Home</Link></li>
  </ul>
</nav>

// ❌ AVOID
<div>
  <div>
    <div><Link href="/">Home</Link></div>
  </div>
</div>
```

#### 2. ARIA Labels
```typescript
<button aria-label="Close menu" onClick={closeMenu}>
  {icons.close()}
</button>

<svg aria-hidden="true">...</svg>
```

#### 3. Keyboard Navigation
```typescript
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  Click me
</button>
```

### Code Organization

#### 1. Group Related Code
```typescript
// ✅ CORRECT - Related constants together
const COLORS = {
  SALE: "#C4523C",
  GRAY: "#666666",
  PRIMARY: "#1d3a9a",
} as const;

const SCROLL_CONFIG = {
  THRESHOLD: 10,
  SMOOTH_BEHAVIOR: "smooth",
} as const;
```

#### 2. Extract Reusable Logic
```typescript
// lib/hooks/useScrollPosition.ts
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

// Usage in components
const scrollY = useScrollPosition();
const isSticky = scrollY > 10;
```

#### 3. Co-locate Types with Components
```typescript
// ProductCard.tsx
export type Product = { ... };
export type ProductCardProps = { product: Product };
export function ProductCard({ product }: ProductCardProps) { ... }
```

### Error Handling

#### 1. Runtime Error Boundaries
Consider adding error boundaries for production:
```typescript
// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

#### 2. Graceful Degradation
```typescript
const [imageError, setImageError] = useState(false);

<Image
  src={product.image}
  alt={product.name}
  onError={() => setImageError(true)}
/>
{imageError && <div className="bg-gray-200">Image unavailable</div>}
```

---

## Things to Avoid

### Anti-Patterns

#### ❌ Default Exports
```typescript
// AVOID
export default function Header() { ... }

// USE
export function Header() { ... }
```

#### ❌ Relative Imports
```typescript
// AVOID
import { Header } from "../../components/Header";

// USE
import { Header } from "@/components/Header";
```

#### ❌ Unnecessary Client Components
```typescript
// AVOID - No interactivity needed
"use client";
export function StaticContent() {
  return <div>Static text</div>;
}

// USE - Server component by default
export function StaticContent() {
  return <div>Static text</div>;
}
```

#### ❌ Inline Styles
```typescript
// AVOID
<div style={{ padding: "16px", color: "red" }}>Content</div>

// USE - Tailwind classes
<div className="p-4 text-red-500">Content</div>
```

#### ❌ Hardcoded Values
```typescript
// AVOID
<div className="px-4 md:px-8 lg:px-12">...</div>
<div className="px-4 md:px-8 lg:px-12">...</div>
<div className="px-4 md:px-8 lg:px-12">...</div>

// USE - Constants
const CONTAINER = "px-4 md:px-8 lg:px-12";
<div className={CONTAINER}>...</div>
```

#### ❌ Untyped Props
```typescript
// AVOID
export function ProductCard({ product }: any) { ... }

// USE
export function ProductCard({ product }: { product: Product }) { ... }
```

#### ❌ Mutating State Directly
```typescript
// AVOID
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // Direct mutation

// USE
setItems([...items, 4]); // Create new array
```

### Performance Pitfalls

#### ❌ Missing Keys in Lists
```typescript
// AVOID
{products.map(product => (
  <ProductCard product={product} />
))}

// USE
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
```

#### ❌ Recreating Functions in Render
```typescript
// AVOID
{products.map(product => (
  <button onClick={() => handleClick(product.id)}>Buy</button>
))}

// USE - Memoize if performance critical
const handleProductClick = useCallback((id: number) => {
  handleClick(id);
}, [handleClick]);
```

#### ❌ Large Bundle Sizes
```typescript
// AVOID - Imports entire library
import _ from "lodash";

// USE - Import only what you need
import debounce from "lodash/debounce";
```

---

## Quick Reference

### Component Checklist
When creating a new component, ensure:
- [ ] Named export (not default)
- [ ] Proper "use client" directive if needed
- [ ] TypeScript types for props
- [ ] Imports use `@/` path alias
- [ ] Responsive classes for mobile-first design
- [ ] Accessibility attributes (aria-label, semantic HTML)
- [ ] Constants defined at top if reused
- [ ] Proper key props for mapped elements

### Mobile-First Checklist
When adding responsive features:
- [ ] Base styles work on mobile (320px+)
- [ ] Use standard container padding pattern
- [ ] Test at breakpoints: 640, 768, 1024, 1280, 1536
- [ ] Touch-friendly tap targets (min 44x44px)
- [ ] Horizontal scroll works with touch
- [ ] Mobile menu/navigation if applicable

### Pre-Commit Checklist
Before committing code:
- [ ] Code builds without errors (`npm run build`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No linting errors (`npm run lint`)
- [ ] Tested in development mode
- [ ] Commit message follows convention
- [ ] No console.logs left in code
- [ ] No commented-out code blocks

---

## Additional Resources

### Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Project-Specific Patterns
Refer to existing components for examples:
- **Interactive State**: `components/Header.tsx`
- **Touch Gestures**: `components/dashboard/Hero.tsx`
- **Horizontal Scroll**: `components/dashboard/NewArrivals.tsx`
- **Responsive Design**: `components/Footer.tsx`
- **Icon System**: `components/icons.tsx`
- **Type Definitions**: `components/dashboard/ProductCard.tsx`

---

## Changelog

### Recent Development Focus (Nov 2025)
- ✅ Mobile-first responsive design implementation
- ✅ Touch gesture support for sliders
- ✅ Collapsible mobile sections
- ✅ Full-screen mobile menu overlay
- ✅ Horizontal scrolling product grids
- ✅ Social media integration
- ✅ Search bar improvements

### Upcoming Considerations
- [ ] API integration for dynamic data
- [ ] Product detail pages (`/products/[id]`)
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Checkout flow
- [ ] Testing framework setup
- [ ] Performance monitoring
- [ ] SEO optimization

---

**End of CLAUDE.md**

> This document is maintained for AI assistants to understand and contribute to the Nimble codebase effectively. Update this file when significant architectural changes occur.
