import { TInterviewPayload } from "@/types/interview";
import API_URL from "./config";

export const getInterviews = async ({ token }: { token: string }) => {
  return await fetch(`${API_URL}/interviews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const scheduleInterview = async ({
  token,
  interview,
}: {
  token: string;
  interview: TInterviewPayload;
}) => {
  return await fetch(`${API_URL}/interviews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(interview),
  });
};
