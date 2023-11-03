import { Box } from '@mui/material';
import { ReactNode } from "react";
import Navbar from "../navbar/navbar";
import CustomBreadcrumbs from "@/components/breadcrumbs/breadcrumbs";

interface LayoutProps {
    children: ReactNode;
  }

const routes = [
    { name: 'Empresas', path: '/' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Crear proyecto', path: '/projects/register' }
];

export default function Layout({ children  }: LayoutProps) {
    return (
        <Box
        component='div' 
        role="img"
        aria-label="Balloon"
            sx={{
                backgroundImage: 'linear-gradient(to right, transparent 50%, transparent 50%), url(/images/cloud3.jpg)',
                backgroundSize: '50% 100%',
                minHeight: '100vh',
                backgroundPosition: 'right center',
                position: 'relative',
                height: 'auto !important',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Navbar/>

            <Box
                sx={{
                    position: 'absolute',
                    top: '100px',
                    left: 0,
                    width: '150px',
                    height: '250px',
                    backgroundImage: 'url(/images/balloon.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}
            ></Box>

            <Box
                sx={{
                    marginTop: '40px'
                }}
            >
                <CustomBreadcrumbs routes={routes} paddingLeft="105px" />
                {children}
            </Box>
        </Box>
    );
}
