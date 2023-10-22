"use client";
import React from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { enqueueSnackbar } from "notistack";
import { registerCompany } from "@/api/apiService";
import Link from "next/link";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  company: Yup.string()
    .max(50, 'El nombre de la compañía debe tener 50 caracteres o menos')
    .matches(/^[^\d]*$/, 'El nombre de la compañía no debe contener números')
    .required('Este campo es obligatorio'),
  email: Yup.string()
    .email('Por favor ingresa un correo válido')
    .required('Este campo es obligatorio'),
  phone: Yup.string()
    .matches(/^\+?\d{1,15}$/, 'Por favor ingresa un número de teléfono válido (máximo 15 dígitos)')
    .required('Este campo es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Este campo es obligatorio'),
  password2: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Este campo es obligatorio')
});

export default function Register() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      company: '',
      email: '',
      phone: '',
      password: '',
      password2: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { email, phone, password, company } = values;
        const response = await registerCompany(email, phone, password, company);

        if (response && response.status === 200) {
          enqueueSnackbar('Registro completo exitoso', { variant: 'success' });
          router.push('/login');
        } else if (response && response.error) {
          enqueueSnackbar(`Error: ${response.error}`, { variant: 'error' });
        } else {
          enqueueSnackbar('Hubo un error al realizar registro de usuario. Intente nuevamente.', { variant: 'error' });
        }
      }catch(error: any){
        enqueueSnackbar(error.message, { variant: "error" });
      }
      
    }
  });

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} md={6} gap={2}>
        <Stack direction="column" alignItems="center">
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <Card>
              <Box padding={3} textAlign="center">
                <Typography variant="h5">Registrar mi empresa</Typography>
                <Box padding={3}>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <Stack direction="column" spacing={6}>
                    <TextField
                      label="Compañía"
                      variant="standard"
                      name="company"
                      fullWidth
                      id="company"
                      autoFocus
                      value={formik.values.company}
                      onChange={formik.handleChange}
                      error={formik.touched.company && Boolean(formik.errors.company)}
                      helperText={formik.touched.company && formik.errors.company}
                    />
                    <TextField
                      label="Correo"
                      type="email"
                      name='email'
                      id='email'
                      variant="standard"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && !!formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      label="Teléfono"
                      name='phone'
                      id='phone'
                      variant="standard"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={formik.touched.phone && !!formik.errors.phone}
                      helperText={formik.touched.phone && formik.errors.phone}
                      />
                    <Grid container>
                      <Grid item xs={6}>
                        <TextField
                          label="Contraseña"
                          type="password"
                          id="password"
                          name='password'
                          autoComplete="new-password"
                          variant="standard"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={formik.touched.password && !!formik.errors.password}
                          helperText={formik.touched.password && formik.errors.password}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Repetir contraseña"
                          type="password"
                          id="password2"
                          name='password2'
                          autoComplete="new-password"
                          variant="standard"
                          value={formik.values.password2}
                          onChange={formik.handleChange}
                          error={formik.touched.password2 && !!formik.errors.password2}
                          helperText={formik.touched.password2 && formik.errors.password2}
                        />
                      </Grid>
                    </Grid>
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
                      Registrar
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
            <strong>empresa:</strong>
          </Typography>
          <Box paddingTop={4}>
            <Typography variant="h5" gutterBottom>
              <li>Encuentra y contrata, pronto</li>
              <li>Recomendaciones según habilidades</li>
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
