import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml, robots.txt, manifest.json (SEO files)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - public API routes
     * All public routes are handled in the middleware logic, not here
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|opengraph-image.png|twitter-image.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
