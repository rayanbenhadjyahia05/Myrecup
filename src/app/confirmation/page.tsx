"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const ORANGE = "#E84525";
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

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [orderRef] = useState(() =>
    "RP-" + Date.now().toString(36).toUpperCase()
  );

  const paymentStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (paymentStatus === "succeeded") {
      clearCart();
    }
  }, [paymentStatus, clearCart]);

  const isSuccess = !paymentStatus || paymentStatus === "succeeded";

  if (!isSuccess) {
    return (
      <section style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, background: "#c0392b", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", marginBottom: "2rem", color: "white" }}>✗</div>
        <h1 style={{ ...condensed, fontSize: "clamp(2rem,5vw,4rem)", color: BLACK, marginBottom: "1rem" }}>Paiement<br />échoué</h1>
        <p style={{ color: "#555", marginBottom: "2rem", maxWidth: 400, lineHeight: 1.7 }}>Le paiement n'a pas abouti. Votre carte n'a pas été débitée.</p>
        <Link href="/panier" style={{ ...condensed, padding: "1rem 2.5rem", background: ORANGE, color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Réessayer →
        </Link>
      </section>
    );
  }

  return (
    <>
      <section style={{ background: CREAM, padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, background: "#2a7a2a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 2rem", color: "white", fontWeight: 900 }}>
          ✓
        </div>
        <h1 style={{ ...condensed, fontSize: "clamp(2.5rem,6vw,5rem)", color: BLACK, marginBottom: "1rem" }}>
          Commande<br />confirmée !
        </h1>
        <p style={{ ...label, color: "#888", fontSize: "0.7rem", marginBottom: "0.5rem" }}>
          Référence commande
        </p>
        <p style={{ ...condensed, fontSize: "1.5rem", color: ORANGE, marginBottom: "2rem" }}>
          {orderRef}
        </p>
      </section>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ ...condensed, fontSize: "1.5rem", marginBottom: "1.5rem" }}>Et maintenant ?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { step: "01", title: "Email de confirmation", desc: "Vous allez recevoir votre récapitulatif de commande par email dans les prochaines minutes.", done: true },
              { step: "02", title: "Préparation", desc: "Votre commande est en cours de préparation. Délai habituel : 24–48h ouvrées.", done: false },
              { step: "03", title: "Expédition", desc: "Vous recevrez un email avec votre numéro de suivi dès l'expédition.", done: false },
              { step: "04", title: "Livraison", desc: "Livraison estimée en 2 à 4 jours ouvrés à votre adresse.", done: false },
            ].map(({ step, title, desc, done }) => (
              <div key={step} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "1.5rem", padding: "1.5rem 0", borderBottom: "1px solid rgba(0,0,0,0.08)", alignItems: "start" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: done ? "#2a7a2a" : CREAM, border: done ? "none" : "2px solid rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", ...condensed, fontSize: "0.9rem", color: done ? "white" : "#999", flexShrink: 0 }}>
                  {done ? "✓" : step}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: BLACK, marginBottom: "0.3rem" }}>{title}</p>
                  <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: BLACK, padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
          {[
            { icon: "↩", label: "Retour 30 jours", desc: "Satisfait ou remboursé" },
            { icon: "🔒", label: "Paiement sécurisé", desc: "Stripe 3D Secure" },
            { icon: "📦", label: "Livraison rapide", desc: "2–4 jours ouvrés" },
            { icon: "💬", label: "SAV 48h", desc: "Réponse garantie" },
          ].map(({ icon, label: lbl, desc }) => (
            <div key={lbl} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{icon}</p>
              <p style={{ ...label, color: "white", fontSize: "0.65rem" }}>{lbl}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" style={{ ...condensed, display: "inline-block", padding: "1rem 2.5rem", background: ORANGE, color: "white", textDecoration: "none", fontSize: "1rem" }}>
            Retour à l'accueil
          </Link>
          <Link href="/comparatif" style={{ ...condensed, display: "inline-block", padding: "1rem 2.5rem", border: `2px solid ${BLACK}`, color: BLACK, textDecoration: "none", fontSize: "1rem" }}>
            Voir les autres produits
          </Link>
        </div>

        <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center", marginTop: "2rem", lineHeight: 1.6 }}>
          Un problème avec votre commande ?{" "}
          <Link href="/contact" style={{ color: ORANGE, textDecoration: "underline" }}>Contactez-nous</Link>
          {" "}— réponse sous 48h.
        </p>
      </div>

      <footer style={{ background: BLACK, padding: "1.5rem 2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {[
          { lbl: "Mentions légales", href: "/mentions-legales" },
          { lbl: "CGV", href: "/cgv" },
          { lbl: "Confidentialité", href: "/confidentialite" },
        ].map(({ lbl, href }) => (
          <Link key={lbl} href={href} style={{ ...label, color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.7rem" }}>
            {lbl}
          </Link>
        ))}
      </footer>
    </>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <nav style={{ background: "rgba(91,200,245,0.95)", display: "flex", alignItems: "center", padding: "1.1rem 2.5rem" }}>
        <Link href="/" style={{ ...condensed, fontSize: "1.4rem", color: "white", textDecoration: "none" }}>MyRecup</Link>
      </nav>
      <Suspense fallback={<div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Chargement…</div>}>
        <ConfirmationContent />
      </Suspense>
    </>
  );
}
