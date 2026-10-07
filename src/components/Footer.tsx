import Link from "next/link";
import Newsletter from "./Newsletter";

const SHOP_LINKS = [
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/collections", label: "Collections" },
  { href: "/sale", label: "Sale" },
];

const HELP_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Shopping Bag" },
  { href: "/checkout", label: "Checkout" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4.5 5 5" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.5 20l2-8m0 0c-.5-1.5 0-3 1.5-3.5S14 9.5 14 11.5 12.5 15 11 14.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <Newsletter />

      <footer className="bg-ink text-white">
        {/* Marquee strip */}
        <div className="border-y border-white/10 overflow-hidden py-4">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex items-center">
                {[
                  "WEAR YOUR CONFIDENCE",
                  "NEW DROPS WEEKLY",
                  "FREE SHIPPING OVER ₹2,999",
                  "DESIGNED BY NIDHI",
                  "PREMIUM FABRICS",
                  "EXPRESS RETURNS",
                ].map((t) => (
                  <span
                    key={t + i}
                    className="flex items-center font-display text-xl sm:text-2xl px-6 text-white/80"
                  >
                    {t}
                    <span className="ml-6 w-2 h-2 rounded-full bg-hot" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl">LABEL</span>
                <span className="font-accent italic text-base text-hot">
                  by Nidhi
                </span>
              </Link>
              <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
                Bold, premium fashion for people who refuse to blend in. Designed
                in India, worn everywhere.
              </p>
              <div className="flex gap-3 mt-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-white/20 grid place-items-center hover:bg-hot hover:border-hot transition-colors duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="font-display text-lg mb-4">SHOP</h3>
              <ul className="space-y-2.5">
                {SHOP_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/60 hover:text-hot transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-display text-lg mb-4">HELP</h3>
              <ul className="space-y-2.5">
                {HELP_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/60 hover:text-hot transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display text-lg mb-4">REACH US</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li>
                  <a
                    href="mailto:hello@labelbynidhi.com"
                    className="hover:text-hot transition-colors"
                  >
                    hello@labelbynidhi.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-hot transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </li>
                <li className="pt-1">Studio 12, Design District<br />Mumbai, India</li>
                <li className="pt-2 text-white/40 text-xs">
                  Mon–Sat · 10am – 7pm IST
                </li>
              </ul>
            </div>
          </div>

          {/* Payment row */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {["Visa", "Mastercard", "Amex", "UPI", "PayPal", "COD"].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-md border border-white/15 text-[11px] tracking-wider text-white/50"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} LABEL BY NIDHI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
