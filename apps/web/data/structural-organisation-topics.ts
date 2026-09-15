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
  customType?: 
    | "hierarchy-flow" 
    | "epithelial-viewer" 
    | "connective-viewer" 
    | "muscle-table" 
    | "neural-signal";
  imageInfo?: {
    src: string;
    alt: string;
    caption: string;
  };
  highlightBox?: {
    title?: string;
    text: string;
    variant?: "info" | "success" | "warning" | "accent";
  };
  callout?: string;
}

export interface StructuralOrganisationTopic {
  id: string;
  number: number;
  title: string;
  description: string;
  cards: ContentCard[];
}

export const structuralOrganisationTopics: StructuralOrganisationTopic[] = [
  {
    id: "introduction",
    number: 1,
    title: "Introduction & Hierarchy",
    description: "Discover the architectural hierarchy of animal life from single cells to complex organ systems and understand the 4 primary tissue lineages.",
    cards: [
      {
        id: "intro-hierarchy",
        title: "The Hierarchy of Animal Life: Cells to Systems",
        paragraphs: [
          "The animal kingdom shows a vast diversity of organisms, ranging from unicellular organisms to highly complex multicellular animals. In unicellular organisms, all essential life processes such as digestion, respiration, and reproduction are carried out by a single cell.",
          "In contrast, multicellular animals have different groups of cells specialized to perform different functions. A simple multicellular organism such as Hydra consists of different types of cells, while the human body is made up of billions of cells that work together in precise coordination."
        ],
        bullets: [
          {
            lead: "Tissues:",
            text: "To make coordination possible, similar cells, along with the intercellular substances surrounding them, are organized into groups called tissues."
          },
          {
            lead: "Organs:",
            text: "In complex animals, tissues are organized in specific patterns and proportions to form organs, such as the heart, lungs, stomach, and kidneys."
          },
          {
            lead: "Organ Systems:",
            text: "When two or more organs work together to perform a particular physiological function, they form an organ system, such as the digestive system or respiratory system."
          },
          {
            lead: "Division of Labour:",
            text: "This hierarchical organization allows different parts of the body to perform specialized functions through an efficient division of labour, ensuring the proper functioning and survival of the organism."
          }
        ],
        customType: "hierarchy-flow"
      },
      {
        id: "four-basic-tissues",
        title: "The Four Basic Animal Tissues",
        paragraphs: [
          "In complex animals, cells are specialized to perform different functions. Groups of cells with similar structure and specialized functions are organized into different types of animal tissues. Each tissue has structural features that are closely related to the function it performs.",
          "In complex animals, animal tissues are broadly classified into four fundamental types:"
        ],
        bullets: [
          {
            lead: "1. Epithelial Tissue:",
            text: "Forms protective outer coverings and inner linings of organs, cavities, ducts, and tubes. Provides protection, secretion, and absorption."
          },
          {
            lead: "2. Connective Tissue:",
            text: "Most abundant tissue; binds, supports, cushions, and transports substances throughout the organism (e.g., bone, cartilage, blood, areolar, adipose)."
          },
          {
            lead: "3. Muscular Tissue:",
            text: "Excitable, contractile tissue composed of muscle fibres that contract and relax to facilitate body movement and posture maintenance."
          },
          {
            lead: "4. Neural Tissue:",
            text: "Specialized for sensing stimuli, rapid transmission of electrical impulses, and processing environmental changes (neurons and neuroglia)."
          }
        ],
        highlightBox: {
          title: "NEET Key Takeaway",
          text: "All complex animal organs (such as the stomach, heart, lung, and kidney) are constructed from specific proportions and arrangements of these four basic tissue lineages.",
          variant: "accent"
        }
      }
    ]
  },
  {
    id: "epithelial-tissue",
    number: 2,
    title: "Epithelial Tissue",
    description: "Explore surface coverings, simple vs compound architectures, specialized glandular secretions, and intercellular junctions.",
    cards: [
      {
        id: "epithelial-characteristics",
        title: "Epithelial Tissue (Epithelium) Overview",
        paragraphs: [
          "Epithelial tissue forms the outer covering of the body and lines many internal body surfaces, cavities, ducts, and tubes. Its cells are closely packed together with very little intercellular matrix.",
          "A fundamental hallmark of epithelial tissue is that its free surface faces either the external environment or a body fluid, providing a protective covering or lining."
        ],
        bullets: [
          {
            lead: "Simple Epithelium:",
            text: "Consists of a single layer of cells; primarily functions as a lining for body cavities, ducts, and tubes."
          },
          {
            lead: "Compound Epithelium:",
            text: "Consists of two or more cell layers; primarily serves a protective function against mechanical and chemical stresses."
          }
        ]
      },
      {
        id: "simple-epithelium-types",
        title: "Classification of Simple Epithelium",
        paragraphs: [
          "Based on the structural modification and shape of the cells, simple epithelium is classified into four principal varieties:"
        ],
        bullets: [
          {
            lead: "1. Squamous Epithelium:",
            text: "Single layer of thin, flattened cells with irregular boundaries. Forms a delicate diffusion boundary. Found in the walls of blood vessels (endothelium) and air sacs of lungs (alveoli). Main function: Diffusion and filtration."
          },
          {
            lead: "2. Cuboidal Epithelium:",
            text: "Single layer of cube-like cells. Commonly found in ducts of glands and tubular parts of nephrons in the kidneys. Main functions: Secretion and absorption. The epithelial cells lining the proximal convoluted tubule (PCT) of the nephron possess microvilli, which dramatically increase surface area for reabsorption."
          },
          {
            lead: "3. Columnar Epithelium:",
            text: "Single layer of tall, slender pillar-like cells. Their nuclei are located near the base. The free surface may bear microvilli. Lines organs such as the stomach and intestine. Main functions: Secretion of mucus/enzymes and absorption."
          },
          {
            lead: "4. Ciliated Epithelium:",
            text: "Cuboidal or columnar cells that bear fine, hair-like cilia on their free surface. The cilia beat in a coordinated rhythmic wave to propel mucus or particles in a specific direction. Found mainly in the inner lining of hollow organs such as bronchioles and fallopian tubes (oviducts)."
          }
        ],
        customType: "epithelial-viewer"
      },
      {
        id: "glandular-epithelium",
        title: "Glandular Epithelium & Secretion Modes",
        paragraphs: [
          "Some cuboidal or columnar epithelial cells become specialized for secretion, forming glandular epithelium. Glands are classified based on cell accumulation and mode of secretion:"
        ],
        bullets: [
          {
            lead: "Classification by Cell Accumulation:",
            text: "Unicellular glands consist of isolated single glandular cells (e.g., Goblet cells of the alimentary canal). Multicellular glands consist of clusters of cells (e.g., Salivary glands)."
          },
          {
            lead: "Classification by Mode of Secretion:",
            text: "Exocrine Glands release their secretions through ducts or tubes (e.g., mucus, saliva, earwax, oil, milk, and digestive enzymes). Endocrine Glands are ductless glands whose secretions (hormones) are poured directly into the fluid bathing the gland and carried via blood circulation."
          }
        ]
      },
      {
        id: "compound-epithelium",
        title: "Compound (Stratified) Epithelium",
        paragraphs: [
          "Compound epithelium consists of more than one layer of cells. Because it has multiple layers, its role in secretion and absorption is limited; instead, its primary function is to provide protection against chemical and mechanical stresses."
        ],
        bullets: [
          {
            lead: "Key Anatomical Locations:",
            text: "Covers the dry surface of the skin (epidermis), the moist lining of the buccal cavity and pharynx, the inner lining of salivary gland ducts, and pancreatic ducts."
          }
        ]
      },
      {
        id: "cell-junctions",
        title: "Cell Junctions (Intercellular Connections)",
        paragraphs: [
          "Cell junctions are specialized structures that connect neighboring cells and provide structural and functional coordination within tissues. They are particularly prominent in epithelial tissues where cells are densely packed with minimal intercellular space."
        ],
        bullets: [
          {
            lead: "1. Tight Junctions (Zona Occludens):",
            text: "Form a watertight seal between neighboring plasma membranes, preventing substances and fluids from leaking across the epithelial layer."
          },
          {
            lead: "2. Adhering Junctions (Desmosomes / Zonula Adherens):",
            text: "Act like molecular cement to bind neighboring cells firmly together, providing high mechanical strength and structural integrity."
          },
          {
            lead: "3. Gap Junctions (Nexus):",
            text: "Form cytoplasmic bridges and channels between neighboring cells, permitting the rapid direct exchange of ions, second messengers, and small metabolites for instant intercellular communication."
          }
        ],
        highlightBox: {
          title: "High-Yield NEET Exam Trigger",
          text: "Gap junctions facilitate rapid cytoplasmic continuity for ion transfer. Tight junctions stop leakage. Adhering junctions cement cells together.",
          variant: "success"
        }
      }
    ]
  },
  {
    id: "connective-tissue",
    number: 3,
    title: "Connective Tissue",
    description: "Understand the binding framework of the body: loose areolar and adipose tissues, dense tendons and ligaments, and specialized cartilage, bone, and blood.",
    cards: [
      {
        id: "connective-intro",
        title: "Connective Tissue Architecture & Matrix",
        paragraphs: [
          "Connective tissues are the most abundant and widely distributed tissues throughout the body of complex animals. They function primarily to connect, support, bind, and protect different tissues and organs, ranging from soft cushioning tissues to rigid bones and liquid blood.",
          "In nearly all connective tissues (except blood), the cells secrete structural fibres composed of proteins such as collagen and elastin. Collagen provides tensile strength, while elastin grants elasticity and flexibility.",
          "The cells also secrete a ground substance—a modified polysaccharide matrix—which surrounds the cells and fibres to form the extracellular matrix."
        ],
        customType: "connective-viewer"
      },
      {
        id: "loose-connective-tissue",
        title: "I. Loose Connective Tissue",
        paragraphs: [
          "In loose connective tissue, cells and fibres are loosely arranged in a semi-fluid ground substance. It is divided into two major types:"
        ],
        bullets: [
          {
            lead: "Areolar Tissue:",
            text: "Present beneath the skin and serves as a supporting framework for epithelium. Contains fibroblasts (cells that produce fibres), macrophages (phagocytic scavengers), and mast cells (secrete histamine, serotonin, and heparin)."
          },
          {
            lead: "Adipose Tissue:",
            text: "Located predominantly beneath the skin; specialized for the synthesis and storage of fats (adipocytes). Excess nutrients not immediately utilized by the body are converted into lipids and stored here as energy reserves and thermal insulation."
          }
        ]
      },
      {
        id: "dense-connective-tissue",
        title: "II. Dense Connective Tissue",
        paragraphs: [
          "In dense connective tissue, fibres and fibroblasts are compactly packed. Depending on the orientation of the fibres, it is classified as regular or irregular:"
        ],
        bullets: [
          {
            lead: "Dense Regular Connective Tissue:",
            text: "Collagen fibres are oriented in parallel bundles to provide immense directional tensile strength. Examples include Tendons (inelastic cords that attach skeletal muscles to bones) and Ligaments (elastic bands that attach one bone to another)."
          },
          {
            lead: "Dense Irregular Connective Tissue:",
            text: "Contains fibroblasts and a dense meshwork of collagen fibres arranged in diverse directions, resisting multi-directional mechanical stresses. Found predominantly in the dermis of the skin."
          }
        ]
      },
      {
        id: "specialised-connective-tissue",
        title: "III. Specialised Connective Tissue (Skeletal & Fluid)",
        paragraphs: [
          "Specialized connective tissues include rigid skeletal structures (Cartilage and Bone) as well as the circulating fluid connective tissue (Blood):"
        ],
        bullets: [
          {
            lead: "Cartilage:",
            text: "Intercellular matrix is solid, pliable, and resistant to compression. The mature cells (chondrocytes) reside in small fluid-filled cavities called lacunae. Locations: Tip of the nose, outer ear pinna, joints between limb bones, and between adjacent vertebrae of the vertebral column."
          },
          {
            lead: "Bone:",
            text: "Possesses a hard, non-pliable matrix heavily impregnated with calcium salts and collagen fibres. Forms the primary skeletal framework, protects delicate organs, and supports body weight. Bone cells (osteocytes) reside in lacunae. Limb bones work in tandem with muscles for locomotion, and certain bones contain marrow where hematopoiesis (blood cell production) occurs."
          },
          {
            lead: "Blood:",
            text: "A fluid connective tissue containing fluid plasma and cellular elements. Crucially, blood cells DO NOT produce structural collagen or elastin fibres. Composed of Red Blood Cells (RBCs/erythrocytes containing hemoglobin; note: frog RBCs are nucleated), White Blood Cells (WBCs/leucocytes for defense), and Platelets (thrombocytes for blood clotting)."
          }
        ]
      }
    ]
  },
  {
    id: "muscle-tissue",
    number: 4,
    title: "Muscular Tissue",
    description: "Analyze the contractile machinery of life: compare Skeletal, Smooth, and Cardiac muscle tissues with structural and physiological parameters.",
    cards: [
      {
        id: "muscle-intro",
        title: "Muscular Tissue & Contractile Units",
        paragraphs: [
          "Muscular tissue is composed of numerous elongated, cylindrical cells known as muscle fibres that are specialized for contraction. Each muscle fibre contains many microscopic, parallel contractile filaments called myofibrils.",
          "Upon stimulation, muscle fibres actively contract (shorten) and subsequently relax (lengthen) back to their resting state. Their coordinated action produces locomotion, manipulation of objects, pumping of blood, and posture maintenance."
        ]
      },
      {
        id: "three-muscle-types",
        title: "The Three Types of Muscle Tissue",
        paragraphs: [
          "Based on their structure, location, and innervation, muscle tissues are categorized into three distinct varieties:"
        ],
        bullets: [
          {
            lead: "1. Skeletal Muscle:",
            text: "Striated (striped) under light microscopy with alternating dark and light bands. Composed of long, unbranched cylindrical fibres bundled in parallel by a tough connective tissue sheath. Attached to skeletal bones (e.g., biceps, quadriceps). Under voluntary control."
          },
          {
            lead: "2. Smooth (Visceral) Muscle:",
            text: "Non-striated, smooth appearance. Fibres are fusiform (spindle-shaped, tapering at both ends) with a single central nucleus. Interconnected by cell junctions and enclosed in a connective tissue sheath. Found in walls of hollow visceral organs (stomach, intestines, blood vessels). Under involuntary control."
          },
          {
            lead: "3. Cardiac Muscle:",
            text: "Specialized contractile tissue found exclusively in the heart wall. Striated, branched cylindrical cells linked by specialized junctions. Contains Intercalated Discs—specialized transverse junctional zones containing gap junctions that lock cells together and permit instantaneous ionic transmission, causing the cardiac muscle cells to contract as a single functional syncytium. Under involuntary control."
          }
        ],
        customType: "muscle-table"
      }
    ]
  },
  {
    id: "neural-tissue",
    number: 5,
    title: "Neural Tissue",
    description: "Understand the body's rapid communication grid: excitable neurons, neuroglia (>50% volume), and the generation & conduction of electrical impulses.",
    cards: [
      {
        id: "neural-intro",
        title: "Neural Tissue & Sensory Responsiveness",
        paragraphs: [
          "Neural tissue exerts the greatest control over the body's responsiveness to changing internal and external conditions. It is specialized for receiving environmental stimuli, integrating information, and transmitting rapid electrical commands across the body.",
          "Neural tissue is composed of two primary cell populations: excitable neurons and protective neuroglial cells."
        ],
        customType: "neural-signal"
      },
      {
        id: "neurons-and-neuroglia",
        title: "Neurons & Neuroglial Cells",
        paragraphs: [
          "The nervous system balances excitable signaling cells with an overwhelming majority of protective companion cells:"
        ],
        bullets: [
          {
            lead: "Neurons (Excitable Functional Units):",
            text: "Neurons are the structural and functional units of the nervous system. Highly excitable cells capable of generating and transmitting electrochemical nerve impulses. A typical neuron consists of a Cell Body (soma/cyton containing the nucleus and cytoplasm), branched Dendrites (which receive incoming inputs), and a single elongated Axon (which conducts outgoing impulses away from the cell body)."
          },
          {
            lead: "Neuroglial Cells (Neuroglia):",
            text: "Non-excitable supporting cells that insulate, nourish, and protect neurons. Crucially, neuroglia are so abundant that they constitute MORE THAN HALF (>50%) of the total volume of neural tissue in the animal body!"
          }
        ]
      },
      {
        id: "neural-signal-mechanism",
        title: "How Neural Impulses Are Generated & Conducted",
        paragraphs: [
          "The transmission of a nerve impulse occurs in sequential steps from initial sensation to target response:"
        ],
        bullets: [
          {
            lead: "1. Generation of Disturbance:",
            text: "When a neuron receives an appropriate threshold stimulus at its receptive membrane, an electrical disturbance (action potential/depolarization) is generated."
          },
          {
            lead: "2. Rapid Axonal Propagation:",
            text: "The generated electrical wave travels swiftly and continuously along the plasma membrane (axolemma) of the neuron."
          },
          {
            lead: "3. Output Zone Events:",
            text: "Upon arriving at the neuron's axon terminals (the output zone / synapse), the electrical wave stimulates the release of chemical neurotransmitters or electrical signals."
          },
          {
            lead: "4. Target Cell Response:",
            text: "These terminal events can either stimulate (depolarize) or inhibit (hyperpolarize) adjacent downstream neurons, muscle cells (contraction), or glandular cells (secretion)."
          }
        ],
        highlightBox: {
          title: "NEET Must-Know Fact",
          text: "Neuroglial cells do not conduct impulses, yet they occupy >50% of brain volume. The output zone of a neuron converts electrical disturbances into chemical signals to coordinate animal physiology.",
          variant: "accent"
        }
      }
    ]
  }
];
