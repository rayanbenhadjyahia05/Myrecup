"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";
const GREEN = "#16a34a";

const condensed: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "-0.02em",
};

const label: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 400,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

interface CartableProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  brand?: string;
  serie?: string;
}

export default function ProductActions({ product }: { product: CartableProduct }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand ?? product.serie ?? "MyRecup",
        price: product.price,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Quantity + CTA row */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "stretch" }}>
        {/* Qty selector */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: `2px solid ${BLACK}`,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            style={{
              width: 44,
              height: "100%",
              background: "white",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: BLACK,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <span
            style={{
              width: 44,
              textAlign: "center",
              fontWeight: 700,
              fontSize: "1rem",
              color: BLACK,
              borderLeft: `1px solid #e0e0e0`,
              borderRight: `1px solid #e0e0e0`,
              lineHeight: "44px",
            }}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            style={{
              width: 44,
              height: "100%",
              background: "white",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: BLACK,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          style={{
            ...condensed,
            flex: 1,
            padding: "0 1.5rem",
            background: added ? GREEN : ORANGE,
            color: "white",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            minHeight: 52,
          }}
        >
          {added ? (
            <>✓ Ajouté au panier</>
          ) : (
            <> Ajouter au panier</>
          )}
        </button>
      </div>

      {/* Stock */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN, display: "inline-block", flexShrink: 0 }} />
        <span style={{ ...label, color: GREEN, fontSize: "0.72rem" }}>
          En stock — livraison sous 2–4 jours ouvrés
        </span>
      </div>
    </div>
  );
}
