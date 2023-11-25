import API_URL from "./config";

export const getCandidates = async ({ token }: { token: string }) => {
  return await fetch(`${API_URL}/candidate`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
