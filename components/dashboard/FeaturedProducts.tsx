"use client";

import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";

const productKeys = [
  {
    id: 1,
    categoryKey: "danishDesign",
    titleKey: "materialNatural",
    productNameKey: "gridChairFrame",
    price: "$309.00",
    image: "/images/products/chair.jpg",
    bgColor: "from-stone-300 to-stone-400",
    iconBg: "🪑",
  },
  {
    id: 2,
    categoryKey: "cottonCollection",
    titleKey: "authorityDesign",
    productNameKey: "lunaraTeaTowel",
    price: "$27.00",
    image: "/images/products/candle.jpg",
    bgColor: "from-amber-900 to-stone-900",
    iconBg: "🕯️",
  },
  {
    id: 3,
    categoryKey: "minimalismStyle",
    titleKey: "steelsLighting",
    productNameKey: "sculptTableLamp",
    price: "$415.00",
    image: "/images/products/lamp.jpg",
    bgColor: "from-red-700 to-red-900",
    iconBg: "💡",
  },
  {
    id: 4,
    categoryKey: "danishDesign",
    titleKey: "nightstand",
    productNameKey: "pixelShelves",
    price: "$85.00",
    image: "/images/products/nightstand.jpg",
    bgColor: "from-stone-500 to-stone-700",
    iconBg: "🗄️",
  },
];

export function FeaturedProducts() {
  const t = useTranslations("home.featuredProducts");

  return (
    <section className="px-4 pt-[40px]">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4">
        {productKeys.map((product) => (
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
                    {t(`products.${product.categoryKey}`)}
                  </p>
                  <h3 className="text-3xl font-bold text-white">
                    {t(`products.${product.titleKey}`)}
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
                          {t(`products.${product.productNameKey}`)}
                        </p>
                        <p className="text-base font-bold text-white">
                          {product.price}
                        </p>
                      </div>
                    </div>

                    {/* Shop Button */}
                    <button className="flex-shrink-0 rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white">
                      {t("shopButton")}
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
