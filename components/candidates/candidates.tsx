"use client";

import { Stack, Container, Typography, Grid } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import Navbar from "../navbar/navbar";
import { philosopher } from "@/app/[locale]/theme/fonts";
import BasicSelect from "../select-hard/select";
import CandidatesTable from "./candidates-table";
import { soft_skills, tech_skills } from "@/utils/skills";
import { useCallback, useEffect, useState } from "react";
import CustomBreadcrumbs from "../breadcrumbs/breadcrumbs";
import { useTranslations } from "next-intl";
import DetailLayout from "../layout/detail-layout";
import { TCandidate } from "@/types/users";
import CandidateDetail from "./candidate-detail";
import { TSimpleProject } from "@/types/types";
import { useSession } from "next-auth/react";
import { getProjects } from "@/api/projects";

export default function Candidates() {
  const [projects, setProjects] = useState<TSimpleProject[]>([]);

  const [techSkills, setTechSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<TCandidate | null>(
    null
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const lang = useTranslations("Candidates");
  const { data: session } = useSession();

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    const techSkillsParam = techSkills.join(",");
    const softSkillsParam = softSkills.join(",");

    if (softSkills.length > 0) {
      params.set("soft_skills", softSkillsParam);
    } else {
      params.delete("soft_skills");
    }
    if (techSkills.length > 0) {
      params.set("tech_skills", techSkillsParam);
    } else {
      params.delete("tech_skills");
    }

    return params.toString();
  }, [searchParams, softSkills, techSkills]);

  const validationSchema = Yup.object().shape({
    techSkills: Yup.array().min(1, "Selecciona al menos una habilidad técnica"),
    softSkills: Yup.array().min(1, "Selecciona al menos una habilidad blanda"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
      techSkills: [],
      softSkills: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  useEffect(() => {
    router.push(pathname + "?" + createQueryString());
  }, [techSkills, softSkills]);

  const routes = [
    { name: "Home", path: "/home" },
    { name: lang("title"), path: "/candidates" },
  ];

  const getAllProjects = async () => {
    if (session) {
      const response = await getProjects({ token: session.user?.token });
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      }
    }
  };

  useEffect(() => {
    if (session) {
      getAllProjects();
    }
  }, [session]);

  return (
    <Stack>
      <Navbar />
      <DetailLayout>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={7} padding={2}>
              <Stack direction="column" spacing={4} paddingTop={4}>
                <CustomBreadcrumbs routes={routes}></CustomBreadcrumbs>
                <Typography
                  variant="h3"
                  gutterBottom
                  fontFamily={philosopher.style.fontFamily}
                >
                  {lang("title")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="secondary.main"
                >
                  {lang("description")}
                </Typography>
                <Stack direction="row">
                  <BasicSelect
                    text={lang("tech_skills")}
                    data-cy="bs-tech-skills"
                    options={tech_skills}
                    selectedOptions={formik.values.techSkills}
                    onSelectionChange={(selected) => {
                      setTechSkills(selected);
                    }}
                  />
                  <BasicSelect
                    text={lang("soft_skills")}
                    options={soft_skills}
                    data-cy="bs-soft-skills"
                    selectedOptions={formik.values.softSkills}
                    onSelectionChange={(selected) => {
                      setSoftSkills(selected);
                    }}
                  />
                </Stack>
                <CandidatesTable selectCandidate={setSelectedCandidate} />
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              display="flex"
              flexDirection="column"
              padding={2}
            >
              {selectedCandidate && (
                <CandidateDetail
                  candidate={selectedCandidate}
                  projects={projects}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </DetailLayout>
    </Stack>
  );
}
