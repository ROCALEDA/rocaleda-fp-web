import Image from "next/image";
import { ReactNode } from "react";
import { Stack } from "@mui/material";

import styles from "./auth-layout.module.css";
import LanguageSelector from "../language-selector.tsx/language-selector";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.container}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        padding={4}
      >
        <Image
          src="/images/logo.png"
          alt="Quire logo"
          width={200}
          height={50}
          style={{ objectFit: "contain" }}
        />
        <LanguageSelector />
      </Stack>
      {children}
    </div>
  );
}
