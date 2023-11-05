import { Box } from "@mui/material";
import { ReactNode } from "react";
import Navbar from "../navbar/navbar";
import CustomBreadcrumbs from "@/components/breadcrumbs/breadcrumbs";

interface LayoutProps {
  children: ReactNode;
}

const routes = [
  { name: "Home", path: "/home" },
  { name: "Proyectos", path: "/projects" },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(to right, transparent 50%, transparent 50%), url(/images/cloud4.png)",
        backgroundSize: "50% 100%",
        minHeight: "100vh",
        backgroundPosition: "right center",
        position: "relative",
        height: "auto !important",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div data-testid="responsiveAppBarTestId">
        <Navbar />
      </div>
      <Box
        sx={{
          marginTop: "40px",
          marginLeft: "20px",
        }}
      >
        <div data-testid="CustomBreadcrumbsTestId">
          <CustomBreadcrumbs routes={routes} paddingLeft="0px" />
        </div>
        {children}
      </Box>
    </Box>
  );
}
