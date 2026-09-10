import { OrganismData } from "@/components/organisms/unified/OrganismShell";

export const rabbitData: OrganismData = {
  id: "rabbit",
  title: "Rabbit",
  scientificName: "Oryctolagus cuniculus",
  taxonomyMeta: "Phylum Chordata • Class Mammalia • Order Lagomorpha",
  icon: "🐇",
  topics: [
    {
      id: "taxonomy-features",
      title: "Taxonomy & Mammalian Traits",
      description: "Classification, homeothermic nature, pinnae, hair, and diaphragm.",
      cards: [
        {
          id: "sys-rabbit-pos",
          title: "Systematic Position of Oryctolagus cuniculus",
          paragraphs: [
            "The common European rabbit (Oryctolagus cuniculus) represents a warm-blooded, air-breathing terrestrial mammal belonging to order Lagomorpha.",
            "Characterized by hair-covered skin, long movable pinnae, mammary glands, muscular diaphragm, and four-chambered heart."
          ],
          image: {
            src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771313870/WhatsApp_Image_2026-02-17_at_12.58.31_plyvnf.jpg",
            alt: "European Rabbit - Oryctolagus cuniculus",
            caption: "European Rabbit (Oryctolagus cuniculus)"
          },
          table: {
            headers: ["Taxonomic Rank", "Classification", "Key Feature"],
            rows: [
              ["Phylum", "Chordata", "Notochord, dorsal hollow nerve cord, pharyngeal slits"],
              ["Subphylum", "Vertebrata", "Vertebral column, brain enclosed in cranium"],
              ["Class", "Mammalia", "Mammary glands, hair, homeothermic"],
              ["Order", "Lagomorpha", "Two pairs of upper incisors, herbivorous"],
              ["Genus", "Oryctolagus", "Burrowing social mammals"],
              ["Species", "cuniculus", "European rabbit"]
            ]
          }
        },
        {
          id: "rabbit-habits",
          title: "Habit & Habitat",
          bullets: [
            "Gentle and timid animals.",
            "Shows leaping movement and lives in burrows.",
            "Herbivorous animal — feeds on grasses, herbs, and vegetables.",
            "Gregarious animals (move in groups).",
            "Homeothermic (warm-blooded) — maintains constant body temperature."
          ]
        }
      ]
    },
    {
      id: "morphology-dentition",
      title: "External Morphology & Diastema Dentition",
      description: "Head, vibrissae, split lip, heterodont dentition, and diastema gap.",
      cards: [
        {
          id: "body-divisions-rabbit",
          title: "Body Divisions & Morphological Features",
          bullets: [
            "Head: Bears tactile vibrissae (whiskers), split upper lip (harelip) exposing chisel-like incisors, compound eyes, and large movable pinnae (external ears).",
            "Trunk: Divided into thorax and abdomen separated internally by a muscular diaphragm.",
            "Tail: Short, bushy tail elevated during alarm display.",
            "Limbs: Forelimbs shorter (pentadactyl); Hindlimbs longer, more muscular, adapted for leaping."
          ]
        },
        {
          id: "dental-formula-rabbit",
          title: "Heterodont Dentition & Diastema",
          paragraphs: [
            "Rabbits exhibit heterodont (different types of teeth), diphyodont (two sets of teeth — milk and permanent), and thecodont (teeth embedded in jaw sockets) dentition.",
            "Canines are completely absent, leaving a toothless gap called Diastema between incisors and premolars."
          ],
          callout: {
            type: "ncert",
            title: "Rabbit Dental Formula",
            text: "Upper Jaw: 2.0.3.3 / Lower Jaw: 1.0.2.3 (Total Teeth = 28)"
          }
        }
      ]
    },
    {
      id: "3d-models-anatomy",
      title: "Interactive 3D Anatomical Models",
      description: "Explore interactive 3D Sketchfab models of rabbit morphology, digestive, respiratory, and circulatory systems.",
      cards: [
        {
          id: "3d-morphology-model",
          title: "3D Rabbit Morphology & Skeleton",
          paragraphs: [
            "Examine the external morphology and skeletal structure of the rabbit in an interactive 3D model:"
          ],
          model3D: {
            src: "https://sketchfab.com/models/fc277f6e42464afeafc67716c9f77d33/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=0&ui_stop=0&ui_theme=dark",
            title: "Interactive 3D Rabbit Morphology Model"
          }
        },
        {
          id: "3d-digestive-model",
          title: "3D Digestive System Model",
          paragraphs: [
            "Explore the herbivorous alimentary canal with caecum and coprophagy adaptations in 3D:"
          ],
          model3D: {
            src: "https://sketchfab.com/models/6e7e453d001a4a5fb63315c97bdf6793/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=0&ui_stop=0&ui_theme=dark",
            title: "Interactive 3D Rabbit Digestive System"
          }
        },
        {
          id: "3d-respiratory-model",
          title: "3D Respiratory System Model",
          paragraphs: [
            "Study the diaphragmatic lung respiration system with spongy paired lungs:"
          ],
          model3D: {
            src: "https://sketchfab.com/models/f36876bd8e82467fbfaa005f8fed3d15/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=0&ui_stop=0&ui_theme=dark",
            title: "Interactive 3D Rabbit Respiratory System"
          }
        },
        {
          id: "3d-circulatory-model",
          title: "3D Circulatory System Model",
          paragraphs: [
            "Examine the 4-chambered heart and complete double circulation in 3D:"
          ],
          model3D: {
            src: "https://sketchfab.com/models/24ab555c6b3d4b66a906f17572f15773/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=0&ui_stop=0&ui_theme=dark",
            title: "Interactive 3D Rabbit Circulatory System"
          }
        }
      ]
    },
    {
      id: "digestive-coprophagy",
      title: "Digestive System & Coprophagy",
      description: "Herbivorous alimentary canal, caecum fermentation, and caecotrophy.",
      cards: [
        {
          id: "caecotrophy-rabbit",
          title: "Caecum Fermentation & Coprophagy (Caecotrophy)",
          paragraphs: [
            "Alimentary canal is long and adapted for digesting cellulose-rich vegetation.",
            "Large sac-like caecum located between small and large intestine contains symbiotic bacteria synthesizing cellulase."
          ],
          steps: [
            { num: "1", title: "Ingestion", desc: "Plant matter chewed by incisors & molars → passes to stomach & small intestine." },
            { num: "2", title: "Caecal Fermentation", desc: "Cellulose fermented by bacterial flora in caecum, producing soft nutrient pellets (caecotrophes)." },
            { num: "3", title: "Night Coprophagy", desc: "Rabbit re-ingests soft night pellets directly from anus to absorb Vitamin B12 and amino acids." }
          ],
          callout: {
            type: "key",
            title: "Why Coprophagy?",
            text: "Caecotrophy allows rabbits to extract maximum nutrition from cellulose-rich plant diet by re-processing food through the digestive system twice."
          }
        }
      ]
    },
    {
      id: "respiratory-circulatory",
      title: "Respiration & Double Circulation",
      description: "Diaphragmatic lung respiration, 4-chambered heart, heart valves, and non-nucleated RBCs.",
      cards: [
        {
          id: "respiratory-rabbit",
          title: "Pulmonary Respiration & Obligate Nose Breathing",
          paragraphs: [
            "Respiration takes place through a pair of soft, pinkish, spongy lungs enclosed in the thoracic cavity.",
            "Rabbits are obligate nasal breathers due to the position of their epiglottis high behind the soft palate."
          ],
          bullets: [
            "Respiratory Pathway: External nostrils → Nasal passages → Pharynx → Glottis (protected by epiglottis) → Larynx → Trachea → Bronchi → Bronchioles → Alveoli.",
            "Lung Lobes: Right Lung consists of 4 lobes; Left Lung consists of 2 lobes.",
            "Larynx (Voice Box): Located at the upper part of the windpipe; supported by 4 cartilaginous plates with vocal cords.",
            "Trachea: Supported by C-shaped cartilaginous rings preventing collapse during breathing.",
            "Double-walled Pleura: Each lung is enclosed within a double-layered pleural sac with lubricating pleural fluid.",
            "Mechanism: Active inspiration via contraction of muscular diaphragm and intercostal muscles; passive expiration."
          ],
          table: {
            headers: ["Structure", "Anatomical Feature & Function"],
            rows: [
              ["Right Lung", "4 distinct lobes for maximum surface area"],
              ["Left Lung", "2 lobes accommodating the heart apex"],
              ["Diaphragm", "Muscular partition between thorax and abdomen; primary breathing muscle in mammals"],
              ["Obligate Breathing", "Exclusively breathes through nostrils, not mouth"]
            ]
          }
        },
        {
          id: "circulatory-rabbit",
          title: "4-Chambered Heart, Valves & Venous Circulation",
          paragraphs: [
            "The heart is pear-shaped, muscular, and situated in the thoracic cavity between the two lungs, enclosed in a double-layered pericardium."
          ],
          bullets: [
            "Complete double circulation: 4 separate chambers (Right & Left Auricles, Right & Left Ventricles) preventing any mixing of oxygenated and deoxygenated blood.",
            "Right Auriculo-Ventricular Opening: Guarded by the Tricuspid Valve.",
            "Left Auriculo-Ventricular Opening: Guarded by the Bicuspid (Mitral) Valve.",
            "Semilunar Valves: Located at the origin of the pulmonary trunk (from right ventricle) and systemic aorta (from left ventricle).",
            "Venous Return: Right auricle receives deoxygenated blood from the body via two precaval (superior vena cava) and one postcaval (inferior vena cava) veins.",
            "Pulmonary Circulation: Left auricle receives oxygenated blood from lungs through pulmonary veins.",
            "Non-Nucleated RBCs: Mature mammalian erythrocytes are small, circular, biconcave, and lack a nucleus to maximize oxygen transport capacity."
          ]
        }
      ]
    },
    {
      id: "nervous-system",
      title: "Nervous System & Brain Anatomy",
      description: "CNS, PNS (12 cranial + 37 spinal nerves), ANS, meninges, and corpus callosum.",
      cards: [
        {
          id: "rabbit-cns-pns",
          title: "CNS, PNS & Autonomic Nervous System",
          paragraphs: [
            "The nervous system is highly organized and divided into three interrelated divisions:",
            "Central Nervous System (CNS), Peripheral Nervous System (PNS), and Autonomic Nervous System (ANS)."
          ],
          table: {
            headers: ["Division", "Components", "Function & Features"],
            rows: [
              ["Central Nervous System (CNS)", "Brain & Spinal Cord", "Higher cognitive control, reflex integration, and sensory processing"],
              ["Peripheral Nervous System (PNS)", "12 pairs Cranial Nerves + 37 pairs Spinal Nerves", "Connects peripheral organs and limbs to CNS"],
              ["Autonomic Nervous System (ANS)", "Sympathetic & Parasympathetic chains", "Involuntary regulation of viscera, heart rate, peristalsis, and gland secretions"]
            ]
          }
        },
        {
          id: "rabbit-brain-meninges",
          title: "Brain Regions & Triple Meninges",
          paragraphs: [
            "The brain is situated within the cranial cavity (cranium) and is protected by three distinct meningeal membranes:",
            "1. Duramater (tough outer fibrous layer), 2. Arachnoid membrane (delicate, vascular middle layer), and 3. Piamater (thin, highly vascular inner layer closely adhering to nervous tissue)."
          ],
          steps: [
            { num: "1", title: "Forebrain (Prosencephalon)", desc: "Consists of olfactory lobes (smell), two large cerebral hemispheres, and diencephalon. The cerebral hemispheres are uniquely interconnected by a broad transverse nerve band called the Corpus Callosum — a defining mammalian hallmark." },
            { num: "2", title: "Midbrain (Mesencephalon)", desc: "Contains a pair of prominent optic lobes (corpora bigemina/quadrigemina) responsible for vision and pupillary reflexes." },
            { num: "3", title: "Hindbrain (Rhombencephalon)", desc: "Includes cerebellum (muscular coordination and posture), pons varolii (neural bridge between hemispheres), and medulla oblongata (vital involuntary control center for respiration, circulation, and digestion)." },
            { num: "4", title: "Spinal Cord", desc: "Extends from medulla oblongata through foramen magnum into the vertebral canal, issuing 37 pairs of spinal nerves." }
          ],
          callout: {
            type: "key",
            title: "Mammalian Hallmark: Corpus Callosum",
            text: "The Corpus Callosum is an exclusive mammalian evolutionary achievement connecting the left and right cerebral hemispheres, facilitating complex bilateral coordination and learning."
          }
        }
      ]
    },
    {
      id: "excretory-system",
      title: "Excretory System",
      description: "Metanephric kidneys, nephrons, and ureotelic excretion.",
      cards: [
        {
          id: "rabbit-kidneys",
          title: "Metanephric Kidneys & Excretion",
          paragraphs: [
            "Rabbits possess a pair of metanephric (advanced) kidneys — dark red, bean-shaped organs located in the abdominal cavity."
          ],
          bullets: [
            "Each kidney contains numerous nephrons (structural and functional units).",
            "Ureotelic: Excretes urea as the primary nitrogenous waste.",
            "Urine flows: Kidneys → Ureters → Urinary Bladder → Urethra → Outside.",
            "Kidneys also play a role in osmoregulation (water-salt balance)."
          ]
        }
      ]
    },
    {
      id: "reproductive-system",
      title: "Reproductive System",
      description: "Viviparous reproduction, internal fertilization, and placental development.",
      cards: [
        {
          id: "reproduction-rabbit",
          title: "Viviparous Reproduction & Placenta",
          paragraphs: [
            "Dioecious mammals with distinct sexual dimorphism.",
            "Fertilization is internal; females are viviparous and nourish embryos via a diskoid allantoic placenta."
          ],
          bullets: [
            "Male Organs: Pair of testes (in scrotal sacs), vasa deferentia, urethra, penis, and accessory glands (prostate, Cowper's, perineal).",
            "Female Organs: Pair of ovaries, oviducts (Fallopian tubes), bipartite uterus, vagina, and accessory glands (Cowper's, perineal).",
            "Urinogenital Canal (Vestibule): Formed by the union of urinary bladder and vagina, opening through the external slit-like vulva.",
            "Internal Fertilization: Sperm deposited in female reproductive tract during copulation.",
            "Placenta: Diskoid allantoic placenta for nutrient and gas exchange between mother and fetus.",
            "Gestation Period: Approximately 30 days.",
            "Young are born relatively helpless (altricial) with closed eyes."
          ]
        },
        {
          id: "3d-repro-female",
          title: "3D Female Reproductive System",
          model3D: {
            src: "https://sketchfab.com/models/49704303b5374c42b948ea6e755628af/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=0&ui_stop=0&ui_theme=dark",
            title: "Interactive 3D Female Reproductive System"
          }
        },
        {
          id: "3d-repro-male",
          title: "3D Male Reproductive System",
          model3D: {
            src: "https://sketchfab.com/models/5f740041da5d40fd8e52189cddd1c9a0/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=0&ui_stop=0&ui_theme=dark",
            title: "Interactive 3D Male Reproductive System"
          }
        }
      ]
    }
  ]
};
