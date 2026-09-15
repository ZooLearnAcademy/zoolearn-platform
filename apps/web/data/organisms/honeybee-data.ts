import { OrganismData } from "@/components/organisms/unified/OrganismShell";

export const honeybeeData: OrganismData = {
  id: "honey-bee",
  title: "Honey Bee",
  scientificName: "Apis mellifera",
  taxonomyMeta: "Phylum Arthropoda • Class Insecta • Order Hymenoptera",
  icon: "🐝",
  topics: [
    {
      id: "taxonomy-castes",
      title: "Taxonomy & Eusocial Caste System",
      description: "Classification, polymorphic colony organization, Queen, Worker, and Drone roles.",
      cards: [
        {
          id: "sys-bee",
          title: "Systematic Position & Introduction",
          paragraphs: [
            "Apis mellifera (Western Honey Bee) is a highly specialized social insect living in large organized colonies (hives).",
            "Each colony functions like a single unit, where every bee has a specific role.",
            "Honey bees are important for pollination, which helps plants reproduce. They also produce honey, wax, royal jelly, and propolis."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771315768/WhatsApp_Image_2026-02-17_at_13.38.32_wwed7p.jpg",
            alt: "Honey Bee Foraging",
            caption: "Worker Honey Bee (Apis mellifera)"
          },
          table: {
            headers: ["Taxonomic Rank", "Classification", "Key Feature"],
            rows: [
              ["Kingdom", "Animalia", "Multicellular heterotrophic organisms"],
              ["Phylum", "Arthropoda", "Jointed appendages, chitinous exoskeleton"],
              ["Class", "Insecta", "Three body regions, 3 pairs of legs, 2 pairs of wings"],
              ["Order", "Hymenoptera", "Membranous wings, often social"],
              ["Genus", "Apis", "True honey bees"],
              ["Species", "mellifera", "Western/European honey bee"]
            ]
          }
        }
      ]
    },
    {
      id: "colony-structure",
      title: "Colony Structure & Castes",
      description: "Queen, Worker, and Drone castes with their unique roles and characteristics.",
      cards: [
        {
          id: "queen-bee",
          title: "Queen Bee — Fertile Female",
          paragraphs: [
            "The queen bee is the only fertile female in the colony. Her main function is laying eggs — she can lay up to 2000 eggs per day."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771313870/WhatsApp_Image_2026-02-17_at_13.01.26_jon4qf.jpg",
            alt: "Queen Bee",
            caption: "Queen Bee — Largest Member of the Colony"
          },
          bullets: [
            "Fertile female, diploid (2n = 32 chromosomes).",
            "Fed Royal Jelly exclusively throughout life.",
            "Lays both fertilized and unfertilized eggs.",
            "Controls reproduction using stored sperm in spermatheca.",
            "Secretes Queen Substance (pheromone) to maintain colony cohesion."
          ]
        },
        {
          id: "worker-bee",
          title: "Worker Bees — Sterile Females",
          paragraphs: [
            "Worker bees are sterile females produced from fertilized eggs. They perform all essential colony tasks."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771313870/WhatsApp_Image_2026-02-17_at_13.00.44_myuf1c.jpg",
            alt: "Worker Bee",
            caption: "Worker Bee — Backbone of the Colony"
          },
          bullets: [
            "Sterile female, diploid (2n = 32 chromosomes).",
            "Fed Worker Jelly then Honey & Pollen.",
            "Duties: Collecting nectar and pollen, making honey and wax, feeding larvae and queen, cleaning and protecting the hive.",
            "Do not take part in reproduction."
          ]
        },
        {
          id: "drone-bee",
          title: "Drone Bees — Fertile Males",
          paragraphs: [
            "Drone bees are male bees developed from unfertilized eggs via parthenogenesis."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771313874/WhatsApp_Image_2026-02-17_at_13.01.07_eez7i6.jpg",
            alt: "Drone Bee",
            caption: "Drone Bee — Reproductive Male"
          },
          bullets: [
            "Fertile male, haploid (n = 16 chromosomes).",
            "Develop from unfertilized eggs (parthenogenesis).",
            "Only function: Mate with virgin queen during nuptial flight.",
            "After mating, drones die."
          ]
        },
        {
          id: "caste-comparison-table",
          title: "Caste Comparison Table",
          table: {
            headers: ["Feature", "Queen", "Worker", "Drone"],
            rows: [
              ["Sex", "Female (fertile)", "Female (sterile)", "Male (fertile)"],
              ["Ploidy", "Diploid (2n = 32)", "Diploid (2n = 32)", "Haploid (n = 16)"],
              ["Development", "Fertilized egg + Royal Jelly", "Fertilized egg + Worker Jelly", "Unfertilized egg (Parthenogenesis)"],
              ["Function", "Egg laying, Queen Substance", "All colony tasks", "Mating only"],
              ["Sting", "Present (smooth)", "Present (barbed, dies after use)", "Absent"]
            ]
          }
        }
      ]
    },
    {
      id: "worker-adaptations",
      title: "Worker Morphological Adaptations",
      description: "Corbicula pollen baskets, abdominal wax glands, and defensive sting apparatus.",
      cards: [
        {
          id: "adaptations-bee",
          title: "Pollen Basket, Wax Glands & Sting",
          bullets: [
            "Corbicula (Pollen Basket): Concave outer surface of hind tibia bordered by stiff hair for collecting pollen grains.",
            "Pollen Comb & Brush: Rows of stiff bristles on inner basitarsus to clean and pack pollen.",
            "Wax Glands: 4 pairs of abdominal ventral wax glands secreting liquid wax that hardens into comb scales.",
            "Sting Apparatus: Modified ovipositor at abdominal tip connected to poison gland (barbed sting leads to worker death after stinging)."
          ]
        }
      ]
    },
    {
      id: "reproductive-system",
      title: "Reproductive System & Parthenogenesis",
      description: "Haplodiploid sex determination, parthenogenesis, and arrhenotokous reproduction.",
      cards: [
        {
          id: "haplodiploid-system",
          title: "Haplodiploid Sex Determination",
          paragraphs: [
            "Honey bees show a haplodiploid system of sex determination. The sex of the bee depends on whether the egg is fertilized or not."
          ],
          steps: [
            { num: "1", title: "Fertilized Eggs", desc: "Fuse with sperm stored in queen's spermatheca → Diploid (2n) → Develop into Female bees (Queen or Worker)." },
            { num: "2", title: "Unfertilized Eggs", desc: "Do NOT fuse with sperm → Haploid (n) → Develop into Male bees (Drones) via Parthenogenesis." }
          ]
        },
        {
          id: "parthenogenesis-bee",
          title: "Parthenogenesis in Honey Bee",
          paragraphs: [
            "Parthenogenesis is a type of reproduction where an egg develops without fertilization. In honey bees, it produces only male bees (drones).",
            "This specific type is called Arrhenotokous parthenogenesis."
          ],
          bullets: [
            "The queen bee lays unfertilized eggs intentionally.",
            "These unfertilized eggs develop directly into drones (male bees).",
            "Since no fertilization occurs, offspring has only one set of chromosomes (haploid)."
          ],
          callout: {
            type: "mnemonic",
            title: "Easy Way to Remember",
            text: "Fertilized egg → Female → Diploid (2n) | Unfertilized egg → Male → Haploid (n)"
          }
        },
        {
          id: "parthenogenesis-importance",
          title: "Significance of Parthenogenesis",
          bullets: [
            "Helps produce male bees (drones) quickly whenever needed.",
            "Saves energy — fertilization not required for male production.",
            "Maintains proper balance between queen, workers, and drones inside the hive.",
            "Ensures regular reproduction and mating opportunities for colony survival and continuity."
          ],
          callout: {
            type: "key",
            title: "Easy Memory Line",
            text: "Parthenogenesis = quick males + energy saving + colony survival"
          }
        }
      ]
    },
    {
      id: "waggle-dance",
      title: "Waggle Dance & Communication",
      description: "Karl von Frisch Nobel Prize dance language for food source orientation.",
      cards: [
        {
          id: "dance-language",
          title: "Symbolic Bee Dance Language",
          paragraphs: [
            "Forager bees communicate direction and distance of distant nectar/pollen sources to hivemates using symbolic dances in the dark comb."
          ],
          steps: [
            { num: "1", title: "Round Dance", desc: "Performed when food is near (< 50-100m); indicates presence of food without direction." },
            { num: "2", title: "Waggle Dance", desc: "Figure-of-8 dance used when food is > 100m away; angle relative to gravity indicates direction relative to sun position." }
          ],
          callout: {
            type: "mnemonic",
            title: "Nobel Prize Discovery",
            text: "Karl von Frisch was awarded the Nobel Prize in Physiology/Medicine in 1973 for decoding the bee waggle dance language."
          }
        }
      ]
    },
    {
      id: "economic-importance",
      title: "Economic Products & Apiculture",
      description: "Honey, Royal Jelly, Beeswax, Propolis, and crucial pollination role.",
      cards: [
        {
          id: "apiculture-products",
          title: "Economic Products of Apiculture",
          table: {
            headers: ["Product", "Origin / Composition", "Commercial & Medical Use"],
            rows: [
              ["Honey", "Nectar digested by invertase in honey stomach", "High energy food, antiseptic, medicinal cough remedy"],
              ["Beeswax", "Secreted by worker abdominal wax glands", "Candle manufacturing, cosmetics, polishes, ointments"],
              ["Royal Jelly", "Hypopharyngeal gland secretion of young workers", "Nutritional supplement, queen larval food"],
              ["Propolis", "Resin collected from plant buds", "Natural antibiotic, hive sealant and disinfectant"]
            ]
          }
        }
      ]
    }
  ]
};
