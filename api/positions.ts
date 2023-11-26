import API_URL from "./config";

export const getPositions = async ({ token }: { token: string }) => {
  return await fetch(`${API_URL}/positions`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
