// Server-side Supabase client.
// Uses the SECRET key — server-only. Never imported into a "use client" tree.
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from "./env";

export function getSupabaseServerClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error(
      "Missing Supabase env vars server-side: SUPABASE_URL and SUPABASE_SECRET_KEY must be set."
    );
  }

  return createServerClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    cookies: {
      get(_name: string) {
        // Server components / Route Handlers have no document.cookie.
        return undefined;
      },
      set(_name: string, _value: string, _options?: Record<string, unknown>) {
        // Requires a response object once auth is added. Defer for now.
      },
      remove(_name: string, _options?: Record<string, unknown>) {
        // Same as set — auth flow needed to act on this.
      },
    },
  });
}

// Thin wrapper so other modules import from one place.
export async function getUserCart(userId: string) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("[supabase] getUserCart error:", error.message);
    return null;
  }
  return (data ?? null) as { id: string; user_id: string; items: unknown[] } | null;
}

export async function addToCart(userId: string, item: {
  id: string;
  size: string;
  color: string;
  qty: number;
}) {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("cart_items").insert({
    user_id: userId,
    product_id: item.id,
    size: item.size,
    color: item.color,
    quantity: item.qty,
  });

  if (error) {
    console.error("[supabase] addToCart error:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}
