import Image from "next/image";
import {
  Box,
  Card,
  Grid,
  Typography,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { ReactNode } from "react";
import styles from "./auth-layout.module.css";

export default function Login() {
  return (
    <Grid container spacing={2} padding={4}>
      <Grid item xs={12} md={6}>
        <Box maxWidth={500}>
          <Card>
            <Box padding={4} textAlign="center">
              <Typography variant="h5">Iniciar sesión</Typography>
              <Box padding={4}>
                <Stack direction="column" spacing={2}>
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
      </Grid>
      <Grid item xs={12} md={6}>
        plugin
      </Grid>
    </Grid>
  );
}
