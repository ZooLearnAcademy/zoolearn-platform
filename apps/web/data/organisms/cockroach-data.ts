import { OrganismData } from "@/components/organisms/unified/OrganismShell";

export const cockroachData: OrganismData = {
  id: "cockroach",
  title: "Cockroach",
  scientificName: "Periplaneta americana",
  taxonomyMeta: "Phylum Arthropoda • Class Insecta • Order Blattodea",
  icon: "🪳",
  topics: [
    {
      id: "general-characteristics",
      title: "General Characteristics & Habitat",
      description: "Nocturnal, omnivorous insect found in human habitations and warm moist environments.",
      cards: [
        {
          id: "sys-cockroach-pos",
          title: "Systematic Position of Periplaneta americana",
          paragraphs: [
            "Cockroach is a common insect usually found in human dwellings, kitchens, drains, and storage rooms.",
            "Scientific name: Periplaneta americana (American Cockroach).",
            "It is nocturnal, omnivorous, fast-moving, and dorsoventrally flattened.",
            "Acts as a mechanical carrier of disease-causing organisms, making it an important species in public health studies.",
            "The American cockroach is widely distributed across tropical and subtropical regions and lives in warm, moist environments such as sewers, drains, basements, kitchens, bathrooms, and garbage areas."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508120/cockroach_qzolle.jpg",
            alt: "American Cockroach Overview",
            caption: "American Cockroach (Periplaneta americana)"
          },
          table: {
            headers: ["Taxonomic Rank", "Classification", "Key Characteristic"],
            rows: [
              ["Kingdom", "Animalia", "Multicellular heterotrophic organisms"],
              ["Phylum", "Arthropoda", "Jointed appendages, chitinous exoskeleton"],
              ["Class", "Insecta", "Three body regions (head, thorax, abdomen), 3 pairs of legs"],
              ["Order", "Blattodea", "Flattened body, leathery forewings (tegmina)"],
              ["Genus", "Periplaneta", "Cosmopolitan omnivorous species"],
              ["Species", "americana", "Reddish-brown American cockroach (34-53 mm length)"]
            ]
          }
        }
      ]
    },
    {
      id: "external-morphology",
      title: "External Morphology & Sclerites",
      description: "Body division, chitinous exoskeleton, sclerites, and arthrodial membranes.",
      cards: [
        {
          id: "exoskeleton-sclerites",
          title: "Exoskeleton and Sclerites",
          paragraphs: [
            "The body is elongated, brown in color, and dorsoventrally flattened.",
            "Covered by a hard, non-living chitinous exoskeleton that protects inner organs and prevents water loss."
          ],
          bullets: [
            "Hardened chitinous plates are called Sclerites.",
            "Joined together by flexible arthrodial membranes, allowing free movement.",
            "Tergites: Dorsal sclerite plates.",
            "Sternites: Ventral sclerite plates.",
            "Pleurites: Lateral sclerite plates."
          ]
        },
        {
          id: "body-regions",
          title: "Body Division (Head, Thorax, Abdomen)",
          paragraphs: [
            "The body of cockroach is divided into three distinct regions: Head, Thorax, and Abdomen.",
            "Each region performs specific functions."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508120/cockroach_qzolle.jpg",
            alt: "Body regions of cockroach",
            caption: "Body division into Head, Thorax, and Abdomen"
          }
        }
      ]
    },
    {
      id: "head-mouthparts",
      title: "Head, Sense Organs & Mouthparts",
      description: "Compound eyes, antennae, and mandibulate biting/chewing mouthparts.",
      cards: [
        {
          id: "head-capsule",
          title: "Head Capsule & Sense Organs",
          paragraphs: [
            "The head is formed by the fusion of six embryonic segments enclosed within a head capsule.",
            "Attached to thorax by a flexible neck, allowing free movement in all directions."
          ],
          bullets: [
            "Antennae: One pair of long, segmented thread-like antennae acting as tactile and olfactory sensory receptors; help detect air currents and vibrations.",
            "Compound Eyes: One pair of large kidney-shaped compound eyes made of 2000 ommatidia producing mosaic vision."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508128/cockroach_head_y9fyez.png",
            alt: "Cockroach Head Capsule and Compound Eyes",
            caption: "Head Capsule and Compound Eye structure"
          }
        },
        {
          id: "mandibulate-mouthparts",
          title: "Mandibulate Biting & Chewing Mouthparts",
          paragraphs: [
            "Mouthparts are adapted for biting and chewing omnivorous food."
          ],
          bullets: [
            "Labrum (upper lip): Broad plate covering the mouth from above.",
            "Mandibles (1 pair): Hard chitinous jaws with teeth for cutting and crushing food.",
            "Maxillae (1 pair): Hold and transport food to mouth.",
            "Labium (lower lip): Closes the mouth from below.",
            "Hypopharynx: Tongue-like median structure acting as salivary receiver."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508156/labeled_mouth_parts_qq31am.png",
            alt: "Mandibulate mouth parts of cockroach",
            caption: "Labeled Mandibulate Mouth Parts"
          }
        }
      ]
    },
    {
      id: "thorax-appendages",
      title: "Thorax, Legs & Wings",
      description: "Prothorax, Mesothorax, Metathorax, 5-segmented legs, and tegmina/hindwings.",
      cards: [
        {
          id: "thoracic-legs",
          title: "Thorax & 5-Segmented Legs",
          paragraphs: [
            "Thorax consists of three segments: Prothorax, Mesothorax, and Metathorax.",
            "Each segment bears one pair of jointed walking legs."
          ],
          bullets: [
            "Each leg consists of 5 segments: Coxa (proximal), Trochanter, Femur, Tibia (longest), and Tarsus (with claws).",
            "Legs are adapted for walking and running."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508137/cockroach_leg_rp6cvi.png",
            alt: "Thoracic leg structure",
            caption: "5-Segmented Thoracic Walking Leg"
          }
        },
        {
          id: "wings-structure",
          title: "Forewings (Tegmina) and Hindwings",
          paragraphs: [
            "Two pairs of wings arise from mesothorax and metathorax."
          ],
          bullets: [
            "Forewings (Tegmina): Arise from mesothorax; dark, opaque, leathery, and protective during rest.",
            "Hindwings: Arise from metathorax; transparent, membranous, used for active flight."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508290/wings.5_smkuv2.jpg",
            alt: "Cockroach Wings",
            caption: "Tegmina (Forewings) and Membranous Hindwings"
          }
        },
        {
          id: "abdomen-appendages",
          title: "Abdomen & Anal Appendages",
          paragraphs: [
            "The abdomen consists of 10 segments in adults. Each segment bears a tergum and sternum with overlapping arrangement for flexibility."
          ],
          bullets: [
            "Anal Cerci: Present in both males and females; act as sensory organs detecting air movements.",
            "Anal Styles: Present ONLY in males; absent in females (key sexual dimorphism feature).",
            "Stink (Repugnatorial) Glands: Present between abdominal segments; produce foul-smelling secretion for defense."
          ]
        }
      ]
    },
    {
      id: "digestive-system",
      title: "Digestive System & Alimentary Canal",
      description: "Foregut, Crop, Gizzard grinding teeth, Hepatic caecae, and Hindgut.",
      cards: [
        {
          id: "digestive-organs",
          title: "Alimentary Canal Architecture",
          paragraphs: [
            "The alimentary canal is a long tube extending from mouth to anus, divided into Foregut, Midgut, and Hindgut.",
            "Cockroach is omnivorous, feeding on both plant and animal matter."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508152/Cockroach-Digestive-System_ate4r1.png",
            alt: "Cockroach Digestive System",
            caption: "Complete Labeled Digestive System of Cockroach"
          },
          steps: [
            { num: "1", title: "Foregut (Stomodaeum)", desc: "Pharynx → Oesophagus → Crop (food storage) → Gizzard with 6 chitinous grinding teeth and bristle filters." },
            { num: "2", title: "Midgut (Mesenteron)", desc: "Main digestive zone; bears 6-8 blind Hepatic/Gastric Caecae secreting digestive enzymes." },
            { num: "3", title: "Hindgut (Proctodaeum)", desc: "Ileum → Colon → Rectum (absorbs water) → Anus. Excretes dry feces." }
          ],
          callout: {
            type: "mnemonic",
            title: "Easy Memory Line",
            text: "Crop stores food → Gizzard grinds → Midgut digests → Rectum absorbs water"
          }
        }
      ]
    },
    {
      id: "respiratory-tracheal",
      title: "Respiratory Tracheal System",
      description: "Network of tracheae, spiracles, and taenidia spiral rings.",
      cards: [
        {
          id: "tracheae-spiracles",
          title: "Tracheal System & Spiracles",
          paragraphs: [
            "Cockroach respires through a tracheal system. Oxygen is supplied directly to body tissues through air tubes.",
            "Blood does not take part in respiration — oxygen does not travel through haemolymph. Exchange of gases occurs by diffusion at the tissue level."
          ],
          bullets: [
            "Spiracles: 10 pairs of external openings (2 pairs thoracic, 8 pairs abdominal) equipped with sphincter valves to regulate air entry and reduce water loss.",
            "Tracheae: Network of fine air tubes lined with spiral thickenings called taenidia.",
            "Taenidia: Internal chitinous spiral rings preventing tracheal tubes from collapsing.",
            "Tracheoles: Finest branches delivering oxygen directly to cells."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508278/tracheal_system_kjxoxm.png",
            alt: "Tracheal system of cockroach",
            caption: "Tracheal tubes with spiral Taenidia"
          },
          callout: {
            type: "mnemonic",
            title: "Easy Memory Line",
            text: "Spiracles → Tracheae → Tracheoles → Body tissues"
          }
        }
      ]
    },
    {
      id: "circulatory-sinuses",
      title: "Open Circulation & Haemocoel Sinuses",
      description: "13-chambered dorsal heart, haemolymph, and body sinuses.",
      cards: [
        {
          id: "circulatory-channels",
          title: "Open Circulatory System & 13 Heart Chambers",
          paragraphs: [
            "Cockroach possesses an open circulatory system. Blood (haemolymph) flows freely in body spaces called sinuses.",
            "The blood of cockroach is known as haemolymph — a colourless fluid lacking hemoglobin."
          ],
          bullets: [
            "Haemolymph: Colorless fluid consisting of plasma and ameboid haemocytes; does NOT transport oxygen.",
            "Dorsal Heart: Long muscular tube divided into 13 segmental ostiate chambers.",
            "Ostia: Paired valves on each chamber allowing haemolymph to enter heart; prevent backward flow.",
            "Pericardial Sinus (dorsal): Contains heart and aorta.",
            "Perivisceral Sinus (middle): Contains digestive organs.",
            "Perineural Sinus (ventral): Contains ventral nerve cord."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771507996/Circulation_system_fye7ui.jpg",
            alt: "Body sinuses and circulation",
            caption: "Body Sinuses and Circulation Pathway"
          },
          callout: {
            type: "key",
            title: "Circulation Pathway",
            text: "Heart → Head sinus → Perineural sinus → Perivisceral sinus → Pericardial sinus → Heart"
          }
        }
      ]
    },
    {
      id: "excretory-system",
      title: "Excretory System (Malpighian Tubules)",
      description: "Uricotelic excretion via Malpighian tubules, fat body, and nephrocytes.",
      cards: [
        {
          id: "malpighian-excretion",
          title: "Uricotelic Excretion via Malpighian Tubules",
          paragraphs: [
            "Cockroach is uricotelic; excretes nitrogenous waste as uric acid.",
            "This system helps in removal of wastes as well as conservation of water."
          ],
          bullets: [
            "Malpighian Tubules: 100-150 yellow thread-like tubules floating in haemolymph at midgut-hindgut junction.",
            "Uric acid passes from haemolymph into tubules → released into hindgut → water reabsorbed → dry excreta.",
            "This adaptation helps cockroach conserve water."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508200/Malpighian_tubules_t2uthi.png",
            alt: "Malpighian tubules diagram",
            caption: "Malpighian Tubules at Midgut-Hindgut Junction"
          },
          table: {
            headers: ["Organ", "Function"],
            rows: [
              ["Fat body", "Stores uric acid"],
              ["Nephrocytes", "Remove toxic substances from haemolymph"],
              ["Urate (uricose) glands", "Store nitrogenous wastes"]
            ]
          }
        }
      ]
    },
    {
      id: "nervous-system",
      title: "Nervous System",
      description: "Brain, sub-oesophageal ganglion, and double ventral nerve cord.",
      cards: [
        {
          id: "nervous-cord",
          title: "Ganglionated Nervous System",
          paragraphs: [
            "The nervous system is ganglionated and lies on the ventral side of the body.",
            "It is well developed and helps in coordination, movement, and response to stimuli."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508218/nervous_non_labled_jk54rx.png",
            alt: "Cockroach Nervous System",
            caption: "Nervous System Architecture"
          },
          steps: [
            { num: "1", title: "Brain (Supra-oesophageal Ganglion)", desc: "Located above oesophagus; controls sensory perception — vision, smell, and touch; gives off optic and antennary nerves." },
            { num: "2", title: "Sub-oesophageal Ganglion", desc: "Below oesophagus; connected to brain by circum-oesophageal connectives; controls mouthparts, salivary glands, and feeding." },
            { num: "3", title: "Double Ventral Nerve Cord", desc: "Runs along ventral side with 3 thoracic ganglia (legs + wings) and 6 abdominal ganglia (abdominal movements + anal cerci)." }
          ],
          callout: {
            type: "mnemonic",
            title: "Easy Memory Line",
            text: "Brain thinks, sub-oesophageal ganglion feeds, ventral nerve cord moves."
          }
        }
      ]
    },
    {
      id: "male-reproductive",
      title: "Male Reproductive System",
      description: "Testes, vasa deferentia, seminal vesicles, mushroom gland, and phallomeres.",
      cards: [
        {
          id: "male-repro-organs",
          title: "Male Reproductive Organs",
          paragraphs: [
            "The male reproductive system is well developed and adapted for the production, storage, and transfer of sperms during copulation."
          ],
          bullets: [
            "Testes: A pair of elongated, lobed testes for sperm production.",
            "Vasa Deferentia: Ducts carrying sperms from testes to seminal vesicles.",
            "Seminal Vesicles: Sac-like structures for temporary sperm storage.",
            "Ejaculatory Duct: Single, median, wide muscular duct opening into genital pouch through male genital pore.",
            "Mushroom-shaped (Utricular) Gland: Utriculi majores + Utriculi breviores; nourishes sperms and forms spermatophore.",
            "Phallic (Conglobate) Gland: Club-shaped; secretes outer covering of spermatophore.",
            "Phallomeres: 3 hard chitinous plates around male genital pore assisting in copulation."
          ],
          callout: {
            type: "mnemonic",
            title: "Easy Memory Line",
            text: "Accessory glands form spermatophore; phallomeres help in copulation."
          }
        }
      ]
    },
    {
      id: "female-reproductive",
      title: "Female Reproductive System",
      description: "Ovaries, oviducts, spermathecae, collateral glands, and ootheca formation.",
      cards: [
        {
          id: "female-repro-organs",
          title: "Female Reproductive Organs",
          paragraphs: [
            "The female reproductive system is well developed and adapted for production of eggs, storage of sperms, and formation of ootheca (egg case)."
          ],
          bullets: [
            "Ovaries: A pair of ovaries in abdominal segments 2-6; each with 8 ovarioles arranged in acropetal order (youngest at tip, oldest at base).",
            "Oviducts: 8 ovarioles unite → lateral oviduct → common oviduct (median).",
            "Vagina: Posterior wider part of common oviduct; opens into genital pouch through vulva (female genital pore) on 8th sternum.",
            "Genital Pouch (Gynatrium): Large, boat-shaped chamber formed by 7th sternum.",
            "Spermathecae: Pair of unequal-sized structures in 6th abdominal segment; stores sperms received during copulation.",
            "Collateral Glands: Pair of highly branched glands; secretion helps in ootheca (egg case) formation.",
            "Gonapophyses: 3 pairs of chitinous plates for egg laying and ootheca formation."
          ],
          callout: {
            type: "mnemonic",
            title: "Easy Memory Line",
            text: "Ovaries form eggs, spermatheca stores sperms, collateral glands form ootheca."
          }
        }
      ]
    }
  ]
};
