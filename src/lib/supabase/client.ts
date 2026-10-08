"use client";

// Browser-safe Supabase client.
// Receives the URL + anon key from window globals that the root layout injects at
// render time (window.__SUPABASE_URL / window.__SUPABASE_ANON_KEY). Those come from
// server-side Config vars, so they are not statically bundled — Vercel sees them as
// Config, resolving the "remove the public framework prefix" warning.
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useRef } from "react";
import { useStore } from "@/context/store";

declare global {
  interface Window {
    __SUPABASE_URL?: string;
    __SUPABASE_ANON_KEY?: string;
  }
}

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

function getBrowserClient() {
  if (typeof window === "undefined") return null;
  if (browserClient) return browserClient;

  const url = window.__SUPABASE_URL;
  const key = window.__SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  browserClient = createBrowserClient(url, key);
  return browserClient;
}

export function useSupabaseBrowserClient() {
  const client = useRef<ReturnType<typeof createBrowserClient> | null>(null);

  useEffect(() => {
    const c = getBrowserClient();
    if (c) client.current = c;
  }, []);

  return client.current;
}

// Mirrors local store wishlist state for now; integration point for syncing
// wishlist hearts with Supabase later (server action + revalidation).
export function useSyncWishlist(id: string) {
  const { isWishlisted } = useStore();
  return isWishlisted(id);
}
