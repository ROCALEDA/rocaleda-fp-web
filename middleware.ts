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

  const authRoutes = ["/login", "/register-company", "/register-candidate"];
  if (!!user && authRoutes.includes(pathname)) {
    console.log("RedirectAUTH", authRoutes.includes(pathname));
    console.log("pathname", pathname);

    return Redirect();
  }

  console.log("MIDDLEWARE", user);
  console.log("PATHNAME", pathname);

  const routesByRole = {
    "/candidates": [1, 2],
    "/projects": [1, 2],
    "/projects/create": [2],
  };

  if (user && routesByRole.hasOwnProperty(pathname)) {
    const allowedRoles = routesByRole[pathname as keyof typeof routesByRole];
    if (allowedRoles && !allowedRoles.includes(user.role_id)) {
      console.log("POQUEEE", allowedRoles);
      return Redirect();
    }
    console.log("IF SI");
  } else {
    console.log("IF NO");
  }
  console.log("AJA");
}

export const config = {
  matcher: [
    "/login",
    "/register-company",
    "/register-candidate",
    "/register-candidate",
    "/candidates",
    "/projects",
    "/home",
  ],
};
