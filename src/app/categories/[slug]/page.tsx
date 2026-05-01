import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
  formatPrice,
} from "@/lib/catalog";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Équipements de récupération | MyRecup`,
    description: cat.description,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? ORANGE : "#ddd", fontSize: "0.9rem" }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: "0.75rem", color: "#777", marginLeft: 3 }}>{rating}</span>
    </div>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

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
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { lbl: "Produits", href: "/pistolets-de-massage" },
            { lbl: "Comparatif", href: "/comparatif" },
            { lbl: "Blog", href: "/blog" },
          ].map(({ lbl, href }) => (
            <Link key={lbl} href={href} style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
              ({lbl})
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero catégorie */}
      <section
        style={{
          position: "relative",
          minHeight: 360,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "4rem 2.5rem",
          overflow: "hidden",
          background: BLACK,
        }}
      >
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.35 }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <p style={{ ...label, color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Accueil</Link>
            {" / "}
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{category.name}</span>
          </p>
          <h1
            style={{
              ...condensed,
              fontSize: "clamp(3rem,7vw,6rem)",
              color: "white",
              maxWidth: 700,
              marginBottom: "0.75rem",
            }}
          >
            {category.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 480, fontSize: "0.95rem" }}>
            {category.description}
          </p>
          <div
            style={{
              marginTop: "1rem",
              display: "inline-block",
              padding: "0.35rem 0.8rem",
              background: category.color,
              ...label,
              color: "white",
              fontSize: "0.65rem",
            }}
          >
            {products.length} produit{products.length > 1 ? "s" : ""}
          </div>
        </div>
      </section>

      {/* Grille produits */}
      <section style={{ padding: "4rem 2.5rem", background: "white" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produits/${product.slug}`}
              style={{ textDecoration: "none", color: BLACK, display: "flex", flexDirection: "column" }}
            >
              {/* Visuel produit */}
              <div
                style={{
                  background: CREAM,
                  aspectRatio: "4/3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {product.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: product.highlight ? ORANGE : BLACK,
                      color: "white",
                      padding: "0.2rem 0.6rem",
                      ...label,
                      fontSize: "0.65rem",
                    }}
                  >
                    {product.badge}
                  </div>
                )}
                <div style={{ width: "100%", height: 180, position: "relative", overflow: "hidden", background: "white" }}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="300px"
                      style={{ objectFit: "contain", padding: "1rem" }}
                    />
                  ) : (
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", background: "#F2EDE4" }}>
                      {getCategoryEmoji(slug)}
                    </div>
                  )}
                </div>
              </div>

              {/* Infos produit */}
              <div style={{ padding: "1.25rem 0", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                <p style={{ ...label, color: category.color, fontSize: "0.65rem" }}>Série {product.serie}</p>
                <h2 style={{ ...condensed, fontSize: "1.2rem", lineHeight: 1.1 }}>{product.name}</h2>
                <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.5, flex: 1 }}>{product.tagline}</p>
                <Stars rating={product.rating} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem" }}>
                  <span style={{ ...condensed, fontSize: "1.4rem", color: ORANGE }}>{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span style={{ fontSize: "0.85rem", color: "#aaa", textDecoration: "line-through" }}>
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.7rem 1rem",
                    background: BLACK,
                    color: "white",
                    textAlign: "center",
                    ...label,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  Voir le produit →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Autres catégories */}
      <section style={{ background: CREAM, padding: "4rem 2.5rem" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: BLACK, marginBottom: "2rem" }}>
          Autres catégories
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              style={{
                ...label,
                padding: "0.65rem 1.25rem",
                border: `2px solid ${cat.color}`,
                color: cat.color,
                textDecoration: "none",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {cat.name}
            </Link>
          ))}
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
