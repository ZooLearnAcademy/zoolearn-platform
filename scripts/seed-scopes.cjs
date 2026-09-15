/**
 * Seed Scopes data into Supabase scope_categories + scope_careers tables.
 *
 * Reads D:\zoolearn-platform-develop\data\scopesData.json
 * and upserts all 18 categories and 165 careers.
 *
 * Usage:
 *   node scripts/seed-scopes.cjs
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

const dataPath = path.resolve(__dirname, '../data/scopesData.json');
const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const careerCategories = rawData.careerCategories;

// Color/gradient mapping by index for variety
const gradients = [
  'from-emerald-500/20 via-emerald-500/5 to-transparent',
  'from-amber-500/20 via-amber-500/5 to-transparent',
  'from-cyan-500/20 via-cyan-500/5 to-transparent',
  'from-violet-500/20 via-violet-500/5 to-transparent',
  'from-rose-500/20 via-rose-500/5 to-transparent',
  'from-blue-500/20 via-blue-500/5 to-transparent',
  'from-orange-500/20 via-orange-500/5 to-transparent',
  'from-teal-500/20 via-teal-500/5 to-transparent',
  'from-pink-500/20 via-pink-500/5 to-transparent',
  'from-indigo-500/20 via-indigo-500/5 to-transparent',
  'from-lime-500/20 via-lime-500/5 to-transparent',
  'from-fuchsia-500/20 via-fuchsia-500/5 to-transparent',
  'from-red-500/20 via-red-500/5 to-transparent',
  'from-sky-500/20 via-sky-500/5 to-transparent',
  'from-green-500/20 via-green-500/5 to-transparent',
  'from-yellow-500/20 via-yellow-500/5 to-transparent',
  'from-slate-500/20 via-slate-500/5 to-transparent',
  'from-purple-500/20 via-purple-500/5 to-transparent',
];
const colors = [
  'emerald','amber','cyan','violet','rose','blue','orange','teal',
  'pink','indigo','lime','fuchsia','red','sky','green','yellow','slate','purple'
];
const icons = [
  'Microscope','Tree','Waves','Dna','Heart','Flask','Bug','Fish',
  'Leaf','Brain','Fingerprint','ShieldPlus','TestTube','Globe','Seedling','Sun','Star','Compass'
];

// Helper to generate slug-style IDs
function toId(name) {
  return name.toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function seed() {
  console.log(`📊 Seeding ${careerCategories.length} scope categories...`);

  const categoryRows = careerCategories.map((cat, idx) => ({
    id: cat.id || toId(cat.name),
    name: cat.name,
    short_name: cat.shortName || cat.name.split(' ').slice(0, 2).join(' '),
    description: cat.description || null,
    icon_name: cat.icon || icons[idx % icons.length],
    salary_range: cat.salaryRange || null,
    gradient: gradients[idx % gradients.length],
    color: colors[idx % colors.length],
    sort_order: idx,
    is_active: true,
    updated_at: new Date().toISOString(),
  }));

  const { error: catError } = await supabase
    .from('scope_categories')
    .upsert(categoryRows, { onConflict: 'id' });

  if (catError) {
    console.error('❌ Failed to upsert categories:', catError.message);
  } else {
    console.log(`✅ Upserted ${categoryRows.length} categories.`);
  }

  // Now upsert careers
  const careerRows = [];
  for (const cat of careerCategories) {
    const catId = cat.id || toId(cat.name);
    for (let ci = 0; ci < (cat.careers || []).length; ci++) {
      const career = cat.careers[ci];
      const careerId = toId(career.title);
      careerRows.push({
        id: careerId,
        title: career.title,
        description: career.description || null,
        category_id: catId,
        badge: career.badge || null,
        secondary_badge: career.secondaryBadge || null,
        salary: career.salaryRange || null,
        salary_min: career.salaryMin || null,
        salary_max: career.salaryMax || null,
        bsc: career.bscCourses || [],
        msc: career.mscCourses || [],
        phd: career.phdCourses || [],
        is_top_choice: career.isTopChoice || false,
        top_sectors: career.topSectors || [],
        key_skills: career.keySkills || [],
        sort_order: ci,
        is_active: true,
        updated_at: new Date().toISOString(),
      });
    }
  }

  console.log(`📊 Seeding ${careerRows.length} careers...`);

  const BATCH_SIZE = 50;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < careerRows.length; i += BATCH_SIZE) {
    const batch = careerRows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('scope_careers')
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Career batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      errors++;
    } else {
      inserted += batch.length;
      process.stdout.write(`   ✓ Inserted ${inserted}/${careerRows.length} careers\r`);
    }
  }

  console.log(`\n✅ Scopes seeding complete: ${inserted} careers, ${categoryRows.length} categories.`);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
