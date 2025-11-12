import Image from "next/image";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  image: string;
  isSpecial?: boolean;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Sale Items",
    image: "/images/categories/sale.jpg",
    isSpecial: true, // For the red background
  },
  {
    id: 2,
    name: "Press Tables",
    image: "/images/categories/press-tables.jpg",
  },
  {
    id: 3,
    name: "Lighting",
    image: "/images/categories/lighting.jpg",
  },
  {
    id: 4,
    name: "Spoke Sofa",
    image: "/images/categories/spoke-sofa.jpg",
  },
  {
    id: 5,
    name: "Storage",
    image: "/images/categories/storage.jpg",
  },
  {
    id: 6,
    name: "Turn Chairs",
    image: "/images/categories/turn-chairs.jpg",
  },
  {
    id: 7,
    name: "Longe Chairs",
    image: "/images/categories/longe-chairs.jpg",
  },
  {
    id: 8,
    name: "Curve Coat",
    image: "/images/categories/curve-coat.jpg",
  },
  {
    id: 9,
    name: "Cross Tables",
    image: "/images/categories/cross-tables.jpg",
  },
  {
    id: 10,
    name: "Bend Chairs",
    image: "/images/categories/bend-chairs.jpg",
  },
  {
    id: 11,
    name: "Bar Chairs",
    image: "/images/categories/bar-chairs.jpg",
  },
  {
    id: 12,
    name: "Accessories",
    image: "/images/categories/accessories.jpg",
  },
];

export function ShopByCategory() {
  return (
    <section className="px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-[32px] font-bold">Shop By Categories</h2>
        <Link
          href="/categories"
          className="group flex items-center gap-2 text-[15px] font-medium"
          aria-label="View all product categories"
        >
          <span className="relative">
            Shop All Products
            <span className="absolute bottom-0 left-0 h-[1px] w-full origin-right scale-x-0 bg-black transition-transform duration-200 ease-out group-hover:origin-left group-hover:scale-x-100"></span>
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-xl sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group flex h-[201px] flex-col items-center justify-center gap-4 border border-zinc-200 transition-colors hover:bg-zinc-50"
          >
            <div className="relative h-[110px] w-[110px] overflow-hidden rounded-full bg-zinc-100 transition-transform group-hover:scale-105">
              {category.isSpecial ? (
                <div className="flex h-full w-full items-center justify-center bg-red-600">
                  <span className="text-3xl font-bold text-white">Sale</span>
                </div>
              ) : (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <h3 className="text-center text-[15px] font-medium text-black transition-colors group-hover:text-zinc-600">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
