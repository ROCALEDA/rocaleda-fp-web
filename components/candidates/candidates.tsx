"use client";

import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Navbar from "../navbar/navbar";
import CandidatesTable from "./candidates-table";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import BasicSelect from "../select-hard/select";

const tech_skill = [
  { value: "1", label: "Frontend" },
  { value: "2", label: "Backend" },
  { value: "3", label: "ReactJS" },
  { value: "4", label: "NodeJS" },
  { value: "5", label: "NextJS" },
  { value: "6", label: "Python" },
  { value: "7", label: "Flask" },
  { value: "8", label: "AWS" },
  { value: "9", label: "Architecture" },
  { value: "10", label: "NestJS" },
  { value: "11", label: "Angular" },
  { value: "12", label: "GCP" },
  { value: "13", label: "Azure" },
  { value: "14", label: "DevOps" },
  { value: "15", label: "Java" },
  { value: "16", label: "SpringBoot" },
  { value: "17", label: "FastAPI" },
  { value: "18", label: "Data Science" },
  { value: "19", label: "SQL" },
  { value: "20", label: "NoSQL" },
  { value: "21", label: "MongoDB" },
  { value: "22", label: "Redis" },
  { value: "23", label: "CSS" },
  { value: "24", label: "Typescript" },
];
const soft_skill = [
  { value: "1", label: "Leadership" },
  { value: "2", label: "Responsibility" },
  { value: "3", label: "Ownership" },
  { value: "4", label: "Communication" },
  { value: "5", label: "Teamwork" },
  { value: "6", label: "Adaptability" },
  { value: "7", label: "Empathy" },
  { value: "8", label: "Management" },
];

export default function Candidates() {
  const { data: session } = useSession();

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
  return (
    <Box>
      <Navbar />
      <Container maxWidth="md">
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
            style={{ fontFamily: "Philosopher, sans-serif" }}
          >
            Candidatos
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontFamily: "Philosopher, sans-serif" }}
          >
            Aquí puedes elegir a los candidatos que se ajustan a los perfiles
            que estás buscando
          </Typography>
          <BasicSelect
            text="Habilidades Técnicas"
            options={tech_skill}
            selectedOptions={formik.values.techSkills}
            onSelectionChange={(selected) =>
              formik.setFieldValue("techSkills", selected)
            }
          />
          <CandidatesTable />
        </Stack>
      </Container>
    </Box>
  );
}
