"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import { formatPrice, CATALOG } from "@/lib/catalog";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

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

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.85rem 1rem",
  border: "1px solid rgba(0,0,0,0.2)",
  background: "white",
  fontFamily: "inherit",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
  color: BLACK,
};

type CustomerInfo = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  complement: string;
  codePostal: string;
  ville: string;
  pays: string;
};

/* ── Formulaire de paiement Stripe ── */
function PaymentForm({
  clientSecret,
  customer,
  totalTTC,
  onSuccess,
}: {
  clientSecret: string;
  customer: CustomerInfo;
  totalTTC: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Erreur de validation");
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
        payment_method_data: {
          billing_details: {
            name: `${customer.prenom} ${customer.nom}`,
            email: customer.email,
            phone: customer.telephone,
            address: {
              line1: customer.adresse,
              postal_code: customer.codePostal,
              city: customer.ville,
              country: customer.pays,
            },
          },
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Paiement refusé. Vérifiez vos informations.");
      setLoading(false);
    }
    // Si succès : Stripe redirige automatiquement vers /confirmation
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid rgba(0,0,0,0.12)",
          background: "white",
        }}
      >
        <PaymentElement
          options={{
            layout: "tabs",
            paymentMethodOrder: ["card", "paypal"],
          }}
        />
      </div>

      {error && (
        <div
          style={{
            padding: "0.85rem 1rem",
            background: "#fff5f5",
            border: "1px solid #ffcccc",
            color: "#c0392b",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ background: CREAM, padding: "1rem", fontSize: "0.8rem", color: "#555", lineHeight: 1.6 }}>
        <strong>🔒 Paiement 100% sécurisé</strong> — Vos données bancaires sont chiffrées et traitées par Stripe. MyRecup ne stocke jamais vos coordonnées bancaires.
        En confirmant, vous acceptez nos{" "}
        <Link href="/cgv" style={{ color: ORANGE }}>CGV</Link> et notre{" "}
        <Link href="/confidentialite" style={{ color: ORANGE }}>politique de confidentialité</Link>.
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          ...condensed,
          padding: "1.2rem",
          background: loading ? "#aaa" : ORANGE,
          color: "white",
          border: "none",
          fontSize: "1.1rem",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {loading ? (
          <>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>
            Vérification en cours…
          </>
        ) : (
          `🔒 Payer ${formatPrice(totalTTC)}`
        )}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}

/* ── Page principale checkout ── */
export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerInfo>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    complement: "",
    codePostal: "",
    ville: "",
    pays: "FR",
  });

  const shipping = total >= 50 ? 0 : 4.9;
  const totalTTC = total + shipping;

  // Calcul des économies sur les articles en promo
  const savings = items.reduce((acc, item) => {
    const catalogProduct = CATALOG.find((p) => p.id === item.id);
    if (catalogProduct?.oldPrice) {
      return acc + (catalogProduct.oldPrice - catalogProduct.price) * item.quantity;
    }
    return acc;
  }, 0);

  // Date de livraison estimée (2–4 jours ouvrés, hors week-end)
  function getDeliveryRange() {
    const now = new Date();
    const addBusinessDays = (date: Date, days: number) => {
      let count = 0;
      const d = new Date(date);
      while (count < days) {
        d.setDate(d.getDate() + 1);
        if (d.getDay() !== 0 && d.getDay() !== 6) count++;
      }
      return d;
    };
    const min = addBusinessDays(now, 2);
    const max = addBusinessDays(now, 4);
    const fmt = (d: Date) =>
      d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
    return `${fmt(min)} – ${fmt(max)}`;
  }

  const CATEGORY_EMOJI: Record<string, string> = {
    "pistolets-de-massage": "💆",
    "rouleaux-et-balles": "🔵",
    thermotherapie: "🧊",
    compression: "🥾",
    mobilite: "🤸",
  };

  useEffect(() => {
    if (items.length === 0) router.push("/panier");
  }, [items, router]);

  async function handleInfoSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  async function handleAdresseSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStripeError(null);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalTTC, items, customer }),
      });
      const data = await res.json();

      if (data.error) {
        setStripeError(data.error);
        return;
      }
      setClientSecret(data.clientSecret);
      setStep(3);
    } catch {
      setStripeError("Impossible de contacter le serveur de paiement. Réessayez.");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const steps = [
    { n: 1, label: "Coordonnées" },
    { n: 2, label: "Livraison" },
    { n: 3, label: "Paiement" },
  ];

  return (
    <>
      {/* Nav minimaliste */}
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
        <Link href="/panier" style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none", fontSize: "0.7rem" }}>
          ← Retour au panier
        </Link>
      </nav>

      {/* Indicateur d'étapes */}
      <div style={{ background: CREAM, padding: "1.25rem 2.5rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", alignItems: "center", gap: 0 }}>
          {steps.map(({ n, label: lbl }, i) => (
            <div key={n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: step >= n ? ORANGE : "#ddd",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {step > n ? "✓" : n}
                </div>
                <span style={{ ...label, fontSize: "0.65rem", color: step >= n ? BLACK : "#aaa" }}>{lbl}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 1, background: step > n ? ORANGE : "#ddd", margin: "0 0.5rem" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>

        {/* COLONNE GAUCHE : formulaires */}
        <div>
          {/* ÉTAPE 1 — Coordonnées */}
          {step === 1 && (
            <form onSubmit={handleInfoSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h1 style={{ ...condensed, fontSize: "1.8rem", color: BLACK }}>Vos coordonnées</h1>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <Field label="Prénom *" name="prenom" value={customer.prenom} onChange={handleChange} required placeholder="Jean" />
                <Field label="Nom *" name="nom" value={customer.nom} onChange={handleChange} required placeholder="Dupont" />
                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Email *" name="email" type="email" value={customer.email} onChange={handleChange} required placeholder="jean@exemple.fr" />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Téléphone" name="telephone" type="tel" value={customer.telephone} onChange={handleChange} placeholder="+33 6 12 34 56 78" />
                </div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#888", lineHeight: 1.6 }}>
                🔒 Vos données sont utilisées uniquement pour traiter votre commande, conformément à notre{" "}
                <Link href="/confidentialite" style={{ color: ORANGE }}>politique de confidentialité</Link> (RGPD).
              </p>
              <button
                type="submit"
                style={{ ...condensed, padding: "1rem", background: ORANGE, color: "white", border: "none", fontSize: "1rem", cursor: "pointer" }}
              >
                Continuer → Adresse de livraison
              </button>
            </form>
          )}

          {/* ÉTAPE 2 — Adresse */}
          {step === 2 && (
            <form onSubmit={handleAdresseSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button onClick={() => setStep(1)} type="button" style={{ background: "none", border: "none", cursor: "pointer", ...label, color: "#888" }}>
                  ← Retour
                </button>
                <h1 style={{ ...condensed, fontSize: "1.8rem", color: BLACK }}>Adresse de livraison</h1>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Adresse *" name="adresse" value={customer.adresse} onChange={handleChange} required placeholder="12 rue de la Paix" />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Complément d'adresse" name="complement" value={customer.complement} onChange={handleChange} placeholder="Appartement, bâtiment…" />
                </div>
                <Field label="Code postal *" name="codePostal" value={customer.codePostal} onChange={handleChange} required placeholder="75001" />
                <Field label="Ville *" name="ville" value={customer.ville} onChange={handleChange} required placeholder="Paris" />
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ ...label, fontSize: "0.65rem", display: "block", marginBottom: "0.4rem" }}>Pays *</label>
                  <select
                    name="pays"
                    value={customer.pays}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  >
                    <option value="FR">🇫🇷 France</option>
                    <option value="BE">🇧🇪 Belgique</option>
                    <option value="CH">🇨🇭 Suisse</option>
                    <option value="LU">🇱🇺 Luxembourg</option>
                  </select>
                </div>
              </div>

              {stripeError && (
                <div style={{ padding: "0.85rem 1rem", background: "#fff5f5", border: "1px solid #ffcccc", color: "#c0392b", fontSize: "0.9rem" }}>
                  ⚠️ {stripeError}
                </div>
              )}

              <button
                type="submit"
                style={{ ...condensed, padding: "1rem", background: ORANGE, color: "white", border: "none", fontSize: "1rem", cursor: "pointer" }}
              >
                Continuer → Paiement
              </button>
            </form>
          )}

          {/* ÉTAPE 3 — Paiement Stripe */}
          {step === 3 && clientSecret && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button onClick={() => setStep(2)} type="button" style={{ background: "none", border: "none", cursor: "pointer", ...label, color: "#888" }}>
                  ← Retour
                </button>
                <h1 style={{ ...condensed, fontSize: "1.8rem", color: BLACK }}>Paiement sécurisé</h1>
              </div>
              <div style={{ background: CREAM, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                <span>📦</span>
                <span style={{ color: "#555" }}>
                  Livraison vers <strong>{customer.prenom} {customer.nom}</strong> — {customer.adresse}, {customer.codePostal} {customer.ville}
                </span>
              </div>
              {stripePromise ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: ORANGE,
                        colorBackground: "#ffffff",
                        fontFamily: "var(--font-condensed), sans-serif",
                      },
                    },
                  }}
                >
                  <PaymentForm
                    clientSecret={clientSecret}
                    customer={customer}
                    totalTTC={totalTTC}
                    onSuccess={() => { clearCart(); router.push("/confirmation"); }}
                  />
                </Elements>
              ) : (
                <div style={{ padding: "2rem", background: "#fff3cd", border: "1px solid #ffc107", color: "#856404", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  <strong>⚙️ Configuration requise</strong><br />
                  Stripe n'est pas encore configuré. Pour activer les paiements :<br />
                  1. Créez un compte sur <strong>stripe.com</strong><br />
                  2. Copiez vos clés API dans un fichier <strong>.env.local</strong> à la racine du projet :<br />
                  <code style={{ display: "block", background: "#f8f9fa", padding: "0.5rem", marginTop: "0.5rem", fontSize: "0.8rem" }}>
                    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...<br />
                    STRIPE_SECRET_KEY=sk_test_...
                  </code>
                </div>
              )}
            </div>
          )}
        </div>

        {/* COLONNE DROITE : récapitulatif commande */}
        <div style={{ position: "sticky", top: 100, background: CREAM, padding: "2rem" }}>
          <h2 style={{ ...condensed, fontSize: "1.3rem", marginBottom: "1.25rem" }}>Récapitulatif</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {items.map((item) => {
              const catalogProduct = CATALOG.find((p) => p.id === item.id);
              const emoji = catalogProduct ? (CATEGORY_EMOJI[catalogProduct.categorySlug] ?? "📦") : "📦";
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 40, height: 40, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0, border: "1px solid rgba(0,0,0,0.08)" }}>
                    {emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: BLACK, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#888" }}>Qté : {item.quantity}</p>
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: BLACK, flexShrink: 0 }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              );
            })}

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.12)", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#555" }}>Sous-total</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(total)}</span>
              </div>
              {savings > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "#2a7a2a" }}>Économies promo</span>
                  <span style={{ fontWeight: 700, color: "#2a7a2a" }}>-{formatPrice(savings)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#555" }}>Livraison</span>
                <span style={{ fontWeight: 600, color: shipping === 0 ? "#2a7a2a" : BLACK }}>
                  {shipping === 0 ? "Gratuite ✓" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ ...label, fontSize: "0.6rem", color: "#888", background: "rgba(232,69,37,0.06)", padding: "0.4rem 0.6rem" }}>
                  + {formatPrice(50 - total)} pour la livraison offerte
                </p>
              )}
            </div>

            <div style={{ borderTop: `2px solid ${BLACK}`, paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ ...condensed, fontSize: "1.1rem" }}>Total TTC</span>
              <div style={{ textAlign: "right" }}>
                <span style={{ ...condensed, fontSize: "1.4rem", color: ORANGE }}>{formatPrice(totalTTC)}</span>
                {savings > 0 && (
                  <p style={{ fontSize: "0.68rem", color: "#888", textDecoration: "line-through" }}>
                    {formatPrice(totalTTC + savings)}
                  </p>
                )}
              </div>
            </div>
            <p style={{ ...label, fontSize: "0.6rem", color: "#aaa" }}>TVA 20 % incluse</p>
          </div>

          {/* Livraison estimée */}
          <div style={{ marginTop: "1.25rem", padding: "0.75rem 1rem", background: "white", border: "1px solid rgba(0,0,0,0.08)", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.1rem" }}>📦</span>
            <div>
              <p style={{ ...label, fontSize: "0.6rem", color: "#888", marginBottom: "0.15rem" }}>Livraison estimée</p>
              <p style={{ fontSize: "0.82rem", fontWeight: 600, color: BLACK }}>{getDeliveryRange()}</p>
            </div>
          </div>

          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {[
              { icon: "🔒", text: "Paiement chiffré SSL" },
              { icon: "↩️", text: "Retour gratuit 30 jours" },
              { icon: "✅", text: "Garantie 2 ans incluse" },
            ].map(({ icon, text }) => (
              <p key={text} style={{ fontSize: "0.78rem", color: "#555", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span>{icon}</span> {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label: lbl,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-condensed), sans-serif",
    fontWeight: 400,
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    display: "block",
    marginBottom: "0.4rem",
    color: "#555",
  };
  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "0.85rem 1rem",
    border: "1px solid rgba(0,0,0,0.2)",
    background: "white",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    color: "#0D0D0D",
  };
  return (
    <div>
      <label style={labelStyle}>{lbl}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}
