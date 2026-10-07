"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/context/store";
import { getProduct, formatPrice } from "@/data/products";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartSubtotal,
    cartCount,
    updateQty,
    removeFromCart,
    hydrated,
  } = useStore();

  const FREE_SHIP = 2999;
  const remaining = Math.max(0, FREE_SHIP - cartSubtotal);
  const progress = Math.min(100, (cartSubtotal / FREE_SHIP) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80]"
        >
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl"
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-ink/10">
              <div>
                <h2 className="font-display text-2xl leading-none">YOUR BAG</h2>
                <p className="text-xs text-ink/50 mt-1">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
                className="w-10 h-10 rounded-full border border-ink/15 grid place-items-center hover:bg-ink hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Free shipping progress */}
            {hydrated && cart.length > 0 && (
              <div className="px-6 py-4 bg-smoke">
                <p className="text-[11px] uppercase tracking-widest font-semibold mb-2">
                  {remaining > 0 ? (
                    <>
                      Add{" "}
                      <span className="text-hot">{formatPrice(remaining)}</span>{" "}
                      for free shipping
                    </>
                  ) : (
                    <span className="text-volt">🎉 You’ve unlocked free shipping!</span>
                  )}
                </p>
                <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-hot to-volt"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {!hydrated ? (
                <p className="text-sm text-ink/50 text-center py-10">Loading…</p>
              ) : cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">👜</div>
                  <p className="font-display text-2xl mb-2">YOUR BAG IS EMPTY</p>
                  <p className="text-sm text-ink/55 mb-6">
                    Fill it with something that makes you unforgettable.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn-outline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {cart.map((item) => {
                    const product = getProduct(item.id);
                    if (!product) return null;
                    return (
                      <motion.li
                        key={`${item.id}-${item.size}-${item.color}`}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        className="flex gap-4"
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="relative w-20 h-24 rounded-lg overflow-hidden bg-smoke shrink-0"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2">
                            <h3 className="font-semibold text-sm truncate">
                              {product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item)}
                              aria-label="Remove item"
                              className="text-ink/35 hover:text-cherry text-lg leading-none shrink-0"
                            >
                              ×
                            </button>
                          </div>
                          <p className="text-xs text-ink/50 mt-0.5">
                            {item.color} · Size {item.size}
                          </p>
                          <p className="font-bold text-sm mt-1.5">
                            {formatPrice(product.price)}
                          </p>

                          <div className="flex items-center justify-between mt-2.5">
                            <div className="inline-flex items-center border border-ink/15 rounded-full">
                              <button
                                onClick={() => updateQty(item, item.qty - 1)}
                                className="w-8 h-8 grid place-items-center hover:text-hot disabled:opacity-30"
                                disabled={item.qty <= 1}
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item, item.qty + 1)}
                                className="w-8 h-8 grid place-items-center hover:text-hot"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-bold text-sm">
                              {formatPrice(product.price * item.qty)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {hydrated && cart.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm uppercase tracking-widest font-semibold">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <p className="text-[11px] text-ink/50">
                  Taxes included. Shipping calculated at checkout.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="btn-outline !py-3.5 !px-4 text-center"
                  >
                    View Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-ink text-white font-bold text-xs tracking-[0.14em] uppercase hover:bg-hot transition-colors duration-300"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
