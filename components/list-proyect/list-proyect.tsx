"use client";
import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography,Button } from "@mui/material";
import { getCustomerProjects } from "@/api/apiService";
import Link from "next/link";
import DetailProject from "@/components/proyect-detail/proyect-detail";

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
            <Grid item xs={12} sm={12}>
            <DetailProject/>
            </Grid>
            </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        {/* agregar detalle */}
        </Grid>
        </Grid>
    );
}