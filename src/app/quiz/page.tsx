"use client";

import { useState } from "react";
import Link from "next/link";
import CartIcon from "@/components/CartIcon";

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";
const BLUE = "#5BC8F5";

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

const questions = [
  {
    id: "sport",
    question: "Quel est votre sport principal ?",
    options: [
      { id: "endurance", label: "Course à pied / Cyclisme / Triathlon", emoji: "🏃" },
      { id: "muscu", label: "Musculation / Crossfit / HIIT", emoji: "🏋️" },
      { id: "yoga", label: "Yoga / Pilates / Mobilité", emoji: "🧘" },
      { id: "autres", label: "Sport collectif / Arts martiaux", emoji: "⚽" },
    ],
  },
  {
    id: "freq",
    question: "À quelle fréquence vous entraînez-vous ?",
    options: [
      { id: "debutant", label: "1 à 2 fois par semaine", emoji: "🌱" },
      { id: "regulier", label: "3 à 4 fois par semaine", emoji: "💪" },
      { id: "intense", label: "5 fois et plus", emoji: "🔥" },
    ],
  },
  {
    id: "douleur",
    question: "Où ressentez-vous le plus de tensions ?",
    options: [
      { id: "dos", label: "Dos, nuque, lombaires", emoji: "🔙" },
      { id: "jambes", label: "Jambes, mollets, ischio-jambiers", emoji: "🦵" },
      { id: "partout", label: "Partout — récupération globale", emoji: "⚡" },
    ],
  },
  {
    id: "budget",
    question: "Quel est votre budget ?",
    options: [
      { id: "petit", label: "Moins de 50 €", emoji: "💶" },
      { id: "moyen", label: "50 à 150 €", emoji: "💰" },
      { id: "large", label: "150 € et plus", emoji: "🏆" },
    ],
  },
];

type Answers = Record<string, string>;

function getRecommendation(answers: Answers) {
  const { sport, douleur, budget, freq } = answers;

  if (budget === "large" && freq === "intense") {
    if (sport === "endurance") {
      return {
        slug: "compression-boots",
        nom: "MyRecup Compression Boots",
        prix: "133 €",
        raison:
          "Pour un sportif d'endurance intense avec un budget confortable, la pressothérapie des Compression Boots est l'investissement qui change tout. Jambes légères après chaque longue sortie.",
        emoji: "🦵",
      };
    }
    return {
      slug: "massage-gun-pro",
      nom: "MyRecup Gun Pro",
      prix: "109 €",
      raison:
        "Vous vous entraînez souvent et fort. Le Gun Pro est l'outil de récupération quotidien qui s'impose — silencieux, puissant, 8h d'autonomie.",
      emoji: "💆",
    };
  }

  if (budget === "petit") {
    if (douleur === "dos") {
      return {
        slug: "peanut-roller",
        nom: "MyRecup Peanut Roller",
        prix: "22 €",
        raison:
          "Pour les tensions du dos à petit budget, la balle cacahuète est la solution idéale. Elle masse les paravertébraux sans toucher les vertèbres — efficace et accessible.",
        emoji: "🔵",
      };
    }
    return {
      slug: "hot-cold-pack",
      nom: "MyRecup Hot Cold Pack",
      prix: "17 €",
      raison:
        "Le Hot Cold Pack chaud/froid est l'indispensable à moins de 20 €. Froid sur les inflammations, chaud pour relâcher. Le point de départ de toute routine récupération.",
      emoji: "🧊",
    };
  }

  if (douleur === "dos") {
    return {
      slug: "peanut-roller",
      nom: "MyRecup Peanut Roller",
      prix: "22 €",
      raison:
        "Vous souffrez principalement du dos. La balle cacahuète est conçue exactement pour ça : sa forme double préserve la colonne vertébrale tout en massant profondément les lombaires et les trapèzes.",
      emoji: "🔵",
    };
  }

  if (sport === "yoga") {
    return {
      slug: "foam-roller",
      nom: "MyRecup Foam Roller",
      prix: "33 €",
      raison:
        "Pour la mobilité et le yoga, le foam roller complète parfaitement votre pratique — surface texturée haute densité pour libérer les fascias et améliorer la souplesse.",
      emoji: "🟤",
    };
  }

  return {
    slug: "massage-gun-mini",
    nom: "MyRecup Gun Mini",
    prix: "65 €",
    raison:
      "Le Gun Mini est le compromis idéal : performances sérieuses (12 mm d'amplitude) dans un format compact. Parfait pour une utilisation polyvalente.",
    emoji: "💆",
  };
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const currentQ = questions[step];
  const progress = Math.round(((step) / questions.length) * 100);

  function handleAnswer(optionId: string) {
    const newAnswers = { ...answers, [currentQ.id]: optionId };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  const reco = done ? getRecommendation(answers) : null;

  return (
    <>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(91,200,245,0.95)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.1rem 2.5rem",
        }}
      >
        <Link href="/" style={{ ...condensed, fontSize: "1.4rem", color: "white", textDecoration: "none" }}>
          MyRecup
        </Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link href="/comparatif" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
            (Comparatif)
          </Link>
          <CartIcon />
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: BLACK, padding: "4rem 2.5rem 3rem", textAlign: "center" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>(Quiz produit)</p>
        <h1 style={{ ...condensed, fontSize: "clamp(2.5rem,6vw,5rem)", color: "white", marginBottom: "1rem" }}>
          Quel produit<br />vous correspond ?
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 400, margin: "0 auto", lineHeight: 1.7 }}>
          4 questions, 30 secondes. On vous recommande le produit parfait pour votre profil.
        </p>
      </section>

      {/* Quiz */}
      <section style={{ background: "white", padding: "4rem 2.5rem", minHeight: 400 }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>

          {!done ? (
            <>
              {/* Progression */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <p style={{ ...label, color: ORANGE, fontSize: "0.65rem" }}>
                    Question {step + 1} / {questions.length}
                  </p>
                  <p style={{ ...label, color: "#aaa", fontSize: "0.65rem" }}>{progress}%</p>
                </div>
                <div style={{ height: 4, background: "#eee", borderRadius: 2 }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      background: ORANGE,
                      borderRadius: 2,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 style={{ ...condensed, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: BLACK, marginBottom: "2rem" }}>
                {currentQ.question}
              </h2>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {currentQ.options.map(({ id, label: lbl, emoji }) => (
                  <button
                    key={id}
                    onClick={() => handleAnswer(id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.25rem 1.5rem",
                      background: CREAM,
                      border: "2px solid transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "0.95rem",
                      color: BLACK,
                      fontFamily: "inherit",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = ORANGE;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
                    <span style={{ lineHeight: 1.4 }}>{lbl}</span>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  style={{
                    marginTop: "1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    ...label,
                    color: "#aaa",
                    fontSize: "0.7rem",
                  }}
                >
                  ← Question précédente
                </button>
              )}
            </>
          ) : (
            /* Résultat */
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
              <p style={{ ...label, color: ORANGE, fontSize: "0.65rem" }}>(Notre recommandation)</p>

              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: CREAM,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                }}
              >
                {reco!.emoji}
              </div>

              <div>
                <h2 style={{ ...condensed, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: BLACK, marginBottom: "0.5rem" }}>
                  {reco!.nom}
                </h2>
                <span style={{ ...condensed, fontSize: "1.8rem", color: ORANGE }}>{reco!.prix}</span>
              </div>

              <p style={{ color: "#555", lineHeight: 1.7, maxWidth: 460, fontSize: "0.95rem" }}>
                {reco!.raison}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxWidth: 360 }}>
                <Link
                  href={`/produits/${reco!.slug}`}
                  style={{
                    ...condensed,
                    display: "block",
                    padding: "1rem",
                    background: ORANGE,
                    color: "white",
                    textDecoration: "none",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  Voir ce produit →
                </Link>
                <button
                  onClick={restart}
                  style={{
                    ...label,
                    padding: "0.75rem",
                    background: "none",
                    border: `2px solid ${BLACK}`,
                    color: BLACK,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.75rem",
                  }}
                >
                  Recommencer le quiz
                </button>
              </div>

              <p style={{ ...label, color: "#ccc", fontSize: "0.65rem" }}>
                Résultat basé sur vos 4 réponses
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: BLACK, padding: "1.5rem 2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {[
          { lbl: "Mentions légales", href: "/mentions-legales" },
          { lbl: "CGV", href: "/cgv" },
          { lbl: "Confidentialité", href: "/confidentialite" },
        ].map(({ lbl, href }) => (
          <Link key={lbl} href={href} style={{ ...label, color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.7rem" }}>
            ({lbl})
          </Link>
        ))}
      </footer>
    </>
  );
}
