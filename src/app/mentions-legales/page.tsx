import Link from "next/link";

export const metadata = {
  title: "Mentions légales — MyRecup",
  description: "Mentions légales du site MyRecup, spécialiste des équipements de récupération sportive.",
};

const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";
const BLUE = "#5BC8F5";

const condensed: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 900,
  textTransform: "uppercase",
  lineHeight: 0.92,
  letterSpacing: "-0.02em",
};

const label: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 400,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          ...condensed,
          fontSize: "1.4rem",
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: `2px solid ${CREAM}`,
        }}
      >
        {title}
      </h2>
      <div style={{ color: "#444", lineHeight: 1.8, fontSize: "0.95rem" }}>{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Nav */}
      <nav
        style={{
          background: `rgba(91,200,245,0.95)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.1rem 2.5rem",
        }}
      >
        <Link href="/" style={{ ...condensed, fontSize: "1.4rem", lineHeight: 1, color: "white", textDecoration: "none" }}>
          MyRecup
        </Link>
      </nav>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 2rem" }}>
        <h1 style={{ ...condensed, fontSize: "clamp(2.5rem,5vw,4rem)", marginBottom: "0.5rem" }}>
          Mentions légales
        </h1>
        <p style={{ ...label, color: "#aaa", fontSize: "0.7rem", marginBottom: "3rem" }}>
          Mise à jour : 30 avril 2026
        </p>

        <Section title="Éditeur du site">
          <p><strong>Nom du site :</strong> MyRecup</p>
          <p><strong>Responsable de la publication :</strong> [Votre prénom et nom]</p>
          <p><strong>Adresse :</strong> [Votre adresse complète], France</p>
          <p><strong>Email de contact :</strong> contact@myrecup.fr</p>
          <p><strong>Statut juridique :</strong> Entrepreneur individuel / [ou votre forme juridique]</p>
          <p><strong>SIRET :</strong> [Votre numéro SIRET]</p>
          <p><strong>Numéro de TVA intracommunautaire :</strong> [Votre numéro TVA si applicable]</p>
        </Section>

        <Section title="Hébergement">
          <p><strong>Hébergeur :</strong> Vercel Inc.</p>
          <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
          <p><strong>Site web :</strong> vercel.com</p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété
            exclusive de MyRecup, sauf mention contraire. Toute reproduction, représentation, modification,
            publication ou adaptation, totale ou partielle, de l'un quelconque des éléments du site, quel que
            soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
          </p>
        </Section>


        <Section title="Limitation de responsabilité">
          <p>
            MyRecup s'efforce de fournir des informations aussi précises que possible sur ce site. Cependant,
            il ne peut être tenu responsable des omissions, des inexactitudes et des carences dans la mise à
            jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces
            informations.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Les informations sur ce site sont données à titre indicatif et sont susceptibles d'évoluer.
            Elles ne sont pas contractuelles.
          </p>
        </Section>

        <Section title="Droit applicable">
          <p>
            Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, et à
            défaut de résolution amiable, les tribunaux français seront seuls compétents.
          </p>
        </Section>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/cgv" style={{ ...label, color: BLUE, textDecoration: "none" }}>→ CGV</Link>
          <Link href="/confidentialite" style={{ ...label, color: BLUE, textDecoration: "none" }}>→ Politique de confidentialité</Link>
          <Link href="/" style={{ ...label, color: "#888", textDecoration: "none" }}>← Retour à l'accueil</Link>
        </div>
      </div>
    </>
  );
}
