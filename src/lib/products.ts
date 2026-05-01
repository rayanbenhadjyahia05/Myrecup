export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  amplitude: number;
  noise: number;
  battery: number;
  speeds: number;
  stallForce: number;
  heads: number;
  bluetooth: boolean;
  weight: number;
  rating: number;
  reviews: number;
  tag?: string;
  highlight?: boolean;
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "theragun-mini",
    slug: "theragun-mini-avis",
    name: "Theragun Mini 2.0",
    brand: "Therabody",
    price: 229,
    amplitude: 12,
    noise: 55,
    battery: 2.5,
    speeds: 3,
    stallForce: 30,
    heads: 4,
    bluetooth: true,
    weight: 621,
    rating: 4.1,
    reviews: 2847,
    tagline: "Le pistolet compact de la marque référence",
    description:
      "Le Theragun Mini 2.0 est le modèle d'entrée de gamme de Therabody, la marque qui a inventé le concept du pistolet de massage. Compact, léger (621 g) et connecté via Bluetooth, il convient parfaitement aux débutants et aux sportifs occasionnels qui veulent une marque reconnue sans se ruiner. Son principal défaut : l'autonomie limitée à 2,5 heures et seulement 3 vitesses.",
    pros: [
      "Marque de référence, qualité irréprochable",
      "Compact et léger (621 g)",
      "Application Bluetooth incluse",
      "4 têtes d'accessoires",
    ],
    cons: [
      "Autonomie courte : 2,5 heures",
      "Seulement 3 vitesses",
      "Prix élevé pour les prestations",
      "Niveau sonore un peu élevé (55 dB)",
    ],
    affiliateUrl: "https://www.amazon.fr/s?k=theragun+mini+2.0&tag=recuppro-21",
  },
  {
    id: "hypervolt-go2",
    slug: "hypervolt-go2-avis",
    name: "Hypervolt Go 2",
    brand: "Hyperice",
    price: 149,
    amplitude: 10,
    noise: 50,
    battery: 3,
    speeds: 3,
    stallForce: 30,
    heads: 3,
    bluetooth: true,
    weight: 690,
    rating: 4.2,
    reviews: 5123,
    tag: "Meilleur rapport qualité-prix",
    highlight: true,
    tagline: "Le meilleur rapport qualité-prix du marché",
    description:
      "L'Hypervolt Go 2 est notre recommandation principale pour la majorité des sportifs amateurs. À 149 €, il offre un niveau de qualité et de silence (50 dB) rarement atteint dans cette gamme. L'application Bluetooth permet de suivre des programmes guidés. Sa connectivité Bluetooth avec l'application Hyperice est un vrai plus. Idéal pour 3 à 5 séances par semaine.",
    pros: [
      "Excellent rapport qualité-prix",
      "Silencieux : 50 dB",
      "Application Bluetooth avec programmes guidés",
      "Compact et léger",
    ],
    cons: [
      "Seulement 3 têtes d'accessoires",
      "Amplitude de 10 mm (vs 12 mm pour les concurrents)",
      "Stall force modeste (30 lbs)",
    ],
    affiliateUrl: "https://www.amazon.fr/s?k=hypervolt+go+2&tag=recuppro-21",
  },
  {
    id: "ekrin-b37",
    slug: "ekrin-b37-avis",
    name: "Ekrin B37",
    brand: "Ekrin",
    price: 199,
    amplitude: 12,
    noise: 48,
    battery: 8,
    speeds: 5,
    stallForce: 56,
    heads: 5,
    bluetooth: false,
    weight: 886,
    rating: 4.6,
    reviews: 1892,
    tag: "Sportifs avancés",
    tagline: "La puissance des pros à prix demi-pro",
    description:
      "L'Ekrin B37 est le choix des sportifs avancés qui veulent une stall force professionnelle (56 lbs) sans payer le prix d'un Theragun Pro. Sa tête inclinée à 15° permet d'atteindre seul le haut du dos et les lombaires. Ses 8 heures d'autonomie sont imbattables. Le seul manque : pas d'application Bluetooth.",
    pros: [
      "Stall force exceptionnelle : 56 lbs",
      "Autonomie record : 8 heures",
      "Tête inclinée à 15° (dos facile à atteindre)",
      "5 vitesses et 5 têtes",
      "Niveau sonore très faible (48 dB)",
    ],
    cons: [
      "Pas d'application Bluetooth",
      "Le plus lourd de la sélection (886 g)",
      "Prix élevé",
    ],
    affiliateUrl: "https://www.amazon.fr/s?k=ekrin+b37&tag=recuppro-21",
  },
  {
    id: "renpho-r4",
    slug: "renpho-r4-avis",
    name: "Renpho R4 Pro",
    brand: "Renpho",
    price: 69,
    amplitude: 10,
    noise: 60,
    battery: 4,
    speeds: 5,
    stallForce: 25,
    heads: 6,
    bluetooth: false,
    weight: 720,
    rating: 3.8,
    reviews: 8734,
    tag: "Petit budget",
    tagline: "Le premier prix honnête du marché",
    description:
      "Le Renpho R4 Pro est la meilleure option si votre budget est limité à 70 €. Avec 6 têtes d'accessoires et 5 vitesses, il offre une polyvalence remarquable pour son prix. Sa stall force de 25 lbs est suffisante pour la récupération musculaire basique. Le niveau sonore (60 dB) est son principal défaut — évitez de l'utiliser dans un espace partagé.",
    pros: [
      "Prix imbattable : 69 €",
      "6 têtes d'accessoires incluses",
      "5 vitesses",
      "4 heures d'autonomie correctes",
    ],
    cons: [
      "Niveau sonore élevé (60 dB)",
      "Stall force faible (25 lbs)",
      "Qualité de construction inférieure",
      "Pas de Bluetooth",
    ],
    affiliateUrl: "https://www.amazon.fr/s?k=renpho+r4+pro&tag=recuppro-21",
  },
  {
    id: "achedaway-mini",
    slug: "achedaway-mini-avis",
    name: "Achedaway Mini",
    brand: "Achedaway",
    price: 99,
    amplitude: 12,
    noise: 50,
    battery: 3,
    speeds: 3,
    stallForce: 35,
    heads: 4,
    bluetooth: false,
    weight: 400,
    rating: 4.0,
    reviews: 634,
    tag: "Ultra compact",
    tagline: "Le plus léger du marché, 12 mm d'amplitude",
    description:
      "L'Achedaway Mini est une surprise : avec seulement 400 g, c'est le pistolet le plus léger de notre sélection, et pourtant il offre 12 mm d'amplitude — la même chose que des modèles deux fois plus chers. Idéal pour les voyageurs et les sportifs qui veulent quelque chose dans leur sac de sport sans s'alourdir.",
    pros: [
      "Poids record : 400 g",
      "12 mm d'amplitude malgré sa taille",
      "Silencieux (50 dB)",
      "Rapport poids/performance excellent",
    ],
    cons: [
      "Pas de Bluetooth",
      "Seulement 3 vitesses",
      "Autonomie limitée (3h)",
      "Marque peu connue en France",
    ],
    affiliateUrl: "https://www.amazon.fr/s?k=achedaway+mini&tag=recuppro-21",
  },
  {
    id: "theragun-pro",
    slug: "theragun-pro-avis",
    name: "Theragun Pro 5",
    brand: "Therabody",
    price: 599,
    amplitude: 16,
    noise: 60,
    battery: 2.5,
    speeds: 5,
    stallForce: 60,
    heads: 6,
    bluetooth: true,
    weight: 1310,
    rating: 4.8,
    reviews: 3241,
    tag: "Professionnel",
    tagline: "L'outil des kinés et des sportifs de haut niveau",
    description:
      "Le Theragun Pro 5 est le pistolet de référence des professionnels de santé et des sportifs de haut niveau. Son amplitude de 16 mm (unique sur le marché grand public) et sa stall force de 60 lbs permettent de travailler en profondeur les muscles les plus épais. Son prix de 599 € se justifie pour un usage professionnel ou très intensif — pas pour un sportif amateur.",
    pros: [
      "Amplitude record : 16 mm",
      "Stall force maximale : 60 lbs",
      "Application Bluetooth avancée",
      "6 têtes professionnelles",
      "Construction premium",
    ],
    cons: [
      "Prix élevé : 599 €",
      "Lourd : 1,3 kg",
      "Autonomie courte (2,5h) pour le prix",
      "Niveau sonore élevé (60 dB)",
    ],
    affiliateUrl: "https://www.amazon.fr/s?k=theragun+pro+5&tag=recuppro-21",
  },
  {
    id: "hypervolt-2pro",
    slug: "hypervolt-2pro-avis",
    name: "Hypervolt 2 Pro",
    brand: "Hyperice",
    price: 299,
    amplitude: 14,
    noise: 52,
    battery: 3,
    speeds: 5,
    stallForce: 45,
    heads: 5,
    bluetooth: true,
    weight: 1200,
    rating: 4.5,
    reviews: 2108,
    tagline: "Le haut de gamme silencieux de Hyperice",
    description:
      "L'Hypervolt 2 Pro est le modèle haut de gamme de Hyperice. Avec 14 mm d'amplitude, 45 lbs de stall force et une application Bluetooth complète, il se positionne entre l'Ekrin B37 et le Theragun Pro. Son niveau sonore de 52 dB est remarquable pour ses performances. Un bon choix pour les sportifs sérieux qui privilégient la marque Hyperice.",
    pros: [
      "14 mm d'amplitude",
      "Application Bluetooth complète",
      "Relativement silencieux (52 dB)",
      "5 têtes et 5 vitesses",
    ],
    cons: [
      "Lourd : 1,2 kg",
      "Autonomie modeste (3h) pour le prix",
      "299 € : cher face à l'Ekrin B37 plus puissant",
    ],
    affiliateUrl: "https://www.amazon.fr/s?k=hypervolt+2+pro&tag=recuppro-21",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}
