"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/catalog";

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

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.75rem 1rem",
  border: `1px solid rgba(0,0,0,0.15)`,
  background: "white",
  fontFamily: "inherit",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
};

export default function PanierPage() {
  const { items, count, total, removeItem, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const shipping = total >= 50 ? 0 : 5.9;
  const totalTTC = total + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/checkout");
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
        <Link
          href="/"
          style={{ ...condensed, fontSize: "1.4rem", lineHeight: 1, color: "white", textDecoration: "none" }}
        >
          MyRecup
        </Link>
        <Link href="/comparatif" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
          (Continuer mes achats)
        </Link>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 style={{ ...condensed, fontSize: "clamp(2.5rem,5vw,4rem)", marginBottom: "2.5rem" }}>
          Mon panier {count > 0 && <span style={{ color: ORANGE }}>({count})</span>}
        </h1>

        {items.length === 0 ? (
          /* Panier vide */
          <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
            <p style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🛒</p>
            <p style={{ color: "#888", marginBottom: "2rem" }}>Votre panier est vide.</p>
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
              Découvrir nos produits →
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "3rem",
              alignItems: "start",
            }}
            className="grid-cols-1 lg:grid-cols-[1fr_380px]"
          >
            {/* Colonne gauche : articles */}
            <div>
              <div style={{ borderTop: `2px solid ${BLACK}` }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr auto",
                      gap: "1.5rem",
                      alignItems: "center",
                      padding: "1.5rem 0",
                      borderBottom: `1px solid rgba(0,0,0,0.1)`,
                    }}
                  >
                    {/* Image placeholder */}
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        background: CREAM,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        flexShrink: 0,
                      }}
                    >
                      💆
                    </div>

                    {/* Infos */}
                    <div>
                      <p style={{ ...label, color: BLUE, fontSize: "0.65rem", marginBottom: "0.25rem" }}>
                        {item.brand}
                      </p>
                      <Link
                        href={`/produits/${item.slug}`}
                        style={{ fontWeight: 600, color: BLACK, textDecoration: "none", fontSize: "1rem" }}
                      >
                        {item.name}
                      </Link>
                      <p style={{ color: ORANGE, fontWeight: 700, marginTop: "0.25rem" }}>
                        {formatPrice(item.price)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#aaa",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          padding: 0,
                          marginTop: "0.5rem",
                          fontFamily: "inherit",
                        }}
                      >
                        Supprimer
                      </button>
                    </div>

                    {/* Quantité */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: 32,
                          height: 32,
                          border: `1px solid rgba(0,0,0,0.2)`,
                          background: "white",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontSize: "1rem",
                        }}
                      >
                        −
                      </button>
                      <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: 32,
                          height: 32,
                          border: `1px solid rgba(0,0,0,0.2)`,
                          background: "white",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontSize: "1rem",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulaire livraison */}
              <div style={{ marginTop: "3rem" }}>
                <h2 style={{ ...condensed, fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                  Informations de livraison
                </h2>
                <form id="checkout-form" onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ ...label, fontSize: "0.65rem", display: "block", marginBottom: "0.4rem" }}>
                        Prénom *
                      </label>
                      <input type="text" required placeholder="Jean" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ ...label, fontSize: "0.65rem", display: "block", marginBottom: "0.4rem" }}>
                        Nom *
                      </label>
                      <input type="text" required placeholder="Dupont" style={inputStyle} />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ ...label, fontSize: "0.65rem", display: "block", marginBottom: "0.4rem" }}>
                        Email *
                      </label>
                      <input type="email" required placeholder="jean@exemple.fr" style={inputStyle} />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ ...label, fontSize: "0.65rem", display: "block", marginBottom: "0.4rem" }}>
                        Adresse *
                      </label>
                      <input type="text" required placeholder="12 rue de la Paix" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ ...label, fontSize: "0.65rem", display: "block", marginBottom: "0.4rem" }}>
                        Code postal *
                      </label>
                      <input type="text" required placeholder="75001" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ ...label, fontSize: "0.65rem", display: "block", marginBottom: "0.4rem" }}>
                        Ville *
                      </label>
                      <input type="text" required placeholder="Paris" style={inputStyle} />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Colonne droite : résumé commande */}
            <div
              style={{
                position: "sticky",
                top: 100,
                background: CREAM,
                padding: "2rem",
              }}
            >
              <h2 style={{ ...condensed, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                Récapitulatif
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span style={{ color: "#555" }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}

                <div
                  style={{
                    borderTop: `1px solid rgba(0,0,0,0.15)`,
                    paddingTop: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                  }}
                >
                  <span style={{ color: "#555" }}>Livraison</span>
                  <span style={{ fontWeight: 600, color: shipping === 0 ? "#2a7a2a" : BLACK }}>
                    {shipping === 0 ? "Offerte" : formatPrice(shipping)}
                  </span>
                </div>

                {shipping === 0 && (
                  <p style={{ ...label, fontSize: "0.65rem", color: "#2a7a2a" }}>
                    ✓ Livraison offerte dès 50 €
                  </p>
                )}
                {shipping > 0 && (
                  <p style={{ ...label, fontSize: "0.65rem", color: "#888" }}>
                    + {formatPrice(50 - total)} pour la livraison offerte
                  </p>
                )}

                <div
                  style={{
                    borderTop: `2px solid ${BLACK}`,
                    paddingTop: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ ...condensed, fontSize: "1.2rem" }}>Total TTC</span>
                  <span style={{ ...condensed, fontSize: "1.4rem", color: ORANGE }}>
                    {formatPrice(totalTTC)}
                  </span>
                </div>

                <p style={{ ...label, fontSize: "0.6rem", color: "#aaa" }}>
                  TVA 20 % incluse
                </p>
              </div>

              <button
                type="submit"
                form="checkout-form"
                style={{
                  ...condensed,
                  display: "block",
                  width: "100%",
                  marginTop: "1.5rem",
                  padding: "1.1rem",
                  background: ORANGE,
                  color: "white",
                  border: "none",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
              >
                Commander → {formatPrice(totalTTC)}
              </button>

              <p style={{ ...label, fontSize: "0.6rem", color: "#aaa", textAlign: "center", marginTop: "0.75rem" }}>
                Paiement sécurisé — Stripe
              </p>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                {["Mentions légales", "CGV"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    style={{ ...label, fontSize: "0.6rem", color: "#aaa", textDecoration: "none" }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
