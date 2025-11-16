"use client";

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";


export function FeaturedProducts() {
  const t = useTranslation();

  const products = [
    {
      id: 1,
      category: t.featuredProducts.categories.danishDesign,
      title: "Material Natural",
      productName: t.featuredProducts.products[0].name,
      price: t.featuredProducts.products[0].price,
      image: "/images/products/chair.jpg",
      bgColor: "from-stone-300 to-stone-400",
      iconBg: "🪑",
    },
    {
      id: 2,
      category: t.featuredProducts.categories.cottonCollection,
      title: "Authority Design",
      productName: t.featuredProducts.products[1].name,
      price: t.featuredProducts.products[1].price,
      image: "/images/products/candle.jpg",
      bgColor: "from-amber-900 to-stone-900",
      iconBg: "🕯️",
    },
    {
      id: 3,
      category: t.featuredProducts.categories.minimalismStyle,
      title: "Steels Lighting",
      productName: t.featuredProducts.products[2].name,
      price: t.featuredProducts.products[2].price,
      image: "/images/products/lamp.jpg",
      bgColor: "from-red-700 to-red-900",
      iconBg: "💡",
    },
    {
      id: 4,
      category: t.featuredProducts.categories.nightstand,
      title: "Nightstand",
      productName: t.featuredProducts.products[3].name,
      price: t.featuredProducts.products[3].price,
      image: "/images/products/nightstand.jpg",
      bgColor: "from-stone-500 to-stone-700",
      iconBg: "🗄️",
    },
  ];

  return (
    <section className="px-4 pt-[40px]">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group relative flex-shrink-0 overflow-hidden rounded-xl w-[280px] md:w-auto"
          >
            {/* Background with Gradient Placeholder */}
            <div className={`relative h-[437px] bg-gradient-to-br ${product.bgColor}`}>
              {/* Content at Bottom */}
              <div className="absolute inset-x-0 bottom-0">
                {/* Category and Title */}
                <div className="px-6 pb-4">
                  <p className="mb-1 text-sm font-semibold text-white">
                    {product.category}
                  </p>
                  <h3 className="text-3xl font-bold text-white">
                    {product.title}
                  </h3>
                </div>

                {/* Bottom Bar with Background */}
                <div className="bg-black/40 backdrop-blur-sm px-3 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Product Icon */}
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white text-xl">
                        {product.iconBg}
                      </div>
                      {/* Product Info */}
                      <div>
                        <p className="text-sm font-medium text-white">
                          {product.productName}
                        </p>
                        <p className="text-base font-bold text-white">
                          {product.price}
                        </p>
                      </div>
                    </div>

                    {/* Shop Button */}
                    <button className="flex-shrink-0 rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white">
                      {t.featuredProducts.shopButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
