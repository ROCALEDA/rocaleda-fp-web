"use client";
import * as React from "react";
import Link from "next/link";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { philosopher } from "@/app/theme/fonts";
import { useSession } from "next-auth/react";

export default function Home() {
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
                Candidatos
              </Typography>
              <Typography variant="h6" gutterBottom color="secondary.main">
                Aquí puedes elegir a los candidatos que se ajustan a los
                perfiles que estás buscando
              </Typography>
              <Link href="/candidates">
                <Button variant="contained">Ver candidatos</Button>
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
                Proyectos
              </Typography>
              <Typography variant="h6" gutterBottom color="secondary.main">
                Aquí puedes ver los proyectos creados, sus posiciones y
                candidatos asociados
              </Typography>
              <Link href="/projects">
                <Button variant="contained">Ver proyectos</Button>
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
                <Button variant="contained">Ver entrevistas</Button>
              </Link>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
