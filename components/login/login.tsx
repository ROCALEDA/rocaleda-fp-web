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
} from "@mui/material";
import { getSomeData } from "@/api/apiService";
import { enqueueSnackbar } from "notistack";

export default function Login() {
  const onLogin = async () => {
    try {
      const { data, status } = await getSomeData();
      console.log(data);
      enqueueSnackbar(`Sesión iniciada (${status})`, { variant: "success" });
    } catch (err) {
      console.log("error", err);
      enqueueSnackbar("Error", { variant: "error" });
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
                  <Stack direction="column" spacing={6}>
                    <TextField
                      required
                      label="Correo"
                      type="email"
                      variant="standard"
                    />
                    <TextField
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="standard"
                    />
                    <Button variant="contained" onClick={() => onLogin()}>
                      Ingresar
                    </Button>
                  </Stack>
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
            por verte de nuevo
          </Typography>
          <Box paddingTop={4}>
            <Typography variant="h5" gutterBottom>
              Aún no tienes una cuenta?
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="/registro-candidato" passHref>
                <Button sx={{ backgroundColor: "#F4E8C9", color: "black" }}>
                  Quiero ser candidato
                </Button>
              </Link>
              <Link href="/registro-cliente" passHref>
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
