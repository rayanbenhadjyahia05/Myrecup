import Link from "next/link";
import { getAllArticles } from "@/lib/blog";
import CartIcon from "@/components/CartIcon";
import NewsletterBanner from "@/components/NewsletterBanner";

export const metadata = {
  title: "Blog récupération sportive — Guides et conseils | MyRecup",
  description:
    "Guides pratiques, comparatifs et conseils d'experts pour optimiser votre récupération musculaire après le sport.",
};

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

const CATEGORY_COLORS: Record<string, string> = {
  Comparatif: ORANGE,
  Guide: BLUE,
  Avis: "#059669",
  Technique: "#7C3AED",
};

export default function BlogPage() {
  const articles = getAllArticles();

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
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
          <Link href="/comparatif" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
            Comparatif
          </Link>
          <Link href="/quiz" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
            Quiz
          </Link>
          <CartIcon />
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: BLACK, padding: "5rem 2.5rem 4rem", textAlign: "center" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>Récupération sportive</p>
        <h1 style={{ ...condensed, fontSize: "clamp(3rem,7vw,6rem)", color: "white", marginBottom: "1rem" }}>
          Le blog
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          Guides pratiques, comparatifs honnêtes et conseils terrain pour récupérer plus vite entre les séances.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Filtres par catégorie */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {categories.map((cat) => (
            <span
              key={cat}
              style={{
                ...label,
                padding: "0.4rem 1rem",
                border: `1px solid ${CATEGORY_COLORS[cat] || "#ccc"}`,
                color: CATEGORY_COLORS[cat] || "#666",
                fontSize: "0.7rem",
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        <style>{`
          .blog-card { transition: box-shadow 0.2s, transform 0.2s; }
          .blog-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-2px); }
        `}</style>

        {/* Grille articles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                className="blog-card"
                style={{
                  background: "white",
                  border: `1px solid rgba(0,0,0,0.08)`,
                  padding: "2rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      ...label,
                      fontSize: "0.65rem",
                      color: CATEGORY_COLORS[article.category] || "#666",
                      padding: "0.2rem 0.6rem",
                      background: `${CATEGORY_COLORS[article.category] || "#ccc"}18`,
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                <h2
                  style={{
                    ...condensed,
                    fontSize: "1.25rem",
                    color: BLACK,
                    lineHeight: 1.15,
                    flex: 1,
                  }}
                >
                  {article.title}
                </h2>

                <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {article.description.length > 120
                    ? article.description.slice(0, 120) + "…"
                    : article.description}
                </p>

                <span
                  style={{
                    ...label,
                    fontSize: "0.65rem",
                    color: ORANGE,
                    marginTop: "auto",
                  }}
                >
                  Lire l'article →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <NewsletterBanner />

      {/* Footer minimal */}
      <footer style={{ background: BLACK, padding: "2rem 2.5rem", textAlign: "center" }}>
        <Link href="/" style={{ ...condensed, fontSize: "1.2rem", color: "white", textDecoration: "none" }}>
          MyRecup
        </Link>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "1rem" }}>
          {["Mentions légales", "CGV", "Confidentialité"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-").replace("é", "e").replace("à", "a").replace("'", "-")}`}
              style={{ ...label, fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
            >
              {item}
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}
