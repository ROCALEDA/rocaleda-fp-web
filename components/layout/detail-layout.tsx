import { Box } from "@mui/material";
import { ReactNode } from "react";
import CustomBreadcrumbs from "@/components/breadcrumbs/breadcrumbs";

interface LayoutProps {
  children: ReactNode;
}

export default function DetailLayout({ children }: LayoutProps) {
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
      <Box>{children}</Box>
    </Box>
  );
}
