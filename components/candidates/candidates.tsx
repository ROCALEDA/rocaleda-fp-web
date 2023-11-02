"use client";

import {
  Box,
  Link,
  Stack,
  Container,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import Navbar from "../navbar/navbar";
import { philosopher } from "@/app/theme/fonts";
import BasicSelect from "../select-hard/select";
import CandidatesTable from "./candidates-table";
import { soft_skills, tech_skills } from "@/utils/skills";
import { useCallback, useEffect, useState } from "react";

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
      console.log("Valores enviados:", values);
      try {
        console.log("filtrar candidatos", values);
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  useEffect(() => {
    router.push(pathname + "?" + createQueryString());
  }, [techSkills, softSkills]);

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Stack direction="column" spacing={4} paddingTop={4}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Empresas
            </Link>
            <Typography color="text.primary">Candidatos</Typography>
          </Breadcrumbs>
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