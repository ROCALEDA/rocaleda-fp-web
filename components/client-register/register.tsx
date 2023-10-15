import {
    Box,
    Card,
    Grid,
    Typography,
    TextField,
    Stack,
    Button,
  } from "@mui/material";

export default function Register() {
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} md={6} gap={2}>
        <Stack direction="column" alignItems="center">
          <Box width="100%" maxWidth={ 1 / 2}>
            <Card>
              <Box padding={3} textAlign="center">
                <Typography variant="h5">Registrar mi empresa</Typography>
                <Box padding={3}>
                  <Stack direction="column" spacing={6}>
                    <TextField 
                    variant="standard"
                    name="compañia"
                    required
                    fullWidth
                    id="compañia"
                    label="Compañía"
                    autoFocus
                    />
                    <TextField
                      required
                      label="Correo"
                      type="email"
                      variant="standard"
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
                    <Button 
                    type="submit" 
                    variant="contained"
                    sx={{mt: 3, mb: 2, backgroundColor: '#A15CAC',
                '&:hover': {
                backgroundColor: '#864D8F',
                } }}
                    >Registrar</Button>
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction="column" justifyContent="space-between">
          <Typography variant="h3" gutterBottom style={{ fontFamily: 'Philosopher, sans-serif' }}>
            Regístrate como <br />
            <strong>empresa:</strong>
          </Typography>
          <Box paddingTop={4}>
          <Typography variant="h5" gutterBottom>
            <li>Encuentra y contrata, pronto</li>
            <li>Recomendaciones según habilidades</li>
            </Typography>
          </Box><Box paddingTop={4}>  
            <Typography variant="h5" gutterBottom>
              Ya tienes una cuenta?
            </Typography>
            <Stack direction="row" spacing={2} sx={{ width: '30%' }}>
              <Button 
                type="submit" 
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#A15CAC"}}>
                Ingresar
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}


