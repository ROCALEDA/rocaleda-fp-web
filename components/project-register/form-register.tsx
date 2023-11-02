"use client";
import React, { useState} from 'react';
import { Box, Typography,TextField,Button} from "@mui/material";
import styles from "./form-register.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProfileCard from "./profileCard";
import ProfileModal from "./profileModal";
import EmployeeCard from "./employeesCard";
import EmployeesModal from "./employeesModal";

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    // Agrega aquí más validaciones para otros campos...
  });

type FormRegisterProyectProps = {
    setProyectName: (name: string) => void;
    setProyectDescription: (description: string) => void;
    setProfiles: (profiles: Array<any>) => void;
    setEmployees: (employees: Array<{ name: string; role: string }>) => void;
};

interface FormValues {
    nombre: string;
    description: string;
    // otros campos si los tienes...
}

export default function FormRegisterProyect(props: FormRegisterProyectProps) {

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(event);
        props.setProyectName(event.target.value);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(event);
        props.setProyectDescription(event.target.value);
    };
    const handleAddProfile = (profileData: ProfileData) => {
        setProfiles(prevProfiles => {
            const newProfiles = [...prevProfiles, profileData];
            props.setProfiles(newProfiles);
            return newProfiles;
        });
    };

    const handleSubmit = (values: FormValues) => {
        console.log(values);
        props.setProyectName(values.nombre);
        props.setProyectDescription(values.description);
        props.setProfiles(profiles);
        props.setEmployees(employees);
    };


    const formik = useFormik({
        initialValues: {
          nombre: '',
          description: '',
          // otros campos...
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
      });

// Manejo de perfiles
const [profiles, setProfiles] = useState<Array<any>>([]);
const handleDeleteProfile = (profileName: string) => {
    setProfiles(prevProfiles => {
        const newProfiles = prevProfiles.filter(profile => profile.profileName !== profileName);
        props.setProfiles(newProfiles); // Actualiza el estado del componente padre
        return newProfiles;
    });
}
type ProfileData = {
    profileName: string;
    techSkills: string[];
    softSkills: string[];
    numberOfProfiles: number;
};

const handleEditProfile = (profile: ProfileData) => {
    setProfileToEdit(profile);
    setOpenProfileModal(true);
};


const editProfile = (updatedProfile: ProfileData) => {
    setProfiles(prevProfiles => {
        const newProfiles = [...prevProfiles];
        const index = newProfiles.findIndex(p => p.profileName === profileToEdit?.profileName);
        if (index !== -1) {
            newProfiles[index] = updatedProfile;
        }
        return newProfiles;
    });
    setProfileToEdit(null); 
    setOpenProfileModal(false);
};

const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
    setProfileToEdit(null);
};

// Modal de perfiles
const [openProfileModal, setOpenProfileModal] = useState(false);
const [profileToEdit, setProfileToEdit] = useState<ProfileData | null>(null);


// Modal de funcionarios
const [employees, setEmployees] = useState<Array<{ name: string; role: string }>>([]);
const [employeeToEdit, setEmployeeToEdit] = useState<{ name: string; role: string } | undefined>();

const handleAddEmployee = (employee: { name: string; role: string }) => {
    setEmployees(prev => {
        const updatedEmployees = [...prev, employee];
        props.setEmployees(updatedEmployees); 
        return updatedEmployees;
    });
}
const [openFunctionaryModal, setOpenFunctionaryModal] = useState(false);

const handleDeleteEmployee = (employeeName: string) => {
    setEmployees(prevEmployees => {
        const updatedEmployees = prevEmployees.filter(employee => employee.name !== employeeName);
        props.setEmployees(updatedEmployees); 
        return updatedEmployees;
    });
}

const editEmployee = (updatedEmployee: { name: string; role: string }) => {
    setEmployees(prevEmployees => {
        const newEmployees = [...prevEmployees];
        const index = newEmployees.findIndex(e => e.name === employeeToEdit?.name);
        if (index !== -1) {
            newEmployees[index] = updatedEmployee;
        }
        props.setEmployees(newEmployees);
        return newEmployees;
    });
    setEmployeeToEdit(undefined);  
    setOpenFunctionaryModal(false);
};

const handleEditClick = (employee: { name: string, role: string }) => {
    setEmployeeToEdit(employee);
    setOpenFunctionaryModal(true);
};

    return (
        <>
        <Typography variant="h5" gutterBottom className={styles.tituloConFondo}><span>1. Datos Básicos</span></Typography>
        <form onSubmit={formik.handleSubmit}>
        <Box p={3}>
            <TextField
                fullWidth
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="standard"
                value={formik.values.nombre}
                onChange={handleNameChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
            />
            <TextField
                fullWidth
                id="description"
                name="description"
                label="Descripción"
                variant="standard"
                margin="normal"
                multiline
                rows={2}
                value={formik.values.description}
                onChange={handleDescriptionChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />
        </Box>
        {/* PERFILES */}
        <Typography variant="h5" gutterBottom className={styles.tituloConFondo2} style={{ marginTop: '20px' }}><span>2. Perfiles</span></Typography>
        <Box p={3}>
        {profiles.length === 0 ? (
            <Typography variant="subtitle1" gutterBottom color="secondary">Aún no has agregado ningún perfil</Typography>
            ) : (
                profiles.map((profile, index) => (
                    <ProfileCard 
                        key={index} 
                        profile={profile}
                        onEdit={() => handleEditProfile(profile)} 
                        onDelete={handleDeleteProfile}
                    />
                    ))
            )}

            <ProfileModal 
                open={openProfileModal} 
                onClose={handleCloseProfileModal}
                onAdd={handleAddProfile}
                onEdit={editProfile}
                existingProfile={profileToEdit ? profileToEdit : undefined}   
            />
            <Button 
                variant="outlined" 
                color="primary"
                fullWidth 
                onClick={() => setOpenProfileModal(true)}
                style={{ marginTop: '10px' }}>
                CREAR PERFIL
            </Button>

        </Box>



        {/* FUNCIONARIOS */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }} className={styles.tituloConFondo3}>
        <span>3. Funcionarios</span> <span style={{ color: '#A0AEC0', fontSize:15 }}>(opcional)</span>
        </Typography>
        <Box p={3}>
            {/* Visualizar la Lista de Empleados */}
            {employees.length === 0 ? (
                <Typography variant="subtitle1" gutterBottom color="secondary">
                    Aún no has agregado ningún funcionario
                </Typography>
            ) : (
                <ul>
                    {employees.map((employee, index) => (
                        <EmployeeCard 
                            key={employee.name} {...employee} 
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteEmployee}
                            />
                    ))}
                </ul>
            )}
            <Button 
                variant="outlined"
                fullWidth 
                color="primary" 
                onClick={() => setOpenFunctionaryModal(true)}>
              AÑADIR FUNCIONARIO
            </Button>
            <EmployeesModal 
                open={openFunctionaryModal} 
                onClose={() => setOpenFunctionaryModal(false)} 
                onAddEmployee={handleAddEmployee}
                onEditEmployee={editEmployee}
                employeeToEdit={employeeToEdit}
            />
        
            
        </Box>

        
        {/* Cancelar y Crear Proyecto */}
        <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Button 
            variant="outlined" 
            sx={{mt: 3,mr: 1,mb: 2}}
            onClick={() => {}}>Cancelar</Button>
        <Button 
            type="submit" 
            variant="contained" 
            sx={{mt: 3,mb: 2,ml: 1,backgroundColor: "#A15CAC", "&:hover": {backgroundColor: "#864D8F"}}}>CREAR PROYECTO</Button>
        </Box>
      </form>
      
        </>
    );
}