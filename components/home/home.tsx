"use client";
import Link from "next/link";
import * as React from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { philosopher } from "@/app/[locale]/theme/fonts";
import OpenModalButton from "../evaluation/openModal";
import EvalModal from "../evaluation/evaluationModal";
import { useEffect, useState } from "react";
import { getInterviews } from "@/api/interviews";
import InterviewCard from "../interviews/interview-card";

export default function Home() {
  const [homeInterviews, setHomeInterviews] = useState([]);

  const lang = useTranslations("Home");
  const { data: session } = useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getHomeInterviews = async () => {
    if (session) {
      const response = await getInterviews({ token: session.user?.token });
      const data = await response.json();
      setHomeInterviews(data.data);
    }
  };

  useEffect(() => {
    if (session) {
      getHomeInterviews();
    }
  }, [session]);

  return (
    <Container maxWidth="lg">
      <Box
        component="img"
        src="/images/gradient-cloud.png" // Replace with your image path
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          transform: "translateX(-20%)", // Adjust as necessary to partially hide the image
          zIndex: -1, // To ensure it's under other content; adjust as needed
        }}
      />
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
              <Typography
                variant="subtitle1"
                gutterBottom
                color="secondary.main"
              >
                {lang("candidates.description")}
              </Typography>
              <Link href="/candidates">
                <Button
                  variant="contained"
                  aria-label={lang("candidates.action")}
                >
                  {lang("candidates.action")}
                </Button>
              </Link>
            </Box>
          </Grid>
        )}
        {user && [1, 2].includes(user?.role_id) && (
          <>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography
                  variant="h3"
                  gutterBottom
                  fontFamily={philosopher.style.fontFamily}
                >
                  {lang("projects.title")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="secondary.main"
                >
                  {lang("projects.description")}
                </Typography>
                <Link href="/projects">
                  <Button
                    variant="contained"
                    aria-label={lang("projects.action")}
                  >
                    {lang("projects.action")}
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography
                  variant="h3"
                  gutterBottom
                  fontFamily={philosopher.style.fontFamily}
                >
                  {lang("quickLinks.title")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="secondary.main"
                >
                  {lang("quickLinks.description")}
                </Typography>
                <OpenModalButton
                  onOpen={handleOpenModal}
                  label={lang("quickLinks.action")}
                />
                <EvalModal open={isModalOpen} onClose={handleCloseModal} />
              </Box>
            </Grid>
          </>
        )}
        {user && [3].includes(user?.role_id) && (
          <Grid item xs={12} sm={6}>
            <Stack direction="column" spacing={2}>
              <Typography
                variant="h3"
                gutterBottom
                fontFamily={philosopher.style.fontFamily}
              >
                {lang("interviews.title")}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="secondary.main"
              >
                {lang("interviews.description")}
              </Typography>
              <Grid container spacing={2}>
                {homeInterviews.map((interview, key) => (
                  <Grid item key={key} width="100%">
                    <InterviewCard key={key} interview={interview} />
                  </Grid>
                ))}
              </Grid>
              <Stack alignItems="flex-end">
                <Link href="/interviews">
                  <Button
                    variant="contained"
                    aria-label={lang("interviews.action")}
                  >
                    {lang("interviews.action")}
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
