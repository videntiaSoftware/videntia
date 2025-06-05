import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { AuthButton } from "@/components/auth-button";
import Footer from "@/components/ui/footer";
import Link from "next/link";
import Script from "next/script";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        {/* Google reCAPTCHA v3 */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              {/* Logo o nombre */}
              <Link href="/" className="font-bold text-lg tracking-tight text-amber-600">Videntia</Link>
              {/* Navegación principal */}
              <nav className="ml-4 text-sm text-slate-500 flex gap-4">
                <Link href="/profile/historia-personal" className="hover:underline hover:text-amber-700 transition-colors">Historial de lecturas</Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              {/* Placeholder para anuncio/banner premium */}
              <div className="hidden md:block mr-4">
                {/* Banner premium o anuncio aquí */}
                <span className="rounded bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold">Suscripción Premium $1.99 USD / $2000 ARS</span>
              </div>
              {/* Botón de login/registro o usuario */}
              <AuthButton />
            </div>
          </header>
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
