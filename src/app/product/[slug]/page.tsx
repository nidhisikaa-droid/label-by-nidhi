import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBySlug,
  getRelated,
  products,
  discount,
  formatPrice,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Rating from "@/components/Rating";
import PurchasePanel from "@/components/PurchasePanel";
import ReviewsSection from "@/components/ReviewsSection";
import { reviews } from "@/components/ReviewsSection";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const off = discount(product);
  const productReviews = reviews.slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ink/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-3.5">
          <nav className="text-[11px] uppercase tracking-[0.18em] text-ink/45">
            <Link href="/" className="hover:text-hot">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/${product.gender === "women" ? "women" : product.gender === "men" ? "men" : "new-arrivals"}`}
              className="hover:text-hot capitalize"
            >
              {product.gender}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink/80">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white py-6 sm:py-10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            {/* ── Gallery ── */}
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden bg-smoke ring-2 ring-transparent hover:ring-hot transition-all cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main image */}
              <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-smoke order-1 lg:order-2">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-ink text-white text-[10px] font-bold uppercase tracking-[0.16em]">
                    {product.badge}
                  </span>
                )}
                {off > 0 && (
                  <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-cherry text-white text-[10px] font-bold uppercase tracking-[0.16em]">
                    Save {off}%
                  </span>
                )}
              </div>
            </div>

            {/* ── Info ── */}
            <div className="lg:sticky lg:top-28 self-start">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[11px] uppercase tracking-[0.24em] text-grape font-bold">
                  {product.category}
                </span>
                {product.collections[0] && (
                  <Link
                    href={`/collections/${product.collections[0]}`}
                    className="text-[11px] uppercase tracking-[0.16em] text-ink/45 hover:text-hot border-b border-ink/15 hover:border-hot transition-colors"
                  >
                    {product.collections[0].replace(/-/g, " ")}
                  </Link>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.92] mt-3">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 mt-4">
                <Rating value={product.rating} className="text-tango" />
                <span className="text-sm text-ink/60">
                  {product.rating} · {product.reviewCount} reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mt-5">
                <span className="font-display text-4xl text-gradient-brand">
                  {formatPrice(product.price)}
                </span>
                {product.compareAt && (
                  <span className="text-lg text-ink/40 line-through mb-1">
                    {formatPrice(product.compareAt)}
                  </span>
                )}
                {off > 0 && (
                  <span className="mb-1.5 px-2.5 py-1 rounded-full bg-cherry/10 text-cherry text-xs font-bold uppercase tracking-wider">
                    {off}% off
                  </span>
                )}
              </div>
              <p className="text-xs text-ink/50 mt-1.5">
                Inclusive of all taxes · Free shipping over ₹2,999
              </p>

              <p className="mt-6 text-ink/70 leading-relaxed">
                {product.description}
              </p>

              {/* Purchase panel (client) */}
              <PurchasePanel product={product} />

              {/* Details accordion */}
              <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                <details className="group py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-bold uppercase tracking-[0.16em]">
                    Product Details
                    <span className="transition-transform group-open:rotate-45 text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <ul className="mt-3 space-y-1.5 text-sm text-ink/65">
                    {product.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-hot">•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </details>
                <details className="group py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-bold uppercase tracking-[0.16em]">
                    Shipping & Returns
                    <span className="transition-transform group-open:rotate-45 text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 space-y-2 text-sm text-ink/65">
                    <p>🚚 Free standard shipping on orders over ₹2,999.</p>
                    <p>⚡ Express delivery in 48 hours to major cities.</p>
                    <p>↩️ Easy returns within 14 days of delivery.</p>
                  </div>
                </details>
                <details className="group py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-bold uppercase tracking-[0.16em]">
                    Size & Fit
                    <span className="transition-transform group-open:rotate-45 text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-ink/65">
                    Model is 5’9” and wears size S. Fits true to size — size up
                    for a relaxed look. Check the size chart in the size picker
                    above.
                  </p>
                </details>
              </div>

              {/* Trust row */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { i: "✓", t: "Authentic Label" },
                  { i: "🔒", t: "Secure Pay" },
                  { i: "↩", t: "14-Day Returns" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-xl bg-cream py-3 px-2 border border-ink/5"
                  >
                    <p className="text-base leading-none">{x.i}</p>
                    <p className="text-[10px] uppercase tracking-wider font-semibold mt-1.5 text-ink/70">
                      {x.t}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product reviews ── */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-3">
                ★ What people say
              </p>
              <h2 className="font-display text-3xl sm:text-5xl leading-[0.92]">
                REVIEWS
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Rating value={product.rating} size={18} className="text-tango" />
              <span className="text-sm text-ink/60">
                {product.rating} out of 5 · {product.reviewCount} reviews
              </span>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-3">
            {productReviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.08}>
                <figure className="h-full rounded-2xl bg-white border border-ink/10 p-6 flex flex-col">
                  <Rating value={r.rating} className="text-tango" />
                  <p className="font-semibold text-[15px] mt-3">{r.title}</p>
                  <p className="text-sm text-ink/65 mt-2 flex-1 leading-relaxed">
                    {r.body}
                  </p>
                  <figcaption className="mt-4 pt-3 border-t border-ink/10 flex items-center gap-2.5 text-xs">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-hot to-grape text-white grid place-items-center font-bold text-[11px]">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-ink/50">{r.location} · Verified</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-8">
            <Link href="/reviews" className="btn-outline">
              Read All Reviews →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Related ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-8">
            <h2 className="font-display text-3xl sm:text-5xl leading-[0.92]">
              YOU MAY <span className="text-gradient-brand">ALSO LOVE</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
    </>
  );
}
