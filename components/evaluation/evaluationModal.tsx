import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button, Slider,FormControl,InputLabel,Skeleton } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Image from 'next/image';
import { philosopher } from "@/app/[locale]/theme/fonts";
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";
import { Project, PositionComplete, FormErrors } from "@/types/types";
import * as yup from 'yup';
import { enqueueSnackbar } from "notistack";

interface EvalModalModalProps {
    open: boolean;
    onClose: () => void;
}

const validationSchema = yup.object({
    project_id: yup.number().nullable().required('El proyecto es obligatorio'),
    name: yup.string().required('El perfil es obligatorio'),
    candidate_id: yup.number().nullable().required('El candidato es obligatorio'),
    score: yup.number().min(0).max(100).required('La puntuación es obligatoria'),
    observations: yup.string().trim().min(1, 'Las observaciones no pueden estar vacías').required('Las observaciones son obligatorias')
});

const EvalModal: React.FC<EvalModalModalProps> = ({ open, onClose }) => {
    const { data: session } = useSession();
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<{ id: number | null, text: string }>({ id: null, text: '' });
    const [positions, setPositions] = useState<PositionComplete[]>([]);
    const [score, setScore] = useState(30);
    const [observations, setObservations] = useState('');
    const [closedProject, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState({
        project_id: '',
        name: '',
        candidate_id: '',
        score: '',
        observations: ''
    });

    const resetModal = () => {
        setSelectedProject(null);
        //setSelectedProfile('');
        setPositions([]);
        setScore(30);
        setErrors({
            project_id: '',
            name: '',
            candidate_id: '',
            score: '',
            observations: ''
        });
    };

    const handleProjectChange = (event: SelectChangeEvent<number>) => {
        const projectId = event.target.value === "" ? null : Number(event.target.value);
        setSelectedProject(projectId);
    
        setSelectedProfile({ id: null, text: '' });
        //setSelectedCandidateName('');
        setErrors({
            project_id: '',
            name: '',
            candidate_id: '',
            score: '',
            observations: ''
        });
    };
    
    const handleProfileChange = (event: SelectChangeEvent<number>) => {
        const profileId = Number(event.target.value);
        const selectedPosition = positions.find(pos => pos.position_id === profileId);
        if (selectedPosition) {
            setSelectedProfile({
                id: profileId,
                text: `${selectedPosition.candidate_name} - ${selectedPosition.position_name}`
            });
        } else {
            setSelectedProfile({ id: null, text: '' });
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
      
      useEffect(() => {
        const fetchProjects = async () => {
          if (!open || !session) {
            return;
          }
          setIsLoading(true);
          try {
            const response = await fetch(`${API_URL}/customer/projects`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user?.token}`,
              },
            });
      
            if (!response.ok) {
              throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const projectsData = await response.json();
            setProjects(projectsData);
          } catch (error) {
            console.error("Error al obtener los proyectos:", error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchProjects();
      }, [open, session]);

      useEffect(() => {
        const fetchProfiles = async () => {
          if (!selectedProject || !session) {
            setPositions([]);
            setIsLoading(false);
            return;
          }
          setIsLoading(true); 
          try {
            const response = await fetch(`${API_URL}/positions/closed/${selectedProject}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user?.token}`,
              },
            });
      
            if (!response.ok) {
              throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
      
            const profilesData = await response.json();
            setPositions(profilesData);
          } catch (error) {
            console.error('Error fetching positions:', error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchProfiles();
      }, [selectedProject, session]);

    const completedProjectDetails = closedProject
    .filter(closedProject => closedProject.is_team_complete)
    .map(closedProject => {
        return {
            id: closedProject.id,
            name: closedProject.name
        };
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const selectedPosition = positions.find(pos => pos.position_id === selectedProfile.id);
        const candidateId = selectedPosition ? selectedPosition.candidate_id : null;
        const positionName = selectedPosition ? selectedPosition.position_name : '';
    
        const formData = {
            project_id: selectedProject,
            name: positionName,
            candidate_id: candidateId,
            score,
            observations
        };
    
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log(formData);
            const response = await fetch(`${API_URL}/positions/evaluations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.token}`,
                },
                body: JSON.stringify(formData),
                });

            if (response.ok) {
                    enqueueSnackbar("Evaluación enviada con éxito", { variant: "success" });
                    resetModal(); 
                    onClose(); 
                } else {
                    enqueueSnackbar(`Error ${response.status}: ${response.statusText}`, {
                        variant: "error",
                    });
                }
            
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors = err.inner.reduce<FormErrors>((acc, currentError) => {
                    const path = currentError.path || ""; 
                    return {
                        ...acc,
                        [path]: currentError.message
                    };
                }, {
                    project_id: '',
                    name: '',
                    candidate_id: '',
                    score: '',
                    observations: ''
                });
                setErrors(newErrors);
                enqueueSnackbar('Error en la validación del formulario', { variant: 'error' });
            }
        }
    };

    return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="tech-test-modal-title"
          aria-describedby="tech-test-modal-description"
        >
          <Box sx={style} >
          <form onSubmit={handleSubmit}>
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
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 240 , width: '100%',pb:6 }} size="small">
                        <InputLabel id="proyectos_customer">Proyecto</InputLabel>
                        {/* {isLoading ? (<Skeleton variant="rectangular" height={40} />) : ( */}
                        <Select
                        labelId="proyectos_customer"
                        id="proyecto-select"
                        value={selectedProject ?? ""}
                        onChange={handleProjectChange}
                        >
                            {completedProjectDetails.map((project) => (
                                <MenuItem key={project.id} value={project.id}>
                                    {project.name}
                                </MenuItem>
                            ))}
                        </Select>
                       {/*  )} */}
                        <Typography color="error">{errors.project_id}</Typography>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 240 ,width: '100%' }} size="small">
                        <InputLabel id="perfil_candidate">Colaborador</InputLabel>
                        {isLoading ? (<Skeleton variant="rectangular" height={40} />) : (
                        <Select
                        labelId="perfil_candidate"
                        id="profile-select"
                        value={selectedProfile.id ?? ""}
                        onChange={handleProfileChange}
                        renderValue={selectedProfile.id !== null ? () => selectedProfile.text : undefined}
                    >
                        {positions.map((position) => (
                            <MenuItem key={position.position_id} value={position.position_id}>
                            {`${position.candidate_name} - ${position.position_name}`}
                        </MenuItem>
                        ))}
                    </Select>
                        )}
                        <Typography color="error">{errors.name}</Typography>
                    </FormControl>
                    </Box>
                    {/* Contenedor para la imagen */}
                    <Box>
                        <Image src="/images/figures.png" alt="Figure" width={180} height={180} />
                    </Box>
                </Box>
            <FormControl fullWidth sx={{ m: 1,mt:4 }}>
            <TextField 
                id="standard-basic" 
                label="Descripción de calificación" 
                variant="standard"
                onChange={(e) => setObservations(e.target.value)}  
                multiline 
                maxRows={4}/>
                <Typography color="error">{errors.observations}</Typography>
            </FormControl>
                <Slider 
                    defaultValue={30} 
                    aria-label="Default" 
                    valueLabelDisplay="auto"
                    value={score}
                    onChange={(e, value) => setScore(value as number)} 
                    step={1} 
                    sx={{ mb: 2 ,mt:4}}
                    marks={marks}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 8, mb: 4 }}>
                    <Button 
                        variant="outlined" 
                        //onClick={() => onClose()}
                        onClick={handleCancel} 
                        sx={{ width: '48%', mr: '4%' }} 
                    >
                        CANCELAR
                    </Button>
                    <Button
                        type="submit" 
                        variant="contained" 
                        sx={{  width: '48%', backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
                    >
                        CALIFICAR CANDIDATO
                    </Button>
                </Box>
            </form>
          </Box>
        </Modal>
      );
};

export default EvalModal;