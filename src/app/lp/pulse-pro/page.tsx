"use client";

import { useState } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { CATALOG } from "@/lib/catalog";

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

const product = CATALOG.find((p) => p.id === "massage-gun-pro")!;

const preuves = [
  { val: "52 lbs", desc: "Stall force — frappe aussi fort qu'un kiné" },
  { val: "48 dB", desc: "Plus silencieux qu'une conversation normale" },
  { val: "8h", desc: "Autonomie — une semaine de séances" },
  { val: "6", desc: "Têtes incluses pour chaque zone musculaire" },
];

const objections = [
  {
    q: "C'est aussi bon qu'un Theragun ?",
    r: "Les performances clés (amplitude, stall force, silence) sont identiques. La seule différence : pas d'appli Bluetooth. Pour 90% des sportifs, ce n'est pas utile.",
  },
  {
    q: "La livraison est rapide ?",
    r: "2 à 4 jours ouvrés en France métropolitaine avec Colissimo. Gratuit dès 60 €.",
  },
  {
    q: "Et si ça ne me convient pas ?",
    r: "30 jours pour retourner le produit, sans justification, remboursement sous 5 jours.",
  },
];

export default function LandingPulsePro() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "inherit", background: "white" }}>

      {/* Bandeau urgence */}
      <div
        style={{
          background: ORANGE,
          padding: "0.6rem",
          textAlign: "center",
          ...label,
          color: "white",
          fontSize: "0.75rem",
        }}
      >
        🚀 Livraison gratuite dès 60 € — Offre valable jusqu'à épuisement des stocks
      </div>

      {/* Hero */}
      <section
        style={{
          background: BLACK,
          padding: "4rem 1.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Visuel produit */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "5rem",
          }}
        >
          💆
        </div>

        <div>
          <p style={{ ...label, color: ORANGE, marginBottom: "0.75rem" }}>
            (Récupère 3x plus vite)
          </p>
          <h1
            style={{
              ...condensed,
              fontSize: "clamp(2.5rem,8vw,5rem)",
              color: "white",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Stop aux courbatures qui durent 3 jours.
          </h1>
        </div>

        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 480, lineHeight: 1.7, fontSize: "1rem" }}>
          Le <strong style={{ color: "white" }}>MyRecup Gun Pro</strong> élimine les tensions musculaires en 10 minutes.
          Résultat : vous récupérez, vous revenez plus fort.
        </p>

        {/* CTA principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxWidth: 380 }}>
          <AddToCartButton product={product} />
        </div>

        <p style={{ ...label, color: "rgba(255,255,255,0.35)", fontSize: "0.65rem" }}>
          ✓ Paiement sécurisé &nbsp;&nbsp; ✓ Livraison 2-4j &nbsp;&nbsp; ✓ 30j de retour
        </p>
      </section>

      {/* Preuves chiffrées */}
      <section style={{ background: CREAM, padding: "3rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "1rem",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {preuves.map(({ val, desc }) => (
            <div key={val} style={{ textAlign: "center", padding: "1.25rem", background: "white" }}>
              <div style={{ ...condensed, fontSize: "2.2rem", color: ORANGE, lineHeight: 1 }}>{val}</div>
              <p style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.5, marginTop: "0.5rem" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problème / Solution */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ borderLeft: `4px solid #ddd`, paddingLeft: "1.5rem" }}>
            <p style={{ ...label, color: "#aaa", fontSize: "0.65rem", marginBottom: "0.5rem" }}>(Le problème)</p>
            <p style={{ fontSize: "1rem", color: "#555", lineHeight: 1.7 }}>
              Après une séance intense, les courbatures durent 48 à 72h. Résultat : vous manquez des entraînements,
              vous perdez de la régularité, vous stagez.
            </p>
          </div>
          <div style={{ borderLeft: `4px solid ${ORANGE}`, paddingLeft: "1.5rem" }}>
            <p style={{ ...label, color: ORANGE, fontSize: "0.65rem", marginBottom: "0.5rem" }}>(La solution)</p>
            <p style={{ fontSize: "1rem", color: BLACK, lineHeight: 1.7 }}>
              10 minutes de massage par percussion sur les zones travaillées. Le flux sanguin augmente,
              l'acide lactique est éliminé, les tensions musculaires disparaissent. Vous pouvez recommencer le lendemain.
            </p>
          </div>
        </div>
      </section>

      {/* Spécifications clés */}
      <section style={{ background: BLACK, padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ ...label, color: ORANGE, marginBottom: "1rem", textAlign: "center" }}>(Fiche technique)</p>
          <h2 style={{ ...condensed, fontSize: "1.8rem", color: "white", marginBottom: "1.5rem", textAlign: "center" }}>
            Ce que vous recevez
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {product.specs.map(({ key, value }, i) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.85rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                }}
              >
                <span style={{ ...label, color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}>{key}</span>
                <span style={{ fontWeight: 600, color: "white", fontSize: "0.9rem" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objections FAQ */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ ...condensed, fontSize: "1.8rem", color: BLACK, marginBottom: "2rem", textAlign: "center" }}>
          Vos questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {objections.map(({ q, r }, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.25rem 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "1rem",
                }}
              >
                <span style={{ fontWeight: 600, color: BLACK, fontSize: "0.95rem", lineHeight: 1.4 }}>{q}</span>
                <span style={{ color: ORANGE, fontSize: "1.2rem", flexShrink: 0 }}>
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <p style={{ color: "#444", lineHeight: 1.7, fontSize: "0.9rem", paddingBottom: "1.25rem" }}>
                  {r}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section
        style={{
          background: ORANGE,
          padding: "4rem 1.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,5vw,3.5rem)", color: "white" }}>
          Récupère mieux dès demain.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 400, lineHeight: 1.6 }}>
          109 € — livraison 2-4 jours — 30j de retour garanti
        </p>
        <div style={{ width: "100%", maxWidth: 360 }}>
          <AddToCartButton product={product} />
        </div>
      </section>

      {/* Footer minimal */}
      <footer style={{ background: BLACK, padding: "1.25rem 1.5rem", display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { lbl: "Mentions légales", href: "/mentions-legales" },
          { lbl: "CGV", href: "/cgv" },
          { lbl: "Confidentialité", href: "/confidentialite" },
        ].map(({ lbl, href }) => (
          <Link key={lbl} href={href} style={{ ...label, color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.65rem" }}>
            ({lbl})
          </Link>
        ))}
      </footer>
    </div>
  );
}
