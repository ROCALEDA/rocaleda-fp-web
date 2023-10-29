
import { Grid, Paper, Typography,Button } from "@mui/material";

export default function ListProyect() {
    return (
        <Grid container style={{ width: '50%' }}>
            <Paper elevation={0} style={{ width: '100%', padding: '20px', marginRight: '400px' }}>
            <Grid container spacing={6}>
            <Grid item xs={10}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Philosopher', paddingTop: 5 }}>
                    Proyectos
                </Typography>
                <Typography variant="subtitle1" gutterBottom color="secondary">
                    Gestiona tus proyectos y tu equipo
                </Typography>
            </Grid>
            <Grid item xs={2}  marginTop={'45px'} display="flex" alignItems="center" justifyContent="flex-end">    
                <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ 
                        borderColor: 'purple', 
                        color: 'purple'
                    }}
                >
                    CREAR
                </Button>   
            </Grid>
            </Grid>
            </Paper>
        </Grid>
    );
}