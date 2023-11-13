"use client";
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, FormControlLabel,Checkbox,Button, Radio, RadioGroup } from '@mui/material';
//import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";

interface Position {
    id: number;
    is_open: boolean;
    name: string;
    candidates: Candidate[];
}
  
  interface Project {
    name: string;
    is_team_complete: boolean;
    positions: Position[];
    total_positions: number;
  }
  
  interface SelectedProjectProps {
    project: Project | null;
  }

  interface Candidate {
    user_id: number;
    fullname: string;
  }
  
const initialState: Record<number, Candidate[]> = {};

export default function SelectedProject({ project }: SelectedProjectProps) {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [candidates, setCandidates] = useState<Record<number, Candidate[]>>(initialState);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    //const [selectedCandidates, setSelectedCandidates] = useState<Record<number, number[]>>({});
    const [selectedCandidates, setSelectedCandidates] = useState<Record<number, number | null>>({});
    const [selectionCompleted, setSelectionCompleted] = useState<Record<number, boolean>>({});

    const fetchCandidates = async (positionId: number) => {
        if (!session) return;
      
        setIsLoading(true);
        try {
          const response = await fetch(`${API_URL}/positions/${positionId}/candidates`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.token}`, // Asegúrate de que el token está siendo accedido correctamente
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const candidatesData: Candidate[] = await response.json();
          //console.log('Candidates data for position', positionId, candidatesData);
          setCandidates(prevCandidates => ({
            ...prevCandidates,
            [positionId]: candidatesData, 
          }));
        } catch (error) {
          console.error("Error al obtener los candidatos:", error);
          setError("Error al cargar los datos de los candidatos");
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        if (!project) return;
        
        project.positions.filter(pos => pos.is_open).forEach((position) => {
            fetchCandidates(position.id);
        });
    }, [project]);


    if (!project) return null;
    if (isLoading) return <p>Cargando...</p>;
    

    const handleSelectCandidate = (positionId: number, candidateId: number) => {
        setSelectedCandidates(prevSelected => ({
            ...prevSelected,
            [positionId]: candidateId
        }));
    };
    

    const handleSelectionComplete = (positionId: number) => {
        setSelectionCompleted(prevState => ({
            ...prevState,
            [positionId]: !prevState[positionId],
        }));
    };

    return (
        <Box mt={8} display="flex" justifyContent="center">
        <Card style={{ width: isSmallScreen ? '200%' : '80%' }} elevation={3}>
            <CardContent sx={{ margin: '20px' }}>
            <Box display="flex"  alignItems="center">
                <Typography variant="h5" sx={{mr:2}}>
                    {project.name}
                </Typography>
                <Chip size='small' label={project.is_team_complete ? "Equipo completo" : "Equipo pendiente"}  />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" mt={2}>
                <Typography variant="subtitle1">Posiciones abiertas</Typography>
            </Box>
                {/* Acordeón con las posiciones disponibles */}
            <Box display="flex" flexDirection="column"  mt={2} mb={10}>
                {project.positions.filter(pos => pos.is_open).map((position) => (
                    <Accordion key={position.id} style={{ marginBottom: '5px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${position.id}-content`} id={`panel${position.id}-header`}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Typography color="textSecondary">Perfil - {position.name}</Typography>
                            </div>
                            {/*<Chip size="small" icon={<PeopleIcon fontSize="small" />} label={project.total_positions} sx={{ '& .MuiChip-label': { fontSize: isSmallScreen ? '0.8rem' : '1rem' } }} />*/}
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                        {/* Contenedor para los candidatos seleccionados */}
                        <Box sx={{ display: selectionCompleted[position.id] ? 'block' : 'none' }}>
                        {selectedCandidates[position.id] != null && (
                                (() => {
                                    const candidateId = selectedCandidates[position.id];
                                    const candidate = candidates[position.id]?.find(c => c.user_id === candidateId);
                                    return candidate ? (
                                        <Typography key={candidateId} style={{color: '#718096', fontSize: 16}}>
                                            <WorkspacePremiumIcon style={{ verticalAlign: 'middle', color: '#F3DA90' }} />
                                            {' '}{candidate.fullname}
                                        </Typography>
                                    ) : null;
                                })()
                            )}
                        </Box>
                        {/* Contenedor para los checkboxes */}
                        <Box sx={{ display: selectionCompleted[position.id] ? 'none' : 'flex', flexDirection: 'column' }}>
                            <RadioGroup
                                value={selectedCandidates[position.id] || ''}
                                onChange={(event) => handleSelectCandidate(position.id, Number(event.target.value))}
                            >
                            {candidates[position.id]?.map(candidate => (
                                <FormControlLabel
                                    key={candidate.user_id}
                                    value={candidate.user_id}
                                    control={<Radio sx={{ '&.Mui-checked': { color: '#A15CAC' } }} />}
                                    label={candidate.fullname}
                                />
                            ))}
                            </RadioGroup>
                        </Box>

                        <Box sx={{ width: 'fit-content', mt: 2 }}> 
                            <Button
                                type="submit"
                                variant="contained" 
                                sx={{ backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
                                onClick={() => handleSelectionComplete(position.id)}
                            >
                                Seleccionar
                            </Button>
                        </Box>
  
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            </CardContent>
        </Card>
        </Box>
    );

}