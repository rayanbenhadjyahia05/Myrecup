import Link from "next/link";
import Image from "next/image";
import { CATALOG, CATEGORIES, formatPrice } from "@/lib/catalog";
import CartIcon from "@/components/CartIcon";

export const metadata = {
  title: "Nos produits — Équipements de récupération sportive | MyRecup",
  description:
    "Pistolets de massage, rouleaux, cryothérapie, compression, mobilité — découvrez toute la gamme MyRecup. Livraison 2–4 jours, retour 30 jours.",
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

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? ORANGE : "#ddd", fontSize: "0.9rem" }}>★</span>
      ))}
    </span>
  );
}

export default function ProduitsPage() {
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
            { lbl: "Comparatif", href: "/comparatif" },
            { lbl: "Blog", href: "/blog" },
            { lbl: "FAQ", href: "/faq" },
          ].map(({ lbl, href }) => (
            <Link key={lbl} href={href} style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
              {lbl}
            </Link>
          ))}
          <CartIcon />
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(160deg, ${BLUE} 0%, ${BLUE_DARK} 100%)`,
          padding: "5rem 2.5rem 4rem",
        }}
      >
        <div style={{ maxWidth: 700 }}>
          <p style={{ ...label, color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>
            (La gamme complète)
          </p>
          <h1
            style={{
              ...condensed,
              fontSize: "clamp(3rem,7vw,6rem)",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            Nos<br />produits
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 500 }}>
            {CATALOG.length} produits testés et sélectionnés. Pistolets de massage, rouleaux, cryothérapie, compression, mobilité — tout pour récupérer plus vite.
          </p>
        </div>
      </section>

      {/* Ancres catégories */}
      <div style={{ background: BLACK, padding: "0 2.5rem", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 0, minWidth: "max-content" }}>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              style={{
                ...label,
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                padding: "0.9rem 1.25rem",
                borderBottom: "2px solid transparent",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Produits par catégorie */}
      {CATEGORIES.map((cat) => {
        const products = CATALOG.filter((p) => p.categorySlug === cat.slug);
        if (products.length === 0) return null;
        return (
          <section key={cat.slug} id={cat.slug} style={{ padding: "4rem 2.5rem", background: "white" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              {/* Titre catégorie */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "2rem",
                  paddingBottom: "1rem",
                  borderBottom: `3px solid ${cat.color}`,
                }}
              >
                <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: BLACK }}>
                  {cat.name}
                </h2>
                <span style={{ ...label, fontSize: "0.65rem", color: cat.color }}>
                  {products.length} produit{products.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Grille */}
              <div
                className="products-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {products.map((product) => (
                  <article
                    key={product.id}
                    style={{
                      border: product.highlight ? `2px solid ${ORANGE}` : `1px solid rgba(0,0,0,0.1)`,
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    {product.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: product.badge.startsWith("Promo") ? ORANGE : BLACK,
                          color: "white",
                          padding: "0.2rem 0.6rem",
                          ...label,
                          fontSize: "0.6rem",
                          zIndex: 1,
                        }}
                      >
                        {product.badge}
                      </div>
                    )}

                    {/* Image produit */}
                    <div style={{ background: "white", height: 180, position: "relative", overflow: "hidden" }}>
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="300px"
                          style={{ objectFit: "contain", padding: "1rem" }}
                        />
                      ) : (
                        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", background: CREAM }}>
                          💆
                        </div>
                      )}
                    </div>

                    {/* Infos */}
                    <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                      <p style={{ ...label, fontSize: "0.6rem", color: cat.color }}>{cat.name}</p>
                      <h3 style={{ ...condensed, fontSize: "1.25rem", color: BLACK, lineHeight: 1.1 }}>
                        {product.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Stars rating={product.rating} />
                        <span style={{ fontSize: "0.75rem", color: "#888" }}>
                          ({product.reviews.toLocaleString("fr-FR")})
                        </span>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.5, flex: 1 }}>
                        {product.tagline}
                      </p>
                      <div style={{ marginTop: "auto", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                        <span style={{ ...condensed, fontSize: "1.6rem", color: ORANGE }}>
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span style={{ fontSize: "0.85rem", color: "#bbb", textDecoration: "line-through" }}>
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/produits/${product.slug}`}
                        style={{
                          ...label,
                          display: "block",
                          padding: "0.75rem 1rem",
                          background: product.highlight ? ORANGE : BLACK,
                          color: "white",
                          textDecoration: "none",
                          textAlign: "center",
                          fontSize: "0.75rem",
                        }}
                      >
                        Voir la fiche →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA bas de page */}
      <section style={{ background: BLACK, padding: "4rem 2.5rem", textAlign: "center" }}>
        <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "1rem" }}>(Besoin d'aide pour choisir ?)</p>
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3.5rem)", color: "white", marginBottom: "1.5rem" }}>
          Trouvez votre<br />équipement idéal
        </h2>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/quiz"
            style={{ ...label, padding: "0.9rem 2rem", background: ORANGE, color: "white", textDecoration: "none", fontWeight: 700 }}
          >
            Faire le quiz →
          </Link>
          <Link
            href="/comparatif"
            style={{ ...label, padding: "0.9rem 2rem", border: "2px solid rgba(255,255,255,0.3)", color: "white", textDecoration: "none", fontWeight: 700 }}
          >
            Voir le comparatif
          </Link>
        </div>
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
