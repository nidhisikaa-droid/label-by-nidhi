"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/context/store";

const NAV_LINKS = [
  { href: "/new-arrivals", label: "New In" },
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/collections", label: "Collections" },
  { href: "/sale", label: "Sale", accent: true },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlistCount, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change — adjusted during render
  // (React's recommended alternative to setState-in-effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-white text-[11px] sm:text-xs tracking-[0.18em] uppercase py-2 px-4 text-center font-medium">
        Free shipping over ₹2,999 · Easy 14-day returns ·{" "}
        <span className="text-hot">Extra 10% off first order</span>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-ink/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-white border-b border-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Mobile: burger */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-ink" />
                <span className="block w-6 h-0.5 bg-ink" />
                <span className="block w-4 h-0.5 bg-ink" />
              </div>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-1.5 group">
              <span className="font-display text-xl sm:text-2xl lg:text-[1.7rem] tracking-tight leading-none">
                LABEL
              </span>
              <span className="font-accent italic text-sm sm:text-base text-hot group-hover:text-grape transition-colors">
                by Nidhi
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                      link.accent
                        ? "text-cherry hover:text-hot"
                        : active
                          ? "text-hot"
                          : "text-ink hover:text-grape"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-0.5 bg-current transition-all duration-300 ${
                        active ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              <Link
                href="/wishlist"
                className="relative p-2 hover:text-hot transition-colors"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-grape text-white text-[10px] font-bold grid place-items-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:text-hot transition-colors"
                aria-label={`Cart, ${cartCount} items`}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-hot text-white text-[10px] font-bold grid place-items-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 h-full w-[82%] max-w-sm bg-white flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-ink/10">
                <span className="font-display text-2xl">MENU</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full border border-ink/15 grid place-items-center hover:bg-ink hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className={`block font-display text-4xl py-2.5 transition-colors ${
                          link.accent
                            ? "text-cherry"
                            : pathname === link.href
                              ? "text-hot"
                              : "hover:text-grape"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-ink/10 space-y-4">
                  <Link
                    href="/wishlist"
                    className="block text-sm font-semibold uppercase tracking-widest text-ink/70 hover:text-hot"
                    onClick={() => setMenuOpen(false)}
                  >
                    ♡ Wishlist ({wishlistCount})
                  </Link>
                  <Link
                    href="/reviews"
                    className="block text-sm font-semibold uppercase tracking-widest text-ink/70 hover:text-hot"
                    onClick={() => setMenuOpen(false)}
                  >
                    ★ Reviews
                  </Link>
                </div>
              </div>

              <div className="px-6 py-6 bg-gradient-to-r from-hot via-grape to-volt text-white">
                <p className="font-display text-xl leading-tight">
                  WEAR YOUR
                  <br />
                  CONFIDENCE.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
