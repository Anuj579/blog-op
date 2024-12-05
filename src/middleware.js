import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';  // Import getToken to fetch token from headers or cookies

const PUBLIC_PATHS = ['/login', '/signup'];

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Fetch token from the request headers or cookies using next-auth's getToken method
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If the user is logged in and tries to access a public path, redirect them to the home page.
  if (PUBLIC_PATHS.includes(path) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not logged in and tries to access a private path, redirect to login page.
  if (!PUBLIC_PATHS.includes(path) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Proceed to the requested page if the user is authorized
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile',
    '/login',  // include login page in the match
    '/signup', // include signup page in the match
  ],
};
