"use client";
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { useTranslations } from "next-intl";

interface EmployeesModalProps {
  open: boolean;
  onClose: () => void;
  onAddEmployee: (employee: { name: string; role: string }) => void;
  onEditEmployee?: (employee: { name: string; role: string }) => void;
  employeeToEdit?: { name: string; role: string } | null;
}

const EmployeesModal: React.FC<EmployeesModalProps> = ({
  open,
  onClose,
  onAddEmployee,
  onEditEmployee,
  employeeToEdit,
}) => {
  const lang = useTranslations("Projects");

  const [employeeName, setEmployeeName] = useState(employeeToEdit?.name || "");
  const [employeeRole, setEmployeeRole] = useState(employeeToEdit?.role || "");
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const employeesValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required(lang("employee_name_required"))
      .max(100, lang("employee_name_chars")),
    role: yup
      .string()
      .required(lang("profile_name_required"))
      .max(30, lang("profile_name_chars")),
  });

  const addEmployee = () => {
    const newEmployee = { name: employeeName, role: employeeRole };

    employeesValidationSchema
      .validate(newEmployee, { abortEarly: false })
      .then(() => {
        onAddEmployee(newEmployee);
        setEmployeeName("");
        setEmployeeRole("");
        setErrors({});
        onClose();
        resetModal();
      })
      .catch((error: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          validationErrors[err.path!] = err.message;
        });
        setErrors(validationErrors);
      });
  };

  const handleEmployeeSubmission = () => {
    const currentEmployee = { name: employeeName, role: employeeRole };

    employeesValidationSchema
      .validate(currentEmployee, { abortEarly: false })
      .then(() => {
        // Si se está editando un empleado y se proporciona la función onEditEmployee, se utiliza.
        if (employeeToEdit && onEditEmployee) {
          onEditEmployee(currentEmployee);
        } else {
          // Si no se está editando un empleado, se añade uno nuevo.
          onAddEmployee(currentEmployee);
        }
        resetModal();
        onClose();
      })
      .catch((error: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          validationErrors[err.path!] = err.message;
        });
        setErrors(validationErrors);
      });
  };

  const resetModal = () => {
    setEmployeeName("");
    setEmployeeRole("");
    setErrors({});
  };

  useEffect(() => {
    setEmployeeName(employeeToEdit?.name || "");
    setEmployeeRole(employeeToEdit?.role || "");
  }, [employeeToEdit]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "30%",
          maxHeight: "100%",
          m: "auto",
          mt: "5%",
          p: 8,
          bgcolor: "background.paper",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Philosopher" }}
        >
          {employeeToEdit ? "Editar Funcionario" : "Añadir Funcionario"}
        </Typography>
        <TextField
          data-cy="employee-name"
          label={lang("employee_name")}
          fullWidth
          margin="normal"
          variant="standard"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          data-cy="employee-role"
          label={lang("profile_name")}
          fullWidth
          margin="normal"
          variant="standard"
          value={employeeRole}
          onChange={(e) => setEmployeeRole(e.target.value)}
          error={Boolean(errors.role)}
          helperText={errors.role}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
          <Button
            variant="outlined"
            onClick={() => {
              resetModal();
              onClose();
            }}
          >
            {lang("cancel")}
          </Button>
          <Button
            data-cy="modal-employee"
            variant="contained"
            onClick={handleEmployeeSubmission}
            sx={{
              px: 3,
              backgroundColor: "#A15CAC",
              "&:hover": { backgroundColor: "#864D8F" },
            }}
          >
            {employeeToEdit ? lang("save") : lang("add")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EmployeesModal;
