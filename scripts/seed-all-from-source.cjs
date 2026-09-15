/**
 * ============================================================
 * ZooLearn Platform — Master Seed Script
 * ============================================================
 * Reads from the 4 source files at the project root:
 *   1. allAnimalData.json   → phyla, classes, species (basic)
 *   2. AllPhylumData.json   → species (detailed — enriches species rows)
 *   3. scopesData.js        → scope_categories + scope_careers (primary)
 *   4. careersData.js       → scope_categories + scope_careers (merged)
 *
 * Steps:
 *   1. DELETE all data from scope_careers, scope_categories,
 *      species, classes, phyla  (in FK-safe order)
 *   2. INSERT phyla, classes, species from allAnimalData.json
 *   3. UPSERT species with rich data from AllPhylumData.json
 *   4. INSERT scope_categories + scope_careers from scopesData.js
 *
 * Usage:
 *   node scripts/seed-all-from-source.cjs
 * ============================================================
 */

'use strict';

const { createClient } = require('@supabase/supabase-js');
const fs   = require('fs');
const path = require('path');

// ── 1. Load env ──────────────────────────────────────────────
const envPath = path.resolve(__dirname, '../apps/web/.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  env[key] = val;
}

const SUPABASE_URL     = env['NEXT_PUBLIC_SUPABASE_URL'];
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── 2. Helpers ───────────────────────────────────────────────
function toSlug(name) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const BATCH_SIZE = 100;

async function upsertBatch(table, rows, conflict) {
  let done = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from(table)
      .upsert(batch, { onConflict: conflict });
    if (error) {
      console.error(`   [${table}] batch error:`, error.message, error.details || '');
    } else {
      done += batch.length;
      process.stdout.write(`   ${done}/${rows.length} upserted\r`);
    }
  }
  process.stdout.write('\n');
  return done;
}

// ── 3. Load source files ─────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');

console.log('\nLoading source files…');

const animalData = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'allAnimalData.json'), 'utf8')
);
console.log('  allAnimalData.json loaded');

const phylumDetailData = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'AllPhylumData.json'), 'utf8')
);
console.log('  AllPhylumData.json loaded  (' + Object.keys(phylumDetailData).length + ' species)');

/**
 * Extract careerCategories from a JS ES-module source string.
 * Strips imports, replaces icon references, evaluates with Function.
 */
function extractCareerCategories(jsSource) {
  let src = jsSource;

  // Remove all import statements (single-line & multi-line via [^;]+;)
  src = src.replace(/import[^;]+;/g, '');

  // Strip export keywords
  src = src.replace(/\bexport\s+const\s+/g, 'const ');
  src = src.replace(/\bexport\s+default\s+/g, 'const _default = ');

  // Replace bare capitalized identifiers used as property values
  // e.g. `icon: Microscope,` → `icon: "Microscope",`
  src = src.replace(/(?<=:\s*)([A-Z][A-Za-z0-9_]*)(?=\s*[,}\]])/g, '"$1"');

  try {
    const fn = new Function(src + '\nreturn typeof careerCategories !== "undefined" ? careerCategories : [];');
    return fn();
  } catch (e) {
    console.error('  Could not parse careerCategories:', e.message);
    return [];
  }
}


const scopesCats   = extractCareerCategories(fs.readFileSync(path.join(ROOT, 'scopesData.js'),  'utf8'));
const careersCats  = extractCareerCategories(fs.readFileSync(path.join(ROOT, 'careersData.js'), 'utf8'));
console.log('  scopesData.js  →', scopesCats.length, 'categories');
console.log('  careersData.js →', careersCats.length, 'categories');

// ── 4. Main ──────────────────────────────────────────────────
async function seed() {

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP A: DELETE in FK-safe order
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\nDeleting existing data (FK-safe order)…');

  const toDelete = ['scope_careers', 'scope_categories', 'species', 'classes', 'phyla'];

  for (const table of toDelete) {
    const { error } = await supabase
      .from(table)
      .delete()
      .not('created_at', 'is', null);   // universal true filter

    if (error && error.code !== 'PGRST116') {
      console.error('  Failed to delete', table, ':', error.message);
    } else {
      console.log('  Cleared', table);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP B: PHYLA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\nSeeding phyla…');

  const PHYLA_META = {
    porifera:        { name: 'Porifera',        subtitle: 'The Sponges' },
    coelenterata:    { name: 'Coelenterata',    subtitle: 'Cnidarians — Jellyfish & Corals' },
    ctenophora:      { name: 'Ctenophora',      subtitle: 'Comb Jellies' },
    platyhelminthes: { name: 'Platyhelminthes', subtitle: 'Flatworms' },
    aschelminthes:   { name: 'Aschelminthes',   subtitle: 'Roundworms & Nematodes' },
    annelida:        { name: 'Annelida',         subtitle: 'Segmented Worms' },
    arthropoda:      { name: 'Arthropoda',       subtitle: 'Insects, Crustaceans & Arachnids' },
    mollusca:        { name: 'Mollusca',         subtitle: 'Snails, Clams & Octopus' },
    echinodermata:   { name: 'Echinodermata',    subtitle: 'Starfish & Sea Urchins' },
    hemichordata:    { name: 'Hemichordata',     subtitle: 'Acorn Worms' },
    chordata:        { name: 'Chordata',         subtitle: 'Vertebrates & Tunicates' },
  };

  const phylaKeys = Object.keys(animalData);
  const phylaRows = phylaKeys.map((key, idx) => ({
    slug:       key,
    name:       PHYLA_META[key]?.name     || (key.charAt(0).toUpperCase() + key.slice(1)),
    subtitle:   PHYLA_META[key]?.subtitle || null,
    sort_order: idx + 1,
  }));

  console.log(' ', phylaRows.length, 'phyla');
  await upsertBatch('phyla', phylaRows, 'slug');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP C: CLASSES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\nSeeding classes…');

  const classRows = [];
  for (const [phylumSlug, classesArr] of Object.entries(animalData)) {
    for (let ci = 0; ci < classesArr.length; ci++) {
      const cls = classesArr[ci];
      classRows.push({
        slug:        cls.id || toSlug(cls.className),
        class_name:  cls.className,
        phylum_slug: phylumSlug,
        sort_order:  ci + 1,
      });
    }
  }

  console.log(' ', classRows.length, 'classes');
  await upsertBatch('classes', classRows, 'slug');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP D: SPECIES basic (from allAnimalData.json)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\nSeeding species (basic from allAnimalData.json)…');

  const speciesRows = [];
  for (const [phylumSlug, classesArr] of Object.entries(animalData)) {
    for (const cls of classesArr) {
      const classSlug = cls.id || toSlug(cls.className);
      for (let si = 0; si < (cls.species || []).length; si++) {
        const sp = cls.species[si];
        speciesRows.push({
          slug:            sp.slug || toSlug(sp.name),
          name:            sp.name,
          scientific_name: sp.scientificName || null,
          image:           sp.image          || null,
          phylum_slug:     phylumSlug,
          class_slug:      classSlug,
          sort_order:      si + 1,
          introduction:    [],
          features:        {},
          classification:  {},
          size_structure:  [],
          ecology:         [],
          economy:         [],
        });
      }
    }
  }

  console.log(' ', speciesRows.length, 'species (basic)');
  await upsertBatch('species', speciesRows, 'slug');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP E: SPECIES rich data (from AllPhylumData.json)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\nEnriching species with AllPhylumData.json…');

  const enrichRows = [];
  let skipped = 0;

  for (const [slugKey, sp] of Object.entries(phylumDetailData)) {
    const phylumSlug = sp.phylum_source || null;
    if (!phylumSlug) { skipped++; continue; }

    enrichRows.push({
      slug:            sp.slug || slugKey,
      name:            sp.name || (slugKey.charAt(0).toUpperCase() + slugKey.slice(1)),
      scientific_name: sp.scientificName || null,
      description:     sp.description    || null,
      image:           sp.image          || null,
      model_3d:        sp['3d']          || null,
      introduction:    Array.isArray(sp.introduction)  ? sp.introduction  : [],
      features:        (sp.features && typeof sp.features === 'object')        ? sp.features       : {},
      classification:  (sp.classification && typeof sp.classification === 'object') ? sp.classification : {},
      size_structure:  Array.isArray(sp.sizeStructure) ? sp.sizeStructure : [],
      ecology:         Array.isArray(sp.ecology)       ? sp.ecology        : [],
      economy:         Array.isArray(sp.economy)       ? sp.economy        : [],
      phylum_slug:     phylumSlug,
    });
  }

  if (skipped) console.log('  Skipped', skipped, 'entries with no phylum_source');
  console.log(' ', enrichRows.length, 'species (rich)');
  await upsertBatch('species', enrichRows, 'slug');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP F: SCOPE_CATEGORIES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\nSeeding scope categories…');

  // Merge: scopesData.js (primary) overrides careersData.js
  const mergedMap = new Map();
  for (const cat of careersCats) {
    const id = cat.id || toSlug(cat.name || '');
    if (id) mergedMap.set(id, cat);
  }
  for (const cat of scopesCats) {
    const id = cat.id || toSlug(cat.name || '');
    if (id) mergedMap.set(id, cat);
  }
  const allCats = Array.from(mergedMap.values());

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
    'pink','indigo','lime','fuchsia','red','sky','green','yellow','slate','purple',
  ];

  // Strip emoji prefix from names
  const stripEmoji = (s) => (s || '').replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/gu, '').trim();

  const categoryRows = allCats.map((cat, idx) => ({
    id:           cat.id || toSlug(cat.name || ''),
    name:         stripEmoji(cat.name),
    short_name:   stripEmoji(cat.shortName || (cat.name || '').split(' ').slice(0, 2).join(' ')),
    description:  cat.description || null,
    icon_name:    typeof cat.icon === 'string' ? cat.icon : 'Microscope',
    salary_range: cat.salaryRange || null,
    gradient:     (cat.theme && cat.theme.gradient) || gradients[idx % gradients.length],
    color:        colors[idx % colors.length],
    sort_order:   idx,
    is_active:    true,
    updated_at:   new Date().toISOString(),
  }));

  console.log(' ', categoryRows.length, 'categories');
  await upsertBatch('scope_categories', categoryRows, 'id');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP G: SCOPE_CAREERS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\nSeeding scope careers…');

  const careerRows = [];
  const seenIds = new Set();

  for (const cat of allCats) {
    const catId = cat.id || toSlug(cat.name || '');
    for (let ci = 0; ci < (cat.careers || []).length; ci++) {
      const career = cat.careers[ci];
      if (!career || !career.title) continue;

      const baseId  = toSlug(career.title);
      let careerId  = `${catId}__${baseId}`;
      let suffix    = 0;
      while (seenIds.has(careerId)) { suffix++; careerId = `${catId}__${baseId}_${suffix}`; }
      seenIds.add(careerId);

      careerRows.push({
        id:              careerId,
        title:           career.title,
        description:     career.desc || career.description || null,
        category_id:     catId,
        badge:           career.badge           || null,
        secondary_badge: career.secondaryBadge  || null,
        salary:          career.salary          || career.salaryRange || null,
        salary_min:      career.salaryMin       || null,
        salary_max:      career.salaryMax       || null,
        bsc:             Array.isArray(career.bsc) ? career.bsc : [],
        msc:             Array.isArray(career.msc) ? career.msc : [],
        phd:             Array.isArray(career.phd) ? career.phd : [],
        is_top_choice:   career.isTopChoice     || false,
        top_sectors:     Array.isArray(career.topSectors) ? career.topSectors : [],
        key_skills:      Array.isArray(career.keySkills)  ? career.keySkills  : [],
        sort_order:      ci,
        is_active:       true,
        updated_at:      new Date().toISOString(),
      });
    }
  }

  console.log(' ', careerRows.length, 'careers');
  await upsertBatch('scope_careers', careerRows, 'id');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SUMMARY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n=== Seeding complete ===');
  console.log('  Phyla:            ', phylaRows.length);
  console.log('  Classes:          ', classRows.length);
  console.log('  Species (basic):  ', speciesRows.length);
  console.log('  Species (rich):   ', enrichRows.length);
  console.log('  Scope categories: ', categoryRows.length);
  console.log('  Scope careers:    ', careerRows.length);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
