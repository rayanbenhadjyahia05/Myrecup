import { NextRequest, NextResponse } from "next/server";

const PROMO_CODE = "RECUP10";
const DISCOUNT = "10%";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    if (!apiKey || apiKey === "re_REMPLACE_PAR_TA_CLE_RESEND") {
      return NextResponse.json({ success: true, dev: true });
    }

    // Email au visiteur avec le code promo
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MyRecup <contact@myrecup.fr>",
        to: [email],
        subject: `Ton code promo ${DISCOUNT} est là 💪`,
        html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F2EDE4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2EDE4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0D0D0D;padding:32px 40px;">
            <p style="margin:0;font-family:Arial,sans-serif;font-weight:900;font-size:24px;color:white;text-transform:uppercase;letter-spacing:-0.5px;">
              MyRecup
            </p>
          </td>
        </tr>

        <!-- Hero -->
        <tr>
          <td style="background:#E84525;padding:48px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:2px;font-weight:400;">
              Ton code exclusif
            </p>
            <h1 style="margin:0 0 16px;font-size:56px;font-weight:900;color:white;letter-spacing:-2px;line-height:1;">
              ${PROMO_CODE}
            </h1>
            <p style="margin:0;font-size:20px;color:rgba(255,255,255,0.9);font-weight:700;">
              ${DISCOUNT} sur toute la boutique
            </p>
          </td>
        </tr>

        <!-- Corps -->
        <tr>
          <td style="background:white;padding:40px;">
            <p style="margin:0 0 16px;font-size:16px;color:#333;line-height:1.7;">
              Bienvenue dans la communauté MyRecup. 🤝
            </p>
            <p style="margin:0 0 16px;font-size:16px;color:#333;line-height:1.7;">
              Tu t'es inscrit(e), on tient notre promesse : voici ton code
              <strong style="color:#0D0D0D;">${PROMO_CODE}</strong> pour ${DISCOUNT} de réduction sur l'ensemble de nos équipements de récupération sportive.
            </p>
            <p style="margin:0 0 32px;font-size:16px;color:#333;line-height:1.7;">
              Pistolets de massage, rouleaux, compression, froid/chaud — tout y passe.
              Récupère mieux, reviens plus fort.
            </p>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="https://myrecup.fr/pistolets-de-massage"
                     style="display:inline-block;background:#E84525;color:white;padding:16px 40px;font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:1px;text-decoration:none;">
                    DÉCOUVRIR LES PRODUITS →
                  </a>
                </td>
              </tr>
            </table>

            <!-- Rappel code -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
              <tr>
                <td style="border:2px dashed #E84525;padding:20px;text-align:center;background:#FFF9F8;">
                  <p style="margin:0 0 6px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:2px;">
                    Ton code promo
                  </p>
                  <p style="margin:0;font-size:28px;font-weight:900;color:#E84525;letter-spacing:3px;">
                    ${PROMO_CODE}
                  </p>
                  <p style="margin:6px 0 0;font-size:12px;color:#888;">
                    À saisir au moment du paiement
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0D0D0D;padding:24px 40px;">
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);line-height:1.6;text-align:center;">
              MyRecup — Occitanie, France<br>
              Tu reçois cet email car tu t'es inscrit(e) sur myrecup.fr.<br>
              <a href="https://myrecup.fr/confidentialite" style="color:rgba(255,255,255,0.35);">Politique de confidentialité</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
        `,
      }),
    });

    // Notification interne
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MyRecup <contact@myrecup.fr>",
        to: ["contact@myrecup.fr"],
        subject: `[Newsletter] Nouvel inscrit : ${email}`,
        html: `<p>Nouvel abonné newsletter : <strong>${email}</strong></p><p>Code promo envoyé : <strong>${PROMO_CODE}</strong></p>`,
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Réessayez." },
      { status: 500 }
    );
  }
}
