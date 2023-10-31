"use client";

import { useSession } from "next-auth/react";

export default function Projects() {
  const { data: session } = useSession();
  console.log("data SESSION", session);

  return <div>Projects</div>;
}
