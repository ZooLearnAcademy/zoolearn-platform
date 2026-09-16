// Mock/static content for World Meerkat Day page
export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1686085745597-ad47afa612b4',
  sentinel: 'https://images.unsplash.com/photo-1586959140255-aab0163e21cf',
  mobThree: 'https://images.unsplash.com/photo-1552071379-041b32707fed',
  portrait: 'https://images.unsplash.com/photo-1612412664025-052be804ccf7',
  faceClose: 'https://images.unsplash.com/photo-1686854016202-e35cf1ccabf8',
  familyLarge: 'https://images.unsplash.com/photo-1765377790900-85ba28008322',
  groupHill: 'https://images.unsplash.com/photo-1695237888915-c1d69fe19d23',
  threeSlope: 'https://images.unsplash.com/photo-1765377790894-750b0efb4615',
  gathering: 'https://images.unsplash.com/photo-1768146905187-31f1e59325ef',
  lookingUp: 'https://images.unsplash.com/photo-1689079986853-723ee1780b3d',
  digging: 'https://images.unsplash.com/photo-1629204214398-35fc1ce99146',
  kalahari: 'https://images.unsplash.com/photo-1546236634-dd9378379a39',
};

export const MARVELS = [
  {
    icon: '☀️',
    title: 'Solar-Panel Belly',
    stat: '~35°C tolerance',
    bullets: [
      'Sparse fur over jet-black skin on abdomen',
      'Acts as a natural solar panel at dawn',
      'Warms the body after chilly desert nights',
      'Enables early foraging before predators wake',
    ],
  },
  {
    icon: '👁️',
    title: 'Third Eyelid',
    stat: 'Nictitating membrane',
    bullets: [
      'Transparent sand-shield that blinks sideways',
      'Protects eyes while digging at high speed',
      'Dark eye-rings reduce glare like sunglasses',
      'Sharp long-distance vision spots eagles 300m away',
    ],
  },
  {
    icon: '🦂',
    title: 'Venom Immunity',
    stat: 'Scorpion-resistant',
    bullets: [
      'Partial immunity to Parabuthus scorpion venom',
      'Pups are taught how to disarm live scorpions',
      'A rare example of taught predation in mammals',
      'Also eats snakes, spiders and centipedes',
    ],
  },
  {
    icon: '📢',
    title: 'Sentinel Language',
    stat: '30+ distinct calls',
    bullets: [
      'Different calls for aerial vs. terrestrial threats',
      'Encodes urgency AND type of predator',
      'One of the most complex vocal systems in mammals',
      'Sentinels rotate on a voluntary shift roster',
    ],
  },
  {
    icon: '⛏️',
    title: 'Master Diggers',
    stat: '2 cm curved claws',
    bullets: [
      'Can excavate their own body weight in seconds',
      'Burrow networks reach 5 m deep, 15+ entrances',
      'Multiple chambers for sleep, nursery and toilet',
      'Shared with mongooses and ground squirrels',
    ],
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Eusocial Mob',
    stat: '20 – 50 members',
    bullets: [
      'Cooperative breeding: helpers raise the alpha’s pups',
      'Babysitters skip meals to guard the nursery',
      'One of only ~15 truly eusocial mammals',
      'Teachers actively train pups — rare in the wild',
    ],
  },
];

export const SUBSPECIES = [
  {
    id: 'suricatta',
    name: 'Suricata suricatta suricatta',
    common: 'Southern / Cape Meerkat',
    year: 'Schreber, 1776',
    range: 'Southern Namibia, Botswana, South Africa',
    img: 'https://images.unsplash.com/photo-1552071379-041b32707fed',
    color: '#c68449',
    traits: [
      'The “classic” meerkat of documentaries',
      'Distinct dark bands across a tawny back',
      'Largest population, well studied in the Kalahari',
      'Deep eye masks and pointed ear-tips',
    ],
  },
  {
    id: 'majoriae',
    name: 'Suricata suricatta majoriae',
    common: 'Namibian Meerkat',
    year: 'Bradfield, 1936',
    range: 'Central & northwestern Namibia',
    img: 'https://images.unsplash.com/photo-1765377790894-750b0efb4615',
    color: '#b06a34',
    traits: [
      'Paler, sandier coat than the Cape form',
      'Adapted to hotter, drier gravel plains',
      'Slightly smaller body mass on average',
      'Faint, washed-out dorsal bands',
    ],
  },
  {
    id: 'iona',
    name: 'Suricata suricatta iona',
    common: 'Angolan Meerkat',
    year: 'Crawford-Cabral, 1971',
    range: 'Southwestern Angola (Iona National Park)',
    img: 'https://images.unsplash.com/photo-1765377790900-85ba28008322',
    color: '#8b4513',
    traits: [
      'The rarest and least studied subspecies',
      'Isolated by the arid Namib coastal belt',
      'Slightly darker guard hairs on the flanks',
      'Populations poorly surveyed — an urgent research gap',
    ],
  },
];

export const TRANSFORM = [
  {
    era: '25 Mya',
    title: 'Gelocid Ancestors',
    img: 'https://images.unsplash.com/photo-1546236634-dd9378379a39',
    body: 'Small, weasel-like carnivorans emerge in Afro-Eurasia. From this pool, the mongoose family (Herpestidae) will branch off — the deep root of every meerkat alive today.',
    a: 'Body Size',
    aVal: 'Weasel-like',
    b: 'Environment',
    bVal: 'Warm Miocene woodlands',
  },
  {
    era: '22 Mya',
    title: 'Herpestidae Split',
    img: 'https://images.unsplash.com/photo-1689079986853-723ee1780b3d',
    body: 'Herpestidae diversifies. A crucial split creates the eusocial mongoose clade — the lineage that will experiment with cooperation, sentinels and burrow life.',
    a: 'Behaviour',
    aVal: 'Mostly solitary',
    b: 'Environment',
    bVal: 'Expanding grasslands',
  },
  {
    era: '18 Mya',
    title: 'Eusocial Mongoose Clade',
    img: 'https://images.unsplash.com/photo-1695237888915-c1d69fe19d23',
    body: 'Ancestors of dwarf, banded and Liberian mongooses appear alongside the meerkat’s direct forerunners. Group living and cooperative pup-rearing take shape.',
    a: 'Group Size',
    aVal: '5 – 15 individuals',
    b: 'Environment',
    bVal: 'Semi-arid savanna',
  },
  {
    era: '2.5 Mya → Today',
    title: 'Suricata suricatta',
    img: 'https://images.unsplash.com/photo-1586959140255-aab0163e21cf',
    body: 'The modern meerkat emerges in southern Africa. Fossils from South African caves confirm the sentinel form — upright posture, dark eye-mask, banded back — is essentially unchanged for over a million years.',
    a: 'Mob Size',
    aVal: '20 – 50',
    b: 'Environment',
    bVal: 'Kalahari & Namib deserts',
  },
];

export const WHY_FORCES = [
  { icon: '🌾', title: 'Open Habitat', body: 'When African forests gave way to arid grasslands, ground-level foraging replaced tree-climbing. Standing tall became the only way to spot danger.' },
  { icon: '🦅', title: 'Aerial Predators', body: 'Martial eagles and jackals hunted from every direction. A dedicated sentinel scanning the sky freed the rest of the mob to eat.' },
  { icon: '🕳️', title: 'Burrow Economics', body: 'Excavating a 5-metre burrow is expensive. Sharing labour across a mob made deep, safe homes possible for the first time.' },
  { icon: '🧬', title: 'Kin Selection', body: 'In small, related groups, helping a sibling breed spreads your genes almost as effectively as breeding yourself.' },
  { icon: '🎓', title: 'Teaching Culture', body: 'Prey like scorpions require training. Only groups that could pass knowledge across generations survived the venomous menu.' },
];

export const CHRONO = [
  { era: '25 Mya', title: 'Feliform carnivorans', body: 'Ancestral cat-like carnivores split from dog-like lineages.' },
  { era: '22 Mya', title: 'Herpestidae emerges', body: 'The mongoose family diverges from viverrids in Afro-Eurasia.' },
  { era: '18 Mya', title: 'Eusocial mongoose clade', body: 'Meerkats share a common ancestor with dwarf and banded mongooses.' },
  { era: '15 Mya', title: 'Suricata lineage splits', body: 'The genus Suricata becomes a sister clade to Herpestes.' },
  { era: '5 Mya', title: 'Aridification of Africa', body: 'Southern Africa dries out — pushing mongooses into open, burrow-dependent life.' },
  { era: '2.59 Mya', title: 'First meerkat fossils', body: 'Earliest identifiable Suricata suricatta fossils appear in South Africa.' },
  { era: '1.5 Mya', title: 'Cooper’s D locality', body: 'A rich Pleistocene site preserves 29 mongoose specimens — including meerkat ancestors.' },
  { era: '10 Kya', title: 'Modern Kalahari', body: 'Climate stabilises; meerkats colonise the deserts we know today.' },
  { era: '2016', title: 'Cooperative breeding decoded', body: 'Long-term Kalahari Meerkat Project publishes landmark eusociality data.' },
  { era: '2025', title: 'Genomic conservation era', body: 'New studies link genetic diversity to tuberculosis resistance and climate resilience.' },
];
