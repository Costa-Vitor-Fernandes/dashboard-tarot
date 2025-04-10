// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("auth")?.value === "true";
  const isOnLoginPage = req.nextUrl.pathname === "/login";

  // se não está autenticado e não está tentando acessar /login
  if (!isAuthenticated && !isOnLoginPage) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // protege tudo dentro de /dashboard
};
