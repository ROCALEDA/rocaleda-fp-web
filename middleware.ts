import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

type TUser = {
  email: string;
  token: string;
  role_id: number;
  user_id: number;
  iat: number;
  exp: number;
  jti: string;
};
let locales = ["en", "es"];

const intlMiddleware = createIntlMiddleware({
  locales: locales,
  defaultLocale: "es",
  localePrefix: "always",
});

export async function middleware(request: NextRequest) {
  const { pathname, locale }: { pathname: string; locale: string | undefined } =
    request.nextUrl;

  const user = (await getToken({ req: request })) as TUser | null;

  const Redirect = () => {
    if (user?.token) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  };

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let pathnameWithoutLocale = pathname;

  if (pathnameHasLocale) {
    const localeRegex = new RegExp(`^/(${locales.join("|")})(/|$)`);
    pathnameWithoutLocale = pathname.replace(localeRegex, "/");
  }

  const authRoutes = ["/login", "/signup/candidate", "/signup/company"];
  if (!!user && authRoutes.includes(pathnameWithoutLocale)) {
    return Redirect();
  }

  const routesByRole = {
    "/candidates": [1, 2],
    "/projects": [1, 2],
    "/projects/create": [2],
    "/interviews": [3],
  };

  if (user && routesByRole.hasOwnProperty(pathnameWithoutLocale)) {
    const allowedRoles =
      routesByRole[pathnameWithoutLocale as keyof typeof routesByRole];
    if (allowedRoles && !allowedRoles.includes(user.role_id)) {
      return Redirect();
    }
  }

  if (!user && routesByRole.hasOwnProperty(pathnameWithoutLocale)) {
    return Redirect();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
