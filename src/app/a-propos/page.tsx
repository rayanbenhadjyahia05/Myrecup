import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/components/CartIcon";

export const metadata = {
  title: "À propos de MyRecup — Notre mission",
  description:
    "MyRecup teste et compare les meilleurs équipements de récupération sportive pour les sportifs francophones. Découvrez notre histoire et notre méthode.",
};

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";
const BLUE = "#5BC8F5";
const BLUE_DARK = "#1A9ED4";

const condensed: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "-0.02em",
  lineHeight: 0.92,
};

const label: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 400,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const valeurs = [
  {
    num: "01",
    titre: "Tests réels, pas du marketing",
    texte:
      "Chaque produit est testé pendant minimum 4 semaines par des sportifs actifs. On mesure le niveau sonore, on pousse les moteurs jusqu'à la stall force, on note l'autonomie réelle. Pas de tests de 5 minutes.",
  },
  {
    num: "02",
    titre: "Avis tranchés, pas de langue de bois",
    texte:
      "Un produit cher mais décevant sera dit décevant. On ne note pas un produit 4,8/5 pour ne froisser personne. Notre crédibilité dépend de notre honnêteté.",
  },
  {
    num: "03",
    titre: "Vente directe, prix maîtrisés",
    texte:
      "On vend en direct — pas de revendeur, pas d'intermédiaire. Ça nous permet de proposer des produits de qualité à des prix justes, et de contrôler l'expérience de A à Z : de la commande à la livraison.",
  },
  {
    num: "04",
    titre: "Francophone d'abord",
    texte:
      "La plupart des tests de qualité sont en anglais. On les traduit, on les adapte, on ajoute le contexte marché français (disponibilité, prix en €, SAV). Un contenu fait pour vous.",
  },
];

export default function AProposPage() {
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
      <section
        style={{
          background: `linear-gradient(160deg, ${BLUE} 0%, ${BLUE_DARK} 100%)`,
          padding: "6rem 2.5rem 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="absolute right-0 top-0 bottom-0 hidden md:block" style={{ width: "42%", opacity: 0.2 }}>
          <Image
            src="/images/marvin-meyer-lxGF3OyQo6k-unsplash.jpg"
            alt="Sportif qui s'étire en salle de sport"
            fill
            priority
            sizes="42vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
          <p style={{ ...label, color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>(À propos)</p>
          <h1
            style={{
              ...condensed,
              fontSize: "clamp(3rem,7vw,6rem)",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            On teste.<br />Vous choisissez.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 480 }}>
            MyRecup est un média indépendant dédié à la récupération sportive. Notre mission : aider les sportifs francophones à choisir les bons équipements sans se faire avoir par le marketing.
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section style={{ padding: "5rem 2.5rem", maxWidth: 760, margin: "0 auto" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>(Notre histoire)</p>
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3rem)", color: BLACK, marginBottom: "2rem" }}>
          Né d'une frustration de sportif
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "#444", lineHeight: 1.8, fontSize: "1rem" }}>
          <p>
            Tout a commencé avec une question simple : <strong>quel pistolet de massage acheter ?</strong> Les résultats Google étaient remplis d'articles génériques copiés-collés, tous recommandant le Theragun à 600 € sans jamais expliquer pourquoi.
          </p>
          <p>
            On a décidé de faire les tests nous-mêmes. 7 pistolets de massage achetés, 4 semaines de test par produit, des mesures réelles au sonomètre. Et on a réalisé que le <strong>meilleur rapport qualité-prix n'était pas le plus cher</strong> — loin de là.
          </p>
          <p>
            MyRecup est né de cette conviction : les sportifs méritent des avis honnêtes, en français, par des gens qui pratiquent vraiment. On élargit progressivement aux rouleaux de massage, bandes élastiques et tapis d'acupression.
          </p>
        </div>
      </section>

      {/* Nos valeurs */}
      <section style={{ background: CREAM, padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ ...label, color: ORANGE, marginBottom: "1rem", textAlign: "center" }}>(Ce qui nous guide)</p>
          <h2
            style={{
              ...condensed,
              fontSize: "clamp(2rem,4vw,3rem)",
              color: BLACK,
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Nos 4 valeurs
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {valeurs.map(({ num, titre, texte }) => (
              <div key={num} style={{ background: "white", padding: "2rem" }}>
                <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.75rem" }}>({num})</p>
                <h3
                  style={{
                    ...condensed,
                    fontSize: "1.3rem",
                    color: BLACK,
                    marginBottom: "1rem",
                    lineHeight: 1.1,
                  }}
                >
                  {titre}
                </h3>
                <p style={{ color: "#555", lineHeight: 1.7, fontSize: "0.9rem" }}>{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section style={{ background: BLACK, padding: "5rem 2.5rem" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { val: "18", unit: "articles", desc: "guides publiés" },
            { val: "7", unit: "produits", desc: "testés en profondeur" },
            { val: "4", unit: "semaines", desc: "de test par produit" },
            { val: "100%", unit: "indépendant", desc: "aucun fabricant ne nous paye" },
          ].map(({ val, unit, desc }) => (
            <div key={desc}>
              <div style={{ ...condensed, fontSize: "3.5rem", color: "white", lineHeight: 1 }}>
                {val}
                <span style={{ fontSize: "1.2rem", color: ORANGE }}> {unit}</span>
              </div>
              <p style={{ ...label, color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", marginTop: "0.5rem" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: CREAM, padding: "4rem 2.5rem", textAlign: "center" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3rem)", color: BLACK, marginBottom: "1.5rem" }}>
          Prêt à récupérer mieux ?
        </h2>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/comparatif"
            style={{ ...label, padding: "0.9rem 2rem", background: ORANGE, color: "white", textDecoration: "none", fontWeight: 700 }}
          >
            Voir le comparatif →
          </Link>
          <Link
            href="/contact"
            style={{ ...label, padding: "0.9rem 2rem", border: `2px solid ${BLACK}`, color: BLACK, textDecoration: "none", fontWeight: 700 }}
          >
            Nous contacter
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
