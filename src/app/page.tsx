import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/components/CartIcon";
import NewsletterBanner from "@/components/NewsletterBanner";
import { CATEGORIES } from "@/lib/catalog";

const ORANGE = "#E84525";
const BLUE = "#5BC8F5";
const BLUE_DARK = "#1A9ED4";
const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";

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

/* ── DATA ── */

const stats = [
  { icon: "⚡", value: "120", sup: "+", label: "Produits testés" },
  { icon: "⭐", value: "4.8", sup: "/5", label: "Note moyenne vérifiée" },
  { icon: "🚀", value: "48", sup: "h", label: "Livraison express" },
];


const piliers = [
  { emoji: "💆", label: "Pistolet de massage" },
  { emoji: "🔵", label: "Rouleau de massage" },
  { emoji: "🤸", label: "Étirements" },
  { emoji: "💧", label: "Hydratation" },
  { emoji: "😴", label: "Sommeil" },
  { emoji: "🧊", label: "Cryothérapie" },
];

const articles = [
  {
    tag: "Comparatif",
    date: "Avril",
    title: "Les 5 meilleurs pistolets de massage — test complet",
    excerpt: "Theragun, Hypervolt, Ekrin… on a tout testé pour vous donner un avis tranché.",
    slug: "meilleur-pistolet-de-massage-2026",
    image: "/images/john-fornander-pLolUyEO6VI-unsplash.jpg",
    imageAlt: "Sportif qui récupère après un entraînement intensif",
  },
  {
    tag: "Guide",
    date: "Avril",
    title: "Comment utiliser un rouleau de massage ?",
    excerpt: "Technique, durée, zones à éviter — le guide complet pour débuter sans se blesser.",
    slug: "comment-utiliser-pistolet-massage",
    image: "/images/jane-palash-yimb1ePGs00-unsplash.jpg",
    imageAlt: "Sportive qui s'étire après sa séance de course à pied en ville",
  },
  {
    tag: "Récupération",
    date: "Mars",
    title: "Récupération musculaire : les 6 erreurs à éviter",
    excerpt: "Les sportifs amateurs font ces erreurs sans le savoir. Voici comment les corriger.",
    slug: "pistolet-massage-recuperation-musculaire",
    image: "/images/logan-weaver-lgnwvr-_jVZnaORefc-unsplash.jpg",
    imageAlt: "Sportif intense récupérant après une séance avec kettlebell",
  },
];

/* ── COMPONENTS ── */

function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 backdrop-blur-md"
      style={{ background: `rgba(91,200,245,0.92)` }}
    >
      <Link
        href="/"
        style={{ ...condensed, fontSize: "1.4rem", lineHeight: 1, color: "white", textDecoration: "none" }}
      >
        MyRecup
      </Link>

      <style>{`
        @keyframes quiz-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,69,37,0.55); }
          50% { box-shadow: 0 0 0 7px rgba(232,69,37,0); }
        }
        @keyframes dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .nav-quiz {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0.45rem 1.1rem;
          background: #E84525;
          color: white !important;
          text-decoration: none;
          font-family: var(--font-condensed), sans-serif;
          font-weight: 900;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.92;
          animation: quiz-pulse 2s ease-in-out infinite;
          transition: background 0.15s;
        }
        .nav-quiz:hover { background: #c93a1f; }
        .nav-quiz-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: white;
          flex-shrink: 0;
          animation: dot-blink 1.4s ease-in-out infinite;
        }
      `}</style>

      <ul className="hidden md:flex gap-8 list-none items-center">
        {[
          { label: "Produits", href: "/pistolets-de-massage" },
          { label: "Comparatif", href: "/comparatif" },
          { label: "Blog", href: "/blog" },
          { label: "FAQ", href: "/faq" },
        ].map(({ label: lbl, href }) => (
          <li key={lbl}>
            <Link href={href} style={{ ...condensed, fontSize: "1rem", color: "white", opacity: 0.85, textDecoration: "none" }}>
              {lbl}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/quiz" className="nav-quiz">
            <span className="nav-quiz-dot" />
            Quiz
          </Link>
        </li>
      </ul>

      <div className="hidden md:flex items-center gap-3">
        <CartIcon />
        <Link
          href="/pistolets-de-massage"
          style={{
            ...label,
            padding: "0.65rem 1.5rem",
            border: `2px solid ${BLACK}`,
            background: "white",
            color: BLACK,
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 700,
          }}
        >
          Voir les produits
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-10 relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "4rem", background: `linear-gradient(160deg, ${BLUE} 0%, ${BLUE_DARK} 100%)` }}
    >
      {/* Sportif qui s'étire en salle de sport */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden md:block"
        style={{ width: "48%", zIndex: 1 }}
      >
        <Image
          src="/images/marvin-meyer-lxGF3OyQo6k-unsplash.jpg"
          alt="Sportif qui s'étire après une séance d'entraînement en salle de sport"
          fill
          priority
          sizes="48vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BLUE_DARK} 0%, transparent 35%)` }} />
      </div>

      <h1
        style={{
          ...condensed,
          fontSize: "clamp(4rem,11vw,10rem)",
          color: "white",
          position: "relative",
          zIndex: 2,
        }}
        className="max-w-full md:max-w-[55%]"
      >
        Récupère<br />plus vite,<br />performe<br />mieux.
      </h1>

      <p
        className="mt-6 max-w-md leading-relaxed"
        style={{ color: "rgba(255,255,255,0.85)", position: "relative", zIndex: 2 }}
      >
        Les meilleurs équipements de récupération sportive — testés, comparés et recommandés.
        Pistolets de massage, rouleaux, bandes élastiques et plus.
      </p>

      <div className="mt-8 flex gap-4 flex-wrap" style={{ position: "relative", zIndex: 2 }}>
        <Link
          href="#categories"
          style={{
            ...label,
            display: "inline-block",
            padding: "0.85rem 2rem",
            background: ORANGE,
            color: "white",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 700,
          }}
        >
          Découvrir les produits
        </Link>
        <Link
          href="/comparatif"
          style={{
            ...label,
            display: "inline-block",
            padding: "0.85rem 2rem",
            border: "2px solid rgba(255,255,255,0.5)",
            color: "white",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 700,
          }}
        >
          Voir le comparatif
        </Link>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="stats" className="px-10 py-20" style={{ background: ORANGE }}>
      <h2
        className="text-center mb-12"
        style={{ ...condensed, fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "white", lineHeight: 1.05 }}
      >
        Fait pour les sportifs<br />qui veulent plus
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
        {stats.map(({ icon, value, sup, label: lbl }) => (
          <div key={lbl} className="bg-white flex flex-col gap-10 p-7">
            <div
              style={{
                width: 36,
                height: 36,
                background: ORANGE,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
              }}
            >
              {icon}
            </div>
            <div>
              <div style={{ ...condensed, fontSize: "clamp(2.8rem,5vw,4rem)", color: BLACK, lineHeight: 1 }}>
                {value}<sup style={{ fontSize: "0.45em", verticalAlign: "super" }}>{sup}</sup>
              </div>
              <span style={{ ...label, color: "#888", display: "block", marginTop: "0.25rem" }}>
                ({lbl})
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProduitVedette() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2" style={{ background: BLACK }}>
      <div className="relative" style={{ minHeight: 480, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* placeholder jusqu'à réception de la photo produit */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "8rem", marginBottom: "1rem" }}>🥾</div>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", fontFamily: "var(--font-condensed)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Photo produit à venir
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-12 py-16">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <span style={{ ...label, color: ORANGE, fontSize: "0.65rem" }}>(Produit vedette)</span>
          <span style={{ ...label, fontSize: "0.6rem", background: ORANGE, color: "white", padding: "0.2rem 0.6rem" }}>
            High-ticket
          </span>
        </div>
        <h2
          style={{
            ...condensed,
            fontSize: "clamp(2.5rem,4vw,4rem)",
            color: "white",
            lineHeight: 0.95,
            marginBottom: "1rem",
          }}
        >
          MyRecup<br />Compression<br />Boots
        </h2>
        <p style={{ ...label, fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
          Pressothérapie professionnelle — Série Compression
        </p>
        <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
          4 chambres à compression séquentielle. 10 niveaux de pression, jusqu'à 250 mmHg. Jambes légères en 20 minutes — la technologie des équipes cyclistes professionnelles, enfin à domicile.
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "2rem" }}>
          <span style={{ ...condensed, fontSize: "2.5rem", color: ORANGE }}>133 €</span>
          <span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>279 €</span>
          <span style={{ ...label, fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>TTC</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href="/produits/compression-boots"
            style={{
              ...label,
              display: "inline-block",
              padding: "0.85rem 2rem",
              background: ORANGE,
              color: "white",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            Voir la fiche produit →
          </Link>
          <Link
            href="/categories/compression"
            style={{
              ...label,
              display: "inline-block",
              padding: "0.85rem 2rem",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              fontSize: "0.85rem",
            }}
          >
            Voir la gamme
          </Link>
        </div>
      </div>
    </section>
  );
}

function Piliers() {
  return (
    <section className="px-10 py-20" style={{ background: CREAM }}>
      <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3.5rem)" }}>
          Les 6 piliers<br />de votre récupération
        </h2>
        <p style={{ maxWidth: 380, color: "#555", lineHeight: 1.7, fontSize: "0.9rem", marginTop: "0.5rem" }}>
          La récupération sportive ne se résume pas à un seul outil. Voici les 6 leviers
          que combinent les sportifs qui progressent le plus vite.
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-3xl mx-auto">
        {piliers.map(({ emoji, label: lbl }) => (
          <div key={lbl} className="flex flex-col items-center gap-3">
            <div
              style={{
                width: 80,
                height: 80,
                background: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
              }}
            >
              {emoji}
            </div>
            <span style={{ ...label, fontSize: "0.65rem", color: "#666", textAlign: "center", lineHeight: 1.3 }}>
              {lbl}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Collection() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: 520, background: `linear-gradient(135deg, ${BLACK} 0%, #1a1a2e 50%, #0d0d1a 100%)` }}
    >

      <div className="relative flex flex-col items-center justify-center text-center px-8 py-24" style={{ zIndex: 2 }}>
        <p style={{ ...label, color: "rgba(255,255,255,0.65)", marginBottom: "1rem" }}>
          (La collection complète)
        </p>
        <h2
          style={{
            ...condensed,
            fontSize: "clamp(2.5rem,6vw,5rem)",
            color: "white",
            lineHeight: 0.95,
            marginBottom: "1.5rem",
          }}
        >
          Récupération<br />&amp; bien-être
        </h2>
        <Link
          href="#categories"
          style={{
            ...label,
            display: "inline-block",
            padding: "0.9rem 2.5rem",
            background: "white",
            color: BLACK,
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 700,
          }}
        >
          Découvrir la collection
        </Link>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categories" className="px-10 py-24" style={{ background: CREAM }}>
      <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
        <h2 style={{ ...condensed, fontSize: "clamp(2.5rem,5vw,4rem)" }}>
          Nos<br />catégories
        </h2>
      </div>

      <div style={{ borderTop: `1px solid rgba(0,0,0,0.15)` }}>
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group flex items-center justify-between py-7 transition-all duration-200 hover:pl-4"
            style={{ borderBottom: `1px solid rgba(0,0,0,0.15)`, textDecoration: "none", color: BLACK }}
          >
            <div className="flex items-center gap-6">
              <span style={{ ...label, color: ORANGE, minWidth: "2rem" }}>
                ({String(i + 1).padStart(2, "0")})
              </span>
              <span style={{ ...condensed, fontSize: "clamp(1.4rem,3vw,2.2rem)", lineHeight: 1.1 }}>
                {cat.name}
              </span>
              {i === 0 && (
                <span style={{ fontSize: "0.7rem", background: ORANGE, color: "white", padding: "0.2rem 0.6rem" }}>
                  Bestseller
                </span>
              )}
              {i === 5 && (
                <span style={{ fontSize: "0.7rem", background: BLACK, color: "white", padding: "0.2rem 0.6rem" }}>
                  Nouveau
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span style={{ ...label, color: "#aaa", fontSize: "0.65rem" }}>
                {[4, 6, 2, 1, 2, 3][i]} produit{[4, 6, 2, 1, 2, 3][i] > 1 ? "s" : ""}
              </span>
              <span style={{ fontSize: "1.5rem", color: ORANGE }}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="px-10 py-24 bg-white">
      <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
        <h2 style={{ ...condensed, fontSize: "clamp(2.5rem,5vw,4rem)" }}>
          Guides<br />&amp; conseils
        </h2>
        <Link
          href="#"
          style={{
            ...label,
            padding: "0.65rem 1.5rem",
            border: `2px solid ${BLACK}`,
            color: BLACK,
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 700,
            marginTop: "0.5rem",
          }}
        >
          Tout le blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map(({ tag, date, title, excerpt, slug, image, imageAlt }) => (
          <Link
            key={title}
            href={`/blog/${slug}`}
            className="flex flex-col gap-4"
            style={{ textDecoration: "none", color: BLACK }}
          >
            <div style={{ position: "relative", aspectRatio: "4/3", width: "100%", overflow: "hidden" }}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
              />
            </div>

            <div className="flex items-center gap-4">
              <span style={{ ...label, color: ORANGE }}>{tag}</span>
              <span style={{ fontSize: "0.7rem", color: "#888" }}>{date}</span>
            </div>
            <h3 style={{ ...condensed, fontSize: "1.4rem", lineHeight: 1.1 }}>{title}</h3>
            <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.6 }}>{excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="px-10 py-24 grid grid-cols-1 md:grid-cols-2 gap-16"
      style={{ background: BLACK }}
    >
      <div>
        <h2 style={{ ...condensed, fontSize: "clamp(3rem,6vw,5.5rem)", color: "white", lineHeight: 0.95 }}>
          Rejoins<br />la<br />communauté
        </h2>
        <ul className="grid grid-cols-2 gap-2 mt-8 list-none">
          {["À propos", "Blog", "Produits", "Instagram", "Contact", "YouTube"].map((item) => (
            <li key={item}>
              <Link
                href="#"
                style={{ ...label, color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.8rem" }}
              >
                ({item})
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <form className="flex flex-col gap-3">
        {["Prénom", "Email", "Sport pratiqué"].map((placeholder) => (
          <input
            key={placeholder}
            type={placeholder === "Email" ? "email" : "text"}
            placeholder={`(${placeholder})`}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              padding: "0.75rem 0",
              outline: "none",
              fontFamily: "inherit",
              fontSize: "0.9rem",
            }}
          />
        ))}
        <button
          type="submit"
          style={{
            marginTop: "0.75rem",
            background: "white",
            color: BLACK,
            border: "none",
            fontFamily: "var(--font-condensed), sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: "1rem",
            cursor: "pointer",
          }}
        >
          Recevoir les conseils
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-10 py-6 flex items-center justify-between" style={{ background: BLACK }}>
      <div className="flex gap-6 flex-wrap">
        {[
          { lbl: "Mentions légales", href: "/mentions-legales" },
          { lbl: "Confidentialité", href: "/confidentialite" },
          { lbl: "Livraison & Retours", href: "/livraison" },
          { lbl: "À propos", href: "/a-propos" },
          { lbl: "Contact", href: "/contact" },
        ].map(({ lbl, href }) => (
          <Link
            key={lbl}
            href={href}
            style={{ ...label, color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.7rem" }}
          >
            ({lbl})
          </Link>
        ))}
      </div>
      <span style={{ ...label, color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>MyRecup</span>
      <div
        className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
        style={{
          fontFamily: "var(--font-condensed), sans-serif",
          fontWeight: 900,
          fontSize: "clamp(4rem,14vw,10rem)",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.05)",
          lineHeight: 0.85,
          letterSpacing: "-0.02em",
        }}
      >
        MyRecup
      </div>
    </footer>
  );
}

/* ── PAGE ── */

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <ProduitVedette />
      <Piliers />
      <Collection />
      <Categories />
      <Blog />
      <Contact />
      <NewsletterBanner />
      <Footer />
    </>
  );
}
