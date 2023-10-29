"use client";
import React from 'react';
import { Card, CardContent, Typography,Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';

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

export default function DetailProject({data = defaultData}) {
    return (
        <>
            {data.map((project) => {
                // Define las propiedades del chip en base al estado del equipo
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
                        <Card sx={{ minWidth: 275}}>
                            <CardContent style={{ display: 'flex', flexDirection: 'row', maxHeight: '70px',justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" >
                                    {project.name}
                                </Typography>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '8px', marginLeft: '20px' }}>
                                <Chip size="small" icon={<PeopleIcon fontSize="small"/>} label={project.total_positions} sx={{'& .MuiChip-label': {fontSize: '1rem'}}}/>
                                <Chip size="small" {...chipProps}  sx={{ '& .MuiChip-label': {fontSize: '1rem'}, marginLeft:'20px' }}/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
        </>
    );
}
