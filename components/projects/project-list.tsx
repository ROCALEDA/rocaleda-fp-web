"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import React, { useState, useRef } from "react";

import { Grid, Paper, Typography, Button, Container, Box } from "@mui/material";
import DetailProject from "@/components/projects/project-detail";
import SelectedProject from "@/components/projects/selected-project";
import CustomBreadcrumbs from "../breadcrumbs/breadcrumbs";
import { TSimpleProject } from "@/types/types";

export default function ProjectList() {
  const lang = useTranslations("Projects");

  const [selectedProject, setSelectedProject] = useState<TSimpleProject | null>(
    null
  );
  const cardRef: React.RefObject<HTMLDivElement> = useRef(null);
  const detailRef: React.RefObject<HTMLDivElement> = useRef(null);

  const { data: session } = useSession();
  const userRole = session?.user?.role_id;

  const routes = [
    { name: "Home", path: "/home" },
    { name: lang("title"), path: "/projects" },
  ];

  return (
    <Container>
      <CustomBreadcrumbs routes={routes} marginTop="40px"></CustomBreadcrumbs>
      <Grid container paddingY={5} spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            style={{ width: "95%", padding: "20px", marginRight: "30px" }}
          >
            <Grid container spacing={6}>
              <Grid item xs={8} sm={10}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontFamily: "Philosopher", paddingTop: 5 }}
                >
                  {lang("title")}
                </Typography>
                <Typography variant="subtitle1" gutterBottom color="secondary">
                  {lang("description")}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sm={2}
                marginTop={"45px"}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                {userRole === 2 && (
                  <Link href="/projects/create" passHref>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        borderColor: "purple",
                        color: "purple",
                      }}
                    >
                      {lang("create")}
                    </Button>
                  </Link>
                )}
              </Grid>
              <Grid item xs={12} sm={12} ref={cardRef}>
                <DetailProject
                  setSelectedProject={(project) => setSelectedProject(project)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box ref={detailRef}>
            <SelectedProject project={selectedProject} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
