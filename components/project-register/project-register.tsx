
"use client";
import React, { useState } from 'react';
import { Grid, Paper, Typography} from "@mui/material";
import FormRegisterProyect from "@/components/project-register/form-register";
import ResumeRegisterProyect from "@/components/project-register/resume-register"; 

export default function RegisterProyect() {
    const [proyectName, setProyectName] = useState("");
    const [proyectDescription, setProyectDescription] = useState("");
    const [profiles, setProfiles] = useState<any[]>([]);
    const [employees, setEmployees] = useState<any[]>([]);

    return (
        <Grid container style={{ marginLeft: '100px' }}>
            <Grid item xs={12} sm={6}>
                <Paper elevation={0} style={{ width: '80%', padding: '20px', marginRight: '30px', backgroundColor: 'transparent' }}>
                    <Grid container>
                        <Grid item xs={8} sm={10}>
                            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher' ,paddingBottom: 3 }}>Crea tu proyecto</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormRegisterProyect
                                setProyectName={setProyectName}
                                setProyectDescription={setProyectDescription}
                                setProfiles={setProfiles}
                                setEmployees={setEmployees}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={12}>
                    <ResumeRegisterProyect
                        number={5}
                        proyectName={proyectName}
                        proyectDescription={proyectDescription}
                        profiles={profiles}
                        employees={employees}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}