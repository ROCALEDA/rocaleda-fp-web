import { Box } from '@mui/material';
import { ReactNode } from "react";
import ResponsiveAppBar from "@/components/navbar/navbar";

interface LayoutProps {
    children: ReactNode;
  }

export default function Layout({ children  }: LayoutProps) {
    return (
        <Box 
        role="img"
        alt="Balloon"
            sx={{
                backgroundImage: 'linear-gradient(to right, transparent 50%, transparent 50%), url(/images/cloud3.jpg)',
                backgroundSize: '50% 100%',
                backgroundPosition: 'right',
                position: 'relative',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <ResponsiveAppBar/>

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
                {children}
            </Box>
        </Box>
    );
}
