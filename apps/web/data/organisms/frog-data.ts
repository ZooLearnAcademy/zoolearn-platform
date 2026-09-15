import { OrganismData } from "@/components/organisms/unified/OrganismShell";

export const frogData: OrganismData = {
  id: "frog",
  title: "Frog",
  scientificName: "Rana tigrina",
  taxonomyMeta: "Phylum Chordata • Class Amphibia • Order Anura",
  icon: "🐸",
  topics: [
    {
      id: "classification",
      title: "Taxonomy & Classification",
      description: "Amphibian classification, poikilothermic nature, camouflage, and seasonal dormancy.",
      cards: [
        {
          id: "sys-frog-pos",
          title: "Systematic Position of Rana tigrina",
          paragraphs: [
            "Rana tigrina (Indian Bullfrog) is a cold-blooded (poikilothermic) amphibious vertebrate found in freshwater ponds and moist land.",
            "Undergoes camouflage (mimicry) to blend with surroundings and escapes extreme temperatures via aestivation (summer sleep) and hibernation (winter sleep)."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102582/6f91a33b-f2ff-44e1-8451-0f799300c203_b5tnhc.png",
            alt: "Indian Bullfrog - Rana tigrina",
            caption: "Rana tigrina (Indian Bullfrog)"
          },
          table: {
            headers: ["Taxonomic Rank", "Classification", "Key Characteristic"],
            rows: [
              ["Kingdom", "Animalia", "Multicellular heterotrophic organisms"],
              ["Phylum", "Chordata", "Notochord, dorsal nerve cord, pharyngeal gill slits"],
              ["Class", "Amphibia", "Dual life (aquatic & terrestrial), scaleless moist skin"],
              ["Order", "Anura", "Tailless adults, webbed hindlimbs"],
              ["Genus", "Rana", "True frogs"],
              ["Species", "tigrina", "Indian bullfrog"]
            ]
          }
        },
        {
          id: "habitat-features",
          title: "Habitat & Adaptive Features",
          paragraphs: [
            "As an amphibian, Rana tigrina can live both on land and in freshwater habitats. It is commonly found near freshwater bodies such as ponds, lakes, and streams.",
            "The skin of Rana tigrina is always moist and slippery due to the secretion of mucus. Frogs do not drink water directly — they absorb water through their highly vascularized skin."
          ],
          bullets: [
            "Cold-blooded (poikilothermic): Body temperature changes according to the surrounding environment.",
            "Aestivation: Buries itself in moist soil during hot and dry periods.",
            "Hibernation: Enters dormancy during cold conditions; respiration mainly through skin.",
            "Tadpole larva: In early life stage, lives entirely in water and breathes through gills."
          ]
        }
      ]
    },
    {
      id: "morphology",
      title: "External Morphology & Skin",
      description: "Body division, smooth mucus-covered skin, head features, limbs, and sexual dimorphism.",
      cards: [
        {
          id: "frog-body-division",
          title: "Body Division & Shape",
          paragraphs: [
            "The body of a frog is streamlined and dorsoventrally flattened, which helps it move efficiently through water.",
            "The body is divided into two main regions: the head and the trunk. A neck and tail are absent in adult frogs."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102570/b2844280-84d5-4f43-bc2c-cf05647b3bc9_zfah8k.png",
            alt: "Frog External Morphology",
            caption: "External Morphology of Rana tigrina"
          },
          bullets: [
            "Skin is smooth, moist, and slippery due to mucus secreted by mucous glands.",
            "Dorsal surface: olive green with dark irregular spots; Ventral surface: pale yellow.",
            "Cloacal aperture: Small opening at posterior end serving as common opening for digestive, excretory, and reproductive systems.",
            "Frogs can change body color for camouflage to avoid predators."
          ]
        },
        {
          id: "frog-head-features",
          title: "Head Features & Sense Organs",
          paragraphs: [
            "The head is roughly triangular in shape, with the pointed end forming the snout. A wide mouth is present at the anterior end."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102591/f0_lqcerb.png",
            alt: "Frog Head Features",
            caption: "Head Features — Eyes, Nostrils, and Tympanum"
          },
          bullets: [
            "Nostrils: A pair of external nostrils on the dorsal surface of the snout for respiration.",
            "Eyes: Large and bulging, each protected by a transparent nictitating membrane (third eyelid) for underwater protection.",
            "Tympanum: Circular membranous eardrum behind each eye for receiving sound vibrations (external ears absent)."
          ]
        },
        {
          id: "frog-limbs",
          title: "Appendages (Forelimbs & Hindlimbs)",
          paragraphs: [
            "Frogs have two pairs of limbs adapted for different functions."
          ],
          bullets: [
            "Forelimbs: Short and sturdy; consist of upper arm, forearm, and hand bearing 4 digits; support body weight and cushion landing.",
            "Hindlimbs: Longer, larger, and more muscular; consist of thigh, shank, and foot bearing 5 digits; adapted for swimming, walking, leaping, and burrowing.",
            "Webbed Feet: Digits of hind limbs connected by thin webs of skin for efficient swimming.",
            "At rest, hind limbs folded in characteristic 'Z'-shaped position."
          ]
        },
        {
          id: "frog-sexual-dimorphism",
          title: "Sexual Dimorphism & Vocal Sacs",
          paragraphs: [
            "Male and female frogs can be distinguished by certain external features during the breeding season."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102588/vocal_sacs_hknbhx.jpg",
            alt: "Male Frog Vocal Sacs",
            caption: "Male Frog with Inflated Vocal Sacs (Amplify mating calls)"
          },
          bullets: [
            "Vocal Sacs: Male frogs possess vocal sacs that amplify their croaking sounds during breeding season to attract females.",
            "Females: Vocal sacs and copulatory pads are completely absent."
          ]
        },
        {
          id: "frog-copulatory-pads",
          title: "Copulatory (Nuptial) Pads",
          paragraphs: [
            "Present specifically on the ventral surface of the first digit of each forelimb in male frogs during the breeding season.",
            "These thickened pads help the male firmly grip and hold the female during amplexus (mating embrace in water)."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102589/nuptial_pad_xoqpe0.jpg",
            alt: "Copulatory Nuptial Pad on Male Forelimb",
            caption: "Nuptial (Copulatory) Pad on First Digit of Male Forelimb"
          }
        }
      ]
    },
    {
      id: "digestive",
      title: "Digestive System",
      description: "Alimentary canal, bifid tongue, stomach digestion, glands, and cloacal opening.",
      cards: [
        {
          id: "frog-alimentary-canal",
          title: "Alimentary Canal — Carnivorous Short Digestive Tract",
          paragraphs: [
            "The digestive system consists of a well-developed alimentary canal and several digestive glands.",
            "Carnivorous diet results in a comparatively short alimentary canal."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102546/digestive_system_wpfa55.jpg",
            alt: "Frog Digestive System",
            caption: "Complete Digestive System of Rana tigrina"
          },
          steps: [
            { num: "1", title: "Mouth & Buccal Cavity", desc: "Wide mouth opens into spacious buccal cavity; bifid (forked) tongue attached at front of lower jaw catches insects." },
            { num: "2", title: "Teeth", desc: "Upper jaw bears maxillary teeth; vomerine teeth present on roof near internal nostrils; lower jaw lacks teeth." },
            { num: "3", title: "Pharynx & Oesophagus", desc: "Buccal cavity → Pharynx → short muscular Oesophagus → Stomach." },
            { num: "4", title: "Stomach", desc: "Initial chemical digestion with HCl and gastric juices; partially digested food = chyme." },
            { num: "5", title: "Small Intestine", desc: "Duodenum (receives bile + pancreatic juice) → Ileum (main absorption zone with villi and microvilli)." },
            { num: "6", title: "Rectum & Cloaca", desc: "Undigested waste expelled through cloacal aperture (common chamber for feces, urine, and reproductive cells)." }
          ]
        },
        {
          id: "frog-digestive-glands",
          title: "Digestive Glands & Process",
          bullets: [
            "Liver: Largest digestive gland; secretes bile stored in gall bladder; emulsifies fats.",
            "Pancreas: Produces pancreatic juice with enzymes for digesting carbohydrates, proteins, and lipids.",
            "Bile and pancreatic juice delivered to duodenum via common bile duct.",
            "Absorption: Final digestion and nutrient absorption occurs through villi and microvilli in the intestine."
          ],
          callout: {
            type: "key",
            title: "Digestive Flow Summary",
            text: "Mouth → Buccal Cavity → Pharynx → Oesophagus → Stomach → Duodenum → Ileum → Rectum → Cloaca"
          }
        }
      ]
    },
    {
      id: "respiratory",
      title: "Respiratory System",
      description: "Cutaneous, buccopharyngeal, and pulmonary respiration modes.",
      cards: [
        {
          id: "frog-respiration-modes",
          title: "Four Modes of Respiration",
          paragraphs: [
            "Frogs possess a versatile respiratory system enabling breathing in different environments at various life stages."
          ],
          steps: [
            { num: "1", title: "Cutaneous (Skin)", desc: "Moist, highly vascularized skin acts as primary gas exchanger; O₂ diffuses in, CO₂ diffuses out. Used in water and during aestivation/hibernation." },
            { num: "2", title: "Buccal (Mouth)", desc: "Rhythmic floor movements of buccal cavity allow air to enter/leave through nostrils; gaseous exchange through moist buccal lining." },
            { num: "3", title: "Pulmonary (Lungs)", desc: "Paired pink sac-like lungs in upper body cavity for active land breathing; air path: External Nostrils → Buccal Cavity → Lungs." },
            { num: "4", title: "Larval (Gills)", desc: "Tadpole is fully aquatic, breathing through gills like fish; gills disappear during metamorphosis as lungs develop." }
          ]
        }
      ]
    },
    {
      id: "circulatory",
      title: "Circulatory System",
      description: "3-chambered heart, double circulation, portal systems, and blood composition.",
      cards: [
        {
          id: "frog-heart",
          title: "3-Chambered Heart Structure",
          paragraphs: [
            "Closed circulatory system with a 3-chambered heart (2 auricles + 1 ventricle), enclosed in double-walled pericardium.",
            "Right atrium receives deoxygenated blood via sinus venosus; Left atrium receives oxygenated blood from lungs via pulmonary vein."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102589/lungs_xttiru.png",
            alt: "Frog Heart and Circulatory System",
            caption: "3-Chambered Heart with Truncus Arteriosus"
          },
          bullets: [
            "Truncus Arteriosus: Arises from ventricle; divides into Carotid arch (head), Systemic arch (body), Pulmocutaneous arch (lungs + skin).",
            "Incomplete Double Circulation: Oxygenated and deoxygenated blood not completely separated in ventricle."
          ]
        },
        {
          id: "frog-blood-portal",
          title: "Blood Composition & Portal Systems",
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102546/blood_cells_kdstzu.jpg",
            alt: "Frog Blood Cells",
            caption: "Nucleated Red Blood Cells of Frog"
          },
          bullets: [
            "Red Blood Cells (RBCs): Oval-shaped, biconvex, NUCLEATED, containing hemoglobin.",
            "White Blood Cells (WBCs): Nucleated; help in body defense.",
            "Platelets: Present in blood; help in blood clotting.",
            "Hepatic Portal System: Venous connection between intestine and liver.",
            "Renal Portal System: Venous connection between hind limbs and kidneys."
          ]
        },
        {
          id: "frog-circulation-diagram",
          title: "Circulation Pathway Diagram",
          paragraphs: [
            "Blood circulation is maintained by the pumping action of the muscular heart. Frogs possess a closed circulatory system where blood flows through blood vessels."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782224061/Picture1_ukyap6.png",
            alt: "Frog Circulation Pathway",
            caption: "Complete Circulation Pathway Diagram"
          }
        }
      ]
    },
    {
      id: "nervous",
      title: "Nervous System & Sense Organs",
      description: "CNS, PNS, Autonomic System, brain regions, cranial nerves, and sense organs.",
      cards: [
        {
          id: "frog-cns",
          title: "Central Nervous System (Brain & Spinal Cord)",
          paragraphs: [
            "The nervous system is highly developed, responsible for control and coordination. The brain is located inside the cranial cavity, protected by cranium and two membranes (dura mater and pia mater)."
          ],
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102586/f2_x30s0m.png",
            alt: "Frog Nervous System",
            caption: "Brain and Peripheral Nervous System of Frog"
          },
          steps: [
            { num: "1", title: "Forebrain (Prosencephalon)", desc: "Largest anterior part: Olfactory lobes (smell), Cerebral hemispheres, Diencephalon." },
            { num: "2", title: "Midbrain (Mesencephalon)", desc: "Contains pair of large oval optic lobes associated with vision (optic ventricles)." },
            { num: "3", title: "Hindbrain (Rhombencephalon)", desc: "Cerebellum (balance + muscular coordination) and Medulla oblongata (involuntary activities)." },
            { num: "4", title: "Spinal Cord", desc: "Continues from medulla oblongata through foramen magnum, enclosed in vertebral column." }
          ]
        },
        {
          id: "frog-pns-senses",
          title: "Peripheral System & Sense Organs",
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102580/f1_irosfz.png",
            alt: "Frog Sense Organs",
            caption: "Sense Organs and Peripheral Nervous System"
          },
          bullets: [
            "PNS: 10 pairs of cranial nerves (from brain) + 10 pairs of spinal nerves (from spinal cord).",
            "ANS: Sympathetic and Parasympathetic systems controlling involuntary organ activities.",
            "Vision: Pair of simple eyes in orbits; nictitating membrane protects eyes underwater.",
            "Hearing: Circular tympanum (eardrum) behind each eye; external ears absent; ear functions in both hearing and balance.",
            "Chemical Senses: Sensory papillae (touch), taste buds on tongue (taste), nasal epithelium (smell)."
          ]
        }
      ]
    },
    {
      id: "excretory",
      title: "Excretory System",
      description: "Ureotelic kidneys, nephrons, ureters, urinary bladder, and cloaca.",
      cards: [
        {
          id: "frog-kidneys",
          title: "Mesonephric Kidneys & Excretion",
          paragraphs: [
            "The excretory system is responsible for removal of nitrogenous wastes and maintenance of water-salt balance (osmoregulation).",
            "Kidneys are a pair of compact, dark red, bean-shaped mesonephric organs located near vertebral column."
          ],
          bullets: [
            "Nephrons: Structural and functional units of kidneys; filter blood and remove nitrogenous wastes.",
            "Male Ureters: Function as urinogenital ducts carrying both urine and sperm → Cloaca.",
            "Female Ureters: Separate from oviducts; transport only urine → Cloaca.",
            "Urinary Bladder: Thin-walled, ventral to rectum; temporarily stores urine before excretion.",
            "Nitrogenous Waste: Frogs are ureotelic — primarily excrete urea."
          ],
          callout: {
            type: "ncert",
            title: "Cloaca — Common Exit Chamber",
            text: "The cloaca is a small median chamber serving as a common passage for faecal matter, urine, and reproductive cells (sperms or eggs), discharged through the cloacal aperture."
          }
        }
      ]
    },
    {
      id: "reproductive",
      title: "Reproductive System & Metamorphosis",
      description: "Male/female gonads, Bidder's canal, external fertilization, and tadpole metamorphosis.",
      cards: [
        {
          id: "frog-male-repro",
          title: "Male Reproductive System",
          paragraphs: [
            "Dioecious animals with distinct sexual dimorphism (males possess vocal sacs and copulatory pads)."
          ],
          bullets: [
            "Testes: Pair of yellowish, ovoid organs attached to kidneys by mesorchium.",
            "Vasa Efferentia: 10-12 ducts from each testis enter kidneys → open into Bidder's canal.",
            "Bidder's Canal → Urinogenital duct (ureter) → Cloaca.",
            "Seminal Vesicles: Sac-like dilatations on each ureter for temporary sperm storage."
          ]
        },
        {
          id: "frog-female-repro",
          title: "Female Reproductive System & Spawning",
          bullets: [
            "Ovaries: Pair of lobulated organs near kidneys attached by mesovarium.",
            "Oviducts: Long, ciliated tubes; funnel-shaped opening (ostium) near ovaries → open into cloaca.",
            "Ovisac: Posterior dilated part of oviduct for temporary egg storage before spawning.",
            "Spawning Capacity: A mature female frog can lay approximately 2,500–3,000 eggs (ova) at a single time.",
            "Oviducts and ureters open separately into the cloaca; female ureters carry only urine."
          ]
        },
        {
          id: "frog-fertilization-metamorphosis",
          title: "External Fertilization & Metamorphosis",
          image: {
            src: "https://res.cloudinary.com/dstunh4mx/image/upload/v1782102586/frog_metamorphism_vtvc1t.png",
            alt: "Frog Metamorphosis",
            caption: "Complete Metamorphosis — Egg → Tadpole → Adult Frog"
          },
          steps: [
            { num: "1", title: "Amplexus", desc: "Male embraces female in water; eggs and sperms spawned simultaneously into pond water." },
            { num: "2", title: "External Fertilization", desc: "Fertilization occurs externally in water; jelly-coated eggs form floating masses known as frog spawn." },
            { num: "3", title: "Tadpole Larva", desc: "Fish-like herbivorous aquatic larva with external gills and a tail; relies initially on internal yolk reserves." },
            { num: "4", title: "Metamorphosis", desc: "Thyroxin-driven transformation: gills degenerate, lungs become functional, tail is reabsorbed, limbs develop, and jaws widen into an adult carnivorous frog." }
          ],
          table: {
            headers: ["Feature / Organ", "Tadpole Larva", "Adult Frog"],
            rows: [
              ["Habitat", "Exclusively aquatic", "Amphibious (land & water)"],
              ["Diet", "Herbivorous (algae & plants)", "Carnivorous (insects & worms)"],
              ["Respiration", "External & internal gills", "Skin (cutaneous), lungs, buccal cavity"],
              ["Locomotion", "Swimming with finned tail", "Leaping, crawling, webbed foot swimming"],
              ["Excretory Waste", "Ammonotelic (excretes ammonia)", "Ureotelic (excretes urea)"]
            ]
          }
        }
      ]
    },
    {
      id: "economic-importance",
      title: "Economic & Ecological Importance",
      description: "Pest control, food chain link, bioindicators, culinary use, and key biological milestones.",
      cards: [
        {
          id: "pest-control-eco",
          title: "Pest Control & Agriculture",
          paragraphs: [
            "Frogs are highly beneficial because they feed on a wide variety of harmful insects.",
            "By naturally consuming agricultural pests, they help maintain healthy crop yields and significantly reduce the need for synthetic chemical insecticides."
          ],
          bullets: [
            "Natural biological control of insect vectors and crop pests.",
            "Protects food grains, vegetables, and fruit orchards from pest infestation.",
            "Reduces environmental pesticide load and toxicity in soil and water."
          ]
        },
        {
          id: "ecological-balance",
          title: "Ecological Balance & Food Web Link",
          paragraphs: [
            "Frogs occupy an indispensable intermediate position in ecological food webs.",
            "They serve as secondary consumers preying on primary herbivorous insects, while simultaneously serving as high-protein prey for tertiary predators such as snakes, herons, storks, birds of prey, and predatory fishes."
          ],
          callout: {
            type: "key",
            title: "Vital Ecosystem Bioindicators",
            text: "Because frogs possess permeable skin and spend distinct life stages in both aquatic and terrestrial environments, they are extremely sensitive to pollutants. Declining frog populations serve as an early warning sign of environmental degradation and ecosystem collapse."
          }
        },
        {
          id: "culinary-medical",
          title: "Human Uses & Commercial Value",
          bullets: [
            "Food Source: The muscular hind legs of frogs ('frog legs') are valued as a nutritious delicacy rich in protein in countries like France, the USA, Japan, China, and parts of North-East India.",
            "Traditional Medicine: Frog secretions have been utilized in traditional therapeutics for treating wounds and infections.",
            "Biomedical Research: Skin secretions of frogs contain antimicrobial peptides (AMPs), magainins, and analgesics under active investigation for developing novel antibiotics and pain relief drugs.",
            "Biological Teaching Model: Used extensively worldwide in educational laboratories to teach vertebrate anatomy and physiology."
          ]
        },
        {
          id: "frog-facts-summary",
          title: "High-Yield Facts & Comparative Biology",
          table: {
            headers: ["Concept / Aspect", "Biological Detail & NCERT Significance"],
            rows: [
              ["Order Anura", "Tailless amphibians specifically adapted for jumping with greatly elongated muscular hind limbs."],
              ["Anus vs Cloaca", "Unlike mammals with a distinct anus, amphibians possess a cloaca — a common chamber for intestinal, urinary, and genital tracts."],
              ["Evolutionary Milestone", "Amphibians were the first vertebrates to conquer land, emerging approximately 360 million years ago during the Devonian period."],
              ["Species Diversity", "About 4,500 species of amphibians exist globally. Indian bullfrog (Rana tigrina) and pond frog (Rana hexadactyla) are most prevalent in India."],
              ["Dietary Tract Adaptation", "Short alimentary canal adapted for carnivory, as meat digests much faster than fibrous plant matter."],
              ["Reproductive Capacity", "A single mature female frog lays between 2,500 and 3,000 eggs during each breeding event."]
            ]
          }
        }
      ]
    }
  ]
};
