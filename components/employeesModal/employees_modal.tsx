"use client"
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface EmployeesModalProps {
    open: boolean;
    onClose: () => void;
    onAddEmployee: (employee: { name: string, role: string }) => void;
}


const EmployeesModal: React.FC<EmployeesModalProps> = ({ open, onClose, onAddEmployee }) => {
    const [employeeName, setEmployeeName] = useState("");
    const [employeeRole, setEmployeeRole] = useState("");
    const addEmployee = () => {
        if (employeeName && employeeRole) {
            const newEmployee = {name: employeeName,role: employeeRole};
            onAddEmployee(newEmployee);
            setEmployeeName("");
            setEmployeeRole("");
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
            width: '30%',
            maxHeight: '100%',
            m: 'auto',
            mt: '5%',
            p: 8,
            bgcolor: 'background.paper',
            overflowY: 'auto'
            }}
        >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Philosopher' }}>
            Añadir funcionario
        </Typography>
        <TextField 
            label="Nombre del funcionario" 
            fullWidth 
            margin="normal" 
            variant="standard"
            value={employeeName}
            onChange={e => setEmployeeName(e.target.value)} 
        />
        <TextField 
            label="Nombre del perfil" 
            fullWidth 
            margin="normal" 
            variant="standard"
            value={employeeRole}
            onChange={e => setEmployeeRole(e.target.value)} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button variant="outlined" onClick={onClose}>
              CANCELAR
            </Button>
            <Button 
            variant="contained"
            onClick={addEmployee} 
            sx={{ px: 3,backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
            >
              AÑADIR
            </Button>
          </Box>

        </Box>
        </Modal>
    )
}

export default EmployeesModal;