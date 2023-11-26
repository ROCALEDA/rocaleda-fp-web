"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import Navbar from "@/components/navbar/navbar";
import { philosopher } from "@/app/[locale]/theme/fonts";
import DetailLayout from "@/components/layout/detail-layout";
import CustomBreadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import FormRegisterProyect from "@/components/projects/create/form-register";
import ResumeRegisterProyect from "@/components/projects/create/resume-register";

export default function CreateProject() {
  const lang = useTranslations("Projects");

  const [proyectName, setProyectName] = useState("");
  const [proyectDescription, setProyectDescription] = useState("");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  function isFormFilled() {
    if (
      proyectName ||
      proyectDescription ||
      profiles.length > 0 ||
      employees.length > 0
    ) {
      return (
        <ResumeRegisterProyect
          proyectName={proyectName}
          proyectDescription={proyectDescription}
          profiles={profiles}
          employees={employees}
        />
      );
    }
    return null;
  }

  const routes = [
    { name: "Home", path: "/home" },
    { name: lang("title"), path: "/projects" },
    { name: lang("create"), path: "/projects/create" },
  ];

  return (
    <Box>
      <Navbar />
      <DetailLayout>
        <Container>
          <Grid container paddingY={5}>
            <Grid item xs={12} md={7}>
              <CustomBreadcrumbs routes={routes}></CustomBreadcrumbs>
              <Paper
                elevation={0}
                style={{
                  width: "80%",
                  padding: "20px",
                  marginRight: "30px",
                  marginTop: "30px",
                  backgroundColor: "transparent",
                }}
              >
                <Grid container>
                  <Grid item xs={8} sm={10}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      fontFamily={philosopher.style.fontFamily}
                      sx={{ paddingBottom: 3 }}
                    >
                      {lang("create_detail")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormRegisterProyect
                      setProyectName={setProyectName}
                      setProyectDescription={setProyectDescription}
                      setProfiles={setProfiles}
                      setEmployees={setEmployees}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              {isFormFilled()}
            </Grid>
          </Grid>
        </Container>
      </DetailLayout>
    </Box>
  );
}
