import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { error: "Stripe non configuré. Ajoute STRIPE_SECRET_KEY dans .env.local" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeKey);

  try {
    const body = await req.json();
    const { amount, items, customer } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customer_name: `${customer?.prenom ?? ""} ${customer?.nom ?? ""}`.trim(),
        customer_email: customer?.email ?? "",
        items: JSON.stringify(
          (items ?? []).map((i: { id: string; name: string; quantity: number }) => ({
            id: i.id,
            name: i.name,
            qty: i.quantity,
          }))
        ),
      },
      receipt_email: customer?.email ?? undefined,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
