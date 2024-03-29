import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      token: string;
      role_id: number;
      user_id: number;
    };
  }
}
