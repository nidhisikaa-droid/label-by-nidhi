"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";
import { discount, formatPrice } from "@/data/products";
import { useStore } from "@/context/store";
import Rating from "./Rating";

const BADGE_STYLES: Record<string, string> = {
  new: "bg-volt text-white",
  hot: "bg-hot text-white",
  limited: "bg-grape text-white",
  sale: "bg-cherry text-white",
};

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const [hovered, setHovered] = useState(false);
  const wished = isWishlisted(product.id);
  const off = discount(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.07, 0.42),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-smoke"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-70 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover absolute inset-0 transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase ${
                BADGE_STYLES[product.badge]
              }`}
            >
              {product.badge === "limited" ? "Limited" : product.badge}
            </span>
          )}
          {off > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase bg-ink text-white">
              −{off}%
            </span>
          )}
        </div>

        {/* Quick add */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-3 left-3 right-3 z-10 hidden sm:block"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({
                    id: product.id,
                    size: product.sizes[Math.floor(product.sizes.length / 2)],
                    color: product.colors[0].name,
                  });
                }}
                className="w-full py-3 rounded-full bg-ink text-white text-xs font-bold tracking-[0.16em] uppercase hover:bg-hot transition-colors duration-300"
              >
                Quick Add
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Wishlist heart */}
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full grid place-items-center transition-all duration-300 ${
          wished
            ? "bg-hot text-white scale-110"
            : "bg-white/85 text-ink hover:bg-white hover:scale-110"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={wished ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Info */}
      <div className="pt-3.5 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-[15px] leading-snug">
              <Link
                href={`/product/${product.slug}`}
                className="hover:text-hot transition-colors"
              >
                {product.name}
              </Link>
            </h3>
            <p className="text-xs text-ink/50 mt-0.5 capitalize">
              {product.category}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-[15px]">{formatPrice(product.price)}</p>
            {product.compareAt && (
              <p className="text-xs text-ink/40 line-through">
                {formatPrice(product.compareAt)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <Rating value={product.rating} size={12} className="text-tango" />
            <span className="text-[11px] text-ink/45">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-3.5 h-3.5 rounded-full border border-ink/15"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
