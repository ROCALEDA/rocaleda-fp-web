"use client";
import React, { useState } from 'react';
import { Grid, Paper, Typography,Button } from "@mui/material";
import Link from "next/link";
import DetailProject from "@/components/project-detail/project-detail";
import SelectedProject from "@/components/selected-project/selected-project";


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

    return (
        <Grid container>
        <Grid item xs={12} sm={6}>
            <Paper elevation={0} style={{ width: '95%', padding: '20px', marginRight: '30px' }}>
            <Grid container spacing={6}>
            <Grid item xs={8} sm={10}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher', paddingTop: 5 }}>
                    Proyectos
                </Typography>
                <Typography variant="subtitle1" gutterBottom color="secondary">
                    Gestiona tus proyectos y tu equipo
                </Typography>
            </Grid>
            <Grid item xs={4} sm={2}  marginTop={'45px'} display="flex" alignItems="center" justifyContent="flex-end">
            
            <Link href="/proyecto/register" passHref>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ 
                        borderColor: 'purple', 
                        color: 'purple'
                    }}
                >
                    CREAR
                </Button>
            </Link>      
            </Grid>
                <Grid item xs={12} sm={12}>
                    <DetailProject setSelectedProject={setSelectedProject} />
                </Grid>
            </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={12}>
                <SelectedProject project={selectedProject}/>
            </Grid>
        </Grid>
        </Grid>
    );
}