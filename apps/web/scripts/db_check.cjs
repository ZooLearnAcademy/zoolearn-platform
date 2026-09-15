const { createClient } = require('@supabase/supabase-js');

const c = createClient(
  'https://oczegyvadkjjplwdsbko.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jemVneXZhZGtqanBsd2RzYmtvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzg0NjIxNiwiZXhwIjoyMDk5NDIyMjE2fQ.9hlhQQ2o-AeJnP59xqOoUyjsrSqVbcb-NDCymdB-KKY'
);

async function main() {
  const tables = ['profiles', 'phyla', 'classes', 'species', 'scopes', 'kingdom_animalia', 'scope_categories', 'scope_careers', 'taxonomy_nodes', 'taxonomy_tree'];
  
  console.log('=== TABLE EXISTENCE CHECK ===');
  for (const t of tables) {
    const r = await c.from(t).select('*', { count: 'exact', head: true });
    if (r.error) {
      console.log('  ' + t + ': ERROR - ' + r.error.message + ' (code: ' + r.error.code + ')');
    } else {
      console.log('  ' + t + ': EXISTS (' + r.count + ' rows)');
    }
  }
  
  console.log('\n=== PROFILES COLUMN CHECK ===');
  const { data: profile, error: pErr } = await c.from('profiles').select('*').limit(1);
  if (profile && profile.length > 0) {
    console.log('Profile columns:', Object.keys(profile[0]));
  } else {
    console.log('No profiles or error:', pErr?.message);
    const { error: colErr } = await c.from('profiles').select('user_id, is_admin').limit(0);
    console.log('is_admin column check:', colErr ? colErr.message : 'Column exists');
  }
  
  console.log('\n=== PHYLA DATA ===');
  const { data: phyla, error: phylaErr } = await c.from('phyla').select('*').order('sort_order').limit(5);
  if (phylaErr) console.log('Error:', phylaErr.message);
  else console.log(JSON.stringify(phyla, null, 2));

  console.log('\n=== CLASSES DATA (first 5) ===');
  const { data: cls, error: clsErr } = await c.from('classes').select('*').order('sort_order').limit(5);
  if (clsErr) console.log('Error:', clsErr.message);
  else console.log(JSON.stringify(cls, null, 2));

  console.log('\n=== SPECIES DATA (first 3) ===');
  const { data: sp, error: spErr } = await c.from('species').select('slug, name, phylum_slug, class_slug').order('sort_order').limit(3);
  if (spErr) console.log('Error:', spErr.message);
  else console.log(JSON.stringify(sp, null, 2));

  console.log('\n=== SCOPE_CATEGORIES DATA ===');
  const { data: sc, error: scErr } = await c.from('scope_categories').select('*').limit(3);
  if (scErr) console.log('Error:', scErr.message);
  else console.log(JSON.stringify(sc, null, 2));

  console.log('\n=== SCOPE_CAREERS DATA (first 3) ===');
  const { data: scareer, error: scareerErr } = await c.from('scope_careers').select('id, title, category_id').limit(3);
  if (scareerErr) console.log('Error:', scareerErr.message);
  else console.log(JSON.stringify(scareer, null, 2));
}

main().catch(e => console.error(e));
