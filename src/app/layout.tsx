import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-condensed",
});

export const metadata: Metadata = {
  title: "MyRecup — Équipements de Récupération Sportive",
  description:
    "Pistolets de massage, rouleaux, bandes élastiques : les meilleurs équipements de récupération sportive testés et comparés.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased overflow-x-hidden" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
        <CartProvider>
          {children}
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
