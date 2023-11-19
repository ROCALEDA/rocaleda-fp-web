"use client";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Navbar from "@/components/navbar/navbar";
import CustomBreadcrumbs from "../breadcrumbs/breadcrumbs";
import { useTranslations } from "next-intl";
import { philosopher } from "@/app/[locale]/theme/fonts";
import InterviewList from "./interview-list";
import { useState } from "react";
import InterviewDetailCard from "./interview-detail-card";
import { TInterview } from "@/types/interview";

export default function Interviews() {
  const [selectedInterview, setSelectedInterview] = useState<
    TInterview | undefined
  >();
  const lang = useTranslations("Interviews");

  const breadcrumbs = [
    { name: "Home", path: "/home" },
    { name: lang("title"), path: "/interviews" },
  ];

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2} paddingY={2} height="100%">
          <Grid item xs={12} md={6}>
            <Stack padding={4} direction="column" spacing={4}>
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
              <InterviewList setSelectedInterview={setSelectedInterview} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, transparent 50%, transparent 50%), url(/images/cloud4.png)",
                backgroundColor: "background.default", // Replace with your desired color,
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              {selectedInterview && (
                <InterviewDetailCard interview={selectedInterview} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
