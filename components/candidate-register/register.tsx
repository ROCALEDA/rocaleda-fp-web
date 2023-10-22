"use client";
import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Stack,
  Button
} from "@mui/material";
import BasicSelect from "../select-hard/select";
import { enqueueSnackbar } from "notistack";
import { registerCandidate } from "@/api/apiService";
import Link from "next/link";

export default function Register() {
  const [nombre, setName] = useState("");
  const [apellido, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("")
  const [techSkills, setTechSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);



  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50 && !/\d/.test(value)) {
      setName(value);
    }
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50 && !/\d/.test(value)) { 
      setLastName(value);
    }
};
function getFullName() {
  return `${nombre} ${apellido}`;
}

function isValidFullName() {
  const fullName = getFullName();
  return fullName.length <= 50 && !/\d/.test(fullName);
}
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
const isEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
const arePasswordsEqual = () => {
  return password === password2;
};

const handleTechSkillsChange = (selectedSkills: string[]) => {
  setTechSkills(selectedSkills);
};

const handleSoftSkillsChange = (selectedSkills: string[]) => {
  setSoftSkills(selectedSkills);
};


const tech_skill = [
  { value: '1', label: 'Frontend' },
  { value: '2', label: 'Backend' },
  { value: '3', label: 'ReactJS' },
  { value: '4', label: 'NodeJS' },
  { value: '5', label: 'NextJS' },
  { value: '6', label: 'Python' },
  { value: '7', label: 'Flask' },
  { value: '8', label: 'AWS' },
  { value: '9', label: 'Architecture' },
  { value: '10', label: 'NestJS' },
  { value: '11', label: 'Angular' },
  { value: '12', label: 'GCP' },
  { value: '13', label: 'Azure' },
  { value: '14', label: 'DevOps' },
  { value: '15', label: 'Java' },
  { value: '16', label: 'SpringBoot' },
  { value: '17', label: 'FastAPI' },
  { value: '18', label: 'Data Science' },
  { value: '19', label: 'SQL' },
  { value: '20', label: 'NoSQL' },
  { value: '21', label: 'MongoDB' },
  { value: '22', label: 'Redis' },
  { value: '23', label: 'CSS' },
  { value: '24', label: 'Typescript' },
];
const soft_skill = [
{ value: '1', label: 'Leadership' },
{ value: '2', label: 'Responsibility' },
{ value: '3', label: 'Ownership' },
{ value: '4', label: 'Communication' },
{ value: '5', label: 'Teamwork' },
{ value: '6', label: 'Adaptability' },
{ value: '7', label: 'Empathy' },
{ value: '8', label: 'Management' },
]; 

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault(); 
  
  if (isValidFullName() && isValidPhone(phone) && isEmailValid(email) && arePasswordsEqual()) {
    const candidateData = {
      email,
      phone,
      password,
      fullname: getFullName(),
      soft_skills: softSkills, 
      tech_skills: techSkills
    };

    try {
      const response = await registerCandidate(email, phone, password, getFullName(), softSkills, techSkills);
      if (response && response.status === 200) {
        enqueueSnackbar('Registro completo exitoso', { variant: 'success' });
        window.location.href = "/login";
      } else {
        // En caso de que la respuesta no sea exitosa pero no haya un error lanzado
        enqueueSnackbar('Algo salió mal al registrarse. Por favor, inténtelo de nuevo.', { variant: 'error' });
      }
    } catch (error) {
      // Ahora, si el servicio lanza un error, se mostrará el mensaje del error al usuario
      enqueueSnackbar(error.message, { variant: "error" });
    }
  } else {
    enqueueSnackbar("Llene todos los campos", { variant: "error" });
  } 
};


  return (
    
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} md={6} gap={2}>
        <Stack direction="column" alignItems="center">
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <Card>
              <Box padding={3} textAlign="center">
                <Typography variant="h5">Registrarme como candidato</Typography>
                <Box padding={3}>
                <form onSubmit={handleSubmit}> 
                  <Stack direction="column" spacing={6}>
                  
                  <Grid container>
                      <Grid item xs={6}>
                      <TextField
                      required
                      label="Nombre"
                      type="text"
                      variant="standard"
                      name="nombre"
                      value={nombre}
                      onChange={handleNameChange}
                      />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
                          label="Apellido"
                          type="text"
                          variant="standard"
                          value={apellido}
                          onChange={handleLastNameChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={11}>
                    <TextField
                      required
                      fullWidth
                      label="Correo"
                      type="email"
                      variant="standard"
                      value={email}
                      onChange={handleEmailChange}
                      error={!isEmailValid(email) && email !== ""}
                      helperText={!isEmailValid(email) && email !== "" ? "Por favor ingresa un correo válido" : ""}
                    />
                    </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={11}>
                    <TextField
                    label="Teléfono"
                    fullWidth
                    required
                    variant="standard"
                    value={phone}
                    onChange={handlePhoneChange}
                    error={!isValidPhone(phone) && phone !== ""}
                    helperText={!isValidPhone(phone) && phone !== "" ? "Por favor ingresa un número de teléfono válido (máximo 15 dígitos) con o sin + inicial" : "Ejemplo: +573503325442"}
                    />
                    </Grid>
                    </Grid>
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
                          error={password.length < 6 && password !== ""}
                          helperText={password.length < 6 && password !== "" ? "La contraseña debe tener al menos 6 caracteres" : ""}
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
                    <BasicSelect
                    text='Habilidades Técnicas' 
                    options={tech_skill}
                    selectedOptions={techSkills}
                    onSelectionChange={setTechSkills}
                    />
                    <BasicSelect 
                    text='Habilidades Blandas' 
                    options={soft_skill}
                    selectedOptions={softSkills}
                    onSelectionChange={setSoftSkills}
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