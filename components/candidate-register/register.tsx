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

export default function Register() {
  const tech_skill = [
    { value: 1, label: 'Frontend' },
    { value: 2, label: 'Backend' },
    { value: 3, label: 'ReactJS' },
    { value: 4, label: 'NodeJS' },
    { value: 5, label: 'NextJS' },
    { value: 6, label: 'Python' },
    { value: 7, label: 'Flask' },
    { value: 8, label: 'AWS' },
    { value: 9, label: 'Architecture' },
    { value: 10, label: 'NestJS' },
    { value: 11, label: 'Angular' },
    { value: 12, label: 'GCP' },
    { value: 13, label: 'Azure' },
    { value: 14, label: 'DevOps' },
    { value: 15, label: 'Java' },
    { value: 16, label: 'SpringBoot' },
    { value: 17, label: 'FastAPI' },
    { value: 18, label: 'Data Science' },
    { value: 19, label: 'SQL' },
    { value: 20, label: 'NoSQL' },
    { value: 21, label: 'MongoDB' },
    { value: 22, label: 'Redis' },
    { value: 23, label: 'CSS' },
    { value: 24, label: 'Typescript' },
];
const soft_skill = [
  { value: 1, label: 'Leadership' },
  { value: 2, label: 'Responsibility' },
  { value: 3, label: 'Ownership' },
  { value: 4, label: 'Communication' },
  { value: 5, label: 'Teamwork' },
  { value: 6, label: 'Adaptability' },
  { value: 7, label: 'Empathy' },
  { value: 8, label: 'Management' },
];  
    return (
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} md={6} gap={2}>
          <Stack direction="column" alignItems="center">
            <Box sx={{ maxWidth: "500px", width: "100%" }}>
              <Card>
                <Box padding={3} textAlign="center">
                  <Typography variant="h5">Registrarme como candidato</Typography>
                  <Box padding={3}>
                    <Stack direction="column" spacing={6}>
                    <Grid container>
                        <Grid item xs={6}>
                          <TextField
                            required
                            label="Nombre"
                            type= "text"
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            label="Apellido"
                            type="text"
                            variant="standard"
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
                          />
                        </Grid>
                      </Grid>
                      <BasicSelect text='Habilidades Técnicas' options={ tech_skill }/>
                      <BasicSelect text='Habilidades Blandas' options={ soft_skill }/>


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
  