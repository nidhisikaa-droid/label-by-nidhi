"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";
import { useStore } from "@/context/store";

const SIZE_GUIDE: Record<string, { chest: number; waist: number; length: number }> = {
  XS: { chest: 32, waist: 26, length: 27 },
  S: { chest: 34, waist: 28, length: 28 },
  M: { chest: 36, waist: 30, length: 29 },
  L: { chest: 38, waist: 32, length: 30 },
  XL: { chest: 40, waist: 34, length: 31 },
  XXL: { chest: 42, waist: 36, length: 32 },
};

export default function PurchasePanel({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1600);
      return;
    }
    addToCart({ id: product.id, size, color }, qty);
  };

  return (
    <div className="mt-7">
      {/* Colors */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.16em]">
          Color: <span className="text-hot font-semibold">{color}</span>
        </p>
      </div>
      <div className="flex gap-2.5 mt-3">
        {product.colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setColor(c.name)}
            aria-label={c.name}
            aria-pressed={color === c.name}
            className={`relative w-9 h-9 rounded-full transition-all duration-300 ${
              color === c.name
                ? "ring-2 ring-ink ring-offset-2 scale-110"
                : "ring-1 ring-ink/15 hover:scale-105"
            }`}
            style={{ backgroundColor: c.hex }}
          >
            {c.hex === "#ffffff" && (
              <span className="absolute inset-0 rounded-full border border-ink/10" />
            )}
          </button>
        ))}
      </div>

      {/* Sizes */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em]">
          Size {!size && <span className="text-cherry">· select required</span>}
        </p>
        <button
          onClick={() => setShowGuide((s) => !s)}
          className="text-[11px] uppercase tracking-widest text-ink/50 underline underline-offset-2 hover:text-hot"
        >
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5 mt-3">
        {product.sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`min-w-[3rem] px-3.5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-300 ${
              size === s
                ? "bg-ink text-white border-ink"
                : "bg-white border-ink/15 hover:border-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {sizeError && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-cherry font-semibold mt-2"
          >
            Please pick a size first ✋
          </motion.p>
        )}
      </AnimatePresence>

      {/* Size guide table */}
      <AnimatePresence>
        {showGuide && product.sizes.some((s) => SIZE_GUIDE[s]) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-ink/10 overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-cream">
                  <tr>
                    <th className="py-2.5 px-3 text-left uppercase tracking-wider font-bold">
                      Size
                    </th>
                    <th className="py-2.5 px-3 text-left uppercase tracking-wider font-bold">
                      Chest (in)
                    </th>
                    <th className="py-2.5 px-3 text-left uppercase tracking-wider font-bold">
                      Waist (in)
                    </th>
                    <th className="py-2.5 px-3 text-left uppercase tracking-wider font-bold">
                      Length (in)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.sizes
                    .filter((s) => SIZE_GUIDE[s])
                    .map((s) => (
                      <tr key={s} className="border-t border-ink/10">
                        <td className="py-2.5 px-3 font-bold">{s}</td>
                        <td className="py-2.5 px-3 text-ink/65">
                          {SIZE_GUIDE[s].chest}
                        </td>
                        <td className="py-2.5 px-3 text-ink/65">
                          {SIZE_GUIDE[s].waist}
                        </td>
                        <td className="py-2.5 px-3 text-ink/65">
                          {SIZE_GUIDE[s].length}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quantity */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em]">Quantity</p>
        <div className="inline-flex items-center border border-ink/15 rounded-full">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 grid place-items-center hover:text-hot text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-bold">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="w-10 h-10 grid place-items-center hover:text-hot text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className="flex-1 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.18em] uppercase hover:bg-ink transition-colors duration-300 shadow-[0_10px_30px_rgba(255,46,147,0.35)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        >
          Add to Bag
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-14 h-14 rounded-full grid place-items-center border-2 transition-all duration-300 ${
            wished
              ? "bg-hot border-hot text-white"
              : "border-ink/15 hover:border-hot hover:text-hot"
          }`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={wished ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.button>
      </div>

      {/* Low stock urgency */}
      <p className="text-center text-[11px] uppercase tracking-[0.16em] text-tango font-semibold mt-4">
        🔥 {12 + (product.id.length * 3) % 40} people viewing · almost gone
      </p>
    </div>
  );
}
