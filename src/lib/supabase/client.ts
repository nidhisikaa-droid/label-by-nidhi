"use client";

// Browser-safe Supabase client.
// Uses the PUBLIC key only — safe to ship to the browser.
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useRef } from "react";
import { useStore } from "@/context/store";

// Extend the window type so the injected NEXT_PUBLIC_ globals are known to TS.
declare global {
  interface Window {
    __NEXT_SUPABASE_URL?: string;
    __NEXT_SUPABASE_KEY?: string;
  }
}

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

function getBrowserClient() {
  if (typeof window === "undefined") return null;
  if (browserClient) return browserClient;

  const url = window.__NEXT_SUPABASE_URL;
  const key = window.__NEXT_SUPABASE_KEY;

  if (!url || !key) {
    // During build, browser client isn't meaningful — return null.
    return null;
  }

  browserClient = createBrowserClient(url, key);
  return browserClient;
}

// Initialize the browser client once per page load using the env vars
// Next.js exposes via window for NEXT_PUBLIC_ vars.
export function initSupabaseBrowserClient() {
  if (typeof window === "undefined") return;
  if (window.__NEXT_SUPABASE_URL === undefined) {
    window.__NEXT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    window.__NEXT_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
  }
}

export function useSupabaseBrowserClient() {
  const client = useRef<ReturnType<typeof createBrowserClient> | null>(null);

  useEffect(() => {
    const c = getBrowserClient();
    if (c) client.current = c;
  }, []);

  return client.current;
}

// Hook that mirrors local store wishlist state for now, and is the
// integration point for syncing wishlist hearts with Supabase later.
export function useSyncWishlist(id: string) {
  const { isWishlisted } = useStore();
  // Sync surface: mirrors local store state today.
  // When wishlist DB persistence is enabled, this hook will call
  // @/lib/supabase/server and keep hearts in sync with Supabase.
  return isWishlisted(id);
}
