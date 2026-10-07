"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/data/products";

export type CartItem = {
  id: string;
  size: string;
  color: string;
  qty: number;
};

const CART_KEY = "lbn-cart";
const WISHLIST_KEY = "lbn-wishlist";

const EMPTY_CART: CartItem[] = [];
const EMPTY_WISHLIST: string[] = [];

/* ────────────────────────────────────────────────
   localStorage-backed external store.
   useSyncExternalStore keeps this SSR-safe and
   avoids setState-in-effect entirely.
   ──────────────────────────────────────────────── */

const snapshots = new Map<string, unknown>();
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  // Cross-tab sync: another tab changed this key.
  const onStorage = (event: StorageEvent) => {
    if (event.key === null) {
      snapshots.clear();
      callback();
    } else if (snapshots.has(event.key)) {
      snapshots.delete(event.key);
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  listeners.add(callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    listeners.delete(callback);
  };
}

function getSnapshot<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  if (snapshots.has(key)) return snapshots.get(key) as T;
  let value = fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw) value = JSON.parse(raw) as T;
  } catch {
    // corrupt value — fall back
  }
  snapshots.set(key, value);
  return value;
}

function setSnapshot<T>(key: string, value: T) {
  snapshots.set(key, value);
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota/private mode — keep in-memory state
  }
  notify();
}

const readCart = () => getSnapshot<CartItem[]>(CART_KEY, EMPTY_CART);
const readWishlist = () => getSnapshot<string[]>(WISHLIST_KEY, EMPTY_WISHLIST);
const serverCart = () => EMPTY_CART;
const serverWishlist = () => EMPTY_WISHLIST;
const clientReady = () => true;
const serverReady = () => false;

/* ──────────────────────────────────────────────── */

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  hydrated: boolean;
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (item: CartItem) => void;
  updateQty: (item: CartItem, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  wishlistCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  const hydrated = useSyncExternalStore(subscribe, clientReady, serverReady);
  const cart = useSyncExternalStore(subscribe, readCart, serverCart);
  const wishlist = useSyncExternalStore(subscribe, readWishlist, serverWishlist);

  // Lock body scroll when cart drawer is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      const prev = readCart();
      const idx = prev.findIndex(
        (c) =>
          c.id === item.id && c.size === item.size && c.color === item.color,
      );
      if (idx >= 0) {
        setSnapshot(
          CART_KEY,
          prev.map((c, i) => (i === idx ? { ...c, qty: c.qty + qty } : c)),
        );
      } else {
        setSnapshot(CART_KEY, [...prev, { ...item, qty }]);
      }
      setCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((item: CartItem) => {
    setSnapshot(
      CART_KEY,
      readCart().filter(
        (c) =>
          !(
            c.id === item.id &&
            c.size === item.size &&
            c.color === item.color
          ),
      ),
    );
  }, []);

  const updateQty = useCallback((item: CartItem, qty: number) => {
    if (qty < 1) return;
    setSnapshot(
      CART_KEY,
      readCart().map((c) =>
        c.id === item.id && c.size === item.size && c.color === item.color
          ? { ...c, qty }
          : c,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setSnapshot(CART_KEY, EMPTY_CART), []);

  const toggleWishlist = useCallback((id: string) => {
    const prev = readWishlist();
    setSnapshot(
      WISHLIST_KEY,
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  }, []);

  const isWishlisted = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product: Product | undefined = getProduct(item.id);
        return sum + (product ? product.price * item.qty : 0);
      }, 0),
    [cart],
  );

  const value = useMemo<StoreState>(
    () => ({
      cart,
      wishlist,
      hydrated,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      cartSubtotal,
      toggleWishlist,
      isWishlisted,
      wishlistCount: wishlist.length,
      cartOpen,
      setCartOpen,
    }),
    [
      cart,
      wishlist,
      hydrated,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      cartSubtotal,
      toggleWishlist,
      isWishlisted,
      cartOpen,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
