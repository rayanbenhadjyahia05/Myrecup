import Link from "next/link";

export const metadata = {
  title: "Livraison & Retours — MyRecup",
  description:
    "Informations sur la livraison et les retours MyRecup : délais, frais, conditions de remboursement.",
};

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";

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

export default function LivraisonPage() {
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
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { lbl: "Produits", href: "/pistolets-de-massage" },
            { lbl: "Comparatif", href: "/comparatif" },
            { lbl: "Contact", href: "/contact" },
          ].map(({ lbl, href }) => (
            <Link key={lbl} href={href} style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
              ({lbl})
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: BLACK, padding: "5rem 2.5rem 4rem" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>(Informations pratiques)</p>
        <h1 style={{ ...condensed, fontSize: "clamp(3rem,7vw,6rem)", color: "white", maxWidth: 700, marginBottom: "1rem" }}>
          Livraison<br />&amp; retours
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 480 }}>
          Tout ce que vous devez savoir sur les délais, les frais de port et notre politique de retour.
        </p>
      </section>

      {/* Contenu */}
      <section style={{ padding: "4rem 2.5rem", maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>

        {/* Livraison */}
        <div>
          <h2 style={{ ...condensed, fontSize: "2rem", color: BLACK, marginBottom: "1.5rem", borderLeft: `4px solid ${ORANGE}`, paddingLeft: "1rem" }}>
            Livraison
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr>
                {["Mode de livraison", "Délai estimé", "Tarif"].map((h) => (
                  <th key={h} style={{ background: BLACK, color: "white", padding: "0.75rem 1rem", textAlign: "left", ...label, fontSize: "0.7rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { mode: "Colissimo (France métropolitaine)", delai: "2 à 4 jours ouvrés", tarif: "4,90 €" },
                { mode: "Colissimo Gratuit (commande > 60 €)", delai: "2 à 4 jours ouvrés", tarif: "Gratuit" },
                { mode: "Chronopost Express", delai: "24h ouvrées", tarif: "9,90 €" },
                { mode: "Belgique / Suisse / Luxembourg", delai: "3 à 6 jours ouvrés", tarif: "9,90 €" },
              ].map(({ mode, delai, tarif }, i) => (
                <tr key={mode} style={{ background: i % 2 === 0 ? CREAM : "white" }}>
                  <td style={{ padding: "0.75rem 1rem", color: BLACK, fontWeight: i === 1 ? 700 : 400 }}>{mode}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#555" }}>{delai}</td>
                  <td style={{ padding: "0.75rem 1rem", color: i === 1 ? ORANGE : BLACK, fontWeight: 600 }}>{tarif}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ background: CREAM, padding: "1.25rem", marginTop: "1rem", borderLeft: `3px solid ${ORANGE}` }}>
            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.7 }}>
              <strong>Suivi de commande :</strong> un email de confirmation avec numéro de suivi est envoyé dès l'expédition. Livraison du lundi au samedi (hors jours fériés).
            </p>
          </div>
        </div>

        {/* Retours */}
        <div>
          <h2 style={{ ...condensed, fontSize: "2rem", color: BLACK, marginBottom: "1.5rem", borderLeft: `4px solid ${ORANGE}`, paddingLeft: "1rem" }}>
            Politique de retour
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "#444", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              Vous disposez de <strong>30 jours</strong> à compter de la réception de votre commande pour nous retourner un article, sans avoir à justifier votre décision (droit de rétractation légal : 14 jours, nous l'étendons à 30 jours).
            </p>
            <p>
              <strong>Conditions :</strong> le produit doit être retourné dans son emballage d'origine, non utilisé et en parfait état. Les accessoires et têtes de massage doivent être inclus.
            </p>
            <p>
              <strong>Remboursement :</strong> sous 5 jours ouvrés après réception et vérification du colis retourné, sur le moyen de paiement utilisé lors de la commande.
            </p>
            <p>
              <strong>Frais de retour :</strong> à la charge du client, sauf en cas de produit défectueux ou d'erreur de notre part (dans ce cas, on génère une étiquette retour prépayée).
            </p>
          </div>
        </div>

        {/* Procédure */}
        <div>
          <h2 style={{ ...condensed, fontSize: "2rem", color: BLACK, marginBottom: "1.5rem", borderLeft: `4px solid ${ORANGE}`, paddingLeft: "1rem" }}>
            Comment initier un retour ?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { num: "01", texte: "Contactez-nous à contact@myrecup.fr avec votre numéro de commande et la raison du retour." },
              { num: "02", texte: "On vous envoie les instructions de retour sous 24h ouvrées." },
              { num: "03", texte: "Expédiez le colis à l'adresse indiquée. Conservez le numéro de suivi." },
              { num: "04", texte: "Remboursement traité sous 5 jours ouvrés après réception du retour." },
            ].map(({ num, texte }) => (
              <div key={num} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <span style={{ ...condensed, fontSize: "1.5rem", color: ORANGE, flexShrink: 0, lineHeight: 1.2 }}>
                  {num}
                </span>
                <p style={{ color: "#444", lineHeight: 1.7, fontSize: "0.95rem", marginTop: "0.1rem" }}>{texte}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Garantie */}
        <div style={{ background: BLACK, padding: "2.5rem", color: "white" }}>
          <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.75rem" }}>(Garantie produit)</p>
          <h3 style={{ ...condensed, fontSize: "1.5rem", marginBottom: "1rem" }}>
            Garantie 2 ans sur tous les produits
          </h3>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.9rem" }}>
            Tous les produits vendus sur MyRecup bénéficient de la garantie légale de conformité de 2 ans. En cas de panne ou défaut de fabrication, contactez-nous à contact@myrecup.fr — on prend en charge le remplacement ou le remboursement.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: CREAM, padding: "3rem 2.5rem", textAlign: "center" }}>
        <p style={{ color: "#555", marginBottom: "1rem" }}>
          Une question sur votre commande ?
        </p>
        <Link
          href="/contact"
          style={{ ...label, padding: "0.85rem 2rem", background: ORANGE, color: "white", textDecoration: "none", fontWeight: 700 }}
        >
          Contacter le support →
        </Link>
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
