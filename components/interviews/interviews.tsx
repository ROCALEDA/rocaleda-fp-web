"use client";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Navbar from "@/components/navbar/navbar";
import CustomBreadcrumbs from "../breadcrumbs/breadcrumbs";
import { useTranslations } from "next-intl";
import { philosopher } from "@/app/[locale]/theme/fonts";
import InterviewList from "./interview-list";
import { useEffect, useState } from "react";
import InterviewDetailCard from "./interview-detail-card";
import { TInterview } from "@/types/interview";
import DetailLayout from "../layout/detail-layout";
import ScheduleInterview from "./schedule-interview";
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";

export default function Interviews() {
  const [selectedInterview, setSelectedInterview] = useState<
    TInterview | undefined
  >();
  const lang = useTranslations("Interviews");
  const { data: session } = useSession();
  const user = session?.user;

  const [interviews, setInterviews] = useState<TInterview[]>();

  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1000);

  const breadcrumbs = [
    { name: "Home", path: "/home" },
    { name: lang("title"), path: "/interviews" },
  ];

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

  return (
    <Box>
      <Navbar />
      <DetailLayout>
        <Container maxWidth="lg">
          <Grid container height="100%">
            <Grid item xs={12} md={7}>
              <Stack padding={4} direction="column" spacing={4}>
                <CustomBreadcrumbs routes={breadcrumbs}></CustomBreadcrumbs>
                <Typography
                  variant="h3"
                  gutterBottom
                  fontFamily={philosopher.style.fontFamily}
                >
                  {lang("title")}
                </Typography>
                <Typography variant="h6" gutterBottom color="secondary.main">
                  {lang("description")}
                </Typography>
                {user && [2].includes(user.role_id) && (
                  <Stack direction="row" justifyContent="flex-end" gap={2}>
                    <ScheduleInterview triggerInterviews={fetchInterviews} />
                  </Stack>
                )}
                <InterviewList
                  setSelectedInterview={setSelectedInterview}
                  isLoading={isLoading}
                  interviews={interviews}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                display="flex"
                alignContent="center"
                justifyContent="center"
                height="100%"
              >
                {selectedInterview && (
                  <InterviewDetailCard interview={selectedInterview} />
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </DetailLayout>
    </Box>
  );
}
