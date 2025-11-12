import { Header } from "@/components/Header";
import { Hero } from "@/components/dashboard/Hero";
import { ShopByCategory } from "@/components/dashboard/ShopByCategory";
import { NewArrivals } from "@/components/dashboard/NewArrivals";
import { FlashSale } from "@/components/dashboard/FlashSale";
import { FeaturedProducts } from "@/components/dashboard/FeaturedProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1330px]">
        <Hero />
        <NewArrivals />
        <FlashSale />
        <FeaturedProducts />
        <ShopByCategory />
      </main>
    </div>
  );
}
