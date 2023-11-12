"use client";

import { Box, Stack, Container, Typography } from "@mui/material";
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

export default function Candidates() {
  const [techSkills, setTechSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

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
    { name: "Candidatos", path: "/candidates" },
  ];

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Stack direction="column" spacing={4} paddingTop={4}>
          <CustomBreadcrumbs routes={routes}></CustomBreadcrumbs>
          <Typography
            variant="h3"
            gutterBottom
            fontFamily={philosopher.style.fontFamily}
          >
            Candidatos
          </Typography>
          <Typography variant="h6" gutterBottom color="secondary.main">
            Aquí puedes elegir a los candidatos que se ajustan a los perfiles
            que estás buscando
          </Typography>
          <Stack direction="row">
            <BasicSelect
              text="Habilidades Técnicas"
              options={tech_skills}
              selectedOptions={formik.values.techSkills}
              onSelectionChange={(selected) => {
                setTechSkills(selected);
              }}
            />
            <BasicSelect
              text="Habilidades Blandas"
              options={soft_skills}
              selectedOptions={formik.values.softSkills}
              onSelectionChange={(selected) => {
                setSoftSkills(selected);
              }}
            />
          </Stack>
          <CandidatesTable />
        </Stack>
      </Container>
    </Box>
  );
}
