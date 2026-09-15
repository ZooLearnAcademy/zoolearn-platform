/**
 * Admin Supabase Client — SERVER ONLY
 *
 * Uses the service role key which bypasses RLS.
 * NEVER import this in client components or expose to the browser.
 */
import { createClient } from "@supabase/supabase-js";
import dns from "node:dns";

// Force IPv4 first to prevent ENOTFOUND when connecting to Supabase from Node 18+
dns.setDefaultResultOrder("ipv4first");

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "These must be set in .env.local and are server-only."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
