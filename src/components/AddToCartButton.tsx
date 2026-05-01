"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";

const condensed: React.CSSProperties = {
  fontFamily: "var(--font-condensed), sans-serif",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "-0.02em",
};

interface CartableProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  brand?: string;
  serie?: string;
}

export default function AddToCartButton({ product }: { product: CartableProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand ?? product.serie ?? "MyRecup",
      price: product.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      style={{
        ...condensed,
        width: "100%",
        padding: "1rem",
        background: added ? "#2a7a2a" : BLACK,
        color: "white",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      {added ? "✓ Ajouté au panier" : "Ajouter au panier"}
    </button>
  );
}
