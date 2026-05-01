"use client";

import { useState } from "react";

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

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? "Une erreur est survenue.");
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setErrorMsg("Connexion impossible. Réessayez.");
      setState("error");
    }
  }

  return (
    <section
      style={{
        background: BLACK,
        borderTop: `3px solid ${ORANGE}`,
        padding: "4rem 2.5rem",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        {state === "success" ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: ORANGE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
              }}
            >
              ✓
            </div>
            <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white" }}>
              Ton code est en route
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              Vérifie ta boîte mail — ton code <strong style={{ color: ORANGE }}>RECUP10</strong> pour{" "}
              <strong style={{ color: ORANGE }}>-10%</strong> sur toute la boutique t'attend.
            </p>
          </div>
        ) : (
          <>
            <p style={{ ...label, color: ORANGE, fontSize: "0.7rem", marginBottom: "1rem" }}>
              (Offre exclusive abonnés)
            </p>
            <h2 style={{ ...condensed, fontSize: "clamp(2rem,5vw,3.5rem)", color: "white", marginBottom: "1rem" }}>
              -10% sur ta première commande
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 2rem" }}>
              Inscris-toi à la newsletter MyRecup. Pas de spam — un email par semaine, des conseils de récupération testés sur le terrain, et ton code promo{" "}
              <strong style={{ color: "white" }}>RECUP10</strong> envoyé immédiatement.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setState("idle"); setErrorMsg(""); }}
                placeholder="ton@email.fr"
                style={{
                  flex: 1,
                  minWidth: 220,
                  padding: "1rem 1.25rem",
                  border: "2px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.07)",
                  color: "white",
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                style={{
                  ...condensed,
                  padding: "1rem 1.75rem",
                  background: state === "loading" ? "#666" : ORANGE,
                  color: "white",
                  border: "none",
                  fontSize: "0.95rem",
                  cursor: state === "loading" ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                {state === "loading" ? "Envoi…" : "Recevoir mon code →"}
              </button>
            </form>

            {state === "error" && (
              <p style={{ color: "#ff8080", fontSize: "0.85rem", marginTop: "0.75rem" }}>
                ⚠️ {errorMsg}
              </p>
            )}

            <p style={{ ...label, color: "rgba(255,255,255,0.2)", fontSize: "0.6rem", marginTop: "1rem" }}>
              Pas de spam. Désabonnement en 1 clic.{" "}
              Voir notre{" "}
              <a href="/confidentialite" style={{ color: "rgba(255,255,255,0.35)" }}>
                politique de confidentialité
              </a>.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
