/**
 * Verify taxonomy_nodes table status and check what schema PostgREST sees.
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

async function check() {
  // Try direct insert to see the real error
  console.log('Testing taxonomy_nodes insert...');
  const { data, error } = await supabase
    .from('taxonomy_nodes')
    .insert([{ id: 'test_node', label: 'Test', rank: 'Kingdom' }]);
  
  console.log('Insert result:', { data, error: error?.message, code: error?.code, details: error?.details });

  // Try select
  const { data: sel, error: selErr } = await supabase
    .from('taxonomy_nodes')
    .select('*')
    .limit(1);

  console.log('Select result:', { data: sel, error: selErr?.message });

  // Check count with different approach
  const { count, error: countErr } = await supabase
    .from('taxonomy_nodes')
    .select('*', { count: 'exact', head: true });
  
  console.log('Count result:', { count, error: countErr?.message });
}

check().catch(console.error);
