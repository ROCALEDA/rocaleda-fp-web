"use client";

import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Navbar from "../navbar/navbar";

export default function Projects() {
  const { data: session } = useSession();
  console.log("data SESSION", session);

  return (
    <Box>
      <Navbar />
      <Container maxWidth="md">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Empresas
          </Link>
          <Typography color="text.primary">Candidatos</Typography>
        </Breadcrumbs>
      </Container>
    </Box>
  );
}
