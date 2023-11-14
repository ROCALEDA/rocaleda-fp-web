"use client";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Navbar from "@/components/navbar/navbar";
import CustomBreadcrumbs from "../breadcrumbs/breadcrumbs";
import { useTranslations } from "next-intl";
import { philosopher } from "@/app/[locale]/theme/fonts";
import InterviewList from "./interview-list";

export default function Interviews() {
  const lang = useTranslations("Interviews");

  const breadcrumbs = [
    { name: "Home", path: "/home" },
    { name: lang("title"), path: "/interviews" },
  ];

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Stack paddingY={4} direction="column" spacing={4}>
          <CustomBreadcrumbs routes={breadcrumbs}></CustomBreadcrumbs>
          <Typography
            variant="h3"
            gutterBottom
            fontFamily={philosopher.style.fontFamily}
          >
            {lang("title")}
          </Typography>
          <Typography variant="h6" gutterBottom color="secondary.main">
            {lang("description")}
          </Typography>
          <Grid container spacing={2} paddingX={0}>
            <Grid item xs={8} md={6}>
              <InterviewList />
            </Grid>
            <Grid item md={6} display={{ xs: "none", lg: "block" }}>
              Detail
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
