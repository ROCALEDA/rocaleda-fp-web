"use client"
import React from 'react';
import { Card, CardContent, Typography, Box, Button, Chip} from '@mui/material';
import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';


export default function CustomCard( {number = 5} ) {
  return (
    <Box>
    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher', mt: 10 }} >Tu proyecto</Typography>
    <Card>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">
          Centro de estudiantes
        </Typography>
        <Button variant="contained" style={{ borderRadius: 20, borderColor: '#D5D5D5', color: 'black', backgroundColor: '#E2E8F0'}} disableElevation>
          Equipo pendiente
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-start" mt={2}>
      <Chip 
        icon={<PeopleIcon sx={{ "&&": { color: "#864D8F" } }}/>} 
        label= {number}
        sx={{ backgroundColor: '#E2C4F6',
        '& .MuiChip-label': {
            fontSize: '1.2rem', 
          }}}/>
        
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Plataforma para estudiantes, con cursos, recursos de aprendizaje y actividades interactivas.
        </Typography>
      </Box>
    </CardContent>
  </Card>
  </Box>
  );
}
