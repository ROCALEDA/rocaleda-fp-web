"use client";
import { Grid, Paper, Typography,Button } from "@mui/material";
import { getCustomerProjects } from "@/api/apiService";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

export default function ListProyect() {


    const fetchProjects = async () => {
        try {
            const { data } = await getCustomerProjects();
            console.log(data);
        } catch (error) {
            console.error("Error fetching customer projects:", error);
        }
    };

    return (
        <Grid container style={{ width: '50%' }}>
            <Paper elevation={3} style={{ width: '100%', padding: '20px', marginRight: '30px' }}>
            <Grid container spacing={6}>
            <Grid item xs={12} sm={10}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher', paddingTop: 5 }}>
                    Proyectos
                </Typography>
                <Typography variant="subtitle1" gutterBottom color="secondary">
                    Gestiona tus proyectos y tu equipo
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}  marginTop={'45px'} display="flex" alignItems="center" justifyContent="flex-end">
            
            <Link href="/crea_proyecto" passHref>
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
            </Grid>
            </Paper>
        </Grid>
    );
}