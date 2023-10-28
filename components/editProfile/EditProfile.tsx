"use client";
import React, { useState , useEffect } from 'react';
import { Modal, Box, Typography, TextField, Select, MenuItem, Button, Chip } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import CancelIcon from '@mui/icons-material/Cancel'; 

interface EditProfileProps {
  open: boolean;
  onClose: () => void;
  initialData: {
    profileName: string;
    techSkills: string[];
    softSkills: string[];
    numberOfProfiles: number;
  };
  onSave: (originalProfileName: string, data: {
    profileName: string;
    techSkills: string[];
    softSkills: string[];
    numberOfProfiles: number;
  }) => void;
  originalProfileName: string;
}

const tech_skill = [
    { value: '11', label: 'Angular' },
    { value: '8', label: 'AWS' },
    { value: '9', label: 'Architecture' },
    { value: '13', label: 'Azure' },
    { value: '2', label: 'Backend' },
    { value: '23', label: 'CSS' },
    { value: '18', label: 'Data Science' },
    { value: '14', label: 'DevOps' },
    { value: '7', label: 'Flask' },
    { value: '17', label: 'FastAPI' },
    { value: '1', label: 'Frontend' },
    { value: '12', label: 'GCP' },
    { value: '15', label: 'Java' },
    { value: '21', label: 'MongoDB' },
    { value: '5', label: 'NextJS' },
    { value: '4', label: 'NodeJS' },
    { value: '20', label: 'NoSQL' },
    { value: '10', label: 'NestJS' },
    { value: '6', label: 'Python' },
    { value: '3', label: 'ReactJS' },
    { value: '22', label: 'Redis' },
    { value: '19', label: 'SQL' },
    { value: '16', label: 'SpringBoot' },
    { value: '24', label: 'Typescript' }
];
const soft_skill = [
    { value: '6', label: 'Adaptability' },
    { value: '4', label: 'Communication' },
    { value: '7', label: 'Empathy' },
    { value: '1', label: 'Leadership' },
    { value: '8', label: 'Management' },
    { value: '3', label: 'Ownership' },
    { value: '2', label: 'Responsibility' },
    { value: '5', label: 'Teamwork' }
];

const menuProps = {
  PaperProps: {
      style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250, 
      },
  },
};

const EditProfileModal: React.FC<EditProfileProps> = ({ open, onClose, initialData,onSave,originalProfileName }) => {
  const [data, setData] = useState({
    profileName: initialData.profileName,
    techSkills: initialData.techSkills,
    softSkills: initialData.softSkills,
    numberOfProfiles: initialData.numberOfProfiles
  });
  const [techSkills, setTechSkills] = React.useState<string[]>([]);
  const [softSkills, setSoftSkills] = React.useState<string[]>([]);

  useEffect(() => {
    setData({
      profileName: initialData.profileName,
      techSkills: initialData.techSkills,
      softSkills: initialData.softSkills,
      numberOfProfiles: initialData.numberOfProfiles
    });
  }, [initialData]);
  
  const handleProfileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prevData => ({
      ...prevData,
      profileName: e.target.value,
    }));
  };

  const handleTechSkillsChange = (event: SelectChangeEvent<string[]>) => {
    const selectedSkills = event.target.value as string[];
    setData(prevData => ({
      ...prevData,
      techSkills: selectedSkills,
    }));
  };


  const handleSoftSkillsChange = (event: SelectChangeEvent<string[]>) => {
    const selectedSkills = event.target.value as string[];
    setData(prevData => ({
      ...prevData,
      softSkills: selectedSkills,
    }));
  };

  const handleNumberOfProfilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setData(prevData => ({
      ...prevData,
      numberOfProfiles: parseInt(value),
    }));
  };

  const handleSave = () => {
    // You might want to do some validation here.
    onSave(originalProfileName,data);
    onClose();
  };

    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
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
            Editar perfil
          </Typography>
          <TextField 
            label="Nombre del perfil" 
            fullWidth
            value={data.profileName}
            onChange={handleProfileNameChange} 
            margin="normal" 
            variant="standard" 
          />
          <InputLabel id="demo-multiple-chip-label" style={{ marginTop: '40px' }}>Habilidades técnicas</InputLabel>
          <Select
            label = "Habilidades técnicas"
            multiple
            fullWidth
            value={data.techSkills}
            onChange={handleTechSkillsChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip 
                    size="small" 
                    key={value} 
                    label={value} 
                    onDelete={() => setTechSkills(data.techSkills.filter((item) => item !== value))} 
                    deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()}/>}
                    />
                ))}
              </Box>
            )}
            variant="standard"
            MenuProps={menuProps}
          >
            {tech_skill.map((skill) => (
        <MenuItem key={skill.value} value={skill.label}>
            {skill.label}
        </MenuItem>
    ))}
          </Select>
          <InputLabel id="demo-multiple-chip-label2" style={{ marginTop: '40px'}}>Habilidades blandas</InputLabel>
          <Select
            multiple
            fullWidth
            value={data.softSkills}
            onChange= {handleSoftSkillsChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip 
                    size="small" 
                    key={value} 
                    label={value} 
                    onDelete={() => setSoftSkills(data.softSkills.filter((item) => item !== value))}
                    deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()}/>}
                    />
                ))}
              </Box>
            )}
            variant="standard"
          >
            {soft_skill.map((skill) => (
        <MenuItem key={skill.value} value={skill.label}>
            {skill.label}
        </MenuItem>
    ))}
          </Select>
          {/* Num perfiles */}
          <TextField 
            label="Número de perfiles" 
            fullWidth 
            margin="normal" 
            variant="standard" 
            type="number"
            value={data.numberOfProfiles}
            onChange= {handleNumberOfProfilesChange}
            style={{ marginTop: '40px' }} 
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button variant="outlined" onClick={onClose}>
              CANCELAR
            </Button>
            <Button 
            variant="contained" 
            onClick={handleSave}  
            sx={{
                    px: 3,
                    backgroundColor: "#A15CAC",
                    "&:hover": {
                      backgroundColor: "#864D8F",
                    },
                  }}>
              EDITAR
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }

export default EditProfileModal;