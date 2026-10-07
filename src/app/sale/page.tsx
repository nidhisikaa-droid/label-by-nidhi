import type { Metadata } from "next";
import { saleProducts } from "@/data/products";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/ProductGrid";
import InstagramSection from "@/components/InstagramSection";

export const metadata: Metadata = {
  title: "Sale — Up to 40% Off",
  description:
    "Last chance pricing on statement pieces. Sale ends soon — LABEL BY NIDHI.",
};

export default function SalePage() {
  const list = saleProducts();

  return (
    <>
      <PageHero
        eyebrow="⚠ Final markdowns — while stocks last"
        title="SUPER"
        accent="SALE"
        description="Up to 40% off the pieces you've been eyeing. When they're gone, they're gone — no restocks, no regrets."
        count={list.length}
      />
      <section className="py-12 sm:py-16 bg-gradient-to-b from-cherry/5 to-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <ProductGrid products={list} />
        </div>
      </section>
      <InstagramSection />
    </>
  );
}
