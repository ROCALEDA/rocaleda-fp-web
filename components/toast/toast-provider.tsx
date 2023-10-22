"use client";

import { SnackbarProvider } from "notistack";

interface IntegrationNotistackProps {
  children: React.ReactNode;
}

export default function IntegrationNotistack({
  children,
}: IntegrationNotistackProps) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
