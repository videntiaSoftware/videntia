import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Excluir todos los assets estáticos, imágenes, fuentes, archivos manifest, archivos de configuración, y todas las rutas /api/*
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|opengraph-image.png|twitter-image.png|robots.txt|sitemap.xml|site.webmanifest|browserconfig.xml|apple-touch-icon|android-chrome|mstile|.*\\.(svg|png|jpg|jpeg|gif|webp|ico|json|xml|txt|woff|woff2|ttf|eot)$|api/).*)',
  ],
};
