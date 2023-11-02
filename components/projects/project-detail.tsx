"use client";
import React, {useState , useEffect} from 'react';
import { Card, CardContent, Typography,Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";



interface Position {
    id: number;
    is_open: boolean;
    name: string;
  }
  
  interface Project {
    id: number;
    name: string;
    is_team_complete: boolean;
    total_positions: number;
    positions: Position[];
  }
  
  interface DetailProjectProps {
    data?: Project[];
    setSelectedProject?: (project: Project) => void;
}

export default function DetailProject({ setSelectedProject }: DetailProjectProps ) {
    const { data: session } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session) {
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
    }, [session]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!projects.length) return <p>No hay proyectos para mostrar</p>;

    return (
        <>
            {projects.map((project) => {
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
                            onClick={() => setSelectedProject ? setSelectedProject(project) : null}
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
        </>
    );
}
