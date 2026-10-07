# LABEL BY NIDHI — Wear Your Confidence

A bold, colorful, premium fashion e-commerce storefront built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**.

## ✨ Design language

- **Oversized editorial typography** — Anton (display), Playfair Display italic (accents), Inter (body)
- **Vibrant palette** — hot pink, grape purple, electric blue, tangerine, cherry red on black/white
- **Motion** — scroll reveals, marquees, floating hero collage, animated glow orbs, drawer transitions
- **Social-first** — Instagram grid, shareable reviews, newsletter capture

## 🛍 Routes

| Route | Description |
| --- | --- |
| `/` | Hero ("LABEL BY NIDHI — WEAR YOUR CONFIDENCE."), shop-by-mood, new arrivals, editorial split, trending, collections, bestsellers, reviews, Instagram |
| `/new-arrivals` | Latest drops with filters + sort |
| `/women`, `/men` | Gender edits |
| `/collections`, `/collections/[slug]` | Curated edits (Neon Nights, Power Dressing, Street Statement, Resort Heat, Everyday Icons) |
| `/sale` | Discounted pieces with % badges |
| `/about` | Founder story, values, timeline |
| `/product/[slug]` | Gallery, color/size pickers, size guide, qty, add-to-bag, details accordions, reviews, related |
| `/wishlist` | Saved items with move-to-bag |
| `/cart` | Line items, quantity controls, promo codes (`CONFIDENCE10`, `NIDHI15`, `FIRSTDROP`), free-shipping progress |
| `/checkout` | 3-step flow: Shipping → Payment (Card / UPI / COD) → Review, with validation + confirmation |
| `/reviews` | Rating breakdown, verified reviews, photo reviews |
| 404 | Branded not-found page |

## 🧰 State

Cart + wishlist live in a React context backed by **localStorage**, exposed via `useSyncExternalStore` (SSR-safe, no hydration mismatch, cross-tab sync via the `storage` event). Cart drawer, nav badges and cart/checkout pages all read the same store.

## 📱 Responsive

Mobile-first: hamburger drawer nav, 2-up → 4-up product grids, stacked checkout, touch-friendly controls. Verified no horizontal overflow at 390px across home, PLP, PDP and cart.

## 🚀 Commands

```bash
npm install
npm run dev      # develop at http://localhost:3000
npm run build    # production build (typechecks + SSG 43 pages)
npm run start    # serve production build
npm run lint     # eslint
```

## 🖼 Images

Fashion photography is served from Unsplash through `next/image` (configured in `next.config.ts` with `images.unsplash.com` remote pattern, AVIF/WebP, responsive `sizes`).
# label-by-nidhi
