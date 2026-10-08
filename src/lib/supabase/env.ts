// Centralized Supabase env access.
//
// All three are Config (server-side) variables — no NEXT_PUBLIC_ prefix — so Vercel
// classifies them as Config and does not statically bundle them into the client.
//
//   SUPABASE_URL        -> project URL (non-secret; also injected to the browser at render time)
//   SUPABASE_ANON_KEY   -> browser-safe anon key (injected to the browser at render time)
//   SUPABASE_SECRET_KEY -> server-only service key (never leaves the server)
//
// The browser Supabase client receives the URL + anon key at render time via an inline
// <script> in the root layout (window.__SUPABASE_URL / window.__SUPABASE_ANON_KEY).
// This keeps those values out of the static build bundle while the client still gets
// what it needs.

const _url = process.env.SUPABASE_URL;
const _anon = process.env.SUPABASE_ANON_KEY;
const _secret = process.env.SUPABASE_SECRET_KEY;

export const SUPABASE_URL = _url;
export const SUPABASE_ANON_KEY = _anon;
export const SUPABASE_SERVICE_KEY = _secret;

export function assertSupabaseEnv() {
  if (!SUPABASE_URL) throw new Error("SUPABASE_URL is not defined");
  if (!SUPABASE_ANON_KEY) throw new Error("SUPABASE_ANON_KEY is not defined");
  if (!SUPABASE_SERVICE_KEY) throw new Error("SUPABASE_SECRET_KEY is not defined");
}
