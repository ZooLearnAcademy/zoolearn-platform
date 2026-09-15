/**
 * Seed ZooHub data into Supabase phyla, classes, species tables.
 *
 * Reads D:\zoolearn-platform-develop\data\zoohubData.json
 * and upserts all 11 phyla, 45 classes, and 265 species.
 *
 * Usage:
 *   node scripts/seed-zoohub.cjs
 */

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

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing credentials in apps/web/.env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const dataPath = path.resolve(__dirname, '../data/zoohubData.json');
const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const phyla = rawData.phyla;

function toSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function seed() {
  // ── Phyla ──────────────────────────────────────────────────
  console.log(`📊 Seeding ${phyla.length} phyla...`);
  const phylaRows = phyla.map((p, idx) => ({
    slug: p.id || toSlug(p.name),
    name: p.name,
    subtitle: p.description || null,
    sort_order: idx,
  }));

  const { error: phylaErr } = await supabase
    .from('phyla')
    .upsert(phylaRows, { onConflict: 'slug' });

  if (phylaErr) {
    console.error('❌ Failed to upsert phyla:', phylaErr.message);
    process.exit(1);
  }
  console.log(`✅ Upserted ${phylaRows.length} phyla.`);

  // ── Classes ────────────────────────────────────────────────
  const classRows = [];
  for (const phylum of phyla) {
    const phylumSlug = phylum.id || toSlug(phylum.name);
    for (let ci = 0; ci < (phylum.classes || []).length; ci++) {
      const cls = phylum.classes[ci];
      classRows.push({
        slug: toSlug(cls.name),
        class_name: cls.name,
        phylum_slug: phylumSlug,
        sort_order: ci,
      });
    }
  }

  console.log(`📊 Seeding ${classRows.length} classes...`);
  const BATCH_SIZE = 50;

  for (let i = 0; i < classRows.length; i += BATCH_SIZE) {
    const batch = classRows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('classes')
      .upsert(batch, { onConflict: 'slug' });
    if (error) console.error(`   ❌ Class batch error:`, error.message);
    else process.stdout.write(`   ✓ ${Math.min(i + BATCH_SIZE, classRows.length)}/${classRows.length}\r`);
  }
  console.log(`\n✅ Upserted ${classRows.length} classes.`);

  // ── Species ────────────────────────────────────────────────
  const speciesRows = [];
  for (const phylum of phyla) {
    const phylumSlug = phylum.id || toSlug(phylum.name);
    for (let si = 0; si < (phylum.species || []).length; si++) {
      const sp = phylum.species[si];
      // Find matching class slug (first class in phylum as fallback)
      const classSlug = sp.classSlug
        ? toSlug(sp.classSlug)
        : (phylum.classes && phylum.classes[0]
          ? toSlug(phylum.classes[0].name)
          : null);

      speciesRows.push({
        slug: sp.slug || toSlug(sp.name),
        name: sp.name.charAt(0).toUpperCase() + sp.name.slice(1),
        scientific_name: sp.scientificName || null,
        description: sp.description || null,
        image: sp.thumbnail || sp.image || null,
        phylum_slug: phylumSlug,
        class_slug: classSlug,
        sort_order: si,
        introduction: [],
        features: {},
        classification: {},
        size_structure: [],
        ecology: [],
        economy: [],
      });
    }
  }

  console.log(`📊 Seeding ${speciesRows.length} species...`);

  let inserted = 0;
  for (let i = 0; i < speciesRows.length; i += BATCH_SIZE) {
    const batch = speciesRows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('species')
      .upsert(batch, { onConflict: 'slug' });
    if (error) console.error(`   ❌ Species batch error:`, error.message);
    else {
      inserted += batch.length;
      process.stdout.write(`   ✓ ${inserted}/${speciesRows.length}\r`);
    }
  }
  console.log(`\n✅ ZooHub seeding complete: ${phylaRows.length} phyla, ${classRows.length} classes, ${speciesRows.length} species.`);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
