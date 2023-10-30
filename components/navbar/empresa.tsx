"use client";
import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Menu,
    MenuItem
} from '@mui/material';
import CloudIcon from '@mui/icons-material/CloudOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import LanguageSelector from '../language-selector.tsx/language-selector';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';


const StyledCloudIcon = styled(CloudIcon)({
    color: '#C36FC5',
    fontSize: '55px'
});

const StyledExitToAppIcon = styled(ExitToAppIcon)({
    marginLeft: '30px',
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event:any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <AppBar position="relative" color="default" elevation={1} style={{ backgroundColor: 'white' }}>
            <StyledToolbar>
            <div className="left-section">
                <StyledCloudIcon data-testid="cloud-icon"/>
                <StyledLogoText1 variant="h4">Quire</StyledLogoText1>
                <StyledLogoText2 variant="h6">Empresas</StyledLogoText2>
                {isMobile ? (
                  <IconButton onClick={handleClick}>
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <>
                    <Link href="/proyecto"><StyledOptionButton>Proyectos</StyledOptionButton></Link>
                    <Link href="/candidato"><StyledOptionButton>Candidatos</StyledOptionButton></Link>
                  </>
                )}
            </div>
            <div className="right-section">
                <LanguageSelector />
                <Link href="/login">
                <IconButton edge="start" color="inherit" aria-label="forward">
                    <StyledExitToAppIcon fontSize="large" />
                </IconButton>
                </Link>
            </div>
            </StyledToolbar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link href="/proyecto">Proyectos</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link href="/candidato">Candidatos</Link>
                </MenuItem>
            </Menu>
        </AppBar>
    );
}

export default Navbar;
