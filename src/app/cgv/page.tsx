import Link from "next/link";

export const metadata = {
  title: "Conditions Générales de Vente — MyRecup",
  description: "CGV de MyRecup. Conditions de vente, livraison, retours et garanties.",
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

export default function CGVPage() {
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
          Conditions générales de vente
        </h1>
        <p style={{ ...label, color: "#aaa", fontSize: "0.7rem", marginBottom: "3rem" }}>
          Mise à jour : 30 avril 2026
        </p>

        <Section title="Article 1 — Objet">
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits effectuées
            par MyRecup via le site myrecup.fr. Tout achat implique l'acceptation sans réserve des
            présentes CGV.
          </p>
        </Section>

        <Section title="Article 2 — Produits et prix">
          <p>
            Les produits proposés sont ceux figurant sur le site au moment de la commande. Les prix sont
            indiqués en euros, toutes taxes comprises (TTC), TVA française de 20 % incluse.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            MyRecup se réserve le droit de modifier ses prix à tout moment. Les produits seront facturés
            sur la base des tarifs en vigueur au moment de la validation de la commande.
          </p>
        </Section>

        <Section title="Article 3 — Commandes">
          <p>
            Les commandes sont passées directement sur le site. La commande est définitive après confirmation
            du paiement. Un email de confirmation vous sera envoyé dans les minutes suivant la commande.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            MyRecup se réserve le droit d'annuler ou de refuser toute commande en cas de litige relatif
            au paiement d'une commande précédente.
          </p>
        </Section>

        <Section title="Article 4 — Paiement">
          <p>
            Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express) via
            la plateforme sécurisée Stripe, ou par PayPal. Les données bancaires sont chiffrées et ne
            transitent pas par nos serveurs.
          </p>
        </Section>

        <Section title="Article 5 — Livraison">
          <p>
            Les produits sont livrés à l'adresse indiquée lors de la commande. Le délai de livraison
            est de <strong>3 à 5 jours ouvrés</strong> pour la France métropolitaine.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Frais de livraison :</strong> 5,90 € pour toute commande inférieure à 50 €.
            Livraison offerte à partir de 50 € d'achat.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            En cas de retard de livraison, MyRecup ne saurait être tenu responsable des conséquences
            dues à ce retard.
          </p>
        </Section>

        <Section title="Article 6 — Droit de rétractation">
          <p>
            Conformément aux articles L221-18 et suivants du Code de la consommation, vous disposez d'un
            délai de <strong>14 jours calendaires</strong> à compter de la réception de votre commande
            pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Pour exercer ce droit, contactez-nous à : contact@myrecup.fr
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Les produits devront être retournés en parfait état, dans leur emballage d'origine, à nos frais
            si le produit est défectueux, à vos frais dans les autres cas. Le remboursement sera effectué
            dans un délai de 14 jours suivant la réception du retour.
          </p>
        </Section>

        <Section title="Article 7 — Garanties">
          <p>
            Tous nos produits bénéficient de la garantie légale de conformité (2 ans) et de la garantie
            contre les vices cachés, conformément aux articles L217-4 et suivants du Code de la consommation.
          </p>
        </Section>

        <Section title="Article 8 — Responsabilité">
          <p>
            MyRecup ne saurait être tenu responsable des dommages directs ou indirects causés au matériel
            de l'utilisateur lors de l'accès au site. MyRecup ne peut être tenu responsable en cas de
            force majeure ou du fait imprévisible et insurmontable d'un tiers.
          </p>
        </Section>

        <Section title="Article 9 — Litiges">
          <p>
            En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. Vous
            pouvez également recourir à la plateforme européenne de règlement en ligne des litiges :
            ec.europa.eu/consumers/odr
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            À défaut de résolution amiable, le tribunal compétent sera celui du domicile du défendeur ou
            du lieu d'exécution de la prestation.
          </p>
        </Section>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/mentions-legales" style={{ ...label, color: BLUE, textDecoration: "none" }}>→ Mentions légales</Link>
          <Link href="/confidentialite" style={{ ...label, color: BLUE, textDecoration: "none" }}>→ Politique de confidentialité</Link>
          <Link href="/" style={{ ...label, color: "#888", textDecoration: "none" }}>← Retour à l'accueil</Link>
        </div>
      </div>
    </>
  );
}
