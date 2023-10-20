"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { registerCompany } from "@/api/apiService";

export default function Register() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50 && !/\d/.test(value)) {
      setCompany(value);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    // Si quieres puedes agregar más validaciones aquí
  
    const response = await registerCompany(email, password, company);
  
    if (response.status === 200) {
      console.log('Registro completo exitoso');
      // Aquí puedes manejar el éxito, por ejemplo redirigir al usuario o mostrar un mensaje de éxito
    } else {
      console.log('No se pudo registrar la empresa');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const arePasswordsEqual = () => {
    return password === password2;
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} md={6} gap={2}>
        <Stack direction="column" alignItems="center">
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <Card>
              <Box padding={3} textAlign="center">
                <Typography variant="h5">Registrar mi empresa</Typography>
                <Box padding={3}>
                <form onSubmit={handleSubmit}>
                  <Stack direction="column" spacing={6}>
                    <TextField
                      variant="standard"
                      name="compañia"
                      required
                      fullWidth
                      id="compañia"
                      label="Compañía"
                      autoFocus
                      value={company}
                      onChange={handleCompanyChange}
                    />
                    <TextField
                      required
                      label="Correo"
                      type="email"
                      variant="standard"
                      value={email}
                      onChange={handleEmailChange}
                      error={!isEmailValid(email) && email !== ""}
                      helperText={!isEmailValid(email) && email !== "" ? "Por favor ingresa un correo válido" : ""}
                    />
                    <Grid container>
                      <Grid item xs={6}>
                        <TextField
                          required
                          label="Contraseña"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          variant="standard"
                          value={password}
                          onChange={handlePasswordChange}
                          error={password.length < 8 && password !== ""}
                          helperText={password.length < 8 && password !== "" ? "La contraseña debe tener al menos 8 caracteres" : ""}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
                          label="Repetir contraseña"
                          type="password"
                          id="password2"
                          autoComplete="new-password"
                          variant="standard"
                          value={password2}
                          onChange={handlePassword2Change}
                          error={password2 !== "" && !arePasswordsEqual()}
                          helperText={password2 !== "" && !arePasswordsEqual() ? "Las contraseñas no coinciden" : ""}
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
              Ya tienes una cuenta?
            </Typography>
            <Stack direction="row" spacing={2} sx={{ width: "30%" }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#A15CAC" }}
              >
                Ingresar
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}