import DetailLayout from "@/components/layout/detail-layout";
import { Box } from "@mui/material";
import Navbar from "../navbar/navbar";
import ProjectList from "./project-list";

export default function Proyects() {
  return (
    <Box>
      <Navbar />
      <DetailLayout>
        <ProjectList />
      </DetailLayout>
    </Box>
  );
}
