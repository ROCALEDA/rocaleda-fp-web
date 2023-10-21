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
import { enqueueSnackbar } from "notistack";
import { registerCompany } from "@/api/apiService";

export default function Register() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50 && !/\d/.test(value)) {
      setCompany(value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidPhone = (phone: string) => {
    const phonePattern = /^\+?\d{1,15}$/;
    return phonePattern.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneValue = e.target.value;
    if (newPhoneValue === "+" || /^\+?\d{0,15}$/.test(newPhoneValue)) {
      setPhone(newPhoneValue);
    }
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: email,
      phone: phone,
      password: password,
      name: company
    };
    console.log(payload);
    const response = await registerCompany(payload.email, payload.phone ,payload.password, payload.name);

    if (response && response.status === 200) {
      enqueueSnackbar('Registro completo exitoso', { variant: 'success' });
      window.location.href = "/proyectos";
    } else if (response && response.error) {
      enqueueSnackbar(`Error: ${response.error}`, { variant: 'error' });
    } else {
      enqueueSnackbar('Hubo un error al realizar registro de usuario. Intente nuevamente.', { variant: 'error' });
    }
  
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
                      label="Compañía"
                      variant="standard"
                      name="compañia"
                      required
                      fullWidth
                      id="compañia"
                      autoFocus
                      value={company}
                      onChange={handleCompanyChange}
                    />
                    <TextField
                      label="Correo"
                      required
                      type="email"
                      variant="standard"
                      value={email}
                      onChange={handleEmailChange}
                      error={!isEmailValid(email) && email !== ""}
                      helperText={!isEmailValid(email) && email !== "" ? "Por favor ingresa un correo válido" : ""}
                    />
                    <TextField
                      label="Teléfono"
                      required
                      variant="standard"
                      value={phone}
                      onChange={handlePhoneChange}
                      error={!isValidPhone(phone) && phone !== ""}
                      helperText={!isValidPhone(phone) && phone !== "" ? "Por favor ingresa un número de teléfono válido (máximo 15 dígitos)" : "Ejemplo: +573503325442"}
                      />
                    <Grid container>
                      <Grid item xs={6}>
                        <TextField
                          label="Contraseña"
                          required
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
                          label="Repetir contraseña"
                          required
                          type="password"
                          id="password2"
                          autoComplete="new-password"
                          variant="standard"
                          value={password2}
                          onChange={handlePassword2Change}
                          error={password2 !== "" && !arePasswordsEqual()}
                          helperText={password2 !== "" && !arePasswordsEqual() ? "Las contraseñas no coinciden" : ""}
                          data-testid="password2"
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