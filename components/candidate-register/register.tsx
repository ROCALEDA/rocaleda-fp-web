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
    const options = [
        { value: 1, label: 'AWS' },
        { value: 2, label: 'Developer' },
        { value: 3, label: 'DEVOPS' },
        { value: 4, label: 'Backend' },
      ];
    const options2 = [
        { value: 1, label: 'Comunicación' },
        { value: 2, label: 'Resolución de Problemas' }
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
                      <BasicSelect text='Habilidades Técnicas' options={options}/>
                      <BasicSelect text='Habilidades Blandas' options={options2}/>


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
              <strong>candidato:</strong> y obtén:
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
  