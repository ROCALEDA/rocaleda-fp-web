"use client";
import React, {useState} from 'react';
import { Box, Card, CardContent, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Position {
    id: number;
    is_open: boolean;
    name: string;
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

export default function SelectedProject({ project }: SelectedProjectProps) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    if (!project) return null;

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
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${position.id}-content`}
                            id={`panel${position.id}-header`}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Typography color="textSecondary">Perfil - {position.name}</Typography>
                            </div>
                            {/*<Chip size="small" icon={<PeopleIcon fontSize="small" />} label={project.total_positions} sx={{ '& .MuiChip-label': { fontSize: isSmallScreen ? '0.8rem' : '1rem' } }} />*/}
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            </CardContent>
        </Card>
        </Box>
    );

}