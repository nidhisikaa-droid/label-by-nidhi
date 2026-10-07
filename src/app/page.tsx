import Image from "next/image";
import Link from "next/link";
import {
  collections,
  newArrivals,
  products,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import ReviewsSection from "@/components/ReviewsSection";
import InstagramSection from "@/components/InstagramSection";
import Hero from "@/components/Hero";

const CATEGORIES = [
  { label: "Women", href: "/women", image: "photo-1485462537746-965f33f7f6a7", color: "#ff2e93" },
  { label: "Men", href: "/men", image: "photo-1516257984-b1b4d707412e", color: "#1f3cff" },
  { label: "New In", href: "/new-arrivals", image: "photo-1490481651871-ab68de25d43d", color: "#7b2cff" },
  { label: "Sale", href: "/sale", image: "photo-1441984904996-e0b6ba687e04", color: "#ff6b00" },
];

export default function Home() {
  const featured = newArrivals().slice(0, 4);
  const trending = products.filter((p) => p.badge === "hot").slice(0, 4);
  const bestsellers = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  return (
    <>
      <Hero />


      {/* ══════════ CATEGORY TILES ══════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="flex items-end justify-between gap-6 mb-9">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[0.92]">
              SHOP BY
              <br />
              <span className="text-gradient-brand">MOOD</span>
            </h2>
            <p className="hidden sm:block text-sm text-ink/55 max-w-xs text-right">
              Four entrances. Zero wrong turns. Pick your energy and we’ll take
              it from there.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 0.08}>
                <Link
                  href={cat.href}
                  className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-smoke"
                >
                  <Image
                    src={`https://images.unsplash.com/${cat.image}?auto=format&fit=crop&w=700&q=80`}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="font-display text-2xl sm:text-3xl text-white block leading-none">
                      {cat.label}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80 group-hover:gap-3 transition-all">
                      Shop now →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEW ARRIVALS ══════════ */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-9">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-grape font-semibold mb-3">
                Fresh off the runway
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[0.92]">
                NEW <span className="text-gradient-brand">ARRIVALS</span>
              </h2>
            </div>
            <Link href="/new-arrivals" className="btn-outline shrink-0">
              View All →
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EDITORIAL SPLIT ══════════ */}
      <section className="relative overflow-hidden bg-volt text-white grain">
        <div className="absolute -top-32 right-0 w-[30rem] h-[30rem] rounded-full bg-grape/50 blur-[130px]" />
        <div className="absolute bottom-0 -left-20 w-[26rem] h-[26rem] rounded-full bg-hot/40 blur-[120px]" />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                <Image
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85"
                  alt="LABEL BY NIDHI editorial"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 px-5 py-3 rounded-2xl bg-white/95 backdrop-blur text-ink">
                  <p className="font-display text-lg leading-none">AUTUMN ’26</p>
                  <p className="text-[11px] text-ink/60 mt-1">
                    Campaign shot in Mumbai
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-5">
                The Manifesto
              </p>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.9]">
                DRESS LIKE
                <br />
                YOU MEAN IT.
              </h2>
              <p className="mt-6 text-white/75 leading-relaxed max-w-lg">
                LABEL BY NIDHI was born from a simple belief: what you wear
                should match who you are. We design statement pieces in
                saturated color with premium fabrics — for the ones who walk in
                and own the room.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  { n: "150+", l: "Original designs / year" },
                  { n: "240k", l: "Community strong" },
                  { n: "48h", l: "Pan-India delivery" },
                ].map((s) => (
                  <div key={s.l} className="border-l-2 border-hot pl-3">
                    <p className="font-display text-2xl sm:text-3xl leading-none">
                      {s.n}
                    </p>
                    <p className="text-[11px] text-white/60 mt-1.5 leading-snug">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="px-7 py-3.5 rounded-full bg-white text-ink font-bold text-xs tracking-[0.16em] uppercase hover:bg-hot hover:text-white transition-colors duration-300"
                >
                  Our Story
                </Link>
                <Link
                  href="/women"
                  className="px-7 py-3.5 rounded-full border-2 border-white/40 font-bold text-xs tracking-[0.16em] uppercase hover:border-white hover:bg-white hover:text-ink transition-all duration-300"
                >
                  Shop The Edit
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ TRENDING ══════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-9">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-tango font-semibold mb-3">
                Everyone’s talking about
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[0.92]">
                TRENDING <span className="text-gradient-warm">NOW</span>
              </h2>
            </div>
            <Link href="/new-arrivals" className="btn-outline shrink-0">
              Shop The Hype →
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
            {trending.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ COLLECTIONS ══════════ */}
      <section className="py-16 sm:py-24 bg-ink text-white overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-4">
              Curated Edits
            </p>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.9]">
              THE <span className="text-gradient-brand">COLLECTIONS</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {collections.slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.1}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group relative block aspect-[4/5] rounded-3xl overflow-hidden"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-45 mix-blend-multiply transition-opacity group-hover:opacity-65"
                    style={{ backgroundColor: c.accent }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span
                      className="text-[10px] uppercase tracking-[0.28em] font-bold"
                      style={{ color: c.accent }}
                    >
                      Collection
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl mt-1.5 leading-none">
                      {c.name}
                    </h3>
                    <p className="text-sm text-white/75 mt-2">{c.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold group-hover:gap-4 transition-all">
                      Explore →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-10">
            <Link
              href="/collections"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 font-bold text-xs tracking-[0.16em] uppercase hover:border-hot hover:bg-hot transition-all duration-300"
            >
              View All Collections →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════ BESTSELLERS ══════════ */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-9">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-3">
                Most loved
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[0.92]">
                BEST<span className="text-gradient-brand">SELLERS</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-ink/60 shrink-0">
              <RatingChip /> Rated 4.8+ by 12,000+ shoppers
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
            {bestsellers.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ VALUE PROPS ══════════ */}
      <section className="py-14 bg-white border-y border-ink/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🚚", t: "Free Shipping", d: "On all orders over ₹2,999" },
              { icon: "↩️", t: "Easy Returns", d: "14-day no-questions policy" },
              { icon: "🔒", t: "Secure Checkout", d: "UPI, cards & PayPal" },
              { icon: "💬", t: "Real Support", d: "Humans, Mon–Sat 10–7" },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 0.07}>
                <div className="text-center sm:text-left">
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <p className="font-display text-lg leading-none">{v.t}</p>
                  <p className="text-xs text-ink/55 mt-1.5">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
      <InstagramSection />
    </>
  );
}

function RatingChip() {
  return <span className="text-tango">★★★★★</span>;
}
