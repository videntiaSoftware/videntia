import type { Metadata } from "next";
import { Geist, Cinzel_Decorative, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/ui/footer";
import CookieNotice from "@/components/CookieNotice";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { GSC_CONFIG } from "@/lib/analytics";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Videntia - Tu Guía Espiritual de Tarot",
    template: "%s | Videntia Tarot"
  },
  description: "Descubre tu destino con lecturas de tarot personalizadas, análisis espirituales profundos y conexión con tu intuición interior. Tarot gratis online, lecturas de amor, trabajo y crecimiento personal.",
  keywords: [
    "tarot gratis", "lecturas tarot online", "cartas tarot", "tarot amor", 
    "tarot trabajo", "tarot dinero", "arcanos mayores", "arcanos menores",
    "cruz celta", "tirada 3 cartas", "consulta tarot", "videncia online",
    "espiritualidad", "adivinación", "místico", "destino", "futuro"
  ],
  authors: [{ name: "Videntia" }],
  creator: "Videntia Tarot",
  publisher: "Videntia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Videntia - Tu Guía Espiritual de Tarot",
    description: "Descubre tu destino con lecturas de tarot personalizadas, análisis espirituales profundos y conexión con tu intuición interior.",
    url: defaultUrl,
    siteName: "Videntia Tarot",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: `${defaultUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Videntia - Lecturas de Tarot Online",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Videntia - Tu Guía Espiritual de Tarot",
    description: "Lecturas de tarot online personalizadas. Descubre tu destino con análisis espirituales profundos.",
    images: [`${defaultUrl}/twitter-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: defaultUrl,
  },
  category: "Entertainment",
  other: {
    'google-adsense-account': 'ca-pub-4987669803086382'
  }
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
      <head>
        {/* Google AdSense Account Verification */}
        <meta name="google-adsense-account" content="ca-pub-4987669803086382" />
        
        {/* Google Search Console Verification */}
        {GSC_CONFIG.verificationMeta && (
          <meta name="google-site-verification" content={GSC_CONFIG.verificationMeta} />
        )}
        {GSC_CONFIG.bingVerificationMeta && (
          <meta name="msvalidate.01" content={GSC_CONFIG.bingVerificationMeta} />
        )}
        {GSC_CONFIG.yandexVerificationMeta && (
          <meta name="yandex-verification" content={GSC_CONFIG.yandexVerificationMeta} />
        )}
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Structured Data - Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* SEO Critical Tags */}
        <meta name="rating" content="general" />
        <meta name="content-language" content="es-AR" />
        <meta name="geo.region" content="AR" />
        <meta name="geo.country" content="Argentina" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"} />
      </head>
      <body
        className={`min-h-screen flex flex-col max-w-screen bg-slate-950 text-amber-100 ${geistSans.variable} ${cinzelDecorative.variable} ${cormorantGaramond.variable}`}
      >
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}', {
              anonymize_ip: true,
              cookie_expires: 63072000,
              send_page_view: false
            });
          `}
        </Script>

        {/* Analytics Initialization */}
        <Script id="analytics-init" strategy="afterInteractive">
          {`
            import('/lib/analytics').then(module => {
              module.default.initializeGA4();
              module.default.setupAutomaticTracking();
            });
          `}
        </Script>

        {/* Web Vitals Tracking */}
        <Script
          src="https://unpkg.com/web-vitals@3/dist/web-vitals.umd.js"
          strategy="afterInteractive"
        />
        
        <AnalyticsProvider>
          <div className="flex-1 flex flex-col w-full max-w-screen overflow-x-auto">
            {children}
          </div>
        </AnalyticsProvider>
        <Footer />
        <CookieNotice />
      </body>
    </html>
  );
}