import type { Metadata } from "next";
import { byGender } from "@/data/products";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/ProductGrid";
import InstagramSection from "@/components/InstagramSection";

export const metadata: Metadata = {
  title: "Men",
  description:
    "The men's edit — outerwear, knitwear, denim and streetwear from LABEL BY NIDHI.",
};

export default function MenPage() {
  const list = byGender("men");

  return (
    <>
      <PageHero
        eyebrow="The men's edit"
        title="MEN"
        accent="EDIT"
        description="Sharp tailoring, heavyweight streetwear and color that refuses to sit quietly. Dress like the plot depends on it."
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
