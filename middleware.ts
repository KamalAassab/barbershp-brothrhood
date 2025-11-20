import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware for request handling
export function middleware(_request: NextRequest) {
  // Add any custom middleware logic here
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};