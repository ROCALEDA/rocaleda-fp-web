"use client";
import React, { useState } from 'react';
import CreateProjectForm from "@/components/proyect-form/proyect-form";
import Layout from "@/components/layout/balloon-layout";
import { Grid } from "@mui/material";
import CustomCard from "@/components/proyect-card/proyect-card";

export default function RegisterPage() {
  const [proyectName, setProyectName] = useState('');
  const [proyectDescription, setProyectDescription] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProyectName(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProyectDescription(event.target.value);
  };

  const updateProfiles = (newProfiles:any) => {
    setProfiles(newProfiles);
  }
  
  const updateEmployees = (newEmployees:any) => {
    setEmployees(newEmployees);
  }

    return (
      <Layout>
        <Grid container spacing={6} padding={2} style={{ paddingLeft: '50px' }}>
        <Grid item xs={12} md={6}>
        <CreateProjectForm 
        proyectName={proyectName}
        handleTitleChange={handleTitleChange}
        proyectDescription={proyectDescription}
        handleDescriptionChange={handleDescriptionChange}
        updateProfiles={updateProfiles}
        updateEmployees={updateEmployees}
        />
        </Grid>
        <Grid item xs={12} md={6}>
        <CustomCard 
          number={5}
          proyectName={proyectName} 
          proyectDescription= {proyectDescription}
          profiles={profiles}
          employees={employees}
          />
        </Grid>
        </Grid>
      </Layout>
    );
  }