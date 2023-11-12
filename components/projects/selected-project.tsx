"use client";
import React, {useState} from 'react';
import { Box, Card, CardContent, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, FormControlLabel,Checkbox,Button } from '@mui/material';
//import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    id: number;
    name: string;
  }
  


export default function SelectedProject({ project }: SelectedProjectProps) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [selectedCandidates, setSelectedCandidates] = useState<Record<number, number[]>>({});
    const [selectionCompleted, setSelectionCompleted] = useState<Record<number, boolean>>({});

    

    if (!project) return null;

    const mockCandidates = [
        { id: 1, name: 'Stephany Jimenez' },
        { id: 2, name: 'Carlos Rodriguez' },
        { id: 3, name: 'Isabel Ramirez' },
    ];

    const positionsWithCandidates = project.positions.map(pos => ({
        ...pos,
        candidates: mockCandidates 
    }));

    const handleSelectCandidate = (positionId: number, candidateId: number, isSelected: boolean) => {
        setSelectedCandidates(prevSelected => {
            const selectedForPosition = prevSelected[positionId] || [];
            if (isSelected) {
                return { ...prevSelected, [positionId]: [...selectedForPosition, candidateId] };
            } else {
                return { ...prevSelected, [positionId]: selectedForPosition.filter(id => id !== candidateId) };
            }
        });
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
                {positionsWithCandidates.filter(pos => pos.is_open).map((position) => (
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
                            {/* checkbox y boton seleccionar*/}
                            <Box sx={{ display: selectionCompleted[position.id] ? 'block' : 'none' }}>
                                {selectedCandidates[position.id]?.map(candidateId => {
                                    const candidate = mockCandidates.find(c => c.id === candidateId);
                                    return (
                                        <Typography key={candidateId} style={{color: '#718096', fontSize: 16}}>
                                            <WorkspacePremiumIcon style={{ verticalAlign: 'middle', color: '#F3DA90' }} />
                                            {' '}{candidate?.name}
                                        </Typography>
                                    );
                                })}
                            </Box>
                            <Box sx={{ display: selectionCompleted[position.id] ? 'none' : 'flex', flexDirection: 'column' }}>
                            {position.candidates.map(candidate => (
                                <FormControlLabel
                                    key={candidate.id}
                                    style={{color: '#718096', fontSize: 16}}
                                    control={
                                        <Checkbox
                                            checked={selectedCandidates[position.id]?.includes(candidate.id) || false}
                                            onChange={(event) => handleSelectCandidate(position.id, candidate.id, event.target.checked)}
                                            sx={{
                                                
                                                '&.Mui-checked': {
                                                    color: '#A15CAC',
                                                },
                                            }}
                                        />
                                    }
                                    label={candidate.name}
                                />
                            ))}
                                <Box sx={{ width: 'fit-content', mt: 2 }}> 
                                    <Button
                                    type="submit"
                                    variant="contained" 
                                    sx = {{backgroundColor: "#A15CAC","&:hover": { backgroundColor: "#864D8F" }}} 
                                    //onClick={() => console.log('Seleccionados:', selectedCandidates[position.id])}
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
            </CardContent>
        </Card>
        </Box>
    );

}