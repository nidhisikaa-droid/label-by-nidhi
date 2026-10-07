"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

type SortKey = "featured" | "low" | "high" | "rating" | "newest";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "low", label: "Price: Low → High" },
  { key: "high", label: "Price: High → Low" },
  { key: "rating", label: "Top Rated" },
];

export default function ProductGrid({
  products,
  showFilters = true,
}: {
  products: Product[];
  showFilters?: boolean;
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [category, setCategory] = useState<string>("All");

  const cats = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );

  const visible = useMemo(() => {
    const list = category === "All" ? [...products] : products.filter((p) => p.category === category);
    switch (sort) {
      case "low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => Number(b.isNew ?? 0) - Number(a.isNew ?? 0));
        break;
      default:
        break;
    }
    return list;
  }, [products, sort, category]);

  return (
    <div>
      {/* Toolbar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-1 px-1">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                  category === c
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink/70 border-ink/15 hover:border-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="sort" className="text-xs uppercase tracking-widest text-ink/50">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="px-3 py-2 rounded-full border border-ink/15 text-xs font-semibold bg-white focus:outline-none focus:border-hot cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Count */}
      <p className="text-xs text-ink/50 mb-5 uppercase tracking-widest">
        {visible.length} {visible.length === 1 ? "piece" : "pieces"}
      </p>

      {visible.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-3xl mb-2">NOTHING HERE — YET</p>
          <p className="text-ink/55 text-sm">Try another filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-9 sm:gap-x-6">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
