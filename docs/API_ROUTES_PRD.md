# ZooLearn Platform — PRD Route Specifications

> **Base Production Domain:** `https://zoolearn.in`  
> **Local Development Domain:** `http://localhost:3000`  
> **Total Documented Phylums:** 11 | **Total Documented Species:** 270

## 1. Core Web Application Routes

| Page / Section | Path | Production URL | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Home / Landing Page** | `/` | [https://zoolearn.in/](https://zoolearn.in/) | `Public` | Main landing experience with Hero, 3D animations, Conceptual Learning, and Modules. |
| **ZooHub Catalog Root** | `/zoohub` | [https://zoolearn.in/zoohub](https://zoolearn.in/zoohub) | `Public` | Primary taxonomy portal with Phylum classification cards and instant search. |
| **User Dashboard** | `/dashboard` | [https://zoolearn.in/dashboard](https://zoolearn.in/dashboard) | `Protected` | Personalized user analytics, saved taxonomy bookmarks, and learning track progress. |
| **User Login / Auth** | `/login` | [https://zoolearn.in/login](https://zoolearn.in/login) | `Public` | Authentication portal for student and educator access. |
| **Conceptual Learning Hub** | `/conceptual-learning` | [https://zoolearn.in/conceptual-learning](https://zoolearn.in/conceptual-learning) | `Public` | Interactive biological modules and concept deep-dives. |
| **11th Standard Module** | `/modules/11th` | [https://zoolearn.in/modules/11th](https://zoolearn.in/modules/11th) | `Public` | Foundational biology curriculum tailored for Grade 11 students. |
| **12th Standard Module** | `/modules/12th` | [https://zoolearn.in/modules/12th](https://zoolearn.in/modules/12th) | `Public` | Advanced genetics, human physiology, and Grade 12 board preparation. |
| **NEET Aspirant Module** | `/modules/neet` | [https://zoolearn.in/modules/neet](https://zoolearn.in/modules/neet) | `Public` | High-yield competitive exam prep, question banks, and mock exams. |

## 2. Phylum Landing Page Routes

| Phylum Name | Production URL | Total Species | Pattern |
| :--- | :--- | :--- | :--- |
| **Annelida** | [https://zoolearn.in/zoohub/annelida](https://zoolearn.in/zoohub/annelida) | 11 | `/zoohub/annelida` |
| **Arthropoda** | [https://zoolearn.in/zoohub/arthropoda](https://zoolearn.in/zoohub/arthropoda) | 34 | `/zoohub/arthropoda` |
| **Aschelminthes** | [https://zoolearn.in/zoohub/aschelminthes](https://zoolearn.in/zoohub/aschelminthes) | 8 | `/zoohub/aschelminthes` |
| **Chordata** | [https://zoolearn.in/zoohub/chordata](https://zoolearn.in/zoohub/chordata) | 154 | `/zoohub/chordata` |
| **Coelenterata** | [https://zoolearn.in/zoohub/coelenterata](https://zoolearn.in/zoohub/coelenterata) | 11 | `/zoohub/coelenterata` |
| **Ctenophora** | [https://zoolearn.in/zoohub/ctenophora](https://zoolearn.in/zoohub/ctenophora) | 5 | `/zoohub/ctenophora` |
| **Echinodermata** | [https://zoolearn.in/zoohub/echinodermata](https://zoolearn.in/zoohub/echinodermata) | 10 | `/zoohub/echinodermata` |
| **Hemichordata** | [https://zoolearn.in/zoohub/hemichordata](https://zoolearn.in/zoohub/hemichordata) | 3 | `/zoohub/hemichordata` |
| **Mollusca** | [https://zoolearn.in/zoohub/mollusca](https://zoolearn.in/zoohub/mollusca) | 18 | `/zoohub/mollusca` |
| **Platyhelminthes** | [https://zoolearn.in/zoohub/platyhelminthes](https://zoolearn.in/zoohub/platyhelminthes) | 6 | `/zoohub/platyhelminthes` |
| **Porifera** | [https://zoolearn.in/zoohub/porifera](https://zoolearn.in/zoohub/porifera) | 10 | `/zoohub/porifera` |

## 3. Complete ZooHub Species Detail Routes

### Phylum: Annelida (11 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Aphrodita** | `aphrodita` | [https://zoolearn.in/zoohub/annelida/aphrodita](https://zoolearn.in/zoohub/annelida/aphrodita) |
| **Arenicola** | `arenicola` | [https://zoolearn.in/zoohub/annelida/arenicola](https://zoolearn.in/zoohub/annelida/arenicola) |
| **Chaetopterus** | `chaetopterus` | [https://zoolearn.in/zoohub/annelida/chaetopterus](https://zoolearn.in/zoohub/annelida/chaetopterus) |
| **Hirudinaria granulosa** | `hirudinaria-granulosa` | [https://zoolearn.in/zoohub/annelida/hirudinaria-granulosa](https://zoolearn.in/zoohub/annelida/hirudinaria-granulosa) |
| **Hirudo** | `hirudo` | [https://zoolearn.in/zoohub/annelida/hirudo](https://zoolearn.in/zoohub/annelida/hirudo) |
| **Lampito mauritii** | `lampito-mauritii` | [https://zoolearn.in/zoohub/annelida/lampito-mauritii](https://zoolearn.in/zoohub/annelida/lampito-mauritii) |
| **Lumbricus terrestris** | `lumbricus-terrestris` | [https://zoolearn.in/zoohub/annelida/lumbricus-terrestris](https://zoolearn.in/zoohub/annelida/lumbricus-terrestris) |
| **Megascolex** | `megascolex` | [https://zoolearn.in/zoohub/annelida/megascolex](https://zoolearn.in/zoohub/annelida/megascolex) |
| **Nereis** | `nereis` | [https://zoolearn.in/zoohub/annelida/nereis](https://zoolearn.in/zoohub/annelida/nereis) |
| **Pheretima posthuma** | `pheretima-posthuma` | [https://zoolearn.in/zoohub/annelida/pheretima-posthuma](https://zoolearn.in/zoohub/annelida/pheretima-posthuma) |
| **Tubifex** | `tubifex` | [https://zoolearn.in/zoohub/annelida/tubifex](https://zoolearn.in/zoohub/annelida/tubifex) |

### Phylum: Arthropoda (34 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Aedes** | `aedes` | [https://zoolearn.in/zoohub/arthropoda/aedes](https://zoolearn.in/zoohub/arthropoda/aedes) |
| **Anopheles** | `anopheles` | [https://zoolearn.in/zoohub/arthropoda/anopheles](https://zoolearn.in/zoohub/arthropoda/anopheles) |
| **Antheraea assamensis** | `antheraea-assamensis` | [https://zoolearn.in/zoohub/arthropoda/antheraea-assamensis](https://zoolearn.in/zoohub/arthropoda/antheraea-assamensis) |
| **Antheraea mylitta** | `antheraea-mylitta` | [https://zoolearn.in/zoohub/arthropoda/antheraea-mylitta](https://zoolearn.in/zoohub/arthropoda/antheraea-mylitta) |
| **Antheraea paphia** | `antheraea-paphia` | [https://zoolearn.in/zoohub/arthropoda/antheraea-paphia](https://zoolearn.in/zoohub/arthropoda/antheraea-paphia) |
| **Antheraea proylei** | `antheraea-proylei` | [https://zoolearn.in/zoohub/arthropoda/antheraea-proylei](https://zoolearn.in/zoohub/arthropoda/antheraea-proylei) |
| **Apis indica** | `apis-indica` | [https://zoolearn.in/zoohub/arthropoda/apis-indica](https://zoolearn.in/zoohub/arthropoda/apis-indica) |
| **Araneus** | `araneus` | [https://zoolearn.in/zoohub/arthropoda/araneus](https://zoolearn.in/zoohub/arthropoda/araneus) |
| **Archispirostreptus gigas** | `archispirostreptus-gigas` | [https://zoolearn.in/zoohub/arthropoda/archispirostreptus-gigas](https://zoolearn.in/zoohub/arthropoda/archispirostreptus-gigas) |
| **Astacus** | `astacus` | [https://zoolearn.in/zoohub/arthropoda/astacus](https://zoolearn.in/zoohub/arthropoda/astacus) |
| **Bombyx mori** | `bombyx-mori` | [https://zoolearn.in/zoohub/arthropoda/bombyx-mori](https://zoolearn.in/zoohub/arthropoda/bombyx-mori) |
| **Buthus** | `buthus` | [https://zoolearn.in/zoohub/arthropoda/buthus](https://zoolearn.in/zoohub/arthropoda/buthus) |
| **Cancer** | `cancer` | [https://zoolearn.in/zoohub/arthropoda/cancer](https://zoolearn.in/zoohub/arthropoda/cancer) |
| **Culex** | `culex` | [https://zoolearn.in/zoohub/arthropoda/culex](https://zoolearn.in/zoohub/arthropoda/culex) |
| **Cyclops** | `cyclops` | [https://zoolearn.in/zoohub/arthropoda/cyclops](https://zoolearn.in/zoohub/arthropoda/cyclops) |
| **Daphnia** | `daphnia` | [https://zoolearn.in/zoohub/arthropoda/daphnia](https://zoolearn.in/zoohub/arthropoda/daphnia) |
| **Eupagurus** | `eupagurus` | [https://zoolearn.in/zoohub/arthropoda/eupagurus](https://zoolearn.in/zoohub/arthropoda/eupagurus) |
| **Glossina** | `glossina` | [https://zoolearn.in/zoohub/arthropoda/glossina](https://zoolearn.in/zoohub/arthropoda/glossina) |
| **Laccifer** | `laccifer` | [https://zoolearn.in/zoohub/arthropoda/laccifer](https://zoolearn.in/zoohub/arthropoda/laccifer) |
| **Lepisma saccharina** | `lepisma-saccharina` | [https://zoolearn.in/zoohub/arthropoda/lepisma-saccharina](https://zoolearn.in/zoohub/arthropoda/lepisma-saccharina) |
| **Limulus** | `limulus` | [https://zoolearn.in/zoohub/arthropoda/limulus](https://zoolearn.in/zoohub/arthropoda/limulus) |
| **Locusta** | `locusta` | [https://zoolearn.in/zoohub/arthropoda/locusta](https://zoolearn.in/zoohub/arthropoda/locusta) |
| **Lucifer** | `lucifer` | [https://zoolearn.in/zoohub/arthropoda/lucifer](https://zoolearn.in/zoohub/arthropoda/lucifer) |
| **Macrobrachium** | `macrobrachium` | [https://zoolearn.in/zoohub/arthropoda/macrobrachium](https://zoolearn.in/zoohub/arthropoda/macrobrachium) |
| **Musca domestica** | `musca-domestica` | [https://zoolearn.in/zoohub/arthropoda/musca-domestica](https://zoolearn.in/zoohub/arthropoda/musca-domestica) |
| **Palaemon** | `palaemon` | [https://zoolearn.in/zoohub/arthropoda/palaemon](https://zoolearn.in/zoohub/arthropoda/palaemon) |
| **Palamneus** | `palamneus` | [https://zoolearn.in/zoohub/arthropoda/palamneus](https://zoolearn.in/zoohub/arthropoda/palamneus) |
| **Palinurus** | `palinurus` | [https://zoolearn.in/zoohub/arthropoda/palinurus](https://zoolearn.in/zoohub/arthropoda/palinurus) |
| **Peripatus** | `peripatus` | [https://zoolearn.in/zoohub/arthropoda/peripatus](https://zoolearn.in/zoohub/arthropoda/peripatus) |
| **Periplaneta americana** | `periplaneta-americana` | [https://zoolearn.in/zoohub/arthropoda/periplaneta-americana](https://zoolearn.in/zoohub/arthropoda/periplaneta-americana) |
| **Philosamia ricini** | `philosamia-ricini` | [https://zoolearn.in/zoohub/arthropoda/philosamia-ricini](https://zoolearn.in/zoohub/arthropoda/philosamia-ricini) |
| **Phlebotomus** | `phlebotomus` | [https://zoolearn.in/zoohub/arthropoda/phlebotomus](https://zoolearn.in/zoohub/arthropoda/phlebotomus) |
| **Scolopendra hardwickei** | `scolopendra-hardwickei` | [https://zoolearn.in/zoohub/arthropoda/scolopendra-hardwickei](https://zoolearn.in/zoohub/arthropoda/scolopendra-hardwickei) |
| **Xenopsylla** | `xenopsylla` | [https://zoolearn.in/zoohub/arthropoda/xenopsylla](https://zoolearn.in/zoohub/arthropoda/xenopsylla) |

### Phylum: Aschelminthes (8 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Ancylostoma duodenale** | `ancylostoma` | [https://zoolearn.in/zoohub/aschelminthes/ancylostoma](https://zoolearn.in/zoohub/aschelminthes/ancylostoma) |
| **Ascaris lumbricoides** | `ascaris` | [https://zoolearn.in/zoohub/aschelminthes/ascaris](https://zoolearn.in/zoohub/aschelminthes/ascaris) |
| **Dracunculus medinensis** | `dracunculus` | [https://zoolearn.in/zoohub/aschelminthes/dracunculus](https://zoolearn.in/zoohub/aschelminthes/dracunculus) |
| **Enterobius vermicularis** | `enterobius` | [https://zoolearn.in/zoohub/aschelminthes/enterobius](https://zoolearn.in/zoohub/aschelminthes/enterobius) |
| **Loa loa** | `loa-loa` | [https://zoolearn.in/zoohub/aschelminthes/loa-loa](https://zoolearn.in/zoohub/aschelminthes/loa-loa) |
| **Trichinella spiralis** | `trichinella` | [https://zoolearn.in/zoohub/aschelminthes/trichinella](https://zoolearn.in/zoohub/aschelminthes/trichinella) |
| **Trichuris trichiura** | `trichuris` | [https://zoolearn.in/zoohub/aschelminthes/trichuris](https://zoolearn.in/zoohub/aschelminthes/trichuris) |
| **Wuchereria bancrofti** | `wuchereria` | [https://zoolearn.in/zoohub/aschelminthes/wuchereria](https://zoolearn.in/zoohub/aschelminthes/wuchereria) |

### Phylum: Chordata (154 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Alligator** | `alligator` | [https://zoolearn.in/zoohub/chordata/alligator](https://zoolearn.in/zoohub/chordata/alligator) |
| **Alytes** | `alytes` | [https://zoolearn.in/zoohub/chordata/alytes](https://zoolearn.in/zoohub/chordata/alytes) |
| **Ambystoma tigrinum** | `ambystoma` | [https://zoolearn.in/zoohub/chordata/ambystoma](https://zoolearn.in/zoohub/chordata/ambystoma) |
| **Antechinus flavipes** | `antechinus_flavipes` | [https://zoolearn.in/zoohub/chordata/antechinus_flavipes](https://zoolearn.in/zoohub/chordata/antechinus_flavipes) |
| **Aptenodytes forsteri** | `aptenodytes_forsteri` | [https://zoolearn.in/zoohub/chordata/aptenodytes_forsteri](https://zoolearn.in/zoohub/chordata/aptenodytes_forsteri) |
| **Apteryx** | `apteryx` | [https://zoolearn.in/zoohub/chordata/apteryx](https://zoolearn.in/zoohub/chordata/apteryx) |
| **Archaeopteryx** | `archaeopteryx` | [https://zoolearn.in/zoohub/chordata/archaeopteryx](https://zoolearn.in/zoohub/chordata/archaeopteryx) |
| **Ascidia** | `ascidia` | [https://zoolearn.in/zoohub/chordata/ascidia](https://zoolearn.in/zoohub/chordata/ascidia) |
| **Australopithecus afarensis** | `australopithecus_afarensis` | [https://zoolearn.in/zoohub/chordata/australopithecus_afarensis](https://zoolearn.in/zoohub/chordata/australopithecus_afarensis) |
| **Australopithecus africanus** | `australopithecus_africanus` | [https://zoolearn.in/zoohub/chordata/australopithecus_africanus](https://zoolearn.in/zoohub/chordata/australopithecus_africanus) |
| **Australopithecus boisei** | `australopithecus_boisei` | [https://zoolearn.in/zoohub/chordata/australopithecus_boisei](https://zoolearn.in/zoohub/chordata/australopithecus_boisei) |
| **Australopithecus robustus** | `australopithecus_robustus` | [https://zoolearn.in/zoohub/chordata/australopithecus_robustus](https://zoolearn.in/zoohub/chordata/australopithecus_robustus) |
| **Balaenoptera musculus** | `balaenoptera_musculus` | [https://zoolearn.in/zoohub/chordata/balaenoptera_musculus](https://zoolearn.in/zoohub/chordata/balaenoptera_musculus) |
| **Betta splendens** | `betta` | [https://zoolearn.in/zoohub/chordata/betta](https://zoolearn.in/zoohub/chordata/betta) |
| **Bos Indicus** | `bos_indicus` | [https://zoolearn.in/zoohub/chordata/bos_indicus](https://zoolearn.in/zoohub/chordata/bos_indicus) |
| **Brachiosaurus altithorax** | `brachiosaurus` | [https://zoolearn.in/zoohub/chordata/brachiosaurus](https://zoolearn.in/zoohub/chordata/brachiosaurus) |
| **Branchiostoma Lanceolatum** | `branchiostoma_lanceolatum` | [https://zoolearn.in/zoohub/chordata/branchiostoma_lanceolatum](https://zoolearn.in/zoohub/chordata/branchiostoma_lanceolatum) |
| **Bufo** | `bufo` | [https://zoolearn.in/zoohub/chordata/bufo](https://zoolearn.in/zoohub/chordata/bufo) |
| **Bungarus** | `bungarus` | [https://zoolearn.in/zoohub/chordata/bungarus](https://zoolearn.in/zoohub/chordata/bungarus) |
| **Callippus** | `callippus` | [https://zoolearn.in/zoohub/chordata/callippus](https://zoolearn.in/zoohub/chordata/callippus) |
| **Calotes** | `calotes` | [https://zoolearn.in/zoohub/chordata/calotes](https://zoolearn.in/zoohub/chordata/calotes) |
| **Camarhynchus pallidus** | `camarhynchus_pallidus` | [https://zoolearn.in/zoohub/chordata/camarhynchus_pallidus](https://zoolearn.in/zoohub/chordata/camarhynchus_pallidus) |
| **Camarhynchus parvulus** | `camarhynchus_parvulus` | [https://zoolearn.in/zoohub/chordata/camarhynchus_parvulus](https://zoolearn.in/zoohub/chordata/camarhynchus_parvulus) |
| **Camarhynchus psittacula** | `camarhynchus_psittacula` | [https://zoolearn.in/zoohub/chordata/camarhynchus_psittacula](https://zoolearn.in/zoohub/chordata/camarhynchus_psittacula) |
| **Camelus** | `camelus` | [https://zoolearn.in/zoohub/chordata/camelus](https://zoolearn.in/zoohub/chordata/camelus) |
| **Canis lupus familiaris** | `canis_lupus_familiaris` | [https://zoolearn.in/zoohub/chordata/canis_lupus_familiaris](https://zoolearn.in/zoohub/chordata/canis_lupus_familiaris) |
| **Carcharodon carcharias** | `carcharodon` | [https://zoolearn.in/zoohub/chordata/carcharodon](https://zoolearn.in/zoohub/chordata/carcharodon) |
| **Casuarius** | `casuarius` | [https://zoolearn.in/zoohub/chordata/casuarius](https://zoolearn.in/zoohub/chordata/casuarius) |
| **Catla catla** | `catla` | [https://zoolearn.in/zoohub/chordata/catla](https://zoolearn.in/zoohub/chordata/catla) |
| **Cephalaspis ✝︎** | `cephalaspis` | [https://zoolearn.in/zoohub/chordata/cephalaspis](https://zoolearn.in/zoohub/chordata/cephalaspis) |
| **Certhidea olivacea** | `certhidea_olivacea` | [https://zoolearn.in/zoohub/chordata/certhidea_olivacea](https://zoolearn.in/zoohub/chordata/certhidea_olivacea) |
| **Chalcophaps indica** | `chalcophaps_indica` | [https://zoolearn.in/zoohub/chordata/chalcophaps_indica](https://zoolearn.in/zoohub/chordata/chalcophaps_indica) |
| **Chamaeleon** | `chamaeleon` | [https://zoolearn.in/zoohub/chordata/chamaeleon](https://zoolearn.in/zoohub/chordata/chamaeleon) |
| **Chelone** | `chelone` | [https://zoolearn.in/zoohub/chordata/chelone](https://zoolearn.in/zoohub/chordata/chelone) |
| **Clarias batrachus** | `clarias` | [https://zoolearn.in/zoohub/chordata/clarias](https://zoolearn.in/zoohub/chordata/clarias) |
| **Climatius ✝︎** | `climatius` | [https://zoolearn.in/zoohub/chordata/climatius](https://zoolearn.in/zoohub/chordata/climatius) |
| **Columba** | `columba` | [https://zoolearn.in/zoohub/chordata/columba](https://zoolearn.in/zoohub/chordata/columba) |
| **Corvus** | `corvus` | [https://zoolearn.in/zoohub/chordata/corvus](https://zoolearn.in/zoohub/chordata/corvus) |
| **Crocodylus** | `crocodylus` | [https://zoolearn.in/zoohub/chordata/crocodylus](https://zoolearn.in/zoohub/chordata/crocodylus) |
| **Dasyurus maculatus** | `dasyurus_maculatus` | [https://zoolearn.in/zoohub/chordata/dasyurus_maculatus](https://zoolearn.in/zoohub/chordata/dasyurus_maculatus) |
| **Delphinus** | `delphinus` | [https://zoolearn.in/zoohub/chordata/delphinus](https://zoolearn.in/zoohub/chordata/delphinus) |
| **Didelphis marsupialis** | `didelphis_marsupialis` | [https://zoolearn.in/zoohub/chordata/didelphis_marsupialis](https://zoolearn.in/zoohub/chordata/didelphis_marsupialis) |
| **Diomedea** | `diomedea` | [https://zoolearn.in/zoohub/chordata/diomedea](https://zoolearn.in/zoohub/chordata/diomedea) |
| **Doliolum** | `doliolum` | [https://zoolearn.in/zoohub/chordata/doliolum](https://zoolearn.in/zoohub/chordata/doliolum) |
| **Draco** | `draco` | [https://zoolearn.in/zoohub/chordata/draco](https://zoolearn.in/zoohub/chordata/draco) |
| **Dromaius novaehollandiae** | `dromaius_novaehollandiae` | [https://zoolearn.in/zoohub/chordata/dromaius_novaehollandiae](https://zoolearn.in/zoohub/chordata/dromaius_novaehollandiae) |
| **Dryopithecus  africanus** | `dryopithecus` | [https://zoolearn.in/zoohub/chordata/dryopithecus](https://zoolearn.in/zoohub/chordata/dryopithecus) |
| **Dugong dugon** | `dugong_dugon` | [https://zoolearn.in/zoohub/chordata/dugong_dugon](https://zoolearn.in/zoohub/chordata/dugong_dugon) |
| **Echeneis** | `echeneis` | [https://zoolearn.in/zoohub/chordata/echeneis](https://zoolearn.in/zoohub/chordata/echeneis) |
| **Echidna** | `echidna` | [https://zoolearn.in/zoohub/chordata/echidna](https://zoolearn.in/zoohub/chordata/echidna) |
| **Elephas Maximus** | `elephas_maximus` | [https://zoolearn.in/zoohub/chordata/elephas_maximus](https://zoolearn.in/zoohub/chordata/elephas_maximus) |
| **Equus ferus** | `equus_ferus` | [https://zoolearn.in/zoohub/chordata/equus_ferus](https://zoolearn.in/zoohub/chordata/equus_ferus) |
| **Exocoetus** | `exocoetus` | [https://zoolearn.in/zoohub/chordata/exocoetus](https://zoolearn.in/zoohub/chordata/exocoetus) |
| **Felis catus** | `felis_catus` | [https://zoolearn.in/zoohub/chordata/felis_catus](https://zoolearn.in/zoohub/chordata/felis_catus) |
| **Funambulus palmarum** | `funambulus_palmarum` | [https://zoolearn.in/zoohub/chordata/funambulus_palmarum](https://zoolearn.in/zoohub/chordata/funambulus_palmarum) |
| **Gallus gallus** | `gallus_gallus` | [https://zoolearn.in/zoohub/chordata/gallus_gallus](https://zoolearn.in/zoohub/chordata/gallus_gallus) |
| **Gavialis gangeticus** | `gavialis_gangeticus` | [https://zoolearn.in/zoohub/chordata/gavialis_gangeticus](https://zoolearn.in/zoohub/chordata/gavialis_gangeticus) |
| **Geospiza difficilis** | `geospiza_difficilis` | [https://zoolearn.in/zoohub/chordata/geospiza_difficilis](https://zoolearn.in/zoohub/chordata/geospiza_difficilis) |
| **Geospiza fortis** | `geospiza_fortis` | [https://zoolearn.in/zoohub/chordata/geospiza_fortis](https://zoolearn.in/zoohub/chordata/geospiza_fortis) |
| **Geospiza fuliginosa** | `geospiza_fuliginosa` | [https://zoolearn.in/zoohub/chordata/geospiza_fuliginosa](https://zoolearn.in/zoohub/chordata/geospiza_fuliginosa) |
| **Geospiza magnirostris** | `geospiza_magnirostris` | [https://zoolearn.in/zoohub/chordata/geospiza_magnirostris](https://zoolearn.in/zoohub/chordata/geospiza_magnirostris) |
| **Geospiza scandens** | `geospiza_scandens` | [https://zoolearn.in/zoohub/chordata/geospiza_scandens](https://zoolearn.in/zoohub/chordata/geospiza_scandens) |
| **Gorilla gorilla** | `gorilla_gorilla` | [https://zoolearn.in/zoohub/chordata/gorilla_gorilla](https://zoolearn.in/zoohub/chordata/gorilla_gorilla) |
| **Hemidactylus** | `hemidactylus` | [https://zoolearn.in/zoohub/chordata/hemidactylus](https://zoolearn.in/zoohub/chordata/hemidactylus) |
| **Herdmania** | `herdmania` | [https://zoolearn.in/zoohub/chordata/herdmania](https://zoolearn.in/zoohub/chordata/herdmania) |
| **Hippocampus** | `hippocampus` | [https://zoolearn.in/zoohub/chordata/hippocampus](https://zoolearn.in/zoohub/chordata/hippocampus) |
| **Homo erectus** | `homo_erectus` | [https://zoolearn.in/zoohub/chordata/homo_erectus](https://zoolearn.in/zoohub/chordata/homo_erectus) |
| **Homo habilis** | `homo_habilis` | [https://zoolearn.in/zoohub/chordata/homo_habilis](https://zoolearn.in/zoohub/chordata/homo_habilis) |
| **Homo neanderthalensis** | `homo_neanderthalensis` | [https://zoolearn.in/zoohub/chordata/homo_neanderthalensis](https://zoolearn.in/zoohub/chordata/homo_neanderthalensis) |
| **Homo sapiens** | `homo_sapiens` | [https://zoolearn.in/zoohub/chordata/homo_sapiens](https://zoolearn.in/zoohub/chordata/homo_sapiens) |
| **Hydrophis** | `hydrophis` | [https://zoolearn.in/zoohub/chordata/hydrophis](https://zoolearn.in/zoohub/chordata/hydrophis) |
| **Hyla** | `hyla` | [https://zoolearn.in/zoohub/chordata/hyla](https://zoolearn.in/zoohub/chordata/hyla) |
| **Hylobates hoolock** | `hylobates_hoolock` | [https://zoolearn.in/zoohub/chordata/hylobates_hoolock](https://zoolearn.in/zoohub/chordata/hylobates_hoolock) |
| **Hylonomus ✝︎** | `hylonomus` | [https://zoolearn.in/zoohub/chordata/hylonomus](https://zoolearn.in/zoohub/chordata/hylonomus) |
| **Hyracotherium** | `hyracotherium` | [https://zoolearn.in/zoohub/chordata/hyracotherium](https://zoolearn.in/zoohub/chordata/hyracotherium) |
| **Ichthyophis** | `ichthyophis` | [https://zoolearn.in/zoohub/chordata/ichthyophis](https://zoolearn.in/zoohub/chordata/ichthyophis) |
| **Ichthyosaurus communis** | `ichthyosaurus` | [https://zoolearn.in/zoohub/chordata/ichthyosaurus](https://zoolearn.in/zoohub/chordata/ichthyosaurus) |
| **Kenyapithecus wickeri** | `kenyapithecus_wickeri` | [https://zoolearn.in/zoohub/chordata/kenyapithecus_wickeri](https://zoolearn.in/zoohub/chordata/kenyapithecus_wickeri) |
| **Labeo rohita** | `labeo` | [https://zoolearn.in/zoohub/chordata/labeo](https://zoolearn.in/zoohub/chordata/labeo) |
| **Latimeria chalumnae** | `latimeria` | [https://zoolearn.in/zoohub/chordata/latimeria](https://zoolearn.in/zoohub/chordata/latimeria) |
| **Lemur catta** | `lemur_catta` | [https://zoolearn.in/zoohub/chordata/lemur_catta](https://zoolearn.in/zoohub/chordata/lemur_catta) |
| **Lepus nigricollis** | `lepus_nigricollis` | [https://zoolearn.in/zoohub/chordata/lepus_nigricollis](https://zoolearn.in/zoohub/chordata/lepus_nigricollis) |
| **Loxodonta Africana** | `loxodonta_africana` | [https://zoolearn.in/zoohub/chordata/loxodonta_africana](https://zoolearn.in/zoohub/chordata/loxodonta_africana) |
| **Lutra** | `lutra` | [https://zoolearn.in/zoohub/chordata/lutra](https://zoolearn.in/zoohub/chordata/lutra) |
| **Lynx rufus** | `lynx` | [https://zoolearn.in/zoohub/chordata/lynx](https://zoolearn.in/zoohub/chordata/lynx) |
| **Macaca** | `macaca` | [https://zoolearn.in/zoohub/chordata/macaca](https://zoolearn.in/zoohub/chordata/macaca) |
| **Macropus** | `macropus` | [https://zoolearn.in/zoohub/chordata/macropus](https://zoolearn.in/zoohub/chordata/macropus) |
| **Manis crassicaudata** | `manis_crassicaudata` | [https://zoolearn.in/zoohub/chordata/manis_crassicaudata](https://zoolearn.in/zoohub/chordata/manis_crassicaudata) |
| **Merychippus** | `merychippus` | [https://zoolearn.in/zoohub/chordata/merychippus](https://zoolearn.in/zoohub/chordata/merychippus) |
| **Mesohippus** | `mesohippus` | [https://zoolearn.in/zoohub/chordata/mesohippus](https://zoolearn.in/zoohub/chordata/mesohippus) |
| **Miohippus** | `miohippus` | [https://zoolearn.in/zoohub/chordata/miohippus](https://zoolearn.in/zoohub/chordata/miohippus) |
| **Myrmecobius fasciatus** | `myrmecobius_fasciatus` | [https://zoolearn.in/zoohub/chordata/myrmecobius_fasciatus](https://zoolearn.in/zoohub/chordata/myrmecobius_fasciatus) |
| **Myxine glutinosa** | `myxine` | [https://zoolearn.in/zoohub/chordata/myxine](https://zoolearn.in/zoohub/chordata/myxine) |
| **Naja naja** | `naja_naja` | [https://zoolearn.in/zoohub/chordata/naja_naja](https://zoolearn.in/zoohub/chordata/naja_naja) |
| **Necturus maculosus** | `necturus` | [https://zoolearn.in/zoohub/chordata/necturus](https://zoolearn.in/zoohub/chordata/necturus) |
| **Neophron** | `neophron` | [https://zoolearn.in/zoohub/chordata/neophron](https://zoolearn.in/zoohub/chordata/neophron) |
| **Notoryctes typhlops** | `notoryctes` | [https://zoolearn.in/zoohub/chordata/notoryctes](https://zoolearn.in/zoohub/chordata/notoryctes) |
| **Ornithorhynchus anatinus** | `ornithorhynchus_anatinus` | [https://zoolearn.in/zoohub/chordata/ornithorhynchus_anatinus](https://zoolearn.in/zoohub/chordata/ornithorhynchus_anatinus) |
| **Orohippus** | `orohippus` | [https://zoolearn.in/zoohub/chordata/orohippus](https://zoolearn.in/zoohub/chordata/orohippus) |
| **Oryctolagus cuniculus** | `oryctolagus_cuniculus` | [https://zoolearn.in/zoohub/chordata/oryctolagus_cuniculus](https://zoolearn.in/zoohub/chordata/oryctolagus_cuniculus) |
| **Pan troglodytes** | `pan_troglodytes` | [https://zoolearn.in/zoohub/chordata/pan_troglodytes](https://zoolearn.in/zoohub/chordata/pan_troglodytes) |
| **Panthera leo** | `panthera_leo` | [https://zoolearn.in/zoohub/chordata/panthera_leo](https://zoolearn.in/zoohub/chordata/panthera_leo) |
| **Panthera tigris** | `panthera_tigris` | [https://zoolearn.in/zoohub/chordata/panthera_tigris](https://zoolearn.in/zoohub/chordata/panthera_tigris) |
| **Parahippus** | `parahippus` | [https://zoolearn.in/zoohub/chordata/parahippus](https://zoolearn.in/zoohub/chordata/parahippus) |
| **Passer** | `passer` | [https://zoolearn.in/zoohub/chordata/passer](https://zoolearn.in/zoohub/chordata/passer) |
| **Pavo cristatus** | `pavo_cristatus` | [https://zoolearn.in/zoohub/chordata/pavo_cristatus](https://zoolearn.in/zoohub/chordata/pavo_cristatus) |
| **Perameles** | `perameles` | [https://zoolearn.in/zoohub/chordata/perameles](https://zoolearn.in/zoohub/chordata/perameles) |
| **Petaurus breviceps** | `petaurus_breviceps` | [https://zoolearn.in/zoohub/chordata/petaurus_breviceps](https://zoolearn.in/zoohub/chordata/petaurus_breviceps) |
| **Petromyzon Marinus** | `petromyzon` | [https://zoolearn.in/zoohub/chordata/petromyzon](https://zoolearn.in/zoohub/chordata/petromyzon) |
| **Phascolarctos cinereus** | `phascolarctos_cinereus` | [https://zoolearn.in/zoohub/chordata/phascolarctos_cinereus](https://zoolearn.in/zoohub/chordata/phascolarctos_cinereus) |
| **Seal** | `phoca` | [https://zoolearn.in/zoohub/chordata/phoca](https://zoolearn.in/zoohub/chordata/phoca) |
| **Phrynosoma** | `phrynosoma` | [https://zoolearn.in/zoohub/chordata/phrynosoma](https://zoolearn.in/zoohub/chordata/phrynosoma) |
| **Physeter macrocephalus** | `physeter_macrocephalus` | [https://zoolearn.in/zoohub/chordata/physeter_macrocephalus](https://zoolearn.in/zoohub/chordata/physeter_macrocephalus) |
| **Pitohui dichrous** | `pitohui_dichrous` | [https://zoolearn.in/zoohub/chordata/pitohui_dichrous](https://zoolearn.in/zoohub/chordata/pitohui_dichrous) |
| **Platyspiza crassirostris** | `platyspiza_crassirostris` | [https://zoolearn.in/zoohub/chordata/platyspiza_crassirostris](https://zoolearn.in/zoohub/chordata/platyspiza_crassirostris) |
| **Pliohippus** | `pliohippus` | [https://zoolearn.in/zoohub/chordata/pliohippus](https://zoolearn.in/zoohub/chordata/pliohippus) |
| **Pongo pygmaeus** | `pongo_pygmaeus` | [https://zoolearn.in/zoohub/chordata/pongo_pygmaeus](https://zoolearn.in/zoohub/chordata/pongo_pygmaeus) |
| **Pristis** | `pristis` | [https://zoolearn.in/zoohub/chordata/pristis](https://zoolearn.in/zoohub/chordata/pristis) |
| **Protopterus annectens** | `protopterus` | [https://zoolearn.in/zoohub/chordata/protopterus](https://zoolearn.in/zoohub/chordata/protopterus) |
| **Psittacula** | `psittacula` | [https://zoolearn.in/zoohub/chordata/psittacula](https://zoolearn.in/zoohub/chordata/psittacula) |
| **Pteranodon longiceps** | `pteranodon` | [https://zoolearn.in/zoohub/chordata/pteranodon](https://zoolearn.in/zoohub/chordata/pteranodon) |
| **Pterophyllum scalare** | `pterophyllum` | [https://zoolearn.in/zoohub/chordata/pterophyllum](https://zoolearn.in/zoohub/chordata/pterophyllum) |
| **Pteropus** | `pteropus` | [https://zoolearn.in/zoohub/chordata/pteropus](https://zoolearn.in/zoohub/chordata/pteropus) |
| **Pyrosoma** | `pyrosoma` | [https://zoolearn.in/zoohub/chordata/pyrosoma](https://zoolearn.in/zoohub/chordata/pyrosoma) |
| **Python** | `python` | [https://zoolearn.in/zoohub/chordata/python](https://zoolearn.in/zoohub/chordata/python) |
| **Ramapithecus** | `ramapithecus` | [https://zoolearn.in/zoohub/chordata/ramapithecus](https://zoolearn.in/zoohub/chordata/ramapithecus) |
| **Rana Tigrina** | `rana` | [https://zoolearn.in/zoohub/chordata/rana](https://zoolearn.in/zoohub/chordata/rana) |
| **Raphus cucullatus ✝︎** | `raphus_cucullatus` | [https://zoolearn.in/zoohub/chordata/raphus_cucullatus](https://zoolearn.in/zoohub/chordata/raphus_cucullatus) |
| **Rattus Fuscipes** | `rattus_fuscipes` | [https://zoolearn.in/zoohub/chordata/rattus_fuscipes](https://zoolearn.in/zoohub/chordata/rattus_fuscipes) |
| **Rhacophorus** | `rhacophorus` | [https://zoolearn.in/zoohub/chordata/rhacophorus](https://zoolearn.in/zoohub/chordata/rhacophorus) |
| **Rhea** | `rhea` | [https://zoolearn.in/zoohub/chordata/rhea](https://zoolearn.in/zoohub/chordata/rhea) |
| **Rhinoceros unicornis** | `rhinoceros_unicornis` | [https://zoolearn.in/zoohub/chordata/rhinoceros_unicornis](https://zoolearn.in/zoohub/chordata/rhinoceros_unicornis) |
| **Salamandra** | `salamandra` | [https://zoolearn.in/zoohub/chordata/salamandra](https://zoolearn.in/zoohub/chordata/salamandra) |
| **Salpa** | `salpa` | [https://zoolearn.in/zoohub/chordata/salpa](https://zoolearn.in/zoohub/chordata/salpa) |
| **Sciurus** | `sciurus` | [https://zoolearn.in/zoohub/chordata/sciurus](https://zoolearn.in/zoohub/chordata/sciurus) |
| **Scoliodon Laticaudus** | `scoliodon` | [https://zoolearn.in/zoohub/chordata/scoliodon](https://zoolearn.in/zoohub/chordata/scoliodon) |
| **Sivapithecus** | `sivapithecus` | [https://zoolearn.in/zoohub/chordata/sivapithecus](https://zoolearn.in/zoohub/chordata/sivapithecus) |
| **Sphenodon punctatum** | `sphenodon_punctatum` | [https://zoolearn.in/zoohub/chordata/sphenodon_punctatum](https://zoolearn.in/zoohub/chordata/sphenodon_punctatum) |
| **Spilocuscus maculatus** | `spilocuscus_maculatus` | [https://zoolearn.in/zoohub/chordata/spilocuscus_maculatus](https://zoolearn.in/zoohub/chordata/spilocuscus_maculatus) |
| **Stegosaurus stenops** | `stegosaurus` | [https://zoolearn.in/zoohub/chordata/stegosaurus](https://zoolearn.in/zoohub/chordata/stegosaurus) |
| **Struthio camelus** | `struthio_camelus` | [https://zoolearn.in/zoohub/chordata/struthio_camelus](https://zoolearn.in/zoohub/chordata/struthio_camelus) |
| **Talpa europaea** | `talpa` | [https://zoolearn.in/zoohub/chordata/talpa](https://zoolearn.in/zoohub/chordata/talpa) |
| **Testudo** | `testudo` | [https://zoolearn.in/zoohub/chordata/testudo](https://zoolearn.in/zoohub/chordata/testudo) |
| **Thylacinus cynocephalus** | `thylacinus_cynocephalus` | [https://zoolearn.in/zoohub/chordata/thylacinus_cynocephalus](https://zoolearn.in/zoohub/chordata/thylacinus_cynocephalus) |
| **Torpedo** | `torpedo` | [https://zoolearn.in/zoohub/chordata/torpedo](https://zoolearn.in/zoohub/chordata/torpedo) |
| **Triceratops horridus** | `triceratops` | [https://zoolearn.in/zoohub/chordata/triceratops](https://zoolearn.in/zoohub/chordata/triceratops) |
| **Trichechus** | `trichechus` | [https://zoolearn.in/zoohub/chordata/trichechus](https://zoolearn.in/zoohub/chordata/trichechus) |
| **Trochilus colubris** | `trochilus_colubris` | [https://zoolearn.in/zoohub/chordata/trochilus_colubris](https://zoolearn.in/zoohub/chordata/trochilus_colubris) |
| **Trygon** | `trygon` | [https://zoolearn.in/zoohub/chordata/trygon](https://zoolearn.in/zoohub/chordata/trygon) |
| **Typhlops** | `typhlops` | [https://zoolearn.in/zoohub/chordata/typhlops](https://zoolearn.in/zoohub/chordata/typhlops) |
| **Tyrannosaurus rex** | `tyrannosaurus` | [https://zoolearn.in/zoohub/chordata/tyrannosaurus](https://zoolearn.in/zoohub/chordata/tyrannosaurus) |
| **Varanus** | `varanus` | [https://zoolearn.in/zoohub/chordata/varanus](https://zoolearn.in/zoohub/chordata/varanus) |
| **Vipera russelli** | `vipera_russelli` | [https://zoolearn.in/zoohub/chordata/vipera_russelli](https://zoolearn.in/zoohub/chordata/vipera_russelli) |
| **Vombatus** | `vombatus` | [https://zoolearn.in/zoohub/chordata/vombatus](https://zoolearn.in/zoohub/chordata/vombatus) |

### Phylum: Coelenterata (11 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Adamsia** | `adamsia` | [https://zoolearn.in/zoohub/coelenterata/adamsia](https://zoolearn.in/zoohub/coelenterata/adamsia) |
| **Antipatharia** | `antipatharia` | [https://zoolearn.in/zoohub/coelenterata/antipatharia](https://zoolearn.in/zoohub/coelenterata/antipatharia) |
| **Aurelia** | `aurelia` | [https://zoolearn.in/zoohub/coelenterata/aurelia](https://zoolearn.in/zoohub/coelenterata/aurelia) |
| **Corallium** | `corallium` | [https://zoolearn.in/zoohub/coelenterata/corallium](https://zoolearn.in/zoohub/coelenterata/corallium) |
| **Gorgonia** | `gorgonia` | [https://zoolearn.in/zoohub/coelenterata/gorgonia](https://zoolearn.in/zoohub/coelenterata/gorgonia) |
| **Hydra** | `hydra` | [https://zoolearn.in/zoohub/coelenterata/hydra](https://zoolearn.in/zoohub/coelenterata/hydra) |
| **Meandrina** | `meandrina` | [https://zoolearn.in/zoohub/coelenterata/meandrina](https://zoolearn.in/zoohub/coelenterata/meandrina) |
| **Metridium** | `metridium` | [https://zoolearn.in/zoohub/coelenterata/metridium](https://zoolearn.in/zoohub/coelenterata/metridium) |
| **Obelia** | `obelia` | [https://zoolearn.in/zoohub/coelenterata/obelia](https://zoolearn.in/zoohub/coelenterata/obelia) |
| **Pennatula** | `pennatula` | [https://zoolearn.in/zoohub/coelenterata/pennatula](https://zoolearn.in/zoohub/coelenterata/pennatula) |
| **Physalia** | `physalia` | [https://zoolearn.in/zoohub/coelenterata/physalia](https://zoolearn.in/zoohub/coelenterata/physalia) |

### Phylum: Ctenophora (5 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Beroe** | `beroe` | [https://zoolearn.in/zoohub/ctenophora/beroe](https://zoolearn.in/zoohub/ctenophora/beroe) |
| **Cestum** | `cestum` | [https://zoolearn.in/zoohub/ctenophora/cestum](https://zoolearn.in/zoohub/ctenophora/cestum) |
| **Ctenoplana** | `ctenoplana` | [https://zoolearn.in/zoohub/ctenophora/ctenoplana](https://zoolearn.in/zoohub/ctenophora/ctenoplana) |
| **Hormiphora** | `hormiphora` | [https://zoolearn.in/zoohub/ctenophora/hormiphora](https://zoolearn.in/zoohub/ctenophora/hormiphora) |
| **Pleurobrachia** | `pleurobrachia` | [https://zoolearn.in/zoohub/ctenophora/pleurobrachia](https://zoolearn.in/zoohub/ctenophora/pleurobrachia) |

### Phylum: Echinodermata (10 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Antedon** | `antedon` | [https://zoolearn.in/zoohub/echinodermata/antedon](https://zoolearn.in/zoohub/echinodermata/antedon) |
| **Asterias** | `asterias` | [https://zoolearn.in/zoohub/echinodermata/asterias](https://zoolearn.in/zoohub/echinodermata/asterias) |
| **Astropecten** | `astropecten` | [https://zoolearn.in/zoohub/echinodermata/astropecten](https://zoolearn.in/zoohub/echinodermata/astropecten) |
| **Cucumaria** | `cucumaria` | [https://zoolearn.in/zoohub/echinodermata/cucumaria](https://zoolearn.in/zoohub/echinodermata/cucumaria) |
| **Echinocardium** | `echinocardium` | [https://zoolearn.in/zoohub/echinodermata/echinocardium](https://zoolearn.in/zoohub/echinodermata/echinocardium) |
| **Echinus** | `echinus` | [https://zoolearn.in/zoohub/echinodermata/echinus](https://zoolearn.in/zoohub/echinodermata/echinus) |
| **Holothuria** | `holothuria` | [https://zoolearn.in/zoohub/echinodermata/holothuria](https://zoolearn.in/zoohub/echinodermata/holothuria) |
| **Ophiothrix** | `ophiothrix` | [https://zoolearn.in/zoohub/echinodermata/ophiothrix](https://zoolearn.in/zoohub/echinodermata/ophiothrix) |
| **Ophiura** | `ophiura` | [https://zoolearn.in/zoohub/echinodermata/ophiura](https://zoolearn.in/zoohub/echinodermata/ophiura) |
| **Pentaceros** | `pentaceros` | [https://zoolearn.in/zoohub/echinodermata/pentaceros](https://zoolearn.in/zoohub/echinodermata/pentaceros) |

### Phylum: Hemichordata (3 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Balanoglossus** | `balanoglossus` | [https://zoolearn.in/zoohub/hemichordata/balanoglossus](https://zoolearn.in/zoohub/hemichordata/balanoglossus) |
| **Ptychodera flava** | `ptychodera-flava` | [https://zoolearn.in/zoohub/hemichordata/ptychodera-flava](https://zoolearn.in/zoohub/hemichordata/ptychodera-flava) |
| **Saccoglossus** | `saccoglossus` | [https://zoolearn.in/zoohub/hemichordata/saccoglossus](https://zoolearn.in/zoohub/hemichordata/saccoglossus) |

### Phylum: Mollusca (18 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Aplysia** | `aplysia` | [https://zoolearn.in/zoohub/mollusca/aplysia](https://zoolearn.in/zoohub/mollusca/aplysia) |
| **Architeuthes** | `architeuthes` | [https://zoolearn.in/zoohub/mollusca/architeuthes](https://zoolearn.in/zoohub/mollusca/architeuthes) |
| **Chaetopleura** | `chaetopleura` | [https://zoolearn.in/zoohub/mollusca/chaetopleura](https://zoolearn.in/zoohub/mollusca/chaetopleura) |
| **Chiton** | `chiton` | [https://zoolearn.in/zoohub/mollusca/chiton](https://zoolearn.in/zoohub/mollusca/chiton) |
| **Conus marmoreus** | `conus_marmoreus` | [https://zoolearn.in/zoohub/mollusca/conus_marmoreus](https://zoolearn.in/zoohub/mollusca/conus_marmoreus) |
| **Dentalium** | `dentalium` | [https://zoolearn.in/zoohub/mollusca/dentalium](https://zoolearn.in/zoohub/mollusca/dentalium) |
| **Lamellidens** | `lamellidens` | [https://zoolearn.in/zoohub/mollusca/lamellidens](https://zoolearn.in/zoohub/mollusca/lamellidens) |
| **Loligo** | `loligo` | [https://zoolearn.in/zoohub/mollusca/loligo](https://zoolearn.in/zoohub/mollusca/loligo) |
| **Mytilus** | `mytilus` | [https://zoolearn.in/zoohub/mollusca/mytilus](https://zoolearn.in/zoohub/mollusca/mytilus) |
| **Nautilus** | `nautilus` | [https://zoolearn.in/zoohub/mollusca/nautilus](https://zoolearn.in/zoohub/mollusca/nautilus) |
| **Neopilina galathea** | `neopilina_galathea` | [https://zoolearn.in/zoohub/mollusca/neopilina_galathea](https://zoolearn.in/zoohub/mollusca/neopilina_galathea) |
| **Octopus** | `octopus` | [https://zoolearn.in/zoohub/mollusca/octopus](https://zoolearn.in/zoohub/mollusca/octopus) |
| **Ostrea** | `ostrea` | [https://zoolearn.in/zoohub/mollusca/ostrea](https://zoolearn.in/zoohub/mollusca/ostrea) |
| **Pila globosa** | `pila_globosa` | [https://zoolearn.in/zoohub/mollusca/pila_globosa](https://zoolearn.in/zoohub/mollusca/pila_globosa) |
| **Pinctada** | `pinctada` | [https://zoolearn.in/zoohub/mollusca/pinctada](https://zoolearn.in/zoohub/mollusca/pinctada) |
| **Sepia** | `sepia` | [https://zoolearn.in/zoohub/mollusca/sepia](https://zoolearn.in/zoohub/mollusca/sepia) |
| **Spondylus** | `spondylus` | [https://zoolearn.in/zoohub/mollusca/spondylus](https://zoolearn.in/zoohub/mollusca/spondylus) |
| **Unio** | `unio` | [https://zoolearn.in/zoohub/mollusca/unio](https://zoolearn.in/zoohub/mollusca/unio) |

### Phylum: Platyhelminthes (6 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Dugesia** | `dugesia` | [https://zoolearn.in/zoohub/platyhelminthes/dugesia](https://zoolearn.in/zoohub/platyhelminthes/dugesia) |
| **Echinococcus** | `echinococcus` | [https://zoolearn.in/zoohub/platyhelminthes/echinococcus](https://zoolearn.in/zoohub/platyhelminthes/echinococcus) |
| **Fasciola hepatica** | `fasciola` | [https://zoolearn.in/zoohub/platyhelminthes/fasciola](https://zoolearn.in/zoohub/platyhelminthes/fasciola) |
| **Schistosoma** | `schistosoma` | [https://zoolearn.in/zoohub/platyhelminthes/schistosoma](https://zoolearn.in/zoohub/platyhelminthes/schistosoma) |
| **Taenia saginata** | `taenia-saginata` | [https://zoolearn.in/zoohub/platyhelminthes/taenia-saginata](https://zoolearn.in/zoohub/platyhelminthes/taenia-saginata) |
| **Taenia solium** | `taenia-solium` | [https://zoolearn.in/zoohub/platyhelminthes/taenia-solium](https://zoolearn.in/zoohub/platyhelminthes/taenia-solium) |

### Phylum: Porifera (10 Species)

| Species Name | Slug | Full Production Route URL |
| :--- | :--- | :--- |
| **Chalina** | `chalina` | [https://zoolearn.in/zoohub/porifera/chalina](https://zoolearn.in/zoohub/porifera/chalina) |
| **Cliona** | `cliona` | [https://zoolearn.in/zoohub/porifera/cliona](https://zoolearn.in/zoohub/porifera/cliona) |
| **Euplectella** | `euplectella` | [https://zoolearn.in/zoohub/porifera/euplectella](https://zoolearn.in/zoohub/porifera/euplectella) |
| **Euspongia** | `euspongia` | [https://zoolearn.in/zoohub/porifera/euspongia](https://zoolearn.in/zoohub/porifera/euspongia) |
| **Grantia** | `grantia` | [https://zoolearn.in/zoohub/porifera/grantia](https://zoolearn.in/zoohub/porifera/grantia) |
| **Hyalonema** | `hyalonema` | [https://zoolearn.in/zoohub/porifera/hyalonema](https://zoolearn.in/zoohub/porifera/hyalonema) |
| **Leucosolenia** | `leucosolenia` | [https://zoolearn.in/zoohub/porifera/leucosolenia](https://zoolearn.in/zoohub/porifera/leucosolenia) |
| **Spongilla** | `spongilla` | [https://zoolearn.in/zoohub/porifera/spongilla](https://zoolearn.in/zoohub/porifera/spongilla) |
| **Sycon** | `sycon` | [https://zoolearn.in/zoohub/porifera/sycon](https://zoolearn.in/zoohub/porifera/sycon) |
| **Xestospongia** | `xestospongia` | [https://zoolearn.in/zoohub/porifera/xestospongia](https://zoolearn.in/zoohub/porifera/xestospongia) |

## 4. Backend API Endpoints

| Method | Endpoint Path | Production URL | Functionality |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | [https://zoolearn.in/api/auth/login](https://zoolearn.in/api/auth/login) | Authenticate user credentials & issue session token |
| `POST` | `/api/auth/register` | [https://zoolearn.in/api/auth/register](https://zoolearn.in/api/auth/register) | Register new user / student account |
| `POST` | `/api/auth/logout` | [https://zoolearn.in/api/auth/logout](https://zoolearn.in/api/auth/logout) | Revoke user session & clear cookies |
| `GET` | `/api/auth/me` | [https://zoolearn.in/api/auth/me](https://zoolearn.in/api/auth/me) | Fetch currently authenticated user profile |
