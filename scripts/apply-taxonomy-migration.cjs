/**
 * Apply the taxonomy_nodes migration to Supabase via the REST API.
 * Creates the table, indexes, RLS, and policies.
 *
 * Usage: node scripts/apply-taxonomy-migration.cjs
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../apps/web/.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const [key, ...vals] = line.split('=');
  if (key && vals.length) env[key.trim()] = vals.join('=').trim();
}

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function applyMigration() {
  console.log('Applying taxonomy_nodes table migration...');

  // Test if table already exists
  const { error: existsErr } = await supabase
    .from('taxonomy_nodes')
    .select('id', { count: 'exact', head: true });

  if (!existsErr) {
    console.log('✅ taxonomy_nodes table already exists.');
    return true;
  }

  console.log('Table does not exist. Error code:', existsErr.code);
  console.log('\n⚠️  Cannot create tables via REST API — need to use Supabase SQL Editor.');
  console.log('\nPlease run this SQL in your Supabase Dashboard → SQL Editor:');
  console.log('─'.repeat(60));
  console.log(`
CREATE TABLE IF NOT EXISTS public.taxonomy_nodes (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  rank TEXT NOT NULL,
  common_name TEXT,
  parent_id TEXT REFERENCES public.taxonomy_nodes(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_taxonomy_nodes_parent ON public.taxonomy_nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_taxonomy_nodes_rank ON public.taxonomy_nodes(rank);
CREATE INDEX IF NOT EXISTS idx_taxonomy_nodes_active ON public.taxonomy_nodes(is_active);

ALTER TABLE public.taxonomy_nodes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read taxonomy_nodes" ON public.taxonomy_nodes;
CREATE POLICY "Public read taxonomy_nodes"
ON public.taxonomy_nodes FOR SELECT
USING (true);
  `);
  console.log('─'.repeat(60));
  return false;
}

applyMigration().catch(console.error);
