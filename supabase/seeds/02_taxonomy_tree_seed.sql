-- ============================================================
-- ZooLearn Platform — Taxonomy Tree Seed Data
-- ============================================================
-- Populates the taxonomy_nodes table with the full 8-rank
-- classification hierarchy for Kingdom Animalia.
--
-- Structure:
--   Kingdom → Phylum → Class → Order (selected) → Species (selected)
--
-- HOW TO USE:
--   1. Open your Supabase project → SQL Editor
--   2. Run this file AFTER running 01_zoohub_seed.sql
-- ============================================================

-- ── ROOT: Kingdom Animalia ───────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia', 'Animalia', 'Kingdom', 'Animal Kingdom', NULL, 0)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── PHYLA (11 major animal phyla) ───────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_porifera',        'Porifera',        'Phylum', 'Sponges',                   'animalia', 1),
  ('animalia_coelenterata',    'Coelenterata',    'Phylum', 'Cnidarians',                'animalia', 2),
  ('animalia_ctenophora',      'Ctenophora',      'Phylum', 'Comb Jellies',              'animalia', 3),
  ('animalia_platyhelminthes', 'Platyhelminthes', 'Phylum', 'Flatworms',                 'animalia', 4),
  ('animalia_aschelminthes',   'Aschelminthes',   'Phylum', 'Roundworms',                'animalia', 5),
  ('animalia_annelida',        'Annelida',        'Phylum', 'Segmented Worms',           'animalia', 6),
  ('animalia_arthropoda',      'Arthropoda',      'Phylum', 'Jointed-leg Animals',       'animalia', 7),
  ('animalia_mollusca',        'Mollusca',        'Phylum', 'Molluscs',                  'animalia', 8),
  ('animalia_echinodermata',   'Echinodermata',   'Phylum', 'Spiny-skin Animals',        'animalia', 9),
  ('animalia_hemichordata',    'Hemichordata',    'Phylum', 'Acorn Worms',               'animalia', 10),
  ('animalia_chordata',        'Chordata',        'Phylum', 'Animals with Notochord',    'animalia', 11)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name, sort_order = EXCLUDED.sort_order;

-- ── CLASSES — Porifera ───────────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_porifera_calcarea',       'Calcarea',       'Class', 'Calcareous Sponges',   'animalia_porifera', 1),
  ('animalia_porifera_hexactinellida', 'Hexactinellida', 'Class', 'Glass Sponges',        'animalia_porifera', 2),
  ('animalia_porifera_demospongiae',   'Demospongiae',   'Class', 'Horny Sponges',        'animalia_porifera', 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Coelenterata ───────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_coelenterata_hydrozoa',  'Hydrozoa',  'Class', 'Hydroids',       'animalia_coelenterata', 1),
  ('animalia_coelenterata_scyphozoa', 'Scyphozoa', 'Class', 'True Jellyfish', 'animalia_coelenterata', 2),
  ('animalia_coelenterata_anthozoa',  'Anthozoa',  'Class', 'Corals & Anemones', 'animalia_coelenterata', 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Platyhelminthes ────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_platyhelminthes_turbellaria', 'Turbellaria', 'Class', 'Free-living Flatworms', 'animalia_platyhelminthes', 1),
  ('animalia_platyhelminthes_trematoda',   'Trematoda',   'Class', 'Flukes',                'animalia_platyhelminthes', 2),
  ('animalia_platyhelminthes_cestoda',     'Cestoda',     'Class', 'Tapeworms',             'animalia_platyhelminthes', 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Aschelminthes ──────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_aschelminthes_nematoda', 'Nematoda', 'Class', 'Roundworms', 'animalia_aschelminthes', 1),
  ('animalia_aschelminthes_rotifera', 'Rotifera', 'Class', 'Wheel Animals', 'animalia_aschelminthes', 2)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Annelida ───────────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_annelida_polychaeta',  'Polychaeta',  'Class', 'Bristle Worms',    'animalia_annelida', 1),
  ('animalia_annelida_oligochaeta', 'Oligochaeta', 'Class', 'Earthworms',       'animalia_annelida', 2),
  ('animalia_annelida_hirudinea',   'Hirudinea',   'Class', 'Leeches',          'animalia_annelida', 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Arthropoda ─────────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_arthropoda_insecta',   'Insecta',   'Class', 'Insects',       'animalia_arthropoda', 1),
  ('animalia_arthropoda_crustacea', 'Crustacea', 'Class', 'Crustaceans',   'animalia_arthropoda', 2),
  ('animalia_arthropoda_arachnida', 'Arachnida', 'Class', 'Spiders & Scorpions', 'animalia_arthropoda', 3),
  ('animalia_arthropoda_myriapoda', 'Myriapoda', 'Class', 'Centipedes & Millipedes', 'animalia_arthropoda', 4)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── ORDERS — Insecta (selected) ──────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_arthropoda_insecta_diptera',      'Diptera',      'Order', 'True Flies & Mosquitoes', 'animalia_arthropoda_insecta', 1),
  ('animalia_arthropoda_insecta_lepidoptera',  'Lepidoptera',  'Order', 'Butterflies & Moths',     'animalia_arthropoda_insecta', 2),
  ('animalia_arthropoda_insecta_hymenoptera',  'Hymenoptera',  'Order', 'Bees, Ants & Wasps',      'animalia_arthropoda_insecta', 3),
  ('animalia_arthropoda_insecta_coleoptera',   'Coleoptera',   'Order', 'Beetles',                 'animalia_arthropoda_insecta', 4),
  ('animalia_arthropoda_insecta_blattodea',    'Blattodea',    'Order', 'Cockroaches',             'animalia_arthropoda_insecta', 5),
  ('animalia_arthropoda_insecta_orthoptera',   'Orthoptera',   'Order', 'Grasshoppers & Crickets', 'animalia_arthropoda_insecta', 6)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Mollusca ───────────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_mollusca_gastropoda',  'Gastropoda',  'Class', 'Snails & Slugs',  'animalia_mollusca', 1),
  ('animalia_mollusca_bivalvia',    'Bivalvia',    'Class', 'Clams & Mussels', 'animalia_mollusca', 2),
  ('animalia_mollusca_cephalopoda', 'Cephalopoda', 'Class', 'Squid & Octopus', 'animalia_mollusca', 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Echinodermata ──────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_echinodermata_asteroidea',    'Asteroidea',    'Class', 'Starfish',        'animalia_echinodermata', 1),
  ('animalia_echinodermata_echinoidea',    'Echinoidea',    'Class', 'Sea Urchins',     'animalia_echinodermata', 2),
  ('animalia_echinodermata_holothuroidea', 'Holothuroidea', 'Class', 'Sea Cucumbers',   'animalia_echinodermata', 3),
  ('animalia_echinodermata_ophiuroidea',   'Ophiuroidea',   'Class', 'Brittle Stars',   'animalia_echinodermata', 4),
  ('animalia_echinodermata_crinoidea',     'Crinoidea',     'Class', 'Sea Lilies',      'animalia_echinodermata', 5)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Hemichordata ───────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_hemichordata_enteropneusta', 'Enteropneusta', 'Class', 'Acorn Worms',  'animalia_hemichordata', 1),
  ('animalia_hemichordata_pterobranchia', 'Pterobranchia', 'Class', 'Pterobranchs', 'animalia_hemichordata', 2)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── CLASSES — Chordata ───────────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_chordata_urochordata',   'Urochordata',   'Class', 'Sea Squirts / Tunicates', 'animalia_chordata', 1),
  ('animalia_chordata_cephalochordata','Cephalochordata','Class','Lancelets',              'animalia_chordata', 2),
  ('animalia_chordata_cyclostomata',   'Cyclostomata',  'Class', 'Jawless Fishes',          'animalia_chordata', 3),
  ('animalia_chordata_chondrichthyes', 'Chondrichthyes','Class', 'Cartilaginous Fishes',   'animalia_chordata', 4),
  ('animalia_chordata_osteichthyes',   'Osteichthyes',  'Class', 'Bony Fishes',             'animalia_chordata', 5),
  ('animalia_chordata_amphibia',       'Amphibia',      'Class', 'Amphibians',              'animalia_chordata', 6),
  ('animalia_chordata_reptilia',       'Reptilia',      'Class', 'Reptiles',                'animalia_chordata', 7),
  ('animalia_chordata_aves',           'Aves',          'Class', 'Birds',                   'animalia_chordata', 8),
  ('animalia_chordata_mammalia',       'Mammalia',      'Class', 'Mammals',                 'animalia_chordata', 9)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── ORDERS — Mammalia (selected) ─────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_chordata_mammalia_primates',    'Primates',    'Order', 'Primates (Humans, Apes)',  'animalia_chordata_mammalia', 1),
  ('animalia_chordata_mammalia_carnivora',   'Carnivora',   'Order', 'Carnivores',               'animalia_chordata_mammalia', 2),
  ('animalia_chordata_mammalia_rodentia',    'Rodentia',    'Order', 'Rodents',                  'animalia_chordata_mammalia', 3),
  ('animalia_chordata_mammalia_chiroptera',  'Chiroptera',  'Order', 'Bats',                     'animalia_chordata_mammalia', 4),
  ('animalia_chordata_mammalia_cetacea',     'Cetacea',     'Order', 'Whales & Dolphins',        'animalia_chordata_mammalia', 5),
  ('animalia_chordata_mammalia_lagomorpha',  'Lagomorpha',  'Order', 'Rabbits & Hares',          'animalia_chordata_mammalia', 6)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── ORDERS — Aves (selected) ─────────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_chordata_aves_passeriformes',  'Passeriformes',  'Order', 'Perching Birds / Songbirds', 'animalia_chordata_aves', 1),
  ('animalia_chordata_aves_raptors',        'Falconiformes',  'Order', 'Raptors & Eagles',           'animalia_chordata_aves', 2),
  ('animalia_chordata_aves_columbiformes',  'Columbiformes',  'Order', 'Pigeons & Doves',            'animalia_chordata_aves', 3),
  ('animalia_chordata_aves_psittaciformes', 'Psittaciformes', 'Order', 'Parrots',                    'animalia_chordata_aves', 4)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── ORDERS — Reptilia (selected) ─────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_chordata_reptilia_squamata',   'Squamata',   'Order', 'Lizards & Snakes',    'animalia_chordata_reptilia', 1),
  ('animalia_chordata_reptilia_crocodilia', 'Crocodilia', 'Order', 'Crocodilians',        'animalia_chordata_reptilia', 2),
  ('animalia_chordata_reptilia_testudines', 'Testudines', 'Order', 'Turtles & Tortoises', 'animalia_chordata_reptilia', 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── ORDERS — Amphibia (selected) ─────────────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES
  ('animalia_chordata_amphibia_anura',    'Anura',    'Order', 'Frogs & Toads',     'animalia_chordata_amphibia', 1),
  ('animalia_chordata_amphibia_urodela',  'Urodela',  'Order', 'Salamanders & Newts','animalia_chordata_amphibia', 2),
  ('animalia_chordata_amphibia_gymnophiona','Gymnophiona','Order','Caecilians',      'animalia_chordata_amphibia', 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, common_name = EXCLUDED.common_name;

-- ── REPRESENTATIVE SPECIES (leaf nodes) ──────────────────────

INSERT INTO public.taxonomy_nodes (id, label, rank, common_name, parent_id, sort_order) VALUES

  -- Hymenoptera
  ('animalia_arthropoda_insecta_hymenoptera_apis',      'Apis mellifera',       'Species', 'Honeybee',           'animalia_arthropoda_insecta_hymenoptera', 1),
  ('animalia_arthropoda_insecta_hymenoptera_camponotus','Camponotus compressus','Species', 'Carpenter Ant',       'animalia_arthropoda_insecta_hymenoptera', 2),

  -- Blattodea
  ('animalia_arthropoda_insecta_blattodea_periplaneta', 'Periplaneta americana','Species', 'American Cockroach', 'animalia_arthropoda_insecta_blattodea', 1),

  -- Lepidoptera
  ('animalia_arthropoda_insecta_lepidoptera_bombyx',    'Bombyx mori',          'Species', 'Silkworm',           'animalia_arthropoda_insecta_lepidoptera', 1),

  -- Annelida
  ('animalia_annelida_oligochaeta_pheretima',           'Pheretima posthuma',   'Species', 'Indian Earthworm',   'animalia_annelida_oligochaeta', 1),
  ('animalia_annelida_hirudinea_hirudo',                'Hirudo medicinalis',   'Species', 'Medicinal Leech',    'animalia_annelida_hirudinea', 1),

  -- Platyhelminthes
  ('animalia_platyhelminthes_turbellaria_planaria',     'Dugesia tigrina',      'Species', 'Planaria',           'animalia_platyhelminthes_turbellaria', 1),
  ('animalia_platyhelminthes_trematoda_fasciola',       'Fasciola hepatica',    'Species', 'Liver Fluke',        'animalia_platyhelminthes_trematoda', 1),
  ('animalia_platyhelminthes_cestoda_taenia',           'Taenia solium',        'Species', 'Pork Tapeworm',      'animalia_platyhelminthes_cestoda', 1),

  -- Aschelminthes
  ('animalia_aschelminthes_nematoda_ascaris',           'Ascaris lumbricoides', 'Species', 'Roundworm',          'animalia_aschelminthes_nematoda', 1),
  ('animalia_aschelminthes_nematoda_wuchereria',        'Wuchereria bancrofti', 'Species', 'Filarial Worm',      'animalia_aschelminthes_nematoda', 2),

  -- Mollusca
  ('animalia_mollusca_gastropoda_pila',                 'Pila globosa',         'Species', 'Apple Snail',        'animalia_mollusca_gastropoda', 1),
  ('animalia_mollusca_cephalopoda_loligo',              'Loligo vulgaris',      'Species', 'Squid',              'animalia_mollusca_cephalopoda', 1),
  ('animalia_mollusca_cephalopoda_octopus',             'Octopus vulgaris',     'Species', 'Common Octopus',     'animalia_mollusca_cephalopoda', 2),

  -- Echinodermata
  ('animalia_echinodermata_asteroidea_asterias',        'Asterias rubens',      'Species', 'Common Starfish',    'animalia_echinodermata_asteroidea', 1),
  ('animalia_echinodermata_echinoidea_echinus',         'Echinus esculentus',   'Species', 'Sea Urchin',         'animalia_echinodermata_echinoidea', 1),

  -- Coelenterata
  ('animalia_coelenterata_hydrozoa_hydra',              'Hydra vulgaris',       'Species', 'Hydra',              'animalia_coelenterata_hydrozoa', 1),
  ('animalia_coelenterata_scyphozoa_aurelia',           'Aurelia aurita',       'Species', 'Moon Jellyfish',     'animalia_coelenterata_scyphozoa', 1),

  -- Chordata — Amphibia
  ('animalia_chordata_amphibia_anura_rana',             'Hoplobatrachus tigerinus','Species','Indian Bullfrog', 'animalia_chordata_amphibia_anura', 1),
  ('animalia_chordata_amphibia_anura_bufo',             'Bufo bufo',             'Species', 'Common Toad',       'animalia_chordata_amphibia_anura', 2),

  -- Chordata — Reptilia
  ('animalia_chordata_reptilia_squamata_calotes',       'Calotes versicolor',   'Species', 'Garden Lizard',      'animalia_chordata_reptilia_squamata', 1),
  ('animalia_chordata_reptilia_squamata_naja',          'Naja naja',            'Species', 'Indian Cobra',       'animalia_chordata_reptilia_squamata', 2),

  -- Chordata — Aves
  ('animalia_chordata_aves_columbiformes_columba',      'Columba livia',        'Species', 'Rock Pigeon',        'animalia_chordata_aves_columbiformes', 1),
  ('animalia_chordata_aves_passeriformes_passer',       'Passer domesticus',    'Species', 'House Sparrow',      'animalia_chordata_aves_passeriformes', 1),

  -- Chordata — Mammalia
  ('animalia_chordata_mammalia_lagomorpha_oryctolagus', 'Oryctolagus cuniculus','Species', 'European Rabbit',   'animalia_chordata_mammalia_lagomorpha', 1),
  ('animalia_chordata_mammalia_primates_homo',          'Homo sapiens',         'Species', 'Human',              'animalia_chordata_mammalia_primates', 1),
  ('animalia_chordata_mammalia_carnivora_panthera',     'Panthera tigris',      'Species', 'Bengal Tiger',       'animalia_chordata_mammalia_carnivora', 1),
  ('animalia_chordata_mammalia_cetacea_balaenoptera',   'Balaenoptera musculus','Species', 'Blue Whale',         'animalia_chordata_mammalia_cetacea', 1),

  -- Chordata — Cyclostomata
  ('animalia_chordata_cyclostomata_petromyzon',         'Petromyzon marinus',   'Species', 'Sea Lamprey',        'animalia_chordata_cyclostomata', 1),

  -- Chordata — Chondrichthyes
  ('animalia_chordata_chondrichthyes_scoliodon',        'Scoliodon laticaudus', 'Species', 'Dogfish Shark',      'animalia_chordata_chondrichthyes', 1),
  ('animalia_chordata_chondrichthyes_carcharodon',      'Carcharodon carcharias','Species','Great White Shark', 'animalia_chordata_chondrichthyes', 2)

ON CONFLICT (id) DO UPDATE SET
  label       = EXCLUDED.label,
  common_name = EXCLUDED.common_name,
  parent_id   = EXCLUDED.parent_id,
  sort_order  = EXCLUDED.sort_order;
