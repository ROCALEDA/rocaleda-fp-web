"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import BasicSelect from "../select-hard/select";
import { enqueueSnackbar } from "notistack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerCandidate } from "@/api/auth";

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("Requerido")
    .max(50, "Máximo 50 caracteres")
    .matches(/^[^\d]+$/, "No se permiten números"),
  apellido: Yup.string()
    .required("Requerido")
    .max(50, "Máximo 50 caracteres")
    .matches(/^[^\d]+$/, "No se permiten números"),
  email: Yup.string().required("Requerido").email("Correo inválido"),
  phone: Yup.string()
    .required("Requerido")
    .matches(/^\+?\d{0,15}$/, "Número de teléfono inválido"),
  password: Yup.string()
    .required("Requerido")
    .min(6, "Debe tener al menos 6 caracteres"),
  password2: Yup.string()
    .nullable()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
  techSkills: Yup.array().min(1, "Selecciona al menos una habilidad técnica"),
  softSkills: Yup.array().min(1, "Selecciona al menos una habilidad blanda"),
});
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

export default function Register() {
  const router = useRouter();
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
        const response = await registerCandidate(
          values.email,
          values.phone,
          values.password,
          `${values.nombre} ${values.apellido}`,
          values.softSkills,
          values.techSkills
        );
        if (response && response.status === 200) {
          enqueueSnackbar("Registro completo exitoso", { variant: "success" });
          router.push("/login");
        } else {
          enqueueSnackbar(
            "Algo salió mal al registrarse. Por favor, inténtelo de nuevo.",
            { variant: "error" }
          );
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} md={6} gap={2}>
        <Stack direction="column" alignItems="center">
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <Card>
              <Box padding={3} textAlign="center">
                <Typography variant="h5">Registrarme como candidato</Typography>
                <Box padding={3}>
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Stack direction="column" spacing={6}>
                      <Grid container>
                        <Grid item xs={6}>
                          <TextField
                            //required
                            label="Nombre"
                            type="text"
                            variant="standard"
                            name="nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.nombre && !!formik.errors.nombre
                            }
                            helperText={
                              formik.touched.nombre && formik.errors.nombre
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            //required
                            label="Apellido"
                            type="text"
                            variant="standard"
                            name="apellido"
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.apellido &&
                              !!formik.errors.apellido
                            }
                            helperText={
                              formik.touched.apellido && formik.errors.apellido
                            }
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={11}>
                          <TextField
                            //required
                            fullWidth
                            label="Correo"
                            type="email"
                            variant="standard"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.email && !!formik.errors.email
                            }
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={11}>
                          <TextField
                            label="Teléfono"
                            fullWidth
                            //required
                            variant="standard"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.phone && !!formik.errors.phone
                            }
                            helperText={
                              formik.touched.phone && formik.errors.phone
                            }
                          />
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={6}>
                          <TextField
                            //required
                            label="Contraseña"
                            type="password"
                            name="password"
                            variant="standard"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.password &&
                              !!formik.errors.password
                            }
                            helperText={
                              formik.touched.password && formik.errors.password
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            //required
                            label="Repetir contraseña"
                            type="password"
                            name="password2"
                            variant="standard"
                            value={formik.values.password2}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.password2 &&
                              !!formik.errors.password2
                            }
                            helperText={
                              formik.touched.password2 &&
                              formik.errors.password2
                            }
                          />
                        </Grid>
                      </Grid>

                      <BasicSelect
                        text="Habilidades Técnicas"
                        options={tech_skill}
                        selectedOptions={formik.values.techSkills}
                        onSelectionChange={(selected) =>
                          formik.setFieldValue("techSkills", selected)
                        }
                      />
                      <BasicSelect
                        text="Habilidades Blandas"
                        options={soft_skill}
                        selectedOptions={formik.values.softSkills}
                        onSelectionChange={(selected) =>
                          formik.setFieldValue("softSkills", selected)
                        }
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          backgroundColor: "#A15CAC",
                          "&:hover": {
                            backgroundColor: "#864D8F",
                          },
                        }}
                      >
                        Registrarme
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Box>
            </Card>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack direction="column" justifyContent="space-between">
          <Typography
            variant="h3"
            gutterBottom
            style={{ fontFamily: "Philosopher, sans-serif" }}
          >
            Regístrate como <br />
            <strong>candidato</strong> y obtén:
          </Typography>
          <Box paddingTop={4}>
            <Typography variant="h5" gutterBottom>
              <li>Acompañamiento en las posiciones que te interesan</li>
              <li>Acceso a las mejores posiciones</li>
            </Typography>
          </Box>
          <Box paddingTop={4}>
            <Typography variant="h5" gutterBottom>
              ¿Ya tienes una cuenta?
            </Typography>
            <Stack direction="row" spacing={2} sx={{ width: "30%" }}>
              <Link href="/login" passHref>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: "#A15CAC" }}
                >
                  Ingresar
                </Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
