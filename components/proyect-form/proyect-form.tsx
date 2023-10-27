"use client"
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography ,Box, Modal} from '@mui/material';
import styles from "./proyect-form.module.css";
import ProfileModal from "@/components/profileModal/profile_modal";
import EmployeesModal from "@/components/employeesModal/employees_modal";

interface FormValues {
  name: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio'),
  description: Yup.string()
    .required('La descripción es obligatoria')
});

const CreateProjectForm: React.FC = () => {
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openFunctionaryModal, setOpenFunctionaryModal] = useState(false);

  return (
    <Paper elevation={0}  style={{ padding: '50px', marginLeft: '10px'}} sx={{
        width: '80%'}}>
        <Box padding={0} textAlign="left" >
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher' }}>
        Crea tu proyecto
      </Typography>
        </Box>
      <Typography variant="h6" gutterBottom className={styles.tituloConFondo}>
        <span>1. Datos Básicos</span>
      </Typography>
      
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
            <Field
              name="name"
              as={TextField}
              label="Nombre"
              fullWidth
              variant="standard"
              margin="normal"
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
              helperText={touched.description ? errors.description : ''}
              error={touched.description && Boolean(errors.description)}
            />
            <Typography variant="h6" gutterBottom className={styles.tituloConFondo2} style={{ marginTop: '20px' }}>
              <span>2. Perfiles</span>
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="secondary">
                Aún no has agregado ningún perfil
            </Typography>

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
            />

            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }} className={styles.tituloConFondo2}>
            <span>3. Funcionarios</span>
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="secondary">
                Aún no has agregado ningún funcionario
            </Typography>
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
            /> 
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