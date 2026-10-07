import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/Rating";
import Reveal from "@/components/Reveal";
import { reviews, type Review } from "@/components/ReviewsSection";
import InstagramSection from "@/components/InstagramSection";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Reviews — 4.8★ from 12,000+ Shoppers",
  description:
    "Read verified reviews from the LABEL BY NIDHI community. 96% would buy again.",
};

const BREAKDOWN = [
  { stars: 5, pct: 84 },
  { stars: 4, pct: 11 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const PHOTO_POSTS: { id: string; name: string }[] = [
  { id: "photo-1483985988355-763728e1935b", name: "Aanya · Neon Riot Blazer" },
  { id: "photo-1469334031218-e382a71b716b", name: "Meher · Resort Heat fit" },
  { id: "photo-1515886657613-9f3515b0c78f", name: "Riya · Slip Dress" },
  { id: "photo-1509631179647-0177331693ae", name: "Tanya · Corset + Cargo" },
  { id: "photo-1487222477894-8943e31ef7b2", name: "Kabir · Power Dressing" },
  { id: "photo-1496747611176-843222e1e57c", name: "Ishita · Afterglow Wrap" },
  { id: "photo-1490481651871-ab68de25d43d", name: "Sara · Neon Nights" },
  { id: "photo-1445205170230-053b83016050", name: "Dev · Street Statement" },
];

function ReviewCard({ r, delay }: { r: Review; delay: number }) {
  return (
    <Reveal delay={delay}>
      <figure className="h-full rounded-2xl border border-ink/10 bg-white p-6 flex flex-col hover:shadow-[0_16px_50px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-400">
        <div className="flex items-center justify-between">
          <Rating value={r.rating} className="text-tango" />
          <span className="text-[11px] text-ink/40">
            {new Date(r.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <p className="font-semibold text-[15px] mt-3.5">{r.title}</p>
        <p className="text-sm text-ink/65 mt-2 flex-1 leading-relaxed">{r.body}</p>

        <div className="mt-4 pt-4 border-t border-ink/10">
          <p className="text-[11px] uppercase tracking-wider text-grape font-bold">
            Purchased: {r.product}
          </p>
          <figcaption className="flex items-center gap-3 mt-3">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-hot to-grape text-white grid place-items-center font-bold text-xs">
              {r.name.charAt(0)}
            </span>
            <div className="text-xs">
              <p className="font-semibold">
                {r.name}
                {r.verified && (
                  <span className="ml-2 text-volt font-bold">✓ Verified</span>
                )}
              </p>
              <p className="text-ink/50">{r.location}</p>
            </div>
          </figcaption>
        </div>
      </figure>
    </Reveal>
  );
}

export default function ReviewsPage() {
  const avg = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <>
      {/* Hero + summary */}
      <section className="relative overflow-hidden bg-ink text-white grain">
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-tango/30 blur-[110px]" />
        <div className="absolute -bottom-32 -right-10 w-96 h-96 rounded-full bg-hot/30 blur-[120px]" />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <nav className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-6">
            <Link href="/" className="hover:text-hot">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Reviews</span>
          </nav>

          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-4">
              ★ Verified reviews
            </p>
            <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.88]">
              REAL PEOPLE.
              <br />
              <span className="text-gradient-warm">REAL CONFIDENCE.</span>
            </h1>
          </Reveal>

          <div className="mt-10 grid lg:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Score card */}
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white/5 border border-white/15 backdrop-blur p-6">
                <div className="flex items-end gap-3">
                  <span className="font-display text-6xl leading-none text-hot">
                    {avg}
                  </span>
                  <div className="mb-1.5">
                    <Rating value={4.8} size={16} className="text-tango" />
                    <p className="text-[11px] text-white/55 mt-1">
                      12,043 reviews
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {BREAKDOWN.map((b) => (
                    <div key={b.stars} className="flex items-center gap-2.5">
                      <span className="text-[11px] text-white/60 w-3">
                        {b.stars}★
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-hot to-tango"
                          style={{ width: `${b.pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-white/50 w-8 text-right">
                        {b.pct}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-white/5 py-3">
                    <p className="font-display text-xl text-volt">96%</p>
                    <p className="text-[10px] text-white/55 mt-1">
                      Would rebuy
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 py-3">
                    <p className="font-display text-xl text-grape">48h</p>
                    <p className="text-[10px] text-white/55 mt-1">Avg delivery</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Rating highlights */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { t: "Fit", v: "4.9", d: "True to size, flattering cuts", c: "text-hot" },
                { t: "Quality", v: "4.8", d: "Premium fabrics, clean stitching", c: "text-grape" },
                { t: "Value", v: "4.7", d: "Worth every rupee, they say", c: "text-volt" },
              ].map((h, i) => (
                <Reveal key={h.t} delay={0.15 + i * 0.08}>
                  <div className="h-full rounded-2xl bg-white/5 border border-white/15 p-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                        {h.t}
                      </span>
                      <span className={`font-display text-3xl ${h.c}`}>
                        {h.v}
                      </span>
                    </div>
                    <div className="mt-1">
                      <Rating value={Number(h.v)} size={13} className="text-tango" />
                    </div>
                    <p className="text-xs text-white/55 mt-2.5 leading-relaxed">
                      {h.d}
                    </p>
                  </div>
                </Reveal>
              ))}

              {/* Featured pull quote */}
              <Reveal delay={0.4} className="sm:col-span-3">
                <blockquote className="rounded-2xl bg-gradient-to-r from-hot/15 via-grape/15 to-volt/15 border border-white/15 p-6">
                  <p className="font-accent italic text-lg sm:text-xl leading-snug text-white/90">
                    “I’ve never received this many compliments on a single
                    piece. It fits like it was made for me.”
                  </p>
                  <footer className="text-xs text-white/55 mt-3 uppercase tracking-widest">
                    — Aanya S., Mumbai · Verified buyer
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* All reviews */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl sm:text-5xl leading-[0.92]">
              ALL <span className="text-gradient-brand">REVIEWS</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-ink/50">
              {reviews.length} shown · sorted by most recent
            </p>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <ReviewCard key={r.id} r={r} delay={i * 0.06} />
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <p className="text-ink/60 text-sm mb-4">
              Bought something? Tell the world how it made you feel.
            </p>
            <Link
              href="/new-arrivals"
              className="inline-flex px-8 py-4 rounded-full bg-ink text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-hot transition-colors duration-300"
            >
              Shop Bestsellers
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Photo reviews */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.35em] text-grape font-semibold mb-4">
              #WearYourConfidence
            </p>
            <h2 className="font-display text-3xl sm:text-5xl leading-[0.92]">
              YOUR FITS, <span className="text-gradient-warm">OUR FAVORITE</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {PHOTO_POSTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square rounded-xl overflow-hidden bg-smoke"
                >
                  <Image
                    src={`https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=500&q=80`}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-[11px] font-semibold">
                      {p.name}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InstagramSection />
      <Newsletter />
    </>
  );
}
