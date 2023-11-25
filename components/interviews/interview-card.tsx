"use client";

import {
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { TInterview } from "@/types/interview";
import { formatTime, getDay, getMonth } from "@/utils/date";

type InterviewCardProps = {
  interview: TInterview;
};

export default function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <Card
      sx={{
        padding: 2,
        position: "relative",
        overflow: "visible",
        minWidth: 400,
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
          backgroundColor:
            typeof interview.score === "number" ? "#B1E5D9" : "#F3DA90",
        }}
      />
      <Grid container alignItems="center" spacing={2} justifyContent="end">
        <Grid item xs={5}>
          <Stack direction="column">
            <Typography variant="subtitle1">{interview.subject}</Typography>
            <Typography variant="caption" gutterBottom color="secondary.main">
              {interview.client_name}
            </Typography>
          </Stack>
        </Grid>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderRightWidth: 3 }}
        />
        <Grid item xs={3}>
          <Typography color="secondary.main" sx={{ marginTop: 0 }}>
            {getDay(interview.realization_date)}&nbsp;
            {getMonth(interview.realization_date)}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="caption" fontWeight={500}>
              {formatTime(interview.realization_date)}
            </Typography>
          </Stack>
        </Grid>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderRightWidth: 3 }}
        />
        <Grid item xs={3}>
          <Chip
            sx={{ alignSelf: "center" }}
            label={
              typeof interview.score === "number" ? "Completada" : "Pendiente"
            }
            color={typeof interview.score === "number" ? "success" : "warning"}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
