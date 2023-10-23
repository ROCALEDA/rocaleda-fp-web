"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudIcon from '@mui/icons-material/CloudOutlined';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import LanguageSelector from '../language-selector.tsx/language-selector';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const StyledCloudIcon = styled(CloudIcon)({
    color: '#C36FC5',
    fontSize: '55px'
});

const StyledExitToAppIcon = styled(ExitToAppIcon)({
    color: '#A15CAC'
});

const StyledLogoText1 = styled(Typography)({
    color: '#2D3748',
    marginRight: '5px'
});

const StyledLogoText2 = styled(Typography)({
    color: '#FF0099',
    marginTop: '15px'
});

const StyledOptionButton = styled(Button)({
    color: '#718096',
    marginLeft: '40px',
    marginRight: '40px'
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '.left-section': {
        display: 'flex',
        alignItems: 'center',
        marginRight: 'auto',
    },
    '.right-section': {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
    }
});

function Navbar() {
    return (
    <AppBar position="relative" color="default" elevation={0}>
        <StyledToolbar>
        <div className="left-section">
            <StyledCloudIcon/>
            <StyledLogoText1 variant="h4">Quire</StyledLogoText1>
            <StyledLogoText2 variant="h6">Empresas</StyledLogoText2>
            <StyledOptionButton>Proyectos</StyledOptionButton>
            <StyledOptionButton>Candidatos</StyledOptionButton>
        </div>
        <div className="right-section">
            <LanguageSelector />
            <IconButton edge="start" color="inherit" aria-label="forward"><StyledExitToAppIcon fontSize="large" /></IconButton>
        </div>
        </StyledToolbar>
    </AppBar>
    );
}

export default Navbar;
