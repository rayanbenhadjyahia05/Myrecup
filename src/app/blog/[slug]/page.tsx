import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";

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
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | MyRecup`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://myrecup.fr/blog/${article.slug}`,
      siteName: "MyRecup",
      locale: "fr_FR",
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const htmlContent = await marked(article.content);

  const allArticles = getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

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
        <Link href="/blog" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
          ← Tous les articles
        </Link>
      </nav>

      {/* Hero article */}
      <div style={{ background: BLACK, padding: "4rem 2.5rem 3rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>{article.category}</p>
          <h1
            style={{
              ...condensed,
              fontSize: "clamp(2.2rem,5vw,4rem)",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            {article.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "1.05rem" }}>
            {article.description}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: CREAM, padding: "0.75rem 2.5rem" }}>
        <p style={{ ...label, color: "#888", fontSize: "0.7rem" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Accueil</Link>
          {" / "}
          <Link href="/blog" style={{ color: "#888", textDecoration: "none" }}>Blog</Link>
          {" / "}
          <span style={{ color: BLACK }}>{article.title}</span>
        </p>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <style>{`
          .article-content h2 {
            font-family: var(--font-condensed), sans-serif;
            font-weight: 900;
            font-size: 1.8rem;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            color: ${BLACK};
            margin: 2.5rem 0 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid ${ORANGE};
          }
          .article-content h3 {
            font-family: var(--font-condensed), sans-serif;
            font-weight: 700;
            font-size: 1.25rem;
            text-transform: uppercase;
            color: ${BLACK};
            margin: 2rem 0 0.75rem;
          }
          .article-content p {
            color: #333;
            line-height: 1.8;
            margin-bottom: 1.25rem;
            font-size: 1rem;
          }
          .article-content ul, .article-content ol {
            padding-left: 1.5rem;
            margin-bottom: 1.25rem;
          }
          .article-content li {
            color: #333;
            line-height: 1.8;
            margin-bottom: 0.4rem;
          }
          .article-content strong {
            color: ${BLACK};
            font-weight: 700;
          }
          .article-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.9rem;
          }
          .article-content th {
            background: ${BLACK};
            color: white;
            padding: 0.75rem 1rem;
            text-align: left;
            font-family: var(--font-condensed), sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.8rem;
          }
          .article-content td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(0,0,0,0.08);
            color: #333;
          }
          .article-content tr:nth-child(even) td {
            background: ${CREAM};
          }
          .article-content blockquote {
            border-left: 4px solid ${ORANGE};
            padding: 1rem 1.5rem;
            background: ${CREAM};
            margin: 1.5rem 0;
            font-style: italic;
            color: #555;
          }
          .article-content a {
            color: ${ORANGE};
            text-decoration: underline;
          }
        `}</style>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* CTA produit */}
        <div
          style={{
            background: BLACK,
            padding: "2.5rem",
            marginTop: "3rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <p style={{ ...label, color: ORANGE, fontSize: "0.65rem" }}>Recommandé par MyRecup</p>
          <p style={{ ...condensed, fontSize: "1.5rem", color: "white" }}>
            Pas encore équipé ?
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontSize: "0.9rem" }}>
            Notre gamme MyRecup a été conçue pour les sportifs qui s'entraînent sérieusement. Livraison 2–4 jours, retour 30 jours garanti.
          </p>
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
            }}
          >
            Voir les produits →
          </Link>
        </div>

        {/* Articles liés */}
        {related.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h2 style={{ ...condensed, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
              À lire aussi
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {related.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      padding: "1.5rem",
                      background: CREAM,
                      height: "100%",
                    }}
                  >
                    <p style={{ ...label, color: ORANGE, fontSize: "0.6rem", marginBottom: "0.5rem" }}>
                      {a.category}
                    </p>
                    <p style={{ fontWeight: 700, color: BLACK, lineHeight: 1.3, fontSize: "0.9rem" }}>
                      {a.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
