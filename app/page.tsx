import { Header } from "@/components/Header";
import { Hero } from "@/components/dashboard/Hero";
import { ShopByCategory } from "@/components/dashboard/ShopByCategory";
import { NewArrivals } from "@/components/dashboard/NewArrivals";
import { FlashSale } from "@/components/dashboard/FlashSale";
import { FeaturedProducts } from "@/components/dashboard/FeaturedProducts";
import { FeaturedCollections } from "@/components/dashboard/FeaturedCollections";
import { Testimonials } from "@/components/dashboard/Testimonials";
import { InspiredSpaces } from "@/components/dashboard/InspiredSpaces";
import { PromoBanners } from "@/components/dashboard/PromoBanners";
import { CategoryChips } from "@/components/dashboard/CategoryChips";
import { ShopOurOffers } from "@/components/dashboard/ShopOurOffers";
import { MeetOurTeam } from "@/components/dashboard/MeetOurTeam";
import { ClientTestimonials } from "@/components/dashboard/ClientTestimonials";
import { ApproachFeatures } from "@/components/dashboard/ApproachFeatures";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <Header />
      <main>
        <div className="mx-auto max-w-[1330px]">
          <Hero />
          <NewArrivals />
          <FlashSale />
          <FeaturedProducts />
          <ShopByCategory />
          <FeaturedCollections />
        </div>
        <Testimonials />
        <div className="mx-auto max-w-[1330px]">
          <InspiredSpaces />
          <PromoBanners />
          <CategoryChips />
          <ShopOurOffers />
        </div>
        <MeetOurTeam />
        <ClientTestimonials />
        <ApproachFeatures />
      </main>
    </div>
  );
}
