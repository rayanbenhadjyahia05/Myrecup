"use client";

import { useState, useEffect } from "react";

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 900);
    const hideTimer = setTimeout(() => setVisible(false), 1300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: BLACK,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: "var(--font-condensed), sans-serif",
          fontWeight: 900,
          fontSize: "2rem",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          color: "white",
          lineHeight: 0.92,
        }}
      >
        My<span style={{ color: ORANGE }}>Recup</span>
      </span>

      {/* Barre de progression */}
      <div
        style={{
          width: 80,
          height: 2,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: ORANGE,
            borderRadius: 2,
            animation: "loadbar 0.9s ease forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes loadbar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
