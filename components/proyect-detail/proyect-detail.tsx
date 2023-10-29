import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';


export default function DetailProyect() {
    return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Proyecto 1
                    </Typography>
                </CardContent>
            </Card>
    );
}
