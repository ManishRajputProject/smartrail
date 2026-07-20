import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client — used exclusively inside Route Handlers.
 * Forms POST to our own /api/* routes rather than talking to Supabase
 * directly from the browser, so this key never ships in client JS and the
 * only public surface is our own rate-limitable API routes.
 *
 * Uses the anon key by default (sufficient for INSERT under the RLS
 * policies applied in migration `create_core_tables`). Pass
 * useServiceRole=true only for privileged operations that must bypass RLS
 * (e.g. an admin moderation route or the reminder cron sweep).
 */
export function getServerSupabase(useServiceRole = false) {
  const key = useServiceRole ? process.env.SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error(
      useServiceRole
        ? "SUPABASE_SERVICE_ROLE_KEY is not set — required for privileged server operations."
        : "SUPABASE_ANON_KEY is not set."
    );
  }

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false },
  });
}
