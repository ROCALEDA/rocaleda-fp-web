"use client";
import React, { useState, useEffect, useCallback, MouseEvent, KeyboardEvent } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
} from "@mui/material";
//import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";
import { Project, Candidate } from "@/types/types";
import OpenModalButton from '../techtest/openModal';
import TechTestModal from '../techtest/techtestModal';
import { useTranslations } from "next-intl";

interface SelectedProjectProps {
  project: Project | null;
}

const initialState: Record<number, Candidate[]> = {};

export default function SelectedProject({ project }: SelectedProjectProps) {
  const lang = useTranslations("Projects");

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] =
    useState<Record<number, Candidate[]>>(initialState);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [selectedCandidates, setSelectedCandidates] = useState<
    Record<number, number | null>
  >({});
  const [selectionCompleted, setSelectionCompleted] = useState<
    Record<number, boolean>
  >({});

  interface SubmitTriggerType {
    positionId: number;
    candidateId: number | null;
  }

  const [submitTrigger, setSubmitTrigger] = useState<SubmitTriggerType | null>(
    null
  );

  const fetchCandidates = useCallback(
    async (positionId: number) => {
      if (!session) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/positions/${positionId}/candidates`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const candidatesData: Candidate[] = await response.json();
        setCandidates((prevCandidates) => ({
          ...prevCandidates,
          [positionId]: candidatesData,
        }));
      } catch (error) {
        console.error("Error al obtener los candidatos:", error);
        setError("Error al cargar los datos de los candidatos");
      } finally {
        setIsLoading(false);
      }
    },
    [session]
  );

  useEffect(() => {
    if (!project) return;

    project.positions
      .filter((pos) => pos.is_open)
      .forEach((position) => {
        fetchCandidates(position.id);
      });
  }, [project, fetchCandidates]);

  const handleSelectCandidate = useCallback(
    (positionId: number, candidateId: number) => {
      setSelectedCandidates((prevSelected) => ({
        ...prevSelected,
        [positionId]: candidateId,
      }));
    },
    []
  );

  const handleSelectionComplete = useCallback(
    (positionId: number) => {
      setSubmitTrigger({
        positionId,
        candidateId: selectedCandidates[positionId],
      });
      setSelectionCompleted((prevState) => ({
        ...prevState,
        [positionId]: !prevState[positionId],
      }));
    },
    [selectedCandidates]
  );

  const submitSelectedCandidate = useCallback(
    async (positionId: number, candidateId: number) => {
      if (!session) return;

      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/positions/${positionId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`,
          },
          body: JSON.stringify({ candidate_id: candidateId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(
          `Candidate ${candidateId} successfully submitted for position ${positionId}`
        );
      } catch (error) {
        console.error("Error al enviar el candidato seleccionado:", error);
        setError("Error al enviar los datos del candidato");
      } finally {
        setIsLoading(false);
      }
    },
    [session]
  );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true); 
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    
    if (!project) return null;
    if (project.is_team_complete) return null
    if (isLoading) return <p>Cargando...</p>;
    
    
    //console.log('selectionCompleted:', selectionCompleted);
    //console.log('candidates:', candidates);
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
                    <Accordion key={position.id} style={{ marginBottom: '5px' }} expanded={selectionCompleted[position.id]}>
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
                            <Box sx={{ width: 'fit-content', mt: 2 }}> 
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!candidates[position.id] || candidates[position.id].length === 0} 
                                sx={{ backgroundColor: "#A15CAC", "&:hover": { backgroundColor: "#864D8F" } }}
                                onClick={() => handleSelectionComplete(position.id)}
                            >
                                Seleccionar
                            </Button>
                        </Box>
                        </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}> 
                <OpenModalButton onOpen={handleOpenModal} project={project}/>
                <TechTestModal open={isModalOpen} onClose={handleCloseModal} project={project} />
            </Box>
            </CardContent>
            
        </Card>
        
        </Box>
    );

}
