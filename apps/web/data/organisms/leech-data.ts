import { OrganismData } from "@/components/organisms/unified/OrganismShell";

export const leechData: OrganismData = {
  id: "leech",
  title: "Leech",
  scientificName: "Hirudinaria granulosa",
  taxonomyMeta: "Phylum Annelida • Class Clitellata • Subclass Hirudinea",
  icon: "🪱",
  topics: [
    {
      id: "taxonomy",
      title: "Taxonomy & Systematic Position",
      description: "Classification, habitat, and morphological status of the Indian cattle leech.",
      cards: [
        {
          id: "sys-pos",
          title: "Systematic Position of Hirudinaria granulosa",
          paragraphs: [
            "Hirudinaria granulosa, commonly known as the Indian cattle leech, belongs to the phylum Annelida and class Clitellata (Order Arhynchobdellida).",
            "It is a sanguivorous ectoparasite that feeds on the blood of cattle, horses, frogs, and humans."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810091/image_yibxxk.jpg",
            alt: "Indian Cattle Leech - Hirudinaria granulosa",
            caption: "Indian Cattle Leech (Hirudinaria granulosa)"
          },
          callout: {
            type: "ncert",
            title: "NCERT Taxonomy Summary",
            text: "Kingdom: Animalia | Phylum: Annelida | Class: Clitellata | Subclass: Hirudinea | Order: Arhynchobdellida | Family: Hirudinidae | Genus: Hirudinaria | Species: granulosa"
          },
          table: {
            headers: ["Taxonomic Rank", "Classification", "Key Characteristic"],
            rows: [
              ["Kingdom", "Animalia", "Multicellular organisms with heterotrophic nutrition"],
              ["Phylum", "Annelida", "Metamerically segmented worms with coelom"],
              ["Class", "Clitellata", "Possess clitellum during breeding season"],
              ["Subclass", "Hirudinea", "Fixed 33 metameres, suckers present, coelom reduced"],
              ["Order", "Arhynchobdellida", "Jawed leeches lacking a proboscis"],
              ["Genus", "Hirudinaria", "Freshwater ectoparasitic blood suckers"],
              ["Species", "granulosa", "Granulated body surface with 33 segments"]
            ]
          }
        },
        {
          id: "habitat",
          title: "Habit & Habitat",
          bullets: [
            "Found in fresh water ponds, lakes, swamps, and slow-moving streams.",
            "Ectoparasitic in nature, attaching onto cattle and humans using specialized suckers.",
            "Nocturnal in habit; hides under stones, weeds, and mud during daytime.",
            "Sanguivorous diet: secretes hirudin (anticoagulant) to prevent blood clotting during feeding."
          ]
        }
      ]
    },
    {
      id: "morphology",
      title: "External Morphology",
      description: "Body shape, metameric segmentation, suckers, and body regions.",
      cards: [
        {
          id: "segmentation",
          title: "Metameric Segmentation (33 Somites)",
          paragraphs: [
            "The body of Hirudinaria granulosa is elongated, dorsoventrally flattened, and ribbon-like.",
            "The total number of body segments (somites or metameres) is strictly fixed at 33 segments throughout its entire life cycle, although secondary superficial annuli make it appear to have many more rings."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810830/morphology_sf7xd1.png",
            alt: "Leech External Morphology Diagram",
            caption: "External Morphology showing Body Regions, Segments, and Annuli"
          },
          table: {
            headers: ["Body Division (Region)", "Segments (Somites)", "Key Anatomical Structures & Role"],
            rows: [
              ["1. Cephalic Region", "Segments I – V (1–5)", "Bears prostomium, 5 pairs of eyes, anterior sucker, and triradiate mouth"],
              ["2. Pre-clitellar Region", "Segments VI – VIII (6–8)", "Narrow transitional zone before clitellum; houses first 3 pairs of nephridia"],
              ["3. Clitellar Region", "Segments IX – XI (9–11)", "Forms temporary clitellum during breeding season; male genital pore on segment X, female on XI"],
              ["4. Middle Region", "Segments XII – XXII (12–22)", "Longest region; contains 10 crop chambers with lateral diverticula, stomach, intestine, and 11 pairs of testes sacs & nephridia"],
              ["5. Caudal Region", "Segments XXIII – XXVI (23–26)", "Short posterior zone containing rectum; dorsal anus opens on the 26th segment"],
              ["6. Posterior Sucker", "Segments XXVII – XXXIII (27–33)", "Formed by the complete fusion of 7 terminal segments; powerful disc for anchorage and crawling"]
            ]
          }
        },
        {
          id: "suckers-detail",
          title: "Anterior & Posterior Suckers",
          bullets: [
            "Anterior (Oral) Sucker: Ventral, cup-shaped structure formed by fusion of segments I to V. Contains the triradiate mouth armed with 3 denticulated jaws bearing minute sharp chitinous teeth.",
            "Posterior Sucker: Circular, highly muscular disc formed by fusion of segments XXVII to XXXIII. Acts as the primary anchor for looping locomotion and host attachment.",
            "Both suckers are equipped with abundant unicellular adhesive glands that secrete sticky mucus."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769585515/anterior_kbxsua.jpg",
            alt: "Anterior Sucker of Leech",
            caption: "Anterior Sucker with Triradiate Mouth and Denticulated Jaws"
          }
        },
        {
          id: "posterior-sucker-img",
          title: "Posterior Sucker Structure",
          paragraphs: [
            "The posterior sucker is the largest and most powerful muscular disc of the leech, formed by the fusion of segments XXVII to XXXIII.",
            "It is circular, disc-shaped, and ventrally directed, creating powerful suction pressure for firmly anchoring to host skin or aquatic stones."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769585506/posterior_pe2qow.png",
            alt: "Posterior Sucker of Leech",
            caption: "Posterior Sucker — 7 Fused Segments Providing Powerful Anchorage"
          }
        }
      ]
    },
    {
      id: "interactive-anatomy",
      title: "Interactive Anatomy Explorer",
      description: "Explore the labeled anatomy of the leech with interactive hotspots.",
      cards: [
        {
          id: "anatomy-explorer",
          title: "Leech Anatomy — Interactive Labeled Diagram",
          paragraphs: [
            "Study the internal and external structures of Hirudinaria granulosa using this detailed labeled anatomical diagram.",
            "Key structures include the anterior sucker, posterior sucker, crop diverticula, segmental ganglia, nephridia, and reproductive organs."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768818886/Screenshot_2026-01-19_155027_hmjpry.png",
            alt: "Interactive Leech Anatomy Diagram",
            caption: "Labeled Anatomical Diagram of Hirudinaria granulosa"
          }
        }
      ]
    },
    {
      id: "body-wall",
      title: "Body Wall & Botryoidal Tissue",
      description: "Histological layers of body wall and reduction of true coelom into botryoidal tissue.",
      cards: [
        {
          id: "histology-layers",
          title: "Histological Layers of Body Wall",
          paragraphs: [
            "The body wall protects inner tissues and consists of five distinct layers:"
          ],
          bullets: [
            "1. Cuticle: Outer thin, transparent, non-cellular protective layer.",
            "2. Epidermis: Single-layer columnar epithelial cells containing unicellular mucous and slime glands.",
            "3. Dermis: Connective tissue layer containing muscle fibers, pigment cells, and capillary networks.",
            "4. Musculature: Well-developed circular, oblique, and longitudinal muscle fibers.",
            "5. Botryoidal Tissue: Special parenchyma-like tissue surrounding coelomic channels."
          ]
        }
      ]
    },
    {
      id: "locomotion",
      title: "Locomotion",
      description: "Looping (crawling) movement on land and swimming in water.",
      cards: [
        {
          id: "locomotion-mechanisms",
          title: "Types of Locomotion",
          paragraphs: [
            "Leeches perform two distinct types of movement: Looping (crawling) on solid substrates and Swimming in water."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810794/leech_imk2bj.jpg",
            alt: "Leech locomotion",
            caption: "Leech in Natural Habitat — Locomotion Reference"
          },
          steps: [
            { num: "1", title: "Posterior Anchorage", desc: "Posterior sucker fixes to substrate firmly." },
            { num: "2", title: "Contraction & Extension", desc: "Circular muscles contract; body extends forward." },
            { num: "3", title: "Anterior Anchorage", desc: "Anterior sucker attaches to substrate; posterior releases and draws forward." }
          ],
          callout: {
            type: "key",
            title: "Swimming Mechanism",
            text: "In water, the leech swims by dorsoventral undulations of its flattened body, producing wave-like motions similar to an eel."
          }
        }
      ]
    },
    {
      id: "digestive-system",
      title: "Digestive System & Crop Storage",
      description: "Alimentary canal, triradiate jaws, salivary hirudin, and crop diverticula.",
      cards: [
        {
          id: "digestive-tract",
          title: "Alimentary Canal & Crop Reservoir",
          paragraphs: [
            "Alimentary canal is a straight tube extending from anterior mouth to posterior anus.",
            "Crop is the largest part consisting of 10 chambers with 10 pairs of lateral diverticula."
          ],
          bullets: [
            "Triradiate Mouth: Contains 3 semicircular jaws bearing minute chitinous teeth.",
            "Salivary Glands: Secrete Hirudin, preventing blood clotting during feeding.",
            "Crop Diverticula: Store up to 3 times the leech's body weight in blood, sustaining it for up to a year on a single meal."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810737/digestivesystem_osipqw.png",
            alt: "Leech Digestive System Diagram",
            caption: "Digestive System showing Crop Diverticula and Alimentary Canal"
          }
        }
      ]
    },
    {
      id: "respiratory-system",
      title: "Respiratory System",
      description: "Cutaneous gas exchange via skin capillary network.",
      cards: [
        {
          id: "respiration",
          title: "Cutaneous Respiration",
          paragraphs: [
            "Specialized respiratory organs are absent.",
            "Respiration occurs through the moist body wall (cutaneous respiration)."
          ],
          bullets: [
            "Extensive haemocoelomic capillary network extends into epidermis layer.",
            "Oxygen diffuses from surrounding water into capillary blood; CO2 diffuses out."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769585037/repiratory_system_pie2fn.jpg",
            alt: "Leech Respiratory System",
            caption: "Cutaneous Respiratory System — Gas Exchange Through Skin"
          }
        }
      ]
    },
    {
      id: "circulatory-system",
      title: "Circulatory System",
      description: "Haemocoelomic system with red blood containing dissolved hemoglobin.",
      cards: [
        {
          id: "haemocoelomic-system",
          title: "Haemocoelomic Channels",
          paragraphs: [
            "True blood vascular system is absent. Replaced by a system of haemocoelomic channels filled with red fluid."
          ],
          bullets: [
            "Hemoglobin is dissolved in the plasma (not in corpuscles).",
            "Four main longitudinal channels: Dorsal, Ventral, and 2 Lateral channels."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769586113/circulatory_system_npfsym.jpg",
            alt: "Leech Circulatory System",
            caption: "Haemocoelomic Circulatory System with Longitudinal Channels"
          }
        }
      ]
    },
    {
      id: "nervous-system",
      title: "Nervous System & Sense Organs",
      description: "Ventral nerve cord, segmental ganglia, and 5 pairs of eyes.",
      cards: [
        {
          id: "nervous-structure",
          title: "Central & Peripheral Nervous System",
          paragraphs: [
            "Nervous system consists of central, peripheral, and sympathetic systems."
          ],
          bullets: [
            "Nerve Ring: Supra-marginal nerve mass (brain), circum-pharyngeal connectives, and sub-marginal ganglion.",
            "Ventral Nerve Cord: Double nerve cord with 21 abdominal ganglia.",
            "Eyes: 5 pairs of simple black cup-like eyes situated on dorsal surface of first 5 segments."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810860/nervoussystem_utggdl.png",
            alt: "Leech Nervous System Diagram",
            caption: "Nervous System showing Ventral Nerve Cord and Segmental Ganglia"
          }
        }
      ]
    },
    {
      id: "excretory-system",
      title: "Excretory System (Nephridia)",
      description: "17 pairs of segmentally arranged nephridia.",
      cards: [
        {
          id: "nephridia",
          title: "17 Pairs of Metameric Nephridia",
          paragraphs: [
            "Excretion is carried out by 17 pairs of nephridia located in segments 6 to 22."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810762/excretorysystem_w85798.png",
            alt: "Leech Excretory System",
            caption: "Excretory System showing 17 Pairs of Nephridia"
          },
          table: {
            headers: ["Nephridial Type", "Location (Segments)", "Structure & Function"],
            rows: [
              ["Testicular Nephridia", "Segments 12 to 22 (11 pairs)", "Associated with testes; possess ciliated reservoirs and nephridiopores"],
              ["Pre-testicular Nephridia", "Segments 6 to 11 (6 pairs)", "Lacking testicular associations; purely excretory"]
            ]
          }
        }
      ]
    },
    {
      id: "reproductive-system",
      title: "Reproductive System",
      description: "Hermaphrodite (monoecious) reproduction with cross fertilization and cocoon formation.",
      cards: [
        {
          id: "hermaphrodite",
          title: "Hermaphroditic Genital Organs",
          paragraphs: [
            "Hirudinaria is monoecious (hermaphrodite), containing both male and female reproductive systems."
          ],
          bullets: [
            "Male Organs: 11 pairs of testes sacs (segments 12-22), vasa efferentia, vasa deferentia, epididymis, atrium, and penis.",
            "Female Organs: 1 pair of ovaries (segment 11), oviducts, common oviduct, and muscular vagina.",
            "Genopores: Male genital pore on 10th segment; Female genital pore on 11th segment."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810909/reproductivesystem_gctgvg.png",
            alt: "Leech Reproductive System",
            caption: "Reproductive System — Male and Female Genital Organs"
          }
        }
      ]
    },
    {
      id: "parasitic-adaptations",
      title: "Parasitic Adaptations",
      description: "Morphological, physiological, and anatomical blood-sucking adaptations.",
      cards: [
        {
          id: "parasitic-summary",
          title: "Comprehensive Parasitic Adaptations Summary",
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810858/parasitic_cdkchf.png",
            alt: "Leech Parasitic Adaptations",
            caption: "Morphological Adaptations for Ectoparasitic Lifestyle"
          },
          steps: [
            { num: "1", title: "Suckers", desc: "Anterior and posterior suckers provide strong anchorage during feeding and locomotion." },
            { num: "2", title: "Triradiate Jaws", desc: "3 jaws cut painless Y-shaped incision in host skin." },
            { num: "3", title: "Hirudin Secretion", desc: "Prevents host blood from clotting while feeding." },
            { num: "4", title: "Crop Diverticula", desc: "Enormous blood storage capacity for surviving long periods without food." }
          ]
        }
      ]
    }
  ]
};
