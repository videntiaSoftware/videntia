import type { Metadata } from "next";
import { Geist, Cinzel_Decorative, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/ui/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.className} ${cinzelDecorative.variable} ${cormorantGaramond.variable} antialiased`}>
        {/* Google reCAPTCHA v3 */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
