import { Box } from '@mui/material';
import { ReactNode } from "react";
import ResponsiveAppBar from "@/components/navbar/empresa";
import EnterpriseBreadcrumbs from "@/components/breadcrumbs/empresas";

interface LayoutProps {
    children: ReactNode;
  }

export default function Layout({ children  }: LayoutProps) {
    return (
        <Box 
            sx={{
                backgroundImage: 'linear-gradient(to right, transparent 50%, transparent 50%), url(/images/cloud4.png)',
                backgroundSize: '50% 100%',
                minHeight: '100vh',
                backgroundPosition: 'right center',
                position: 'relative',
                height: 'auto !important',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div data-testid="responsiveAppBarTestId"><ResponsiveAppBar/></div>
            <Box
                sx={{
                    marginTop: '40px',
                    marginLeft: '20px'
                }}
            >
            <div data-testid="enterpriseBreadcrumbsTestId"><EnterpriseBreadcrumbs/></div>    
                {children}
            </Box>
        </Box>
    );
}