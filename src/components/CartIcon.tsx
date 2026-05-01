"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const BLACK = "#0D0D0D";
const ORANGE = "#E84525";

export default function CartIcon() {
  const { count } = useCart();

  return (
    <Link
      href="/panier"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        color: BLACK,
        textDecoration: "none",
        fontSize: "1.25rem",
      }}
      aria-label={`Panier (${count} article${count > 1 ? "s" : ""})`}
    >
      🛒
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -6,
            right: -8,
            background: ORANGE,
            color: "white",
            borderRadius: "50%",
            width: 18,
            height: 18,
            fontSize: "0.65rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
