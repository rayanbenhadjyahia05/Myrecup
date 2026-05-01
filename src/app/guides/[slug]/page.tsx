import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import CartIcon from "@/components/CartIcon";

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

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | MyRecup`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const htmlContent = await marked(article.content);

  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

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
          <Link href="/blog" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
            (← Blog)
          </Link>
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
          <Link href="/blog" style={{ color: "#888", textDecoration: "none" }}>Blog</Link>
          {" / "}
          <span style={{ color: BLACK }}>{article.title}</span>
        </p>
      </div>

      {/* Header article */}
      <header style={{ background: BLACK, padding: "4rem 2.5rem 3rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>({article.category})</p>
          <h1
            style={{
              fontFamily: "var(--font-condensed), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem,5vw,3.5rem)",
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            {article.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "1rem", maxWidth: 580 }}>
            {article.description}
          </p>
          <p style={{ ...label, color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", marginTop: "1.5rem" }}>
            Publié le {new Date(article.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            {" — "}Mot-clé ciblé : {article.keyword}
          </p>
        </div>
      </header>

      {/* Contenu article */}
      <main style={{ padding: "4rem 2.5rem", maxWidth: 760, margin: "0 auto" }}>
        <style>{`
          .article-content h1 { display: none; }
          .article-content h2 {
            font-family: var(--font-condensed), sans-serif;
            font-weight: 900;
            font-size: clamp(1.5rem, 3vw, 2rem);
            text-transform: uppercase;
            letter-spacing: -0.02em;
            color: ${BLACK};
            margin: 2.5rem 0 1rem;
            line-height: 1;
          }
          .article-content h3 {
            font-family: var(--font-condensed), sans-serif;
            font-weight: 700;
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            color: ${ORANGE};
            margin: 2rem 0 0.75rem;
          }
          .article-content p {
            color: #333;
            line-height: 1.8;
            font-size: 1rem;
            margin-bottom: 1.25rem;
          }
          .article-content strong { color: ${BLACK}; font-weight: 700; }
          .article-content ul, .article-content ol {
            padding-left: 1.5rem;
            margin-bottom: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }
          .article-content li { color: #333; line-height: 1.7; font-size: 0.95rem; }
          .article-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            font-size: 0.9rem;
          }
          .article-content th {
            background: ${BLACK};
            color: white;
            padding: 0.6rem 1rem;
            text-align: left;
            font-weight: 700;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .article-content td {
            padding: 0.6rem 1rem;
            border-bottom: 1px solid rgba(0,0,0,0.08);
            color: #333;
          }
          .article-content tr:nth-child(even) td { background: ${CREAM}; }
          .article-content blockquote {
            border-left: 4px solid ${ORANGE};
            padding: 0.75rem 1.25rem;
            margin: 1.5rem 0;
            background: ${CREAM};
            color: #555;
            font-style: italic;
            font-size: 0.9rem;
          }
          .article-content a { color: ${ORANGE}; }
          .article-content hr { border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 2rem 0; }
        `}</style>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>

      {/* CTA milieu */}
      <aside
        style={{
          background: CREAM,
          padding: "2.5rem",
          margin: "0 2.5rem 4rem",
          maxWidth: 760,
          marginLeft: "auto",
          marginRight: "auto",
          borderLeft: `4px solid ${ORANGE}`,
        }}
      >
        <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.5rem" }}>
          (Notre recommandation)
        </p>
        <p style={{ fontWeight: 600, color: BLACK, marginBottom: "1rem", lineHeight: 1.5 }}>
          Prêt à passer à l'action ? Comparez tous nos pistolets de massage testés et trouvez celui qui correspond à votre budget.
        </p>
        <Link
          href="/comparatif"
          style={{
            ...label,
            display: "inline-block",
            padding: "0.75rem 1.75rem",
            background: ORANGE,
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "0.8rem",
          }}
        >
          Voir le comparatif complet →
        </Link>
      </aside>

      {/* Articles liés */}
      {related.length > 0 && (
        <section style={{ padding: "0 2.5rem 5rem", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ ...condensed, fontSize: "1.8rem", marginBottom: "1.5rem" }}>
            Articles liés
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/guides/${a.slug}`}
                style={{
                  textDecoration: "none",
                  color: BLACK,
                  padding: "1rem 0",
                  borderBottom: `1px solid rgba(0,0,0,0.1)`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.25rem" }}>{a.category}</p>
                  <p style={{ fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.3 }}>{a.title}</p>
                </div>
                <span style={{ color: ORANGE, fontSize: "1.2rem", flexShrink: 0 }}>→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

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
