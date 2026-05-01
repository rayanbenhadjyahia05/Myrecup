"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATALOG, CATEGORIES, formatPrice } from "@/lib/catalog";
import CartIcon from "@/components/CartIcon";
import NewsletterBanner from "@/components/NewsletterBanner";

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

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? ORANGE : "#ddd", fontSize: "0.85rem" }}>★</span>
      ))}
      <span style={{ color: "#888", fontSize: "0.75rem", marginLeft: "0.3rem" }}>{rating}/5</span>
    </span>
  );
}

type SortKey = "rating" | "price-asc" | "price-desc" | "promo";

export default function ComparatifPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("rating");
  const [maxPrice, setMaxPrice] = useState(300);

  const filtered = useMemo(() => {
    let list = CATALOG.filter((p) => {
      if (activeCategory !== "all" && p.categorySlug !== activeCategory) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "promo": return [...list].sort((a, b) => {
        const promoA = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
        const promoB = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
        return promoB - promoA;
      });
      case "rating":
      default: return [...list].sort((a, b) => b.rating - a.rating);
    }
  }, [activeCategory, sort, maxPrice]);

  const getCategoryColor = (slug: string) =>
    CATEGORIES.find((c) => c.slug === slug)?.color ?? "#888";

  const getCategoryName = (slug: string) =>
    CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.1rem 2.5rem",
          background: `rgba(91,200,245,0.95)`,
          backdropFilter: "blur(8px)",
        }}
      >
        <Link href="/" style={{ ...condensed, fontSize: "1.4rem", color: "white", textDecoration: "none" }}>
          MyRecup
        </Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { lbl: "Produits", href: "/pistolets-de-massage" },
            { lbl: "Blog", href: "/blog" },
            { lbl: "Quiz", href: "/quiz" },
          ].map(({ lbl, href }) => (
            <Link key={lbl} href={href} style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
              {lbl}
            </Link>
          ))}
          <CartIcon />
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: BLACK, padding: "4rem 2.5rem 3rem" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>(Comparatif)</p>
        <h1 style={{ ...condensed, fontSize: "clamp(2.5rem,6vw,5rem)", color: "white", marginBottom: "1rem" }}>
          Comparez<br />nos produits
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 480, lineHeight: 1.7 }}>
          {CATALOG.length} produits MyRecup — filtrés par catégorie, triés par note, prix ou promo. Trouvez celui qui correspond à votre budget et vos besoins.
        </p>
      </div>

      <div style={{ background: CREAM, minHeight: "100vh" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", alignItems: "start" }}>

          {/* Sidebar */}
          <aside
            style={{
              background: "white",
              borderRight: "1px solid rgba(0,0,0,0.08)",
              padding: "2rem 1.5rem",
              position: "sticky",
              top: 64,
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {/* Catégories */}
            <p style={{ ...label, fontSize: "0.65rem", color: "#aaa", marginBottom: "0.75rem" }}>Catégorie</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "2rem" }}>
              {[{ slug: "all", name: "Toutes les catégories" }, ...CATEGORIES].map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    padding: "0.55rem 0.75rem",
                    background: activeCategory === cat.slug ? BLACK : "transparent",
                    color: activeCategory === cat.slug ? "white" : "#444",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-condensed), sans-serif",
                    fontWeight: activeCategory === cat.slug ? 700 : 400,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    borderLeft: activeCategory === cat.slug
                      ? `3px solid ${ORANGE}`
                      : "3px solid transparent",
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", marginBottom: "1.5rem" }} />

            {/* Tri */}
            <p style={{ ...label, fontSize: "0.65rem", color: "#aaa", marginBottom: "0.75rem" }}>Trier par</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "2rem" }}>
              {[
                { value: "rating", label: "Meilleure note" },
                { value: "price-asc", label: "Prix croissant" },
                { value: "price-desc", label: "Prix décroissant" },
                { value: "promo", label: "Plus grosse promo" },
              ].map(({ value, label: lbl }) => (
                <label key={value} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="sort"
                    checked={sort === value}
                    onChange={() => setSort(value as SortKey)}
                    style={{ accentColor: ORANGE }}
                  />
                  <span style={{ fontSize: "0.85rem" }}>{lbl}</span>
                </label>
              ))}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", marginBottom: "1.5rem" }} />

            {/* Budget */}
            <p style={{ ...label, fontSize: "0.65rem", color: "#aaa", marginBottom: "0.5rem" }}>
              Budget max : <strong style={{ color: BLACK }}>{maxPrice} €</strong>
            </p>
            <input
              type="range"
              min={10} max={300} step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: ORANGE }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#aaa", marginTop: "0.25rem" }}>
              <span>10 €</span><span>300 €</span>
            </div>
          </aside>

          {/* Grille produits */}
          <main style={{ padding: "2rem" }}>
            <p style={{ ...label, fontSize: "0.65rem", color: "#888", marginBottom: "1.5rem" }}>
              {filtered.length} produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#888" }}>
                <div style={{ ...condensed, fontSize: "2rem", marginBottom: "0.5rem" }}>Aucun résultat</div>
                <p style={{ fontSize: "0.9rem" }}>Élargissez votre budget ou changez de catégorie.</p>
                <button
                  onClick={() => { setActiveCategory("all"); setMaxPrice(300); setSort("rating"); }}
                  style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", background: ORANGE, color: "white", border: "none", cursor: "pointer", fontFamily: "var(--font-condensed), sans-serif", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}
                >
                  Réinitialiser
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {filtered.map((product, i) => {
                  const catColor = getCategoryColor(product.categorySlug);
                  const catName = getCategoryName(product.categorySlug);
                  const discount = product.oldPrice
                    ? Math.round((1 - product.price / product.oldPrice) * 100)
                    : 0;

                  return (
                    <div
                      key={product.id}
                      style={{
                        background: "white",
                        border: product.highlight ? `2px solid ${ORANGE}` : `1px solid rgba(0,0,0,0.1)`,
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                      }}
                    >
                      {/* Rang */}
                      <div style={{
                        position: "absolute", top: 12, left: 12,
                        width: 28, height: 28,
                        background: i === 0 ? ORANGE : "#e8e8e8",
                        color: i === 0 ? "white" : "#666",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        ...condensed, fontSize: "0.8rem", zIndex: 1,
                      }}>
                        #{i + 1}
                      </div>

                      {/* Badge promo */}
                      {discount >= 10 && (
                        <div style={{
                          position: "absolute", top: 12, right: 12,
                          background: ORANGE, color: "white",
                          padding: "0.2rem 0.55rem",
                          ...label, fontSize: "0.6rem", zIndex: 1,
                        }}>
                          -{discount}%
                        </div>
                      )}

                      {/* Image produit */}
                      <div style={{ background: "white", height: 160, position: "relative", overflow: "hidden" }}>
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="280px"
                            style={{ objectFit: "contain", padding: "1rem" }}
                          />
                        ) : (
                          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", background: CREAM }}>💆</div>
                        )}
                      </div>

                      {/* Contenu */}
                      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                        {/* Catégorie */}
                        <span style={{ ...label, fontSize: "0.6rem", color: catColor }}>{catName}</span>

                        {/* Nom */}
                        <h2 style={{ ...condensed, fontSize: "1.2rem", color: BLACK, lineHeight: 1.1 }}>
                          {product.name}
                        </h2>

                        {/* Note */}
                        <Stars rating={product.rating} />

                        {/* Tagline */}
                        <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.5, flex: 1 }}>
                          {product.tagline}
                        </p>

                        {/* Specs clés (2 premières) */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", background: CREAM, padding: "0.65rem", fontSize: "0.78rem" }}>
                          {product.specs.slice(0, 4).map(({ key, value }) => (
                            <div key={key}>
                              <span style={{ display: "block", fontSize: "0.6rem", color: "#999", ...label }}>{key}</span>
                              <span style={{ fontWeight: 600, color: BLACK }}>{value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Prix + CTA */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.5rem" }}>
                          <div>
                            <span style={{ ...condensed, fontSize: "1.7rem", color: ORANGE }}>{formatPrice(product.price)}</span>
                            {product.oldPrice && (
                              <span style={{ fontSize: "0.8rem", color: "#bbb", textDecoration: "line-through", marginLeft: "0.4rem" }}>
                                {formatPrice(product.oldPrice)}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/produits/${product.slug}`}
                            style={{
                              ...label,
                              padding: "0.6rem 1.1rem",
                              background: product.highlight ? ORANGE : BLACK,
                              color: "white",
                              textDecoration: "none",
                              fontSize: "0.7rem",
                            }}
                          >
                            Voir →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      <NewsletterBanner />

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
