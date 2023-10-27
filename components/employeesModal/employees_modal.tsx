import React from 'react';
import { Modal, Box, Typography, TextField, Select, MenuItem, Button } from '@mui/material';

interface EmployeesModalProps {
    open: boolean;
    onClose: () => void;
}

const EmployeesModal: React.FC<EmployeesModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
          sx={{
            width: '20%',
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
        <TextField label="Nombre del funcionario" fullWidth margin="normal" variant="standard" />
        <TextField label="Nombre del perfil" fullWidth margin="normal" variant="standard" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button variant="outlined" onClick={onClose}>
              CANCELAR
            </Button>
            <Button variant="contained" sx={{
                    px: 3,
                    backgroundColor: "#A15CAC",
                    "&:hover": {
                      backgroundColor: "#864D8F",
                    },
                  }}>
              AÑADIR
            </Button>
          </Box>

        </Box>
        </Modal>
    )
}

export default EmployeesModal;