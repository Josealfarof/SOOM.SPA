import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOOM 숨 — Skincare del Este de Asia",
  description:
    "SOOM (숨) llega para recordarte que tu rutina de skincare no es solo un paso más, es el momento donde vuelves a conectar contigo misma. La pureza y eficacia de Asia, muy pronto en tus manos.",
  keywords: ["skincare", "k-beauty", "korean skincare", "asian beauty", "cuidado de piel", "soom"],
  openGraph: {
    title: "SOOM 숨 — Skincare del Este de Asia",
    description: "La pureza y eficacia de Asia, muy pronto en tus manos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${raleway.variable}`}
    >
      <body className="grain-overlay min-h-screen">{children}</body>
    </html>
  );
}
