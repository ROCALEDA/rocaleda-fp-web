import Image from "next/image";
import { ReactNode } from "react";
import { Grid, Stack, Typography } from "@mui/material";

import styles from "./auth-layout.module.css";
import LanguageSelector from "../language-selector.tsx/language-selector";

interface AuthLayoutProps {
  children: ReactNode;
  text?: string;
  textColor?: string;
}

export default function AuthLayout({
  children,
  text,
  textColor,
}: AuthLayoutProps) {
  return (
    <div className={styles.container}>
      <Stack direction="row" spacing={2} justifyContent="end" padding={4}>
        <LanguageSelector />
      </Stack>
      <Grid container spacing={2} padding={2}>
        <Grid
          item
          xs={12}
          md={6}
          gap={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/images/logo.png"
            alt="Quire logo"
            width={250}
            height={70}
            style={{ objectFit: "contain" }}
          />
          <Typography
            variant="h6"
            component="div"
            marginLeft={"-44px"}
            marginTop={"15px"}
            color={textColor}
          >
            {text}
          </Typography>
        </Grid>
      </Grid>
      {children}
    </div>
  );
}
