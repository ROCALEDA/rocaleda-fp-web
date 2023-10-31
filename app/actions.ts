"use server";

import { cookies } from "next/headers";

export async function create({ token }: { token: string }) {
  cookies().set("token", token);
}

export async function read() {
  const auth = cookies().get("authorization")?.value;
}
