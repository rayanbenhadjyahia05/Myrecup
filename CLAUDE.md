# Projet — MyRecup E-commerce Récupération Sportive 🇫🇷

## Contexte du projet

Site e-commerce de niche centré sur les **équipements de récupération sportive** (pistolets de massage, rouleaux de massage, bandes élastiques, tapis d'acupression, etc.).

Objectif à terme : vendre des produits importés directement depuis des fournisseurs en Chine (Guangzhou / Shenzhen) avec une forte marge. Phase actuelle : dropshipping direct avec paiement Stripe intégré.

Public cible : sportifs amateurs et semi-professionnels francophones, 20-45 ans, cherchant à récupérer plus vite entre les séances.

---

## Stack technique (actuelle)

- **Framework :** Next.js 16.2.4 (App Router)
- **Langage :** TypeScript
- **CSS :** CSS-in-JS (inline styles) + Tailwind CSS pour les utilitaires
- **Paiement :** Stripe (carte + 3D Secure via PaymentElement)
- **Emails :** Resend (via fetch REST — pas de package npm) — contact + newsletter
- **Fonts :** Barlow + Barlow Condensed (Google Fonts)
- **Hébergement :** Vercel (en production) — URL : myrecup.vercel.app
- **Repo GitHub :** https://github.com/rayanbenhadjyahia05/Myrecup
- **Langue du site :** Français uniquement

### Dépendances installées
- `stripe`, `@stripe/stripe-js`, `@stripe/react-stripe-js` — paiement
- `gray-matter` — parsing frontmatter des articles Markdown
- `marked` — rendu Markdown → HTML

---

## Structure du projet (réelle)

```
/
├── CLAUDE.md
├── content/articles/        ← 19 articles SEO en Markdown
├── public/images/           ← images produits et catégories
├── src/
│   ├── app/                 ← pages Next.js App Router
│   │   ├── page.tsx         ← accueil
│   │   ├── layout.tsx       ← layout global (fonts, CartProvider, CookieBanner)
│   │   ├── blog/            ← liste articles + [slug]
│   │   ├── guides/[slug]/   ← alias articles (même contenu que blog)
│   │   ├── categories/[slug]← pages catégories dynamiques
│   │   ├── produits/[slug]  ← fiches produits
│   │   ├── pistolets-de-massage/ ← page "Nos produits" (tous les produits)
│   │   ├── comparatif/      ← comparatif produits MyRecup avec filtres
│   │   ├── panier/          ← panier
│   │   ├── checkout/        ← tunnel paiement 3 étapes (Stripe)
│   │   ├── confirmation/    ← confirmation commande post-paiement
│   │   ├── quiz/            ← quiz recommandation produit
│   │   ├── avis/            ← avis clients (12 avis réalistes)
│   │   ├── lp/pulse-pro/    ← landing TikTok Gun Pro
│   │   ├── faq/             ← FAQ
│   │   ├── a-propos/        ← À propos
│   │   ├── contact/         ← Contact (formulaire connecté à Resend)
│   │   ├── livraison/       ← Livraison & Retours
│   │   ├── mentions-legales/← Mentions légales
│   │   ├── cgv/             ← CGV
│   │   ├── confidentialite/ ← Politique de confidentialité
│   │   ├── sitemap.ts       ← sitemap.xml auto-généré
│   │   ├── robots.ts        ← robots.txt
│   │   └── api/
│   │       ├── contact/     ← API formulaire contact (Resend)
│   │       ├── newsletter/  ← API newsletter + envoi code promo RECUP10
│   │       ├── create-payment-intent/ ← API Stripe
│   │       └── webhook/     ← Webhook Stripe (payment_intent.succeeded)
│   ├── components/
│   │   ├── AddToCartButton.tsx
│   │   ├── CartIcon.tsx       ← présent sur TOUTES les pages
│   │   ├── CookieBanner.tsx   ← RGPD
│   │   ├── FaqAccordion.tsx
│   │   └── NewsletterBanner.tsx ← bloc newsletter (homepage, blog, comparatif)
│   ├── context/
│   │   └── CartContext.tsx  ← panier (localStorage)
│   └── lib/
│       ├── catalog.ts       ← 12 produits MyRecup + 5 catégories (SOURCE DE VÉRITÉ)
│       ├── products.ts      ← 7 produits concurrents (SEO uniquement, ne pas modifier)
│       ├── articles.ts      ← parsing articles Markdown (utilisé par guides/)
│       └── blog.ts          ← parsing articles Markdown (utilisé par blog/)
├── .env.local               ← clés API (ne jamais committer)
```

---

## Conventions de code

- **Langue du code :** variables, fonctions et commentaires en **anglais**
- **Langue du contenu :** tout le texte visible par l'utilisateur en **français**
- Composants en PascalCase : `ProductCard.tsx`
- Fichiers utilitaires en camelCase : `formatPrice.ts`
- Indentation : 2 espaces
- Toujours utiliser des `const` sauf si réassignation nécessaire
- Pas de `console.log` — interdit en production
- Commits en français, clairs et courts : `"Ajout page comparatif"`
- **useSearchParams() doit toujours être wrappé dans `<Suspense>`** (requis pour le build Vercel)

---

## Déploiement

- **Hébergement :** Vercel — myrecup.vercel.app
- **Repo :** https://github.com/rayanbenhadjyahia05/Myrecup (branche `main`)
- **Workflow :** modifier en local → `git add -A && git commit -m "..." && git push` → Vercel redéploie automatiquement en 1-2 min
- **Auth GitHub :** token PAT configuré dans osxkeychain macOS

### Commande push
```bash
git add -A
git commit -m "Description du changement"
git push
```

---

## Design tokens (partagés sur tout le site)

```ts
const ORANGE = "#E84525";   // couleur principale, CTAs
const BLACK  = "#0D0D0D";   // texte, fonds sombres
const CREAM  = "#F2EDE4";   // fonds clairs, encadrés
const BLUE   = "#5BC8F5";   // nav, badges de série
```

Styles réutilisables :
- `condensed` — Barlow Condensed 900, uppercase, letter-spacing -0.02em, lineHeight 0.92
- `label` — Barlow Condensed 400, uppercase, letter-spacing 0.08em, 0.75rem

---

## SEO — priorités

Chaque page doit avoir :
- `<title>` unique, **moins de 60 caractères**
- Meta description entre **140 et 160 caractères**
- Un seul `<h1>` contenant le mot-clé principal
- URLs courtes et lisibles
- Images avec `alt` descriptif
- Schema.org JSON-LD sur les fiches produit (déjà en place)
- Sitemap et robots.txt (déjà en place)

Mots-clés prioritaires :
- pistolet de massage
- meilleur rouleau de massage
- récupération musculaire
- bande élastique musculation
- tapis d'acupression avis

---

## Roadmap — état au 1er mai 2025

### Phase 1 — Le minimum pour vendre ✅
- [x] Page d'accueil (`/`)
- [x] Pages produits (`/produits/[slug]`)
- [x] Page panier (`/panier`)
- [x] Checkout 3 étapes Stripe (`/checkout`)
- [x] Page confirmation commande (`/confirmation`)
- [x] Mentions légales, CGV, Confidentialité

### Phase 2 — Générer du trafic gratuit ✅
- [x] Comparatif produits MyRecup avec filtres (`/comparatif`)
- [x] Pages catégories dynamiques (`/categories/[slug]`)
- [x] Page "Nos produits" (`/pistolets-de-massage`)
- [x] FAQ (`/faq`)
- [x] Blog avec 19 articles (`/blog`, `/blog/[slug]`)
- [x] Sitemap.xml + robots.txt

### Phase 3 — Optimiser la conversion ✅
- [x] Page avis clients avec 12 avis réalistes (`/avis`)
- [x] Landing TikTok Gun Pro (`/lp/pulse-pro`)
- [x] Page À propos (`/a-propos`)
- [x] Page Contact — formulaire connecté à Resend (`/contact`)
- [x] Page Livraison & Retours (`/livraison`)
- [x] Cross-sell sur les fiches produit
- [x] Cookie banner RGPD
- [x] CartIcon sur toutes les pages

### Phase 4 — Fidéliser et scaler
- [x] Quiz produit (`/quiz`)
- [x] Newsletter avec code promo RECUP10 (homepage, blog, comparatif)
- [x] Checkout amélioré (économies, date livraison estimée, récap produits)
- [ ] Page bundle / pack (`/bundle`) — à faire
- [ ] Page promotions (`/promotions`) — à faire
- [ ] Page parrainage
- [ ] Compte client + suivi commande

### Reste à faire
- [ ] Vraie clé RESEND_API_KEY à configurer (resend.com — gratuit)
- [ ] Images produit (actuellement emoji placeholders)
- [ ] Webhook Stripe STRIPE_WEBHOOK_SECRET à configurer sur dashboard.stripe.com
- [ ] Email de confirmation commande automatique (post-paiement)
- [ ] Back-office admin (projet séparé, prévu plus tard)

---

## Catalogue produits actuel (12 produits MyRecup)

Prix construits pour absorber le code promo RECUP10 (-10%) sans perdre de marge.
Avec le code, le client paie ~l'équivalent des anciens prix.

| Produit | Slug | Catégorie | Prix affiché | Ancien prix |
|---------|------|-----------|--------------|-------------|
| MyRecup Gun Pro | massage-gun-pro | pistolets-de-massage | 109 € | 149 € |
| MyRecup Gun Mini | massage-gun-mini | pistolets-de-massage | 65 € | 89 € |
| MyRecup Vibro Ball | vibro-ball | pistolets-de-massage | 49 € | 59 € |
| MyRecup Peanut Roller | peanut-roller | rouleaux-et-balles | 22 € | 27 € |
| MyRecup Foam Roller | foam-roller | rouleaux-et-balles | 33 € | 44 € |
| MyRecup Vibro Roller | vibro-roller | rouleaux-et-balles | 77 € | 99 € |
| MyRecup Hot Cold Pack | hot-cold-pack | thermotherapie | 17 € | 22 € |
| MyRecup Wrap Froid/Chaud | wrap-hot-cold | thermotherapie | 22 € | 29 € |
| MyRecup Ice Bath Tub | ice-bath-tub | thermotherapie | 143 € | 199 € |
| MyRecup Compression Boots | compression-boots | compression | 133 € | 279 € |
| MyRecup Acupressure Mat | acupressure-mat | mobilite | 44 € | 59 € |
| MyRecup Resistance Bands | resistance-bands | mobilite | 27 € | 33 € |

**Source de vérité des prix :** `src/lib/catalog.ts`
Quand on modifie un prix, il faut aussi le mettre à jour dans : quiz/page.tsx, lp/pulse-pro/page.tsx, page.tsx (homepage ProduitVedette), faq/page.tsx.

---

## Code promo newsletter

- Code : **RECUP10** — 10% de réduction
- API route : `/api/newsletter` — envoie un email stylisé au visiteur + notification interne
- Géré via Resend (fetch REST, pas de package npm)
- Bloc `NewsletterBanner` présent sur : homepage, blog, comparatif
- **Nécessite une vraie clé RESEND_API_KEY** dans .env.local et sur Vercel

---

## Règles métier importantes

- **TVA française :** 20% sur les produits, afficher TTC
- **Mentions légales obligatoires :** nom du responsable, SIRET, adresse, hébergeur
- **Cookies / RGPD :** bannière de consentement CNIL en place
- Les prix s'affichent en **euros (€)**, virgule comme séparateur décimal
- Pas de liens d'affiliation Amazon — modèle dropshipping direct
- **Livraison gratuite dès 50 €** (panier + checkout synchronisés)

---

## Ce que Claude NE doit PAS faire

- Ne jamais committer des clés API ou des secrets dans le code
- Ne jamais modifier `.env.local` directement — demander les valeurs d'abord
- Ne pas installer de dépendances npm sans le signaler d'abord
- Ne pas supprimer de fichiers existants sans confirmation
- Ne pas changer la structure des dossiers sans en discuter
- Pas de `console.log` — utiliser un logger ou supprimer
- Ne jamais wrapper useSearchParams sans Suspense (casse le build Vercel)

---

## Variables d'environnement requises (.env.local et Vercel)

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...     ← à récupérer sur dashboard.stripe.com/webhooks
RESEND_API_KEY=re_...               ← à récupérer sur resend.com (gratuit 3 000 emails/mois)
```

---

## Commandes utiles

```bash
npm run dev      # développement (Turbopack)
npm run build    # build production (tester avant de pusher)
npm run lint     # vérification ESLint
npx tsc --noEmit # vérification TypeScript

# Déployer
git add -A && git commit -m "message" && git push
```

---

## Fournisseurs (usage futur)

- **Guangzhou** — Canton Fair, marché de gros général
- **Shenzhen** — électronique et gadgets connectés
- Plateformes : Alibaba, 1688.com

Les fiches produits devront gérer : nom fournisseur, MOQ, prix d'achat HT, prix de vente TTC, marge brute.

---

## Contact & contexte perso

- Porteur du projet : entrepreneur solo, basé en France (Occitanie)
- Niveau dev : débutant en progression — expliquer les choix techniques
- Priorité : apprendre en faisant, préférer les solutions simples aux solutions over-engineered
