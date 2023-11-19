"use client";

import { Card, Chip, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { TInterview } from "@/types/interview";
import { formatTime, getDay, getMonth } from "@/utils/date";

type InterviewDetailCardProps = {
  interview: TInterview;
};

export default function InterviewDetailCard({
  interview,
}: InterviewDetailCardProps) {
  const lang = useTranslations("Interviews");

  return (
    <Card
      sx={{
        padding: 2,
        position: "relative",
        overflow: "visible",
        minWidth: 400,
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">{interview.subject}</Typography>
          <Chip
            sx={{ alignSelf: "center" }}
            label={
              typeof interview.score === "number" ? "Completada" : "Pendiente"
            }
            color={typeof interview.score === "number" ? "success" : "warning"}
          />
        </Stack>

        <Stack direction="row" alignItems="baseline">
          <Typography variant="subtitle2" gutterBottom>
            {lang("company")}:&nbsp;
          </Typography>
          <Typography variant="caption" gutterBottom color="secondary.main">
            {interview.client_name}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="baseline">
          <Typography variant="subtitle2" gutterBottom>
            {lang("date")}:&nbsp;
          </Typography>
          <Typography variant="caption" sx={{ marginTop: 0 }}>
            {getDay(interview.realization_date)}&nbsp;
            {getMonth(interview.realization_date)}&nbsp;,
            {formatTime(interview.realization_date)}
          </Typography>
        </Stack>

        <Stack direction="column" alignItems="center">
          {interview.score ? (
            <Stack direction="column" alignItems="center">
              <Typography variant="h6" gutterBottom>
                {lang("result")}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {interview.score}
              </Typography>
            </Stack>
          ) : (
            lang("no_results")
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
