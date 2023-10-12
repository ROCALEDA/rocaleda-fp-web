import Image from "next/image";
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";

export default function Login() {
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} md={6} gap={2}>
        <Stack direction="column" alignItems="center">
          <Box width="100%" maxWidth={2 / 3}>
            <Card>
              <Box padding={4} textAlign="center">
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
                    <Button variant="contained">Ingresar</Button>
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
              <Button sx={{ backgroundColor: "#F4E8C9", color: "black" }}>
                Quiero ser candidato
              </Button>
              <Button sx={{ backgroundColor: "#F4E8C9", color: "black" }}>
                Soy una empresa
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
