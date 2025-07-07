import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Middleware deshabilitado: NextAuth gestiona la autenticación
export const config = { matcher: [] };
