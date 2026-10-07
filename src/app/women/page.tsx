import type { Metadata } from "next";
import { byGender } from "@/data/products";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/ProductGrid";
import InstagramSection from "@/components/InstagramSection";

export const metadata: Metadata = {
  title: "Women",
  description:
    "The women's edit — dresses, tailoring, statement tops and more from LABEL BY NIDHI.",
};

export default function WomenPage() {
  const list = byGender("women");

  return (
    <>
      <PageHero
        eyebrow="The women's edit"
        title="WOMEN"
        accent="EDIT"
        description="From power tailoring to after-dark satin — pieces designed to flatter, built to be noticed. This is your wardrobe's loudest chapter."
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
