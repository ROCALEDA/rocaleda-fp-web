import React from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button, Slider,FormControl,InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Image from 'next/image';
import { philosopher } from "@/app/[locale]/theme/fonts";

interface TechTestModalProps {
    open: boolean;
    onClose: () => void;
  }


const TechTestModal: React.FC<TechTestModalProps> = ({ open, onClose }) => {
    const [selectedProject, setSelectedProject] = React.useState<number | ''>('');
    const [selectedProfile, setSelectedProfile] = React.useState<number | ''>('');
    const [selectedCandidate, setSelectedCandidate] = React.useState<number | ''>('');

    const handleProjectChange = (event: SelectChangeEvent<number>) => {
        setSelectedProject(+event.target.value);
    };
    
    const handleProfileChange = (event: SelectChangeEvent<number>) => {
        setSelectedProfile(+event.target.value);
    };
    
    const handleCandidateChange = (event: SelectChangeEvent<number>) => {
        setSelectedCandidate(+event.target.value);
    };

      const handleClose = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, reason?: "backdropClick" | "escapeKeyDown") => {
        // Solo llama a onClose si el motivo es presionar el botón "Cancelar"
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          onClose();
        }
      };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: '50px',
        borderRadius: 2,
        width: 600, 
        maxWidth: 'calc(100% - 40px)', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        overflow: 'hidden',
      };
      const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 100,
          label: '100',
        },
      ];
    return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="tech-test-modal-title"
          aria-describedby="tech-test-modal-description"
        >
          <Box sx={style} >
            {/* Título */}
            <Box sx={{ position: 'relative', width: '100%', height: '80px' }}>
                <Typography variant="h4" component="h2" sx={{ width: '100%', textAlign: 'center' }} fontFamily={philosopher.style.fontFamily}>
                Registrar prueba técnica
                </Typography>
            </Box>
            {/* Contenedor principal */}
            <Box sx={{ display: 'flex', width: '100%' }}>
                {/* Contenedor para los Selects */}
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                    <FormControl variant="standard" sx={{ m: 1, width: '90%' }} size="small">
                        <InputLabel id="proyectos_customer">Proyecto</InputLabel>
                        <Select
                        labelId="proyectos_customer"
                        id="proyecto-select"
                        value={selectedProject}
                        onChange={handleProjectChange}
                        >
                            <MenuItem value={1}>Centro de estudiantes</MenuItem>
                            <MenuItem value={2}>Proyecto y</MenuItem>
                            <MenuItem value={3}>Proyecto x</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, width: '90%' }} size="small">
                        <InputLabel id="perfil_candidate">Perfil</InputLabel>
                        <Select
                        labelId="perfil_candidate"
                        id="profile-select"
                        value={selectedProfile}
                        onChange={handleProfileChange}
                        >
                            <MenuItem value={1}>Frontend Engineer</MenuItem>
                            <MenuItem value={2}>Backend Engineer</MenuItem>
                            <MenuItem value={3}>DevOps Engineer</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, width: '90%' }} size="small">
                        <InputLabel id="name_candidate">Candidato</InputLabel>
                        <Select
                        labelId="name_candidate"
                        id="candidate-select" 
                        value={selectedCandidate}
                        onChange={handleCandidateChange}
                        >
                            <MenuItem value={1}>Stephanny Jimenez</MenuItem>
                            <MenuItem value={2}>Roberto Parra</MenuItem>
                            <MenuItem value={3}>Daniela</MenuItem>
                        </Select>
                        </FormControl>
                    </Box>

                    {/* Contenedor para la imagen */}
                    <Box>
                        <Image src="/images/figures.png" alt="Figure" width={180} height={180} />
                    </Box>
                </Box>
            <FormControl fullWidth sx={{ m: 1,mt:4 }}>
          <TextField id="standard-basic" label="Descripción de habilidades técnicas" variant="standard" multiline maxRows={4}/>
          </FormControl>
        <Slider 
            defaultValue={30} 
            aria-label="Default" 
            valueLabelDisplay="auto"
            step={1} 
            sx={{ mb: 2 ,mt:4}}
            marks={marks}
         />
        <FormControl fullWidth sx={{ m: 1,mt:4 }}>
          <TextField id="standard-basic" label="Descripción de habilidades blandas" variant="standard" multiline maxRows={4}/>
          </FormControl>
        <Slider 
            defaultValue={20} 
            aria-label="Default" 
            valueLabelDisplay="auto" 
            step={1} 
            sx={{ mb: 2 ,mt:4}}
            marks={marks} 
            />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 8, mb: 4 }}>
            <Button 
                variant="outlined" 
                onClick={() => onClose()} 
                sx={{ flexGrow: 1, mr: 1 }} 
            >
                CANCELAR
            </Button>
            <Button 
                variant="contained" 
                sx={{ flexGrow: 1, ml: 1, backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
            >
                REGISTRAR PRUEBA
            </Button>
        </Box>
            
          </Box>
        </Modal>
      );
};

export default TechTestModal;