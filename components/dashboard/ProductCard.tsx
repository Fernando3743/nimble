import Image from "next/image";
import { icons } from "../icons";

// ===== TYPES =====
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

// ===== CONSTANTS =====
const SALE_COLOR = "#C4523C";
const GRAY_COLOR = "#666666";

// ===== COMPONENT =====
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative shrink-0 transition hover:opacity-90">
      {/* Product Image */}
      <div className="relative mb-4 h-[242px] w-[242px] overflow-hidden rounded-3xl bg-zinc-100">
        {product.onSale && (
          <span
            className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: SALE_COLOR }}
          >
            Sale
          </span>
        )}
        <Image
          src={product.image}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          alt={product.name}
        />
      </div>

      {/* Selling Fast Badge */}
      {product.sellingFast && (
        <div
          className="mb-2 flex items-center gap-1 text-sm font-medium"
          style={{ color: SALE_COLOR }}
        >
          {icons.star({ className: "size-4" })}
          Selling Fast
        </div>
      )}

      {/* Product Info */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {product.category}
        </p>
        <h3 className="text-[15px] font-semibold text-black">{product.name}</h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span
            className="text-[15px] font-semibold"
            style={{ color: product.onSale ? SALE_COLOR : GRAY_COLOR }}
          >
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span
              className="text-[15px] line-through"
              style={{ color: GRAY_COLOR }}
            >
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex gap-2 pt-1">
          {product.colors.map((color, index) => (
            <button
              key={`${product.id}-color-${index}`}
              className="size-5 rounded-full border-2 border-white shadow-sm ring-1 ring-zinc-200 transition hover:scale-110"
              style={{ backgroundColor: color }}
              type="button"
              aria-label={`${product.name} color option ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
