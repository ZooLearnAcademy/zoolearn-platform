/**
 * Seed Taxonomy Tree into Supabase taxonomy_nodes table.
 *
 * Reads D:\zoolearn-platform-develop\data\taxonomyTreeData.json
 * and upserts all 851 nodes into the taxonomy_nodes table.
 *
 * Usage:
 *   node scripts/seed-taxonomy.cjs
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env from apps/web/.env.local
const envPath = path.resolve(__dirname, '../apps/web/.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const [key, ...vals] = line.split('=');
  if (key && vals.length) env[key.trim()] = vals.join('=').trim();
}

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SERVICE_ROLE_KEY in apps/web/.env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Load taxonomy tree data
const dataPath = path.resolve(__dirname, '../data/taxonomyTreeData.json');
const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const tree = rawData.tree;

/**
 * Flatten the recursive tree into a flat array of nodes.
 */
function flattenTree(node, parentId = null, sortOrder = 0) {
  const nodes = [];
  nodes.push({
    id: node.id,
    label: node.label,
    rank: node.rank,
    common_name: node.commonName || null,
    parent_id: parentId,
    sort_order: sortOrder,
    is_active: true,
  });

  if (node.children && node.children.length > 0) {
    node.children.forEach((child, idx) => {
      nodes.push(...flattenTree(child, node.id, idx));
    });
  }

  return nodes;
}

async function seed() {
  console.log('📊 Loading taxonomy tree data...');
  const allNodes = flattenTree(tree);
  console.log(`   Found ${allNodes.length} nodes to seed.`);

  // Upsert in batches of 200 to avoid request size limits
  const BATCH_SIZE = 200;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < allNodes.length; i += BATCH_SIZE) {
    const batch = allNodes.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('taxonomy_nodes')
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      errors++;
    } else {
      inserted += batch.length;
      process.stdout.write(`   ✓ Inserted ${inserted}/${allNodes.length} nodes\r`);
    }
  }

  console.log(`\n✅ Taxonomy seeding complete: ${inserted} nodes inserted, ${errors} batch errors.`);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
