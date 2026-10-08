// Centralized Supabase env access.
//
// Keys in play:
//  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  → browser-safe public key
//  NEXT_PUBLIC_SUPABASE_URL              → Supabase project URL (public)
//  SUPABASE_SECRET_KEY                   → server-only service key (never exposed)
//
// All three must be present for the integration to work:
//   - URL + anon key for the browser client
//   - URL + service key for server/route-handler clients

const NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Public (browser-safe) surface
export const SUPABASE_ANON_KEY = NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const SUPABASE_URL = NEXT_PUBLIC_SUPABASE_URL;

// Server-only surface
export const SUPABASE_SERVICE_KEY = SUPABASE_SECRET_KEY;

// Fail fast in dev when any required key is missing.
export function assertSupabaseEnv() {
  if (!SUPABASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
  }
  if (!SUPABASE_ANON_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not defined");
  }
  if (!SUPABASE_SERVICE_KEY) {
    throw new Error("SUPABASE_SECRET_KEY is not defined");
  }
}
