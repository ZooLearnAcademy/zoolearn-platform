export interface CourseDetail {
  exp: string;
  dur: string;
  imp: string;
}

export interface CareerItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  categoryId: string;
  badge?: string;
  secondaryBadge?: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  bsc: string[];
  msc: string[];
  phd: string[];
  isTopChoice?: boolean;
  topSectors?: string[];
  keySkills?: string[];
}

export interface ScopeCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  salaryRange: string;
  count: number;
  topRoles: string[];
  gradient: string;
  color: string;
}

export const courseDetails: Record<string, CourseDetail> = {
  "B.Sc. Zoology": {
    exp: "Scientific study of animals covering structure, physiology, behaviour, evolution, genetics and ecology.",
    dur: "3 years",
    imp: "This course forms the foundation of animal sciences. It prepares students for higher studies and careers in wildlife biology, ecology, conservation, veterinary research, zoological studies and teaching."
  },
  "B.Sc. Biotechnology": {
    exp: "Integration of biology with modern technology including genetics, molecular biology and bioinformatics.",
    dur: "3 years",
    imp: "This course is central to modern science and industry. It enables careers in biotechnology firms, pharmaceuticals, diagnostics, agriculture and advanced molecular research."
  },
  "B.Sc. Life Sciences": {
    exp: "Interdisciplinary study of biology at molecular, cellular, organismal and ecological levels.",
    dur: "3 years",
    imp: "It provides academic flexibility and a broad base, allowing students to specialize later in diverse biological fields such as ecology, genetics or biotechnology."
  },
  "B.Sc. Animal Science": {
    exp: "Study of animal nutrition, breeding, physiology, and management.",
    dur: "4 years",
    imp: "Prepares for careers in livestock management, animal research, and agriculture."
  },
  "B.Sc. Genetics": {
    exp: "Study of genes, heredity, genetic variation, and molecular genetics.",
    dur: "3 years",
    imp: "Foundation for careers in genetic counseling, research, biotechnology, and medicine."
  },
  "B.Sc. Bioinformatics": {
    exp: "Integration of biology, computer science, and information technology.",
    dur: "3 years",
    imp: "Crucial for genomic research, drug discovery, and biological data analysis."
  },
  "B.Sc. Environmental Science": {
    exp: "Study of environmental systems, conservation, pollution control, and sustainable development.",
    dur: "3 years",
    imp: "Essential for careers in environmental consulting, conservation, policy-making, and sustainability management."
  },
  "B.Sc. Physiology": {
    exp: "Study of biological functions and processes in living organisms.",
    dur: "3 years",
    imp: "Important for understanding how organisms function at cellular and systemic levels."
  },
  "B.Sc. Botany": {
    exp: "Study of plant biology, classification, and ecology.",
    dur: "3 years",
    imp: "Foundation for plant sciences and botanical research."
  },
  "B.Sc. Medical Lab Tech": {
    exp: "Training in laboratory techniques for medical diagnosis and research.",
    dur: "3 years",
    imp: "Prepares for careers in diagnostic laboratories and healthcare facilities."
  },
  "B.Sc. Marine Biology": {
    exp: "Study of marine organisms, ocean ecosystems, and marine conservation.",
    dur: "3 years",
    imp: "Foundation for careers in marine research, conservation, fisheries, and oceanography."
  },
  "B.Sc. Fisheries Science": {
    exp: "Study of fish biology, aquaculture, fisheries management, and aquatic ecosystems.",
    dur: "4 years",
    imp: "Crucial for careers in fisheries departments, aquaculture industries, and marine resource management."
  },
  "B.Sc. Veterinary Science": {
    exp: "Study of animal health, diseases, surgery, and animal husbandry.",
    dur: "5 years",
    imp: "Essential for becoming a veterinarian and for careers in animal healthcare, research, and public health."
  },
  "B.V.Sc & AH": {
    exp: "Bachelor of Veterinary Science and Animal Husbandry - professional degree for veterinarians.",
    dur: "5 years",
    imp: "Mandatory for practicing veterinary medicine and surgery in India."
  },
  "B.Sc. Oceanography": {
    exp: "Study of oceans, their physical, chemical, and biological properties.",
    dur: "3 years",
    imp: "Essential for marine research, conservation, and ocean resource management."
  },
  "B.Sc. Aquaculture": {
    exp: "Study of aquatic organism farming, breeding, and management.",
    dur: "3 years",
    imp: "Important for sustainable seafood production and aquatic resource management."
  },
  "B.Sc. Forestry": {
    exp: "Study of forest management, conservation, silviculture, and wildlife habitat management.",
    dur: "4 years",
    imp: "Prepares for forest services, conservation organizations, and sustainable forest management careers."
  },
  "B.Sc. Microbiology": {
    exp: "Study of microorganisms including bacteria, viruses, fungi, and their applications.",
    dur: "3 years",
    imp: "Important for healthcare, pharmaceutical, food, and environmental industries."
  },
  "B.Sc. Forensic Science": {
    exp: "Study of forensic biology, DNA profiling, crime scene analysis, and criminalistics.",
    dur: "3 years",
    imp: "Prepares for crime laboratories, investigative agencies, and forensic research."
  },
  "B.Sc. Public Health": {
    exp: "Study of population health, epidemiology, healthcare systems, and prevention.",
    dur: "3 years",
    imp: "Foundation for public health agencies, WHO/UN programs, and healthcare NGOs."
  },
  "M.Sc. Zoology": {
    exp: "Advanced animal biology covering physiology, ecology, evolution, and genetics.",
    dur: "2 years",
    imp: "Strong foundation for research, teaching, and specialized biological careers."
  },
  "M.Sc. Wildlife Biology": {
    exp: "Advanced study of wildlife species, behavior, conservation biology, and field research.",
    dur: "2 years",
    imp: "Essential for wildlife research, conservation projects, and doctoral studies."
  },
  "M.Sc. Ecology": {
    exp: "Study of ecosystems, species interactions, and environmental relationships.",
    dur: "2 years",
    imp: "Backbone of environmental research, conservation, and sustainability studies."
  },
  "M.Sc. Marine Biology": {
    exp: "Advanced study of marine organisms, ecosystems, and ocean conservation.",
    dur: "2 years",
    imp: "Vital for marine research institutions, conservation, and fisheries management."
  },
  "M.Sc. Genetics": {
    exp: "Advanced genetic mechanisms, molecular heredity, gene mapping, and genomics.",
    dur: "2 years",
    imp: "Key for clinical diagnostics, genetic counseling, and agricultural biotechnology."
  },
  "M.Sc. Biotechnology": {
    exp: "Industrial biotechnology, recombinant DNA technology, and bioprocessing.",
    dur: "2 years",
    imp: "Critical for high-paying pharmaceutical, diagnostic, and biomanufacturing roles."
  },
  "M.Sc. Bioinformatics": {
    exp: "Computational biology, sequence alignment, protein modeling, and big data analysis.",
    dur: "2 years",
    imp: "High demand in genomics companies, pharma drug discovery, and AI biology research."
  },
  "M.Sc. Forensic Science": {
    exp: "Forensic DNA typing, serology, toxicology, and evidence analysis.",
    dur: "2 years",
    imp: "Direct entry to state/central forensic labs, CBI, and police departments."
  },
  "M.Sc. Entomology": {
    exp: "Advanced study of insect morphology, taxonomy, physiology, and agricultural pest management.",
    dur: "2 years",
    imp: "Vital for ICAR research, agrochemical firms, and vector-borne disease control."
  },
  "M.Sc. Neurobiology": {
    exp: "Study of neural structures, synapses, neurochemistry, and behavioral circuits.",
    dur: "2 years",
    imp: "Foundation for cognitive neuroscience, brain research, and neurological therapeutics."
  },
  "M.Sc. Environmental Science": {
    exp: "Environmental assessment, pollution mitigation, environmental law, and ESG management.",
    dur: "2 years",
    imp: "Essential for corporate ESG consulting, EIA audits, and government pollution boards."
  },
  "M.Sc. Public Health": {
    exp: "Epidemiological analysis, disease surveillance, biostatistics, and global health policy.",
    dur: "2 years",
    imp: "Leads to leadership roles in WHO, CDC, health ministries, and international NGOs."
  },
  "Ph.D. Zoology": {
    exp: "Doctoral research in animal biology, ecology, physiology, or evolution.",
    dur: "3–6 years",
    imp: "Academic professorship, principal investigator roles, and research leadership in national laboratories."
  },
  "Ph.D. Wildlife Biology": {
    exp: "Doctoral research on wildlife species, behavior, and conservation.",
    dur: "3–5 years",
    imp: "Leadership roles in wildlife research, conservation, and policy-making."
  },
  "Ph.D. Biotechnology": {
    exp: "Original research on molecular mechanisms, gene editing, or bioprocess design.",
    dur: "3–5 years",
    imp: "Leads to Chief Scientist positions, patent development, and biotechnology startup leadership."
  },
  "Ph.D. Genomics": {
    exp: "Next-generation sequencing analysis, structural genomics, and computational biology.",
    dur: "3–5 years",
    imp: "Top tier positions in genome research centers, personalized medicine, and pharma R&D."
  },
  "Ph.D. Ecology": {
    exp: "Advanced ecosystem research and ecological theory development.",
    dur: "3–5 years",
    imp: "Climate change research, conservation planning, and sustainability science leadership."
  }
};

export const scopeCategories: ScopeCategory[] = [
  {
    id: "general-zoology",
    name: "General Zoology & Biology Research",
    shortName: "Zoology & Research",
    description: "Core biological science research, animal morphology, taxonomy, evolutionary mechanics, and experimental systems.",
    iconName: "Microscope",
    salaryRange: "₹ 3–12 LPA",
    count: 18,
    topRoles: ["Zoologist", "Animal Biologist", "Field Biologist", "Research Biologist", "Systems Biologist"],
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    color: "emerald"
  },
  {
    id: "wildlife-ecology",
    name: "Wildlife, Ecology & Environmental Careers",
    shortName: "Wildlife & Ecology",
    description: "Field conservation, wildlife sanctuary management, IFS forest services, and ecological ecosystem preservation.",
    iconName: "Tree",
    salaryRange: "₹ 3–18 LPA",
    count: 16,
    topRoles: ["Wildlife Biologist", "Forest Officer (IFS)", "Ecologist", "Wildlife Manager", "Conservation Scientist"],
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    color: "amber"
  },
  {
    id: "marine-fisheries",
    name: "Marine, Aquatic & Fisheries Sciences",
    shortName: "Marine & Fisheries",
    description: "Oceanographic exploration, marine biodiversity conservation, commercial aquaculture, and aquatic pathology.",
    iconName: "Waves",
    salaryRange: "₹ 4–12 LPA",
    count: 11,
    topRoles: ["Marine Biologist", "Fisheries Scientist", "Biological Oceanographer", "Aquaculture Specialist"],
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    color: "cyan"
  },
  {
    id: "animal-health",
    name: "Animal Health & Medical Sciences",
    shortName: "Medical & Vet Health",
    description: "Veterinary clinical practice, veterinary pathology, diagnostic pharmacology, and preclinical biomedical investigation.",
    iconName: "Stethoscope",
    salaryRange: "₹ 4–14 LPA",
    count: 13,
    topRoles: ["Veterinarian", "Veterinary Pathologist", "Biomedical Scientist", "Clinical Research Associate"],
    gradient: "from-teal-500/20 via-teal-500/5 to-transparent",
    color: "teal"
  },
  {
    id: "biotechnology",
    name: "Biotechnology & Modern Technology Careers",
    shortName: "Biotech & Genomics",
    description: "CRISPR gene editing, bioinformatics algorithms, regenerative medicine, and synthetic biological engineering.",
    iconName: "Dna",
    salaryRange: "₹ 4–18 LPA",
    count: 12,
    topRoles: ["Biotechnologist", "Genetic Engineer", "Genomics Scientist", "Bioinformatics Analyst"],
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    color: "purple"
  },
  {
    id: "microbiology",
    name: "Microbiology, Immunology & Parasitology",
    shortName: "Microbiology & Immuno",
    description: "Pathogen epidemiology, vaccine development, virology, immunology, and zoonotic disease surveillance.",
    iconName: "Virus",
    salaryRange: "₹ 3–11 LPA",
    count: 9,
    topRoles: ["Microbiologist", "Immunologist", "Virologist", "Infection Control Scientist"],
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    color: "indigo"
  },
  {
    id: "entomology",
    name: "Entomology & Invertebrate Specializations",
    shortName: "Entomology & Insects",
    description: "Agricultural pest control, forensic insect evidence, apiculture sciences, and sericulture management.",
    iconName: "Bug",
    salaryRange: "₹ 3–10 LPA",
    count: 9,
    topRoles: ["Entomologist", "Agricultural Entomologist", "Forensic Entomologist", "Apiculturist"],
    gradient: "from-yellow-500/20 via-yellow-500/5 to-transparent",
    color: "yellow"
  },
  {
    id: "paleontology",
    name: "Paleontology & Evolution Careers",
    shortName: "Paleontology",
    description: "Fossil excavation, vertebrate paleobiology, evolutionary reconstruction, and natural history curatorship.",
    iconName: "Bone",
    salaryRange: "₹ 4–12 LPA",
    count: 6,
    topRoles: ["Paleontologist", "Vertebrate Paleontologist", "Fossil Conservationist", "Museum Curator"],
    gradient: "from-stone-500/20 via-stone-500/5 to-transparent",
    color: "stone"
  },
  {
    id: "neuroscience",
    name: "Neuroscience & Behavior Careers",
    shortName: "Neuro & Ethology",
    description: "Animal ethology, neurogenetic mechanisms, cognitive neuroscience, and behavioural psychobiology.",
    iconName: "Brain",
    salaryRange: "₹ 3–14 LPA",
    count: 6,
    topRoles: ["Animal Behaviourist", "Neurobiologist", "Behavioral Neuroscientist", "Cognitive Ethologist"],
    gradient: "from-pink-500/20 via-pink-500/5 to-transparent",
    color: "pink"
  },
  {
    id: "forensic",
    name: "Forensic & Applied Sciences",
    shortName: "Forensics & Crime",
    description: "Wildlife crime investigation, DNA forensic profiling, environmental forensics, and toxicology analysis.",
    iconName: "Fingerprint",
    salaryRange: "₹ 4–12 LPA",
    count: 6,
    topRoles: ["Forensic Biologist", "Wildlife Forensic Expert", "DNA Fingerprinting Analyst", "Crime Lab Analyst"],
    gradient: "from-slate-500/20 via-slate-500/5 to-transparent",
    color: "slate"
  },
  {
    id: "corporate",
    name: "Corporate & Business Careers",
    shortName: "Corporate & Biotech",
    description: "Life sciences management consulting, pharma product strategy, bio-startup entrepreneurship, and ESG advisory.",
    iconName: "Building2",
    salaryRange: "₹ 5–50+ LPA",
    count: 7,
    topRoles: ["Life Science Consultant", "Medical Science Liaison", "Bio-Startup Founder", "Pharma Specialist"],
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    color: "blue"
  },
  {
    id: "animal-welfare",
    name: "Animal Care, Welfare & Zoo Careers",
    shortName: "Animal Welfare & Zoos",
    description: "Zoological curation, captive animal ethology, shelter management, and veterinary welfare standards.",
    iconName: "Heart",
    salaryRange: "₹ 3–9 LPA",
    count: 7,
    topRoles: ["Zoo Curator", "Zoo Biologist", "Animal Welfare Officer", "Pet Nutrition Consultant"],
    gradient: "from-orange-500/20 via-orange-500/5 to-transparent",
    color: "orange"
  },
  {
    id: "education",
    name: "Education & Science Communication",
    shortName: "Education & Media",
    description: "University professorships, science journalism, wildlife documentary research, and ed-tech curriculum.",
    iconName: "GraduationCap",
    salaryRange: "₹ 3–11 LPA",
    count: 9,
    topRoles: ["Professor / Researcher", "Science Communicator", "Science Writer", "EdTech Specialist"],
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    color: "indigo"
  },
  {
    id: "government",
    name: "Government & Policy Careers",
    shortName: "Government & IFS",
    description: "Indian Forest Service (UPSC), CSIR/ICMR national research institutions, DRDO/ISRO labs, and state biodiversity boards.",
    iconName: "Landmark",
    salaryRange: "₹ 5–18 LPA",
    count: 8,
    topRoles: ["Indian Forest Service (IFS)", "State Forest Services", "ICAR / CSIR Scientist", "Environmental Officer"],
    gradient: "from-emerald-600/20 via-emerald-600/5 to-transparent",
    color: "emerald"
  },
  {
    id: "international",
    name: "International & Future-Oriented Roles",
    shortName: "International & UN",
    description: "United Nations environmental programs (UNEP), WHO global health, FAO fisheries, and NASA/ISRO space biology.",
    iconName: "Globe",
    salaryRange: "₹ 10–40 LPA",
    count: 6,
    topRoles: ["UN Biodiversity Consultant", "WHO Research Associate", "FAO Fisheries Officer", "Space Biology Researcher"],
    gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
    color: "sky"
  }
];

export const allCareers: CareerItem[] = [
  // 1. General Zoology & Biology Research
  {
    id: "zoologist",
    title: "Zoologist",
    desc: "Studies animal biology, behavior, classification, and evolution across all animal groups.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "TOP CHOICE",
    secondaryBadge: "RESEARCH",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Biotechnology"],
    msc: ["M.Sc. Zoology", "M.Sc. Animal Science", "M.Sc. Wildlife Biology"],
    phd: ["Ph.D. Zoology", "Ph.D. Animal Biology"],
    isTopChoice: true,
    topSectors: ["Zoological Survey of India (ZSI)", "Wildlife Institutes", "Universities", "Conservation NGOs"],
    keySkills: ["Animal Physiology", "Taxonomy", "Evolutionary Biology", "Field Research"]
  },
  {
    id: "animal-biologist",
    title: "Animal Biologist",
    desc: "Focuses on animal structure, function, genetics, and physiology across species.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "TOP CHOICE",
    secondaryBadge: "RESEARCH",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Animal Science"],
    msc: ["M.Sc. Zoology", "M.Sc. Animal Biology", "M.Sc. Comparative Physiology"],
    phd: ["Ph.D. Animal Biology", "Ph.D. Zoology"],
    isTopChoice: true,
    topSectors: ["Veterinary R&D", "Animal Husbandry Boards", "Research Centers"],
    keySkills: ["Organismal Biology", "Genetics", "Morphology", "Comparative Anatomy"]
  },
  {
    id: "field-biologist",
    title: "Field Biologist",
    desc: "Conducts biological research in natural habitats, studying organisms in their environment.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "TOP CHOICE",
    secondaryBadge: "FIELDWORK",
    salary: "₹ 3–6 LPA",
    salaryMin: 3,
    salaryMax: 6,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Environmental Science"],
    msc: ["M.Sc. Ecology", "M.Sc. Wildlife Biology", "M.Sc. Field Biology"],
    phd: ["Ph.D. Ecology", "Ph.D. Wildlife Biology"],
    isTopChoice: true,
    topSectors: ["National Parks", "Field Stations", "WWF", "Forest Departments"],
    keySkills: ["Field Sampling", "Telemetry", "GIS Mapping", "Species Identification"]
  },
  {
    id: "research-biologist",
    title: "Research Biologist",
    desc: "Conducts scientific research in labs or field settings to advance biological knowledge.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "TOP CHOICE",
    secondaryBadge: "RESEARCH",
    salary: "₹ 4–9 LPA",
    salaryMin: 4,
    salaryMax: 9,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Zoology", "M.Sc. Biotechnology", "M.Sc. Research Methodology"],
    phd: ["Ph.D. Zoology", "Ph.D. Life Sciences"],
    isTopChoice: true,
    topSectors: ["CSIR Labs", "ICMR Institutes", "University Research Wings"],
    keySkills: ["Experimental Design", "Data Analytics", "Grant Writing", "Molecular Assays"]
  },
  {
    id: "experimental-biologist",
    title: "Experimental Biologist",
    desc: "Designs and conducts experiments to understand biological processes and mechanisms.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "TOP CHOICE",
    secondaryBadge: "RESEARCH",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Experimental Biology", "M.Sc. Research Methods"],
    phd: ["Ph.D. Zoology", "Ph.D. Experimental Biology"],
    isTopChoice: true,
    topSectors: ["Biopharma Labs", "Academic Institutes", "Preclinical Facilities"],
    keySkills: ["Hypothesis Testing", "Bio-imaging", "Statistical Modeling", "Lab Protocols"]
  },
  {
    id: "systems-biologist",
    title: "Systems Biologist",
    desc: "Studies complex biological systems using computational and mathematical models.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "TOP CHOICE",
    secondaryBadge: "TECH & BIO",
    salary: "₹ 6–12 LPA",
    salaryMin: 6,
    salaryMax: 12,
    bsc: ["B.Sc. Biotechnology", "B.Sc. Life Sciences", "B.Sc. Bioinformatics"],
    msc: ["M.Sc. Systems Biology", "M.Sc. Bioinformatics"],
    phd: ["Ph.D. Systems Biology", "Ph.D. Computational Biology"],
    isTopChoice: true,
    topSectors: ["AI in Biology Labs", "Computational Pharma", "Genomics Centers"],
    keySkills: ["Network Biology", "Python / R", "Mathematical Modeling", "Multi-Omics"]
  },
  {
    id: "evolutionary-biologist",
    title: "Evolutionary Biologist",
    desc: "Studies evolution, adaptation, and genetic changes in populations over time.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "SPECIALIZED",
    secondaryBadge: "ACADEMIC",
    salary: "₹ 5–9 LPA",
    salaryMin: 5,
    salaryMax: 9,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Genetics"],
    msc: ["M.Sc. Evolutionary Biology", "M.Sc. Genetics"],
    phd: ["Ph.D. Evolutionary Biology"],
    topSectors: ["Evolutionary Research Units", "Universities", "Natural History Museums"],
    keySkills: ["Phylogenetics", "Population Genetics", "Speciation Analysis"]
  },
  {
    id: "comparative-anatomist",
    title: "Comparative Anatomist",
    desc: "Compares anatomical structures across different animal species.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "ANATOMY",
    secondaryBadge: "RESEARCH",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Zoology", "M.Sc. Anatomy", "M.Sc. Comparative Anatomy"],
    phd: ["Ph.D. Comparative Anatomy", "Ph.D. Zoology"],
    topSectors: ["Medical Colleges", "Veterinary Research", "Paleoanatomy Institutes"],
    keySkills: ["Dissection Techniques", "Morphometrics", "Histological Staining"]
  },
  {
    id: "animal-physiologist",
    title: "Animal Physiologist",
    desc: "Studies functions and mechanisms in living animals at organ/system levels.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "PHYSIOLOGY",
    secondaryBadge: "MEDICAL",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Physiology"],
    msc: ["M.Sc. Animal Physiology", "M.Sc. Zoology"],
    phd: ["Ph.D. Animal Physiology"],
    topSectors: ["Endocrinology Labs", "Pharma Safety Assays", "Animal Research Labs"],
    keySkills: ["Endocrine Assays", "Electrophysiology", "Metabolic Profiling"]
  },
  {
    id: "taxonomist",
    title: "Taxonomist",
    desc: "Classifies, names, and describes organisms based on their characteristics.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "TAXONOMY",
    secondaryBadge: "FIELD & LAB",
    salary: "₹ 3–6 LPA",
    salaryMin: 3,
    salaryMax: 6,
    bsc: ["B.Sc. Zoology", "B.Sc. Botany", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Taxonomy", "M.Sc. Zoology/Botany"],
    phd: ["Ph.D. Taxonomy", "Ph.D. Systematics"],
    topSectors: ["ZSI", "Botanical Survey of India", "Museums"],
    keySkills: ["Binomial Nomenclature", "Cladistics", "DNA Barcoding"]
  },
  {
    id: "systematist",
    title: "Systematist",
    desc: "Studies evolutionary relationships and phylogeny among organisms.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "SYSTEMATICS",
    secondaryBadge: "RESEARCH",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Systematics", "M.Sc. Evolutionary Biology"],
    phd: ["Ph.D. Systematics", "Ph.D. Evolutionary Biology"],
    topSectors: ["Phylogenetic Labs", "Academic Institutes"],
    keySkills: ["Cladistics", "Molecular Phylogeny"]
  },
  {
    id: "morphologist",
    title: "Morphologist",
    desc: "Studies form and structure of organisms and their specific structural features.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "MORPHOLOGY",
    secondaryBadge: "LAB",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Morphology", "M.Sc. Zoology"],
    phd: ["Ph.D. Morphology", "Ph.D. Zoology"],
    topSectors: ["Museums", "Taxonomy Centers"],
    keySkills: ["Morphometry", "Structural Analysis"]
  },
  {
    id: "histologist",
    title: "Histologist",
    desc: "Studies microscopic structure of tissues and cells in animals.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "MICROSCOPY",
    secondaryBadge: "LAB",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Medical Lab Tech"],
    msc: ["M.Sc. Histology", "M.Sc. Pathology"],
    phd: ["Ph.D. Histology"],
    topSectors: ["Pathology Labs", "Medical Research Units"],
    keySkills: ["Microtomy", "Tissue Staining", "Electron Microscopy"]
  },
  {
    id: "cytologist",
    title: "Cytologist",
    desc: "Studies structure, function, and chemistry of animal and plant cells.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "CELL BIO",
    secondaryBadge: "LAB",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Biotechnology"],
    msc: ["M.Sc. Cytology", "M.Sc. Cell Biology"],
    phd: ["Ph.D. Cytology", "Ph.D. Cell Biology"],
    topSectors: ["Cancer Centers", "Diagnostic Labs"],
    keySkills: ["Cell Staining", "Cytogenetics", "Fluorescence Microscopy"]
  },
  {
    id: "developmental-biologist",
    title: "Developmental Biologist",
    desc: "Studies growth and development processes from embryo to adult organisms.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "EMBRYOLOGY",
    secondaryBadge: "RESEARCH",
    salary: "₹ 5–10 LPA",
    salaryMin: 5,
    salaryMax: 10,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Developmental Biology", "M.Sc. Embryology"],
    phd: ["Ph.D. Developmental Biology"],
    topSectors: ["Reproductive Medicine Centers", "Developmental Labs"],
    keySkills: ["Embryo Micro-injection", "Morphogen Assays"]
  },
  {
    id: "molecular-biologist",
    title: "Molecular Biologist",
    desc: "Studies biological activity at molecular level, focusing on DNA, RNA, proteins.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "TOP CHOICE",
    secondaryBadge: "BIOTECH",
    salary: "₹ 5–11 LPA",
    salaryMin: 5,
    salaryMax: 11,
    bsc: ["B.Sc. Biotechnology", "B.Sc. Life Sciences", "B.Sc. Zoology"],
    msc: ["M.Sc. Molecular Biology", "M.Sc. Biotechnology"],
    phd: ["Ph.D. Molecular Biology"],
    isTopChoice: true,
    topSectors: ["Biopharma Companies", "Genome Centers", "Diagnostic Labs"],
    keySkills: ["PCR / qPCR", "Western Blotting", "Gel Electrophoresis", "Cloning"]
  },
  {
    id: "cell-biologist",
    title: "Cell Biologist",
    desc: "Studies cell structure, function, and interactions at cellular level.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "CELL SCIENCE",
    secondaryBadge: "RESEARCH",
    salary: "₹ 5–10 LPA",
    salaryMin: 5,
    salaryMax: 10,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Cell Biology", "M.Sc. Molecular Biology"],
    phd: ["Ph.D. Cell Biology"],
    topSectors: ["Institutes of Science", "Biomedical Wings"],
    keySkills: ["Cell Signaling", "Confocal Microscopy"]
  },
  {
    id: "epigeneticist",
    title: "Epigeneticist",
    desc: "Studies heritable changes in gene expression not involving DNA sequence changes.",
    category: "General Zoology",
    categoryId: "general-zoology",
    badge: "ADVANCED",
    secondaryBadge: "GENETICS",
    salary: "₹ 6–12 LPA",
    salaryMin: 6,
    salaryMax: 12,
    bsc: ["B.Sc. Genetics", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Genetics", "M.Sc. Epigenetics"],
    phd: ["Ph.D. Epigenetics"],
    topSectors: ["Cancer Research Institutes", "Chromatin Biology Labs", "Genomics Companies"],
    keySkills: ["ChIP-Seq", "Bisulfite Sequencing", "Histone Modification Analysis"]
  },

  // 2. Wildlife, Ecology & Environmental Careers
  {
    id: "wildlife-biologist",
    title: "Wildlife Biologist / Conservationist",
    desc: "Study wild animals and protect endangered species across national ecosystems.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "TOP CHOICE",
    secondaryBadge: "CONSERVATION",
    salary: "₹ 3–6 LPA",
    salaryMin: 3,
    salaryMax: 6,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Wildlife Biology", "M.Sc. Wildlife Science", "M.Sc. Conservation Biology"],
    phd: ["Ph.D. Wildlife Biology", "Ph.D. Wildlife Conservation"],
    isTopChoice: true,
    topSectors: ["Wildlife Trust of India", "WWF-India", "National Tiger Conservation Authority"],
    keySkills: ["Camera Trapping", "Radio Telemetry", "Population Viability Analysis"]
  },
  {
    id: "forest-officer-ifs",
    title: "Forest Officer (IFS / SFS)",
    desc: "Elite government UPSC officer managing national forest reserves, wildlife sanctuaries, and natural resources.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "TOP CHOICE",
    secondaryBadge: "GOVERNMENT",
    salary: "₹ 8–18 LPA",
    salaryMin: 8,
    salaryMax: 18,
    bsc: ["B.Sc. Forestry", "B.Sc. Zoology", "B.Sc. Environmental Science"],
    msc: ["M.Sc. Forestry", "M.Sc. Wildlife Science"],
    phd: ["Optional for specialization"],
    isTopChoice: true,
    topSectors: ["Ministry of Environment, Forest and Climate Change (MoEFCC)", "State Forest Departments"],
    keySkills: ["Forest Law Administration", "Wildlife Protection Act", "Resource Governance"]
  },
  {
    id: "ecologist",
    title: "Ecologist / Environmental Consultant",
    desc: "Study ecosystems, biodiversity impacts, and conduct environmental impact assessments.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "HIGH DEMAND",
    secondaryBadge: "CONSULTING",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Ecology", "M.Sc. Environmental Science"],
    phd: ["Ph.D. Ecology"],
    topSectors: ["Environmental Engineering Firms", "Sustainability Agencies", "Urban Planning Boards"],
    keySkills: ["EIA Audits", "Ecosystem Valuation", "Biodiversity Indices"]
  },
  {
    id: "wildlife-ecologist",
    title: "Wildlife Ecologist",
    desc: "Studies interactions between wildlife and their ecosystems, focusing on ecological relationships.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "ECOLOGY",
    secondaryBadge: "RESEARCH",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Zoology", "B.Sc. Environmental Science", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Wildlife Ecology", "M.Sc. Ecology"],
    phd: ["Ph.D. Wildlife Ecology", "Ph.D. Ecology"],
    topSectors: ["Ecological Research Labs", "Protected Reserves"],
    keySkills: ["Ecological Modeling", "Food Web Dynamics"]
  },
  {
    id: "wildlife-research-scientist",
    title: "Wildlife Research Scientist",
    desc: "Conducts scientific research on wildlife species, behavior, and conservation programs.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "RESEARCH",
    secondaryBadge: "CONSERVATION",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Environmental Science"],
    msc: ["M.Sc. Wildlife Science", "M.Sc. Conservation Biology"],
    phd: ["Ph.D. Wildlife Biology", "Ph.D. Conservation Biology"],
    topSectors: ["Wildlife Institute of India (WII)", "NCBS"],
    keySkills: ["Conservation Genomics", "Bio-acoustics"]
  },
  {
    id: "wildlife-manager",
    title: "Wildlife Sanctuary Manager",
    desc: "Manages wildlife populations and habitats in protected areas and reserves.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "MANAGEMENT",
    secondaryBadge: "FIELD",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Zoology", "B.Sc. Forestry", "B.Sc. Environmental Science"],
    msc: ["M.Sc. Wildlife Management", "M.Sc. Forestry"],
    phd: ["Ph.D. Wildlife Management"],
    topSectors: ["Sanctuary Directorates", "Biosphere Reserves"],
    keySkills: ["Reserve Operations", "Poaching Countermeasures"]
  },
  {
    id: "range-forest-officer",
    title: "Range Forest Officer (RFO)",
    desc: "Manages forest ranges, implements conservation programs, prevents illegal activities.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "GOVERNMENT",
    secondaryBadge: "ADMIN",
    salary: "₹ 5–9 LPA",
    salaryMin: 5,
    salaryMax: 9,
    bsc: ["B.Sc. Forestry", "B.Sc. Zoology", "B.Sc. Environmental Science"],
    msc: ["M.Sc. Forestry", "Diploma in Forest Management"],
    phd: ["Not required"],
    topSectors: ["State Forest Departments"],
    keySkills: ["Forest Patrol", "Anti-Poaching", "Silviculture"]
  },
  {
    id: "conservation-scientist",
    title: "Conservation Scientist",
    desc: "Develops and implements strategies to protect ecosystems and endangered species.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "CONSERVATION",
    secondaryBadge: "POLICY",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Environmental Science", "B.Sc. Zoology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Conservation Science", "M.Sc. Environmental Science"],
    phd: ["Ph.D. Conservation Science", "Ph.D. Conservation Biology"],
    topSectors: ["IUCN", "Conservation International"],
    keySkills: ["Species Recovery Plans", "Protected Area Design"]
  },
  {
    id: "habitat-restoration-specialist",
    title: "Habitat Restoration Specialist",
    desc: "Restores degraded ecosystems and wildlife habitats to natural native conditions.",
    category: "Wildlife & Ecology",
    categoryId: "wildlife-ecology",
    badge: "INNOVATION",
    secondaryBadge: "SUSTAINABILITY",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Environmental Science", "B.Sc. Zoology", "B.Sc. Forestry"],
    msc: ["M.Sc. Restoration Ecology", "M.Sc. Environmental Management"],
    phd: ["Ph.D. Restoration Ecology"],
    topSectors: ["Mining Rehabilitation Projects", "Wetland Authorities", "Global Conservation Bodies"],
    keySkills: ["Soil Bio-engineering", "Native Flora Reintroduction", "Erosion Control"]
  },

  // 3. Marine, Aquatic & Fisheries
  {
    id: "marine-biologist",
    title: "Marine Biologist",
    desc: "Research marine organisms, deep-sea biodiversity, coral reefs, and oceanic ecosystems.",
    category: "Marine Sciences",
    categoryId: "marine-fisheries",
    badge: "TOP CHOICE",
    secondaryBadge: "OCEANOGRAPHY",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Marine Biology", "M.Sc. Oceanography"],
    phd: ["Ph.D. Marine Biology"],
    isTopChoice: true,
    topSectors: ["National Institute of Oceanography (NIO)", "Marine Protected Areas", "Fisheries Institutes"],
    keySkills: ["Scuba Research", "Oceanic Sampling", "Marine Taxonomy", "Benthic Surveys"]
  },
  {
    id: "fisheries-scientist",
    title: "Fisheries Scientist",
    desc: "Manage aquatic resources, fish populations, and sustainable harvesting quotas.",
    category: "Marine Sciences",
    categoryId: "marine-fisheries",
    badge: "AQUACULTURE",
    secondaryBadge: "GOVERNMENT",
    salary: "₹ 4–7 LPA",
    salaryMin: 4,
    salaryMax: 7,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Fisheries Science", "M.Sc. Aquaculture"],
    phd: ["Ph.D. Fisheries Science"],
    topSectors: ["ICAR-CMFRI", "State Fisheries Departments", "Export Development Authority"],
    keySkills: ["Fish Stock Assessment", "Aquatic Resource Modeling"]
  },
  {
    id: "oceanographer-biological",
    title: "Biological Oceanographer",
    desc: "Studies biological aspects of oceans, marine life, and global biogeochemical cycles.",
    category: "Marine Sciences",
    categoryId: "marine-fisheries",
    badge: "GLOBAL",
    secondaryBadge: "RESEARCH",
    salary: "₹ 6–12 LPA",
    salaryMin: 6,
    salaryMax: 12,
    bsc: ["B.Sc. Marine Science", "B.Sc. Zoology", "B.Sc. Oceanography"],
    msc: ["M.Sc. Oceanography", "M.Sc. Marine Biology"],
    phd: ["Ph.D. Biological Oceanography", "Ph.D. Oceanography"],
    topSectors: ["Ministry of Earth Sciences", "International Ocean Expeditions", "Climate Research Labs"],
    keySkills: ["Remote Sensing", "Satellite Oceanography", "Plankton Dynamics"]
  },
  {
    id: "aquaculture-specialist",
    title: "Aquaculture Specialist",
    desc: "Manages farming of aquatic organisms like fish, shrimp, and spirulina in sustainable systems.",
    category: "Marine Sciences",
    categoryId: "marine-fisheries",
    badge: "INDUSTRY",
    secondaryBadge: "COMMERCIAL",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Fisheries Science", "B.Sc. Zoology", "B.Sc. Aquaculture"],
    msc: ["M.Sc. Aquaculture", "M.Sc. Fisheries Science"],
    phd: ["Ph.D. Aquaculture"],
    topSectors: ["Commercial Aqua-farms", "Seafood Export Firms", "ICAR-CIFA"],
    keySkills: ["Recirculating Aquaculture Systems (RAS)", "Fish Hatchery Breeding", "Water Quality Analytics"]
  },
  {
    id: "coral-reef-researcher",
    title: "Coral Reef Researcher",
    desc: "Studies coral reef ecosystems, micro-fragmentation restoration, and thermal resilience.",
    category: "Marine Sciences",
    categoryId: "marine-fisheries",
    badge: "SPECIALIZED",
    secondaryBadge: "CONSERVATION",
    salary: "₹ 5–10 LPA",
    salaryMin: 5,
    salaryMax: 10,
    bsc: ["B.Sc. Marine Biology", "B.Sc. Zoology", "B.Sc. Environmental Science"],
    msc: ["M.Sc. Marine Science", "M.Sc. Coral Reef Ecology"],
    phd: ["Ph.D. Coral Reef Studies"],
    topSectors: ["Coral Reef Alliances", "Andaman & Nicobar Marine Centers", "Global Reef Projects"],
    keySkills: ["Symbiodiniaceae Genotyping", "Reef Restoration", "Underwater Photogrammetry"]
  },

  // 4. Animal Health & Medical Sciences
  {
    id: "veterinarian",
    title: "Veterinarian (Veterinary Surgeon)",
    desc: "Diagnoses and treats animal diseases, performs surgeries, advises on animal care.",
    category: "Medical & Vet Health",
    categoryId: "animal-health",
    badge: "TOP CHOICE",
    secondaryBadge: "CLINICAL",
    salary: "₹ 6–14 LPA",
    salaryMin: 6,
    salaryMax: 14,
    bsc: ["B.V.Sc & AH", "B.Sc. Zoology", "B.Sc. Animal Science"],
    msc: ["M.V.Sc in Surgery / Medicine", "M.Sc. Veterinary Science"],
    phd: ["Ph.D. Veterinary Sciences"],
    isTopChoice: true,
    topSectors: ["Veterinary Hospitals", "Zoological Gardens", "Pet Healthcare Chains", "Dairy Federations"],
    keySkills: ["Animal Surgery", "Anesthesia", "Clinical Diagnostics", "Vaccination Protocols"]
  },
  {
    id: "biomedical-scientist",
    title: "Biomedical Scientist",
    desc: "Conducts preclinical translational research to understand diseases and develop new therapies.",
    category: "Medical & Vet Health",
    categoryId: "animal-health",
    badge: "TOP CHOICE",
    secondaryBadge: "PHARMA R&D",
    salary: "₹ 5–10 LPA",
    salaryMin: 5,
    salaryMax: 10,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Biomedical Science"],
    msc: ["M.Sc. Biomedical Science", "M.Sc. Medical Biotechnology"],
    phd: ["Ph.D. Biomedical Science"],
    isTopChoice: true,
    topSectors: ["Novartis", "AstraZeneca", "Dr. Reddy's", "National Institutes of Health"],
    keySkills: ["Cell Culture", "ELISA Assays", "Preclinical Animal Models", "Toxicology Screening"]
  },
  {
    id: "veterinary-pathologist",
    title: "Veterinary Pathologist",
    desc: "Studies animal diseases through tissue examination, necropsies, and laboratory diagnostics.",
    category: "Medical & Vet Health",
    categoryId: "animal-health",
    badge: "DIAGNOSTICS",
    secondaryBadge: "PATHOLOGY",
    salary: "₹ 6–10 LPA",
    salaryMin: 6,
    salaryMax: 10,
    bsc: ["B.V.Sc & AH", "B.Sc. Zoology"],
    msc: ["M.V.Sc Pathology", "M.Sc. Pathology"],
    phd: ["Ph.D. Veterinary Pathology"],
    topSectors: ["Diagnostic Referral Labs", "Veterinary Universities", "Pharma Toxicology"],
    keySkills: ["Histopathology", "Immunohistochemistry", "Cytopathology", "Necropsy"]
  },

  // 5. Biotechnology & Modern Technology Careers
  {
    id: "biotechnologist",
    title: "Biotechnologist",
    desc: "Develop biotech products, enzymes, biopharmaceuticals, and bio-industrial applications.",
    category: "Biotech & Genomics",
    categoryId: "biotechnology",
    badge: "TOP CHOICE",
    secondaryBadge: "BIOPROCESS",
    salary: "₹ 4–10 LPA",
    salaryMin: 4,
    salaryMax: 10,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Biotechnology"],
    phd: ["Ph.D. Biotechnology"],
    isTopChoice: true,
    topSectors: ["Biocon", "Serum Institute", "Biomanufacturing Firms"],
    keySkills: ["Fermentation", "Bioprocess Engineering", "Recombinant DNA"]
  },
  {
    id: "genetic-engineer",
    title: "Genetic Engineer / CRISPR Scientist",
    desc: "Engineers cellular genomes using CRISPR-Cas9, base editors, and viral gene therapy vectors.",
    category: "Biotech & Genomics",
    categoryId: "biotechnology",
    badge: "TOP CHOICE",
    secondaryBadge: "CRISPR TECH",
    salary: "₹ 8–18 LPA",
    salaryMin: 8,
    salaryMax: 18,
    bsc: ["B.Sc. Biotechnology", "B.Sc. Genetics", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Genetic Engineering", "M.Sc. Molecular Biology"],
    phd: ["Ph.D. in Gene Editing / CRISPR Technology"],
    isTopChoice: true,
    topSectors: ["Gene Therapy Firms", "Biotech Incubators", "Agricultural Biotech"],
    keySkills: ["Guide RNA Design", "Electroporation", "NGS Validation", "Homologous Recombination"]
  },
  {
    id: "genomics-scientist",
    title: "Genomics Scientist",
    desc: "Processes whole-genome sequencing (WGS) data to map variant mutations and disease susceptibility.",
    category: "Biotech & Genomics",
    categoryId: "biotechnology",
    badge: "HIGH DEMAND",
    secondaryBadge: "BIOINFORMATICS",
    salary: "₹ 7–15 LPA",
    salaryMin: 7,
    salaryMax: 15,
    bsc: ["B.Sc. Biotechnology", "B.Sc. Genetics", "B.Sc. Bioinformatics"],
    msc: ["M.Sc. Genomics", "M.Sc. Bioinformatics"],
    phd: ["Ph.D. Genomics"],
    topSectors: ["Illumina Labs", "MedGenome", "Strand Life Sciences", "Institute of Genomics (IGIB)"],
    keySkills: ["Next-Gen Sequencing", "Variant Calling (VCF)", "Python", "RNA-Seq Analysis"]
  },
  {
    id: "bioinformatics-analyst",
    title: "Bioinformatics Analyst",
    desc: "Constructs computational pipelines to decrypt complex DNA, RNA, and protein interactomes.",
    category: "Biotech & Genomics",
    categoryId: "biotechnology",
    badge: "HIGH TECH",
    secondaryBadge: "COMPUTATIONAL",
    salary: "₹ 5–12 LPA",
    salaryMin: 5,
    salaryMax: 12,
    bsc: ["B.Sc. Bioinformatics", "B.Sc. Biotechnology", "B.Sc. Computer Science"],
    msc: ["M.Sc. Bioinformatics", "M.Sc. Computational Biology"],
    phd: ["Ph.D. Bioinformatics"],
    topSectors: ["Pharma Computational Wings", "IT Biotech Subsidiaries", "Genomic Diagnostic Hubs"],
    keySkills: ["BLAST", "AlphaFold Modeling", "Linux / Bash", "Biopython / R"]
  },

  // 6. Microbiology & Immunology
  {
    id: "immunologist",
    title: "Immunologist",
    desc: "Studies antibodies, cellular immune responses, autoimmune disorders, and CAR-T immunotherapies.",
    category: "Microbiology & Immuno",
    categoryId: "microbiology",
    badge: "TOP CHOICE",
    secondaryBadge: "IMMUNOTHERAPY",
    salary: "₹ 5–11 LPA",
    salaryMin: 5,
    salaryMax: 11,
    bsc: ["B.Sc. Microbiology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Immunology", "M.Sc. Microbiology"],
    phd: ["Ph.D. Immunology"],
    isTopChoice: true,
    topSectors: ["Serum Institute of India", "Bharat Biotech", "Cancer Research Centers"],
    keySkills: ["Monoclonal Antibody Production", "Flow Cytometry", "T-Cell Assays"]
  },
  {
    id: "virologist",
    title: "Virologist",
    desc: "Investigates viral replication mechanisms, antiviral drug candidates, and epidemic surveillance.",
    category: "Microbiology & Immuno",
    categoryId: "microbiology",
    badge: "EPIDEMIC R&D",
    secondaryBadge: "RESEARCH",
    salary: "₹ 5–11 LPA",
    salaryMin: 5,
    salaryMax: 11,
    bsc: ["B.Sc. Microbiology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Virology", "M.Sc. Microbiology"],
    phd: ["Ph.D. Virology"],
    topSectors: ["National Institute of Virology (NIV Pune)", "ICMR", "Vaccine Makers"],
    keySkills: ["BSL-3 Facility Operations", "Viral Plaque Assays", "Cryo-EM Imaging"]
  },

  // 7. Entomology & Invertebrate Specializations
  {
    id: "entomologist",
    title: "Agricultural Entomologist",
    desc: "Develops integrated pest management (IPM) strategies, biological parasitoid controls, and crop protection systems.",
    category: "Entomology & Insects",
    categoryId: "entomology",
    badge: "AGRICULTURE",
    secondaryBadge: "APPLIED",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Agriculture", "B.Sc. Entomology"],
    msc: ["M.Sc. Agricultural Entomology", "M.Sc. Entomology"],
    phd: ["Ph.D. Agricultural Entomology"],
    topSectors: ["ICAR Institutes", "Agrochemical Corporations (Bayer, Syngenta)", "State Agri Depts"],
    keySkills: ["Pheromone Trapping", "Biological Control Agents", "Pesticide Resistance Assays"]
  },
  {
    id: "forensic-entomologist",
    title: "Forensic Entomologist",
    desc: "Analyzes insect succession and larval growth on forensic evidence to determine post-mortem intervals.",
    category: "Entomology & Insects",
    categoryId: "entomology",
    badge: "FORENSICS",
    secondaryBadge: "CRIMINOLOGY",
    salary: "₹ 5–10 LPA",
    salaryMin: 5,
    salaryMax: 10,
    bsc: ["B.Sc. Zoology", "B.Sc. Forensic Science", "B.Sc. Entomology"],
    msc: ["M.Sc. Forensic Entomology", "M.Sc. Forensic Science"],
    phd: ["Ph.D. Forensic Entomology"],
    topSectors: ["Central Forensic Science Laboratories (CFSL)", "State Police CID", "Court Expert Witness"],
    keySkills: ["Post-Mortem Interval (PMI) Calculation", "Diptera / Coleoptera Taxonomy", "Toxicology Screen"]
  },

  // 8. Paleontology & Evolution
  {
    id: "paleontologist",
    title: "Vertebrate Paleontologist",
    desc: "Excavates fossilized dinosaur, reptile, and prehistoric mammal skeletons to reconstruct macroevolutionary history.",
    category: "Paleontology",
    categoryId: "paleontology",
    badge: "EVOLUTION",
    secondaryBadge: "GEOLOGY",
    salary: "₹ 5–11 LPA",
    salaryMin: 5,
    salaryMax: 11,
    bsc: ["B.Sc. Geology", "B.Sc. Zoology", "B.Sc. Earth Sciences"],
    msc: ["M.Sc. Paleontology", "M.Sc. Zoology"],
    phd: ["Ph.D. Paleontology", "Ph.D. Zoology"],
    topSectors: ["Geological Survey of India", "Birbal Sahni Institute (BSIP)", "Natural History Museums"],
    keySkills: ["Stratigraphy", "Fossil Preparation", "Micro-CT Reconstruction", "Phylogenetic Comparative Methods"]
  },

  // 9. Neuroscience & Behavior
  {
    id: "neurobiologist",
    title: "Neurobiologist & Ethologist",
    desc: "Decodes neural circuits governing animal cognition, memory formation, and social behavior.",
    category: "Neuro & Ethology",
    categoryId: "neuroscience",
    badge: "NEUROSCIENCE",
    secondaryBadge: "BRAIN LABS",
    salary: "₹ 6–14 LPA",
    salaryMin: 6,
    salaryMax: 14,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Neuroscience"],
    msc: ["M.Sc. Neurobiology", "M.Sc. Neuroscience"],
    phd: ["Ph.D. Neurobiology"],
    topSectors: ["National Brain Research Centre (NBRC)", "TIFR Mumbai", "NCBS Bangalore"],
    keySkills: ["Optogenetics", "Patch-Clamp Electrophysiology", "Behavioral Tracking Algorithms"]
  },

  // 10. Forensic & Applied Sciences
  {
    id: "wildlife-forensic-expert",
    title: "Wildlife Forensic Expert",
    desc: "Extracts DNA evidence from confiscated animal contraband (ivory, tiger skins, pangolin scales) for prosecution.",
    category: "Forensics & Crime",
    categoryId: "forensic",
    badge: "TOP CHOICE",
    secondaryBadge: "CRIME INVESTIGATION",
    salary: "₹ 5–10 LPA",
    salaryMin: 5,
    salaryMax: 10,
    bsc: ["B.Sc. Zoology", "B.Sc. Forensic Science", "B.Sc. Wildlife Science"],
    msc: ["M.Sc. Wildlife Forensic Science", "M.Sc. Forensic Science"],
    phd: ["Ph.D. Wildlife Forensics"],
    isTopChoice: true,
    topSectors: ["Wildlife Crime Control Bureau (WCCB)", "Wildlife Institute of India", "INTERPOL Environmental Crime"],
    keySkills: ["Mitochondrial DNA Sequencing", "Species Barcoding", "Chain of Custody Legal Evidence"]
  },

  // 11. Corporate & Business Careers
  {
    id: "medical-science-liaison",
    title: "Medical Science Liaison (MSL)",
    desc: "Acts as principal scientific authority connecting pharmaceutical directors with leading medical oncologists and physicians.",
    category: "Corporate & Biotech",
    categoryId: "corporate",
    badge: "TOP CHOICE",
    secondaryBadge: "HIGH PAYING",
    salary: "₹ 8–20 LPA",
    salaryMin: 8,
    salaryMax: 20,
    bsc: ["B.Sc. Zoology", "B.Sc. Pharmacy", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Specialization", "M.Sc. Business"],
    phd: ["Ph.D. in specialization"],
    isTopChoice: true,
    topSectors: ["Pfizer", "Roche", "Johnson & Johnson", "Novartis Healthcare"],
    keySkills: ["Clinical Data Dissemination", "KOL Engagement", "Therapeutic Expertise"]
  },
  {
    id: "bio-startup-founder",
    title: "Bio-Startup Founder & Entrepreneur",
    desc: "Launches cutting-edge biotech companies specializing in diagnostic kits, cell culture meat, or bio-enzymes.",
    category: "Corporate & Biotech",
    categoryId: "corporate",
    badge: "ENTREPRENEUR",
    secondaryBadge: "STARTUP",
    salary: "₹ 10–50+ LPA",
    salaryMin: 10,
    salaryMax: 50,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Business"],
    msc: ["M.Sc. Entrepreneurship", "M.Sc. Specialization"],
    phd: ["Optional"],
    topSectors: ["BIRAC Incubators", "Biotech Venture Capital Funds", "Private Startups"],
    keySkills: ["IP Patenting", "Venture Pitching", "Product-Market Fit", "Regulatory Approvals"]
  },

  // 12. Animal Care, Welfare & Zoo Careers
  {
    id: "zoo-curator",
    title: "Zoo Curator / Zoo Educator",
    desc: "Zoo management, wildlife education, captive breeding, and animal habitat welfare.",
    category: "Animal Welfare & Zoos",
    categoryId: "animal-welfare",
    badge: "ZOO MGMT",
    secondaryBadge: "CONSERVATION",
    salary: "₹ 3–5 LPA",
    salaryMin: 3,
    salaryMax: 5,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Zoology", "M.Sc. Wildlife Science"],
    phd: ["Ph.D. Zoology"],
    topSectors: ["Central Zoo Authority (CZA)", "Zoological Parks", "Safari Reserves"],
    keySkills: ["Enclosure Enrichment", "Captive Animal Dietetics", "Public Education"]
  },
  {
    id: "animal-welfare-officer",
    title: "Animal Welfare Officer",
    desc: "Ensures proper care, ethical treatment, and welfare compliance of animals in various facilities.",
    category: "Animal Welfare & Zoos",
    categoryId: "animal-welfare",
    badge: "WELFARE",
    secondaryBadge: "ETHICS",
    salary: "₹ 4–8 LPA",
    salaryMin: 4,
    salaryMax: 8,
    bsc: ["B.Sc. Zoology", "B.Sc. Animal Science", "B.Sc. Veterinary Science"],
    msc: ["M.Sc. Animal Welfare", "M.Sc. Animal Science"],
    phd: ["Ph.D. Animal Welfare"],
    topSectors: ["Animal Welfare Board of India (AWBI)", "NGOs", "Research Ethics Boards"],
    keySkills: ["Ethical Compliance", "Five Freedoms Assessment", "Shelter Management"]
  },

  // 13. Education & Science Communication
  {
    id: "professor-researcher",
    title: "Academic Professor / Principal Scientist",
    desc: "University teaching, guiding doctoral dissertations, and heading grant-funded life science research.",
    category: "Education & Media",
    categoryId: "education",
    badge: "TOP CHOICE",
    secondaryBadge: "ACADEMIA",
    salary: "₹ 6–12 LPA",
    salaryMin: 6,
    salaryMax: 12,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Zoology", "M.Sc. Specialization"],
    phd: ["Ph.D. Zoology", "Ph.D. Life Sciences"],
    isTopChoice: true,
    topSectors: ["Central Universities", "IIT Life Sciences Wings", "IISc Bangalore"],
    keySkills: ["Curriculum Design", "Doctoral Mentorship", "Scientific Publishing"]
  },
  {
    id: "science-communicator",
    title: "Science Communicator & Writer",
    desc: "Translates high-impact scientific discoveries into accessible media, journals, and documentaries.",
    category: "Education & Media",
    categoryId: "education",
    badge: "MEDIA",
    secondaryBadge: "CREATIVE",
    salary: "₹ 4–9 LPA",
    salaryMin: 4,
    salaryMax: 9,
    bsc: ["B.Sc. Zoology", "B.Sc. Life Sciences", "B.Sc. Journalism"],
    msc: ["M.Sc. Science Communication", "M.Sc. Journalism"],
    phd: ["Optional"],
    topSectors: ["National Geographic", "Nature Publishing Group", "BBC Earth Labs"],
    keySkills: ["Scientific Storytelling", "Visual Infographics", "Science Journalism"]
  },

  // 14. Government & Policy Careers
  {
    id: "icar-csir-scientist",
    title: "CSIR / ICAR / ICMR Scientist",
    desc: "Tenured central government scientist leading national scientific missions, patent innovations, and doctoral scholars.",
    category: "Government & IFS",
    categoryId: "government",
    badge: "TOP CHOICE",
    secondaryBadge: "CENTRAL GOVT",
    salary: "₹ 8–16 LPA",
    salaryMin: 8,
    salaryMax: 16,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Life Sciences"],
    msc: ["M.Sc. Specialization"],
    phd: ["Ph.D. in specialization"],
    isTopChoice: true,
    topSectors: ["CSIR-CCMB Hyderabad", "ICAR-NDRI", "ICMR-NARI", "National Institutes"],
    keySkills: ["Independent Research Leadership", "High-Impact Publishing", "National Science Policy"]
  },
  {
    id: "state-forest-services",
    title: "State Forest Services (Assistant Conservator)",
    desc: "State gazetted officer directing forest divisions, wildlife reserves, and social forestry initiatives.",
    category: "Government & IFS",
    categoryId: "government",
    badge: "GOVERNMENT",
    secondaryBadge: "STATE PSC",
    salary: "₹ 6–12 LPA",
    salaryMin: 6,
    salaryMax: 12,
    bsc: ["B.Sc. Forestry", "B.Sc. Zoology", "B.Sc. Environmental Science"],
    msc: ["M.Sc. Forestry", "M.Sc. Wildlife Management"],
    phd: ["Optional"],
    topSectors: ["State Public Service Commissions", "Forest Development Corporations"],
    keySkills: ["Administrative Governance", "Forest Boundary Audits"]
  },

  // 15. International & Future-Oriented Roles
  {
    id: "un-biodiversity-consultant",
    title: "UN Biodiversity & Global Policy Consultant",
    desc: "Formulates global biodiversity treaties, COP summit declarations, and international conservation frameworks.",
    category: "International & UN",
    categoryId: "international",
    badge: "TOP CHOICE",
    secondaryBadge: "UNITED NATIONS",
    salary: "₹ 12–28 LPA",
    salaryMin: 12,
    salaryMax: 28,
    bsc: ["B.Sc. Zoology", "B.Sc. Environmental Science", "B.Sc. International Relations"],
    msc: ["M.Sc. International Development", "M.Sc. Conservation Biology"],
    phd: ["Ph.D. Conservation Biology", "Ph.D. International Relations"],
    isTopChoice: true,
    topSectors: ["UNEP Geneva/Nairobi", "IUCN Gland", "World Bank Global Environment Facility"],
    keySkills: ["Multilateral Diplomacy", "Global Policy Frameworks", "Ecosystem Economics"]
  },
  {
    id: "space-biology-researcher",
    title: "Space Biology & Astrobiology Researcher",
    desc: "Studies extreme microbial resilience, spaceflight microgravity effects on animal physiology, and bio-regenerative life support.",
    category: "International & UN",
    categoryId: "international",
    badge: "FUTURE TECH",
    secondaryBadge: "SPACE AGENCIES",
    salary: "₹ 15–40 LPA",
    salaryMin: 15,
    salaryMax: 40,
    bsc: ["B.Sc. Zoology", "B.Sc. Biotechnology", "B.Sc. Physics"],
    msc: ["M.Sc. Space Biology", "M.Sc. Astrobiology"],
    phd: ["Ph.D. Space Biology"],
    topSectors: ["ISRO Space Biology Wing", "NASA Ames Research Center", "ESA Life Sciences Directorate"],
    keySkills: ["Microgravity Physiology", "Radiation Biology", "Closed-Loop Life Support Systems"]
  }
];
