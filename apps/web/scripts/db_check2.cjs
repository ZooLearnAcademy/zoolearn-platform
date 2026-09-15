const { createClient } = require('@supabase/supabase-js');

const c = createClient(
  'https://oczegyvadkjjplwdsbko.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jemVneXZhZGtqanBsd2RzYmtvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzg0NjIxNiwiZXhwIjoyMDk5NDIyMjE2fQ.9hlhQQ2o-AeJnP59xqOoUyjsrSqVbcb-NDCymdB-KKY'
);

async function main() {
  // Check tables with NULL count (empty or has RLS issue)
  console.log('=== CHECKING kingdom_animalia ===');
  const { data: ka, error: kaErr, count: kaCount } = await c.from('kingdom_animalia').select('*', { count: 'exact' });
  console.log('kingdom_animalia rows:', kaCount, 'error:', kaErr?.message || 'none');
  if (ka) console.log('data:', JSON.stringify(ka, null, 2));

  console.log('\n=== CHECKING taxonomy_nodes ===');
  const { data: tn, error: tnErr, count: tnCount } = await c.from('taxonomy_nodes').select('*', { count: 'exact' });
  console.log('taxonomy_nodes rows:', tnCount, 'error:', tnErr?.message || 'none');
  if (tn) console.log('data:', JSON.stringify(tn?.slice(0, 3), null, 2));

  console.log('\n=== CHECKING taxonomy_tree ===');
  const { data: tt, error: ttErr, count: ttCount } = await c.from('taxonomy_tree').select('*', { count: 'exact' });
  console.log('taxonomy_tree rows:', ttCount, 'error:', ttErr?.message || 'none');
  if (tt) console.log('data:', JSON.stringify(tt?.slice(0, 3), null, 2));

  console.log('\n=== CHECKING scopes ===');
  const { data: sc, error: scErr, count: scCount } = await c.from('scopes').select('*', { count: 'exact' });
  console.log('scopes rows:', scCount, 'error:', scErr?.message || 'none');
  if (sc) console.log('data (first 2):', JSON.stringify(sc?.slice(0, 2), null, 2));
  
  // Check RLS on scope_categories and scope_careers using anon key
  console.log('\n=== ANON KEY READ CHECK (scope_categories) ===');
  const anon = createClient(
    'https://oczegyvadkjjplwdsbko.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jemVneXZhZGtqanBsd2RzYmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NDYyMTYsImV4cCI6MjA5OTQyMjIxNn0.09JNTUy15o-Ku8kA2zi1duz6dhcSGPDNG1YDslVRjCM'
  );
  
  const { data: anonCats, error: anonCatErr } = await anon.from('scope_categories').select('id, name').limit(3);
  console.log('anon scope_categories:', anonCatErr ? 'ERROR: ' + anonCatErr.message : JSON.stringify(anonCats));

  const { data: anonCar, error: anonCarErr } = await anon.from('scope_careers').select('id, title').limit(3);
  console.log('anon scope_careers:', anonCarErr ? 'ERROR: ' + anonCarErr.message : JSON.stringify(anonCar));

  const { data: anonPhyla, error: anonPhylaErr } = await anon.from('phyla').select('slug, name').limit(3);
  console.log('anon phyla:', anonPhylaErr ? 'ERROR: ' + anonPhylaErr.message : JSON.stringify(anonPhyla));
}

main().catch(e => console.error(e));
