import BalloonLayout from "@/components/layout/balloon-layout";
import CreateProjectForm from "@/components/proyect-form/proyect-form";
import Layout from "@/components/layout/balloon-layout";
import { Grid, Stack, Typography } from "@mui/material";
import CustomCard from "@/components/proyecy-card/proyect-card";

export default function RegisterPage() {
    return (
      <Layout>
        <Grid container spacing={6} padding={2} style={{ padding: '50px' }}>
        <Grid item xs={12} md={6}>
        <CreateProjectForm />
        </Grid>
        <Grid item xs={12} md={6}>
        <CustomCard />
        </Grid>
        </Grid>
      </Layout>
    );
  }