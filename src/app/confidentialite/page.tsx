import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — MyRecup",
  description: "Comment MyRecup collecte, utilise et protège vos données personnelles.",
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

export default function ConfidentialitePage() {
  return (
    <>
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
          Politique de confidentialité
        </h1>
        <p style={{ ...label, color: "#aaa", fontSize: "0.7rem", marginBottom: "3rem" }}>
          Mise à jour : 30 avril 2026 — conforme au RGPD
        </p>

        <Section title="Responsable du traitement">
          <p>
            Le responsable du traitement des données personnelles collectées sur myrecup.fr est :
            [Votre prénom et nom], [votre adresse], contact@myrecup.fr
          </p>
        </Section>

        <Section title="Données collectées">
          <p>Nous collectons les données suivantes :</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li><strong>Données de commande :</strong> prénom, nom, adresse de livraison, email</li>
            <li><strong>Données de paiement :</strong> traitées directement par Stripe (nous ne stockons aucune donnée bancaire)</li>
            <li><strong>Données de navigation :</strong> adresse IP, pages visitées, durée de la visite (via cookies analytiques)</li>
            <li><strong>Newsletter :</strong> email, prénom (si vous vous inscrivez)</li>
          </ul>
        </Section>

        <Section title="Finalités du traitement">
          <p>Vos données sont utilisées pour :</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>Traiter et expédier vos commandes</li>
            <li>Vous envoyer les confirmations et mises à jour de livraison</li>
            <li>Améliorer notre site et nos contenus (analytics anonymisés)</li>
            <li>Vous envoyer notre newsletter (avec votre consentement)</li>
          </ul>
        </Section>

        <Section title="Cookies">
          <p>
            Ce site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez
            accepter ou refuser les cookies non essentiels via notre bandeau de consentement.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (panier, session).
            Ils ne peuvent pas être désactivés.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Cookies analytiques :</strong> nous aident à comprendre comment vous utilisez le site
            (Google Analytics ou équivalent). Soumis à votre consentement.
          </p>
        </Section>

        <Section title="Durée de conservation">
          <p>
            Vos données de commande sont conservées pendant <strong>3 ans</strong> à compter de votre
            dernière commande, conformément aux obligations légales comptables françaises.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Les données de newsletter sont conservées jusqu'à votre désinscription.
          </p>
        </Section>

        <Section title="Vos droits (RGPD)">
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
          </ul>
          <p style={{ marginTop: "0.75rem" }}>
            Pour exercer ces droits : contact@myrecup.fr
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Vous pouvez également introduire une réclamation auprès de la CNIL : cnil.fr
          </p>
        </Section>

        <Section title="Sécurité">
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
            vos données contre tout accès non autorisé, modification, divulgation ou destruction.
            Le paiement est sécurisé par chiffrement SSL et traité par Stripe (certifié PCI DSS).
          </p>
        </Section>

        <Section title="Partage de données">
          <p>
            Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>Notre prestataire de paiement (Stripe) pour traiter les transactions</li>
            <li>Notre transporteur pour la livraison</li>
            <li>Nos outils analytics (données anonymisées)</li>
          </ul>
        </Section>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/mentions-legales" style={{ ...label, color: BLUE, textDecoration: "none" }}>→ Mentions légales</Link>
          <Link href="/cgv" style={{ ...label, color: BLUE, textDecoration: "none" }}>→ CGV</Link>
          <Link href="/" style={{ ...label, color: "#888", textDecoration: "none" }}>← Retour à l'accueil</Link>
        </div>
      </div>
    </>
  );
}
