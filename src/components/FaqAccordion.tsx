"use client";

import { useState } from "react";

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";

export type FaqItem = {
  category: string;
  questions: { q: string; a: string }[];
};

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid rgba(0,0,0,0.1)` }}>
      <button
        onClick={() => setOpen(!open)}
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
        <span style={{ fontWeight: 600, fontSize: "1rem", color: BLACK, lineHeight: 1.4 }}>
          {question}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            background: open ? ORANGE : CREAM,
            color: open ? "white" : BLACK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            fontWeight: 700,
            transition: "all 0.2s",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p style={{ paddingBottom: "1.25rem", color: "#444", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: 680 }}>
          {answer}
        </p>
      )}
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const condensed: React.CSSProperties = {
    fontFamily: "var(--font-condensed), sans-serif",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
  };

  return (
    <div>
      {items.map(({ category, questions }) => (
        <div key={category} style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              ...condensed,
              fontSize: "1.6rem",
              color: ORANGE,
              marginBottom: "0.5rem",
              borderLeft: `4px solid ${ORANGE}`,
              paddingLeft: "1rem",
            }}
          >
            {category}
          </h2>
          <div>
            {questions.map(({ q, a }) => (
              <AccordionItem key={q} question={q} answer={a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
