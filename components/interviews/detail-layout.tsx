"use client";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Navbar from "@/components/navbar/navbar";
import CustomBreadcrumbs from "../breadcrumbs/breadcrumbs";
import { useTranslations } from "next-intl";
import { philosopher } from "@/app/[locale]/theme/fonts";
import InterviewList from "./interview-list";
import { ReactNode, useState } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function DetailLayout({ children }: LayoutProps) {
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
              <Box
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, transparent 50%, transparent 50%), url(/images/cloud4.png)",
                  backgroundColor: "background.default", // Replace with your desired color
                }}
              >
                {/* Add your content here */}
                <Typography variant="h5">New Content</Typography>
                <Typography variant="body1">
                  This is the new content replacing 'Detail'.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
