/**
 * Re-run after logging into the app once.
 * This sets is_admin=true for kameshanbu13@gmail.com in the profiles table.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const env = readFileSync(envPath, "utf8")
  .split("\n")
  .reduce((acc, line) => {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) acc[key.trim()] = vals.join("=").trim();
    return acc;
  }, {});

const supabase = createClient(
  env["NEXT_PUBLIC_SUPABASE_URL"],
  env["SUPABASE_SERVICE_ROLE_KEY"],
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const ADMIN_EMAIL = "kameshanbu13@gmail.com";

async function makeAdmin() {
  console.log(`Looking for user: ${ADMIN_EMAIL}...`);

  // Get auth user
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) { console.error("Error:", authError.message); return; }

  const user = users.find(u => u.email === ADMIN_EMAIL);
  if (!user) { console.error(`User not found. Please log in at http://localhost:3000 first.`); return; }

  console.log(`Found user ${user.id}`);

  // Check if profile exists (created on login)
  const { data: profile } = await supabase.from("profiles").select("user_id, is_admin").eq("user_id", user.id).single();

  if (!profile) {
    // Create profile manually if trigger hasn't fired yet
    console.log("Profile not found — creating manually...");
    const { error: insertErr } = await supabase.from("profiles").insert({
      user_id: user.id,
      full_name: user.user_metadata?.full_name || user.email,
      email: user.email,
      is_admin: true,
      role: "admin",
    });
    if (insertErr) { console.error("Insert error:", insertErr.message); return; }
    console.log(`✅ Profile created with is_admin=true for ${ADMIN_EMAIL}`);
  } else {
    // Update existing profile
    const { error: updateErr } = await supabase
      .from("profiles")
      .update({ is_admin: true, role: "admin" })
      .eq("user_id", user.id);
    if (updateErr) { console.error("Update error:", updateErr.message); return; }
    console.log(`✅ Successfully made ${ADMIN_EMAIL} an admin!`);
  }
}

makeAdmin();
