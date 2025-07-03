import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Excluye rutas de API, assets estáticos y archivos comunes
    '/((?!api/|_next/|favicon.ico|manifest.json|opengraph-image.png|twitter-image.png|robots.txt|sitemap.xml|site.webmanifest|browserconfig.xml|apple-touch-icon|android-chrome|mstile).*)',
  ],
};
