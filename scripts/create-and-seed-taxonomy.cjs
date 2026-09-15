/**
 * Create taxonomy_nodes table via Supabase Management API (pg-meta)
 * and then seed it with taxonomy tree data.
 *
 * Usage: node scripts/create-and-seed-taxonomy.cjs
 */

const https = require('https');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env
const envPath = path.resolve(__dirname, '../apps/web/.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const [key, ...vals] = line.split('=');
  if (key && vals.length) env[key.trim()] = vals.join('=').trim();
}

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];

// Extract project ref from URL: https://oczegyvadkjjplwdsbko.supabase.co
const projectRef = SUPABASE_URL.replace('https://', '').split('.')[0];

console.log('Project ref:', projectRef);

// Execute SQL via Supabase pg-meta REST API
function execSQL(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const options = {
      hostname: `${projectRef}.supabase.co`,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'apikey': SERVICE_ROLE_KEY,
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data });
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const CREATE_TABLE_SQL = `
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

ALTER TABLE public.taxonomy_nodes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read taxonomy_nodes" ON public.taxonomy_nodes;
CREATE POLICY "Public read taxonomy_nodes"
ON public.taxonomy_nodes FOR SELECT USING (true);

NOTIFY pgrst, 'reload schema';
`;

async function main() {
  // Try exec_sql RPC
  console.log('Attempting to create taxonomy_nodes via exec_sql RPC...');
  const result = await execSQL(CREATE_TABLE_SQL);
  console.log('Response status:', result.status);
  console.log('Response:', result.body.slice(0, 300));

  if (result.status === 200 || result.status === 204) {
    console.log('✅ Table created. Waiting for schema cache reload...');
    await new Promise(r => setTimeout(r, 3000));

    // Now try seeding
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await supabase
      .from('taxonomy_nodes')
      .insert([{ id: '__test__', label: 'Test', rank: 'Kingdom' }]);
    
    if (error) {
      console.error('❌ Still failing after creation:', error.message);
    } else {
      console.log('✅ Test insert worked! Cleaning up...');
      await supabase.from('taxonomy_nodes').delete().eq('id', '__test__');
      console.log('Ready to seed. Run: node scripts/seed-taxonomy.cjs');
    }
  } else {
    console.log('\n⚠️  Could not create table via API. Run this SQL manually in Supabase Dashboard:');
    console.log('─'.repeat(70));
    console.log(CREATE_TABLE_SQL.trim());
    console.log('─'.repeat(70));
  }
}

main().catch(console.error);
