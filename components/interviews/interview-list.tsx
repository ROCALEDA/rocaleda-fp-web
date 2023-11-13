"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Box, Container, Stack } from "@mui/material";
import API_URL from "@/api/config";
import { TInterview } from "@/types/interview";
import InterviewCard from "./interview-card";

export default function InterviewList() {
  const { data: session } = useSession();

  const [interviews, setInterviews] = useState<TInterview[]>();

  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchInterviews = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage.toString());
    queryParams.append("limit", rowsPerPage.toString());

    const url = `${API_URL}/interviews${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    fetch(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data: { data: TInterview[]; total_pages: number }) => {
        setInterviews(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (session) {
      fetchInterviews();
    }
  }, [session]);

  console.log("INTERVIEW LIST", interviews);
  if (isLoading) return <p>Cargando...</p>;

  return (
    <Box>
      <Container maxWidth="lg">
        <Stack paddingY={4} direction="column" spacing={4}>
          {interviews?.map((interview, key) => (
            <InterviewCard key={key} interview={interview} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
