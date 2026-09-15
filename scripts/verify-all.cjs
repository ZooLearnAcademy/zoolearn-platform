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

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY'], {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function verify() {
  console.log('=== FINAL DATABASE VERIFICATION ===\n');

  const tables = [
    { name: 'profiles',         label: 'Profiles (admin login)' },
    { name: 'phyla',            label: 'Phyla (ZooHub)' },
    { name: 'classes',          label: 'Classes (ZooHub)' },
    { name: 'species',          label: 'Species (ZooHub)' },
    { name: 'taxonomy_nodes',   label: 'Taxonomy Nodes (Tree)' },
    { name: 'scope_categories', label: 'Scope Categories' },
    { name: 'scope_careers',    label: 'Scope Careers' },
  ];

  for (const t of tables) {
    const { count, error } = await supabase
      .from(t.name)
      .select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`  ❌ ${t.label}: ERROR — ${error.message}`);
    } else {
      console.log(`  ✅ ${t.label}: ${count} rows`);
    }
  }

  console.log('\n=== ADMIN CHECK ===');
  const { data: admin, error: adminErr } = await supabase
    .from('profiles')
    .select('email, is_admin, role')
    .eq('is_admin', true);
  if (adminErr) console.log('  ❌ Admin check failed:', adminErr.message);
  else console.log('  Admin users:', JSON.stringify(admin));

  console.log('\n=== TAXONOMY TREE SAMPLE ===');
  const { data: roots } = await supabase
    .from('taxonomy_nodes')
    .select('id, label, rank')
    .is('parent_id', null);
  console.log('  Root nodes:', JSON.stringify(roots));

  const { data: phyla } = await supabase
    .from('taxonomy_nodes')
    .select('id, label, rank')
    .eq('rank', 'Phylum')
    .limit(5);
  console.log('  First 5 Phyla:', JSON.stringify(phyla));
}

verify().catch(console.error);
