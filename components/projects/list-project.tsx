"use client";
import React, { useState, useRef, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import Link from "next/link";
import DetailProject from "@/components/projects/project-detail";
import SelectedProject from "@/components/projects/selected-project";
import { useSession } from "next-auth/react";

type Project = {
  id: number;
  name: string;
  is_team_complete: boolean;
  total_positions: number;
  positions: {
    id: number;
    is_open: boolean;
    name: string;
  }[];
};

export default function ListProject() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const cardRef: React.RefObject<HTMLDivElement> = useRef(null);
  const detailRef: React.RefObject<HTMLDivElement> = useRef(null);

  const { data: session } = useSession();
  const userRole = session?.user?.role_id;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        detailRef.current &&
        !detailRef.current.contains(event.target as Node)
      ) {
        setSelectedProject(null);
      }
    }

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={0}
          style={{ width: "95%", padding: "20px", marginRight: "30px" }}
        >
          <Grid container spacing={6}>
            <Grid item xs={8} sm={10}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontFamily: "Philosopher", paddingTop: 5 }}
              >
                Proyectos
              </Typography>
              <Typography variant="subtitle1" gutterBottom color="secondary">
                Gestiona tus proyectos y tu equipo
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sm={2}
              marginTop={"45px"}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              {userRole === 2 && (
              <Link href="/projects/create" passHref>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderColor: "purple",
                    color: "purple",
                  }}
                >
                  CREAR
                </Button>
              </Link>)}
            </Grid>
            <Grid item xs={12} sm={12} ref={cardRef}>
              <DetailProject setSelectedProject={setSelectedProject} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid item xs={12} sm={12} ref={detailRef}>
          <SelectedProject project={selectedProject} />
        </Grid>
      </Grid>
    </Grid>
  );
}
