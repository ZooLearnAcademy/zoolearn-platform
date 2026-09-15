import { OrganismData } from "@/components/organisms/unified/OrganismShell";

export const humanEvolutionData: OrganismData = {
  id: "human-evolution",
  title: "Horse Evolution",
  scientificName: "Equus lineage",
  taxonomyMeta: "Phylum Chordata • Class Mammalia • Evolutionary Paleontology",
  icon: "🐴",
  topics: [
    {
      id: "horse-evolution-eocene",
      title: "Horse Evolution — Eocene Epoch",
      description: "Earliest members: Hyracotherium (Eohippus) and Orohippus.",
      cards: [
        {
          id: "hyracotherium",
          title: "1. Hyracotherium (Eohippus) — Dawn Horse",
          paragraphs: [
            "Earliest known member of the horse lineage (~50 MYA) discovered in North America.",
            "Small fox-sized browser (~40 cm tall at shoulders) with 4 functional toes on forelimbs and 3 on hindlimbs.",
            "Had a short head and neck. The low-crowned molar teeth were adapted for browsing soft vegetation."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340466/Hyracotherium_%EF%B8%8E_mi78ms.png",
            alt: "Hyracotherium Eohippus",
            caption: "Hyracotherium (Eohippus) — 4-Toed Dawn Horse (~40 cm)"
          }
        },
        {
          id: "hyracotherium-foot",
          title: "Hyracotherium — Foot Structure Comparison",
          paragraphs: [
            "Detailed comparison showing the 4-toed forelimb structure and how it evolved over millions of years."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775118956/56ace581-cf31-4522-968f-0ed751393f3b.png",
            alt: "Hyracotherium foot structure",
            caption: "Eohippus Limb & Foot Structure — Detailed View"
          }
        },
        {
          id: "orohippus",
          title: "2. Orohippus — Early Eocene (~50 MYA)",
          paragraphs: [
            "Slightly larger than Hyracotherium with changes in tooth structure. Lost the first premolar and developed sharper crests on molars.",
            "Still a forest browser. Subtle shift toward harder foods. Represents early diversification of the horse lineage."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340398/Orohippus_%EF%B8%8E_moxn95.png",
            alt: "Orohippus",
            caption: "Orohippus — 4-Toed Eocene Browser"
          }
        }
      ]
    },
    {
      id: "horse-evolution-oligocene",
      title: "Horse Evolution — Oligocene Epoch",
      description: "Intermediate stages: Mesohippus and Miohippus.",
      cards: [
        {
          id: "mesohippus",
          title: "3. Mesohippus — Oligocene (~30 MYA)",
          paragraphs: [
            "Intermediate evolutionary stage; sheep-sized horse (~60 cm tall).",
            "3 functional toes on forelimbs and hindlimbs; middle toe longer supporting main body weight.",
            "The molar teeth showed the beginning of enamel ridges."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340493/Mesohippus_%EF%B8%8E_hld5dm.png",
            alt: "Mesohippus",
            caption: "Mesohippus — 3-Toed Oligocene Intermediate Horse (~60 cm)"
          }
        },
        {
          id: "mesohippus-foot",
          title: "Mesohippus — Limb Evolution Comparison",
          paragraphs: [
            "Reduction from 4 toes to 3 functional toes. The middle digit (3rd) becomes dominant."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775118977/8a87726a-a941-489b-9ce3-669e590ce66e.png",
            alt: "Mesohippus foot structure",
            caption: "Mesohippus Limb Evolution — 3-Toed Structure"
          }
        },
        {
          id: "miohippus",
          title: "4. Miohippus — Late Oligocene (~30 MYA)",
          paragraphs: [
            "Larger than Mesohippus with improved teeth for grazing. More adapted to grasslands as forests retreated.",
            "Third toe still present but more reduced. Teeth began to transition for abrasive grass diet.",
            "An evolutionary bridge between browsers and grazers."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340521/Miohippus_%EF%B8%8E_cq5med.png",
            alt: "Miohippus",
            caption: "Miohippus — Transition to Grassland Grazing"
          }
        }
      ]
    },
    {
      id: "horse-evolution-miocene",
      title: "Horse Evolution — Miocene Epoch",
      description: "Major adaptations: Parahippus, Callippus, and Merychippus.",
      cards: [
        {
          id: "parahippus",
          title: "5. Parahippus — Early Miocene (~24 MYA)",
          paragraphs: [
            "Shows clear transition from browsing to grazing. Teeth developed higher crowns with cement coating for grinding tough grass.",
            "Side toes shrinking but still functional. Longer limbs for running across open grasslands."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340564/Parahippus_%EF%B8%8E_vcq6jw.png",
            alt: "Parahippus",
            caption: "Parahippus — Early Grazing Horse with Higher-Crowned Teeth"
          }
        },
        {
          id: "callippus",
          title: "6. Callippus — Miocene (~15 MYA, Side Branch)",
          paragraphs: [
            "A slender, side-branch of horse evolution. Specialized in grassland habitats alongside Merychippus.",
            "Highly specialized dentition. Eventually went extinct without direct descendants."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340615/Callippus_%EF%B8%8E_rz4br6.png",
            alt: "Callippus",
            caption: "Callippus — Extinct Side-Branch of Horse Evolution"
          },
          callout: {
            type: "key",
            title: "Evolutionary Dead End",
            text: "Callippus represents an evolutionary side branch that went extinct. It demonstrates that evolution is not a straight line but a branching tree."
          }
        },
        {
          id: "merychippus",
          title: "7. Merychippus — Miocene (~20 MYA)",
          paragraphs: [
            "Known as the 'ruminating horse'. Size of a small pony (~100 cm tall).",
            "Had a longer neck. Three toes on each limb but middle toe was longest and supported most body weight; side toes were reduced.",
            "Teeth were longer and covered with cement, with well-developed enamel ridges for grazing."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340595/Merychippus_%EF%B8%8E_ry9izt.png",
            alt: "Merychippus",
            caption: "Merychippus — Ruminating Horse (~100 cm, 3 Toes with Reduced Side Toes)"
          }
        },
        {
          id: "merychippus-foot",
          title: "Merychippus — Limb & Tooth Evolution",
          paragraphs: [
            "Detailed comparison showing the progressive reduction of side toes and development of cement-coated high-crowned molars."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119684/14478513-2745-435f-89cd-dac8fdfdf9db.png",
            alt: "Merychippus foot and tooth evolution",
            caption: "Merychippus — Limb Reduction and Dental Adaptation"
          }
        }
      ]
    },
    {
      id: "horse-evolution-pliocene",
      title: "Horse Evolution — Pliocene to Modern",
      description: "Final stages: Pliohippus and modern Equus.",
      cards: [
        {
          id: "pliohippus",
          title: "8. Pliohippus — Late Miocene (~12-6 MYA)",
          paragraphs: [
            "Advanced horse; size of a modern pony (~120 cm tall).",
            "Each limb had one functional toe (digit III). Digits II and IV were reduced to splint bones beneath the skin.",
            "Considered one of the earliest one-toed horses. Molars were high-crowned with cement and serrations for grazing."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341033/Pliohippus_%EF%B8%8E_u0clzq.png",
            alt: "Pliohippus",
            caption: "Pliohippus — First One-Toed Horse (~120 cm)"
          }
        },
        {
          id: "pliohippus-foot",
          title: "Pliohippus — Single Hoof Development",
          paragraphs: [
            "The evolutionary milestone of developing a single functional hoof (digit III) with splint bones from reduced side toes."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119801/807bf458-d4a8-47cf-be1e-e2b427e0f735.png",
            alt: "Pliohippus foot structure",
            caption: "Pliohippus — Single Hoof with Splint Bones"
          }
        },
        {
          id: "equus-modern",
          title: "9. Equus (Modern Horse) — Late Pliocene to Present",
          paragraphs: [
            "Modern horse evolved from Pliohippus. Appeared ~4-4.5 million years ago.",
            "First appeared in North America and later spread worldwide (except Australia). Height about 150 cm at shoulders.",
            "Long head and long neck. Each limb has one functional digit (third digit) forming a single hoof; other digits reduced to two splint bones.",
            "Highly elongated crowns with enamel ridges perfectly suited for grinding grass."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341098/Equus_ferus_vk3fio.png",
            alt: "Equus - Modern Horse",
            caption: "Equus caballus — Modern Horse (~150 cm, Single Hoof)"
          }
        },
        {
          id: "equus-foot",
          title: "Equus — Modern Hoof Structure",
          paragraphs: [
            "The culmination of 55 million years of evolution: a single powerful hoof per limb, perfectly adapted for fast running on open grasslands."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119878/8e422c6a-f5c7-4ab7-b1e3-4853a7882ce7.png",
            alt: "Equus modern hoof structure",
            caption: "Modern Equus — Single Hoof with Vestigial Splint Bones"
          }
        }
      ]
    },
    {
      id: "evolution-summary",
      title: "Evolution Summary & Key Trends",
      description: "Major evolutionary trends from Eohippus to Equus over 55 million years.",
      cards: [
        {
          id: "evolution-trends",
          title: "Key Evolutionary Trends in Horse Evolution",
          steps: [
            { num: "1", title: "Increase in Body Size", desc: "From fox-sized Eohippus (40 cm) to modern horse Equus (150 cm) — nearly 4x increase." },
            { num: "2", title: "Toe Reduction", desc: "4 toes → 3 toes → 1 functional toe (single hoof), with side toes becoming vestigial splint bones." },
            { num: "3", title: "Limb Elongation", desc: "Progressive lengthening of limbs for faster running speed on open grasslands." },
            { num: "4", title: "Tooth Adaptation", desc: "Low-crowned browsing teeth → high-crowned cement-coated grinding teeth for tough grasses." },
            { num: "5", title: "Habitat Shift", desc: "Forest browsers → Grassland grazers as global climate changed and grasslands expanded." }
          ],
          table: {
            headers: ["Stage", "Epoch", "Height", "Toes", "Teeth Type"],
            rows: [
              ["Eohippus", "Eocene", "~40 cm", "4/3", "Low-crowned (browsing)"],
              ["Mesohippus", "Oligocene", "~60 cm", "3/3", "Early enamel ridges"],
              ["Merychippus", "Miocene", "~100 cm", "3 (side reduced)", "High-crowned + cement"],
              ["Pliohippus", "Late Miocene", "~120 cm", "1 (splint bones)", "High-crowned + serrations"],
              ["Equus", "Pliocene–Present", "~150 cm", "1 (single hoof)", "Elongated grinding crowns"]
            ]
          }
        }
      ]
    }
  ]
};
