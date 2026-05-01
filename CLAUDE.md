# Projet — E-commerce Récupération Sportive 🇫🇷

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
- **Fonts :** Barlow + Barlow Condensed (Google Fonts)
- **Hébergement :** Vercel (prévu)
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
│   │   ├── categories/[slug]← pages catégories dynamiques
│   │   ├── produits/[slug]  ← fiches produits (anciens + catalogue)
│   │   ├── comparatif/      ← comparatif pistolets concurrents
│   │   ├── panier/          ← panier
│   │   ├── checkout/        ← tunnel paiement 3 étapes (Stripe)
│   │   ├── confirmation/    ← confirmation commande post-paiement
│   │   ├── quiz/            ← quiz recommandation produit
│   │   ├── avis/            ← avis clients (12 avis réalistes)
│   │   ├── lp/pulse-pro/    ← landing TikTok Pulse Pro
│   │   ├── blog/            ← blog avec 19 articles
│   │   ├── faq/             ← FAQ
│   │   ├── a-propos/        ← À propos
│   │   ├── contact/         ← Contact (formulaire non connecté)
│   │   ├── livraison/       ← Livraison & Retours
│   │   ├── mentions-legales/← Mentions légales
│   │   ├── cgv/             ← CGV
│   │   ├── confidentialite/ ← Politique de confidentialité
│   │   ├── sitemap.ts       ← sitemap.xml auto-généré
│   │   ├── robots.ts        ← robots.txt
│   │   └── api/
│   │       ├── create-payment-intent/ ← API Stripe
│   │       └── webhook/     ← Webhook Stripe (payment_intent.succeeded)
│   ├── components/
│   │   ├── AddToCartButton.tsx
│   │   ├── CartIcon.tsx
│   │   ├── CookieBanner.tsx ← RGPD
│   │   └── FaqAccordion.tsx
│   ├── context/
│   │   └── CartContext.tsx  ← panier (localStorage)
│   └── lib/
│       ├── catalog.ts       ← 14 produits RecupPro + 6 catégories
│       ├── products.ts      ← 7 anciens produits (comparatif concurrents)
│       └── blog.ts          ← parsing articles Markdown
├── .env.local               ← clés Stripe (ne jamais committer)
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
- Commits en français, clairs et courts : `"Ajout page comparatif pistolets de massage"`

---

## Design tokens (partagés sur tout le site)

```ts
const ORANGE = "#E84525";   // couleur principale, CTAs
const BLACK  = "#0D0D0D";   // texte, fonds sombres
const CREAM  = "#F2EDE4";   // fonds clairs, encadrés
const BLUE   = "#5BC8F5";   // nav, badges de série
```

Styles réutilisables :
- `condensed` — Barlow Condensed 900, uppercase, letter-spacing -0.02em
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

## Roadmap — état au 30 avril

### Phase 1 — Le minimum pour vendre ✅
- [x] Page d'accueil (`/`)
- [x] Pages produits (`/produits/[slug]`) — 14 produits catalogue + 7 anciens
- [x] Page panier (`/panier`)
- [x] Checkout 3 étapes Stripe (`/checkout`)
- [x] Page confirmation commande (`/confirmation`)
- [x] Mentions légales, CGV, Confidentialité

### Phase 2 — Générer du trafic gratuit ✅
- [x] Comparatif pistolets avec filtres (`/comparatif`)
- [x] Pages catégories dynamiques (`/categories/[slug]`)
- [x] Page pistolets de massage (`/pistolets-de-massage`)
- [x] FAQ (`/faq`)
- [x] Blog avec 19 articles (`/blog`, `/blog/[slug]`)
- [x] Sitemap.xml + robots.txt

### Phase 3 — Optimiser la conversion ✅
- [x] Page avis clients avec 12 avis réalistes (`/avis`)
- [x] Landing TikTok Pulse Pro (`/lp/pulse-pro`)
- [x] Page À propos (`/a-propos`)
- [x] Page Contact (`/contact`) — formulaire non connecté à un backend
- [x] Page Livraison & Retours (`/livraison`)
- [x] Cross-sell sur les fiches produit
- [x] Cookie banner RGPD

### Phase 4 — Fidéliser et scaler
- [x] Quiz produit (`/quiz`)
- [ ] Page bundle / pack (`/bundle`) — dossier créé, contenu à faire
- [ ] Page promotions (`/promotions`) — dossier créé, contenu à faire
- [ ] Page parrainage
- [ ] Compte client + suivi commande

### Reste à faire (audit)
- [ ] Email de confirmation commande (Resend)
- [ ] Formulaire contact fonctionnel (API route)
- [ ] Images produit pour les 12 produits sans photo
- [ ] Webhook Stripe STRIPE_WEBHOOK_SECRET à configurer sur dashboard.stripe.com
- [ ] Back-office admin (projet séparé, prévu plus tard)

---

## Catalogue produits (14 produits RecupPro)

| Produit | Catégorie | Prix | Ancien prix |
|---------|-----------|------|-------------|
| Pulse Pro | Pistolets | 99 € | 149 € |
| Pulse Mini | Pistolets | 59,90 € | 79 € |
| Pulse Orb | Rouleaux & Balles | 44,90 € | 49 € |
| Pulse Dual | Rouleaux & Balles | 19,90 € | 24 € |
| Relief Roller | Rouleaux & Balles | 29,90 € | 39 € |
| Pulse Roll | Rouleaux & Balles | 69,90 € | 89 € |
| Frost Pack | Froid & Chaud | 14,90 € | 19 € |
| Frost Tank | Froid & Chaud | 129 € | 179 € |
| Flow Boots | Compression | 249 € | 399 € |
| Relief Mat | Mobilité | 39,90 € | 49 € |
| Flex Band | Mobilité | 24,90 € | 29 € |
| Restore Balm | Soins | 19,90 € | 22 € |
| Restore Mag | Soins | 16,90 € | 18 € |
| Restore Soak | Soins | 12,90 € | 14 € |

---

## Règles métier importantes

- **TVA française :** 20% sur les produits, afficher TTC
- **Mentions légales obligatoires :** nom du responsable, SIRET, adresse, hébergeur
- **Cookies / RGPD :** bannière de consentement CNIL en place
- Les prix s'affichent en **euros (€)**, virgule comme séparateur décimal
- Pas de liens d'affiliation Amazon — modèle dropshipping direct

---

## Ce que Claude NE doit PAS faire

- Ne jamais committer des clés API ou des secrets dans le code
- Ne jamais modifier `.env.local` directement — demander les valeurs d'abord
- Ne pas installer de dépendances npm sans le signaler d'abord
- Ne pas supprimer de fichiers existants sans confirmation
- Ne pas changer la structure des dossiers sans en discuter
- Pas de `console.log` — utiliser un logger ou supprimer

---

## Variables d'environnement requises (.env.local)

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   ← à récupérer sur dashboard.stripe.com/webhooks
```

---

## Commandes utiles

```bash
npm run dev      # développement (Turbopack)
npm run build    # build production
npm run lint     # vérification ESLint
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
