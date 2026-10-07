import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import InstagramSection from "@/components/InstagramSection";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind LABEL BY NIDHI — fearless design, premium fabrics, and a mission to make you wear your confidence.",
};

const TIMELINE = [
  {
    year: "2019",
    title: "A sketchbook becomes a label",
    body: "Nidhi starts cutting patterns in a one-room studio in Mumbai, selling first drops to friends and Instagram DMs.",
    accent: "#ff2e93",
  },
  {
    year: "2021",
    title: "The Neon Nights drop",
    body: "The first full collection sells out in 72 hours. Bold color becomes the brand’s signature.",
    accent: "#7b2cff",
  },
  {
    year: "2023",
    title: "240k and counting",
    body: "A community of confidence-chasers grows across India — creators, dancers, founders, rule-breakers.",
    accent: "#1f3cff",
  },
  {
    year: "2026",
    title: "This chapter",
    body: "150+ original designs a year, ethically manufactured, shipped in 48 hours — and we’re just warming up.",
    accent: "#ff6b00",
  },
];

const VALUES = [
  {
    icon: "⚡",
    title: "Fearless by design",
    body: "No beige. No blending in. Every piece starts with a question: does this make you stand taller?",
  },
  {
    icon: "🧵",
    title: "Fabric first",
    body: "We sample 20+ textiles to find the one. Heavyweight cottons, liquid satins, structured crepes — quality you can feel.",
  },
  {
    icon: "🤝",
    title: "Made responsibly",
    body: "Small-batch production with vetted partners. We over-produce nothing and mark down what doesn’t move.",
  },
  {
    icon: "💫",
    title: "Confidence is the product",
    body: "The clothes are the medium. What you actually buy is the way you walk into the room.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white grain">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-hot/35 blur-[130px]" />
        <div className="absolute -bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-grape/35 blur-[130px]" />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-5">
              The story
            </p>
            <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] leading-[0.88] max-w-5xl">
              WE DON’T MAKE CLOTHES.
              <br />
              <span className="text-gradient-warm">WE MAKE ENTRANCES.</span>
            </h1>
            <p className="mt-7 text-white/70 max-w-2xl leading-relaxed text-base sm:text-lg">
              LABEL BY NIDHI is an independent fashion label built on one
              stubborn belief — that getting dressed should feel like a
              declaration. Since 2019 we’ve designed premium, saturated,
              unapologetic pieces for people who refuse to disappear into the
              background.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founder split */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-smoke">
                <Image
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85"
                  alt="Nidhi, founder of LABEL BY NIDHI"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-5 left-5 px-5 py-3 rounded-2xl bg-white shadow-xl">
                  <p className="font-display text-lg leading-none text-hot">
                    NIDHI
                  </p>
                  <p className="text-[11px] text-ink/60 mt-1">
                    Founder & Creative Director
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[11px] uppercase tracking-[0.35em] text-grape font-semibold mb-5">
                From the founder
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.92]">
                HI, I’M NIDHI.
                <br />
                <span className="text-gradient-brand">YOUR LABEL.</span>
              </h2>
              <div className="mt-6 space-y-4 text-ink/70 leading-relaxed">
                <p>
                  I started this label because I was tired of wardrobes that
                  asked me to be quieter. Every piece we make begins as a
                  feeling — the rush of walking into a room knowing you look
                  unforgettable — and ends as fabric you never want to take off.
                </p>
                <p>
                  We design in small batches, obsess over fit, and choose color
                  the way painters do: loudly. If it doesn’t give you
                  confidence, it doesn’t leave the studio.
                </p>
                <p className="font-accent italic text-xl text-ink">
                  “Wear your confidence. The rest is just clothing.”
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                {[
                  { n: "150+", l: "Designs / year" },
                  { n: "12k+", l: "5★ reviews" },
                  { n: "48h", l: "Delivery" },
                ].map((s) => (
                  <div key={s.l} className="border-l-2 border-hot pl-3">
                    <p className="font-display text-2xl leading-none">{s.n}</p>
                    <p className="text-[11px] text-ink/55 mt-1.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-4">
              What we stand for
            </p>
            <h2 className="font-display text-4xl sm:text-6xl leading-[0.9]">
              THE <span className="text-gradient-brand">CODE</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white border border-ink/10 p-7 hover:border-hot/50 hover:-translate-y-1 transition-all duration-400">
                  <div className="text-3xl">{v.icon}</div>
                  <h3 className="font-display text-2xl mt-4">{v.title}</h3>
                  <p className="text-sm text-ink/65 mt-2.5 leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-ink text-white grain relative overflow-hidden">
        <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-volt/30 blur-[110px]" />
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-4">
              The journey
            </p>
            <h2 className="font-display text-4xl sm:text-6xl leading-[0.9]">
              FROM STUDIO TO <span className="text-gradient-warm">STREET</span>
            </h2>
          </Reveal>

          <div className="relative max-w-3xl mx-auto">
            {/* Line */}
            <div className="absolute left-[7px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-white/15 sm:-translate-x-1/2" />

            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.1}>
                  <div
                    className={`relative pl-10 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 ${
                      i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Dot */}
                    <span
                      className="absolute left-0 sm:left-1/2 top-2 w-4 h-4 rounded-full -translate-x-0 sm:-translate-x-1/2 ring-4 ring-ink"
                      style={{ backgroundColor: t.accent }}
                    />
                    <div
                      className={`${i % 2 === 1 ? "sm:text-left sm:pl-8" : "sm:text-right sm:pr-8"}`}
                    >
                      <p
                        className="font-display text-4xl leading-none"
                        style={{ color: t.accent }}
                      >
                        {t.year}
                      </p>
                      <h3 className="font-semibold text-lg mt-2">{t.title}</h3>
                      <p className="text-sm text-white/65 mt-2 leading-relaxed">
                        {t.body}
                      </p>
                    </div>
                    <div className="hidden sm:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-white text-center">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-6xl leading-[0.9]">
              READY TO BE
              <br />
              <span className="text-gradient-brand">UNIGNORABLE?</span>
            </h2>
            <p className="mt-5 text-ink/60">
              Explore the pieces our community can’t stop talking about.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/new-arrivals"
                className="px-8 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-ink transition-colors duration-300"
              >
                Shop New Arrivals
              </Link>
              <Link href="/collections" className="btn-outline">
                View Collections
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <InstagramSection />
      <Newsletter />
    </>
  );
}
