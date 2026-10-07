"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/store";
import { getProduct, formatPrice } from "@/data/products";

const FREE_SHIP = 2999;
const PROMOS: Record<string, number> = { CONFIDENCE10: 0.1, NIDHI15: 0.15, FIRSTDROP: 0.2 };

export default function CartPage() {
  const {
    cart,
    hydrated,
    updateQty,
    removeFromCart,
    cartSubtotal,
    clearCart,
  } = useStore();

  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const discount =
    appliedPromo && PROMOS[appliedPromo]
      ? Math.round(cartSubtotal * PROMOS[appliedPromo])
      : 0;
  const afterDiscount = cartSubtotal - discount;
  const shipping = afterDiscount >= FREE_SHIP || afterDiscount === 0 ? 0 : 149;
  const total = afterDiscount + shipping;
  const progress = Math.min(100, (afterDiscount / FREE_SHIP) * 100);

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMOS[code]) {
      setAppliedPromo(code);
      setPromoError("");
    } else {
      setAppliedPromo(null);
      setPromoError("Invalid code — try CONFIDENCE10");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white grain">
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-hot/35 blur-[110px]" />
        <div className="absolute -bottom-32 -right-10 w-96 h-96 rounded-full bg-grape/30 blur-[120px]" />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <nav className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-6">
            <Link href="/" className="hover:text-hot">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Bag</span>
          </nav>
          <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-4">
            Almost yours
          </p>
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.88]">
            SHOPPING
            <span className="text-gradient-brand"> BAG</span>
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white min-h-[50vh]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {!hydrated ? (
            <p className="text-center text-ink/50 py-16">Loading your bag…</p>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="text-6xl mb-5">👜</div>
              <p className="font-display text-3xl sm:text-4xl leading-tight">
                YOUR BAG IS
                <br />
                <span className="text-gradient-brand">EMPTY</span>
              </p>
              <p className="text-ink/60 mt-4 text-sm leading-relaxed">
                Let’s fix that. The new drop is calling and it looks good on
                you.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 justify-center">
                <Link
                  href="/new-arrivals"
                  className="px-7 py-3.5 rounded-full bg-hot text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-ink transition-colors"
                >
                  Shop New Arrivals
                </Link>
                <Link href="/collections" className="btn-outline">
                  Collections
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
              {/* Line items */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-xs uppercase tracking-widest text-ink/50">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </p>
                  <button
                    onClick={clearCart}
                    className="text-xs uppercase tracking-widest text-ink/40 hover:text-cherry transition-colors"
                  >
                    Clear bag
                  </button>
                </div>

                <ul className="divide-y divide-ink/10 border-y border-ink/10">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => {
                      const p = getProduct(item.id);
                      if (!p) return null;
                      return (
                        <motion.li
                          key={`${item.id}-${item.size}-${item.color}`}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -40 }}
                          className="py-5 flex gap-4 sm:gap-6"
                        >
                          <Link
                            href={`/product/${p.slug}`}
                            className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden bg-smoke shrink-0"
                          >
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="112px"
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex justify-between gap-3">
                              <div className="min-w-0">
                                <h3 className="font-semibold text-base sm:text-lg leading-snug">
                                  <Link
                                    href={`/product/${p.slug}`}
                                    className="hover:text-hot transition-colors"
                                  >
                                    {p.name}
                                  </Link>
                                </h3>
                                <p className="text-xs text-ink/50 mt-1">
                                  {item.color} · Size {item.size} ·{" "}
                                  {p.category}
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item)}
                                aria-label={`Remove ${p.name}`}
                                className="text-ink/35 hover:text-cherry text-2xl leading-none shrink-0"
                              >
                                ×
                              </button>
                            </div>

                            <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                              <div className="inline-flex items-center border border-ink/15 rounded-full">
                                <button
                                  onClick={() => updateQty(item, item.qty - 1)}
                                  disabled={item.qty <= 1}
                                  className="w-9 h-9 grid place-items-center hover:text-hot disabled:opacity-30"
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="w-7 text-center text-sm font-bold">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item, item.qty + 1)}
                                  className="w-9 h-9 grid place-items-center hover:text-hot"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-base">
                                  {formatPrice(p.price * item.qty)}
                                </p>
                                {item.qty > 1 && (
                                  <p className="text-[11px] text-ink/45">
                                    {formatPrice(p.price)} each
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <Link
                  href="/new-arrivals"
                  className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-widest font-semibold text-hot hover:underline underline-offset-4"
                >
                  ← Keep shopping
                </Link>
              </div>

              {/* Summary */}
              <aside className="lg:sticky lg:top-28 rounded-3xl border border-ink/10 bg-cream p-6">
                <h2 className="font-display text-2xl">ORDER SUMMARY</h2>

                {/* Free shipping progress */}
                <div className="mt-5">
                  <p className="text-[11px] uppercase tracking-widest font-semibold mb-2">
                    {shipping === 0 ? (
                      <span className="text-volt">🎉 Free shipping unlocked</span>
                    ) : (
                      <>
                        Add{" "}
                        <span className="text-hot">
                          {formatPrice(FREE_SHIP - afterDiscount)}
                        </span>{" "}
                        for free shipping
                      </>
                    )}
                  </p>
                  <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-hot to-volt"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Promo */}
                <div className="mt-5">
                  <label
                    htmlFor="promo"
                    className="text-[11px] uppercase tracking-widest font-semibold"
                  >
                    Promo code
                  </label>
                  <div className="flex gap-2 mt-2">
                    <input
                      id="promo"
                      value={promo}
                      onChange={(e) => {
                        setPromo(e.target.value);
                        setPromoError("");
                      }}
                      placeholder="CONFIDENCE10"
                      className="flex-1 min-w-0 px-4 py-3 rounded-full border border-ink/15 bg-white text-sm focus:outline-none focus:border-hot"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-5 py-3 rounded-full bg-ink text-white text-[11px] font-bold uppercase tracking-widest hover:bg-grape transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-cherry mt-1.5">{promoError}</p>
                  )}
                  {appliedPromo && (
                    <p className="text-[11px] text-volt mt-1.5 font-semibold">
                      ✓ {appliedPromo} applied — {PROMOS[appliedPromo] * 100}% off
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="mt-5 pt-5 border-t border-ink/10 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink/60">Subtotal</span>
                    <span className="font-semibold">
                      {formatPrice(cartSubtotal)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-volt">
                      <span>Discount ({appliedPromo})</span>
                      <span className="font-semibold">
                        −{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-ink/60">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-ink/10">
                    <span className="font-display text-xl">TOTAL</span>
                    <span className="font-display text-2xl text-gradient-brand">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.18em] uppercase hover:bg-ink transition-colors duration-300 shadow-[0_10px_30px_rgba(255,46,147,0.35)]"
                >
                  Checkout →
                </Link>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-ink/50">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Secure checkout · 14-day returns
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {["Visa", "Mastercard", "UPI", "PayPal", "COD"].map((x) => (
                    <span
                      key={x}
                      className="px-2 py-1 rounded border border-ink/10 text-[10px] text-ink/45"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
