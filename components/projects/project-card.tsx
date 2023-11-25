"use client";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TSimpleProject } from "@/types/types";
import { useTranslations } from "next-intl";
import PeopleIcon from "@mui/icons-material/PersonOutlineOutlined";

type ProjectCardProps = {
  project: TSimpleProject;
  setSelectedProject?: (project: TSimpleProject) => void;
};

export default function ProjectCard({
  project,
  setSelectedProject,
}: ProjectCardProps) {
  const lang = useTranslations("Projects");

  const chipProps = project.is_team_complete
    ? { label: lang("team_complete"), color: "success" }
    : { label: lang("team_pending"), color: "warning" };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Card
      key={project.id}
      onClick={() => (setSelectedProject ? setSelectedProject(project) : null)}
      sx={{
        position: "relative",
        overflow: "visible",
        minWidth: 400,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -10,
          left: -10,
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: project.is_team_complete ? "#B1E5D9" : "#F3DA90",
        }}
      />
      <CardContent
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          maxHeight: isSmallScreen ? "auto" : "70px",
          justifyContent: "space-between",
          alignItems: isSmallScreen ? "flex-start" : "center",
        }}
      >
        <Typography
          variant="subtitle1"
          style={{ marginBottom: isSmallScreen ? "10px" : "0" }}
        >
          {project.name}
        </Typography>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: isSmallScreen ? "0" : "8px",
          }}
        >
          <Chip
            size="small"
            icon={<PeopleIcon fontSize="small" />}
            label={project.total_positions}
            sx={{
              "& .MuiChip-label": {
                fontSize: isSmallScreen ? "0.8rem" : "1rem",
              },
            }}
          />
          <Chip
            size="small"
            {...chipProps}
            color={
              chipProps.color as
                | "success"
                | "warning"
                | "default"
                | "primary"
                | "secondary"
                | "error"
                | "info"
            }
            sx={{
              "& .MuiChip-label": {
                fontSize: isSmallScreen ? "0.8rem" : "1rem",
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
