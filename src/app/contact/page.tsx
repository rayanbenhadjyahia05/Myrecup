"use client";

import { useState } from "react";
import Link from "next/link";
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 1rem",
  border: `1px solid rgba(0,0,0,0.2)`,
  background: "white",
  color: BLACK,
  fontSize: "0.95rem",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

const raisons = [
  "Question sur un produit",
  "Problème de commande",
  "Demande de partenariat",
  "Signaler une erreur dans un article",
  "Autre",
];

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", raison: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Une erreur est survenue. Réessayez.");
        setLoading(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  }

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
            { lbl: "Produits", href: "/pistolets-de-massage" },
            { lbl: "Comparatif", href: "/comparatif" },
            { lbl: "Blog", href: "/blog" },
          ].map(({ lbl, href }) => (
            <Link key={lbl} href={href} style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
              ({lbl})
            </Link>
          ))}
          <CartIcon />
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: BLACK, padding: "5rem 2.5rem 4rem" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>(Contact)</p>
        <h1 style={{ ...condensed, fontSize: "clamp(3rem,7vw,6rem)", color: "white", maxWidth: 600, marginBottom: "1rem" }}>
          On est là<br />pour vous aider
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 480 }}>
          Question sur un produit, problème de commande ou suggestion ? On répond sous 24h ouvrées.
        </p>
      </section>

      {/* Corps */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          minHeight: 600,
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Infos pratiques */}
        <div style={{ background: CREAM, padding: "4rem 2.5rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div>
            <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.5rem" }}>(Email)</p>
            <p style={{ fontWeight: 600, fontSize: "1rem", color: BLACK }}>contact@myrecup.fr</p>
          </div>
          <div>
            <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.5rem" }}>(Délai de réponse)</p>
            <p style={{ fontWeight: 600, fontSize: "1rem", color: BLACK }}>Sous 24h ouvrées</p>
          </div>
          <div>
            <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.5rem" }}>(Siège social)</p>
            <p style={{ fontWeight: 600, fontSize: "1rem", color: BLACK, lineHeight: 1.6 }}>
              MyRecup<br />Occitanie, France
            </p>
          </div>
          <div style={{ borderTop: `1px solid rgba(0,0,0,0.1)`, paddingTop: "2rem" }}>
            <p style={{ ...label, color: "#888", fontSize: "0.65rem", marginBottom: "1rem" }}>(Liens utiles)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { lbl: "FAQ — Questions fréquentes", href: "/faq" },
                { lbl: "Livraison & Retours", href: "/livraison" },
                { lbl: "Mentions légales", href: "/mentions-legales" },
              ].map(({ lbl, href }) => (
                <Link
                  key={lbl}
                  href={href}
                  style={{ ...label, color: BLACK, textDecoration: "none", fontSize: "0.7rem", opacity: 0.7 }}
                >
                  → {lbl}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div style={{ background: "white", padding: "4rem 2.5rem" }}>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem" }}>✓</div>
              <h2 style={{ ...condensed, fontSize: "2rem", color: BLACK }}>Message envoyé !</h2>
              <p style={{ color: "#555", lineHeight: 1.7 }}>
                On vous répondra dans les 24 heures ouvrées.
              </p>
              <Link
                href="/"
                style={{ ...label, padding: "0.75rem 1.5rem", background: ORANGE, color: "white", textDecoration: "none", fontWeight: 700, marginTop: "1rem" }}
              >
                Retour à l'accueil
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h2 style={{ ...condensed, fontSize: "1.8rem", color: BLACK, marginBottom: "0.5rem" }}>
                Envoyez-nous un message
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ ...label, fontSize: "0.65rem", color: "#666", display: "block", marginBottom: "0.4rem" }}>
                    Nom *
                  </label>
                  <input
                    name="nom"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ ...label, fontSize: "0.65rem", color: "#666", display: "block", marginBottom: "0.4rem" }}>
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.fr"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ ...label, fontSize: "0.65rem", color: "#666", display: "block", marginBottom: "0.4rem" }}>
                  Raison du contact *
                </label>
                <select
                  name="raison"
                  required
                  value={form.raison}
                  onChange={handleChange}
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Sélectionner…</option>
                  {raisons.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ ...label, fontSize: "0.65rem", color: "#666", display: "block", marginBottom: "0.4rem" }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande…"
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {error && (
                <div style={{ padding: "0.85rem 1rem", background: "#fff5f5", border: "1px solid #ffcccc", color: "#c0392b", fontSize: "0.85rem", lineHeight: 1.5 }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...condensed,
                  padding: "1rem",
                  background: loading ? "#999" : ORANGE,
                  color: "white",
                  border: "none",
                  fontSize: "1rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {loading ? "Envoi en cours…" : "Envoyer le message →"}
              </button>

              <p style={{ ...label, color: "#aaa", fontSize: "0.6rem", textAlign: "center" }}>
                Vos données ne sont jamais revendues — voir notre{" "}
                <Link href="/confidentialite" style={{ color: ORANGE }}>politique de confidentialité</Link>.
              </p>
            </form>
          )}
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
