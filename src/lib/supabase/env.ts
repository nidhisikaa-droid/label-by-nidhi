// Centralized env access for Supabase keys.
// Keeps the two keys surfaced in one place so the rest of the app imports
// from here rather than reaching into process.env directly.
//
// Convention:
//  - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  -> browser-safe, exposed to client
//  - SUPABASE_SECRET_KEY                 -> server-only, never leaves the server

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SECRET_KEY;

// Lightweight runtime guard used in dev/test to fail fast when keys are missing.
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
