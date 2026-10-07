"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/store";
import { products, formatPrice, discount } from "@/data/products";
import Rating from "@/components/Rating";

export default function WishlistPage() {
  const { wishlist, hydrated, toggleWishlist, addToCart } = useStore();

  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white grain">
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-grape/35 blur-[110px]" />
        <div className="absolute -bottom-32 -right-10 w-96 h-96 rounded-full bg-hot/30 blur-[120px]" />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <nav className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-6">
            <Link href="/" className="hover:text-hot">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Wishlist</span>
          </nav>
          <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-4">
            ♥ Saved for later
          </p>
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.88]">
            YOUR
            <span className="text-gradient-brand"> WISHLIST</span>
          </h1>
          <p className="mt-5 text-white/65 max-w-xl leading-relaxed">
            {hydrated && saved.length > 0
              ? `${saved.length} ${saved.length === 1 ? "piece" : "pieces"} waiting for the right moment.`
              : "Tap the heart on any product to save it here."}
          </p>
        </div>
      </section>

      {/* Items */}
      <section className="py-12 sm:py-16 bg-white min-h-[40vh]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {!hydrated ? (
            <p className="text-center text-ink/50 py-16">Loading your wishlist…</p>
          ) : saved.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="text-6xl mb-5">💜</div>
              <p className="font-display text-3xl sm:text-4xl leading-tight">
                NOTHING SAVED
                <br />
                <span className="text-gradient-brand">YET</span>
              </p>
              <p className="text-ink/60 mt-4 text-sm leading-relaxed">
                Found something you love? Hit the heart and it’ll live here —
                safely stored on this device.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 justify-center">
                <Link
                  href="/new-arrivals"
                  className="px-7 py-3.5 rounded-full bg-hot text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-ink transition-colors"
                >
                  Browse New In
                </Link>
                <Link href="/collections" className="btn-outline">
                  Collections
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-7">
                <p className="text-xs uppercase tracking-widest text-ink/50">
                  {saved.length} {saved.length === 1 ? "item" : "items"}
                </p>
                <Link
                  href="/new-arrivals"
                  className="text-xs uppercase tracking-widest font-semibold text-hot hover:underline underline-offset-4"
                >
                  + Keep shopping
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
                <AnimatePresence mode="popLayout">
                  {saved.map((p) => (
                    <motion.article
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group relative"
                    >
                      <Link
                        href={`/product/${p.slug}`}
                        className="relative block aspect-[3/4] rounded-2xl overflow-hidden bg-smoke"
                      >
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {p.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink text-white text-[10px] font-bold uppercase tracking-[0.14em]">
                            {p.badge}
                          </span>
                        )}
                      </Link>

                      <button
                        onClick={() => toggleWishlist(p.id)}
                        aria-label="Remove from wishlist"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-hot text-white grid place-items-center hover:scale-110 transition-transform shadow-lg"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>

                      <div className="pt-3.5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-[15px] leading-snug">
                              {p.name}
                            </h3>
                            <p className="text-xs text-ink/50 mt-0.5 capitalize">
                              {p.category}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-[15px]">
                              {formatPrice(p.price)}
                            </p>
                            {p.compareAt && (
                              <p className="text-xs text-ink/40 line-through">
                                {formatPrice(p.compareAt)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-1.5">
                            <Rating value={p.rating} size={12} className="text-tango" />
                            <span className="text-[11px] text-ink/45">
                              {p.rating}
                            </span>
                          </div>
                          {discount(p) > 0 && (
                            <span className="text-[10px] font-bold text-cherry uppercase tracking-wider">
                              {discount(p)}% off
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            addToCart({
                              id: p.id,
                              size: p.sizes[Math.floor(p.sizes.length / 2)],
                              color: p.colors[0].name,
                            });
                          }}
                          className="mt-3 w-full py-3 rounded-full border-2 border-ink text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-ink hover:text-white transition-colors duration-300"
                        >
                          Move to Bag
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
