"use client";
import Link from "next/link";
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { enqueueSnackbar } from "notistack";
import { login } from "@/api/apiService";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      console.log(values);
      await onLogin(values);
    },
  });

  const onLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data, status } = await login(values.email, values.password);
      console.log(data);
      enqueueSnackbar(`Sesión iniciada (${status})`, { variant: "success" });
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/proyectos");
      } else {
        // Handle errors
        console.error("Authentication failed");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} md={6} gap={2}>
        <Stack direction="column" alignItems="center">
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <Card>
              <Box padding={4} textAlign="center" width="100%">
                <Typography variant="h5">Iniciar sesión</Typography>
                <Box padding={4}>
                  <form onSubmit={formik.handleSubmit}>
                    <Stack direction="column" spacing={6}>
                      <TextField
                        label="Correo"
                        name="email"
                        type="email"
                        variant="standard"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        endIcon={
                          loading ? <CircularProgress size={20} /> : null
                        }
                      >
                        {loading ? "Ingresando..." : "Ingresar"}
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
          <Typography variant="h4" gutterBottom>
            Estamos felices <br />
            por verte nuevamente
          </Typography>
          <Box paddingTop={4}>
            <Typography variant="h5" gutterBottom>
              ¿Aún no tienes una cuenta?
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="/candidate" passHref>
                <Button sx={{ backgroundColor: "#F4E8C9", color: "black" }}>
                  Quiero ser candidato
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button sx={{ backgroundColor: "#F4E8C9", color: "black" }}>
                  Soy una empresa
                </Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
