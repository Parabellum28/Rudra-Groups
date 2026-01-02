/**
 * Next.js Middleware
 * Handles CORS and request preprocessing for API routes
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only handle API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Get the origin from the request
  const origin = request.headers.get('origin') || '*';
  
  // Get allowed origins from environment or default to allowing all
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '*';
  const allowedOrigins = allowedOriginsEnv === '*' 
    ? ['*'] 
    : allowedOriginsEnv.split(',').map(o => o.trim());

  // Check if origin is allowed
  const isAllowed = allowedOrigins.includes('*') || allowedOrigins.includes(origin);
  const corsOrigin = isAllowed ? origin : allowedOrigins[0] || '*';

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // For non-OPTIONS requests, add CORS headers to the response
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', corsOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
