"use client";

import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Navbar from "../navbar/navbar";

export default function Candidates() {
  const { data: session } = useSession();

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
