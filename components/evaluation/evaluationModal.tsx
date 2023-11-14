import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button, Slider,FormControl,InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Image from 'next/image';
import { philosopher } from "@/app/[locale]/theme/fonts";
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";
import { Project, PositionComplete } from "@/types/types";

interface EvalModalModalProps {
    open: boolean;
    onClose: () => void;
}


const EvalModal: React.FC<EvalModalModalProps> = ({ open, onClose }) => {
    const { data: session } = useSession();
    const [selectedProject, setSelectedProject] = useState<number | "">('');
    const [selectedProfile, setSelectedProfile] = useState<number | ''>('');
    const [positions, setPositions] = useState<PositionComplete[]>([]);
    const [selectedCandidateName, setSelectedCandidateName] = useState('');

    const resetModal = () => {
        setSelectedProject('');
        setSelectedProfile('');
        setSelectedCandidateName('');
        setPositions([]);
    };

    const handleProjectChange = async (event: SelectChangeEvent<number>) => {
        const projectId = event.target.value === "" ? "" : Number(event.target.value);
        setSelectedProject(projectId);
        setSelectedProfile('');
        setSelectedCandidateName('');
        if (projectId) {
            try {
                const response = await fetch(`${API_URL}/positions/closed/${projectId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.user?.token}`,
                    }});
                if (response.ok) {
                    const data: PositionComplete[] = await response.json();
                    setPositions(data);
                } else {
                    console.error('Failed to fetch positions:', response.status);
                }
            } catch (error) {
                console.error('Error fetching positions:', error);
            }
        }
    };
    
    const handleProfileChange = (event: SelectChangeEvent<number>) => {
        const profileId = event.target.value as number;
        setSelectedProfile(profileId);

        const selectedPosition = positions.find(pos => pos.position_id === profileId);
        if (selectedPosition) {
            setSelectedCandidateName(selectedPosition.candidate_name);
        } else {
            setSelectedCandidateName('');
        }
    };
    

    const handleClose = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, reason?: "backdropClick" | "escapeKeyDown") => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            onClose();
        }
    };
    const handleCancel = () => {
        resetModal();
        onClose();
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
      const [closedProject, setProjects] = useState<Project[]>([]);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        if (open && session) {
          setIsLoading(true);
          fetch(`${API_URL}/customer/projects`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user?.token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setProjects(data);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error("Error al obtener los proyectos:", error);
              setError("Error al cargar los datos");
              setIsLoading(false);
            });
        }
      }, [open, session]);


    const completedProjectDetails = closedProject
    .filter(closedProject => closedProject.is_team_complete)
    .map(closedProject => {
        return {
            id: closedProject.id,
            name: closedProject.name
        };
    });

    //console.log(completedProjectDetails);

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
                Evaluar desempeño
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
                            {completedProjectDetails.map((project) => (
                                <MenuItem key={project.id} value={project.id}>
                                    {project.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, width: '90%' }} size="small">
                        <InputLabel id="perfil_candidate">Perfil</InputLabel>
                        <Select
                        labelId="perfil_candidate"
                        id="profile-select"
                        value={selectedProfile}
                        onChange={handleProfileChange}
                        >{positions.map((position) => (
                            <MenuItem key={position.position_id} value={position.position_id}>
                                    {position.position_name}
                            </MenuItem>
                        
                        ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, width: '90%' }} size="small">
                        <TextField
                            id="candidate-name"
                            label="Candidato"
                            variant="standard"
                            value={selectedCandidateName}
                            InputProps={{readOnly: true}}
                        />
                    </FormControl>
                    </Box>

                    {/* Contenedor para la imagen */}
                    <Box>
                        <Image src="/images/figures.png" alt="Figure" width={180} height={180} />
                    </Box>
                </Box>
            <FormControl fullWidth sx={{ m: 1,mt:4 }}>
          <TextField id="standard-basic" label="Descripción de calificación" variant="standard" multiline maxRows={4}/>
          </FormControl>
        <Slider 
            defaultValue={30} 
            aria-label="Default" 
            valueLabelDisplay="auto"
            step={1} 
            sx={{ mb: 2 ,mt:4}}
            marks={marks}
         />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 8, mb: 4 }}>
            <Button 
                variant="outlined" 
                //onClick={() => onClose()}
                onClick={handleCancel} 
                sx={{ flexGrow: 1, mr: 1 }} 
            >
                CANCELAR
            </Button>
            <Button 
                variant="contained" 
                sx={{ flexGrow: 1, ml: 4, backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
            >
                CALIFICAR CANDIDATO
            </Button>
        </Box>
            
          </Box>
        </Modal>
      );
};

export default EvalModal;