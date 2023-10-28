"use client";
import React, { useState} from 'react';
import { TextField, Button, Paper, Typography ,Box} from '@mui/material';
import styles from "./proyect-form.module.css";
import ProfileModal from "@/components/profileModal/profile_modal";
import EmployeesModal from "@/components/employeesModal/employees_modal";
import EmployeeCard from "@/components/employeesCard/employees_card";
import EditModal from "@/components/editEmployees/EditModal"
import ProfileCard from "@/components/profileCard/profile_card";
import EditProfileModal from "@/components/editProfile/EditProfile";



interface CreateProjectFormProps {
    proyectName: string; 
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    proyectDescription: string; 
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updateProfiles: (profiles: any[]) => void;
    updateEmployees: (employees: any[]) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ proyectName, handleTitleChange, proyectDescription, handleDescriptionChange,updateProfiles,updateEmployees}) => {
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
    const [isEditModalOpen, setEditModal2Open] = React.useState(false);
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
    updateProfiles(profiles);
    updateEmployees(employees);

    const handleSubmit = () => {

      const projectData = {
        name: proyectName,
        description: proyectDescription,
        profiles: profiles.map(profile => ({
            name: profile.profileName,
            soft_skills: profile.softSkills,
            tech_skills: profile.techSkills,
            amount: profile.numberOfProfiles,
        })),
        employees: employees.map(employee => ({
            full_name: employee.name,
            profile_name: employee.role,
        }))
    };
    console.log(JSON.stringify(projectData, null, 2));
    console.log(projectData);
      // Aquí puedes agregar lógica adicional para enviar el JSON a un servidor o hacer cualquier otro procesamiento.
  };

  return (
    <Paper elevation={0}  style={{ padding: '50px', marginLeft: '10px'}} sx={{width: '80%'}}>
        <Box padding={0} textAlign="left" >
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher' ,paddingBottom: 3 }}>
        Crea tu proyecto
      </Typography>
        </Box>
            <Typography variant="h5" gutterBottom className={styles.tituloConFondo}>
            <span>1. Datos Básicos</span>
            </Typography>
            <Box p={3}>
            <TextField
              name="name"
              label="Nombre"
              fullWidth
              variant="standard"
              margin="normal"
              value={proyectName}
              onChange={handleTitleChange}
            />
            <TextField
              name="description"
              label="Descripción"
              fullWidth
              variant="standard"
              multiline
              rows={2}
              margin="normal"
              value={proyectDescription}
              onChange={handleDescriptionChange}
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
                  onClick={handleSubmit}
                  >
                Crear Proyecto
              </Button>
            </Box>
    </Paper>
  );
}

export default CreateProjectForm;