import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicPaths = ['/auth/login', '/auth/signup'];
const protectedPaths = ['/dashboard', '/profile', '/blogs/create-blog', '/blog/:id/edit'];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (token) {
    // If the user is logged in and tries to access public paths (login/signup), redirect them to homepage
    if (publicPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect authenticated users from login/signup
    }
  } else {
    // If the user is not logged in and tries to access protected paths, redirect them to login page
    if (protectedPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/auth/login', req.url)); // Redirect unauthenticated users to login
    }
  }

  // Allow the request to proceed as usual
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/profile', '/blogs/create-blog', '/blog/:id/edit', '/auth/:path*'],
};
