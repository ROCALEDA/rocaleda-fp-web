import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

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
            {data.map((project) => (
                <div style={{ position: 'relative', padding: '10px 0' }}>
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
                <Card key={project.id} sx={{ minWidth: 275}}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {project.name}
                        </Typography>
                        {/* Aquí puedes agregar más detalles del proyecto si lo deseas */}
                    </CardContent>
                </Card>
                </div>
            ))}
        </>
    );
}
