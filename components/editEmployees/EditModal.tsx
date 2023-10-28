"use client";
import React, { useState , useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface EditModalProps {
    open: boolean;
    onClose: () => void;
    initialData: {
      name: string;
      role: string;
    };
    onSave: (originalName: string, data: { name: string; role: string }) => void;
    originalName: string;
  }


const EditModal: React.FC<EditModalProps> = ({ open, onClose, initialData, onSave, originalName }) => {
    const [data, setData] = useState({
      name: initialData.name,
      role: initialData.role
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };

  const handleSave = () => {
    onSave(originalName, data);
    onClose();
};

  useEffect(() => {
    setData({
      name: initialData.name,
      role: initialData.role
    });
  }, [initialData]);

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
            Editar funcionario
        </Typography>
        <TextField 
            name="name"
            label="Nombre del funcionario" 
            fullWidth 
            margin="normal" 
            variant="standard"
            value={data.name}
            onChange={handleChange} 
        />
        <TextField
            name="role" 
            label="Nombre del perfil" 
            fullWidth 
            margin="normal" 
            variant="standard"
            value={data.role}
            onChange={handleChange} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button 
                variant="outlined" 
                onClick={onClose}
            >
              CANCELAR
            </Button>
            <Button 
                variant="contained"
                onClick={handleSave} 
                sx={{ px: 3,backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
            >
              EDITAR
            </Button>
        </Box>    
      </Box>
    </Modal>
  );
};

export default EditModal;
