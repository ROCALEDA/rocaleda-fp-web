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

export async function middleware(request: NextRequest) {
  console.log("Middleware working");
  const defaultLocale = request.headers.get("x-default-locale") || "en";

  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "es"],
    defaultLocale,
  });

  const response = handleI18nRouting(request);

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);

  const { pathname }: { pathname: string } = request.nextUrl;

  const user = (await getToken({ req: request })) as TUser | null;

  const Redirect = () => {
    if (user?.token) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  };

  const authRoutes = ["/login", "/signup/candidate", "/signup/company"];
  if (!!user && authRoutes.includes(pathname)) {
    Redirect();
  }

  const routesByRole = {
    "/candidates": [1, 2],
    "/projects": [1, 2],
    "/projects/create": [2],
    "/interviews": [3],
  };

  if (user && routesByRole.hasOwnProperty(pathname)) {
    const allowedRoles = routesByRole[pathname as keyof typeof routesByRole];
    if (allowedRoles && !allowedRoles.includes(user.role_id)) {
      Redirect();
    }
  }
  if (!user && routesByRole.hasOwnProperty(pathname)) {
    Redirect();
  }
  return response;
}

export const config = {
  matcher: [
    "/candidates",
    "/projects",
    "/projects/create",
    "/home",
    "/interviews",
  ],
};
