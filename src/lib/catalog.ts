export type ProductCategory = {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  color: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  serie: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  highlight?: boolean;
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  specs: { key: string; value: string }[];
  affiliateUrl: string;
  image?: string;
};

/* ── CATÉGORIES ── */

export const CATEGORIES: ProductCategory[] = [
  {
    slug: "pistolets-de-massage",
    name: "Pistolets de massage",
    description: "Percussion profonde pour libérer les tensions musculaires après l'effort.",
    image: "/images/Gemini_Generated_Image_ncown7ncown7ncow.png",
    imageAlt: "Sportif utilisant un pistolet de massage en salle de sport",
    color: "#E84525",
  },
  {
    slug: "rouleaux-et-balles",
    name: "Rouleaux & Balles",
    description: "Auto-massage ciblé pour les fascias, les grands groupes musculaires et les zones difficiles.",
    image: "/images/ahmad-sCXhCATmCo4-unsplash.jpg",
    imageAlt: "Équipement de fitness : roue abdominale, bandes élastiques et corde à sauter",
    color: "#1A9ED4",
  },
  {
    slug: "thermotherapie",
    name: "Froid & Chaud",
    description: "Cryothérapie et thermothérapie pour réduire l'inflammation et accélérer la récupération.",
    image: "/images/john-fornander-pLolUyEO6VI-unsplash.jpg",
    imageAlt: "Sportif en récupération après un entraînement intense",
    color: "#5BC8F5",
  },
  {
    slug: "compression",
    name: "Compression",
    description: "Bottes et manchons de pressothérapie pour drainer et régénérer après l'effort.",
    image: "/images/jadon-johnson-hWOzb-8_0Pg-unsplash.jpg",
    imageAlt: "Sportive en récupération sur piste d'athlétisme",
    color: "#7C3AED",
  },
  {
    slug: "mobilite",
    name: "Mobilité",
    description: "Tapis d'acupression et bandes de résistance pour l'échauffement et la récupération passive.",
    image: "/images/charlotte-karlsen-CNydde5SXYI-unsplash.jpg",
    imageAlt: "Sportif utilisant une bande de résistance élastique à l'extérieur",
    color: "#059669",
  },
];

/* ── PRODUITS ── */

export const CATALOG: CatalogProduct[] = [

  /* ── Pistolets de massage ── */
  {
    id: "massage-gun-pro",
    slug: "massage-gun-pro",
    name: "MyRecup Gun Pro",
    serie: "Gun",
    categorySlug: "pistolets-de-massage",
    image: "/images/Gemini_Generated_Image_px4mnpx4mnpx4mnp.png",
    price: 109,
    oldPrice: 149,
    rating: 4.7,
    reviews: 312,
    badge: "Bestseller",
    highlight: true,
    tagline: "Le pistolet principal de la gamme. Puissant, silencieux, autonome.",
    description:
      "Le Gun Pro est notre flagship. 12 mm d'amplitude, 5 vitesses, 48 dB au repos — il rivalise avec des pistolets deux fois plus chers. Stall force de 52 lbs, autonomie 8h, charge USB-C. Conçu pour les sportifs qui s'entraînent 4 à 6 fois par semaine et veulent un outil qui dure.",
    pros: [
      "Rapport performances/prix imbattable",
      "Silencieux : 48 dB",
      "8 heures d'autonomie",
      "6 têtes d'accessoires incluses",
      "Charge USB-C universelle",
    ],
    cons: [
      "Pas d'application Bluetooth",
      "Poids de 820 g (standard)",
    ],
    specs: [
      { key: "Amplitude", value: "12 mm" },
      { key: "Vitesses", value: "5" },
      { key: "Niveau sonore", value: "48 dB" },
      { key: "Autonomie", value: "8h" },
      { key: "Stall force", value: "52 lbs" },
      { key: "Têtes incluses", value: "6" },
      { key: "Poids", value: "820 g" },
      { key: "Charge", value: "USB-C" },
    ],
    affiliateUrl: "",
  },
  {
    id: "massage-gun-mini",
    slug: "massage-gun-mini",
    name: "MyRecup Gun Mini",
    serie: "Gun",
    categorySlug: "pistolets-de-massage",
    image: "/images/Gemini_Generated_Image_t8y2tzt8y2tzt8y2.png",
    price: 65,
    oldPrice: 89,
    rating: 4.4,
    reviews: 187,
    badge: "Compact",
    tagline: "Le compagnon de voyage. 380 g, tient dans une poche.",
    description:
      "Le Gun Mini prouve qu'un petit format n'est pas synonyme de compromis. Malgré ses 380 g, il délivre 12 mm d'amplitude et 3 vitesses. Parfait pour le sac de sport, la valise ou le bureau. Autonomie de 4h — largement suffisant pour une semaine de séances.",
    pros: [
      "Ultra compact : 380 g",
      "12 mm d'amplitude malgré la taille",
      "Silencieux pour sa catégorie",
      "Prix accessible",
    ],
    cons: [
      "3 vitesses seulement",
      "Autonomie limitée à 4h",
      "Stall force modeste (28 lbs)",
    ],
    specs: [
      { key: "Amplitude", value: "12 mm" },
      { key: "Vitesses", value: "3" },
      { key: "Niveau sonore", value: "52 dB" },
      { key: "Autonomie", value: "4h" },
      { key: "Stall force", value: "28 lbs" },
      { key: "Têtes incluses", value: "4" },
      { key: "Poids", value: "380 g" },
      { key: "Charge", value: "USB-C" },
    ],
    affiliateUrl: "",
  },

  /* ── Rouleaux & Balles ── */
  {
    id: "vibro-ball",
    slug: "vibro-ball",
    name: "MyRecup Vibro Ball",
    serie: "Vibro",
    categorySlug: "pistolets-de-massage",
    price: 49,
    oldPrice: 59,
    rating: 4.3,
    reviews: 94,
    badge: "Précision",
    tagline: "La balle vibrante pour cibler les fascias point par point.",
    description:
      "Le Vibro Ball complète le pistolet pour les zones difficiles d'accès : voûte plantaire, fessiers, omoplate. Sa forme sphérique permet une pression concentrée sur les points de tension. 3 vitesses de vibration, 90 minutes d'autonomie. Idéal associé au Gun Pro pour une routine complète.",
    pros: [
      "Précision sur les points de tension",
      "Parfait pour la voûte plantaire",
      "Léger et compact",
      "Prix abordable",
    ],
    cons: [
      "Autonomie limitée (90 min)",
      "Ne remplace pas un pistolet pour les grands muscles",
    ],
    specs: [
      { key: "Type", value: "Balle vibrante" },
      { key: "Vitesses", value: "3" },
      { key: "Autonomie", value: "90 min" },
      { key: "Diamètre", value: "7,5 cm" },
      { key: "Poids", value: "190 g" },
      { key: "Charge", value: "USB-C" },
    ],
    affiliateUrl: "",
  },
  {
    id: "peanut-roller",
    slug: "peanut-roller",
    name: "MyRecup Peanut Roller",
    serie: "Roller",
    categorySlug: "rouleaux-et-balles",
    price: 22,
    oldPrice: 27,
    rating: 4.5,
    reviews: 203,
    tagline: "La balle cacahuète. Masser le dos sans toucher les vertèbres.",
    description:
      "Deux balles reliées forment une cavité centrale qui préserve la colonne vertébrale. Posée au sol ou contre un mur, elle permet de masser les paravertébraux, les trapèzes et les lombaires en toute sécurité. Mousse haute densité 85D — ferme mais pas douloureuse. Utilisée par les kinés.",
    pros: [
      "Sécurisé pour la colonne vertébrale",
      "Idéal pour le dos, les trapèzes et les lombaires",
      "Utilisé en kinésithérapie",
      "Prix très abordable",
    ],
    cons: [
      "Usage spécifique (pas polyvalent)",
      "Pas vibrant",
    ],
    specs: [
      { key: "Type", value: "Balle double (peanut ball)" },
      { key: "Matière", value: "Mousse EVA 85D" },
      { key: "Dimensions", value: "16 × 8 cm" },
      { key: "Poids", value: "210 g" },
      { key: "Usage", value: "Dos, paravertébraux" },
    ],
    affiliateUrl: "",
  },
  {
    id: "foam-roller",
    slug: "foam-roller",
    name: "MyRecup Foam Roller",
    serie: "Roller",
    categorySlug: "rouleaux-et-balles",
    price: 33,
    oldPrice: 44,
    rating: 4.4,
    reviews: 271,
    tagline: "Le foam roller texturé haute densité. Pour les grands groupes musculaires.",
    description:
      "Le Foam Roller combine mousse haute densité (85D) et surface texturée pour un massage myofascial profond. Les reliefs pénètrent dans les tissus pour libérer les adhérences dans les quadriceps, ischio-jambiers, dos et mollets. 33 cm de longueur standard, portable et robuste.",
    pros: [
      "Surface texturée pour un effet en profondeur",
      "Mousse haute densité durable",
      "Taille standard (33 cm) idéale",
      "Sans entretien, sans batterie",
    ],
    cons: [
      "Peut être douloureux au début (normal)",
      "Moins précis qu'un pistolet",
    ],
    specs: [
      { key: "Type", value: "Foam roller texturé" },
      { key: "Dimensions", value: "33 × 14 cm" },
      { key: "Densité", value: "85D haute densité" },
      { key: "Matière", value: "Mousse EVA + ABS" },
      { key: "Poids max", value: "150 kg" },
    ],
    affiliateUrl: "",
  },
  {
    id: "vibro-roller",
    slug: "vibro-roller",
    name: "MyRecup Vibro Roller",
    serie: "Vibro",
    categorySlug: "rouleaux-et-balles",
    price: 77,
    oldPrice: 99,
    rating: 4.2,
    reviews: 68,
    badge: "Premium",
    tagline: "Le rouleau vibrant. Foam roller + vibrations pour un massage 2-en-1.",
    description:
      "Le Vibro Roller combine l'action mécanique du foam roller avec des vibrations haute fréquence (30-50 Hz) pour potentialiser les effets du massage myofascial. Idéal pour les sportifs avancés qui veulent aller plus loin dans leur récupération. 3 vitesses, 2h d'autonomie.",
    pros: [
      "Combine pression mécanique + vibrations",
      "Effet supérieur au foam roller classique",
      "3 vitesses adaptables",
      "Surface EVA confortable",
    ],
    cons: [
      "Prix plus élevé qu'un roller classique",
      "Autonomie de 2h à recharger",
    ],
    specs: [
      { key: "Type", value: "Foam roller vibrant" },
      { key: "Vitesses", value: "3 (30–50 Hz)" },
      { key: "Autonomie", value: "2h" },
      { key: "Dimensions", value: "33 × 15 cm" },
      { key: "Poids", value: "820 g" },
      { key: "Charge", value: "USB-C" },
    ],
    affiliateUrl: "",
  },

  /* ── Froid & Chaud ── */
  {
    id: "hot-cold-pack",
    slug: "hot-cold-pack",
    name: "MyRecup Hot Cold Pack",
    serie: "Ice",
    categorySlug: "thermotherapie",
    price: 17,
    oldPrice: 22,
    rating: 4.6,
    reviews: 445,
    badge: "Indispensable",
    tagline: "Chaud ou froid selon vos besoins. La poche gel réutilisable premium.",
    description:
      "Le Hot Cold Pack est la poche gel réutilisable pensée pour durer. Sa housse en néoprène évite les brûlures par le froid et tient la température 30 minutes de plus qu'une poche gel classique. En froid : soulagement immédiat des inflammations. En chaud : décontraction musculaire avant l'effort.",
    pros: [
      "Double usage : chaud et froid",
      "Housse néoprène incluse",
      "Maintient la température 45 min",
      "Gel non toxique et réutilisable",
    ],
    cons: [
      "Doit être préparé à l'avance",
    ],
    specs: [
      { key: "Usage", value: "Chaud & Froid" },
      { key: "Température froid", value: "Jusqu'à -18°C" },
      { key: "Température chaud", value: "Jusqu'à 80°C (micro-ondes)" },
      { key: "Maintien température", value: "~45 min" },
      { key: "Dimensions", value: "26 × 18 cm" },
      { key: "Matière housse", value: "Néoprène" },
    ],
    affiliateUrl: "",
  },
  {
    id: "wrap-hot-cold",
    slug: "wrap-hot-cold",
    name: "MyRecup Wrap Froid/Chaud",
    serie: "Ice",
    categorySlug: "thermotherapie",
    price: 22,
    oldPrice: 29,
    rating: 4.5,
    reviews: 156,
    badge: "Nouveau",
    tagline: "Le wrap ajustable chaud/froid. Couvre genou, épaule, poignet — une seule pièce.",
    description:
      "Le Wrap Froid/Chaud est une housse en néoprène avec poche intégrée pour insérer le Hot Cold Pack. Son système de velcro ajustable s'adapte à toutes les articulations : genou, épaule, coude, cheville. En froid après un choc ou une inflammation, en chaud pour détendre un muscle contracté. La solution mobile pour cibler précisément une zone douloureuse.",
    pros: [
      "Maintient le gel en place sur l'articulation",
      "S'adapte à genou, épaule, coude, cheville",
      "Compatible avec le Hot Cold Pack MyRecup",
      "Néoprène respirant, lavable",
      "Prix très accessible",
    ],
    cons: [
      "Le gel (Hot Cold Pack) doit être préparé à l'avance",
      "Taille unique — peut ne pas convenir aux très grandes morphologies",
    ],
    specs: [
      { key: "Matière", value: "Néoprène respirant" },
      { key: "Fermeture", value: "Velcro ajustable" },
      { key: "Zones cibles", value: "Genou, épaule, coude, cheville" },
      { key: "Compatible", value: "Hot Cold Pack MyRecup" },
      { key: "Lavable", value: "Oui (à la main)" },
      { key: "Taille", value: "Universelle (ajustable)" },
    ],
    affiliateUrl: "",
  },
  {
    id: "ice-bath-tub",
    slug: "ice-bath-tub",
    name: "MyRecup Ice Bath Tub",
    serie: "Ice",
    categorySlug: "thermotherapie",
    price: 143,
    oldPrice: 199,
    rating: 4.3,
    reviews: 41,
    badge: "Viral",
    tagline: "Le bain de glace portable. La récupération extrême à la maison.",
    description:
      "Le Ice Bath Tub rend le bain de glace accessible à domicile. Sa structure gonflable résistante (660D PVC) se déploie en 3 minutes. Capacité 380 L, compatible avec un thermomètre et des blocs de glace. Popularisé par les athlètes de haut niveau et les influenceurs fitness, le bain de glace réduit l'inflammation, améliore la récupération nerveuse et booste la dopamine.",
    pros: [
      "Gonflable — rangement facile",
      "Taille adulte jusqu'à 1,95 m",
      "Compatible tous types de glace",
      "Très tendance sur les réseaux",
    ],
    cons: [
      "Nécessite beaucoup de glace",
      "Pratique à maîtriser (pas pour débutants)",
      "Prix moyen",
    ],
    specs: [
      { key: "Type", value: "Bain de glace gonflable" },
      { key: "Capacité", value: "380 L" },
      { key: "Dimensions", value: "80 × 80 × 75 cm" },
      { key: "Matière", value: "PVC 660D multicouche" },
      { key: "Taille utilisateur", value: "Jusqu'à 1,95 m" },
      { key: "Poids (vide)", value: "3,2 kg" },
    ],
    affiliateUrl: "",
  },

  /* ── Compression ── */
  {
    id: "compression-boots",
    slug: "compression-boots",
    name: "MyRecup Compression Boots",
    serie: "Compression",
    categorySlug: "compression",
    price: 133,
    oldPrice: 279,
    rating: 4.8,
    reviews: 89,
    badge: "Promo -52%",
    highlight: true,
    tagline: "La pressothérapie professionnelle. Récupération × 3 après chaque séance.",
    description:
      "Les Compression Boots apportent la pressothérapie dynamique — utilisée par les équipes cyclistes professionnelles et les coureurs de marathon — à domicile. 4 chambres à compression séquentielle drainent les toxines des pieds aux genoux. Résultat : jambes légères en 20 minutes. Compatible avec tous les formats de jambes, 10 niveaux de pression.",
    pros: [
      "Effet immédiat : jambes légères en 20 min",
      "10 niveaux de pression",
      "4 chambres à compression séquentielle",
      "Utilisé par les pros du cyclisme",
      "Augmente significativement le panier moyen",
    ],
    cons: [
      "Prix élevé",
      "Nécessite une prise secteur",
      "Volumineux à ranger",
    ],
    specs: [
      { key: "Chambres", value: "4 (compression séquentielle)" },
      { key: "Niveaux de pression", value: "10" },
      { key: "Pression max", value: "250 mmHg" },
      { key: "Durée séance", value: "20 à 60 min" },
      { key: "Tailles disponibles", value: "S / M / L / XL" },
      { key: "Alimentation", value: "Secteur 220V" },
    ],
    affiliateUrl: "",
  },

  /* ── Mobilité ── */
  {
    id: "acupressure-mat",
    slug: "acupressure-mat",
    name: "MyRecup Acupressure Mat",
    serie: "Mat",
    categorySlug: "mobilite",
    price: 44,
    oldPrice: 59,
    rating: 4.5,
    reviews: 528,
    badge: "Récupération passive",
    tagline: "Le tapis d'acupression. 20 minutes allongé = muscles relâchés.",
    description:
      "Le Acupressure Mat est couvert de 6 210 picots en ABS qui stimulent les points de pression du dos, des épaules et de la nuque. En 20 minutes d'utilisation allongée, il déclenche une libération d'endorphines qui détend le système nerveux et réduit les tensions musculaires chroniques. Idéal avant de dormir.",
    pros: [
      "Aucun effort : récupération passive",
      "Réduit les tensions du dos et de la nuque",
      "Améliore le sommeil",
      "Prix accessible",
      "Inclut un coussin d'acupression",
    ],
    cons: [
      "Inconfortable les 2 premières semaines",
      "Pas adapté aux peaux très sensibles",
    ],
    specs: [
      { key: "Type", value: "Tapis d'acupression" },
      { key: "Picots", value: "6 210 points de pression" },
      { key: "Matière", value: "Lin naturel + ABS" },
      { key: "Dimensions", value: "65 × 42 cm" },
      { key: "Inclus", value: "Tapis + coussin cervical" },
      { key: "Usage recommandé", value: "20 min/jour" },
    ],
    affiliateUrl: "",
  },
  {
    id: "resistance-bands",
    slug: "resistance-bands",
    name: "MyRecup Resistance Bands",
    serie: "Bands",
    categorySlug: "mobilite",
    price: 27,
    oldPrice: 33,
    rating: 4.6,
    reviews: 734,
    badge: "Pack 5",
    tagline: "5 résistances, tissu non-glissant. Pour l'échauffement et la rééducation.",
    description:
      "Le Resistance Bands est un set de 5 bandes de résistance en tissu haute qualité (coton/élastane) avec grip anti-glissement. Contrairement aux bandes en latex, elles ne roulent pas et ne pincent pas la peau. Résistances de 5 à 40 kg couvrant tous les niveaux : débutant, intermédiaire, avancé.",
    pros: [
      "Tissu non-glissant, ne roule pas",
      "5 niveaux de résistance",
      "Confortable sur la peau",
      "Pochette de rangement incluse",
    ],
    cons: [
      "Moins polyvalent que les bandes longues",
    ],
    specs: [
      { key: "Quantité", value: "5 bandes" },
      { key: "Résistances", value: "5 / 10 / 15 / 25 / 40 kg" },
      { key: "Matière", value: "Coton / Élastane / Grip latex" },
      { key: "Largeur", value: "8 cm" },
      { key: "Inclus", value: "5 bandes + pochette" },
    ],
    affiliateUrl: "",
  },

];

/* ── HELPERS ── */

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  return CATALOG.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}
