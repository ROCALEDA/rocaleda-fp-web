"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import styles from "./form-register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileCard from "./profileCard";
import ProfileModal from "./profileModal";
import EmployeeCard from "./employeesCard";
import EmployeesModal from "./employeesModal";
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
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
  const { data: session } = useSession();

  const resetForm = () => {
    formik.resetForm();
    setProfiles([]);
    setEmployees([]);
    props.setProyectName("");
    props.setProyectDescription("");
    props.setProfiles([]);
    props.setEmployees([]);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    props.setProyectName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    formik.handleChange(event);
    props.setProyectDescription(event.target.value);
  };
  const handleAddProfile = (profileData: ProfileData) => {
    setProfiles((prevProfiles) => {
      const newProfiles = [...prevProfiles, profileData];
      props.setProfiles(newProfiles);
      return newProfiles;
    });
  };

  const handleSubmit = async (values: FormValues) => {
    const dataToSend = {
      name: formik.values.nombre,
      description: formik.values.description,
      profiles: profiles.map((p) => ({
        name: p.profileName,
        soft_skills: p.softSkills,
        tech_skills: p.techSkills,
        amount: p.numberOfProfiles,
      })),
      employees: employees.map((e) => ({
        full_name: e.name,
        profile_name: e.role,
      })),
    };

    try {
      //console.log('Datos a enviar:', JSON.stringify(dataToSend));
      const response = await fetch(`${API_URL}/customer/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        enqueueSnackbar(`Error ${response.status}: ${response.statusText}`, {
          variant: "error",
        });
        throw new Error("Error al enviar el proyecto");
      }

      const responseData = await response.json();
      enqueueSnackbar("Proyecto creado:", { variant: "success" });
      router.push("/projects");
      //console.log('Proyecto creado:', responseData);
    } catch (error) {
      enqueueSnackbar("Error al enviar el formulario:", { variant: "error" });
      //console.error('Error al enviar el formulario:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      description: "",
      // otros campos...
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  // Manejo de perfiles
  const [profiles, setProfiles] = useState<Array<any>>([]);
  const handleDeleteProfile = (profileName: string) => {
    setProfiles((prevProfiles) => {
      const newProfiles = prevProfiles.filter(
        (profile) => profile.profileName !== profileName
      );
      props.setProfiles(newProfiles); // Actualiza el estado del componente padre
      return newProfiles;
    });
  };
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
    setProfiles((prevProfiles) => {
      const newProfiles = [...prevProfiles];
      const index = newProfiles.findIndex(
        (p) => p.profileName === profileToEdit?.profileName
      );
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
  const [employees, setEmployees] = useState<
    Array<{ name: string; role: string }>
  >([]);
  const [employeeToEdit, setEmployeeToEdit] = useState<
    { name: string; role: string } | undefined
  >();

  const handleAddEmployee = (employee: { name: string; role: string }) => {
    setEmployees((prev) => {
      const updatedEmployees = [...prev, employee];
      props.setEmployees(updatedEmployees);
      return updatedEmployees;
    });
  };
  const [openFunctionaryModal, setOpenFunctionaryModal] = useState(false);

  const handleDeleteEmployee = (employeeName: string) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.filter(
        (employee) => employee.name !== employeeName
      );
      props.setEmployees(updatedEmployees);
      return updatedEmployees;
    });
  };

  const editEmployee = (updatedEmployee: { name: string; role: string }) => {
    setEmployees((prevEmployees) => {
      const newEmployees = [...prevEmployees];
      const index = newEmployees.findIndex(
        (e) => e.name === employeeToEdit?.name
      );
      if (index !== -1) {
        newEmployees[index] = updatedEmployee;
      }
      props.setEmployees(newEmployees);
      return newEmployees;
    });
    setEmployeeToEdit(undefined);
    setOpenFunctionaryModal(false);
  };

  const handleEditClick = (employee: { name: string; role: string }) => {
    setEmployeeToEdit(employee);
    setOpenFunctionaryModal(true);
  };

  const router = useRouter();

  return (
    <>
      <Typography variant="h5" gutterBottom className={styles.tituloConFondo}>
        <span>1. Datos Básicos</span>
      </Typography>
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
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>
        {/* PERFILES */}
        <Typography
          variant="h5"
          gutterBottom
          className={styles.tituloConFondo2}
          style={{ marginTop: "20px" }}
        >
          <span>2. Perfiles</span>
        </Typography>
        <Box p={3}>
          {profiles.length === 0 ? (
            <Typography variant="subtitle1" gutterBottom color="secondary">
              Aún no has agregado ningún perfil
            </Typography>
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
          <div data-testid="profile-modal">
            <ProfileModal
              open={openProfileModal}
              onClose={handleCloseProfileModal}
              onAdd={handleAddProfile}
              onEdit={editProfile}
              existingProfile={profileToEdit ? profileToEdit : undefined}
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setOpenProfileModal(true)}
            style={{ marginTop: "10px" }}
          >
            CREAR PERFIL
          </Button>
        </Box>
        {/* FUNCIONARIOS */}
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: "20px" }}
          className={styles.tituloConFondo3}
        >
          <span>3. Funcionarios</span>{" "}
          <span style={{ color: "#A0AEC0", fontSize: 15 }}>(opcional)</span>
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
                  key={employee.name}
                  {...employee}
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
            onClick={() => setOpenFunctionaryModal(true)}
          >
            AÑADIR FUNCIONARIO
          </Button>
          <div data-testid="employee-modal">
            <EmployeesModal
              open={openFunctionaryModal}
              onClose={() => setOpenFunctionaryModal(false)}
              onAddEmployee={handleAddEmployee}
              onEditEmployee={editEmployee}
              employeeToEdit={employeeToEdit}
            />
          </div>
        </Box>

        {/* Cancelar y Crear Proyecto */}
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Button
            variant="outlined"
            sx={{ mt: 3, mr: 1, mb: 2 }}
            onClick={resetForm}
          >
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
              "&:hover": { backgroundColor: "#864D8F" },
            }}
          >
            CREAR PROYECTO
          </Button>
        </Box>
      </form>
    </>
  );
}
