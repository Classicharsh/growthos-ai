import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// ─────────────────────────────────────────────────────────────────────────────
// PROTECTED ROUTES — Server-side auth gate (Layer 1)
//
// This proxy checks for a session indicator cookie set by the Firebase Auth
// onAuthStateChanged observer in auth-context.tsx. It provides an instant
// server-side redirect BEFORE the page JS even loads, eliminating the flash
// of loading content that client-side-only protection suffers from.
//
// The client-side <ProtectedRoute> component serves as Layer 2 (defense in
// depth) for edge cases where the cookie might be stale.
// ─────────────────────────────────────────────────────────────────────────────

const PROTECTED_ROUTES = ["/dashboard", "/settings", "/profile"]
const SESSION_COOKIE_NAME = "__session"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path matches any protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Check for the session indicator cookie
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)

  if (!sessionCookie?.value) {
    // Unauthenticated — redirect to /login with the original path preserved
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated — allow the request through
  return NextResponse.next()
}

// Only run the proxy on protected routes and their sub-paths.
// This avoids unnecessary overhead on public routes, static files, etc.
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*"],
}
