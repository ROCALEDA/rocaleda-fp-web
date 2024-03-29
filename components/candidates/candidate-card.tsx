"use client";

import { Card, Chip, Grid, Typography } from "@mui/material";
import { TCandidate } from "@/types/users";

type CandidateCardProps = {
  candidate: TCandidate;
};

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card
      sx={{
        padding: 2,
        position: "relative",
        overflow: "visible",
        minWidth: 400,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {candidate.tech_skills.map((techSkill) => (
            <Chip
              key={techSkill.id}
              label={techSkill.name}
              sx={{ backgroundColor: "#FAE8FF" }}
              size="small"
            />
          ))}
        </Grid>
        <Grid item xs={6}>
          {candidate.soft_skills.map((softSkill) => (
            <Chip
              key={softSkill.id}
              label={softSkill.name}
              sx={{ backgroundColor: "#FEF7E7" }}
              size="small"
            />
          ))}
        </Grid>
      </Grid>
    </Card>
  );
}
