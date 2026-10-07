import type { Metadata } from "next";
import { newArrivals, products } from "@/data/products";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/ProductGrid";
import InstagramSection from "@/components/InstagramSection";

export const metadata: Metadata = {
  title: "New Arrivals",
  description:
    "Fresh off the runway — shop the newest drops from LABEL BY NIDHI.",
};

export default function NewArrivalsPage() {
  const list = newArrivals().length ? newArrivals() : products;

  return (
    <>
      <PageHero
        eyebrow="Fresh off the runway"
        title="NEW"
        accent="ARRIVALS"
        description="The latest drops, added weekly. Bold color, premium fabric, zero apologies — be the first to wear what's next."
        count={list.length}
      />
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <ProductGrid products={list} />
        </div>
      </section>
      <InstagramSection />
    </>
  );
}
