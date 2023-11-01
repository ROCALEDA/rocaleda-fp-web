"use client";
import React, {useState} from 'react';
import { Card, CardContent, Typography,Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const defaultData =[
    {
        "id": 1,
        "name": "Proyecto prueba",
        "is_team_complete": false,
        "total_positions": 2,
        "positions": [
            {
                "id": 1,
                "is_open": true,
                "name": "Desarrollador Frontend"
            },
            {
                "id": 2,
                "is_open": true,
                "name": "Desarrollador Backend"
            }
        ]
    },
    {
        "id": 3,
        "name": "My little first Proyect",
        "is_team_complete": true,
        "total_positions": 1,
        "positions": [
            {
                "id": 5,
                "is_open": true,
                "name": "FrontEnd Engineer"
            }
        ]
    },
    {
        "id": 11,
        "name": "Mi proyectoy",
        "is_team_complete": false,
        "total_positions": 2,
        "positions": [
            {
                "id": 6,
                "is_open": true,
                "name": "Desarrollador Frontend"
            },
            {
                "id": 7,
                "is_open": true,
                "name": "Desarrollador Backend"
            }
        ]
    }
]

export default function DetailProject({ data = defaultData }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            {data.map((project) => {
                const chipProps = project.is_team_complete
                    ? { label: "Equipo completo", color: "success" }
                    : { label: "Equipo pendiente", color: "warning" };

                return (
                    <div key={project.id} style={{ position: 'relative', padding: '5px 0' }}>
                        <div 
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: project.is_team_complete ? '#B1E5D9' : '#F3DA90',
                                position: 'absolute',
                                left: '-10px',
                                top: '15%',
                                transform: 'translateY(-50%)'
                            }}
                        ></div>
                        <Card 
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            sx={{ minWidth: 425 }}>
                            <CardContent style={{
                                display: 'flex',
                                flexDirection: isSmallScreen ? 'column' : 'row',
                                maxHeight: isSmallScreen ? 'auto' : '70px',
                                justifyContent: 'space-between',
                                alignItems: isSmallScreen ? 'flex-start' : 'center'
                            }}>
                                <Typography variant="h6" style={{ marginBottom: isSmallScreen ? '10px' : '0' }}>
                                    {project.name}
                                </Typography>
                                <div style={{ display: 'flex', gap: '10px', marginTop: isSmallScreen ? '0' : '8px' }}>
                                    <Chip size="small" icon={<PeopleIcon fontSize="small" />} label={project.total_positions} sx={{ '& .MuiChip-label': { fontSize: isSmallScreen ? '0.8rem' : '1rem' } }} />
                                    <Chip size="small" {...chipProps} color={chipProps.color as "success" | "warning" | "default" | "primary" | "secondary" | "error" | "info"} sx={{ '& .MuiChip-label': { fontSize: isSmallScreen ? '0.8rem' : '1rem' } }} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
            {/* Tarjeta de detalle del proyecto */}
            {selectedProject && (
                <Card style={{ marginLeft: '20px' }} elevation={3}>
                    <CardContent>
                        <Typography variant="h5">
                            {selectedProject.name}
                        </Typography>
                        <Chip size='small'label={selectedProject.is_team_complete ? "Equipo completo" : "Equipo pendiente"}  />
                        {/* ... otros detalles del proyecto seleccionado ... */}
                    </CardContent>
                </Card>
            )}
        </>
    );
}
