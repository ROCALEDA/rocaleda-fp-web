"use client";
import Image from "next/image";
import { Card, Chip, Grid, Typography, Button } from "@mui/material";
import { TCandidate } from "@/types/users";
import { useTranslations } from "next-intl";
import { philosopher } from "@/app/[locale]/theme/fonts";
import { TSimpleProject } from "@/types/types";
import AssignCandidateModal from "./assign-candidate-modal";

type CandidateCardProps = {
  candidate: TCandidate;
  projects: TSimpleProject[];
};

export default function CandidateDetail({
  candidate,
  projects,
}: CandidateCardProps) {
  const lang = useTranslations("Candidates");

  return (
    <Card
      sx={{
        padding: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Image
            src="/images/user-circle.png"
            alt="Figure"
            width={100}
            height={100}
          />
          <Typography variant="h6" fontFamily={philosopher.style.fontFamily}>
            {lang("anonymous")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{lang("tech_skills")}</Typography>
          {candidate.tech_skills.map((techSkill) => (
            <Chip
              key={techSkill.id}
              label={techSkill.name}
              sx={{ backgroundColor: "#FAE8FF" }}
              size="small"
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{lang("soft_skills")}</Typography>
          {candidate.soft_skills.map((softSkill) => (
            <Chip
              key={softSkill.id}
              label={softSkill.name}
              sx={{ backgroundColor: "#FEF7E7" }}
              size="small"
            />
          ))}
        </Grid>
        <Grid item xs={12} textAlign="center">
          <AssignCandidateModal projects={projects} candidate={candidate} />
        </Grid>
      </Grid>
    </Card>
  );
}
