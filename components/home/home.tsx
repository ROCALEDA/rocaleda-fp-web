"use client";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { getProjects } from "@/api/projects";
import { getCandidates } from "@/api/candidates";
import { getInterviews } from "@/api/interviews";
import EvalModal from "../evaluation/evaluationModal";
import OpenModalButton from "../evaluation/openModal";
import { philosopher } from "@/app/[locale]/theme/fonts";
import InterviewCard from "../interviews/interview-card";
import CandidateCard from "../candidates/candidate-card";
import LoadingSkeleton from "../interviews/interview-card-skeleton";
import ProjectCard from "../projects/project-card";

export default function Home() {
  const [homeInterviews, setHomeInterviews] = useState([]);
  const [homeCandidates, setHomeCandidates] = useState([]);
  const [homeProjects, setHomeProjects] = useState([]);

  const [isLoadingInterviews, setIsLoadingInterviews] = useState(true);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

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
      setIsLoadingInterviews(true);
      const response = await getInterviews({ token: session.user?.token });
      const data = await response.json();
      if (response.ok) {
        setIsLoadingInterviews(false);
        setHomeInterviews(data.data);
      }
    }
  };

  const getHomeCandidates = async () => {
    if (session) {
      setIsLoadingCandidates(true);
      const response = await getCandidates({ token: session.user?.token });
      const data = await response.json();
      if (response.ok) {
        setIsLoadingCandidates(false);
        setHomeCandidates(data.data);
      }
    }
  };

  const getHomeProjects = async () => {
    if (session) {
      setIsLoadingProjects(true);
      const response = await getProjects({ token: session.user?.token });
      const data = await response.json();
      if (response.ok) {
        setIsLoadingProjects(false);
        setHomeProjects(data);
      }
    }
  };

  useEffect(() => {
    if (session) {
      getHomeInterviews();
      getHomeCandidates();
      getHomeProjects();
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
      <Grid container spacing={10} paddingY={10}>
        {user && [1, 2].includes(user?.role_id) && (
          <Grid item xs={12} sm={6}>
            <Stack direction="column" spacing={2}>
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
              <Grid container>
                {isLoadingCandidates
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <LoadingSkeleton key={index} />
                    ))
                  : homeCandidates.slice(0, 3).map((candidate, key) => (
                      <Grid item key={key} width="100%">
                        <CandidateCard key={key} candidate={candidate} />
                      </Grid>
                    ))}
              </Grid>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
                <Link href="/candidates">
                  <Button
                    data-cy="candidates-action"
                    variant="contained"
                    aria-label={lang("candidates.action")}
                  >
                    {lang("candidates.action")}
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Grid>
        )}
        {user && [1, 2].includes(user?.role_id) && (
          <>
            <Grid item xs={12} sm={6}>
              <Stack direction="column" spacing={2}>
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
                <Grid container>
                  {isLoadingProjects
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <LoadingSkeleton key={index} />
                      ))
                    : homeProjects.slice(0, 3).map((project, key) => (
                        <Grid item key={key} width="100%">
                          <ProjectCard key={key} project={project} />
                        </Grid>
                      ))}
                </Grid>
                <Stack direction="row" justifyContent="flex-end" gap={2}>
                  <Link href="/projects">
                    <Button
                      data-cy="projects-action"
                      variant="contained"
                      aria-label={lang("projects.action")}
                    >
                      {lang("projects.action")}
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </Grid>
          </>
        )}
        {user && [2, 3].includes(user?.role_id) && (
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
              <Grid container>
                {isLoadingInterviews
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <LoadingSkeleton key={index} />
                    ))
                  : homeInterviews.slice(0, 3).map((interview, key) => (
                      <Grid item key={key} width="100%">
                        <InterviewCard key={key} interview={interview} />
                      </Grid>
                    ))}
              </Grid>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
                <Link href="/interviews">
                  <Button
                    data-cy="interviews-action"
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
        {user && [2].includes(user?.role_id) && (
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
        )}
      </Grid>
    </Container>
  );
}
