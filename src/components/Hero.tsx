"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/data/products";

const HERO_IMAGES = [
  "photo-1509631179647-0177331693ae",
  "photo-1487222477894-8943e31ef7b2",
  "photo-1539109136881-3be0616acf4b",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white grain">
      {/* Animated glow orbs */}
      <motion.div
        className="absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full bg-hot/35 blur-[130px]"
        animate={{ y: [0, 40, 0], x: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 -right-40 w-[36rem] h-[36rem] rounded-full bg-volt/35 blur-[140px]"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 left-1/3 w-[30rem] h-[30rem] rounded-full bg-grape/30 blur-[130px]"
        animate={{ y: [0, -35, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-hot animate-pulse-dot" />
              Autumn Drop 2026 is live
            </motion.p>

            <h1
              aria-label="LABEL BY NIDHI — WEAR YOUR CONFIDENCE."
              className="mt-7 font-display leading-[0.86] text-[clamp(3rem,10vw,7.5rem)]"
            >
              {/* Exact headline for SEO / screen readers */}
              <span className="sr-only">LABEL BY NIDHI — WEAR YOUR CONFIDENCE.</span>
              <span aria-hidden="true">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                LABEL
                <span className="font-accent italic lowercase font-normal text-hot text-[0.42em] align-super ml-3">
                  by Nidhi
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gradient-warm"
              >
                WEAR YOUR
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                CONFIDENCE.
              </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-white/70 text-base sm:text-lg max-w-lg leading-relaxed"
            >
              Premium fashion with a loud heart. Saturated color, fearless cuts
              and fabrics that feel as good as they look — made for the main
              character in you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link
                href="/new-arrivals"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-white hover:text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,46,147,0.45)]"
              >
                Shop New Arrivals
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 font-bold text-xs tracking-[0.16em] uppercase hover:border-white hover:bg-white hover:text-ink transition-all duration-300"
              >
                Explore Collections
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-white/50"
            >
              <span>✓ Free shipping ₹2,999+</span>
              <span>✓ 14-day returns</span>
              <span>✓ 4.8★ from 12,000+ reviews</span>
            </motion.div>
          </div>

          {/* Hero image collage */}
          <div className="relative hidden lg:block">
            <div className="relative h-[560px]">
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -4 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute left-0 top-6 w-[58%] h-[78%] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src={`https://images.unsplash.com/${HERO_IMAGES[0]}?auto=format&fit=crop&w=800&q=85`}
                  alt="Model in LABEL BY NIDHI look"
                  fill
                  sizes="40vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: 5 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute right-0 top-0 w-[52%] h-[62%] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src={`https://images.unsplash.com/${HERO_IMAGES[1]}?auto=format&fit=crop&w=800&q=85`}
                  alt="Editorial fashion shot"
                  fill
                  sizes="40vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.85 }}
                className="absolute right-6 bottom-2 w-[46%] h-[44%] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src={`https://images.unsplash.com/${HERO_IMAGES[2]}?auto=format&fit=crop&w=800&q=85`}
                  alt="Street style shot"
                  fill
                  sizes="35vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Floating price tag */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 bottom-16 px-5 py-3 rounded-2xl bg-white text-ink shadow-2xl rotate-[-6deg]"
              >
                <p className="text-[10px] uppercase tracking-widest text-ink/50">
                  This look
                </p>
                <p className="font-display text-xl text-hot leading-none mt-0.5">
                  FROM {formatPrice(4200)}
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-8 -top-4 px-4 py-2.5 rounded-full bg-gradient-to-r from-grape to-volt text-white shadow-xl"
              >
                <p className="text-[11px] font-bold uppercase tracking-widest">
                  ★ 4.8 · 12k reviews
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative border-t border-white/10 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex">
              {[
                "NEW ARRIVALS",
                "STATEMENT PIECES",
                "BOLD COLOR",
                "PREMIUM FABRIC",
                "MADE TO STAND OUT",
                "WEAR YOUR CONFIDENCE",
              ].map((t) => (
                <span
                  key={t + i}
                  className="font-display text-2xl sm:text-3xl px-8 text-white/70 flex items-center gap-8"
                >
                  {t}
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-hot to-volt" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
