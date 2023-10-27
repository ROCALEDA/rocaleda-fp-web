"use client"
import React from 'react';
import { Card, CardContent, Typography, Box, Button, Chip} from '@mui/material';
import PeopleIcon from '@mui/icons-material/PersonOutlineOutlined';


export default function CustomCard( {number = 5} ) {
  return (
    <Box margin={5}>
    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher', mt: 10 }} >Tu proyecto</Typography>
    <Card sx={{ width: { xs: '90%', xl: '50%'}, p:2 }}>
    <CardContent>
      <Box display="flex"  alignItems="center">
        <Typography variant="h5" sx = {{mr:2}}>
          Centro de estudiantes
        </Typography>
        <Chip label="Equipo pendiente" size="small" />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-start" mt={2}>
      <Chip 
        icon={<PeopleIcon sx={{ "&&": { color: "#864D8F" } }}/>} 
        label= {number}
        sx={{ backgroundColor: '#FAE8FF',
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
