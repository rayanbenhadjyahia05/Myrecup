import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch {
      return NextResponse.json({ error: "Signature webhook invalide" }, { status: 400 });
    }
  } else {
    event = JSON.parse(body) as Stripe.Event;
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      // TODO: envoyer email de confirmation
      // TODO: enregistrer commande en base de données
      break;
    }

    case "payment_intent.payment_failed": {
      // TODO: notifier le client de l'échec
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
