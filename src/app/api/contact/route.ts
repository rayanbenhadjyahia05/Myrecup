import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  try {
    const body = await req.json();
    const { nom, email, raison, message } = body;

    if (!nom || !email || !raison || !message) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    if (!apiKey || apiKey === "re_REMPLACE_PAR_TA_CLE_RESEND") {
      // Mode développement : on simule l'envoi
      return NextResponse.json({ success: true, dev: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MyRecup <contact@myrecup.fr>",
        to: ["contact@myrecup.fr"],
        reply_to: email,
        subject: `[Contact MyRecup] ${raison} — ${nom}`,
        html: `
          <h2>Nouveau message via le formulaire de contact</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;width:140px">Nom</td><td style="padding:8px;border-bottom:1px solid #eee">${nom}</td></tr>
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Raison</td><td style="padding:8px;border-bottom:1px solid #eee">${raison}</td></tr>
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px">${message.replace(/\n/g, "<br>")}</td></tr>
          </table>
          <p style="color:#888;font-size:12px;margin-top:20px">Envoyé depuis myrecup.fr</p>
        `,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: data.message ?? "Erreur lors de l'envoi. Réessayez dans quelques instants." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez dans quelques instants." },
      { status: 500 }
    );
  }
}
