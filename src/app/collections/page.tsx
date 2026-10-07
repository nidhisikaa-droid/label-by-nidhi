import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { collections, productsInCollection } from "@/data/products";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Curated edits from LABEL BY NIDHI — Neon Nights, Power Dressing, Street Statement and more.",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Curated edits"
        title="THE"
        accent="COLLECTIONS"
        description="Five distinct energies, one fearless label. Each collection is a complete mood — shop the one that matches yours."
        count={collections.length}
      />

      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 gap-5 lg:gap-7">
            {collections.map((c, i) => {
              const count = productsInCollection(c.slug).length;
              return (
                <Reveal key={c.slug} delay={i * 0.08}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className={`group relative block rounded-3xl overflow-hidden ${
                      i === 0 ? "sm:col-span-2 aspect-[16/10] sm:aspect-[21/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes={i === 0 ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-50 mix-blend-multiply transition-opacity group-hover:opacity-70"
                      style={{ backgroundColor: c.accent }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <span
                        className="text-[10px] uppercase tracking-[0.3em] font-bold"
                        style={{ color: c.accent }}
                      >
                        {count} pieces
                      </span>
                      <h2 className="font-display text-3xl sm:text-5xl mt-2 leading-none text-white">
                        {c.name}
                      </h2>
                      <p className="text-white/75 text-sm sm:text-base mt-2 max-w-md">
                        {c.tagline}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-bold text-white group-hover:gap-4 transition-all">
                        Explore collection →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
