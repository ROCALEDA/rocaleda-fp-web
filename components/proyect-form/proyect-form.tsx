"use client";
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography ,Box, Modal} from '@mui/material';
import styles from "./proyect-form.module.css";
import ProfileModal from "@/components/profileModal/profile_modal";
import EmployeesModal from "@/components/employeesModal/employees_modal";
import EmployeeCard from "@/components/employeesCard/employees_card";
import EditModal from "@/components/editEmployees/EditModal"
import ProfileCard from "@/components/profileCard/profile_card";
import EditProfileModal from "@/components/editProfile/EditProfile";

interface FormValues {
    name: string;
    description: string;
}

interface CreateProjectFormProps {
    proyectName: string; 
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    proyectDescription: string; 
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es obligatorio'),
    description: Yup.string()
        .required('La descripción es obligatoria')
});

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ proyectName, handleTitleChange, proyectDescription, handleDescriptionChange }) => {
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openFunctionaryModal, setOpenFunctionaryModal] = useState(false);
    const [employees, setEmployees] = useState<Array<{ name: string; role: string }>>([]);
    const handleAddEmployee = (employee: { name: string; role: string }) => {
        setEmployees(prev => [...prev, employee]);
    }
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({ name: '', role: '' });
    const [originalName, setOriginalName] = useState('');
    const [profiles, setProfiles] = useState<Array<any>>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [isEditModalOpen, setEditModal2Open] = React.useState(false);
    const [profileToEdit, setProfileToEdit] = React.useState(null);
    const [selectedData2, setSelectedData2] = useState({
        profileName: '',
        techSkills: [],
        softSkills: [],
        numberOfProfiles: 0
    });
    const [originalProfileName, setOriginalProfileName] = useState('');

    const handleEditClick = (data: { name: string, role: string }) => {
    setOriginalName(data.name);
    setSelectedData(data);
    setEditModalOpen(true);
    };

    type Employee = {
        name: string;
        role: string;
    };

    type Profile = {
        profileName: string;
        techSkills: string[];
        softSkills: string[];
        numberOfProfiles: number;
    };

    const handleUpdateEmployee = (originalName: string, updatedData: Employee) => {
        setEmployees(prevEmployees => {
            return prevEmployees.map(employee => 
                employee.name === originalName ? updatedData : employee
            );
        });
    }

    const handleUpdateProfile = (originalProfileName: string, updatedData: Profile) => {
        setProfiles(prevProfiles => {
          return prevProfiles.map(profile => {
            if (profile.profileName === originalProfileName) {
              return updatedData;
            } else {
              return profile;
            }
          });
        });
        setEditModal2Open(false);
    };


    const handleDeleteEmployee = (employeeName: string) => {
        setEmployees(prevEmployees => {
            return prevEmployees.filter(employee => employee.name !== employeeName);
        });
    }

    const handleDeleteProfile = (profileName: string) => {
        setProfiles(prevProfiles => {
            return prevProfiles.filter(profile => profile.profileName!== profileName);
        });
    }


    type ProfileData = {
        profileName: string;
        techSkills: string[];
        softSkills: string[];
        numberOfProfiles: number;
    };

    const handleAddProfile = (profileData: ProfileData) => {
        setProfiles(prevProfiles => [...prevProfiles, profileData]);
    };

    const handleEditProfile = (profile: ProfileData) => {
        setOriginalProfileName(profile.profileName);
        setSelectedData2({
            profileName: profile.profileName,
            techSkills: profile.techSkills as never[],
            softSkills: profile.softSkills as never[],
            numberOfProfiles: profile.numberOfProfiles
        });
        setEditModal2Open(true);
    };

  return (
    <Paper elevation={0}  style={{ padding: '50px', marginLeft: '10px'}} sx={{width: '80%'}}>
        <Box padding={0} textAlign="left" >
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher' ,paddingBottom: 3 }}>
        Crea tu proyecto
      </Typography>
        </Box>
      
      <Formik<FormValues>
        initialValues={{
          name: '',
          description: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // hacer la lógica de envío del formulario
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Typography variant="h5" gutterBottom className={styles.tituloConFondo}>
            <span>1. Datos Básicos</span>
            </Typography>
            <Box p={3}>
            <Field
              name="name"
              as={TextField}
              label="Nombre"
              fullWidth
              variant="standard"
              margin="normal"
              value={proyectName}
              onChange={handleTitleChange}
              helperText={touched.name ? errors.name : ''}
              error={touched.name && Boolean(errors.name)}
            />
            <Field
              name="description"
              as={TextField}
              label="Descripción"
              fullWidth
              variant="standard"
              multiline
              rows={2}
              margin="normal"
              value={proyectDescription}
              onChange={handleDescriptionChange}
              helperText={touched.description ? errors.description : ''}
              error={touched.description && Boolean(errors.description)}
            />
            </Box>
            {/* PERFILES */}
            <Typography variant="h5" gutterBottom className={styles.tituloConFondo2} style={{ marginTop: '20px' }}>
              <span>2. Perfiles</span>
            </Typography>
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
            <Button 
                variant="outlined" 
                color="primary"
                fullWidth 
                onClick={() => setOpenProfileModal(true)}
                style={{ marginTop: '10px' }}>
                CREAR PERFIL
            </Button>
            <ProfileModal 
                open={openProfileModal} 
                onClose={() => setOpenProfileModal(false)}
                onAdd={handleAddProfile} 
            />
            
            <EditProfileModal 
                open={isEditModalOpen} 
                onClose={() => setEditModal2Open(false)}
                initialData={selectedData2}
                onSave={handleUpdateProfile}
                originalProfileName={originalProfileName}  
            />
                

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
            />
            <EditModal 
                open={editModalOpen} 
                onClose={() => setEditModalOpen(false)} 
                initialData={selectedData} 
                onSave={handleUpdateEmployee}
                originalName={originalName}   
            /> 
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop="60px">
              <Button 
                variant="outlined" 
                sx={{
                    mt: 3,
                    mr: 1,
                    mb: 2
                  }}
                onClick={() => {
                  // Agregar la lógica para cancelar o limpiar el formulario
                  // redirigir al usuario a otra página o simplemente limpiar los campos del formulario
              }}>
                Cancelar
              </Button>

              <Button 
                type="submit" 
                variant="contained" 
                sx={{
                    mt: 3,
                    mb: 2,
                    ml: 1,
                    backgroundColor: "#A15CAC",
                    "&:hover": {
                      backgroundColor: "#864D8F",
                    },
                  }}
                disabled={isSubmitting}>
                Crear Proyecto
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default CreateProjectForm;