export interface ContentCard {
  id: string;
  title: string;
  badge?: string;
  paragraphs?: string[];
  bullets?: {
    lead?: string;
    text: string;
    subBullets?: string[];
  }[];
  customType?: "binomial-tiger" | "taxonomy-systematics" | "hierarchy-pyramid" | "taxa-table" | "keys-flow" | "aids-grid";
  highlightBox?: {
    title?: string;
    text: string;
    variant?: "info" | "success" | "warning" | "accent";
  };
  callout?: string;
}

export interface LivingWorldTopic {
  id: string;
  number: number;
  title: string;
  description: string;
  cards: ContentCard[];
}

export const livingWorldTopics: LivingWorldTopic[] = [
  {
    id: "introduction",
    number: 1,
    title: "Introduction",
    description: "Understand the fundamental need for identification, rules of binomial nomenclature, and the principles of taxonomy and systematics.",
    cards: [
      {
        id: "need-for-identification",
        title: "Need for Identification of Organisms",
        paragraphs: [
          "Different regions and languages often use different local names for the same plant or animal, which can lead to confusion. To avoid this, every organism must be accurately identified and scientifically described so that it is recognized by the same identity worldwide. This process of recognizing and distinguishing an organism based on its characteristics is known as identification."
        ]
      },
      {
        id: "nomenclature",
        title: "Nomenclature",
        paragraphs: [
          "Nomenclature is the system of assigning standardized scientific names to living organisms so that each organism is recognized by the same name worldwide. An organism can be given a scientific name only after it has been correctly identified."
        ]
      },
      {
        id: "scientific-names-international-codes",
        title: "Scientific Names and International Codes",
        paragraphs: [
          "To ensure uniformity in naming, biologists follow internationally accepted rules while assigning scientific names to organisms. These rules are established through the following international codes:"
        ],
        bullets: [
          {
            lead: "ICBN (International Code of Botanical Nomenclature):",
            text: "Provides the principles and rules for naming plants."
          },
          {
            lead: "ICZN (International Code of Zoological Nomenclature):",
            text: "Establishes the rules for naming animals."
          },
          {
            text: "These international codes ensure that each organism has a unique scientific name and that the same name is not assigned to any other known organism, allowing scientists around the world to communicate accurately and consistently."
          }
        ]
      },
      {
        id: "binomial-nomenclature",
        title: "Binomial Nomenclature",
        paragraphs: [
          "Binomial nomenclature is the scientific system of naming organisms developed by Carolus Linnaeus. In this system, every organism is assigned a two-word scientific name consisting of the generic name (genus) and the specific epithet (species). This standardized naming system is followed by biologists worldwide."
        ],
        customType: "binomial-tiger"
      },
      {
        id: "rules-of-binomial-nomenclature",
        title: "Rules of Binomial Nomenclature",
        paragraphs: [
          "The scientific naming of organisms follows a set of internationally accepted rules:"
        ],
        bullets: [
          {
            lead: "Latin Origin:",
            text: "Scientific names are generally Latin or Latinized and are written in italics, regardless of their original language."
          },
          {
            lead: "Two Components:",
            text: "A scientific name consists of two words — the first word represents the genus (generic name), and the second word represents the specific epithet."
          },
          {
            lead: "Format:",
            text: "When printed, scientific names are written in italics. When handwritten, each word is underlined separately."
          },
          {
            lead: "Capitalization:",
            text: "The genus name begins with a capital letter. The specific epithet begins with a small letter. Example: Mangifera indica."
          },
          {
            lead: "Author Citation:",
            text: "The abbreviated name of the scientist who first described the species is written after the scientific name. Example: Mangifera indica Linn."
          }
        ]
      },
      {
        id: "classification",
        title: "Classification",
        paragraphs: [
          "Since it is impossible to study every living organism individually, scientists classify organisms into groups based on their observable similarities and differences. This process makes the study of the vast diversity of life more systematic, organized, and easier to understand."
        ]
      },
      {
        id: "taxa-and-taxon",
        title: "Taxa and Taxon",
        paragraphs: [
          "The categories used in biological classification are called taxa (singular: taxon). A taxon represents a unit or rank of classification. Different taxa exist at different hierarchical levels. For example, Animalia, Mammalia, and Canis are all taxa, but each represents a different level in the classification hierarchy."
        ]
      },
      {
        id: "taxonomy-systematics",
        title: "Taxonomy & Systematics",
        paragraphs: [
          "Taxonomy is the branch of biology concerned with the identification, characterization, nomenclature, and classification of living organisms. Organisms are classified into different taxa based on their characteristics."
        ],
        bullets: [
          {
            lead: "Modern taxonomy uses information from:",
            text: "External morphology, Internal anatomy, Cell structure, Developmental (embryological) features, and Ecological characteristics."
          },
          {
            lead: "The four basic processes of taxonomy are:",
            text: "Characterization, Identification, Classification, and Nomenclature."
          }
        ],
        customType: "taxonomy-systematics"
      }
    ]
  },
  {
    id: "taxonomic-categories",
    number: 2,
    title: "Taxonomic Categories",
    description: "Explore the hierarchy of classification from Species to Kingdom with mnemonic aids and NCERT comparative organism charts.",
    cards: [
      {
        id: "taxonomic-hierarchy-intro",
        title: "Taxonomic Hierarchy & Obligate Categories",
        paragraphs: [
          "Classification is not a single-step process, but involves a hierarchy of steps where each step represents a rank or category. Since the category is a part of the overall taxonomic arrangement, it is called a taxonomic category, and all categories together constitute the taxonomic hierarchy.",
          "Taxonomic categories are arranged in an ascending or descending order. As we go higher from Species to Kingdom, the number of common characteristics goes on decreasing, making classification broader and more generalized."
        ],
        customType: "hierarchy-pyramid"
      },
      {
        id: "detailed-taxonomic-ranks",
        title: "Detailed Analysis of Each Taxonomic Category",
        paragraphs: [
          "Let us examine each obligate category in order from the lowest (most specific) to highest (broadest):"
        ],
        bullets: [
          {
            lead: "Species (Lowest / Basic Unit):",
            text: "A group of individual organisms with fundamental similarities that can freely interbreed in nature to produce fertile offspring. Examples: Panthera leo (Lion), Panthera tigris (Tiger), Solanum tuberosum (Potato), Homo sapiens (Human)."
          },
          {
            lead: "Genus (Group of Related Species):",
            text: "Comprises a group of related species which has more characters in common in comparison to species of other genera. For example, Lion (Panthera leo), Leopard (Panthera pardus), and Tiger (Panthera tigris) are all species of genus Panthera. Potato and Brinjal belong to genus Solanum."
          },
          {
            lead: "Family (Group of Related Genera):",
            text: "Has a group of related genera with still less number of similarities compared to genus and species. Families are characterized on the basis of both vegetative and reproductive features of plant species. Examples: Family Felidae includes Panthera (lions, tigers) and Felis (cats); Family Solanaceae includes Solanum, Petunia, and Datura."
          },
          {
            lead: "Order (Assemblage of Families):",
            text: "Order being a higher category is the assemblage of families which exhibit a few similar characters. Examples: Plant families Convolvulaceae and Solanaceae are included in order Polymoniales mainly based on floral characters. Animal families Felidae and Canidae are included in order Carnivora."
          },
          {
            lead: "Class (Group of Related Orders):",
            text: "This category includes related orders. For example, order Primata (comprising monkey, gorilla, gibbon) is placed in class Mammalia along with order Carnivora (comprising tiger, cat, dog)."
          },
          {
            lead: "Phylum / Division (Group of Related Classes):",
            text: "Classes comprising animals like fishes, amphibians, reptiles, birds along with mammals constitute the next higher category called Phylum (e.g., Phylum Chordata based on notochord and dorsal hollow neural system). In plants, classes with few similar characters are assigned to a higher category called Division (e.g., Angiospermae)."
          },
          {
            lead: "Kingdom (Highest Taxonomic Category):",
            text: "All animals belonging to various phyla are assigned to the highest category called Kingdom Animalia in the classification system. Similarly, all plants belong to Kingdom Plantae."
          }
        ]
      },
      {
        id: "ncert-taxonomic-table",
        title: "Organisms with their Taxonomic Categories (NCERT Reference)",
        paragraphs: [
          "The following table provides the comprehensive classification of representative model organisms across all taxonomic categories as prescribed in NCERT:"
        ],
        customType: "taxa-table"
      }
    ]
  },
  {
    id: "taxonomical-aids",
    number: 3,
    title: "Taxonomical Aids",
    description: "Learn about the vital laboratory and field tools used for identification, preservation, and study of biodiversity.",
    cards: [
      {
        id: "taxonomical-aids-intro",
        title: "Introduction to Taxonomical Aids",
        paragraphs: [
          "Taxonomical studies of various species of plants, animals, and other organisms are useful in agriculture, forestry, industry, and in knowing our bio-resources and their diversity.",
          "These studies require correct classification and identification of organisms. Identification of organisms requires intensive laboratory and field studies. The collection of actual specimens of plant and animal species is essential and is the prime source of taxonomic studies."
        ]
      },
      {
        id: "major-taxonomical-aids",
        title: "Major Taxonomical Aids & Preservations",
        paragraphs: [
          "Biologists have established specific procedures and techniques to store and preserve the information as well as specimens:"
        ],
        customType: "aids-grid"
      },
      {
        id: "taxonomic-keys-deep-dive",
        title: "Taxonomic Keys (Analytical Devices)",
        paragraphs: [
          "Key is another taxonomical aid used for identification of plants and animals based on the similarities and dissimilarities.",
          "The keys are based on the contrasting characters generally in a pair called couplet. It represents the choice made between two opposite options. This results in acceptance of only one and rejection of the other.",
          "Each statement in the key is called a lead. Separate taxonomic keys are required for each taxonomic category such as family, genus, and species for identification purposes. Keys are generally analytical in nature."
        ],
        customType: "keys-flow"
      },
      {
        id: "recorded-descriptions",
        title: "Flora, Manuals, Monographs & Catalogues",
        paragraphs: [
          "In addition to physical specimens, detailed recorded publications and manuals are essential reference aids:"
        ],
        bullets: [
          {
            lead: "Flora:",
            text: "Contains the actual account of habitat and distribution of plants of a given area. These provide the index to the plant species found in a particular area (e.g., Flora of Delhi)."
          },
          {
            lead: "Manuals:",
            text: "Are useful in providing information for identification of names of species found in an area."
          },
          {
            lead: "Monographs:",
            text: "Contain comprehensive information on any one taxon (e.g., Monograph of Genus Pinus)."
          },
          {
            lead: "Catalogues:",
            text: "Alphabetical listing or register of all species in a specific location with brief descriptions and references."
          }
        ]
      }
    ]
  }
];
