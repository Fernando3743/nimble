import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export async function proxy(request: NextRequest) {
  // First, handle internationalization
  const response = intlMiddleware(request);

  // Extract locale from the pathname (e.g., /en/profile -> en)
  const pathnameLocale = request.nextUrl.pathname.split('/')[1];
  const locale = locales.includes(pathnameLocale as any) ? pathnameLocale : defaultLocale;

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define protected routes (without locale prefix)
  const protectedRoutes = ['/profile', '/account', '/settings'];
  const authRoutes = ['/auth/signin', '/auth/signup', '/auth/callback'];

  // Remove locale from pathname for route checking (e.g., /en/profile -> /profile)
  const pathnameWithoutLocale = request.nextUrl.pathname.replace(`/${locale}`, '') || '/';

  // Check if the current path is protected or auth route
  const isProtectedRoute = protectedRoutes.some(route => pathnameWithoutLocale.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathnameWithoutLocale.startsWith(route));

  // Redirect to sign in if accessing protected route without auth
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/auth/signin`;
    // Add redirect parameter to return user to original page after login
    url.searchParams.set('redirect', pathnameWithoutLocale);
    return NextResponse.redirect(url);
  }

  // Redirect to profile if already authenticated and trying to access auth pages
  if (user && isAuthRoute && pathnameWithoutLocale !== '/auth/callback') {
    const url = request.nextUrl.clone();
    // Check if there's a redirect parameter
    const redirect = request.nextUrl.searchParams.get('redirect');
    url.pathname = `/${locale}${redirect || '/profile'}`;
    url.searchParams.delete('redirect');
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Match all pathnames except for:
  // - api routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - files with extensions (e.g. .png, .jpg, .css)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};