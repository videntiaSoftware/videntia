import type { Metadata } from "next";
import { Geist, Cinzel_Decorative, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/ui/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Videntia - Tu Guía Espiritual de Tarot",
  description: "Descubre tu destino con lecturas de tarot personalizadas, análisis espirituales profundos y conexión con tu intuición interior.",
  keywords: ["tarot", "espiritualidad", "lecturas", "adivinación", "cartas", "místico", "destino"],
  authors: [{ name: "Videntia" }],
  openGraph: {
    title: "Videntia - Tu Guía Espiritual de Tarot",
    description: "Descubre tu destino con lecturas de tarot personalizadas",
    url: defaultUrl,
    siteName: "Videntia",
    locale: "es_AR",
    type: "website",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700", "300", "500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`min-h-screen flex flex-col max-w-screen bg-slate-950 text-amber-100 ${geistSans.variable} ${cinzelDecorative.variable} ${cormorantGaramond.variable}`}
      >
        {/* Cargar reCAPTCHA v3 */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="lazyOnload"
        />
        
        <div className="flex-1 flex flex-col w-full max-w-screen overflow-x-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
