import Link from "next/link";
import CartIcon from "@/components/CartIcon";

export const metadata = {
  title: "Avis clients — MyRecup",
  description:
    "Avis vérifiés de nos clients MyRecup. 4,7/5 sur plus de 200 avis. Pistolets de massage, rouleaux, tapis d'acupression.",
};

const ORANGE = "#E84525";
const BLACK = "#0D0D0D";
const CREAM = "#F2EDE4";

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

const avis = [
  {
    initiales: "TM",
    nom: "Thomas M.",
    localisation: "Lyon, France",
    note: 5,
    produit: "MyRecup Gun Pro",
    date: "il y a 3 jours",
    texte: "Franchement bluffé. J'avais un modèle à 300€ avant et le MyRecup Gun Pro fait exactement la même chose. Le niveau sonore est vraiment bas, ma femme ne se plaint plus quand je l'utilise le soir. La batterie tient largement la semaine. Je recommande sans hésiter.",
    utile: 14,
    couleur: "#E84525",
  },
  {
    initiales: "SA",
    nom: "Sophie A.",
    localisation: "Paris 15e, France",
    note: 5,
    produit: "MyRecup Acupressure Mat",
    date: "il y a 1 semaine",
    texte: "J'avais très mal au dos depuis des années à cause du bureau. Une amie m'a conseillé ce tapis. Après 3 semaines d'utilisation tous les soirs, je dors mieux et les douleurs lombaires ont clairement diminué. C'est pas magique les 2 premiers jours mais après ça devient indispensable.",
    utile: 22,
    couleur: "#059669",
  },
  {
    initiales: "JB",
    nom: "Julien B.",
    localisation: "Bordeaux, France",
    note: 5,
    produit: "MyRecup Compression Boots",
    date: "il y a 2 semaines",
    texte: "Je fais du vélo en compétition amateur et ces bottes ont changé ma récupération. Après une sortie de 4h, 20 minutes avec les MyRecup Compression Boots et mes jambes sont OK pour le lendemain. Le rapport qualité/prix est imbattable comparé aux marques américaines.",
    utile: 31,
    couleur: "#7C3AED",
  },
  {
    initiales: "LR",
    nom: "Laura R.",
    localisation: "Toulouse, France",
    note: 4,
    produit: "MyRecup Resistance Bands",
    date: "il y a 3 semaines",
    texte: "Les bandes sont de bonne qualité, le tissu ne glisse pas contrairement à celles en latex que j'avais. Le set de 5 couvre bien tous les niveaux. J'enlève une étoile parce que le sachet de rangement s'est un peu effiloché. Le produit en lui-même est top.",
    utile: 8,
    couleur: "#059669",
  },
  {
    initiales: "MA",
    nom: "Marc A.",
    localisation: "Strasbourg, France",
    note: 5,
    produit: "MyRecup Gun Mini",
    date: "il y a 1 mois",
    texte: "J'étais sceptique sur la taille mais les performances sont vraiment là. J'emmène le MyRecup Gun Mini dans ma valise en déplacement pro, ça prend rien et c'est efficace. Pour les mollets et les trapèzes c'est parfait. La batterie tient 3 jours d'utilisation quotidienne.",
    utile: 19,
    couleur: "#E84525",
  },
  {
    initiales: "CL",
    nom: "Chloé L.",
    localisation: "Nantes, France",
    note: 5,
    produit: "MyRecup Foam Roller",
    date: "il y a 1 mois",
    texte: "Je faisais du foam roller avec une mousse classique et la différence avec celui-ci est énorme. La surface texturée va vraiment en profondeur sur les quadris et les ischios. Après une longue séance de yoga, 10 minutes dessus et les tensions sont parties. Très bonne qualité pour le prix.",
    utile: 11,
    couleur: "#1A9ED4",
  },
  {
    initiales: "PD",
    nom: "Pierre D.",
    localisation: "Lille, France",
    note: 5,
    produit: "MyRecup Ice Bath Tub",
    date: "il y a 5 semaines",
    texte: "Je fais du trail et le bain de glace après les longues sorties est devenu mon rituel. Le MyRecup Ice Bath Tub se monte en 3 minutes, c'est vrai. Il faut prévoir assez de glace (je prends des sacs au supermarché). L'effet sur les jambes après un 30km est impressionnant. Vraiment fini de récupérer 3j après maintenant c'est 1j.",
    utile: 27,
    couleur: "#5BC8F5",
  },
  {
    initiales: "EB",
    nom: "Emma B.",
    localisation: "Montpellier, France",
    note: 4,
    produit: "MyRecup Acupressure Mat",
    date: "il y a 5 semaines",
    texte: "Tapis reçu rapidement, bien emballé. Les premières utilisations font un peu mal car les picots sont intenses — c'est normal d'après les instructions. Au bout d'une semaine le corps s'habitue et c'est vraiment relaxant. Je l'utilise 15-20 min avant de dormir. Mon sommeil s'est nettement amélioré.",
    utile: 15,
    couleur: "#059669",
  },
  {
    initiales: "RK",
    nom: "Romain K.",
    localisation: "Nice, France",
    note: 5,
    produit: "MyRecup Gun Pro",
    date: "il y a 6 semaines",
    texte: "Produit reçu en 2 jours. Vraiment bien packagé, les 6 têtes sont bien rangées. J'ai testé sur les ischio-jambiers après une séance de foot : efficacité immédiate. Le pistolet est bien en main, le grip est top. Le seul point : il n'y a pas d'appli, mais honnêtement on n'en a pas besoin.",
    utile: 9,
    couleur: "#E84525",
  },
  {
    initiales: "NF",
    nom: "Nathalie F.",
    localisation: "Grenoble, France",
    note: 3,
    produit: "MyRecup Hot Cold Pack",
    date: "il y a 2 mois",
    texte: "La poche gel est bien mais je m'attendais à quelque chose de plus grand. Pour un genou ou une cheville c'est parfait, pour un dos entier c'est un peu petit. La housse néoprène est de bonne qualité. Pour le prix ça reste correct mais j'aurai aimé le savoir avant.",
    utile: 6,
    couleur: "#5BC8F5",
  },
  {
    initiales: "AC",
    nom: "Antoine C.",
    localisation: "Marseille, France",
    note: 5,
    produit: "MyRecup Vibro Roller",
    date: "il y a 2 mois",
    texte: "Le rouleau vibrant c'est vraiment supérieur à un foam roller classique. Les vibrations pénètrent en profondeur, les quadris après une sortie vélo reprennent une forme incroyable. La batterie de 2h est suffisante pour plusieurs séances. Niveau sonore acceptable. Très bon produit.",
    utile: 13,
    couleur: "#1A9ED4",
  },
  {
    initiales: "VL",
    nom: "Valentine L.",
    localisation: "Rennes, France",
    note: 5,
    produit: "MyRecup Wrap Froid/Chaud",
    date: "il y a 2 mois",
    texte: "Je courais mon premier semi-marathon et je cherchais comment soulager le genou après la course. Le wrap chaud/froid est parfait : froid les 20 premières minutes, puis chaud pour détendre. Le velcro maintient bien en place, ça ne bouge pas même en se déplaçant. Un indispensable à petit prix.",
    utile: 18,
    couleur: "#5BC8F5",
  },
];

const stats = [
  { val: "4,7", label: "Note moyenne", sub: "sur 5 étoiles" },
  { val: "94%", label: "Recommandent", sub: "MyRecup à un ami" },
  { val: "212", label: "Avis vérifiés", sub: "depuis l'ouverture" },
  { val: "48h", label: "Délai moyen", sub: "réponse SAV" },
];

function Stars({ note, size = "1rem" }: { note: number; size?: string }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= note ? "#FBBC04" : "#ddd", fontSize: size }}>★</span>
      ))}
    </div>
  );
}

function Avatar({ initiales, couleur }: { initiales: string; couleur: string }) {
  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: couleur,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "0.9rem",
        flexShrink: 0,
        fontFamily: "var(--font-condensed), sans-serif",
      }}
    >
      {initiales}
    </div>
  );
}

export default function AvisPage() {
  const moyenne = (avis.reduce((s, a) => s + a.note, 0) / avis.length).toFixed(1);

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
          {[
            { lbl: "Produits", href: "/pistolets-de-massage" },
            { lbl: "Comparatif", href: "/comparatif" },
            { lbl: "Blog", href: "/blog" },
          ].map(({ lbl, href }) => (
            <Link key={lbl} href={href} style={{ ...label, color: BLACK, opacity: 0.75, textDecoration: "none" }}>
              ({lbl})
            </Link>
          ))}
          <CartIcon />
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: BLACK, padding: "5rem 2.5rem 4rem" }}>
        <p style={{ ...label, color: ORANGE, marginBottom: "1rem" }}>(Avis clients)</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", marginBottom: "1rem" }}>
          <h1 style={{ ...condensed, fontSize: "clamp(4rem,9vw,7rem)", color: "white", lineHeight: 1 }}>
            {moyenne}
          </h1>
          <div style={{ paddingBottom: "0.5rem" }}>
            <Stars note={4.7} size="1.4rem" />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "0.3rem" }}>
              {avis.length} avis vérifiés
            </p>
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 480 }}>
          Des sportifs comme vous — pas des influenceurs payés. Des vrais retours, bons et moins bons.
        </p>
      </section>

      {/* Barre de stats */}
      <section style={{ background: ORANGE }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {stats.map(({ val, label: lbl, sub }) => (
            <div key={lbl} style={{ padding: "1.75rem 1.5rem", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ ...condensed, fontSize: "2.2rem", color: "white", lineHeight: 1 }}>{val}</div>
              <p style={{ ...label, color: "rgba(255,255,255,0.9)", fontSize: "0.65rem", marginTop: "0.3rem" }}>{lbl}</p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem", marginTop: "0.1rem" }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grille avis */}
      <section style={{ background: "#f8f8f8", padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1rem",
            }}
          >
            {avis.map(({ initiales, nom, localisation, note, produit, date, texte, utile, couleur }) => (
              <div
                key={nom}
                style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: 2,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                {/* En-tête */}
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <Avatar initiales={initiales} couleur={couleur} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p style={{ fontWeight: 700, fontSize: "0.95rem", color: BLACK }}>{nom}</p>
                      <span style={{ ...label, fontSize: "0.6rem", color: "#aaa" }}>{date}</span>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.1rem" }}>📍 {localisation}</p>
                    <Stars note={note} size="0.85rem" />
                  </div>
                </div>

                {/* Badge produit */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: CREAM,
                    padding: "0.25rem 0.6rem",
                    alignSelf: "flex-start",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: couleur, display: "inline-block" }} />
                  <span style={{ ...label, fontSize: "0.6rem", color: "#666" }}>Acheté : {produit}</span>
                </div>

                {/* Texte */}
                <p style={{ color: "#333", lineHeight: 1.7, fontSize: "0.88rem", flex: 1 }}>{texte}</p>

                {/* Footer */}
                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    paddingTop: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#aaa" }}>
                    👍 {utile} personnes ont trouvé cet avis utile
                  </span>
                  <span
                    style={{
                      ...label,
                      fontSize: "0.55rem",
                      color: "#bbb",
                      border: "1px solid #eee",
                      padding: "0.2rem 0.5rem",
                    }}
                  >
                    Achat vérifié ✓
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laisser un avis */}
      <section style={{ background: CREAM, padding: "4rem 2.5rem" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3rem)", color: BLACK, marginBottom: "1rem" }}>
            Vous avez acheté chez MyRecup ?
          </h2>
          <p style={{ color: "#555", marginBottom: "2rem", lineHeight: 1.7 }}>
            Partagez votre expérience. Vos retours aident d'autres sportifs à choisir le bon équipement.
          </p>
          <Link
            href="/contact"
            style={{
              ...label,
              display: "inline-block",
              padding: "0.9rem 2.5rem",
              background: ORANGE,
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Laisser un avis →
          </Link>
        </div>
      </section>

      {/* CTA produits */}
      <section style={{ background: BLACK, padding: "4rem 2.5rem", textAlign: "center" }}>
        <h2 style={{ ...condensed, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: "1.5rem" }}>
          Prêt à commander ?
        </h2>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pistolets-de-massage" style={{ ...label, padding: "0.9rem 2rem", background: ORANGE, color: "white", textDecoration: "none", fontWeight: 700 }}>
            Voir les pistolets →
          </Link>
          <Link href="/comparatif" style={{ ...label, padding: "0.9rem 2rem", border: "2px solid rgba(255,255,255,0.3)", color: "white", textDecoration: "none", fontWeight: 700 }}>
            Voir le comparatif
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: BLACK, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem 2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
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
