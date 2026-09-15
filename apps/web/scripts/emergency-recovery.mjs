/**
 * emergency-recovery.mjs
 *
 * Recovers all dynamic data (Scopes and Taxonomy) from a local backup directory
 * (D:\zoolearn-platform-dev1) into the Supabase database.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";
import dns from "dns";

// Fix Node 18+ DNS resolution issues (ENOTFOUND fetch failed) for Supabase
dns.setDefaultResultOrder("ipv4first");

// ── Load env ──────────────────────────────────────────────────────────────
const envPath = resolve(process.cwd(), ".env.local");
const env = readFileSync(envPath, "utf8")
  .split("\n")
  .reduce((acc, line) => {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) acc[key.trim()] = vals.join("=").trim();
    return acc;
  }, {});

const supabase = createClient(env["NEXT_PUBLIC_SUPABASE_URL"], env["SUPABASE_SERVICE_ROLE_KEY"], {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function recoverScopes() {
  console.log("🚀 Recovering Scopes data...");
  const dataPath = "D:/zoolearn-platform-dev1/apps/web/data/scopes-data.ts";
  const { scopeCategories, allCareers } = await import("file://" + dataPath);

  const categoryRows = scopeCategories.map((cat, index) => ({
    id: cat.id, name: cat.name, short_name: cat.shortName || null,
    description: cat.description || null, icon_name: cat.iconName || null,
    salary_range: cat.salaryRange || null, gradient: cat.gradient || null,
    color: cat.color || null, sort_order: index, is_active: true,
  }));

  const { error: catError } = await supabase.from("scope_categories").upsert(categoryRows, { onConflict: "id" });
  if (catError) throw catError;
  console.log(`✅ Recovered ${categoryRows.length} scope categories.`);

  const careerRows = allCareers.map((car, index) => ({
    id: car.id, title: car.title, description: car.desc || null,
    category_id: car.categoryId || null, badge: car.badge || null,
    secondary_badge: car.secondaryBadge || null, salary: car.salary || null,
    salary_min: car.salaryMin || null, salary_max: car.salaryMax || null,
    bsc: car.bsc || [], msc: car.msc || [], phd: car.phd || [],
    is_top_choice: car.isTopChoice || false, top_sectors: car.topSectors || [],
    key_skills: car.keySkills || [], sort_order: index, is_active: true,
  }));

  for (let i = 0; i < careerRows.length; i += 50) {
    const batch = careerRows.slice(i, i + 50);
    const { error } = await supabase.from("scope_careers").upsert(batch, { onConflict: "id" });
    if (error) throw error;
  }
  console.log(`✅ Recovered ${careerRows.length} careers.`);
}

async function recoverTaxonomy() {
  console.log("\\n🚀 Recovering Taxonomy data...");
  const rawData = readFileSync("D:/zoolearn-platform-dev1/apps/web/data/kingdomAnimaliaData.json", "utf8");
  const data = JSON.parse(rawData);

  // 1. Phyla
  const phylaList = data.phyla || [];
  const phylaRows = phylaList.map((p, i) => ({
    slug: p.id, name: p.name, subtitle: p.tagline || "",
    sort_order: i
  }));
  if (phylaRows.length) {
    const { error } = await supabase.from("phyla").upsert(phylaRows, { onConflict: "slug" });
    if (error) throw error;
    console.log(`✅ Recovered ${phylaRows.length} phyla.`);
  }

  // 2. Classes
  const classRows = [];
  phylaList.forEach((p) => {
    (p.majorClasses || []).forEach((c, i) => {
      const slug = c.name.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      classRows.push({
        slug: slug, phylum_slug: p.id, class_name: c.name,
        sort_order: i
      });
    });
  });
  if (classRows.length) {
    const { error } = await supabase.from("classes").upsert(classRows, { onConflict: "slug" });
    if (error) throw error;
    console.log(`✅ Recovered ${classRows.length} classes.`);
  }

  // 3. Species
  const speciesRows = [];
  phylaList.forEach((p) => {
    (p.majorClasses || []).forEach((c) => {
      const classSlug = c.name.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      (c.examples || []).forEach((sName, i) => {
        const sSlug = sName.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
        speciesRows.push({
          slug: sSlug, phylum_slug: p.id, class_slug: classSlug,
          name: sName, scientific_name: sName,
          description: null, image: null,
          model_3d: null, introduction: [],
          features: {}, classification: {},
          size_structure: [], ecology: [],
          economy: [], sort_order: i
        });
      });
    });
  });
  
  if (speciesRows.length) {
    for (let i = 0; i < speciesRows.length; i += 50) {
      const batch = speciesRows.slice(i, i + 50);
      const { error } = await supabase.from("species").upsert(batch, { onConflict: "slug" });
      if (error) throw error;
    }
    console.log(`✅ Recovered ${speciesRows.length} species.`);
  }
}

async function run() {
  try {
    await recoverScopes();
    await recoverTaxonomy();
    console.log("\n🎉 EMERGENCY RECOVERY COMPLETE! All data restored.");
  } catch (err) {
    console.error("❌ Recovery Failed:", err);
  }
}

run();
