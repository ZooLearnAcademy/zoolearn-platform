-- ============================================================
-- ZooLearn Platform — ZooHub Seed Data
-- ============================================================
-- Seeds the phyla, classes, and species tables with the
-- complete Animal Kingdom classification used by ZooHub.
--
-- HOW TO USE:
--   1. Open your Supabase project → SQL Editor
--   2. Run this entire file
-- ============================================================

-- ── PHYLA ────────────────────────────────────────────────────

INSERT INTO public.phyla (slug, name, subtitle, sort_order) VALUES
  ('porifera',        'Porifera',        'The Sponges',                        1),
  ('coelenterata',    'Coelenterata',    'Cnidarians — Jellyfish & Corals',    2),
  ('ctenophora',      'Ctenophora',      'Comb Jellies',                       3),
  ('platyhelminthes', 'Platyhelminthes', 'Flatworms',                          4),
  ('aschelminthes',   'Aschelminthes',   'Roundworms & Nematodes',             5),
  ('annelida',        'Annelida',        'Segmented Worms',                    6),
  ('arthropoda',      'Arthropoda',      'Insects, Crustaceans & Arachnids',  7),
  ('mollusca',        'Mollusca',        'Snails, Clams & Octopus',            8),
  ('echinodermata',   'Echinodermata',   'Starfish & Sea Urchins',             9),
  ('hemichordata',    'Hemichordata',    'Acorn Worms',                       10),
  ('chordata',        'Chordata',        'Vertebrates & Tunicates',           11)
ON CONFLICT (slug) DO UPDATE SET
  name     = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Porifera ───────────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('calcarea',       'Calcarea',       'porifera', 1),
  ('hexactinellida', 'Hexactinellida', 'porifera', 2),
  ('demospongiae',   'Demospongiae',   'porifera', 3)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Coelenterata ───────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('hydrozoa',   'Hydrozoa',   'coelenterata', 1),
  ('scyphozoa',  'Scyphozoa',  'coelenterata', 2),
  ('anthozoa',   'Anthozoa',   'coelenterata', 3)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Platyhelminthes ────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('turbellaria', 'Turbellaria', 'platyhelminthes', 1),
  ('trematoda',   'Trematoda',   'platyhelminthes', 2),
  ('cestoda',     'Cestoda',     'platyhelminthes', 3)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Aschelminthes ──────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('nematoda',    'Nematoda',    'aschelminthes', 1),
  ('rotifera',    'Rotifera',    'aschelminthes', 2)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Annelida ───────────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('polychaeta',  'Polychaeta',  'annelida', 1),
  ('oligochaeta', 'Oligochaeta', 'annelida', 2),
  ('hirudinea',   'Hirudinea',   'annelida', 3)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Arthropoda ─────────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('insecta',      'Insecta',      'arthropoda', 1),
  ('crustacea',    'Crustacea',    'arthropoda', 2),
  ('arachnida',    'Arachnida',    'arthropoda', 3),
  ('myriapoda',    'Myriapoda',    'arthropoda', 4)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Mollusca ───────────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('gastropoda',   'Gastropoda',   'mollusca', 1),
  ('bivalvia',     'Bivalvia',     'mollusca', 2),
  ('cephalopoda',  'Cephalopoda',  'mollusca', 3)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Echinodermata ──────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('asteroidea',   'Asteroidea',   'echinodermata', 1),
  ('echinoidea',   'Echinoidea',   'echinodermata', 2),
  ('holothuroidea','Holothuroidea','echinodermata', 3),
  ('ophiuroidea',  'Ophiuroidea',  'echinodermata', 4),
  ('crinoidea',    'Crinoidea',    'echinodermata', 5)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Chordata ───────────────────────────────────────

INSERT INTO public.classes (slug, class_name, phylum_slug, sort_order) VALUES
  ('cyclostomata', 'Cyclostomata', 'chordata', 1),
  ('chondrichthyes','Chondrichthyes','chordata',2),
  ('osteichthyes', 'Osteichthyes', 'chordata', 3),
  ('amphibia',     'Amphibia',     'chordata', 4),
  ('reptilia',     'Reptilia',     'chordata', 5),
  ('aves',         'Aves',         'chordata', 6),
  ('mammalia',     'Mammalia',     'chordata', 7)
ON CONFLICT (slug) DO UPDATE SET class_name = EXCLUDED.class_name, sort_order = EXCLUDED.sort_order;

-- ── SPECIES — Representative examples per class ──────────────
-- Add a handful of well-known species so ZooHub has data to show.
-- Admins can add more via the ZooHub Manager at /admin/zoohub.

INSERT INTO public.species (slug, name, scientific_name, description, phylum_slug, class_slug, sort_order) VALUES

  -- Porifera
  ('sycon',          'Sycon',           'Sycon ciliatum',         'A calcareous sponge with radial symmetry.', 'porifera', 'calcarea', 1),
  ('euspongia',      'Bath Sponge',     'Euspongia officinalis',  'The commercial bath sponge.', 'porifera', 'demospongiae', 2),
  ('spongilla',      'Freshwater Sponge','Spongilla lacustris',   'A freshwater sponge found in lakes and streams.', 'porifera', 'demospongiae', 3),

  -- Coelenterata
  ('hydra',          'Hydra',           'Hydra vulgaris',         'A tiny freshwater polyp with remarkable regenerative ability.', 'coelenterata', 'hydrozoa', 1),
  ('aurelia',        'Moon Jellyfish',  'Aurelia aurita',         'The common moon jellyfish with transparent bell.', 'coelenterata', 'scyphozoa', 2),
  ('adamsia',        'Sea Anemone',     'Adamsia palliata',       'A sea anemone that lives in symbiosis with hermit crabs.', 'coelenterata', 'anthozoa', 3),
  ('corallium',      'Red Coral',       'Corallium rubrum',       'A precious coral species forming tree-like colonies.', 'coelenterata', 'anthozoa', 4),

  -- Platyhelminthes
  ('planaria',       'Planaria',        'Dugesia tigrina',        'A free-living flatworm famous for its regeneration.', 'platyhelminthes', 'turbellaria', 1),
  ('fasciola',       'Liver Fluke',     'Fasciola hepatica',      'A parasitic fluke infecting the liver of sheep and cattle.', 'platyhelminthes', 'trematoda', 2),
  ('taenia',         'Tapeworm',        'Taenia solium',          'The pork tapeworm, a human intestinal parasite.', 'platyhelminthes', 'cestoda', 3),

  -- Aschelminthes
  ('ascaris',        'Roundworm',       'Ascaris lumbricoides',   'The large intestinal roundworm, a common human parasite.', 'aschelminthes', 'nematoda', 1),
  ('wuchereria',     'Filarial Worm',   'Wuchereria bancrofti',   'Causes lymphatic filariasis (elephantiasis).', 'aschelminthes', 'nematoda', 2),

  -- Annelida
  ('nereis',         'Nereis',          'Nereis virens',          'A marine polychaete worm also called clamworm.', 'annelida', 'polychaeta', 1),
  ('pheretima',      'Indian Earthworm','Pheretima posthuma',     'The common Indian earthworm vital for soil fertility.', 'annelida', 'oligochaeta', 2),
  ('hirudo',         'Medicinal Leech', 'Hirudo medicinalis',     'Used in traditional medicine for blood-letting.', 'annelida', 'hirudinea', 3),

  -- Arthropoda
  ('periplaneta',    'Cockroach',       'Periplaneta americana',  'A large cosmopolitan cockroach species.', 'arthropoda', 'insecta', 1),
  ('apis',           'Honeybee',        'Apis mellifera',         'The western honeybee, key pollinator and honey producer.', 'arthropoda', 'insecta', 2),
  ('bombyx',         'Silkworm Moth',   'Bombyx mori',            'Produces silk in its larval stage; economically vital.', 'arthropoda', 'insecta', 3),
  ('palamnaeus',     'Black Scorpion',  'Palamnaeus bengalensis', 'A large black scorpion found in South Asia.', 'arthropoda', 'arachnida', 4),
  ('limulus',        'Horseshoe Crab',  'Limulus polyphemus',     'A living fossil; its blood is used in biomedical testing.', 'arthropoda', 'crustacea', 5),

  -- Mollusca
  ('pila',           'Apple Snail',     'Pila globosa',           'A large freshwater snail, common in Indian ponds.', 'mollusca', 'gastropoda', 1),
  ('aplysia',        'Sea Hare',        'Aplysia californica',    'A large sea slug used extensively in neuroscience research.', 'mollusca', 'gastropoda', 2),
  ('unio',           'Freshwater Mussel','Unio pictorum',         'A freshwater bivalve mollusc.', 'mollusca', 'bivalvia', 3),
  ('loligo',         'Squid',           'Loligo vulgaris',        'A torpedo-shaped cephalopod with 10 arms.', 'mollusca', 'cephalopoda', 4),
  ('octopus',        'Octopus',         'Octopus vulgaris',       'Highly intelligent cephalopod with 8 arms.', 'mollusca', 'cephalopoda', 5),

  -- Echinodermata
  ('asterias',       'Starfish',        'Asterias rubens',        'The common starfish with 5 arms.', 'echinodermata', 'asteroidea', 1),
  ('echinus',        'Sea Urchin',      'Echinus esculentus',     'A spiny sea urchin with globular test.', 'echinodermata', 'echinoidea', 2),
  ('holothuria',     'Sea Cucumber',    'Holothuria scabra',      'A soft-bodied echinoderm used in Asian cuisine.', 'echinodermata', 'holothuroidea', 3),
  ('ophiura',        'Brittle Star',    'Ophiura ophiura',        'A fast-moving echinoderm with slender arms.', 'echinodermata', 'ophiuroidea', 4),

  -- Hemichordata
  ('balanoglossus',  'Balanoglossus',   'Balanoglossus clavigerus','An acorn worm; important evolutionary link to chordates.', 'hemichordata', null, 1),
  ('saccoglossus',   'Saccoglossus',    'Saccoglossus kowalevskii','A widely studied acorn worm.', 'hemichordata', null, 2),

  -- Chordata
  ('petromyzon',     'Lamprey',         'Petromyzon marinus',     'A jawless parasitic fish; one of the oldest vertebrates.', 'chordata', 'cyclostomata', 1),
  ('scoliodon',      'Dogfish Shark',   'Scoliodon laticaudus',   'A small cartilaginous shark common in Indian waters.', 'chordata', 'chondrichthyes', 2),
  ('rana',           'Indian Bullfrog', 'Hoplobatrachus tigerinus','A large frog found across South and Southeast Asia.', 'chordata', 'amphibia', 3),
  ('calotes',        'Garden Lizard',   'Calotes versicolor',     'The common garden lizard of South Asia.', 'chordata', 'reptilia', 4),
  ('columba',        'Rock Pigeon',     'Columba livia',          'The ancestor of all domestic pigeons.', 'chordata', 'aves', 5),
  ('oryctolagus',    'European Rabbit', 'Oryctolagus cuniculus',  'The common rabbit; ancestor of all domestic breeds.', 'chordata', 'mammalia', 6)

ON CONFLICT (slug) DO UPDATE SET
  name            = EXCLUDED.name,
  scientific_name = EXCLUDED.scientific_name,
  description     = EXCLUDED.description,
  phylum_slug     = EXCLUDED.phylum_slug,
  class_slug      = EXCLUDED.class_slug,
  sort_order      = EXCLUDED.sort_order;
