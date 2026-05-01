import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug as getOldProduct, formatPrice as formatOldPrice } from "@/lib/products";
import { CATALOG, CatalogProduct, getProductBySlug as getCatalogProduct, getCategoryBySlug, formatPrice } from "@/lib/catalog";
import ProductActions from "@/components/ProductActions";
import CartIcon from "@/components/CartIcon";

const ORANGE = "#E84525";
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const old = getOldProduct(slug);
  if (old) {
    return {
      title: `${old.name} — Avis et test complet | MyRecup`,
      description: `Notre avis sur le ${old.name} : ${old.tagline}`,
      openGraph: {
        title: `${old.name} — Avis et test complet`,
        description: `Notre avis sur le ${old.name} : ${old.tagline}`,
        url: `https://myrecup.fr/produits/${old.slug}`,
        siteName: "MyRecup",
        locale: "fr_FR",
        type: "website",
      },
    };
  }

  const cat = getCatalogProduct(slug);
  if (cat) {
    return {
      title: `${cat.name} — ${cat.tagline} | MyRecup`,
      description: `${cat.tagline} — Livraison 2–4 jours, retour 30 jours garanti.`,
      openGraph: {
        title: `${cat.name} — MyRecup`,
        description: cat.tagline,
        url: `https://myrecup.fr/produits/${cat.slug}`,
        siteName: "MyRecup",
        locale: "fr_FR",
        type: "website",
      },
    };
  }

  return {};
}

export function generateStaticParams() {
  return [
    ...PRODUCTS.map((p) => ({ slug: p.slug })),
    ...CATALOG.map((p) => ({ slug: p.slug })),
  ];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: star <= Math.round(rating) ? ORANGE : "#ddd", fontSize: "1.1rem" }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: "0.85rem", color: "#555", marginLeft: 4 }}>{rating}/5</span>
    </div>
  );
}

/* ── CROSS-SELL ── */

const CROSS_SELL_MAP: Record<string, string[]> = {
  "pistolets-de-massage": ["foam-roller", "vibro-ball", "resistance-bands"],
  "rouleaux-et-balles":   ["massage-gun-pro", "vibro-ball", "resistance-bands"],
  "thermotherapie":       ["massage-gun-pro", "acupressure-mat", "hot-cold-pack"],
  "compression":          ["massage-gun-pro", "acupressure-mat", "resistance-bands"],
  "mobilite":             ["massage-gun-pro", "foam-roller", "vibro-ball"],
};

function CrossSell({ currentSlug, categorySlug }: { currentSlug: string; categorySlug: string }) {
  const slugs = (CROSS_SELL_MAP[categorySlug] || []).filter((s) => s !== currentSlug).slice(0, 3);
  const products = slugs.map((s) => CATALOG.find((p) => p.slug === s)).filter(Boolean) as CatalogProduct[];
  if (products.length === 0) return null;

  const ORANGE = "#E84525";
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

  return (
    <section style={{ background: CREAM, padding: "4rem 2.5rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.5rem" }}>
          Souvent acheté ensemble
        </p>
        <h2 style={{ ...condensed, fontSize: "clamp(1.5rem,3vw,2rem)", marginBottom: "2rem", color: BLACK }}>
          Complète ta routine
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {products.map((p) => (
            <Link key={p.slug} href={`/produits/${p.slug}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "white",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  height: "100%",
                  border: "1px solid rgba(0,0,0,0.06)",
                  transition: "transform 0.2s",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    background: CREAM,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                    marginBottom: "0.5rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain", padding: "1rem" }} sizes="200px" />
                  ) : (
                    "💆"
                  )}
                </div>
                <p style={{ ...label, color: BLUE, fontSize: "0.6rem" }}>{p.serie}</p>
                <p style={{ fontWeight: 700, color: BLACK, fontSize: "0.95rem", lineHeight: 1.3 }}>{p.name}</p>
                <p style={{ color: "#666", fontSize: "0.8rem", lineHeight: 1.5, flex: 1 }}>{p.tagline}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "auto" }}>
                  <span style={{ ...condensed, fontSize: "1.25rem", color: ORANGE }}>{formatPrice(p.price)}</span>
                  {p.oldPrice && (
                    <span style={{ fontSize: "0.8rem", color: "#aaa", textDecoration: "line-through" }}>
                      {formatPrice(p.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PAGE PRODUIT CATALOGUE (nouveaux produits) ── */

function CatalogProductPage({ slug }: { slug: string }) {
  const product = getCatalogProduct(slug)!;
  const category = getCategoryBySlug(product.categorySlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    brand: { "@type": "Brand", name: "MyRecup" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://myrecup.fr/produits/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(91,200,245,0.95)",
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
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/comparatif" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
            (Comparatif)
          </Link>
          <CartIcon />
        </div>
      </nav>

      {/* Breadcrumb */}
      <div style={{ background: CREAM, padding: "0.75rem 2.5rem" }}>
        <p style={{ ...label, color: "#888", fontSize: "0.7rem" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Accueil</Link>
          {" / "}
          {category && (
            <>
              <Link href={`/categories/${category.slug}`} style={{ color: "#888", textDecoration: "none" }}>
                {category.name}
              </Link>
              {" / "}
            </>
          )}
          <span style={{ color: BLACK }}>{product.name}</span>
        </p>
      </div>

      {/* Fiche produit principale */}
      <section
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, minHeight: "70vh" }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Colonne gauche : visuel */}
        <div
          style={{
            background: "white",
            minHeight: 480,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {product.badge && (
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                background: product.highlight ? ORANGE : BLACK,
                color: "white",
                padding: "0.3rem 0.8rem",
                zIndex: 2,
                ...label,
                fontSize: "0.7rem",
              }}
            >
              {product.badge}
            </div>
          )}
          {product.image ? (
            <div style={{ position: "absolute", inset: 0 }}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain", padding: "2rem" }}
              />
            </div>
          ) : (
            <div
              style={{
                width: 260,
                height: 260,
                background: CREAM,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                fontSize: "5rem",
              }}
            >
              {getCategoryEmoji(product.categorySlug)}
            </div>
          )}
        </div>

        {/* Colonne droite : infos */}
        <div style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", overflowY: "auto" }}>

          {/* Catégorie + Titre */}
          <div>
            <p style={{ ...label, color: BLUE, fontSize: "0.7rem", marginBottom: "0.4rem" }}>
              {category?.name ?? `Série ${product.serie}`}
            </p>
            <h1 style={{ ...condensed, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: BLACK, marginBottom: "0.75rem" }}>
              {product.name}
            </h1>
            <p style={{ color: "#444", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{product.tagline}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Stars rating={product.rating} />
              <span style={{ ...label, color: "#999", fontSize: "0.68rem" }}>
                {product.reviews.toLocaleString("fr-FR")} avis
              </span>
            </div>
          </div>

          {/* Prix */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {product.oldPrice && (
              <span style={{ fontSize: "1.1rem", color: "#aaa", textDecoration: "line-through" }}>
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span style={{ ...condensed, fontSize: "2.4rem", color: ORANGE }}>
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span
                style={{
                  ...label,
                  background: ORANGE,
                  color: "white",
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.65rem",
                  borderRadius: 2,
                }}
              >
                −{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
            <span style={{ ...label, color: "#888", fontSize: "0.65rem" }}>TTC</span>
          </div>

          {/* Bloc paiement */}
          <div style={{ border: `1px solid #e0e0e0`, overflow: "hidden" }}>
            {/* Bannière 3x */}
            <div
              style={{
                background: BLACK,
                color: "white",
                padding: "0.6rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1rem" }}>💳</span>
              <span style={{ ...label, fontSize: "0.7rem", letterSpacing: "0.06em" }}>
                Paiement en 3x sans frais disponible
              </span>
            </div>
            {/* Détail mensualité */}
            <div style={{ padding: "0.75rem 1rem", background: "#fafafa", borderBottom: "1px solid #e0e0e0" }}>
              <span style={{ fontSize: "0.85rem", color: "#555" }}>
                3 × <strong style={{ color: BLACK }}>{formatPrice(Math.ceil(product.price / 3 * 100) / 100)}</strong>
                {" "}<span style={{ color: "#888", fontSize: "0.8rem" }}>(sans frais)</span>
              </span>
            </div>
            {/* Icônes moyens de paiement */}
            <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              {/* Visa */}
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 4, padding: "0.2rem 0.5rem", background: "white", minWidth: 48, height: 30 }}>
                <span style={{ fontWeight: 900, fontSize: "0.75rem", color: "#1a1f71", letterSpacing: "-0.02em", fontFamily: "sans-serif" }}>VISA</span>
              </span>
              {/* Mastercard */}
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 4, padding: "0.2rem 0.4rem", background: "white", gap: "0px", minWidth: 48, height: 30 }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#EB001B", display: "inline-block", marginRight: -6, position: "relative", zIndex: 1 }} />
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#F79E1B", display: "inline-block", position: "relative" }} />
              </span>
              {/* PayPal */}
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 4, padding: "0.2rem 0.5rem", background: "white", minWidth: 54, height: 30 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#003087", fontFamily: "sans-serif" }}>Pay</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#009cde", fontFamily: "sans-serif" }}>Pal</span>
              </span>
              {/* Apple Pay */}
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 4, padding: "0.2rem 0.5rem", background: "black", minWidth: 62, height: 30, gap: "0.2rem" }}>
                <span style={{ fontSize: "0.75rem", color: "white" }}></span>
                <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "white", fontFamily: "sans-serif" }}>Pay</span>
              </span>
            </div>
          </div>

          {/* Specs rapides */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
              background: CREAM,
              padding: "1rem",
            }}
          >
            {product.specs.slice(0, 4).map(({ key, value }) => (
              <div key={key}>
                <span style={{ ...label, color: "#888", fontSize: "0.62rem", display: "block" }}>{key}</span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem", color: BLACK }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Quantité + Ajouter au panier */}
          <ProductActions product={product} />

          {/* Badges de confiance */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.5rem",
              borderTop: "1px solid #e0e0e0",
              paddingTop: "1rem",
            }}
          >
            {[
              { icon: "🔄", title: "30J", sub: "Pour changer d'avis" },
              { icon: "🛡️", title: "Garantie", sub: "2 ans incluse" },
              { icon: "🚚", title: "Livraison", sub: "Offerte dès 50 €" },
            ].map(({ icon, title, sub }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.2rem",
                  padding: "0.5rem 0.25rem",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>{icon}</span>
                <span style={{ ...label, fontSize: "0.65rem", color: BLACK, fontWeight: 700 }}>{title}</span>
                <span style={{ fontSize: "0.68rem", color: "#666", lineHeight: 1.3 }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description complète */}
      <section style={{ padding: "4rem 2.5rem", maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,3vw,2.5rem)", marginBottom: "1.5rem" }}>
          Notre avis
        </h2>
        <p style={{ color: "#444", lineHeight: 1.8, fontSize: "1rem" }}>{product.description}</p>
      </section>

      {/* Pros / Cons */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          maxWidth: 800,
          margin: "0 auto 4rem",
          padding: "0 2.5rem",
        }}
      >
        <div style={{ background: "#f0faf0", padding: "2rem" }}>
          <h3 style={{ ...condensed, fontSize: "1.3rem", color: "#2a7a2a", marginBottom: "1rem" }}>
            ✓ Points forts
          </h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {product.pros.map((pro) => (
              <li key={pro} style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.5 }}>
                + {pro}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: "#fff5f5", padding: "2rem" }}>
          <h3 style={{ ...condensed, fontSize: "1.3rem", color: "#c0392b", marginBottom: "1rem" }}>
            ✗ Points faibles
          </h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {product.cons.map((con) => (
              <li key={con} style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.5 }}>
                − {con}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fiche technique complète */}
      <section style={{ padding: "0 2.5rem 4rem", maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,3vw,2.5rem)", marginBottom: "1.5rem" }}>
          Fiche technique
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {product.specs.map(({ key, value }, i) => (
              <tr key={key} style={{ background: i % 2 === 0 ? CREAM : "white" }}>
                <td style={{ padding: "0.75rem 1rem", ...label, color: "#666", fontSize: "0.75rem" }}>{key}</td>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: BLACK }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Cross-sell */}
      <CrossSell currentSlug={product.slug} categorySlug={product.categorySlug} />

      {/* CTA bas de page */}
      <section style={{ background: BLACK, padding: "4rem 2.5rem", textAlign: "center" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: "1rem" }}>
          Voir toute la gamme
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>
          Découvrez tous nos produits de récupération sportive.
        </p>
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            style={{
              ...condensed,
              display: "inline-block",
              padding: "1rem 2.5rem",
              background: ORANGE,
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Voir tous les {category.name} →
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer style={{ background: BLACK, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem 2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
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

/* ── PAGE PRODUIT ANCIEN CATALOGUE (pistolets testés) ── */

function OldProductPage({ slug }: { slug: string }) {
  const product = getOldProduct(slug)!;

  const specs = [
    { key: "Amplitude", value: `${product.amplitude} mm` },
    { key: "Niveau sonore", value: `${product.noise} dB` },
    { key: "Autonomie", value: `${product.battery}h` },
    { key: "Vitesses", value: `${product.speeds}` },
    { key: "Stall force", value: `${product.stallForce} lbs` },
    { key: "Têtes incluses", value: `${product.heads}` },
    { key: "Poids", value: `${product.weight} g` },
    { key: "Bluetooth", value: product.bluetooth ? "Oui" : "Non" },
  ];

  return (
    <>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(91,200,245,0.95)",
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
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/comparatif" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
            (Comparatif)
          </Link>
          <CartIcon />
        </div>
      </nav>

      {/* Breadcrumb */}
      <div style={{ background: CREAM, padding: "0.75rem 2.5rem" }}>
        <p style={{ ...label, color: "#888", fontSize: "0.7rem" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Accueil</Link>
          {" / "}
          <Link href="/comparatif" style={{ color: "#888", textDecoration: "none" }}>Pistolets de massage</Link>
          {" / "}
          <span style={{ color: BLACK }}>{product.name}</span>
        </p>
      </div>

      {/* Fiche produit principale */}
      <section
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, minHeight: "70vh" }}
        className="grid-cols-1 md:grid-cols-2"
      >
        <div
          style={{
            background: CREAM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 3rem",
            minHeight: 480,
            position: "relative",
          }}
        >
          {product.tag && (
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                background: ORANGE,
                color: "white",
                padding: "0.3rem 0.8rem",
                ...label,
                fontSize: "0.7rem",
              }}
            >
              {product.tag}
            </div>
          )}
          <div
            style={{
              width: 260,
              height: 260,
              background: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              fontSize: "5rem",
            }}
          >
            💆
          </div>
        </div>

        <div style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Marque + Titre */}
          <div>
            <p style={{ ...label, color: BLUE, fontSize: "0.7rem", marginBottom: "0.4rem" }}>{product.brand}</p>
            <h1 style={{ ...condensed, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: BLACK, marginBottom: "0.75rem" }}>
              {product.name}
            </h1>
            <p style={{ color: "#444", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{product.tagline}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Stars rating={product.rating} />
              <span style={{ ...label, color: "#999", fontSize: "0.68rem" }}>
                {product.reviews.toLocaleString("fr-FR")} avis
              </span>
            </div>
          </div>

          {/* Prix */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ ...condensed, fontSize: "2.4rem", color: ORANGE }}>
              {formatOldPrice(product.price)}
            </span>
            <span style={{ ...label, color: "#888", fontSize: "0.65rem" }}>TTC</span>
          </div>

          {/* Bloc paiement */}
          <div style={{ border: "1px solid #e0e0e0", overflow: "hidden" }}>
            <div style={{ background: BLACK, color: "white", padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1rem" }}>💳</span>
              <span style={{ ...label, fontSize: "0.7rem", letterSpacing: "0.06em" }}>Paiement en 3x sans frais disponible</span>
            </div>
            <div style={{ padding: "0.75rem 1rem", background: "#fafafa", borderBottom: "1px solid #e0e0e0" }}>
              <span style={{ fontSize: "0.85rem", color: "#555" }}>
                3 × <strong style={{ color: BLACK }}>{formatOldPrice(Math.ceil(product.price / 3 * 100) / 100)}</strong>
                {" "}<span style={{ color: "#888", fontSize: "0.8rem" }}>(sans frais)</span>
              </span>
            </div>
            <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 4, padding: "0.2rem 0.5rem", background: "white", minWidth: 48, height: 30 }}>
                <span style={{ fontWeight: 900, fontSize: "0.75rem", color: "#1a1f71", letterSpacing: "-0.02em", fontFamily: "sans-serif" }}>VISA</span>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 4, padding: "0.2rem 0.4rem", background: "white", minWidth: 48, height: 30 }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#EB001B", display: "inline-block", marginRight: -6, position: "relative", zIndex: 1 }} />
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#F79E1B", display: "inline-block", position: "relative" }} />
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 4, padding: "0.2rem 0.5rem", background: "white", minWidth: 54, height: 30 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#003087", fontFamily: "sans-serif" }}>Pay</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#009cde", fontFamily: "sans-serif" }}>Pal</span>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 4, padding: "0.2rem 0.5rem", background: "black", minWidth: 62, height: 30, gap: "0.2rem" }}>
                <span style={{ fontSize: "0.75rem", color: "white" }}></span>
                <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "white", fontFamily: "sans-serif" }}>Pay</span>
              </span>
            </div>
          </div>

          {/* Specs rapides */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", background: CREAM, padding: "1rem" }}>
            {specs.slice(0, 4).map(({ key, value }) => (
              <div key={key}>
                <span style={{ ...label, color: "#888", fontSize: "0.62rem", display: "block" }}>{key}</span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem", color: BLACK }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Quantité + Ajouter au panier */}
          <ProductActions product={product} />

          {/* Badges de confiance */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", borderTop: "1px solid #e0e0e0", paddingTop: "1rem" }}>
            {[
              { icon: "🔄", title: "30J", sub: "Pour changer d'avis" },
              { icon: "🛡️", title: "Garantie", sub: "2 ans incluse" },
              { icon: "🚚", title: "Livraison", sub: "Offerte dès 50 €" },
            ].map(({ icon, title, sub }) => (
              <div key={title} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.2rem", padding: "0.5rem 0.25rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{icon}</span>
                <span style={{ ...label, fontSize: "0.65rem", color: BLACK, fontWeight: 700 }}>{title}</span>
                <span style={{ fontSize: "0.68rem", color: "#666", lineHeight: 1.3 }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Pros/Cons + Fiche technique */}
      <section style={{ padding: "4rem 2.5rem", maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,3vw,2.5rem)", marginBottom: "1.5rem" }}>
          Notre avis sur le {product.name}
        </h2>
        <p style={{ color: "#444", lineHeight: 1.8, fontSize: "1rem" }}>{product.description}</p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          maxWidth: 800,
          margin: "0 auto 4rem",
          padding: "0 2.5rem",
        }}
      >
        <div style={{ background: "#f0faf0", padding: "2rem" }}>
          <h3 style={{ ...condensed, fontSize: "1.3rem", color: "#2a7a2a", marginBottom: "1rem" }}>✓ Points forts</h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {product.pros.map((pro) => (
              <li key={pro} style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.5 }}>+ {pro}</li>
            ))}
          </ul>
        </div>
        <div style={{ background: "#fff5f5", padding: "2rem" }}>
          <h3 style={{ ...condensed, fontSize: "1.3rem", color: "#c0392b", marginBottom: "1rem" }}>✗ Points faibles</h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {product.cons.map((con) => (
              <li key={con} style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.5 }}>− {con}</li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ padding: "0 2.5rem 4rem", maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,3vw,2.5rem)", marginBottom: "1.5rem" }}>Fiche technique</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {specs.map(({ key, value }, i) => (
              <tr key={key} style={{ background: i % 2 === 0 ? CREAM : "white" }}>
                <td style={{ padding: "0.75rem 1rem", ...label, color: "#666", fontSize: "0.75rem" }}>{key}</td>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: BLACK }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ background: BLACK, padding: "4rem 2.5rem", textAlign: "center" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: "1rem" }}>
          Comparer avec les autres modèles
        </h2>
        <Link
          href="/comparatif"
          style={{
            ...condensed,
            display: "inline-block",
            padding: "1rem 2.5rem",
            background: ORANGE,
            color: "white",
            textDecoration: "none",
            fontSize: "1rem",
            marginTop: "2rem",
          }}
        >
          Voir le comparatif complet →
        </Link>
      </section>

      <footer style={{ background: BLACK, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem 2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
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

/* ── ROUTER PRINCIPAL ── */

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (getOldProduct(slug)) return <OldProductPage slug={slug} />;
  if (getCatalogProduct(slug)) return <CatalogProductPage slug={slug} />;

  notFound();
}

function getCategoryEmoji(slug: string): string {
  const map: Record<string, string> = {
    "pistolets-de-massage": "💆",
    "rouleaux-et-balles": "🔵",
    "thermotherapie": "🧊",
    "compression": "🦵",
    "mobilite": "🤸",
  };
  return map[slug] ?? "⚡";
}
