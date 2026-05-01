import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Guides & conseils récupération sportive | MyRecup",
  description:
    "Tous nos guides sur la récupération musculaire : comment utiliser un pistolet de massage, protocoles post-entraînement, avis produits et comparatifs.",
};

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";
const BLUE = "#5BC8F5";

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

const CATEGORY_COLORS: Record<string, string> = {
  "Comparatif": ORANGE,
  "Avis produit": BLUE,
  "Guide": "#2a7a2a",
  "Protocole": "#7a2a7a",
};

/* Image de couverture selon la catégorie */
const CATEGORY_IMAGES: Record<string, { src: string; alt: string }> = {
  "Comparatif": {
    src: "/images/john-fornander-pLolUyEO6VI-unsplash.jpg",
    alt: "Sportif qui récupère après un entraînement",
  },
  "Avis produit": {
    src: "/images/sergio-kian-KKiplOzyets-unsplash.jpg",
    alt: "Équipements de récupération sportive",
  },
  "Guide": {
    src: "/images/jane-palash-yimb1ePGs00-unsplash.jpg",
    alt: "Sportive qui s'étire en ville",
  },
  "Protocole": {
    src: "/images/andrew-valdivia-zlY2woZT_RA-unsplash.jpg",
    alt: "Utilisation d'un rouleau de massage",
  },
};

export default function GuidesPage() {
  const articles = getAllArticles();

  const categories = Array.from(new Set(articles.map((a) => a.category)));

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
            { lbl: "FAQ", href: "/faq" },
          ].map(({ lbl, href }) => (
            <Link key={lbl} href={href} style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
              ({lbl})
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: BLACK, padding: "5rem 2.5rem 4rem" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>(Blog & guides)</p>
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
          Guides & conseils<br />récupération sportive
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 520, lineHeight: 1.7 }}>
          {articles.length} guides rédigés par nos testeurs. Protocoles, avis produits, comparatifs et conseils par sport.
        </p>
      </section>

      {/* Filtres catégorie */}
      <div style={{ background: CREAM, padding: "1.5rem 2.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <span style={{ ...label, padding: "0.4rem 1rem", background: BLACK, color: "white", fontSize: "0.7rem" }}>
          Tout ({articles.length})
        </span>
        {categories.map((cat) => (
          <span
            key={cat}
            style={{
              ...label,
              padding: "0.4rem 1rem",
              background: "white",
              color: BLACK,
              fontSize: "0.7rem",
              border: `1px solid rgba(0,0,0,0.1)`,
            }}
          >
            {cat} ({articles.filter((a) => a.category === cat).length})
          </span>
        ))}
      </div>

      {/* Article mis en avant (1er) */}
      {articles[0] && (
        <section style={{ padding: "3rem 2.5rem 0" }}>
          <Link
            href={`/guides/${articles[0].slug}`}
            style={{ textDecoration: "none", color: BLACK, display: "block", maxWidth: 1100, margin: "0 auto" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: `2px solid ${ORANGE}`,
              }}
              className="grid-cols-1 md:grid-cols-2"
            >
              <div style={{ position: "relative", minHeight: 360 }}>
                {(() => {
                  const img = CATEGORY_IMAGES[articles[0].category] ?? CATEGORY_IMAGES["Guide"];
                  return (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority
                      sizes="50vw"
                      style={{ objectFit: "cover" }}
                    />
                  );
                })()}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: ORANGE,
                    color: "white",
                    padding: "0.3rem 0.8rem",
                    ...label,
                    fontSize: "0.65rem",
                  }}
                >
                  À la une
                </div>
              </div>
              <div style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem" }}>
                <span
                  style={{
                    ...label,
                    color: CATEGORY_COLORS[articles[0].category] ?? ORANGE,
                    fontSize: "0.7rem",
                  }}
                >
                  {articles[0].category}
                </span>
                <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: BLACK }}>
                  {articles[0].title}
                </h2>
                <p style={{ color: "#555", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  {articles[0].description}
                </p>
                <span style={{ ...label, color: ORANGE, fontSize: "0.75rem" }}>
                  Lire l'article →
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grille articles */}
      <section style={{ padding: "3rem 2.5rem 5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {articles.slice(1).map((article) => {
            const img = CATEGORY_IMAGES[article.category] ?? CATEGORY_IMAGES["Guide"];
            return (
              <Link
                key={article.slug}
                href={`/guides/${article.slug}`}
                style={{ textDecoration: "none", color: BLACK, display: "flex", flexDirection: "column" }}
              >
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 0.3s" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: CATEGORY_COLORS[article.category] ?? ORANGE,
                      color: "white",
                      padding: "0.2rem 0.6rem",
                      ...label,
                      fontSize: "0.6rem",
                    }}
                  >
                    {article.category}
                  </div>
                </div>
                <div style={{ padding: "1.25rem 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <h3 style={{ ...condensed, fontSize: "1.25rem", color: BLACK, lineHeight: 1.1 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6 }}>
                    {article.description}
                  </p>
                  <span style={{ ...label, color: ORANGE, fontSize: "0.7rem", marginTop: "0.25rem" }}>
                    Lire →
                  </span>
                </div>
              </Link>
            );
          })}
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
