"use client";
import Link from "next/link";
import * as React from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { philosopher } from "@/app/[locale]/theme/fonts";

export default function Home() {
  const lang = useTranslations("Home");
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} paddingY={10}>
        {user && [1, 2].includes(user?.role_id) && (
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography
                variant="h3"
                gutterBottom
                fontFamily={philosopher.style.fontFamily}
              >
                {lang("candidates.title")}
              </Typography>
              <Typography variant="h6" gutterBottom color="secondary.main">
                {lang("candidates.description")}
              </Typography>
              <Link href="/candidates">
                <Button variant="contained">{lang("candidates.action")}</Button>
              </Link>
            </Box>
          </Grid>
        )}
        {user && [1, 2].includes(user?.role_id) && (
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography
                variant="h3"
                gutterBottom
                fontFamily={philosopher.style.fontFamily}
              >
                {lang("projects.title")}
              </Typography>
              <Typography variant="h6" gutterBottom color="secondary.main">
                {lang("projects.description")}
              </Typography>
              <Link href="/projects">
                <Button variant="contained">{lang("projects.action")}</Button>
              </Link>
            </Box>
          </Grid>
        )}
        {user && [3].includes(user?.role_id) && (
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography
                variant="h3"
                gutterBottom
                fontFamily={philosopher.style.fontFamily}
              >
                Entrevistas
              </Typography>
              <Typography variant="h6" gutterBottom color="secondary.main">
                Conoce tus historial de entrevistas y entrevistas agendadas
              </Typography>
              <Link href="/interviews">
                <Button variant="contained" disabled>
                  Ver entrevistas
                </Button>
              </Link>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
