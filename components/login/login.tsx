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
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { signIn } from "next-auth/react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const lang = useTranslations("Login");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await onLogin(values);
    },
  });

  const onLogin = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const responseNextAuth = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (responseNextAuth?.ok) {
        router.push("/home");
      }

      if (responseNextAuth?.error) {
        console.log("responseNextAuth", responseNextAuth);
        enqueueSnackbar(responseNextAuth.error, {
          variant: "error",
        });
        return;
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} md={6} gap={2}>
        <Stack direction="column" alignItems="center">
          <Box sx={{ maxWidth: "500px", width: "100%" }}>
            <Card>
              <Box padding={4} textAlign="center" width="100%">
                <Typography variant="h5">{lang("title")}</Typography>
                <Box padding={4}>
                  <form onSubmit={formik.handleSubmit}>
                    <Stack direction="column" spacing={6}>
                      <TextField
                        label={lang("email")}
                        name="email"
                        type="email"
                        variant="standard"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                      <TextField
                        label={lang("password")}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        endIcon={
                          loading ? <CircularProgress size={20} /> : null
                        }
                      >
                        {loading ? lang("loading") : lang("title")}
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
          <Typography variant="h4" gutterBottom>
            {lang("subtitle")}
          </Typography>
          <Box paddingTop={4}>
            <Typography variant="h5" gutterBottom>
              {lang("registerMotivation")}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="/signup/candidate" passHref>
                <Button sx={{ backgroundColor: "#F4E8C9", color: "black" }}>
                  {lang("candidateButton")}
                </Button>
              </Link>
              <Link href="/signup/company" passHref>
                <Button data-cy="candidate-signup" sx={{ backgroundColor: "#F4E8C9", color: "black" }}>
                  {lang("companyButton")}
                </Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
