"use client";
import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/PersonOutlineOutlined";
import { philosopher } from "@/app/[locale]/theme/fonts";
import { useTranslations } from "next-intl";

type Profile = {
  profileName: string;
  numberOfProfiles: number;
};

type Employee = {
  name: string;
  role: string;
};

type CustomCardProps = {
  proyectName: string;
  proyectDescription: string;
  profiles: Profile[];
  employees: Employee[];
};

export default function ResumeRegisterProyect({
  proyectName,
  proyectDescription,
  profiles,
  employees,
}: CustomCardProps) {
  const lang = useTranslations("Projects");

  const totalProfiles = profiles.reduce(
    (acc, profile) => acc + profile.numberOfProfiles,
    0
  );
  const totalEntities = totalProfiles + employees.length;

  return (
    <Box margin={5}>
      {/* Nombre Proyecto creado */}
      <Typography
        variant="h4"
        gutterBottom
        fontFamily={philosopher.style.fontFamily}
        sx={{ mt: 10 }}
      >
        {lang("your_project")}
      </Typography>
      <Card sx={{ width: { xs: "90%", xl: "50%" }, p: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" sx={{ mr: 2 }}>
              {proyectName}
            </Typography>
            <Chip label="Equipo pendiente" size="small" />
          </Box>
          {/* Descripción Proyecto creada */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            mt={2}
          >
            <Chip
              size="small"
              icon={<PeopleIcon sx={{ "&&": { color: "#864D8F" } }} />}
              label={totalEntities}
              sx={{
                backgroundColor: "#FAE8FF",
                "& .MuiChip-label": {
                  fontSize: "0.8rem",
                },
              }}
            />

            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              {proyectDescription}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {lang("team")}
          </Typography>
          {/* Perfiles creados */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            mt={2}
          >
            {profiles.map(
              (
                profile: { profileName: string; numberOfProfiles: number },
                index: number
              ) => (
                <Card
                  elevation={1}
                  style={{ width: "100%", marginBottom: "3px" }}
                  key={index}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      maxHeight: "40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography component="div" color="textSecondary">
                          {lang("profile")}-{profile.profileName}
                        </Typography>
                      </div>
                      <Chip
                        size="small"
                        icon={<PeopleIcon fontSize="small" />}
                        label={profile.numberOfProfiles}
                        sx={{ "& .MuiChip-label": { fontSize: "1rem" } }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            )}
            {/* Funcionarios creados */}
            {employees.map(
              (employee: { name: string; role: string }, index: number) => (
                <Card
                  elevation={1}
                  style={{ width: "100%", marginBottom: "3px" }}
                  key={index}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      maxHeight: "40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography component="div" color="textSecondary">
                          {employee.name} - {employee.role}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
