import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
    return Redirect();
  }

  const routesByRole = {
    "/candidates": [1, 2],
    "/projects": [1, 2],
    "/projects/register": [2],
  };

  if (user && routesByRole.hasOwnProperty(pathname)) {
    const allowedRoles = routesByRole[pathname as keyof typeof routesByRole];
    if (allowedRoles && !allowedRoles.includes(user.role_id)) {
      return Redirect();
    }
  }
}

export const config = {
  matcher: ["/candidates", "/projects", "/projects/register", "/home"],
};
