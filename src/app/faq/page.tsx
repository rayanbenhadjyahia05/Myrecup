import Link from "next/link";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import CartIcon from "@/components/CartIcon";

export const metadata = {
  title: "FAQ Pistolet de massage — Toutes vos questions | MyRecup",
  description:
    "15 réponses claires sur les pistolets de massage : comment les utiliser, quelle amplitude choisir, Theragun vs Hypervolt, budget recommandé et zones à éviter.",
};

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";

const condensed: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "-0.02em",
};

const label: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 400,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    category: "Bases",
    questions: [
      {
        q: "Qu'est-ce qu'un pistolet de massage ?",
        a: "Un pistolet de massage (ou massage gun) est un appareil de percussion qui délivre des vibrations rapides et profondes sur les muscles. Il est utilisé pour accélérer la récupération musculaire, réduire les courbatures (DOMS) et soulager les tensions. Les fréquences vont généralement de 1 400 à 3 200 percussions par minute.",
      },
      {
        q: "Comment utiliser un pistolet de massage ?",
        a: "Placez la tête sur la zone musculaire cible et laissez le poids de l'appareil faire le travail — pas besoin d'appuyer fort. Effectuez des mouvements lents le long du muscle (10-15 cm/seconde). Commencez à vitesse basse (1-2) puis montez progressivement. 60 à 90 secondes par zone suffisent. Ne restez jamais plus de 2 minutes sur le même endroit.",
      },
      {
        q: "Combien de temps utiliser un pistolet de massage par séance ?",
        a: "Une session complète dure 10 à 20 minutes selon le nombre de zones travaillées. Pour chaque groupe musculaire : 60 à 90 secondes. Après un entraînement court : 8-10 minutes. Après un entraînement long ou une compétition : 15-20 minutes réparties en deux sessions (juste après + le lendemain matin).",
      },
      {
        q: "Peut-on utiliser un pistolet de massage tous les jours ?",
        a: "Oui, l'utilisation quotidienne est sans risque pour les sportifs actifs. On recommande même de masser les mollets après chaque séance de course à pied. La seule règle : ne pas masser une zone blessée, inflammée ou douloureuse au point de douleur aiguë. En cas de doute, consultez un kinésithérapeute.",
      },
    ],
  },
  {
    category: "Technique",
    questions: [
      {
        q: "Pistolet de massage avant ou après l'entraînement ?",
        a: "Les deux ont du sens, mais l'objectif diffère. Avant l'entraînement : 30 à 60 secondes par muscle à vitesse 1-2 pour activer la circulation et préparer les fascias (ne remplace pas l'échauffement). Après l'entraînement : 60 à 90 secondes par zone à vitesse 2-3 pour drainer l'acide lactique et réduire les courbatures. C'est le moment le plus efficace.",
      },
      {
        q: "Quelles zones faut-il éviter absolument ?",
        a: "Ne massez jamais directement sur : les articulations (genoux, coudes, chevilles), la colonne vertébrale, les tendons (tendon d'Achille, tendon rotulien), les zones avec hématomes ou inflammations, le cou (risque vasculaire), et l'abdomen en cas de grossesse ou de pathologie digestive. Sur les mollets : évitez le creux derrière le genou (fosse poplitée).",
      },
      {
        q: "Qu'est-ce que la stall force et pourquoi c'est important ?",
        a: "La stall force est la force maximale que vous pouvez appliquer sur le pistolet avant que son moteur ne s'arrête. Elle se mesure en livres (lbs). Une stall force de 30 lbs suffit pour les sportifs occasionnels. Au-delà de 40 lbs (comme l'Ekrin B37 à 56 lbs), le pistolet supporte une pression très forte, utile pour les sportifs avec une musculature développée (haltérophiles, CrossFitters).",
      },
      {
        q: "Quelle amplitude choisir : 10 mm, 12 mm ou 16 mm ?",
        a: "L'amplitude correspond à la profondeur de pénétration de la tête dans le muscle. 10 mm : usage léger, récupération douce, adapté aux personnes sensibles. 12 mm : le standard du marché, convient à 90 % des sportifs. 16 mm : réservé aux professionnels (Theragun Pro) pour les muscles très épais. Pour un premier achat, 12 mm est le meilleur choix.",
      },
    ],
  },
  {
    category: "Choix du produit",
    questions: [
      {
        q: "Quel budget prévoir pour un bon pistolet de massage ?",
        a: "Deux gammes couvrent 100 % des besoins. Budget serré (moins de 100 €) : le MyRecup Gun Mini à 65 € — compact, 12 mm d'amplitude, idéal pour démarrer. Usage intensif (100 € et plus) : le MyRecup Gun Pro à 109 € — notre recommandation principale, silencieux, 8 h d'autonomie, 6 têtes incluses. Au-delà, vous payez surtout la marque.",
      },
      {
        q: "Gun Mini ou Gun Pro : lequel choisir ?",
        a: "Choisissez le MyRecup Gun Mini (65 €) si vous vous entraînez 1 à 3 fois par semaine ou si vous avez besoin d'un pistolet facilement transportable. Choisissez le MyRecup Gun Pro (109 €) si vous vous entraînez 4 fois par semaine ou plus, que vous voulez plus de puissance (stall force 60 lbs vs 40) et une autonomie maximale (8 h vs 4 h). Les deux sont fabriqués avec les mêmes composants — seules les performances diffèrent.",
      },
      {
        q: "Bluetooth : vraiment utile sur un pistolet de massage ?",
        a: "Le Bluetooth connecte le pistolet à une application qui propose des programmes guidés (zones à traiter, durée, vitesse). Utile pour les débutants qui ne savent pas par où commencer. Inutile pour les sportifs expérimentés qui connaissent leur corps. Le MyRecup Gun Pro se contrôle directement sur l'appareil — simple, fiable, sans dépendre d'une application ou d'une connexion.",
      },
      {
        q: "Pistolet de massage compact ou standard : quoi choisir ?",
        a: "Si vous voyagez souvent ou transportez votre pistolet dans un sac de sport : le MyRecup Gun Mini est fait pour vous — 650 g, format poing, livré avec sa pochette. Si vous l'utilisez principalement à la maison après les séances, le poids importe peu et le MyRecup Gun Pro offre plus de puissance et d'autonomie pour à peine 40 € de plus.",
      },
    ],
  },
  {
    category: "Usage spécifique",
    questions: [
      {
        q: "Le pistolet de massage est-il efficace contre la cellulite ?",
        a: "Partiellement et temporairement. Le pistolet améliore la microcirculation locale et assouplit les fascias, ce qui peut réduire l'aspect peau d'orange, surtout sur les cellulites récentes. Il ne peut pas éliminer les cellules graisseuses. Pour des résultats visibles : 5 séances/semaine pendant 4 à 6 semaines, vitesse 2-3, mouvements remontants. À associer obligatoirement à de l'activité physique et une bonne hydratation.",
      },
      {
        q: "Comment entretenir et nettoyer son pistolet de massage ?",
        a: "Après chaque utilisation : essuyez les têtes avec un chiffon microfibre légèrement humide. Hebdomadairement : nettoyez les têtes avec de l'alcool isopropylique à 70 %. Ne plongez jamais l'appareil dans l'eau. Rangez-le dans son étui avec les têtes propres. Rechargez-le avant que la batterie ne soit complètement vide pour prolonger sa durée de vie. Un pistolet bien entretenu dure 3 à 5 ans.",
      },
      {
        q: "Peut-on utiliser un pistolet de massage en cas de blessure ?",
        a: "Non, pas directement sur la zone blessée. Sur une blessure aiguë (claquage, entorse, tendinite en phase inflammatoire) : repos total, pas de massage. Sur une blessure chronique ou en phase de récupération : le pistolet peut être utilisé autour de la zone (pas dessus) pour maintenir la souplesse des muscles environnants. Consultez toujours un kinésithérapeute avant d'utiliser le pistolet sur une blessure.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `rgba(91,200,245,0.95)`,
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.1rem 2.5rem",
        }}
      >
        <Link href="/" style={{ ...condensed, fontSize: "1.4rem", color: "white", textDecoration: "none" }}>
          MyRecup
        </Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { lbl: "Produits", href: "/pistolets-de-massage" },
            { lbl: "Comparatif", href: "/comparatif" },
            { lbl: "Blog", href: "/blog" },
          ].map(({ lbl, href }) => (
            <Link key={lbl} href={href} style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
              ({lbl})
            </Link>
          ))}
          <CartIcon />
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: BLACK, padding: "5rem 2.5rem 4rem" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>(Foire aux questions)</p>
        <h1
          style={{
            ...condensed,
            fontSize: "clamp(3rem,7vw,6rem)",
            color: "white",
            lineHeight: 0.95,
            maxWidth: 700,
            marginBottom: "1.5rem",
          }}
        >
          Toutes vos questions sur les pistolets de massage
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.7 }}>
          15 réponses claires rédigées par nos testeurs. Techniques, choix du produit, usage spécifique — tout ce que vous devez savoir avant d'acheter.
        </p>
      </section>

      {/* Accordéon FAQ */}
      <section style={{ padding: "4rem 2.5rem", maxWidth: 860, margin: "0 auto" }}>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>

      {/* CTA bas */}
      <section
        style={{
          background: CREAM,
          padding: "4rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "1.5rem",
        }}
      >
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3rem)", color: BLACK }}>
          Prêt à choisir votre pistolet ?
        </h2>
        <p style={{ color: "#555", maxWidth: 480, lineHeight: 1.7 }}>
          Notre comparatif vous aide à trouver le modèle qui correspond à votre budget et votre niveau.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/comparatif"
            style={{ ...label, padding: "0.9rem 2rem", background: ORANGE, color: "white", textDecoration: "none", fontWeight: 700 }}
          >
            Voir le comparatif →
          </Link>
          <Link
            href="/blog/comment-utiliser-pistolet-massage"
            style={{ ...label, padding: "0.9rem 2rem", border: `2px solid ${BLACK}`, color: BLACK, textDecoration: "none", fontWeight: 700 }}
          >
            Guide d'achat complet
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: BLACK, padding: "1.5rem 2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {[
          { lbl: "Mentions légales", href: "/mentions-legales" },
          { lbl: "CGV", href: "/cgv" },
          { lbl: "Confidentialité", href: "/confidentialite" },
        ].map(({ lbl, href }) => (
          <Link key={lbl} href={href} style={{ ...label, color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.7rem" }}>
            ({lbl})
          </Link>
        ))}
      </footer>
    </>
  );
}
