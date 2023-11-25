import API_URL from "./config";

export const getInterviews = async ({ token }: { token: string }) => {
  return await fetch(`${API_URL}/interviews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
