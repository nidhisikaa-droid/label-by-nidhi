import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  collections,
  getCollection,
  productsInCollection,
} from "@/data/products";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/ProductGrid";
import InstagramSection from "@/components/InstagramSection";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection" };
  return {
    title: collection.name,
    description: `${collection.tagline} — shop the ${collection.name} collection at LABEL BY NIDHI.`,
  };
}

export default async function CollectionPage({
  params,
}: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const list = productsInCollection(slug);

  return (
    <>
      <PageHero
        eyebrow="Collection"
        title={collection.name.toUpperCase()}
        description={collection.tagline}
        count={list.length}
      />
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {list.length > 0 ? (
            <ProductGrid products={list} />
          ) : (
            <div className="py-24 text-center">
              <p className="font-display text-4xl mb-3">COMING SOON</p>
              <p className="text-ink/60">
                This edit is being styled. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>
      <InstagramSection />
    </>
  );
}
