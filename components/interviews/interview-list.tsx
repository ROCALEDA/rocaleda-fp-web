"use client";

import { Dispatch, SetStateAction } from "react";

import { Box, Stack } from "@mui/material";
import InterviewCard from "./interview-card";
import { TInterview } from "@/types/interview";
import LoadingSkeleton from "./interview-card-skeleton";

type InterviewListProps = {
  setSelectedInterview: Dispatch<SetStateAction<TInterview | undefined>>;
  isLoading: boolean;
  interviews?: TInterview[];
};

export default function InterviewList({
  isLoading,
  interviews,
  setSelectedInterview,
}: InterviewListProps) {
  return (
    <Box>
      <Stack paddingY={2} direction="column">
        {isLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          : interviews?.map((interview, key) => (
              <div
                key={key}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedInterview(interview)}
                style={{ cursor: "pointer" }}
              >
                <InterviewCard key={key} interview={interview} />
              </div>
            ))}
      </Stack>
    </Box>
  );
}
