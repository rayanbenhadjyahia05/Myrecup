"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";

const label: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 400,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem("cookie_consent", "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: BLACK,
        borderTop: `3px solid ${ORANGE}`,
        padding: "1.25rem 2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", lineHeight: 1.6, maxWidth: 680, margin: 0 }}>
        🍪 MyRecup utilise des cookies nécessaires au bon fonctionnement du site (panier, préférences). Aucune donnée n'est revendue à des tiers.{" "}
        <Link href="/confidentialite" style={{ color: ORANGE, textDecoration: "underline" }}>
          En savoir plus
        </Link>
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
        <button
          onClick={refuse}
          style={{
            ...label,
            padding: "0.65rem 1.25rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Refuser
        </button>
        <button
          onClick={accept}
          style={{
            ...label,
            padding: "0.65rem 1.25rem",
            background: ORANGE,
            border: "none",
            color: "white",
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: 700,
          }}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
